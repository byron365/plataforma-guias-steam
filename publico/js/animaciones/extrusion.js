// ============================================================
// Animación "extrusion": de un círculo plano a un plato con grosor, en Blender.
// Se siguen las teclas de la guía 2: Shift + A → Círculo (relleno Abanico),
// Tab (modo edición), A (seleccionar todo), E (extruir) y 2 mm hacia arriba,
// Tab (volver a modo objeto). Vista en perspectiva.
//
// En la guía:
//   :::animacion tipo="extrusion"
//   :::
// Opciones (todas opcionales): radio (50 mm) · grosor (2 mm, lo que se escribe al extruir) · lados (16)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const CX = 230; const CY = 190;
const ESCALA = 3;        // px por mm (radio 50 mm → 150 px)
const ACHATADO = 0.36;   // la perspectiva aplasta el círculo

const PASOS = [
  { tecla: 'Shift + A → Malla → Círculo', texto: 'Radio 50, relleno Abanico: un círculo plano hecho de triángulos.', modo: 'Modo objeto' },
  { tecla: 'Tab', texto: 'Modo edición: se ven los vértices (los puntos).', modo: 'Modo edición' },
  { tecla: 'A', texto: 'Todo seleccionado (en naranja).', modo: 'Modo edición' },
  { tecla: 'E', texto: 'Extruir: mueve el mouse hacia arriba o escribe el número.', modo: 'Modo edición · extruyendo' },
  { tecla: 'Tab', texto: 'De vuelta en modo objeto: ya es un disco con grosor.', modo: 'Modo objeto' },
];

