// ============================================================
// Animación "i2c": un maestro y sus esclavos en el mismo bus (SDA y SCL).
// Corre el ejemplo de la guía: el maestro pide 1 byte al esclavo
// (Wire.requestFrom), el esclavo responde con su perilla, y el maestro le
// manda una orden (Wire.beginTransmission + write) con el brillo del LED.
// El mensaje se dibuja por partes: inicio, dirección + leer/escribir,
// confirmación (ACK), dato y fin. Solo responde el esclavo con esa dirección.
//
// En la guía:
//   :::animacion tipo="i2c"
//   :::
// Opciones (todas opcionales):
//   esclavos   "Nombre|dirección; Nombre|dirección" (por defecto "Esclavo|8")
//   orden      una letra (por ejemplo "L"): la orden lleva 2 bytes, la letra y un valor de 0 a 100
//              que se elige con un deslizador (casa inteligente, guía 1)
// ============================================================
import { svg, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const Y_SDA = 70; const Y_SCL = 96;
const PARTES_LEER = ['INICIO', 'dir + leer', 'ACK', 'dato', 'fin'];
const PARTES_ESCRIBIR = ['INICIO', 'dir + escribir', 'ACK', 'dato', 'ACK', 'FIN'];

function leerEsclavos(texto) {
  const lista = String(texto || 'Esclavo|8').split(';').map((p) => {
    const [nombre, dir] = p.split('|').map((s) => s.trim());
    const n = /^0x/i.test(dir || '') ? parseInt(dir, 16) : Number(dir);
    return { nombre: nombre || 'Esclavo', dir: Number.isInteger(n) && n > 0 && n < 128 ? n : 8 };
  }).filter((e) => e.nombre);
  return lista.slice(0, 4);
}
const hex = (n) => `0x${n.toString(16).toUpperCase().padStart(2, '0')}`;

export default function montar(contenedor, config) {
  const esclavos = leerEsclavos(config.esclavos).map((e) => ({ ...e, perilla: 128, brillo: 0 }));
  let elegido = 0;
  let mensaje = null;        // { partes, paso, tiempo, tipo, esclavo, dato }
  let auto = false; let ultimo = 0; let espera = 0;
  let registro = [];

  const letra = /^[A-Za-z]$/.test(config.orden || '') ? config.orden : null;
  const partesEscribir = letra ? ['INICIO', 'dir + escribir', 'ACK', `'${letra}'`, 'ACK', 'dato', 'ACK', 'FIN'] : PARTES_ESCRIBIR;
  let valorOrden = 50;
  const ancho = Math.max(620, 200 + esclavos.length * 150, 160 + partesEscribir.length * 74);
  const xEsclavo = (i) => 190 + i * 150;
  const capaMensaje = svg('g', {});
  const grupos = esclavos.map((e, i) => {
    const g = svg('g', { class: 'i2c-esclavo' });
    g.append(
      svg('line', { x1: xEsclavo(i) + 30, x2: xEsclavo(i) + 30, y1: Y_SDA, y2: 134, class: 'i2c-cable sda' }),
      svg('line', { x1: xEsclavo(i) + 60, x2: xEsclavo(i) + 60, y1: Y_SCL, y2: 134, class: 'i2c-cable scl' }),
      svg('rect', { x: xEsclavo(i), y: 134, width: 110, height: 70, rx: 8, class: 'i2c-caja' }),
      svg('text', { x: xEsclavo(i) + 55, y: 158, class: 'i2c-texto claro', 'text-anchor': 'middle' }, e.nombre),
      svg('text', { x: xEsclavo(i) + 55, y: 176, class: 'i2c-texto claro chico', 'text-anchor': 'middle' }, `dirección ${e.dir}`));
    const led = svg('circle', { cx: xEsclavo(i) + 92, cy: 192, r: 6, class: 'i2c-led' });
    const aviso = svg('text', { x: xEsclavo(i) + 55, y: 222, class: 'i2c-texto', 'text-anchor': 'middle' });
    g.append(led, aviso);
    return { g, led, aviso };
  });
  const raiz = svg('svg', { viewBox: `0 0 ${ancho} 236`, class: 'i2c-svg', role: 'img', 'aria-label': 'Bus I2C con un maestro y sus esclavos' },
    svg('rect', { x: 14, y: 46, width: 120, height: 80, rx: 8, class: 'i2c-caja maestro' }),
    svg('text', { x: 74, y: 82, class: 'i2c-texto claro', 'text-anchor': 'middle' }, 'Maestro'),
    svg('text', { x: 74, y: 100, class: 'i2c-texto claro chico', 'text-anchor': 'middle' }, 'Wire.begin()'),
    svg('line', { x1: 134, x2: ancho - 10, y1: Y_SDA, y2: Y_SDA, class: 'i2c-cable sda' }),
    svg('line', { x1: 134, x2: ancho - 10, y1: Y_SCL, y2: Y_SCL, class: 'i2c-cable scl' }),
    svg('text', { x: ancho - 12, y: Y_SDA - 6, class: 'i2c-texto', 'text-anchor': 'end' }, 'SDA (A4) · datos'),
    svg('text', { x: ancho - 12, y: Y_SCL + 16, class: 'i2c-texto', 'text-anchor': 'end' }, 'SCL (A5) · reloj'),
    ...grupos.map((g) => g.g), capaMensaje);

  const selector = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Esclavo al que habla el maestro' },
    esclavos.map((e, i) => el('button', { type: 'button', class: 'anim-boton', 'data-i': i, onclick: () => { elegido = i; marcar(); } }, `${e.nombre} (${e.dir})`)));
  const entradaOrden = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 100, step: 1, value: 50, 'aria-label': 'Valor de la orden' });
  entradaOrden.addEventListener('input', () => { valorOrden = Number(entradaOrden.value); });
  const perilla = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 255, step: 1, value: 128, 'aria-label': 'Perilla del esclavo elegido' });
  const botonPedir = el('button', { type: 'button', class: 'boton boton-chico' }, '📥 Wire.requestFrom(…, 1)');
  const botonOrden = el('button', { type: 'button', class: 'anim-boton' }, '📤 Mandar el brillo');
  const casilla = el('input', { type: 'checkbox' });
  const monitor = el('pre', { class: 'disp-monitor', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-i2c' },
    raiz,
    el('div', { class: 'i2c-panel' },
      el('div', {},
        esclavos.length > 1 ? el('p', { class: 'anim-etiqueta' }, 'El maestro le habla a:') : null,
        esclavos.length > 1 ? selector : null,
        el('label', { class: 'anim-etiqueta' }, 'Perilla del esclavo (A0 ÷ 4)', perilla),
        letra ? el('label', { class: 'anim-etiqueta' }, `Valor de la orden '${letra}' (0 a 100)`, entradaOrden) : null,
        el('div', { class: 'anim-rapidos' }, botonPedir, botonOrden),
        el('label', { class: 'casilla-simple' }, casilla, ' El loop del maestro se repite solo')),
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Lo que pasa en el bus'), monitor))));

  function marcar() {
    selector.querySelectorAll('button').forEach((b) => { const a = Number(b.dataset.i) === elegido; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    perilla.value = esclavos[elegido].perilla;
    botonPedir.textContent = `📥 Wire.requestFrom(${esclavos[elegido].dir}, 1)`;
    botonOrden.textContent = `📤 beginTransmission(${esclavos[elegido].dir}) + write`;
  }
  const escribir = (t) => { registro.push(t); registro = registro.slice(-8); monitor.textContent = registro.join('\n'); };

  function empezar(tipo) {
    if (mensaje) return;
    const e = esclavos[elegido];
    const dato = tipo === 'leer' ? e.perilla : letra ? valorOrden : (registro.length ? ultimoValor : e.perilla);
    mensaje = { partes: tipo === 'leer' ? PARTES_LEER : partesEscribir, paso: 0, tiempo: 0, tipo, esclavo: elegido, dato };
    escribir(tipo === 'leer' ? `Maestro → dirección ${e.dir} (${hex(e.dir)}): ¿me das 1 byte?` : `Maestro → dirección ${e.dir}: te mando ${letra ? `'${letra}' y ` : ''}${dato}`);
  }
  let ultimoValor = 128;

  function dibujarMensaje() {
    capaMensaje.replaceChildren();
    grupos.forEach((g, i) => {
      const activo = mensaje && mensaje.paso >= 1 && mensaje.esclavo === i;
      const ignora = mensaje && mensaje.paso >= 1 && mensaje.esclavo !== i;
      g.g.classList.toggle('activo', Boolean(activo));
      g.aviso.textContent = activo ? '¡Es para mí!' : ignora ? 'No es mi dirección' : '';
      g.led.setAttribute('opacity', (0.15 + 0.85 * esclavos[i].brillo / 255).toFixed(2));
    });
    if (!mensaje) return;
    // Las partes del mensaje, una tras otra sobre SDA
    mensaje.partes.forEach((p, j) => {
      if (j > mensaje.paso) return;
      const deEsclavo = (p === 'ACK' && mensaje.tipo === 'escribir') || (mensaje.tipo === 'leer' && (p === 'ACK' || p === 'dato'));
      const texto = p === 'dato' ? String(mensaje.dato) : p;
      const x = 150 + j * 74;
      capaMensaje.append(svg('g', { class: `i2c-parte${deEsclavo ? ' esclavo' : ''}` },
        svg('rect', { x, y: 14, width: 68, height: 24, rx: 6 }),
        svg('text', { x: x + 34, y: 30, 'text-anchor': 'middle' }, texto)));
    });
    // Pulsos del reloj mientras se habla
    for (let k = 0; k < 8; k++) capaMensaje.append(svg('rect', { x: 150 + ((mensaje.tiempo / 40 + k * 40) % (ancho - 170)), y: Y_SCL - 4, width: 6, height: 8, class: 'oled-reloj', style: 'opacity:1;animation:none' }));
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (mensaje) {
      mensaje.tiempo += dt;
      if (mensaje.tiempo > 420) {
        mensaje.tiempo = 0; mensaje.paso++;
        if (mensaje.paso >= mensaje.partes.length) {
          const e = esclavos[mensaje.esclavo];
          if (mensaje.tipo === 'leer') { ultimoValor = mensaje.dato; escribir(`${e.nombre} responde: ${mensaje.dato}  → Serial.println(${mensaje.dato})`); }
          else if (letra) { e.brillo = Math.round(mensaje.dato * 2.55); escribir(`${e.nombre} recibe '${letra}' y ${mensaje.dato}: brillo = ${mensaje.dato} %`); }
          else { e.brillo = mensaje.dato; escribir(`${e.nombre} recibe ${mensaje.dato}: analogWrite(9, ${mensaje.dato})`); }
          const siguiente = mensaje.tipo === 'leer' && auto ? 'escribir' : null;
          mensaje = null;
          if (siguiente) empezar(siguiente);
        }
      }
    } else if (auto) {
      espera += dt;
      if (espera > 600) { espera = 0; empezar('leer'); }
    }
    dibujarMensaje();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  perilla.addEventListener('input', () => { esclavos[elegido].perilla = limitar(Number(perilla.value), 0, 255); });
  botonPedir.addEventListener('click', () => empezar('leer'));
  botonOrden.addEventListener('click', () => empezar('escribir'));
  casilla.addEventListener('change', () => { auto = casilla.checked; espera = 600; });
  marcar();
  escribir('Bus libre. El maestro empieza todas las conversaciones.');
  requestAnimationFrame(cuadro);
}
