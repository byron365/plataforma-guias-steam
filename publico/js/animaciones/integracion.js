// ============================================================
// Animación "integracion": ¿por qué conectar un nodo a la vez?
// Uno de los nodos tiene un problema escondido (elegido al azar). Se puede:
//   - Conectar todo de una vez y probar: algo falla, pero no se sabe qué nodo.
//   - Conectar de uno en uno, probando después de cada paso: el paso donde
//     aparece la falla dice qué nodo revisar.
// Solo muestra el síntoma (lo que se ve), no la causa: esa la buscan los equipos.
//
// En la guía:
//   :::animacion tipo="integracion"
//   :::
// Opciones: ninguna.
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

const NODOS = [
  { nombre: 'Sala', dir: 8, x: 210 },
  { nombre: 'Cuarto', dir: 9, x: 330 },
  { nombre: 'Entrada', dir: 10, x: 450 },
];
const SINTOMAS = [
  'la central no recibe respuesta de un nodo',
  'la pantalla muestra datos que no cambian',
  'un Arduino se reinicia al encender su carga',
];

export default function montar(contenedor) {
  let conectados = [false, false, false];
  let fallo = Math.floor(Math.random() * 3);
  let sintoma = SINTOMAS[Math.floor(Math.random() * SINTOMAS.length)];
  let pasos = [];
  let encontrado = false;
  let nuevos = 0;            // nodos conectados desde la última prueba
  let ultimoNodo = -1;

  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 540 200', class: 'integ-svg', role: 'img', 'aria-label': 'Central y nodos conectados al bus' },
    svg('rect', { x: 20, y: 60, width: 110, height: 60, rx: 8, class: 'i2c-caja maestro' }),
    svg('text', { x: 75, y: 95, class: 'i2c-texto claro', 'text-anchor': 'middle' }, 'Central'),
    capa);
  const botones = NODOS.map((n, i) => el('button', { type: 'button', class: 'anim-boton', onclick: () => conectar(i) }, `+ Conectar ${n.nombre.toLowerCase()}`));
  const botonTodo = el('button', { type: 'button', class: 'anim-boton' }, 'Conectar todo de una vez');
  const botonProbar = el('button', { type: 'button', class: 'boton boton-chico' }, '🧪 Probar');
  const botonNuevo = el('button', { type: 'button', class: 'anim-boton' }, '↺ Empezar otra vez (otro problema)');
  const resultado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  const lista = el('ol', { class: 'integ-pasos' });
  contenedor.append(el('div', { class: 'anim-integ' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('div', { class: 'anim-rapidos' }, ...botones),
      el('div', { class: 'anim-rapidos' }, botonTodo, botonProbar, botonNuevo),
      resultado, lista,
      el('p', { class: 'texto-ayuda' }, 'Uno de los nodos tiene un problema escondido. ¿Cuál forma de integrar lo encuentra?'))));

  function dibujar() {
    const piezas = [svg('line', { x1: 130, y1: 90, x2: 520, y2: 90, class: 'i2c-cable sda' })];
    NODOS.forEach((n, i) => {
      const c = conectados[i];
      piezas.push(
        svg('line', { x1: n.x + 40, x2: n.x + 40, y1: 90, y2: c ? 130 : 112, class: `i2c-cable sda${c ? '' : ' suelto'}` }),
        svg('rect', { x: n.x, y: 130, width: 80, height: 50, rx: 8, class: `integ-nodo${c ? ' conectado' : ''}${encontrado && i === fallo ? ' falla' : ''}` }),
        svg('text', { x: n.x + 40, y: 152, class: 'i2c-texto claro', 'text-anchor': 'middle' }, n.nombre),
        svg('text', { x: n.x + 40, y: 168, class: 'i2c-texto claro chico', 'text-anchor': 'middle' }, `(${n.dir})`));
    });
    capa.replaceChildren(...piezas);
    botones.forEach((b, i) => { b.disabled = conectados[i]; });
    lista.replaceChildren(...pasos.map((p) => el('li', { class: p.ok ? 'bien' : 'mal' }, p.texto)));
  }

  function conectar(i) { conectados[i] = true; nuevos++; ultimoNodo = i; resultado.textContent = `${NODOS[i].nombre} conectado. Prueben antes de seguir.`; dibujar(); }

  function probar() {
    const cuales = NODOS.filter((_, i) => conectados[i]).map((n) => n.nombre.toLowerCase());
    if (!cuales.length) { resultado.textContent = 'Primero conecten al menos un nodo.'; return; }
    const falla = conectados[fallo];
    const texto = `Central + ${cuales.join(' + ')}: ${falla ? `✗ falla: ${sintoma}` : '✓ todo responde'}`;
    pasos.push({ texto, ok: !falla });
    if (falla) {
      // Si solo se agregó un nodo desde la última prueba que funcionó, ese es el culpable
      encontrado = nuevos === 1 && ultimoNodo === fallo;
      resultado.textContent = encontrado
        ? `Antes funcionaba y ahora falla: el problema está en el último nodo que conectaron (${NODOS[fallo].nombre.toLowerCase()}).`
        : nuevos === 1
          ? 'Sigue fallando: el problema venía de antes de conectar este nodo, y no se sabe cuál es.'
          : `Algo falla, pero se agregaron ${nuevos} nodos desde la última prueba: no se sabe cuál es.`;
    } else {
      resultado.textContent = 'Funciona. Conecten el siguiente nodo y vuelvan a probar.';
    }
    nuevos = 0;
    dibujar();
  }

  botonTodo.addEventListener('click', () => { nuevos += conectados.filter((c) => !c).length; conectados = [true, true, true]; resultado.textContent = 'Los tres nodos conectados a la vez.'; dibujar(); });
  botonProbar.addEventListener('click', probar);
  botonNuevo.addEventListener('click', () => {
    conectados = [false, false, false]; pasos = []; encontrado = false; nuevos = 0; ultimoNodo = -1;
    fallo = Math.floor(Math.random() * 3); sintoma = SINTOMAS[Math.floor(Math.random() * SINTOMAS.length)];
    resultado.textContent = 'Nuevo intento: hay un problema escondido en algún nodo.'; dibujar();
  });
  resultado.textContent = 'Hay un problema escondido en algún nodo. Elijan cómo integrar.';
  dibujar();
}
