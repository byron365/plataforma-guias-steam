// ============================================================
// Guía interactiva: partes, autoguardado, tablas, casillas,
// código, animaciones y celebración al completar.
// ============================================================
import { api, el, mostrarQuien } from './comun.js';
import { prepararCodigo, cargarAnimaciones } from './piezas-guia.js';
import { montarFotosEditables } from './fotos.js';
import { montarArchivosEditables } from './archivos-equipo.js';
import { dividirEnPasos, mostrarPaso } from './pasos.js';
import { montarBitacora } from './bitacora.js';

const numeroGuia = parseInt(location.pathname.split('/').pop(), 10);
const pagina = document.getElementById('pagina');
const indicador = document.getElementById('indicador');

let guia = null;          // datos que manda el servidor
let parteActual = 0;
let pasoActual = 0;
let pasoAPaso = false;     // el proyecto muestra las partes paso por paso
let verTodo = false;       // "Ver toda la parte" (se recuerda en este navegador)
const pasosPorParte = [];  // cuántos pasos tiene cada parte
const respuestas = {};    // campo → valor (texto, tabla u objeto de casillas)

// ============================================================
// Carga
// ============================================================
async function cargar() {
  try {
    guia = await api(`/api/guias/${numeroGuia}`);
  } catch (error) {
    if (error.estado === 401) { location.href = '/'; return; }
    pagina.replaceChildren(
      el('p', { class: 'mensaje-error' }, error.message),
      el('p', {}, el('a', { href: '/proyecto' }, '← Volver a las guías')),
    );
    return;
  }

  Object.assign(respuestas, guia.respuestas);
  mostrarQuien(document.getElementById('quien'), guia.equipo, guia.estudiante);
  montarBitacora({ guia: guia.numero, equipo: guia.equipo });
  document.title = `Guía ${guia.numero} · ${guia.proyecto.nombre}`;
  document.getElementById('titulo-guia').textContent = `Guía ${guia.numero} · ${guia.titulo}`;
  document.getElementById('barra-guia').hidden = false;

  dibujarPartes();
  conectarCampos();
  montarFotosEditables(pagina, { fotos: guia.fotos, numeroGuia });
  montarArchivosEditables(pagina, { archivos: guia.archivos, numeroGuia });
  prepararCodigo(pagina);
  cargarAnimaciones(pagina, {
    respuestas,
    guia: numeroGuia,
    // Para animaciones que usan una tabla de otra guía (por ejemplo, la gráfica de la guía 7 con la tabla de la 6)
    obtenerGuia: (n) => api(`/api/guias/${n}`),
  });

  // Volver a donde se quedaron: primero el enlace (#parte-3-paso-2); si no, lo guardado del equipo
  const enlace = location.hash.match(/parte-(\d+)(?:-paso-(\d+))?/);
  if (enlace) irA(parseInt(enlace[1], 10) - 1, enlace[2] ? parseInt(enlace[2], 10) - 1 : 0, false);
  else if (pasoAPaso && guia.posicion) irA(guia.posicion.parte, guia.posicion.paso, false);
  else irA(0, 0, false);
}

