# Agrega a cada lista de materiales en Word la columna "¿Quién lo consigue?", repartiendo las compras
# entre los integrantes del grupo para que cada uno gaste más o menos lo mismo.
# Trabaja sobre los Word que ya existen (no los vuelve a generar), así se conservan los cambios hechos
# a mano en Word, como imágenes reemplazadas o textos corregidos.
#
# Lee:
#   - <carpeta de las listas>/integrantes.json   nombres de los integrantes de cada grupo (fuera del repositorio)
#   - herramientas/materiales/precios.json       precios de referencia de cada componente (USD)
# Escribe:
#   - la columna nueva en cada Word, y vuelve a crear su PDF (listas_a_pdf.py)
#   - <carpeta de las listas>/reparto.md         cuánto le toca gastar a cada integrante y de dónde sale cada precio
#
# Uso: python reparto_materiales.py <carpeta de las listas> [parte del nombre del Word]
# Se puede ejecutar varias veces: si la columna ya existe, solo actualiza los nombres.
import sys, os, re, json
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TITULO = '¿Quién lo consigue?'
ANCHO_TABLA = 18.0      # cm útiles de la hoja carta con márgenes de 1,8 cm
ANCHO_QUIEN = 2.8       # cm de la columna nueva
MINIMO_PARA_DIVIDIR = 2.0   # USD: un componente repetido se reparte por unidades solo si cada una cuesta esto o más

precios = json.load(open(os.path.join(RAIZ, 'herramientas', 'materiales', 'precios.json'), encoding='utf-8'))['precios']


def buscar_precio(componente):
    """Precio unitario y fuente del primer patrón que coincide con el nombre del componente."""
    for p in precios:
        if re.search(p['patron'], componente, re.I):
            return p['precio'], p['fuente']
    return None, None


def cantidad_numero(texto):
    """'2 (uno de repuesto)' → 2 · '1 juego' → 1 · '4 en total' → 4."""
    m = re.match(r'\s*(\d+)', texto)
    return int(m.group(1)) if m else 1


def repartir(filas, integrantes):
    """Reparte las compras para que cada integrante gaste parecido.
    Primero las más caras: cada compra va a quien lleva menos gasto (si empatan, a quien tiene menos cosas).
    Un componente repetido y caro (por ejemplo 3 servos) se puede repartir por unidades."""
    paquetes = []
    for f in filas:
        if f['precio'] is None:
            continue
        if f['cantidad'] >= 2 and f['precio'] >= MINIMO_PARA_DIVIDIR:
            paquetes += [(f['precio'], f['indice'], 1)] * f['cantidad']
        else:
            paquetes.append((f['precio'] * f['cantidad'], f['indice'], f['cantidad']))
    paquetes.sort(key=lambda p: (-p[0], p[1]))
    gasto = {n: 0.0 for n in integrantes}
    cosas = {n: 0 for n in integrantes}
    asignado = {}   # índice de la fila → {integrante: unidades}
    for costo, indice, unidades in paquetes:
        quien = min(integrantes, key=lambda n: (round(gasto[n], 2), cosas[n], integrantes.index(n)))
        gasto[quien] += costo
        cosas[quien] += 1
        asignado.setdefault(indice, {}).setdefault(quien, 0)
        asignado[indice][quien] += unidades
    return asignado, gasto


def corto(componente):
    """Nombre corto para el resumen: sin lo que va entre paréntesis y hasta la primera coma ('0,96' no corta)."""
    return re.sub(r'\s*\([^)]*\)', '', componente).split(', ')[0].strip()


def texto_quien(reparto):
    """'Sara' si lo compra una sola persona; 'Sara: 2 · Ari: 1' si se reparte por unidades."""
    if len(reparto) == 1:
        return next(iter(reparto))
    return ' · '.join(f'{n}: {u}' for n, u in reparto.items())


def copiar_sombreado(origen, destino):
    """Pone en la celda nueva el mismo color de fondo que la celda vecina (encabezado azul o fila alterna)."""
    shd = origen._tc.get_or_add_tcPr().find(qn('w:shd'))
    if shd is not None:
        tcPr = destino._tc.get_or_add_tcPr()
        viejo = tcPr.find(qn('w:shd'))
        if viejo is not None:
            tcPr.remove(viejo)
        nuevo = OxmlElement('w:shd')
        for k, v in shd.attrib.items():
            nuevo.set(k, v)
        tcPr.append(nuevo)


def escribir(celda, texto, negrita=False, tam=9, color=None):
    """Reemplaza el texto de la celda (centrado, en vertical también)."""
    p = celda.paragraphs[0]
    for r in list(p.runs):
        r._r.getparent().remove(r._r)
    r = p.add_run(texto)
    r.bold, r.font.size = negrita, Pt(tam)
    if color:
        r.font.color.rgb = color
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    celda.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER


def ajustar_anchos(tabla, ancho_imagen):
    """Anchos de las 6 columnas: la de imagen no se achica (para no cortar las imágenes) y el resto se acomoda."""
    resto = ANCHO_TABLA - 1.0 - ancho_imagen - ANCHO_QUIEN
    componente, cantidad, uso = resto * 0.43, resto * 0.20, resto * 0.37
    anchos = [Cm(1.0), Cm(ancho_imagen), Cm(componente), Cm(cantidad), Cm(uso), Cm(ANCHO_QUIEN)]
    grid = tabla._tbl.tblGrid
    for col, ancho in zip(grid.findall(qn('w:gridCol')), anchos):
        col.set(qn('w:w'), str(int(ancho.twips)))
    for fila in tabla.rows:
        for celda, ancho in zip(fila.cells, anchos):
            celda.width = ancho


