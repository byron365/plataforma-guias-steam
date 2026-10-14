// ============================================================
// Animación "banda": la banda clasificadora completa, con sus dos programas.
//   Nodo banda (esclavo 8): velocidad = analogRead(POT) / 4 → PWM al MOSFET;
//     el sensor IR avisa cuando una pieza RECIÉN llega (flanco).
//   Nodo clasificador (maestro): cada 20 ms pregunta al nodo banda; si hay pieza,
//     espera 150 ms, lee el color (el canal más alto), suma en el display RR-VV-AA
//     y programa el desviador: moverEn = max(millis(), ultimaPieza + RECORRIDO).
//   El botón de paro manda 'S' (detener) o 'G' (avanzar).
// Vista desde arriba. Las piezas caen al contenedor según dónde esté la paleta.
//
// En la guía:
//   :::animacion tipo="banda"
//   :::
// Opciones (todas opcionales, como los "Ajustes del equipo"):
//   recorrido (1200 ms) · rojo (30) · verde (90) · azul (150)  (ángulos ANG[3])
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { crearDisplay7 } from './comun/siete-segmentos.js';
import { el } from '../comun.js';

// Medidas en cm sobre la banda (40 cm entre rodillos); 15 px por cm
const PX = 15; const X0 = 20; const Y_BANDA = 112; const ANCHO_BANDA = 6;
const X_IR = 14; const X_COLOR = 15.5; const X_DESVIADOR = 27.5; const LARGO = 40;
const V_MAX = 20; // cm/s con la perilla al máximo
const COLORES = [
  { nombre: 'Rojo', pieza: 'roja', css: '#DC2626', crudo: [900, 220, 210] },
  { nombre: 'Verde', pieza: 'verde', css: '#16A34A', crudo: [210, 780, 300] },
  { nombre: 'Azul', pieza: 'azul', css: '#2563EB', crudo: [160, 260, 720] },
];
const BANDA_CRUDO = [60, 64, 70]; // la banda sola (oscura)

