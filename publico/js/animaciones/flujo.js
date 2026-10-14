// ============================================================
// Animación "flujo": diagrama de flujo que se recorre paso a paso.
// Los recuadros se escriben como una lista dentro del bloque:
//
//   :::animacion tipo="flujo"
//   1. [inicio] Encender el Arduino
//   2. [proceso] Leer las perillas
//   3. [decision] ¿Botón presionado? → sí: 5, no: 4
//   4. [proceso] Mover los servos → 2
//   5. [proceso] Rutina automática → 2
//   :::
//
// Tipos: [inicio] [fin] [proceso] [decision] [entrada] [salida] [espera]
// "→ 2" indica a qué número sigue (si no se escribe, sigue el de abajo).
// En una [decision]: "→ sí: 5, no: 4".
//
// Programas listos:  programa="garra" · "puente" · "invernadero" · "dispensador" · "estacion" · "laberinto" · "futbol"  (diagramas de la Guía 3)
// ocultar="si": esconde las respuestas hasta tocar "Mostrar respuestas"
// (útil cuando el equipo debe completar el diagrama primero).
//   - Lo que va entre llaves se esconde:  "Luz {amarilla} y alarma" → "Luz ___ y alarma".
//   - Si ningún paso tiene llaves, se esconden todos los recuadros de acción ("?").
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

const TIPOS = ['inicio', 'fin', 'proceso', 'decision', 'entrada', 'salida', 'espera'];
const ANCHO_NODO = 230;
const ALTO_NODO = 52;
const SEPARACION = 86;
const X_CENTRO = 230;
let contadorDiagramas = 0;

