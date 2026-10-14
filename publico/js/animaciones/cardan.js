// ============================================================
// Animación "cardan": el soporte que inclina el tablero en dos ejes.
// Dos marcos, uno dentro del otro:
//   - El marco de afuera gira sobre el eje X (ejes en las torres de los lados):
//     se inclina hacia adelante y atrás. Lo mueve el servo X (D9).
//   - El tablero, dentro del marco, gira sobre el eje Y: se inclina a los lados.
//     Lo mueve el servo Y (D10).
// Dibujo en perspectiva (isométrica). Los ángulos se mueven con deslizadores
// (no se calculan desde el joystick: eso lo miden en la guía 4).
//
// En la guía:
//   :::animacion tipo="cardan"
//   :::
// Opciones (todas opcionales): centro (90) · inclinacion (15, cuánto se puede mover cada servo)
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const COS30 = Math.cos(Math.PI / 6); const SIN30 = 0.5;
const ESCALA = 0.95;
const OX = 260; const OY = 170;

// Proyección isométrica: x a la derecha, y hacia el fondo, z hacia arriba
const proyectar = ([x, y, z]) => ({ x: OX + (x - y) * COS30 * ESCALA, y: OY + (x + y) * SIN30 * ESCALA - z * ESCALA });
const giroX = ([x, y, z], a) => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
const giroY = ([x, y, z], a) => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
const camino = (pts) => `M ${pts.map((p) => { const q = proyectar(p); return `${q.x.toFixed(1)} ${q.y.toFixed(1)}`; }).join(' L ')} Z`;
const cuadro = (m, z = 0) => [[-m, -m, z], [m, -m, z], [m, m, z], [-m, m, z]];

