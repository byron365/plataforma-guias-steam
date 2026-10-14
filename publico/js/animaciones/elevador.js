// ============================================================
// Animación "elevador": el elevador de tres pisos con sus dos programas.
//   Al encender, la central baja la cabina hasta el final de carrera de abajo.
//   En cada vuelta: sondea los tres nodos (¿alguien llamó?) y les informa el piso,
//   lee los reed, revisa el paro, elige la llamada más cercana, sube o baja con
//   rampa (vel += 5 hasta VEL_MAX) y al llegar abre las puertas 2 s.
//   Cada nodo de piso tiene su botón, su LED y su display de 7 segmentos.
//
// En la guía:
//   :::animacion tipo="elevador"
//   :::
// Opciones (todas opcionales, como los "Ajustes del equipo"): velmax (200)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { crearDisplay7 } from './comun/siete-segmentos.js';
import { el } from '../comun.js';

const ALTURA_PISO = 180;                 // mm entre pisos
const PISOS_MM = [0, 180, 360];
const FIN_ABAJO_MM = -12; const FIN_ARRIBA_MM = 372;
const VENTANA_REED = 5;                  // mm alrededor del piso en que el reed se cierra
const V_MAX_MM = 140;                    // mm/s con PWM 255
const yDe = (mm) => 300 - mm * 0.55;     // posición en el dibujo (fondo de la cabina)

