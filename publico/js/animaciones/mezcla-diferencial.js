// ============================================================
// Animación "mezcla-diferencial": del joystick a dos motores.
//   izquierdo = avance + giro · derecho = avance − giro  (y se limita a −255…255)
// Se mueve el joystick y se ven los dos valores, las ruedas y el camino que
// hace el robot visto desde arriba. El joystick va de 35 en 35 para no caer
// justo en los valores de la tabla de la guía (esos los calcula el equipo),
// y no se escribe qué hace el robot: se ve.
//
// En la guía:
//   :::animacion tipo="mezcla-diferencial"
//   :::
// Opciones (todas opcionales): zona (zona muerta, 20)
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const PASO = 35;

export default function montar(contenedor, config) {
  const ZONA = limitar(Math.round(numero(config.zona, 20)), 0, 100);
  let y = 0; let x = 0;                 // avance y giro (−245…245)
  let robot = { px: 270, py: 150, ang: -Math.PI / 2 };
  let traza = []; let ultimo = 0;

  // Joystick
  const palanca = svg('circle', { r: 16, class: 'joystick-bola' });
  const pad = svg('svg', { viewBox: '0 0 140 140', class: 'lab-pad', tabindex: '0', role: 'application', 'aria-label': 'Joystick: arrástralo o usa las flechas' },
    svg('circle', { cx: 70, cy: 70, r: 64, class: 'joystick-base' }),
    svg('line', { x1: 14, y1: 70, x2: 126, y2: 70, class: 'joystick-cruz' }),
    svg('line', { x1: 70, y1: 14, x2: 70, y2: 126, class: 'joystick-cruz' }), palanca);

  // Robot visto desde arriba
  const ruedaIzq = svg('rect', { x: -14, y: -22, width: 28, height: 8, rx: 2, class: 'lazo-rueda' });
  const ruedaDer = svg('rect', { x: -14, y: 14, width: 28, height: 8, rx: 2, class: 'lazo-rueda' });
  const flechaIzq = svg('path', { class: 'mezcla-flecha' });
  const flechaDer = svg('path', { class: 'mezcla-flecha' });
  const cuerpo = svg('g', {}, svg('rect', { x: -20, y: -16, width: 40, height: 32, rx: 6, class: 'lazo-robot' }),
    ruedaIzq, ruedaDer, flechaIzq, flechaDer, svg('path', { d: 'M 14 -6 L 22 0 L 14 6 Z', class: 'lazo-frente' }));
  const ruta = svg('polyline', { class: 'lazo-ruta' });
  const escena = svg('svg', { viewBox: '0 0 540 300', class: 'lazo-svg', role: 'img', 'aria-label': 'Robot visto desde arriba' }, ruta, cuerpo);

  const valores = el('div', { class: 'mezcla-valores' });
  const botonCentro = el('button', { type: 'button', class: 'anim-boton' }, 'Volver al centro');
  contenedor.append(el('div', { class: 'anim-mezcla' },
    el('div', {}, escena),
    el('div', { class: 'anim-controles' },
      el('div', { class: 'perilla-columna' }, pad, el('p', { class: 'anim-etiqueta' }, 'Joystick: arriba = avance (Y), lados = giro (X)')),
      valores, el('div', { class: 'anim-rapidos' }, botonCentro))));

  const mezcla = () => {
    const yy = Math.abs(y) < ZONA ? 0 : y; const xx = Math.abs(x) < ZONA ? 0 : x;
    return { izq: limitar(yy + xx, -255, 255), der: limitar(yy - xx, -255, 255), yy, xx };
  };
  const flecha = (v, yRueda) => {
    if (!v) return '';
    const largo = 6 + (Math.abs(v) / 255) * 22; const s = Math.sign(v);
    return `M ${-largo / 2 * s} ${yRueda} L ${largo / 2 * s} ${yRueda} M ${largo / 2 * s} ${yRueda} l ${-6 * s} -4 M ${largo / 2 * s} ${yRueda} l ${-6 * s} 4`;
  };

  function actualizar() {
    const m = mezcla();
    palanca.setAttribute('cx', 70 + (x / 245) * 48); palanca.setAttribute('cy', 70 - (y / 245) * 48);
    flechaIzq.setAttribute('d', flecha(m.izq, -30)); flechaDer.setAttribute('d', flecha(m.der, 30));
    valores.replaceChildren(
      el('p', {}, `avance (Y) = ${m.yy} · giro (X) = ${m.xx}`),
      el('pre', { class: 'joystick-codigo' },
        `izq = ${m.yy} + ${m.xx < 0 ? `(${m.xx})` : m.xx} = ${m.yy + m.xx}` + (m.izq !== m.yy + m.xx ? ` → ${m.izq} (límite)` : '') + '\n' +
        `der = ${m.yy} − ${m.xx < 0 ? `(${m.xx})` : m.xx} = ${m.yy - m.xx}` + (m.der !== m.yy - m.xx ? ` → ${m.der} (límite)` : '') + '\n' +
        `mensaje: M,${m.izq},${m.der}`));
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(60, t - ultimo) / 1000 : 0;
    ultimo = t;
    const { izq, der } = mezcla();
    if (!pocoMovimiento() && (izq || der)) {
      const vI = izq / 255; const vD = der / 255;
      const v = ((vI + vD) / 2) * 90; const giro = ((vI - vD) / 2) * 2.4;  // izquierda más rápida → gira a la derecha
      robot.ang += giro * dt;
      robot.px += Math.cos(robot.ang) * v * dt; robot.py += Math.sin(robot.ang) * v * dt;
      // Si sale de la escena, vuelve al centro
      if (robot.px < 10 || robot.px > 530 || robot.py < 10 || robot.py > 290) { robot = { px: 270, py: 150, ang: robot.ang }; traza = []; }
      traza.push(`${robot.px.toFixed(1)},${robot.py.toFixed(1)}`);
      if (traza.length > 400) traza.shift();
    }
    ruta.setAttribute('points', traza.join(' '));
    cuerpo.setAttribute('transform', `translate(${robot.px} ${robot.py}) rotate(${(robot.ang * 180) / Math.PI})`);
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  // Joystick: arrastrar (en pasos de 35) o flechas
  const ajustar = (v) => limitar(Math.round(v / PASO) * PASO, -245, 245);
  let arrastrando = false;
  const mover = (e) => {
    const caja = pad.getBoundingClientRect();
    const dx = ((e.clientX - caja.left) / caja.width) * 140 - 70; const dy = ((e.clientY - caja.top) / caja.height) * 140 - 70;
    x = ajustar((dx / 48) * 245); y = ajustar((-dy / 48) * 245); actualizar();
  };
  pad.addEventListener('pointerdown', (e) => { arrastrando = true; pad.setPointerCapture(e.pointerId); mover(e); });
  pad.addEventListener('pointermove', (e) => { if (arrastrando) mover(e); });
  pad.addEventListener('pointerup', () => { arrastrando = false; });
  pad.addEventListener('keydown', (e) => {
    const d = { ArrowUp: [0, 1], ArrowDown: [0, -1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
    if (!d) return;
    e.preventDefault(); x = ajustar(x + d[0] * PASO); y = ajustar(y + d[1] * PASO); actualizar();
  });
  botonCentro.addEventListener('click', () => { x = 0; y = 0; robot = { px: 270, py: 150, ang: -Math.PI / 2 }; traza = []; actualizar(); });
  actualizar();
  requestAnimationFrame(cuadro);
}
