// ============================================================
// Bitácora del equipo: botón flotante "📓 Bitácora" que abre un
// panel al costado con las notas del equipo. Sirve para anotar ideas,
// fallos o medidas en cualquier momento, desde cualquier guía.
// Cada nota se guarda sola mientras escriben (como las respuestas).
// ============================================================
import { api, el } from './comun.js';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

let guiaActual = null;      // guía abierta (null en la página del proyecto)
let panel = null;
let lista = null;
let estado = null;
let contador = null;
let titulos = {};
let maxTexto = 5000;
const notas = new Map();    // id → { nota, area, temporizador }
const nuevasVacias = new Set(); // notas creadas aquí que siguen vacías (se borran al cerrar)

// "2026-10-13 10:40:12" → "13 oct, 10:40"
function fecha(texto) {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec(texto || '');
  return m ? `${Number(m[3])} ${MESES[Number(m[2]) - 1]}, ${m[4]}:${m[5]}` : '';
}

// Se llama una vez por página, cuando ya se sabe quién entró
export function montarBitacora({ guia = null, equipo = '' } = {}) {
  guiaActual = guia;

  contador = el('span', { class: 'boton-bitacora-contador', hidden: true });
  const boton = el('button', {
    class: 'boton-bitacora', type: 'button', 'aria-haspopup': 'dialog', 'aria-controls': 'panel-bitacora',
    onclick: () => (panel.hidden ? abrir() : cerrar()),
  }, el('span', { 'aria-hidden': 'true' }, '📓'), ' Bitácora', contador);

  estado = el('p', { class: 'bitacora-estado', role: 'status', 'aria-live': 'polite' });
  lista = el('div', { class: 'bitacora-lista' });
  panel = el('aside', {
    class: 'panel-bitacora', id: 'panel-bitacora', role: 'dialog', 'aria-labelledby': 'titulo-bitacora', hidden: true,
    onkeydown: (e) => { if (e.key === 'Escape') { cerrar(); boton.focus(); } },
  },
  el('div', { class: 'panel-bitacora-cabecera' },
    el('h2', { id: 'titulo-bitacora' }, '📓 Bitácora', equipo ? el('small', {}, equipo) : null),
    el('button', { class: 'panel-bitacora-icono', type: 'button', title: 'Ver las notas nuevas de mis compañeros', 'aria-label': 'Actualizar', onclick: cargar }, '↻'),
    el('button', { class: 'panel-bitacora-icono', type: 'button', title: 'Cerrar', 'aria-label': 'Cerrar la bitácora', onclick: () => { cerrar(); boton.focus(); } }, '×')),
  el('div', { class: 'panel-bitacora-cuerpo' },
    el('p', { class: 'texto-suave' }, 'Anoten ideas, fallos, medidas o lo que quieran recordar. Todo el equipo ve estas notas y se guardan solas.'),
    el('button', { class: 'boton boton-nueva-nota', type: 'button', onclick: nuevaNota }, '+ Nueva nota'),
    estado,
    lista));

  document.body.append(boton, panel);
  // El número de notas en el botón, sin abrir el panel
  cargar({ soloContar: true });
  window.addEventListener('pagehide', () => guardarTodoYa(true));
}

async function abrir() {
  panel.hidden = false;
  document.body.classList.add('bitacora-abierta');
  await cargar();
  const primera = lista.querySelector('textarea');
  (primera || panel.querySelector('.boton-nueva-nota')).focus();
}

function cerrar() {
  guardarTodoYa();
  // Las notas nuevas que quedaron vacías no hacen falta
  for (const id of nuevasVacias) {
    const item = notas.get(id);
    if (item && item.area.value.trim() === '') borrar(id, false);
  }
  nuevasVacias.clear();
  panel.hidden = true;
  document.body.classList.remove('bitacora-abierta');
}

async function cargar({ soloContar = false } = {}) {
  try {
    const datos = await api('/api/bitacora');
    titulos = datos.titulos || {};
    maxTexto = datos.maxTexto || maxTexto;
    actualizarContador(datos.notas.filter((n) => n.texto.trim() !== '').length);
    if (soloContar) return;
    // Lo que se está escribiendo en este momento no se pisa con lo del servidor
    const escribiendo = new Set([...notas].filter(([, i]) => i.temporizador).map(([id]) => id));
    for (const nota of datos.notas) {
      const item = notas.get(nota.id);
      if (item && escribiendo.has(nota.id)) nota.texto = item.area.value;
    }
    dibujar(datos.notas);
  } catch (error) {
    if (!soloContar) mostrarEstado(error.message, 'error');
  }
}

function actualizarContador(n) {
  contador.hidden = n === 0;
  contador.textContent = String(n);
}

