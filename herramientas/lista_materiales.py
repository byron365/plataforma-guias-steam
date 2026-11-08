# Genera las listas de materiales en Word (.docx), una por grupo, según la versión de guías asignada a cada equipo.
# Lee los equipos de datos/plataforma.db (solo lectura; nada sale de la computadora) y la lista de cada versión de
# herramientas/materiales/<proyecto>.json. Las imágenes y sus créditos están en <carpeta de salida>/imagenes/.
# Uso: python lista_materiales.py <id del proyecto> <carpeta de salida> [nombre del grupo] [versión]
# Con el nombre del grupo (o parte de él), solo se genera el documento de ese grupo.
# Con la versión, se usa esa lista aunque el equipo todavía tenga otra versión asignada en la plataforma.
# Si el grupo está en <carpeta de salida>/integrantes.json, agrega la columna "¿Quién lo consigue?" (reparto_materiales.py).
# Al final crea también el PDF de cada Word (listas_a_pdf.py), que es el que descargan los equipos.
import sys, os, json, sqlite3
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
proyecto_id, salida = sys.argv[1], sys.argv[2]
solo_grupo = sys.argv[3].lower() if len(sys.argv) > 3 else ''
version_pedida = sys.argv[4] if len(sys.argv) > 4 else ''
datos = json.load(open(os.path.join(RAIZ, 'herramientas', 'materiales', proyecto_id + '.json'), encoding='utf-8'))
proyecto_json = json.load(open(os.path.join(RAIZ, 'contenido', proyecto_id, 'proyecto.json'), encoding='utf-8'))
imagenes = json.load(open(os.path.join(salida, 'imagenes', 'imagenes.json'), encoding='utf-8'))
# La versión vacía en la base de datos es la primera del proyecto (la normal)
version_normal = (proyecto_json.get('versiones') or [{'id': ''}])[0]['id']

AZUL, GRIS = RGBColor(0x02, 0x84, 0xC7), RGBColor(0x55, 0x55, 0x55)
ANCHOS = [Cm(1.2), Cm(3.6), Cm(5.4), Cm(3.4), Cm(4.4)]   # ítem, imagen, componente, cantidad, para qué

def sombrear(celda, color):
    tc = celda._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), color)
    tc.append(shd)

def texto(celda, t, negrita=False, tam=10, color=None, centro=False):
    p = celda.paragraphs[0]
    r = p.add_run(t)
    r.bold, r.font.size = negrita, Pt(tam)
    if color:
        r.font.color.rgb = color
    if centro:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    celda.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER

