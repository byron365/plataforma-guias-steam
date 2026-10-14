// ============================================================
// Animación "fuente": servo alimentado con pilas y GND común.
// El estudiante une o separa la tierra (GND) del Arduino y de las pilas
// y ve qué pasa con el servo.
//
// En la guía:
//   :::animacion tipo="fuente" pin="9" pilas="4 AA (6 V)"
//   :::
// Opciones (todas opcionales):
//   pin     pin de señal del servo     (por defecto 9, el de la pinza en garra_robotica.ino)
//   pilas   texto del portapilas       (por defecto "4 AA (6 V)")
// ============================================================
import { svg, numero, pocoMovimiento } from './comun/svg.js';
import { crearServoSVG } from './comun/servo-svg.js';
import { el } from '../comun.js';

export default function montar(contenedor, config) {
  const pin = String(numero(config.pin, 9));
  const textoPilas = config.pilas || '4 AA (6 V)';

  let unido = false;
  let pedido = 90;      // ángulo que manda el Arduino
  let temblor = null;

  // ---------- Dibujo del circuito ----------
  const raiz = svg('svg', { viewBox: '0 0 520 330', class: 'fuente-svg', role: 'img', 'aria-label': 'Circuito: Arduino, portapilas y servo' });

  // Arduino
  raiz.append(
    svg('rect', { x: 20, y: 30, width: 170, height: 120, rx: 10, class: 'placa-arduino' }),
    svg('text', { x: 105, y: 80, class: 'placa-texto', 'text-anchor': 'middle' }, 'Arduino UNO'),
    svg('text', { x: 105, y: 100, class: 'placa-subtexto', 'text-anchor': 'middle' }, 'por USB'),
    pinEtiqueta(190, 55, `D${pin}`), pinEtiqueta(190, 130, 'GND'),
  );
  // Portapilas
  const pilas = svg('g', {},
    svg('rect', { x: 30, y: 215, width: 150, height: 80, rx: 8, class: 'portapilas' }),
    ...[0, 1, 2, 3].map((i) => svg('rect', { x: 42 + i * 34, y: 230, width: 26, height: 50, rx: 4, class: 'pila' })),
    svg('text', { x: 105, y: 316, class: 'placa-subtexto', 'text-anchor': 'middle' }, `Portapilas ${textoPilas}`),
  );
  raiz.append(pilas, pinEtiqueta(180, 232, '+'), pinEtiqueta(180, 280, '−'));

  // Servo (reutiliza el dibujo del servo)
  const servo = crearServoSVG({ inicial: 90 });
  const servoSVG = servo.elemento;
  Object.entries({ x: 300, y: 40, width: 210, height: 140 }).forEach(([k, v]) => servoSVG.setAttribute(k, v));
  raiz.append(servoSVG,
    svg('text', { x: 405, y: 200, class: 'placa-subtexto', 'text-anchor': 'middle' }, 'Servo'),
  );

  // Cables
  const cable = (d, clase) => svg('path', { d, class: `fuente-cable ${clase}` });
  const senal = cable('M 196 55 C 260 55, 250 210, 330 215', 'cable-senal');
  raiz.append(
    // Los tres cables que salen del servo (naranja = señal, rojo = +, café = −)
    svg('path', { d: 'M 398 166 L 330 215', class: 'fuente-cable fuente-cable-servo cable-senal-fijo' }),
    svg('path', { d: 'M 405 166 L 400 222', class: 'fuente-cable fuente-cable-servo cable-rojo' }),
    svg('path', { d: 'M 412 166 L 460 222', class: 'fuente-cable fuente-cable-servo cable-cafe' }),
    senal,
    cable('M 186 232 C 260 232, 300 230, 400 222', 'cable-rojo'),
    cable('M 186 280 C 280 280, 330 250, 460 222', 'cable-cafe'),
    // Terminales del servo
    svg('circle', { cx: 330, cy: 215, r: 5, class: 'terminal' }),
    svg('circle', { cx: 400, cy: 222, r: 5, class: 'terminal' }),
    svg('circle', { cx: 460, cy: 222, r: 5, class: 'terminal' }),
  );
  // Cable de GND común (se muestra o se corta)
  const gnd = cable('M 196 130 C 240 130, 240 280, 186 280', 'cable-negro');
  const gndHueco = svg('g', { class: 'gnd-corte' },
    svg('line', { x1: 214, y1: 196, x2: 238, y2: 214 }), svg('line', { x1: 238, y1: 196, x2: 214, y2: 214 }));
  raiz.append(gnd, gndHueco);

  function pinEtiqueta(x, y, texto) {
    return svg('g', {},
      svg('circle', { cx: x + 6, cy: y, r: 5, class: 'terminal' }),
      svg('text', { x: x - 6, y: y + 4, class: 'pin-texto', 'text-anchor': 'end' }, texto));
  }

  // ---------- Controles ----------
  const interruptor = el('button', { type: 'button', class: 'interruptor', role: 'switch', 'aria-checked': 'false' },
    el('span', { class: 'interruptor-bola', 'aria-hidden': 'true' }), el('span', { class: 'interruptor-texto' }));
  const valor = el('span', { class: 'anim-valor' });
  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 180, step: 1, value: pedido, 'aria-label': 'Ángulo que manda el Arduino' });
  const estado = el('p', { class: 'anim-estado' });

  const controles = el('div', { class: 'anim-controles' },
    el('p', { class: 'anim-etiqueta' }, 'Unir el GND del Arduino con el − de las pilas'),
    el('div', { class: 'anim-rapidos' }, interruptor),
    el('div', { class: 'anim-codigo' }, `servo.write(`, valor, ');'),
    el('label', { class: 'anim-etiqueta' }, 'Ángulo que manda el Arduino', deslizador),
    estado,
  );
  contenedor.append(el('div', { class: 'anim-fuente' }, el('div', { class: 'anim-dibujo' }, raiz), controles));

  interruptor.addEventListener('click', () => { unido = !unido; actualizar(); });
  deslizador.addEventListener('input', () => { pedido = Number(deslizador.value); actualizar(); });

  function actualizar() {
    valor.textContent = pedido;
    interruptor.setAttribute('aria-checked', String(unido));
    interruptor.classList.toggle('activo', unido);
    interruptor.querySelector('.interruptor-texto').textContent = unido ? 'GND unido' : 'GND separado';
    gnd.classList.toggle('oculto', !unido);
    gndHueco.classList.toggle('oculto', unido);
    senal.classList.toggle('fluye', unido);
    senal.classList.toggle('sin-referencia', !unido);

    clearInterval(temblor);
    if (unido) {
      servo.ponerAngulo(pedido);
      estado.className = 'anim-estado ok';
      estado.textContent = `Con GND común, el servo obedece: va a ${pedido}°.`;
    } else {
      estado.className = 'anim-estado alerta';
      estado.textContent = 'Sin GND común, la señal no tiene una referencia compartida: el servo tiembla y no obedece.';
      // Temblor: pequeños movimientos al azar que no siguen al Arduino
      let base = 70 + Math.random() * 40;
      const temblar = () => {
        base += (Math.random() - 0.5) * 6;
        base = Math.min(150, Math.max(30, base));
        servo.ponerAngulo(base + (Math.random() - 0.5) * 14, true);
      };
      if (pocoMovimiento()) temblar();
      else temblor = setInterval(temblar, 120);
    }
  }

  // Si la animación sale de la pantalla (otra parte de la guía), deja de temblar
  const observador = new IntersectionObserver(([entrada]) => {
    if (!entrada.isIntersecting) clearInterval(temblor);
    else actualizar();
  });
  observador.observe(raiz);

  actualizar();
}
