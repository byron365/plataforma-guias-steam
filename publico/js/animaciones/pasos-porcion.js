// ============================================================
// Animación "pasos-porcion": servir de una sola vez contra servir en pasos.
// Dos líneas de tiempo con la compuerta abierta (barra de color) y cerrada,
// y la cuenta de servirEnPasos(): pasos = (gramos × MS_POR_GRAMO) / 200,
// con división entera como en Arduino. No inventa resultados en gramos:
// eso lo miden con la báscula.
//
// En la guía:
//   :::animacion tipo="pasos-porcion"
//   :::
// Opciones (todas opcionales): gramos (50) · msporgramo (20) · paso (200 ms abierta) · pausa (150 ms cerrada)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const X0 = 140; const X1 = 600;

export default function montar(contenedor, config) {
  let gramos = limitar(Math.round(numero(config.gramos, 50)), 5, 300);
  let msPorGramo = limitar(Math.round(numero(config.msporgramo, 20)), 1, 200);
  const PASO = limitar(numero(config.paso, 200), 50, 2000);
  const PAUSA = limitar(numero(config.pausa, 150), 0, 2000);
  let reproduciendo = false;
  let t = 0; let ultimo = 0;

  const raiz = svg('svg', { viewBox: '0 0 620 190', class: 'pasos-svg', role: 'img', 'aria-label': 'Líneas de tiempo de las dos formas de servir' });
  const capa = svg('g', {});
  const cursor = svg('line', { y1: 24, y2: 160, class: 'temp-aguja' });
  raiz.append(capa, cursor);

  const entradaG = el('input', { type: 'number', min: 5, max: 300, step: 5, value: gramos, class: 'temp-entrada', 'aria-label': 'Gramos' });
  const entradaM = el('input', { type: 'number', min: 1, max: 200, step: 1, value: msPorGramo, class: 'temp-entrada', 'aria-label': 'MS_POR_GRAMO' });
  const cuentas = el('pre', { class: 'joystick-codigo' });
  const botonPlay = el('button', { type: 'button', class: 'boton boton-chico' });
  contenedor.append(el('div', { class: 'anim-pasos' },
    el('div', { class: 'temp-ajustes' },
      el('label', { class: 'anim-etiqueta' }, 'gramos = ', entradaG),
      el('label', { class: 'anim-etiqueta' }, 'MS_POR_GRAMO = ', entradaM)),
    cuentas, raiz,
    el('div', { class: 'anim-rapidos' }, botonPlay)));

  // Tramos { desde, hasta, abierta } de cada método
  function tramos() {
    const unaVez = [{ desde: 0, hasta: gramos * msPorGramo, abierta: true }];
    const pasos = Math.trunc((gramos * msPorGramo) / PASO); // división entera (int en Arduino)
    const enPasos = [];
    let inicio = 0;
    for (let i = 0; i < pasos; i++) {
      enPasos.push({ desde: inicio, hasta: inicio + PASO, abierta: true });
      enPasos.push({ desde: inicio + PASO, hasta: inicio + PASO + PAUSA, abierta: false });
      inicio += PASO + PAUSA;
    }
    return { unaVez, enPasos, pasos };
  }

  function dibujar() {
    const { unaVez, enPasos, pasos } = tramos();
    const total = Math.max(gramos * msPorGramo, pasos * (PASO + PAUSA), 1);
    const xDe = (ms) => X0 + (ms / total) * (X1 - X0);
    const fila = (titulo, lista, y) => [
      svg('text', { x: 8, y: y + 20, class: 'pasos-titulo' }, titulo),
      svg('rect', { x: X0, y, width: X1 - X0, height: 30, rx: 6, class: 'pasos-fondo' }),
      ...lista.filter((tr) => tr.abierta).map((tr) => svg('rect', { x: xDe(tr.desde), y, width: Math.max(1.5, xDe(tr.hasta) - xDe(tr.desde)), height: 30, rx: 4, class: 'pasos-abierta' })),
    ];
    capa.replaceChildren(
      ...fila('Una sola apertura', unaVez, 30),
      ...fila('En pasos', enPasos, 100),
      svg('text', { x: X0, y: 180, class: 'grafica-numero' }, '0 ms'),
      svg('text', { x: X1, y: 180, class: 'grafica-numero', 'text-anchor': 'end' }, `${Math.round(total)} ms`),
      svg('text', { x: (X0 + X1) / 2, y: 180, class: 'grafica-numero', 'text-anchor': 'middle' }, 'color = compuerta abierta'));
    cursor.setAttribute('x1', xDe(Math.min(t, total))); cursor.setAttribute('x2', xDe(Math.min(t, total)));
    cursor.style.display = reproduciendo || t > 0 ? '' : 'none';
    const exacto = (gramos * msPorGramo) / PASO;
    cuentas.textContent =
      `Una sola apertura: delay(${gramos} × ${msPorGramo}) = ${gramos * msPorGramo} ms abierta\n` +
      `En pasos: pasos = (${gramos} × ${msPorGramo}) / ${PASO} = ${pasos}` + (Number.isInteger(exacto) ? '' : `   (${exacto.toFixed(2).replace('.', ',')} → se queda en ${pasos}: es un int)`) + '\n' +
      `          ${pasos} × ${PASO} ms abierta = ${pasos * PASO} ms abierta en total`;
    botonPlay.textContent = reproduciendo ? '⏸ Pausa' : (t > 0 ? '↺ Repetir' : '▶ Ver las dos a la vez');
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo;
    if (reproduciendo) {
      t += dt;
      const { pasos } = tramos();
      if (t > Math.max(gramos * msPorGramo, pasos * (PASO + PAUSA))) reproduciendo = false;
      dibujar();
    }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonPlay.addEventListener('click', () => {
    if (!reproduciendo && t > 0) t = 0;
    reproduciendo = !reproduciendo;
    dibujar();
  });
  const cambiar = () => {
    gramos = limitar(Math.round(Number(entradaG.value) || 5), 5, 300); entradaG.value = gramos;
    msPorGramo = limitar(Math.round(Number(entradaM.value) || 1), 1, 200); entradaM.value = msPorGramo;
    t = 0; reproduciendo = false; dibujar();
  };
  entradaG.addEventListener('change', cambiar);
  entradaM.addEventListener('change', cambiar);
  dibujar();
  requestAnimationFrame(cuadro);
}
