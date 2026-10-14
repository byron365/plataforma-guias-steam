// ============================================================
// Animación "optoacoplador": la señal del Arduino cruza al relé como luz.
// Lado de la lógica: el pin del Arduino enciende un LED dentro del optoacoplador.
// Lado de la carga: un fototransistor "ve" esa luz y deja pasar corriente por la
// bobina del relé; el relé une COM con NO y la carga de 12 V se enciende.
// Entre los dos lados no hay ningún cable: solo luz.
//
// En la guía:
//   :::animacion tipo="optoacoplador"
//   :::
// Opciones (todas opcionales): pin (7) · carga ("Cerradura")
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

export default function montar(contenedor, config) {
  const pin = `D${limitar(Math.round(numero(config.pin, 7)), 2, 13)}`;
  const carga = String(config.carga || 'Cerradura').slice(0, 20);
  let encendido = false; let fase = 0; let ultimo = 0;

  const luz = svg('g', { class: 'opto-luz' });
  const led = svg('path', { d: 'M 150 120 L 174 108 L 174 132 Z', class: 'opto-led' });
  const contacto = svg('line', { x1: 380, y1: 100, x2: 410, y2: 84, class: 'opto-contacto' });
  const bobina = svg('rect', { x: 330, y: 150, width: 60, height: 30, rx: 4, class: 'opto-bobina' });
  const cargaDib = svg('circle', { cx: 470, cy: 60, r: 18, class: 'opto-carga' });
  const raiz = svg('svg', { viewBox: '0 0 520 230', class: 'opto-svg', role: 'img', 'aria-label': 'Optoacoplador y relé: la señal cruza como luz' },
    // Los dos lados
    svg('rect', { x: 10, y: 10, width: 220, height: 210, rx: 10, class: 'opto-lado logica' }),
    svg('rect', { x: 260, y: 10, width: 250, height: 210, rx: 10, class: 'opto-lado carga' }),
    svg('text', { x: 20, y: 30, class: 'opto-titulo' }, 'Lógica (Arduino, 5 V)'),
    svg('text', { x: 270, y: 30, class: 'opto-titulo' }, 'Carga (12 V)'),
    // Barrera
    svg('line', { x1: 245, y1: 40, x2: 245, y2: 210, class: 'opto-barrera' }),
    svg('text', { x: 245, y: 222, class: 'opto-texto', 'text-anchor': 'middle' }, 'sin cable: solo luz'),
    // Encapsulado del optoacoplador
    svg('rect', { x: 140, y: 80, width: 160, height: 80, rx: 8, class: 'opto-chip' }),
    svg('text', { x: 220, y: 76, class: 'opto-texto', 'text-anchor': 'middle' }, 'optoacoplador'),
    // Arduino → LED
    svg('rect', { x: 24, y: 96, width: 70, height: 48, rx: 6, class: 'casa-arduino' }),
    svg('text', { x: 59, y: 124, class: 'casa-texto claro', 'text-anchor': 'middle' }, pin),
    svg('line', { x1: 94, y1: 120, x2: 150, y2: 120, class: 'mos-cable senal' }),
    led,
    luz,
    // Fototransistor
    svg('circle', { cx: 274, cy: 120, r: 16, class: 'opto-foto' }),
    svg('line', { x1: 274, y1: 136, x2: 330, y2: 165, class: 'mos-cable' }),
    // Relé
    bobina, svg('text', { x: 360, y: 198, class: 'opto-texto', 'text-anchor': 'middle' }, 'bobina del relé'),
    svg('circle', { cx: 380, cy: 100, r: 4, class: 'opto-punto' }), svg('text', { x: 370, y: 116, class: 'opto-texto' }, 'COM'),
    svg('circle', { cx: 414, cy: 100, r: 4, class: 'opto-punto' }), svg('text', { x: 408, y: 116, class: 'opto-texto' }, 'NO'),
    contacto,
    svg('line', { x1: 414, y1: 100, x2: 470, y2: 78, class: 'mos-cable potencia' }),
    cargaDib, svg('text', { x: 470, y: 100, class: 'opto-texto', 'text-anchor': 'middle' }, carga),
    svg('text', { x: 300, y: 60, class: 'mos-borne' }, '+12 V'),
    svg('line', { x1: 330, y1: 64, x2: 380, y2: 96, class: 'mos-cable potencia' }));

  const boton = el('button', { type: 'button', class: 'boton boton-chico' });
  const codigo = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-opto' }, raiz,
    el('div', { class: 'anim-controles' }, el('div', { class: 'anim-rapidos' }, boton), codigo)));

  function actualizar() {
    led.classList.toggle('encendido', encendido);
    bobina.classList.toggle('activa', encendido);
    cargaDib.classList.toggle('encendida', encendido);
    contacto.setAttribute('x2', encendido ? 414 : 410); contacto.setAttribute('y2', encendido ? 100 : 84);
    boton.textContent = encendido ? `digitalWrite(${pin}, LOW)` : `digitalWrite(${pin}, HIGH)`;
    codigo.textContent =
      `digitalWrite(${pin}, ${encendido ? 'HIGH' : 'LOW'});\n` +
      `LED interno: ${encendido ? 'encendido' : 'apagado'}\n` +
      `Fototransistor: ${encendido ? 've la luz → conduce' : 'a oscuras → no conduce'}\n` +
      `Relé: ${encendido ? 'COM unido con NO' : 'COM separado de NO'} → ${carga.toLowerCase()} ${encendido ? 'activa' : 'apagada'}`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; fase = (fase + dt / 500) % 1;
    luz.replaceChildren(...(encendido ? [0, 0.33, 0.66].map((k) => {
      const x = 180 + ((fase + k) % 1) * 76;
      return svg('path', { d: `M ${x} 112 q 5 8 0 16`, class: 'opto-onda' });
    }) : []));
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  boton.addEventListener('click', () => { encendido = !encendido; actualizar(); });
  actualizar();
  requestAnimationFrame(cuadro);
}
