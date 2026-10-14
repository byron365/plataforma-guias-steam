// ============================================================
// Animación "perilla": girar un potenciómetro virtual y ver
//   voltaje  →  analogRead()  →  map()  →  ángulo del servo
//
// En la guía:
//   :::animacion tipo="perilla" pin="A0" min="0" max="180"
//   :::
// Opciones (todas opcionales):
//   pin       pin analógico                 (por defecto "A0")
//   min, max  rango de salida de map()      (por defecto 0 y 180)
//   servo     "no" para ocultar el servo    (por defecto se muestra)
// ============================================================
import { svg, puntoPerilla, limitar, numero, mapArduino } from './comun/svg.js';
import { crearServoSVG } from './comun/servo-svg.js';

const GIRO = 135;      // la perilla gira de -135° a +135° (270° en total, como un potenciómetro real)
const CX = 100;
const CY = 100;

export default function montar(contenedor, config) {
  const pin = /^A\d$/i.test(config.pin || '') ? config.pin.toUpperCase() : 'A0';
  const salidaMin = numero(config.min, 0);
  const salidaMax = numero(config.max, 180);
  const conServo = config.servo !== 'no';

  let lectura = 512; // valor de analogRead (0 a 1023)

  // ---------- Dibujo de la perilla ----------
  const perilla = svg('svg', {
    viewBox: '0 0 200 200', class: 'perilla-svg', tabindex: '0', role: 'slider',
    'aria-label': `Perilla conectada a ${pin}`, 'aria-valuemin': '0', 'aria-valuemax': '1023',
  });
  const arco = (desde, hasta, radio) => {
    const a = puntoPerilla(CX, CY, radio, desde);
    const b = puntoPerilla(CX, CY, radio, hasta);
    return `M ${a.x} ${a.y} A ${radio} ${radio} 0 ${hasta - desde > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
  };
  perilla.append(svg('path', { d: arco(-GIRO, GIRO, 84), class: 'perilla-pista' }));
  const arcoValor = svg('path', { class: 'perilla-recorrido' });
  perilla.append(arcoValor);
  for (let g = -GIRO; g <= GIRO; g += 27) {
    const a = puntoPerilla(CX, CY, 74, g);
    const b = puntoPerilla(CX, CY, 68, g);
    perilla.append(svg('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'perilla-marca' }));
  }
  // Etiquetas justo debajo de cada extremo del recorrido
  const etiquetaMin = puntoPerilla(CX, CY, 84, -GIRO);
  const etiquetaMax = puntoPerilla(CX, CY, 84, GIRO);
  perilla.append(
    svg('text', { x: etiquetaMin.x, y: etiquetaMin.y + 24, class: 'perilla-texto', 'text-anchor': 'middle' }, '0 V'),
    svg('text', { x: etiquetaMax.x, y: etiquetaMax.y + 24, class: 'perilla-texto', 'text-anchor': 'middle' }, '5 V'),
  );
  const boton = svg('g', { class: 'perilla-boton' },
    svg('circle', { cx: CX, cy: CY, r: 58, class: 'perilla-cuerpo' }),
    svg('circle', { cx: CX, cy: CY, r: 46, class: 'perilla-tapa' }),
    svg('rect', { x: CX - 4, y: CY - 52, width: 8, height: 30, rx: 4, class: 'perilla-indicador' }),
  );
  perilla.append(boton);

  // ---------- Cadena de números ----------
  const caja = (titulo, clase) => {
    const valor = document.createElement('div');
    valor.className = `perilla-numero ${clase}`;
    const t = document.createElement('div');
    t.className = 'perilla-caja-titulo';
    t.innerHTML = titulo;
    const contenedorCaja = document.createElement('div');
    contenedorCaja.className = 'perilla-caja';
    contenedorCaja.append(t, valor);
    return { contenedorCaja, valor };
  };
  const flecha = (texto) => {
    const f = document.createElement('div');
    f.className = 'perilla-flecha';
    f.innerHTML = `<span aria-hidden="true">↓</span><code></code>`;
    f.querySelector('code').textContent = texto;
    return f;
  };

  const cajaVoltaje = caja(`Voltaje en ${pin}`, 'n-voltaje');
  const cajaLectura = caja(`<code>analogRead(${pin})</code>`, 'n-lectura');
  const cajaAngulo = caja('Ángulo del servo', 'n-angulo');
  const flechaMap = flecha('');

  const cadena = document.createElement('div');
  cadena.className = 'perilla-cadena';
  cadena.setAttribute('aria-live', 'polite');
  cadena.append(cajaVoltaje.contenedorCaja, flecha('el Arduino lo convierte en número'),
    cajaLectura.contenedorCaja, flechaMap, cajaAngulo.contenedorCaja);

  const servo = conServo ? crearServoSVG({ inicial: 90 }) : null;

  // ---------- Armar todo ----------
  const columnaPerilla = document.createElement('div');
  columnaPerilla.className = 'perilla-columna';
  const ayuda = document.createElement('p');
  ayuda.className = 'anim-etiqueta';
  ayuda.textContent = 'Gira la perilla (arrástrala)';
  columnaPerilla.append(perilla, ayuda);

  const envoltura = document.createElement('div');
  envoltura.className = 'anim-perilla';
  envoltura.append(columnaPerilla, cadena);
  if (servo) {
    const columnaServo = document.createElement('div');
    columnaServo.className = 'perilla-servo';
    columnaServo.append(servo.elemento);
    envoltura.append(columnaServo);
  }
  contenedor.append(envoltura);

  // ---------- Actualizar todo con una lectura nueva ----------
  function actualizar(nuevaLectura) {
    lectura = Math.round(limitar(nuevaLectura, 0, 1023));
    const giro = -GIRO + (lectura / 1023) * GIRO * 2;
    const voltaje = (lectura * 5) / 1023;
    const angulo = mapArduino(lectura, 0, 1023, salidaMin, salidaMax);

    boton.setAttribute('transform', `rotate(${giro} ${CX} ${CY})`);
    arcoValor.setAttribute('d', lectura > 0 ? arco(-GIRO, giro, 84) : '');
    cajaVoltaje.valor.textContent = `${voltaje.toFixed(2)} V`;
    cajaLectura.valor.textContent = lectura;
    flechaMap.querySelector('code').textContent = `map(${lectura}, 0, 1023, ${salidaMin}, ${salidaMax})`;
    cajaAngulo.valor.textContent = `${angulo}°`;
    perilla.setAttribute('aria-valuenow', String(lectura));
    perilla.setAttribute('aria-valuetext', `Lectura ${lectura}, ángulo ${angulo} grados`);
    if (servo) servo.ponerAngulo(limitar(angulo, 0, 180));
  }

  // ---------- Arrastrar con el dedo o el mouse ----------
  let arrastrando = false;
  function desdePuntero(evento) {
    const caja = perilla.getBoundingClientRect();
    const dx = evento.clientX - (caja.left + caja.width / 2);
    const dy = evento.clientY - (caja.top + caja.height / 2);
    let grados = (Math.atan2(dx, -dy) * 180) / Math.PI; // 0° arriba, sentido del reloj
    // Zona muerta de abajo: se queda en el extremo más cercano a donde estaba
    if (grados > GIRO || grados < -GIRO) grados = lectura > 511 ? GIRO : -GIRO;
    actualizar(((grados + GIRO) / (GIRO * 2)) * 1023);
  }
  perilla.addEventListener('pointerdown', (e) => {
    arrastrando = true;
    perilla.setPointerCapture(e.pointerId);
    perilla.focus({ preventScroll: true });
    desdePuntero(e);
  });
  perilla.addEventListener('pointermove', (e) => { if (arrastrando) desdePuntero(e); });
  const soltar = () => { arrastrando = false; };
  perilla.addEventListener('pointerup', soltar);
  perilla.addEventListener('pointercancel', soltar);

  // ---------- Teclado (flechas) ----------
  perilla.addEventListener('keydown', (e) => {
    const pasos = { ArrowRight: 10, ArrowUp: 10, ArrowLeft: -10, ArrowDown: -10, PageUp: 100, PageDown: -100 };
    if (e.key in pasos) actualizar(lectura + pasos[e.key]);
    else if (e.key === 'Home') actualizar(0);
    else if (e.key === 'End') actualizar(1023);
    else return;
    e.preventDefault();
  });

  actualizar(lectura);
}