export default function montar(contenedor, config) {
  const radio = limitar(numero(config.radio, 50), 10, 60);
  const grosorGuia = limitar(numero(config.grosor, 2), 0.5, 20);
  const lados = limitar(Math.round(numero(config.lados, 16)), 6, 32);
  let paso = -1;          // -1 = escena vacía
  let grosor = 0;          // mm extruidos

  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 460 300', class: 'extru-svg', role: 'img', 'aria-label': 'Vista en perspectiva de la extrusión de un círculo en Blender' },
    svg('line', { x1: 20, x2: 440, y1: CY, y2: CY, class: 'extru-piso' }),
    svg('line', { x1: CX, x2: CX, y1: 40, y2: 280, class: 'extru-piso' }),
    capa);
  const modo = el('p', { class: 'extru-modo' });
  const explicacion = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  const botonSiguiente = el('button', { type: 'button', class: 'boton boton-chico' });
  const botonReiniciar = el('button', { type: 'button', class: 'anim-boton' }, '↺ Empezar de nuevo');
  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 20, step: 0.5, value: 0, 'aria-label': 'Mover el mouse hacia arriba (mm)' });
  const botonEscribir = el('button', { type: 'button', class: 'anim-boton' }, `Escribir ${grosorGuia} y Enter`);
  const panelExtruir = el('div', { class: 'extru-extruir' },
    el('label', { class: 'anim-etiqueta' }, 'Mover el mouse hacia arriba', deslizador), botonEscribir);
  const pista = el('pre', { class: 'joystick-codigo' });

  contenedor.append(el('div', { class: 'anim-extrusion' },
    el('div', {}, modo, raiz),
    el('div', { class: 'anim-controles' },
      explicacion, panelExtruir,
      el('div', { class: 'anim-rapidos' }, botonSiguiente, botonReiniciar),
      pista)));

  const punto = (i, alto) => {
    const a = (i / lados) * Math.PI * 2;
    return { x: CX + Math.cos(a) * radio * ESCALA, y: CY + Math.sin(a) * radio * ESCALA * ACHATADO - alto * ESCALA };
  };
  const anillo = (alto) => Array.from({ length: lados }, (_, i) => punto(i, alto));

  function dibujar() {
    capa.replaceChildren();
    if (paso < 0) return;
    const edicion = paso >= 1 && paso <= 3;
    const seleccion = paso >= 2 && paso <= 3;
    const abajo = anillo(0);
    const arriba = anillo(grosor);
    const camino = (pts) => `M ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`;
    // Costado (solo si tiene grosor): la parte de adelante del contorno
    if (grosor > 0) {
      const frente = abajo.map((p, i) => ({ p, q: arriba[i] })).filter(({ p }) => p.y >= CY - 0.01);
      const lado = svg('path', {
        d: `M ${arriba.find((_, i) => i === 0).x} ${arriba[0].y} ` +
          `L ${abajo[0].x} ${abajo[0].y} ` +
          abajo.slice(0, Math.floor(lados / 2) + 1).map((p) => `L ${p.x} ${p.y}`).join(' ') +
          ` L ${arriba[Math.floor(lados / 2)].x} ${arriba[Math.floor(lados / 2)].y} ` +
          arriba.slice(0, Math.floor(lados / 2) + 1).reverse().map((p) => `L ${p.x} ${p.y}`).join(' ') + ' Z',
        class: 'extru-costado',
      });
      capa.append(lado);
      frente.forEach(({ p, q }) => capa.append(svg('line', { x1: p.x, y1: p.y, x2: q.x, y2: q.y, class: 'extru-arista' })));
    }
    // Cara de arriba con sus triángulos (abanico)
    const centro = { x: CX, y: CY - grosor * ESCALA };
    capa.append(svg('path', { d: camino(arriba), class: `extru-cara${seleccion ? ' seleccionada' : ''}` }));
    if (edicion || paso === 0) {
      arriba.forEach((p) => capa.append(svg('line', { x1: centro.x, y1: centro.y, x2: p.x, y2: p.y, class: `extru-arista${seleccion ? ' seleccionada' : ''}` })));
    }
    capa.append(svg('path', { d: camino(arriba), class: `extru-borde${seleccion || !edicion ? ' seleccionada' : ''}` }));
    if (edicion) {
      [...arriba, centro].forEach((p) => capa.append(svg('circle', { cx: p.x, cy: p.y, r: 3, class: `extru-vertice${seleccion ? ' seleccionada' : ''}` })));
    }
    // Medida del grosor
    if (grosor > 0) {
      const d = abajo[0];
      capa.append(svg('text', { x: d.x + 14, y: d.y - (grosor * ESCALA) / 2 + 4, class: 'extru-medida' }, `${String(grosor).replace('.', ',')} mm`));
    }
    capa.append(svg('text', { x: CX, y: CY + radio * ESCALA * ACHATADO + 26, class: 'extru-medida', 'text-anchor': 'middle' }, `${radio * 2} mm de diámetro`));
  }

  function actualizar() {
    const siguiente = PASOS[paso + 1];
    botonSiguiente.textContent = siguiente ? `⌨ ${siguiente.tecla}` : '✓ Listo';
    botonSiguiente.disabled = !siguiente || (paso === 3 && grosor === 0);
    panelExtruir.hidden = paso !== 3;
    modo.textContent = paso < 0 ? 'Escena vacía (borramos el cubo con X)' : PASOS[paso].modo;
    explicacion.textContent = paso < 0 ? 'Presiona la primera tecla para empezar.' : PASOS[paso].texto;
    pista.textContent = PASOS.map((p, i) => `${i < paso + 1 ? '✓' : i === paso + 1 ? '→' : ' '} ${p.tecla}`).join('\n');
    dibujar();
  }

  botonSiguiente.addEventListener('click', () => { if (paso < PASOS.length - 1) { paso++; actualizar(); } });
  botonReiniciar.addEventListener('click', () => { paso = -1; grosor = 0; deslizador.value = 0; actualizar(); });
  deslizador.addEventListener('input', () => { grosor = Number(deslizador.value); actualizar(); });
  botonEscribir.addEventListener('click', () => { grosor = grosorGuia; deslizador.value = grosorGuia; actualizar(); });
  actualizar();
}
