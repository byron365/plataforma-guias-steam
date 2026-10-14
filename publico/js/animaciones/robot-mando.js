// ============================================================
// Animación "robot-mando": el robot y su mando, como en los dos .ino del proyecto.
//   Mando: lee el joystick, hace la mezcla (izq = avance + giro, der = avance − giro)
//          y envía "M,izq,der" por Bluetooth; muestra la telemetría en su OLED.
//   Robot: mueve los dos motores; si deja de recibir mensajes (TIMEOUT), se detiene;
//          envía "T,bat,dist" con la batería y la distancia del HC-SR04.
// La pista se ve desde arriba. La batería se gasta rápido para que se vea el aviso.
//
// En la guía:
//   :::animacion tipo="robot-mando"
//   :::
// Opciones (todas opcionales): timeout (500 ms)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

const ANCHO = 540; const ALTO = 320;
const CAJAS = [[300, 60, 60, 60], [120, 200, 80, 40]];   // obstáculos [x, y, ancho, alto]

export default function montar(contenedor, config) {
  const TIMEOUT = limitar(Math.round(numero(config.timeout, 500)), 100, 3000);
  let jx = 0; let jy = 0;                 // palanca (-1 a 1)
  let mandoEncendido = true;
  let robot = { x: 90, y: 90, ang: 0, izq: 0, der: 0 };
  let bat = 8.2; let ultimoMensaje = 0; let reloj = 0; let ultimo = 0;
  let proxEnvio = 0; let proxTele = 0; let registro = []; let detenidoPorTimeout = false;
  const pantalla = crearOLED({ escala: 2 });

  // ---------- Pista ----------
  const rayo = svg('line', { class: 'robot-rayo' });
  const cuerpo = svg('g', {}, svg('rect', { x: -18, y: -14, width: 36, height: 28, rx: 6, class: 'lazo-robot' }),
    svg('rect', { x: -12, y: -19, width: 24, height: 6, rx: 2, class: 'lazo-rueda' }), svg('rect', { x: -12, y: 13, width: 24, height: 6, rx: 2, class: 'lazo-rueda' }),
    svg('rect', { x: 14, y: -8, width: 6, height: 16, rx: 2, class: 'robot-sensor' }));
  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} ${ALTO}`, class: 'lazo-svg', role: 'img', 'aria-label': 'Pista vista desde arriba con el robot y obstáculos' },
    svg('rect', { x: 4, y: 4, width: ANCHO - 8, height: ALTO - 8, rx: 8, class: 'robot-pista' }),
    ...CAJAS.map(([x, y, w, h]) => svg('rect', { x, y, width: w, height: h, rx: 4, class: 'robot-caja' })),
    rayo, cuerpo);

  // ---------- Mando ----------
  const palanca = svg('circle', { r: 16, class: 'joystick-bola' });
  const pad = svg('svg', { viewBox: '0 0 140 140', class: 'lab-pad', tabindex: '0', role: 'application', 'aria-label': 'Joystick del mando: arrástralo o usa las flechas' },
    svg('circle', { cx: 70, cy: 70, r: 64, class: 'joystick-base' }),
    svg('line', { x1: 14, y1: 70, x2: 126, y2: 70, class: 'joystick-cruz' }),
    svg('line', { x1: 70, y1: 14, x2: 70, y2: 126, class: 'joystick-cruz' }), palanca);
  const botonMando = el('button', { type: 'button', class: 'anim-boton' });
  const botonCargar = el('button', { type: 'button', class: 'anim-boton' }, '🔋 Cargar la batería');
  const mensajes = el('pre', { class: 'disp-monitor', 'aria-live': 'off', 'aria-label': 'Mensajes por Bluetooth' });
  const estado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-robotmando' },
    el('div', {}, raiz, estado),
    el('div', { class: 'robot-mando' },
      el('p', { class: 'casa-celular-titulo' }, '🎮 Mando'),
      el('div', { class: 'lab-panel' }, el('div', { class: 'perilla-columna' }, pad), el('div', { class: 'oled-marco chico' }, pantalla.lienzo)),
      el('div', { class: 'anim-rapidos' }, botonMando, botonCargar),
      el('p', { class: 'anim-etiqueta' }, 'Bluetooth'), mensajes)));

  const anotar = (t) => { registro.push(t); registro = registro.slice(-6); mensajes.textContent = registro.join('\n'); };

  // Distancia del HC-SR04 hacia adelante (hasta la pared o una caja)
  function distancia() {
    for (let d = 0; d < 400; d += 2) {
      const px = robot.x + Math.cos(robot.ang) * (20 + d); const py = robot.y + Math.sin(robot.ang) * (20 + d);
      const choca = px < 4 || py < 4 || px > ANCHO - 4 || py > ALTO - 4 || CAJAS.some(([x, y, w, h]) => px > x && px < x + w && py > y && py < y + h);
      if (choca) return d;
    }
    return 400;
  }
  const cm = (px) => Math.round(px / 2);   // 2 px = 1 cm

  function mando() {
    // int y = analogRead(JOY_Y) / 2 - 256;  (con zona muerta de 20)
    let y = Math.round(jy * 255); let x = Math.round(jx * 255);
    if (Math.abs(y) < 20) y = 0;
    if (Math.abs(x) < 20) x = 0;
    const izq = limitar(y + x, -255, 255); const der = limitar(y - x, -255, 255);
    anotar(`→ M,${izq},${der}`);
    // El robot procesa el mensaje
    robot.izq = izq; robot.der = der; ultimoMensaje = reloj; detenidoPorTimeout = false;
  }
  function telemetria() {
    const d = cm(distancia());
    anotar(`← T,${bat.toFixed(1)},${d}`);
    if (!mandoEncendido) return;
    // mostrar() del mando
    pantalla.clearDisplay(); pantalla.setTextSize(2); pantalla.setCursor(0, 0);
    pantalla.print(bat.toFixed(1)); pantalla.println(' V');
    pantalla.print(String(d)); pantalla.println(' cm');
    if (bat < 6.8) pantalla.println('BATERIA!');
    pantalla.display();
  }

  function mover(dt) {
    const vI = robot.izq / 255; const vD = robot.der / 255;
    const v = ((vI + vD) / 2) * 110; const giro = ((vI - vD) / 2) * 2.6;
    robot.ang += giro * dt;
    const nx = robot.x + Math.cos(robot.ang) * v * dt; const ny = robot.y + Math.sin(robot.ang) * v * dt;
    const libre = nx > 22 && ny > 22 && nx < ANCHO - 22 && ny < ALTO - 22 && !CAJAS.some(([x, y, w, h]) => nx > x - 18 && nx < x + w + 18 && ny > y - 18 && ny < y + h + 18);
    if (libre) { robot.x = nx; robot.y = ny; }
    bat = Math.max(6.0, bat - (Math.abs(vI) + Math.abs(vD)) * dt * 0.012);
  }

  function dibujar() {
    cuerpo.setAttribute('transform', `translate(${robot.x} ${robot.y}) rotate(${(robot.ang * 180) / Math.PI})`);
    const d = distancia();
    rayo.setAttribute('x1', robot.x + Math.cos(robot.ang) * 20); rayo.setAttribute('y1', robot.y + Math.sin(robot.ang) * 20);
    rayo.setAttribute('x2', robot.x + Math.cos(robot.ang) * (20 + d)); rayo.setAttribute('y2', robot.y + Math.sin(robot.ang) * (20 + d));
    palanca.setAttribute('cx', 70 + jx * 46); palanca.setAttribute('cy', 70 - jy * 46);
    botonMando.textContent = mandoEncendido ? '⏻ Apagar el mando' : '⏻ Encender el mando';
    estado.textContent = !mandoEncendido
      ? (detenidoPorTimeout ? `Sin mensajes por más de ${TIMEOUT} ms: el robot se detuvo.` : 'El mando está apagado: el robot ya no recibe mensajes…')
      : 'Mueve el joystick del mando.';
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(60, t - ultimo) : 0;
    ultimo = t; reloj += dt;
    if (mandoEncendido && reloj >= proxEnvio) { proxEnvio = reloj + 100; mando(); }
    // Seguridad: sin señal, detener
    if (reloj - ultimoMensaje > TIMEOUT && (robot.izq || robot.der)) { robot.izq = 0; robot.der = 0; detenidoPorTimeout = true; }
    if (reloj >= proxTele) { proxTele = reloj + 300; telemetria(); }
    mover(dt / 1000);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  // Joystick (vuelve al centro al soltarlo)
  let arrastrando = false;
  const moverPad = (e) => {
    const caja = pad.getBoundingClientRect();
    let dx = ((e.clientX - caja.left) / caja.width) * 140 - 70; let dy = ((e.clientY - caja.top) / caja.height) * 140 - 70;
    const dd = Math.hypot(dx, dy); if (dd > 46) { dx = (dx / dd) * 46; dy = (dy / dd) * 46; }
    jx = dx / 46; jy = -dy / 46;
  };
  pad.addEventListener('pointerdown', (e) => { arrastrando = true; pad.setPointerCapture(e.pointerId); moverPad(e); });
  pad.addEventListener('pointermove', (e) => { if (arrastrando) moverPad(e); });
  const soltar = () => { arrastrando = false; jx = 0; jy = 0; };
  pad.addEventListener('pointerup', soltar); pad.addEventListener('pointercancel', soltar);
  const presionadas = new Set();
  const teclas = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
  const aplicar = () => { jx = 0; jy = 0; presionadas.forEach((k) => { jx += teclas[k][0] * 0.7; jy += teclas[k][1]; }); jx = limitar(jx, -1, 1); jy = limitar(jy, -1, 1); };
  pad.addEventListener('keydown', (e) => { if (teclas[e.key]) { e.preventDefault(); presionadas.add(e.key); aplicar(); } });
  pad.addEventListener('keyup', (e) => { if (teclas[e.key]) { presionadas.delete(e.key); aplicar(); } });
  botonMando.addEventListener('click', () => { mandoEncendido = !mandoEncendido; if (!mandoEncendido) { jx = 0; jy = 0; } });
  botonCargar.addEventListener('click', () => { bat = 8.2; });
  dibujar();
  requestAnimationFrame(cuadro);
}
