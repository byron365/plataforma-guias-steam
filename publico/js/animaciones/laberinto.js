// ============================================================
// Animación "laberinto": el laberinto inclinable completo, como laberinto_inclinable.ino.
//   - El botón del joystick empieza la partida (millis() empieza a contar).
//   - El joystick → map() → metaX/metaY entre CENTRO − INCLINACION y CENTRO + INCLINACION,
//     y los servos se acercan con angX += (metaX − angX) × SUAVE cada 20 ms.
//   - La canica rueda según la inclinación y choca con las paredes.
//   - Al llegar a la meta (sensor IR en LOW): buzzer, tiempo y "RECORD!" o "Meta".
// No muestra los ángulos en números (la guía 4 pide medirlos): la inclinación se ve en el tablero.
// El laberinto dibujado es solo un ejemplo; cada equipo diseña el suyo.
//
// En la guía:
//   :::animacion tipo="laberinto"
//   :::
// Opciones (todas opcionales, como los "Ajustes del equipo"): centro (90) · inclinacion (15) · suave (0.2)
// ============================================================
import { svg, numero, limitar, mapArduino, pocoMovimiento } from './comun/svg.js';
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

const CASILLA = 25;            // mm
const N = 7;                   // 7 × 7 casillas
const LADO = CASILLA * N;      // 175 mm
const PX = 1.6;                // px por mm
const PARED = 3;               // grosor de pared (mm)
const RADIO = 7.5;             // canica de 15 mm
const G = 9810 * (5 / 7);      // aceleración de una bola que rueda (mm/s²)

// Paredes del ejemplo (en casillas, el (0, 0) es la esquina de A1, abajo a la izquierda):
// [x1, y1, x2, y2]. Un camino en zigzag de A1 a G7.
const PAREDES = [
  [0, 1, 6, 1], [1, 2, 7, 2], [0, 3, 6, 3], [1, 4, 7, 4], [0, 5, 6, 5], [1, 6, 7, 6],
];
const META = { x: 6.5 * CASILLA, y: 6.5 * CASILLA };   // casilla G7
const SALIDA = { x: 0.5 * CASILLA, y: 0.5 * CASILLA }; // casilla A1

