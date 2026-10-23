// ============================================================
// API para los estudiantes: entrar con equipo + PIN, ver guías,
// guardar respuestas y marcar guías como completadas.
// ============================================================
const crypto = require('crypto');
const express = require('express');
const db = require('./db');
const { listarProyectos, obtenerProyecto, obtenerGuia, guiasDeVersion } = require('./contenido');
const { estadosDeGuias } = require('./progreso');
const { leerCookie, SEPARADOR_INDIVIDUAL } = require('./util');
const { TIPOS, MAX_POR_CAMPO, recibirArchivo, fotosDeGuia, borrarArchivos } = require('./fotos');
const { EXTENSIONES, limpiarNombre, extensionPermitida, recibirArchivoEquipo, archivosDeGuia, archivosDeEquipo } = require('./archivos-equipo');
const bitacora = require('./bitacora');

const router = express.Router();
const COOKIE = 'sesion_guias';
const DURACION_SESION = 1000 * 60 * 60 * 24 * 180; // 180 días

// ------------------------------------------------------------
// Sesiones
// ------------------------------------------------------------

const consultaSesion = db.prepare(`
  SELECT s.token, s.estudiante, e.id AS equipo_id, e.nombre AS equipo, e.proyecto, e.version
  FROM sesiones s JOIN equipos e ON e.id = s.equipo_id
  WHERE s.token = ?`);
const tocarSesion = db.prepare(`UPDATE sesiones SET ultimo_uso = datetime('now', 'localtime') WHERE token = ?`);

function sesionActual(req) {
  const token = leerCookie(req, COOKIE);
  if (!token) return null;
  const sesion = consultaSesion.get(token);
  if (sesion) tocarSesion.run(token);
  return sesion || null;
}

function requiereSesion(req, res, next) {
  const sesion = sesionActual(req);
  if (!sesion) return res.status(401).json({ error: 'Primero entren con su equipo y PIN.' });
  req.sesion = sesion;
  next();
}

// ------------------------------------------------------------
// Protección contra adivinar el PIN: 5 intentos fallidos → esperar 1 minuto
// ------------------------------------------------------------
const intentos = new Map();
const MAX_INTENTOS = 5;
const ESPERA_MS = 60 * 1000;

function revisarPin(req, equipoId, pin) {
  const clave = `${req.ip}|${equipoId}`;
  const registro = intentos.get(clave) || { fallos: 0, hasta: 0 };
  if (registro.hasta > Date.now()) {
    const segundos = Math.ceil((registro.hasta - Date.now()) / 1000);
    return { error: `Demasiados intentos. Esperen ${segundos} segundos.`, codigo: 429 };
  }
  const equipo = db.prepare('SELECT * FROM equipos WHERE id = ?').get(equipoId);
  if (!equipo) return { error: 'Ese equipo no existe.', codigo: 404 };
  if (equipo.pin !== String(pin)) {
    registro.fallos += 1;
    if (registro.fallos >= MAX_INTENTOS) {
      registro.fallos = 0;
      registro.hasta = Date.now() + ESPERA_MS;
    }
    intentos.set(clave, registro);
    return { error: 'PIN incorrecto. Revísenlo e intenten otra vez.', codigo: 401 };
  }
  intentos.delete(clave);
  return { equipo };
}

// ------------------------------------------------------------
// Rutas públicas (sin sesión)
// ------------------------------------------------------------
router.get('/proyectos', (req, res) => {
  res.json(listarProyectos().map((p) => ({
    id: p.id, nombre: p.nombre, nivel: p.nivel, descripcion: p.descripcion,
    color: p.color, imagen: p.imagen, totalGuias: p.guias.length,
  })));
});

router.get('/proyectos/:id/equipos', (req, res) => {
  const equipos = db.prepare('SELECT id, nombre FROM equipos WHERE proyecto = ? ORDER BY nombre')
    .all(req.params.id);
  res.json(equipos);
});

router.post('/verificar-pin', (req, res) => {
  const { equipoId, pin } = req.body || {};
  const r = revisarPin(req, Number(equipoId), pin);
  if (r.error) return res.status(r.codigo).json({ error: r.error });
  res.json({ ok: true });
});