// Programas listos para usar con programa="..."
const PROGRAMAS = {
  // Guía 3: Inicio → ¿Botón presionado? → Sí: rutina / No: leer perillas → mover servos → repetir
  garra: [
    '[inicio] Inicio',
    '[decision] ¿Botón presionado? → sí: 3, no: 4',
    '[proceso] {Rutina automática} → 2',
    '[entrada] {Leer las 4 perillas}',
    '[salida] {Mover los 4 servos} → 2',
  ],
  // Guía 3 del puente levadizo: loop() y secuenciaPuente() de puente_levadizo.ino.
  // Entre llaves, lo que el equipo completa en la tabla g3-secuencia.
  puente: [
    '[inicio] Inicio: puente abajo y luz verde',
    '[entrada] Medir la distancia',
    '[decision] ¿Hay un barco a menos de 10 cm? → sí: 4, no: 2',
    '[salida] Luz {amarilla} y alarma',
    '[salida] Luz {roja}',
    '[proceso] {Subir} el puente',
    '[espera] Esperar 4 segundos',
    '[proceso] {Bajar} el puente',
    '[salida] Luz {verde} → 2',
  ],
  // Guía 3 del mini invernadero: loop() de mini_invernadero.ino.
  // Entre llaves, lo que el equipo completa en la tabla g3-flujo.
  invernadero: [
    '[inicio] Inicio',
    '[entrada] Leer la humedad de la tierra',
    '[decision] ¿Tierra seca o botón presionado? → sí: 4, no: 5',
    '[proceso] {Regar}',
    '[entrada] Leer la temperatura',
    '[decision] ¿Más de 30 °C? → sí: 7, no: 8',
    '[proceso] {Abrir la ventana}',
    '[decision] ¿Menos de 27 °C? → sí: 9, no: 10',
    '[proceso] {Cerrar la ventana}',
    '[decision] ¿Es hora de luz? → sí: 11, no: 12',
    '[salida] {Encender la luz} → 13',
    '[salida] Apagar la luz',
    '[salida] Enviar los datos a la computadora → 2',
  ],
  // Guía 3 de la estación meteorológica: loop() de estacion_meteorologica.ino.
  // Entre llaves, lo que el equipo completa en la tabla g3-pseudo (pasos 2, 3, 4, 5 y 6).
  estacion: [
    '[inicio] Inicio',
    '[entrada] Leer la temperatura y la humedad',
    '[entrada] {Leer la luz}',
    '[decision] ¿Temperatura menor que FRÍO? → sí: 5, no: 6',
    '[salida] LED {azul} → 9',
    '[decision] ¿Temperatura mayor que CALOR? → sí: 7, no: 8',
    '[salida] LED {rojo} → 9',
    '[salida] LED {verde}',
    '[salida] {Mostrar los datos en la pantalla}',
    '[espera] Esperar 2 segundos → 2',
  ],
  // Guía 3 del laberinto: setup() y loop() de laberinto_inclinable.ino.
  // Entre llaves, lo que el equipo completa en la tabla g3-pseudo (pasos 3, 4, 5 y 6).
  laberinto: [
    '[inicio] Inicio',
    '[salida] Mostrar "Presiona para jugar"',
    '[decision] ¿Se presionó el botón? → sí: 4, no: 3',
    '[salida] Empezar a contar el tiempo y sonar un pitido',
    '[entrada] Leer el joystick y {mover los servos}',
    '[salida] Mostrar el {tiempo} en la pantalla',
    '[decision] ¿El sensor de la meta detecta la canica? → sí: 8, no: 5',
    '[salida] {Sonar el buzzer y mostrar el tiempo}',
    '[decision] ¿El tiempo es menor que el récord? → sí: 10, no: 11',
    '[proceso] {Guardar el récord y mostrar "RECORD!"} → 12',
    '[salida] Mostrar "Meta" y el tiempo',
    '[espera] Volver el tablero al centro y esperar → 3',
  ],
  // Guía 3 del mini fútbol: loop() del marcador.
  // Entre llaves, lo que el equipo completa en la tabla g3-pseudo (pasos 2 a 6).
  futbol: [
    '[inicio] Inicio',
    '[salida] Mostrar el marcador en cero y esperar',
    '[decision] ¿Se presionó el botón? → sí: 4, no: 3',
    '[proceso] Goles en 0, empezar el tiempo y sonar el {silbato}',
    '[decision] ¿El sensor de la portería azul ve la pelota? → sí: 6, no: 7',
    '[proceso] Gol del equipo {rojo}',
    '[decision] ¿El sensor de la portería roja ve la pelota? → sí: 8, no: 9',
    '[proceso] Gol del equipo {azul}',
    '[decision] ¿Se acabó el tiempo? → sí: 11, no: 10',
    '[salida] Mostrar el marcador y el {tiempo} que queda → 5',
    '[salida] {Terminar el partido y sonar el final} → 3',
  ],
  // Guía 3 del dispensador: loop() y servir() de dispensador_comida.ino.
  // Entre llaves, lo que el equipo completa en la tabla g3-flujo (SERVIR b, c, e).
  dispensador: [
    '[inicio] Inicio: compuerta cerrada',
    '[decision] ¿Ya pasó el tiempo de la siguiente comida? → sí: 4, no: 3',
    '[decision] ¿Se presionó el botón? → sí: 4, no: 2',
    '[salida] SERVIR: sonar el buzzer para llamar a la mascota',
    '[salida] {Encender el LED}',
    '[proceso] {Abrir la compuerta}',
    '[espera] Esperar según la porción',
    '[proceso] {Cerrar la compuerta y apagar el LED} → 2',
  ],
};

