// ============================================================
// Animación "lazo-cerrado": medir lo que pasa y corregir.
//   sistema="elevador" (guía 14): la cabina va del piso 1 al 3.
//     · Solo sensores de piso: la central sabe dónde está solo al pasar por un reed;
//       entre pisos no sabe nada y frena al llegar al sensor del destino.
//     · Con encoder: cuenta pulsos todo el tiempo, sabe la posición y frena
//       antes, poco a poco, para quedar en el piso.
//   sistema="robot" (guía 14): el motor derecho es un poco más débil.
//     · Lazo abierto: los dos reciben el mismo PWM.
//     · Lazo cerrado: los encoders miden cada rueda y el programa corrige el PWM.
// Los números son de una simulación sencilla.
//
// En la guía:
//   :::animacion tipo="lazo-cerrado" sistema="elevador"
//   :::
// ============================================================
import { svg, limitar } from './comun/svg.js';
import { el } from '../comun.js';

function montarElevador(contenedor) {
  let modo = 'sensores';
  let pos = 0; let vel = 0; let corriendo = false; let ultimo = 0;
  let conocida = 0;          // lo que la central "sabe"
  let pulsos = 0; let frenando = false;
  const PISOS = [0, 180, 360]; const MM_POR_PULSO = 2;

  const yDe = (mm) => 270 - mm * 0.6;
  const cabina = svg('rect', { x: 60, width: 56, height: 40, rx: 4, class: 'elev-cabina' });
  const fantasma = svg('rect', { x: 140, width: 56, height: 40, rx: 4, class: 'lazo-fantasma' });
  const signo = svg('text', { x: 168, class: 'lazo-signo', 'text-anchor': 'middle' }, '?');
  const raiz = svg('svg', { viewBox: '0 0 260 290', class: 'lazo-svg', role: 'img', 'aria-label': 'Posición real de la cabina y lo que sabe la central' },
    ...PISOS.map((mm, i) => svg('g', {},
      svg('line', { x1: 10, x2: 250, y1: yDe(mm), y2: yDe(mm), class: 'elev-piso' }),
      svg('text', { x: 10, y: yDe(mm) - 6, class: 'elev-texto' }, `Piso ${i + 1}`))),
    svg('text', { x: 88, y: 286, class: 'elev-texto', 'text-anchor': 'middle' }, 'real'),
    svg('text', { x: 168, y: 286, class: 'elev-texto', 'text-anchor': 'middle' }, 'lo que sabe la central'),
    cabina, fantasma, signo);
  const botones = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Cómo sabe la posición' },
    [['sensores', 'Solo sensores de piso'], ['encoder', 'Con encoder']].map(([k, t]) =>
      el('button', { type: 'button', class: 'anim-boton', 'data-k': k, onclick: () => { modo = k; reiniciar(); } }, t)));
  const boton = el('button', { type: 'button', class: 'boton boton-chico' }, '▶ Ir del piso 1 al 3');
  const estado = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  contenedor.append(el('div', { class: 'anim-lazo' }, raiz,
    el('div', { class: 'anim-controles' }, botones, el('div', { class: 'anim-rapidos' }, boton), estado)));

  function reiniciar() {
    pos = 0; vel = 0; corriendo = false; conocida = 0; pulsos = 0; frenando = false;
    botones.querySelectorAll('button').forEach((b) => { const a = b.dataset.k === modo; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    dibujar();
  }

  function paso(dt) {
    if (!corriendo) return;
    const s = dt / 1000;
    if (modo === 'encoder') {
      pulsos = Math.floor(pos / MM_POR_PULSO);
      conocida = pulsos * MM_POR_PULSO;
      const falta = 360 - conocida;
      const meta = falta > 80 ? 200 : Math.max(40, falta * 2.2);   // frena antes de llegar
      vel += limitar(meta - vel, -6, 6);
      if (falta <= 1) { vel = 0; corriendo = false; }
    } else {
      // Solo sabe el piso cuando pasa por un reed
      for (const mm of PISOS) if (Math.abs(pos - mm) <= 5) conocida = mm;
      if (!frenando) { vel = Math.min(200, vel + 5); if (Math.abs(pos - 360) <= 5) frenando = true; }
      else vel = Math.max(0, vel - 25);                             // frena recién al llegar: se pasa un poco
      if (frenando && vel === 0) corriendo = false;
    }
    pos += (vel / 255) * 140 * s;
  }

  function dibujar() {
    cabina.setAttribute('y', yDe(pos) - 40);
    const sabeExacto = modo === 'encoder' || PISOS.some((mm) => Math.abs(pos - mm) <= 5);
    fantasma.setAttribute('y', yDe(conocida) - 40);
    fantasma.classList.toggle('dudosa', !sabeExacto);
    signo.setAttribute('y', yDe(conocida) - 14);
    signo.textContent = sabeExacto ? '' : '?';
    estado.textContent = modo === 'encoder'
      ? `pulsos = ${pulsos}\nposición = pulsos × ${MM_POR_PULSO} mm = ${Math.round(conocida)} mm\nvel = ${Math.round(vel)}`
      : `último piso detectado = ${PISOS.indexOf(conocida) + 1}\n${sabeExacto ? 'el reed está cerrado' : 'entre pisos: la central no sabe dónde está'}\nvel = ${Math.round(vel)}`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(60, t - ultimo) : 0;
    ultimo = t;
    for (let i = 0; i < 3; i++) paso(dt / 3);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  boton.addEventListener('click', () => { reiniciar(); corriendo = true; });
  reiniciar();
  requestAnimationFrame(cuadro);
}

function montarRobot(contenedor) {
  let modo = 'abierto';
  let robot = { x: 60, y: 150, ang: 0 };
  let pwmIzq = 180; let pwmDer = 180; let traza = []; let corriendo = false; let ultimo = 0;
  const DEBIL = 0.8;            // el motor derecho rinde 80 %
  const PEDIDA = 180;

  const ruta = svg('polyline', { class: 'lazo-ruta' });
  const cuerpo = svg('g', {}, svg('rect', { x: -16, y: -12, width: 32, height: 24, rx: 5, class: 'lazo-robot' }),
    svg('rect', { x: -12, y: -16, width: 14, height: 5, class: 'lazo-rueda' }), svg('rect', { x: -12, y: 11, width: 14, height: 5, class: 'lazo-rueda' }),
    svg('path', { d: 'M 10 -5 L 16 0 L 10 5 Z', class: 'lazo-frente' }));
  const raiz = svg('svg', { viewBox: '0 0 540 300', class: 'lazo-svg', role: 'img', 'aria-label': 'Robot visto desde arriba avanzando' },
    svg('line', { x1: 40, x2: 520, y1: 150, y2: 150, class: 'grafica-referencia' }),
    svg('text', { x: 520, y: 142, class: 'elev-texto', 'text-anchor': 'end' }, 'recto'),
    ruta, cuerpo);
  const botones = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Tipo de control' },
    [['abierto', 'Lazo abierto'], ['cerrado', 'Lazo cerrado (encoders)']].map(([k, t]) =>
      el('button', { type: 'button', class: 'anim-boton', 'data-k': k, onclick: () => { modo = k; reiniciar(); } }, t)));
  const boton = el('button', { type: 'button', class: 'boton boton-chico' }, '▶ Avanzar');
  const estado = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  contenedor.append(el('div', { class: 'anim-lazo robot' }, raiz,
    el('div', { class: 'anim-controles' }, botones, el('div', { class: 'anim-rapidos' }, boton), estado,
      el('p', { class: 'texto-ayuda' }, 'En esta simulación el motor derecho es un poco más débil que el izquierdo.'))));

  function reiniciar() {
    robot = { x: 60, y: 150, ang: 0 }; pwmIzq = PEDIDA; pwmDer = PEDIDA; traza = []; corriendo = false;
    botones.querySelectorAll('button').forEach((b) => { const a = b.dataset.k === modo; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    dibujar();
  }
  function paso(dt) {
    if (!corriendo) return;
    const s = dt / 1000;
    const vIzq = pwmIzq / 255; const vDer = (pwmDer / 255) * DEBIL;   // lo que miden los encoders
    if (modo === 'cerrado') {
      // Corrige: si una rueda va más lenta, le sube el PWM a esa y le baja a la otra
      const error = vIzq - vDer;
      pwmDer = limitar(pwmDer + error * 300 * s * 10, 0, 255);
      pwmIzq = limitar(pwmIzq - error * 100 * s * 10, 0, 255);
    }
    const v = (vIzq + vDer) / 2 * 120; const giro = (vIzq - vDer) * 1.6;   // si la izquierda va más rápido, gira a la derecha
    robot.ang += giro * s; robot.x += Math.cos(robot.ang) * v * s; robot.y += Math.sin(robot.ang) * v * s;
    traza.push(`${robot.x.toFixed(1)},${robot.y.toFixed(1)}`);
    if (robot.x > 510 || robot.y < 10 || robot.y > 290) corriendo = false;
    estado.textContent =
      `Encoder izq: ${(vIzq * 100).toFixed(0)} %   Encoder der: ${(vDer * 100).toFixed(0)} %\n` +
      `PWM izq = ${Math.round(pwmIzq)}   PWM der = ${Math.round(pwmDer)}` +
      (modo === 'abierto' ? '\n(el PWM no cambia: nadie mide)' : '\n(el programa corrige con lo que miden los encoders)');
  }
  function dibujar() {
    ruta.setAttribute('points', traza.join(' '));
    cuerpo.setAttribute('transform', `translate(${robot.x} ${robot.y}) rotate(${(robot.ang * 180) / Math.PI})`);
  }
  function cuadro(t) {
    const dt = ultimo ? Math.min(60, t - ultimo) : 0;
    ultimo = t;
    for (let i = 0; i < 3; i++) paso(dt / 3);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  boton.addEventListener('click', () => { reiniciar(); corriendo = true; });
  reiniciar();
  estado.textContent = 'Toca "Avanzar".';
  requestAnimationFrame(cuadro);
}

export default function montar(contenedor, config) {
  if (config.sistema === 'robot') montarRobot(contenedor);
  else montarElevador(contenedor);
}
