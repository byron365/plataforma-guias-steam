// ============================================================
// Base de datos SQLite (un solo archivo: datos/plataforma.db)
// ============================================================
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { RUTAS } = require('./config');

fs.mkdirSync(RUTAS.datos, { recursive: true });

const db = new Database(path.join(RUTAS.datos, 'plataforma.db'));
db.pragma('journal_mode = WAL'); // más seguro si se apaga la PC de golpe
db.pragma('foreign_keys = ON');

db.exec(`
  -- Equipos: cada equipo pertenece a un proyecto y tiene un PIN de 4 dígitos
  CREATE TABLE IF NOT EXISTS equipos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto  TEXT NOT NULL,
    nombre    TEXT NOT NULL,
    pin       TEXT NOT NULL,
    creado    TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  -- Sesiones: recuerdan en cada dispositivo qué equipo y qué estudiante entró
  CREATE TABLE IF NOT EXISTS sesiones (
    token       TEXT PRIMARY KEY,
    equipo_id   INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
    estudiante  TEXT NOT NULL,
    creada      TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    ultimo_uso  TEXT
  );

  -- Guías desbloqueadas. equipo_id = 0 significa "para todo el proyecto"
  CREATE TABLE IF NOT EXISTS desbloqueos (
    proyecto   TEXT NOT NULL,
    guia       INTEGER NOT NULL,
    equipo_id  INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (proyecto, guia, equipo_id)
  );

  -- Respuestas: una fila por campo (pregunta, tabla, lista...) de cada guía.
  -- "valor" se guarda como JSON; "estudiante" es quien lo editó por última vez.
  CREATE TABLE IF NOT EXISTS respuestas (
    equipo_id    INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
    guia         INTEGER NOT NULL,
    campo        TEXT NOT NULL,
    valor        TEXT NOT NULL,
    estudiante   TEXT,
    actualizado  TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    PRIMARY KEY (equipo_id, guia, campo)
  );

  -- Fotos y videos de la bitácora (los archivos están en subidas/)
  CREATE TABLE IF NOT EXISTS fotos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    equipo_id   INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
    guia        INTEGER NOT NULL,
    campo       TEXT NOT NULL,
    archivo     TEXT NOT NULL,          -- ruta dentro de subidas/
    tipo        TEXT NOT NULL,          -- image/jpeg, video/mp4...
    tamano      INTEGER NOT NULL,
    estudiante  TEXT,
    creada      TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  -- Archivos de trabajo del equipo (.blend, .ino, .zip…) para seguir en otra PC.
  -- Se guardan las últimas versiones de cada recuadro (los archivos están en subidas/)
  CREATE TABLE IF NOT EXISTS archivos_equipo (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    equipo_id   INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
    guia        INTEGER NOT NULL,
    campo       TEXT NOT NULL,
    nombre      TEXT NOT NULL,          -- nombre original (con el que se descarga)
    archivo     TEXT NOT NULL,          -- ruta dentro de subidas/
    tamano      INTEGER NOT NULL,
    estudiante  TEXT,
    creado      TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );
  CREATE INDEX IF NOT EXISTS archivos_equipo_por_guia ON archivos_equipo (equipo_id, guia, campo);

  -- Sesiones del panel del docente
  CREATE TABLE IF NOT EXISTS sesiones_docente (
    token   TEXT PRIMARY KEY,
    creada  TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  -- Progreso de cada guía: 'en_progreso' o 'completada'
  CREATE TABLE IF NOT EXISTS progreso (
    equipo_id       INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
    guia            INTEGER NOT NULL,
    estado          TEXT NOT NULL,
    completada_por  TEXT,
    actualizado     TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    PRIMARY KEY (equipo_id, guia)
  );

  -- Bitácora del equipo: notas libres que acompañan todas las guías
  CREATE TABLE IF NOT EXISTS notas (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    equipo_id    INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
    guia         INTEGER,            -- guía donde se escribió (NULL = desde la página del proyecto)
    texto        TEXT NOT NULL DEFAULT '',
    autor        TEXT NOT NULL,
    editado_por  TEXT,
    creada       TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    actualizada  TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );
  CREATE INDEX IF NOT EXISTS notas_por_equipo ON notas (equipo_id);

  -- Dónde va cada equipo dentro de una guía (modo paso a paso):
  -- al volver a abrirla, en cualquier computadora, sigue en esa parte y ese paso
  CREATE TABLE IF NOT EXISTS posiciones (
    equipo_id    INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
    guia         INTEGER NOT NULL,
    parte        INTEGER NOT NULL,
    paso         INTEGER NOT NULL,
    actualizado  TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    PRIMARY KEY (equipo_id, guia)
  );
`);

// Versión de las guías que usa cada equipo (por ejemplo "tinkercad"). Vacío = la versión normal del proyecto.
// Las bases de datos creadas antes no tienen la columna: se agrega sola.
if (!db.prepare('PRAGMA table_info(equipos)').all().some((c) => c.name === 'version')) {
  db.exec("ALTER TABLE equipos ADD COLUMN version TEXT NOT NULL DEFAULT ''");
}

// Las sesiones del docente duran 12 horas: al arrancar se borran las vencidas
db.prepare("DELETE FROM sesiones_docente WHERE creada < datetime('now', 'localtime', '-12 hours')").run();

module.exports = db;
