// ============================================================
// Animación "rutina": una garra en 2D que repite una rutina de movimientos,
// servo por servo, como la función mover() de garra_robotica.ino.
//
// En la guía:
//   :::animacion tipo="rutina" tabla="g7-posiciones"
//   :::
// Opciones (todas opcionales):
//   tabla (o campo)  id de la tabla editable donde el equipo escribió sus ángulos.
//             La tabla puede tener columnas  Servo | Ángulo | Acción  (un servo por fila)
//             o  Base | Hombro | Codo | Pinza  (una posición completa por fila).
//             Se aceptan "abierta" y "cerrada" como ángulos de la pinza.
//   cerrada, abierta   ángulos de la pinza (por defecto 30 y 90)
//   velocidad          ms por grado, como VELOCIDAD en el código (por defecto 15)
//   pinza              ángulo inicial de la pinza (por defecto 60, como pP en la guía 7)
// Sin tabla usa la rutina de garra_robotica.ino.
// Como mover() en el código, los servos se mueven de uno en uno, en el orden base, hombro, codo, pinza.
// ============================================================
import { svg, numero, limitar, puntoTransportador, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const SERVOS = ['base', 'hombro', 'codo', 'pinza'];
const VARIABLES = { base: 'pB', hombro: 'pH', codo: 'pC', pinza: 'pP' };

// Rutina de rutinaAutomatica() en garra_robotica.ino
const RUTINA_DEL_CODIGO = [
  ['pinza', 'ABIERTA', 'abrir'], ['base', 30, 'al objeto'], ['hombro', 120, 'bajar'],
  ['codo', 85, 'acercar'], ['pinza', 'CERRADA', 'agarrar'], ['hombro', 80, 'levantar'],
  ['base', 150, 'al vaso'], ['codo', 75, 'bajar'], ['pinza', 'ABIERTA', 'soltar'], ['base', 90, 'volver'],
];

const quitarTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function nombreServo(texto) {
  const t = quitarTildes(texto);
  if (t.includes('base')) return 'base';
  if (t.includes('hombro')) return 'hombro';
  if (t.includes('codo')) return 'codo';
  if (t.includes('pinza') || t.includes('garra')) return 'pinza';
  return null;
}

export default function montar(contenedor, config) {
  const cerrada = limitar(numero(config.cerrada, 30), 0, 180);
  const abierta = limitar(numero(config.abierta, 90), 0, 180);
  const msPorGrado = limitar(numero(config.velocidad, 15), 1, 100);
  const LIMITES = { base: [0, 180], hombro: [15, 165], codo: [15, 165], pinza: [Math.min(cerrada, abierta), Math.max(cerrada, abierta)] };
  const pinzaInicial = limitar(numero(config.pinza, 60), ...LIMITES.pinza);
  const POSICION_INICIAL = { base: 90, hombro: 90, codo: 90, pinza: pinzaInicial };
  // tabla="id" (texto) es la tabla editable del equipo; una tabla escrita dentro del bloque llega como objeto
  const idTablaEquipo = config.campo || (typeof config.tabla === 'string' ? config.tabla : null);
  const tablaDelBloque = config.tabla && typeof config.tabla === 'object' ? config.tabla : null;

  // Convierte el texto de una celda en ángulo (o null si está vacía)
  function leerAngulo(texto) {
    const t = quitarTildes(texto || '');
    if (t.includes('abiert')) return { valor: abierta, texto: 'ABIERTA' };
    if (t.includes('cerrad')) return { valor: cerrada, texto: 'CERRADA' };
    const m = t.match(/-?\d+/);
    return m ? { valor: Number(m[0]), texto: m[0] } : null;
  }

  // ---------- Leer los pasos ----------
  // Devuelve [{ objetivos: { servo: grados }, codigo: 'mover(...)', nota, falta }]
  function pasosDesdeTabla(encabezados, filas) {
    const enc = encabezados.map(quitarTildes);
    const col = (patron) => enc.findIndex((e) => patron.test(e));
    const colServo = col(/servo|articulacion|motor/);
    const colAngulo = col(/angulo|grados|posicion/);
    // Nombre del paso: columna "Acción" (o parecida); si no hay, la columna "Paso"
    const colAccion = col(/accion|que hace|descripcion|nota|movimiento/);
    const colNota = colAccion >= 0 ? colAccion : col(/paso/);
    const colPose = Object.fromEntries(SERVOS.map((s) => [s, enc.findIndex((e) => e.includes(s))]));

    if (colServo >= 0 && colAngulo >= 0) {
      return filas.map((fila) => {
        const servo = nombreServo(fila[colServo]);
        const angulo = leerAngulo(fila[colAngulo]);
        const nota = colNota >= 0 ? fila[colNota] : '';
        if (!servo || !angulo) return { objetivos: {}, falta: true, nota: nota || fila[colServo] || '', codigo: '' };
        return { objetivos: { [servo]: angulo.valor }, nota, codigo: `mover(${servo}, ${VARIABLES[servo]}, ${angulo.texto});` };
      });
    }
    if (SERVOS.some((s) => colPose[s] >= 0)) {
      return filas.map((fila) => {
        const objetivos = {};
        const partes = [];
        let falta = false;
        for (const s of SERVOS) {
          if (colPose[s] < 0) continue;
          const angulo = leerAngulo(fila[colPose[s]]);
          if (!angulo) { falta = true; continue; }
          objetivos[s] = angulo.valor;
          partes.push(`${s} ${angulo.texto}°`);
        }
        return { objetivos, pose: true, falta: falta && partes.length === 0, nota: colNota >= 0 ? fila[colNota] : '', codigo: partes.join(' · ') };
      });
    }
    return null;
  }

  function pasosDelCodigo() {
    return RUTINA_DEL_CODIGO.map(([servo, angulo, nota]) => ({
      objetivos: { [servo]: angulo === 'ABIERTA' ? abierta : angulo === 'CERRADA' ? cerrada : angulo },
      codigo: `mover(${servo}, ${VARIABLES[servo]}, ${angulo});`,
      nota,
    }));
  }

  // Lee la tabla editable del equipo directamente de la página (encabezados + celdas)
  function leerTablaDelEquipo(tabla) {
    const encabezados = [...tabla.querySelectorAll('thead th')].map((th) => th.textContent.trim());
    const filas = [...tabla.querySelectorAll('tbody tr')].map((tr) =>
      [...tr.children].map((td) => { const input = td.querySelector('input'); return input ? input.value : td.textContent.trim(); }));
    return { encabezados, filas };
  }

  const tablaEquipo = idTablaEquipo ? document.querySelector(`.tabla-editable[data-campo="${CSS.escape(idTablaEquipo)}"]`) : null;
  let origen;
  function cargarPasos() {
    let pasos = null;
    if (tablaEquipo) {
      const { encabezados, filas } = leerTablaDelEquipo(tablaEquipo);
      pasos = pasosDesdeTabla(encabezados, filas);
      origen = 'Ángulos de la tabla de su equipo';
    } else if (tablaDelBloque) {
      pasos = pasosDesdeTabla(tablaDelBloque.encabezados, tablaDelBloque.filas);
      origen = 'Rutina de la guía';
    }
    if (!pasos) {
      pasos = pasosDelCodigo();
      origen = idTablaEquipo && !tablaEquipo
        ? `No se encontró la tabla "${idTablaEquipo}"; se muestra la rutina de garra_robotica.ino`
        : 'Rutina de garra_robotica.ino';
    }
    // Limitar a lo que permite cada servo
    for (const paso of pasos) {
      for (const [s, v] of Object.entries(paso.objetivos)) {
        const [min, max] = LIMITES[s];
        if (v < min || v > max) { paso.objetivos[s] = limitar(v, min, max); paso.limitado = `${s} se limita a ${paso.objetivos[s]}°`; }
      }
    }
    // En tablas de posiciones completas, el código muestra solo los servos que cambian en cada paso
    const anterior = { ...POSICION_INICIAL };
    for (const paso of pasos) {
      if (!paso.pose || paso.falta) continue;
      const cambios = SERVOS.filter((s) => s in paso.objetivos && paso.objetivos[s] !== anterior[s]);
      paso.codigo = cambios.length
        ? cambios.map((s) => `mover(${s}, ${VARIABLES[s]}, ${paso.objetivos[s]});`).join(' ')
        : '(sin cambios)';
      Object.assign(anterior, paso.objetivos);
    }
    return pasos;
  }

  // ---------- Dibujo ----------
  const PISO = 272;
  const HOMBRO = { x: 110, y: 214 };
  const L1 = 105; const L2 = 95; const LP = 32;
  const raiz = svg('svg', { viewBox: '0 0 440 300', class: 'rutina-svg', role: 'img', 'aria-label': 'Garra robótica vista de lado' });
  const brazo = svg('g', { class: 'rutina-brazo' });
  const dial = svg('g', { class: 'rutina-dial' });
  raiz.append(
    svg('line', { x1: 0, y1: PISO, x2: 440, y2: PISO, class: 'rutina-piso' }),
    svg('rect', { x: 78, y: 222, width: 64, height: 50, rx: 6, class: 'rutina-pedestal' }),
    svg('text', { x: 110, y: 292, class: 'rutina-texto', 'text-anchor': 'middle' }, 'Vista de lado'),
    brazo, dial,
  );
  // Dial de la base visto desde arriba
  const DIAL = { x: 360, y: 92, r: 52 };
  const a0 = puntoTransportador(DIAL.x, DIAL.y, DIAL.r, 0); const a180 = puntoTransportador(DIAL.x, DIAL.y, DIAL.r, 180);
  const flechaBase = svg('line', { class: 'rutina-dial-aguja' });
  dial.append(
    svg('path', { d: `M ${a0.x} ${a0.y} A ${DIAL.r} ${DIAL.r} 0 0 0 ${a180.x} ${a180.y} Z`, class: 'rutina-dial-fondo' }),
    flechaBase,
    svg('circle', { cx: DIAL.x, cy: DIAL.y, r: 5, class: 'rutina-dial-eje' }),
    svg('text', { x: DIAL.x, y: DIAL.y + 22, class: 'rutina-texto', 'text-anchor': 'middle' }, 'Base (desde arriba)'),
  );
  const segmento = (clase) => { const l = svg('line', { class: clase }); brazo.append(l); return l; };
  const brazoSuperior = segmento('rutina-segmento');
  const antebrazo = segmento('rutina-segmento');
  const mandibulaA = segmento('rutina-mandibula');
  const mandibulaB = segmento('rutina-mandibula');
  const articulaciones = [0, 1].map(() => { const c = svg('circle', { r: 9, class: 'rutina-articulacion' }); brazo.append(c); return c; });

  const actual = { ...POSICION_INICIAL };

  function dibujar() {
    const rad = (g) => (g * Math.PI) / 180;
    const a1 = 180 - actual.hombro;                 // hombro: más grados = más hacia adelante y abajo
    const a2 = a1 - (180 - actual.codo);            // codo: relativo al brazo
    const codo = { x: HOMBRO.x + L1 * Math.cos(rad(a1)), y: HOMBRO.y - L1 * Math.sin(rad(a1)) };
    const muneca = { x: codo.x + L2 * Math.cos(rad(a2)), y: codo.y - L2 * Math.sin(rad(a2)) };
    const apertura = 6 + 26 * ((actual.pinza - cerrada) / ((abierta - cerrada) || 1));
    const punta = (desvio) => ({ x: muneca.x + LP * Math.cos(rad(a2 + desvio)), y: muneca.y - LP * Math.sin(rad(a2 + desvio)) });
    const pA = punta(apertura); const pB = punta(-apertura);
    const linea = (l, p, q) => { l.setAttribute('x1', p.x); l.setAttribute('y1', p.y); l.setAttribute('x2', q.x); l.setAttribute('y2', q.y); };
    linea(brazoSuperior, HOMBRO, codo);
    linea(antebrazo, codo, muneca);
    linea(mandibulaA, muneca, pA);
    linea(mandibulaB, muneca, pB);
    [HOMBRO, codo].forEach((p, i) => { articulaciones[i].setAttribute('cx', p.x); articulaciones[i].setAttribute('cy', p.y); });
    const aguja = puntoTransportador(DIAL.x, DIAL.y, DIAL.r - 6, actual.base);
    linea(flechaBase, { x: DIAL.x, y: DIAL.y }, aguja);
    for (const s of SERVOS) lecturas[s].textContent = `${Math.round(actual[s])}°`;
  }

  // ---------- Panel ----------
  const lecturas = Object.fromEntries(SERVOS.map((s) => [s, el('strong')]));
  const listaPasos = el('ol', { class: 'rutina-pasos' });
  const lineaCodigo = el('div', { class: 'anim-codigo rutina-codigo' });
  const textoOrigen = el('p', { class: 'rutina-origen' });
  const botonPlay = el('button', { type: 'button', class: 'boton boton-chico' });
  const selectorVelocidad = el('select', { class: 'rutina-velocidad', 'aria-label': 'Velocidad' },
    el('option', { value: '1' }, 'Velocidad real'), el('option', { value: '2', selected: true }, '× 2'), el('option', { value: '4' }, '× 4'));

  contenedor.append(el('div', { class: 'anim-rutina' },
    el('div', { class: 'rutina-dibujo' }, raiz,
      el('div', { class: 'rutina-lecturas' }, SERVOS.map((s) => el('span', {}, `${s[0].toUpperCase()}${s.slice(1)}: `, lecturas[s])))),
    el('div', { class: 'anim-controles' },
      textoOrigen, lineaCodigo,
      el('div', { class: 'anim-rapidos' }, botonPlay,
        el('button', { type: 'button', class: 'anim-boton', onclick: reiniciar }, '↺ Reiniciar'),
        selectorVelocidad),
      listaPasos),
  ));

  // ---------- Reproducción ----------
  let pasos = cargarPasos();
  let indice = 0;
  let reproduciendo = false;
  let pausaHasta = 0;
  let ultimo = 0;

  function dibujarLista() {
    textoOrigen.textContent = origen;
    listaPasos.replaceChildren(...pasos.map((p, i) => el('li', { class: `${i === indice ? 'activo' : ''} ${p.falta ? 'falta' : ''}` },
      el('code', {}, p.falta ? '—' : p.codigo),
      p.nota ? el('span', {}, ` ${p.nota}`) : null,
      p.falta ? el('em', {}, ' (falta el ángulo)') : null,
      p.limitado ? el('em', {}, ` (${p.limitado})`) : null)));
    const paso = pasos[indice];
    lineaCodigo.textContent = paso ? (paso.falta ? `Paso ${indice + 1}: falta el ángulo` : paso.codigo) : '';
    botonPlay.textContent = reproduciendo ? '⏸ Pausa' : '▶ Reproducir';
  }

  function siguientePaso() {
    if (pasos.length === 0) return;
    indice = (indice + 1) % pasos.length; // al terminar, la rutina se repite
    pausaHasta = performance.now() + 300;
    dibujarLista();
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(0.1, (tiempo - ultimo) / 1000) : 0;
    ultimo = tiempo;
    if (reproduciendo && tiempo >= pausaHasta && pasos.length) {
      const paso = pasos[indice];
      if (paso.falta) { siguientePaso(); } else {
        const avance = (1000 / msPorGrado) * Number(selectorVelocidad.value) * dt;
        // Como mover(): un servo a la vez (base, hombro, codo, pinza); el siguiente empieza cuando llega el anterior
        const pendiente = SERVOS.find((s) => s in paso.objetivos && actual[s] !== paso.objetivos[s]);
        if (pendiente) {
          const diferencia = paso.objetivos[pendiente] - actual[pendiente];
          if (Math.abs(diferencia) <= avance || pocoMovimiento()) actual[pendiente] = paso.objetivos[pendiente];
          else actual[pendiente] += Math.sign(diferencia) * avance;
          dibujar();
        } else {
          siguientePaso();
        }
      }
    }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  function reiniciar() {
    reproduciendo = false;
    indice = 0;
    Object.assign(actual, POSICION_INICIAL);
    dibujar();
    dibujarLista();
  }

  botonPlay.addEventListener('click', () => { reproduciendo = !reproduciendo; dibujarLista(); });

  // Si el equipo cambia su tabla, la rutina se actualiza al instante
  if (tablaEquipo) {
    tablaEquipo.addEventListener('input', () => {
      pasos = cargarPasos();
      if (indice >= pasos.length) indice = 0;
      dibujarLista();
    });
  }

  dibujar();
  dibujarLista();
  requestAnimationFrame(cuadro);
}