// ============================================================
// Partes (pasos)
// ============================================================
function dibujarPartes() {
  const total = guia.partes.length;
  pasoAPaso = Boolean(guia.proyecto.pasoAPaso);
  try { verTodo = localStorage.getItem('guia-ver-todo') === '1'; } catch { verTodo = false; }

  document.getElementById('pasos').replaceChildren(...guia.partes.map((parte, i) =>
    el('button', {
      class: 'paso', type: 'button', title: parte.titulo,
      'aria-label': `Parte ${i + 1}: ${parte.titulo}`, onclick: () => irAParte(i),
    })));

  // Portada de la guía: número, sábado y sesión
  const portada = el('header', { class: 'portada-guia' },
    el('p', { class: 'portada-guia-datos' },
      `Guía ${guia.numero}`,
      guia.sabado ? ` · Sábado ${guia.sabado}` : '',
      guia.sesion ? ` · ${guia.sesion}` : ''),
    el('h1', {}, guia.titulo));

  const secciones = guia.partes.map((parte, i) => {
    const contenido = el('div', { class: 'contenido-guia', html: parte.html });
    const esUltima = i === total - 1;
    pasosPorParte[i] = pasoAPaso ? dividirEnPasos(contenido) : 1;
    return el('section', { class: 'parte', 'data-parte': i, hidden: true, 'aria-labelledby': `titulo-parte-${i}` },
      el('div', { class: 'cabecera-parte' },
        el('div', { class: 'parte-de' }, `Parte ${i + 1} de ${total}`),
        el('h2', { id: `titulo-parte-${i}`, tabindex: '-1' }, parte.titulo),
        parte.tiempo ? el('span', { class: 'tiempo' }, '⏱ ', `${parte.tiempo} min sugeridos`) : null,
        pasosPorParte[i] > 1 ? cabeceraPasos(i) : null,
      ),
      contenido,
      esUltima ? cajaCompletar() : null,
      pasoAPaso ? navegacionPasos(i) : el('div', { class: 'navegacion-partes' },
        i > 0 ? el('button', { class: 'boton boton-secundario', type: 'button', onclick: () => irAParte(i - 1) }, '← Anterior') : el('span'),
        !esUltima ? el('button', { class: 'boton', type: 'button', onclick: () => irAParte(i + 1) }, 'Siguiente →') : null,
      ),
    );
  });

  pagina.replaceChildren(portada, ...secciones);
}

// "Paso 3 de 7" con un punto por paso (se puede tocar para saltar)
function cabeceraPasos(i) {
  return el('div', { class: 'pasos-parte' },
    el('span', { class: 'paso-de', 'aria-live': 'polite' }),
    el('div', { class: 'puntos-pasos' }, ...Array.from({ length: pasosPorParte[i] }, (_, k) =>
      el('button', {
        class: 'punto-paso', type: 'button', 'aria-label': `Ir al paso ${k + 1}`, onclick: () => irA(i, k),
      }))));
}

// Botones de abajo: paso anterior, ver toda la parte y paso siguiente
function navegacionPasos(i) {
  return el('div', { class: 'navegacion-partes navegacion-pasos' },
    el('button', { class: 'boton boton-secundario', type: 'button', 'data-nav': 'anterior', onclick: () => moverPaso(-1) }),
    pasosPorParte[i] > 1
      ? el('button', { class: 'boton boton-secundario boton-ver-todo', type: 'button', 'data-nav': 'todo', onclick: alternarVerTodo })
      : el('span'),
    el('button', { class: 'boton', type: 'button', 'data-nav': 'siguiente', onclick: () => moverPaso(1) }),
  );
}

// Avanza o retrocede un paso; en el borde de la parte cambia de parte
function moverPaso(direccion) {
  const enTodo = verTodo || pasosPorParte[parteActual] <= 1;
  if (direccion > 0) {
    if (!enTodo && pasoActual < pasosPorParte[parteActual] - 1) irA(parteActual, pasoActual + 1);
    else if (parteActual < guia.partes.length - 1) irA(parteActual + 1, 0);
  } else if (!enTodo && pasoActual > 0) {
    irA(parteActual, pasoActual - 1);
  } else if (parteActual > 0) {
    // Al volver a la parte anterior se llega a su último paso
    irA(parteActual - 1, verTodo ? 0 : pasosPorParte[parteActual - 1] - 1);
  }
}

function alternarVerTodo() {
  verTodo = !verTodo;
  try { localStorage.setItem('guia-ver-todo', verTodo ? '1' : '0'); } catch { /* sin almacenamiento: vale solo por ahora */ }
  irA(parteActual, pasoActual, false);
}

function irAParte(indice, desplazar = true) {
  irA(indice, 0, desplazar);
}

