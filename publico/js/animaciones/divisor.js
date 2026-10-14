// ============================================================
// Animación "divisor": medir la batería con un divisor de voltaje.
//   Vsalida = Vbatería × R2 ÷ (R1 + R2)   (con R1 = R2 = 10 kΩ, la mitad)
// Se mueve el voltaje de la batería y se ve lo que llega a A0, lo que lee el
// Arduino (analogRead) y la cuenta del código: lectura × 5,0 ÷ 1023 × FACTOR_BAT.
// El deslizador llega hasta 8,0 V: el caso de 8,4 V lo calcula el equipo.
//
// En la guía:
//   :::animacion tipo="divisor"
//   :::
// Opciones (todas opcionales): r1 (10 kΩ) · r2 (10 kΩ) · factor (2.0)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const coma = (n, d = 2) => n.toFixed(d).replace('.', ',');

export default function montar(contenedor, config) {
  const R1 = limitar(numero(config.r1, 10), 1, 100);
  const R2 = limitar(numero(config.r2, 10), 1, 100);
  const FACTOR = limitar(numero(config.factor, 2.0), 1, 10);
  let vbat = 7.4;

  const nivelBat = svg('rect', { x: 46, width: 48, rx: 3, class: 'div-nivel' });
  const textoBat = svg('text', { x: 116, y: 140, class: 'div-texto' });
  const textoA0 = svg('text', { x: 312, y: 156, class: 'div-voltaje' });
  const medidor = svg('rect', { x: 300, width: 16, class: 'div-medidor' });
  const raiz = svg('svg', { viewBox: '0 0 460 270', class: 'div-svg', role: 'img', 'aria-label': 'Batería, divisor de voltaje y la entrada A0 del Arduino' },
    // Batería
    svg('rect', { x: 40, y: 40, width: 60, height: 190, rx: 6, class: 'div-bateria' }),
    svg('rect', { x: 58, y: 30, width: 24, height: 10, rx: 2, class: 'div-bateria' }),
    nivelBat, textoBat,
    // Cables y resistencias
    svg('line', { x1: 100, y1: 50, x2: 200, y2: 50, class: 'mos-cable potencia' }),
    svg('line', { x1: 200, y1: 50, x2: 200, y2: 70, class: 'mos-cable' }),
    svg('rect', { x: 188, y: 70, width: 24, height: 60, rx: 4, class: 'ldr-resistencia' }),
    svg('text', { x: 222, y: 104, class: 'div-texto' }, `R1 = ${R1} kΩ`),
    svg('line', { x1: 200, y1: 130, x2: 200, y2: 170, class: 'mos-cable' }),
    svg('circle', { cx: 200, cy: 150, r: 5, class: 'ldr-nodo' }),
    svg('line', { x1: 200, y1: 150, x2: 290, y2: 150, class: 'mos-cable senal' }),
    svg('rect', { x: 188, y: 170, width: 24, height: 60, rx: 4, class: 'ldr-resistencia' }),
    svg('text', { x: 222, y: 204, class: 'div-texto' }, `R2 = ${R2} kΩ`),
    svg('line', { x1: 200, y1: 230, x2: 200, y2: 250, class: 'mos-cable' }),
    svg('line', { x1: 70, y1: 250, x2: 200, y2: 250, class: 'mos-cable' }),
    svg('line', { x1: 70, y1: 230, x2: 70, y2: 250, class: 'mos-cable' }),
    // Entrada A0 con su "termómetro" de 0 a 5 V
    svg('rect', { x: 290, y: 136, width: 50, height: 28, rx: 6, class: 'ldr-pin' }),
    svg('text', { x: 315, y: 155, class: 'ldr-borne claro', 'text-anchor': 'middle' }, 'A0'),
    svg('rect', { x: 380, y: 40, width: 30, height: 190, rx: 4, class: 'div-escala' }),
    svg('text', { x: 418, y: 44, class: 'div-texto' }, '5 V'), svg('text', { x: 418, y: 232, class: 'div-texto' }, '0 V'),
    svg('line', { x1: 376, x2: 414, y1: 40, y2: 40, class: 'umbral-linea delgada' }),
    medidor, textoA0);
  medidor.setAttribute('x', 387);

  const rango = el('input', { type: 'range', class: 'anim-deslizador', min: 6.0, max: 8.0, step: 0.1, value: vbat, 'aria-label': 'Voltaje de la batería' });
  const vBat = el('strong');
  const cuentas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-divisor' }, raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Batería: ', vBat, rango),
      cuentas,
      el('p', { class: 'texto-ayuda' }, 'El Arduino solo puede medir hasta 5 V en A0.'))));

  function actualizar() {
    const vout = (vbat * R2) / (R1 + R2);
    const lectura = Math.round((limitar(vout, 0, 5) / 5) * 1023);
    const calculada = (lectura * 5.0) / 1023 * FACTOR;
    const altoBat = (vbat / 8.4) * 180;
    nivelBat.setAttribute('y', 225 - altoBat); nivelBat.setAttribute('height', altoBat);
    textoBat.textContent = `${coma(vbat, 1)} V`;
    const altoA0 = (limitar(vout, 0, 5) / 5) * 186;
    medidor.setAttribute('y', 228 - altoA0); medidor.setAttribute('height', altoA0);
    textoA0.textContent = '';
    vBat.textContent = `${coma(vbat, 1)} V`;
    cuentas.textContent =
      `Vsalida = ${coma(vbat, 1)} × ${R2} ÷ (${R1} + ${R2}) = ${coma(vout)} V\n` +
      `analogRead(A0) ≈ ${lectura}\n` +
      `v = ${lectura} × 5,0 ÷ 1023 × ${coma(FACTOR, 1)} = ${coma(calculada)} V`;
  }
  rango.addEventListener('input', () => { vbat = Number(rango.value); actualizar(); });
  actualizar();
}