// Convierte una línea de la lista en un recuadro del diagrama
function leerPaso(texto, indice) {
  let tipo = 'proceso';
  let resto = texto.trim();
  const etiqueta = resto.match(/^\[([^\]]+)\]\s*/);
  if (etiqueta) {
    const t = etiqueta[1].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (TIPOS.includes(t)) tipo = t;
    resto = resto.slice(etiqueta[0].length);
  }
  const paso = { indice, tipo, texto: resto, siguiente: indice + 1, si: null, no: null };
  const flecha = resto.match(/\s*(?:→|->)\s*(.+)$/);
  if (flecha) {
    paso.texto = resto.slice(0, flecha.index).trim();
    const destino = flecha[1];
    const si = destino.match(/s[ií]\s*:\s*(\d+)/i);
    const no = destino.match(/no\s*:\s*(\d+)/i);
    if (si || no) {
      paso.si = si ? Number(si[1]) - 1 : indice + 1;
      paso.no = no ? Number(no[1]) - 1 : indice + 1;
    } else if (/^\d+$/.test(destino.trim())) {
      paso.siguiente = Number(destino.trim()) - 1;
    }
  }
  if (paso.tipo === 'decision' && paso.si === null) { paso.si = indice + 1; paso.no = indice + 1; }
  if (paso.tipo === 'fin') paso.siguiente = null;
  return paso;
}

