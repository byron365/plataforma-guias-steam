// ============================================================
// Animación "antirrebote": por qué un gol puede contarse varias veces.
// Cuando la pelota entra, rebota y se queda frente al sensor: la señal pasa
// varias veces a LOW. La línea de tiempo muestra la señal del sensor, los goles
// que cuenta el marcador, el tiempo que gol() está ocupado (sus delay) y la
// pausa PAUSA_GOL después de cada gol:
//   bool listo = millis() - ultimoGol > PAUSA_GOL;
// Los números de millis() son de esta simulación (no los de la pregunta de la guía).
//
// En la guía:
//   :::animacion tipo="antirrebote"
//   :::
// Opciones (todas opcionales): pausa (1500 ms al empezar)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const VENTANA = 8000;          // ms visibles en la línea de tiempo
const DELAY_GOL = 1200;        // gol() tiene delay(200) + delay(1000)
const X0 = 20; const X1 = 600;
const Y_ALTO = 40; const Y_BAJO = 80;

export default function montar(contenedor, config) {
  let pausa = limitar(Math.round(numero(config.pausa, 1500) / 100) * 100, 0, 5000);
  let t = 9000;                // millis() de la simulación (empieza con el Arduino ya encendido)
  let bajos = [];              // intervalos [inicio, fin] en que el sensor da LOW
  let goles = [];              // momentos en que el marcador contó gol
  let ultimoGol = -1e9; let ocupadoHasta = 0;
  let reales = 0; let ultimo = 0; let acumulado = 0;

  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 620 170', class: 'anti-svg', role: 'img', 'aria-label': 'Línea de tiempo: señal del sensor y goles contados' },
    svg('text', { x: X0, y: Y_ALTO - 8, class: 'grafica-numero' }, 'HIGH'),
    svg('text', { x: X0, y: Y_BAJO + 16, class: 'grafica-numero' }, 'LOW = pelota frente al sensor'),
    capa);
  const leyenda = el('p', { class: 'suave-leyenda' },
    el('span', { class: 'anti-muestra ocupado' }), ' gol() ocupado (delay)  ',
    el('span', { class: 'anti-muestra pausa' }), ' PAUSA_GOL  ',
    el('span', { class: 'anti-muestra gol' }), ' gol contado');

  const rPausa = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 5000, step: 100, value: pausa, 'aria-label': 'PAUSA_GOL en milisegundos' });
  const vPausa = el('strong');
  const botonGol = el('button', { type: 'button', class: 'boton boton-chico' }, '⚽ Meter un gol');
  const botonBorrar = el('button', { type: 'button', class: 'anim-boton' }, 'Borrar la cuenta');
  const cuenta = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  const codigo = el('pre', { class: 'joystick-codigo' });

  contenedor.append(el('div', { class: 'anim-antirrebote' },
    raiz, leyenda,
    el('div', { class: 'anti-panel' },
      el('div', {},
        el('label', { class: 'anim-etiqueta' }, 'PAUSA_GOL = ', vPausa, rPausa),
        el('div', { class: 'anim-rapidos' }, botonGol, botonBorrar), cuenta),
      codigo)));

  const bajo = (ms) => bajos.some(([a, b]) => ms >= a && ms < b);
  const xDe = (ms) => X1 - ((t - ms) / VENTANA) * (X1 - X0);

  // La pelota entra, rebota y se queda un rato frente al sensor
  function meterGol() {
    reales++;
    let m = t + 50;
    const tramos = [[180, 160], [120 + Math.random() * 200, 220], [250, 300 + Math.random() * 400], [900 + Math.random() * 900, 0]];
    for (const [dur, hueco] of tramos) { bajos.push([m, m + dur]); m += dur + hueco; }
  }

  // Una vuelta del loop (cada 10 ms)
  function vuelta() {
    if (t < ocupadoHasta) return;             // dentro de gol() no se revisan los sensores
    const listo = t - ultimoGol > pausa;
    if (listo && bajo(t)) {
      ultimoGol = t; ocupadoHasta = t + DELAY_GOL;
      goles.push(t);
    }
  }

  function dibujar() {
    const desde = t - VENTANA;
    // Señal del sensor como escalones
    const pasos = [];
    let estadoBajo = bajo(desde);
    pasos.push(`M ${X0} ${estadoBajo ? Y_BAJO : Y_ALTO}`);
    const cambios = bajos.flat().filter((ms) => ms > desde && ms <= t).sort((a, b) => a - b);
    for (const ms of cambios) {
      const x = xDe(ms);
      pasos.push(`L ${x} ${estadoBajo ? Y_BAJO : Y_ALTO}`);
      estadoBajo = bajo(ms);
      pasos.push(`L ${x} ${estadoBajo ? Y_BAJO : Y_ALTO}`);
    }
    pasos.push(`L ${X1} ${estadoBajo ? Y_BAJO : Y_ALTO}`);
    const marcas = [];
    for (const g of goles.filter((ms) => ms > desde - 5000)) {
      const xa = Math.max(X0, xDe(g));
      marcas.push(svg('rect', { x: xa, y: Y_ALTO - 14, width: Math.max(0, Math.min(X1, xDe(g + pausa)) - xa), height: 8, class: 'anti-pausa' }));
      marcas.push(svg('rect', { x: xa, y: Y_ALTO - 4, width: Math.max(0, Math.min(X1, xDe(g + DELAY_GOL)) - xa), height: Y_BAJO - Y_ALTO + 8, class: 'anti-ocupado' }));
      if (g > desde) marcas.push(svg('line', { x1: xDe(g), x2: xDe(g), y1: Y_ALTO - 20, y2: Y_BAJO + 22, class: 'anti-gol' }), svg('text', { x: xDe(g), y: Y_BAJO + 38, class: 'anti-texto', 'text-anchor': 'middle' }, '⚽ +1'));
    }
    // Marcas de tiempo cada segundo
    const reloj = [];
    for (let s = Math.ceil(desde / 1000) * 1000; s <= t; s += 1000) reloj.push(svg('line', { x1: xDe(s), x2: xDe(s), y1: 150, y2: 156, class: 'grafica-base' }), svg('text', { x: xDe(s), y: 168, class: 'grafica-numero', 'text-anchor': 'middle' }, `${s / 1000} s`));
    capa.replaceChildren(...marcas, svg('path', { d: pasos.join(' '), class: 'anti-senal' }), ...reloj);
    vPausa.textContent = `${pausa} ms`;
    cuenta.textContent = `Goles reales: ${reales} · Goles en el marcador: ${goles.length}`;
    const dif = t - ultimoGol;
    codigo.textContent =
      `millis()  = ${Math.round(t)}\n` +
      `ultimoGol = ${ultimoGol < 0 ? 0 : Math.round(ultimoGol)}\n` +
      `listo = ${ultimoGol < 0 ? Math.round(t) : Math.round(dif)} > ${pausa}  → ${dif > pausa}` +
      (t < ocupadoHasta ? '\n(gol() está en su delay: no revisa los sensores)' : '');
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo; acumulado += dt;
    while (acumulado >= 10) { acumulado -= 10; t += 10; vuelta(); }
    bajos = bajos.filter(([, b]) => b > t - VENTANA - 6000);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonGol.addEventListener('click', meterGol);
  botonBorrar.addEventListener('click', () => { reales = 0; goles = []; dibujar(); });
  rPausa.addEventListener('input', () => { pausa = Number(rPausa.value); dibujar(); });
  dibujar();
  requestAnimationFrame(cuadro);
}
