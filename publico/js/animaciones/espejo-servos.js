// ============================================================
// Animación "espejo-servos": dos servos que se miran mueven las dos hojas.
// Al izquierdo se le da el ángulo a y al derecho 180 − a, como ponerAngulo()
// del puente. Con "Probar el error" el derecho recibe a y su hoja gira al revés.
//
// En la guía:
//   :::animacion tipo="espejo-servos"
//   :::
// Opciones (todas opcionales):
//   max   ángulo máximo del deslizador (por defecto 90)
//   izq, der   nombres de los servos en el código (por defecto izq y der)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { crearServoSVG } from './comun/servo-svg.js';
import { el } from '../comun.js';

export default function montar(contenedor, config) {
  const maximo = limitar(numero(config.max, 90), 10, 90);
  const nombreIzq = /^[A-Za-z_]\w*$/.test(config.izq || '') ? config.izq : 'izq';
  const nombreDer = /^[A-Za-z_]\w*$/.test(config.der || '') ? config.der : 'der';
  let a = 0;
  let conError = false;

  // ---------- Hojas vistas de frente ----------
  const F = { ancho: 420, alto: 170, suelo: 110, h0: 110, h1: 310 };
  const largo = (F.h1 - F.h0) / 2;
  const hojaIzq = svg('g', {}, svg('rect', { x: 0, y: -6, width: largo, height: 8, rx: 2, class: 'puente-hoja' }));
  const hojaDer = svg('g', {}, svg('rect', { x: -largo, y: -6, width: largo, height: 8, rx: 2, class: 'puente-hoja' }));
  const frente = svg('svg', { viewBox: `0 0 ${F.ancho} ${F.alto}`, class: 'espejo-frente', role: 'img', 'aria-label': 'Las dos hojas del puente vistas de frente' },
    svg('rect', { x: F.h0, y: F.suelo + 8, width: F.h1 - F.h0, height: F.alto - F.suelo - 8, class: 'puente-agua' }),
    svg('rect', { x: 0, y: F.suelo, width: F.h0, height: F.alto - F.suelo, class: 'puente-tierra' }),
    svg('rect', { x: F.h1, y: F.suelo, width: F.ancho - F.h1, height: F.alto - F.suelo, class: 'puente-tierra' }),
    hojaIzq, hojaDer,
    svg('circle', { cx: F.h0, cy: F.suelo - 2, r: 6, class: 'puente-eje' }),
    svg('circle', { cx: F.h1, cy: F.suelo - 2, r: 6, class: 'puente-eje' }),
    svg('text', { x: F.h0 - 8, y: F.suelo - 14, class: 'puente-texto-chico', 'text-anchor': 'end' }, 'Servo izquierdo'),
    svg('text', { x: F.h1 + 8, y: F.suelo - 14, class: 'puente-texto-chico' }, 'Servo derecho'));

  // ---------- Los dos servos (se miran: el derecho está volteado) ----------
  const servoIzq = crearServoSVG({ inicial: 0, etiqueta: 'IZQ' });
  const servoDer = crearServoSVG({ inicial: 180, etiqueta: 'DER' });
  const valorIzq = el('span', { class: 'anim-valor' });
  const valorDer = el('span', { class: 'anim-valor' });
  const codigoDer = el('span');

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: maximo, step: 1, value: 0, 'aria-label': 'Ángulo a' });
  const valorA = el('strong');
  const casillaError = el('input', { type: 'checkbox' });
  const estado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-espejo' },
    frente,
    el('div', { class: 'espejo-servos' },
      el('figure', {}, servoIzq.elemento,
        el('figcaption', { class: 'anim-codigo' }, `${nombreIzq}.write(`, valorIzq, ');')),
      el('figure', {}, servoDer.elemento,
        el('figcaption', { class: 'anim-codigo' }, `${nombreDer}.write(`, codigoDer, valorDer, ');'))),
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Ángulo a = ', valorA, deslizador),
      el('label', { class: 'casilla-simple' }, casillaError, ` Probar el error: ${nombreDer}.write(a)`),
      estado)));

  function dibujar() {
    const paraDer = conError ? a : 180 - a;
    servoIzq.ponerAngulo(a);
    servoDer.ponerAngulo(paraDer);
    valorA.textContent = `${a}°`;
    valorIzq.textContent = a;
    codigoDer.textContent = conError ? '' : '180 − ';
    valorDer.textContent = a; // sin el resultado de la resta: lo calculan ellos (pregunta g5-p1)
    valorDer.classList.toggle('valor-error', conError);

    // Hoja izquierda: sube con a. Hoja derecha: su giro depende de lo que recibe su servo.
    // Con 180 − a gira en espejo (sube); con a gira igual que la izquierda (baja).
    const giroDer = conError ? -a : a;
    hojaIzq.setAttribute('transform', `translate(${F.h0} ${F.suelo - 2}) rotate(${-a})`);
    hojaDer.setAttribute('transform', `translate(${F.h1} ${F.suelo - 2}) rotate(${giroDer})`);
    hojaDer.classList.toggle('hoja-error', conError && a > 0);

    estado.className = `anim-estado ${conError && a > 0 ? 'alerta' : ''}`;
    estado.textContent = conError
      ? (a > 0 ? 'Las dos reciben el mismo número: la hoja derecha baja hacia el río.' : 'Mueve el deslizador para ver qué pasa.')
      : 'Las dos hojas se mueven en espejo.';
  }

  deslizador.addEventListener('input', () => { a = Number(deslizador.value); dibujar(); });
  casillaError.addEventListener('change', () => { conError = casillaError.checked; dibujar(); });
  dibujar();
}