export default function montar(contenedor, config) {
  const RECORRIDO = limitar(Math.round(numero(config.recorrido, 1200)), 100, 10000);
  const ANG = [numero(config.rojo, 30), numero(config.verde, 90), numero(config.azul, 150)].map((a) => limitar(a, 0, 180));

  // ---------- Estado de los dos nodos ----------
  let pot = 512;                 // analogRead(POT)
  let paro = false;              // botón de paro presionado
  let detenida = false;          // en el nodo banda
  let piezaAviso = false; let antes = false;
  let cuenta = [0, 0, 0];
  let anguloPendiente = -1; let moverEn = 0; let ultimaPieza = -1e9;
  let servo = 90; let servoVisto = 90;
  let clasificarEn = null;       // la pieza se lee 150 ms después del aviso (delay(150))
  let reloj = 0; let ultimo = 0; let acumBanda = 0; let acumMaestro = 0;
  let piezas = [];               // { x (cm), y (cm desde el centro), color, estado }
  let lote = 0; let siguientePieza = 0;
  let resultados = { bien: 0, mal: 0 };

  // ---------- Dibujo ----------
  const px = (cm) => X0 + cm * PX;
  const marcas = svg('g', { class: 'banda-marcas' });
  const capaPiezas = svg('g', {});
  const paleta = svg('line', { x1: 0, y1: 0, x2: 0, y2: -44, class: 'banda-paleta' });
  const irHaz = svg('line', { x1: px(X_IR), x2: px(X_IR), y1: Y_BANDA - 50, y2: Y_BANDA + 50, class: 'cont-haz' });
  const cajas = [
    { color: 0, x: px(X_DESVIADOR) + 40, y: 2 },
    { color: 1, x: px(LARGO) + 6, y: Y_BANDA - 30 },
    { color: 2, x: px(X_DESVIADOR) + 40, y: Y_BANDA + 58 },
  ];
  const raiz = svg('svg', { viewBox: `0 0 ${px(LARGO) + 80} 230`, class: 'banda-svg', role: 'img', 'aria-label': 'Banda transportadora vista desde arriba' },
    ...cajas.map((c) => svg('g', {},
      svg('rect', { x: c.x, y: c.y, width: 64, height: 56, rx: 6, class: 'banda-caja', stroke: COLORES[c.color].css }),
      svg('text', { x: c.x + 32, y: c.y + 34, class: 'banda-texto', 'text-anchor': 'middle', fill: COLORES[c.color].css }, COLORES[c.color].nombre))),
    svg('rect', { x: px(0), y: Y_BANDA - (ANCHO_BANDA / 2) * PX, width: LARGO * PX, height: ANCHO_BANDA * PX, class: 'banda-cinta' }),
    marcas,
    svg('circle', { cx: px(0), cy: Y_BANDA, r: 22, class: 'banda-rodillo' }),
    svg('circle', { cx: px(LARGO), cy: Y_BANDA, r: 22, class: 'banda-rodillo' }),
    irHaz, svg('text', { x: px(X_IR), y: Y_BANDA - 54, class: 'banda-texto', 'text-anchor': 'middle' }, 'IR'),
    svg('rect', { x: px(X_COLOR) - 16, y: Y_BANDA - 52, width: 32, height: 104, rx: 4, class: 'banda-tunel' }),
    svg('text', { x: px(X_COLOR), y: Y_BANDA + 66, class: 'banda-texto', 'text-anchor': 'middle' }, 'color'),
    capaPiezas,
    svg('g', { transform: `translate(${px(X_DESVIADOR)} ${Y_BANDA + 50})` }, svg('circle', { r: 8, class: 'disp-servo' }), paleta),
    svg('text', { x: px(X_DESVIADOR), y: Y_BANDA + 76, class: 'banda-texto', 'text-anchor': 'middle' }, 'desviador'));

  const display = crearDisplay7({ digitos: 8, etiqueta: 'Display MAX7219' });
  const perilla = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 1023, step: 1, value: pot, 'aria-label': 'Perilla de velocidad (A0)' });
  const vPerilla = el('strong');
  const botonParo = el('button', { type: 'button', class: 'anim-boton' });
  const botonesPieza = el('div', { class: 'anim-rapidos' },
    ...COLORES.map((c, i) => el('button', { type: 'button', class: 'anim-boton', onclick: () => ponerPieza(i) }, `▣ Pieza ${c.pieza}`)),
    el('button', { type: 'button', class: 'boton boton-chico', onclick: () => { lote = 10; siguientePieza = reloj; } }, '🎲 Lote de 10 piezas'));
  const estado = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  const conteo = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-banda' },
    raiz,
    el('div', { class: 'banda-panel' },
      el('div', {},
        el('label', { class: 'anim-etiqueta' }, 'Perilla de velocidad (A0): ', vPerilla, perilla),
        botonesPieza,
        el('div', { class: 'anim-rapidos' }, botonParo),
        conteo),
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Display (RR-VV-AA)'), display.elemento, estado))));

  function mostrarCuentas() {
    display.ponerCaracter(5, '-'); display.ponerCaracter(2, '-');
    for (let i = 0; i < 3; i++) {
      const pos = 7 - i * 3;
      display.ponerDigito(pos, Math.floor(cuenta[i] / 10) % 10);
      display.ponerDigito(pos - 1, cuenta[i] % 10);
    }
  }

  function ponerPieza(color) {
    // No encimar piezas en la entrada
    if (piezas.some((p) => p.estado === 'banda' && p.x < 3)) return;
    piezas.push({ x: 0.5, y: 0, color, estado: 'banda' });
  }

  // Lo que el sensor de color ve en este momento
  function crudoBajoSensor() {
    const p = piezas.find((q) => q.estado === 'banda' && Math.abs(q.x - X_COLOR) < 1.2);
    return p ? COLORES[p.color].crudo : BANDA_CRUDO;
  }
  function leerColor() {
    const [r, g, b] = crudoBajoSensor();
    if (r > g && r > b) return 0;
    if (g > r && g > b) return 1;
    return 2;
  }

  // ---------- loop() del nodo banda (cada 5 ms) ----------
  const velocidad = () => Math.floor(pot / 4);
  function vueltaBanda() {
    const ahora = piezas.some((p) => p.estado === 'banda' && Math.abs(p.x - X_IR) < 1);
    if (ahora && !antes) piezaAviso = true;
    antes = ahora;
  }
  // ---------- loop() del clasificador (cada 20 ms) ----------
  function vueltaMaestro() {
    detenida = paro;                                   // 'S' o 'G'
    if (clasificarEn !== null) return;                 // está dentro de delay(150)
    const hay = piezaAviso; piezaAviso = false;        // requestFrom(8, 2)
    if (hay) clasificarEn = reloj + 150;
    if (anguloPendiente >= 0 && reloj >= moverEn) { servo = anguloPendiente; anguloPendiente = -1; }
  }
  function clasificar() {
    const c = leerColor();
    cuenta[c]++;
    mostrarCuentas();
    anguloPendiente = ANG[c];
    moverEn = Math.max(reloj, ultimaPieza + RECORRIDO);
    ultimaPieza = reloj;
  }

  // ---------- Movimiento ----------
  function mover(dt) {
    const v = detenida ? 0 : (velocidad() / 255) * V_MAX; // cm/s
    for (const p of piezas) {
      if (p.estado === 'banda') {
        p.x += v * dt;
        if (p.x >= X_DESVIADOR && !p.destino) {
          // La paleta decide el carril: cerca de ANG[0] → rojo, cerca de ANG[2] → azul, si no, sigue (verde)
          const cerca = ANG.map((a) => Math.abs(a - servoVisto));
          p.destino = cerca.indexOf(Math.min(...cerca));
          if (p.destino !== 1) p.estado = 'desviada';
        }
        if (p.x >= LARGO - 0.5) p.estado = 'cayendo';
      } else if (p.estado === 'desviada') {
        p.y += (p.destino === 0 ? -1 : 1) * 14 * dt;
        p.x += 4 * dt;
        if (Math.abs(p.y) > 4.6) p.estado = 'cayendo';
      } else if (p.estado === 'cayendo') {
        p.estado = 'caja';
        if (p.destino === undefined) p.destino = 1;
        if (p.destino === p.color) resultados.bien++; else resultados.mal++;
        const caja = cajas[p.destino];
        p.cx = caja.x + 12 + ((resultados.bien + resultados.mal) % 4) * 12; p.cy = caja.y + 12 + Math.floor(((resultados.bien + resultados.mal) % 8) / 4) * 14;
      }
    }
    // En las cajas solo se dibujan las últimas 24 piezas
    const enCajas = piezas.filter((p) => p.estado === 'caja');
    if (enCajas.length > 24) piezas = piezas.filter((p) => p !== enCajas[0]);
  }

  function dibujar() {
    // La cinta se mueve: marcas que avanzan
    const desplazamiento = (reloj / 1000) * (detenida ? 0 : (velocidad() / 255) * V_MAX);
    marcas.replaceChildren(...Array.from({ length: 21 }, (_, i) => {
      const x = ((i * 2 + desplazamiento) % 40);
      return svg('line', { x1: px(x), x2: px(x), y1: Y_BANDA - 44, y2: Y_BANDA + 44 });
    }));
    capaPiezas.replaceChildren(...piezas.map((p) => (p.estado === 'caja'
      ? svg('rect', { x: p.cx - 5, y: p.cy - 5, width: 10, height: 10, rx: 2, fill: COLORES[p.color].css, class: 'banda-pieza' })
      : svg('rect', { x: px(p.x) - 13, y: Y_BANDA + p.y * PX - 13, width: 26, height: 26, rx: 4, fill: COLORES[p.color].css, class: 'banda-pieza' }))));
    // El servo gira hacia su ángulo (no es instantáneo)
    servoVisto += Math.sign(servo - servoVisto) * Math.min(Math.abs(servo - servoVisto), 6);
    paleta.setAttribute('transform', `rotate(${servoVisto - 90})`);
    irHaz.classList.toggle('cortado', antes);
    vPerilla.textContent = `${pot} → velocidad ${velocidad()}`;
    botonParo.textContent = paro ? '🟢 Soltar el paro (G)' : '🛑 Botón de paro (S)';
    botonParo.classList.toggle('activo', paro);
    estado.textContent =
      `Nodo banda: analogWrite(MOTOR, ${detenida ? 0 : velocidad()})\n` +
      `Sensor IR: ${antes ? 'LOW (pieza)' : 'HIGH'}\n` +
      `Desviador: ${Math.round(servoVisto)}°${anguloPendiente >= 0 ? `  (espera para ir a ${anguloPendiente}°)` : ''}`;
    conteo.textContent = `En el contenedor correcto: ${resultados.bien} · en otro: ${resultados.mal}`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(60, t - ultimo) : 0;
    ultimo = t; reloj += dt; acumBanda += dt; acumMaestro += dt;
    while (acumBanda >= 5) { acumBanda -= 5; vueltaBanda(); }
    while (acumMaestro >= 20) { acumMaestro -= 20; vueltaMaestro(); }
    if (clasificarEn !== null && reloj >= clasificarEn) { clasificarEn = null; clasificar(); }
    if (lote > 0 && reloj >= siguientePieza) {
      ponerPieza(Math.floor(Math.random() * 3)); lote--;
      siguientePieza = reloj + 1800 + Math.random() * 1200;
    }
    for (let i = 0; i < 4; i++) mover(dt / 1000 / 4);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  perilla.addEventListener('input', () => { pot = Number(perilla.value); });
  botonParo.addEventListener('click', () => { paro = !paro; });
  mostrarCuentas();
  dibujar();
  requestAnimationFrame(cuadro);
}
