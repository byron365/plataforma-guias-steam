// ============================================================
// Animación "joystick": un joystick virtual que mueve dos servos
// y compara dos formas de control:
//   - Directo:     la posición del joystick ES el ángulo (al soltarlo, vuelve al centro).
//   - Paso a paso: inclinar el joystick suma o resta grados poco a poco
//                  (al soltarlo, el servo se queda donde estaba).
//
// En la guía:
//   :::animacion tipo="joystick" pinx="A0" piny="A1" ejex="Base" ejey="Hombro"
//   :::
// Opciones (todas opcionales):
//   pinx, piny    pines analógicos         (por defecto A0 y A1)
//   ejex, ejey    qué mueve cada eje       (por defecto Base y Hombro)
//   alto, bajo    umbrales del modo paso a paso (por defecto 700 y 300, como en la guía 14)
//   modo          "directo" o "pasos" para empezar (por defecto "directo")
//   servos        "no": solo el joystick y la lectura de X (laberinto, guía 1).
//                 La lectura de Y se deja para descubrirla en Wokwi (la pide la guía).
// ============================================================
import { svg, numero, limitar, mapArduino } from './comun/svg.js';
import { crearServoSVG } from './comun/servo-svg.js';
import { el } from '../comun.js';

const RADIO_BASE = 80;
const RADIO_PALANCA = 30;
const CENTRO = 100;
const PERIODO_PASOS = 15; // ms entre cada grado en el modo paso a paso

