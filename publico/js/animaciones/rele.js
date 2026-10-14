// ============================================================
// Animación "rele": el relé es un interruptor que el Arduino acciona.
// Con digitalWrite(BOMBA, HIGH) la bobina del relé atrae el contacto,
// COM se une con NO y la corriente de las pilas llega a la bomba.
//
// En la guía:
//   :::animacion tipo="rele"
//   :::
// Opciones (todas opcionales):
//   pin       pin del Arduino que controla el relé (por defecto 8)
//   carga     lo que se enciende (por defecto "Bomba")
//   variable  nombre de la constante en el código (por defecto "BOMBA")
// ============================================================
import { svg, numero } from './comun/svg.js';
import { el } from '../comun.js';

export default function montar(contenedor, config) {
  const pin = numero(config.pin, 8);
  const carga = config.carga || 'Bomba';
  const variable = /^[A-Za-z_]\w*$/.test(config.variable || '') ? config.variable : 'BOMBA';
  let encendido = false;

  const raiz = svg('svg', { viewBox: '0 0 600 300', class: 'rele-svg', role: 'img', 'aria-label': `Relé que enciende la ${carga.toLowerCase()} con las pilas` });
  const cableControl = svg('path', { d: 'M 120 150 L 200 150', class: 'rele-cable rele-control' });
  const bobina = svg('g', { class: 'rele-bobina' },
    svg('rect', { x: 210, y: 175, width: 70, height: 46, rx: 6 }),
    ...[0, 1, 2, 3, 4].map((i) => svg('line', { x1: 220 + i * 12, y1: 180, x2: 220 + i * 12, y2: 216 })));
  const palanca = svg('line', { x1: 300, y1: 120, x2: 352, y2: 102, class: 'rele-palanca' });
  // Pilas + → COM · NO → bomba · bomba → pilas −  (tabla de conexiones de la guía 5)
  const circuito = svg('path', { d: 'M 110 200 L 110 60 L 300 60 L 300 115 M 365 120 L 490 120 L 490 150 M 520 180 L 520 260 L 110 260 L 110 230', class: 'rele-cable rele-potencia' });
  const motor = svg('g', { class: 'rele-motor' },
    svg('circle', { cx: 520, cy: 150, r: 30 }),
    svg('text', { x: 520, y: 156, 'text-anchor': 'middle', class: 'rele-motor-texto' }, 'M'));
  const corriente = svg('g', { class: 'rele-corriente' });
  raiz.append(
    // Arduino
    svg('rect', { x: 20, y: 110, width: 100, height: 80, rx: 8, class: 'placa-arduino' }),
    svg('text', { x: 70, y: 146, class: 'placa-texto', 'text-anchor': 'middle' }, 'Arduino'),
    svg('text', { x: 70, y: 168, class: 'rele-pin', 'text-anchor': 'middle' }, `D${pin}`),
    cableControl,
    // Relé: caja, bobina, contactos
    svg('rect', { x: 190, y: 80, width: 200, height: 160, rx: 10, class: 'rele-caja' }),
    svg('text', { x: 290, y: 100, class: 'rele-titulo', 'text-anchor': 'middle' }, 'RELÉ'),
    svg('line', { x1: 200, y1: 150, x2: 210, y2: 190, class: 'rele-cable rele-control' }),
    bobina,
    svg('circle', { cx: 300, cy: 120, r: 5, class: 'rele-borne' }),
    svg('circle', { cx: 360, cy: 120, r: 5, class: 'rele-borne' }),
    svg('circle', { cx: 360, cy: 96, r: 5, class: 'rele-borne' }),
    svg('text', { x: 300, y: 140, class: 'rele-etiqueta', 'text-anchor': 'middle' }, 'COM'),
    svg('text', { x: 372, y: 124, class: 'rele-etiqueta' }, 'NO'),
    svg('text', { x: 372, y: 100, class: 'rele-etiqueta' }, 'NC'),
    palanca,
    circuito,
    // Pilas
    svg('rect', { x: 86, y: 200, width: 48, height: 30, rx: 4, class: 'portapilas' }),
    svg('text', { x: 110, y: 222, class: 'rele-pilas', 'text-anchor': 'middle' }, '+  −'),
    svg('text', { x: 60, y: 220, class: 'rele-etiqueta', 'text-anchor': 'middle' }, 'Pilas'),
    motor,
    svg('text', { x: 520, y: 200, class: 'rele-etiqueta', 'text-anchor': 'middle' }, carga),
    corriente);

  const boton = el('button', { type: 'button', class: 'boton boton-chico' });
  const codigo = el('div', { class: 'anim-codigo' });
  const estado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-rele' }, raiz,
    el('div', { class: 'anim-controles' }, codigo, el('div', { class: 'anim-rapidos' }, boton), estado)));

  let fase = 0;
  function dibujar() {
    raiz.classList.toggle('encendido', encendido);
    palanca.setAttribute('x2', encendido ? 356 : 352);
    palanca.setAttribute('y2', encendido ? 120 : 102);
    codigo.textContent = `digitalWrite(${variable}, ${encendido ? 'HIGH' : 'LOW'});`;
    boton.textContent = encendido ? `Apagar (LOW)` : `Encender (HIGH)`;
    estado.className = `anim-estado ${encendido ? 'ok' : ''}`;
    estado.textContent = encendido
      ? `D${pin} envía una señal pequeña: la bobina atrae el contacto, COM se une con NO y la corriente de las pilas llega a la ${carga.toLowerCase()}.`
      : `D${pin} en LOW: el contacto está en NC y la ${carga.toLowerCase()} no recibe corriente.`;
  }

  // Puntos de corriente que recorren el circuito de las pilas
  const ruta = [[110, 200], [110, 60], [300, 60], [300, 120], [360, 120], [490, 120], [490, 150], [520, 180], [520, 260], [110, 260], [110, 230]];
  function cuadro() {
    corriente.replaceChildren();
    if (encendido) {
      fase = (fase + 0.006) % 1;
      const largos = ruta.slice(1).map((p, i) => Math.hypot(p[0] - ruta[i][0], p[1] - ruta[i][1]));
      const total = largos.reduce((a, b) => a + b, 0);
      for (let k = 0; k < 10; k++) {
        let d = ((fase + k / 10) % 1) * total;
        let i = 0;
        while (i < largos.length - 1 && d > largos[i]) { d -= largos[i]; i++; }
        const [x0, y0] = ruta[i]; const [x1, y1] = ruta[i + 1]; const t = d / largos[i];
        corriente.append(svg('circle', { cx: x0 + (x1 - x0) * t, cy: y0 + (y1 - y0) * t, r: 4 }));
      }
    }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  boton.addEventListener('click', () => { encendido = !encendido; dibujar(); });
  dibujar();
  requestAnimationFrame(cuadro);
}
