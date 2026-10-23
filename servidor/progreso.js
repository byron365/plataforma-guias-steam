// ============================================================
// Estado de las guías de cada equipo (lo usan los estudiantes y el panel)
//   bloqueada · proximamente (sin archivo) · disponible · en_progreso · completada
// ============================================================
const db = require('./db');
const { guiasDeVersion } = require('./contenido');

// Guías desbloqueadas para un equipo: las de todo el proyecto (equipo_id = 0) + las suyas
function guiasDesbloqueadas(proyectoId, equipoId) {
  return new Set(db.prepare(
    'SELECT guia FROM desbloqueos WHERE proyecto = ? AND (equipo_id = 0 OR equipo_id = ?)'
  ).all(proyectoId, equipoId).map((f) => f.guia));
}

function estadosDeGuias(equipoId, proyecto) {
  const desbloqueadas = guiasDesbloqueadas(proyecto.id, equipoId);
  const progreso = new Map(db.prepare(
    'SELECT guia, estado FROM progreso WHERE equipo_id = ?'
  ).all(equipoId).map((f) => [f.guia, f.estado]));
  // Solo las guías de la versión del equipo (un curso corto tiene menos)
  const equipo = db.prepare('SELECT version FROM equipos WHERE id = ?').get(equipoId);

  return guiasDeVersion(proyecto, (equipo && equipo.version) || '').map((g) => {
    let estado = 'disponible';
    if (!desbloqueadas.has(g.numero)) estado = 'bloqueada';
    else if (!g.existe) estado = 'proximamente';
    else if (progreso.has(g.numero)) estado = progreso.get(g.numero);
    return { numero: g.numero, titulo: g.titulo, sabado: g.sabado, sesion: g.sesion, estado };
  });
}

module.exports = { estadosDeGuias, guiasDesbloqueadas };
