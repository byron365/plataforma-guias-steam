// ============================================================
// Panel del docente
//   Avance · Equipos · Guías · Compartir · Exportar
//   + visor de una guía con las respuestas de un equipo y las notas del docente
// ============================================================
import { api, el, local } from './comun.js';
import { prepararCodigo, cargarAnimaciones } from './piezas-guia.js';
import { montarFotosLectura } from './fotos.js';
import { montarArchivosLectura, listaArchivosEquipo } from './archivos-equipo.js';

const pagina = document.getElementById('pagina');
const cabeceraExtra = document.getElementById('cabecera-extra');
const indicador = document.getElementById('indicador');

let datos = null;            // resumen que manda el servidor
let claveInsegura = false;
let proyectoActual = local.leer('docente-proyecto');
let vistaActual = local.leer('docente-vista') || 'avance';
let refresco = null;
let contenedorVista = null;

const VISTAS = [
  ['avance', 'Avance'],
  ['equipos', 'Equipos'],
  ['guias', 'Guías'],
  ['compartir', 'Compartir'],
  ['exportar', 'Exportar'],
];

const ESTADOS = {
  bloqueada: { texto: 'Bloqueada', icono: '🔒' },
  proximamente: { texto: 'Sin archivo', icono: '—' },
  disponible: { texto: 'Disponible', icono: '○' },
  en_progreso: { texto: 'En progreso', icono: '✎' },
  completada: { texto: 'Completada', icono: '✓' },
};

// ============================================================
// Utilidades
// ============================================================
let ocultarAviso = null;
function aviso(texto, tipo = 'ok') {
  indicador.textContent = texto;
  indicador.className = `indicador-guardado visible ${tipo}`;
  clearTimeout(ocultarAviso);
  ocultarAviso = setTimeout(() => indicador.classList.remove('visible'), 2600);
}

// "2026-10-06 19:36:07" → "06/10 19:36"
function fechaCorta(texto) {
  if (!texto) return '';
  const m = String(texto).match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
  return m ? `${m[3]}/${m[2]} ${m[4]}:${m[5]}` : texto;
}

// Ventana de confirmación propia (no usa window.confirm)
function confirmar(texto, textoBoton = 'Sí, continuar') {
  const ventana = document.getElementById('confirmar');
  document.getElementById('confirmar-texto').textContent = texto;
  document.getElementById('confirmar-si').textContent = textoBoton;
  ventana.showModal();
  return new Promise((resolver) => {
    const responder = (e) => {
      const boton = e.target.closest('button');
      if (!boton) return;
      ventana.removeEventListener('click', responder);
      ventana.close();
      resolver(boton.value === 'si');
    };
    ventana.addEventListener('click', responder);
    ventana.addEventListener('cancel', () => resolver(false), { once: true });
  });
}

// Ejecuta una acción del panel, muestra el resultado y recarga el resumen
async function accion(funcion, mensajeOk) {
  try {
    await funcion();
    if (mensajeOk) aviso(mensajeOk);
    await cargarResumen();
    return true;
  } catch (error) {
    if (error.estado === 401) { mostrarEntrada(); return false; }
    aviso(error.message, 'error');
    return false;
  }
}

const proyecto = () => datos.proyectos.find((p) => p.id === proyectoActual);
const equiposDelProyecto = () => datos.equipos.filter((e) => e.proyecto === proyectoActual);

// ============================================================
// Entrada con contraseña
// ============================================================
function mostrarEntrada(mensaje) {
  clearInterval(refresco);
  cabeceraExtra.replaceChildren();
  const campo = el('input', { type: 'password', id: 'clave', autocomplete: 'current-password', required: true });
  const error = el('p', { class: 'mensaje-error', role: 'alert', hidden: !mensaje }, mensaje || '');
  const boton = el('button', { class: 'boton', type: 'submit' }, 'Entrar');
  pagina.replaceChildren(el('section', { class: 'entrada-docente' },
    el('h1', {}, 'Panel del docente'),
    el('form', {
      onsubmit: async (e) => {
        e.preventDefault();
        boton.disabled = true;
        try {
          await api('/api/docente/entrar', { body: { clave: campo.value } });
          iniciar();
        } catch (err) {
          error.textContent = err.message;
          error.hidden = false;
          boton.disabled = false;
          campo.select();
        }
      },
    },
    el('div', { class: 'campo-nombre' }, el('label', { for: 'clave' }, 'Contraseña (DOCENTE_CLAVE del archivo .env)'), campo),
    el('div', { class: 'ventana-acciones' }, boton),
    error),
  ));
  campo.focus();
}

// ============================================================
// Arranque
// ============================================================
async function iniciar() {
  try {
    const sesion = await api('/api/docente/sesion');
    claveInsegura = sesion.claveInsegura;
    await cargarResumen();
    mostrarPanel();
  } catch (error) {
    if (error.estado === 401) mostrarEntrada();
    else pagina.replaceChildren(el('p', { class: 'mensaje-error' }, error.message));
  }
}

async function cargarResumen() {
  datos = await api('/api/docente/resumen');
  if (!datos.proyectos.some((p) => p.id === proyectoActual)) {
    proyectoActual = datos.proyectos[0] ? datos.proyectos[0].id : null;
  }
}

