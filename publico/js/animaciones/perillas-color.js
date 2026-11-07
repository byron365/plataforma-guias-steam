// ============================================================
// Animación "perillas-color": tres perillas que imitan al sensor de color,
// como el clasificador simulado de la banda (Guía 5 práctica).
// Cada perilla da un valor de analogRead (0 a 1023). Se ve el color que
// "ve" el sensor, la pantalla LCD, el giro de la canaleta y la línea de
// leerColor() que decide. Usa la misma lógica del programa de la guía:
// si R es el mayor, rojo; si G es el mayor, verde; si no, azul.
//
// En la guía:
//   :::animacion tipo="perillas-color"
//   :::
// Opciones (todas opcionales): r · g · b (lectura al empezar, de 0 a 1023)
// ============================================================
import { svg, puntoPerilla, limitar, numero } from './comun/svg.js';
import { crearServoSVG } from './comun/servo-svg.js';
import { el } from '../comun.js';

const GIRO = 135;      // la perilla gira de -135° a +135°, como un potenciómetro real
const CX = 100;
const CY = 100;
const CANALES = [
  { k: 'r', nombre: 'Rojo (R)', pin: 'A0', color: '#DC2626' },
  { k: 'g', nombre: 'Verde (G)', pin: 'A1', color: '#16A34A' },
  { k: 'b', nombre: 'Azul (B)', pin: 'A2', color: '#2563EB' },
];
const ANG = [30, 90, 150];                 // canaleta: rojo, verde, azul
const NOMBRE = ['ROJO', 'VERDE', 'AZUL'];
const LINEAS = [
  'if (r > g && r > b) return 0;  // rojo',
  'if (g > r && g > b) return 1;  // verde',
  'return 2;                      // azul',
];

