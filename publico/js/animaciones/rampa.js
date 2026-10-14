// ============================================================
// Animación "rampa": la velocidad cambia poco a poco, no de golpe.
//   sistema="elevador" (guía 8): viaje del piso 1 al 3. Arranca con vel += 5 y,
//     al pasar el piso anterior al destino, baja hacia VEL_LLEGADA. Gráfica de
//     velocidad contra altura (sin dar el error de parada ni el tiempo: eso se mide).
//   sistema="robot" (guía 8): la velocidad real se acerca a la pedida PASO por PASO
//     cada 20 ms. Gráfica de velocidad pedida y real contra el tiempo, y el pico
//     de corriente que pide cada cambio brusco (aproximado).
//
// En la guía:
//   :::animacion tipo="rampa" sistema="elevador"
//   :::
// Opciones: sistema · velmax (200) · llegada (90, elevador) · paso (15, robot)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const X0 = 50; const X1 = 520; const Y0 = 20; const Y1 = 200;

function montarElevador(contenedor, config) {
  const VEL_MAX = limitar(Math.round(numero(config.velmax, 200)), 60, 255);
  let llegada = limitar(Math.round(numero(config.llegada, 90)), 20, VEL_MAX);
  let anim = null; let ultimo = 0;

  // Simula el viaje 1 → 3 (pisos a 0, 180 y 360 mm) en pasos de 20 ms
  function simular(velLlegada) {
    const puntos = []; let pos = 0; let vel = 0; let pisoActual = 0; const destino = 2;
    for (let n = 0; n < 2000 && pos < 360; n++) {
      if (Math.abs(pos - 180) <= 5) pisoActual = 1;
      const cerca = Math.abs(pisoActual - destino) === 1;
      const meta = cerca ? velLlegada : VEL_MAX;
      if (vel < meta) vel += 5;
      if (vel > meta) vel -= 5;
      pos += (vel / 255) * 140 * 0.02;
      puntos.push({ pos: Math.min(pos, 360), vel });
    }
    return puntos;
  }

  const yDe = (v) => Y1 - (v / 255) * (Y1 - Y0);
  const xDe = (mm) => X0 + (mm / 360) * (X1 - X0);
  const lineaSin = svg('polyline', { class: 'suave-directo' });
  const linea = svg('polyline', { class: 'grafica-linea' });
  const cursor = svg('circle', { r: 6, class: 'grafica-marca' });
  const raiz = svg('svg', { viewBox: '0 0 560 240', class: 'grafica-svg', role: 'img', 'aria-label': 'Velocidad del motor contra la altura de la cabina' },
    ...[0, 100, 200].map((v) => svg('g', {}, svg('line', { x1: X0, x2: X1, y1: yDe(v), y2: yDe(v), class: v ? 'grafica-reja' : 'grafica-base' }),
      svg('text', { x: X0 - 6, y: yDe(v) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, String(v)))),
    ...[0, 180, 360].map((mm, i) => svg('g', {}, svg('line', { x1: xDe(mm), x2: xDe(mm), y1: Y0, y2: Y1, class: 'grafica-referencia' }),
      svg('text', { x: xDe(mm), y: 222, class: 'grafica-numero', 'text-anchor': 'middle' }, `Piso ${i + 1}`))),
    svg('text', { x: 8, y: 14, class: 'grafica-numero' }, 'vel (PWM)'),
    lineaSin, linea, cursor);
  const leyenda = el('p', { class: 'suave-leyenda' }, el('span', { class: 'suave-muestra directo' }), ' sin frenado (siempre VEL_MAX)  ', el('span', { class: 'suave-muestra suave' }), ' con VEL_LLEGADA');
  const rLlegada = el('input', { type: 'range', class: 'anim-deslizador', min: 20, max: VEL_MAX, step: 10, value: llegada, 'aria-label': 'VEL_LLEGADA' });
  const vLlegada = el('strong');
  const boton = el('button', { type: 'button', class: 'boton boton-chico' }, '▶ Viajar del piso 1 al 3');
  const codigo = el('pre', { class: 'joystick-codigo' });
  contenedor.append(el('div', { class: 'anim-rampa' },
    el('div', {}, raiz, leyenda),
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'VEL_LLEGADA = ', vLlegada, rLlegada),
      el('div', { class: 'anim-rapidos' }, boton), codigo)));

  function dibujar() {
    const con = simular(llegada); const sin = simular(VEL_MAX);
    linea.setAttribute('points', con.map((p) => `${xDe(p.pos)},${yDe(p.vel)}`).join(' '));
    lineaSin.setAttribute('points', sin.map((p) => `${xDe(p.pos)},${yDe(p.vel)}`).join(' '));
    vLlegada.textContent = String(llegada);
    const p = anim ? con[Math.min(con.length - 1, Math.floor(anim.t / 20))] : null;
    cursor.style.display = p ? '' : 'none';
    if (p) { cursor.setAttribute('cx', xDe(p.pos)); cursor.setAttribute('cy', yDe(p.vel)); }
    codigo.textContent =
      `const int VEL_LLEGADA = ${llegada};\n` +
      `velMeta = cerca ? VEL_LLEGADA : VEL_MAX;\nif (vel < velMeta) vel += 5;\nif (vel > velMeta) vel -= 5;` +
      (p ? `\n\n// altura ${Math.round(p.pos)} mm · vel = ${p.vel}` : '');
  }
  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (anim) { anim.t += dt; if (anim.t / 20 > simular(llegada).length + 25) anim = null; dibujar(); }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  rLlegada.addEventListener('input', () => { llegada = Number(rLlegada.value); dibujar(); });
  boton.addEventListener('click', () => { anim = { t: 0 }; });
  dibujar();
  requestAnimationFrame(cuadro);
}

