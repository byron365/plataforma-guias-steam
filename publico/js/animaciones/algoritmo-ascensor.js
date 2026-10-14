// ============================================================
// Animación "algoritmo-ascensor": ¿en qué orden atiende las llamadas?
// Un elevador con dos formas de elegir el destino, como en la guía 8:
//   - "Más cercana": va a la llamada más cercana (código base).
//   - "Del ascensor": sigue en la misma dirección mientras haya llamadas
//     en esa dirección, y luego cambia.
// Se llama desde los pisos (cuando quieran) y se ve el orden en que atiende.
// No mide los tiempos de espera: esa comparación la hace el equipo con su tabla.
//
// En la guía:
//   :::animacion tipo="algoritmo-ascensor"
//   :::
// Opciones (todas opcionales): pisos (3; con más pisos se nota más la diferencia, hasta 8)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const MS_POR_PISO = 1400; const MS_PUERTAS = 2000;

export default function montar(contenedor, config) {
  const N = limitar(Math.round(numero(config.pisos, 3)), 3, 8);
  let algoritmo = 'cercana';
  let pos = 0;                       // en pisos (0 = piso 1), puede ser decimal
  let pisoActual = 0; let destino = -1; let direccion = 1;
  let llamada = Array(N).fill(false);
  let puertasHasta = 0; let reloj = 0; let ultimo = 0;
  let orden = []; let pedidos = [];

  const ALTO = 34 * N + 30;
  const yDe = (p) => ALTO - 20 - p * 34;
  const cabina = svg('rect', { x: 70, width: 50, height: 28, rx: 4, class: 'elev-cabina' });
  const luces = [];
  const raiz = svg('svg', { viewBox: `0 0 220 ${ALTO}`, class: 'asc-svg', role: 'img', 'aria-label': `Elevador de ${N} pisos` },
    svg('rect', { x: 64, y: 6, width: 62, height: ALTO - 16, rx: 4, class: 'asc-hueco' }),
    ...Array.from({ length: N }, (_, i) => {
      const luz = svg('circle', { cx: 150, cy: yDe(i) - 14, r: 7, class: 'elev-led-svg' });
      luces.push(luz);
      return svg('g', {},
        svg('line', { x1: 20, x2: 64, y1: yDe(i), y2: yDe(i), class: 'elev-piso' }),
        svg('text', { x: 20, y: yDe(i) - 8, class: 'elev-texto' }, `Piso ${i + 1}`), luz);
    }),
    cabina);

  const botonesAlg = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Algoritmo' },
    [['cercana', 'Más cercana'], ['ascensor', 'Del ascensor']].map(([k, t]) =>
      el('button', { type: 'button', class: 'anim-boton', 'data-k': k, onclick: () => { algoritmo = k; marcar(); } }, t)));
  const botonesPiso = el('div', { class: 'asc-botones' }, ...Array.from({ length: N }, (_, i) =>
    el('button', { type: 'button', class: 'anim-boton', onclick: () => llamar(i) }, `Llamar ${i + 1}`)).reverse());
  const botonBorrar = el('button', { type: 'button', class: 'anim-boton' }, 'Borrar el registro');
  const listaPedidos = el('p', { class: 'asc-registro' });
  const listaOrden = el('p', { class: 'asc-registro' });
  const codigo = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });
  contenedor.append(el('div', { class: 'anim-ascensor' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('p', { class: 'anim-etiqueta' }, 'Algoritmo'), botonesAlg,
      el('p', { class: 'anim-etiqueta' }, 'Llamadas'), botonesPiso,
      el('div', {}, el('strong', {}, 'Orden de las llamadas: '), listaPedidos),
      el('div', {}, el('strong', {}, 'Orden en que atendió: '), listaOrden),
      el('div', { class: 'anim-rapidos' }, botonBorrar), codigo)));

  function marcar() { botonesAlg.querySelectorAll('button').forEach((b) => { const a = b.dataset.k === algoritmo; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); }); }
  function llamar(i) { if (!llamada[i]) { llamada[i] = true; pedidos.push(i + 1); } }

  function elegirCercana() {
    let mejor = -1;
    for (let i = 0; i < N; i++) {
      if (!llamada[i]) continue;
      if (mejor < 0 || Math.abs(i - pisoActual) < Math.abs(mejor - pisoActual)) mejor = i;
    }
    return mejor;
  }
  function elegirAscensor() {
    for (let i = pisoActual; i >= 0 && i < N; i += direccion) if (llamada[i]) return i;
    direccion = -direccion;
    for (let i = pisoActual; i >= 0 && i < N; i += direccion) if (llamada[i]) return i;
    return -1;
  }

  function vuelta(dt) {
    if (reloj < puertasHasta) return;
    if (Math.abs(pos - Math.round(pos)) < 0.02) pisoActual = Math.round(pos);
    if (destino < 0) destino = algoritmo === 'cercana' ? elegirCercana() : elegirAscensor();
    if (destino < 0) return;
    if (Math.abs(pos - destino) < 0.02) {
      pos = destino; pisoActual = destino; llamada[destino] = false;
      orden.push(destino + 1); destino = -1; puertasHasta = reloj + MS_PUERTAS;
      return;
    }
    const dir = destino > pos ? 1 : -1;
    // Pasa por los pisos de en medio sin detenerse (solo se detiene en el destino)
    pos += dir * Math.min(Math.abs(destino - pos), dt / MS_POR_PISO);
  }

  function dibujar() {
    cabina.setAttribute('y', yDe(pos) - 28);
    cabina.classList.toggle('abierta', reloj < puertasHasta);
    luces.forEach((l, i) => l.classList.toggle('encendido', llamada[i]));
    listaPedidos.textContent = pedidos.length ? pedidos.join(' → ') : '—';
    listaOrden.textContent = orden.length ? orden.join(' → ') : '—';
    codigo.textContent = `pisoActual = ${pisoActual + 1}   destino = ${destino < 0 ? '—' : destino + 1}` +
      (algoritmo === 'ascensor' ? `\ndireccion = ${direccion > 0 ? '1 (sube)' : '-1 (baja)'}` : '');
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(60, t - ultimo) : 0;
    ultimo = t; reloj += dt;
    vuelta(dt);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  botonBorrar.addEventListener('click', () => { orden = []; pedidos = []; });
  marcar(); dibujar();
  requestAnimationFrame(cuadro);
}
