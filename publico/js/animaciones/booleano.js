// ============================================================
// Animación "booleano": como el modificador Booleana de Blender
// en modo Diferencia. Un cubo "cortador" se resta de la base y deja un hueco.
// El estudiante mueve y baja el cortador, y luego aplica la Diferencia.
//
// En la guía:
//   :::animacion tipo="booleano"
//   :::
// Opciones (todas opcionales):
//   base      nombre del objeto base       (por defecto "Base")
//   cortador  nombre del objeto cortador   (por defecto "Cubo.001")
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

// Medidas en "unidades de Blender"
const BASE = { x0: 0, x1: 6, y0: 0, y1: 4, z0: 0, z1: 2 };
const LADO = 2;            // lado del cubo cortador
const Y_CORTE = [1, 3];    // el cortador va centrado a lo ancho

// Proyección isométrica: punto 3D → punto en pantalla
const ESCALA = 34;
const ORIGEN = { x: 190, y: 120 };
function proyectar(x, y, z) {
  return {
    x: ORIGEN.x + (x - y) * Math.cos(Math.PI / 6) * ESCALA,
    y: ORIGEN.y + (x + y) * Math.sin(Math.PI / 6) * ESCALA - z * ESCALA,
  };
}
const poligono = (puntos) => puntos.map(([x, y, z]) => { const p = proyectar(x, y, z); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' ');

// Las tres caras visibles de una caja: arriba (+z), frente izquierdo (+y), frente derecho (+x)
function carasCaja({ x0, x1, y0, y1, z0, z1 }) {
  return {
    arriba: poligono([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]),
    izquierda: poligono([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]]),
    derecha: poligono([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]]),
    // caras ocultas (solo se dibujan en el cortador transparente)
    abajo: poligono([[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]]),
    atras: poligono([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]]),
    izquierdaAtras: poligono([[x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1]]),
  };
}

let contador = 0;

