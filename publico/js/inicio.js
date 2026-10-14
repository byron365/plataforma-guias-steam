// ============================================================
// Página de inicio: elegir proyecto → equipo → PIN → nombre
// ============================================================
import { api, el, salir } from './comun.js';

const contenedorProyectos = document.getElementById('proyectos');
const ventana = document.getElementById('ventana-entrar');
const cuerpoVentana = document.getElementById('ventana-cuerpo');
const tituloVentana = document.getElementById('ventana-titulo');

// Datos que se van llenando durante la entrada
const entrada = { proyecto: null, equipo: null, pin: '' };

// ---------- ¿Este dispositivo ya tiene sesión? ----------
async function revisarSesion() {
  try {
    const sesion = await api('/api/sesion');
    const caja = document.getElementById('continuar');
    caja.replaceChildren(
      el('p', {}, 'Este dispositivo está conectado como ', el('strong', {}, sesion.estudiante),
        ' del ', el('strong', {}, sesion.equipo), ` (${sesion.proyecto}).`),
      el('a', { class: 'boton', href: '/proyecto' }, 'Continuar →'),
      el('button', { class: 'boton boton-secundario', type: 'button', onclick: salir }, 'No soy yo'),
    );
    caja.hidden = false;
  } catch { /* sin sesión: no se muestra nada */ }
}

// ---------- Tarjetas de proyectos ----------
async function cargarProyectos() {
  try {
    const proyectos = await api('/api/proyectos');
    if (proyectos.length === 0) {
      contenedorProyectos.replaceChildren(el('p', {}, 'Todavía no hay proyectos en la carpeta contenido/.'));
      return;
    }
    contenedorProyectos.replaceChildren(...proyectos.map(tarjetaProyecto));
  } catch (error) {
    contenedorProyectos.replaceChildren(el('p', { class: 'mensaje-error' }, error.message));
  }
}

function tarjetaProyecto(proyecto) {
  const imagen = proyecto.imagen
    ? el('img', { src: proyecto.imagen, alt: '' })
    : el('span', { class: 'tarjeta-inicial', 'aria-hidden': 'true' }, proyecto.nombre.charAt(0));
  return el('button', { class: 'tarjeta-proyecto', type: 'button', onclick: () => abrirEntrada(proyecto) },
    el('div', { class: 'tarjeta-imagen', style: `background:${proyecto.color}` }, imagen),
    el('div', { class: 'tarjeta-cuerpo' },
      proyecto.nivel ? el('span', { class: 'etiqueta-nivel' }, `Nivel ${proyecto.nivel}`) : null,
      el('h3', {}, proyecto.nombre),
      el('p', {}, proyecto.descripcion),
    ),
  );
}

// ---------- Ventana de entrada ----------
function abrirEntrada(proyecto) {
  entrada.proyecto = proyecto;
  entrada.equipo = null;
  entrada.pin = '';
  tituloVentana.textContent = proyecto.nombre;
  ventana.showModal();
  pasoEquipo();
}

ventana.querySelector('[data-cerrar]').addEventListener('click', () => ventana.close());
// Cerrar tocando fuera de la ventana
ventana.addEventListener('click', (e) => { if (e.target === ventana) ventana.close(); });

function indicadorPasos(actual) {
  return el('div', { class: 'pasos-entrada', 'aria-hidden': 'true' },
    [1, 2, 3].map((n) => el('span', { class: n <= actual ? 'activo' : '' })));
}

// Paso 1: elegir equipo
async function pasoEquipo() {
  cuerpoVentana.replaceChildren(indicadorPasos(1), el('h3', {}, '1. ¿Cuál es su equipo?'), el('p', { class: 'cargando' }, 'Cargando equipos…'));
  try {
    const equipos = await api(`/api/proyectos/${entrada.proyecto.id}/equipos`);
    const lista = equipos.length
      ? el('div', { class: 'lista-equipos' }, equipos.map((equipo) =>
          el('button', { class: 'boton-equipo', type: 'button', onclick: () => { entrada.equipo = equipo; pasoPin(); } }, equipo.nombre)))
      : el('p', {}, 'Este proyecto todavía no tiene equipos. Pídanle al docente que los cree.');
    cuerpoVentana.replaceChildren(indicadorPasos(1), el('h3', {}, '1. ¿Cuál es su equipo?'), lista);
  } catch (error) {
    cuerpoVentana.replaceChildren(el('p', { class: 'mensaje-error' }, error.message));
  }
}