const arco = (desde, hasta, radio) => {
  const a = puntoPerilla(CX, CY, radio, desde);
  const b = puntoPerilla(CX, CY, radio, hasta);
  return `M ${a.x} ${a.y} A ${radio} ${radio} 0 ${hasta - desde > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
};

// Una perilla que se arrastra con el dedo, el mouse o las flechas del teclado
function crearPerilla(canal, inicial, alCambiar) {
  let lectura = inicial;
  const dibujo = svg('svg', {
    viewBox: '0 0 200 200', class: 'perilla-svg', tabindex: '0', role: 'slider',
    'aria-label': `Perilla ${canal.nombre} en ${canal.pin}`, 'aria-valuemin': '0', 'aria-valuemax': '1023',
  });
  const recorrido = svg('path', { class: 'perilla-recorrido', style: `stroke: ${canal.color}` });
  const boton = svg('g', {},
    svg('circle', { cx: CX, cy: CY, r: 58, class: 'perilla-cuerpo' }),
    svg('circle', { cx: CX, cy: CY, r: 46, class: 'perilla-tapa' }),
    svg('rect', { x: CX - 4, y: CY - 52, width: 8, height: 30, rx: 4, fill: canal.color }));
  dibujo.append(svg('path', { d: arco(-GIRO, GIRO, 84), class: 'perilla-pista' }), recorrido, boton);
  const valor = el('strong', { class: 'pc-valor' });

  function poner(nueva) {
    lectura = Math.round(limitar(nueva, 0, 1023));
    const giro = -GIRO + (lectura / 1023) * GIRO * 2;
    boton.setAttribute('transform', `rotate(${giro} ${CX} ${CY})`);
    recorrido.setAttribute('d', lectura > 0 ? arco(-GIRO, giro, 84) : '');
    valor.textContent = String(lectura);
    dibujo.setAttribute('aria-valuenow', String(lectura));
    alCambiar(canal.k, lectura);
  }

  let arrastrando = false;
  function desdePuntero(evento) {
    const caja = dibujo.getBoundingClientRect();
    const dx = evento.clientX - (caja.left + caja.width / 2);
    const dy = evento.clientY - (caja.top + caja.height / 2);
    let grados = (Math.atan2(dx, -dy) * 180) / Math.PI; // 0° arriba, sentido del reloj
    // Zona muerta de abajo: se queda en el extremo más cercano a donde estaba
    if (grados > GIRO || grados < -GIRO) grados = lectura > 511 ? GIRO : -GIRO;
    poner(((grados + GIRO) / (GIRO * 2)) * 1023);
  }
  dibujo.addEventListener('pointerdown', (e) => { arrastrando = true; dibujo.setPointerCapture(e.pointerId); desdePuntero(e); });
  dibujo.addEventListener('pointermove', (e) => { if (arrastrando) desdePuntero(e); });
  dibujo.addEventListener('pointerup', () => { arrastrando = false; });
  dibujo.addEventListener('pointercancel', () => { arrastrando = false; });
  dibujo.addEventListener('keydown', (e) => {
    const paso = { ArrowUp: 16, ArrowRight: 16, ArrowDown: -16, ArrowLeft: -16 }[e.key];
    if (paso) { e.preventDefault(); poner(lectura + paso); }
  });

  const columna = el('div', { class: 'perilla-columna' }, dibujo,
    el('p', { class: 'anim-etiqueta' }, `${canal.nombre} → ${canal.pin}`), valor);
  return { columna, poner, inicial };
}

export default function montar(contenedor, config) {
  const valores = {
    r: limitar(Math.round(numero(config.r, 300)), 0, 1023),
    g: limitar(Math.round(numero(config.g, 600)), 0, 1023),
    b: limitar(Math.round(numero(config.b, 200)), 0, 1023),
  };

  const pieza = el('div', { class: 'pc-pieza', role: 'img', 'aria-label': 'Color que ve el sensor' });
  const lcdArriba = el('div', {});
  const lcdAbajo = el('div', {});
  const servo = crearServoSVG({ inicial: 90 });
  const canaleta = el('p', { class: 'texto-ayuda pc-centro' });
  const leidos = el('div', {});
  const lineas = LINEAS.map((t) => el('div', { class: 'pc-linea' }, t));

  let listo = false;
  const perillas = CANALES.map((c) => crearPerilla(c, valores[c.k], (k, v) => { valores[k] = v; if (listo) actualizar(); }));

  contenedor.append(el('div', { class: 'anim-perillas-color' },
    el('div', { class: 'pc-perillas' }, ...perillas.map((p) => p.columna)),
    el('p', { class: 'texto-ayuda pc-centro' }, 'Arrastren cada perilla: 0 = no ve nada de ese color · 1023 = ve el máximo'),
    el('div', { class: 'pc-resultado' },
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'El sensor ve'), pieza),
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Pantalla'), el('div', { class: 'pc-lcd', 'aria-live': 'polite' }, lcdArriba, lcdAbajo)),
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Canaleta'), servo.elemento, canaleta)),
    el('pre', { class: 'joystick-codigo pc-codigo' }, leidos, ...lineas)));

  function actualizar() {
    const { r, g, b } = valores;
    // Igual que leerColor(): 0 = rojo, 1 = verde, 2 = azul
    let c = 2;
    if (r > g && r > b) c = 0;
    else if (g > r && g > b) c = 1;

    pieza.style.background = `rgb(${Math.floor(r / 4)}, ${Math.floor(g / 4)}, ${Math.floor(b / 4)})`;
    lcdArriba.textContent = `Color: ${NOMBRE[c]}`.padEnd(16);
    lcdAbajo.textContent = `R${Math.floor(r / 4)} G${Math.floor(g / 4)} B${Math.floor(b / 4)}`.padEnd(16);
    servo.ponerAngulo(ANG[c]);
    canaleta.textContent = `desviador.write(${ANG[c]});`;
    leidos.textContent = `int r = ${r};  int g = ${g};  int b = ${b};`;
    lineas.forEach((l, i) => l.classList.toggle('activa', i === c));
  }

  perillas.forEach((p) => p.poner(p.inicial));
  listo = true;
  actualizar();
}
