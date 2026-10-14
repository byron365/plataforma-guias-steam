// ============================================================
// API del panel del docente (todas las rutas piden la contraseña del .env)
// ============================================================
const crypto = require('crypto');
const express = require('express');
const QRCode = require('qrcode');
const db = require('./db');
const { CLAVE_DOCENTE, PUERTO } = require('./config');
const { listarProyectos, obtenerProyecto, obtenerGuia, crearProyecto } = require('./contenido');
const { estadosDeGuias } = require('./progreso');
const { leerCookie, direccionesLocales, SEPARADOR_INDIVIDUAL } = require('./util');
const { fotosDeGuia, borrarFotosDeEquipo } = require('./fotos');
const { archivosDeGuia, archivosDeEquipo, borrarArchivosDeEquipo } = require('./archivos-equipo');
const { notasDeEquipo } = require('./bitacora');
const { respaldar, listarRespaldos } = require('./respaldos');
const { RUTAS } = require('./config');

const router = express.Router();
const COOKIE = 'sesion_docente';
const DURACION_MS = 1000 * 60 * 60 * 12; // la sesión del docente dura 12 horas
const CLAVE_DE_EJEMPLO = 'cambia-esta-clave';

// ------------------------------------------------------------
// Entrar y salir
// ------------------------------------------------------------
const consultaSesion = db.prepare(
  "SELECT token FROM sesiones_docente WHERE token = ? AND creada > datetime('now', 'localtime', '-12 hours')");

function esDocente(req) {
  const token = leerCookie(req, COOKIE);
  return !!(token && consultaSesion.get(token));
}

function requiereDocente(req, res, next) {
  if (!esDocente(req)) return res.status(401).json({ error: 'Entra con la contraseña del docente.' });
  next();
}

// Compara contraseñas sin revelar cuánto se parecen (tiempo constante)
function claveCorrecta(intento) {
  const a = crypto.createHash('sha256').update(String(intento)).digest();
  const b = crypto.createHash('sha256').update(CLAVE_DOCENTE).digest();
  return crypto.timingSafeEqual(a, b);
}

// 5 intentos fallidos → esperar 2 minutos
const intentos = new Map();
router.post('/entrar', (req, res) => {
  if (!CLAVE_DOCENTE) {
    return res.status(503).json({ error: 'Falta la contraseña: escribe DOCENTE_CLAVE en el archivo .env y reinicia el servidor.' });
  }
  const registro = intentos.get(req.ip) || { fallos: 0, hasta: 0 };
  if (registro.hasta > Date.now()) {
    return res.status(429).json({ error: `Demasiados intentos. Espera ${Math.ceil((registro.hasta - Date.now()) / 1000)} segundos.` });
  }
  if (!claveCorrecta((req.body && req.body.clave) || '')) {
    registro.fallos += 1;
    if (registro.fallos >= 5) { registro.fallos = 0; registro.hasta = Date.now() + 2 * 60 * 1000; }
    intentos.set(req.ip, registro);
    return res.status(401).json({ error: 'Contraseña incorrecta.' });
  }
  intentos.delete(req.ip);
  const token = crypto.randomBytes(24).toString('hex');
  db.prepare('INSERT INTO sesiones_docente (token) VALUES (?)').run(token);
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'strict', maxAge: DURACION_MS });
  res.json({ ok: true });
});

router.get('/sesion', (req, res) => {
  if (!esDocente(req)) return res.status(401).json({ error: 'Sin sesión' });
  res.json({ ok: true, claveInsegura: CLAVE_DOCENTE === CLAVE_DE_EJEMPLO || CLAVE_DOCENTE.length < 6 });
});

router.post('/salir', (req, res) => {
  const token = leerCookie(req, COOKIE);
  if (token) db.prepare('DELETE FROM sesiones_docente WHERE token = ?').run(token);
  res.clearCookie(COOKIE);
  res.json({ ok: true });
});

// Todo lo de abajo necesita sesión de docente
router.use(requiereDocente);

// ------------------------------------------------------------
// Resumen: proyectos, equipos, avance y dirección para compartir
// ------------------------------------------------------------
let qrGuardado = { url: '', svg: '' };
async function datosDeRed() {
  const direcciones = direccionesLocales().map((d) => ({ ...d, url: `http://${d.ip}:${PUERTO}` }));
  const principal = direcciones[0] ? direcciones[0].url : `http://localhost:${PUERTO}`;
  if (qrGuardado.url !== principal) {
    qrGuardado = { url: principal, svg: await QRCode.toString(principal, { type: 'svg', margin: 1, color: { dark: '#0E1015', light: '#FFFFFF' } }) };
  }
  return { principal, direcciones, qr: qrGuardado.svg };
}

