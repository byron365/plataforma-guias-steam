// ============================================================
// Animación "ultrasonico": cómo mide el sensor HC-SR04.
// El sensor lanza un sonido, rebota en el objeto y vuelve. Se ve el viaje
// de ida y vuelta (muy en cámara lenta), el tiempo del eco en microsegundos
// y la cuenta  distancia = tiempo × 0,034 ÷ 2.
//
// En la guía:
//   :::animacion tipo="ultrasonico"
//   :::
// Opciones (todas opcionales):
//   objeto   texto del objeto (por defecto "Barco")
//   max      distancia máxima del deslizador en cm (por defecto 50)
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const ANCHO = 560;
const X_SENSOR = 70;     // frente del sensor
const PX_POR_CM = 9;
const VELOCIDAD_SONIDO = 0.034; // cm por microsegundo
const DURACION_VIAJE = 1400;    // ms que dura la animación de ida (cámara lenta)

export default function montar(contenedor, config) {
  const maximo = limitar(numero(config.max, 50), 10, 50);
  const nombreObjeto = config.objeto || 'Barco';
  let distancia = 20;      // cm reales
  let viaje = null;        // { inicio } mientras el sonido va y vuelve
  let ultimaMedida = null; // { tiempo, distancia }

  // ---------- Dibujo ----------
  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} 200`, class: 'ultra-svg', role: 'img', 'aria-label': 'Sensor ultrasónico midiendo la distancia a un objeto' });
  const objeto = svg('g', { class: 'ultra-objeto', tabindex: '0', role: 'slider', 'aria-label': `${nombreObjeto}: arrástralo para cambiar la distancia`, 'aria-valuemin': '2', 'aria-valuemax': String(maximo) },
    svg('rect', { x: 0, y: -40, width: 46, height: 80, rx: 6 }),
    svg('text', { x: 23, y: 58, class: 'ultra-texto', 'text-anchor': 'middle' }, nombreObjeto));
  const onda = svg('g', { class: 'ultra-onda' });
  const cota = svg('g', { class: 'ultra-cota' });
  raiz.append(
    // Sensor HC-SR04: placa y dos "ojos" (emisor T y receptor R)
    svg('rect', { x: 10, y: 60, width: 60, height: 80, rx: 6, class: 'ultra-placa' }),
    svg('circle', { cx: 52, cy: 82, r: 14, class: 'ultra-ojo' }),
    svg('circle', { cx: 52, cy: 118, r: 14, class: 'ultra-ojo' }),
    svg('text', { x: 30, y: 86, class: 'ultra-texto-placa', 'text-anchor': 'middle' }, 'T'),
    svg('text', { x: 30, y: 122, class: 'ultra-texto-placa', 'text-anchor': 'middle' }, 'R'),
    svg('text', { x: 40, y: 160, class: 'ultra-texto', 'text-anchor': 'middle' }, 'HC-SR04'),
    cota, onda, objeto);

  // ---------- Panel ----------
  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 2, max: maximo, step: 1, value: distancia, 'aria-label': `Distancia real al ${nombreObjeto.toLowerCase()} en cm` });
  const botonMedir = el('button', { type: 'button', class: 'boton boton-chico' }, '📡 Medir');
  const pasos = el('ol', { class: 'ultra-pasos' });
  const cuenta = el('div', { class: 'anim-codigo ultra-cuenta', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-ultrasonico' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Distancia real (arrastra el objeto o usa el deslizador)', deslizador),
      el('div', { class: 'anim-rapidos' }, botonMedir),
      pasos, cuenta)));

  const xObjeto = () => X_SENSOR + distancia * PX_POR_CM;
  const tiempoEco = () => Math.round((distancia * 2) / VELOCIDAD_SONIDO); // µs de ida y vuelta

  function dibujarPasos(etapa) {
    const textos = [
      'TRIG en HIGH 10 µs: el sensor lanza el sonido.',
      'El sonido viaja hasta el objeto…',
      '…rebota y regresa al sensor.',
      'ECHO: el Arduino mide cuánto tardó (pulseIn).',
    ];
    pasos.replaceChildren(...textos.map((t, i) => el('li', { class: i === etapa ? 'activo' : (i < etapa ? 'hecho' : '') }, t)));
  }

  function dibujar(tiempo = performance.now()) {
    objeto.setAttribute('transform', `translate(${xObjeto()} 100)`);
    objeto.setAttribute('aria-valuenow', String(distancia));

    // Cota: distancia real dibujada debajo
    cota.replaceChildren(
      svg('line', { x1: X_SENSOR, x2: xObjeto(), y1: 178, y2: 178 }),
      svg('line', { x1: X_SENSOR, x2: X_SENSOR, y1: 170, y2: 186 }),
      svg('line', { x1: xObjeto(), x2: xObjeto(), y1: 170, y2: 186 }),
      svg('text', { x: (X_SENSOR + xObjeto()) / 2, y: 196, class: 'ultra-texto', 'text-anchor': 'middle' }, `${distancia} cm`));

    // Onda: frentes de sonido que avanzan (ida) y regresan (vuelta)
    onda.replaceChildren();
    let etapa = ultimaMedida ? 3 : -1;
    if (viaje) {
      const t = (tiempo - viaje.inicio) / DURACION_VIAJE; // 0 a 2 (ida + vuelta)
      if (t >= 2) {
        viaje = null;
        ultimaMedida = { tiempo: tiempoEco(), distancia };
        etapa = 3;
      } else {
        const ida = t < 1;
        const avance = ida ? t : 2 - t;
        const x = X_SENSOR + avance * (xObjeto() - X_SENSOR);
        const y = ida ? 82 : 118;
        for (let k = 0; k < 3; k++) {
          const r = 10 + k * 7;
          const sentido = ida ? 1 : -1;
          onda.append(svg('path', { d: `M ${x - sentido * 4} ${y - r} q ${sentido * r * 0.8} ${r} 0 ${2 * r}`, class: ida ? 'ida' : 'vuelta' }));
        }
        etapa = ida ? (t < 0.08 ? 0 : 1) : 2;
      }
    }
    dibujarPasos(etapa);

    if (ultimaMedida) {
      const calculo = (ultimaMedida.tiempo * VELOCIDAD_SONIDO) / 2;
      cuenta.textContent =
        `pulseIn(ECHO, HIGH) = ${ultimaMedida.tiempo} µs\n` +
        `distancia = ${ultimaMedida.tiempo} × 0,034 ÷ 2 = ${calculo.toFixed(1).replace('.', ',')} cm`;
    } else {
      cuenta.textContent = 'Toca "Medir" para lanzar el sonido.';
    }
    botonMedir.disabled = !!viaje;
  }

  function cuadro(tiempo) {
    if (viaje) dibujar(tiempo);
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  function medir() {
    if (pocoMovimiento()) { ultimaMedida = { tiempo: tiempoEco(), distancia }; dibujar(); return; }
    viaje = { inicio: performance.now() };
    ultimaMedida = null;
    dibujar();
  }

  function cambiarDistancia(cm) {
    distancia = Math.round(limitar(cm, 2, maximo));
    deslizador.value = distancia;
    if (!viaje) ultimaMedida = null; // la medida anterior ya no vale
    dibujar();
  }

  deslizador.addEventListener('input', () => cambiarDistancia(Number(deslizador.value)));
  botonMedir.addEventListener('click', medir);

  // Arrastrar el objeto
  let arrastrando = false;
  const desdePuntero = (e) => {
    const caja = raiz.getBoundingClientRect();
    const x = ((e.clientX - caja.left) / caja.width) * ANCHO - 23;
    cambiarDistancia((x - X_SENSOR) / PX_POR_CM);
  };
  objeto.addEventListener('pointerdown', (e) => { arrastrando = true; objeto.setPointerCapture(e.pointerId); });
  objeto.addEventListener('pointermove', (e) => { if (arrastrando) desdePuntero(e); });
  objeto.addEventListener('pointerup', () => { arrastrando = false; });
  objeto.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { cambiarDistancia(distancia + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { cambiarDistancia(distancia - 1); e.preventDefault(); }
  });

  dibujar();
  requestAnimationFrame(cuadro);
}
