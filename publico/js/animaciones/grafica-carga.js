// ============================================================
// Animación "grafica-carga": gráfica de la prueba de carga del puente.
// Lee la tabla del equipo (peso y cuánto bajó el tablero) y la dibuja
// en vivo mientras la llenan.
//
// En la guía:
//   :::animacion tipo="grafica-carga" tabla="g7-carga"
//   :::
// Opciones (todas opcionales):
//   tabla       id de la tabla editable del equipo
//   limite      línea de referencia en mm (por defecto 10, el reto extra de la guía 7)
//   objetivo    carga que debe aguantar, en g (por defecto 200)
// Columnas que busca: una con "peso" y otra con "bajó" (o "baja", "flecha").
// ============================================================
import { crearGraficaLinea, leerNumero, leerTablaEditable } from './comun/grafica.js';
import { numero } from './comun/svg.js';
import { el } from '../comun.js';

const sinTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function montar(contenedor, config) {
  const limite = numero(config.limite, 10);
  const objetivo = numero(config.objetivo, 200);
  const idTabla = typeof config.tabla === 'string' ? config.tabla : config.campo;
  const tabla = idTabla ? document.querySelector(`.tabla-editable[data-campo="${CSS.escape(idTabla)}"]`) : null;

  const grafica = crearGraficaLinea({
    ejeX: 'Peso total (g)', ejeY: 'Cuánto bajó el centro (mm)',
    maxX: objetivo, maxY: limite,
    referencia: { y: limite, texto: `${limite} mm` },
    vacio: 'Completen la columna "Cuánto bajó" para ver la gráfica.',
  });
  const resumen = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-grafica' },
    el('p', { class: 'grafica-titulo' }, 'Prueba de carga: cuánto baja el tablero con cada peso'),
    grafica.elemento, resumen));

  function leerDatos() {
    if (!tabla) return null;
    const { encabezados, filas } = leerTablaEditable(tabla);
    const enc = encabezados.map(sinTildes);
    const colPeso = enc.findIndex((e) => e.includes('peso'));
    const colBajo = enc.findIndex((e) => /bajo|baja|flecha|deform/.test(e));
    if (colPeso < 0 || colBajo < 0) return null;
    return filas
      .map((f) => ({ x: leerNumero(f[colPeso]), y: leerNumero(f[colBajo]), unidadX: 'g', unidadY: 'mm' }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
  }

  function dibujar() {
    const datos = leerDatos();
    if (datos === null) {
      resumen.textContent = idTabla ? `No se encontró la tabla "${idTabla}" con columnas de peso y de cuánto bajó.` : 'Esta gráfica necesita tabla="id-de-la-tabla".';
      grafica.actualizar([]);
      return;
    }
    grafica.actualizar(datos);
    if (datos.length < 2) { resumen.textContent = 'Anoten al menos dos pesos para ver cómo cambia.'; return; }
    const mayor = datos.reduce((a, b) => (b.x > a.x ? b : a));
    const coma = (n) => String(Math.round(n * 10) / 10).replace('.', ',');
    resumen.textContent = `Con ${coma(mayor.x)} g el tablero bajó ${coma(mayor.y)} mm` +
      (mayor.y >= limite ? ` (llegó al límite de ${limite} mm).` : '.');
  }

  if (tabla) tabla.addEventListener('input', dibujar);
  dibujar();
}
