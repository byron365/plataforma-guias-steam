// ============================================================
// Animación "coordenadas-3d": ubicar piezas con coordenadas X, Y como en Blender
// (vista desde arriba: X roja hacia la derecha, Y verde hacia arriba, Z sale de la pantalla).
//
// modo="columnas" (estación, guía 2): las columnas a 40 mm del centro.
//   Se gira el ángulo y se ve la columna, su sombra sobre X y sobre Y y la fórmula
//   X = 40 × cos(ángulo), Y = 40 × sin(ángulo). Solo da el resultado en 0°, 90°, 180°
//   y 270°: los de la tabla (120° y 240°) los calcula el equipo.
// modo="tablero" (laberinto, guía 2): casillas de 25 mm con el (0, 0) en el centro.
//   Al tocar una casilla dice cuántas casillas está del centro, sin dar los mm
//   que pide la tabla (solo los que la guía ya trae).
//
// En la guía:
//   :::animacion tipo="coordenadas-3d" modo="columnas"
//   :::
// Opciones: modo ("columnas" o "tablero") · radio (40 mm, modo columnas) · casilla (25 mm, modo tablero)
// ============================================================
import { svg, numero, limitar, puntoTransportador } from './comun/svg.js';
import { el } from '../comun.js';

const C = 170;           // centro del dibujo (px)
const ANCHO = 340;

// Ejes de Blender y la cuadrícula; "mm" es cuántos px mide un milímetro
function ejes(mm, paso, limite) {
  const g = svg('g', {});
  for (let v = -limite; v <= limite; v += paso) {
    g.append(svg('line', { x1: C + v * mm, x2: C + v * mm, y1: C - limite * mm, y2: C + limite * mm, class: 'coord-reja' }));
    g.append(svg('line', { y1: C + v * mm, y2: C + v * mm, x1: C - limite * mm, x2: C + limite * mm, class: 'coord-reja' }));
  }
  g.append(
    svg('line', { x1: 8, x2: ANCHO - 8, y1: C, y2: C, class: 'coord-eje-x' }),
    svg('line', { y1: 8, y2: ANCHO - 8, x1: C, x2: C, class: 'coord-eje-y' }),
    svg('text', { x: ANCHO - 12, y: C - 8, class: 'coord-nombre-x', 'text-anchor': 'end' }, 'X'),
    svg('text', { x: C + 8, y: 20, class: 'coord-nombre-y' }, 'Y'),
    svg('circle', { cx: C, cy: C, r: 4, class: 'coord-origen' }),
    svg('text', { x: C - 6, y: C + 16, class: 'coord-texto', 'text-anchor': 'end' }, '(0, 0)'),
    // Z sale de la pantalla (vista superior)
    svg('circle', { cx: 28, cy: ANCHO - 28, r: 9, class: 'coord-z' }), svg('circle', { cx: 28, cy: ANCHO - 28, r: 2.5, class: 'coord-z-punto' }),
    svg('text', { x: 42, y: ANCHO - 24, class: 'coord-texto' }, 'Z sale hacia ti'));
  return g;
}

const coma = (n) => String(Math.round(n * 10) / 10).replace('.', ',');

