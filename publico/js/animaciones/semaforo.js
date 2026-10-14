// ============================================================
// Animación "semaforo": el código del semáforo corriendo línea por línea.
// Se ve qué línea se ejecuta, qué LED se enciende y cuánto tiempo pasa.
// Los números de los delay() se pueden cambiar para probar.
//
// En la guía:
//   :::animacion tipo="semaforo"
//   :::
// Opciones (todas opcionales, en milisegundos, como el código de la guía 1):
//   verde (3000), amarillo (1000), rojo (3000)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const COLORES = { VERDE: '#22C55E', AMARILLO: '#FACC15', ROJO: '#EF4444' };

export default function montar(contenedor, config) {
  const tiempos = {
    VERDE: limitar(numero(config.verde, 3000), 100, 20000),
    AMARILLO: limitar(numero(config.amarillo, 1000), 100, 20000),
    ROJO: limitar(numero(config.rojo, 3000), 100, 20000),
  };

  // Programa: el loop() de la guía, una instrucción por línea
  const programa = [];
  for (const luz of ['VERDE', 'AMARILLO', 'ROJO']) {
    programa.push({ tipo: 'escribir', luz, valor: 'HIGH' });
    programa.push({ tipo: 'esperar', luz });
    programa.push({ tipo: 'escribir', luz, valor: 'LOW' });
  }

  // ---------- Dibujo del semáforo ----------
  const luces = {};
  const dibujo = svg('svg', { viewBox: '0 0 120 280', class: 'semaforo-svg', role: 'img', 'aria-label': 'Semáforo de tres luces' });
  dibujo.append(
    svg('rect', { x: 54, y: 220, width: 12, height: 60, rx: 3, class: 'semaforo-poste' }),
    svg('rect', { x: 20, y: 10, width: 80, height: 214, rx: 16, class: 'semaforo-caja' }),
  );
  ['ROJO', 'AMARILLO', 'VERDE'].forEach((luz, i) => {
    const c = svg('circle', { cx: 60, cy: 50 + i * 67, r: 26, class: 'semaforo-luz', fill: COLORES[luz] });
    luces[luz] = c;
    dibujo.append(c);
  });

  // ---------- Código con números editables ----------
  const lineas = [];
  const codigo = el('pre', { class: 'semaforo-codigo', 'aria-label': 'Código del loop' });
  const agregarLinea = (contenido) => { const l = el('span', { class: 'semaforo-linea' }, ...contenido); lineas.push(l); codigo.append(l); };
  codigo.append(el('span', { class: 'semaforo-fija' }, 'void loop() {'));
  programa.forEach((paso) => {
    if (paso.tipo === 'escribir') {
      agregarLinea([`  digitalWrite(${paso.luz}, ${paso.valor});`]);
    } else {
      const entrada = el('input', { type: 'number', min: '100', max: '20000', step: '100', value: tiempos[paso.luz], class: 'semaforo-tiempo', 'aria-label': `Milisegundos de espera con la luz ${paso.luz.toLowerCase()}` });
      entrada.addEventListener('change', () => {
        tiempos[paso.luz] = limitar(Number(entrada.value) || 100, 100, 20000);
        entrada.value = tiempos[paso.luz];
      });
      agregarLinea(['  delay(', entrada, ');']);
    }
  });
  codigo.append(el('span', { class: 'semaforo-fija' }, '}'));

  const reloj = el('p', { class: 'semaforo-reloj', 'aria-live': 'off' });
  const botonPlay = el('button', { type: 'button', class: 'boton boton-chico' });
  const botonReiniciar = el('button', { type: 'button', class: 'anim-boton' }, '↺ Reiniciar');

  contenedor.append(el('div', { class: 'anim-semaforo' },
    el('div', { class: 'semaforo-columna' }, dibujo, reloj),
    el('div', { class: 'anim-controles' }, codigo,
      el('div', { class: 'anim-rapidos' }, botonPlay, botonReiniciar),
      el('p', { class: 'texto-ayuda' }, 'Cambia los números de los delay() y observa.'))));

  // ---------- Ejecución ----------
  let estado = { VERDE: false, AMARILLO: false, ROJO: false };
  let indice = 0;
  let restante = 0;           // ms que faltan del delay actual
  let tiempoVuelta = 0;       // ms desde que empezó la vuelta del loop
  let vuelta = 1;
  let corriendo = false;
  let ultimo = 0;

  function dibujar() {
    for (const luz of Object.keys(luces)) luces[luz].classList.toggle('encendida', estado[luz]);
    lineas.forEach((l, i) => l.classList.toggle('activa', i === indice));
    reloj.textContent = `Vuelta ${vuelta} · ${(tiempoVuelta / 1000).toFixed(1).replace('.', ',')} s`;
    botonPlay.textContent = corriendo ? '⏸ Pausa' : '▶ Ejecutar';
  }

  // Ejecuta instrucciones hasta encontrar un delay que todavía no termina
  function avanzar(ms) {
    let presupuesto = ms;
    for (let seguridad = 0; seguridad < 50; seguridad++) {
      const paso = programa[indice];
      if (paso.tipo === 'escribir') {
        estado[paso.luz] = paso.valor === 'HIGH';
      } else {
        if (restante === 0) restante = tiempos[paso.luz];
        const uso = Math.min(restante, presupuesto);
        restante -= uso; presupuesto -= uso; tiempoVuelta += uso;
        if (restante > 0) return;
      }
      indice += 1;
      if (indice >= programa.length) { indice = 0; vuelta += 1; tiempoVuelta = 0; }
      if (presupuesto <= 0 && programa[indice].tipo === 'esperar') return;
    }
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(250, tiempo - ultimo) : 0;
    ultimo = tiempo;
    if (corriendo) { avanzar(dt); dibujar(); }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonPlay.addEventListener('click', () => { corriendo = !corriendo; if (corriendo && restante === 0 && indice === 0) avanzar(0); dibujar(); });
  botonReiniciar.addEventListener('click', () => {
    corriendo = false; indice = 0; restante = 0; tiempoVuelta = 0; vuelta = 1;
    estado = { VERDE: false, AMARILLO: false, ROJO: false };
    dibujar();
  });

  dibujar();
  requestAnimationFrame(cuadro);
}
