// ============================================================
// Componente reutilizable: gráfica de línea de UNA serie (SVG).
// Línea de 2 px, puntos de 8 px, cuadrícula discreta y una etiqueta
// al pasar el dedo o el mouse por cada punto.
//
//   const g = crearGraficaLinea({ ejeX: 'Peso (g)', ejeY: 'Bajó (mm)' });
//   contenedor.append(g.elemento);
//   g.actualizar([{ x: 0, y: 0 }, { x: 50, y: 1.5 }]);
//
// Opciones:
//   ejeX, ejeY         nombres de los ejes
//   minX, maxX, maxY   rango mínimo de los ejes (crece si los datos son mayores)
//   referencia         { y: 10, texto: 'Límite' } → línea punteada horizontal
//   formatoX, formatoY funciones para mostrar los números
//   vacio              texto cuando todavía no hay datos
//   soloPuntos         true → gráfica de dispersión (sin unir los puntos)
//   tendencia          true → línea de tendencia (mínimos cuadrados), como en la hoja de cálculo
// ============================================================
import { svg } from './svg.js';

const ANCHO = 560;
const ALTO = 300;
const MARGEN = { izq: 56, der: 20, arriba: 18, abajo: 50 };

// Números "redondos" para las marcas de los ejes (0, 5, 10, 15...)
function pasoRedondo(maximo, marcas = 5) {
  const crudo = maximo / marcas;
  const potencia = 10 ** Math.floor(Math.log10(crudo || 1));
  const opciones = [1, 2, 2.5, 5, 10].map((m) => m * potencia);
  return opciones.find((o) => o >= crudo) || opciones[opciones.length - 1];
}

const formatoNumero = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1)).replace('.', ',');