function dibujar(lasNotas) {
  notas.clear();
  if (!lasNotas.length) {
    lista.replaceChildren(el('p', { class: 'bitacora-vacia' }, 'Todavía no hay notas. Toquen "+ Nueva nota" para escribir la primera.'));
    return;
  }
  lista.replaceChildren(...lasNotas.map(tarjetaNota));
}

function tarjetaNota(nota) {
  const area = el('textarea', {
    class: 'bitacora-texto', rows: '3', maxlength: String(maxTexto), placeholder: 'Escriban aquí…',
    'aria-label': `Nota de ${nota.autor}`,
  });
  area.value = nota.texto;
  const item = { nota, area, temporizador: null };
  notas.set(nota.id, item);

  const lugar = nota.guia ? `Guía ${nota.guia}` : 'Proyecto';
  const editado = nota.editadoPor && nota.editadoPor !== nota.autor ? ` · editada por ${nota.editadoPor}` : '';
  const acciones = el('div', { class: 'bitacora-acciones' });
  const botonBorrar = () => el('button', {
    class: 'boton-texto', type: 'button',
    onclick: () => acciones.replaceChildren(
      el('span', {}, '¿Borrar esta nota? '),
      el('button', { class: 'boton-texto boton-texto-peligro', type: 'button', onclick: () => borrar(nota.id) }, 'Sí, borrar'),
      el('button', { class: 'boton-texto', type: 'button', onclick: () => acciones.replaceChildren(botonBorrar()) }, 'No')),
  }, 'Borrar');
  acciones.append(botonBorrar());

  area.addEventListener('input', () => {
    ajustar(area);
    if (area.value.trim() !== '') nuevasVacias.delete(nota.id);
    clearTimeout(item.temporizador);
    item.temporizador = setTimeout(() => guardar(nota.id), 800);
    mostrarEstado('Guardando…');
  });

  const tarjeta = el('article', { class: 'bitacora-nota', 'data-nota': nota.id },
    el('p', { class: 'bitacora-meta', title: nota.guia && titulos[nota.guia] ? titulos[nota.guia] : '' },
      el('strong', {}, lugar), ` · ${nota.autor} · ${fecha(nota.creada)}${editado}`),
    area,
    acciones);
  requestAnimationFrame(() => ajustar(area));
  return tarjeta;
}

function ajustar(area) {
  if (!area.offsetParent) return;
  area.style.height = 'auto';
  area.style.height = `${area.scrollHeight + 4}px`;
}

async function nuevaNota() {
  try {
    const nota = await api('/api/bitacora', { body: { guia: guiaActual } });
    nuevasVacias.add(nota.id);
    if (!notas.size) lista.replaceChildren();
    const tarjeta = tarjetaNota(nota);
    lista.prepend(tarjeta);
    tarjeta.querySelector('textarea').focus();
  } catch (error) {
    mostrarEstado(error.message, 'error');
  }
}

async function guardar(id, salir = false) {
  const item = notas.get(id);
  if (!item) return;
  clearTimeout(item.temporizador);
  item.temporizador = null;
  try {
    await api(`/api/bitacora/${id}`, { method: 'PUT', body: { texto: item.area.value }, keepalive: salir });
    item.nota.texto = item.area.value;
    if (!salir) {
      mostrarEstado('Guardado ✓', 'ok');
      actualizarContador([...notas.values()].filter((i) => i.area.value.trim() !== '').length);
    }
  } catch (error) {
    if (salir) return;
    mostrarEstado(error.sinConexion ? 'Sin conexión · reintentando…' : error.message, 'error');
    // Sin conexión: se vuelve a intentar en unos segundos
    if (error.sinConexion || error.estado >= 500) item.temporizador = setTimeout(() => guardar(id), 4000);
  }
}

// Al cerrar el panel o la página se guarda lo pendiente de inmediato
// (al cerrar la página, con keepalive para que llegue aunque se vaya)
function guardarTodoYa(salir = false) {
  for (const [id, item] of notas) if (item.temporizador) guardar(id, salir);
}

async function borrar(id, avisar = true) {
  try {
    await api(`/api/bitacora/${id}`, { method: 'DELETE' });
    const item = notas.get(id);
    if (item) clearTimeout(item.temporizador);
    notas.delete(id);
    nuevasVacias.delete(id);
    const tarjeta = lista.querySelector(`[data-nota="${id}"]`);
    if (tarjeta) tarjeta.remove();
    if (!notas.size) dibujar([]);
    actualizarContador([...notas.values()].filter((i) => i.area.value.trim() !== '').length);
    if (avisar) mostrarEstado('Nota borrada.', 'ok');
  } catch (error) {
    if (avisar) mostrarEstado(error.message, 'error');
  }
}

let ocultarEstado = null;
function mostrarEstado(texto, tipo = '') {
  estado.textContent = texto;
  estado.className = `bitacora-estado ${tipo}`;
  clearTimeout(ocultarEstado);
  if (tipo === 'ok') ocultarEstado = setTimeout(() => { estado.textContent = ''; }, 2200);
}
