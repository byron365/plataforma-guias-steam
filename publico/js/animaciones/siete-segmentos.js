// ============================================================
// Animación "siete-segmentos": cada segmento es un bit.
// Se tocan los segmentos a..g para encenderlos y se ve el número binario
// que se forma (0b g f e d c b a, como en NUM[] del nodo de piso) y el pin
// de cada segmento (D4 a D10). También se ve cómo bitRead() recorre los bits.
// No trae los números ya armados: la pregunta de la guía pide leerlos en el código.
//
// En la guía:
//   :::animacion tipo="siete-segmentos"
//   :::
// Opciones (todas opcionales): pines (primer pin del segmento a, por defecto 4)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const LETRAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
// Segmentos grandes (dígito de 120 × 210)
const FORMAS = {
  a: 'M 24 12 L 96 12 L 84 26 L 36 26 Z',
  b: 'M 100 16 L 110 28 L 108 96 L 96 102 L 86 92 L 88 30 Z',
  c: 'M 96 110 L 108 116 L 106 184 L 96 196 L 84 182 L 86 120 Z',
  d: 'M 36 186 L 84 186 L 96 200 L 24 200 Z',
  e: 'M 22 116 L 34 110 L 34 120 L 32 182 L 22 196 L 14 184 Z',
  f: 'M 20 16 L 32 30 L 32 92 L 24 102 L 12 96 L 12 28 Z',
  g: 'M 32 98 L 88 98 L 98 106 L 88 114 L 32 114 L 22 106 Z',
};

export default function montar(contenedor, config) {
  const primerPin = limitar(Math.round(numero(config.pines, 4)), 2, 7);
  const encendido = [false, false, false, false, false, false, false];
  let paso = -1; let ultimo = 0; let espera = 0; let recorriendo = false;

  const segs = LETRAS.map((l, i) => {
    const p = svg('path', { d: FORMAS[l], class: 'siete-grande', tabindex: '0', role: 'switch', 'aria-label': `Segmento ${l}` });
    const alternar = () => { encendido[i] = !encendido[i]; actualizar(); };
    p.addEventListener('click', alternar);
    p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternar(); } });
    return p;
  });
  const etiquetas = { a: [60, 8], b: [120, 60], c: [120, 152], d: [60, 214], e: [0, 152], f: [0, 60], g: [60, 94] };
  const raiz = svg('svg', { viewBox: '-14 -10 150 236', class: 'siete-grande-svg', role: 'group', 'aria-label': 'Display de 7 segmentos: toca los segmentos' },
    svg('rect', { x: -10, y: -6, width: 140, height: 228, rx: 10, class: 'siete-fondo' }),
    ...segs,
    ...LETRAS.map((l) => svg('text', { x: etiquetas[l][0], y: etiquetas[l][1], class: 'siete-letra', 'text-anchor': 'middle' }, l)));

  const bits = el('div', { class: 'siete-bits' });
  const codigo = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  const botonRecorrer = el('button', { type: 'button', class: 'anim-boton' }, '▶ Ver el for con bitRead()');
  const botonBorrar = el('button', { type: 'button', class: 'anim-boton' }, 'Apagar todos');
  contenedor.append(el('div', { class: 'anim-siete' },
    el('div', { class: 'siete-col' }, raiz, el('p', { class: 'anim-etiqueta' }, 'Toca los segmentos')),
    el('div', { class: 'anim-controles' }, bits, codigo, el('div', { class: 'anim-rapidos' }, botonRecorrer, botonBorrar))));

  function actualizar() {
    segs.forEach((s, i) => { s.classList.toggle('encendido', encendido[i]); s.classList.toggle('leyendo', i === paso); });
    // El bit 0 es el segmento a (el de la derecha del número)
    const binario = LETRAS.map((_, i) => (encendido[6 - i] ? '1' : '0')).join('');
    bits.replaceChildren(
      el('div', { class: 'siete-fila' }, el('span', {}, 'bit'), ...[6, 5, 4, 3, 2, 1, 0].map((i) => el('span', { class: i === paso ? 'leyendo' : '' }, String(i)))),
      el('div', { class: 'siete-fila' }, el('span', {}, 'segmento'), ...[6, 5, 4, 3, 2, 1, 0].map((i) => el('span', { class: i === paso ? 'leyendo' : '' }, LETRAS[i]))),
      el('div', { class: 'siete-fila valores' }, el('span', {}, 'valor'), ...[6, 5, 4, 3, 2, 1, 0].map((i) => el('span', { class: `${encendido[i] ? 'uno' : ''}${i === paso ? ' leyendo' : ''}` }, encendido[i] ? '1' : '0'))),
      el('div', { class: 'siete-fila' }, el('span', {}, 'pin'), ...[6, 5, 4, 3, 2, 1, 0].map((i) => el('span', { class: i === paso ? 'leyendo' : '' }, `D${primerPin + i}`))));
    codigo.textContent =
      `0b${binario}\n\n` +
      'for (int i = 0; i < 7; i++)\n' +
      '  digitalWrite(SEG[i], bitRead(numero, i));' +
      (paso >= 0 ? `\n\n// i = ${paso}: bitRead → ${encendido[paso] ? 1 : 0} → segmento ${LETRAS[paso]} ${encendido[paso] ? 'encendido' : 'apagado'} (D${primerPin + paso})` : '');
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (recorriendo) {
      espera += dt;
      if (espera > 700) { espera = 0; paso++; if (paso > 6) { paso = -1; recorriendo = false; } actualizar(); }
    }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  botonRecorrer.addEventListener('click', () => { recorriendo = true; paso = 0; espera = 0; actualizar(); });
  botonBorrar.addEventListener('click', () => { encendido.fill(false); actualizar(); });
  actualizar();
  requestAnimationFrame(cuadro);
}
