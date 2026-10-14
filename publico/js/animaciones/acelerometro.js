// ============================================================
// Animación "acelerometro": cómo sabe el MPU6050 hacia dónde lo inclinas.
// La gravedad siempre jala hacia abajo (9,8 m/s²). Al inclinar el módulo,
// una parte de esa fuerza cae sobre su eje X o su eje Y: eso es lo que mide
// a.acceleration.x / .y / .z. Se inclina con deslizadores o arrastrando el módulo.
// No muestra el ángulo de los servos (la guía 14 lo pide en una tabla).
//
// En la guía:
//   :::animacion tipo="acelerometro"
//   :::
// Opciones: ninguna.
// ============================================================
import { svg, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const G = 9.8;
const coma = (n) => n.toFixed(2).replace('.', ',').replace(/^-0,00$/, '0,00');

export default function montar(contenedor) {
  let incX = 0; let incY = 0; // grados (-90 a 90)

  // Módulo visto desde arriba, que se inclina con CSS 3D
  const flechaX = svg('line', { x1: 110, y1: 110, y2: 110, class: 'acel-flecha x' });
  const flechaY = svg('line', { x1: 110, y1: 110, x2: 110, class: 'acel-flecha y' });
  const puntaX = svg('path', { class: 'acel-punta x' });
  const puntaY = svg('path', { class: 'acel-punta y' });
  const modulo = svg('svg', { viewBox: '0 0 220 220', class: 'acel-modulo', role: 'img', 'aria-label': 'Módulo MPU6050 visto desde arriba' },
    svg('rect', { x: 30, y: 40, width: 160, height: 140, rx: 10, class: 'acel-placa' }),
    svg('rect', { x: 92, y: 92, width: 36, height: 36, rx: 3, class: 'acel-chip' }),
    svg('text', { x: 110, y: 64, class: 'acel-texto', 'text-anchor': 'middle' }, 'MPU6050'),
    ...['VCC', 'GND', 'SCL', 'SDA'].map((t, i) => svg('g', {}, svg('circle', { cx: 56 + i * 36, cy: 166, r: 5, class: 'acel-pin' }), svg('text', { x: 56 + i * 36, y: 158, class: 'acel-pin-texto', 'text-anchor': 'middle' }, t))),
    // Ejes dibujados en la placa
    svg('line', { x1: 150, y1: 84, x2: 178, y2: 84, class: 'acel-eje x' }), svg('text', { x: 180, y: 80, class: 'acel-eje-texto x' }, 'X'),
    svg('line', { x1: 150, y1: 84, x2: 150, y2: 56, class: 'acel-eje y' }), svg('text', { x: 154, y: 56, class: 'acel-eje-texto y' }, 'Y'),
    flechaX, flechaY, puntaX, puntaY);
  const inclinado = el('div', { class: 'acel-inclinado' }, modulo);

  // Vista de lado: la gravedad y su parte sobre el eje X
  const lado = svg('g', {});
  const vistaLado = svg('svg', { viewBox: '0 0 220 150', class: 'acel-lado', role: 'img', 'aria-label': 'Vista de lado: la gravedad y la parte que cae sobre el eje X' }, lado);

  const rango = (texto) => el('input', { type: 'range', class: 'anim-deslizador', min: -90, max: 90, step: 1, value: 0, 'aria-label': texto });
  const rX = rango('Inclinar hacia los lados (eje X)');
  const rY = rango('Inclinar hacia adelante y atrás (eje Y)');
  const vX = el('strong'); const vY = el('strong');
  const lecturas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  const botonPlano = el('button', { type: 'button', class: 'anim-boton' }, 'Dejarlo plano en la mesa');

  contenedor.append(el('div', { class: 'anim-acel' },
    el('div', { class: 'acel-escena' }, inclinado, vistaLado),
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Inclinar a los lados (X): ', vX, rX),
      el('label', { class: 'anim-etiqueta' }, 'Inclinar adelante / atrás (Y): ', vY, rY),
      el('div', { class: 'anim-rapidos' }, botonPlano),
      lecturas,
      el('p', { class: 'texto-ayuda' }, 'Flechas: la parte de la gravedad que el sensor siente en cada eje.'))));

  function actualizar() {
    const ax = G * Math.sin((incX * Math.PI) / 180);
    const ay = G * Math.sin((incY * Math.PI) / 180);
    const az = G * Math.cos((incX * Math.PI) / 180) * Math.cos((incY * Math.PI) / 180);
    const k = pocoMovimiento() ? 0.5 : 0.6;
    inclinado.style.transform = `perspective(700px) rotateY(${incX * k}deg) rotateX(${incY * k}deg)`;
    // Flechas en la placa (largo según lo que mide cada eje)
    const fx = 110 + (ax / G) * 70; const fy = 110 - (ay / G) * 70;
    flechaX.setAttribute('x2', fx); flechaY.setAttribute('y2', fy);
    const punta = (x, y, dx, dy) => (Math.abs(dx) + Math.abs(dy) < 4 ? '' : `M ${x} ${y} l ${-dx * 8 - dy * 5} ${-dy * 8 + dx * 5} l ${dy * 10} ${-dx * 10} z`);
    puntaX.setAttribute('d', punta(fx, 110, Math.sign(ax), 0));
    puntaY.setAttribute('d', punta(110, fy, 0, -Math.sign(ay)));
    // Vista de lado (solo el eje X)
    const a = (incX * Math.PI) / 180;
    const cx = 110; const cy = 78;
    const p1 = { x: cx - Math.cos(a) * 80, y: cy + Math.sin(a) * 80 }; const p2 = { x: cx + Math.cos(a) * 80, y: cy - Math.sin(a) * 80 };
    const parte = (ax / G) * 50;
    lado.replaceChildren(
      svg('line', { x1: 10, x2: 210, y1: 140, y2: 140, class: 'grafica-base' }),
      svg('line', { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, class: 'acel-tabla-lado' }),
      svg('line', { x1: cx, y1: cy, x2: cx, y2: cy + 50, class: 'acel-gravedad' }),
      svg('text', { x: cx + 6, y: cy + 56, class: 'acel-texto-lado' }, 'gravedad'),
      svg('line', { x1: cx, y1: cy, x2: cx + Math.cos(a) * parte, y2: cy - Math.sin(a) * parte, class: 'acel-flecha x' }),
      svg('text', { x: 10, y: 16, class: 'acel-texto-lado' }, 'Vista de lado'));
    vX.textContent = `${incX}°`; vY.textContent = `${incY}°`;
    lecturas.textContent =
      `a.acceleration.x = ${coma(ax)}\n` +
      `a.acceleration.y = ${coma(ay)}\n` +
      `a.acceleration.z = ${coma(az)}   (m/s²)`;
  }

  rX.addEventListener('input', () => { incX = Number(rX.value); actualizar(); });
  rY.addEventListener('input', () => { incY = Number(rY.value); actualizar(); });
  botonPlano.addEventListener('click', () => { incX = 0; incY = 0; rX.value = 0; rY.value = 0; actualizar(); });

  // Arrastrar el módulo para inclinarlo
  let arrastre = null;
  modulo.addEventListener('pointerdown', (e) => { arrastre = { x: e.clientX, y: e.clientY, ix: incX, iy: incY }; modulo.setPointerCapture(e.pointerId); });
  modulo.addEventListener('pointermove', (e) => {
    if (!arrastre) return;
    incX = Math.round(limitar(arrastre.ix + (e.clientX - arrastre.x) * 0.6, -90, 90));
    incY = Math.round(limitar(arrastre.iy - (e.clientY - arrastre.y) * 0.6, -90, 90));
    rX.value = incX; rY.value = incY; actualizar();
  });
  modulo.addEventListener('pointerup', () => { arrastre = null; });
  actualizar();
}
