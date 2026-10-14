// ============================================================
// Animación "temporizador": la luz con millis() y el operador %.
// millis() crece sin parar; t = millis() % ciclo va de 0 a ciclo − 1 y vuelve
// a empezar, como la aguja de un reloj. Si t < LUZ_ON la luz se enciende.
//
// En la guía:
//   :::animacion tipo="temporizador"
//   :::
// Opciones (todas opcionales, en milisegundos): luzon (60000) · luzoff (60000)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const X0 = 20; const X1 = 540;
const miles = (n) => Math.floor(n).toLocaleString('es');

export default function montar(contenedor, config) {
  let luzOn = limitar(numero(config.luzon, 60000), 1000, 3600000);
  let luzOff = limitar(numero(config.luzoff, 60000), 1000, 3600000);
  let millis = 0;
  let velocidad = 10;
  let corriendo = true;
  let ultimo = 0;

  // ---------- Barra del ciclo ----------
  const raiz = svg('svg', { viewBox: '0 0 560 120', class: 'temp-svg', role: 'img', 'aria-label': 'Ciclo de la luz: tramo encendido y tramo apagado' });
  const tramoOn = svg('rect', { x: X0, y: 34, height: 34, rx: 6, class: 'temp-on' });
  const tramoOff = svg('rect', { y: 34, height: 34, rx: 6, class: 'temp-off' });
  const textoOn = svg('text', { y: 56, class: 'temp-tramo-texto', 'text-anchor': 'middle' });
  const textoOff = svg('text', { y: 56, class: 'temp-tramo-texto temp-tramo-off', 'text-anchor': 'middle' });
  const aguja = svg('g', {}, svg('line', { x1: 0, x2: 0, y1: 24, y2: 78, class: 'temp-aguja' }), svg('path', { d: 'M -7 18 L 7 18 L 0 28 Z', class: 'temp-aguja-punta' }));
  const marcaFin = svg('text', { x: X1, y: 98, class: 'grafica-numero', 'text-anchor': 'end' });
  raiz.append(tramoOn, tramoOff, textoOn, textoOff, aguja,
    svg('text', { x: X0, y: 98, class: 'grafica-numero' }, 't = 0'), marcaFin);

  // ---------- Luz ----------
  const foco = svg('svg', { viewBox: '0 0 80 80', class: 'temp-foco', role: 'img', 'aria-label': 'Luz de crecimiento' },
    svg('circle', { cx: 40, cy: 36, r: 22, class: 'temp-foco-luz' }),
    svg('rect', { x: 30, y: 58, width: 20, height: 12, rx: 3, class: 'temp-foco-base' }));

  // ---------- Panel ----------
  const cuentas = el('pre', { class: 'joystick-codigo temp-cuentas', 'aria-live': 'off' });
  const entradaOn = el('input', { type: 'number', min: 1, max: 3600, step: 1, value: luzOn / 1000, class: 'temp-entrada', 'aria-label': 'LUZ_ON en segundos' });
  const entradaOff = el('input', { type: 'number', min: 1, max: 3600, step: 1, value: luzOff / 1000, class: 'temp-entrada', 'aria-label': 'LUZ_OFF en segundos' });
  const botonesVel = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Velocidad del reloj' },
    [1, 10, 60].map((v) => el('button', { type: 'button', class: 'anim-boton', 'data-vel': v, onclick: () => { velocidad = v; marcar(); } }, `× ${v}`)));
  const botonPausa = el('button', { type: 'button', class: 'anim-boton', onclick: () => { corriendo = !corriendo; marcar(); } });
  const botonCero = el('button', { type: 'button', class: 'anim-boton', onclick: () => { millis = 0; dibujar(); } }, '↺ millis() = 0');

  contenedor.append(el('div', { class: 'anim-temporizador' },
    el('div', { class: 'temp-arriba' }, foco, raiz),
    cuentas,
    el('div', { class: 'temp-ajustes' },
      el('label', { class: 'anim-etiqueta' }, 'LUZ_ON (segundos) ', entradaOn),
      el('label', { class: 'anim-etiqueta' }, 'LUZ_OFF (segundos) ', entradaOff)),
    el('p', { class: 'anim-etiqueta' }, 'Velocidad del reloj'),
    botonesVel,
    el('div', { class: 'anim-rapidos' }, botonPausa, botonCero)));

  function marcar() {
    botonesVel.querySelectorAll('button').forEach((b) => { const a = Number(b.dataset.vel) === velocidad; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    botonPausa.textContent = corriendo ? '⏸ Pausa' : '▶ Seguir';
  }

  function dibujar() {
    const ciclo = luzOn + luzOff;
    const t = millis % ciclo;
    const encendida = t < luzOn;
    const xOn = X0 + (luzOn / ciclo) * (X1 - X0);
    tramoOn.setAttribute('width', xOn - X0);
    tramoOff.setAttribute('x', xOn); tramoOff.setAttribute('width', X1 - xOn);
    textoOn.setAttribute('x', (X0 + xOn) / 2); textoOn.textContent = `encendida (${luzOn / 1000} s)`;
    textoOff.setAttribute('x', (xOn + X1) / 2); textoOff.textContent = `apagada (${luzOff / 1000} s)`;
    aguja.setAttribute('transform', `translate(${X0 + (t / ciclo) * (X1 - X0)} 0)`);
    marcaFin.textContent = `ciclo = ${miles(ciclo)}`;
    foco.classList.toggle('encendida', encendida);
    cuentas.textContent =
      `millis()  = ${miles(millis)}\n` +
      `ciclo     = ${miles(luzOn)} + ${miles(luzOff)} = ${miles(ciclo)}\n` +
      `t = ${miles(millis)} % ${miles(ciclo)} = ${miles(t)}\n` +
      `if (t < ${miles(luzOn)})  →  digitalWrite(LUZ, ${encendida ? 'HIGH' : 'LOW'});`;
  }

  function cambiar() {
    luzOn = limitar(Number(entradaOn.value) || 1, 1, 3600) * 1000;
    luzOff = limitar(Number(entradaOff.value) || 1, 1, 3600) * 1000;
    dibujar();
  }
  entradaOn.addEventListener('change', cambiar);
  entradaOff.addEventListener('change', cambiar);

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(250, tiempo - ultimo) : 0;
    ultimo = tiempo;
    if (corriendo) millis += dt * velocidad;
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  marcar();
  dibujar();
  requestAnimationFrame(cuadro);
}
