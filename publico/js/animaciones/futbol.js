// ============================================================
// Animación "futbol": la cancha con el marcador electrónico, como el .ino del proyecto.
//   - El botón de inicio pone los goles en 0, empieza el tiempo y suena el silbato.
//   - Cada portería tiene un sensor IR en la ventana del fondo: si ve la pelota da LOW.
//     Portería azul (izquierda) → gol(golesRojo, "ROJO"); portería roja (derecha) → gol(golesAzul, "AZUL").
//   - Después de un gol, el marcador ignora los sensores durante PAUSA_GOL.
//   - La pantalla OLED muestra "AZUL  ROJO", el marcador y los segundos que quedan.
// Para patear: toca la cancha y la pelota sale hacia ese punto.
//
// En la guía:
//   :::animacion tipo="futbol"
//   :::
// Opciones (todas opcionales, como los "Ajustes del equipo"): duracion (180000 ms) · pausa (1500 ms)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

// Cancha en mm de la maqueta: 525 × 340, porterías de 100 de ancho y 40 de fondo
const LARGO = 525; const ANCHO = 340; const BOCA = 100; const FONDO = 40;
const R = 40;                       // diámetro de la pelota de ping pong (4 cm)
const ESC = 0.9;                     // px por mm
const MX = FONDO + 14; const MY = 14; // margen del dibujo

