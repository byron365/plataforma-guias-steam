// ============================================================
// Archivos de trabajo del equipo (bloques :::archivo)
//   - Estudiantes: subir el archivo (.blend, .ino, .zip…) y descargar
//     las versiones guardadas desde cualquier computadora.
//   - Página del proyecto y panel del docente: la lista de todos los
//     archivos del equipo, agrupados por guía.
// El servidor guarda las últimas 5 versiones de cada recuadro.
// ============================================================
import { el } from './comun.js';
import { subir } from './fotos.js';

export const EXTENSIONES = ['.blend', '.stl', '.ino', '.zip', '.txt', '.docx', '.xlsx', '.csv'];
const MAX_TAMANO = 100 * 1024 * 1024; // 100 MB (igual que en el servidor)
const VERSIONES = 5;

// "2026-10-06 19:36:07" → "06/10 19:36"
const fechaCorta = (t) => { const m = String(t || '').match(/^\d{4}-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/); return m ? `${m[2]}/${m[1]} ${m[3]}:${m[4]}` : ''; };

export function tamanoLegible(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1048576).toFixed(1).replace('.', ',')} MB`;
}

// Una versión: nombre, quién y cuándo, y botón para descargar
function filaVersion(a, { nueva = false } = {}) {
  return el('li', { class: `archivo-version${nueva ? ' archivo-nuevo' : ''}` },
    el('span', { class: 'archivo-datos' },
      el('strong', { class: 'archivo-nombre' }, a.nombre),
      el('small', {}, [tamanoLegible(a.tamano), a.estudiante, fechaCorta(a.creado)].filter(Boolean).join(' · '))),
    el('a', { class: 'boton boton-chico boton-descarga', href: `/api/archivos-equipo/${a.id}`, download: a.nombre }, '⬇ Descargar'));
}

// Lista de versiones: la más nueva primero; las anteriores, plegadas
function dibujarVersiones(lista, versiones) {
  if (!versiones.length) { lista.replaceChildren(); return; }
  const [ultima, ...anteriores] = versiones;
  // (replaceChildren escribiría «null» como texto: por eso se filtra)
  lista.replaceChildren(...[
    filaVersion(ultima, { nueva: true }),
    anteriores.length
      ? el('li', { class: 'archivo-anteriores' },
        el('details', {},
          el('summary', {}, anteriores.length === 1 ? 'Ver 1 versión anterior' : `Ver ${anteriores.length} versiones anteriores`),
          el('ul', {}, anteriores.map((a) => filaVersion(a)))))
      : null,
  ].filter(Boolean));
}

// Estudiantes: botón para subir en cada bloque :::archivo
export function montarArchivosEditables(raiz, { archivos = {}, numeroGuia }) {
  raiz.querySelectorAll('.archivo-equipo[data-archivo]').forEach((bloque) => {
    const campo = bloque.dataset.archivo;
    const lista = bloque.querySelector('.archivo-versiones');
    dibujarVersiones(lista, archivos[campo] || []);

    const estado = el('p', { class: 'foto-estado', 'aria-live': 'polite' });
    const entrada = el('input', { type: 'file', accept: EXTENSIONES.join(','), class: 'solo-lector', id: `archivo-${campo}` });
    const boton = el('label', { class: 'boton boton-chico foto-agregar', for: `archivo-${campo}` }, '⬆ Subir archivo');

    entrada.addEventListener('change', async () => {
      const archivo = entrada.files[0];
      entrada.value = '';
      if (!archivo) return;
      estado.className = 'foto-estado';
      try {
        const ext = (archivo.name.match(/\.[^.]+$/) || [''])[0].toLowerCase();
        if (!EXTENSIONES.includes(ext)) throw new Error(`Ese tipo de archivo no se puede subir. Solo: ${EXTENSIONES.join(' ')}`);
        if (archivo.size > MAX_TAMANO) throw new Error('El archivo pesa más de 100 MB. Si es una carpeta comprimida, quiten lo que no haga falta.');
        if (archivo.size === 0) throw new Error('El archivo está vacío.');
        boton.classList.add('desactivado');
        entrada.disabled = true;
        const respuesta = await subir(`/api/guias/${numeroGuia}/archivos/${encodeURIComponent(campo)}`, archivo,
          (porcentaje) => { estado.textContent = `Subiendo ${archivo.name}… ${porcentaje} %`; },
          { 'X-Nombre-Archivo': encodeURIComponent(archivo.name) });
        dibujarVersiones(lista, respuesta.archivos || []);
        estado.textContent = 'Guardado ✓ Ya lo pueden descargar desde cualquier computadora.';
        estado.className = 'foto-estado ok';
      } catch (error) {
        if (error.estado === 401) { location.href = '/'; return; }
        estado.textContent = error.message;
        estado.className = 'foto-estado error';
      } finally {
        boton.classList.remove('desactivado');
        entrada.disabled = false;
      }
    });

    bloque.append(
      el('div', { class: 'foto-acciones' }, entrada, boton, estado),
      el('p', { class: 'archivo-ayuda' },
        `Tipos: ${EXTENSIONES.join(' ')} · máximo 100 MB · se guardan las últimas ${VERSIONES} versiones. `,
        el('a', { href: '/proyecto#archivos' }, 'Ver todos los archivos del equipo')));
  });
}

// Docente: ver y descargar (sin subir)
export function montarArchivosLectura(raiz, { archivos = {}, conEquipo }) {
  raiz.querySelectorAll('.archivo-equipo[data-archivo]').forEach((bloque) => {
    const versiones = archivos[bloque.dataset.archivo] || [];
    const lista = bloque.querySelector('.archivo-versiones');
    if (versiones.length) dibujarVersiones(lista, versiones);
    else if (conEquipo) lista.replaceChildren(el('li', { class: 'sin-respuesta' }, 'Todavía no han subido archivos.'));
  });
}

// Todos los archivos de un equipo, agrupados por guía (página del proyecto y panel).
// "archivos" viene del servidor ordenado por guía, campo y del más nuevo al más viejo.
export function listaArchivosEquipo(archivos, { titulos = {} } = {}) {
  const grupos = new Map();
  for (const a of archivos) {
    const clave = `${a.guia}|${a.campo}`;
    if (!grupos.has(clave)) grupos.set(clave, []);
    grupos.get(clave).push(a);
  }
  return el('div', { class: 'archivos-equipo-lista' }, [...grupos.values()].map((versiones) => {
    const { guia, tituloGuia } = versiones[0];
    const titulo = tituloGuia || titulos[guia] || '';
    const lista = el('ul', { class: 'archivo-versiones' });
    dibujarVersiones(lista, versiones);
    return el('section', { class: 'archivo-grupo' },
      el('h3', {}, `Guía ${guia}`, titulo ? el('span', { class: 'archivo-grupo-titulo' }, ` · ${titulo}`) : null),
      lista);
  }));
}
