// ============================================================
// Animación "triangulo": por qué los triángulos hacen fuertes las estructuras.
// Tres figuras de palitos con uniones que giran (como la silicona antes de
// endurecer o un tornillo): cuadrado, triángulo y cuadrado con diagonal.
// Al empujar la esquina de arriba, el cuadrado se deforma; los otros no.
//
// En la guía:
//   :::animacion tipo="triangulo"
//   :::
// ============================================================
import { svg, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const LADO = 110;
const BASE_Y = 190;
const INCLINACION_MAX = 38; // grados que se tuerce el cuadrado con el empujón máximo

export default function montar(contenedor) {
  const raiz = svg('svg', { viewBox: '0 0 640 260', class: 'triangulo-svg', role: 'img', 'aria-label': 'Cuadrado, triángulo y cuadrado con diagonal empujados por una esquina' });
  const figuras = [
    { nombre: 'Cuadrado', x: 40, tipo: 'cuadrado' },
    { nombre: 'Triángulo', x: 260, tipo: 'triangulo' },
    { nombre: 'Cuadrado con diagonal', x: 470, tipo: 'diagonal' },
  ].map((f) => {
    const g = svg('g', { class: 'figura-palitos' });
    const flecha = svg('g', { class: 'triangulo-flecha' }, svg('line', { x1: 0, y1: 0, x2: 0, y2: 0 }), svg('path', { d: '' }));
    const etiqueta = svg('text', { x: f.x + LADO / 2, y: BASE_Y + 34, class: 'triangulo-nombre', 'text-anchor': 'middle' }, f.nombre);
    const estado = svg('text', { x: f.x + LADO / 2, y: BASE_Y + 54, class: 'triangulo-estado', 'text-anchor': 'middle' });
    raiz.append(svg('line', { x1: f.x - 20, x2: f.x + LADO + 20, y1: BASE_Y + 6, y2: BASE_Y + 6, class: 'triangulo-mesa' }), g, flecha, etiqueta, estado);
    return { ...f, g, flecha, estado };
  });

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 100, step: 1, value: 0, 'aria-label': 'Fuerza del empujón' });
  const resumen = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-triangulo' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Empuja la esquina de arriba hacia un lado (o arrástrala)', deslizador),
      el('div', { class: 'anim-rapidos' }, el('button', { type: 'button', class: 'anim-boton', onclick: () => cambiar(0) }, 'Soltar')),
      resumen)));

  // Dibuja palitos (líneas gruesas) y uniones (círculos)
  function dibujarFigura(f, fuerza) {
    const x0 = f.x; const x1 = f.x + LADO; const y0 = BASE_Y;
    let palitos; let uniones; let esquina;
    if (f.tipo === 'cuadrado') {
      // Las uniones giran: el cuadrado se vuelve un rombo (paralelogramo)
      const a = (fuerza / 100) * INCLINACION_MAX * (Math.PI / 180);
      const dx = LADO * Math.sin(a); const alto = LADO * Math.cos(a);
      const tl = [x0 + dx, y0 - alto]; const tr = [x1 + dx, y0 - alto];
      palitos = [[[x0, y0], [x1, y0]], [[x1, y0], tr], [tr, tl], [tl, [x0, y0]]];
      uniones = [[x0, y0], [x1, y0], tr, tl];
      esquina = tl;
    } else if (f.tipo === 'triangulo') {
      const cima = [x0 + LADO / 2, y0 - LADO * 0.87];
      palitos = [[[x0, y0], [x1, y0]], [[x1, y0], cima], [cima, [x0, y0]]];
      uniones = [[x0, y0], [x1, y0], cima];
      esquina = cima;
    } else {
      const tl = [x0, y0 - LADO]; const tr = [x1, y0 - LADO];
      palitos = [[[x0, y0], [x1, y0]], [[x1, y0], tr], [tr, tl], [tl, [x0, y0]], [[x0, y0], tr]];
      uniones = [[x0, y0], [x1, y0], tr, tl];
      esquina = tl;
    }
    f.g.replaceChildren(
      ...palitos.map(([p, q], i) => svg('line', { x1: p[0], y1: p[1], x2: q[0], y2: q[1], class: f.tipo === 'diagonal' && i === 4 ? 'palito palito-diagonal' : 'palito' })),
      ...uniones.map(([x, y]) => svg('circle', { cx: x, cy: y, r: 6, class: 'union' })));

    // Flecha del empujón en la esquina de arriba
    const largo = 14 + fuerza * 0.4;
    const [ex, ey] = esquina;
    f.flecha.querySelector('line').setAttribute('x1', ex - largo - 10);
    f.flecha.querySelector('line').setAttribute('x2', ex - 10);
    f.flecha.querySelector('line').setAttribute('y1', ey);
    f.flecha.querySelector('line').setAttribute('y2', ey);
    f.flecha.querySelector('path').setAttribute('d', `M ${ex - 10} ${ey - 6} L ${ex - 2} ${ey} L ${ex - 10} ${ey + 6} Z`);
    f.flecha.style.opacity = fuerza > 0 ? 1 : 0.25;
    f.estado.textContent = fuerza === 0 ? '' : f.tipo === 'cuadrado' ? 'Se deforma' : 'No se deforma';
    f.estado.classList.toggle('mal', f.tipo === 'cuadrado' && fuerza > 0);
  }

  function cambiar(valor) {
    const fuerza = limitar(Math.round(valor), 0, 100);
    deslizador.value = fuerza;
    figuras.forEach((f) => dibujarFigura(f, fuerza));
    resumen.textContent = fuerza === 0
      ? 'Las tres figuras están quietas. Empuja la esquina de arriba.'
      : 'El cuadrado se tuerce; el triángulo y el cuadrado con diagonal mantienen su forma. ¿Por qué será?';
  }

  deslizador.addEventListener('input', () => cambiar(Number(deslizador.value)));

  // Arrastrar horizontalmente sobre el dibujo también empuja
  let arrastre = null;
  raiz.addEventListener('pointerdown', (e) => { arrastre = { x: e.clientX, valor: Number(deslizador.value) }; raiz.setPointerCapture(e.pointerId); });
  raiz.addEventListener('pointermove', (e) => {
    if (!arrastre) return;
    const escala = 640 / raiz.getBoundingClientRect().width;
    cambiar(arrastre.valor + (e.clientX - arrastre.x) * escala * 0.8);
  });
  const soltar = () => { arrastre = null; };
  raiz.addEventListener('pointerup', soltar);
  raiz.addEventListener('pointercancel', soltar);

  cambiar(0);
}
