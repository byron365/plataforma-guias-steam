// ============================================================
// Animación "caida-voltaje": cuando arranca una carga grande, el voltaje cae.
// Un motor (o un solenoide) pide mucha corriente al arrancar. Esa corriente pasa
// por los cables y produce una caída de voltaje: la carga y la lógica reciben menos.
// Si los 5 V de la lógica bajan demasiado, el Arduino se reinicia.
// Se pueden probar las soluciones de la guía, de a una: cable más grueso o corto,
// capacitor cerca de la carga y alimentar la lógica por su propio camino.
// Los números son aproximados (un modelo simple, no una medición).
//
// En la guía:
//   :::animacion tipo="caida-voltaje" sistema="casa"
//   :::
// Sistemas: "casa" (fuente de 12 V, ventilador y nodo lejano) · "robot" (batería y motores)
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

const SISTEMAS = {
  casa: {
    fuente: 'Fuente 12 V', volt: 12, carga: 'Ventilador', logica: '5 V del nodo más lejano',
    separada: 'Cada nodo con su propio cable de 5 V desde el LM2596', encadenada: 'el 5 V pasa de nodo en nodo',
    normal: 0.25, arranque: 2.4,
  },
  robot: {
    fuente: 'Batería 7,4 V', volt: 7.4, carga: 'Motores (puente H)', logica: 'pin 5V del Arduino',
    separada: 'El Arduino toma su energía del LM2596, no de la línea de los motores', encadenada: 'el Arduino comparte la línea de los motores',
    normal: 0.4, arranque: 3.0,
  },
};
const X0 = 50; const X1 = 500; const T_VENTANA = 2000; // ms en la gráfica

export default function montar(contenedor, config) {
  const s = SISTEMAS[config.sistema] || SISTEMAS.casa;
  const op = { grueso: false, capacitor: false, separada: false };
  let tArranque = null; let reloj = 0; let ultimo = 0; let reinicios = 0; let reiniciado = false;
  let historia = [];

  // Modelo simple: corriente de la carga en el tiempo y caída en el cable
  const corriente = (t) => (t === null || t < 0 ? 0 : s.normal + (s.arranque - s.normal) * Math.exp(-t / 250));
  function voltajes(t) {
    const rCable = op.grueso ? 0.25 : 0.9;                 // ohmios (ida y vuelta, aproximado)
    let i = corriente(t);
    if (op.capacitor && t !== null && t >= 0) i = s.normal + (i - s.normal) * 0.35; // el capacitor da parte del pico
    const carga = s.volt - i * rCable;
    // La lógica: si comparte el camino, también sufre la caída
    const caidaComun = op.separada ? i * 0.03 : i * rCable * 0.55;
    const logica = Math.min(5, 5 - caidaComun + (s.volt - carga > 3 && !op.separada ? -0.3 : 0));
    return { carga: Math.max(0, carga), logica: Math.max(0, logica) };
  }

  const lineaCarga = svg('polyline', { class: 'caida-linea carga' });
  const lineaLogica = svg('polyline', { class: 'caida-linea logica' });
  const yDe = (v) => 190 - (v / (s.volt + 1)) * 160;
  const raiz = svg('svg', { viewBox: '0 0 540 220', class: 'grafica-svg', role: 'img', 'aria-label': `Voltaje en ${s.carga.toLowerCase()} y en la lógica` },
    ...[0, 5, s.volt].map((v) => svg('g', {},
      svg('line', { x1: X0, x2: X1, y1: yDe(v), y2: yDe(v), class: v ? 'grafica-reja' : 'grafica-base' }),
      svg('text', { x: X0 - 6, y: yDe(v) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, `${String(v).replace('.', ',')} V`))),
    svg('line', { x1: X0, x2: X1, y1: yDe(4.3), y2: yDe(4.3), class: 'umbral-linea delgada' }),
    svg('text', { x: X1, y: yDe(4.3) + 14, class: 'grafica-numero', 'text-anchor': 'end' }, 'por debajo, el Arduino se reinicia'),
    svg('text', { x: X1, y: 212, class: 'grafica-numero', 'text-anchor': 'end' }, 'tiempo →'),
    lineaCarga, lineaLogica);
  const leyenda = el('p', { class: 'suave-leyenda' },
    el('span', { class: 'suave-muestra caida-carga' }), ` ${s.carga}  `, el('span', { class: 'suave-muestra caida-logica' }), ` ${s.logica}`);

  const casilla = (texto, clave) => el('label', { class: 'casilla-simple' },
    el('input', { type: 'checkbox', onchange: (e) => { op[clave] = e.target.checked; } }), ` ${texto}`);
  const boton = el('button', { type: 'button', class: 'boton boton-chico' }, `▶ Arrancar ${s.carga.toLowerCase()}`);
  const lecturas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-caida' },
    el('div', {}, raiz, leyenda),
    el('div', { class: 'anim-controles' },
      el('div', { class: 'anim-rapidos' }, boton),
      el('p', { class: 'anim-etiqueta' }, 'Soluciones (prueben de a una):'),
      casilla(s === SISTEMAS.robot ? 'Cables más gruesos y cortos a los motores' : 'Cable más grueso y corto para los 12 V', 'grueso'),
      casilla(s === SISTEMAS.robot ? 'Capacitor de 470 µF entre VM y GND del puente H' : 'Capacitor de 470 µF cerca de la carga', 'capacitor'),
      casilla(s.separada, 'separada'),
      lecturas,
      el('p', { class: 'texto-ayuda' }, `Modelo aproximado. Sin la última solución, ${s.encadenada}.`))));

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; reloj += dt;
    const tt = tArranque === null ? null : reloj - tArranque;
    const v = voltajes(tt);
    historia.push({ t: reloj, ...v });
    historia = historia.filter((h) => h.t > reloj - T_VENTANA);
    const pts = (k) => historia.map((h) => `${X1 - ((reloj - h.t) / T_VENTANA) * (X1 - X0)},${yDe(h[k])}`).join(' ');
    lineaCarga.setAttribute('points', pts('carga'));
    lineaLogica.setAttribute('points', pts('logica'));
    if (v.logica < 4.3 && !reiniciado) { reinicios++; reiniciado = true; }
    if (v.logica >= 4.6) reiniciado = false;
    lecturas.textContent =
      `${s.carga}: ${v.carga.toFixed(1).replace('.', ',')} V\n` +
      `${s.logica}: ${v.logica.toFixed(2).replace('.', ',')} V\n` +
      `Reinicios del Arduino: ${reinicios}`;
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  boton.addEventListener('click', () => { tArranque = reloj; });
  requestAnimationFrame(cuadro);
}
