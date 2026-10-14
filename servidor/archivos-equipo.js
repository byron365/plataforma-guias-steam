// ============================================================
// Archivos de trabajo del equipo (bloque :::archivo de las guías)
// ------------------------------------------------------------
// El equipo sube su .blend, .ino, .zip… al terminar la sesión y lo
// descarga en cualquier otra PC de la academia la sesión siguiente.
// Se guardan en  subidas/<proyecto>/equipo-<id>/archivos/guia-<n>/<archivo>
// y en la tabla "archivos_equipo". Como las fotos: solo los ven el equipo
// dueño y el docente, nunca son públicos.
// De cada recuadro se guardan las últimas VERSIONES; las más viejas se borran solas.
// Reiniciar el avance de un equipo NO los borra (solo se borran si se borra el equipo).
// ============================================================
const path = require('path');
const db = require('./db');
const { guardarCuerpo, nombreUnico, borrarArchivos } = require('./fotos');

const EXTENSIONES = ['.blend', '.stl', '.ino', '.zip', '.txt', '.docx', '.xlsx', '.csv'];
const MAX_TAMANO = 100 * 1024 * 1024; // 100 MB
const VERSIONES = 5;

// Limpia el nombre original: sin carpetas ni caracteres raros, máximo 120 letras
function limpiarNombre(nombre) {
  const base = path.basename(String(nombre || '').replace(/\\/g, '/'))
    .replace(/[\u0000-\u001f<>:"/\\|?*]/g, '_').trim();
  const ext = path.extname(base).toLowerCase();
  const sinExt = base.slice(0, base.length - ext.length).slice(0, 120 - ext.length) || 'archivo';
  return `${sinExt}${ext}`;
}

const extensionPermitida = (nombre) => EXTENSIONES.includes(path.extname(nombre).toLowerCase());

// Guarda el archivo que llega en el cuerpo y deja solo las últimas VERSIONES del recuadro
async function recibirArchivoEquipo(req, { proyecto, equipoId, guia, campo, nombre, estudiante }) {
  const ext = path.extname(nombre).toLowerCase();
  const relativa = path.join(proyecto, `equipo-${equipoId}`, 'archivos', `guia-${guia}`, nombreUnico(ext));
  const { archivo, tamano } = await guardarCuerpo(req, { relativa, max: MAX_TAMANO });
  const { lastInsertRowid } = db.prepare(
    'INSERT INTO archivos_equipo (equipo_id, guia, campo, nombre, archivo, tamano, estudiante) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(equipoId, guia, campo, nombre, archivo, tamano, estudiante);

  // Versiones de más: se borran las más viejas
  const sobran = db.prepare('SELECT id, archivo FROM archivos_equipo WHERE equipo_id = ? AND guia = ? AND campo = ? ORDER BY id DESC LIMIT -1 OFFSET ?')
    .all(equipoId, guia, campo, VERSIONES);
  if (sobran.length) {
    const borrar = db.prepare('DELETE FROM archivos_equipo WHERE id = ?');
    db.transaction(() => { for (const f of sobran) borrar.run(f.id); })();
    borrarArchivos(sobran);
  }
  return Number(lastInsertRowid);
}

const publico = (f) => ({ id: f.id, guia: f.guia, campo: f.campo, nombre: f.nombre, tamano: f.tamano, estudiante: f.estudiante, creado: f.creado });

// Archivos de un equipo en una guía, agrupados por campo (el más nuevo primero)
function archivosDeGuia(equipoId, guia) {
  const grupos = {};
  for (const f of db.prepare('SELECT * FROM archivos_equipo WHERE equipo_id = ? AND guia = ? ORDER BY id DESC').all(equipoId, guia)) {
    (grupos[f.campo] = grupos[f.campo] || []).push(publico(f));
  }
  return grupos;
}

// Todos los archivos de un equipo (para la página del proyecto y el panel)
function archivosDeEquipo(equipoId) {
  return db.prepare('SELECT * FROM archivos_equipo WHERE equipo_id = ? ORDER BY guia, campo, id DESC').all(equipoId).map(publico);
}

// Borra los archivos de un equipo (solo cuando el docente borra el equipo)
function borrarArchivosDeEquipo(equipoId) {
  const filas = db.prepare('SELECT archivo FROM archivos_equipo WHERE equipo_id = ?').all(equipoId);
  db.prepare('DELETE FROM archivos_equipo WHERE equipo_id = ?').run(equipoId);
  borrarArchivos(filas);
}

module.exports = {
  EXTENSIONES, MAX_TAMANO, VERSIONES,
  limpiarNombre, extensionPermitida, recibirArchivoEquipo, archivosDeGuia, archivosDeEquipo, borrarArchivosDeEquipo,
};
