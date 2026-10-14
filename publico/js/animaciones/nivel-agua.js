// ============================================================
// Animación "nivel-agua": el sensor de nivel de tiras dentro del depósito.
// Mientras más tiras cubre el agua, más sube el número en A1. Si el número
// no supera NIVEL_MINIMO, se enciende el LED de alerta y la bomba no riega.
// Los números son aproximados: cada sensor da valores distintos (por eso se calibra).
//
// En la guía:
//   :::animacion tipo="nivel-agua"
//   :::
// Opciones (todas opcionales): minimo (100) · pin ("A1") · maximo (lectura con el sensor cubierto, 620)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

// Depósito dibujado: fondo en y = 280, borde de arriba en y = 60
const FONDO = 280; const TOPE = 60;
const TIRA_ABAJO = 270; const TIRA_ARRIBA = 150;   // el sensor cubre esta parte del depósito

export default function montar(contenedor, config) {
  let minimo = limitar(numero(config.minimo, 100), 0, 1023);
  const pin = /^A\d$/i.test(config.pin || '') ? config.pin.toUpperCase() : 'A1';
  const maximo = limitar(numero(config.maximo, 620), 100, 1023);
  let nivel = 75; // % de agua en el depósito

  const agua = svg('rect', { x: 92, width: 116, class: 'nivel-agua' });
  const superficie = svg('line', { x1: 92, x2: 208, class: 'nivel-superficie' });
  const tiras = svg('g', { class: 'nivel-tiras' });
  for (let y = TIRA_ARRIBA + 6; y < TIRA_ABAJO; y += 12) tiras.append(svg('line', { x1: 238, x2: 262, y1: y, y2: y }));
  const led = svg('circle', { cx: 380, cy: 110, r: 16, class: 'nivel-led' });
  const raiz = svg('svg', { viewBox: '0 0 460 300', class: 'nivel-svg', role: 'img', 'aria-label': 'Depósito de agua con el sensor de nivel' },
    svg('rect', { x: 90, y: TOPE, width: 120, height: FONDO - TOPE + 2, rx: 8, class: 'nivel-deposito' }),
    agua, superficie,
    // Sensor pegado por dentro (se dibuja al lado para que se vea)
    svg('rect', { x: 230, y: TIRA_ARRIBA, width: 40, height: TIRA_ABAJO - TIRA_ARRIBA, rx: 4, class: 'nivel-sensor' }),
    tiras,
    svg('line', { x1: 210, x2: 230, y1: 210, y2: 210, class: 'nivel-flecha' }),
    svg('text', { x: 250, y: TIRA_ARRIBA - 8, class: 'inv-texto', 'text-anchor': 'middle' }, `Sensor → ${pin}`),
    svg('text', { x: 150, y: 52, class: 'inv-texto', 'text-anchor': 'middle' }, 'Depósito'),
    led,
    svg('text', { x: 380, y: 146, class: 'inv-texto', 'text-anchor': 'middle' }, 'LED de alerta (D4)'));

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 100, step: 1, value: nivel, 'aria-label': 'Cantidad de agua en el depósito' });
  const entradaMin = el('input', { type: 'number', min: 0, max: 1023, step: 10, value: minimo, class: 'temp-entrada', 'aria-label': 'NIVEL_MINIMO' });
  const cuentas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  const estado = el('p', { class: 'anim-estado' });

  contenedor.append(el('div', { class: 'anim-nivel' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Agua en el depósito (o arrástrala)', deslizador),
      el('label', { class: 'anim-etiqueta' }, 'NIVEL_MINIMO = ', entradaMin),
      cuentas, estado,
      el('p', { class: 'texto-ayuda' }, 'Los números son aproximados: cada sensor da valores distintos. Los de ustedes salen de su tabla.'))));

  const yAgua = () => FONDO - (nivel / 100) * (FONDO - TOPE - 10);

  function lectura() {
    // Parte de las tiras cubierta por el agua → número aproximado
    const cubierto = limitar((TIRA_ABAJO - yAgua()) / (TIRA_ABAJO - TIRA_ARRIBA), 0, 1);
    return Math.round(cubierto * maximo);
  }

  function dibujar() {
    const y = yAgua();
    agua.setAttribute('y', y); agua.setAttribute('height', FONDO - y);
    superficie.setAttribute('y1', y); superficie.setAttribute('y2', y);
    const valor = lectura();
    const hayAgua = valor > minimo;
    led.classList.toggle('encendido', !hayAgua);
    cuentas.textContent =
      `nivel = analogRead(${pin});       // ${valor}\n` +
      `hayAgua = nivel > NIVEL_MINIMO;   // ${valor} > ${minimo} → ${hayAgua}\n` +
      `digitalWrite(ALERTA, !hayAgua);   // LED ${hayAgua ? 'apagado' : 'ENCENDIDO'}`;
    estado.className = `anim-estado ${hayAgua ? 'ok' : 'alerta'}`;
    estado.textContent = hayAgua
      ? 'Hay agua: si la tierra está seca, la bomba puede regar.'
      : 'Sin agua suficiente: el LED avisa y la bomba no riega aunque la tierra esté seca.';
    deslizador.value = Math.round(nivel);
  }

  deslizador.addEventListener('input', () => { nivel = Number(deslizador.value); dibujar(); });
  entradaMin.addEventListener('change', () => { minimo = limitar(Number(entradaMin.value) || 0, 0, 1023); entradaMin.value = minimo; dibujar(); });

  // Arrastrar la superficie del agua
  let arrastrando = false;
  const desdePuntero = (e) => {
    const caja = raiz.getBoundingClientRect();
    const y = ((e.clientY - caja.top) / caja.height) * 300;
    nivel = limitar(((FONDO - y) / (FONDO - TOPE - 10)) * 100, 0, 100);
    dibujar();
  };
  raiz.addEventListener('pointerdown', (e) => { arrastrando = true; raiz.setPointerCapture(e.pointerId); desdePuntero(e); });
  raiz.addEventListener('pointermove', (e) => { if (arrastrando) desdePuntero(e); });
  raiz.addEventListener('pointerup', () => { arrastrando = false; });

  dibujar();
}
