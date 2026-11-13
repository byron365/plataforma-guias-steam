# Marca en morado las partes de Arduino IDE en las capturas de capturar_ide.py (recuadro, número y nombre) y guarda las
# 4 imágenes de la guía de subir programas: IMAGEN <guía>.1<sufijo> (partes del IDE), .2 (placa y puerto), .3 (programa
# verificado) y .4 (botón Subir).
# Uso: python anotar_ide.py <carpeta de salida> <carpeta de las capturas> <sufijo: A, AD, AR…> <número de la guía>
#   ej.: python anotar_ide.py salida capturas AR 10   →   IMAGEN 10.1AR.png … IMAGEN 10.4AR.png
import sys, os
from PIL import Image, ImageDraw, ImageFont

DEST = sys.argv[1]
S = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.abspath(__file__))   # carpeta de las capturas
SUF = sys.argv[3] if len(sys.argv) > 3 else 'A'             # A = armado (AD: armado doble, AR: armado del robot)
GUIA = sys.argv[4] if len(sys.argv) > 4 else '9'           # número de la guía
MORADO, BLANCO = (124, 58, 237), (255, 255, 255)
F = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 30)
FN = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 28)


def marca(d, caja, n, texto, donde):
    """Recuadro morado en 'caja' y una etiqueta con su número; 'donde' = esquina de la etiqueta (x, y)."""
    x0, y0, x1, y1 = caja
    d.rounded_rectangle(caja, radius=10, outline=MORADO, width=6)
    tx, ty = donde
    t = f' {texto}' if texto else ''
    ancho = d.textlength(t, font=F) + (56 if texto else 44)
    d.rounded_rectangle((tx, ty, tx + ancho, ty + 48), radius=24, fill=BLANCO, outline=MORADO, width=4)
    d.ellipse((tx + 5, ty + 5, tx + 43, ty + 43), fill=MORADO)
    d.text((tx + 24, ty + 24), str(n), font=FN, fill=BLANCO, anchor='mm')
    if texto:
        d.text((tx + 50, ty + 24), texto, font=F, fill=(17, 17, 17), anchor='lm')


def con_franja(im, alto=110):
    """Agrega una franja blanca arriba para poner los nombres de los botones sin tapar nada."""
    nueva = Image.new('RGB', (im.width, im.height + alto), BLANCO)
    nueva.paste(im, (0, alto))
    return nueva


def guardar(im, nombre):
    ruta = os.path.join(DEST, nombre)
    im.save(ruta, optimize=True)
    print('OK', nombre, im.size)


# 9.1A: las partes del IDE
im = con_franja(Image.open(os.path.join(S, 'ide_9.png')).convert('RGB'))
d = ImageDraw.Draw(im)
A = 110
marca(d, (8, 2 + A, 78, 66 + A), 1, 'Verificar', (10, 20))
marca(d, (70, 2 + A, 138, 66 + A), 2, 'Subir', (240, 20))
marca(d, (204, 4 + A, 602, 62 + A), 3, 'Selector de placa', (440, 20))
marca(d, (1580, 2 + A, 1646, 66 + A), 4, 'Monitor serie', (1360, 20))
marca(d, (86, 120 + A, 1640, 640 + A), 5, 'Área del programa', (1020, 360 + A))
marca(d, (86, 650 + A, 1640, 1000 + A), 6, 'Cuadro de mensajes', (1180, 880 + A))
for x0, x1 in ((43, 43), (104, 260), (400, 480), (1613, 1500)):        # líneas de las etiquetas a sus botones
    d.line((x1, 68, x0, 2 + A), fill=MORADO, width=5)
guardar(im, f'IMAGEN {GUIA}.1{SUF}.png')

# 9.2A: elegir Arduino UNO (sin Arduino conectado no aparece puerto)
im = Image.open(os.path.join(S, 'ide_5.png')).convert('RGB')
d = ImageDraw.Draw(im)
marca(d, (300, 420, 812, 484), 1, 'Arduino UNO', (300, 556))
marca(d, (826, 336, 1396, 410), 2, 'Aquí aparece el puerto COM', (840, 430))
d.text((850, 500), 'cuando el Arduino está conectado', font=F, fill=MORADO)
marca(d, (1198, 832, 1372, 896), 3, 'Aceptar', (1180, 950))
guardar(im, f'IMAGEN {GUIA}.2{SUF}.png')

# 9.3A: el programa verificado sin errores
im = con_franja(Image.open(os.path.join(S, 'ide_8.png')).convert('RGB'))
d = ImageDraw.Draw(im)
A = 110
marca(d, (8, 2 + A, 78, 66 + A), 1, 'Verificar', (10, 20))
d.line((43, 68, 43, 2 + A), fill=MORADO, width=5)
marca(d, (780, 896 + A, 1630, 982 + A), 2, 'Sin errores: compilación completada', (780, 820 + A))
guardar(im, f'IMAGEN {GUIA}.3{SUF}.png')

# 9.4A: el botón Subir (la barra de arriba, en grande)
im = Image.open(os.path.join(S, 'ide_9.png')).convert('RGB').crop((0, 0, 900, 68))
im = im.resize((im.width * 2 // 1, im.height * 2 // 1), Image.LANCZOS)
lienzo = Image.new('RGB', (im.width, im.height + 130), BLANCO)
lienzo.paste(im, (0, 0))
d = ImageDraw.Draw(lienzo)
marca(d, (138, 4, 278, 132), 1, 'Subir: pasa el programa al Arduino por el cable USB', (40, 180))
d.line((208, 132, 208, 180), fill=MORADO, width=5)
guardar(lienzo, f'IMAGEN {GUIA}.4{SUF}.png')