function irA(indiceParte, indicePaso, desplazar = true) {
  const total = guia.partes.length;
  parteActual = Math.max(0, Math.min(total - 1, Number(indiceParte) || 0));
  pasoActual = Math.max(0, Math.min(pasosPorParte[parteActual] - 1, Number(indicePaso) || 0));
  document.querySelectorAll('.parte').forEach((s, i) => { s.hidden = i !== parteActual; });
  if (pasoAPaso) actualizarPasos();
  document.querySelectorAll('.paso').forEach((p, i) => {
    p.classList.toggle('actual', i === parteActual);
    p.classList.toggle('visto', i < parteActual);
    if (i === parteActual) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current');
  });
  document.querySelectorAll(`.parte[data-parte="${parteActual}"] textarea.respuesta`).forEach(ajustarAltura);
  history.replaceState(null, '', pasoAPaso && pasosPorParte[parteActual] > 1 && !verTodo
    ? `#parte-${parteActual + 1}-paso-${pasoActual + 1}`
    : `#parte-${parteActual + 1}`);
  if (pasoAPaso) programarPosicion();
  if (desplazar) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById(`titulo-parte-${parteActual}`).focus({ preventScroll: true });
  }
}

// Muestra el paso actual de la parte visible y actualiza botones e indicador
function actualizarPasos() {
  const seccion = document.querySelector(`.parte[data-parte="${parteActual}"]`);
  const total = pasosPorParte[parteActual];
  const enTodo = verTodo || total <= 1;
  mostrarPaso(seccion.querySelector('.contenido-guia'), pasoActual, enTodo);

  const cabecera = seccion.querySelector('.pasos-parte');
  if (cabecera) {
    cabecera.querySelector('.paso-de').textContent = verTodo
      ? `Toda la parte (${total} pasos)`
      : `Paso ${pasoActual + 1} de ${total}`;
    cabecera.querySelectorAll('.punto-paso').forEach((p, k) => {
      p.classList.toggle('actual', !verTodo && k === pasoActual);
      p.classList.toggle('visto', !verTodo && k < pasoActual);
      if (!verTodo && k === pasoActual) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current');
    });
  }

  // La caja de "¡Terminamos la guía!" solo aparece en el último paso
  if (cajaFinal && seccion.contains(cajaFinal)) cajaFinal.classList.toggle('paso-oculto', !enTodo && pasoActual < total - 1);

  const pasoAnterior = !enTodo && pasoActual > 0;
  const pasoSiguiente = !enTodo && pasoActual < total - 1;
  const anterior = seccion.querySelector('[data-nav="anterior"]');
  const siguiente = seccion.querySelector('[data-nav="siguiente"]');
  const todo = seccion.querySelector('[data-nav="todo"]');
  anterior.textContent = pasoAnterior ? '← Paso anterior' : '← Parte anterior';
  anterior.hidden = !pasoAnterior && parteActual === 0;
  siguiente.textContent = pasoSiguiente ? 'Siguiente paso →' : 'Siguiente parte →';
  siguiente.hidden = !pasoSiguiente && parteActual === guia.partes.length - 1;
  if (todo) todo.textContent = verTodo ? 'Ver paso a paso' : 'Ver toda la parte';

  // Los cuadros de texto que acaban de aparecer toman su altura
  seccion.querySelectorAll('textarea.respuesta').forEach(ajustarAltura);
}

// Guarda en el servidor en qué parte y paso va el equipo (un segundo después de moverse)
let temporizadorPosicion = null;
function programarPosicion() {
  clearTimeout(temporizadorPosicion);
  const posicion = { parte: parteActual, paso: verTodo ? 0 : pasoActual };
  temporizadorPosicion = setTimeout(() => {
    api(`/api/guias/${numeroGuia}/posicion`, { body: posicion }).catch(() => {});
  }, 1000);
}