export default function montar(contenedor, config) {
  const lista = Array.isArray(config.lista) ? config.lista : (PROGRAMAS[config.programa] || []);
  if (lista.length === 0) {
    contenedor.append(el('p', { class: 'animacion-cargando' }, 'Este diagrama de flujo no tiene pasos. Escríbelos como una lista dentro del bloque.'));
    return;
  }
  const pasos = lista.map(leerPaso);
  // Respuestas que se ocultan con ocultar="si": lo que está entre {llaves};
  // si no hay llaves en ningún paso, todos los recuadros de acción.
  const conLlaves = pasos.some((p) => /\{[^}]+\}/.test(p.texto));
  const ocultable = (p) => (conLlaves ? /\{[^}]+\}/.test(p.texto) : !['inicio', 'fin', 'decision'].includes(p.tipo));
  let ocultos = config.ocultar === true || config.ocultar === 'si';
  const textoVisible = (p) => {
    if (!ocultos || !ocultable(p)) return p.texto.replace(/[{}]/g, '');
    if (!conLlaves) return '?';
    const escondido = p.texto.replace(/\{[^}]+\}/g, '___').trim();
    return escondido === '___' ? '?' : escondido;
  };
  const total = pasos.length;
  const valido = (i) => i !== null && i >= 0 && i < total;

  // ---------- Conexiones ----------
  const conexiones = [];
  pasos.forEach((p) => {
    if (p.tipo === 'decision') {
      if (valido(p.si)) conexiones.push({ desde: p.indice, hasta: p.si, texto: 'sí' });
      if (valido(p.no)) conexiones.push({ desde: p.indice, hasta: p.no, texto: 'no' });
    } else if (valido(p.siguiente)) {
      conexiones.push({ desde: p.indice, hasta: p.siguiente, texto: '' });
    }
  });

  // Los saltos que no son "al de abajo" van por carriles a los lados
  let carrilDerecho = 0; let carrilIzquierdo = 0;
  conexiones.forEach((c) => {
    if (c.hasta === c.desde + 1) c.carril = null;
    else if (c.hasta <= c.desde) c.carril = { lado: 1, n: ++carrilDerecho };   // hacia atrás: derecha
    else c.carril = { lado: -1, n: ++carrilIzquierdo };                         // hacia adelante: izquierda
  });

  const ANCHO = X_CENTRO * 2 + 40;
  const ALTO = total * SEPARACION + 20;
  const yNodo = (i) => 40 + i * SEPARACION;
  const idFlecha = `flecha-flujo-${++contadorDiagramas}`;
  const raiz = svg('svg', { viewBox: `0 0 ${ANCHO} ${ALTO}`, class: 'flujo-svg', role: 'img', 'aria-label': 'Diagrama de flujo' });
  raiz.append(svg('defs', {}, svg('marker', { id: idFlecha, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' },
    svg('path', { d: 'M 0 0 L 10 5 L 0 10 z', class: 'flujo-punta' }))));

  // Dibujar flechas
  const flechas = conexiones.map((c) => {
    const y1 = yNodo(c.desde); const y2 = yNodo(c.hasta);
    let d; let tx; let ty;
    if (!c.carril) {
      d = `M ${X_CENTRO} ${y1 + ALTO_NODO / 2} L ${X_CENTRO} ${y2 - ALTO_NODO / 2}`;
      tx = X_CENTRO + 10; ty = (y1 + y2) / 2 + 4;
    } else {
      const lado = c.carril.lado;
      const borde = X_CENTRO + lado * (ANCHO_NODO / 2);
      const xCarril = X_CENTRO + lado * (ANCHO_NODO / 2 + 14 + c.carril.n * 12);
      d = `M ${borde} ${y1} L ${xCarril} ${y1} L ${xCarril} ${y2} L ${borde} ${y2}`;
      tx = (borde + xCarril) / 2; ty = y1 - 6;
    }
    const camino = svg('path', { d, class: 'flujo-flecha', 'marker-end': `url(#${idFlecha})` });
    raiz.append(camino);
    if (c.texto) raiz.append(svg('text', { x: tx, y: ty, class: 'flujo-etiqueta', 'text-anchor': c.carril ? 'middle' : 'start' }, c.texto));
    return { ...c, camino };
  });

  // Dibujar recuadros
  const nodos = pasos.map((p) => {
    const y = yNodo(p.indice);
    const g = svg('g', { class: `flujo-nodo flujo-${p.tipo}` });
    const mitadA = ANCHO_NODO / 2; const mitadH = ALTO_NODO / 2;
    if (p.tipo === 'decision') {
      g.append(svg('polygon', { points: `${X_CENTRO},${y - mitadH - 6} ${X_CENTRO + mitadA},${y} ${X_CENTRO},${y + mitadH + 6} ${X_CENTRO - mitadA},${y}` }));
    } else if (p.tipo === 'inicio' || p.tipo === 'fin') {
      g.append(svg('rect', { x: X_CENTRO - mitadA, y: y - mitadH, width: ANCHO_NODO, height: ALTO_NODO, rx: mitadH }));
    } else if (p.tipo === 'entrada' || p.tipo === 'salida') {
      g.append(svg('polygon', { points: `${X_CENTRO - mitadA + 14},${y - mitadH} ${X_CENTRO + mitadA},${y - mitadH} ${X_CENTRO + mitadA - 14},${y + mitadH} ${X_CENTRO - mitadA},${y + mitadH}` }));
    } else {
      g.append(svg('rect', { x: X_CENTRO - mitadA, y: y - mitadH, width: ANCHO_NODO, height: ALTO_NODO, rx: 8 }));
    }
    g.append(svg('text', { x: 14, y: y + 5, class: 'flujo-numero', 'text-anchor': 'middle' }, String(p.indice + 1)));
    raiz.append(g);
    g.ponerTexto = () => {
      g.querySelector('.flujo-texto')?.remove();
      g.append(textoNodo(textoVisible(p), y, p.tipo === 'decision' ? 17 : 24));
    };
    g.ponerTexto();
    return g;
  });

  // Texto de un recuadro en una o dos líneas
  // (en los rombos cabe menos texto por línea)
  function textoNodo(contenido, y, maxLetras = 24) {
    const palabras = contenido.split(/\s+/);
    const lineas = [];
    let actual = '';
    for (const palabra of palabras) {
      if ((actual + ' ' + palabra).trim().length > maxLetras && actual) { lineas.push(actual); actual = palabra; } else actual = (actual + ' ' + palabra).trim();
    }
    lineas.push(actual);
    const texto = svg('text', { x: X_CENTRO, y: y + 5 - (lineas.length - 1) * 8, class: 'flujo-texto', 'text-anchor': 'middle' });
    lineas.slice(0, 3).forEach((l, i) => texto.append(svg('tspan', { x: X_CENTRO, dy: i === 0 ? 0 : 16 }, l)));
    return texto;
  }

  // ---------- Controles ----------
  const ahora = el('p', { class: 'flujo-ahora', 'aria-live': 'polite' });
  const botones = el('div', { class: 'anim-rapidos' });
  const botonAuto = el('button', { type: 'button', class: 'anim-boton' }, '▶ Automático');
  const contadorPasos = el('span', { class: 'flujo-contador' });
  const botonRespuestas = ocultos && pasos.some(ocultable)
    ? el('button', { type: 'button', class: 'anim-boton' }, 'Mostrar respuestas')
    : null;
  botonRespuestas?.addEventListener('click', () => {
    ocultos = !ocultos;
    botonRespuestas.textContent = ocultos ? 'Mostrar respuestas' : 'Ocultar respuestas';
    nodos.forEach((n) => n.ponerTexto());
    mostrar(null);
  });

  contenedor.append(el('div', { class: 'anim-flujo' },
    el('div', { class: 'flujo-dibujo' }, raiz),
    el('div', { class: 'anim-controles flujo-controles' }, ahora, botones,
      el('div', { class: 'anim-rapidos' }, botonAuto,
        el('button', { type: 'button', class: 'anim-boton', onclick: reiniciar }, '↺ Reiniciar'), botonRespuestas),
      contadorPasos),
  ));

  let actual = 0;
  let contador = 1;
  let automatico = null;

  function mostrar(ultimaFlecha) {
    nodos.forEach((n, i) => n.classList.toggle('activo', i === actual));
    flechas.forEach((f) => f.camino.classList.toggle('recorrida', f === ultimaFlecha));
    const paso = pasos[actual];
    ahora.replaceChildren(el('span', {}, `Paso ${actual + 1}: `), el('strong', {}, textoVisible(paso)));
    contadorPasos.textContent = `Instrucciones ejecutadas: ${contador}`;

    botones.replaceChildren();
    if (paso.tipo === 'decision') {
      botones.append(
        el('button', { type: 'button', class: 'boton boton-chico', onclick: () => avanzar('si') }, 'Sí'),
        el('button', { type: 'button', class: 'boton boton-chico boton-secundario', onclick: () => avanzar('no') }, 'No'));
    } else if (siguienteDe(paso) === null) {
      botones.append(el('span', { class: 'anim-estado' }, 'Fin del programa.'));
      detenerAuto();
    } else {
      botones.append(el('button', { type: 'button', class: 'boton boton-chico', onclick: () => avanzar() }, 'Siguiente paso ↓'));
    }
  }

  function siguienteDe(paso, respuesta) {
    if (paso.tipo === 'decision') return respuesta === 'si' ? paso.si : paso.no;
    return valido(paso.siguiente) ? paso.siguiente : null;
  }

  function avanzar(respuesta) {
    const paso = pasos[actual];
    const destino = siguienteDe(paso, respuesta);
    if (!valido(destino)) return;
    const flecha = flechas.find((f) => f.desde === actual && f.hasta === destino &&
      (paso.tipo !== 'decision' || f.texto === (respuesta === 'si' ? 'sí' : 'no')));
    actual = destino;
    contador++;
    mostrar(flecha);
  }

  function reiniciar() { detenerAuto(); actual = 0; contador = 1; mostrar(null); }

  function detenerAuto() {
    clearInterval(automatico);
    automatico = null;
    botonAuto.textContent = '▶ Automático';
  }
  botonAuto.addEventListener('click', () => {
    if (automatico) return detenerAuto();
    botonAuto.textContent = '⏸ Pausa';
    automatico = setInterval(() => {
      // En las decisiones, el modo automático elige al azar
      const paso = pasos[actual];
      avanzar(paso.tipo === 'decision' ? (Math.random() < 0.5 ? 'si' : 'no') : undefined);
    }, 1100);
  });

  mostrar(null);
}