// Paso 2: PIN de 4 dígitos con teclado grande (también funciona el teclado físico)
function pasoPin(mensajeError) {
  entrada.pin = '';
  const puntos = el('div', { class: 'pin-puntos', role: 'img', 'aria-label': 'PIN: 0 de 4 dígitos' },
    [0, 1, 2, 3].map(() => el('span')));
  const error = el('p', { class: 'mensaje-error', role: 'alert', hidden: !mensajeError }, mensajeError || '');

  const actualizarPuntos = () => {
    puntos.querySelectorAll('span').forEach((p, i) => p.classList.toggle('lleno', i < entrada.pin.length));
    puntos.setAttribute('aria-label', `PIN: ${entrada.pin.length} de 4 dígitos`);
  };

  const escribir = async (digito) => {
    if (entrada.pin.length >= 4) return;
    entrada.pin += digito;
    actualizarPuntos();
    if (entrada.pin.length === 4) await verificar();
  };
  const borrar = () => { entrada.pin = entrada.pin.slice(0, -1); actualizarPuntos(); };

  const verificar = async () => {
    try {
      await api('/api/verificar-pin', { body: { equipoId: entrada.equipo.id, pin: entrada.pin } });
      document.removeEventListener('keydown', teclaFisica);
      pasoNombre();
    } catch (e) {
      error.textContent = e.message;
      error.hidden = false;
      puntos.classList.add('error');
      setTimeout(() => { puntos.classList.remove('error'); entrada.pin = ''; actualizarPuntos(); }, 400);
    }
  };

  const teclaFisica = (e) => {
    if (!ventana.open) return document.removeEventListener('keydown', teclaFisica);
    if (/^\d$/.test(e.key)) escribir(e.key);
    else if (e.key === 'Backspace') borrar();
  };
  document.addEventListener('keydown', teclaFisica);

  const tecla = (texto, accion, clase = '', etiqueta) =>
    el('button', { type: 'button', class: clase, onclick: accion, 'aria-label': etiqueta || texto }, texto);
  const teclado = el('div', { class: 'teclado' },
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => tecla(d, () => escribir(d))),
    tecla('← Volver', () => { document.removeEventListener('keydown', teclaFisica); pasoEquipo(); }, 'tecla-borrar', 'Volver a elegir equipo'),
    tecla('0', () => escribir('0')),
    tecla('⌫ Borrar', borrar, 'tecla-borrar', 'Borrar un dígito'),
  );

  cuerpoVentana.replaceChildren(
    indicadorPasos(2),
    el('h3', {}, `2. PIN de ${entrada.equipo.nombre}`),
    puntos, teclado, error,
  );
}

// Paso 3: nombre del estudiante
function pasoNombre() {
  const input = el('input', { id: 'nombre', type: 'text', maxlength: '40', autocomplete: 'given-name', placeholder: 'Ej.: Sofía', required: true });
  const error = el('p', { class: 'mensaje-error', role: 'alert', hidden: true });
  const boton = el('button', { class: 'boton', type: 'submit' }, 'Entrar →');

  const formulario = el('form', {
    onsubmit: async (e) => {
      e.preventDefault();
      boton.disabled = true;
      try {
        await api('/api/entrar', { body: { equipoId: entrada.equipo.id, pin: entrada.pin, nombre: input.value } });
        location.href = '/proyecto';
      } catch (err) {
        error.textContent = err.message;
        error.hidden = false;
        boton.disabled = false;
      }
    },
  },
  el('div', { class: 'campo-nombre' }, el('label', { for: 'nombre' }, 'Escribe tu nombre'), input),
  el('div', { class: 'ventana-acciones' }, boton),
  error);

  cuerpoVentana.replaceChildren(indicadorPasos(3), el('h3', {}, '3. ¿Quién eres?'), formulario);
  input.focus();
}

revisarSesion();
cargarProyectos();
