// ============================================================
// Animación "uart": dos Arduino conversando por UART (SoftwareSerial en D10 y D11).
// Los cables se cruzan: el TX de uno va al RX del otro. Cada letra viaja bit a bit:
// un bit de inicio, los 8 bits de la letra (el código ASCII, empezando por el
// bit de menor valor) y un bit de fin. Como en el ejemplo de la guía 1:
//   - el botón de A envía "LED,1" y B cambia su LED (D13)
//   - lo que se escribe en el monitor de un lado aparece en el otro
// No trae la prueba de desconectar el GND (esa la hace el equipo).
//
// En la guía:
//   :::animacion tipo="uart"
//   :::
// Opciones: ninguna.
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

const MS_POR_BIT = 90;   // cámara lenta (a 9600 baudios real, un bit dura 0,1 ms)

export default function montar(contenedor) {
  const lados = [
    { nombre: 'Arduino A', cola: [], actual: null, recibido: '', monitor: [] },
    { nombre: 'Arduino B', cola: [], actual: null, recibido: '', monitor: [] },
  ];
  let ledB = false; let ultimo = 0;

  // ---------- Dibujo ----------
  const bitsCapas = [svg('g', {}), svg('g', {})];
  const led = svg('circle', { cx: 498, cy: 60, r: 8, class: 'uart-led' });
  const raiz = svg('svg', { viewBox: '0 0 560 200', class: 'uart-svg', role: 'img', 'aria-label': 'Dos Arduino con los cables TX y RX cruzados' },
    svg('rect', { x: 10, y: 30, width: 110, height: 140, rx: 8, class: 'wifi-arduino' }),
    svg('text', { x: 65, y: 62, class: 'wifi-texto claro', 'text-anchor': 'middle' }, 'Arduino A'),
    svg('rect', { x: 440, y: 30, width: 110, height: 140, rx: 8, class: 'wifi-arduino' }),
    svg('text', { x: 495, y: 92, class: 'wifi-texto claro', 'text-anchor': 'middle' }, 'Arduino B'),
    led, svg('text', { x: 498, y: 44, class: 'wifi-texto claro chico', 'text-anchor': 'middle' }, 'LED D13'),
    // A TX (D11) → B RX (D10)  ·  B TX (D11) → A RX (D10)
    svg('path', { d: 'M 120 90 C 280 90, 280 90, 440 90', class: 'uart-cable a' }),
    svg('path', { d: 'M 440 130 C 280 130, 280 130, 120 130', class: 'uart-cable b' }),
    svg('line', { x1: 120, y1: 160, x2: 440, y2: 160, class: 'uart-cable gnd' }),
    svg('text', { x: 124, y: 84, class: 'uart-pin' }, 'TX D11'), svg('text', { x: 436, y: 84, class: 'uart-pin', 'text-anchor': 'end' }, 'RX D10'),
    svg('text', { x: 436, y: 124, class: 'uart-pin', 'text-anchor': 'end' }, 'TX D11'), svg('text', { x: 124, y: 124, class: 'uart-pin' }, 'RX D10'),
    svg('text', { x: 280, y: 176, class: 'uart-pin', 'text-anchor': 'middle' }, 'GND común'),
    ...bitsCapas);

  const monitores = lados.map(() => el('pre', { class: 'disp-monitor', 'aria-live': 'polite' }));
  const entradas = lados.map((l) => el('input', { type: 'text', class: 'oled-mensaje', maxlength: 16, 'aria-label': `Escribir en el monitor de ${l.nombre}` }));
  // Como el Monitor serie con "Nueva línea": el mensaje termina con \n
  const enviar = (i) => { const t = entradas[i].value; if (!t) return; encolar(i, `${t}\n`); entradas[i].value = ''; };
  const botonesEnviar = lados.map((_, i) => el('button', { type: 'button', class: 'anim-boton', onclick: () => enviar(i) }, 'Enviar'));
  entradas.forEach((e, i) => e.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') enviar(i); }));
  const botonA = el('button', { type: 'button', class: 'boton boton-chico' }, '🔘 Botón de A (D2)');
  const detalle = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });

  contenedor.append(el('div', { class: 'anim-uart' }, raiz,
    el('div', { class: 'uart-panel' },
      ...lados.map((l, i) => el('div', {},
        el('p', { class: 'anim-etiqueta' }, `Monitor serie de ${l.nombre}`), monitores[i],
        el('div', { class: 'casa-enviar' }, entradas[i], botonesEnviar[i]),
        i === 0 ? el('div', { class: 'anim-rapidos' }, botonA) : null))),
    detalle));

  function encolar(i, texto) { for (const c of texto) lados[i].cola.push(c); }
  function escribirMonitor(i, linea) { lados[i].monitor.push(linea); lados[i].monitor = lados[i].monitor.slice(-6); monitores[i].textContent = lados[i].monitor.join('\n'); }

  // Bits de una letra: inicio (0), 8 bits de datos (el menos importante primero), fin (1)
  const bitsDe = (c) => {
    const n = c.charCodeAt(0) & 0xFF;
    return [0, ...Array.from({ length: 8 }, (_, k) => (n >> k) & 1), 1];
  };

  function recibir(i, c) {
    // Llega una letra al otro lado
    const otro = lados[1 - i];
    if (c === '\n') {
      const m = otro.recibido.replace(/\r$/, '');
      escribirMonitor(1 - i, `Recibí: ${m}`);
      if (1 - i === 1 && m.startsWith('LED,1')) ledB = !ledB;
      otro.recibido = '';
    } else otro.recibido += c;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    lados.forEach((l, i) => {
      if (!l.actual && l.cola.length) {
        const c = l.cola.shift();
        l.actual = { c, bits: bitsDe(c), t: 0 };
      }
      if (l.actual) {
        l.actual.t += dt;
        if (l.actual.t >= MS_POR_BIT * (l.actual.bits.length + 3)) { recibir(i, l.actual.c); l.actual = null; }
      }
      // Dibujar los bits viajando por el cable
      const capa = bitsCapas[i]; capa.replaceChildren();
      if (l.actual) {
        const y = i === 0 ? 90 : 130; const dir = i === 0 ? 1 : -1; const x0 = i === 0 ? 120 : 440;
        l.actual.bits.forEach((b, k) => {
          const avance = (l.actual.t / MS_POR_BIT - k) * 24;
          if (avance < 0 || avance > 320) return;
          const x = x0 + dir * avance;
          const tipo = k === 0 ? 'inicio' : k === l.actual.bits.length - 1 ? 'fin' : 'dato';
          capa.append(svg('rect', { x: x - 9, y: y - 9, width: 18, height: 18, rx: 4, class: `uart-bit ${tipo}` }),
            svg('text', { x, y: y + 4, class: 'uart-bit-texto', 'text-anchor': 'middle' }, String(b)));
        });
      }
    });
    led.classList.toggle('encendido', ledB);
    const activo = lados.find((l) => l.actual);
    if (activo) {
      const c = activo.actual.c; const codigo = c.charCodeAt(0);
      detalle.textContent = `${activo.nombre} envía '${c === '\n' ? '\\n' : c === '\r' ? '\\r' : c}' = ${codigo} = ${codigo.toString(2).padStart(8, '0')} en binario\n` +
        `Por el cable: inicio (0) · 8 bits de la letra (el de menor valor primero) · fin (1)`;
    }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  // enlace.println("LED,1") manda las letras, \r y \n
  botonA.addEventListener('click', () => { encolar(0, 'LED,1\r\n'); escribirMonitor(0, '(botón) enlace.println("LED,1")'); });
  detalle.textContent = 'Presiona el botón de A o escribe un mensaje (Enter lo termina con \\n).';
  requestAnimationFrame(cuadro);
}
