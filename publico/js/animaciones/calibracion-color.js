// ============================================================
// Animación "calibracion-color": los valores crudos R, G y B de cada pieza.
// Lee la tabla de calibración del equipo (pieza, medición, R, G, B, C) y dibuja,
// para cada color de pieza, tres barras con el promedio de R, G y B y un punto
// por cada medición (así se ve cuánto varían). Se actualiza mientras escriben.
// No decide si hay errores: eso lo analiza el equipo (pregunta de la guía).
//
// En la guía:
//   :::animacion tipo="calibracion-color" tabla="g6-calibracion"
//   :::
// ============================================================
import { svg } from './comun/svg.js';
import { buscarTablaDelEquipo, leerNumero } from './comun/grafica.js';
import { el } from '../comun.js';

const sinTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const CANALES = [['R', 'calcol-r'], ['G', 'calcol-g'], ['B', 'calcol-b']];
const X0 = 60; const X1 = 600; const Y0 = 20; const Y1 = 250;

export default function montar(contenedor, config, contexto = {}) {
  const idTabla = typeof config.tabla === 'string' ? config.tabla : config.campo;
  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 620 300', class: 'grafica-svg', role: 'img', 'aria-label': 'Promedio de R, G y B para cada color de pieza' }, capa);
  const leyenda = el('p', { class: 'suave-leyenda' }, ...CANALES.map(([c, clase]) => el('span', {}, el('span', { class: `anti-muestra ${clase}` }), ` ${c}  `)), el('span', {}, '· puntos = cada medición'));
  const resumen = el('p', { class: 'anim-estado', 'aria-live': 'polite' }, 'Buscando la tabla de calibración…');
  contenedor.append(el('div', { class: 'anim-grafica' }, el('p', { class: 'grafica-titulo' }, 'Valores crudos por color de pieza'), raiz, leyenda, resumen));

  function graficar(tabla) {
    const enc = tabla.encabezados.map(sinTildes);
    const colPieza = Math.max(0, enc.findIndex((e) => e.includes('pieza') || e.includes('color')));
    const col = { R: enc.findIndex((e) => e.trim() === 'r'), G: enc.findIndex((e) => e.trim() === 'g'), B: enc.findIndex((e) => e.trim() === 'b') };
    // Agrupar por pieza (en el orden en que aparecen)
    const grupos = new Map();
    for (const f of tabla.filas) {
      const nombre = String(f[colPieza] || '').trim();
      if (!nombre) continue;
      const valores = CANALES.map(([c]) => leerNumero(f[col[c]]));
      if (!grupos.has(nombre)) grupos.set(nombre, []);
      if (valores.some(Number.isFinite)) grupos.get(nombre).push(valores);
    }
    const lista = [...grupos.entries()];
    const todos = lista.flatMap(([, ms]) => ms.flat()).filter(Number.isFinite);
    const maximo = Math.ceil(Math.max(100, ...todos) / 200) * 200;
    const yDe = (v) => Y1 - (v / maximo) * (Y1 - Y0);
    const anchoGrupo = (X1 - X0) / Math.max(1, lista.length);
    const piezas = [];
    // Cuadrícula
    for (let k = 0; k <= 4; k++) {
      const v = Math.round((maximo / 4) * k);
      piezas.push(svg('line', { x1: X0, x2: X1, y1: yDe(v), y2: yDe(v), class: k ? 'grafica-reja' : 'grafica-base' }),
        svg('text', { x: X0 - 8, y: yDe(v) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, String(v)));
    }
    lista.forEach(([nombre, medidas], g) => {
      const xg = X0 + g * anchoGrupo;
      CANALES.forEach(([, clase], c) => {
        const vals = medidas.map((m) => m[c]).filter(Number.isFinite);
        const x = xg + anchoGrupo * 0.18 + c * anchoGrupo * 0.22;
        const w = anchoGrupo * 0.18;
        if (vals.length) {
          const prom = vals.reduce((a, b) => a + b, 0) / vals.length;
          piezas.push(svg('rect', { x, y: yDe(prom), width: w, height: Math.max(0, Y1 - yDe(prom)), rx: 3, class: `calcol-barra ${clase}` },
            svg('title', {}, `${nombre} · ${CANALES[c][0]}: promedio ${Math.round(prom)}`)));
          vals.forEach((v, i) => piezas.push(svg('circle', { cx: x + w / 2 + (i - (vals.length - 1) / 2) * 5, cy: yDe(v), r: 4, class: 'calcol-punto' })));
        }
      });
      piezas.push(svg('text', { x: xg + anchoGrupo / 2, y: Y1 + 22, class: 'grafica-eje', 'text-anchor': 'middle' }, nombre));
    });
    capa.replaceChildren(...piezas);
    const conDatos = lista.filter(([, ms]) => ms.length).length;
    resumen.textContent = conDatos
      ? `${conDatos} color${conDatos > 1 ? 'es' : ''} con mediciones${tabla.guia ? ` (tabla de la guía ${tabla.guia})` : ''}. Comparen la altura de las barras de cada pieza.`
      : 'Escriban los valores R, G y B en la tabla para ver las barras.';
  }

  async function dibujar() {
    const tabla = await buscarTablaDelEquipo(idTabla, contexto);
    if (!tabla) {
      capa.replaceChildren();
      resumen.textContent = idTabla ? `No se pudo leer la tabla "${idTabla}".` : 'Esta animación necesita tabla="id-de-la-tabla".';
      return null;
    }
    graficar(tabla);
    return tabla;
  }
  dibujar().then((tabla) => { if (tabla && tabla.elemento) tabla.elemento.addEventListener('input', dibujar); });
}