function mostrarPanel() {
  // Cabecera: proyecto y salir
  const selector = el('select', { class: 'selector-proyecto', 'aria-label': 'Proyecto' },
    datos.proyectos.map((p) => el('option', { value: p.id, selected: p.id === proyectoActual }, p.nombre)));
  selector.addEventListener('change', () => {
    proyectoActual = selector.value;
    local.guardar('docente-proyecto', proyectoActual);
    dibujarVista();
  });
  cabeceraExtra.replaceChildren(...[
    datos.proyectos.length > 1 ? selector : null,
    el('button', {
      class: 'boton boton-oscuro', type: 'button',
      onclick: async () => { await api('/api/docente/salir', { body: {} }).catch(() => {}); mostrarEntrada(); },
    }, 'Salir'),
  ].filter(Boolean));

  const pestanas = el('nav', { class: 'pestanas', 'aria-label': 'Secciones del panel' },
    VISTAS.map(([id, texto]) => el('button', {
      type: 'button', class: 'pestana', 'data-vista': id,
      onclick: () => { vistaActual = id; local.guardar('docente-vista', id); dibujarVista(); },
    }, texto)));

  contenedorVista = el('div', { class: 'vista' });
  pagina.replaceChildren(...[
    claveInsegura ? el('p', { class: 'aviso-panel' },
      '⚠ Estás usando la contraseña de ejemplo. Cámbiala en el archivo .env (DOCENTE_CLAVE) y reinicia el servidor.') : null,
    pestanas, contenedorVista].filter(Boolean));
  dibujarVista();
}

function dibujarVista() {
  clearInterval(refresco);
  document.querySelectorAll('.pestana').forEach((p) => {
    const activa = p.dataset.vista === vistaActual;
    p.classList.toggle('activa', activa);
    if (activa) p.setAttribute('aria-current', 'page'); else p.removeAttribute('aria-current');
  });
  if (!proyectoActual && vistaActual !== 'guias' && vistaActual !== 'compartir') {
    contenedorVista.replaceChildren(el('p', {}, 'Todavía no hay proyectos. Crea uno en la pestaña Guías.'));
    return;
  }
  ({ avance: vistaAvance, equipos: vistaEquipos, guias: vistaGuias, compartir: vistaCompartir, exportar: vistaExportar }[vistaActual] || vistaAvance)();
}

// ============================================================
// Avance: equipos en filas, guías en columnas
// ============================================================
function vistaAvance() {
  const p = proyecto();
  const equipos = equiposDelProyecto();
  const actualizado = el('span', { class: 'texto-suave' });

  if (equipos.length === 0) {
    contenedorVista.replaceChildren(el('div', { class: 'vacio' },
      el('p', {}, `Todavía no hay equipos en ${p.nombre}.`),
      el('button', { class: 'boton', type: 'button', onclick: () => { vistaActual = 'equipos'; dibujarVista(); } }, 'Crear equipos')));
    return;
  }

  const dibujarTabla = () => {
    const eqs = equiposDelProyecto();
    const tabla = el('table', { class: 'tabla-avance' },
      el('thead', {}, el('tr', {},
        el('th', { scope: 'col', class: 'col-equipo' }, 'Equipo'),
        p.guias.map((g) => el('th', { scope: 'col', title: `${g.titulo}${g.sabado ? ` · Sábado ${g.sabado}` : ''}` },
          el('span', { class: 'num-guia' }, g.numero),
          p.desbloqueadas.includes(g.numero) ? null : el('span', { class: 'candado', 'aria-label': 'bloqueada para el proyecto' }, '🔒'))),
        el('th', { scope: 'col' }, '✓'))),
      el('tbody', {}, eqs.map((e) => el('tr', {},
        el('th', { scope: 'row', class: 'col-equipo' },
          el('strong', {}, e.nombre),
          el('small', {}, e.estudiantes.length ? e.estudiantes.join(', ') : 'Nadie ha entrado'),
          e.ultimaActividad ? el('small', {}, `Última respuesta: ${fechaCorta(e.ultimaActividad)}`) : null),
        p.guias.map((guia) => {
          // Una versión corta (por ejemplo "Práctica") no tiene todas las guías del proyecto
          const g = e.guias.find((x) => x.numero === guia.numero);
          if (!g) return el('td', { class: 'celda-no-aplica', title: `${e.nombre} · Guía ${guia.numero}: no está en su versión` }, '—');
          const info = ESTADOS[g.estado] || ESTADOS.bloqueada;
          return el('td', {}, el('button', {
            type: 'button', class: `celda-estado estado-${g.estado}`,
            disabled: !guia || !guia.existe,
            title: `${e.nombre} · Guía ${g.numero}: ${info.texto}${g.respuestas ? ` · ${g.respuestas} respuestas` : ''}`,
            'aria-label': `${e.nombre}, guía ${g.numero}: ${info.texto}`,
            onclick: () => abrirVisor(p.id, g.numero, e.id),
          }, el('span', { 'aria-hidden': 'true' }, info.icono), g.respuestas ? el('small', {}, g.respuestas) : null));
        }),
        el('td', { class: 'total-completadas' }, `${e.guias.filter((g) => g.estado === 'completada').length}/${e.guias.length}`),
      ))),
    );
    return tabla;
  };

  const contenedorTabla = el('div', { class: 'tabla-avance-contenedor' }, dibujarTabla());
  const marcarHora = () => { actualizado.textContent = `Actualizado a las ${new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} · se actualiza solo cada 15 s`; };
  marcarHora();

  contenedorVista.replaceChildren(
    el('div', { class: 'encabezado-vista' },
      el('h2', {}, `Avance · ${p.nombre}`), actualizado),
    el('div', { class: 'leyenda' }, Object.entries(ESTADOS).map(([clave, info]) =>
      el('span', { class: `leyenda-item estado-${clave}` }, el('span', { class: 'leyenda-muestra' }, info.icono), info.texto)),
    el('span', { class: 'leyenda-item' }, 'El número pequeño = campos respondidos. Toca una celda para ver las respuestas.')),
    contenedorTabla,
  );

  refresco = setInterval(async () => {
    try {
      await cargarResumen();
      if (vistaActual === 'avance' && contenedorTabla.isConnected) {
        contenedorTabla.replaceChildren(dibujarTabla());
        marcarHora();
      }
    } catch { /* sin conexión: se intenta en el siguiente ciclo */ }
  }, 15000);
}

