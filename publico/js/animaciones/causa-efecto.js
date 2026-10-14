// ============================================================
// Animación "causa-efecto": un mapa de causa y efecto en círculo.
// Cada flecha es "esto provoca aquello"; el recorrido se repite.
// Se avanza con "Siguiente" o en automático.
//
// En la guía (sin lista usa el ciclo del riego de la guía 3 del invernadero):
//   :::animacion tipo="causa-efecto"
//   - Tierra seca
//   - La bomba se enciende
//   - La tierra se moja
//   :::
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

// Guía 3 del mini invernadero: "Tierra seca → la bomba se enciende → la tierra se moja
// → la bomba se apaga → la planta usa el agua → tierra seca..."
const RIEGO = ['Tierra seca', 'La bomba se enciende', 'La tierra se moja', 'La bomba se apaga', 'La planta usa el agua'];

export default function montar(contenedor, config) {
  const pasos = Array.isArray(config.lista) && config.lista.length >= 2 ? config.lista : RIEGO;
  const total = pasos.length;
  const CX = 260; const CY = 190; const R = 140;
  const raiz = svg('svg', { viewBox: '0 0 520 380', class: 'causa-svg', role: 'img', 'aria-label': `Mapa de causa y efecto: ${pasos.join(', luego ')}, y vuelve a empezar` });
  raiz.append(svg('defs', {}, svg('marker', { id: `punta-causa-${Math.random().toString(36).slice(2, 7)}`, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto' }, svg('path', { d: 'M 0 0 L 10 5 L 0 10 z', class: 'causa-punta' }))));
  const idPunta = raiz.querySelector('marker').id;

  const posicion = (i) => {
    const ang = -Math.PI / 2 + (i / total) * Math.PI * 2;
    return { x: CX + R * Math.cos(ang), y: CY + R * Math.sin(ang), ang };
  };

  // Flechas en arco entre recuadros consecutivos
  const flechas = pasos.map((_, i) => {
    const a = (-Math.PI / 2 + (i / total) * Math.PI * 2) + 0.32;
    const b = (-Math.PI / 2 + ((i + 1) / total) * Math.PI * 2) - 0.32;
    const p = { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
    const q = { x: CX + R * Math.cos(b), y: CY + R * Math.sin(b) };
    const camino = svg('path', { d: `M ${p.x} ${p.y} A ${R} ${R} 0 0 1 ${q.x} ${q.y}`, class: 'causa-flecha', 'marker-end': `url(#${idPunta})` });
    raiz.append(camino);
    return camino;
  });

  const nodos = pasos.map((texto, i) => {
    const { x, y } = posicion(i);
    const g = svg('g', { class: 'causa-nodo' });
    const palabras = String(texto).split(/\s+/); const lineas = []; let actual = '';
    for (const w of palabras) { if ((actual + ' ' + w).trim().length > 16 && actual) { lineas.push(actual); actual = w; } else actual = (actual + ' ' + w).trim(); }
    lineas.push(actual);
    const alto = 22 + lineas.length * 16;
    g.append(svg('rect', { x: x - 72, y: y - alto / 2, width: 144, height: alto, rx: 12 }));
    const t = svg('text', { x, y: y - (lineas.length - 1) * 8 + 5, class: 'causa-texto', 'text-anchor': 'middle' });
    lineas.forEach((l, k) => t.append(svg('tspan', { x, dy: k === 0 ? 0 : 16 }, l)));
    g.append(t);
    raiz.append(g);
    return g;
  });
  raiz.append(svg('text', { x: CX, y: CY + 5, class: 'causa-centro', 'text-anchor': 'middle' }, '↻ se repite'));

  const ahora = el('p', { class: 'flujo-ahora', 'aria-live': 'polite' });
  const botonSiguiente = el('button', { type: 'button', class: 'boton boton-chico' }, 'Siguiente →');
  const botonAuto = el('button', { type: 'button', class: 'anim-boton' }, '▶ Automático');
  contenedor.append(el('div', { class: 'anim-causa' }, raiz,
    el('div', { class: 'anim-controles' }, ahora, el('div', { class: 'anim-rapidos' }, botonSiguiente, botonAuto))));

  let actual = 0;
  let automatico = null;
  function mostrar() {
    nodos.forEach((n, i) => n.classList.toggle('activo', i === actual));
    flechas.forEach((f, i) => f.classList.toggle('recorrida', i === (actual - 1 + total) % total));
    const siguiente = pasos[(actual + 1) % total];
    ahora.replaceChildren(el('strong', {}, pasos[actual]), ` → provoca → ${siguiente.charAt(0).toLowerCase()}${siguiente.slice(1)}`);
  }
  const avanzar = () => { actual = (actual + 1) % total; mostrar(); };
  botonSiguiente.addEventListener('click', avanzar);
  botonAuto.addEventListener('click', () => {
    if (automatico) { clearInterval(automatico); automatico = null; botonAuto.textContent = '▶ Automático'; return; }
    automatico = setInterval(() => { if (!contenedor.isConnected) clearInterval(automatico); else avanzar(); }, 1500);
    botonAuto.textContent = '⏸ Pausa';
  });
  mostrar();
}