router.get('/resumen', async (req, res) => {
  const proyectos = listarProyectos();
  const desbloqueosProyecto = db.prepare('SELECT guia FROM desbloqueos WHERE proyecto = ? AND equipo_id = 0');
  const desbloqueosEquipo = db.prepare('SELECT guia FROM desbloqueos WHERE equipo_id = ?');
  const estudiantes = db.prepare('SELECT DISTINCT estudiante FROM sesiones WHERE equipo_id = ? ORDER BY estudiante');
  const actividad = db.prepare('SELECT MAX(actualizado) AS ultima FROM respuestas WHERE equipo_id = ?');
  const contestados = db.prepare('SELECT guia, COUNT(*) AS total FROM respuestas WHERE equipo_id = ? GROUP BY guia');

  const equipos = db.prepare('SELECT * FROM equipos ORDER BY proyecto, nombre COLLATE NOCASE').all().map((e) => {
    const proyecto = proyectos.find((p) => p.id === e.proyecto);
    const porGuia = Object.fromEntries(contestados.all(e.id).map((f) => [f.guia, f.total]));
    return {
      id: e.id,
      proyecto: e.proyecto,
      nombre: e.nombre,
      pin: e.pin,
      estudiantes: estudiantes.all(e.id).map((f) => f.estudiante),
      ultimaActividad: actividad.get(e.id).ultima,
      desbloqueosPropios: desbloqueosEquipo.all(e.id).map((f) => f.guia),
      archivos: archivosDeEquipo(e.id),
      bitacora: notasDeEquipo(e.id).filter((n) => n.texto.trim() !== ''),
      guias: proyecto
        ? estadosDeGuias(e.id, proyecto).map((g) => ({ numero: g.numero, estado: g.estado, respuestas: porGuia[g.numero] || 0 }))
        : [],
    };
  });

  res.json({
    proyectos: proyectos.map((p) => ({
      id: p.id, nombre: p.nombre, nivel: p.nivel,
      guias: p.guias.map((g) => ({ numero: g.numero, titulo: g.titulo, sabado: g.sabado, sesion: g.sesion, existe: g.existe })),
      desbloqueadas: desbloqueosProyecto.all(p.id).map((f) => f.guia),
    })),
    equipos,
    red: await datosDeRed(),
  });
});

// ------------------------------------------------------------
// Equipos
// ------------------------------------------------------------
function validarEquipo({ nombre, pin }, parcial = false) {
  const datos = {};
  if (nombre !== undefined || !parcial) {
    const limpio = String(nombre || '').trim().replace(/\s+/g, ' ');
    if (limpio.length < 2 || limpio.length > 40) return { error: 'El nombre del equipo debe tener entre 2 y 40 letras.' };
    datos.nombre = limpio;
  }
  if (pin !== undefined || !parcial) {
    if (!/^\d{4}$/.test(String(pin || ''))) return { error: 'El PIN debe tener exactamente 4 números.' };
    datos.pin = String(pin);
  }
  return { datos };
}

const nombreRepetido = db.prepare('SELECT id FROM equipos WHERE proyecto = ? AND nombre = ? COLLATE NOCASE AND id != ?');

router.post('/equipos', (req, res) => {
  const proyecto = obtenerProyecto(String((req.body && req.body.proyecto) || ''));
  if (!proyecto) return res.status(400).json({ error: 'Elige un proyecto.' });
  const { datos, error } = validarEquipo(req.body || {});
  if (error) return res.status(400).json({ error });
  if (nombreRepetido.get(proyecto.id, datos.nombre, 0)) return res.status(400).json({ error: 'Ya hay un equipo con ese nombre en este proyecto.' });
  const { lastInsertRowid } = db.prepare('INSERT INTO equipos (proyecto, nombre, pin) VALUES (?, ?, ?)').run(proyecto.id, datos.nombre, datos.pin);
  res.json({ ok: true, id: Number(lastInsertRowid) });
});

router.put('/equipos/:id', (req, res) => {
  const equipo = db.prepare('SELECT * FROM equipos WHERE id = ?').get(req.params.id);
  if (!equipo) return res.status(404).json({ error: 'Ese equipo no existe.' });
  const { datos, error } = validarEquipo(req.body || {}, true);
  if (error) return res.status(400).json({ error });
  if (datos.nombre && nombreRepetido.get(equipo.proyecto, datos.nombre, equipo.id)) {
    return res.status(400).json({ error: 'Ya hay un equipo con ese nombre en este proyecto.' });
  }
  db.prepare('UPDATE equipos SET nombre = ?, pin = ? WHERE id = ?')
    .run(datos.nombre || equipo.nombre, datos.pin || equipo.pin, equipo.id);
  // Si cambió el PIN, los dispositivos del equipo deben volver a entrar
  if (datos.pin && datos.pin !== equipo.pin) db.prepare('DELETE FROM sesiones WHERE equipo_id = ?').run(equipo.id);
  res.json({ ok: true });
});

