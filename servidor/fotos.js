// ============================================================
// Fotos y videos de la bitácora
// ------------------------------------------------------------
// Se guardan en  subidas/<proyecto>/equipo-<id>/guia-<n>/<archivo>
// y en la tabla "fotos". Nunca se sirven como archivos públicos:
// solo los ve el equipo dueño y el docente.
// ============================================================
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const db = require('./db');
const { RUTAS } = require('./config');

const TIPOS = {
  'image/jpeg': { ext: '.jpg', max: 8 * 1024 * 1024 },
  'image/png': { ext: '.png', max: 8 * 1024 * 1024 },
  'image/webp': { ext: '.webp', max: 8 * 1024 * 1024 },
  'video/mp4': { ext: '.mp4', max: 80 * 1024 * 1024 },
  'video/quicktime': { ext: '.mov', max: 80 * 1024 * 1024 },
  'video/webm': { ext: '.webm', max: 80 * 1024 * 1024 },
};
const MAX_POR_CAMPO = 10;

// Escribe en disco, poco a poco (sin cargarlo entero en memoria), el archivo que
// llega en el cuerpo de la petición. "relativa" es la ruta dentro de subidas/.
// Devuelve { archivo, tamano }. Los errores traen .codigo (413 muy grande, 400 vacío).
function guardarCuerpo(req, { relativa, max }) {
  return new Promise((resolver, rechazar) => {
    const declarado = Number(req.headers['content-length'] || 0);
    if (declarado > max) {
      return rechazar(Object.assign(new Error(`El archivo es muy grande (máximo ${Math.round(max / 1024 / 1024)} MB).`), { codigo: 413 }));
    }
    const destino = path.join(RUTAS.subidas, relativa);
    fs.mkdirSync(path.dirname(destino), { recursive: true });

    const salida = fs.createWriteStream(destino);
    let tamano = 0;
    let fallo = null;
    const abortar = (error) => {
      if (fallo) return;
      fallo = error;
      req.unpipe(salida);
      salida.destroy();
      fs.rm(destino, { force: true }, () => {});
      rechazar(error);
    };
    req.on('data', (trozo) => {
      tamano += trozo.length;
      if (tamano > max) abortar(Object.assign(new Error(`El archivo es muy grande (máximo ${Math.round(max / 1024 / 1024)} MB).`), { codigo: 413 }));
    });
    req.on('aborted', () => abortar(new Error('Se cortó la subida.')));
    salida.on('error', abortar);
    salida.on('finish', () => {
      if (fallo) return;
      if (tamano === 0) { fs.rm(destino, { force: true }, () => {}); return rechazar(Object.assign(new Error('El archivo está vacío.'), { codigo: 400 })); }
      resolver({ archivo: relativa.split(path.sep).join('/'), tamano });
    });
    req.pipe(salida);
  });
}

// Nombre único para un archivo subido: <fecha>-<azar><ext>
const nombreUnico = (ext) => `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;

// Recibe una foto o video de la bitácora
function recibirArchivo(req, { proyecto, equipoId, guia, tipo }) {
  const info = TIPOS[tipo];
  const relativa = path.join(proyecto, `equipo-${equipoId}`, `guia-${guia}`, nombreUnico(info.ext));
  return guardarCuerpo(req, { relativa, max: info.max });
}

// Fotos de un equipo en una guía, agrupadas por campo
function fotosDeGuia(equipoId, guia) {
  const grupos = {};
  for (const f of db.prepare('SELECT id, campo, tipo, tamano, estudiante, creada FROM fotos WHERE equipo_id = ? AND guia = ? ORDER BY id')
    .all(equipoId, guia)) {
    (grupos[f.campo] = grupos[f.campo] || []).push({ id: f.id, tipo: f.tipo, tamano: f.tamano, estudiante: f.estudiante, creada: f.creada });
  }
  return grupos;
}

// Borra archivos del disco (las filas se borran aparte)
function borrarArchivos(filas) {
  for (const f of filas) {
    const ruta = path.join(RUTAS.subidas, f.archivo);
    if (ruta.startsWith(RUTAS.subidas)) fs.rm(ruta, { force: true }, () => {});
  }
}

// Borra fotos (filas y archivos) de un equipo; si se indica guía, solo de esa guía
function borrarFotosDeEquipo(equipoId, guia = null) {
  const filas = guia
    ? db.prepare('SELECT archivo FROM fotos WHERE equipo_id = ? AND guia = ?').all(equipoId, guia)
    : db.prepare('SELECT archivo FROM fotos WHERE equipo_id = ?').all(equipoId);
  if (guia) db.prepare('DELETE FROM fotos WHERE equipo_id = ? AND guia = ?').run(equipoId, guia);
  else db.prepare('DELETE FROM fotos WHERE equipo_id = ?').run(equipoId);
  borrarArchivos(filas);
}

// Envía el archivo de una foto (ya revisado que se tiene permiso)
function enviarFoto(res, foto) {
  res.setHeader('Cache-Control', 'private, max-age=3600');
  res.type(foto.tipo);
  res.sendFile(foto.archivo, { root: RUTAS.subidas }, (error) => {
    if (error && !res.headersSent) res.status(404).end();
  });
}

module.exports = { TIPOS, MAX_POR_CAMPO, guardarCuerpo, nombreUnico, recibirArchivo, fotosDeGuia, borrarArchivos, borrarFotosDeEquipo, enviarFoto };