// ============================================================
// Equipos
// ============================================================
const pinAlAzar = () => String(Math.floor(Math.random() * 10000)).padStart(4, '0');

function vistaEquipos() {
  const p = proyecto();
  const nombre = el('input', { type: 'text', id: 'nuevo-nombre', maxlength: '40', required: true, placeholder: 'Ej.: Los Ingenieros' });
  const pin = el('input', { type: 'text', id: 'nuevo-pin', inputmode: 'numeric', pattern: '\\d{4}', maxlength: '4', required: true, value: pinAlAzar(), class: 'campo-pin' });

  const formulario = el('form', {
    class: 'tarjeta-panel form-equipo',
    onsubmit: async (e) => {
      e.preventDefault();
      const ok = await accion(() => api('/api/docente/equipos', { body: { proyecto: p.id, nombre: nombre.value, pin: pin.value } }),
        `Equipo "${nombre.value.trim()}" creado.`);
      if (ok) { vistaEquipos(); document.getElementById('nuevo-nombre').focus(); }
    },
  },
  el('h3', {}, `Nuevo equipo en ${p.nombre}`),
  el('div', { class: 'fila-campos' },
    el('label', { class: 'campo' }, 'Nombre del equipo', nombre),
    el('label', { class: 'campo' }, 'PIN (4 números)',
      el('span', { class: 'pin-con-boton' }, pin,
        el('button', { type: 'button', class: 'anim-boton', title: 'Otro PIN al azar', onclick: () => { pin.value = pinAlAzar(); } }, '🎲'))),
    el('button', { class: 'boton', type: 'submit' }, 'Crear equipo')));

  const equipos = equiposDelProyecto();
  contenedorVista.replaceChildren(
    el('div', { class: 'encabezado-vista' }, el('h2', {}, `Equipos · ${p.nombre}`),
      el('span', { class: 'texto-suave' }, `${equipos.length} equipo${equipos.length === 1 ? '' : 's'}`)),
    formulario,
    el('div', { class: 'lista-equipos-panel' }, equipos.map((e) => tarjetaEquipo(e, p))),
  );
}

function tarjetaEquipo(equipo, p) {
  const tarjeta = el('article', { class: 'tarjeta-panel tarjeta-equipo' });

  const dibujar = (editando = false) => {
    const contenido = [];
    if (editando) {
      const nombre = el('input', { type: 'text', value: equipo.nombre, maxlength: '40', required: true });
      const pin = el('input', { type: 'text', value: equipo.pin, inputmode: 'numeric', pattern: '\\d{4}', maxlength: '4', required: true, class: 'campo-pin' });
      contenido.push(el('form', {
        onsubmit: async (e) => {
          e.preventDefault();
          const cambiaPin = pin.value !== equipo.pin;
          const ok = await accion(() => api(`/api/docente/equipos/${equipo.id}`, { method: 'PUT', body: { nombre: nombre.value, pin: pin.value } }),
            cambiaPin ? 'Guardado. Los dispositivos del equipo deberán entrar con el PIN nuevo.' : 'Guardado.');
          if (ok) vistaEquipos();
        },
      },
      el('div', { class: 'fila-campos' },
        el('label', { class: 'campo' }, 'Nombre', nombre),
        el('label', { class: 'campo' }, 'PIN', pin)),
      el('div', { class: 'acciones-tarjeta' },
        el('button', { class: 'boton boton-chico', type: 'submit' }, 'Guardar'),
        el('button', { class: 'boton boton-chico boton-secundario', type: 'button', onclick: () => dibujar(false) }, 'Cancelar'))));
    } else {
      const completadas = equipo.guias.filter((g) => g.estado === 'completada').length;
      contenido.push(
        el('div', { class: 'tarjeta-equipo-cabecera' },
          el('h3', {}, equipo.nombre),
          el('span', { class: 'pin-grande', title: 'PIN del equipo' }, el('small', {}, 'PIN '), equipo.pin)),
        el('p', { class: 'texto-suave' },
          equipo.estudiantes.length ? `Han entrado: ${equipo.estudiantes.join(', ')}` : 'Nadie ha entrado todavía.',
          el('br'), `${completadas} de ${equipo.guias.length} guías completadas`,
          equipo.ultimaActividad ? ` · última respuesta ${fechaCorta(equipo.ultimaActividad)}` : ''),
        desbloqueosDelEquipo(equipo, p),
        versionDelEquipo(equipo, p),
        archivosDelEquipo(equipo, p),
        bitacoraDelEquipo(equipo),
        el('div', { class: 'acciones-tarjeta' },
          el('button', { class: 'boton boton-chico boton-secundario', type: 'button', onclick: () => dibujar(true) }, 'Editar nombre o PIN'),
          el('button', {
            class: 'boton boton-chico boton-secundario', type: 'button',
            onclick: async () => {
              if (!await confirmar(`Se borrarán TODAS las respuestas y el progreso de "${equipo.nombre}" en las ${equipo.guias.length} guías. Sus archivos de trabajo (.blend, .ino…) y su bitácora se conservan. No se puede deshacer.`, 'Reiniciar progreso')) return;
              if (await accion(() => api(`/api/docente/equipos/${equipo.id}/reiniciar`, { body: {} }), 'Progreso reiniciado.')) vistaEquipos();
            },
          }, 'Reiniciar progreso'),
          el('button', {
            class: 'boton boton-chico boton-peligro', type: 'button',
            onclick: async () => {
              if (!await confirmar(`Se borrará el equipo "${equipo.nombre}" con todas sus respuestas, fotos, archivos de trabajo y bitácora. No se puede deshacer.`, 'Borrar equipo')) return;
              if (await accion(() => api(`/api/docente/equipos/${equipo.id}`, { method: 'DELETE' }), 'Equipo borrado.')) vistaEquipos();
            },
          }, 'Borrar'),
        ),
      );
    }
    tarjeta.replaceChildren(...contenido);
  };
  dibujar(false);
  return tarjeta;
}