router.post('/entrar', (req, res) => {
  const { equipoId, pin } = req.body || {};
  const nombre = String((req.body && req.body.nombre) || '').trim().replace(/\s+/g, ' ');
  if (nombre.length < 2 || nombre.length > 40) {
    return res.status(400).json({ error: 'Escribe tu nombre (entre 2 y 40 letras).' });
  }
  const r = revisarPin(req, Number(equipoId), pin);
  if (r.error) return res.status(r.codigo).json({ error: r.error });

  const token = crypto.randomBytes(24).toString('hex');
  db.prepare('INSERT INTO sesiones (token, equipo_id, estudiante) VALUES (?, ?, ?)')
    .run(token, r.equipo.id, nombre);
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'lax', maxAge: DURACION_SESION });
  res.json({ ok: true });
});

router.get('/sesion', (req, res) => {
  const s = sesionActual(req);
  if (!s) return res.status(401).json({ error: 'Sin sesión' });
  const proyecto = obtenerProyecto(s.proyecto);
  res.json({ equipo: s.equipo, estudiante: s.estudiante, proyecto: proyecto ? proyecto.nombre : s.proyecto });
});

router.post('/salir', (req, res) => {
  const token = leerCookie(req, COOKIE);
  if (token) db.prepare('DELETE FROM sesiones WHERE token = ?').run(token);
  res.clearCookie(COOKIE);
  res.json({ ok: true });
});

// ------------------------------------------------------------
// Rutas con sesión
// ------------------------------------------------------------
router.get('/mi-proyecto', requiereSesion, (req, res) => {
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  if (!proyecto) return res.status(404).json({ error: 'El proyecto de este equipo ya no existe.' });
  res.json({
    proyecto: { id: proyecto.id, nombre: proyecto.nombre, nivel: proyecto.nivel, color: proyecto.color, imagen: proyecto.imagen },
    equipo: req.sesion.equipo,
    estudiante: req.sesion.estudiante,
    guias: estadosDeGuias(req.sesion.equipo_id, proyecto),
  });
});

// Carga la guía y revisa que el equipo pueda abrirla
function guiaPermitida(req, res) {
  const numero = parseInt(req.params.numero, 10);
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  if (!proyecto || !numero) { res.status(404).json({ error: 'Guía no encontrada.' }); return null; }
  const info = estadosDeGuias(req.sesion.equipo_id, proyecto).find((g) => g.numero === numero);
  if (!info) { res.status(404).json({ error: 'Guía no encontrada.' }); return null; }
  if (info.estado === 'bloqueada') { res.status(403).json({ error: 'Esta guía todavía está bloqueada.' }); return null; }
  const guia = obtenerGuia(proyecto.id, numero, req.sesion.version);
  if (!guia) { res.status(404).json({ error: 'Esta guía todavía no tiene contenido.' }); return null; }
  return { proyecto, guia, estado: info.estado };
}

router.get('/guias/:numero', requiereSesion, (req, res) => {
  const datos = guiaPermitida(req, res);
  if (!datos) return;
  const { proyecto, guia, estado } = datos;

  const respuestas = {};
  const autores = {};
  const individuales = {}; // respuestas individuales de los compañeros: id → [{ estudiante, valor }]
  for (const fila of db.prepare('SELECT campo, valor, estudiante FROM respuestas WHERE equipo_id = ? AND guia = ?')
    .all(req.sesion.equipo_id, guia.numero)) {
    let valor;
    try { valor = JSON.parse(fila.valor); } catch { valor = fila.valor; }
    const [id, dueno] = fila.campo.split(SEPARADOR_INDIVIDUAL);
    if (dueno !== undefined) {
      // Pregunta individual: la propia va al cuadro de texto; las de los demás, aparte
      if (dueno === req.sesion.estudiante) respuestas[id] = valor;
      else (individuales[id] = individuales[id] || []).push({ estudiante: dueno, valor });
      continue;
    }
    respuestas[fila.campo] = valor;
    autores[fila.campo] = fila.estudiante;
  }

  res.json({
    // Total de guías de la versión del equipo (una versión corta tiene menos)
    proyecto: { id: proyecto.id, nombre: proyecto.nombre, totalGuias: guiasDeVersion(proyecto, req.sesion.version).length, pasoAPaso: proyecto.pasoAPaso },
    equipo: req.sesion.equipo,
    estudiante: req.sesion.estudiante,
    numero: guia.numero,
    titulo: guia.titulo,
    sabado: guia.sabado,
    sesion: guia.sesion,
    estado,
    // Las notas del docente NO se envían a los estudiantes
    partes: guia.partes.map((p) => ({ titulo: p.titulo, tiempo: p.tiempo, html: p.html })),
    checklistsFinales: guia.checklistsFinales,
    respuestas,
    autores,
    individuales,
    fotos: fotosDeGuia(req.sesion.equipo_id, guia.numero),
    archivos: archivosDeGuia(req.sesion.equipo_id, guia.numero),
    posicion: db.prepare('SELECT parte, paso FROM posiciones WHERE equipo_id = ? AND guia = ?')
      .get(req.sesion.equipo_id, guia.numero) || null,
  });
});

