// ============================================================
// Funciones compartidas por todas las páginas
// ============================================================

// Llama a la API del servidor. Lanza un error con el mensaje del servidor si algo falla.
export async function api(url, opciones = {}) {
  const config = { method: opciones.method || 'GET', headers: {}, credentials: 'same-origin' };
  if (opciones.body !== undefined) {
    config.method = opciones.method || 'POST';
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(opciones.body);
  }
  if (opciones.keepalive) config.keepalive = true;

  let respuesta;
  try {
    respuesta = await fetch(url, config);
  } catch {
    const error = new Error('Sin conexión con el servidor. Revisen el Wi-Fi.');
    error.sinConexion = true;
    throw error;
  }
  let datos = null;
  try { datos = await respuesta.json(); } catch { /* respuesta sin JSON */ }
  if (!respuesta.ok) {
    const error = new Error((datos && datos.error) || 'Ocurrió un error.');
    error.estado = respuesta.status;
    throw error;
  }
  return datos;
}

// Crea un elemento HTML:  el('button', { class: 'boton', onclick: fn }, 'Texto')
export function el(etiqueta, atributos = {}, ...hijos) {
  const nodo = document.createElement(etiqueta);
  for (const [clave, valor] of Object.entries(atributos)) {
    if (valor === false || valor === null || valor === undefined) continue;
    if (clave.startsWith('on') && typeof valor === 'function') nodo.addEventListener(clave.slice(2), valor);
    else if (clave === 'class') nodo.className = valor;
    else if (clave === 'html') nodo.innerHTML = valor;
    else nodo.setAttribute(clave, valor === true ? '' : valor);
  }
  for (const hijo of hijos.flat()) {
    if (hijo === null || hijo === undefined || hijo === false) continue;
    nodo.append(hijo instanceof Node ? hijo : document.createTextNode(String(hijo)));
  }
  return nodo;
}

// Guarda y lee preferencias pequeñas del dispositivo (puede fallar en modo privado)
export const local = {
  leer(clave) { try { return localStorage.getItem(clave); } catch { return null; } },
  guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch { /* sin almacenamiento */ } },
};

// Cierra la sesión del dispositivo y vuelve al inicio
export async function salir() {
  try { await api('/api/salir', { body: {} }); } catch { /* aunque falle, volvemos al inicio */ }
  location.href = '/';
}

// Muestra en la cabecera quién está conectado
export function mostrarQuien(contenedor, equipo, estudiante) {
  contenedor.replaceChildren(
    el('div', { class: 'quien' }, el('strong', {}, equipo), el('span', {}, estudiante)),
    el('button', { class: 'boton boton-oscuro', type: 'button', onclick: salir }, 'Salir'),
  );
}