// Archivos de trabajo que subió el equipo (.blend, .ino…), plegados para no alargar la tarjeta
function archivosDelEquipo(equipo, p) {
  const archivos = equipo.archivos || [];
  if (!archivos.length) return el('p', { class: 'texto-suave' }, 'Archivos de trabajo: todavía no han subido ninguno.');
  const titulos = Object.fromEntries((p ? p.guias : []).map((g) => [g.numero, g.titulo]));
  return el('details', { class: 'archivos-panel' },
    el('summary', {}, `Archivos de trabajo (${archivos.length})`),
    listaArchivosEquipo(archivos, { titulos }));
}

// Versión de las guías del equipo (solo en proyectos con versiones, por ejemplo Blender o Tinkercad)
function versionDelEquipo(equipo, p) {
  const versiones = (p && p.versiones) || [];
  if (versiones.length < 2) return null;
  const actual = equipo.version || versiones[0].id;
  const conVersion = p.guias.filter((g) => (g.versiones || []).length).map((g) => g.numero);
  // Versiones cortas: cuántas guías tienen
  const cortas = versiones.filter((v) => v.guias).map((v) => `${v.nombre}: guías ${v.guias.join(', ')}`);
  const menu = el('select', { 'aria-label': `Versión de las guías de ${equipo.nombre}` },
    versiones.map((v) => el('option', { value: v.id, selected: v.id === actual }, v.nombre)));
  menu.addEventListener('change', async () => {
    const elegida = versiones.find((v) => v.id === menu.value);
    const ok = await accion(() => api(`/api/docente/equipos/${equipo.id}/version`, { method: 'PUT', body: { version: menu.value } }),
      `${equipo.nombre} ahora ve la versión ${elegida.nombre}. Sus respuestas se conservan.`);
    if (ok) equipo.version = menu.value === versiones[0].id ? '' : menu.value;
    else menu.value = actual;
  });
  return el('div', { class: 'version-equipo' },
    el('label', { class: 'campo-version' }, 'Versión de las guías ', menu),
    conVersion.length ? el('small', { class: 'texto-suave' }, `Cambia las guías ${conVersion.join(', ')}; las demás son iguales.`) : null,
    cortas.length ? el('small', { class: 'texto-suave' }, `${cortas.join(' · ')}.`) : null);
}

// Bitácora del equipo: sus notas, de la más nueva a la más vieja
function bitacoraDelEquipo(equipo) {
  const notas = equipo.bitacora || [];
  if (!notas.length) return el('p', { class: 'texto-suave' }, 'Bitácora: todavía no han escrito notas.');
  return el('details', { class: 'archivos-panel' },
    el('summary', {}, `Bitácora (${notas.length} ${notas.length === 1 ? 'nota' : 'notas'})`),
    el('div', { class: 'bitacora-docente' }, ...notas.map((n) => el('div', { class: 'bitacora-docente-nota' },
      el('p', { class: 'bitacora-meta' },
        el('strong', {}, n.guia ? `Guía ${n.guia}` : 'Proyecto'),
        ` · ${n.autor} · ${fechaCorta(n.creada)}`,
        n.editadoPor && n.editadoPor !== n.autor ? ` · editada por ${n.editadoPor}` : ''),
      el('p', { class: 'bitacora-docente-texto' }, n.texto)))));
}

// Guías desbloqueadas solo para este equipo (además de las de todo el proyecto)
function desbloqueosDelEquipo(equipo, p) {
  const propias = equipo.desbloqueosPropios.filter((n) => !p.desbloqueadas.includes(n)).sort((a, b) => a - b);
  const opciones = p.guias.filter((g) => !p.desbloqueadas.includes(g.numero) && !propias.includes(g.numero));
  const selector = el('select', { 'aria-label': 'Guía para desbloquear solo para este equipo' },
    el('option', { value: '' }, 'Desbloquear solo para este equipo…'),
    opciones.map((g) => el('option', { value: g.numero }, `Guía ${g.numero} · ${g.titulo}`)));
  selector.addEventListener('change', async () => {
    if (!selector.value) return;
    if (await accion(() => api('/api/docente/desbloqueos', { body: { proyecto: p.id, guias: [Number(selector.value)], equipoId: equipo.id, desbloquear: true } }),
      `Guía ${selector.value} desbloqueada para ${equipo.nombre}.`)) vistaEquipos();
  });
  return el('div', { class: 'desbloqueos-equipo' },
    propias.map((n) => el('span', { class: 'chip' }, `Guía ${n}`,
      el('button', {
        type: 'button', 'aria-label': `Volver a bloquear la guía ${n} para este equipo`, title: 'Volver a bloquear',
        onclick: async () => {
          if (await accion(() => api('/api/docente/desbloqueos', { body: { proyecto: p.id, guias: [n], equipoId: equipo.id, desbloquear: false } }),
            `Guía ${n} bloqueada otra vez para ${equipo.nombre}.`)) vistaEquipos();
        },
      }, '×'))),
    opciones.length ? selector : null);
}

