// ============================================================
// Apartado "Descargas" del panel de la bitácora: la lista de materiales
// del grupo, las guías desbloqueadas en PDF (en blanco) para repasar en casa
// y las piezas 3D (.stl) de su proyecto.
// La lista se pide al servidor la primera vez que se abre el apartado.
// ============================================================
import { api, el } from './comun.js';

// Nombre del archivo que manda el servidor (Content-Disposition), con tildes incluidas
function nombreDelArchivo(respuesta, respaldo) {
  const cabecera = respuesta.headers.get('Content-Disposition') || '';
  const utf8 = /filename\*=UTF-8''([^;]+)/i.exec(cabecera);
  if (utf8) { try { return decodeURIComponent(utf8[1]); } catch { /* sigue con el otro */ } }
  const simple = /filename="?([^";]+)"?/i.exec(cabecera);
  return simple ? simple[1] : respaldo;
}

// Baja el archivo sin salir de la página. Un PDF nuevo tarda unos segundos en crearse.
async function descargar(boton, url, respaldo, estado) {
  const texto = boton.textContent;
  boton.disabled = true;
  boton.textContent = 'Preparando…';
  estado.className = 'descargas-estado';
  estado.textContent = 'Preparando el archivo. La primera vez puede tardar unos segundos.';
  try {
    let respuesta;
    try {
      respuesta = await fetch(url, { credentials: 'same-origin' });
    } catch {
      throw new Error('Sin conexión con el servidor. Revisen el Wi-Fi.');
    }
    if (!respuesta.ok) {
      let mensaje = 'No se pudo descargar. Intenten otra vez.';
      try { mensaje = (await respuesta.json()).error || mensaje; } catch { /* sin mensaje */ }
      throw new Error(mensaje);
    }
    const archivo = await respuesta.blob();
    const enlace = el('a', { href: URL.createObjectURL(archivo), download: nombreDelArchivo(respuesta, respaldo), hidden: true });
    document.body.append(enlace);
    enlace.click();
    enlace.remove();
    setTimeout(() => URL.revokeObjectURL(enlace.href), 60 * 1000);
    estado.className = 'descargas-estado ok';
    estado.textContent = 'Listo ✓ Búsquenlo en la carpeta Descargas.';
  } catch (error) {
    estado.className = 'descargas-estado error';
    estado.textContent = error.message;
  } finally {
    boton.disabled = false;
    boton.textContent = texto;
  }
}

function fila(icono, titulo, detalle, url, respaldo, estado) {
  const boton = el('button', { class: 'boton boton-chico boton-secundario', type: 'button' }, 'Descargar');
  boton.addEventListener('click', () => descargar(boton, url, respaldo, estado));
  return el('li', { class: 'descargas-fila' },
    el('span', { class: 'descargas-icono', 'aria-hidden': 'true' }, icono),
    el('span', { class: 'descargas-texto' }, el('strong', {}, titulo), detalle ? el('small', {}, detalle) : null),
    boton);
}

async function llenar(contenido) {
  contenido.replaceChildren(el('p', { class: 'texto-suave' }, 'Cargando…'));
  let datos;
  try {
    datos = await api('/api/descargas');
  } catch (error) {
    contenido.replaceChildren(el('p', { class: 'descargas-estado error' }, error.message));
    return false;
  }
  const estado = el('p', { class: 'descargas-estado', role: 'status', 'aria-live': 'polite' });
  const filas = [];
  if (datos.materiales) {
    filas.push(fila('🧰', 'Lista de materiales', datos.materiales.tipo === 'pdf' ? 'PDF' : 'Word',
      '/api/descargas/materiales', 'Lista de materiales', estado));
  }
  for (const g of datos.guias) {
    filas.push(fila('📄', `Guía ${g.numero} · ${g.titulo}`, g.sabado ? `Sábado ${g.sabado} · PDF` : 'PDF',
      `/api/descargas/guias/${g.numero}`, `Guía ${g.numero}.pdf`, estado));
  }
  // Piezas 3D del proyecto: un archivo .stl por pieza
  const piezas = (datos.piezas || []).map((p) => fila('🧊', p.nombre, `Pieza 3D · STL · ${p.kb} KB`,
    `/api/descargas/stl/${encodeURIComponent(p.archivo)}`, p.archivo, estado));
  contenido.replaceChildren(
    el('p', { class: 'texto-suave' }, 'Las guías salen en blanco, sin sus respuestas, para repasar o imprimir en casa. Solo aparecen las que ya están desbloqueadas.'),
    filas.length ? el('ul', { class: 'descargas-lista' }, filas) : el('p', { class: 'texto-suave' }, 'Todavía no hay nada para descargar.'),
    piezas.length ? el('p', { class: 'texto-suave' }, 'Piezas 3D: los archivos STL que imprime el docente. Se abren en Tinkercad (Importar) o en el programa de la impresora.') : null,
    piezas.length ? el('ul', { class: 'descargas-lista' }, piezas) : null,
    estado);
  return true;
}

// Devuelve el apartado listo para poner en el panel
export function crearDescargas() {
  const contenido = el('div', { class: 'descargas-contenido' });
  let cargado = false;
  const apartado = el('details', { class: 'descargas' },
    el('summary', {}, el('span', { 'aria-hidden': 'true' }, '⬇'), ' Descargas: guías, materiales y piezas 3D'),
    contenido);
  // Se carga al abrirlo; si falló, se vuelve a intentar la próxima vez
  apartado.addEventListener('toggle', async () => {
    if (apartado.open && !cargado) cargado = await llenar(contenido);
  });
  return apartado;
}
