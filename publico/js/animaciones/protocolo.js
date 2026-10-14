// ============================================================
// Animación "protocolo": los mensajes entre los nodos, uno por uno y en orden.
// Dos líneas de vida (una por nodo) y flechas con el contenido de cada mensaje,
// como en un diagrama de secuencia. Se puede ir mensaje por mensaje o en automático,
// y cambiar lo que pasa en el mundo (llega una pieza, el botón de paro…).
//
// En la guía:
//   :::animacion tipo="protocolo" sistema="banda"
//   :::
// Sistemas listos: "banda" · "robot"
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

// Cada sistema define sus dos nodos, los controles y los mensajes de una vuelta del loop
const SISTEMAS = {
  // banda_NODO_CLASIFICADOR.ino (maestro) ↔ banda_NODO_BANDA.ino (esclavo 8)
  banda: {
    nodos: ['Clasificador (maestro)', 'Nodo banda (esclavo 8)'],
    estado: () => ({ paro: false, pieza: false, velocidad: 128, detenida: false }),
    controles: (e, cambiar) => [
      el('label', { class: 'anim-etiqueta' }, 'Perilla de la banda (velocidad 0 a 255)',
        Object.assign(el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 255, step: 1, value: e.velocidad, 'aria-label': 'Velocidad' }),
          { oninput: (ev) => cambiar(() => { e.velocidad = Number(ev.target.value); }) })),
      el('div', { class: 'anim-rapidos' },
        el('button', { type: 'button', class: 'anim-boton', onclick: () => cambiar(() => { e.pieza = true; }) }, '▣ Llega una pieza al IR'),
        el('button', { type: 'button', class: 'anim-boton', onclick: () => cambiar(() => { e.paro = !e.paro; }) }, '🛑 Botón de paro (presionar / soltar)')),
    ],
    vuelta: (e) => [
      { de: 0, texto: `beginTransmission(8) · write('${e.paro ? 'S' : 'G'}')`, bytes: [e.paro ? "'S'" : "'G'"],
        efecto: () => { e.detenida = e.paro; return e.paro ? 'El nodo banda recibe S: detenida = true → motor en 0' : 'El nodo banda recibe G: la banda avanza'; } },
      { de: 0, texto: 'requestFrom(8, 2)', bytes: ['¿?'], efecto: () => 'El maestro pide 2 bytes' },
      { de: 1, texto: () => `write(${e.pieza ? 1 : 0}) · write(${e.velocidad})`, bytes: () => [e.pieza ? '1' : '0', String(e.velocidad)],
        efecto: () => { const habia = e.pieza; e.pieza = false; return habia ? '¡Hay pieza! El maestro llama a clasificar(). El aviso se borra (pieza = false).' : 'No hay pieza nueva.'; } },
    ],
  },
  // robot_telemetria_MANDO.ino ↔ robot_telemetria_ROBOT.ino (texto con comas que termina en \n)
  robot: {
    nodos: ['Mando', 'Robot'],
    estado: () => ({ y: 150, x: 0, bat: 7.6, dist: 42, mensaje: 'M,150,150' }),
    controles: (e, cambiar) => [
      el('label', { class: 'anim-etiqueta' }, 'Joystick: avance (Y)',
        Object.assign(el('input', { type: 'range', class: 'anim-deslizador', min: -245, max: 245, step: 35, value: e.y, 'aria-label': 'Avance' }),
          { oninput: (ev) => cambiar(() => { e.y = Number(ev.target.value); }) })),
      el('label', { class: 'anim-etiqueta' }, 'Joystick: giro (X)',
        Object.assign(el('input', { type: 'range', class: 'anim-deslizador', min: -245, max: 245, step: 35, value: e.x, 'aria-label': 'Giro' }),
          { oninput: (ev) => cambiar(() => { e.x = Number(ev.target.value); }) })),
      el('label', { class: 'anim-etiqueta' }, 'Distancia al obstáculo (cm)',
        Object.assign(el('input', { type: 'range', class: 'anim-deslizador', min: 5, max: 200, step: 1, value: e.dist, 'aria-label': 'Distancia' }),
          { oninput: (ev) => cambiar(() => { e.dist = Number(ev.target.value); }) })),
    ],
    vuelta: (e) => {
      const izq = Math.max(-255, Math.min(255, e.y + e.x)); const der = Math.max(-255, Math.min(255, e.y - e.x));
      e.bat = Math.max(6.4, Number((e.bat - 0.1).toFixed(1)));   // la batería se gasta (rápido, para verlo)
      return [
        { de: 0, texto: `M,${izq},${der}\\n`, bytes: ['M', String(izq), String(der)],
          efecto: () => `El robot separa por las comas: motor izquierdo ${izq}, derecho ${der}. Guarda la hora del mensaje (para el TIMEOUT).` },
        { de: 1, texto: () => `T,${e.bat.toFixed(1)},${e.dist}\\n`, bytes: () => ['T', e.bat.toFixed(1), String(e.dist)],
          efecto: () => `El mando muestra ${e.bat.toFixed(1)} V y ${e.dist} cm en la OLED${e.bat < 6.8 ? ' y el aviso BATERIA!' : ''}.` },
      ];
    },
  },
};