function montarRobot(contenedor, config) {
  let paso = limitar(Math.round(numero(config.paso, 15)), 1, 255);
  let pedida = 0; let real = 0;
  let historia = []; let ultimo = 0; let acumulado = 0;
  const VENTANA = 150; // vueltas visibles (3 s)

  const yDe = (v) => (Y0 + Y1) / 2 - (v / 255) * ((Y1 - Y0) / 2);
  const xDe = (i) => X0 + (i / (VENTANA - 1)) * (X1 - X0);
  const lineaPedida = svg('polyline', { class: 'suave-meta' });
  const lineaReal = svg('polyline', { class: 'grafica-linea' });
  const lineaCorriente = svg('polyline', { class: 'rampa-corriente' });
  const raiz = svg('svg', { viewBox: '0 0 560 240', class: 'grafica-svg', role: 'img', 'aria-label': 'Velocidad pedida y real del motor' },
    ...[-255, 0, 255].map((v) => svg('g', {}, svg('line', { x1: X0, x2: X1, y1: yDe(v), y2: yDe(v), class: v ? 'grafica-reja' : 'grafica-base' }),
      svg('text', { x: X0 - 6, y: yDe(v) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, String(v)))),
    svg('text', { x: X1, y: 226, class: 'grafica-numero', 'text-anchor': 'end' }, 'tiempo →'),
    lineaCorriente, lineaPedida, lineaReal);
  const leyenda = el('p', { class: 'suave-leyenda' }, el('span', { class: 'suave-muestra meta' }), ' pedida (mando)  ', el('span', { class: 'suave-muestra suave' }), ' real (motor)  ', el('span', { class: 'suave-muestra rampa-c' }), ' pico de corriente (aprox.)');
  const rPaso = el('input', { type: 'range', class: 'anim-deslizador', min: 1, max: 255, step: 1, value: paso, 'aria-label': 'PASO' });
  const vPaso = el('strong');
  const botones = el('div', { class: 'anim-rapidos' },
    ...[['Adelante a fondo', 255], ['Parar', 0], ['Atrás a fondo', -255], ['Adelante a media', 128]].map(([t, v]) =>
      el('button', { type: 'button', class: 'anim-boton', onclick: () => { pedida = v; } }, t)));
  const codigo = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  contenedor.append(el('div', { class: 'anim-rampa' },
    el('div', {}, raiz, leyenda),
    el('div', { class: 'anim-controles' },
      el('p', { class: 'anim-etiqueta' }, 'El mando pide:'), botones,
      el('label', { class: 'anim-etiqueta' }, 'PASO = ', vPaso, ' (255 = sin rampa)', rPaso), codigo)));

  const acercar = (actual, meta) => (actual < meta ? Math.min(actual + paso, meta) : actual > meta ? Math.max(actual - paso, meta) : actual);
  function vuelta() {
    const antes = real;
    real = acercar(real, pedida);
    const pico = Math.abs(real - antes) / 255;      // cambio brusco = más corriente
    historia.push({ pedida, real, pico });
    if (historia.length > VENTANA) historia.shift();
  }
  function dibujar() {
    lineaPedida.setAttribute('points', historia.map((h, i) => `${xDe(i)},${yDe(h.pedida)}`).join(' '));
    lineaReal.setAttribute('points', historia.map((h, i) => `${xDe(i)},${yDe(h.real)}`).join(' '));
    lineaCorriente.setAttribute('points', historia.map((h, i) => `${xDe(i)},${yDe(h.pico * 255)}`).join(' '));
    vPaso.textContent = String(paso);
    codigo.textContent = `pedida = ${pedida};\nvelIzq = acercar(velIzq, pedida);   // ${real}\n// cada 20 ms cambia como mucho ${paso}`;
  }
  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; acumulado += dt;
    while (acumulado >= 20) { acumulado -= 20; vuelta(); }
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  rPaso.addEventListener('input', () => { paso = Number(rPaso.value); });
  for (let i = 0; i < VENTANA; i++) historia.push({ pedida: 0, real: 0, pico: 0 });
  dibujar();
  requestAnimationFrame(cuadro);
}

export default function montar(contenedor, config) {
  if (config.sistema === 'robot') montarRobot(contenedor, config);
  else montarElevador(contenedor, config);
}
