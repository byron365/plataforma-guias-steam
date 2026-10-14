// ============================================================
// Animación "rueda-libre": qué pasa al apagar el MOSFET de golpe, con y sin diodo.
// El motor (una bobina) está conectado a +12 V y al drain del MOSFET.
// Se apaga el MOSFET y se ve el voltaje del drain en una gráfica:
//   - Sin diodo: aparece un pico de voltaje muy alto sobre el MOSFET.
//   - Con el diodo 1N4007 (franja hacia +12 V): la corriente sigue dando vueltas
//     por el motor y el diodo hasta apagarse, y el voltaje casi no sube.
// Muestra lo que pasa; el porqué lo explica el equipo (pregunta de la guía 3).
// Los números del pico son aproximados.
//
// En la guía:
//   :::animacion tipo="rueda-libre"
//   :::
// Opciones: ninguna.
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

const X0 = 40; const X1 = 400; const Y_CERO = 150; const ESC_V = 1.1; // px por voltio
const DURACION = 1600; // ms de la gráfica

export default function montar(contenedor) {
  let conDiodo = false;
  let encendido = true;
  let tApagado = null; let reloj = 0; let ultimo = 0;
  let danos = 0;

  // ---------- Circuito ----------
  const lazo = svg('path', { d: 'M 120 60 L 210 60 L 210 160 L 120 160', class: 'rl-lazo' });
  const flujo = svg('path', { d: 'M 120 40 L 120 60 L 120 160 L 120 200 L 120 250', class: 'mos-flujo' });
  const diodo = svg('g', { class: 'rl-diodo' },
    svg('line', { x1: 120, y1: 60, x2: 210, y2: 60, class: 'mos-cable potencia' }),
    svg('line', { x1: 120, y1: 160, x2: 210, y2: 160, class: 'mos-cable' }),
    svg('line', { x1: 210, y1: 60, x2: 210, y2: 160, class: 'mos-cable' }),
    svg('path', { d: 'M 198 122 L 222 122 L 210 98 Z', class: 'rl-diodo-cuerpo' }),
    svg('line', { x1: 196, y1: 96, x2: 224, y2: 96, class: 'rl-franja' }),
    svg('text', { x: 230, y: 114, class: 'mos-texto' }, '1N4007'),
    svg('text', { x: 230, y: 128, class: 'mos-texto' }, 'franja → +12 V'));
  const chispa = svg('text', { x: 152, y: 222, class: 'rl-chispa' }, '⚡');
  const mosfet = svg('rect', { x: 90, y: 200, width: 60, height: 40, rx: 6, class: 'mos-cuerpo' });
  const circuito = svg('svg', { viewBox: '0 0 320 290', class: 'mos-svg', role: 'img', 'aria-label': 'Motor, diodo de rueda libre y MOSFET' },
    svg('text', { x: 120, y: 30, class: 'mos-borne', 'text-anchor': 'middle' }, '+12 V'),
    svg('line', { x1: 120, y1: 36, x2: 120, y2: 200, class: 'mos-cable potencia' }),
    svg('circle', { cx: 120, cy: 110, r: 30, class: 'mos-motor' }),
    svg('text', { x: 120, y: 115, class: 'mos-texto claro', 'text-anchor': 'middle' }, 'M'),
    diodo, lazo, flujo, mosfet,
    svg('text', { x: 120, y: 224, class: 'mos-texto claro', 'text-anchor': 'middle' }, 'MOSFET'),
    svg('text', { x: 160, y: 196, class: 'mos-texto' }, 'drain'),
    svg('line', { x1: 120, y1: 240, x2: 120, y2: 262, class: 'mos-cable' }),
    svg('text', { x: 120, y: 280, class: 'mos-borne', 'text-anchor': 'middle' }, 'GND'),
    chispa);

  // ---------- Gráfica del voltaje en el drain ----------
  const linea = svg('polyline', { class: 'grafica-linea' });
  const grafica = svg('svg', { viewBox: '0 0 420 200', class: 'grafica-svg', role: 'img', 'aria-label': 'Voltaje en el drain del MOSFET' },
    svg('line', { x1: X0, x2: X1, y1: Y_CERO, y2: Y_CERO, class: 'grafica-base' }),
    svg('line', { x1: X0, x2: X1, y1: Y_CERO - 12 * ESC_V, y2: Y_CERO - 12 * ESC_V, class: 'grafica-referencia' }),
    svg('text', { x: X0 - 6, y: Y_CERO + 4, class: 'grafica-numero', 'text-anchor': 'end' }, '0 V'),
    svg('text', { x: X0 - 6, y: Y_CERO - 12 * ESC_V + 4, class: 'grafica-numero', 'text-anchor': 'end' }, '12 V'),
    svg('text', { x: X0, y: 14, class: 'grafica-numero' }, 'Voltaje en el drain'),
    svg('text', { x: X1, y: 192, class: 'grafica-numero', 'text-anchor': 'end' }, 'tiempo →'),
    linea);

  const casilla = el('input', { type: 'checkbox' });
  const boton = el('button', { type: 'button', class: 'boton boton-chico' });
  const estado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-rueda' },
    circuito,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'casilla-simple' }, casilla, ' Poner el diodo de rueda libre'),
      el('div', { class: 'anim-rapidos' }, boton),
      grafica, estado,
      el('p', { class: 'texto-ayuda' }, 'Valores aproximados: el pico real depende del motor.'))));

  // Voltaje del drain t ms después de apagar (aproximado)
  function voltaje(t) {
    if (tApagado === null) return encendido ? 0.1 : 12;
    if (t < 0) return 0.1;
    if (conDiodo) return 12 + 0.7 * Math.exp(-t / 300);         // el diodo lo deja apenas arriba de 12 V
    return 12 + 95 * Math.exp(-t / 40) * Math.abs(Math.cos(t / 18)); // pico muy alto que se apaga rápido
  }

  function dibujar() {
    const t = tApagado === null ? 0 : reloj - tApagado;
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const ms = (i / 120) * DURACION - 200;     // 200 ms antes de apagar
      const v = tApagado === null ? voltaje(0) : (ms > t ? null : voltaje(ms));
      if (v === null) break;
      pts.push(`${X0 + (i / 120) * (X1 - X0)},${Math.max(4, Y_CERO - v * ESC_V)}`);
    }
    linea.setAttribute('points', pts.join(' '));
    // Corriente: por el MOSFET mientras está encendido; por el lazo motor-diodo un rato después
    const girando = tApagado !== null && conDiodo && t < 900;
    flujo.style.opacity = encendido ? '1' : '0';
    lazo.style.opacity = girando ? String(1 - t / 900) : '0';
    const pico = tApagado !== null && !conDiodo && t < 250;
    chispa.style.opacity = pico ? '1' : '0';
    mosfet.classList.toggle('danado', danos > 0 && !conDiodo);
    diodo.style.display = conDiodo ? '' : 'none';
    boton.textContent = encendido ? '⏻ Apagar el MOSFET de golpe' : '▶ Encender otra vez';
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo; reloj += dt;
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  boton.addEventListener('click', () => {
    if (encendido) {
      encendido = false; tApagado = reloj;
      if (!conDiodo) {
        danos++;
        estado.textContent = `Sin diodo: el voltaje del drain sube a casi ${12 + 95} V por un instante. El MOSFET aguanta poco más de 55 V.${danos > 1 ? ` Ya van ${danos} picos.` : ''}`;
      } else {
        estado.textContent = 'Con diodo: el voltaje del drain casi no pasa de 12 V y la corriente sigue un momento por el motor y el diodo.';
      }
    } else {
      encendido = true; tApagado = null;
      estado.textContent = 'MOSFET encendido: la corriente pasa por el motor y el MOSFET.';
    }
  });
  casilla.addEventListener('change', () => { conDiodo = casilla.checked; encendido = true; tApagado = null; estado.textContent = conDiodo ? 'Diodo puesto en paralelo con el motor.' : 'Sin diodo.'; });
  estado.textContent = 'MOSFET encendido: la corriente pasa por el motor y el MOSFET.';
  requestAnimationFrame(cuadro);
}
