// ============================================================
// Bitácora del equipo: un bloc de notas que acompaña todas las guías.
// Cada nota es aparte (así dos compañeros pueden escribir a la vez sin
// borrarse) y guarda quién la escribió, en qué guía y cuándo.
// ============================================================
const db = require('./db');

const MAX_TEXTO = 5000;  // caracteres por nota
const MAX_NOTAS = 300;   // notas por equipo

// Notas de un equipo, de la más nueva a la más vieja
function notasDeEquipo(equipoId) {
  return db.prepare(`SELECT id, guia, texto, autor, editado_por AS editadoPor, creada, actualizada
    FROM notas WHERE equipo_id = ? ORDER BY creada DESC, id DESC`).all(equipoId);
}

function crearNota(equipoId, guia, autor) {
  const total = db.prepare('SELECT COUNT(*) AS n FROM notas WHERE equipo_id = ?').get(equipoId).n;
  if (total >= MAX_NOTAS) return { error: `La bitácora ya tiene ${MAX_NOTAS} notas. Borren las que ya no necesiten.` };
  const id = db.prepare('INSERT INTO notas (equipo_id, guia, texto, autor) VALUES (?, ?, \'\', ?)')
    .run(equipoId, guia, autor).lastInsertRowid;
  return { nota: db.prepare(`SELECT id, guia, texto, autor, editado_por AS editadoPor, creada, actualizada
    FROM notas WHERE id = ?`).get(id) };
}

// Solo se puede cambiar o borrar una nota del propio equipo
function notaDelEquipo(id, equipoId) {
  return db.prepare('SELECT * FROM notas WHERE id = ? AND equipo_id = ?').get(id, equipoId);
}

function guardarNota(id, texto, estudiante) {
  db.prepare(`UPDATE notas SET texto = ?, editado_por = ?, actualizada = datetime('now', 'localtime') WHERE id = ?`)
    .run(texto, estudiante, id);
}

function borrarNota(id) {
  db.prepare('DELETE FROM notas WHERE id = ?').run(id);
}

module.exports = { MAX_TEXTO, notasDeEquipo, crearNota, notaDelEquipo, guardarNota, borrarNota };