// Guardar en qué parte y paso va el equipo (modo paso a paso)
router.post('/guias/:numero/posicion', requiereSesion, (req, res) => {
  const datos = guiaPermitida(req, res);
  if (!datos) return;
  const parte = Number((req.body || {}).parte);
  const paso = Number((req.body || {}).paso);
  const valido = (n, max) => Number.isInteger(n) && n >= 0 && n < max;
  if (!valido(parte, datos.guia.partes.length) || !valido(paso, 200)) {
    return res.status(400).json({ error: 'Posición inválida.' });
  }
  db.prepare(`INSERT INTO posiciones (equipo_id, guia, parte, paso) VALUES (?, ?, ?, ?)
    ON CONFLICT (equipo_id, guia) DO UPDATE SET parte = excluded.parte, paso = excluded.paso,
    actualizado = datetime('now', 'localtime')`).run(req.sesion.equipo_id, datos.guia.numero, parte, paso);
  res.json({ ok: true });
});

// Guardar una respuesta (autoguardado)
const MAX_VALOR = 20000; // caracteres
router.post('/guias/:numero/respuestas', requiereSesion, (req, res) => {
  const datos = guiaPermitida(req, res);
  if (!datos) return;
  const { campo, valor } = req.body || {};
  const tipo = datos.guia.campos[campo];
  if (!tipo || tipo === 'foto' || tipo === 'archivo') return res.status(400).json({ error: 'Ese campo no existe en la guía.' });

  // Cada tipo de campo tiene su forma: texto, opción elegida, tabla {"fila-col": "..."} o casillas {"0": true}
  const esTexto = ['texto', 'individual', 'opcion'].includes(tipo);
  if (esTexto && typeof valor !== 'string') return res.status(400).json({ error: 'Valor inválido.' });
  if (!esTexto && (typeof valor !== 'object' || valor === null || Array.isArray(valor))) {
    return res.status(400).json({ error: 'Valor inválido.' });
  }
  if (tipo === 'opcion' && valor !== '' && !(datos.guia.opciones[campo] || []).includes(valor)) {
    return res.status(400).json({ error: 'Esa opción no existe.' });
  }
  const json = JSON.stringify(valor);
  if (json.length > MAX_VALOR) return res.status(413).json({ error: 'La respuesta es demasiado larga.' });

  const equipoId = req.sesion.equipo_id;
  const numero = datos.guia.numero;
  // Las preguntas individuales se guardan una vez por estudiante
  const campoGuardado = tipo === 'individual' ? `${campo}${SEPARADOR_INDIVIDUAL}${req.sesion.estudiante}` : campo;
  db.transaction(() => {
    db.prepare(`
      INSERT INTO respuestas (equipo_id, guia, campo, valor, estudiante, actualizado)
      VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'))
      ON CONFLICT (equipo_id, guia, campo) DO UPDATE SET
        valor = excluded.valor, estudiante = excluded.estudiante, actualizado = excluded.actualizado
    `).run(equipoId, numero, campoGuardado, json, req.sesion.estudiante);
    // La primera respuesta pasa la guía a "en progreso" (si no estaba completada)
    db.prepare(`INSERT OR IGNORE INTO progreso (equipo_id, guia, estado) VALUES (?, ?, 'en_progreso')`)
      .run(equipoId, numero);
  })();

  res.json({ ok: true });
});

