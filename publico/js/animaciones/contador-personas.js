// ============================================================
// Animación "contador-personas": dos sensores en la puerta dicen si alguien entró o salió.
// Vista desde arriba: A del lado del pasillo y B del lado del salón, separados 10 cm.
// Corre el código de la guía 12: si A da LOW y en menos de 1 s también B → entró;
// si primero B y después A → salió. La pantalla OLED muestra el contador.
// Pasa una persona a la vez (los casos difíciles los prueba el equipo con la tabla).
//
// En la guía:
//   :::animacion tipo="contador-personas"
//   :::
// Opciones: ninguna.
// ============================================================
import { svg } from './comun/svg.js';
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

const X_A = 250; const X_B = 290;           // sensores (px); 10 cm entre ellos
const ANCHO_HAZ = 14;                        // la persona tapa el haz si está así de cerca
const PASO = 0.16;                           // px por ms al caminar

export default function montar(contenedor) {
  let adentro = 0; let entradas = 0;
  let persona = null;                        // { x, dir }
  let reloj = 0; let ultimo = 0; let acumulado = 0;
  // Estado del loop(): el código espera dentro de esperar() o de delay()
  let esperando = null;                      // { pin, hasta, accion }
  let ocupadoHasta = 0;
  let sonando = 0;

  const pantalla = crearOLED({ escala: 2 });
  const figura = svg('g', { class: 'cont-persona' }, svg('circle', { r: 16, class: 'cont-cuerpo' }), svg('circle', { r: 8, class: 'cont-cabeza' }));
  const hazA = svg('line', { x1: X_A, x2: X_A, y1: 60, y2: 180, class: 'cont-haz' });
  const hazB = svg('line', { x1: X_B, x2: X_B, y1: 60, y2: 180, class: 'cont-haz' });
  const raiz = svg('svg', { viewBox: '0 0 540 240', class: 'cont-svg', role: 'img', 'aria-label': 'Puerta vista desde arriba con los sensores A y B' },
    svg('rect', { x: 0, y: 0, width: 270, height: 240, class: 'cont-pasillo' }),
    svg('rect', { x: 270, y: 0, width: 270, height: 240, class: 'cont-salon' }),
    svg('text', { x: 120, y: 30, class: 'cont-texto', 'text-anchor': 'middle' }, 'Pasillo (afuera)'),
    svg('text', { x: 420, y: 30, class: 'cont-texto', 'text-anchor': 'middle' }, 'Salón (adentro)'),
    // Paredes con el hueco de la puerta
    svg('rect', { x: 262, y: 0, width: 16, height: 60, class: 'cont-pared' }),
    svg('rect', { x: 262, y: 180, width: 16, height: 60, class: 'cont-pared' }),
    hazA, hazB,
    svg('rect', { x: X_A - 7, y: 46, width: 14, height: 14, rx: 2, class: 'cont-sensor' }), svg('text', { x: X_A, y: 42, class: 'cont-texto', 'text-anchor': 'middle' }, 'A'),
    svg('rect', { x: X_B - 7, y: 46, width: 14, height: 14, rx: 2, class: 'cont-sensor' }), svg('text', { x: X_B, y: 42, class: 'cont-texto', 'text-anchor': 'middle' }, 'B'),
    figura);

  const botonEntra = el('button', { type: 'button', class: 'boton boton-chico' }, '🚶 Entra una persona');
  const botonSale = el('button', { type: 'button', class: 'anim-boton' }, '🚶 Sale una persona');
  const buzzer = el('span', { class: 'lab-buzzer', 'aria-hidden': 'true' }, '🔊');
  const lecturas = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  const estado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-contador' },
    raiz,
    el('div', { class: 'cont-panel' },
      el('div', {}, el('div', { class: 'oled-marco chico' }, pantalla.lienzo), buzzer),
      el('div', { class: 'anim-controles' }, el('div', { class: 'anim-rapidos' }, botonEntra, botonSale), estado, lecturas))));

  function mostrar() {
    pantalla.clearDisplay();
    pantalla.setTextSize(1); pantalla.setCursor(0, 0); pantalla.print('Personas adentro:');
    pantalla.setTextSize(3); pantalla.setCursor(45, 20); pantalla.print(String(adentro));
    pantalla.setTextSize(1); pantalla.setCursor(0, 56); pantalla.print('Entradas hoy: '); pantalla.print(String(entradas));
    pantalla.display();
  }

  const bajo = (xSensor) => Boolean(persona) && Math.abs(persona.x - xSensor) < ANCHO_HAZ;

  // Una vuelta del loop() cada 10 ms
  function vuelta() {
    if (reloj < ocupadoHasta) return;                       // delay(800)
    if (esperando) {                                        // dentro de esperar(pin)
      if (bajo(esperando.pin)) { const accion = esperando.accion; esperando = null; accion(); }
      else if (reloj > esperando.hasta) esperando = null;    // pasó 1 segundo: return false
      return;
    }
    if (bajo(X_A)) {
      esperando = { pin: X_B, hasta: reloj + 1000, accion: () => {
        adentro++; entradas++; sonando = 120; mostrar(); ocupadoHasta = reloj + 800;
        estado.textContent = 'A y después B: ¡alguien entró!';
      } };
      return;
    }
    if (bajo(X_B)) {
      esperando = { pin: X_A, hasta: reloj + 1000, accion: () => {
        if (adentro > 0) adentro--;
        sonando = 120; mostrar(); ocupadoHasta = reloj + 800;
        estado.textContent = 'B y después A: alguien salió.';
      } };
    }
  }

  function dibujar() {
    figura.style.display = persona ? '' : 'none';
    if (persona) figura.setAttribute('transform', `translate(${persona.x} 120)`);
    hazA.classList.toggle('cortado', bajo(X_A));
    hazB.classList.toggle('cortado', bajo(X_B));
    buzzer.classList.toggle('sonando', sonando > 0);
    lecturas.textContent =
      `digitalRead(SENSOR_A) = ${bajo(X_A) ? 'LOW' : 'HIGH'}\n` +
      `digitalRead(SENSOR_B) = ${bajo(X_B) ? 'LOW' : 'HIGH'}` +
      (esperando ? `\nesperar(${esperando.pin === X_B ? 'SENSOR_B' : 'SENSOR_A'})…` : '');
    botonEntra.disabled = Boolean(persona); botonSale.disabled = Boolean(persona);
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(50, t - ultimo) : 0;
    ultimo = t; reloj += dt; acumulado += dt;
    if (sonando > 0) sonando -= dt;
    if (persona) {
      persona.x += persona.dir * PASO * dt;
      if (persona.x < -30 || persona.x > 570) persona = null;
    }
    while (acumulado >= 10) { acumulado -= 10; vuelta(); }
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonEntra.addEventListener('click', () => { persona = { x: 20, dir: 1 }; estado.textContent = 'Alguien camina hacia el salón…'; });
  botonSale.addEventListener('click', () => { persona = { x: 520, dir: -1 }; estado.textContent = 'Alguien camina hacia el pasillo…'; });
  mostrar();
  estado.textContent = 'Haz pasar a una persona por la puerta.';
  dibujar();
  requestAnimationFrame(cuadro);
}