export default function montar(contenedor, config) {
  const DURACION = limitar(Math.round(numero(config.duracion, 180000)), 10000, 600000);
  const PAUSA_GOL = limitar(Math.round(numero(config.pausa, 1500)), 0, 10000);

  let pelota = { x: LARGO / 2, y: ANCHO / 2, vx: 0, vy: 0 };
  let golesAzul = 0; let golesRojo = 0;
  let jugando = false; let inicio = 0; let ultimoGol = -1e9;
  let bloqueadoHasta = 0;      // mientras corre gol() (tiene delay)
  let reloj = 0; let ultimo = 0; let rapido = false; let sonando = 0;
  let celebrando = null;

  // ---------- Dibujo ----------
  const x = (mm) => MX + mm * ESC; const y = (mm) => MY + mm * ESC;
  const cancha = svg('svg', { viewBox: `0 0 ${(LARGO + 2 * FONDO + 28) * ESC + 10} ${(ANCHO + 28) * ESC}`, class: 'fut-svg', role: 'img', 'aria-label': 'Cancha de mini fútbol vista desde arriba. Toca para patear la pelota.' },
    svg('rect', { x: x(0), y: y(0), width: LARGO * ESC, height: ANCHO * ESC, class: 'fut-pasto' }),
    svg('line', { x1: x(LARGO / 2), y1: y(0), x2: x(LARGO / 2), y2: y(ANCHO), class: 'fut-linea' }),
    svg('circle', { cx: x(LARGO / 2), cy: y(ANCHO / 2), r: 46 * ESC, class: 'fut-linea' }),
    svg('rect', { x: x(0), y: y((ANCHO - 202) / 2), width: 83 * ESC, height: 202 * ESC, class: 'fut-linea' }),
    svg('rect', { x: x(LARGO - 83), y: y((ANCHO - 202) / 2), width: 83 * ESC, height: 202 * ESC, class: 'fut-linea' }),
    // Porterías (azul a la izquierda, roja a la derecha) con su sensor en el fondo
    svg('rect', { x: x(-FONDO), y: y((ANCHO - BOCA) / 2), width: FONDO * ESC, height: BOCA * ESC, class: 'fut-porteria azul' }),
    svg('rect', { x: x(LARGO), y: y((ANCHO - BOCA) / 2), width: FONDO * ESC, height: BOCA * ESC, class: 'fut-porteria roja' }));
  const sensorAzul = svg('rect', { x: x(-FONDO) - 6, y: y(ANCHO / 2 - 12), width: 8, height: 24 * ESC, rx: 2, class: 'fut-sensor' });
  const sensorRojo = svg('rect', { x: x(LARGO + FONDO) - 2, y: y(ANCHO / 2 - 12), width: 8, height: 24 * ESC, rx: 2, class: 'fut-sensor' });
  const bola = svg('circle', { r: (R / 2) * ESC, class: 'fut-pelota' });
  cancha.append(sensorAzul, sensorRojo,
    svg('text', { x: x(-FONDO / 2), y: y((ANCHO - BOCA) / 2) - 6, class: 'fut-texto', 'text-anchor': 'middle' }, 'Azul'),
    svg('text', { x: x(LARGO + FONDO / 2), y: y((ANCHO - BOCA) / 2) - 6, class: 'fut-texto', 'text-anchor': 'middle' }, 'Roja'),
    bola);

  const pantalla = crearOLED({ escala: 2 });
  const buzzer = el('span', { class: 'lab-buzzer', 'aria-hidden': 'true' }, '🔊');
  const botonInicio = el('button', { type: 'button', class: 'boton boton-chico' }, '🔘 Botón de inicio (D2)');
  const casilla = el('input', { type: 'checkbox' });
  const sensores = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  const estado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-futbol' },
    cancha,
    el('div', { class: 'fut-panel' },
      el('div', {}, el('div', { class: 'oled-marco chico' }, pantalla.lienzo), buzzer),
      el('div', { class: 'anim-controles' },
        el('div', { class: 'anim-rapidos' }, botonInicio),
        el('label', { class: 'casilla-simple' }, casilla, ' Reloj rápido (× 10)'),
        estado, sensores))));

  // ---------- Las funciones del código ----------
  function mostrarMarcador(resta) {
    pantalla.clearDisplay();
    pantalla.setTextSize(1); pantalla.setCursor(0, 0); pantalla.print('AZUL            ROJO');
    pantalla.setTextSize(3); pantalla.setCursor(10, 22);
    pantalla.print(String(golesAzul)); pantalla.print(' - '); pantalla.print(String(golesRojo));
    pantalla.setTextSize(1); pantalla.setCursor(30, 56);
    pantalla.print('Quedan '); pantalla.print(String(Math.floor(resta / 1000))); pantalla.print(' s');
    pantalla.display();
  }
  function gol(equipo) {
    if (equipo === 'ROJO') golesRojo++; else golesAzul++;
    ultimoGol = reloj;
    pantalla.clearDisplay();
    pantalla.setTextSize(3); pantalla.setCursor(20, 10); pantalla.print('GOL!');
    pantalla.setTextSize(2); pantalla.setCursor(40, 45); pantalla.print(equipo);
    pantalla.display();
    sonando = 600;
    bloqueadoHasta = reloj + 1200;   // delay(200) + delay(1000)
    celebrando = equipo;
    estado.textContent = `¡GOL del equipo ${equipo}!`;
  }

  // ---------- Física de la pelota ----------
  const enBoca = (py) => py > (ANCHO - BOCA) / 2 + R / 2 && py < (ANCHO + BOCA) / 2 - R / 2;
  function mover(dt) {
    const roce = Math.max(0, 1 - 0.9 * dt);
    pelota.vx *= roce; pelota.vy *= roce;
    pelota.x += pelota.vx * dt; pelota.y += pelota.vy * dt;
    const r = R / 2;
    // Bandas de arriba y abajo
    if (pelota.y < r) { pelota.y = r; pelota.vy = Math.abs(pelota.vy) * 0.7; }
    if (pelota.y > ANCHO - r) { pelota.y = ANCHO - r; pelota.vy = -Math.abs(pelota.vy) * 0.7; }
    // Lados cortos: rebota, salvo por la boca de la portería
    for (const lado of [0, LARGO]) {
      const fuera = lado === 0 ? pelota.x < r : pelota.x > LARGO - r;
      const adentro = lado === 0 ? pelota.x < 0 : pelota.x > LARGO;
      if (fuera && !enBoca(pelota.y) && !adentro) {
        pelota.x = lado === 0 ? r : LARGO - r; pelota.vx = -pelota.vx * 0.7;
      }
    }
    // Dentro de la portería: paredes y fondo
    for (const lado of [0, LARGO]) {
      const adentro = lado === 0 ? pelota.x < 0 : pelota.x > LARGO;
      if (!adentro) continue;
      const y1 = (ANCHO - BOCA) / 2 + r; const y2 = (ANCHO + BOCA) / 2 - r;
      if (pelota.y < y1) { pelota.y = y1; pelota.vy = Math.abs(pelota.vy) * 0.5; }
      if (pelota.y > y2) { pelota.y = y2; pelota.vy = -Math.abs(pelota.vy) * 0.5; }
      if (lado === 0 && pelota.x < -FONDO + r) { pelota.x = -FONDO + r; pelota.vx = Math.abs(pelota.vx) * 0.3; }
      if (lado === LARGO && pelota.x > LARGO + FONDO - r) { pelota.x = LARGO + FONDO - r; pelota.vx = -Math.abs(pelota.vx) * 0.3; }
    }
  }
  // El sensor del fondo ve la pelota si está dentro de la portería
  const veAzul = () => pelota.x < -R * 0.3;
  const veRojo = () => pelota.x > LARGO + R * 0.3;

  // ---------- El loop() ----------
  function vuelta() {
    sensorAzul.classList.toggle('activo', veAzul());
    sensorRojo.classList.toggle('activo', veRojo());
    sensores.textContent =
      `digitalRead(SENSOR_AZUL) = ${veAzul() ? 'LOW' : 'HIGH'}\n` +
      `digitalRead(SENSOR_ROJO) = ${veRojo() ? 'LOW' : 'HIGH'}\n` +
      `listo = ${reloj - ultimoGol > PAUSA_GOL}`;
    if (!jugando) return;
    if (reloj < bloqueadoHasta) return; // gol() todavía está esperando
    if (celebrando) {
      // Un jugador saca la pelota de la portería y la pone en el centro
      celebrando = null;
      pelota = { x: LARGO / 2, y: ANCHO / 2, vx: 0, vy: 0 };
    }
    const listo = reloj - ultimoGol > PAUSA_GOL;
    if (listo && veAzul()) { gol('ROJO'); return; }
    if (listo && veRojo()) { gol('AZUL'); return; }
    const pasado = reloj - inicio;
    if (pasado >= DURACION) {
      jugando = false;
      mostrarMarcador(0);
      sonando = 1500;
      estado.textContent = `¡Final del partido! Azul ${golesAzul} - ${golesRojo} Rojo`;
      return;
    }
    mostrarMarcador(DURACION - pasado);
  }

  function dibujar() {
    bola.setAttribute('cx', x(pelota.x)); bola.setAttribute('cy', y(pelota.y));
    buzzer.classList.toggle('sonando', sonando > 0);
  }

  let acumulado = 0;
  function cuadro(t) {
    const dtReal = ultimo ? Math.min(50, t - ultimo) : 0;
    ultimo = t;
    // El reloj del Arduino puede ir más rápido, la pelota no
    reloj += dtReal * (rapido && jugando ? 10 : 1);
    if (sonando > 0) sonando -= dtReal;
    for (let i = 0; i < 3; i++) mover(dtReal / 1000 / 3);
    acumulado += dtReal;
    if (acumulado >= 30) { acumulado = 0; vuelta(); }
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  // ---------- Controles ----------
  botonInicio.addEventListener('click', () => {
    if (jugando) return;
    golesAzul = 0; golesRojo = 0; inicio = reloj; jugando = true; sonando = 600;
    pelota = { x: LARGO / 2, y: ANCHO / 2, vx: 0, vy: 0 };
    estado.textContent = '¡Silbato! Toca la cancha para patear la pelota.';
  });
  casilla.addEventListener('change', () => { rapido = casilla.checked; });
  cancha.addEventListener('pointerdown', (e) => {
    const caja = cancha.getBoundingClientRect();
    const vb = cancha.viewBox.baseVal;
    const px = ((e.clientX - caja.left) / caja.width) * vb.width;
    const py = ((e.clientY - caja.top) / caja.height) * vb.height;
    const dx = (px - MX) / ESC - pelota.x; const dy = (py - MY) / ESC - pelota.y;
    const d = Math.hypot(dx, dy) || 1;
    const fuerza = limitar(d * 2.2, 250, 900);
    pelota.vx = (dx / d) * fuerza; pelota.vy = (dy / d) * fuerza;
  });

  mostrarMarcador(DURACION);
  estado.textContent = 'Presiona el botón de inicio para empezar el partido.';
  dibujar();
  requestAnimationFrame(cuadro);
}
