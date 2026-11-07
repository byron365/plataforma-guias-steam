// ============================================================
// Visor de imágenes de las guías.
// Cada imagen lleva un botón "Ampliar". Al tocarlo (o al tocar la imagen) se
// abre a pantalla completa y se puede acercar y mover:
//   · Botones − y +, rueda del mouse o doble clic.
//   · Arrastrar con el mouse o con un dedo; pellizcar con dos dedos.
//   · Teclado: + y − acercan, 0 ajusta, flechas mueven, Esc cierra.
// No usa librerías: funciona sin internet.
// ============================================================
import { el } from './comun.js';

const PASO = 1.4;           // cuánto acerca cada toque de + o −
const ACERCAR_MAXIMO = 8;   // hasta 8 veces el tamaño ajustado a la pantalla
const AJUSTE_MAXIMO = 3;    // una imagen pequeña se agranda como mucho 3 veces al abrir
const MOVER_TECLADO = 60;   // píxeles por cada flecha

const LUPA = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" ' +
  'stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6"/></svg>';

let visor = null;           // se crea la primera vez que se abre

function crearVisor() {
  const foto = el('img', { class: 'ampliador-foto', alt: '', draggable: 'false' });
  const lienzo = el('div', { class: 'ampliador-lienzo' }, foto);
  const titulo = el('strong', { class: 'ampliador-titulo' });
  const pie = el('p', { class: 'ampliador-pie' });
  const nivel = el('span', { class: 'ampliador-nivel', 'aria-live': 'polite' }, '100 %');
  const boton = (texto, etiqueta, accion, clase = '') => el('button', {
    class: `ampliador-boton ${clase}`, type: 'button', title: etiqueta, 'aria-label': etiqueta, onclick: accion,
  }, texto);

  const dialogo = el('dialog', { class: 'ampliador', 'aria-label': 'Imagen ampliada' },
    el('div', { class: 'ampliador-barra' },
      titulo,
      el('div', { class: 'ampliador-controles' },
        boton('−', 'Alejar', () => acercarCentro(1 / PASO)),
        nivel,
        boton('+', 'Acercar', () => acercarCentro(PASO)),
        boton('Ajustar', 'Ajustar a la pantalla', () => ajustar(), 'ampliador-boton-texto'),
        boton('✕', 'Cerrar', () => dialogo.close()))),
    lienzo,
    pie);
  document.body.append(dialogo);

  // Estado: la imagen se dibuja en (x, y) con la escala dada
  let ancho = 0;
  let alto = 0;              // tamaño real de la imagen
  let escala = 1;
  let escalaAjuste = 1;      // escala con la que cabe entera
  let x = 0;
  let y = 0;
  let ajustada = true;       // mientras esté ajustada, sigue ajustándose si cambia la ventana

  function dibujar() {
    const caja = lienzo.getBoundingClientRect();
    const w = ancho * escala;
    const h = alto * escala;
    // Si la imagen es más chica que el lienzo se centra; si no, no deja huecos en las orillas
    x = w <= caja.width ? (caja.width - w) / 2 : Math.min(0, Math.max(caja.width - w, x));
    y = h <= caja.height ? (caja.height - h) / 2 : Math.min(0, Math.max(caja.height - h, y));
    foto.style.transform = `translate(${x}px, ${y}px) scale(${escala})`;
    nivel.textContent = `${Math.round((escala / escalaAjuste) * 100)} %`;
    lienzo.classList.toggle('se-mueve', escala > escalaAjuste * 1.001);
  }

  function ajustar() {
    const caja = lienzo.getBoundingClientRect();
    if (!ancho || !caja.width) return;
    escalaAjuste = Math.min(caja.width / ancho, caja.height / alto, AJUSTE_MAXIMO);
    escala = escalaAjuste;
    ajustada = true;
    dibujar();
  }

  // Acerca o aleja dejando quieto el punto (px, py) del lienzo
  function acercar(factor, px, py) {
    const nueva = Math.min(escalaAjuste * ACERCAR_MAXIMO, Math.max(escalaAjuste, escala * factor));
    x = px - (px - x) * (nueva / escala);
    y = py - (py - y) * (nueva / escala);
    escala = nueva;
    ajustada = escala <= escalaAjuste * 1.001;
    dibujar();
  }

  function acercarCentro(factor) {
    const caja = lienzo.getBoundingClientRect();
    acercar(factor, caja.width / 2, caja.height / 2);
  }

  const puntoEnLienzo = (evento) => {
    const caja = lienzo.getBoundingClientRect();
    return { x: evento.clientX - caja.left, y: evento.clientY - caja.top };
  };

  // Rueda del mouse
  lienzo.addEventListener('wheel', (e) => {
    e.preventDefault();
    const p = puntoEnLienzo(e);
    acercar(Math.exp(-e.deltaY * 0.0015), p.x, p.y);
  }, { passive: false });

  // Doble clic: acerca ahí; si ya está cerca, vuelve a ajustar
  lienzo.addEventListener('dblclick', (e) => {
    if (escala > escalaAjuste * 1.001) { ajustar(); return; }
    const p = puntoEnLienzo(e);
    acercar(2.5, p.x, p.y);
  });

  // Arrastrar con un puntero; pellizcar con dos
  const punteros = new Map();
  let pellizco = null;       // distancia y centro de los dos dedos
  let seMovio = false;

  const datosPellizco = () => {
    const [a, b] = [...punteros.values()];
    return { distancia: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  };

  lienzo.addEventListener('pointerdown', (e) => {
    lienzo.setPointerCapture(e.pointerId);
    punteros.set(e.pointerId, puntoEnLienzo(e));
    seMovio = false;
    if (punteros.size === 2) pellizco = datosPellizco();
  });

  lienzo.addEventListener('pointermove', (e) => {
    const antes = punteros.get(e.pointerId);
    if (!antes) return;
    const ahora = puntoEnLienzo(e);
    punteros.set(e.pointerId, ahora);
    if (punteros.size === 2) {
      const nuevo = datosPellizco();
      x += nuevo.x - pellizco.x;
      y += nuevo.y - pellizco.y;
      acercar(nuevo.distancia / pellizco.distancia, nuevo.x, nuevo.y);
      pellizco = nuevo;
      seMovio = true;
    } else if (punteros.size === 1) {
      x += ahora.x - antes.x;
      y += ahora.y - antes.y;
      if (Math.hypot(ahora.x - antes.x, ahora.y - antes.y) > 2) seMovio = true;
      dibujar();
    }
  });

  const soltar = (e) => {
    punteros.delete(e.pointerId);
    if (punteros.size < 2) pellizco = null;
  };
  lienzo.addEventListener('pointerup', soltar);
  lienzo.addEventListener('pointercancel', soltar);

  // Tocar el fondo, fuera de la imagen, cierra el visor
  lienzo.addEventListener('click', (e) => {
    if (seMovio) return;
    const p = puntoEnLienzo(e);
    const fuera = p.x < x || p.y < y || p.x > x + ancho * escala || p.y > y + alto * escala;
    if (fuera) dialogo.close();
  });

  // Teclado (Esc lo resuelve el propio <dialog>)
  dialogo.addEventListener('keydown', (e) => {
    const flechas = { ArrowLeft: [1, 0], ArrowRight: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
    if (flechas) {
      e.preventDefault();
      x += flechas[0] * MOVER_TECLADO;
      y += flechas[1] * MOVER_TECLADO;
      dibujar();
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      acercarCentro(PASO);
    } else if (e.key === '-') {
      e.preventDefault();
      acercarCentro(1 / PASO);
    } else if (e.key === '0') {
      e.preventDefault();
      ajustar();
    }
  });

  // Si cambia el tamaño de la ventana o se gira el celular
  new ResizeObserver(() => {
    if (!dialogo.open) return;
    if (ajustada) ajustar();
    else dibujar();
  }).observe(lienzo);

  function abrir(imagen, textoTitulo, textoPie) {
    titulo.textContent = textoTitulo;
    pie.textContent = textoPie;
    pie.hidden = !textoPie;
    foto.alt = imagen.alt;
    ancho = 0;
    foto.style.transform = '';
    dialogo.showModal();
    // La imagen ya está en la guía, así que normalmente carga de inmediato
    const listo = () => {
      ancho = foto.naturalWidth || 800;
      alto = foto.naturalHeight || 600;
      foto.style.width = `${ancho}px`;
      foto.style.height = `${alto}px`;
      x = 0;
      y = 0;
      ajustar();
    };
    foto.onload = listo;
    foto.src = imagen.currentSrc || imagen.src;
    if (foto.complete && foto.naturalWidth) listo();
  }

  return { abrir };
}

// Agrega el botón "Ampliar" a las imágenes de la guía que hay dentro de `contenedor`
export function prepararImagenes(contenedor) {
  contenedor.querySelectorAll('.imagen-guia img').forEach((imagen) => {
    const figura = imagen.closest('.imagen-guia');
    const titulo = figura.querySelector('figcaption strong')?.textContent || 'Imagen';
    const abrir = () => {
      visor ??= crearVisor();
      boton.focus({ preventScroll: true });   // al cerrar, el foco vuelve a este botón
      visor.abrir(imagen, titulo, imagen.alt);
    };
    const boton = el('button', {
      class: 'imagen-ampliar', type: 'button', 'aria-label': `Ampliar ${titulo}`, onclick: abrir, html: `${LUPA}<span>Ampliar</span>`,
    });
    const marco = el('div', { class: 'imagen-marco' });
    imagen.replaceWith(marco);
    imagen.addEventListener('click', abrir);
    marco.append(imagen, boton);
  });
}
