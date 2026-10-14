// ============================================================
// Animación "pwm": encender y apagar muy rápido para regular la velocidad.
// La señal cambia entre 0 y 5 V; el porcentaje de tiempo encendida (ciclo de trabajo)
// es valor ÷ 255. El motor "siente" el promedio y gira más o menos rápido.
// Se puede ver en cámara lenta para notar el encendido y apagado.
//
// En la guía:
//   :::animacion tipo="pwm"
//   :::
// Opciones (todas opcionales): valor (128 al empezar) · pin ("D5")
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const X0 = 40; const X1 = 520; const Y_ALTO = 40; const Y_BAJO = 120;

export default function montar(contenedor, config) {
  let valor = limitar(Math.round(numero(config.valor, 128)), 0, 255);
  const pin = /^D?\d{1,2}$/i.test(config.pin || '') ? `D${String(config.pin).replace(/^D/i, '')}` : 'D5';
  let lento = false; let fase = 0; let giro = 0; let ultimo = 0;

  const onda = svg('path', { class: 'pwm-onda' });
  const promedio = svg('line', { x1: X0, x2: X1, class: 'pwm-promedio' });
  const textoProm = svg('text', { x: X1, class: 'grafica-numero', 'text-anchor': 'end' });
  const cursor = svg('line', { y1: Y_ALTO - 10, y2: Y_BAJO + 10, class: 'temp-aguja' });
  const aspas = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 640 170', class: 'pwm-svg', role: 'img', 'aria-label': 'Señal PWM y el motor' },
    svg('text', { x: X0 - 8, y: Y_ALTO + 4, class: 'grafica-numero', 'text-anchor': 'end' }, '5 V'),
    svg('text', { x: X0 - 8, y: Y_BAJO + 4, class: 'grafica-numero', 'text-anchor': 'end' }, '0 V'),
    svg('line', { x1: X0, x2: X1, y1: Y_BAJO, y2: Y_BAJO, class: 'grafica-base' }),
    onda, promedio, textoProm, cursor,
    svg('circle', { cx: 590, cy: 80, r: 34, class: 'mos-motor' }), aspas);

  const rango = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 255, step: 1, value: valor, 'aria-label': 'Valor de analogWrite' });
  const vValor = el('strong');
  const casilla = el('input', { type: 'checkbox' });
  const cuentas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-pwm' }, raiz,
    el('div', { class: 'pwm-panel' },
      el('label', { class: 'anim-etiqueta' }, `analogWrite(${pin}, `, vValor, ')', rango),
      el('label', { class: 'casilla-simple' }, casilla, ' Cámara lenta'),
      cuentas)));

  function dibujar() {
    const f = valor / 255;
    const periodos = 6; const ancho = (X1 - X0) / periodos;
    let d = `M ${X0} ${f > 0 ? Y_ALTO : Y_BAJO}`;
    for (let p = 0; p < periodos; p++) {
      const xi = X0 + p * ancho; const xm = xi + f * ancho; const xf = xi + ancho;
      if (f >= 1) { d += ` L ${xf} ${Y_ALTO}`; continue; }
      if (f <= 0) { d += ` L ${xf} ${Y_BAJO}`; continue; }
      d += ` L ${xi} ${Y_ALTO} L ${xm} ${Y_ALTO} L ${xm} ${Y_BAJO} L ${xf} ${Y_BAJO}`;
    }
    onda.setAttribute('d', d);
    const yProm = Y_BAJO - f * (Y_BAJO - Y_ALTO);
    promedio.setAttribute('y1', yProm); promedio.setAttribute('y2', yProm);
    textoProm.setAttribute('y', yProm - 6);
    textoProm.textContent = `promedio ≈ ${(5 * f).toFixed(1).replace('.', ',')} V`;
    vValor.textContent = String(valor);
    cuentas.textContent =
      `Encendido el ${Math.round(f * 100)} % del tiempo (${valor} ÷ 255)\n` +
      `Promedio ≈ 5 V × ${f.toFixed(2).replace('.', ',')} = ${(5 * f).toFixed(1).replace('.', ',')} V\n` +
      'El pin no da "medio voltaje": prende y apaga muy rápido.';
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    fase = (fase + dt / (lento ? 4000 : 900)) % 1;
    const xc = X0 + fase * (X1 - X0);
    cursor.setAttribute('x1', xc); cursor.setAttribute('x2', xc);
    if (!pocoMovimiento()) giro = (giro + dt * 0.7 * (valor / 255) * (lento ? 0.25 : 1)) % 360;
    aspas.replaceChildren(...[0, 120, 240].map((a) => svg('line', {
      x1: 590, y1: 80, x2: 590 + Math.cos(((giro + a) * Math.PI) / 180) * 26, y2: 80 + Math.sin(((giro + a) * Math.PI) / 180) * 26, class: 'mos-aspa',
    })));
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  rango.addEventListener('input', () => { valor = Number(rango.value); dibujar(); });
  casilla.addEventListener('change', () => { lento = casilla.checked; });
  dibujar();
  requestAnimationFrame(cuadro);
}