export default function montar(contenedor, config) {
  const VEL_MAX = limitar(Math.round(numero(config.velmax, 200)), 60, 255);

  // ---------- Central ----------
  let pisoActual = 0; let destino = -1; let vel = 0;
  const llamada = [false, false, false];
  let homing = true;                       // setup(): bajar hasta el final de abajo
  let puertasHasta = 0; let puertasPiso = -1;
  let paro = false;
  let motorV = 0;                          // + sube, − baja (PWM con signo)
  // ---------- Nodos de piso ----------
  const nodos = [0, 1, 2].map(() => ({ pedido: false, encendido: false, piso: 1 }));
  // ---------- Mundo ----------
  let pos = 200;                           // mm: la cabina empieza entre el piso 2 y el 3
  let reloj = 0; let ultimo = 0; let acumulado = 0;
  let atendidas = [];

  // ---------- Dibujo ----------
  const cabina = svg('g', {});
  const contrapeso = svg('rect', { x: 196, width: 18, height: 34, rx: 3, class: 'contra-peso' });
  const hilo = svg('g', {});
  const puertas = svg('g', {});
  const reeds = PISOS_MM.map((mm) => svg('rect', { x: 66, y: yDe(mm) - 8, width: 8, height: 16, rx: 2, class: 'elev-reed' }));
  const finAbajo = svg('rect', { x: 66, y: yDe(FIN_ABAJO_MM) - 4, width: 12, height: 8, class: 'elev-fin' });
  const finArriba = svg('rect', { x: 66, y: yDe(FIN_ARRIBA_MM) - 70, width: 12, height: 8, class: 'elev-fin' });
  const raiz = svg('svg', { viewBox: '0 0 240 330', class: 'elev-svg', role: 'img', 'aria-label': 'Torre del elevador con la cabina, el contrapeso y los tres pisos' },
    svg('rect', { x: 78, y: 10, width: 6, height: 300, class: 'elev-guia' }),
    svg('rect', { x: 162, y: 10, width: 6, height: 300, class: 'elev-guia' }),
    svg('rect', { x: 60, y: 306, width: 180, height: 10, class: 'elev-base' }),
    ...PISOS_MM.map((mm, i) => svg('g', {},
      svg('line', { x1: 20, x2: 78, y1: yDe(mm), y2: yDe(mm), class: 'elev-piso' }),
      svg('text', { x: 20, y: yDe(mm) - 6, class: 'elev-texto' }, `Piso ${i + 1}`))),
    ...reeds, finAbajo, finArriba,
    svg('circle', { cx: 150, cy: 22, r: 14, class: 'contra-polea' }),
    svg('text', { x: 150, y: 8, class: 'elev-texto', 'text-anchor': 'middle' }, 'motor'),
    hilo, cabina, puertas, contrapeso);

  // Panel de cada piso: botón, LED y display (nodo con su dirección)
  const paneles = [2, 1, 0].map((i) => {
    const display = crearDisplay7({ digitos: 1, etiqueta: `Display del piso ${i + 1}` });
    const led = el('span', { class: 'elev-led', 'aria-hidden': 'true' });
    const boton = el('button', { type: 'button', class: 'anim-boton' }, '🔘 Llamar');
    boton.addEventListener('click', () => { nodos[i].pedido = true; nodos[i].encendido = true; });
    const caja = el('div', { class: 'elev-panel' },
      el('div', { class: 'elev-panel-titulo' }, `Piso ${i + 1}`, el('small', {}, ` · nodo ${8 + i}`)),
      el('div', { class: 'elev-panel-fila' }, display.elemento, led, boton));
    return { i, display, led, caja };
  });
  const botonParo = el('button', { type: 'button', class: 'anim-boton' });
  const estado = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  const registro = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-elevador' },
    raiz,
    el('div', { class: 'anim-controles' },
      ...paneles.map((p) => p.caja),
      el('div', { class: 'anim-rapidos' }, botonParo),
      registro, estado)));

  // ---------- Funciones de la central ----------
  const motor = (v) => { motorV = v; };
  const parar = () => { motor(0); vel = 0; };
  function leerPiso() {
    for (let i = 0; i < 3; i++) if (Math.abs(pos - PISOS_MM[i]) <= VENTANA_REED) return i;
    return -1;
  }
  function sondearNodos() {
    for (let i = 0; i < 3; i++) {
      if (nodos[i].pedido) { llamada[i] = true; nodos[i].pedido = false; }   // responder()
      nodos[i].piso = pisoActual + 1; nodos[i].encendido = llamada[i];      // recibir()
    }
  }
  function elegirDestino() {
    let mejor = -1;
    for (let i = 0; i < 3; i++) {
      if (!llamada[i]) continue;
      const d = Math.abs(i - pisoActual);
      if (mejor < 0 || d < Math.abs(mejor - pisoActual)) mejor = i;
    }
    return mejor;
  }

  // Una vuelta del loop() (cada 20 ms; durante delay(2000) no hace nada)
  function vuelta() {
    if (homing) {
      if (pos <= FIN_ABAJO_MM) { parar(); homing = false; registro.textContent = 'Listo: la cabina llegó abajo. Ya se puede llamar.'; }
      else motor(-120);
      return;
    }
    if (reloj < puertasHasta) return;
    sondearNodos();
    const p = leerPiso();
    if (p >= 0) pisoActual = p;
    if (paro) { parar(); return; }
    if (destino < 0) destino = elegirDestino();
    if (destino < 0) { parar(); return; }
    if (p === destino) {
      parar();
      llamada[destino] = false;
      atendidas.push(destino + 1); atendidas = atendidas.slice(-8);
      registro.textContent = `Llegó al piso ${destino + 1}. Puertas abiertas 2 s. Atendidas: ${atendidas.join(' → ')}`;
      puertasHasta = reloj + 2000; puertasPiso = destino;
      destino = -1;
      return;
    }
    const dir = destino > pisoActual ? 1 : -1;
    const topeArriba = pos >= FIN_ARRIBA_MM; const topeAbajo = pos <= FIN_ABAJO_MM;
    if ((dir > 0 && topeArriba) || (dir < 0 && topeAbajo)) { parar(); return; }
    if (vel < VEL_MAX) vel += 5;   // rampa
    motor(dir * vel);
  }

  function dibujar() {
    const y = yDe(pos);
    cabina.replaceChildren(svg('rect', { x: 86, y: y - 64, width: 74, height: 64, rx: 4, class: 'elev-cabina' }),
      svg('circle', { cx: 92, cy: y - 32, r: 3, class: 'elev-iman' }));
    const yContra = 50 + (360 - pos) * 0.55 * 0.6;
    contrapeso.setAttribute('y', yContra);
    hilo.replaceChildren(svg('line', { x1: 123, y1: 22, x2: 123, y2: y - 64, class: 'contra-hilo' }), svg('line', { x1: 205, y1: 22, x2: 205, y2: yContra, class: 'contra-hilo' }),
      svg('line', { x1: 123, y1: 8, x2: 205, y2: 8, class: 'contra-hilo' }));
    const abiertas = reloj < puertasHasta;
    puertas.replaceChildren(...(abiertas ? [svg('text', { x: 123, y: y - 26, class: 'elev-texto claro', 'text-anchor': 'middle' }, '⇤ ⇥')] : []));
    reeds.forEach((r, i) => r.classList.toggle('activo', Math.abs(pos - PISOS_MM[i]) <= VENTANA_REED));
    finAbajo.classList.toggle('activo', pos <= FIN_ABAJO_MM);
    finArriba.classList.toggle('activo', pos >= FIN_ARRIBA_MM);
    paneles.forEach((p) => { p.display.ponerDigito(0, nodos[p.i].piso); p.led.classList.toggle('encendido', nodos[p.i].encendido); });
    botonParo.textContent = paro ? '🟢 Soltar el paro de emergencia' : '🛑 Paro de emergencia';
    botonParo.classList.toggle('activo', paro);
    estado.textContent =
      `pisoActual = ${pisoActual + 1}   destino = ${destino < 0 ? '—' : destino + 1}\n` +
      `llamada[] = {${llamada.map((l) => (l ? 'sí' : 'no')).join(', ')}}\n` +
      `motor(${motorV})   ${homing ? '(setup: bajando al final de carrera)' : ''}`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(50, t - ultimo) : 0;
    ultimo = t; reloj += dt; acumulado += dt;
    while (acumulado >= 20) { acumulado -= 20; vuelta(); }
    pos += (motorV / 255) * V_MAX_MM * (dt / 1000);
    pos = limitar(pos, FIN_ABAJO_MM - 2, FIN_ARRIBA_MM + 2);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonParo.addEventListener('click', () => { paro = !paro; });
  registro.textContent = 'Encendiendo: la central baja la cabina hasta el final de carrera.';
  dibujar();
  requestAnimationFrame(cuadro);
}
