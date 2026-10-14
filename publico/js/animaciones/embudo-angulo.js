// ============================================================
// Animación "embudo-angulo": ¿qué inclinación deja caer la comida?
// Corte de un embudo con el ángulo de la pared ajustable (medido desde
// la horizontal, como con un transportador). Las croquetas que tocan la pared
// resbalan si la pared es más empinada que el "ángulo de roce"; si no, se atascan.
// Lijar el embudo baja el roce.
//
// En la guía:
//   :::animacion tipo="embudo-angulo"
//   :::
// Opciones (todas opcionales): angulo (62, el del embudo de la guía 3) · croquetas (18)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const CX = 210; const Y_SALIDA = 250; const MEDIA_SALIDA = 16; const LARGO = 190;
const ROCE = { rugosa: 38, lisa: 30 }; // ángulo a partir del cual una croqueta resbala

export default function montar(contenedor, config) {
  let angulo = limitar(numero(config.angulo, 62), 15, 85);
  const cantidad = limitar(Math.round(numero(config.croquetas, 18)), 4, 40);
  let superficie = 'rugosa';
  let croquetas = [];
  let ultimo = 0;

  const raiz = svg('svg', { viewBox: '0 0 420 300', class: 'embudo-svg', role: 'img', 'aria-label': 'Corte de un embudo con croquetas' });
  const paredes = svg('path', { class: 'embudo-pared' });
  const arco = svg('path', { class: 'embudo-arco' });
  const textoAngulo = svg('text', { class: 'embudo-texto' });
  const capa = svg('g', {});
  raiz.append(paredes, arco, textoAngulo, capa,
    svg('path', { d: `M 160 ${Y_SALIDA + 40} L 260 ${Y_SALIDA + 40} L 250 ${Y_SALIDA + 48} L 170 ${Y_SALIDA + 48} Z`, class: 'disp-plato' }));

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 15, max: 85, step: 1, value: angulo, 'aria-label': 'Ángulo de la pared' });
  const valor = el('strong');
  const botonesSup = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Superficie del embudo' },
    [['rugosa', 'Sin lijar'], ['lisa', 'Lijado']].map(([k, t]) => el('button', { type: 'button', class: 'anim-boton', 'data-sup': k, onclick: () => { superficie = k; marcar(); } }, t)));
  const botonEchar = el('button', { type: 'button', class: 'boton boton-chico' }, '🥣 Echar croquetas');
  const resultado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-embudo' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Ángulo de la pared: ', valor, deslizador),
      el('p', { class: 'anim-etiqueta' }, 'Superficie'), botonesSup,
      el('div', { class: 'anim-rapidos' }, botonEchar),
      resultado)));

  // Geometría de la pared izquierda (la derecha es su espejo)
  const geo = () => {
    const rad = (angulo * Math.PI) / 180;
    return { rad, abajoX: CX - MEDIA_SALIDA, arribaX: CX - MEDIA_SALIDA - LARGO * Math.cos(rad), arribaY: Y_SALIDA - LARGO * Math.sin(rad) };
  };
  // Altura de la pared en una x (por la izquierda o por la derecha)
  const yPared = (x) => {
    const { rad } = geo();
    const dx = Math.abs(x - CX) - MEDIA_SALIDA;
    return dx <= 0 ? Infinity : Y_SALIDA - dx * Math.tan(rad);
  };

  function marcar() {
    botonesSup.querySelectorAll('button').forEach((b) => { const a = b.dataset.sup === superficie; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
  }

  function echar() {
    const { arribaX } = geo();
    const ancho = Math.min(150, CX - arribaX - 10);
    croquetas = Array.from({ length: cantidad }, (_, i) => ({
      x: CX + (Math.random() * 2 - 1) * ancho, y: -10 - i * 14, vx: 0, vy: 0, estado: 'cae',
    }));
  }

  function simular(dt) {
    const s = dt / 16;
    const { rad } = geo();
    const resbala = angulo > ROCE[superficie];
    for (const c of croquetas) {
      if (c.estado === 'atascada' || c.estado === 'afuera') continue;
      if (c.estado === 'cae') {
        c.vy = Math.min(c.vy + 0.35 * s, 7);
        c.y += c.vy * s;
        if (c.y + 5 >= yPared(c.x)) {
          c.y = yPared(c.x) - 5;
          c.estado = resbala ? 'resbala' : 'atascada';
          c.v = 0;
        }
        if (c.y > Y_SALIDA + 34) c.estado = 'afuera';
      } else if (c.estado === 'resbala') {
        // Baja por la pared hacia la salida, cada vez más rápido
        c.v = Math.min((c.v || 0) + 0.25 * s * Math.sin(rad), 6);
        const lado = c.x < CX ? 1 : -1;
        c.x += lado * c.v * Math.cos(rad) * s;
        c.y = Math.min(yPared(c.x), Y_SALIDA) - 5;
        if (Math.abs(c.x - CX) <= MEDIA_SALIDA) { c.estado = 'cae'; c.vy = c.v; }
      }
    }
  }

  function dibujar() {
    const { abajoX, arribaX, arribaY, rad } = geo();
    const derArriba = 2 * CX - arribaX; const derAbajo = 2 * CX - abajoX;
    paredes.setAttribute('d', `M ${arribaX} ${arribaY} L ${abajoX} ${Y_SALIDA} M ${derAbajo} ${Y_SALIDA} L ${derArriba} ${arribaY}`);
    // Arco del ángulo (en la base de la pared derecha, contra la horizontal)
    const r = 34;
    arco.setAttribute('d', `M ${derAbajo + r} ${Y_SALIDA} A ${r} ${r} 0 0 0 ${derAbajo + r * Math.cos(rad)} ${Y_SALIDA - r * Math.sin(rad)}`);
    textoAngulo.setAttribute('x', derAbajo + r + 8); textoAngulo.setAttribute('y', Y_SALIDA - 6);
    textoAngulo.textContent = `${angulo}°`;
    capa.replaceChildren(
      svg('line', { x1: derAbajo, x2: derAbajo + r + 30, y1: Y_SALIDA, y2: Y_SALIDA, class: 'embudo-horizontal' }),
      ...croquetas.filter((c) => c.estado !== 'afuera' || c.y < 300).map((c) => svg('circle', { cx: c.x, cy: Math.min(c.y, Y_SALIDA + 34), r: 5, class: `disp-croqueta${c.estado === 'atascada' ? ' atascada' : ''}` })));
    valor.textContent = `${angulo}°`;
    if (croquetas.length) {
      const cayeron = croquetas.filter((c) => c.estado === 'afuera').length;
      const atascadas = croquetas.filter((c) => c.estado === 'atascada').length;
      resultado.className = `anim-estado ${atascadas ? 'alerta' : 'ok'}`;
      resultado.textContent = `Cayeron ${cayeron} de ${croquetas.length} · atascadas: ${atascadas}`;
    } else {
      resultado.className = 'anim-estado';
      resultado.textContent = 'Elige un ángulo y echa croquetas.';
    }
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(50, t - ultimo) : 0;
    ultimo = t;
    simular(dt);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  deslizador.addEventListener('input', () => { angulo = Number(deslizador.value); croquetas = []; dibujar(); });
  botonEchar.addEventListener('click', echar);
  marcar();
  dibujar();
  requestAnimationFrame(cuadro);
}
