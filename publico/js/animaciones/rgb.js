// ============================================================
// Animación "rgb": cómo hace colores el LED RGB.
// Tres luces (rojo, verde y azul) de 0 a 255 que se mezclan, el LED
// encendido con la mezcla y la llamada ponerColor(r, g, b) del código.
// Los botones rápidos son solo los colores que ya aparecen en el código
// de la guía (azul, verde, rojo) y el morado del reto.
//
// En la guía:
//   :::animacion tipo="rgb"
//   :::
// Opciones (todas opcionales): r · g · b (valores al empezar, por defecto 0, 255, 0)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const CANALES = [
  { k: 'r', nombre: 'Rojo (R) → D9', color: '#FF0000', cx: 120, cy: 92 },
  { k: 'g', nombre: 'Verde (G) → D10', color: '#00FF00', cx: 170, cy: 92 },
  { k: 'b', nombre: 'Azul (B) → D11', color: '#0000FF', cx: 145, cy: 136 },
];
const RAPIDOS = [['Azul', 0, 0, 255], ['Verde', 0, 255, 0], ['Rojo', 255, 0, 0], ['Morado (reto)', 255, 0, 255]];

export default function montar(contenedor, config) {
  const valor = {
    r: limitar(Math.round(numero(config.r, 0)), 0, 255),
    g: limitar(Math.round(numero(config.g, 255)), 0, 255),
    b: limitar(Math.round(numero(config.b, 0)), 0, 255),
  };

  // Tres círculos de luz que se suman (como las luces de colores en una pared oscura)
  const circulos = CANALES.map((c) => svg('circle', { cx: c.cx, cy: c.cy, r: 52, fill: c.color, class: 'rgb-luz' }));
  const ledLuz = svg('circle', { cx: 400, cy: 98, r: 46, class: 'rgb-brillo' });
  const ledCuerpo = svg('path', { d: 'M 372 140 L 372 92 A 28 28 0 0 1 428 92 L 428 140 Z', class: 'rgb-cuerpo' });
  const raiz = svg('svg', { viewBox: '0 0 500 230', class: 'rgb-svg', role: 'img', 'aria-label': 'Mezcla de luz roja, verde y azul y el LED con el color que resulta' },
    svg('rect', { x: 20, y: 10, width: 250, height: 210, rx: 12, class: 'rgb-pared' }),
    svg('g', { class: 'rgb-mezcla' }, ...circulos),
    svg('text', { x: 145, y: 214, class: 'rgb-texto sobre-negro', 'text-anchor': 'middle' }, 'Las tres luces se suman'),
    ledLuz, ledCuerpo,
    svg('rect', { x: 368, y: 140, width: 64, height: 8, rx: 2, class: 'rgb-base' }),
    ...[380, 393, 407, 420].map((x, i) => svg('line', { x1: x, y1: 148, x2: x, y2: i === 1 ? 206 : 192, class: 'rgb-pata' })),
    ...['R', 'común', 'G', 'B'].map((t, i) => svg('text', { x: [380, 393, 407, 420][i], y: i === 1 ? 220 : 206, class: 'rgb-texto chico', 'text-anchor': 'middle' }, t)),
    svg('text', { x: 400, y: 30, class: 'rgb-texto', 'text-anchor': 'middle' }, 'LED RGB'));

  const deslizadores = {};
  const numeros = {};
  const filas = CANALES.map((c) => {
    const d = el('input', { type: 'range', class: `anim-deslizador rgb-deslizador ${c.k}`, min: 0, max: 255, step: 1, value: valor[c.k], 'aria-label': c.nombre });
    const n = el('strong', { class: 'rgb-numero' });
    d.addEventListener('input', () => { valor[c.k] = Number(d.value); actualizar(); });
    deslizadores[c.k] = d; numeros[c.k] = n;
    return el('label', { class: 'anim-etiqueta rgb-fila' }, el('span', {}, c.nombre), d, n);
  });
  const rapidos = el('div', { class: 'anim-rapidos' },
    RAPIDOS.map(([t, r, g, b]) => el('button', { type: 'button', class: 'anim-boton', onclick: () => { Object.assign(valor, { r, g, b }); actualizar(true); } }, t)));
  const codigo = el('pre', { class: 'joystick-codigo' });

  contenedor.append(el('div', { class: 'anim-rgb' },
    raiz,
    el('div', { class: 'anim-controles' }, ...filas, rapidos, codigo,
      el('p', { class: 'texto-ayuda' }, '0 = apagado · 255 = máximo'))));

  function actualizar(moverDeslizadores = false) {
    CANALES.forEach((c, i) => {
      circulos[i].setAttribute('opacity', (valor[c.k] / 255).toFixed(3));
      numeros[c.k].textContent = String(valor[c.k]);
      if (moverDeslizadores) deslizadores[c.k].value = valor[c.k];
    });
    const color = `rgb(${valor.r}, ${valor.g}, ${valor.b})`;
    const apagado = valor.r + valor.g + valor.b === 0;
    ledLuz.setAttribute('fill', color);
    ledLuz.setAttribute('opacity', apagado ? '0' : '0.55');
    ledCuerpo.setAttribute('fill', apagado ? '' : color);
    ledCuerpo.classList.toggle('apagado', apagado);
    codigo.textContent =
      `ponerColor(${valor.r}, ${valor.g}, ${valor.b});\n\n` +
      `// dentro de ponerColor():\nanalogWrite(LED_R, ${valor.r});\nanalogWrite(LED_G, ${valor.g});\nanalogWrite(LED_B, ${valor.b});`;
  }
  actualizar();
}