// ============================================================
// Campos: preguntas, líneas, tablas y casillas
// ============================================================
function conectarCampos() {
  // Textos (preguntas abiertas y líneas "______")
  pagina.querySelectorAll('.respuesta[data-campo]').forEach((campo) => {
    const id = campo.dataset.campo;
    if (typeof respuestas[id] === 'string') campo.value = respuestas[id];
    if (campo.tagName === 'TEXTAREA') ajustarAltura(campo);
    campo.addEventListener('input', () => {
      if (campo.tagName === 'TEXTAREA') ajustarAltura(campo);
      respuestas[id] = campo.value;
      programarGuardado(id);
    });
    mostrarAutor(campo, id);
  });

  // Tablas editables: el valor es { "fila-columna": "texto" }
  pagina.querySelectorAll('.tabla-editable[data-campo]').forEach((tabla) => {
    const id = tabla.dataset.campo;
    const valor = respuestas[id] && typeof respuestas[id] === 'object' ? respuestas[id] : {};
    respuestas[id] = valor;
    tabla.querySelectorAll('input[data-celda]').forEach((celda) => {
      celda.value = valor[celda.dataset.celda] || '';
      celda.addEventListener('input', () => {
        valor[celda.dataset.celda] = celda.value;
        programarGuardado(id);
      });
    });
  });

  // Opción única (:::opciones): el valor es el texto de la opción elegida
  pagina.querySelectorAll('.opciones[data-campo]').forEach((grupo) => {
    const id = grupo.dataset.campo;
    grupo.querySelectorAll('input[type="radio"]').forEach((boton) => {
      boton.checked = respuestas[id] === boton.value;
      boton.addEventListener('change', () => {
        respuestas[id] = boton.value;
        programarGuardado(id, 0);
      });
    });
  });

  // Casillas: el valor es { "0": true, "1": false, ... }
  pagina.querySelectorAll('.checklist[data-campo]').forEach((lista) => {
    const id = lista.dataset.campo;
    const valor = respuestas[id] && typeof respuestas[id] === 'object' ? respuestas[id] : {};
    respuestas[id] = valor;
    lista.querySelectorAll('input[data-item]').forEach((casilla) => {
      casilla.checked = valor[casilla.dataset.item] === true;
      casilla.addEventListener('change', () => {
        valor[casilla.dataset.item] = casilla.checked;
        programarGuardado(id, 0); // las casillas se guardan al instante
        actualizarCompletar();
      });
    });
  });
}

// El cuadro de texto crece mientras escriben
function ajustarAltura(area) {
  if (!area.offsetParent) return; // está en una parte oculta: se ajusta al mostrarla
  area.style.height = 'auto';
  area.style.height = `${area.scrollHeight + 4}px`;
}

// "Última edición: Ana" debajo de cada pregunta.
// En las preguntas individuales, en cambio, se muestran las respuestas de los compañeros.
function mostrarAutor(campo, id) {
  if (!campo.classList.contains('respuesta') || campo.tagName !== 'TEXTAREA') return;
  if (campo.hasAttribute('data-individual')) {
    const otras = (guia.individuales && guia.individuales[id]) || [];
    const nota = el('div', { class: 'autor' }, `Tu respuesta (${guia.estudiante}). Cada integrante responde la suya.`);
    campo.after(nota);
    if (otras.length) {
      nota.after(el('details', { class: 'otras-respuestas' },
        el('summary', {}, `Respuestas de mis compañeros (${otras.length})`),
        ...otras.map((o) => el('div', { class: 'otra-respuesta' }, el('strong', {}, `${o.estudiante}: `), String(o.valor)))));
    }
    return;
  }
  const autor = el('div', { class: 'autor' });
  campo.after(autor);
  campo._autor = autor;
  if (guia.autores[id]) autor.textContent = `Última edición: ${guia.autores[id]}`;
}

// ============================================================
// Autoguardado
// ============================================================
const temporizadores = new Map();
const pendientes = new Set();
let reintento = null;

function programarGuardado(id, espera = 700) {
  pendientes.add(id);
  clearTimeout(temporizadores.get(id));
  temporizadores.set(id, setTimeout(() => guardar(id), espera));
  mostrarIndicador('Guardando…');
}

async function guardar(id) {
  temporizadores.delete(id);
  try {
    await api(`/api/guias/${numeroGuia}/respuestas`, { body: { campo: id, valor: respuestas[id] } });
    // Si escribieron algo más mientras se guardaba, sigue pendiente
    if (!temporizadores.has(id)) pendientes.delete(id);
    const campo = pagina.querySelector(`.respuesta[data-campo="${CSS.escape(id)}"]`);
    if (campo && campo._autor) campo._autor.textContent = `Última edición: ${guia.estudiante}`;
    if (pendientes.size === 0) mostrarIndicador('Guardado ✓', 'ok');
  } catch (error) {
    if (error.estado === 401) { location.href = '/'; return; }
    if (error.sinConexion || error.estado >= 500) {
      // Se queda pendiente y se vuelve a intentar en unos segundos
      mostrarIndicador('Sin conexión · reintentando…', 'error', true);
      clearTimeout(reintento);
      reintento = setTimeout(() => [...pendientes].forEach((p) => guardar(p)), 4000);
    } else {
      pendientes.delete(id);
      mostrarIndicador(error.message, 'error');
    }
  }
}