def documento(grupo, version_id):
    version = datos['versiones'][version_id]
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Cm(21.59), Cm(27.94)   # carta
    for lado in ('left_margin', 'right_margin', 'top_margin', 'bottom_margin'):
        setattr(sec, lado, Cm(1.8))
    # Logo de la academia en la esquina de arriba a la derecha de cada página (imagenes/logo.png)
    logo = os.path.join(salida, 'imagenes', 'logo.png')
    if os.path.exists(logo):
        sec.header_distance = Cm(0.8)
        par = sec.header.paragraphs[0]
        par.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        par.add_run().add_picture(logo, width=Cm(3.2))
    estilo = doc.styles['Normal']
    estilo.font.name, estilo.font.size = 'Calibri', Pt(11)

    # Encabezado: proyecto y grupo
    p = doc.add_paragraph()
    r = p.add_run('Lista de materiales')
    r.bold, r.font.size, r.font.color.rgb = True, Pt(12), GRIS
    p = doc.add_paragraph()
    r = p.add_run(datos['proyecto'])
    r.bold, r.font.size, r.font.color.rgb = True, Pt(24), AZUL
    p = doc.add_paragraph()
    r = p.add_run('Grupo: ')
    r.bold, r.font.size = True, Pt(14)
    r = p.add_run(grupo)
    r.font.size = Pt(14)
    p = doc.add_paragraph()
    r = p.add_run(f"Nivel {datos['nivel']} · Versión de las guías: {version['nombre']} · {version['sabados']} sábados")
    r.font.size, r.font.color.rgb = Pt(10), GRIS
    # Las cuatro líneas del encabezado van centradas en la página
    for p in doc.paragraphs[:4]:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    doc.add_paragraph('Materiales que el grupo necesita para todo el proyecto, según sus guías.').runs[0].font.size = Pt(10)

    # Tabla de materiales
    tabla = doc.add_table(rows=1, cols=5)
    tabla.style = 'Table Grid'
    tabla.alignment = WD_TABLE_ALIGNMENT.CENTER
    # El encabezado de la tabla se repite en cada página
    trPr = tabla.rows[0]._tr.get_or_add_trPr()
    repetir = OxmlElement('w:tblHeader')
    repetir.set(qn('w:val'), 'true')
    trPr.append(repetir)
    for celda, titulo, ancho in zip(tabla.rows[0].cells, ['Ítem', 'Imagen', 'Componente', 'Cantidad', '¿Para qué?'], ANCHOS):
        celda.width = ancho
        sombrear(celda, '0284C7')
        texto(celda, titulo, True, 10, RGBColor(0xFF, 0xFF, 0xFF), centro=True)
    for i, m in enumerate(version['materiales'], 1):
        fila = tabla.add_row().cells
        for celda, ancho in zip(fila, ANCHOS):
            celda.width = ancho
        if i % 2 == 0:
            for celda in fila:
                sombrear(celda, 'F2F7FB')
        texto(fila[0], str(i), True, 10, centro=True)
        img = imagenes[m['imagen']]
        # Imagen de 3 cm de ancho como máximo y 2,6 cm de alto como máximo
        ancho = min(3.0, 2.6 * img['ancho'] / img['alto'])
        par = fila[1].paragraphs[0]
        par.alignment = WD_ALIGN_PARAGRAPH.CENTER
        par.add_run().add_picture(os.path.join(salida, 'imagenes', img['archivo']), width=Cm(ancho))
        fila[1].vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        texto(fila[2], m['componente'], True, 10)
        texto(fila[3], m['cantidad'], False, 10, centro=True)
        texto(fila[4], m['uso'], False, 9, GRIS)

    # Lo que no hay que comprar y créditos de las imágenes
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    r = p.add_run('No hace falta comprar: ')
    r.bold, r.font.size = True, Pt(10)
    r = p.add_run(version['no_comprar'])
    r.font.size = Pt(10)
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.keep_with_next = True
    r = p.add_run('Créditos de las imágenes (Wikimedia Commons)')
    r.bold, r.font.size, r.font.color.rgb = True, Pt(8), GRIS
    vistos = []
    for i, m in enumerate(version['materiales'], 1):
        if m['imagen'] in vistos:
            continue
        vistos.append(m['imagen'])
        img = imagenes[m['imagen']]
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(0)
        if img['licencia'] == 'Ilustración propia':
            credito = 'Ilustración propia de la academia'
        else:
            credito = f"{img['autor'] or 'Autor sin nombre'} · {img['licencia']} · {img['pagina']}"
        r = p.add_run(f"{i}. {credito}")
        r.font.size, r.font.color.rgb = Pt(7), GRIS
    return doc

con = sqlite3.connect('file:' + os.path.join(RAIZ, 'datos', 'plataforma.db') + '?mode=ro', uri=True)
equipos = con.execute('SELECT nombre, version FROM equipos WHERE proyecto = ? ORDER BY nombre', (proyecto_id,)).fetchall()
con.close()
guardados = []
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
ruta_integrantes = os.path.join(salida, 'integrantes.json')   # fuera del repositorio: tiene nombres de estudiantes
integrantes = json.load(open(ruta_integrantes, encoding='utf-8')) if os.path.exists(ruta_integrantes) else {}
for nombre, version in equipos:
    if solo_grupo and solo_grupo not in nombre.lower():
        continue
    version = version_pedida or version or version_normal
    if version not in datos['versiones']:
        print('FALTA la lista de la versión', version, 'para', nombre)
        continue
    archivo = os.path.join(salida, f"{datos['proyecto']} - {nombre}.docx".replace('/', '-'))
    try:
        documento(nombre, version).save(archivo)
        # Columna "¿Quién lo consigue?" con las compras repartidas entre los integrantes (si están en integrantes.json)
        if nombre in integrantes:
            from reparto_materiales import procesar
            procesar(archivo, integrantes[nombre])
        print('OK', archivo)
        guardados.append(archivo)
    except PermissionError:
        # Pasa cuando el documento está abierto en Word: hay que cerrarlo y volver a ejecutar
        print('NO SE PUDO GUARDAR (¿está abierto en Word?):', archivo)

# El PDF de cada lista es el que los equipos descargan en la plataforma (Descargas de la bitácora)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from listas_a_pdf import convertir
convertir(guardados)
