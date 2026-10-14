// ============================================================
// Animación "mosfet": una señal pequeña en el gate deja pasar una corriente grande.
// Circuito: +12 V → carga → drain · source → GND · D9 → 220 Ω → gate · 10 kΩ gate → GND.
// Con PWM (analogWrite) el gate se enciende y apaga muy rápido: la carga recibe
// la potencia en proporción (el motor gira más lento o más rápido).
// No compara modelos de MOSFET (eso lo pregunta la guía de la banda).
//
// En la guía:
//   :::animacion tipo="mosfet"
//   :::
// Opciones (todas opcionales):
//   carga   "Motor" (por defecto) o "Tira LED"
//   pwm     "no": solo encender y apagar con digitalWrite (sin regular)
//   pin     pin del Arduino (por defecto 9)
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

export default function montar(contenedor, config) {
  const esLed = /led/i.test(config.carga || '');
  const conPwm = config.pwm !== 'no';
  const pin = `D${limitar(Math.round(numero(config.pin, 9)), 2, 13)}`;
  let valor = conPwm ? 128 : 0;      // 0 a 255 (o 0 / 255 sin PWM)
  let giro = 0; let fase = 0; let ultimo = 0;

  // ---------- Esquema ----------
  const flujo = svg('path', { d: 'M 330 34 L 330 60 M 330 120 L 330 150 M 330 210 L 330 252', class: 'mos-flujo' });
  const flujoGate = svg('path', { d: 'M 90 170 L 250 170', class: 'mos-flujo chico' });
  const carga = svg('g', {});
  const onda = svg('path', { class: 'mos-onda' });
  const raiz = svg('svg', { viewBox: '0 0 460 290', class: 'mos-svg', role: 'img', 'aria-label': `Arduino controlando ${esLed ? 'una tira LED' : 'un motor'} de 12 V con un MOSFET` },
    // Fuente de 12 V y tierra
    svg('text', { x: 330, y: 22, class: 'mos-borne', 'text-anchor': 'middle' }, '+12 V'),
    svg('line', { x1: 330, y1: 28, x2: 330, y2: 60, class: 'mos-cable potencia' }),
    carga,
    svg('line', { x1: 330, y1: 120, x2: 330, y2: 150, class: 'mos-cable potencia' }),
    // MOSFET (símbolo simplificado)
    svg('rect', { x: 290, y: 150, width: 80, height: 60, rx: 8, class: 'mos-cuerpo' }),
    svg('text', { x: 330, y: 176, class: 'mos-texto claro', 'text-anchor': 'middle' }, 'MOSFET'),
    svg('text', { x: 330, y: 194, class: 'mos-texto claro chico', 'text-anchor': 'middle' }, 'IRLZ44N'),
    svg('text', { x: 376, y: 156, class: 'mos-texto' }, 'drain'),
    svg('text', { x: 376, y: 212, class: 'mos-texto' }, 'source'),
    svg('text', { x: 256, y: 162, class: 'mos-texto', 'text-anchor': 'end' }, 'gate'),
    svg('line', { x1: 330, y1: 210, x2: 330, y2: 256, class: 'mos-cable' }),
    svg('text', { x: 330, y: 274, class: 'mos-borne', 'text-anchor': 'middle' }, 'GND común'),
    // Arduino, resistencias
    svg('rect', { x: 10, y: 140, width: 80, height: 60, rx: 8, class: 'wifi-arduino' }),
    svg('text', { x: 50, y: 166, class: 'mos-texto claro', 'text-anchor': 'middle' }, 'Arduino'),
    svg('text', { x: 50, y: 184, class: 'mos-texto claro chico', 'text-anchor': 'middle' }, pin),
    svg('line', { x1: 90, y1: 170, x2: 290, y2: 170, class: 'mos-cable senal' }),
    svg('rect', { x: 140, y: 162, width: 40, height: 16, rx: 3, class: 'ldr-resistencia' }),
    svg('text', { x: 160, y: 156, class: 'mos-texto', 'text-anchor': 'middle' }, '220 Ω'),
    svg('line', { x1: 230, y1: 170, x2: 230, y2: 256, class: 'mos-cable senal' }),
    svg('rect', { x: 222, y: 204, width: 16, height: 36, rx: 3, class: 'ldr-resistencia' }),
    svg('text', { x: 216, y: 226, class: 'mos-texto', 'text-anchor': 'end' }, '10 kΩ'),
    svg('line', { x1: 230, y1: 256, x2: 330, y2: 256, class: 'mos-cable' }),
    flujo, flujoGate, onda);

  // La carga: un motor que gira o una tira LED que brilla
  const aspas = svg('g', {});
  const tira = [];
  if (esLed) {
    carga.append(svg('rect', { x: 290, y: 60, width: 80, height: 60, rx: 8, class: 'mos-tira' }));
    for (let i = 0; i < 4; i++) { const c = svg('circle', { cx: 302 + i * 19, cy: 90, r: 7, class: 'mos-led' }); tira.push(c); carga.append(c); }
    carga.append(svg('text', { x: 380, y: 94, class: 'mos-texto' }, 'Tira LED 12 V'));
  } else {
    carga.append(svg('circle', { cx: 330, cy: 90, r: 30, class: 'mos-motor' }), aspas,
      svg('text', { x: 368, y: 94, class: 'mos-texto' }, 'Motor 12 V'));
  }

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 255, step: 1, value: valor, 'aria-label': 'Valor de analogWrite' });
  const interruptor = el('div', { class: 'anim-rapidos' },
    el('button', { type: 'button', class: 'anim-boton', onclick: () => { valor = 255; actualizar(); } }, 'digitalWrite(HIGH)'),
    el('button', { type: 'button', class: 'anim-boton', onclick: () => { valor = 0; actualizar(); } }, 'digitalWrite(LOW)'));
  const cuentas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-mosfet' },
    raiz,
    el('div', { class: 'anim-controles' },
      conPwm ? el('label', { class: 'anim-etiqueta' }, `analogWrite(${pin}, valor)`, deslizador) : interruptor,
      cuentas,
      el('p', { class: 'texto-ayuda' }, 'Línea roja: corriente grande de 12 V por la carga. Línea azul: la señal pequeña del Arduino (casi no gasta corriente).'))));

  function actualizar() {
    const f = valor / 255;
    const encendido = valor > 0;
    // Forma de la señal en el gate (PWM: encendido una parte del tiempo)
    const x0 = 100; const ancho = 120; const yA = 120; const yB = 140;
    let d = `M ${x0} ${yB}`;
    for (let p = 0; p < 3; p++) {
      const xi = x0 + p * (ancho / 3); const xm = xi + f * (ancho / 3); const xf = xi + ancho / 3;
      d += f > 0 ? ` L ${xi} ${yA} L ${xm} ${yA} L ${xm} ${yB}` : '';
      d += ` L ${xf} ${yB}`;
    }
    // Siempre encendido o siempre apagado: una línea recta
    if (f >= 1) d = `M ${x0} ${yB} L ${x0} ${yA} L ${x0 + ancho} ${yA}`;
    if (f <= 0) d = `M ${x0} ${yB} L ${x0 + ancho} ${yB}`;
    onda.setAttribute('d', d);
    flujo.style.opacity = encendido ? String(0.35 + 0.65 * f) : '0';
    flujo.style.animationDuration = `${limitar(1.4 - f, 0.3, 1.4)}s`;
    flujoGate.style.opacity = encendido ? '0.8' : '0';
    tira.forEach((c) => c.setAttribute('opacity', (0.15 + 0.85 * f).toFixed(2)));
    cuentas.textContent = conPwm
      ? `analogWrite(${pin}, ${valor});\nEl gate está encendido el ${Math.round(f * 100)} % del tiempo\n→ ${esLed ? 'la tira brilla' : 'el motor gira'} ${f === 0 ? 'nada' : f < 0.35 ? 'poco' : f < 0.75 ? 'a media potencia' : 'casi al máximo'}`
      : `digitalWrite(${pin}, ${encendido ? 'HIGH' : 'LOW'});\nGate a ${encendido ? '5' : '0'} V → MOSFET ${encendido ? 'encendido: pasa la corriente' : 'apagado: no pasa corriente'}`;
    deslizador.value = valor;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (!esLed && !pocoMovimiento()) {
      giro = (giro + dt * 0.9 * (valor / 255)) % 360;
      aspas.replaceChildren(...[0, 120, 240].map((a) => svg('line', {
        x1: 330, y1: 90, x2: 330 + Math.cos(((giro + a) * Math.PI) / 180) * 22, y2: 90 + Math.sin(((giro + a) * Math.PI) / 180) * 22, class: 'mos-aspa',
      })));
    }
    fase += dt;
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  deslizador.addEventListener('input', () => { valor = Number(deslizador.value); actualizar(); });
  actualizar();
  if (esLed) aspas.replaceChildren();
  requestAnimationFrame(cuadro);
}