router.delete('/equipos/:id', (req, res) => {
  const id = Number(req.params.id);
  borrarFotosDeEquipo(id); // archivos de fotos y videos
  borrarArchivosDeEquipo(id); // archivos de trabajo (.blend, .ino…)
  db.transaction(() => {
    db.prepare('DELETE FROM desbloqueos WHERE equipo_id = ?').run(id);
    db.prepare('DELETE FROM equipos WHERE id = ?').run(id); // borra también sesiones, respuestas y progreso
  })();
  res.json({ ok: true });
});

// Reiniciar el progreso de un equipo (todas las guías o una sola).
// Los archivos de trabajo (.blend, .ino…) NO se borran: el equipo puede seguir usándolos.
router.post('/equipos/:id/reiniciar', (req, res) => {
  const id = Number(req.params.id);
  const guia = req.body && req.body.guia ? Number(req.body.guia) : null;
  borrarFotosDeEquipo(id, guia);
  db.transaction(() => {
    if (guia) {
      db.prepare('DELETE FROM respuestas WHERE equipo_id = ? AND guia = ?').run(id, guia);
      db.prepare('DELETE FROM progreso WHERE equipo_id = ? AND guia = ?').run(id, guia);
      db.prepare('DELETE FROM posiciones WHERE equipo_id = ? AND guia = ?').run(id, guia);
    } else {
      db.prepare('DELETE FROM respuestas WHERE equipo_id = ?').run(id);
      db.prepare('DELETE FROM progreso WHERE equipo_id = ?').run(id);
      db.prepare('DELETE FROM posiciones WHERE equipo_id = ?').run(id);
    }
  })();
  res.json({ ok: true });
});

// ------------------------------------------------------------
// Desbloquear o bloquear guías (para todo el proyecto o para un equipo)
// body: { proyecto, guias: [1, 2] , equipoId: 0, desbloquear: true }
// ------------------------------------------------------------
router.post('/desbloqueos', (req, res) => {
  const { proyecto: idProyecto, guias, equipoId = 0, desbloquear } = req.body || {};
  const proyecto = obtenerProyecto(String(idProyecto || ''));
  if (!proyecto) return res.status(400).json({ error: 'Proyecto no válido.' });
  const numeros = (Array.isArray(guias) ? guias : [guias]).map(Number).filter((n) => proyecto.guias.some((g) => g.numero === n));
  const equipo = Number(equipoId) || 0;
  const agregar = db.prepare('INSERT OR IGNORE INTO desbloqueos (proyecto, guia, equipo_id) VALUES (?, ?, ?)');
  const quitar = db.prepare('DELETE FROM desbloqueos WHERE proyecto = ? AND guia = ? AND equipo_id = ?');
  db.transaction(() => {
    for (const n of numeros) {
      if (desbloquear) agregar.run(proyecto.id, n, equipo);
      else quitar.run(proyecto.id, n, equipo);
    }
  })();
  res.json({ ok: true });
});

// ------------------------------------------------------------
// Una guía vista por el docente: contenido + notas + (opcional) respuestas de un equipo
// ------------------------------------------------------------
router.get('/guias/:proyecto/:numero', (req, res) => {
  const proyecto = obtenerProyecto(req.params.proyecto);
  const numero = parseInt(req.params.numero, 10);
  const guia = proyecto && obtenerGuia(proyecto.id, numero);
  if (!guia) return res.status(404).json({ error: 'Esa guía no existe o todavía no tiene archivo.' });

  const datos = {
    proyecto: { id: proyecto.id, nombre: proyecto.nombre },
    numero, titulo: guia.titulo, sabado: guia.sabado, sesion: guia.sesion,
    partes: guia.partes, // incluye las notas del docente
    checklistsFinales: guia.checklistsFinales,
  };

  if (req.query.equipo) {
    const equipo = db.prepare('SELECT * FROM equipos WHERE id = ?').get(req.query.equipo);
    if (!equipo) return res.status(404).json({ error: 'Ese equipo no existe.' });
    const respuestas = {};
    const autores = {};
    const individuales = {};
    for (const fila of db.prepare('SELECT campo, valor, estudiante, actualizado FROM respuestas WHERE equipo_id = ? AND guia = ?').all(equipo.id, numero)) {
      let valor;
      try { valor = JSON.parse(fila.valor); } catch { valor = fila.valor; }
      const [id, dueno] = fila.campo.split(SEPARADOR_INDIVIDUAL);
      if (dueno !== undefined) {
        (individuales[id] = individuales[id] || []).push({ estudiante: dueno, valor, actualizado: fila.actualizado });
      } else {
        respuestas[id] = valor;
        autores[id] = { estudiante: fila.estudiante, actualizado: fila.actualizado };
      }
    }
    const progreso = db.prepare('SELECT * FROM progreso WHERE equipo_id = ? AND guia = ?').get(equipo.id, numero);
    const estado = estadosDeGuias(equipo.id, proyecto).find((g) => g.numero === numero);
    datos.equipo = { id: equipo.id, nombre: equipo.nombre };
    datos.estado = estado ? estado.estado : 'bloqueada';
    datos.completadaPor = progreso && progreso.estado === 'completada' ? { estudiante: progreso.completada_por, fecha: progreso.actualizado } : null;
    Object.assign(datos, { respuestas, autores, individuales, fotos: fotosDeGuia(equipo.id, numero), archivos: archivosDeGuia(equipo.id, numero) });
  }
  res.json(datos);
});