def procesar(archivo, integrantes, guardar=True):
    """Agrega o actualiza la columna en el Word. Con guardar=False solo calcula el reparto (para el resumen)."""
    doc = Document(archivo)
    tabla = doc.tables[0]
    # Ancho que necesitan las imágenes de la columna 2 (la más ancha + márgenes de la celda)
    ancho_imagen = 3.6
    for fila in tabla.rows[1:]:
        for ext in fila.cells[1]._tc.iter('{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}extent'):
            ancho_imagen = max(ancho_imagen, int(ext.get('cx')) / 360000 + 0.4)
    if len(tabla.columns) == 5:
        tabla.add_column(Cm(ANCHO_QUIEN))
    filas = []
    for i, fila in enumerate(tabla.rows[1:], 1):
        componente = fila.cells[2].text.strip()
        if not componente:   # fila vacía (por ejemplo, un material quitado a mano en Word)
            continue
        precio, fuente = buscar_precio(componente)
        filas.append({'indice': i, 'componente': componente, 'cantidad': cantidad_numero(fila.cells[3].text),
                      'precio': precio, 'fuente': fuente})
    asignado, gasto = repartir(filas, integrantes)
    # Encabezado de la columna nueva, igual a los demás (fondo azul y letra blanca)
    encabezado = tabla.rows[0].cells
    copiar_sombreado(encabezado[4], encabezado[5])
    escribir(encabezado[5], TITULO, True, 10, RGBColor(0xFF, 0xFF, 0xFF))
    for i, fila in enumerate(tabla.rows[1:], 1):
        celdas = fila.cells
        copiar_sombreado(celdas[4], celdas[5])
        escribir(celdas[5], texto_quien(asignado[i]) if i in asignado else '', True, 9)
    ajustar_anchos(tabla, ancho_imagen)
    if guardar:
        doc.save(archivo)
    return filas, asignado, gasto


def main():
    carpeta = sys.argv[1]
    filtro = sys.argv[2].lower() if len(sys.argv) > 2 else ''
    integrantes = json.load(open(os.path.join(carpeta, 'integrantes.json'), encoding='utf-8'))
    resumen = ['# Reparto de compras por grupo', '',
               'Precios de referencia en USD (`herramientas/materiales/precios.json`). Cada integrante consigue lo que dice',
               'la columna "¿Quién lo consigue?" de su lista; el reparto busca que todos gasten más o menos lo mismo.', '']
    guardados, sin_precio = [], set()
    for nombre in sorted(os.listdir(carpeta)):
        if not nombre.endswith('.docx') or nombre.startswith('~$') or ' - ' not in nombre:
            continue
        # Los Word que no coinciden con el filtro no se tocan, pero sí entran en el resumen
        elegido = not filtro or filtro in nombre.lower()
        grupo = nombre[:-5].split(' - ', 1)[1]
        if grupo not in integrantes:
            if elegido:
                print('FALTAN los integrantes de', grupo, 'en integrantes.json')
            continue
        archivo = os.path.join(carpeta, nombre)
        try:
            filas, asignado, gasto = procesar(archivo, integrantes[grupo], guardar=elegido)
        except PermissionError:
            print('NO SE PUDO GUARDAR (¿está abierto en Word?):', nombre)
            continue
        if elegido:
            guardados.append(archivo)
            print('OK', nombre)
        resumen += [f'## {nombre[:-5]}', '', '| Integrante | Gasto aproximado | Consigue |', '| --- | --- | --- |']
        for persona in integrantes[grupo]:
            cosas = [f"{corto(f['componente'])}" + (f" ×{asignado[f['indice']][persona]}" if asignado[f['indice']][persona] > 1 else '')
                     for f in filas if f['indice'] in asignado and persona in asignado[f['indice']]]
            resumen.append(f"| {persona} | ${gasto[persona]:.2f} | {'; '.join(cosas)} |")
        total = sum(gasto.values())
        resumen += ['', f'Total del grupo: **${total:.2f}**', '']
        for f in filas:
            if f['precio'] is None:
                sin_precio.add(f['componente'])
                resumen.append(f"- Sin precio de referencia (no entra en el reparto): {f['componente']}")
        resumen.append('')
    resumen += ['## Fuente de cada precio', '', '| Componente | Precio | Fuente |', '| --- | --- | --- |']
    for p in precios:
        resumen.append(f"| `{p['patron']}` | ${p['precio']:.2f} | {p['fuente']} |")
    open(os.path.join(carpeta, 'reparto.md'), 'w', encoding='utf-8').write('\n'.join(resumen) + '\n')
    if sin_precio:
        print('Componentes sin precio de referencia:', '; '.join(sorted(sin_precio)))
    # PDF de cada lista (el que los equipos descargan en la plataforma)
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from listas_a_pdf import convertir
    convertir(guardados)


if __name__ == '__main__':
    main()
