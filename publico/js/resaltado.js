// ============================================================
// Resaltado de sintaxis para código de Arduino (C/C++), sin librerías
// ============================================================

const CONTROL = new Set(['if', 'else', 'for', 'while', 'do', 'return', 'switch', 'case', 'default', 'break', 'continue', 'goto']);
const TIPOS = new Set(['void', 'int', 'long', 'short', 'float', 'double', 'bool', 'boolean', 'char', 'byte', 'word',
  'unsigned', 'signed', 'const', 'static', 'volatile', 'String', 'Servo', 'struct', 'class', 'auto', 'size_t',
  'uint8_t', 'uint16_t', 'uint32_t', 'int8_t', 'int16_t', 'int32_t']);
const CONSTANTES = new Set(['HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP', 'true', 'false', 'LED_BUILTIN',
  'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'NULL']);

// Orden: comentarios, textos, #include, números y palabras
const PATRON = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(^[ \t]*#[^\n]*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/gm;

function escapar(texto) {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function resaltarArduino(codigo) {
  let html = '';
  let ultimo = 0;
  let m;
  PATRON.lastIndex = 0;
  while ((m = PATRON.exec(codigo))) {
    html += escapar(codigo.slice(ultimo, m.index));
    const [texto, comentario, cadena, pre, numero, palabra] = m;
    let clase = null;
    if (comentario) clase = 'c-comentario';
    else if (cadena) clase = 'c-cadena';
    else if (pre) clase = 'c-pre';
    else if (numero) clase = 'c-numero';
    else if (palabra) {
      if (CONTROL.has(palabra)) clase = 'c-control';
      else if (TIPOS.has(palabra)) clase = 'c-tipo';
      else if (CONSTANTES.has(palabra)) clase = 'c-constante';
      else if (/^\s*\(/.test(codigo.slice(m.index + texto.length))) clase = 'c-funcion';
    }
    html += clase ? `<span class="${clase}">${escapar(texto)}</span>` : escapar(texto);
    ultimo = m.index + texto.length;
  }
  return html + escapar(codigo.slice(ultimo));
}

// Copia texto al portapapeles. En la red local (http://192.168...) el navegador
// no permite navigator.clipboard, así que se usa el método antiguo como respaldo.
export async function copiarTexto(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(texto); return true; } catch { /* usar respaldo */ }
  }
  const area = document.createElement('textarea');
  area.value = texto;
  area.setAttribute('readonly', '');
  area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
  document.body.append(area);
  area.select();
  area.setSelectionRange(0, texto.length); // necesario en iPhone/iPad
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  area.remove();
  return ok;
}