// ------------------------------------------------------------
// Crear un proyecto nuevo (carpeta + proyecto.json)
// ------------------------------------------------------------
router.post('/proyectos', (req, res) => {
  const { nombre, nivel = '', descripcion = '', totalGuias = 14 } = req.body || {};
  const limpio = String(nombre || '').trim();
  if (limpio.length < 3 || limpio.length > 60) return res.status(400).json({ error: 'El nombre debe tener entre 3 y 60 letras.' });
  const total = Math.round(Number(totalGuias));
  if (!(total >= 1 && total <= 40)) return res.status(400).json({ error: 'El número de guías debe estar entre 1 y 40.' });
  try {
    const id = crearProyecto({ nombre: limpio, nivel: String(nivel).trim(), descripcion: String(descripcion).trim(), totalGuias: total });
    res.json({ ok: true, id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ------------------------------------------------------------
// Exportar a CSV (se abre con Excel o Google Sheets)
// ------------------------------------------------------------
// Evita que Excel interprete una respuesta como fórmula (=, +, -, @)
function celdaCSV(valor) {
  let texto = valor === null || valor === undefined ? '' : String(valor);
  if (/^[=+\-@\t\r]/.test(texto)) texto = `'${texto}`;
  return `"${texto.replace(/"/g, '""')}"`;
}
const filaCSV = (celdas) => celdas.map(celdaCSV).join(',');

// Convierte una respuesta guardada en texto legible
function respuestaLegible(tipo, valor, etiqueta = {}) {
  if (tipo === 'tabla' && valor && typeof valor === 'object') {
    return Object.entries(valor)
      .filter(([, v]) => String(v).trim() !== '')
      .sort(([a], [b]) => { const [ra, ca] = a.split('-').map(Number); const [rb, cb] = b.split('-').map(Number); return ra - rb || ca - cb; })
      .map(([celda, v]) => {
        const [r, c] = celda.split('-').map(Number);
        const fila = (etiqueta.filas && etiqueta.filas[r]) || `Fila ${r + 1}`;
        const columna = (etiqueta.encabezados && etiqueta.encabezados[c]) || `Columna ${c + 1}`;
        return `${fila} / ${columna}: ${v}`;
      }).join(' | ');
  }
  if (tipo === 'checklist' && valor && typeof valor === 'object') {
    const items = etiqueta.items || Object.keys(valor).map((k) => `Casilla ${Number(k) + 1}`);
    return items.map((t, i) => `${valor[i] === true ? '[x]' : '[ ]'} ${t}`).join(' | ');
  }
  return typeof valor === 'string' ? valor : JSON.stringify(valor);
}

const TEXTO_ESTADO = { bloqueada: 'Bloqueada', proximamente: 'Sin archivo', disponible: 'Disponible', en_progreso: 'En progreso', completada: 'Completada' };

router.get('/exportar/:tipo', (req, res) => {
  const proyectos = listarProyectos();
  const equipos = db.prepare('SELECT * FROM equipos ORDER BY proyecto, nombre COLLATE NOCASE').all();
  const lineas = [];
  const fecha = new Date().toISOString().slice(0, 10);

  if (req.params.tipo === 'avance.csv') {
    const maxGuias = Math.max(0, ...proyectos.map((p) => p.guias.length));
    lineas.push(filaCSV(['Proyecto', 'Equipo', 'Completadas', ...Array.from({ length: maxGuias }, (_, i) => `Guía ${i + 1}`)]));
    for (const e of equipos) {
      const proyecto = proyectos.find((p) => p.id === e.proyecto);
      if (!proyecto) continue;
      const estados = estadosDeGuias(e.id, proyecto);
      lineas.push(filaCSV([proyecto.nombre, e.nombre, estados.filter((g) => g.estado === 'completada').length,
        ...estados.map((g) => TEXTO_ESTADO[g.estado] || g.estado)]));
    }
  } else if (req.params.tipo === 'respuestas.csv') {
    lineas.push(filaCSV(['Proyecto', 'Equipo', 'Guía', 'Título de la guía', 'Campo', 'Pregunta o tabla', 'Estudiante', 'Respuesta', 'Fecha']));
    const consulta = db.prepare('SELECT * FROM respuestas WHERE equipo_id = ? ORDER BY guia, campo');
    for (const e of equipos) {
      const proyecto = proyectos.find((p) => p.id === e.proyecto);
      if (!proyecto) continue;
      for (const fila of consulta.all(e.id)) {
        const guia = obtenerGuia(proyecto.id, fila.guia);
        const [id, dueno] = fila.campo.split(SEPARADOR_INDIVIDUAL);
        const tipo = guia ? guia.campos[id] : null;
        const etiqueta = (guia && guia.etiquetas[id]) || {};
        let valor;
        try { valor = JSON.parse(fila.valor); } catch { valor = fila.valor; }
        const texto = respuestaLegible(tipo, valor, etiqueta);
        if (!texto.trim()) continue; // respuestas borradas
        const descripcion = etiqueta.pregunta || (etiqueta.encabezados ? `Tabla: ${etiqueta.encabezados.join(' · ')}` : '') ||
          (etiqueta.items ? 'Lista de verificación' : '');
        lineas.push(filaCSV([proyecto.nombre, e.nombre, fila.guia, guia ? guia.titulo : '', id, descripcion,
          dueno !== undefined ? dueno : fila.estudiante, texto, fila.actualizado]));
      }
      // Fotos y videos: una fila por archivo con su ubicación en subidas/
      for (const foto of db.prepare('SELECT * FROM fotos WHERE equipo_id = ? ORDER BY guia, id').all(e.id)) {
        const guia = obtenerGuia(proyecto.id, foto.guia);
        const etiqueta = (guia && guia.etiquetas[foto.campo]) || {};
        lineas.push(filaCSV([proyecto.nombre, e.nombre, foto.guia, guia ? guia.titulo : '', foto.campo,
          etiqueta.pregunta || 'Foto', foto.estudiante, `${foto.tipo.startsWith('video') ? 'Video' : 'Foto'}: subidas/${foto.archivo}`, foto.creada]));
      }
      // Bitácora: una fila por nota (las vacías no se exportan)
      for (const n of notasDeEquipo(e.id).reverse()) {
        if (!n.texto.trim()) continue;
        const guia = n.guia ? obtenerGuia(proyecto.id, n.guia) : null;
        lineas.push(filaCSV([proyecto.nombre, e.nombre, n.guia || '', guia ? guia.titulo : '', 'bitacora',
          'Bitácora', n.editadoPor || n.autor, n.texto, n.actualizada]));
      }
      // Archivos de trabajo: una fila por versión guardada
      for (const a of archivosDeEquipo(e.id)) {
        const guia = obtenerGuia(proyecto.id, a.guia);
        lineas.push(filaCSV([proyecto.nombre, e.nombre, a.guia, guia ? guia.titulo : '', a.campo,
          'Archivo de trabajo', a.estudiante, `Archivo: ${a.nombre} (${Math.max(1, Math.round(a.tamano / 1024))} KB)`, a.creado]));
      }
    }
  } else {
    return res.status(404).json({ error: 'Exportación no encontrada.' });
  }

  const nombre = req.params.tipo.replace('.csv', '');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${nombre}-${fecha}.csv"`);
  // El BOM (﻿) hace que Excel lea bien las tildes y la ñ
  res.send(`﻿${lineas.join('\r\n')}\r\n`);
});

// ------------------------------------------------------------
// Respaldos de la base de datos
// ------------------------------------------------------------
router.get('/respaldos', (req, res) => {
  res.json({ carpeta: RUTAS.respaldos, respaldos: listarRespaldos() });
});

router.post('/respaldos', async (req, res) => {
  try {
    const nombre = await respaldar({ manual: true });
    res.json({ ok: true, nombre });
  } catch (error) {
    res.status(500).json({ error: `No se pudo hacer el respaldo: ${error.message}` });
  }
});

module.exports = { router, esDocente };
