// ============================================================
// Animación "grafica-datos": gráfica de línea con los datos que el equipo
// escribió en una tabla de la guía (la misma página u otra guía).
// El eje X es la primera columna; el eje Y se elige con botones entre las
// columnas que tienen números. Se actualiza mientras escriben.
// No calcula conclusiones: solo dibuja lo que el equipo midió.
//
// En la guía:
//   :::animacion tipo="grafica-datos" tabla="g8-velocidad"
//   :::
// Opciones (todas opcionales):
//   x   parte del nombre de la columna para el eje X (por defecto, la primera)
//   y   parte del nombre de la columna que se muestra al empezar
//   referencia   valor de una línea punteada horizontal (por ejemplo 90 para "90 %")
// ============================================================
import { crearGraficaLinea, buscarTablaDelEquipo, leerNumero } from './comun/grafica.js';
import { numero } from './comun/svg.js';
import { el } from '../comun.js';

const sinTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const unidadDe = (encabezado) => { const m = /\(([^)]+)\)/.exec(encabezado); return m ? m[1] : ''; };

export default function montar(contenedor, config, contexto = {}) {
  const idTabla = typeof config.tabla === 'string' ? config.tabla : config.campo;
  const ref = Number.isFinite(numero(config.referencia, NaN)) ? numero(config.referencia, NaN) : null;
  let elegida = null;          // índice de la columna Y
  let ultimaTabla = null;

  const caja = el('div', { class: 'grafica-caja' });
  const botones = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Columna que se grafica' });
  const resumen = el('p', { class: 'anim-estado', 'aria-live': 'polite' }, 'Buscando la tabla…');
  contenedor.append(el('div', { class: 'anim-grafica' }, botones, caja, resumen));

  function graficar(tabla) {
    const enc = tabla.encabezados;
    const encSin = enc.map(sinTildes);
    const colX = config.x ? Math.max(0, encSin.findIndex((e) => e.includes(sinTildes(config.x)))) : 0;
    // Columnas con al menos un número (sin contar la del eje X)
    // Una celda cuenta como número solo si es un número (no "1 → 2")
    const esNumero = (v) => /^\s*[-−]?\d+(?:[.,]\d+)?\s*[a-z%°]*\s*$/i.test(String(v || ''));
    const columnas = enc.map((_, i) => i).filter((i) => i !== colX && tabla.filas.some((f) => esNumero(f[i])) && tabla.filas.every((f) => !String(f[i] || '').trim() || esNumero(f[i])));
    if (elegida === null || !columnas.includes(elegida)) {
      const pedida = config.y ? encSin.findIndex((e) => e.includes(sinTildes(config.y))) : -1;
      elegida = columnas.includes(pedida) ? pedida : (columnas[columnas.length - 1] ?? null);
    }
    botones.replaceChildren(...columnas.map((i) => el('button', {
      type: 'button', class: `anim-boton${i === elegida ? ' activo' : ''}`, 'aria-pressed': String(i === elegida),
      onclick: () => { elegida = i; graficar(ultimaTabla); },
    }, enc[i])));
    botones.hidden = columnas.length < 2;

    // Si la columna X no tiene números (por ejemplo "Intento 1"), se usa el orden de las filas
    const xNumerica = tabla.filas.filter((f) => Number.isFinite(leerNumero(f[colX]))).length >= 2;
    const filas = tabla.filas.filter((f) => !/promedio|total/i.test(sinTildes(f[colX] || '')));
    const etiquetas = filas.map((f) => String(f[colX] || '').trim());
    const puntos = elegida === null ? [] : filas.map((f, i) => ({
      x: xNumerica ? leerNumero(f[colX]) : i + 1, y: leerNumero(f[elegida]),
      unidadX: unidadDe(enc[colX]), unidadY: unidadDe(enc[elegida]),
    })).filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
    const maxX = Math.max(1, ...puntos.map((p) => p.x));
    const grafica = crearGraficaLinea({
      ejeX: enc[colX], ejeY: elegida === null ? '' : enc[elegida],
      minX: xNumerica ? 0 : 1, maxX: xNumerica ? maxX : Math.max(2, filas.length),
      maxY: Math.max(1, ...puntos.map((p) => p.y), ref || 0),
      referencia: ref !== null ? { y: ref, texto: String(ref).replace('.', ',') } : null,
      formatoX: xNumerica ? undefined : (n) => etiquetas[n - 1] || '',
      vacio: 'Completen la tabla para ver la gráfica.',
    });
    caja.replaceChildren(grafica.elemento);
    grafica.actualizar(puntos);
    resumen.textContent = puntos.length < 2
      ? `Faltan datos en la tabla${elegida !== null ? ` (columna "${enc[elegida]}")` : ''}.`
      : `${puntos.length} puntos de la columna "${enc[elegida]}"${tabla.guia ? ` (tabla de la guía ${tabla.guia})` : ''}.`;
  }

  async function dibujar() {
    const tabla = await buscarTablaDelEquipo(idTabla, contexto);
    if (!tabla) {
      caja.replaceChildren(); botones.hidden = true;
      resumen.textContent = idTabla
        ? `No se pudo leer la tabla "${idTabla}". ¿Está desbloqueada esa guía y la llenaron?`
        : 'Esta gráfica necesita tabla="id-de-la-tabla".';
      return null;
    }
    ultimaTabla = tabla;
    graficar(tabla);
    return tabla;
  }

  dibujar().then((tabla) => {
    if (tabla && tabla.elemento) tabla.elemento.addEventListener('input', dibujar);
  });
}
