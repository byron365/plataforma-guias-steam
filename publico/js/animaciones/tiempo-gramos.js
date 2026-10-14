// ============================================================
// Animación "tiempo-gramos": gráfica de dispersión del experimento
// tiempo abierta (ms) contra gramos servidos, con línea de tendencia.
// Usa los PROMEDIOS que el equipo escribió en su tabla (puede estar en otra
// guía: "g6-gramos" se busca en la guía 6). No calcula los ms por gramo:
// eso lo hacen los estudiantes.
//
// En la guía:
//   :::animacion tipo="tiempo-gramos" tabla="g6-gramos"
//   :::
// Columnas que busca: una con "tiempo" (x) y otra con "promedio" (y).
// ============================================================
import { crearGraficaLinea, leerNumero, buscarTablaDelEquipo } from './comun/grafica.js';
import { el } from '../comun.js';

const sinTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function montar(contenedor, config, contexto = {}) {
  const idTabla = typeof config.tabla === 'string' ? config.tabla : config.campo;
  const grafica = crearGraficaLinea({
    ejeX: 'Tiempo abierta (ms)', ejeY: 'Comida servida, promedio (g)',
    maxX: 2000, maxY: 50, soloPuntos: true, tendencia: true,
    vacio: 'Escriban los promedios en la tabla para ver los puntos.',
  });
  const resumen = el('p', { class: 'anim-estado', 'aria-live': 'polite' }, 'Buscando la tabla del experimento…');
  contenedor.append(el('div', { class: 'anim-grafica' },
    el('p', { class: 'grafica-titulo' }, 'Experimento: tiempo abierta contra gramos'),
    grafica.elemento, resumen));

  async function dibujar() {
    const tabla = await buscarTablaDelEquipo(idTabla, contexto);
    if (!tabla) {
      grafica.actualizar([]);
      resumen.textContent = idTabla
        ? `No se pudo leer la tabla "${idTabla}". ¿Está desbloqueada esa guía y la llenaron?`
        : 'Esta gráfica necesita tabla="id-de-la-tabla".';
      return tabla;
    }
    const enc = tabla.encabezados.map(sinTildes);
    const colX = enc.findIndex((e) => e.includes('tiempo'));
    const colY = enc.findIndex((e) => e.includes('promedio'));
    const puntos = tabla.filas
      .map((f) => ({ x: leerNumero(f[colX]), y: leerNumero(f[colY]), unidadX: 'ms', unidadY: 'g' }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
    grafica.actualizar(puntos);
    resumen.textContent = puntos.length < 2
      ? 'Faltan promedios: completen la columna "Promedio" de la tabla.'
      : `${puntos.length} puntos${tabla.guia ? ` (de la tabla de la guía ${tabla.guia})` : ''}. ¿Forman casi una línea recta?`;
    return tabla;
  }

  dibujar().then((tabla) => {
    // Si la tabla está en esta misma página, la gráfica se actualiza mientras escriben
    if (tabla && tabla.elemento) tabla.elemento.addEventListener('input', dibujar);
  });
}