export default function montar(contenedor, config) {
  const CENTRO = limitar(Math.round(numero(config.centro, 90)), 60, 120);
  const INCLINACION = limitar(Math.round(numero(config.inclinacion, 15)), 1, 30);
  const SUAVE = limitar(numero(config.suave, 0.2), 0.01, 1);

  // Rectángulos de las paredes (mm), con el borde del tablero
  const rects = [
    [-PARED, -PARED, LADO + PARED, 0], [-PARED, LADO, LADO + PARED, LADO + PARED],
    [-PARED, 0, 0, LADO], [LADO, 0, LADO + PARED, LADO],
    ...PAREDES.map(([x1, y1, x2, y2]) => [
      Math.min(x1, x2) * CASILLA - PARED / 2, Math.min(y1, y2) * CASILLA - PARED / 2,
      Math.max(x1, x2) * CASILLA + PARED / 2, Math.max(y1, y2) * CASILLA + PARED / 2]),
  ];

  // Estado del juego y de los servos
  let jx = 0; let jy = 0;                 // palanca (-1 a 1)
  let angX = CENTRO; let angY = CENTRO;
  let canica = { ...SALIDA, vx: 0, vy: 0 };
  let jugando = false; let inicio = 0; let record = 0; let reloj = 0;
  let pausaHasta = 0; let acumulado = 0; let ultimo = 0; let sonando = 0;

  // ---------- Dibujo del tablero (vista desde arriba) ----------
  const aPx = (mm) => mm * PX;
  const yPx = (mm) => (LADO - mm) * PX; // y del tablero hacia arriba
  const tablero = svg('svg', { viewBox: `${-14} ${-14} ${LADO * PX + 28} ${LADO * PX + 28}`, class: 'lab-svg', role: 'img', 'aria-label': 'Laberinto visto desde arriba con la canica' },
    svg('rect', { x: -10, y: -10, width: LADO * PX + 20, height: LADO * PX + 20, rx: 8, class: 'lab-borde' }),
    svg('rect', { x: 0, y: 0, width: LADO * PX, height: LADO * PX, class: 'lab-fondo' }),
    svg('circle', { cx: aPx(META.x), cy: yPx(META.y), r: 4 * PX, class: 'lab-meta' }),
    svg('text', { x: aPx(META.x) - 12, y: yPx(META.y) + 4, class: 'lab-texto', 'text-anchor': 'end' }, 'META'),
    svg('text', { x: aPx(SALIDA.x) + 16, y: yPx(SALIDA.y) + 4, class: 'lab-texto' }, 'SALIDA'),
    ...PAREDES.map(([x1, y1, x2, y2]) => svg('line', { x1: aPx(x1 * CASILLA), y1: yPx(y1 * CASILLA), x2: aPx(x2 * CASILLA), y2: yPx(y2 * CASILLA), class: 'lab-pared' })));
  const sombra = svg('circle', { r: RADIO * PX, class: 'lab-sombra' });
  const bola = svg('circle', { r: RADIO * PX, class: 'lab-canica' });
  const brillo = svg('circle', { r: RADIO * PX * 0.35, class: 'lab-brillo' });
  tablero.append(sombra, bola, brillo);
  const inclinado = el('div', { class: 'lab-inclinado' }, tablero);

  // ---------- Joystick virtual ----------
  const palanca = svg('circle', { r: 20, class: 'joystick-bola' });
  const pad = svg('svg', { viewBox: '0 0 140 140', class: 'lab-pad', tabindex: '0', role: 'application', 'aria-label': 'Joystick: arrástralo o usa las flechas del teclado' },
    svg('circle', { cx: 70, cy: 70, r: 64, class: 'joystick-base' }),
    svg('line', { x1: 14, y1: 70, x2: 126, y2: 70, class: 'joystick-cruz' }),
    svg('line', { x1: 70, y1: 14, x2: 70, y2: 126, class: 'joystick-cruz' }),
    palanca);

  // ---------- Pantalla, buzzer y botones ----------
  const pantalla = crearOLED({ escala: 2 });
  const buzzer = el('span', { class: 'lab-buzzer', 'aria-hidden': 'true' }, '🔊');
  const botonJugar = el('button', { type: 'button', class: 'boton boton-chico' }, '🕹 Presionar el joystick (botón D2)');
  const botonSalida = el('button', { type: 'button', class: 'anim-boton' }, '🔵 Poner la canica en la salida');
  const estado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-laberinto' },
    el('div', { class: 'lab-escena' }, inclinado),
    el('div', { class: 'anim-controles' },
      el('div', { class: 'lab-panel' },
        el('div', { class: 'perilla-columna' }, pad, el('p', { class: 'anim-etiqueta' }, 'Joystick')),
        el('div', {}, el('div', { class: 'oled-marco chico' }, pantalla.lienzo), buzzer)),
      el('div', { class: 'anim-rapidos' }, botonJugar, botonSalida),
      estado,
      el('p', { class: 'texto-ayuda' }, `Ajustes: CENTRO = ${CENTRO} · INCLINACION = ${INCLINACION} · SUAVE = ${String(SUAVE).replace('.', ',')}. El laberinto es un ejemplo: el de ustedes lo diseñan en papel.`))));

  // mostrar(a, b) del código: dos líneas en tamaño 2
  function mostrar(a, b) {
    pantalla.clearDisplay(); pantalla.setTextSize(2); pantalla.setCursor(0, 0);
    pantalla.println(a); pantalla.println(b); pantalla.display();
  }
  const segundos = (ms) => `${(ms / 1000).toFixed(1)} s`;

  function sonar(ms) { sonando = ms; }

  // ---------- Física de la canica ----------
  function mover(dt) {
    const incX = ((angX - CENTRO) * Math.PI) / 180;
    const incY = ((angY - CENTRO) * Math.PI) / 180;
    canica.vx += G * Math.sin(incX) * dt;
    canica.vy += G * Math.sin(incY) * dt;
    const roce = Math.max(0, 1 - 1.2 * dt);
    canica.vx *= roce; canica.vy *= roce;
    canica.x += canica.vx * dt; canica.y += canica.vy * dt;
    // Choques con las paredes (cada pared crece el radio de la canica)
    for (const [x1, y1, x2, y2] of rects) {
      const ax = x1 - RADIO; const bx = x2 + RADIO; const ay = y1 - RADIO; const by = y2 + RADIO;
      if (canica.x > ax && canica.x < bx && canica.y > ay && canica.y < by) {
        const salidas = [canica.x - ax, bx - canica.x, canica.y - ay, by - canica.y];
        const i = salidas.indexOf(Math.min(...salidas));
        if (i === 0) { canica.x = ax; canica.vx = -Math.abs(canica.vx) * 0.3; }
        if (i === 1) { canica.x = bx; canica.vx = Math.abs(canica.vx) * 0.3; }
        if (i === 2) { canica.y = ay; canica.vy = -Math.abs(canica.vy) * 0.3; }
        if (i === 3) { canica.y = by; canica.vy = Math.abs(canica.vy) * 0.3; }
      }
    }
  }

  // ---------- Una vuelta del loop() (cada 20 ms) ----------
  function vuelta() {
    if (reloj < pausaHasta) return; // delay(3000) después de la meta
    if (!jugando) return;
    const lx = Math.round(limitar((jx + 1) * 511.5, 0, 1023));
    const ly = Math.round(limitar((jy + 1) * 511.5, 0, 1023));
    const metaX = mapArduino(lx, 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
    const metaY = mapArduino(ly, 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
    angX += (metaX - angX) * SUAVE;
    angY += (metaY - angY) * SUAVE;
    mostrar('Tiempo', segundos(reloj - inicio));
    // ¿Llegó a la meta? (el sensor ve la canica sobre el agujero)
    if (Math.hypot(canica.x - META.x, canica.y - META.y) < 6) {
      jugando = false;
      const t = reloj - inicio;
      sonar(800);
      if (record === 0 || t < record) { record = t; mostrar('RECORD!', segundos(t)); }
      else mostrar('Meta', segundos(t));
      estado.textContent = `¡Llegó a la meta en ${segundos(t)}! Récord: ${segundos(record)}. El tablero vuelve al centro.`;
      angX = CENTRO; angY = CENTRO;
      pausaHasta = reloj + 3000;
    }
  }

  function dibujar() {
    for (const c of [bola, sombra]) { c.setAttribute('cx', aPx(canica.x)); c.setAttribute('cy', yPx(canica.y)); }
    sombra.setAttribute('transform', `translate(${(angX - CENTRO) * -0.4} ${(angY - CENTRO) * 0.4})`);
    brillo.setAttribute('cx', aPx(canica.x) - RADIO * PX * 0.35); brillo.setAttribute('cy', yPx(canica.y) - RADIO * PX * 0.35);
    // Inclinación del tablero (exagerada un poco para que se vea)
    const k = pocoMovimiento() ? 0 : 1.6;
    inclinado.style.transform = `perspective(900px) rotateX(${(angY - CENTRO) * k}deg) rotateY(${(angX - CENTRO) * k}deg)`;
    palanca.setAttribute('cx', 70 + jx * 44); palanca.setAttribute('cy', 70 - jy * 44);
    buzzer.classList.toggle('sonando', sonando > 0);
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(50, t - ultimo) : 0;
    ultimo = t; reloj += dt; acumulado += dt;
    if (sonando > 0) sonando -= dt;
    while (acumulado >= 20) { acumulado -= 20; vuelta(); }
    const pasos = 4;
    for (let i = 0; i < pasos; i++) mover(dt / 1000 / pasos);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  // ---------- Controles ----------
  botonJugar.addEventListener('click', () => {
    if (jugando || reloj < pausaHasta) return;
    jugando = true; inicio = reloj; sonar(200);
    estado.textContent = '¡A jugar! Inclina el tablero con el joystick hasta la meta.';
  });
  botonSalida.addEventListener('click', () => { canica = { ...SALIDA, vx: 0, vy: 0 }; });

  let arrastrando = false;
  const moverPad = (e) => {
    const caja = pad.getBoundingClientRect();
    let dx = ((e.clientX - caja.left) / caja.width) * 140 - 70; let dy = ((e.clientY - caja.top) / caja.height) * 140 - 70;
    const d = Math.hypot(dx, dy); if (d > 44) { dx = (dx / d) * 44; dy = (dy / d) * 44; }
    jx = dx / 44; jy = -dy / 44;
  };
  pad.addEventListener('pointerdown', (e) => { arrastrando = true; pad.setPointerCapture(e.pointerId); moverPad(e); });
  pad.addEventListener('pointermove', (e) => { if (arrastrando) moverPad(e); });
  const soltar = () => { arrastrando = false; jx = 0; jy = 0; };
  pad.addEventListener('pointerup', soltar);
  pad.addEventListener('pointercancel', soltar);
  // Flechas del teclado (sobre el joystick): se pueden combinar dos
  const presionadas = new Set();
  const teclas = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
  const aplicarTeclas = () => {
    jx = 0; jy = 0;
    presionadas.forEach((k) => { jx += teclas[k][0]; jy += teclas[k][1]; });
    jx = limitar(jx, -1, 1); jy = limitar(jy, -1, 1);
  };
  pad.addEventListener('keydown', (e) => { if (teclas[e.key]) { e.preventDefault(); presionadas.add(e.key); aplicarTeclas(); } if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); botonJugar.click(); } });
  pad.addEventListener('keyup', (e) => { if (teclas[e.key]) { presionadas.delete(e.key); aplicarTeclas(); } });

  mostrar('Presiona', 'para jugar');
  estado.textContent = 'Presiona el botón del joystick para empezar.';
  dibujar();
  requestAnimationFrame(cuadro);
}