let ocultarIndicador = null;
function mostrarIndicador(texto, tipo = '', fijo = false) {
  indicador.textContent = texto;
  indicador.className = `indicador-guardado visible ${tipo}`;
  clearTimeout(ocultarIndicador);
  if (!fijo && tipo) ocultarIndicador = setTimeout(() => indicador.classList.remove('visible'), 2200);
}

// Si cierran la página con algo sin guardar, se envía de inmediato
window.addEventListener('pagehide', () => {
  for (const id of pendientes) {
    api(`/api/guias/${numeroGuia}/respuestas`, { body: { campo: id, valor: respuestas[id] }, keepalive: true }).catch(() => {});
  }
});
window.addEventListener('beforeunload', (e) => {
  if (pendientes.size > 0) e.preventDefault();
});

// ============================================================
// Completar la guía
// ============================================================
let cajaFinal = null;

function cajaCompletar() {
  cajaFinal = el('div', { class: 'completar' });
  actualizarCompletar();
  return cajaFinal;
}

function faltanCasillas() {
  let faltan = 0;
  for (const lista of guia.checklistsFinales) {
    const valor = respuestas[lista.id] || {};
    for (let i = 0; i < lista.total; i++) if (valor[i] !== true) faltan++;
  }
  return faltan;
}

function actualizarCompletar() {
  if (!cajaFinal) return;
  if (guia.estado === 'completada') {
    cajaFinal.className = 'completar hecho';
    cajaFinal.replaceChildren(
      el('p', {}, el('strong', {}, '✓ ¡Guía completada!'), ' Pueden seguir editando sus respuestas.'),
      el('a', { class: 'boton boton-secundario', href: '/proyecto' }, 'Volver a las guías'));
    return;
  }
  const faltan = faltanCasillas();
  const boton = el('button', { class: 'boton', type: 'button', disabled: faltan > 0, onclick: completar }, '¡Terminamos la guía!');
  cajaFinal.className = 'completar';
  cajaFinal.replaceChildren(
    el('p', {}, faltan > 0
      ? `Marquen todas las casillas de "¿Lo logramos?" para terminar (faltan ${faltan}).`
      : '¡Todo listo! Ya pueden marcar la guía como completada.'),
    boton);
}

async function completar(evento) {
  const boton = evento.currentTarget;
  boton.disabled = true;
  // Primero se guarda lo pendiente
  await Promise.all([...pendientes].map((id) => guardar(id)));
  try {
    await api(`/api/guias/${numeroGuia}/completar`, { body: {} });
    guia.estado = 'completada';
    actualizarCompletar();
    celebrar();
  } catch (error) {
    mostrarIndicador(error.message, 'error');
    boton.disabled = false;
  }
}

function celebrar() {
  const colores = ['#38BDF8', '#0369A1', '#7DD3FC', '#FFCB6B', '#15803D'];
  const capa = el('div', { class: 'celebracion', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'titulo-celebracion' });
  for (let i = 0; i < 70; i++) {
    capa.append(el('span', {
      class: 'confeti',
      style: `left:${Math.random() * 100}%;background:${colores[i % colores.length]};` +
        `animation-duration:${2 + Math.random() * 2}s;animation-delay:${Math.random() * .6}s;` +
        `transform:rotate(${Math.random() * 360}deg)`,
    }));
  }
  const cerrar = el('button', { class: 'boton', type: 'button', onclick: () => capa.remove() }, '¡Genial!');
  capa.append(el('div', { class: 'celebracion-caja' },
    el('div', { class: 'celebracion-icono', 'aria-hidden': 'true' }, '🎉'),
    el('h2', { id: 'titulo-celebracion' }, '¡Lo lograron!'),
    el('p', {}, `${guia.equipo} completó la Guía ${guia.numero}.`),
    el('div', { class: 'ventana-acciones' }, cerrar, el('a', { class: 'boton boton-secundario', href: '/proyecto' }, 'Ver guías')),
  ));
  document.body.append(capa);
  cerrar.focus();
}

cargar();
