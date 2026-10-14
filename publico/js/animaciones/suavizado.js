// ============================================================
// Animación "suavizado": angX += (metaX − angX) × SUAVE.
// En cada vuelta del loop el servo avanza solo una parte de lo que le falta.
// Se mueve el joystick (izquierda, centro o derecha) y se compara en una
// gráfica el servo directo (SUAVE = 1) con el suavizado.
// Las metas son las del joystick al tope (CENTRO ± INCLINACION), así que no
// resuelve la pregunta de la guía (90° → 100°).
//
// En la guía:
//   :::animacion tipo="suavizado"
//   :::
// Opciones (todas opcionales): centro (90) · inclinacion (15) · suave (0.2)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { crearServoSVG } from './comun/servo-svg.js';
import { el } from '../comun.js';

const VUELTAS = 60;              // vueltas que caben en la gráfica
const CADA = 60;                 // ms reales por vuelta (el loop usa delay(20): aquí va 3 veces más lento)
const X0 = 46; const X1 = 470; const Y0 = 16; const Y1 = 186;
const OPCIONES = [1, 0.5, 0.2, 0.05];

export default function montar(contenedor, config) {
  const CENTRO = limitar(Math.round(numero(config.centro, 90)), 60, 120);
  const INCL = limitar(Math.round(numero(config.inclinacion, 15)), 5, 30);
  let suave = limitar(numero(config.suave, 0.2), 0.01, 1);
  let meta = CENTRO;
  let angulo = CENTRO; let directo = CENTRO;
  let historia = [{ meta, angulo, directo }];
  let ultimo = 0; let acumulado = 0; let vueltas = 0;

  const AMIN = CENTRO - INCL - 3; const AMAX = CENTRO + INCL + 3;
  const yDe = (a) => Y1 - ((a - AMIN) / (AMAX - AMIN)) * (Y1 - Y0);
  const xDe = (i) => X0 + (i / (VUELTAS - 1)) * (X1 - X0);
  const reja = svg('g', {});
  [CENTRO - INCL, CENTRO, CENTRO + INCL].forEach((a) => reja.append(
    svg('line', { x1: X0, x2: X1, y1: yDe(a), y2: yDe(a), class: 'grafica-reja' }),
    svg('text', { x: X0 - 8, y: yDe(a) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, `${a}°`)));
  const lineaMeta = svg('polyline', { class: 'suave-meta' });
  const lineaDirecta = svg('polyline', { class: 'suave-directo' });
  const lineaSuave = svg('polyline', { class: 'grafica-linea' });
  const raiz = svg('svg', { viewBox: '0 0 520 214', class: 'grafica-svg', role: 'img', 'aria-label': 'Gráfica del ángulo del servo en cada vuelta del loop' },
    reja, svg('line', { x1: X0, x2: X1, y1: Y1, y2: Y1, class: 'grafica-base' }),
    svg('text', { x: X1, y: 208, class: 'grafica-numero', 'text-anchor': 'end' }, 'vueltas del loop →'),
    lineaMeta, lineaDirecta, lineaSuave);
  const leyenda = el('p', { class: 'suave-leyenda' },
    el('span', { class: 'suave-muestra meta' }), ' metaX (joystick)  ',
    el('span', { class: 'suave-muestra directo' }), ' directo (SUAVE = 1)  ',
    el('span', { class: 'suave-muestra suave' }), ' angX suavizado');

  const servoDirecto = crearServoSVG({ inicial: CENTRO, etiqueta: 'Directo' });
  const servoSuave = crearServoSVG({ inicial: CENTRO, etiqueta: 'Suave' });
  const botonesMeta = el('div', { class: 'anim-rapidos', role: 'group', 'aria-label': 'Joystick' },
    [['⬅ Izquierda', -1], ['● Centro', 0], ['Derecha ➡', 1]].map(([t, s]) =>
      el('button', { type: 'button', class: 'anim-boton', 'data-s': s, onclick: () => { meta = CENTRO + s * INCL; marcar(); } }, t)));
  const botonesSuave = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Valor de SUAVE' },
    OPCIONES.map((v) => el('button', { type: 'button', class: 'anim-boton', 'data-v': v, onclick: () => { suave = v; marcar(); } }, `SUAVE = ${String(v).replace('.', ',')}`)));
  const codigo = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });

  contenedor.append(el('div', { class: 'anim-suavizado' },
    el('div', {}, raiz, leyenda),
    el('div', { class: 'anim-controles' },
      el('p', { class: 'anim-etiqueta' }, 'Mueve el joystick'), botonesMeta,
      botonesSuave,
      el('div', { class: 'suave-servos' }, servoDirecto.elemento, servoSuave.elemento),
      codigo,
      el('p', { class: 'texto-ayuda' }, 'En cámara lenta: cada vuelta del loop dura 20 ms de verdad.'))));

  function marcar() {
    botonesSuave.querySelectorAll('button').forEach((b) => { const a = Number(b.dataset.v) === suave; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    botonesMeta.querySelectorAll('button').forEach((b) => b.classList.toggle('activo', CENTRO + Number(b.dataset.s) * INCL === meta));
  }

  function vuelta() {
    vueltas++;
    directo = meta;
    angulo += (meta - angulo) * suave;
    historia.push({ meta, angulo, directo });
    if (historia.length > VUELTAS) historia.shift();
  }

  function dibujar() {
    const pts = (k) => historia.map((h, i) => `${xDe(i)},${yDe(h[k])}`).join(' ');
    lineaMeta.setAttribute('points', pts('meta'));
    lineaDirecta.setAttribute('points', pts('directo'));
    lineaSuave.setAttribute('points', pts('angulo'));
    servoDirecto.ponerAngulo(Math.round(directo));
    servoSuave.ponerAngulo(Math.round(angulo));
    codigo.textContent =
      `metaX = ${meta};\n` +
      `angX += (metaX - angX) * ${String(suave)};\n` +
      `// ahora angX = ${angulo.toFixed(1)}   (vuelta ${vueltas})`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; acumulado += dt;
    let cambio = false;
    while (acumulado >= CADA) { acumulado -= CADA; vuelta(); cambio = true; }
    if (cambio) dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  marcar();
  dibujar();
  requestAnimationFrame(cuadro);
}