// ============================================================
// Guías: desbloquear por proyecto, ver notas, crear proyecto
// ============================================================
function vistaGuias() {
  const p = proyecto();
  const contenido = [];
  if (p) {
    const equipos = equiposDelProyecto();
    const cambiar = (guias, desbloquear, mensaje) => accion(
      () => api('/api/docente/desbloqueos', { body: { proyecto: p.id, guias, desbloquear } }), mensaje).then((ok) => ok && vistaGuias());

    contenido.push(
      el('div', { class: 'encabezado-vista' }, el('h2', {}, `Guías · ${p.nombre}`),
        el('div', { class: 'anim-rapidos' },
          el('button', { class: 'anim-boton', type: 'button', onclick: () => cambiar(p.guias.map((g) => g.numero), true, 'Todas las guías desbloqueadas.') }, 'Desbloquear todas'),
          el('button', { class: 'anim-boton', type: 'button', onclick: () => cambiar(p.guias.map((g) => g.numero), false, 'Todas las guías bloqueadas.') }, 'Bloquear todas'))),
      el('p', { class: 'texto-suave' }, 'El interruptor desbloquea la guía para todos los equipos del proyecto. Para un solo equipo, usa la pestaña Equipos.'),
      el('ul', { class: 'lista-guias-panel' }, p.guias.map((g) => {
        const abierta = p.desbloqueadas.includes(g.numero);
        const completada = equipos.filter((e) => (e.guias.find((x) => x.numero === g.numero) || {}).estado === 'completada').length;
        const interruptor = el('button', {
          type: 'button', class: `interruptor${abierta ? ' activo' : ''}`, role: 'switch', 'aria-checked': String(abierta),
          'aria-label': `Guía ${g.numero} desbloqueada para todo el proyecto`,
          onclick: () => cambiar([g.numero], !abierta, `Guía ${g.numero} ${abierta ? 'bloqueada' : 'desbloqueada'}.`),
        }, el('span', { class: 'interruptor-bola', 'aria-hidden': 'true' }), el('span', { class: 'interruptor-texto' }, abierta ? 'Abierta' : 'Bloqueada'));
        return el('li', { class: `fila-guia${abierta ? ' abierta' : ''}` },
          el('span', { class: 'numero' }, g.numero),
          el('span', { class: 'info' },
            (g.sabado || g.sesion) ? el('span', { class: 'sesion-guia' }, [g.sabado ? `Sábado ${g.sabado}` : '', g.sesion].filter(Boolean).join(' · ')) : null,
            el('strong', {}, g.titulo),
            g.existe ? el('small', {}, `${completada} de ${equipos.length} equipos la completaron`) : el('small', { class: 'falta-archivo' }, 'Falta el archivo .md'),
            (g.versiones || []).length ? el('small', { class: 'marca-version' }, `También en versión ${g.versiones.map((id) => ((p.versiones || []).find((v) => v.id === id) || { nombre: id }).nombre).join(', ')}`) : null),
          interruptor,
          el('button', { class: 'boton boton-chico boton-secundario', type: 'button', disabled: !g.existe, onclick: () => abrirVisor(p.id, g.numero, null) }, 'Ver guía y notas'));
      })),
    );
  }
  contenido.push(formularioProyecto());
  contenedorVista.replaceChildren(...contenido);
}

function formularioProyecto() {
  const nombre = el('input', { type: 'text', maxlength: '60', required: true, placeholder: 'Ej.: Puente levadizo automatizado' });
  const nivel = el('input', { type: 'text', maxlength: '30', placeholder: 'Ej.: Básico' });
  const descripcion = el('input', { type: 'text', maxlength: '160', placeholder: 'Una frase para la tarjeta de inicio' });
  const total = el('input', { type: 'number', min: '1', max: '40', value: '14', required: true });
  return el('details', { class: 'tarjeta-panel crear-proyecto' },
    el('summary', {}, '➕ Crear un proyecto nuevo'),
    el('p', { class: 'texto-suave' }, 'Se crea la carpeta en contenido/ con su proyecto.json y la carpeta imagenes/. Después copia ahí las guías (guia-01.md, guia-02.md…). Ver COMO_AGREGAR_PROYECTOS.md.'),
    el('form', {
      onsubmit: async (e) => {
        e.preventDefault();
        let creado = null;
        const ok = await accion(async () => { creado = await api('/api/docente/proyectos', { body: { nombre: nombre.value, nivel: nivel.value, descripcion: descripcion.value, totalGuias: total.value } }); },
          'Proyecto creado.');
        if (ok && creado) { proyectoActual = creado.id; local.guardar('docente-proyecto', creado.id); mostrarPanel(); aviso(`Proyecto creado en contenido/${creado.id}/`); }
      },
    },
    el('div', { class: 'fila-campos' },
      el('label', { class: 'campo campo-ancho' }, 'Nombre', nombre),
      el('label', { class: 'campo' }, 'Nivel', nivel),
      el('label', { class: 'campo campo-corto' }, 'Nº de guías', total)),
    el('div', { class: 'fila-campos' }, el('label', { class: 'campo campo-ancho' }, 'Descripción', descripcion)),
    el('button', { class: 'boton', type: 'submit' }, 'Crear proyecto')));
}

