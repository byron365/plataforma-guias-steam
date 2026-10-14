// ============================================================
// Animación "simetria": el modificador Simetría (Mirror) de Blender.
// Se ve la portería de frente: solo se modela la mitad derecha (poste,
// medio travesaño y medio piso) y Blender copia el otro lado en el eje X.
//   - Mover el poste cambia las dos mitades a la vez.
//   - Si el origen del objeto no está en X = 0, la copia sale desplazada.
//
// En la guía:
//   :::animacion tipo="simetria"
//   :::
// Opciones (todas opcionales): mitad (50 mm, X del poste) · alto (50 mm)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const CX = 260; const PISO = 230; const ESC = 2.2; // px por mm

export default function montar(contenedor, config) {
  let mitad = limitar(Math.round(numero(config.mitad, 50)), 30, 80);
  const alto = limitar(Math.round(numero(config.alto, 50)), 30, 80);
  let origen = 0;            // X del origen del objeto (mm)
  let activo = true;         // modificador encendido

  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 520 270', class: 'sim-svg', role: 'img', 'aria-label': 'Portería vista de frente con el modificador Simetría' },
    ...Array.from({ length: 13 }, (_, i) => svg('line', { x1: 20 + i * 40, x2: 20 + i * 40, y1: 20, y2: 250, class: 'gemelo-cuadricula' })),
    svg('line', { x1: 10, x2: 510, y1: PISO, y2: PISO, class: 'coord-eje-x' }),
    svg('line', { x1: CX, x2: CX, y1: 14, y2: 256, class: 'sim-eje-z' }),
    svg('text', { x: 500, y: PISO - 6, class: 'coord-nombre-x', 'text-anchor': 'end' }, 'X'),
    svg('text', { x: CX + 6, y: 26, class: 'sim-z' }, 'Z'),
    capa);

  const rPoste = el('input', { type: 'range', class: 'anim-deslizador', min: 30, max: 80, step: 1, value: mitad, 'aria-label': 'X del poste' });
  const rOrigen = el('input', { type: 'range', class: 'anim-deslizador', min: -40, max: 40, step: 1, value: 0, 'aria-label': 'X del origen del objeto' });
  const vPoste = el('strong'); const vOrigen = el('strong');
  const casilla = el('input', { type: 'checkbox', checked: true });
  const nota = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  const botonOrigen = el('button', { type: 'button', class: 'anim-boton' }, 'Fijar origen en (0, 0, 0)');

  contenedor.append(el('div', { class: 'anim-simetria' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'casilla-simple' }, casilla, ' Modificador Simetría (eje X)'),
      el('label', { class: 'anim-etiqueta' }, 'Poste en X = ', vPoste, rPoste),
      el('label', { class: 'anim-etiqueta' }, 'Origen del objeto en X = ', vOrigen, rOrigen),
      el('div', { class: 'anim-rapidos' }, botonOrigen),
      nota,
      el('p', { class: 'texto-ayuda' }, 'Cuadritos de 10 mm (vista de frente).'))));

  // La mitad modelada, como rectángulos en mm: [x1, z1, x2, z2]
  const piezas = () => [
    [mitad - 2.5, 0, mitad + 2.5, alto],          // poste 5 × 50
    [0, alto, mitad + 2.5, alto + 5],              // medio travesaño
    [0, 0, mitad, 3],                              // medio piso (3 mm)
  ];
  const rect = ([x1, z1, x2, z2], clase) => svg('rect', {
    x: CX + Math.min(x1, x2) * ESC, y: PISO - Math.max(z1, z2) * ESC,
    width: Math.abs(x2 - x1) * ESC, height: Math.abs(z2 - z1) * ESC, class: clase,
  });

  function dibujar() {
    const lista = piezas();
    const copia = lista.map(([x1, z1, x2, z2]) => [2 * origen - x1, z1, 2 * origen - x2, z2]);
    capa.replaceChildren(
      ...(activo ? copia.map((p) => rect(p, 'sim-copia')) : []),
      ...lista.map((p) => rect(p, 'sim-mitad')),
      svg('circle', { cx: CX + origen * ESC, cy: PISO, r: 5, class: 'sim-origen' }),
      svg('text', { x: CX + origen * ESC, y: PISO + 20, class: 'sim-texto', 'text-anchor': 'middle' }, 'origen'),
      svg('text', { x: CX + (mitad / 2) * ESC, y: PISO - (alto + 14) * ESC, class: 'sim-texto', 'text-anchor': 'middle' }, 'modelada'),
      ...(activo ? [svg('text', { x: CX + (2 * origen - mitad / 2) * ESC, y: PISO - (alto + 24) * ESC, class: 'sim-texto copia', 'text-anchor': 'middle' }, 'copia')] : []));
    vPoste.textContent = `${mitad} mm`; vOrigen.textContent = `${origen} mm`;
    const ancho = 2 * mitad; // de centro a centro de los postes
    if (!activo) nota.textContent = 'Sin el modificador solo existe la mitad de la portería.';
    else if (origen !== 0) nota.textContent = `El origen está en X = ${origen}: la copia sale ${origen > 0 ? 'metida en' : 'separada de'} la mitad modelada.`;
    else nota.textContent = `Con el origen en X = 0 las dos mitades se juntan: de poste a poste hay ${ancho} mm.`;
  }

  rPoste.addEventListener('input', () => { mitad = Number(rPoste.value); dibujar(); });
  rOrigen.addEventListener('input', () => { origen = Number(rOrigen.value); dibujar(); });
  casilla.addEventListener('change', () => { activo = casilla.checked; dibujar(); });
  botonOrigen.addEventListener('click', () => { origen = 0; rOrigen.value = 0; dibujar(); });
  dibujar();
}