export function crearGraficaLinea(opciones = {}) {
  const {
    ejeX = '', ejeY = '', minX = 0, maxX = 10, maxY = 10, referencia = null,
    formatoX = formatoNumero, formatoY = formatoNumero, vacio = 'Todavía no hay datos.',
    soloPuntos = false, tendencia = false,
  } = opciones;

  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} ${ALTO}`, class: 'grafica-svg', role: 'img', 'aria-label': `Gráfica: ${ejeY} según ${ejeX}` });
  const capaEjes = svg('g', { class: 'grafica-ejes' });
  const capaDatos = svg('g', { class: 'grafica-datos' });
  const capaPuntos = svg('g', {});
  const mensajeVacio = svg('text', { x: ANCHO / 2, y: ALTO / 2, class: 'grafica-vacio', 'text-anchor': 'middle' }, vacio);
  raiz.append(capaEjes, capaDatos, capaPuntos, mensajeVacio);

  // Etiqueta flotante (HTML, para que el texto sea nítido y accesible)
  const etiqueta = document.createElement('div');
  etiqueta.className = 'grafica-etiqueta';
  etiqueta.hidden = true;
  const elemento = document.createElement('div');
  elemento.className = 'grafica';
  elemento.append(raiz, etiqueta);

  const x0 = MARGEN.izq; const x1 = ANCHO - MARGEN.der;
  const y0 = ALTO - MARGEN.abajo; const y1 = MARGEN.arriba;

  function actualizar(puntos) {
    const datos = puntos.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y)).sort((a, b) => a.x - b.x);
    const topeX = Math.max(maxX, ...datos.map((p) => p.x));
    const topeY = Math.max(maxY, referencia ? referencia.y : 0, ...datos.map((p) => p.y));
    // Si hay valores negativos, el eje Y también baja de 0
    const pisoY = Math.min(0, ...datos.map((p) => p.y));
    const pasoX = pasoRedondo(topeX - minX); const pasoY = pasoRedondo(topeY - pisoY);
    const finX = Math.ceil(topeX / pasoX) * pasoX; const finY = Math.ceil(topeY / pasoY) * pasoY;
    const inicioY = Math.floor(pisoY / pasoY) * pasoY;
    const px = (v) => x0 + ((v - minX) / (finX - minX || 1)) * (x1 - x0);
    const py = (v) => y0 - ((v - inicioY) / ((finY - inicioY) || 1)) * (y0 - y1);

    // Ejes y cuadrícula (discretos)
    capaEjes.replaceChildren();
    for (let v = inicioY; v <= finY + 1e-9; v += pasoY) {
      capaEjes.append(
        svg('line', { x1: x0, x2: x1, y1: py(v), y2: py(v), class: v === 0 ? 'grafica-base' : 'grafica-reja' }),
        svg('text', { x: x0 - 8, y: py(v) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, formatoY(v)));
    }
    for (let v = minX; v <= finX + 1e-9; v += pasoX) {
      capaEjes.append(svg('text', { x: px(v), y: y0 + 18, class: 'grafica-numero', 'text-anchor': 'middle' }, formatoX(v)));
    }
    capaEjes.append(
      svg('text', { x: (x0 + x1) / 2, y: ALTO - 8, class: 'grafica-eje', 'text-anchor': 'middle' }, ejeX),
      svg('text', { x: 14, y: (y0 + y1) / 2, class: 'grafica-eje', 'text-anchor': 'middle', transform: `rotate(-90 14 ${(y0 + y1) / 2})` }, ejeY));
    if (referencia) {
      capaEjes.append(
        svg('line', { x1: x0, x2: x1, y1: py(referencia.y), y2: py(referencia.y), class: 'grafica-referencia' }),
        svg('text', { x: x1, y: py(referencia.y) - 6, class: 'grafica-numero', 'text-anchor': 'end' }, referencia.texto));
    }

    // Datos
    capaDatos.replaceChildren();
    capaPuntos.replaceChildren();
    mensajeVacio.style.display = datos.length ? 'none' : '';
    if (datos.length > 1 && !soloPuntos) {
      capaDatos.append(svg('polyline', { points: datos.map((p) => `${px(p.x)},${py(p.y)}`).join(' '), class: 'grafica-linea' }));
    }
    if (tendencia && datos.length > 1) {
      // Recta que mejor se ajusta a los puntos (mínimos cuadrados)
      const n = datos.length;
      const mx = datos.reduce((s, p) => s + p.x, 0) / n;
      const my = datos.reduce((s, p) => s + p.y, 0) / n;
      const sxx = datos.reduce((s, p) => s + (p.x - mx) ** 2, 0);
      if (sxx > 0) {
        const m = datos.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0) / sxx;
        const b = my - m * mx;
        const xa = Math.min(...datos.map((p) => p.x)); const xb = Math.max(...datos.map((p) => p.x));
        const ya = Math.max(inicioY, Math.min(finY, m * xa + b)); const yb = Math.max(inicioY, Math.min(finY, m * xb + b));
        capaDatos.append(
          svg('line', { x1: px(xa), y1: py(ya), x2: px(xb), y2: py(yb), class: 'grafica-tendencia' }),
          svg('text', { x: px(xb), y: py(yb) - 8, class: 'grafica-numero', 'text-anchor': 'end' }, 'línea de tendencia'));
      }
    }
    datos.forEach((p) => {
      const cx = px(p.x); const cy = py(p.y);
      const texto = `${formatoX(p.x)} ${p.unidadX || ''} → ${formatoY(p.y)} ${p.unidadY || ''}`.replace(/\s+/g, ' ').trim();
      const grupo = svg('g', { class: 'grafica-punto', tabindex: '0', role: 'img', 'aria-label': p.etiqueta || texto });
      grupo.append(
        svg('circle', { cx, cy, r: 16, class: 'grafica-zona' }), // zona grande para el dedo
        svg('circle', { cx, cy, r: 5, class: 'grafica-marca' }));
      const mostrar = () => {
        etiqueta.textContent = p.etiqueta || texto;
        etiqueta.hidden = false;
        const caja = raiz.getBoundingClientRect();
        const escala = caja.width / ANCHO;
        etiqueta.style.left = `${cx * escala}px`;
        etiqueta.style.top = `${cy * escala}px`;
      };
      grupo.addEventListener('pointerenter', mostrar);
      grupo.addEventListener('focus', mostrar);
      grupo.addEventListener('pointerleave', () => { etiqueta.hidden = true; });
      grupo.addEventListener('blur', () => { etiqueta.hidden = true; });
      capaPuntos.append(grupo);
    });
  }

  actualizar([]);
  return { elemento, actualizar };
}

// Lee un número escrito por los estudiantes: "3", "3,5", "3.5 mm", "~4"
export function leerNumero(texto) {
  const m = String(texto || '').replace(',', '.').replace('−', '-').match(/-?\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : NaN;
}

// Busca una tabla del equipo por su id: primero en esta página y, si no está,
// en la guía donde vive (el número sale del id: "g6-gramos" → guía 6).
// contexto.obtenerGuia(n) lo da la página (estudiantes o panel del docente).
// Devuelve { encabezados, filas, elemento } o null.
export async function buscarTablaDelEquipo(idTabla, contexto = {}) {
  if (!idTabla) return null;
  const enPagina = document.querySelector(`.tabla-editable[data-campo="${CSS.escape(idTabla)}"]`);
  if (enPagina) return { ...leerTablaEditable(enPagina), elemento: enPagina };
  const numero = Number((String(idTabla).match(/^g(\d+)-/) || [])[1]);
  if (!numero || !contexto.obtenerGuia) return null;
  try {
    const guia = await contexto.obtenerGuia(numero);
    const plantilla = document.createElement('template');
    plantilla.innerHTML = guia.partes.map((p) => p.html).join('');
    const tabla = plantilla.content.querySelector(`.tabla-editable[data-campo="${CSS.escape(idTabla)}"]`);
    if (!tabla) return null;
    const valores = (guia.respuestas && guia.respuestas[idTabla]) || {};
    tabla.querySelectorAll('input[data-celda]').forEach((celda) => { celda.value = valores[celda.dataset.celda] || ''; });
    return { ...leerTablaEditable(tabla), elemento: null, guia: numero };
  } catch {
    return null; // guía bloqueada o sin conexión
  }
}

// Lee una tabla editable de la página: encabezados + filas (celdas fijas o escritas)
export function leerTablaEditable(tabla) {
  const encabezados = [...tabla.querySelectorAll('thead th')].map((th) => th.textContent.trim());
  const filas = [...tabla.querySelectorAll('tbody tr')].map((tr) =>
    [...tr.children].map((td) => { const input = td.querySelector('input'); return input ? input.value : td.textContent.trim(); }));
  return { encabezados, filas };
}