// ============================================================
// Compartir: dirección y código QR
// ============================================================
function vistaCompartir() {
  const { red } = datos;
  contenedorVista.replaceChildren(
    el('div', { class: 'encabezado-vista' }, el('h2', {}, 'Compartir con los estudiantes')),
    el('div', { class: 'compartir' },
      el('div', { class: 'qr-grande', html: red.qr, role: 'img', 'aria-label': `Código QR de ${red.principal}` }),
      el('div', {},
        el('p', {}, 'Los estudiantes deben estar en el mismo Wi-Fi que esta computadora. Que escaneen el código o escriban:'),
        el('p', { class: 'url-grande' }, red.principal),
        red.direcciones.length > 1 ? el('div', { class: 'texto-suave' },
          el('p', {}, 'Otras direcciones de esta PC (si la de arriba no funciona):'),
          el('ul', {}, red.direcciones.slice(1).map((d) => el('li', {}, `${d.url} (${d.nombre})`)))) : null,
        red.direcciones.length === 0 ? el('p', { class: 'mensaje-error' }, 'No se encontró una red. Conecta la PC al Wi-Fi del aula.') : null,
        el('div', { class: 'anim-rapidos alinear-izq' },
          el('button', { class: 'boton', type: 'button', onclick: pantallaQR }, 'Mostrar en pantalla completa')),
        el('p', { class: 'texto-suave' }, 'Si en los celulares no carga, revisa la sección "Permitir el puerto en el firewall" del archivo LEEME.md.'),
      )),
  );
}

// QR enorme para proyectarlo en el aula
function pantallaQR() {
  const capa = el('div', { class: 'qr-pantalla', role: 'dialog', 'aria-label': 'Código QR para entrar', tabindex: '-1' },
    el('div', { class: 'qr-pantalla-caja' },
      el('div', { class: 'qr-grande', html: datos.red.qr }),
      el('p', { class: 'url-grande' }, datos.red.principal),
      el('button', { class: 'boton', type: 'button', onclick: () => capa.remove() }, 'Cerrar')));
  capa.addEventListener('keydown', (e) => { if (e.key === 'Escape') capa.remove(); });
  document.body.append(capa);
  capa.focus();
}

// ============================================================
// Exportar
// ============================================================
function vistaExportar() {
  contenedorVista.replaceChildren(
    el('div', { class: 'encabezado-vista' }, el('h2', {}, 'Exportar a CSV')),
    el('p', {}, 'Los archivos se abren con Excel o Google Sheets. Incluyen todos los proyectos y equipos.'),
    el('div', { class: 'exportar' },
      el('a', { class: 'tarjeta-panel tarjeta-exportar', href: '/api/docente/exportar/respuestas.csv', download: '' },
        el('strong', {}, '📄 Todas las respuestas'),
        el('span', {}, 'Una fila por respuesta: equipo, guía, pregunta, estudiante, respuesta y fecha.')),
      el('a', { class: 'tarjeta-panel tarjeta-exportar', href: '/api/docente/exportar/avance.csv', download: '' },
        el('strong', {}, '📊 Avance de los equipos'),
        el('span', {}, 'Una fila por equipo con el estado de cada guía.'))),
    seccionRespaldos(),
  );
}

// Respaldos de la base de datos: lista y botón para hacer uno ahora
function seccionRespaldos() {
  const lista = el('div', { class: 'texto-suave' }, 'Cargando respaldos…');
  const boton = el('button', { class: 'boton', type: 'button' }, '💾 Hacer un respaldo ahora');
  const tamano = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

  const cargar = async () => {
    try {
      const { carpeta, respaldos } = await api('/api/docente/respaldos');
      lista.replaceChildren(...[
        el('p', {}, `Se guardan en: `, el('code', {}, carpeta), ` · se conservan los 30 más recientes.`),
        respaldos.length
          ? el('ul', { class: 'lista-respaldos' }, respaldos.slice(0, 10).map((r) => el('li', {},
            el('code', {}, r.nombre), ` · ${tamano(r.tamano)} · ${new Date(r.fecha).toLocaleString('es')}`)))
          : el('p', {}, 'Todavía no hay respaldos.'),
        respaldos.length > 10 ? el('p', {}, `… y ${respaldos.length - 10} más.`) : null,
      ].filter(Boolean));
    } catch (error) {
      lista.textContent = error.message;
    }
  };
  boton.addEventListener('click', async () => {
    boton.disabled = true;
    try {
      const { nombre } = await api('/api/docente/respaldos', { body: {} });
      aviso(`Respaldo guardado: ${nombre}`);
      await cargar();
    } catch (error) {
      aviso(error.message, 'error');
    }
    boton.disabled = false;
  });
  cargar();

  return el('section', { class: 'tarjeta-panel respaldos' },
    el('h3', {}, 'Respaldos de la base de datos'),
    el('p', {}, 'Cada día se guarda una copia automática de todas las respuestas y el avance. Las fotos, videos y archivos de trabajo (carpeta ',
      el('code', {}, 'subidas/'), ') se copian cada hora a ', el('code', {}, 'respaldos/subidas/'), ' (solo los nuevos).'),
    el('div', { class: 'anim-rapidos alinear-izq' }, boton),
    lista,
    el('details', {},
      el('summary', {}, '¿Cómo restaurar un respaldo?'),
      el('ol', {},
        el('li', {}, 'Apaga el servidor (Ctrl + C).'),
        el('li', {}, 'En la carpeta datos/, mueve plataforma.db (y los archivos plataforma.db-wal y plataforma.db-shm, si existen) a otra carpeta por seguridad.'),
        el('li', {}, 'Copia el respaldo elegido a datos/ y cámbiale el nombre a plataforma.db.'),
        el('li', {}, 'Vuelve a arrancar con npm start.'),
        el('li', {}, 'Si también se perdieron fotos o archivos: copia el contenido de respaldos/subidas/ dentro de subidas/. Lo que se borró en los últimos 30 días está en respaldos/subidas-borradas/.'))),
  );
}

