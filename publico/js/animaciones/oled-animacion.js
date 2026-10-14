// ============================================================
// Animación "oled-animacion": la celebración de gol de la guía 11.
// Corre el código de la guía en la pantalla OLED: un for que dibuja "GOL"
// cada vez más grande y otro que hace parpadear la pantalla con invertDisplay().
// Se puede ver en cámara lenta. Las líneas del código se resaltan mientras
// corren, pero no se muestra el valor de t (eso lo piensa el equipo).
// También se puede escuchar la melodía de ejemplo con las notas de la tabla.
//
// En la guía:
//   :::animacion tipo="oled-animacion"
//   :::
// Opciones (todas opcionales): texto ("GOL")
// ============================================================
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

// Melodía de ejemplo de la guía 11 (Hz y ms)
const MELODIA = [392, 392, 440, 392, 523, 494];
const DURACION = [150, 150, 300, 300, 300, 600];

export default function montar(contenedor, config) {
  const texto = String(config.texto || 'GOL').slice(0, 8);
  const pantalla = crearOLED({ escala: 3 });
  let lento = false;
  let corriendo = false;
  let audio = null;

  const lineas = {
    for1: el('span', { class: 'semaforo-linea' }, 'for (int t = 1; t <= 4; t++) {'),
    dibujo: el('span', { class: 'semaforo-linea' }, `  pantalla.clearDisplay();\n  pantalla.setTextSize(t);\n  pantalla.setCursor(64 - t * 9, 32 - t * 4);\n  pantalla.print("${texto}");\n  pantalla.display();`),
    espera1: el('span', { class: 'semaforo-linea' }, '  delay(120);'),
    cierre1: el('span', { class: 'semaforo-fija' }, '}'),
    for2: el('span', { class: 'semaforo-linea' }, 'for (int i = 0; i < 3; i++) {'),
    invertir: el('span', { class: 'semaforo-linea' }, '  pantalla.invertDisplay(true);\n  delay(150);'),
    normal: el('span', { class: 'semaforo-linea' }, '  pantalla.invertDisplay(false);\n  delay(150);'),
    cierre2: el('span', { class: 'semaforo-fija' }, '}'),
  };
  const codigo = el('pre', { class: 'semaforo-codigo' }, ...Object.values(lineas));
  const botonPlay = el('button', { type: 'button', class: 'boton boton-chico' }, '▶ Ver la celebración');
  const casilla = el('input', { type: 'checkbox' });
  const botonMusica = el('button', { type: 'button', class: 'anim-boton' }, '🎵 Escuchar la melodía de ejemplo');
  const notas = el('p', { class: 'texto-ayuda' }, 'melodia[] = {392, 392, 440, 392, 523, 494} · Sol Sol La Sol Do alto Si');

  contenedor.append(el('div', { class: 'anim-oledanim' },
    el('div', {},
      el('div', { class: 'oled-marco' }, pantalla.lienzo),
      el('div', { class: 'anim-rapidos' }, botonPlay, botonMusica),
      el('label', { class: 'casilla-simple' }, casilla, ' Cámara lenta (× 5)'),
      notas),
    codigo));

  const marcar = (...claves) => Object.entries(lineas).forEach(([k, s]) => s.classList.toggle('activa', claves.includes(k)));
  const esperar = (ms) => new Promise((r) => setTimeout(r, ms * (lento ? 5 : 1)));

  async function celebrar() {
    if (corriendo) return;
    corriendo = true; botonPlay.disabled = true;
    for (let t = 1; t <= 4; t++) {
      marcar('for1', 'dibujo');
      pantalla.clearDisplay();
      pantalla.setTextSize(t);
      pantalla.setCursor(64 - t * 9, 32 - t * 4);
      pantalla.print(texto);
      pantalla.display();
      await esperar(lento ? 60 : 10);
      marcar('espera1');
      await esperar(120);
    }
    for (let i = 0; i < 3; i++) {
      marcar('for2', 'invertir');
      pantalla.invertDisplay(true);
      await esperar(150);
      marcar('normal');
      pantalla.invertDisplay(false);
      await esperar(150);
    }
    marcar();
    corriendo = false; botonPlay.disabled = false;
  }

  // Toca la melodía con el sonido de la computadora (como tone() en el buzzer)
  async function tocar() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      let inicio = audio.currentTime + 0.05;
      MELODIA.forEach((hz, i) => {
        const osc = audio.createOscillator(); const vol = audio.createGain();
        osc.type = 'square'; osc.frequency.value = hz;
        vol.gain.value = 0.06;
        osc.connect(vol).connect(audio.destination);
        osc.start(inicio); osc.stop(inicio + DURACION[i] / 1000);
        inicio += (DURACION[i] + 50) / 1000;   // delay(duracion[i] + 50)
      });
    } catch { botonMusica.textContent = 'Este navegador no puede tocar sonidos'; }
  }

  botonPlay.addEventListener('click', celebrar);
  botonMusica.addEventListener('click', tocar);
  casilla.addEventListener('change', () => { lento = casilla.checked; });
  // Pantalla de inicio: el marcador quieto
  pantalla.setTextSize(1); pantalla.setCursor(0, 0); pantalla.print('AZUL            ROJO');
  pantalla.setTextSize(3); pantalla.setCursor(10, 22); pantalla.print('1 - 0');
  pantalla.display();
}