export default function montar(contenedor, config) {
  const pinX = /^A\d$/i.test(config.pinx || '') ? config.pinx.toUpperCase() : 'A0';
  const pinY = /^A\d$/i.test(config.piny || '') ? config.piny.toUpperCase() : 'A1';
  const nombreX = config.ejex || 'Base';
  const nombreY = config.ejey || 'Hombro';
  const UMBRAL_ALTO = limitar(numero(config.alto, 700), 513, 1023);
  const UMBRAL_BAJO = limitar(numero(config.bajo, 300), 0, 511);
  const zona = ((UMBRAL_ALTO - 512) + (512 - UMBRAL_BAJO)) / 2; // radio de la zona quieta (para el dibujo)
  const varX = `p${nombreX.charAt(0).toUpperCase()}`; // pB (base), pH (hombro)...
  const varY = `p${nombreY.charAt(0).toUpperCase()}`;
  // Límites como en el código de la garra: hombro y codo de 15 a 165; lo demás de 0 a 180
  const limites = (nombre) => (/hombro|codo/i.test(nombre) ? [15, 165] : [0, 180]);
  const [minX, maxX] = limites(nombreX);
  const [minY, maxY] = limites(nombreY);
  let modo = config.modo === 'pasos' ? 'pasos' : 'directo';
  const sinServos = config.servos === 'no';

  let px = 0; let py = 0;           // posición de la palanca (-1 a 1)
  let anguloX = 90; let anguloY = 90;
  let ultimoPaso = 0;

  // ---------- Joystick ----------
  const palanca = svg('g', { class: 'joystick-palanca' },
    svg('circle', { r: RADIO_PALANCA + 4, class: 'joystick-sombra' }),
    svg('circle', { r: RADIO_PALANCA, class: 'joystick-bola' }));
  const zonaMuerta = svg('circle', { cx: CENTRO, cy: CENTRO, r: (zona / 512) * RADIO_BASE, class: 'joystick-zona' });
  const joystick = svg('svg', {
    viewBox: '0 0 200 200', class: 'joystick-svg', tabindex: '0', role: 'application',
    'aria-label': 'Joystick virtual: arrástralo o usa las flechas del teclado',
  },
  svg('circle', { cx: CENTRO, cy: CENTRO, r: RADIO_BASE + 14, class: 'joystick-base' }),
  zonaMuerta,
  svg('line', { x1: CENTRO - RADIO_BASE, y1: CENTRO, x2: CENTRO + RADIO_BASE, y2: CENTRO, class: 'joystick-cruz' }),
  svg('line', { x1: CENTRO, y1: CENTRO - RADIO_BASE, x2: CENTRO, y2: CENTRO + RADIO_BASE, class: 'joystick-cruz' }),
  palanca);

  // ---------- Servos ----------
  const servoX = crearServoSVG({ inicial: 90, etiqueta: nombreX });
  const servoY = crearServoSVG({ inicial: 90, etiqueta: nombreY });

  // ---------- Textos ----------
  const lecturaX = el('strong'); const lecturaY = el('strong');
  const textoAnguloX = el('strong'); const textoAnguloY = el('strong');
  const codigo = el('pre', { class: 'joystick-codigo' });
  const explicacion = el('p', { class: 'anim-estado' });

  const botonDirecto = el('button', { type: 'button', class: 'anim-boton', onclick: () => cambiarModo('directo') }, 'Control directo');
  const botonPasos = el('button', { type: 'button', class: 'anim-boton', onclick: () => cambiarModo('pasos') }, 'Paso a paso');

  if (sinServos) {
    // Solo el joystick: la lectura de X y el código de la guía 1
    contenedor.append(el('div', { class: 'anim-joystick solo' },
      el('div', { class: 'joystick-columna' }, joystick, el('p', { class: 'anim-etiqueta' }, 'Arrastra la palanca')),
      el('div', { class: 'joystick-servos' },
        el('div', { class: 'joystick-lecturas' },
          el('span', {}, `analogRead(${pinX}) = `, lecturaX),
          el('span', {}, `analogRead(${pinY}) = `, el('strong', {}, '¿?'))),
        el('p', { class: 'texto-ayuda' }, `El eje Y lo descubren en Wokwi (tabla de la Parte 4).`),
        codigo)));
    zonaMuerta.classList.add('oculto');
    const actualizarSolo = () => {
      const lx = Math.round(limitar((px + 1) * 511.5, 0, 1023));
      palanca.setAttribute('transform', `translate(${CENTRO + px * RADIO_BASE} ${CENTRO + py * RADIO_BASE})`);
      lecturaX.textContent = lx;
      codigo.textContent = `int x = analogRead(${pinX});  // ${lx}`;
    };
    actualizar = actualizarSolo;
  } else contenedor.append(el('div', { class: 'anim-joystick' },
    el('div', { class: 'joystick-columna' },
      el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Modo de control' }, botonDirecto, botonPasos),
      joystick,
      el('p', { class: 'anim-etiqueta' }, 'Arrastra la palanca'),
      el('div', { class: 'joystick-lecturas' },
        el('span', {}, `analogRead(${pinX}) = `, lecturaX),
        el('span', {}, `analogRead(${pinY}) = `, lecturaY)),
    ),
    el('div', { class: 'joystick-servos' },
      el('figure', {}, servoX.elemento, el('figcaption', {}, `${nombreX} (eje X): `, textoAnguloX)),
      el('figure', {}, servoY.elemento, el('figcaption', {}, `${nombreY} (eje Y): `, textoAnguloY)),
      codigo, explicacion,
    ),
  ));

  // Lectura que daría el Arduino (0 a 1023, centro ≈ 512)
  const lectura = (v) => Math.round(limitar((v + 1) * 511.5, 0, 1023));

  function cambiarModo(nuevo) {
    modo = nuevo;
    botonDirecto.classList.toggle('activo', modo === 'directo');
    botonPasos.classList.toggle('activo', modo === 'pasos');
    botonDirecto.setAttribute('aria-pressed', String(modo === 'directo'));
    botonPasos.setAttribute('aria-pressed', String(modo === 'pasos'));
    zonaMuerta.classList.toggle('oculto', modo === 'directo');
    explicacion.textContent = modo === 'directo'
      ? 'Directo: el ángulo sigue a la palanca. Si la sueltas, vuelve al centro y el servo regresa a 90°.'
      : 'Paso a paso: el brazo avanza de a 1° mientras empujas la palanca. Si la sueltas, se queda quieto donde estaba.';
    actualizar();
  }

  function actualizar() {
    const lx = lectura(px);
    const ly = lectura(-py); // hacia arriba = lectura mayor
    palanca.setAttribute('transform', `translate(${CENTRO + px * RADIO_BASE} ${CENTRO + py * RADIO_BASE})`);
    lecturaX.textContent = lx;
    lecturaY.textContent = ly;

    if (modo === 'directo') {
      anguloX = mapArduino(lx, 0, 1023, minX, maxX);
      anguloY = mapArduino(ly, 0, 1023, minY, maxY);
      codigo.textContent =
        `${varX} = leer(${pinX}, ${minX}, ${maxX});  // ${lx} → ${anguloX}°\n` +
        `${varY} = leer(${pinY}, ${minY}, ${maxY});  // ${ly} → ${anguloY}°`;
    } else {
      codigo.textContent =
        `int x = analogRead(${pinX});  // ${lx}\n` +
        `if (x > ${UMBRAL_ALTO} && ${varX} < ${maxX}) ${varX}++;\n` +
        `if (x < ${UMBRAL_BAJO} && ${varX} > ${minX}) ${varX}--;\n` +
        `// ${nombreY}: lo mismo con analogRead(${pinY}) = ${ly}`;
    }
    servoX.ponerAngulo(anguloX, modo === 'pasos');
    servoY.ponerAngulo(anguloY, modo === 'pasos');
    textoAnguloX.textContent = `${anguloX}°`;
    textoAnguloY.textContent = `${anguloY}°`;
  }

  // En el modo paso a paso, cada 15 ms se suma o resta 1° si la palanca está inclinada
  function ciclo(tiempo) {
    if (modo === 'pasos' && tiempo - ultimoPaso >= PERIODO_PASOS) {
      ultimoPaso = tiempo;
      const lx = lectura(px); const ly = lectura(-py);
      const antes = anguloX + anguloY;
      if (lx > UMBRAL_ALTO) anguloX = Math.min(maxX, anguloX + 1);
      if (lx < UMBRAL_BAJO) anguloX = Math.max(minX, anguloX - 1);
      if (ly > UMBRAL_ALTO) anguloY = Math.min(maxY, anguloY + 1);
      if (ly < UMBRAL_BAJO) anguloY = Math.max(minY, anguloY - 1);
      if (anguloX + anguloY !== antes || arrastrando) actualizar();
    }
    if (contenedor.isConnected) requestAnimationFrame(ciclo);
  }
  requestAnimationFrame(ciclo);

  // ---------- Arrastrar ----------
  let arrastrando = false;
  function moverA(evento) {
    const caja = joystick.getBoundingClientRect();
    const escala = caja.width / 200;
    let dx = (evento.clientX - caja.left) / escala - CENTRO;
    let dy = (evento.clientY - caja.top) / escala - CENTRO;
    const distancia = Math.hypot(dx, dy);
    if (distancia > RADIO_BASE) { dx = (dx / distancia) * RADIO_BASE; dy = (dy / distancia) * RADIO_BASE; }
    px = dx / RADIO_BASE; py = dy / RADIO_BASE;
    actualizar();
  }
  function soltar() {
    arrastrando = false;
    px = 0; py = 0; // el resorte del joystick lo regresa al centro
    joystick.classList.remove('arrastrando');
    actualizar();
  }
  joystick.addEventListener('pointerdown', (e) => {
    arrastrando = true;
    joystick.setPointerCapture(e.pointerId);
    joystick.classList.add('arrastrando');
    moverA(e);
  });
  joystick.addEventListener('pointermove', (e) => { if (arrastrando) moverA(e); });
  joystick.addEventListener('pointerup', soltar);
  joystick.addEventListener('pointercancel', soltar);

  // ---------- Teclado: las flechas inclinan la palanca mientras están presionadas ----------
  const teclas = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  joystick.addEventListener('keydown', (e) => {
    if (!teclas[e.key]) return;
    e.preventDefault();
    [px, py] = teclas[e.key];
    actualizar();
  });
  joystick.addEventListener('keyup', (e) => { if (teclas[e.key]) soltar(); });

  cambiarModo(modo);
}
