// ============================================================
// Animación "histeresis": la ventana con dos límites (abre a 30 °C, cierra a 27 °C).
// La lámpara se pone lejos, a media distancia o cerca, y la temperatura sube o baja (con pequeñas
// variaciones, como un sensor real). La gráfica muestra la temperatura y los
// límites; se cuenta cuántas veces se movió la ventana. Opcionalmente se compara
// con una ventana de un solo límite, que abre y cierra sin parar cerca de 30 °C.
//
// En la guía:
//   :::animacion tipo="histeresis"
//   :::
// Opciones (todas opcionales): abrir (30) · cerrar (27)
// ============================================================
import { svg, numero } from './comun/svg.js';
import { el } from '../comun.js';

const ANCHO = 560; const ALTO = 220;
const M = { izq: 44, der: 12, arriba: 12, abajo: 30 };
const T_MIN = 22; const T_MAX = 36;
const VENTANA_S = 30;      // segundos que muestra la gráfica
const POSICIONES = { lejos: { temp: 25, texto: 'Lejos' }, media: { temp: 30.3, texto: 'A media distancia' }, cerca: { temp: 34, texto: 'Cerca' } };

export default function montar(contenedor, config) {
  const ABRIR = numero(config.abrir, 30);
  const CERRAR = numero(config.cerrar, 27);

  let temp = POSICIONES.lejos.temp;
  let lampara = 'lejos';
  let conHist = { abierta: false, cambios: 0 };
  let unLimite = { abierta: false, cambios: 0 };
  let historia = [];            // { t, temp, abierta, abiertaUno }
  let tiempo = 0; let acumulado = 0; let ultimo = 0;

  // ---------- Gráfica ----------
  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} ${ALTO}`, class: 'hist-svg', role: 'img', 'aria-label': 'Temperatura en el tiempo con los límites de abrir y cerrar' });
  const x0 = M.izq; const x1 = ANCHO - M.der; const y0 = ALTO - M.abajo; const y1 = M.arriba;
  const yDe = (t) => y0 - ((t - T_MIN) / (T_MAX - T_MIN)) * (y0 - y1);
  const fondo = svg('g', {});
  for (let t = 24; t <= T_MAX; t += 2) {
    fondo.append(svg('line', { x1: x0, x2: x1, y1: yDe(t), y2: yDe(t), class: 'grafica-reja' }),
      svg('text', { x: x0 - 6, y: yDe(t) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, `${t}°`));
  }
  fondo.append(
    svg('rect', { x: x0, y: yDe(ABRIR), width: x1 - x0, height: yDe(CERRAR) - yDe(ABRIR), class: 'hist-banda' }),
    svg('line', { x1: x0, x2: x1, y1: yDe(ABRIR), y2: yDe(ABRIR), class: 'hist-limite hist-abrir' }),
    svg('line', { x1: x0, x2: x1, y1: yDe(CERRAR), y2: yDe(CERRAR), class: 'hist-limite hist-cerrar' }),
    svg('text', { x: x1 - 4, y: yDe(ABRIR) - 5, class: 'grafica-numero', 'text-anchor': 'end' }, `abre a ${ABRIR} °C`),
    svg('text', { x: x1 - 4, y: yDe(CERRAR) + 14, class: 'grafica-numero', 'text-anchor': 'end' }, `cierra a ${CERRAR} °C`),
    svg('text', { x: (x0 + x1) / 2, y: ALTO - 6, class: 'grafica-numero', 'text-anchor': 'middle' }, `últimos ${VENTANA_S} segundos`));
  const linea = svg('polyline', { class: 'grafica-linea' });
  const franja = svg('g', {});
  raiz.append(fondo, franja, linea);

  // ---------- Ventanas (dibujos pequeños) ----------
  const dibujoVentana = (titulo) => {
    const hoja = svg('rect', { x: 0, y: -3, width: 46, height: 6, rx: 2, class: 'hist-hoja' });
    const g = svg('g', { transform: 'translate(12 40)' }, hoja);
    const s = svg('svg', { viewBox: '0 0 80 56', class: 'hist-ventana' },
      svg('line', { x1: 0, y1: 40, x2: 12, y2: 40, class: 'hist-techo' }), svg('line', { x1: 58, y1: 40, x2: 80, y2: 40, class: 'hist-techo' }), g,
      svg('circle', { cx: 12, cy: 40, r: 3, class: 'puente-eje' }));
    const estado = el('strong'); const cambios = el('span', { class: 'hist-cambios' });
    const caja = el('div', { class: 'hist-caja' }, el('p', { class: 'hist-titulo' }, titulo), s, estado, cambios);
    return { caja, hoja: g, estado, cambios };
  };
  const vHist = dibujoVentana(`Con histéresis (${ABRIR} / ${CERRAR} °C)`);
  const vUno = dibujoVentana(`Un solo límite (${ABRIR} °C)`);
  vUno.caja.hidden = true;

  const textoTemp = el('strong', { class: 'hist-temp' });
  const botonesLampara = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Posición de la lámpara' },
    Object.entries(POSICIONES).map(([clave, p]) => el('button', { type: 'button', class: 'anim-boton', 'data-lampara': clave,
      onclick: () => { lampara = clave; dibujar(); } }, `💡 ${p.texto}`)));
  const casillaUno = el('input', { type: 'checkbox' });
  const botonReiniciar = el('button', { type: 'button', class: 'anim-boton' }, '↺ Reiniciar');

  contenedor.append(el('div', { class: 'anim-histeresis' },
    el('div', {}, el('p', { class: 'grafica-titulo' }, 'Temperatura dentro del invernadero: ', textoTemp), raiz),
    el('div', { class: 'hist-ventanas' }, vHist.caja, vUno.caja),
    el('p', { class: 'anim-etiqueta' }, 'Lámpara'),
    botonesLampara,
    el('div', { class: 'anim-rapidos' }, botonReiniciar),
    el('label', { class: 'casilla-simple' }, casillaUno, ` Comparar con un solo límite (abre y cierra a ${ABRIR} °C)`)));

  function paso() {
    // Cada 100 ms: la temperatura se acerca a la de la lámpara o a la del salón, con ruido del sensor
    const meta = POSICIONES[lampara].temp;
    temp += (meta - temp) * 0.012 + (Math.random() - 0.5) * 0.18;
    // Con histéresis (como el código de la guía 7)
    const antes = conHist.abierta;
    if (temp > ABRIR) conHist.abierta = true;
    if (temp < CERRAR) conHist.abierta = false;
    if (antes !== conHist.abierta) conHist.cambios++;
    // Un solo límite
    const antesUno = unLimite.abierta;
    unLimite.abierta = temp > ABRIR;
    if (antesUno !== unLimite.abierta) unLimite.cambios++;
    historia.push({ t: tiempo, temp, abierta: conHist.abierta });
    historia = historia.filter((h) => h.t > tiempo - VENTANA_S * 1000);
  }

  function dibujar() {
    const xDe = (t) => x1 - ((tiempo - t) / (VENTANA_S * 1000)) * (x1 - x0);
    linea.setAttribute('points', historia.map((h) => `${xDe(h.t).toFixed(1)},${yDe(Math.max(T_MIN, Math.min(T_MAX, h.temp))).toFixed(1)}`).join(' '));
    // Franja de abajo: verde = ventana abierta
    franja.replaceChildren();
    historia.forEach((h, i) => {
      if (!h.abierta || i === 0) return;
      franja.append(svg('rect', { x: xDe(historia[i - 1].t), y: y0 - 6, width: Math.max(1, xDe(h.t) - xDe(historia[i - 1].t)), height: 6, class: 'hist-abierta' }));
    });
    textoTemp.textContent = `${temp.toFixed(1).replace('.', ',')} °C`;
    for (const [v, e] of [[vHist, conHist], [vUno, unLimite]]) {
      v.hoja.setAttribute('transform', `translate(12 40) rotate(${e.abierta ? -50 : 0})`);
      v.estado.textContent = e.abierta ? 'ventana.write(60) · abierta' : 'ventana.write(0) · cerrada';
      v.cambios.textContent = `Se movió ${e.cambios} ${e.cambios === 1 ? 'vez' : 'veces'}`;
    }
    botonesLampara.querySelectorAll('button').forEach((b) => { const a = b.dataset.lampara === lampara; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(250, t - ultimo) : 0;
    ultimo = t;
    acumulado += dt;
    while (acumulado >= 100) { acumulado -= 100; tiempo += 100; paso(); }
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  casillaUno.addEventListener('change', () => { vUno.caja.hidden = !casillaUno.checked; });
  botonReiniciar.addEventListener('click', () => {
    temp = POSICIONES.lejos.temp; lampara = 'lejos'; historia = [];
    conHist = { abierta: false, cambios: 0 }; unLimite = { abierta: false, cambios: 0 };
    dibujar();
  });
  dibujar();
  requestAnimationFrame(cuadro);
}