// ============================================================
// Visor: una guía con las respuestas de un equipo y las notas del docente
// ============================================================
async function abrirVisor(proyectoId, numero, equipoId, version = '') {
  clearInterval(refresco);
  contenedorVista.replaceChildren(el('p', { class: 'cargando' }, 'Cargando guía…'));
  let guia;
  try {
    guia = await api(`/api/docente/guias/${proyectoId}/${numero}${equipoId ? `?equipo=${equipoId}` : (version ? `?version=${version}` : '')}`);
  } catch (error) {
    if (error.estado === 401) return mostrarEntrada();
    contenedorVista.replaceChildren(el('p', { class: 'mensaje-error' }, error.message),
      el('button', { class: 'boton boton-secundario', type: 'button', onclick: dibujarVista }, '← Volver'));
    return;
  }
  const p = datos.proyectos.find((x) => x.id === proyectoId);
  const equipos = datos.equipos.filter((e) => e.proyecto === proyectoId);
  const existentes = p.guias.filter((g) => g.existe).map((g) => g.numero);
  const posicion = existentes.indexOf(numero);

  // Cambiar de equipo o de guía sin salir del visor
  const selectorEquipo = el('select', { 'aria-label': 'Equipo' },
    el('option', { value: '' }, 'Solo la guía y las notas'),
    equipos.map((e) => el('option', { value: e.id, selected: e.id === equipoId }, e.nombre)));
  selectorEquipo.addEventListener('change', () => abrirVisor(proyectoId, numero, Number(selectorEquipo.value) || null, version));

  // Versión de la guía: con equipo se ve la suya; sin equipo se puede elegir
  const versiones = p.versiones || [];
  const infoGuia = p.guias.find((g) => g.numero === numero) || {};
  let selectorVersion = null;
  if (versiones.length > 1 && (infoGuia.versiones || []).length) {
    const actual = guia.version || versiones[0].id;
    selectorVersion = el('select', { 'aria-label': 'Versión de la guía', disabled: Boolean(equipoId), title: equipoId ? 'Se muestra la versión que usa este equipo' : '' },
      versiones.map((v) => el('option', { value: v.id, selected: v.id === actual }, `Versión ${v.nombre}`)));
    selectorVersion.addEventListener('change', () => abrirVisor(proyectoId, numero, null, selectorVersion.value === versiones[0].id ? '' : selectorVersion.value));
  }

  const soloNotas = el('input', { type: 'checkbox' });
  const cuerpo = el('div', { class: 'visor-cuerpo' });
  soloNotas.addEventListener('change', () => cuerpo.classList.toggle('solo-notas', soloNotas.checked));

  const info = ESTADOS[guia.estado];
  const acciones = [];
  if (guia.equipo) {
    if (guia.estado === 'bloqueada') {
      acciones.push(el('button', {
        class: 'boton boton-chico', type: 'button',
        onclick: async () => {
          if (await accion(() => api('/api/docente/desbloqueos', { body: { proyecto: proyectoId, guias: [numero], equipoId: guia.equipo.id, desbloquear: true } }),
            `Guía ${numero} desbloqueada para ${guia.equipo.nombre}.`)) abrirVisor(proyectoId, numero, equipoId);
        },
      }, 'Desbloquear solo para este equipo'));
    }
    acciones.push(el('button', {
      class: 'boton boton-chico boton-peligro', type: 'button',
      onclick: async () => {
        if (!await confirmar(`Se borrarán las respuestas de "${guia.equipo.nombre}" en la Guía ${numero} y volverá a empezarla. No se puede deshacer.`, 'Reiniciar esta guía')) return;
        if (await accion(() => api(`/api/docente/equipos/${guia.equipo.id}/reiniciar`, { body: { guia: numero } }), 'Guía reiniciada para el equipo.')) {
          abrirVisor(proyectoId, numero, equipoId);
        }
      },
    }, 'Reiniciar esta guía'));
  }

  contenedorVista.replaceChildren(
    el('div', { class: 'visor-barra' },
      el('button', { class: 'boton boton-chico boton-secundario', type: 'button', onclick: dibujarVista }, '← Volver'),
      el('button', { class: 'anim-boton', type: 'button', disabled: posicion <= 0, onclick: () => abrirVisor(proyectoId, existentes[posicion - 1], equipoId, version) }, '‹ Guía anterior'),
      el('button', { class: 'anim-boton', type: 'button', disabled: posicion < 0 || posicion >= existentes.length - 1, onclick: () => abrirVisor(proyectoId, existentes[posicion + 1], equipoId, version) }, 'Guía siguiente ›'),
      selectorEquipo,
      selectorVersion,
      el('label', { class: 'casilla-simple' }, soloNotas, ' Solo notas del docente')),
    el('header', { class: 'visor-cabecera' },
      el('p', { class: 'portada-guia-datos' }, `Guía ${guia.numero}`, guia.sabado ? ` · Sábado ${guia.sabado}` : '', guia.sesion ? ` · ${guia.sesion}` : ''),
      el('h2', {}, guia.titulo),
      guia.equipo ? el('p', { class: 'visor-equipo' },
        el('strong', {}, guia.equipo.nombre), ' · ',
        el('span', { class: `estado estado-${guia.estado}` }, info.icono, ' ', info.texto),
        guia.completadaPor ? ` · completada por ${guia.completadaPor.estudiante} (${fechaCorta(guia.completadaPor.fecha)})` : '') : null,
      acciones.length ? el('div', { class: 'acciones-tarjeta' }, acciones) : null),
    cuerpo,
  );

  // Partes con sus notas
  guia.partes.forEach((parte) => {
    const contenido = el('div', { class: 'contenido-guia', html: parte.html });
    cuerpo.append(el('section', { class: `visor-parte${parte.notas.length ? ' con-notas' : ''}` },
      el('h3', {}, parte.titulo, parte.tiempo ? el('span', { class: 'tiempo' }, `⏱ ${parte.tiempo} min`) : null),
      parte.notas.map((nota) => el('aside', { class: 'nota-docente' }, el('strong', {}, '📝 Nota para el docente'), el('div', { html: nota }))),
      contenido));
  });

  rellenarRespuestas(cuerpo, guia);
  montarFotosLectura(cuerpo, { fotos: guia.fotos, conEquipo: !!guia.equipo });
  montarArchivosLectura(cuerpo, { archivos: guia.archivos, conEquipo: !!guia.equipo });
  prepararCodigo(cuerpo);
  cargarAnimaciones(cuerpo, {
    respuestas: guia.respuestas || {},
    guia: numero,
    obtenerGuia: (n) => api(`/api/docente/guias/${proyectoId}/${n}${equipoId ? `?equipo=${equipoId}` : (version ? `?version=${version}` : '')}`),
  });
  window.scrollTo({ top: 0 });
}