// ---------- Modo columnas (polar) ----------
function montarColumnas(contenedor, config) {
  const R = limitar(numero(config.radio, 40), 5, 60);
  const mm = 2.4;
  let angulo = 0;

  const columna = svg('g', {});
  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} ${ANCHO}`, class: 'coord-svg', role: 'img', 'aria-label': `Plato visto desde arriba con una columna a ${R} mm del centro` },
    ejes(mm, 10, 60),
    svg('circle', { cx: C, cy: C, r: 50 * mm, class: 'coord-plato' }),
    svg('circle', { cx: C, cy: C, r: 25 * mm, class: 'coord-hueco' }),
    svg('circle', { cx: C, cy: C, r: R * mm, class: 'coord-radio' }),
    // La columna 1 (dato de la guía) siempre se ve
    svg('circle', { cx: C + R * mm, cy: C, r: 3 * mm, class: 'coord-columna fija' }),
    svg('text', { x: C + R * mm + 10, y: C + 20, class: 'coord-texto' }, '1'),
    columna);

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 355, step: 5, value: 0, 'aria-label': 'Ángulo de la columna' });
  const visor = el('strong');
  const rapidos = el('div', { class: 'anim-rapidos' }, [0, 120, 240].map((a) =>
    el('button', { type: 'button', class: 'anim-boton', onclick: () => { angulo = a; deslizador.value = a; actualizar(); } }, `${a}°`)));
  const formula = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-coord' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Ángulo: ', visor, deslizador),
      rapidos, formula,
      el('p', { class: 'texto-ayuda' }, 'Cuadritos de 10 mm. El ángulo se mide desde el eje X, girando hacia el eje Y (como en un transportador).'))));

  function actualizar() {
    const p = puntoTransportador(C, C, R * mm, angulo);
    const arco = puntoTransportador(C, C, 18, angulo);
    const exacto = angulo % 90 === 0;
    const x = R * Math.cos((angulo * Math.PI) / 180); const y = R * Math.sin((angulo * Math.PI) / 180);
    columna.replaceChildren(
      svg('line', { x1: C, y1: C, x2: p.x, y2: p.y, class: 'coord-brazo' }),
      svg('path', { d: `M ${C + 18} ${C} A 18 18 0 ${angulo > 180 ? 1 : 0} 0 ${arco.x} ${arco.y}`, class: 'coord-arco' }),
      svg('line', { x1: p.x, y1: p.y, x2: p.x, y2: C, class: 'coord-sombra-x' }),
      svg('line', { x1: p.x, y1: p.y, x2: C, y2: p.y, class: 'coord-sombra-y' }),
      svg('line', { x1: C, y1: C, x2: p.x, y2: C, class: 'coord-medida-x' }),
      svg('line', { x1: C, y1: C, x2: C, y2: p.y, class: 'coord-medida-y' }),
      svg('circle', { cx: p.x, cy: p.y, r: 3 * mm, class: 'coord-columna' }));
    visor.textContent = `${angulo}°`;
    const signo = (v, pos, neg) => (Math.abs(v) < 1e-9 ? 'justo sobre el eje' : v > 0 ? pos : neg);
    formula.textContent =
      `X = ${R} × cos(${angulo}°)` + (exacto ? ` = ${coma(x)} mm` : '  → calcúlenlo') + `\n    (${signo(x, 'a la derecha del centro: positivo', 'a la izquierda del centro: negativo')})\n` +
      `Y = ${R} × sin(${angulo}°)` + (exacto ? ` = ${coma(y)} mm` : '  → calcúlenlo') + `\n    (${signo(y, 'arriba del centro: positivo', 'abajo del centro: negativo')})`;
  }
  deslizador.addEventListener('input', () => { angulo = Number(deslizador.value); actualizar(); });
  actualizar();
}

// ---------- Modo tablero (casillas) ----------
const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
// Valores que la guía 2 del laberinto ya trae escritos
const X_CONOCIDAS = { A: -75, B: -50, D: 0, G: 75 };
const Y_CONOCIDAS = { 1: -75, 7: 75 };

function montarTablero(contenedor, config) {
  const casilla = limitar(numero(config.casilla, 25), 5, 50);
  const mm = 1.7;
  const lado = casilla * mm;
  let elegida = null;

  const celdas = svg('g', {});
  const etiquetas = svg('g', {});
  const marca = svg('g', {});
  LETRAS.forEach((letra, c) => {
    for (let f = 1; f <= 7; f++) {
      const x = C + (c - 3) * lado - lado / 2; const y = C - (f - 4) * lado - lado / 2;
      const r = svg('rect', { x, y, width: lado, height: lado, class: 'coord-casilla', tabindex: '0', role: 'button', 'aria-label': `Casilla ${letra}${f}` });
      const elegir = () => { elegida = { letra, c, f }; actualizar(); };
      r.addEventListener('click', elegir);
      r.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); elegir(); } });
      celdas.append(r);
    }
    etiquetas.append(svg('text', { x: C + (c - 3) * lado, y: C + 3.5 * lado + 16, class: 'coord-texto', 'text-anchor': 'middle' }, letra));
  });
  for (let f = 1; f <= 7; f++) etiquetas.append(svg('text', { x: C - 3.5 * lado - 10, y: C - (f - 4) * lado + 4, class: 'coord-texto', 'text-anchor': 'end' }, String(f)));

  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} ${ANCHO}`, class: 'coord-svg', role: 'img', 'aria-label': 'Tablero de 7 × 7 casillas con el (0, 0) en el centro' },
    svg('rect', { x: C - 90 * mm, y: C - 90 * mm, width: 180 * mm, height: 180 * mm, class: 'coord-plato' }),
    celdas, ejes(mm, 1000, 0), etiquetas, marca);
  const texto = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  const regla = el('table', { class: 'calib-tabla' },
    el('tr', {}, el('th', {}, 'Columna'), ...LETRAS.map((l) => el('th', {}, l))),
    el('tr', {}, el('th', {}, 'X (mm)'), ...LETRAS.map((l) => el('td', {}, l in X_CONOCIDAS ? String(X_CONOCIDAS[l]).replace('-', '−') : '?'))));
  contenedor.append(el('div', { class: 'anim-coord' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('p', { class: 'anim-etiqueta' }, 'Toca una casilla'), texto,
      el('div', { class: 'tabla-scroll' }, regla),
      el('p', { class: 'texto-ayuda' }, `Cada casilla mide ${casilla} mm. Las filas funcionan igual en el eje Y: fila 1 = −75, fila 7 = 75.`))));

  function actualizar() {
    if (!elegida) { texto.textContent = 'El centro del tablero (0, 0) es la casilla D4.'; return; }
    const dc = elegida.c - 3; const df = elegida.f - 4;
    const cx = C + dc * lado; const cy = C - df * lado;
    marca.replaceChildren(
      svg('line', { x1: C, y1: C, x2: cx, y2: C, class: 'coord-medida-x' }),
      svg('line', { x1: cx, y1: C, x2: cx, y2: cy, class: 'coord-medida-y' }),
      svg('circle', { cx, cy, r: 7, class: 'coord-columna' }));
    const pasos = (n, pos, neg) => (n === 0 ? 'en el centro' : `${Math.abs(n)} casilla${Math.abs(n) > 1 ? 's' : ''} ${n > 0 ? pos : neg}`);
    const conocidaX = X_CONOCIDAS[elegida.letra]; const conocidaY = Y_CONOCIDAS[elegida.f];
    texto.textContent =
      `Casilla ${elegida.letra}${elegida.f}\n` +
      `X: ${pasos(dc, 'a la derecha', 'a la izquierda')} → ${conocidaX !== undefined ? `${conocidaX} mm` : '¿cuántos mm?'}\n` +
      `Y: ${pasos(df, 'arriba', 'abajo')} → ${conocidaY !== undefined ? `${conocidaY} mm` : '¿cuántos mm?'}`;
  }
  actualizar();
}

export default function montar(contenedor, config) {
  if (config.modo === 'tablero') montarTablero(contenedor, config);
  else montarColumnas(contenedor, config);
}
