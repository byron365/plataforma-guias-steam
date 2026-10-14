// ============================================================
// Página del proyecto: lista de las guías y su estado
// ============================================================
import { api, el, mostrarQuien } from './comun.js';
import { montarBitacora } from './bitacora.js';
import { listaArchivosEquipo } from './archivos-equipo.js';

const pagina = document.getElementById('pagina');

const ESTADOS = {
  bloqueada:    { texto: 'Bloqueada', icono: '🔒' },
  proximamente: { texto: 'Próximamente', icono: '⏳' },
  disponible:   { texto: 'Disponible', icono: '▶' },
  en_progreso:  { texto: 'En progreso', icono: '✎' },
  completada:   { texto: 'Completada', icono: '✓' },
};

async function cargar() {
  let datos;
  try {
    datos = await api('/api/mi-proyecto');
  } catch (error) {
    if (error.estado === 401) { location.href = '/'; return; }
    pagina.replaceChildren(el('p', { class: 'mensaje-error' }, error.message));
    return;
  }

  mostrarQuien(document.getElementById('quien'), datos.equipo, datos.estudiante);
  montarBitacora({ equipo: datos.equipo });
  document.title = `${datos.proyecto.nombre} · Guías STEAM`;

  const completadas = datos.guias.filter((g) => g.estado === 'completada').length;
  const porcentaje = datos.guias.length ? Math.round((completadas / datos.guias.length) * 100) : 0;

  pagina.replaceChildren(
    el('div', { class: 'encabezado-proyecto' },
      datos.proyecto.nivel ? el('span', { class: 'etiqueta-nivel' }, `Nivel ${datos.proyecto.nivel}`) : null,
      el('h1', {}, datos.proyecto.nombre),
    ),
    el('div', { class: 'resumen-avance' },
      el('p', {}, `${datos.equipo}: ${completadas} de ${datos.guias.length} guías completadas`),
      el('div', { class: 'barra', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(porcentaje) },
        el('div', { class: 'barra-relleno', style: `width:${porcentaje}%` })),
    ),
    el('ul', { class: 'lista-guias' }, datos.guias.map(tarjetaGuia)),
    seccionArchivos,
  );
  cargarArchivos();
  if (location.hash === '#archivos') seccionArchivos.scrollIntoView();
}

// ------------------------------------------------------------
// Archivos del equipo: lo que subieron en cualquier guía (.blend, .ino…),
// para descargarlo en la computadora que les toque hoy
// ------------------------------------------------------------
const listaArchivos = el('div', {}, el('p', { class: 'archivo-ayuda' }, 'Cargando…'));
const seccionArchivos = el('section', { class: 'seccion-archivos', id: 'archivos' },
  el('h2', {}, '💾 Archivos del equipo'),
  el('p', { class: 'archivo-ayuda' }, 'Lo que suben en el recuadro "Archivo de trabajo" de cada guía. Descárguenlo aquí para seguir desde cualquier computadora.'),
  listaArchivos);

async function cargarArchivos() {
  try {
    const { archivos } = await api('/api/mis-archivos');
    listaArchivos.replaceChildren(archivos.length
      ? listaArchivosEquipo(archivos)
      : el('p', { class: 'archivo-ayuda' }, 'Todavía no han subido archivos. Pueden hacerlo desde la Bitácora de cada guía.'));
  } catch (error) {
    listaArchivos.replaceChildren(el('p', { class: 'mensaje-error' }, error.message));
  }
}

function tarjetaGuia(guia) {
  const estado = ESTADOS[guia.estado] || ESTADOS.disponible;
  const abrible = !['bloqueada', 'proximamente'].includes(guia.estado);
  const contenido = [
    el('span', { class: 'numero', 'aria-hidden': 'true' }, guia.numero),
    el('span', { class: 'info' },
      guia.sabado || guia.sesion
        ? el('span', { class: 'sesion-guia' }, [guia.sabado ? `Sábado ${guia.sabado}` : '', guia.sesion].filter(Boolean).join(' · '))
        : null,
      el('strong', {}, guia.titulo),
      el('span', { class: `estado estado-${guia.estado}` }, el('span', { 'aria-hidden': 'true' }, estado.icono), estado.texto),
    ),
  ];
  const clase = `tarjeta-guia ${abrible ? '' : 'bloqueada'} ${guia.estado === 'completada' ? 'completada' : ''}`;
  return el('li', {}, abrible
    ? el('a', { class: clase, href: `/guia/${guia.numero}` }, contenido)
    : el('div', { class: clase, 'aria-disabled': 'true' }, contenido));
}

cargar();