export default function montar(contenedor, config) {
  const nombreBase = config.base || 'Base';
  const nombreCortador = config.cortador || 'Cubo.001';
  const idRecorte = `recorte-booleano-${++contador}`;

  let posX = 2;        // posición del cortador a lo largo (0 a 4)
  let altura = 2.6;    // altura de la cara de abajo del cortador (2 = apenas toca)
  let aplicado = false;

  const raiz = svg('svg', { viewBox: '0 0 400 300', class: 'booleano-svg', role: 'img', 'aria-label': 'Base y cubo cortador en vista 3D' });
  const defs = svg('defs');
  const recorte = svg('clipPath', { id: idRecorte });
  const formaRecorte = svg('polygon');
  recorte.append(formaRecorte);
  defs.append(recorte);
  raiz.append(defs);
  // Rejilla del piso como en Blender
  const piso = svg('g', { class: 'booleano-piso' });
  for (let i = -2; i <= 8; i++) {
    const a = proyectar(i, -2, 0); const b = proyectar(i, 6, 0);
    const c = proyectar(-2, i - 2, 0); const d = proyectar(8, i - 2, 0);
    piso.append(svg('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y }), svg('line', { x1: c.x, y1: c.y, x2: d.x, y2: d.y }));
  }
  const capa = svg('g');
  raiz.append(piso, capa);

  // ---------- Controles ----------
  const deslizadorX = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 4, step: 0.1, value: posX });
  const deslizadorZ = el('input', { type: 'range', class: 'anim-deslizador', min: -0.5, max: 3, step: 0.1, value: altura });
  const mensaje = el('p', { class: 'anim-estado' });
  const botonAplicar = el('button', { type: 'button', class: 'boton boton-chico' });
  const panel = el('div', { class: 'booleano-panel' },
    el('div', { class: 'booleano-panel-titulo' }, '🔧 Modificador: Booleana'),
    el('div', { class: 'booleano-fila' }, el('span', {}, 'Operación'), el('strong', {}, 'Diferencia')),
    el('div', { class: 'booleano-fila' }, el('span', {}, 'Objeto'), el('strong', {}, nombreCortador)),
  );
  const controles = el('div', { class: 'anim-controles' },
    panel,
    el('label', { class: 'anim-etiqueta' }, `Mover ${nombreCortador} (eje X)`, deslizadorX),
    el('label', { class: 'anim-etiqueta' }, `Subir / bajar ${nombreCortador} (eje Z)`, deslizadorZ),
    el('div', { class: 'anim-rapidos' }, botonAplicar),
    mensaje,
  );
  contenedor.append(el('div', { class: 'anim-servo' }, el('div', { class: 'anim-dibujo' }, raiz), controles));

  deslizadorX.addEventListener('input', () => { posX = Number(deslizadorX.value); dibujar(); });
  deslizadorZ.addEventListener('input', () => { altura = Number(deslizadorZ.value); dibujar(); });
  botonAplicar.addEventListener('click', () => { aplicado = !aplicado; dibujar(); });

  // ---------- Dibujo ----------
  function dibujar() {
    const profundidad = Math.max(0, Math.min(BASE.z1, BASE.z1 - altura)); // cuánto entra en la base
    const atraviesa = altura <= BASE.z0;
    const corte = { x0: posX, x1: posX + LADO, y0: Y_CORTE[0], y1: Y_CORTE[1], z0: altura, z1: altura + LADO };
    capa.replaceChildren();

    // Base
    const base = carasCaja(BASE);
    capa.append(
      svg('polygon', { points: base.izquierda, class: 'cara cara-izq' }),
      svg('polygon', { points: base.derecha, class: 'cara cara-der' }),
      svg('polygon', { points: base.arriba, class: 'cara cara-arriba' }),
    );

    if (aplicado && profundidad > 0) {
      // Hueco: se dibuja el interior recortado con la forma de la abertura
      const fondo = BASE.z1 - profundidad;
      formaRecorte.setAttribute('points', poligono([[corte.x0, corte.y0, BASE.z1], [corte.x1, corte.y0, BASE.z1], [corte.x1, corte.y1, BASE.z1], [corte.x0, corte.y1, BASE.z1]]));
      const hueco = svg('g', { 'clip-path': `url(#${idRecorte})` });
      hueco.append(svg('polygon', {
        points: poligono([[corte.x0, corte.y0, BASE.z1], [corte.x1, corte.y0, BASE.z1], [corte.x1, corte.y1, BASE.z1], [corte.x0, corte.y1, BASE.z1]]),
        class: atraviesa ? 'hueco-pasante' : 'cara cara-sombra',
      }));
      // Paredes del hueco que se alcanzan a ver (la del fondo y la de la izquierda)
      hueco.append(
        svg('polygon', { points: poligono([[corte.x0, corte.y0, fondo], [corte.x0, corte.y1, fondo], [corte.x0, corte.y1, BASE.z1], [corte.x0, corte.y0, BASE.z1]]), class: 'cara hueco-pared-a' }),
        svg('polygon', { points: poligono([[corte.x0, corte.y0, fondo], [corte.x1, corte.y0, fondo], [corte.x1, corte.y0, BASE.z1], [corte.x0, corte.y0, BASE.z1]]), class: 'cara hueco-pared-b' }),
      );
      // El fondo va al final: está más cerca de quien mira que las paredes
      if (!atraviesa) {
        hueco.append(svg('polygon', { points: poligono([[corte.x0, corte.y0, fondo], [corte.x1, corte.y0, fondo], [corte.x1, corte.y1, fondo], [corte.x0, corte.y1, fondo]]), class: 'cara hueco-fondo' }));
      }
      capa.append(hueco);
    }

    if (!aplicado) {
      // Cortador semitransparente, con todas sus aristas
      const c = carasCaja(corte);
      for (const cara of ['abajo', 'atras', 'izquierdaAtras', 'izquierda', 'derecha', 'arriba']) {
        capa.append(svg('polygon', { points: c[cara], class: 'cortador' }));
      }
      const etiqueta = proyectar(corte.x1, corte.y0, corte.z1);
      capa.append(svg('text', { x: etiqueta.x + 6, y: etiqueta.y - 4, class: 'booleano-texto' }, nombreCortador));
    }
    const etiquetaBase = proyectar(BASE.x0, BASE.y1, BASE.z0);
    capa.append(svg('text', { x: etiquetaBase.x - 4, y: etiquetaBase.y + 18, class: 'booleano-texto', 'text-anchor': 'end' }, nombreBase));

    // Textos
    deslizadorX.disabled = aplicado;
    deslizadorZ.disabled = aplicado;
    botonAplicar.textContent = aplicado ? '↶ Deshacer (Ctrl + Z)' : 'Aplicar Diferencia';
    if (profundidad === 0) {
      mensaje.textContent = `${nombreCortador} no toca la base: la Diferencia no restará nada.`;
    } else if (aplicado) {
      mensaje.textContent = atraviesa
        ? `Se restó ${nombreCortador}: el hueco atraviesa toda la base.`
        : `Se restó ${nombreCortador}: quedó un hueco de ${profundidad.toFixed(1)} de profundidad.`;
    } else {
      mensaje.textContent = atraviesa
        ? `${nombreCortador} atraviesa toda la base.`
        : `${nombreCortador} entra ${profundidad.toFixed(1)} en la base. Ahora aplica la Diferencia.`;
    }
  }

  dibujar();
}
