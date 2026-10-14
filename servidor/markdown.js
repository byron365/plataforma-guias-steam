// ============================================================
// Lector de guías en Markdown
// ------------------------------------------------------------
// Convierte un archivo guia-XX.md en:
//   - título de la guía (el encabezado "# ...")
//   - partes (cada encabezado "## ..." es una parte, con su tiempo sugerido)
//   - campos que los estudiantes pueden llenar (preguntas, tablas, listas)
//   - notas para el docente (separadas: NUNCA van en el HTML del estudiante)
//
// Bloques especiales que entiende:
//   :::pregunta id="g1-p1"     ... :::   pregunta abierta con cuadro de texto
//   :::checklist id="g1-logramos" ... :::   lista de casillas
//   :::tabla id="g1-medidas"   ... :::   tabla editable con id fijo
//   :::animacion tipo="servo"  ... :::   animación interactiva
//   :::docente                 ... :::   nota solo para el docente
//   :::descarga archivo="x.blend" ... :::   botón para descargar un archivo de la carpeta archivos/
//   :::reto / :::consejo / :::importante / :::nota  ... :::   recuadros de color
//
// Conversiones automáticas:
//   - Tablas con celdas vacías     → tablas editables
//   - "______" (4 o más guiones bajos) → campo de respuesta
//   - "- [ ] texto"                → casilla de verificación
//   - [IMAGEN 4.3: descripción]    → imagen de la carpeta imagenes/ (o recuadro gris)
// ============================================================
const { Marked } = require('marked');

const MARCA_LINEA = '⟦L⟧'; // marca temporal que reemplaza a "______"
const TIPOS_RECUADRO = ['reto', 'consejo', 'importante', 'nota', 'bitacora'];

// Otros nombres aceptados para las animaciones
const ALIAS_ANIMACIONES = {
  'diagrama-flujo': 'flujo',
  'gnd-comun': 'fuente',
  'fuente-externa': 'fuente',
  'diagrama-conexiones': 'conexiones',
  'pinza-engranes': 'engranes',
  'rutina-automatica': 'rutina',
};

