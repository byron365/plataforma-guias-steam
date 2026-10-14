// ============================================================
// Animación "mecanismos": tres formas de soltar comida, funcionando.
//   - Compuerta giratoria: una paleta tapa la salida y gira para abrir.
//   - Disco giratorio: un disco con un hueco gira y deja caer una porción.
//   - Tornillo: un tornillo grande empuja la comida.
// Solo muestra cómo funciona cada uno (la elección es del equipo).
//
// En la guía:
//   :::animacion tipo="mecanismos"
//   :::
// ============================================================
import { svg, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

export default function montar(contenedor) {
  let corriendo = !pocoMovimiento();
  let tiempo = 0;
  let ultimo = 0;

  const panel = (titulo, texto) => {
    const s = svg('svg', { viewBox: '0 0 220 220', class: 'meca-svg', role: 'img', 'aria-label': titulo });
    const caja = el('figure', { class: 'meca-caja' }, s, el('figcaption', {}, el('strong', {}, titulo), el('span', {}, texto)));
    return { s, caja };
  };

  // ---------- 1. Compuerta giratoria ----------
  const p1 = panel('Compuerta giratoria', 'La paleta gira y destapa la salida.');
  const paleta = svg('g', {}, svg('rect', { x: -46, y: -3, width: 46, height: 6, rx: 2, class: 'disp-compuerta' }));
  const caida1 = svg('g', {});
  p1.s.append(
    svg('path', { d: 'M 50 20 L 170 20 L 124 100 L 96 100 Z', class: 'disp-embudo' }),
    ...[0, 1, 2, 3, 4, 5].map((i) => svg('circle', { cx: 80 + (i % 3) * 30 + (i > 2 ? 15 : 0), cy: 40 + (i > 2 ? 18 : 0), r: 6, class: 'disp-croqueta' })),
    caida1, paleta, svg('circle', { cx: 132, cy: 106, r: 6, class: 'disp-servo' }),
    svg('path', { d: 'M 70 196 L 150 196 L 140 208 L 80 208 Z', class: 'disp-plato' }));

  // ---------- 2. Disco giratorio ----------
  const p2 = panel('Disco giratorio', 'El hueco pasa bajo la salida y cae una porción.');
  const hueco = svg('ellipse', { rx: 13, ry: 5, class: 'meca-hueco' });
  const caida2 = svg('g', {});
  p2.s.append(
    svg('path', { d: 'M 120 10 L 200 10 L 168 70 L 152 70 Z', class: 'disp-embudo' }),
    svg('ellipse', { cx: 110, cy: 98, rx: 80, ry: 22, class: 'meca-disco-borde' }),
    svg('ellipse', { cx: 110, cy: 92, rx: 80, ry: 22, class: 'meca-disco' }),
    hueco, svg('line', { x1: 110, x2: 110, y1: 92, y2: 140, class: 'meca-eje' }),
    caida2,
    svg('path', { d: 'M 120 196 L 200 196 L 190 208 L 130 208 Z', class: 'disp-plato' }));

  // ---------- 3. Tornillo ----------
  const p3 = panel('Tornillo', 'Un motor gira el tornillo sin parar y empuja la comida.');
  const helice = svg('path', { class: 'meca-helice' });
  const empujadas = svg('g', {});
  p3.s.append(
    svg('path', { d: 'M 20 20 L 80 20 L 64 70 L 36 70 Z', class: 'disp-embudo' }),
    svg('rect', { x: 20, y: 70, width: 170, height: 44, rx: 6, class: 'meca-tubo' }),
    helice, empujadas,
    svg('rect', { x: 4, y: 82, width: 16, height: 20, rx: 3, class: 'disp-servo' }),
    svg('text', { x: 4, y: 132, class: 'inv-texto', 'text-anchor': 'start' }, 'motor'),
    svg('path', { d: 'M 150 196 L 214 196 L 206 208 L 158 208 Z', class: 'disp-plato' }));

  const botonPausa = el('button', { type: 'button', class: 'anim-boton' });
  contenedor.append(el('div', { class: 'anim-mecanismos' },
    el('div', { class: 'meca-paneles' }, p1.caja, p2.caja, p3.caja),
    el('div', { class: 'anim-rapidos' }, botonPausa)));

  function dibujar() {
    const t = tiempo / 1000;
    // 1. La paleta: cerrada 1,2 s, abre, abierta 0,8 s, cierra (ciclo de 2,6 s)
    const c = t % 2.6;
    const giro = c < 1.2 ? 0 : c < 1.5 ? (c - 1.2) / 0.3 * 70 : c < 2.3 ? 70 : (2.6 - c) / 0.3 * 70;
    paleta.setAttribute('transform', `translate(132 106) rotate(${giro})`);
    caida1.replaceChildren();
    if (giro > 50) for (let i = 0; i < 4; i++) caida1.append(svg('circle', { cx: 104 + (i % 2) * 12, cy: 112 + ((t * 160 + i * 22) % 80), r: 5, class: 'disp-croqueta' }));

    // 2. El disco: el hueco da una vuelta cada 3 s; cae comida cuando pasa bajo la salida
    const ang = (t / 3) * Math.PI * 2;
    const hx = 110 + 52 * Math.cos(ang); const hy = 92 + 14 * Math.sin(ang);
    hueco.setAttribute('cx', hx); hueco.setAttribute('cy', hy);
    caida2.replaceChildren();
    const fase = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    // la salida está adelante a la derecha (ángulo ≈ 1,1 rad); la porción cae un rato después de pasar
    const desde = fase - 1.1;
    if (desde > 0 && desde < 1.6) {
      const k = desde / 1.6;
      for (let i = 0; i < 3; i++) caida2.append(svg('circle', { cx: 160 + i * 9 - 9, cy: 110 + k * 80 - i * 6, r: 5, class: 'disp-croqueta' }));
    }

    // 3. El tornillo: la hélice se desplaza y las croquetas avanzan hacia la derecha
    const desplazamiento = (t * 40) % 30;
    let d = 'M 22 92';
    for (let x = 22; x <= 188; x += 3) d += ` L ${x} ${92 + 16 * Math.sin(((x - desplazamiento) / 30) * Math.PI * 2)}`;
    helice.setAttribute('d', d);
    empujadas.replaceChildren();
    for (let i = 0; i < 6; i++) {
      const x = 40 + ((t * 40 + i * 30) % 180);
      empujadas.append(x < 190
        ? svg('circle', { cx: x, cy: 100, r: 5, class: 'disp-croqueta' })
        : svg('circle', { cx: 182, cy: 114 + (x - 190) * 4, r: 5, class: 'disp-croqueta' }));
    }
    botonPausa.textContent = corriendo ? '⏸ Pausar' : '▶ Mover';
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (corriendo) tiempo += dt;
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  botonPausa.addEventListener('click', () => { corriendo = !corriendo; dibujar(); });
  dibujar();
  requestAnimationFrame(cuadro);
}
