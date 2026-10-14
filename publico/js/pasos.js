// ============================================================
// Modo paso a paso: divide el contenido de una parte en pasos
// para que el estudiante vea uno a la vez.
//
// Reglas (automáticas, no hay que marcar nada en el .md):
//   - Cada número de una lista numerada (1., 2., 3.…) es un paso.
//     El párrafo que presenta la lista (justo antes) se ve en todos sus pasos,
//     El código, la tabla de conexiones o la imagen que vienen justo después
//     se ven en los pasos que los mencionan ("el código del recuadro",
//     "según la tabla"…) y siempre en el último paso de la lista.
//   - Cada bloque para trabajar (tabla para llenar, pregunta, opciones,
//     casillas, animación, foto, archivo, código suelto) cierra un paso,
//     junto con el texto que lo presenta.
//   - Un subtítulo (### …) o una línea (---) empieza un paso nuevo.
//   - Una imagen o tabla de consulta que quedaría sola en un paso se une al anterior.
// Nada se borra ni se mueve fuera de la página: solo se oculta,
// así los campos siguen guardándose igual.
// ============================================================

// Bloques en los que el estudiante trabaja: después de ellos empieza otro paso
const TRABAJO = [
  '.tabla-editable', '.pregunta', '.opciones', '.checklist', '.animacion',
  '.foto-bitacora', '.archivo-equipo', '.bloque-codigo', '.descarga',
];

// Material de consulta que puede acompañar a todos los pasos de una lista
function esConsulta(nodo) {
  return nodo.matches('.bloque-codigo, figure, .tabla-contenedor:not(.tabla-editable)');
}

// ¿El paso habla del código, de una tabla o de una imagen que viene después?
function mencionaConsulta(item) {
  return Boolean(item.querySelector('code')) ||
    /recuadro|c[oó]digo|programa|tabla|imagen|l[ií]nea|función/i.test(item.textContent);
}

function esTrabajo(nodo) {
  return TRABAJO.some((selector) => nodo.matches(selector));
}

// Texto que presenta lo que viene (se repite en cada paso de la lista)
function esPresentacion(nodo) {
  return nodo.matches('p') && !nodo.querySelector('textarea, input');
}

// Divide el contenido. Devuelve cuántos pasos tiene.
// Cada hijo directo queda con data-pasos="0 1 2" (los pasos en que se ve).
export function dividirEnPasos(contenido) {
  separarListasNumeradas(contenido);

  const nodos = [...contenido.children];
  const pasosDe = new Map(nodos.map((n) => [n, new Set()]));
  let paso = 0;          // paso que se está llenando
  let pasoTieneAlgo = false;

  const agregar = (nodo, numero) => pasosDe.get(nodo).add(numero);
  const cerrarPaso = () => { if (pasoTieneAlgo) { paso++; pasoTieneAlgo = false; } };

  for (let i = 0; i < nodos.length; i++) {
    const nodo = nodos[i];

    if (nodo.matches('h3, h4, hr')) {
      cerrarPaso();
      agregar(nodo, paso);
      pasoTieneAlgo = true;
      continue;
    }

    if (nodo.matches('ol[data-paso-lista]')) {
      // El párrafo que presenta la lista (solo el de justo antes): se saca del paso actual
      const anterior = nodos[i - 1];
      const presentacion = anterior && esPresentacion(anterior) && pasosDe.get(anterior).has(paso) ? [anterior] : [];
      presentacion.forEach((n) => pasosDe.get(n).delete(paso));
      const quedaAlgo = nodos.slice(0, i).some((n) => pasosDe.get(n).has(paso));
      if (quedaAlgo) paso++;
      pasoTieneAlgo = false;

      // Todos los <ol> seguidos de la misma lista
      const lista = [];
      const grupo = nodo.dataset.pasoLista;
      while (i < nodos.length && nodos[i].matches(`ol[data-paso-lista="${grupo}"]`)) lista.push(nodos[i++]);
      // Lo que viene justo después y sirve de consulta (código, tabla de conexiones, imagen)
      const consulta = [];
      while (i < nodos.length && esConsulta(nodos[i])) consulta.push(nodos[i++]);
      i--; // el for vuelve a sumar

      lista.forEach((item, k) => {
        presentacion.forEach((n) => agregar(n, paso));
        agregar(item, paso);
        // El material de consulta va en los pasos que lo mencionan y siempre en el último
        if (k === lista.length - 1 || mencionaConsulta(item)) consulta.forEach((n) => agregar(n, paso));
        paso++;
      });
      continue;
    }

    agregar(nodo, paso);
    pasoTieneAlgo = true;
    // El pie de una animación va con ella
    if (nodo.matches('.animacion') && nodos[i + 1] && nodos[i + 1].matches('.animacion-pie')) {
      agregar(nodos[++i], paso);
    }
    if (esTrabajo(nodo)) cerrarPaso();
  }

  let total = pasoTieneAlgo ? paso + 1 : paso;
  for (const pasos of pasosDe.values()) {
    // Algo sin paso (no debería pasar): se muestra en el último
    if (pasos.size === 0) pasos.add(Math.max(0, total - 1));
  }
  total = unirPasosSueltos(pasosDe, total);
  for (const [nodo, pasos] of pasosDe) nodo.dataset.pasos = [...pasos].join(' ');
  return Math.max(1, total);
}

// Un paso que solo tiene una imagen o una tabla de consulta se une al paso anterior
// (casi siempre ilustra lo que se acaba de hacer). Devuelve el nuevo total de pasos.
function unirPasosSueltos(pasosDe, total) {
  const nodosDelPaso = (k) => [...pasosDe].filter(([, pasos]) => pasos.has(k)).map(([nodo]) => nodo);
  for (let k = total - 1; k >= 1; k--) {
    const nodos = nodosDelPaso(k);
    const suelto = nodos.length === 1 && nodos[0].matches('figure, .tabla-contenedor:not(.tabla-editable)');
    if (!suelto) continue;
    // El paso k desaparece: lo suyo pasa a k - 1 y los siguientes bajan un número
    for (const pasos of pasosDe.values()) {
      const nuevos = [...pasos].map((p) => (p >= k ? p - 1 : p));
      pasos.clear();
      nuevos.forEach((p) => pasos.add(p));
    }
    total--;
  }
  return total;
}

// Cada número de una lista numerada pasa a ser su propia lista de un elemento,
// conservando su número (start) para que se siga leyendo 1, 2, 3…
let grupos = 0;
function separarListasNumeradas(contenido) {
  for (const ol of [...contenido.children].filter((n) => n.matches('ol'))) {
    const inicio = ol.hasAttribute('start') ? parseInt(ol.getAttribute('start'), 10) : 1;
    const grupo = String(++grupos);
    const nuevas = [...ol.children].filter((n) => n.matches('li')).map((li, k) => {
      const nueva = ol.cloneNode(false);
      nueva.setAttribute('start', String(inicio + k));
      nueva.dataset.pasoLista = grupo;
      nueva.append(li);
      return nueva;
    });
    ol.replaceWith(...nuevas);
  }
}

// Muestra solo los nodos del paso (o todos si verTodo)
export function mostrarPaso(contenido, paso, verTodo) {
  for (const nodo of contenido.children) {
    const pasos = (nodo.dataset.pasos || '').split(' ');
    nodo.classList.toggle('paso-oculto', !verTodo && !pasos.includes(String(paso)));
  }
}
