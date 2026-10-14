// ============================================================
// Animación "proporcion-color": valores crudos contra proporciones.
// Un sensor de color simulado lee una pieza. Se cambia cuánta luz hay
// (más o menos brillo) y si entra la luz del salón por el túnel abierto.
// Se ven los números crudos R, G, B, C y las proporciones pr = R/C, pg = G/C,
// pb = B/C, con la decisión del leerColor() de la guía 7 (límites de ejemplo
// 0,45 · 0,40 · 0,38: cada equipo calibra los suyos).
// Los valores son de una simulación, no los del sensor del equipo.
//
// En la guía:
//   :::animacion tipo="proporcion-color"
//   :::
// Opciones (todas opcionales): limiterojo (0.45) · limiteverde (0.40) · limiteazul (0.38)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const PIEZAS = [
  { nombre: 'Roja', refl: [0.56, 0.24, 0.20] },
  { nombre: 'Verde', refl: [0.24, 0.50, 0.26] },
  { nombre: 'Azul', refl: [0.18, 0.30, 0.52] },
  { nombre: 'Sin pieza', refl: [0.33, 0.33, 0.34], oscura: true },
];
const NOMBRES = ['rojo', 'verde', 'azul'];

export default function montar(contenedor, config) {
  const LIM = [numero(config.limiterojo, 0.45), numero(config.limiteverde, 0.40), numero(config.limiteazul, 0.38)];
  let pieza = 0; let brillo = 100; let salon = false;

  const crudo = svg('g', {});
  const prop = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 600 230', class: 'grafica-svg', role: 'img', 'aria-label': 'Valores crudos y proporciones del sensor de color' },
    svg('text', { x: 20, y: 20, class: 'grafica-eje' }, 'Valores crudos'),
    svg('text', { x: 330, y: 20, class: 'grafica-eje' }, 'Proporciones (÷ C)'),
    crudo, prop);
  const botones = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Pieza bajo el sensor' },
    PIEZAS.map((p, i) => el('button', { type: 'button', class: 'anim-boton', 'data-i': i, onclick: () => { pieza = i; actualizar(); } }, p.nombre)));
  const rBrillo = el('input', { type: 'range', class: 'anim-deslizador', min: 20, max: 300, step: 5, value: brillo, 'aria-label': 'Cantidad de luz' });
  const vBrillo = el('strong');
  const casilla = el('input', { type: 'checkbox' });
  const codigo = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-proporcion' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('p', { class: 'anim-etiqueta' }, 'Pieza bajo el sensor'), botones,
      el('label', { class: 'anim-etiqueta' }, 'Cantidad de luz: ', vBrillo, rBrillo),
      el('label', { class: 'casilla-simple' }, casilla, ' Túnel abierto: entra la luz del salón'),
      codigo,
      el('p', { class: 'texto-ayuda' }, 'Valores simulados. Los límites son los de ejemplo de la guía: calibren los suyos.'))));

  const barra = (grupo, x, valor, maximo, clase, texto) => {
    const alto = (limitar(valor / maximo, 0, 1)) * 150;
    grupo.append(svg('rect', { x, y: 190 - alto, width: 46, height: alto, rx: 3, class: `calcol-barra ${clase}` }),
      svg('text', { x: x + 23, y: 186 - alto, class: 'grafica-numero', 'text-anchor': 'middle' }, texto));
  };

  function actualizar() {
    const p = PIEZAS[pieza];
    const intensidad = (p.oscura ? 25 : 1000) * (brillo / 100);
    // Luz del salón: amarillenta (más rojo y verde que azul)
    const extra = salon ? [260, 220, 90] : [0, 0, 0];
    const rgb = p.refl.map((k, i) => Math.round(k * intensidad + extra[i] * (brillo / 100)));
    const c = rgb[0] + rgb[1] + rgb[2];
    const pr = rgb.map((v) => (c ? v / c : 0));
    // Decisión con crudos (guía 5) y con proporciones (guía 7)
    const crudoDecide = rgb[0] > rgb[1] && rgb[0] > rgb[2] ? 0 : rgb[1] > rgb[0] && rgb[1] > rgb[2] ? 1 : 2;
    let propDecide = -1;
    if (c >= 50) { if (pr[0] > LIM[0]) propDecide = 0; else if (pr[1] > LIM[1]) propDecide = 1; else if (pr[2] > LIM[2]) propDecide = 2; }

    crudo.replaceChildren(svg('line', { x1: 20, x2: 300, y1: 190, y2: 190, class: 'grafica-base' }));
    const maxCrudo = Math.max(1200, c);
    [['R', 'calcol-r'], ['G', 'calcol-g'], ['B', 'calcol-b'], ['C', 'calcol-c']].forEach(([n, clase], i) => {
      barra(crudo, 30 + i * 66, i < 3 ? rgb[i] : c, maxCrudo, clase, String(i < 3 ? rgb[i] : c));
      crudo.append(svg('text', { x: 53 + i * 66, y: 208, class: 'grafica-eje', 'text-anchor': 'middle' }, n));
    });
    prop.replaceChildren(svg('line', { x1: 330, x2: 590, y1: 190, y2: 190, class: 'grafica-base' }));
    [['pr', 'calcol-r'], ['pg', 'calcol-g'], ['pb', 'calcol-b']].forEach(([n, clase], i) => {
      barra(prop, 350 + i * 80, pr[i], 1, clase, pr[i].toFixed(2).replace('.', ','));
      const yLim = 190 - LIM[i] * 150;
      prop.append(svg('line', { x1: 344 + i * 80, x2: 402 + i * 80, y1: yLim, y2: yLim, class: 'umbral-linea delgada' }),
        svg('text', { x: 373 + i * 80, y: 208, class: 'grafica-eje', 'text-anchor': 'middle' }, n));
    });
    botones.querySelectorAll('button').forEach((b) => { const a = Number(b.dataset.i) === pieza; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    vBrillo.textContent = `${brillo} %`;
    codigo.textContent =
      `Crudos: R ${rgb[0]} · G ${rgb[1]} · B ${rgb[2]} · C ${c}\n` +
      `Comparando crudos (r > g && r > b…) → ${NOMBRES[crudoDecide]}\n` +
      `pr ${pr[0].toFixed(2)} · pg ${pr[1].toFixed(2)} · pb ${pr[2].toFixed(2)}\n` +
      `Con proporciones → ${c < 50 ? '-1 (muy oscuro: no hay pieza)' : propDecide < 0 ? '-1 (desconocido)' : NOMBRES[propDecide]}`;
  }
  rBrillo.addEventListener('input', () => { brillo = Number(rBrillo.value); actualizar(); });
  casilla.addEventListener('change', () => { salon = casilla.checked; actualizar(); });
  actualizar();
}
