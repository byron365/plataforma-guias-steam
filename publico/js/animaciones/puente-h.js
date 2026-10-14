// ============================================================
// Animación "puente-h": cuatro interruptores que cambian el sentido del motor.
// Con IN1 e IN2 se cierran dos interruptores en diagonal: la corriente pasa por
// el motor en un sentido o en el otro. Con el PWM en ENA se regula la velocidad.
// Las cuatro combinaciones son las de la tabla de la guía:
//   IN1 HIGH, IN2 LOW → un sentido · IN1 LOW, IN2 HIGH → el otro
//   ENA en 0 → libre · IN1 e IN2 en HIGH → freno
//
// En la guía:
//   :::animacion tipo="puente-h" sentidos="Sube|Baja"
//   :::
// Opciones (todas opcionales):
//   sentidos   nombres de los dos sentidos (por defecto "Sube|Baja"; el robot usa "Adelante|Atrás")
//   pines      "ENA|IN1|IN2" (por defecto "D5|D7|D8")
// ============================================================
import { svg, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

export default function montar(contenedor, config) {
  const [nombreA, nombreB] = String(config.sentidos || 'Sube|Baja').split('|').map((s) => s.trim());
  const [pEna, pIn1, pIn2] = String(config.pines || 'D5|D7|D8').split('|').map((s) => s.trim());
  let in1 = false; let in2 = false; let pwm = 200;
  let velocidad = 0; let giro = 0; let ultimo = 0; let fase = 0;

  // Interruptores: S1 arriba izq, S2 arriba der, S3 abajo izq, S4 abajo der
  const sw = [
    { x: 120, y: 70 }, { x: 320, y: 70 }, { x: 120, y: 210 }, { x: 320, y: 210 },
  ].map((p, i) => ({ ...p, g: svg('g', { class: 'ph-switch' }), i }));
  const flujo = svg('path', { class: 'ph-flujo' });
  const aspas = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 440 290', class: 'ph-svg', role: 'img', 'aria-label': 'Puente H con cuatro interruptores y un motor' },
    svg('text', { x: 220, y: 22, class: 'mos-borne', 'text-anchor': 'middle' }, '+12 V'),
    svg('line', { x1: 120, y1: 34, x2: 320, y2: 34, class: 'mos-cable potencia' }),
    svg('line', { x1: 120, y1: 256, x2: 320, y2: 256, class: 'mos-cable' }),
    svg('text', { x: 220, y: 280, class: 'mos-borne', 'text-anchor': 'middle' }, 'GND'),
    ...[120, 320].map((x) => svg('line', { x1: x, y1: 34, x2: x, y2: 256, class: 'mos-cable' })),
    svg('line', { x1: 120, y1: 140, x2: 180, y2: 140, class: 'mos-cable' }),
    svg('line', { x1: 260, y1: 140, x2: 320, y2: 140, class: 'mos-cable' }),
    svg('circle', { cx: 220, cy: 140, r: 38, class: 'mos-motor' }), aspas,
    svg('text', { x: 140, y: 132, class: 'mos-texto' }, 'OUT1'), svg('text', { x: 268, y: 132, class: 'mos-texto' }, 'OUT2'),
    ...sw.map((s) => s.g), flujo);

  const botonIn1 = el('button', { type: 'button', class: 'anim-boton' });
  const botonIn2 = el('button', { type: 'button', class: 'anim-boton' });
  const rPwm = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 255, step: 1, value: pwm, 'aria-label': `PWM en ${pEna}` });
  const vPwm = el('strong');
  const rapidos = el('div', { class: 'anim-rapidos' },
    el('button', { type: 'button', class: 'anim-boton', onclick: () => poner(true, false, 200) }, nombreA),
    el('button', { type: 'button', class: 'anim-boton', onclick: () => poner(false, true, 200) }, nombreB),
    el('button', { type: 'button', class: 'anim-boton', onclick: () => poner(in1, in2, 0) }, `${pEna} en 0`),
    el('button', { type: 'button', class: 'anim-boton', onclick: () => poner(true, true, 255) }, 'IN1 e IN2 en HIGH'));
  const estado = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-ph' }, raiz,
    el('div', { class: 'anim-controles' },
      el('div', { class: 'anim-rapidos' }, botonIn1, botonIn2),
      el('label', { class: 'anim-etiqueta' }, `PWM en ENA (${pEna}): `, vPwm, rPwm),
      el('p', { class: 'anim-etiqueta' }, 'Combinaciones de la tabla'), rapidos,
      estado)));

  function poner(a, b, p) { in1 = a; in2 = b; pwm = p; rPwm.value = p; actualizar(); }

  // Qué interruptores se cierran (en el L298N, cada IN maneja un lado del puente)
  function cerrados() {
    if (pwm === 0) return [false, false, false, false];
    if (in1 && in2) return [true, true, false, false];          // freno: los dos de arriba
    if (in1) return [true, false, false, true];                // diagonal S1–S4
    if (in2) return [false, true, true, false];                // diagonal S2–S3
    return [false, false, false, false];
  }
  function modo() {
    if (in1 && in2) return 'freno';
    if (pwm === 0 || (!in1 && !in2)) return 'libre';
    return in1 ? 'a' : 'b';
  }

  function actualizar() {
    const c = cerrados();
    sw.forEach((s, i) => s.g.replaceChildren(
      svg('rect', { x: s.x - 22, y: s.y - 18, width: 44, height: 36, rx: 6, class: `ph-caja${c[i] ? ' cerrado' : ''}` }),
      svg('line', { x1: s.x, y1: s.y - 12, x2: c[i] ? s.x : s.x + 12, y2: s.y + 12, class: 'ph-palanca' }),
      svg('text', { x: s.x + (i % 2 ? 30 : -30), y: s.y + 4, class: 'mos-texto', 'text-anchor': i % 2 ? 'start' : 'end' }, `S${i + 1}`)));
    // Camino de la corriente
    const m = modo();
    flujo.setAttribute('d', m === 'a' ? 'M 120 40 L 120 140 L 182 140 M 258 140 L 320 140 L 320 250'
      : m === 'b' ? 'M 320 40 L 320 140 L 258 140 M 182 140 L 120 140 L 120 250' : '');
    flujo.style.animationDuration = `${limitar(1.4 - pwm / 255, 0.35, 1.4)}s`;
    botonIn1.textContent = `IN1 (${pIn1}): ${in1 ? 'HIGH' : 'LOW'}`;
    botonIn2.textContent = `IN2 (${pIn2}): ${in2 ? 'HIGH' : 'LOW'}`;
    vPwm.textContent = String(pwm);
    const texto = { a: `${nombreA} (PWM ${pwm})`, b: `${nombreB} (PWM ${pwm})`, libre: 'Libre: sin corriente por el motor', freno: 'Freno: los dos lados del motor unidos' }[m];
    estado.textContent = `digitalWrite(IN1, ${in1 ? 'HIGH' : 'LOW'});\ndigitalWrite(IN2, ${in2 ? 'HIGH' : 'LOW'});\nanalogWrite(ENA, ${pwm});\n→ ${texto}`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; fase += dt;
    // Velocidad del motor: se acerca a la pedida; libre se frena despacio, freno de golpe
    const m = modo();
    const meta = m === 'a' ? pwm / 255 : m === 'b' ? -pwm / 255 : 0;
    const k = m === 'freno' ? 0.02 : m === 'libre' ? 0.0015 : 0.004;
    velocidad += (meta - velocidad) * Math.min(1, k * dt);
    if (!pocoMovimiento()) giro = (giro + velocidad * dt * 0.6) % 360;
    aspas.replaceChildren(...[0, 120, 240].map((a) => svg('line', {
      x1: 220, y1: 140, x2: 220 + Math.cos(((giro + a) * Math.PI) / 180) * 28, y2: 140 + Math.sin(((giro + a) * Math.PI) / 180) * 28, class: 'mos-aspa',
    })));
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonIn1.addEventListener('click', () => { in1 = !in1; actualizar(); });
  botonIn2.addEventListener('click', () => { in2 = !in2; actualizar(); });
  rPwm.addEventListener('input', () => { pwm = Number(rPwm.value); actualizar(); });
  actualizar();
  requestAnimationFrame(cuadro);
}