function escapar(texto) {
  return String(texto)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Texto sin marcas de Markdown (para el panel y el CSV)
function textoPlano(texto) {
  return String(texto || '')
    .split(MARCA_LINEA).join('____')
    .replace(/[`*_>#]+/g, (m) => (m === '____' ? m : ''))
    .replace(/\s+/g, ' ')
    .trim();
}

// Lee atributos del tipo  id="g1-p1" tipo="servo" final
function leerAtributos(texto) {
  const attrs = {};
  const patron = /([\w-]+)\s*=\s*"([^"]*)"|([\w-]+)/g;
  let m;
  while ((m = patron.exec(texto))) {
    if (m[1]) attrs[m[1]] = m[2];
    else attrs[m[3]] = true;
  }
  return attrs;
}

// Aplica una función a cada línea que NO está dentro de un bloque de código ```
function porLineasFueraDeCodigo(lineas, fn) {
  let enCodigo = false;
  return lineas.map((linea) => {
    if (/^\s*(```|~~~)/.test(linea)) {
      enCodigo = !enCodigo;
      return linea;
    }
    return enCodigo ? linea : fn(linea);
  });
}

// ------------------------------------------------------------
// Función principal
// opciones: { numero, buscarImagen(codigo) → url o null }
// ------------------------------------------------------------
function procesarGuia(textoMd, opciones) {
  const numero = opciones.numero;
  const prefijo = `g${numero}`;

  // 0) Datos del encabezado ---  (titulo, sabado, sesion, duracion...)
  const { datos, resto } = leerEncabezado(textoMd.replace(/\r\n?/g, '\n'));
  let lineas = resto.split('\n');

  // 1) Imágenes [IMAGEN x.y: descripción] y marcas "______".
  //    Primero las imágenes, para que los ______ de una descripción no se vuelvan campos.
  lineas = porLineasFueraDeCodigo(lineas, (linea) => {
    const imagenes = [];
    let nueva = linea.replace(/\[IMAGEN\s+([\w.]+)\s*:\s*([^\]]*)\]/gi, (_, codigo, descripcion) => {
      imagenes.push(htmlImagen(codigo, descripcion.trim(), opciones.buscarImagen));
      return `⟦IMG${imagenes.length - 1}⟧`;
    });
    nueva = nueva.replace(/_{4,}/g, MARCA_LINEA);
    return nueva.replace(/⟦IMG(\d+)⟧/g, (_, i) => `\n\n${imagenes[Number(i)]}\n\n`);
  });

  // 2) Sacar los bloques especiales ::: y dejar una marca en su lugar
  const bloques = [];
  const sinBloques = [];
  let dentroDeCodigo = false; // un ::: dentro de un bloque de código ``` es solo texto
  for (let i = 0; i < lineas.length; i++) {
    if (/^\s*(```|~~~)/.test(lineas[i])) dentroDeCodigo = !dentroDeCodigo;
    const inicio = !dentroDeCodigo && lineas[i].match(/^\s*:::\s*([a-zA-ZáéíóúñÁÉÍÓÚÑ]+)(.*)$/);
    if (!inicio) {
      sinBloques.push(lineas[i]);
      continue;
    }
    const cuerpo = [];
    let enCodigo = false;
    i++;
    while (i < lineas.length) {
      if (/^\s*(```|~~~)/.test(lineas[i])) enCodigo = !enCodigo;
      if (!enCodigo && /^\s*:::\s*$/.test(lineas[i])) break;
      cuerpo.push(lineas[i]);
      i++;
    }
    const tipo = inicio[1].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    bloques.push({ tipo, attrs: leerAtributos(inicio[2]), cuerpo: cuerpo.join('\n') });
    sinBloques.push('', `<!--BLOQUE-${bloques.length - 1}-->`, '');
  }

  // 3) Título (# ...) y división en partes (## ...)
  let titulo = '';
  const partesCrudas = [];
  let actual = { titulo: '', lineas: [] };
  let enCodigo = false;
  for (const linea of sinBloques) {
    if (/^\s*(```|~~~)/.test(linea)) enCodigo = !enCodigo;
    const h1 = !enCodigo && linea.match(/^#\s+(.+)$/);
    const h2 = !enCodigo && linea.match(/^##\s+(.+)$/);
    if (h1 && !titulo) {
      titulo = h1[1].trim();
    } else if (h2) {
      partesCrudas.push(actual);
      actual = { titulo: h2[1].trim(), lineas: [] };
    } else {
      actual.lineas.push(linea);
    }
  }
  partesCrudas.push(actual);

  // La parte "sin título" (lo que va antes del primer ##) solo se muestra si tiene contenido
  const partes = partesCrudas.filter((p, i) => i > 0 || p.lineas.join('').trim() !== '');
  if (partes.length && !partes[0].titulo) partes[0].titulo = 'Introducción';

  // 4) Estado compartido mientras se dibuja el HTML
  const estado = {
    contadores: {},
    campos: {},                 // id → tipo ('texto' | 'individual' | 'opcion' | 'tabla' | 'checklist')
    opciones: {},               // id → lista de opciones válidas (bloque :::opciones)
    etiquetas: {},              // id → textos para el panel y el CSV (pregunta, encabezados, casillas)
    checklistsFinales: [],      // listas "¿Lo logramos?": [{ id, total }]
    tablaForzada: null,         // id para la próxima tabla (bloque :::tabla)
    checklistForzada: null,     // { id, final } para la próxima lista (bloque :::checklist)
    parteActualEsFinal: false,  // la parte se llama "¿Lo logramos?"
  };

  function nuevoId(tipo, idPedido) {
    let id = typeof idPedido === 'string' && /^[\w.-]{1,80}$/.test(idPedido) ? idPedido : null;
    if (!id) {
      estado.contadores[tipo] = (estado.contadores[tipo] || 0) + 1;
      id = `${prefijo}-${tipo}-${estado.contadores[tipo]}`;
    }
    // Evita ids repetidos dentro de la misma guía
    let unico = id;
    let n = 2;
    while (estado.campos[unico]) unico = `${id}-${n++}`;
    return unico;
  }

  const marked = crearMarked(estado, nuevoId);

  // 5) Dibujar cada parte
  const resultado = partes.map((parte) => {
    const { tituloLimpio, tiempo } = separarTiempo(parte.titulo, parte.lineas);
    estado.parteActualEsFinal = /lo\s+logramos/i.test(tituloLimpio);
    const notas = [];

    let html = marked.parse(parte.lineas.join('\n'));

    // Reemplazar las marcas de bloques especiales
    html = html.replace(/<!--BLOQUE-(\d+)-->/g, (_, indice) => {
      const bloque = bloques[Number(indice)];
      return dibujarBloque(bloque, { marked, estado, nuevoId, notas, buscarArchivo: opciones.buscarArchivo });
    });

    html = convertirLineas(html, estado, nuevoId);

    return { titulo: tituloLimpio, tiempo, html, notas };
  });

  return {
    titulo: datos.titulo || titulo || `Guía ${numero}`,
    datos,
    partes: resultado,
    campos: estado.campos,
    checklistsFinales: estado.checklistsFinales,
    opciones: estado.opciones,
    etiquetas: estado.etiquetas,
  };
}

// Encabezado opcional al inicio del archivo:
//   ---
//   titulo: ¡Nuestra primera articulación!
//   sabado: 1
//   ---
function leerEncabezado(texto) {
  const m = texto.match(/^---\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!m) return { datos: {}, resto: texto };
  const datos = {};
  for (const linea of m[1].split('\n')) {
    const par = linea.match(/^\s*([\w-]+)\s*:\s*(.*?)\s*$/);
    if (!par) continue;
    let valor = par[2].replace(/^(['"])(.*)\1$/, '$2');
    if (/^\d+$/.test(valor)) valor = Number(valor);
    datos[par[1].toLowerCase()] = valor;
  }
  return { datos, resto: texto.slice(m[0].length) };
}

// "Parte 2: Armado (25 min)" → título "Parte 2: Armado", tiempo 25
// También busca una línea "Tiempo sugerido: 25 min" al inicio de la parte.
function separarTiempo(titulo, lineas) {
  let tiempo = null;
  let tituloLimpio = titulo;
  const enTitulo = titulo.match(/[([]?\s*(?:⏱️?\s*)?(\d{1,3})\s*(?:min|minutos)\b\.?\s*[)\]]?/i);
  if (enTitulo) {
    tiempo = Number(enTitulo[1]);
    tituloLimpio = titulo.replace(enTitulo[0], '').replace(/[\s·—–:|-]+$/, '').trim();
  } else {
    for (const linea of lineas.slice(0, 6)) {
      const m = linea.match(/tiempo(?:\s+sugerido)?\s*:?\**\s*(\d{1,3})\s*min/i);
      if (m) { tiempo = Number(m[1]); break; }
    }
  }
  return { tituloLimpio, tiempo };
}

// Imagen de la guía: si existe el archivo se muestra; si no, un recuadro gris
function htmlImagen(codigo, descripcion, buscarImagen) {
  const url = buscarImagen ? buscarImagen(codigo) : null;
  const etiqueta = `Imagen ${escapar(codigo)}`;
  if (url) {
    return `<figure class="imagen-guia"><img src="${escapar(url)}" alt="${escapar(descripcion)}" loading="lazy">` +
      `<figcaption><strong>${etiqueta}</strong> · ${escapar(descripcion)}</figcaption></figure>`;
  }
  return `<figure class="imagen-guia imagen-pendiente"><div class="imagen-hueco">` +
    `<span class="imagen-hueco-codigo">${etiqueta}</span><span>${escapar(descripcion)}</span></div></figure>`;
}

// Convierte las marcas de "______" en campos de texto
function convertirLineas(html, estado, nuevoId) {
  const sinEtiquetas = (h) => h.replace(/<[^>]+>/g, ' ').split(MARCA_LINEA).join('____')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim();

  // Párrafo que solo tiene la línea → cuadro de texto amplio.
  // Su etiqueta (para el panel y el CSV) es el texto que va justo antes.
  html = html.replace(new RegExp(`<p>(?:\\s*${MARCA_LINEA}\\s*)+</p>`, 'g'), (_, posicion, completo) => {
    const id = nuevoId('linea');
    estado.campos[id] = 'texto';
    const antes = sinEtiquetas(completo.slice(Math.max(0, posicion - 300), posicion));
    estado.etiquetas[id] = { pregunta: antes.split(/(?<=[.:?!])\s/).pop().slice(-120) };
    return `<textarea class="respuesta respuesta-linea" data-campo="${id}" rows="2" aria-label="Respuesta" placeholder="Escribe aquí…"></textarea>`;
  });
  // Línea dentro de un texto → campo corto en la misma línea.
  // Su etiqueta es la frase donde aparece ("Tiempo: ____ s").
  html = html.replace(new RegExp(MARCA_LINEA, 'g'), (_, posicion, completo) => {
    const id = nuevoId('linea');
    estado.campos[id] = 'texto';
    const inicio = Math.max(...['<p>', '<li>', '<td', '<code>'].map((t) => completo.lastIndexOf(t, posicion)));
    const fines = ['</p>', '</li>', '</td>', '</code>'].map((t) => completo.indexOf(t, posicion)).filter((i) => i >= 0);
    const fin = fines.length ? Math.min(...fines) : posicion;
    estado.etiquetas[id] = { pregunta: sinEtiquetas(completo.slice(Math.max(0, inicio), fin)).slice(0, 160) };
    return `<input type="text" class="respuesta respuesta-corta" data-campo="${id}" aria-label="Respuesta" autocomplete="off">`;
  });
  return html;
}

// ------------------------------------------------------------
// Bloques especiales :::
// ------------------------------------------------------------
function dibujarBloque(bloque, { marked, estado, nuevoId, notas, buscarArchivo }) {
  const { tipo, attrs, cuerpo } = bloque;

  switch (tipo) {
    case 'docente': {
      // Se guarda aparte; en el HTML del estudiante no queda nada
      notas.push(marked.parse(cuerpo));
      return '';
    }

    case 'pregunta': {
      const id = nuevoId('pregunta', attrs.id);
      // individual="si": cada estudiante del equipo guarda su propia respuesta
      const individual = attrs.individual === true || attrs.individual === 'si';
      estado.campos[id] = individual ? 'individual' : 'texto';
      estado.etiquetas[id] = { pregunta: textoPlano(cuerpo) };
      const textoPregunta = marked.parse(cuerpo.split(MARCA_LINEA).join(''));
      return `<div class="pregunta${individual ? ' pregunta-individual' : ''}">` +
        (individual ? '<p class="etiqueta-individual">Respuesta individual</p>' : '') +
        `<div class="pregunta-texto" id="texto-${escapar(id)}">${textoPregunta}</div>` +
        `<textarea class="respuesta" aria-labelledby="texto-${escapar(id)}" data-campo="${escapar(id)}"${individual ? ' data-individual' : ''} rows="3" placeholder="${individual ? 'Escribe aquí tu respuesta…' : 'Escriban aquí su respuesta…'}"></textarea>` +
        `</div>`;
    }

    case 'opciones': {
      // Pregunta de opción única: la primera parte es la pregunta y la lista son las opciones
      const id = nuevoId('opciones', attrs.id);
      const lineas = cuerpo.split('\n');
      const esOpcion = (l) => /^\s*[-*+]\s+/.test(l);
      const opcionesLista = lineas.filter(esOpcion).map((l) => l.replace(/^\s*[-*+]\s+(\[[ xX]\]\s*)?/, '').trim());
      const pregunta = lineas.filter((l) => !esOpcion(l)).join('\n').trim();
      estado.campos[id] = 'opcion';
      estado.opciones[id] = opcionesLista;
      estado.etiquetas[id] = { pregunta: textoPlano(pregunta) };
      const botones = opcionesLista.map((texto, i) =>
        `<label class="opcion"><input type="radio" name="opcion-${escapar(id)}" value="${escapar(texto)}" data-opcion="${i}">` +
        `<span>${marked.parseInline(texto)}</span></label>`).join('');
      return `<fieldset class="opciones" data-campo="${escapar(id)}">` +
        `<legend class="pregunta-texto">${marked.parseInline(pregunta)}</legend>` +
        `<div class="opciones-lista">${botones}</div></fieldset>`;
    }

    case 'foto': {
      // Fotos o videos de la bitácora: el equipo los sube desde el celular
      const id = nuevoId('foto', attrs.id);
      const texto = cuerpo.trim() || 'Foto para la bitácora';
      estado.campos[id] = 'foto';
      estado.etiquetas[id] = { pregunta: textoPlano(texto) };
      return `<div class="foto-bitacora" data-foto="${escapar(id)}">` +
        `<div class="foto-encabezado"><span class="foto-icono" aria-hidden="true">📷</span>` +
        `<div class="foto-texto">${marked.parseInline(texto)}</div></div>` +
        `<div class="foto-galeria"></div></div>`;
    }

    case 'archivo': {
      // Archivo de trabajo del equipo (.blend, .ino, .zip…): se sube al terminar y se
      // descarga en otra PC la sesión siguiente. Los botones los pone archivos-equipo.js
      const id = nuevoId('archivo', attrs.id);
      const texto = cuerpo.trim() || 'Suban aquí su archivo de trabajo para seguir en otra computadora.';
      estado.campos[id] = 'archivo';
      estado.etiquetas[id] = { pregunta: textoPlano(texto) };
      return `<div class="archivo-equipo" data-archivo="${escapar(id)}">` +
        `<div class="foto-encabezado"><span class="foto-icono" aria-hidden="true">💾</span>` +
        `<div class="foto-texto">${marked.parseInline(texto)}</div></div>` +
        `<ul class="archivo-versiones"></ul></div>`;
    }

    case 'checklist': {
      const final = attrs.final === true || attrs.final === 'si' || /logramos/i.test(attrs.id || '');
      estado.checklistForzada = { id: attrs.id, final };
      const html = marked.parse(cuerpo);
      estado.checklistForzada = null;
      return html;
    }

    case 'tabla': {
      estado.tablaForzada = attrs.id || null;
      const html = marked.parse(cuerpo);
      estado.tablaForzada = null;
      return html;
    }

    case 'descarga': {
      // Botón para descargar un archivo de la carpeta archivos/ del proyecto
      const nombre = String(attrs.archivo || '').trim();
      const encontrado = nombre && buscarArchivo ? buscarArchivo(nombre) : null;
      const texto = cuerpo.trim();
      if (!encontrado) {
        return `<div class="recuadro recuadro-importante"><p>Falta el archivo <strong>${escapar(nombre || '(sin nombre)')}</strong> en la carpeta <code>archivos/</code> del proyecto.</p></div>`;
      }
      const kb = encontrado.tamano < 1024 * 1024 ? `${Math.max(1, Math.round(encontrado.tamano / 1024))} KB` : `${(encontrado.tamano / 1048576).toFixed(1).replace('.', ',')} MB`;
      return `<div class="descarga">` +
        `<a class="boton boton-descarga" href="${escapar(encontrado.url)}" download="${escapar(nombre)}">⬇ Descargar ${escapar(nombre)}</a>` +
        `<span class="descarga-tamano">${kb}</span>` +
        (texto ? `<div class="descarga-texto">${marked.parse(texto)}</div>` : '') +
        `</div>`;
    }

    case 'animacion': {
      const pedido = String(attrs.tipo || '').toLowerCase();
      const animTipo = ALIAS_ANIMACIONES[pedido] || pedido;
      if (!/^[a-z0-9-]+$/.test(animTipo)) {
        return `<div class="recuadro recuadro-importante">Falta el tipo de animación (por ejemplo tipo="servo").</div>`;
      }
      const config = { ...attrs };
      delete config.tipo;
      // Dentro del bloque, las tablas y las listas son DATOS para la animación
      // (cables de un diagrama, pasos de un diagrama de flujo...). El resto es el texto de pie.
      const lineas = cuerpo.split('\n');
      const esTabla = (l) => /^\s*\|/.test(l);
      const esLista = (l) => /^\s*(?:[-*+]|\d+[.)])\s+/.test(l);
      const filasTabla = lineas.filter(esTabla)
        .filter((l) => !/^\s*\|?[\s:|-]+\|?\s*$/.test(l)) // quita la fila separadora | --- |
        .map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      if (filasTabla.length) config.tabla = { encabezados: filasTabla[0], filas: filasTabla.slice(1) };
      const itemsLista = lineas.filter(esLista).map((l) => l.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '').trim());
      if (itemsLista.length) config.lista = itemsLista;
      const textoPie = lineas.filter((l) => !esTabla(l) && !esLista(l)).join('\n').trim();
      const pie = textoPie ? `<div class="animacion-pie">${marked.parse(textoPie)}</div>` : '';
      return `<div class="animacion" data-tipo="${animTipo}" data-config="${escapar(JSON.stringify(config))}">` +
        `<div class="animacion-cargando">Cargando animación…</div></div>${pie}`;
    }

    default: {
      // Recuadros de color (reto, consejo, importante, nota) o cualquier otro bloque
      const clase = TIPOS_RECUADRO.includes(tipo) ? tipo : 'nota';
      const titulos = { reto: 'Reto extra', consejo: 'Consejo', importante: 'Importante', nota: 'Nota', bitacora: 'Bitácora' };
      const tituloRecuadro = typeof attrs.titulo === 'string' ? attrs.titulo : (titulos[tipo] || '');
      return `<div class="recuadro recuadro-${clase}">` +
        (tituloRecuadro ? `<p class="recuadro-titulo">${escapar(tituloRecuadro)}</p>` : '') +
        `${marked.parse(cuerpo)}</div>`;
    }
  }
}

// ------------------------------------------------------------
// Marked con dibujo propio de tablas, listas y código
// ------------------------------------------------------------
function crearMarked(estado, nuevoId) {
  return new Marked({
    gfm: true,
    renderer: {
      // Bloques de código: con barra superior y botón Copiar
      code(token) {
        const lenguaje = (token.lang || 'arduino').split(/\s/)[0].toLowerCase();
        const nombres = { arduino: 'Arduino', ino: 'Arduino', cpp: 'Arduino', c: 'Arduino', 'c++': 'Arduino' };
        const nombre = nombres[lenguaje] || lenguaje;
        return `<div class="bloque-codigo">` +
          `<div class="bloque-codigo-barra"><span>${escapar(nombre)}</span>` +
          `<button type="button" class="boton-copiar">Copiar</button></div>` +
          `<pre><code data-lenguaje="${escapar(lenguaje)}">${escapar(token.text)}</code></pre></div>\n`;
      },

      // Tablas: si alguna celda está vacía, la tabla se vuelve editable
      table(token) {
        const vacia = (celda) => {
          const t = celda.text.trim();
          return t === '' || t.split(MARCA_LINEA).join('').trim() === '';
        };
        const editable = token.rows.some((fila) => fila.some(vacia)) || !!estado.tablaForzada;

        const encabezado = token.header.map((c) =>
          `<th>${this.parser.parseInline(c.tokens)}</th>`).join('');

        if (!editable) {
          const filas = token.rows.map((fila) =>
            `<tr>${fila.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join('')}</tr>`).join('');
          return `<div class="tabla-contenedor"><table><thead><tr>${encabezado}</tr></thead><tbody>${filas}</tbody></table></div>\n`;
        }

        const id = nuevoId('tabla', estado.tablaForzada);
        estado.tablaForzada = null;
        estado.campos[id] = 'tabla';
        // Para el panel y el CSV: encabezados y el texto de la primera celda de cada fila
        estado.etiquetas[id] = {
          encabezados: token.header.map((c) => textoPlano(c.text)),
          filas: token.rows.map((fila) => textoPlano(fila[0] ? fila[0].text : '')),
        };
        const filas = token.rows.map((fila, r) =>
          `<tr>${fila.map((c, col) => {
            if (vacia(c)) {
              const columna = escapar(token.header[col] ? token.header[col].text : '');
              return `<td class="celda-editable"><input type="text" data-celda="${r}-${col}" aria-label="${columna}, fila ${r + 1}" autocomplete="off"></td>`;
            }
            return `<td>${this.parser.parseInline(c.tokens)}</td>`;
          }).join('')}</tr>`).join('');
        return `<div class="tabla-contenedor tabla-editable" data-campo="${escapar(id)}">` +
          `<table><thead><tr>${encabezado}</tr></thead><tbody>${filas}</tbody></table></div>\n`;
      },

      // Listas: "- [ ]" (o cualquier lista dentro de :::checklist) → casillas
      list(token) {
        const forzada = estado.checklistForzada;
        const esChecklist = forzada || token.items.some((item) => item.task);
        if (!esChecklist) return false; // lista normal: la dibuja marked

        const id = nuevoId('checklist', forzada && forzada.id);
        estado.checklistForzada = null; // solo la primera lista del bloque
        estado.campos[id] = 'checklist';
        const final = forzada ? forzada.final : estado.parteActualEsFinal;
        if (final) estado.checklistsFinales.push({ id, total: token.items.length });
        estado.etiquetas[id] = { items: token.items.map((item) => textoPlano(item.text.replace(/^\s*\[[ xX]\]\s*/, ''))) };

        const items = token.items.map((item, i) => {
          let texto = this.parser.parse(item.tokens, !!item.loose);
          texto = texto.replace(/<input[^>]*type="checkbox"[^>]*>\s*/gi, '')
            .replace(/^\s*<p>|<\/p>\s*$/g, '')
            .replace(/^\s*\[[ xX]\]\s*/, '');
          return `<li><label class="casilla"><input type="checkbox" data-item="${i}">` +
            `<span class="casilla-marca" aria-hidden="true"></span><span class="casilla-texto">${texto}</span></label></li>`;
        }).join('');
        return `<ul class="checklist${final ? ' checklist-final' : ''}" data-campo="${escapar(id)}">${items}</ul>\n`;
      },
    },
  });
}

module.exports = { procesarGuia, escapar };
