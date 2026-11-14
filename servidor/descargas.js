// ============================================================
// Descargas del equipo (apartado "Descargas" de la bitácora):
//   · Las guías desbloqueadas del equipo, en PDF y en blanco (servidor/pdf.js).
//   · La lista de materiales del grupo: el Word que hizo el docente con
//     herramientas/lista_materiales.py, en PDF si existe (listas_a_pdf.py).
//   · Las piezas 3D (.stl) de su proyecto, las mismas que imprime el docente.
// Cada equipo solo ve lo suyo: su proyecto, su versión y sus guías desbloqueadas.
// ============================================================
const fs = require('fs');
const path = require('path');
const express = require('express');
const { RUTAS } = require('./config');
const { obtenerProyecto, obtenerGuia } = require('./contenido');
const { estadosDeGuias } = require('./progreso');
const { sesionActual } = require('./api-estudiantes');
const { pdfDeGuia } = require('./pdf');

const router = express.Router();

router.use((req, res, next) => {
  const sesion = sesionActual(req);
  if (!sesion) return res.status(401).json({ error: 'Primero entren con su equipo y PIN.' });
  req.sesion = sesion;
  res.setHeader('Cache-Control', 'private, no-store');
  next();
});

// Nombre de la versión del equipo ("Práctica con Wokwi (8 sábados)"); vacía = la primera
function nombreDeVersion(proyecto, version) {
  const versiones = proyecto.versiones || [];
  const elegida = versiones.find((v) => v.id === version) || versiones[0];
  return elegida ? elegida.nombre : '';
}

// Guías que el equipo puede bajar: desbloqueadas y con contenido
function guiasDescargables(sesion, proyecto) {
  return estadosDeGuias(sesion.equipo_id, proyecto)
    .filter((g) => g.estado !== 'bloqueada' && g.estado !== 'proximamente');
}

// ------------------------------------------------------------
// Lista de materiales: "<proyecto> - <equipo>.pdf" (o .docx) en la carpeta de listas.
// Si hay varias (por ejemplo "… - Ana y Luis2.docx"), se usa la más nueva.
// Se prefiere el PDF porque se abre en cualquier celular.
// ------------------------------------------------------------
const normalizar = (texto) => String(texto).normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();