export default function montar(contenedor, config) {
  const CENTRO = limitar(Math.round(numero(config.centro, 90)), 60, 120);
  const INCL = limitar(Math.round(numero(config.inclinacion, 15)), 5, 30);
  let servoX = CENTRO; let servoY = CENTRO;
  let demo = false; let fase = 0; let ultimo = 0;

  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 520 330', class: 'cardan-svg', role: 'img', 'aria-label': 'Soporte cardán con marco y tablero' }, capa);

  const rango = (texto, valor, alCambiar) => {
    const r = el('input', { type: 'range', class: 'anim-deslizador', min: CENTRO - INCL, max: CENTRO + INCL, step: 1, value: valor, 'aria-label': texto });
    const v = el('strong');
    r.addEventListener('input', () => { demo = false; alCambiar(Number(r.value)); actualizar(); });
    return { r, v, fila: el('label', { class: 'anim-etiqueta' }, texto, ' ', v, r) };
  };
  const rx = rango('Servo X (D9) · marco:', servoX, (n) => { servoX = n; });
  const ry = rango('Servo Y (D10) · tablero:', servoY, (n) => { servoY = n; });
  const botonDemo = el('button', { type: 'button', class: 'anim-boton' });
  const botonCentro = el('button', { type: 'button', class: 'anim-boton' }, `Los dos en ${CENTRO}° (plano)`);
  const explicacion = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-cardan' },
    raiz,
    el('div', { class: 'anim-controles' }, rx.fila, ry.fila,
      el('div', { class: 'anim-rapidos' }, botonCentro, botonDemo), explicacion)));

  function dibujar() {
    const a = ((servoX - CENTRO) * Math.PI) / 180; // marco: gira sobre el eje X
    const b = ((servoY - CENTRO) * Math.PI) / 180; // tablero: gira sobre el eje Y (dentro del marco)
    const marco = (p) => giroX(p, a);
    const tablero = (p) => giroX(giroY(p, b), a);
    const Z = 70;   // altura de los ejes sobre la base
    const sube = (f) => (p) => { const q = f(p); return [q[0], q[1], q[2] + Z]; };
    const m = sube(marco); const t = sube(tablero);
    const piezas = [];
    // Base y torres (fijas)
    piezas.push(svg('path', { d: camino(cuadro(120, 0)), class: 'cardan-base' }));
    for (const s of [-1, 1]) {
      const x0 = s * 122; const x1 = s * 132;
      piezas.push(svg('path', { d: camino([[x0, -10, 0], [x1, -10, 0], [x1, -10, Z + 12], [x0, -10, Z + 12]]), class: 'cardan-torre' }));
      piezas.push(svg('path', { d: camino([[x1, -10, 0], [x1, 10, 0], [x1, 10, Z + 12], [x1, -10, Z + 12]]), class: 'cardan-torre lado' }));
    }
    // Eje X (en las torres) y eje Y (en el marco)
    piezas.push(svg('path', { d: `M ${proyectar([-140, 0, Z]).x} ${proyectar([-140, 0, Z]).y} L ${proyectar([140, 0, Z]).x} ${proyectar([140, 0, Z]).y}`, class: 'cardan-eje x' }));
    // Marco (cuadro de 220 con hueco de 200)
    piezas.push(svg('path', { d: `${camino(cuadro(110).map(m))} ${camino(cuadro(100).map(m))}`, class: 'cardan-marco', 'fill-rule': 'evenodd' }));
    const ejeY1 = m([0, -118, 0]); const ejeY2 = m([0, 118, 0]);
    piezas.push(svg('path', { d: `M ${proyectar(ejeY1).x} ${proyectar(ejeY1).y} L ${proyectar(ejeY2).x} ${proyectar(ejeY2).y}`, class: 'cardan-eje y' }));
    // Tablero (dentro del marco) con su canica
    piezas.push(svg('path', { d: camino(cuadro(96).map(t)), class: 'cardan-tablero' }));
    for (let i = -2; i <= 2; i++) {
      const p1 = proyectar(t([i * 38, -96, 0])); const p2 = proyectar(t([i * 38, 96, 0]));
      piezas.push(svg('line', { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, class: 'cardan-reja' }));
    }
    // Servos: X en la torre derecha, Y en el marco
    const sx = proyectar([138, 0, Z]); const sy = proyectar(m([0, 112, 0]));
    piezas.push(svg('rect', { x: sx.x - 9, y: sx.y - 12, width: 18, height: 24, rx: 3, class: 'cardan-servo' }));
    piezas.push(svg('text', { x: sx.x + 14, y: sx.y + 4, class: 'cardan-texto x' }, 'Servo X'));
    piezas.push(svg('rect', { x: sy.x - 9, y: sy.y - 9, width: 18, height: 18, rx: 3, class: 'cardan-servo' }));
    piezas.push(svg('text', { x: sy.x - 14, y: sy.y + 22, class: 'cardan-texto y', 'text-anchor': 'end' }, 'Servo Y'));
    // Etiquetas de los ejes
    const ex = proyectar([-150, 0, Z]); const ey = proyectar(m([0, -130, 0]));
    piezas.push(svg('text', { x: ex.x - 4, y: ex.y + 4, class: 'cardan-texto x', 'text-anchor': 'end' }, 'eje X'));
    piezas.push(svg('text', { x: ey.x, y: ey.y - 6, class: 'cardan-texto y', 'text-anchor': 'middle' }, 'eje Y'));
    capa.replaceChildren(...piezas);
  }

  function actualizar() {
    rx.v.textContent = `${servoX}°`; ry.v.textContent = `${servoY}°`;
    rx.r.value = servoX; ry.r.value = servoY;
    botonDemo.textContent = demo ? '⏸ Detener' : '▶ Moverse solo';
    const partes = [];
    partes.push(servoX === CENTRO ? 'El marco está plano' : `El marco se inclina hacia ${servoX > CENTRO ? 'atrás' : 'adelante'}`);
    partes.push(servoY === CENTRO ? 'el tablero está plano dentro del marco' : `el tablero se inclina a la ${servoY > CENTRO ? 'derecha' : 'izquierda'}`);
    explicacion.textContent = `${partes.join(' y ')}.`;
    dibujar();
  }

  function paso(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (demo) {
      fase += dt / 2600;
      servoX = Math.round(CENTRO + INCL * Math.sin(fase * Math.PI * 2));
      servoY = Math.round(CENTRO + INCL * Math.cos(fase * Math.PI * 2 * 0.5));
      actualizar();
    }
    if (contenedor.isConnected) requestAnimationFrame(paso);
  }

  botonDemo.addEventListener('click', () => { demo = !demo && !pocoMovimiento(); actualizar(); });
  botonCentro.addEventListener('click', () => { demo = false; servoX = CENTRO; servoY = CENTRO; actualizar(); });
  actualizar();
  requestAnimationFrame(paso);
}