const X = [120, 480];

export default function montar(contenedor, config) {
  const sistema = SISTEMAS[config.sistema];
  if (!sistema) {
    contenedor.append(el('p', { class: 'animacion-cargando' }, `El protocolo "${config.sistema || ''}" todavía no está disponible.`));
    return;
  }
  const e = sistema.estado();
  let cola = []; let historial = []; let vuelta = 0;
  let auto = false; let ultimo = 0; let espera = 0;

  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 600 330', class: 'proto-svg', role: 'img', 'aria-label': `Mensajes entre ${sistema.nodos.join(' y ')}` },
    ...sistema.nodos.map((n, i) => svg('g', {},
      svg('rect', { x: X[i] - 90, y: 8, width: 180, height: 34, rx: 8, class: 'proto-nodo' }),
      svg('text', { x: X[i], y: 30, class: 'proto-nodo-texto', 'text-anchor': 'middle' }, n),
      svg('line', { x1: X[i], x2: X[i], y1: 42, y2: 322, class: 'proto-vida' }))),
    capa);
  const botonPaso = el('button', { type: 'button', class: 'boton boton-chico' }, '▶ Siguiente mensaje');
  const casilla = el('input', { type: 'checkbox' });
  const explicacion = el('p', { class: 'anim-estado', 'aria-live': 'polite' }, 'Toca "Siguiente mensaje" para ver la primera vuelta del loop del maestro.');
  const cambiar = (f) => { f(); };
  contenedor.append(el('div', { class: 'anim-protocolo' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('div', { class: 'anim-rapidos' }, botonPaso),
      el('label', { class: 'casilla-simple' }, casilla, ' Automático'),
      ...sistema.controles(e, cambiar),
      explicacion)));

  function paso() {
    if (!cola.length) { cola = sistema.vuelta(e); vuelta++; }
    const m = cola.shift();
    const texto = typeof m.texto === 'function' ? m.texto() : m.texto;
    const bytes = typeof m.bytes === 'function' ? m.bytes() : m.bytes;
    historial.push({ de: m.de, texto, bytes, vuelta });
    historial = historial.slice(-7);
    explicacion.textContent = `Vuelta ${vuelta} · ${m.efecto()}`;
    dibujar();
  }

  function dibujar() {
    capa.replaceChildren();
    historial.forEach((h, i) => {
      const y = 70 + i * 38;
      const x1 = X[h.de]; const x2 = X[1 - h.de];
      const dir = Math.sign(x2 - x1);
      const ultima = i === historial.length - 1;
      capa.append(
        svg('line', { x1, x2: x2 - dir * 8, y1: y, y2: y, class: `proto-flecha${h.de ? ' respuesta' : ''}${ultima ? ' nueva' : ''}` }),
        svg('path', { d: `M ${x2} ${y} l ${-dir * 10} -6 l 0 12 z`, class: `proto-punta${h.de ? ' respuesta' : ''}` }),
        svg('text', { x: (x1 + x2) / 2, y: y - 7, class: 'proto-texto', 'text-anchor': 'middle' }, h.texto),
        svg('text', { x: 6, y: y + 4, class: 'proto-vuelta' }, `v${h.vuelta}`),
        ...h.bytes.map((b, j) => svg('g', { class: 'proto-byte' },
          svg('rect', { x: (x1 + x2) / 2 - h.bytes.length * 18 + j * 36, y: y + 4, width: 32, height: 16, rx: 4 }),
          svg('text', { x: (x1 + x2) / 2 - h.bytes.length * 18 + j * 36 + 16, y: y + 16, 'text-anchor': 'middle' }, b))));
    });
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (auto) { espera += dt; if (espera > 1100) { espera = 0; paso(); } }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  botonPaso.addEventListener('click', paso);
  casilla.addEventListener('change', () => { auto = casilla.checked; });
  dibujar();
  requestAnimationFrame(cuadro);
}