function listaDeMateriales(sesion, proyecto) {
  if (!fs.existsSync(RUTAS.listas)) return null;
  // El generador nombra el archivo con el nombre de su lista (herramientas/materiales/<proyecto>.json)
  const nombres = new Set([proyecto.nombre]);
  try {
    const datos = JSON.parse(fs.readFileSync(path.join(RUTAS.raiz, 'herramientas', 'materiales', `${proyecto.id}.json`), 'utf8'));
    if (datos.proyecto) nombres.add(datos.proyecto);
  } catch { /* sin lista para este proyecto: se busca con su nombre */ }
  const inicios = [...nombres].map((n) => normalizar(`${n} - ${sesion.equipo}`.replace(/\//g, '-')));

  const encontrados = fs.readdirSync(RUTAS.listas)
    .filter((archivo) => /\.(pdf|docx)$/i.test(archivo) && !archivo.startsWith('~$')) // ~$ = archivo abierto en Word
    .map((archivo) => {
      const base = normalizar(archivo.replace(/\.(pdf|docx)$/i, ''));
      const inicio = inicios.find((i) => base === i || (base.startsWith(i) && /^[\s\d()._-]*$/.test(base.slice(i.length))));
      if (!inicio) return null;
      const ruta = path.join(RUTAS.listas, archivo);
      return { archivo, ruta, base, exacto: base === inicio, pdf: /\.pdf$/i.test(archivo), fecha: fs.statSync(ruta).mtimeMs };
    })
    .filter(Boolean);
  if (!encontrados.length) return null;

  // Primero el nombre exacto, luego el más nuevo; entre el Word y su PDF, el PDF
  encontrados.sort((a, b) => (b.exacto - a.exacto) || (b.fecha - a.fecha));
  const mejor = encontrados[0];
  const pdf = encontrados.find((e) => e.pdf && e.base === mejor.base);
  return pdf || mejor;
}

// ------------------------------------------------------------
// Piezas 3D: los .stl de la carpeta del proyecto ("stl.carpeta" en su proyecto.json), sin las
// subcarpetas (las versiones anteriores y los GCODE se quedan en la PC del docente). "stl.quitar"
// dice qué piezas no usa cada versión: { "practica": ["dispensador_torre_liquido"] }.
// ------------------------------------------------------------
function piezasDelEquipo(sesion, proyecto) {
  const stl = proyecto.stl;
  if (!stl || !stl.carpeta) return [];
  const carpeta = path.join(RUTAS.stl, path.basename(stl.carpeta)); // basename: sin "..\" ni rutas raras
  if (!fs.existsSync(carpeta)) return [];
  const quitar = new Set(((stl.quitar || {})[sesion.version || ''] || []).map((n) => n.toLowerCase()));
  return fs.readdirSync(carpeta, { withFileTypes: true })
    .filter((f) => f.isFile() && /\.stl$/i.test(f.name) && !quitar.has(f.name.replace(/\.stl$/i, '').toLowerCase()))
    .map((f) => ({ archivo: f.name, ruta: path.join(carpeta, f.name), bytes: fs.statSync(path.join(carpeta, f.name)).size }))
    .sort((a, b) => a.archivo.localeCompare(b.archivo, 'es'));
}

// "puente_orilla_A.stl" → "Orilla A": sin el nombre del proyecto del inicio y con espacios
function nombreDePieza(archivo) {
  const partes = archivo.replace(/\.stl$/i, '').split('_');
  const texto = (partes.length > 1 ? partes.slice(1) : partes).join(' ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// ------------------------------------------------------------
// Rutas
// ------------------------------------------------------------
router.get('/', (req, res) => {
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  if (!proyecto) return res.status(404).json({ error: 'El proyecto de este equipo ya no existe.' });
  const lista = listaDeMateriales(req.sesion, proyecto);
  res.json({
    materiales: lista ? { tipo: lista.pdf ? 'pdf' : 'docx' } : null,
    guias: guiasDescargables(req.sesion, proyecto).map((g) => ({ numero: g.numero, titulo: g.titulo, sabado: g.sabado })),
    piezas: piezasDelEquipo(req.sesion, proyecto).map((p) => ({ archivo: p.archivo, nombre: nombreDePieza(p.archivo), kb: Math.max(1, Math.round(p.bytes / 1024)) })),
  });
});

router.get('/stl/:archivo', (req, res) => {
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  // Solo un archivo de la lista del equipo: así no se puede pedir otro proyecto ni salir de la carpeta
  const pieza = proyecto && piezasDelEquipo(req.sesion, proyecto).find((p) => p.archivo === req.params.archivo);
  if (!pieza) return res.status(404).json({ error: 'No se encontró esa pieza.' });
  res.download(pieza.ruta, pieza.archivo, (error) => {
    if (error && !res.headersSent) res.status(404).json({ error: 'No se encontró esa pieza.' });
  });
});

router.get('/materiales', (req, res) => {
  const proyecto = obtenerProyecto(req.sesion.proyecto);
  const lista = proyecto && listaDeMateriales(req.sesion, proyecto);
  if (!lista) return res.status(404).json({ error: 'Todavía no hay lista de materiales para este equipo.' });
  res.download(lista.ruta, `Lista de materiales - ${proyecto.nombre}${path.extname(lista.archivo).toLowerCase()}`, (error) => {
    if (error && !res.headersSent) res.status(404).json({ error: 'No se encontró la lista de materiales.' });
  });
});

router.get('/guias/:numero', async (req, res, next) => {
  try {
    const numero = parseInt(req.params.numero, 10);
    const proyecto = obtenerProyecto(req.sesion.proyecto);
    if (!proyecto || !guiasDescargables(req.sesion, proyecto).some((g) => g.numero === numero)) {
      return res.status(403).json({ error: 'Esta guía todavía está bloqueada.' });
    }
    const guia = obtenerGuia(proyecto.id, numero, req.sesion.version);
    if (!guia) return res.status(404).json({ error: 'Esta guía todavía no tiene contenido.' });

    const archivo = await pdfDeGuia({ proyecto, guia, nombreVersion: nombreDeVersion(proyecto, req.sesion.version) });
    res.download(archivo, `Guía ${numero} - ${proyecto.nombre}.pdf`, (error) => {
      if (error && !res.headersSent) res.status(404).json({ error: 'No se encontró el PDF.' });
    });
  } catch (error) {
    if (error.sinNavegador) return res.status(503).json({ error: 'No se pudo crear el PDF en esta computadora. Avísenle al docente.' });
    console.error('✖  PDF de la guía:', error.message);
    if (!res.headersSent) res.status(500).json({ error: 'No se pudo crear el PDF. Intenten otra vez en un momento.' });
    else next(error);
  }
});

module.exports = { router, listaDeMateriales, nombreDeVersion, piezasDelEquipo };