// ------------------------------------------------------------
// Fotos y videos de la bitácora
// El archivo llega tal cual en el cuerpo (Content-Type: image/jpeg, video/mp4...)
// ------------------------------------------------------------
router.post('/guias/:numero/fotos/:campo', requiereSesion, async (req, res) => {
  const datos = guiaPermitida(req, res);
  if (!datos) return;
  const campo = req.params.campo;
  if (datos.guia.campos[campo] !== 'foto') return res.status(400).json({ error: 'Aquí no se pueden subir fotos.' });
  const tipo = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (!TIPOS[tipo]) return res.status(415).json({ error: 'Solo se pueden subir fotos (JPG, PNG, WEBP) o videos (MP4, MOV, WEBM).' });

  const equipoId = req.sesion.equipo_id;
  const numero = datos.guia.numero;
  const { total } = db.prepare('SELECT COUNT(*) AS total FROM fotos WHERE equipo_id = ? AND guia = ? AND campo = ?').get(equipoId, numero, campo);
  if (total >= MAX_POR_CAMPO) return res.status(400).json({ error: `Máximo ${MAX_POR_CAMPO} archivos en este espacio. Borren alguno primero.` });

  try {
    const { archivo, tamano } = await recibirArchivo(req, { proyecto: datos.proyecto.id, equipoId, guia: numero, tipo });
    const { lastInsertRowid } = db.prepare(
      'INSERT INTO fotos (equipo_id, guia, campo, archivo, tipo, tamano, estudiante) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(equipoId, numero, campo, archivo, tipo, tamano, req.sesion.estudiante);
    db.prepare(`INSERT OR IGNORE INTO progreso (equipo_id, guia, estado) VALUES (?, ?, 'en_progreso')`).run(equipoId, numero);
    res.json({ ok: true, foto: { id: Number(lastInsertRowid), tipo, tamano, estudiante: req.sesion.estudiante } });
  } catch (error) {
    if (!res.headersSent) res.status(error.codigo || 500).json({ error: error.message || 'No se pudo guardar el archivo.' });
  }
});

// ------------------------------------------------------------
// Archivos de trabajo del equipo (.blend, .ino, .zip…)
// El archivo llega tal cual en el cuerpo; su nombre, en la cabecera X-Nombre-Archivo
// (codificado con encodeURIComponent para que lleguen bien las tildes).
// ------------------------------------------------------------
router.post('/guias/:numero/archivos/:campo', requiereSesion, async (req, res) => {
  const datos = guiaPermitida(req, res);
  if (!datos) return;
  const campo = req.params.campo;
  if (datos.guia.campos[campo] !== 'archivo') return res.status(400).json({ error: 'Aquí no se pueden subir archivos.' });
  let nombre;
  try { nombre = limpiarNombre(decodeURIComponent(String(req.headers['x-nombre-archivo'] || ''))); } catch { nombre = ''; }
  if (!nombre || !extensionPermitida(nombre)) {
    return res.status(415).json({ error: `Solo se pueden subir archivos ${EXTENSIONES.join(' ')}` });
  }
  const equipoId = req.sesion.equipo_id;
  const numero = datos.guia.numero;
  try {
    const id = await recibirArchivoEquipo(req, { proyecto: datos.proyecto.id, equipoId, guia: numero, campo, nombre, estudiante: req.sesion.estudiante });
    db.prepare(`INSERT OR IGNORE INTO progreso (equipo_id, guia, estado) VALUES (?, ?, 'en_progreso')`).run(equipoId, numero);
    res.json({ ok: true, id, archivos: archivosDeGuia(equipoId, numero)[campo] || [] });
  } catch (error) {
    if (!res.headersSent) res.status(error.codigo || 500).json({ error: error.message || 'No se pudo guardar el archivo.' });
  }
});

// Todos los archivos del equipo (página del proyecto)
router.get('/mis-archivos', requiereSesion, (req, res) => {
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  const titulos = {};
  if (proyecto) for (const g of estadosDeGuias(req.sesion.equipo_id, proyecto)) titulos[g.numero] = g.titulo;
  res.json({ archivos: archivosDeEquipo(req.sesion.equipo_id).map((a) => ({ ...a, tituloGuia: titulos[a.guia] || '' })) });
});

// Borrar una foto del propio equipo
router.delete('/fotos/:id', requiereSesion, (req, res) => {
  const foto = db.prepare('SELECT * FROM fotos WHERE id = ? AND equipo_id = ?').get(req.params.id, req.sesion.equipo_id);
  if (!foto) return res.status(404).json({ error: 'Esa foto no existe.' });
  db.prepare('DELETE FROM fotos WHERE id = ?').run(foto.id);
  borrarArchivos([foto]);
  res.json({ ok: true });
});

// Marcar la guía como completada (solo si todo "¿Lo logramos?" está marcado)
router.post('/guias/:numero/completar', requiereSesion, (req, res) => {
  const datos = guiaPermitida(req, res);
  if (!datos) return;
  const equipoId = req.sesion.equipo_id;
  const numero = datos.guia.numero;

  for (const lista of datos.guia.checklistsFinales) {
    const fila = db.prepare('SELECT valor FROM respuestas WHERE equipo_id = ? AND guia = ? AND campo = ?')
      .get(equipoId, numero, lista.id);
    const marcadas = fila ? JSON.parse(fila.valor) : {};
    for (let i = 0; i < lista.total; i++) {
      if (marcadas[i] !== true) {
        return res.status(400).json({ error: 'Todavía faltan casillas de "¿Lo logramos?".' });
      }
    }
  }

  db.prepare(`
    INSERT INTO progreso (equipo_id, guia, estado, completada_por, actualizado)
    VALUES (?, ?, 'completada', ?, datetime('now', 'localtime'))
    ON CONFLICT (equipo_id, guia) DO UPDATE SET
      estado = 'completada', completada_por = excluded.completada_por, actualizado = excluded.actualizado
  `).run(equipoId, numero, req.sesion.estudiante);

  res.json({ ok: true });
});

// ------------------------------------------------------------
// Bitácora del equipo (notas que acompañan todas las guías)
// ------------------------------------------------------------
router.get('/bitacora', requiereSesion, (req, res) => {
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  res.json({
    notas: bitacora.notasDeEquipo(req.sesion.equipo_id),
    titulos: Object.fromEntries((proyecto ? proyecto.guias : []).map((g) => [g.numero, g.titulo])),
    maxTexto: bitacora.MAX_TEXTO,
  });
});

// Nueva nota vacía; guia es la guía abierta (o null desde la página del proyecto)
router.post('/bitacora', requiereSesion, (req, res) => {
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  const numero = Number((req.body || {}).guia);
  const guia = proyecto && proyecto.guias.some((g) => g.numero === numero) ? numero : null;
  const r = bitacora.crearNota(req.sesion.equipo_id, guia, req.sesion.estudiante);
  if (r.error) return res.status(400).json({ error: r.error });
  res.json(r.nota);
});

router.put('/bitacora/:id', requiereSesion, (req, res) => {
  const nota = bitacora.notaDelEquipo(Number(req.params.id), req.sesion.equipo_id);
  if (!nota) return res.status(404).json({ error: 'Esa nota ya no existe.' });
  const texto = (req.body || {}).texto;
  if (typeof texto !== 'string') return res.status(400).json({ error: 'Texto inválido.' });
  if (texto.length > bitacora.MAX_TEXTO) return res.status(413).json({ error: `La nota es muy larga (máximo ${bitacora.MAX_TEXTO} letras). Empiecen otra nota.` });
  bitacora.guardarNota(nota.id, texto, req.sesion.estudiante);
  res.json({ ok: true });
});

router.delete('/bitacora/:id', requiereSesion, (req, res) => {
  const nota = bitacora.notaDelEquipo(Number(req.params.id), req.sesion.equipo_id);
  if (!nota) return res.status(404).json({ error: 'Esa nota ya no existe.' });
  bitacora.borrarNota(nota.id);
  res.json({ ok: true });
});

module.exports = { router, sesionActual, guiaPermitida };
