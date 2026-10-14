// ============================================================
// Animación "engranes": pinza de dos engranes iguales.
// El servo mueve el engrane izquierdo (motriz); el derecho gira al revés
// y los dos dedos de la pinza se abren o cierran parejos.
//
// En la guía:
//   :::animacion tipo="engranes" cerrada="30" abierta="90" dientes="12"
//   :::
// Opciones (todas opcionales):
//   cerrada, abierta  ángulos del servo (por defecto 30 y 90, como en garra_robotica.ino)
//   dientes           número de dientes de cada engrane (por defecto 12)
//   variable          nombre del servo en el código (por defecto "pinza")
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const ANCHO = 360;
const ALTO = 300;
const RADIO = 52;              // radio primitivo de cada engrane
const CY = 210;                // altura de los centros
const CX_IZQ = ANCHO / 2 - RADIO;
const CX_DER = ANCHO / 2 + RADIO;
const LARGO_DEDO = 150;

// Contorno de un engrane con dientes trapezoidales, centrado en (0,0)
function contornoEngrane(dientes, radio) {
  const alto = 7;
  const puntos = [];
  for (let i = 0; i < dientes; i++) {
    const paso = (Math.PI * 2) / dientes;
    const a = i * paso;
    const angulos = [a, a + paso * 0.18, a + paso * 0.5, a + paso * 0.68];
    const radios = [radio - alto, radio + alto, radio + alto, radio - alto];
    angulos.forEach((ang, k) => {
      puntos.push(`${(radios[k] * Math.cos(ang)).toFixed(2)},${(radios[k] * Math.sin(ang)).toFixed(2)}`);
    });
  }
  return `M ${puntos.join(' L ')} Z`;
}

export default function montar(contenedor, config) {
  const cerrada = limitar(numero(config.cerrada, 30), 0, 180);
  const abierta = limitar(numero(config.abierta, 90), cerrada + 1, 180);
  const dientes = limitar(Math.round(numero(config.dientes, 12)), 6, 40);
  const variable = /^[A-Za-z_]\w*$/.test(config.variable || '') ? config.variable : 'pinza';

  // Ángulo de inclinación de los dedos con la pinza cerrada: las puntas se tocan en el centro
  const inclinacionCerrada = (Math.asin(RADIO / LARGO_DEDO) * 180) / Math.PI;

  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} ${ALTO}`, class: 'engranes-svg', role: 'img', 'aria-label': 'Pinza con dos engranes' });

  // Un engrane con su dedo (el dedo está unido al engrane y gira con él)
  function crearLado(cx, clase) {
    const grupo = svg('g', { class: `engrane ${clase}` });
    const dedo = svg('g', { class: 'dedo' },
      svg('rect', { x: -9, y: -LARGO_DEDO, width: 18, height: LARGO_DEDO, rx: 8 }),
      svg('rect', { x: -10, y: -LARGO_DEDO - 2, width: 20, height: 26, rx: 9, class: 'dedo-goma' }),
    );
    const rueda = svg('g', { class: 'rueda' },
      svg('path', { d: contornoEngrane(dientes, RADIO) }),
      svg('circle', { r: RADIO - 22, class: 'rueda-centro' }),
      svg('circle', { r: 7, class: 'rueda-eje' }),
      svg('line', { x1: 0, y1: 0, x2: RADIO - 14, y2: 0, class: 'rueda-marca' }),
    );
    grupo.append(dedo, rueda);
    grupo.setAttribute('transform', `translate(${cx} ${CY})`);
    raiz.append(grupo);
    return { dedo, rueda };
  }

  const izquierdo = crearLado(CX_IZQ, 'motriz');
  const derecho = crearLado(CX_DER, 'conducido');

  // Flechas de sentido de giro
  const flechaIzq = svg('text', { x: CX_IZQ, y: CY + RADIO + 34, class: 'engrane-sentido', 'text-anchor': 'middle' });
  const flechaDer = svg('text', { x: CX_DER, y: CY + RADIO + 34, class: 'engrane-sentido', 'text-anchor': 'middle' });
  raiz.append(flechaIzq, flechaDer,
    svg('text', { x: CX_IZQ, y: 22, class: 'engrane-nombre', 'text-anchor': 'middle' }, 'Motriz (servo)'),
    svg('text', { x: CX_DER, y: 22, class: 'engrane-nombre', 'text-anchor': 'middle' }, 'Conducido'));
  raiz.setAttribute('viewBox', `0 0 ${ANCHO} ${ALTO + 40}`);

  // ---------- Controles ----------
  const valor = el('span', { class: 'anim-valor' });
  const estado = el('p', { class: 'anim-estado' });
  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: cerrada, max: abierta, step: 1, value: abierta, 'aria-label': 'Ángulo del servo de la pinza' });
  const controles = el('div', { class: 'anim-controles' },
    el('div', { class: 'anim-codigo' }, `${variable}.write(`, valor, ');'),
    el('label', { class: 'anim-etiqueta' }, 'Mueve el servo de la pinza', deslizador),
    el('div', { class: 'anim-rapidos' },
      el('button', { type: 'button', class: 'anim-boton', onclick: () => irA(cerrada) }, `Cerrar (${cerrada}°)`),
      el('button', { type: 'button', class: 'anim-boton', onclick: () => irA(abierta) }, `Abrir (${abierta}°)`)),
    estado,
  );
  contenedor.append(el('div', { class: 'anim-servo' }, el('div', { class: 'anim-dibujo' }, raiz), controles));

  // ---------- Dibujo según el ángulo ----------
  let angulo = abierta;
  let anterior = abierta;

  function dibujar(grados) {
    // El engrane izquierdo gira con el servo; el derecho, al revés (mismo número de dientes = mismo ángulo)
    const giro = inclinacionCerrada - (grados - cerrada);
    izquierdo.rueda.setAttribute('transform', `rotate(${giro})`);
    izquierdo.dedo.setAttribute('transform', `rotate(${giro})`);
    // Desfase de medio diente para que los dientes encajen
    derecho.rueda.setAttribute('transform', `rotate(${180 - giro + 180 / dientes})`);
    derecho.dedo.setAttribute('transform', `rotate(${-giro})`);

    const delta = grados - anterior;
    if (Math.abs(delta) > 0.01) {
      flechaIzq.textContent = delta > 0 ? '↺ antihorario' : '↻ horario';
      flechaDer.textContent = delta > 0 ? '↻ horario' : '↺ antihorario';
    }
    anterior = grados;
    valor.textContent = Math.round(grados);
    const porcentaje = Math.round(((grados - cerrada) / (abierta - cerrada)) * 100);
    estado.textContent = porcentaje <= 2 ? 'Pinza cerrada' : porcentaje >= 98 ? 'Pinza abierta' : `Pinza abierta al ${porcentaje} %`;
  }

  // Movimiento suave hacia un ángulo (botones)
  let animacion = null;
  function irA(meta) {
    cancelAnimationFrame(animacion);
    deslizador.value = meta;
    if (pocoMovimiento()) { angulo = meta; dibujar(angulo); return; }
    const paso = () => {
      angulo += Math.sign(meta - angulo) * Math.min(Math.abs(meta - angulo), 2);
      dibujar(angulo);
      if (angulo !== meta) animacion = requestAnimationFrame(paso);
    };
    paso();
  }

  deslizador.addEventListener('input', () => {
    cancelAnimationFrame(animacion);
    angulo = Number(deslizador.value);
    dibujar(angulo);
  });

  dibujar(angulo);
  flechaIzq.textContent = '';
  flechaDer.textContent = '';
}
