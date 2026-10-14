// ============================================================
// Display de 7 segmentos (uno o varios dígitos), dibujado en SVG.
// Compartido por las animaciones que muestran números (banda, elevador…).
//
//   const d = crearDisplay7({ digitos: 8 });
//   contenedor.append(d.elemento);
//   d.ponerDigito(7, 4);  d.ponerCaracter(5, '-');  d.limpiar();
// Las posiciones van como en LedControl (MAX7219): 0 es el dígito de la DERECHA.
// ============================================================
import { svg } from './svg.js';

// Segmentos encendidos para cada carácter (a b c d e f g)
const SEGMENTOS = {
  0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg',
  '-': 'g', ' ': '', E: 'adefg', A: 'abcefg', b: 'cdefg', C: 'adef', d: 'bcdeg', F: 'aefg', H: 'bcefg', L: 'def', P: 'abefg', o: 'cdeg', r: 'eg', u: 'cde',
};
// Forma de cada segmento en un dígito de 40 × 70
const FORMAS = {
  a: 'M 8 4 L 32 4 L 28 9 L 12 9 Z',
  b: 'M 33 6 L 36 9 L 35 33 L 31 31 L 32 11 Z',
  c: 'M 31 39 L 35 37 L 34 61 L 30 64 L 30 43 Z',
  d: 'M 11 61 L 27 61 L 31 66 L 7 66 Z',
  e: 'M 5 37 L 9 39 L 8 59 L 4 62 L 4 41 Z',
  f: 'M 6 9 L 9 6 L 9 31 L 5 33 L 5 13 Z',
  g: 'M 10 32 L 30 32 L 33 35 L 30 38 L 10 38 L 7 35 Z',
};

export function crearDisplay7({ digitos = 1, color = '#EF4444', etiqueta = 'Display de 7 segmentos' } = {}) {
  const ANCHO = 44;
  const elemento = svg('svg', { viewBox: `0 0 ${digitos * ANCHO + 8} 78`, class: 'siete-svg', role: 'img', 'aria-label': etiqueta });
  elemento.append(svg('rect', { x: 0, y: 0, width: digitos * ANCHO + 8, height: 78, rx: 6, class: 'siete-fondo' }));
  const estado = Array(digitos).fill(' ');
  const piezas = [];
  for (let i = 0; i < digitos; i++) {
    const g = svg('g', { transform: `translate(${6 + i * ANCHO} 4)` });
    const segs = {};
    for (const [k, d] of Object.entries(FORMAS)) { segs[k] = svg('path', { d, class: 'siete-seg' }); g.append(segs[k]); }
    const punto = svg('circle', { cx: 39, cy: 65, r: 2.6, class: 'siete-seg' });
    g.append(punto);
    piezas.push({ segs, punto });
    elemento.append(g);
  }
  elemento.style.setProperty('--siete-color', color);

  // posición como en LedControl: 0 = derecha
  function ponerCaracter(pos, c, conPunto = false) {
    const i = digitos - 1 - pos;
    if (i < 0 || i >= digitos) return;
    const encendidos = SEGMENTOS[c] ?? SEGMENTOS[String(c)] ?? '';
    for (const [k, p] of Object.entries(piezas[i].segs)) p.classList.toggle('encendido', encendidos.includes(k));
    piezas[i].punto.classList.toggle('encendido', conPunto);
    estado[i] = String(c);
    elemento.setAttribute('aria-label', `${etiqueta}: ${estado.join('')}`);
  }
  return {
    elemento,
    ponerDigito: (pos, n, punto = false) => ponerCaracter(pos, Math.abs(Math.trunc(n)) % 10, punto),
    ponerCaracter,
    limpiar: () => { for (let p = 0; p < digitos; p++) ponerCaracter(p, ' '); },
    get texto() { return estado.join(''); },
  };
}
