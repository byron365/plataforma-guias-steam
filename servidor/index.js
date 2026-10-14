// ============================================================
// Servidor principal · Plataforma de guías STEAM Robotics Academy
// Arranque:  npm start
// ============================================================
const path = require('path');
const fs = require('fs');
const express = require('express');
const QRCode = require('qrcode');

const { RUTAS, PUERTO } = require('./config');
const db = require('./db'); // crea la base de datos si no existe
const { router: apiEstudiantes, sesionActual } = require('./api-estudiantes');
const { enviarFoto } = require('./fotos');
const { iniciarRespaldosAutomaticos } = require('./respaldos');
const { carpetaProyecto, EXTENSIONES_IMAGEN, EXTENSIONES_ARCHIVO } = require('./contenido');
const { procesarGuia } = require('./markdown');
const { router: apiDocente, esDocente } = require('./api-docente');
const { direccionesLocales } = require('./util');

// Carpetas que deben existir
for (const carpeta of [RUTAS.contenido, RUTAS.respaldos, RUTAS.subidas]) {
  fs.mkdirSync(carpeta, { recursive: true });
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

// ---------- Fotos de la bitácora ----------
// Solo las ve el equipo que las subió o el docente
app.get('/api/fotos/:id', (req, res) => {
  const foto = db.prepare('SELECT * FROM fotos WHERE id = ?').get(req.params.id);
  if (!foto) return res.status(404).end();
  const sesion = sesionActual(req);
  if (!esDocente(req) && !(sesion && sesion.equipo_id === foto.equipo_id)) return res.status(403).end();
  enviarFoto(res, foto);
});

// ---------- Archivos de trabajo del equipo (.blend, .ino…) ----------
// Igual que las fotos: solo el equipo dueño o el docente. Se descargan con su nombre original.
app.get('/api/archivos-equipo/:id', (req, res) => {
  const fila = db.prepare('SELECT * FROM archivos_equipo WHERE id = ?').get(req.params.id);
  if (!fila) return res.status(404).end();
  const sesion = sesionActual(req);
  if (!esDocente(req) && !(sesion && sesion.equipo_id === fila.equipo_id)) return res.status(403).end();
  res.setHeader('Cache-Control', 'private, no-store');
  res.download(fila.archivo, fila.nombre, { root: RUTAS.subidas }, (error) => {
    if (error && !res.headersSent) res.status(404).end();
  });
});

// ---------- API ----------
app.use('/api/docente', apiDocente);
app.use('/api', apiEstudiantes);

// ---------- Imágenes de las guías ----------
// Solo se sirve la carpeta imagenes/ de cada proyecto: los .md tienen las
// notas del docente y nunca se entregan directamente.
app.get('/imagenes/:proyecto/:archivo', (req, res) => {
  const carpeta = carpetaProyecto(req.params.proyecto);
  const archivo = path.basename(req.params.archivo);
  if (!carpeta || !EXTENSIONES_IMAGEN.includes(path.extname(archivo).toLowerCase())) {
    return res.status(404).end();
  }
  res.sendFile(archivo, { root: path.join(carpeta, 'imagenes') }, (error) => {
    if (error && !res.headersSent) res.status(404).end();
  });
});

// ---------- Archivos para descargar (plantillas .blend, .stl…) ----------
// Solo la carpeta archivos/ de cada proyecto y solo las extensiones permitidas
app.get('/archivos/:proyecto/:archivo', (req, res) => {
  const carpeta = carpetaProyecto(req.params.proyecto);
  const archivo = path.basename(req.params.archivo);
  if (!carpeta || !EXTENSIONES_ARCHIVO.includes(path.extname(archivo).toLowerCase())) {
    return res.status(404).end();
  }
  res.download(path.join(carpeta, 'archivos', archivo), archivo, (error) => {
    if (error && !res.headersSent) res.status(404).end();
  });
});

// ---------- Galería de animaciones (ejemplos para el docente) ----------
app.get('/api/galeria', (req, res) => {
  const archivo = path.join(RUTAS.contenido, '_galeria', 'animaciones.md');
  if (!fs.existsSync(archivo)) return res.status(404).json({ error: 'No se encontró la galería.' });
  const galeria = procesarGuia(fs.readFileSync(archivo, 'utf8'), { numero: 0 });
  res.json({ titulo: galeria.titulo, partes: galeria.partes.map((p) => ({ titulo: p.titulo, html: p.html })) });
});

// ---------- Páginas ----------
const pagina = (nombre) => (req, res) => res.sendFile(path.join(RUTAS.publico, nombre));
app.get('/', pagina('index.html'));
app.get('/proyecto', pagina('proyecto.html'));
app.get('/guia/:numero', pagina('guia.html'));
app.get('/animaciones', pagina('animaciones.html'));
app.get('/docente', pagina('docente.html'));

// Archivos estáticos (CSS, JS, fuentes, logo). Sin caché larga: el navegador
// pregunta si cambiaron, así los ajustes se ven al recargar.
app.use(express.static(RUTAS.publico, { index: false }));

// Página no encontrada
app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Ruta no encontrada' });
  res.status(404).sendFile(path.join(RUTAS.publico, '404.html'));
});

// Errores inesperados: se registran en la consola y el estudiante ve un mensaje simple
app.use((error, req, res, next) => {
  console.error('✖  Error:', error);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
});

const servidor = app.listen(PUERTO, '0.0.0.0', async () => {
  const direcciones = direccionesLocales();
  console.log('\n==============================================');
  console.log('  Plataforma de guías · STEAM Robotics Academy');
  console.log('==============================================\n');
  console.log(`  En esta computadora:  http://localhost:${PUERTO}`);
  if (direcciones.length === 0) {
    console.log('\n  ⚠  No se encontró una red. Conecta la PC al Wi-Fi del aula.');
  } else {
    console.log('\n  Para los estudiantes (misma red Wi-Fi):');
    for (const d of direcciones) console.log(`     http://${d.ip}:${PUERTO}    (${d.nombre})`);
    const principal = `http://${direcciones[0].ip}:${PUERTO}`;
    try {
      const qr = await QRCode.toString(principal, { type: 'terminal', small: true });
      console.log(`\n  Código QR para ${principal}:\n`);
      console.log(qr);
    } catch { /* si falla el QR no pasa nada */ }
  }
  console.log(`  Panel del docente:   http://localhost:${PUERTO}/docente\n`);
  console.log('  Para detener el servidor: Ctrl + C\n');
  iniciarRespaldosAutomaticos();
});

// Al cerrar con Ctrl + C, se cierra bien la base de datos
function cerrar() {
  console.log('\n👋 Cerrando el servidor…');
  servidor.close();
  try { db.close(); } catch { /* ya estaba cerrada */ }
  process.exit(0);
}
process.on('SIGINT', cerrar);
process.on('SIGTERM', cerrar);

servidor.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n✖  El puerto ${PUERTO} ya está en uso. ¿El servidor ya está abierto en otra ventana?`);
    console.error('   Ciérralo o cambia PUERTO en el archivo .env.\n');
    process.exit(1);
  }
  throw error;
});
