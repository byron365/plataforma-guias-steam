# Convierte a PDF las listas de materiales en Word (.docx) para que los equipos las descarguen
# desde la plataforma (apartado Descargas de la bitácora). Usa Microsoft Word sin abrir ventanas.
# Solo convierte las listas que no tienen PDF o cuyo Word es más nuevo que su PDF.
# Uso: python listas_a_pdf.py <carpeta de las listas> [parte del nombre]
# lista_materiales.py lo llama solo después de crear cada Word.
import sys, os

FORMATO_PDF = 17  # wdExportFormatPDF


def pendientes(carpeta, filtro=''):
    """Words de la carpeta que necesitan PDF (nuevo o desactualizado)."""
    lista = []
    for nombre in sorted(os.listdir(carpeta)):
        if not nombre.lower().endswith('.docx') or nombre.startswith('~$'):  # ~$ = abierto en Word
            continue
        if filtro and filtro.lower() not in nombre.lower():
            continue
        word = os.path.join(carpeta, nombre)
        pdf = word[:-5] + '.pdf'
        if not os.path.exists(pdf) or os.path.getmtime(pdf) < os.path.getmtime(word):
            lista.append(word)
    return lista


def convertir(archivos):
    """Convierte cada .docx en un .pdf con el mismo nombre. Devuelve cuántos salieron bien."""
    if not archivos:
        return 0
    try:
        import win32com.client
    except ImportError:
        print('Falta pywin32 (python -m pip install pywin32): no se crearon los PDF.')
        return 0
    word = win32com.client.DispatchEx('Word.Application')  # una copia aparte del Word que esté abierto
    word.Visible = False
    word.DisplayAlerts = 0
    bien = 0
    try:
        for archivo in archivos:
            ruta = os.path.abspath(archivo)
            pdf = ruta[:-5] + '.pdf'
            try:
                doc = word.Documents.Open(ruta, ReadOnly=True, AddToRecentFiles=False)
                try:
                    doc.ExportAsFixedFormat(pdf, FORMATO_PDF)
                finally:
                    doc.Close(False)
                print('PDF OK', pdf)
                bien += 1
            except Exception as error:  # por ejemplo, el PDF está abierto en otro programa
                print('NO SE PUDO CONVERTIR', ruta, '·', error)
    finally:
        word.Quit()
    return bien


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__ or 'Uso: python listas_a_pdf.py <carpeta de las listas> [parte del nombre]')
        sys.exit(1)
    carpeta = sys.argv[1]
    archivos = pendientes(carpeta, sys.argv[2] if len(sys.argv) > 2 else '')
    if not archivos:
        print('Todas las listas ya tienen su PDF al día.')
    else:
        print(f'Convirtiendo {len(archivos)} lista(s)…')
        print(f'Listo: {convertir(archivos)} de {len(archivos)}.')