// Pone las respuestas del equipo en los campos (solo lectura)
function rellenarRespuestas(raiz, guia) {
  const respuestas = guia.respuestas || {};
  const conEquipo = !!guia.equipo;
  const autor = (id) => {
    const a = guia.autores && guia.autores[id];
    return a ? el('div', { class: 'autor' }, `${a.estudiante} · ${fechaCorta(a.actualizado)}`) : null;
  };

  raiz.querySelectorAll('.respuesta[data-campo]').forEach((campo) => {
    const id = campo.dataset.campo;
    if (campo.hasAttribute('data-individual')) {
      const lista = (guia.individuales && guia.individuales[id]) || [];
      campo.replaceWith(el('div', { class: 'respuestas-individuales' },
        !conEquipo ? el('p', { class: 'sin-respuesta' }, 'Cada integrante responde por separado.')
          : lista.length ? lista.map((r) => el('div', { class: 'otra-respuesta' },
            el('strong', {}, `${r.estudiante}: `), String(r.valor), el('small', {}, ` · ${fechaCorta(r.actualizado)}`)))
            : el('p', { class: 'sin-respuesta' }, 'Nadie ha respondido todavía.')));
      return;
    }
    const valor = typeof respuestas[id] === 'string' ? respuestas[id] : '';
    campo.value = valor;
    campo.readOnly = true;
    campo.placeholder = conEquipo ? 'Sin respuesta' : '';
    campo.classList.toggle('sin-respuesta', conEquipo && !valor.trim());
    if (campo.tagName === 'TEXTAREA') {
      campo.rows = Math.max(2, valor.split('\n').length);
      const firma = autor(id);
      if (firma) campo.after(firma);
    }
  });

  raiz.querySelectorAll('.tabla-editable[data-campo]').forEach((tabla) => {
    const valor = respuestas[tabla.dataset.campo] || {};
    tabla.querySelectorAll('input[data-celda]').forEach((celda) => {
      celda.value = valor[celda.dataset.celda] || '';
      celda.readOnly = true;
    });
    const firma = autor(tabla.dataset.campo);
    if (firma) tabla.after(firma);
  });

  raiz.querySelectorAll('.checklist[data-campo]').forEach((lista) => {
    const valor = respuestas[lista.dataset.campo] || {};
    lista.querySelectorAll('input[data-item]').forEach((casilla) => {
      casilla.checked = valor[casilla.dataset.item] === true;
      casilla.disabled = true;
    });
  });

  raiz.querySelectorAll('.opciones[data-campo]').forEach((grupo) => {
    const valor = respuestas[grupo.dataset.campo];
    grupo.querySelectorAll('input[type="radio"]').forEach((boton) => {
      boton.checked = boton.value === valor;
      boton.disabled = true;
      boton.name = `visor-${boton.name}`; // que no choque con otro visor
    });
    if (conEquipo && !valor) grupo.append(el('p', { class: 'sin-respuesta' }, 'Sin respuesta'));
  });
}

iniciar();
