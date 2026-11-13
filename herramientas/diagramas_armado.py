# Arma los diagramas de conexiones "paso a paso" de las guías de armado, con los dibujos reales de las piezas de Fritzing
# (fritzing-parts, licencia CC BY-SA 3.0: hay que dar el crédito, y la imagen lo lleva escrito abajo a la derecha).
# Cada paso es una imagen: lo de los pasos anteriores se ve apagado (gris claro) y lo nuevo a todo color, con una
# etiqueta en cada punta de los cables nuevos ("D4", "E12", "fila −"). El Arduino, la protoboard y los recuadros de las
# piezas impresas se ven siempre normales. (Antes lo nuevo llevaba un halo amarillo, pero se confundía con el cable
# amarillo del LED.)
#
# Uso: python diagramas_armado.py <proyecto> <carpeta de las piezas .svg> <carpeta de salida>
#   ej.: python diagramas_armado.py puente "..\..\Diagramas\piezas" "..\..\Diagramas\puente"
# Necesita Inkscape: mide dónde queda cada pin dentro de cada dibujo (--query-all) y exporta los PNG.
#
# Cómo se trazan los cables: cada cable es una línea quebrada (solo tramos horizontales y verticales) con sus esquinas
# escritas a mano. Se ordenaron para que casi ninguno se cruce: el que sale más a la izquierda del Arduino es el que da la
# vuelta por afuera. Los que van del Arduino a la protoboard bajan por la canaleta del medio y suben a la fila E; los de
# las torres bajan desde arriba a la fila A o a la fila − de arriba.
import sys, os, re, math, csv, subprocess
from types import SimpleNamespace

INKSCAPE = r'C:\Program Files\Inkscape\bin\inkscape.exe'
PX_MM = 6                       # resolución de los PNG: 6 px por mm (unos 150 ppp)

# Milímetros por unidad de cada dibujo. Casi todos están a 96 ppp; la protoboard de Fritzing está a 72 ppp
# (se comprobó con la separación de los agujeros: 2,54 mm).
ESCALA = {'halfBreadboard': 25.4 / 72, 'miniBreadboard': 25.4 / 72, 'HC-05-male_breadboard': 25.4 / 90}  # el HC-05, de un Inkscape viejo (90 ppp)
ESCALA_NORMAL = 25.4 / 96
CREDITO = 'Dibujos de las piezas: Fritzing (fritzing.org), CC BY-SA 3.0'


# ----------------------------------------------------------------------------------------------- piezas de Fritzing
class Pieza:
    """Un dibujo de Fritzing puesto en el diagrama: posición (mm), giro (0 o 180 grados) y pines por su id del SVG."""
    contador = 0

    def __init__(self, carpeta, nombre, x=0, y=0, giro=0, colores=None, paso=0):
        self.nombre, self.x, self.y, self.giro, self.paso = nombre, x, y, giro, paso
        self.escala = ESCALA.get(nombre, ESCALA_NORMAL)
        self.texto = open(os.path.join(carpeta, nombre + '.svg'), encoding='utf-8', errors='replace').read()
        for viejo, nuevo in (colores or {}).items():
            self.texto = re.sub(re.escape(viejo), nuevo, self.texto, flags=re.I)
        self.cajas = consultar(carpeta, nombre)
        raiz = re.search(r'<svg\b[^>]*>', self.texto, re.S).group(0)
        atributo = lambda a: (re.search(r'\s' + a + r'\s*=\s*"([^"]*)"', raiz) or [None, None])[1]
        self.ancho_px, self.alto_px = a_px(atributo('width')), a_px(atributo('height'))
        self.viewbox = atributo('viewBox') or f'0 0 {self.ancho_px} {self.alto_px}'
        Pieza.contador += 1
        self.prefijo = f'p{Pieza.contador}_'

    @property
    def ancho(self):
        return self.ancho_px * self.escala

    @property
    def alto(self):
        return self.alto_px * self.escala

    def mundo(self, lx, ly):
        """Punto del dibujo (mm, desde su esquina) → punto del diagrama (mm)."""
        a = math.radians(self.giro)
        return (self.x + lx * math.cos(a) - ly * math.sin(a), self.y + lx * math.sin(a) + ly * math.cos(a))

    def pin(self, pin, donde='centro'):
        """Centro de un elemento del SVG (o su borde de abajo, donde='abajo'), en mm del diagrama."""
        x, y, w, h = self.cajas[pin]
        ly = y + h / 2 if donde == 'centro' else y + h
        return self.mundo((x + w / 2) * self.escala, ly * self.escala)

    def anclar(self, pin, destino):
        """Mueve la pieza para que su pin quede justo en 'destino'."""
        px, py = self.pin(pin)
        self.x += destino[0] - px
        self.y += destino[1] - py
        return self

    def doblar(self, pata, destino):
        """Dobla una pata de Fritzing (una <line> con id 'connector0leg', etc.) para que su punta llegue a 'destino' (mm
        del diagrama), como las patas que se doblan en Fritzing. Sirve también con la pieza girada."""
        vb = [float(v) for v in self.viewbox.replace(',', ' ').split()]
        u = self.ancho / vb[2]                                     # mm por unidad del dibujo
        a = math.radians(-self.giro)                               # deshacer el giro de la pieza
        dx, dy = destino[0] - self.x, destino[1] - self.y
        mx, my = dx * math.cos(a) - dy * math.sin(a), dx * math.sin(a) + dy * math.cos(a)
        lx, ly = mx / u + vb[0], my / u + vb[1]

        def cambiar(m):
            linea = re.sub(r'\bx2="[^"]*"', f'x2="{lx:.3f}"', m.group(0))
            return re.sub(r'\by2="[^"]*"', f'y2="{ly:.3f}"', linea)
        self.texto, n = re.subn(r'<line\b[^>]*\bid="' + re.escape(pata) + r'"[^>]*>', cambiar, self.texto)
        assert n == 1, pata
        return self

    def caja(self):
        """Rectángulo que ocupa la pieza en el diagrama (x, y, ancho, alto)."""
        esquinas = [self.mundo(a, b) for a in (0, self.ancho) for b in (0, self.alto)]
        xs, ys = [p[0] for p in esquinas], [p[1] for p in esquinas]
        return min(xs), min(ys), max(xs) - min(xs), max(ys) - min(ys)

    def svg(self):
        cuerpo = re.sub(r'<\?xml[^>]*\?>|<!DOCTYPE[^>]*>|<!--.*?-->', '', self.texto, flags=re.S)
        cuerpo = re.sub(r'^.*?<svg\b[^>]*>', '', cuerpo, count=1, flags=re.S)
        cuerpo = cuerpo[:cuerpo.rfind('</svg>')]
        # Cada pieza lleva un prefijo en sus id para que no choquen los de dos piezas iguales (los tres LED, por ejemplo)
        p = self.prefijo
        cuerpo = re.sub(r'\bid="([^"]+)"', lambda m: f'id="{p}{m.group(1)}"', cuerpo)
        cuerpo = re.sub(r'url\(#([^)]+)\)', lambda m: f'url(#{p}{m.group(1)})', cuerpo)
        cuerpo = re.sub(r'href="#([^"]+)"', lambda m: f'href="#{p}{m.group(1)}"', cuerpo)
        return (f'<g transform="translate({self.x:.3f} {self.y:.3f}) rotate({self.giro})">'
                f'<svg x="0" y="0" width="{self.ancho:.3f}" height="{self.alto:.3f}" viewBox="{self.viewbox}" '
                f'preserveAspectRatio="none" overflow="visible">{cuerpo}</svg></g>')


def a_px(valor):
    """Ancho o alto del SVG en las unidades de Inkscape (96 por pulgada; sin unidad, tal cual)."""
    m = re.match(r'\s*([\d.]+)\s*([a-z%]*)', valor or '0')
    n, u = float(m.group(1)), m.group(2)
    return n * {'in': 96, 'mm': 96 / 25.4, 'cm': 96 / 2.54, 'pt': 96 / 72}.get(u, 1)


_consultas = {}


def consultar(carpeta, nombre):
    """Cajas (x, y, ancho, alto) de todos los elementos del SVG, medidas por Inkscape. Se guardan en 'consultas/'."""
    if nombre not in _consultas:
        cache = os.path.join(carpeta, 'consultas', nombre + '.csv')
        if not os.path.exists(cache):
            os.makedirs(os.path.dirname(cache), exist_ok=True)
            salida = subprocess.run([INKSCAPE, os.path.join(carpeta, nombre + '.svg'), '--query-all'],
                                    capture_output=True, text=True).stdout
            open(cache, 'w', encoding='utf-8').write(salida)
        cajas = {}
        for fila in csv.reader(open(cache, encoding='utf-8')):
            if len(fila) == 5:
                cajas[fila[0]] = tuple(float(v) for v in fila[1:])
        _consultas[nombre] = cajas
    return _consultas[nombre]


# ----------------------------------------------------------------------------------------------- dibujos propios
def buzzer(x, y):
    """Buzzer de 12 mm visto desde arriba (centro x, y) con sus dos patas hacia abajo, separadas 7,6 mm (3 agujeros).
    Devuelve el SVG y la punta de cada pata."""
    s = (f'<circle cx="{x}" cy="{y}" r="6" fill="#1b1b1b" stroke="#000" stroke-width="0.3"/>'
         f'<circle cx="{x}" cy="{y}" r="4.4" fill="none" stroke="#3a3a3a" stroke-width="0.4"/>'
         f'<circle cx="{x}" cy="{y}" r="0.9" fill="#555"/>'
         f'<text x="{x - 3.3}" y="{y - 1.6}" font-family="Arial" font-size="3" font-weight="bold" fill="#fff" '
         f'text-anchor="middle">+</text>')
    patas = {'+': (x - 3.81, y + 11), '-': (x + 3.81, y + 11)}
    for px, py in patas.values():
        s = f'<line x1="{px}" y1="{y + 4}" x2="{px}" y2="{py}" stroke="#a8a8a8" stroke-width="0.7"/>' + s
    return s, patas


def conector_servo(x, ys_cable, colores, hacia):
    """Cable plano del servo (sale de sus patas en x, a las alturas ys_cable) hasta su conector hembra de 3 en x + 4·hacia.
    Devuelve el SVG y los 3 agujeros del conector (separados 2,54 mm), donde se meten los cables macho–macho."""
    xc = x + 4 * hacia
    centro = sum(ys_cable) / 3
    agujeros = [centro - 2.54, centro, centro + 2.54]
    s = ''
    for yc, ya, col in zip(ys_cable, agujeros, colores):
        s += (f'<path d="M {x:.2f} {yc:.2f} L {x + 1.5 * hacia:.2f} {yc:.2f} L {xc:.2f} {ya:.2f}" fill="none" '
              f'stroke="{col}" stroke-width="0.95" stroke-linejoin="round"/>')
    x0 = min(xc, xc + 6 * hacia)
    s += f'<rect x="{x0:.2f}" y="{centro - 4:.2f}" width="6" height="8" rx="0.5" fill="#1b1b1b" stroke="#000" stroke-width="0.2"/>'
    return s, [(xc + 6 * hacia, ya) for ya in agujeros]


def oscurecer(color, f=0.62):
    c = color.lstrip('#')
    if len(c) == 3:                                   # '#777' → '777777'
        c = ''.join(ch * 2 for ch in c)
    r, g, b = (int(c[i:i + 2], 16) for i in (0, 2, 4))
    return '#%02x%02x%02x' % (int(r * f), int(g * f), int(b * f))


def cable(puntos, color, hembra=False):
    """Cable de puente: línea con borde y punta macho (gris) en cada lado; con hembra=True, el inicio es una punta hembra
    (negra), la que se pone en la pata de un LED, del buzzer o del sensor."""
    d = 'M ' + ' L '.join(f'{x:.2f} {y:.2f}' for x, y in puntos)
    s = (f'<path d="{d}" fill="none" stroke="{oscurecer(color)}" stroke-width="1.35" stroke-linecap="round" '
          f'stroke-linejoin="round"/><path d="{d}" fill="none" stroke="{color}" stroke-width="0.95" '
          f'stroke-linecap="round" stroke-linejoin="round"/>')
    for i, (x, y) in ((0, puntos[0]), (-1, puntos[-1])):
        if hembra == 'pelado':                     # cable pelado que se atornilla (relé, jack, bomba): punta de cobre
            s += f'<circle cx="{x:.2f}" cy="{y:.2f}" r="0.75" fill="#c8793a" stroke="#7a4a1e" stroke-width="0.2"/>'
        elif i == 0 and hembra:
            ox, oy = puntos[1]
            ang = math.degrees(math.atan2(oy - y, ox - x))
            s += (f'<g transform="translate({x:.2f} {y:.2f}) rotate({ang:.1f})"><rect x="-0.6" y="-1.3" width="6.4" '
                  f'height="2.6" rx="0.3" fill="#222" stroke="#000" stroke-width="0.2"/></g>')
        else:
            s += f'<circle cx="{x:.2f}" cy="{y:.2f}" r="0.6" fill="#b5b5b5" stroke="#555" stroke-width="0.18"/>'
    return s


def texto(x, y, t, tam=3.0, color='#222', ancla='middle', fondo=True, negrita=True):
    ancho = len(t) * tam * 0.56 + 1.4
    x0 = x - ancho / 2 if ancla == 'middle' else (x - 0.7 if ancla == 'start' else x - ancho + 0.7)
    s = ''
    if fondo:
        s += (f'<rect x="{x0:.2f}" y="{y - tam * 0.86:.2f}" width="{ancho:.2f}" height="{tam * 1.18:.2f}" rx="0.7" '
              f'fill="#fff" opacity="0.9"/>')
    t = t.replace('&', '&amp;').replace('<', '&lt;')
    return s + (f'<text x="{x:.2f}" y="{y:.2f}" font-family="Arial, Helvetica, sans-serif" font-size="{tam}" '
                f'font-weight="{"bold" if negrita else "normal"}" fill="{color}" text-anchor="{ancla}">{t}</text>')


def zona(x, y, w, h, titulo, abajo=False):
    """Recuadro punteado para lo que va en una pieza impresa (torre, soporte…), con su nombre arriba (o adentro, abajo,
    si por arriba entran cables)."""
    ty = y + h - 1.8 if abajo else y - 1.3
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="2.5" fill="#eef2f6" stroke="#8a97a6" '
            f'stroke-width="0.4" stroke-dasharray="1.6 1.2"/>' + texto(x + 1.5 if abajo else x + 0.5, ty, titulo, 2.7, '#4a5868', 'start', False))


def globo(x, y, t, color, tam=2.3):
    """Etiqueta de la punta de un cable: óvalo blanco con borde del color del cable, centrado en (x, y)."""
    ancho = len(t) * tam * 0.6 + 2.2
    return (f'<rect x="{x - ancho / 2:.2f}" y="{y - 1.9:.2f}" width="{ancho:.2f}" height="3.8" rx="1.9" fill="#fff" '
            f'stroke="{oscurecer(color, 0.8)}" stroke-width="0.45"/>'
            f'<text x="{x:.2f}" y="{y + tam * 0.36:.2f}" font-family="Arial, Helvetica, sans-serif" font-size="{tam}" '
            f'font-weight="bold" fill="#111" text-anchor="middle">{t}</text>')


def globos_cable(puntos, color, puntas):
    """Etiquetas de las dos puntas de un cable. Cada punta es None (sin etiqueta), un texto (va un poco más allá de la
    punta, siguiendo el cable) o (texto, (dx, dy)) para ponerla a mano, corrida dx, dy mm desde la punta."""
    s = ''
    for punta, (x, y), (ox, oy) in ((puntas[0], puntos[0], puntos[1]), (puntas[1], puntos[-1], puntos[-2])):
        if not punta:
            continue
        t, corrida = (punta, None) if isinstance(punta, str) else punta
        if corrida is None:                               # más allá de la punta, en la dirección en que llega el cable
            dx, dy = x - ox, y - oy
            largo = math.hypot(dx, dy) or 1
            dx, dy = dx / largo, dy / largo
            dist = 4.2 if abs(dy) > abs(dx) else len(t) * 2.3 * 0.3 + 2.5
            corrida = (dx * dist, dy * dist)
        s += globo(x + corrida[0], y + corrida[1], t, color)
    return s


def exportar(svg, ancho, alto, ruta_png):
    ruta_svg = ruta_png[:-4] + '.svg'
    doc = (f'<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" '
           f'xmlns:xlink="http://www.w3.org/1999/xlink" width="{ancho}mm" height="{alto}mm" viewBox="0 0 {ancho} {alto}">'
           f'<rect width="{ancho}" height="{alto}" fill="#ffffff"/>{svg}</svg>')
    open(ruta_svg, 'w', encoding='utf-8').write(doc)
    subprocess.run([INKSCAPE, ruta_svg, '--export-type=png', f'--export-dpi={PX_MM * 25.4:.0f}',
                    '--export-background=white', f'--export-filename={ruta_png}'], capture_output=True)
    return ruta_png


class Diagrama:
    """Junta todo lo que se dibuja, cada cosa con el número del paso en que aparece."""

    def __init__(self, ancho, alto, pasos, bajar=0):
        self.ancho, self.alto, self.pasos = ancho, alto, pasos      # pasos: {número: título}
        self.bajar = bajar                                 # mm que se corre todo hacia abajo (para dejar lugar arriba)
        self.piezas, self.cables, self.fondo, self.frente = [], [], [], []
        self.notas = []                                   # globos que solo se ven en su paso (p. ej. "220 Ω")

    def pieza(self, p):
        self.piezas.append(p)
        return p

    def cable(self, paso, puntos, color, hembra=False, puntas=(None, None)):
        self.cables.append((paso, puntos, color, hembra, puntas))

    def capa(self, cumple):
        """Piezas (menos el Arduino y la protoboard), dibujos propios y cables de los pasos que cumplen la condición."""
        base = ('arduino_Uno_Rev3_breadboard', 'halfBreadboard')
        return (''.join(p.svg() for p in self.piezas if cumple(p.paso) and p.nombre not in base)
                + ''.join(x for paso, x in self.frente if cumple(paso))
                + ''.join(cable(pts, col, h) for paso, pts, col, h, _ in self.cables if cumple(paso)))

    def svg(self, n, final=False):
        """Todo lo de los pasos 1 a n: lo de antes, apagado; lo del paso n, a todo color y con las etiquetas de las puntas
        de sus cables. En la imagen final, todo a todo color y sin etiquetas."""
        base = ('arduino_Uno_Rev3_breadboard', 'halfBreadboard')
        s = ('<defs><filter id="apagado" color-interpolation-filters="sRGB">'
             '<feColorMatrix type="saturate" values="0.2"/></filter></defs>')
        s += ''.join(x for paso, x in self.fondo if paso <= n)
        s += ''.join(p.svg() for p in self.piezas if p.paso <= n and p.nombre in base)
        if final:
            s += self.capa(lambda paso: paso <= n)
        else:
            s += f'<g filter="url(#apagado)" opacity="0.32">{self.capa(lambda paso: paso < n)}</g>'
            s += self.capa(lambda paso: paso == n)
            s += ''.join(globos_cable(pts, col, puntas) for paso, pts, col, h, puntas in self.cables if paso == n)
            s += ''.join(x for paso, x in self.notas if paso == n)
        if self.bajar:
            s = s.replace('</defs>', '</defs><g transform="translate(0 %s)">' % self.bajar, 1) + '</g>'
        titulo = 'Circuito completo' if final else f'Paso {n}: {self.pasos[n]}'
        s += texto(5, 9, titulo, 4.6, '#111', 'start', False)
        s += texto(self.ancho - 3, self.alto - 2.5, CREDITO, 2.2, '#777', 'end', False, False)
        return s

    def dibujar(self, salida):
        os.makedirs(salida, exist_ok=True)
        rutas = []
        for n in sorted(self.pasos):
            rutas.append(exportar(self.svg(n), self.ancho, self.alto, os.path.join(salida, f'paso_{n:02d}.png')))
            print('OK', os.path.basename(rutas[-1]), '-', self.pasos[n])
        rutas.append(exportar(self.svg(max(self.pasos), final=True), self.ancho, self.alto,
                              os.path.join(salida, 'completo.png')))
        print('OK completo.png')
        return rutas


# ----------------------------------------------------------------------------------------------- colores de los cables
ROJO, NEGRO, CAFE, NARANJA = '#d62828', '#2b2b2b', '#7a4a1e', '#f77f00'
AZUL, CELESTE, VERDE, AMARILLO, BLANCO, MORADO, GRIS, TURQUESA = (
    '#1d4ed8', '#4cc9f0', '#2b9348', '#f4c430', '#f2f2f2', '#7b2cbf', '#8d99ae', '#00a6a6')


# ----------------------------------------------------------------------------------------------- lo común
def arduino_y_protoboard(d, carpeta, unir_filas=True, ox=0, oy=0, paso=1):
    """Lo que tienen todos los circuitos: el Arduino a la izquierda y la protoboard a la derecha, sus filas + y − marcadas
    y el paso 1 (5V y GND a las filas de abajo y dos cables que las unen con las de arriba). Con unir_filas=False, las
    filas de arriba quedan sueltas (la garra: arriba va la fuente de los servos y solo se une el GND, en otro paso).
    ox, oy: cuánto se corre todo (para poner dos Arduinos en el mismo dibujo); paso: el paso de estos cables.
    Devuelve el Arduino, la protoboard, hoyo('E', 12) = un agujero, D(4) = un pin digital y
    por_la_canaleta(paso, pin, fila, color)."""
    ard = d.pieza(Pieza(carpeta, 'arduino_Uno_Rev3_breadboard', 66 + ox, 62 + oy, paso=1))
    bb = d.pieza(Pieza(carpeta, 'halfBreadboard', 152 + ox, 57 + oy, paso=1))
    hoyo = lambda letra, fila: bb.pin(f'{letra}{fila}pin')      # A–J: filas de la protoboard; W, X, Y, Z: filas + y −
    PIN = {2: 63, 3: 64, 4: 65, 5: 66, 6: 67, 7: 68, 8: 51, 9: 52, 10: 53, 11: 54}
    D = lambda n: ard.pin(f'connector{PIN[n]}pin')
    V5, GND = ard.pin('connector87pin'), ard.pin('connector88pin')
    A = lambda n: ard.pin(f'connector{n}pin')                     # A0 a A5 (abajo, ANALOG IN)

    # Las filas de los costados: W (arriba, afuera) y Z (abajo, afuera) son +; X e Y son −. El dibujo de Fritzing no las
    # marca: se les pone una raya roja o azul y el signo, como en las protoboards de verdad.
    x0, x1 = hoyo('W', 1)[0] - 2.5, hoyo('W', 29)[0] + 2.5
    for letra, col, signo in (('W', '#e63946', '+'), ('X', '#1d4ed8', '−'), ('Y', '#1d4ed8', '−'), ('Z', '#e63946', '+')):
        yy = hoyo(letra, 1)[1]
        dy = -2.1 if letra in 'WY' else 2.1                    # la raya va por fuera de su fila de agujeros
        d.fondo.append((1, f'<line x1="{x0:.2f}" y1="{yy + dy:.2f}" x2="{x1:.2f}" y2="{yy + dy:.2f}" stroke="{col}" '
                            f'stroke-width="0.45"/>' + texto(x1 + 4.5, yy + 1.2, signo, 4, col, fondo=False)))

    # Paso 1. 5V a la fila + de abajo y GND a la fila − de abajo; dos cables cortos pasan la fila + y la − de abajo a las
    # de arriba (las de arriba y las de abajo no están unidas por dentro).
    d.cable(paso, [GND, (GND[0], 117 + oy), (hoyo('Y', 2)[0], 117 + oy), hoyo('Y', 2)], NEGRO,
            puntas=(('GND', (4.2, -3.6)), ('fila −', (-7, -1))))
    d.cable(paso, [V5, (V5[0], 119 + oy), (hoyo('Z', 3)[0], 119 + oy), hoyo('Z', 3)], ROJO,
            puntas=(('5V', (-3.2, -3.6)), ('fila +', (7.5, 1.5))))
    if unir_filas:
        d.cable(paso, [hoyo('Z', 29), hoyo('W', 29)], ROJO)
        d.cable(paso, [hoyo('Y', 28), hoyo('X', 28)], NEGRO)

    # Cables del Arduino a la fila E: suben, bajan entre el Arduino y la protoboard y van por la canaleta del medio.
    # El de D5 va por afuera (más arriba y más a la derecha) y entra primero; el de D2 va por adentro y entra último.
    carril = {n: (ya + oy, xb + ox, yc + oy) for n, (ya, xb, yc) in
              {5: (53, 150, 81.4), 4: (55, 148, 82.9), 3: (57, 146, 84.4), 2: (59, 144, 85.9)}.items()}

    def por_la_canaleta(paso, n, fila, color, etiqueta=(5.5, 0)):
        y_arriba, x_bajada, y_carril = carril[n]
        px, py = D(n)
        e = hoyo('E', fila)
        d.cable(paso, [(px, py), (px, y_arriba), (x_bajada, y_arriba), (x_bajada, y_carril), (e[0], y_carril), e], color,
                puntas=(f'D{n}', (f'E{fila}', etiqueta)))

    return SimpleNamespace(ard=ard, bb=bb, hoyo=hoyo, D=D, A=A, V5=V5, GND=GND, por_la_canaleta=por_la_canaleta)


def servo_hacia_la_derecha(d, carpeta, b, paso, pin, mas, menos, x=68.2, y=136.7, nombre=None):
    """Servo girado (su cable sale hacia la derecha) abajo a la izquierda del Arduino, con su conector hembra de 3 y tres
    cables macho–macho: naranja → su pin (sube por la izquierda y entra por arriba), rojo → fila + y café → fila − de
    abajo (mas y menos = números de esas filas)."""
    sv = d.pieza(Pieza(carpeta, 'Dagu_DGServo_9g_Top_view_breadboard', x, y, giro=180, paso=paso))
    pt = [sv.mundo(4.58, (sv.cajas[f'connector{k}leg'][1] + sv.cajas[f'connector{k}leg'][3] / 2) * sv.escala) for k in range(3)]
    s, ag = conector_servo(pt[0][0], [p[1] for p in pt], (CAFE, ROJO, NARANJA), 1)
    d.frente.append((paso, s))
    h_naranja, h_rojo, h_cafe = sorted(ag, key=lambda p: p[1])     # girado: el naranja queda arriba
    D = b.D(pin)
    d.cable(paso, [h_naranja, (h_naranja[0] + 3, h_naranja[1]), (h_naranja[0] + 3, 121), (8, 121), (8, 56),
                   (D[0], 56), D], NARANJA, puntas=(None, f'D{pin}'))
    d.cable(paso, [h_rojo, (b.hoyo('Z', mas)[0], h_rojo[1]), b.hoyo('Z', mas)], ROJO, puntas=(None, ('fila +', (-7, 0))))
    d.cable(paso, [h_cafe, (b.hoyo('Y', menos)[0], h_cafe[1]), b.hoyo('Y', menos)], CAFE, puntas=(None, 'fila −'))
    if nombre:
        d.frente.append((paso, texto(x - 27.2, y + 4.6, nombre, 2.6, '#333')))
    return sv


# ----------------------------------------------------------------------------------------------- proyectos
def puente(carpeta):
    """Circuito del puente levadizo (tabla de conexiones de la Guía 7 práctica): semáforo D2–D4 con resistencias de
    220 Ω, buzzer D5, botón D6, sensor HC-SR04 (Trig D7, Echo D8), servos D9 (izquierdo) y D10 (derecho); la fila + y
    la fila − de la protoboard en 5V y GND; eliminador de 9 V en el jack (Guía 8)."""
    d = Diagrama(250, 176, {1: 'la protoboard recibe 5V y GND', 2: 'LED rojo', 3: 'LED amarillo', 4: 'LED verde',
                            5: 'buzzer', 6: 'botón', 7: 'sensor de distancia', 8: 'servo izquierdo',
                            9: 'servo derecho', 10: 'eliminador de 9 V'})
    b = arduino_y_protoboard(d, carpeta)
    ard, hoyo, D, por_la_canaleta = b.ard, b.hoyo, b.D, b.por_la_canaleta

    # Pasos 2 a 4. Semáforo: cada LED en la torre con 2 cables macho–hembra. Pata corta → fila − de arriba (X); pata
    # larga → fila A, una más a la derecha; resistencia de 220 Ω de esa fila (C) a la fila donde llega el cable del pin (E).
    d.fondo.append((2, zona(191.5, 13, 38.5, 32, 'Torre del semáforo')))
    for paso, (nombre, color_led, n, fila, color_cable) in enumerate((
            ('rojo', None, 4, 12, ROJO), ('amarillo', '#F2C200', 3, 17, AMARILLO), ('verde', '#00B050', 2, 22, VERDE)), 2):
        corta = hoyo('X', fila + 3)                               # pata corta (cátodo)
        larga = hoyo('A', fila + 4)                               # pata larga (ánodo), una fila más a la derecha
        led = Pieza(carpeta, 'LED-5mm-red-leg', paso=paso, colores={'#E60000': color_led} if color_led else None)
        led.anclar('connector0leg', (corta[0], 0))
        led.y = 18                                                # la torre: los LED arriba, las patas hacia abajo
        d.pieza(led)
        for pata, destino, col, puntas in (
                ('connector0leg', corta, NEGRO, (('corta', (-5.2, 2)), ('fila −', (-6.5, 0)))),
                ('connector1leg', larga, color_cable, (('larga', (5.2, 5.5)), (f'A{fila + 4}', (5.5, 0))))):
            x, y = led.pin(pata, 'abajo')
            d.cable(paso, [(x, y - 1.6), (x, y + 5), destino], col, hembra=True, puntas=puntas)
        r = d.pieza(Pieza(carpeta, 'resistor_220', paso=paso))
        r.anclar('connector0pin', hoyo('C', fila))
        d.notas.append((paso, globo(hoyo('B', fila + 2)[0], hoyo('B', fila)[1], '220 Ω', '#8a6d3b')))
        por_la_canaleta(paso, n, fila, color_cable)
        d.frente.append((paso, texto(led.pin('connector0leg')[0] + 1.3, 16.8, nombre, 2.4, '#333')))

    # Paso 5. Buzzer en su torre: + → fila A con el cable de D5 · − → fila − de arriba.
    d.fondo.append((5, zona(165.5, 13, 24, 32, 'Torre del buzzer')))
    mas, menos = hoyo('A', 8), hoyo('X', 11)
    s_bz, patas = buzzer((mas[0] + menos[0]) / 2, 24)
    d.frente.append((5, s_bz))
    for signo, destino, col, puntas in (('+', mas, MORADO, (('+', (-3.8, 3)), ('A8', (-5, 0)))),
                                        ('-', menos, NEGRO, (('−', (3.8, 3)), ('fila −', (6.5, 0))))):
        x, y = patas[signo]
        d.cable(5, [(x, y - 1.6), (x, y + 5), destino], col, hembra=True, puntas=puntas)
    por_la_canaleta(5, 5, 8, MORADO)

    # Paso 6. Botón con sus 4 patas en las filas B y E (columnas 2 y 4). Las patas de la misma columna ya están unidas
    # dentro del botón; al apretarlo se unen la columna 2 y la 4. D6 → A2 (pasa por arriba); A4 → fila − (la pata en
    # diagonal a la del pin).
    bt = d.pieza(Pieza(carpeta, 'basic_pbutton', paso=6))
    bt.anclar('connector2pin', hoyo('B', 2))
    px, py = D(6)
    d.cable(6, [(px, py), (px, 50), (hoyo('A', 2)[0], 50), hoyo('A', 2)], TURQUESA, puntas=('D6', ('A2', (-5, 0))))
    d.cable(6, [hoyo('A', 4), hoyo('X', 4)], NEGRO, puntas=(('A4', (5, 0)), 'fila −'))

    # Paso 7. Sensor HC-SR04 en su soporte, con 4 cables macho–hembra: Vcc → fila +, Trig → D7, Echo → D8, GND → fila −.
    d.fondo.append((7, zona(90, 6.5, 53, 34, 'Soporte del sensor')))
    hc = d.pieza(Pieza(carpeta, 'hc-sr04_bf8299a_002', 94, 9.5, paso=7))
    vcc, trig, echo, gnd = (hc.pin(f'connector{k}pin', 'abajo') for k in range(4))
    # (Vcc, Trig, Echo y GND ya vienen escritos en el dibujo del sensor)
    d.cable(7, [trig, (trig[0], 41.5), (D(7)[0], 41.5), D(7)], AZUL, hembra=True, puntas=(None, ('D7', (1.5, 7.8))))
    d.cable(7, [echo, (echo[0], 43), (D(8)[0], 43), D(8)], CELESTE, hembra=True, puntas=(None, 'D8'))
    d.cable(7, [gnd, (gnd[0], 45), (hoyo('X', 7)[0], 45), hoyo('X', 7)], NEGRO, hembra=True, puntas=(None, 'fila −'))
    d.cable(7, [vcc, (vcc[0], 47.5), (hoyo('W', 5)[0], 47.5), hoyo('W', 5)], ROJO, hembra=True,
            puntas=(None, ('fila +', (-7, 0))))

    # Pasos 8 y 9. Servos: su cable termina en un conector hembra de 3 (café, rojo, naranja); de ahí salen 3 cables
    # macho–macho: naranja → su pin, rojo → fila +, café → fila −. Los dos van a las filas de abajo.
    colores_servo = (CAFE, ROJO, NARANJA)

    def patas_servo(sv):
        return [sv.mundo(4.58, (sv.cajas[f'connector{k}leg'][1] + sv.cajas[f'connector{k}leg'][3] / 2) * sv.escala)
                for k in range(3)]

    # Servo derecho (D10), arriba: girado, con el cable hacia la derecha (de arriba abajo: naranja, rojo, café)
    servo_hacia_la_derecha(d, carpeta, b, 9, 10, mas=4, menos=5, nombre='Servo derecho (orilla A)')

    # Servo izquierdo (D9), abajo: sin girar, con el cable hacia la izquierda (de arriba abajo: café, rojo, naranja)
    si = d.pieza(Pieza(carpeta, 'Dagu_DGServo_9g_Top_view_breadboard', 30, 150, paso=8))
    pt = patas_servo(si)
    s, ag = conector_servo(pt[0][0], [p[1] for p in pt], colores_servo, -1)
    d.frente.append((8, s))
    h_cafe, h_rojo, h_naranja = sorted(ag, key=lambda p: p[1])
    d.cable(8, [h_cafe, (h_cafe[0] - 4, h_cafe[1]), (h_cafe[0] - 4, 147), (hoyo('Y', 8)[0], 147), hoyo('Y', 8)], CAFE,
            puntas=(None, 'fila −'))
    d.cable(8, [h_rojo, (h_rojo[0] - 6, h_rojo[1]), (h_rojo[0] - 6, 145), (hoyo('Z', 7)[0], 145), hoyo('Z', 7)], ROJO,
            puntas=(None, ('fila +', (-7, 0))))
    d.cable(8, [h_naranja, (h_naranja[0] - 8, h_naranja[1]), (h_naranja[0] - 8, 169), (4, 169), (4, 54),
                (D(9)[0], 54), D(9)], NARANJA, puntas=(None, 'D9'))
    d.frente.append((8, texto(77, 157.5, 'Servo izquierdo (orilla B)', 2.6, '#333', 'start')))

    # Paso 10. Eliminador de 9 V en el jack del Arduino
    jx, jy, jw, jh = ard.cajas['dc-21mm']                    # el jack, abajo a la izquierda
    jack = ard.mundo(jx * ard.escala, (jy + jh / 2) * ard.escala)
    caja = (20, jack[1] - 7, 30, 14)
    d.frente.append((10, f'<rect x="{caja[0]}" y="{caja[1]:.2f}" width="{caja[2]}" height="{caja[3]}" rx="2" fill="#2f2f2f"/>'
                         + texto(35, jack[1] - 1, 'Eliminador', 2.8, '#fff', fondo=False)
                         + texto(35, jack[1] + 3.2, '9 V', 2.8, '#fff', fondo=False)
                         + f'<path d="M 50 {jack[1]:.2f} L {jack[0] - 9:.2f} {jack[1]:.2f}" stroke="#1b1b1b" stroke-width="1.6" fill="none"/>'
                         + f'<rect x="{jack[0] - 9:.2f}" y="{jack[1] - 2.2:.2f}" width="9" height="4.4" rx="0.8" fill="#3a3a3a"/>'))
    return d


# ----------------------------------------------------------------------------------------------- dispensador
def buzzer_en_protoboard(x_mas, x_menos, y):
    """Buzzer de 12 mm clavado en la protoboard, visto desde arriba: sus patas (7,6 mm = 3 agujeros) en la misma letra."""
    cx = (x_mas + x_menos) / 2
    return (f'<circle cx="{cx:.2f}" cy="{y:.2f}" r="5.8" fill="#1b1b1b" stroke="#000" stroke-width="0.3"/>'
            f'<circle cx="{cx:.2f}" cy="{y:.2f}" r="4.3" fill="none" stroke="#3a3a3a" stroke-width="0.4"/>'
            f'<circle cx="{cx:.2f}" cy="{y:.2f}" r="0.9" fill="#555"/>'
            f'<text x="{x_mas + 0.6:.2f}" y="{y - 1.6:.2f}" font-family="Arial" font-size="3" font-weight="bold" fill="#fff" '
            f'text-anchor="middle">+</text>')


def modulo_rele(x, y, x_in, paso_pin=2.54):
    """Módulo relé de 1 canal visto desde arriba (dibujo propio: Fritzing no lo trae): placa azul de 46 × 24 mm, relé,
    bornera de tornillos arriba (NC, COM, NO) y 3 pines abajo (IN, GND, VCC). x_in = dónde cae el pin IN.
    Devuelve el SVG y la posición de cada tornillo y de la punta de cada pin."""
    w, h = 46, 24
    s = (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="1.5" fill="#1565c0" stroke="#0d3c7a" stroke-width="0.4"/>'
         f'<rect x="{x + 4}" y="{y + 1.5}" width="24" height="7.5" rx="0.6" fill="#1e88e5" stroke="#0d47a1" stroke-width="0.3"/>'
         f'<rect x="{x + 18}" y="{y + 11}" width="18" height="10" rx="0.6" fill="#2196f3" stroke="#0d47a1" stroke-width="0.3"/>'
         + texto(x + 27, y + 17.2, 'RELÉ 5V', 2.2, '#e3f2fd', fondo=False))
    tornillos = {}
    for k, nombre in enumerate(('NC', 'COM', 'NO')):
        tx = x + 8 + k * 8
        tornillos[nombre] = (tx, y + 5.2)
        s += (f'<circle cx="{tx}" cy="{y + 5.2}" r="2.2" fill="#cfd8dc" stroke="#546e7a" stroke-width="0.3"/>'
              f'<line x1="{tx - 1.4}" y1="{y + 5.2}" x2="{tx + 1.4}" y2="{y + 5.2}" stroke="#546e7a" stroke-width="0.4"/>'
              + texto(tx, y + 12.2, nombre, 2.2, '#fff', fondo=False))
    pines = {}
    for k, nombre in enumerate(('IN', 'GND', 'VCC')):
        px = x_in + k * paso_pin
        pines[nombre] = (px, y + h + 3.2)
        s += (f'<rect x="{px - 0.45}" y="{y + h - 1}" width="0.9" height="4.2" fill="#b0b0b0"/>'
              f'<text x="{px + 0.55:.2f}" y="{y + h - 1.6:.2f}" font-family="Arial" font-size="1.8" font-weight="bold" '
              f'fill="#fff" transform="rotate(-90 {px + 0.55:.2f} {y + h - 1.6:.2f})">{nombre}</text>')
    return s, tornillos, pines


def jack_hembra(x, y):
    """Conector jack hembra de 5,5 × 2,1 mm con bornera de 2 tornillos (dibujo propio). Boca a la izquierda.
    Devuelve el SVG, los tornillos − y + y el punto de la boca."""
    s = (f'<rect x="{x}" y="{y}" width="18" height="10" rx="1" fill="#2b2b2b" stroke="#000" stroke-width="0.3"/>'
         f'<circle cx="{x + 2.5}" cy="{y + 5}" r="2.2" fill="#111" stroke="#555" stroke-width="0.3"/>'
         f'<circle cx="{x + 2.5}" cy="{y + 5}" r="0.6" fill="#999"/>')
    tornillos = {}
    for k, signo in enumerate(('−', '+')):
        tx = x + 9 + k * 6
        tornillos[signo] = (tx, y + 3)
        s += (f'<circle cx="{tx}" cy="{y + 3}" r="1.9" fill="#cfd8dc" stroke="#546e7a" stroke-width="0.3"/>'
              f'<line x1="{tx}" y1="{y + 1.8}" x2="{tx}" y2="{y + 4.2}" stroke="#546e7a" stroke-width="0.4"/>'
              + texto(tx, y + 8.6, signo, 2.6, '#fff', fondo=False))
    return s, tornillos, (x, y + 5)


def mini_bomba(x, y):
    """Mini bomba de agua de 3–6 V (dibujo propio): cuerpo blanco, salida a la derecha y sus cables rojo y negro arriba.
    Devuelve el SVG y la punta de cada cable."""
    s = (f'<rect x="{x}" y="{y}" width="18" height="11" rx="3" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="0.4"/>'
         f'<rect x="{x + 18}" y="{y + 3.5}" width="5" height="4" rx="0.8" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="0.3"/>'
         f'<path d="M {x + 23} {y + 5.5} C {x + 30} {y + 5.5}, {x + 30} {y - 4}, {x + 34} {y - 4}" fill="none" '
         f'stroke="#90caf9" stroke-width="2.2" opacity="0.8"/>'
         + texto(x + 9, y + 7, 'bomba', 2.3, '#555', fondo=False))
    puntas = {}
    for k, (nombre, col) in enumerate((('+', ROJO), ('−', NEGRO))):
        cx = x + 6 + k * 6
        puntas[nombre] = (cx, y - 3)
        s += f'<line x1="{cx}" y1="{y}" x2="{cx}" y2="{y - 3}" stroke="{col}" stroke-width="0.9"/>'
    return s, puntas


def dispensador(carpeta, doble=False):
    """Circuito del dispensador (tablas de conexiones de la Guía 7 práctica y doble práctica): servo D9, botón D2, LED con
    220 Ω en D4 y buzzer D5; el doble suma el botón del líquido en D3 y el módulo relé en D8, que prende la bomba con la
    fuente de 5 V del jack hembra (jack + → COM, NO → bomba +, bomba − → jack −)."""
    pasos = {1: 'la protoboard recibe 5V y GND', 2: 'LED', 3: 'buzzer'}
    if doble:
        pasos.update({4: 'botón del cereal (C)', 5: 'botón del líquido (L)', 6: 'servo de la compuerta', 7: 'módulo relé',
                      8: 'fuente, jack y bomba'})
    else:
        pasos.update({4: 'botón', 5: 'servo de la compuerta'})
    d = Diagrama(250, 176, pasos)
    b = arduino_y_protoboard(d, carpeta)
    hoyo, D, por_la_canaleta = b.hoyo, b.D, b.por_la_canaleta

    # Paso 2. LED clavado en la protoboard, con las patas dobladas: la corta a la fila − de arriba y la larga a la fila A;
    # resistencia de 220 Ω de esa fila (C) a la fila donde llega el cable de D4 (E).
    c = 8
    led = Pieza(carpeta, 'LED-5mm-red-leg', paso=2)
    led.x, led.y = hoyo('X', c)[0] - 6.287 * 0.254, 38            # la pata corta (x 6,287 del dibujo) cae sobre su agujero
    led.doblar('connector0leg', hoyo('X', c)).doblar('connector1leg', hoyo('A', c + 1))
    d.pieza(led)
    r = d.pieza(Pieza(carpeta, 'resistor_220', paso=2))
    r.anclar('connector0pin', hoyo('C', c + 1))
    d.notas.append((2, globo(hoyo('D', c + 3)[0], hoyo('D', c)[1], '220 Ω', '#8a6d3b')))
    d.notas.append((2, globo(hoyo('X', c)[0] - 8, hoyo('X', c)[1], 'pata corta', NEGRO)))
    d.notas.append((2, globo(hoyo('A', c + 1)[0] + 8.5, hoyo('A', c + 1)[1], 'pata larga', ROJO)))
    por_la_canaleta(2, 4, c + 5, ROJO)

    # Paso 3. Buzzer clavado en la protoboard: + en C2 (con el cable de D5 en E2) y − en C5 (de A5 a la fila −).
    d.frente.append((3, buzzer_en_protoboard(hoyo('C', 2)[0], hoyo('C', 5)[0], hoyo('C', 2)[1])))
    por_la_canaleta(3, 5, 2, MORADO)
    d.cable(3, [hoyo('A', 5), hoyo('X', 5)], NEGRO, puntas=(('A5', (-5, 0)), 'fila −'))

    # Botones: patas en las filas A y D (columnas r y r + 2); las de la misma columna ya están unidas dentro del botón.
    # El cable del pin entra por E en la columna r; de E en la columna r + 2, un cable baja a la fila − de abajo.
    def boton(paso, n, r, color):
        bt = d.pieza(Pieza(carpeta, 'basic_pbutton', paso=paso))
        bt.anclar('connector2pin', hoyo('A', r))
        por_la_canaleta(paso, n, r, color, etiqueta=(-5.5, 0))         # su etiqueta a la izquierda: a la derecha va la otra
        d.cable(paso, [hoyo('E', r + 2), hoyo('Y', r + 2)], NEGRO, puntas=((f'E{r + 2}', (5.5, 0)), 'fila −'))

    if doble:
        boton(4, 2, 20, TURQUESA)
        boton(5, 3, 15, AMARILLO)
        paso_servo = 6
    else:
        boton(4, 2, 17, TURQUESA)
        paso_servo = 5

    # Servo de la compuerta: cuelga de su repisa en la torre; su cable baja a la protoboard por detrás de la torre.
    d.fondo.append((paso_servo, zona(18, 118, 62, 30, 'Torre: el servo cuelga de su repisa')))
    servo_hacia_la_derecha(d, carpeta, b, paso_servo, 9, mas=4, menos=5, x=68.2, y=139.7)

    if doble:
        # Paso 7. Módulo relé, del lado del cereal: IN → D8, GND → fila −, VCC → fila + (de arriba)
        s, tornillos, pines = modulo_rele(76, 12, D(8)[0])
        d.frente.append((7, s))
        d.cable(7, [pines['IN'], D(8)], AZUL, hembra=True, puntas=(None, ('D8', (0, 4.2))))
        d.cable(7, [pines['GND'], (pines['GND'][0], 49), (hoyo('X', 3)[0], 49), hoyo('X', 3)], NEGRO, hembra=True,
                puntas=(None, 'fila −'))
        d.cable(7, [pines['VCC'], (pines['VCC'][0], 46.5), (hoyo('W', 4)[0], 46.5), hoyo('W', 4)], ROJO, hembra=True,
                puntas=(None, ('fila +', (6.5, -2.6))))

        # Paso 8. Fuente de 5 V en el jack hembra; jack + → COM, NO → bomba + (rojo), bomba − (negro) → jack −.
        # Cables pelados, atornillados en el relé y en el jack; los de la bomba, torcidos y con cinta aislante.
        d.fondo.append((8, zona(4, 33, 40, 21, 'Recipiente con agua', abajo=True)))
        sj, tj, boca = jack_hembra(50, 20)
        sb, pb = mini_bomba(8, 38)
        fuente = (f'<rect x="24" y="20" width="16" height="9" rx="1.5" fill="#2f2f2f"/>'
                  + texto(32, 25.6, 'Fuente 5 V', 2.1, '#fff', fondo=False)
                  + f'<path d="M 40 24.5 L {boca[0]:.2f} {boca[1]:.2f}" stroke="#1b1b1b" stroke-width="1.4" fill="none"/>')
        d.frente.append((8, sj + sb + fuente))
        d.cable(8, [tj['+'], (tj['+'][0], 13), (tornillos['COM'][0], 13), tornillos['COM']], ROJO, hembra='pelado',
                puntas=(None, None))
        d.cable(8, [tornillos['NO'], (tornillos['NO'][0], 10.5), (pb['+'][0], 10.5), pb['+']], ROJO, hembra='pelado',
                puntas=(None, None))
        d.cable(8, [tj['−'], (tj['−'][0], 15.5), (pb['−'][0], 15.5), pb['−']], NEGRO, hembra='pelado',
                puntas=(None, None))
        d.notas.append((8, globo(tornillos['COM'][0] + 6, tornillos['COM'][1] - 6.5, 'COM', ROJO)))
        d.notas.append((8, globo(tornillos['NO'][0] + 5, tornillos['NO'][1] - 6.5, 'NO', ROJO)))
    return d


# ----------------------------------------------------------------------------------------------- robot con mando
# Colores de las bandas de las resistencias (1.ª, 2.ª y multiplicador); el dibujo de Fritzing es de 220 Ω
BANDAS = {'10 kΩ': ('#8A3D06', '#1a1a1a', '#FF7F00'), '1 kΩ': ('#8A3D06', '#1a1a1a', '#C40808'),
          '2 kΩ': ('#C40808', '#1a1a1a', '#C40808')}


def resistencia(carpeta, paso, valor):
    """Resistencia de Fritzing con las bandas de color de su valor."""
    r = Pieza(carpeta, 'resistor_220', paso=paso)
    for banda, color in zip(('band_1_st', 'band_2_nd', 'band_rd_multiplier'), BANDAS[valor]):
        r.texto = re.sub(r'<(?:rect|path)\b[^>]*\bid="' + banda + r'"[^>]*>',          # la 1.ª banda es un path
                         lambda m: re.sub(r'fill="[^"]*"', f'fill="{color}"', m.group(0)), r.texto)
    return r


def modulo_l298n(x, y):
    """Puente H L298N visto desde arriba (dibujo propio: Fritzing no lo trae). Placa roja de 44 × 44 mm con el disipador
    atrás, las borneras OUT1/OUT2 (izquierda) y OUT3/OUT4 (derecha), la bornera de potencia (12V, GND, 5V) adelante y los
    pines ENA, IN1, IN2, IN3, IN4, ENB adelante, hacia abajo, sin los puentes de ENA y ENB. Devuelve el SVG y las posiciones."""
    s = (f'<rect x="{x}" y="{y}" width="44" height="44" rx="1.5" fill="#c62828" stroke="#7f1010" stroke-width="0.4"/>'
         f'<rect x="{x + 12}" y="{y + 1.5}" width="20" height="13" rx="0.8" fill="#212121"/>'
         + ''.join(f'<line x1="{x + 13.5 + k * 2.2:.2f}" y1="{y + 2.5}" x2="{x + 13.5 + k * 2.2:.2f}" y2="{y + 13.5}" '
                   f'stroke="#555" stroke-width="0.5"/>' for k in range(8))
         + f'<rect x="{x + 15}" y="{y + 17}" width="14" height="7" rx="0.6" fill="#1b1b1b"/>'
         + texto(x + 22, y + 21.6, 'L298N', 2.3, '#eee', fondo=False))
    pos = {}

    def bornera(bx, by, ancho, alto, tornillos):
        nonlocal s
        s += f'<rect x="{bx}" y="{by}" width="{ancho}" height="{alto}" rx="0.6" fill="#1565c0" stroke="#0d3c7a" stroke-width="0.3"/>'
        for nombre, (tx, ty) in tornillos.items():
            pos[nombre] = (tx, ty)
            s += (f'<circle cx="{tx}" cy="{ty}" r="1.9" fill="#cfd8dc" stroke="#546e7a" stroke-width="0.3"/>'
                  f'<line x1="{tx - 1.2}" y1="{ty}" x2="{tx + 1.2}" y2="{ty}" stroke="#546e7a" stroke-width="0.4"/>')

    bornera(x + 0.8, y + 11, 6.4, 14, {'OUT1': (x + 4, y + 14.5), 'OUT2': (x + 4, y + 21.5)})
    bornera(x + 36.8, y + 11, 6.4, 14, {'OUT3': (x + 40, y + 14.5), 'OUT4': (x + 40, y + 21.5)})
    bornera(x + 1.5, y + 36.5, 19, 6.4, {'12V': (x + 4.5, y + 39.7), 'GND': (x + 11, y + 39.7), '5V': (x + 17.5, y + 39.7)})
    for nombre, (tx, ty) in list(pos.items()):
        if nombre.startswith('OUT'):
            s += texto(tx + (5.6 if nombre in ('OUT1', 'OUT2') else -5.6), ty + 0.8, nombre, 1.9, '#fff', fondo=False)
        else:
            s += texto(tx, ty - 3, nombre, 1.9, '#fff', fondo=False)
    for k, nombre in enumerate(('ENA', 'IN1', 'IN2', 'IN3', 'IN4', 'ENB')):
        px = x + 24.5 + k * 2.54
        pos[nombre] = (px, y + 47)
        s += (f'<rect x="{px - 0.45:.2f}" y="{y + 42}" width="0.9" height="5" fill="#b0b0b0"/>'
              f'<text x="{px + 0.6:.2f}" y="{y + 41}" font-family="Arial" font-size="1.7" font-weight="bold" fill="#fff" '
              f'transform="rotate(-90 {px + 0.6:.2f} {y + 41})">{nombre}</text>')
    return s, pos


def bateria_2s(x, y):
    """Batería de los motores: portabaterías de 2 pilas de litio (2S, 7,4 V), dibujo propio; cables + y − a la derecha."""
    s = f'<rect x="{x}" y="{y}" width="40" height="20" rx="1.5" fill="#263238" stroke="#000" stroke-width="0.3"/>'
    for k in range(2):
        s += (f'<rect x="{x + 2}" y="{y + 1.8 + k * 8.6}" width="36" height="7.6" rx="3.8" fill="#26a69a" stroke="#00695c" stroke-width="0.3"/>'
              + texto(x + 20, y + 7 + k * 8.6, '3,7 V', 2.2, '#e0f2f1', fondo=False))
    s += texto(x + 20, y - 2, 'Batería de los motores (2S, 7,4 V)', 2.3, '#333', fondo=False)
    puntas = {'+': (x + 46, y + 6), '−': (x + 46, y + 14)}
    for (px, py), col in zip(puntas.values(), (ROJO, NEGRO)):
        s += f'<line x1="{x + 40}" y1="{py}" x2="{px}" y2="{py}" stroke="{col}" stroke-width="0.9"/>'
    return s, puntas


def robot(carpeta):
    """Circuito del robot con mando, versión con app (tablas de las guías 8 y 9 con app): dos fuentes separadas (batería
    2S → fusible → interruptor → L298N; pila de 9 V → interruptor → jack del Arduino) con GND común; L298N ENA D5, IN1 D7,
    IN2 D8, ENB D6, IN3 D4, IN4 D9 y los motores en OUT1/OUT2 y OUT3/OUT4; HC-SR04 Trig D2, Echo D3; divisor de la
    batería (2 × 10 kΩ) a A0; HC-05 TXD → D10 y D11 → 1 kΩ → RXD, con 2 kΩ de RXD a GND."""
    d = Diagrama(272, 214, {1: 'batería de los motores', 2: 'GND común', 3: 'pila de 9 V del Arduino',
                            4: 'motor izquierdo (ENA, IN1, IN2)', 5: 'motor derecho (ENB, IN3, IN4)',
                            6: '5V y GND en la protoboard pequeña', 7: 'sensor HC-SR04', 8: 'divisor de la batería (A0)',
                            9: 'módulo Bluetooth HC-05'})
    ard = d.pieza(Pieza(carpeta, 'arduino_Uno_Rev3_breadboard', 70, 118, paso=1))
    PIN = {2: 63, 3: 64, 4: 65, 5: 66, 6: 67, 7: 68, 8: 51, 9: 52, 10: 53, 11: 54}
    D = lambda n: ard.pin(f'connector{PIN[n]}pin')
    V5, GNDa, A0 = ard.pin('connector87pin'), ard.pin('connector89pin'), ard.pin('connector0pin')
    GND_arriba = ard.pin('connector57pin')
    mini = d.pieza(Pieza(carpeta, 'miniBreadboard', 165, 128, paso=6))
    hoyo = lambda letra, col: mini.pin(f'{letra}{col}pin')

    # --- Paso 1. Batería 2S: + → fusible → interruptor → 12V del L298N; − → GND del L298N (cables pelados, atornillados)
    s_l, L = modulo_l298n(150, 40)
    d.frente.append((1, s_l))
    s_b, pb = bateria_2s(4, 60)
    d.frente.append((1, s_b))
    fus = d.pieza(Pieza(carpeta, 'Fuse_with_Handler_breadboard', 0, 0, paso=1))
    fus.anclar('connector0pin', (58, pb['+'][1]))
    inte = d.pieza(Pieza(carpeta, 'basic_toggle_switch', 0, 0, paso=1))
    inte.anclar('connector0terminal', (fus.pin('connector1pin')[0] + 10, pb['+'][1] + 12))
    sw_in, sw_out = inte.pin('connector0terminal', 'abajo'), inte.pin('connector1terminal', 'abajo')
    f_in, f_out = fus.pin('connector0pin'), fus.pin('connector1pin')
    d.cable(1, [pb['+'], f_in], ROJO, hembra='pelado')
    d.cable(1, [f_out, (f_out[0] + 3, f_out[1]), (f_out[0] + 3, sw_in[1] + 3), (sw_in[0], sw_in[1] + 3), sw_in], ROJO, hembra='pelado')
    d.cable(1, [sw_out, (sw_out[0], sw_out[1] + 3), (148, sw_out[1] + 3), (148, 86), (L['12V'][0], 86), L['12V']], ROJO,
            hembra='pelado', puntas=(None, ('12V', (-6, 5.5))))
    d.cable(1, [pb['−'], (52, pb['−'][1]), (52, 82), (146, 82), (146, 88), (L['GND'][0], 88), L['GND']], NEGRO,
            hembra='pelado', puntas=(None, ('GND', (5.5, 8.5))))
    d.notas.append((1, globo(fus.caja()[0] + fus.caja()[2] / 2, fus.caja()[1] - 3, 'fusible', ROJO)))
    d.notas.append((1, globo(inte.caja()[0] + inte.caja()[2] / 2, inte.caja()[1] - 3, 'interruptor', ROJO)))
    d.notas.append((1, globo(L['5V'][0] + 3, L['5V'][1] + 7, '5V: libre', '#777')))

    # --- Paso 2. GND común: del borne GND del L298N a un GND del Arduino
    d.cable(2, [(L['GND'][0] + 1.5, L['GND'][1]), (L['GND'][0] + 1.5, 90), (GND_arriba[0], 90), GND_arriba], NEGRO,
            hembra='pelado', puntas=(None, ('GND', (-5.5, 3))))

    # --- Paso 3. Pila de 9 V → interruptor → plug en el jack del Arduino
    pila = d.pieza(Pieza(carpeta, 'Battery_block_9V85_leg', 4, 150, paso=3))
    fin = lambda pata: (pila.x + (pila.cajas[pata][0] + pila.cajas[pata][2]) * pila.escala,
                        pila.y + (pila.cajas[pata][1] + pila.cajas[pata][3] / 2) * pila.escala)
    mas9, menos9 = fin('connector1leg'), fin('connector0leg')
    inte2 = d.pieza(Pieza(carpeta, 'basic_toggle_switch', 0, 0, paso=3))
    inte2.anclar('connector0terminal', (mas9[0] + 6, mas9[1] - 3))
    s2_in, s2_out = inte2.pin('connector0terminal', 'abajo'), inte2.pin('connector1terminal', 'abajo')
    jx, jy, jw, jh = ard.cajas['dc-21mm']
    jack = ard.mundo(jx * ard.escala, (jy + jh / 2) * ard.escala)
    plug = (jack[0] - 9, jack[1])
    d.frente.append((3, f'<rect x="{plug[0]:.2f}" y="{plug[1] - 2.2:.2f}" width="9" height="4.4" rx="0.8" fill="#3a3a3a"/>'))
    d.cable(3, [mas9, (s2_in[0], mas9[1]), s2_in], ROJO, hembra='pelado')
    d.cable(3, [s2_out, (s2_out[0], plug[1] - 1), (plug[0], plug[1] - 1)], ROJO, hembra='pelado')
    d.cable(3, [menos9, (mas9[0] + 2, menos9[1]), (mas9[0] + 2, plug[1] + 1), (plug[0], plug[1] + 1)], NEGRO, hembra='pelado')
    d.notas.append((3, globo(inte2.caja()[0] + inte2.caja()[2] / 2, inte2.caja()[1] - 3, 'interruptor', ROJO)))
    d.notas.append((3, globo(plug[0] + 4.5, plug[1] - 5, 'jack', NEGRO)))

    # --- Pasos 4 y 5. Señales del L298N (sin los puentes de ENA y ENB) y los motores
    motor_izq = d.pieza(Pieza(carpeta, 'gear-motor_2_breadboard', 140, 50, giro=180, paso=4))
    motor_der = d.pieza(Pieza(carpeta, 'gear-motor_2_breadboard', 197, 28, paso=5))
    t_izq = sorted((motor_izq.pin('connector0pin'), motor_izq.pin('connector1pin')), key=lambda p: p[1])
    t_der = sorted((motor_der.pin('connector0pin'), motor_der.pin('connector1pin')), key=lambda p: p[1])
    d.frente.append((4, texto(105, 14, 'Motor izquierdo', 2.6, '#333')))
    d.frente.append((5, texto(231, 12, 'Motor derecho', 2.6, '#333')))
    nivel = {9: 93, 8: 95.5, 7: 98, 6: 100.5, 5: 103, 4: 105.5}                 # más a la izquierda, más arriba
    colores = {5: '#1d4ed8', 7: '#f77f00', 8: '#7b2cbf', 6: '#2b9348', 4: '#d62828', 9: '#00a6a6'}
    abajo = {8: 4.2, 7: 8.4, 5: 4.2, 9: 4.2, 6: 4.2, 4: 8.4}                      # etiquetas escalonadas: no se enciman
    for paso, pares in ((4, (('ENA', 5), ('IN1', 7), ('IN2', 8))), (5, (('ENB', 6), ('IN3', 4), ('IN4', 9)))):
        for pin_l, n in pares:
            a, l = D(n), L[pin_l]
            d.cable(paso, [l, (l[0], nivel[n]), (a[0], nivel[n]), a], colores[n], hembra=True,
                    puntas=(None, (f'D{n}', (0, abajo[n]))))
    # motores: cada uno con sus 2 cables a su bornera
    d.cable(4, [L['OUT1'], (146, L['OUT1'][1]), (146, t_izq[0][1]), t_izq[0]], '#c0392b', hembra='pelado')
    d.cable(4, [L['OUT2'], (143, L['OUT2'][1]), (143, t_izq[1][1]), t_izq[1]], NEGRO, hembra='pelado')
    d.cable(5, [L['OUT3'], (195.5, L['OUT3'][1]), (195.5, t_der[0][1]), t_der[0]], '#c0392b', hembra='pelado')
    d.cable(5, [L['OUT4'], (196.5, L['OUT4'][1]), (196.5, t_der[1][1]), t_der[1]], NEGRO, hembra='pelado')
    d.notas.append((4, globo(L['ENA'][0] + 6, 120, 'quiten los puentes de ENA y ENB', '#777')))
    d.notas.append((5, globo(L['ENA'][0] + 6, 120, 'quiten los puentes de ENA y ENB', '#777')))

    # --- Paso 6. 5V y GND del Arduino a dos columnas de la protoboard pequeña (abajo): de ahí toman energía el sensor
    # y el HC-05. Columna 5 = GND, columna 17 = 5V.
    d.cable(6, [GNDa, (GNDa[0], 178), (hoyo('J', 5)[0], 178), hoyo('J', 5)], NEGRO, puntas=('GND', ('J5', (0, 4.2))))
    d.cable(6, [V5, (V5[0], 182), (hoyo('J', 17)[0], 182), hoyo('J', 17)], ROJO, puntas=('5V', ('J17', (0, 4.2))))

    # --- Paso 7. HC-SR04 (girado, con los pines arriba): Vcc → columna del 5V, GND → columna del GND, Trig → D2, Echo → D3
    hc = d.pieza(Pieza(carpeta, 'hc-sr04_bf8299a_002', 262, 212, giro=180, paso=7))
    vcc, trig, echo, gnd = (hc.pin(f'connector{k}pin', 'abajo') for k in range(4))
    for n, p, col, nv in ((3, echo, CELESTE, 110), (2, trig, AZUL, 112.5)):
        a = D(n)
        d.cable(7, [p, (p[0], 172 + (n - 2) * 2), (266 - (n - 2) * 2, 172 + (n - 2) * 2), (266 - (n - 2) * 2, nv), (a[0], nv), a],
                col, hembra=True, puntas=(None, f'D{n}'))
    for nombre, (px, py) in (('Vcc', vcc), ('Trig', trig), ('Echo', echo), ('GND', gnd)):
        d.frente.append((7, f'<text x="{px + 0.5:.2f}" y="{py + 9:.2f}" font-family="Arial" font-size="1.9" font-weight="bold" '
                            f'fill="#fff" transform="rotate(-90 {px + 0.5:.2f} {py + 9:.2f})">{nombre}</text>'))
    d.cable(7, [vcc, (vcc[0], 170), (hoyo('F', 17)[0], 170), hoyo('F', 17)], ROJO, hembra=True, puntas=(None, ('F17', (4.5, 0))))
    d.cable(7, [gnd, (gnd[0], 166), (hoyo('G', 5)[0] - 3, 166), (hoyo('G', 5)[0] - 3, hoyo('G', 5)[1]), hoyo('G', 5)], NEGRO,
            hembra=True, puntas=(None, ('G5', (-6, 0))))

    # --- Paso 8. Divisor de la batería: 10 kΩ de la columna 13 (+ de la batería, después del interruptor) a la 9, y
    # 10 kΩ de la 9 a la 5 (GND). La columna 9 va a A0.
    for c0, letra in ((9, 'H'), (5, 'I')):
        r = d.pieza(resistencia(carpeta, 8, '10 kΩ'))
        r.anclar('connector0pin', hoyo(letra, c0))
    d.notas.append((8, globo(hoyo('H', 11)[0], hoyo('H', 11)[1] - 2.5, '10 kΩ', '#8a6d3b')))
    d.notas.append((8, globo(hoyo('I', 7)[0], hoyo('I', 7)[1] + 2.5, '10 kΩ', '#8a6d3b')))
    d.cable(8, [A0, (A0[0], 174), (hoyo('J', 9)[0], 174), hoyo('J', 9)], '#e9c46a', puntas=('A0', ('J9', (0, 4.2))))
    d.cable(8, [sw_out, (sw_out[0] - 0.01, sw_out[1] + 6), (2, sw_out[1] + 6), (2, 209), (hoyo('J', 13)[0], 209), hoyo('J', 13)],
            ROJO, hembra='pelado', puntas=(('+ después del interruptor', (16, 8)), ('J13', (0, 4.2))))

    # --- Paso 9. HC-05 (girado, con los pines a la izquierda): VCC → 5V, GND → GND, TXD → D10; D11 → 1 kΩ → RXD y
    # RXD → 2 kΩ → GND, en la mitad de arriba de la protoboard pequeña.
    bt = d.pieza(Pieza(carpeta, 'HC-05-male_breadboard', 262, 150, giro=180, paso=9))
    p_bt = {nombre: bt.pin(f'connector{k}pin') for nombre, k in (('VCC', 15), ('GND', 17), ('TXD', 13), ('RXD', 14))}
    for r_c0, letra, valor in ((9, 'C', '1 kΩ'), (5, 'D', '2 kΩ')):
        r = d.pieza(resistencia(carpeta, 9, valor))
        r.anclar('connector0pin', hoyo(letra, r_c0))
    d.notas.append((9, globo(hoyo('B', 11)[0], hoyo('B', 11)[1] - 0.6, '1 kΩ', '#8a6d3b')))
    d.notas.append((9, globo(hoyo('E', 7)[0], hoyo('E', 7)[1] + 0.6, '2 kΩ', '#8a6d3b')))
    for nombre, (px, py) in p_bt.items():                     # sobre un fondo azul que tapa las letras de cabeza
        d.frente.append((9, f'<rect x="{px + 3.6:.2f}" y="{py - 1.3:.2f}" width="6.4" height="2.6" fill="#1d63b0"/>'
                            + texto(px + 6.8, py + 0.7, nombre, 1.9, '#fff', fondo=False)))
    d10, d11 = D(10), D(11)
    d.cable(9, [d11, (d11[0], 91.5), (hoyo('A', 13)[0], 91.5), hoyo('A', 13)], '#f4a261',
            puntas=(('D11', (0, 4.2)), ('A13', (5.5, 0))))
    d.cable(9, [p_bt['TXD'], (214, p_bt['TXD'][1]), (214, 89), (d10[0], 89), d10], '#4cc9f0', hembra=True,
            puntas=(None, ('D10', (0, 8.4))))
    d.cable(9, [p_bt['RXD'], (211, p_bt['RXD'][1]), (211, hoyo('A', 9)[1] - 3), (hoyo('A', 9)[0], hoyo('A', 9)[1] - 3), hoyo('A', 9)],
            '#e76f51', hembra=True, puntas=(None, ('A9', (-5, 0))))
    d.cable(9, [hoyo('E', 5), hoyo('F', 5)], NEGRO, puntas=(('E5', (-5, 0)), None))
    d.cable(9, [p_bt['VCC'], (210, p_bt['VCC'][1]), (210, hoyo('F', 17)[1] - 1.5), (hoyo('F', 17)[0] + 3, hoyo('F', 17)[1] - 1.5),
                (hoyo('F', 17)[0] + 3, hoyo('G', 17)[1]), hoyo('G', 17)], ROJO, hembra=True)
    d.cable(9, [p_bt['GND'], (216, p_bt['GND'][1]), (216, 148), (hoyo('H', 5)[0] - 4.5, 148), (hoyo('H', 5)[0] - 4.5, hoyo('H', 5)[1]),
                hoyo('H', 5)], NEGRO, hembra=True)
    return d


# ----------------------------------------------------------------------------------------------- mini fútbol
def pantalla_oled(x, y):
    """Pantalla OLED SSD1306 de 0,96" con 4 pines (dibujo propio: Fritzing no la trae). Placa azul de 27 × 27 mm, vidrio
    negro y los pines GND, VCC, SCL y SDA hacia abajo. Devuelve el SVG y la punta de cada pin."""
    s = (f'<rect x="{x}" y="{y}" width="27" height="27" rx="1.2" fill="#1565c0" stroke="#0d3c7a" stroke-width="0.4"/>'
         f'<rect x="{x + 1.5}" y="{y + 3}" width="24" height="14" rx="0.6" fill="#111" stroke="#333" stroke-width="0.3"/>'
         + texto(x + 13.5, y + 11, 'OLED 128×64', 2, '#5f7a8a', fondo=False)
         + ''.join(f'<circle cx="{cx}" cy="{cy}" r="0.9" fill="#eceff1"/>' for cx in (x + 1.6, x + 25.4) for cy in (y + 1.6, y + 25.4)))
    pines = {}
    for k, nombre in enumerate(('GND', 'VCC', 'SCL', 'SDA')):
        px = x + 9.69 + k * 2.54
        pines[nombre] = (px, y + 30.7)
        s += (f'<rect x="{px - 0.45:.2f}" y="{y + 26}" width="0.9" height="4.7" fill="#b0b0b0"/>'
              f'<text x="{px + 0.6:.2f}" y="{y + 25.4}" font-family="Arial" font-size="1.7" font-weight="bold" fill="#fff" '
              f'transform="rotate(-90 {px + 0.6:.2f} {y + 25.4})">{nombre}</text>')
    return s, pines


def futbol(carpeta):
    """Circuito del marcador del mini fútbol (tabla de la Guía 8 práctica): sensores FC-51 de las porterías (OUT → D4 la
    roja, D3 la azul; VCC y GND a las filas + y −), botón de inicio en D2 sobre la canaleta, buzzer en D5 y pantalla OLED
    por I2C (SDA → A4, SCL → A5)."""
    d = Diagrama(250, 150, {1: 'la protoboard recibe 5V y GND', 2: 'sensor de la portería roja', 3: 'sensor de la portería azul',
                            4: 'botón de inicio', 5: 'buzzer', 6: 'pantalla OLED'}, bajar=8)
    b = arduino_y_protoboard(d, carpeta)
    hoyo, D, ard = b.hoyo, b.D, b.ard
    A4, A5 = ard.pin('connector4pin'), ard.pin('connector5pin')

    # Pasos 2 y 3. Sensores FC-51 (pines OUT, GND, VCC) arriba de la protoboard, con cables macho–hembra: GND y VCC caen
    # derecho a las filas − y + de arriba; OUT baja hasta su pin. La portería roja va a la izquierda para que no se crucen.
    for paso, nombre, n, fila_gnd, nivel, color in ((2, 'Portería roja', 4, 3, 50, ROJO), (3, 'Portería azul', 3, 13, 52, AZUL)):
        sensor = Pieza(carpeta, 'fc-51_2', paso=paso)
        sensor.anclar('connector1pin', (hoyo('X', fila_gnd)[0], 0))
        sensor.y = 3
        d.pieza(sensor)
        x0 = sensor.caja()[0]
        d.fondo.append((paso, zona(x0 - 2.5, 1.5, sensor.ancho + 5, 48, nombre)))
        out, gnd, vcc = (sensor.pin(f'connector{k}pin', 'abajo') for k in range(3))
        d.cable(paso, [out, (out[0], nivel), (D(n)[0], nivel), D(n)], color, hembra=True, puntas=(('OUT', (-4.5, 3)), (f'D{n}', (0, 4.2))))
        d.cable(paso, [gnd, hoyo('X', fila_gnd)], NEGRO, hembra=True, puntas=(None, ('fila −', (-6.5, 3.5))))
        d.cable(paso, [vcc, hoyo('W', fila_gnd + 1)], ROJO, hembra=True, puntas=(None, ('fila +', (6.5, -2.5))))

    # Paso 4. Botón de inicio sobre la canaleta (patas en E6, F6, E8 y F8): D2 → A6 (pasa por arriba) y la pata en
    # diagonal (columna 8, abajo) → fila − de abajo.
    bt = d.pieza(Pieza(carpeta, 'basic_pbutton', paso=4))
    bt.anclar('connector2pin', hoyo('E', 6))
    p2 = D(2)
    d.cable(4, [p2, (p2[0], 55), (hoyo('A', 6)[0], 55), hoyo('A', 6)], TURQUESA, puntas=('D2', ('A6', (-5, 0))))
    d.cable(4, [hoyo('J', 8), hoyo('Y', 8)], NEGRO, puntas=(('J8', (5, 0)), 'fila −'))

    # Paso 5. Buzzer en el soporte del marcador, con cables macho–hembra: + derecho a D5, − a la fila − de arriba.
    d.fondo.append((5, zona(90, 6, 48, 40, 'Soporte del marcador')))
    p5 = D(5)
    s_bz, patas = buzzer(p5[0] + 3.81, 28)
    d.frente.append((5, s_bz))
    x, y = patas['+']
    d.cable(5, [(x, y - 1.6), (x, y + 5), p5], MORADO, hembra=True, puntas=(('+', (-3.8, 3)), ('D5', (0, 4.2))))
    x, y = patas['-']
    d.cable(5, [(x, y - 1.6), (x, 47), (hoyo('X', 1)[0], 47), hoyo('X', 1)], NEGRO, hembra=True,
            puntas=(('−', (3.8, 3)), ('fila −', (-6.5, 0))))

    # Paso 6. Pantalla OLED en el soporte: sus 4 cables bajan por la izquierda del Arduino y entran por abajo:
    # SDA → A4, SCL → A5, VCC → fila + de abajo, GND → fila − de abajo.
    s_o, po = pantalla_oled(93, 10)
    d.frente.append((6, s_o))
    for nombre, nivel, x_baja, y_abajo, destino, col, punta in (
            ('GND', 43, 58, 129, hoyo('Y', 5), NEGRO, ('fila −', (6.5, -1))),
            ('VCC', 44.5, 60, 127, hoyo('Z', 4), ROJO, ('fila +', (-7, 1))),
            ('SCL', 46, 62, 125, A5, '#e9c46a', ('A5', (2.5, -4.5))),
            ('SDA', 47.5, 64, 123, A4, '#2b9348', ('A4', (-2.5, -8.5)))):
        px, py = po[nombre]
        d.cable(6, [(px, py), (px, nivel), (x_baja, nivel), (x_baja, y_abajo), (destino[0], y_abajo), destino], col, hembra=True,
                puntas=(None, punta))
    return d


# ----------------------------------------------------------------------------------------------- garra robótica
def perilla(cx, y_pines, nombre):
    """Potenciómetro de 10 kΩ visto desde arriba (dibujo propio: el de Fritzing está de lado y tapa media protoboard):
    perilla redonda y 3 patas en la fila 'y_pines', separadas 5,08 mm (izquierda, centro y derecha)."""
    s = ''
    for dx in (-5.08, 0, 5.08):
        s += f'<line x1="{cx + dx:.2f}" y1="{y_pines - 3:.2f}" x2="{cx + dx:.2f}" y2="{y_pines:.2f}" stroke="#9e9e9e" stroke-width="0.8"/>'
    s += (f'<rect x="{cx - 7:.2f}" y="{y_pines - 15:.2f}" width="14" height="12.5" rx="1.5" fill="#1e88e5" stroke="#0d47a1" stroke-width="0.3"/>'
          f'<circle cx="{cx:.2f}" cy="{y_pines - 8.8:.2f}" r="4.6" fill="#424242" stroke="#111" stroke-width="0.4"/>'
          f'<line x1="{cx:.2f}" y1="{y_pines - 8.8:.2f}" x2="{cx:.2f}" y2="{y_pines - 12.8:.2f}" stroke="#eee" stroke-width="0.7"/>'
          + texto(cx, y_pines - 17, nombre, 2.4, '#333'))
    return s, {'izq': (cx - 5.08, y_pines), 'centro': (cx, y_pines), 'der': (cx + 5.08, y_pines)}


def garra(carpeta):
    """Circuito de la garra (tabla de la Guía 8 práctica): la fuente de 5 V en el jack hembra va a las filas + y − de
    arriba (servos), el 5V y el GND del Arduino a las de abajo (perillas y pulsador) y solo las dos filas − se unen (GND
    común). Servos: base D3, hombro D5, codo D6, pinza D9. Perillas: base A0, hombro A1, codo A2, pinza A3. Pulsador D2."""
    d = Diagrama(250, 146, {1: 'el Arduino a las filas de abajo', 2: 'la fuente de 5 V a las filas de arriba', 3: 'GND común',
                            4: 'servo de la base (D3)', 5: 'servo del hombro (D5)', 6: 'servo del codo (D6)',
                            7: 'servo de la pinza (D9)', 8: 'las cuatro perillas', 9: 'pulsador'}, bajar=8)
    b = arduino_y_protoboard(d, carpeta, unir_filas=False)
    hoyo, D, ard = b.hoyo, b.D, b.ard
    A = {n: ard.pin(f'connector{n}pin') for n in range(4)}

    # Paso 2. Fuente de 5 V en el jack hembra; jack + → fila + de arriba, jack − → fila − de arriba (cables pelados)
    sj, tj, boca = jack_hembra(220, 42)
    fuente = (f'<rect x="224" y="20" width="16" height="9" rx="1.5" fill="#2f2f2f"/>' + texto(232, 25.6, 'Fuente 5 V', 2.1, '#fff', fondo=False)
              + f'<path d="M 224 26.5 L 218.5 26.5 L 218.5 {boca[1]:.2f} L {boca[0]:.2f} {boca[1]:.2f}" stroke="#1b1b1b" stroke-width="1.4" fill="none"/>')
    d.frente.append((2, sj + fuente))
    d.cable(2, [tj['−'], hoyo('X', 28)], NEGRO, hembra='pelado', puntas=(None, ('fila −', (-6.5, 3.5))))
    d.cable(2, [tj['+'], (tj['+'][0], 50), (hoyo('W', 29)[0], 50), hoyo('W', 29)], ROJO, hembra='pelado',
            puntas=(None, ('fila +', (6.5, -3))))

    # Paso 3. GND común: un cable de la fila − de arriba a la fila − de abajo. Las filas + no se unen nunca.
    d.cable(3, [hoyo('X', 1), hoyo('Y', 1)], NEGRO, puntas=(('fila − de arriba', (-11, 0)), ('fila − de abajo', (-11, 0))))
    d.notas.append((3, globo(hoyo('E', 4)[0] + 14, hoyo('E', 4)[1] + 4, 'nunca unan las dos filas +', ROJO)))

    # Pasos 4 a 7. Servos parados arriba de la protoboard (de izquierda a derecha: pinza, codo, hombro y base, en el mismo
    # orden que las perillas); cada uno con su conector de 3 y cables macho–macho: café → fila −, rojo → fila + (de
    # arriba: la fuente) y naranja → su pin.
    for k, (paso, nombre, pin, fila) in enumerate(((7, 'pinza', 9, 3), (6, 'codo', 6, 9), (5, 'hombro', 5, 15), (4, 'base', 3, 21))):
        X = hoyo('X', fila)[0] - 7.62
        sv = d.pieza(Pieza(carpeta, 'Dagu_DGServo_9g_Top_view_breadboard', X, 46, giro=-90, paso=paso))
        patas = [sv.mundo(4.58, (sv.cajas[f'connector{j}leg'][1] + sv.cajas[f'connector{j}leg'][3] / 2) * sv.escala) for j in range(3)]
        hoyos_con = [X + 10.16 - 2.54, X + 10.16, X + 10.16 + 2.54]           # café, rojo, naranja
        s = ''
        for (px, py), hx, col in zip(patas, hoyos_con, (CAFE, ROJO, NARANJA)):
            s += f'<path d="M {px:.2f} {py:.2f} L {px:.2f} {py + 1.5:.2f} L {hx:.2f} 44" fill="none" stroke="{col}" stroke-width="0.95"/>'
        s += f'<rect x="{X + 6.16:.2f}" y="44" width="8" height="6" rx="0.5" fill="#1b1b1b" stroke="#000" stroke-width="0.2"/>'
        s += texto(X + 6.35, 1.2, nombre, 2.4, '#333', fondo=False)
        d.frente.append((paso, s))
        cafe, rojo, naranja = ((hx, 50) for hx in hoyos_con)
        d.cable(paso, [cafe, hoyo('X', fila)], CAFE, puntas=(None, ('fila −', (-6.5, 3.5))))
        d.cable(paso, [rojo, hoyo('W', fila + 1)], ROJO, puntas=(None, ('fila +', (6.5, -2.5))))
        nivel = 51.5 + 1.5 * k                                   # más a la derecha, más abajo: no se cruzan
        p = D(pin)
        d.cable(paso, [naranja, (naranja[0], nivel), (p[0], nivel), p], NARANJA, puntas=(None, (f'D{pin}', (0, 4.2))))

    # Paso 8. Perillas en la mitad de abajo (patas en la fila F): izquierda → fila + de abajo, derecha → fila − de abajo,
    # centro → su pin analógico (los cables salen por abajo y entran al Arduino por abajo).
    s = ''
    for k, (nombre, a, col0) in enumerate((('pinza', 3, 4), ('codo', 2, 10), ('hombro', 1, 16), ('base', 0, 22))):
        cx = hoyo('F', col0 + 2)[0]
        sp, pp = perilla(cx, hoyo('F', col0)[1], nombre)
        s += sp
        d.cable(8, [hoyo('J', col0), hoyo('Z', col0)], ROJO)
        d.cable(8, [hoyo('J', col0 + 4), hoyo('Y', col0 + 4)], NEGRO)
        nivel = 121 + 2 * k                                      # la de más a la izquierda (A3) va más arriba
        j = hoyo('J', col0 + 2)
        d.cable(8, [j, (j[0], nivel), (A[a][0], nivel), A[a]], ('#e9c46a', '#2b9348', '#7b2cbf', '#1d4ed8')[k],
                puntas=(None, (f'A{a}', (0, -4.2 - 3.9 * k))))                  # escalonadas: no se enciman
    d.frente.append((8, s))
    d.notas.append((8, globo(190, 129, 'izquierda → fila +  ·  centro → su pin A  ·  derecha → fila −', '#555')))

    # Paso 9. Pulsador sobre la canaleta (patas en E27, F27, E29 y F29): D2 → A27 (pasa por arriba) y la pata en
    # diagonal (columna 29, abajo) → fila − de abajo.
    bt = d.pieza(Pieza(carpeta, 'basic_pbutton', paso=9))
    bt.anclar('connector2pin', hoyo('E', 27))
    p2 = D(2)
    d.cable(9, [p2, (p2[0], 57.8), (hoyo('A', 27)[0], 57.8), hoyo('A', 27)], TURQUESA, puntas=('D2', ('A27', (-5.5, 0))))
    d.cable(9, [hoyo('J', 29), hoyo('Y', 29)], NEGRO, puntas=(('J29', (5, 0)), 'fila −'))
    return d


# ----------------------------------------------------------------------------------------------- banda clasificadora
def columna(b, c):
    """x de la columna c de la protoboard (1 a 30)."""
    return b.hoyo('A', c)[0]


def poner_patas(p, pata, x_pata, y):
    """Corre la pieza p para que su pata 'pata' (una <line> de Fritzing) quede en x_pata y el cuerpo arriba, en y."""
    p.x, p.y = 0, y
    p.x = x_pata - p.pin(pata)[0]
    return p


def sensor_color(x, y):
    """Sensor de color TCS34725 (dibujo propio: Fritzing no lo trae). Placa de 20 × 22 mm con el LED blanco y el sensor
    arriba y 7 pines hacia abajo (VIN, GND, 3V3, SCL, SDA, INT, LED); x = dónde cae el pin VIN.
    Devuelve el SVG y la punta de cada pin."""
    x0 = x - 2.5
    s = (f'<rect x="{x0:.2f}" y="{y}" width="20.3" height="22" rx="1.2" fill="#283593" stroke="#1a237e" stroke-width="0.4"/>'
         f'<rect x="{x0 + 7.4:.2f}" y="{y + 2.2}" width="5.5" height="5.5" rx="0.6" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="0.3"/>'
         f'<circle cx="{x0 + 10.15:.2f}" cy="{y + 4.95}" r="1.6" fill="#fff59d"/>'
         f'<rect x="{x0 + 9.2:.2f}" y="{y + 8.4}" width="1.9" height="1.9" fill="#212121"/>'
         + texto(x0 + 10.15, y + 13.4, 'TCS34725', 1.9, '#c5cae9', fondo=False))
    pines = {}
    for k, nombre in enumerate(('VIN', 'GND', '3V3', 'SCL', 'SDA', 'INT', 'LED')):
        px = x + k * 2.54
        pines[nombre] = (px, y + 25.2)
        s += (f'<rect x="{px - 0.45:.2f}" y="{y + 20.8}" width="0.9" height="4.4" fill="#b0b0b0"/>'
              f'<text x="{px + 0.6:.2f}" y="{y + 20.3}" font-family="Arial" font-size="1.6" font-weight="bold" fill="#fff" '
              f'transform="rotate(-90 {px + 0.6:.2f} {y + 20.3})">{nombre}</text>')
    return s, pines


def pantalla_lcd(x, y):
    """Pantalla LCD 16 × 2 con su módulo I2C (dibujo propio). Placa verde de 80 × 36 mm, vista de frente, con el conteo
    "R:0 V:0 A:0" y los 4 pines del módulo I2C saliendo por la izquierda (GND, VCC, SDA, SCL, de arriba abajo).
    Devuelve el SVG y la punta de cada pin."""
    s = (f'<rect x="{x}" y="{y}" width="80" height="36" rx="1.5" fill="#2e7d32" stroke="#1b5e20" stroke-width="0.4"/>'
         f'<rect x="{x + 6}" y="{y + 6}" width="68" height="20" rx="1" fill="#1b1b1b"/>'
         f'<rect x="{x + 8}" y="{y + 8}" width="64" height="16" fill="#9ccc65"/>'
         f'<text x="{x + 10}" y="{y + 14.5}" font-family="Consolas, monospace" font-size="4.6" fill="#1b3a0b">R:0 V:0 A:0</text>'
         + texto(x + 40, y + 31.5, 'LCD 16×2 · I2C', 2.3, '#c8e6c9', fondo=False)
         + ''.join(f'<circle cx="{cx}" cy="{cy}" r="1.3" fill="#e8f5e9"/>' for cx in (x + 2.5, x + 77.5) for cy in (y + 2.5, y + 33.5)))
    pines = {}
    s += f'<rect x="{x - 3.2}" y="{y + 7.8}" width="3.2" height="11.6" fill="#1565c0"/>'      # el módulo I2C asoma a la izquierda
    for k, nombre in enumerate(('GND', 'VCC', 'SDA', 'SCL')):
        py = y + 9.8 + k * 2.54
        pines[nombre] = (x - 7, py)
        s += (f'<rect x="{x - 7}" y="{py - 0.45:.2f}" width="4" height="0.9" fill="#b0b0b0"/>'
              + texto(x + 2.6, py + 0.65, nombre, 1.7, '#fff', 'start', fondo=False))
    return s, pines


def caja_nodo_banda(x, y):
    """El nodo banda (ya armado), dibujado en pequeño a la derecha del clasificador: las filas de la fuente de su
    protoboard (+ arriba, − abajo) y los pines A5 y A4 de su Arduino. Devuelve el SVG y dónde llega cada cable."""
    s = zona(x, y, 24, 52, 'Nodo banda', abajo=True)
    llegadas = {}
    for k, (nombre, col, yy) in enumerate((('+', '#e63946', y + 10), ('−', '#1d4ed8', y + 14))):
        s += (f'<line x1="{x + 2}" y1="{yy - 1.3}" x2="{x + 20.5}" y2="{yy - 1.3}" stroke="{col}" stroke-width="0.45"/>'
              + ''.join(f'<rect x="{x + 2.5 + j * 2.54 - 0.45:.2f}" y="{yy - 0.45}" width="0.9" height="0.9" fill="#555"/>' for j in range(7))
              + texto(x + 22.2, yy + 1, nombre, 3, col, fondo=False))
        llegadas[nombre] = (x + 2.5 + (6 if nombre == '+' else 4) * 2.54, yy)
    llegadas['−2'] = (x + 2.5, y + 14)
    s += texto(x + 12, y + 18.6, 'protoboard B', 2.1, '#4a5868', fondo=False) + texto(x + 12, y + 21.2, '(filas de la fuente)', 1.8, '#4a5868', fondo=False)
    s += (f'<rect x="{x + 5}" y="{y + 31}" width="16" height="14" rx="1" fill="#00878f" stroke="#005c63" stroke-width="0.3"/>'
          + texto(x + 13, y + 28.8, 'Arduino B', 2.1, '#4a5868', fondo=False))
    for nombre, yy in (('A5', 91.3), ('A4', 93.8)):
        s += (f'<rect x="{x + 5.6}" y="{yy - 0.9}" width="1.8" height="1.8" fill="#1b1b1b"/>'
              + texto(x + 8.6, yy + 0.75, nombre, 2, '#fff', 'start', fondo=False))
        llegadas[nombre] = (x + 6.5, yy)
    return s, llegadas


def banda(carpeta, motor=False):
    """Nodo banda (tablas de la Guía 7 práctica): la fuente de 5 V en el jack hembra va a las filas de arriba (+5 V de la
    fuente y GND), el Arduino a las de abajo y las dos filas − se unen (GND común). TIP41C con las patas B, C y E en A7,
    A8 y A9; D9 → 220 Ω → base; 10 kΩ de la base a la columna 11 (que va a GND); emisor → GND; colector → LED (cátodo),
    con su 220 Ω al +5 V de la fuente; perilla en A0 y sensor IR en D2.
    Con motor=True (Guía 9) se dibuja lo anterior apagado, sin el LED, y se agregan el motor, el diodo y el capacitor."""
    if motor:
        pasos = {1: 'el motor en lugar del LED', 2: 'el diodo (franja hacia +5 V)', 3: 'el capacitor'}
    else:
        pasos = {1: 'el Arduino a las filas de abajo', 2: 'la fuente de 5 V a las filas de arriba', 3: 'GND común',
                 4: 'el transistor TIP41C', 5: 'D9 → 220 Ω → base', 6: '10 kΩ y el emisor a GND',
                 7: 'el LED con su 220 Ω', 8: 'la perilla (A0)', 9: 'el sensor IR (D2)'}
    # En la versión del motor todo lo de la Guía 8 va en el paso 0: siempre apagado
    P = (lambda n: 0) if motor else (lambda n: n)
    d = Diagrama(268, 149, pasos, bajar=11)
    b = arduino_y_protoboard(d, carpeta, unir_filas=False, paso=P(1))
    hoyo, D, x = b.hoyo, b.D, lambda c: columna(b, c)

    # Paso 2. Fuente de 5 V en el jack hembra (a la derecha); jack + → fila + de arriba (W29), jack − → fila − de arriba (X29)
    sj, tj, boca = jack_hembra(244, 50)
    fuente = (f'<rect x="246" y="72" width="16" height="9" rx="1.5" fill="#2f2f2f"/>' + texto(254, 77.6, 'Fuente 5 V', 2.1, '#fff', fondo=False)
              + f'<path d="M 246 78.5 L 241 78.5 L 241 {boca[1]:.2f} L {boca[0]:.2f} {boca[1]:.2f}" stroke="#1b1b1b" stroke-width="1.4" fill="none"/>')
    d.frente.append((P(2), sj + fuente))
    d.cable(P(2), [tj['−'], (tj['−'][0], hoyo('X', 29)[1]), hoyo('X', 29)], NEGRO, hembra='pelado', puntas=(None, ('fila −', (-2, 3.5))))
    d.cable(P(2), [tj['+'], (tj['+'][0], 47), (hoyo('W', 29)[0], 47), hoyo('W', 29)], ROJO, hembra='pelado',
            puntas=(None, ('fila +', (-8, -2.5))))

    # Paso 3. GND común: la fila − de arriba (la fuente) con la de abajo (el Arduino). Las filas + no se unen nunca.
    d.cable(P(3), [hoyo('X', 28), hoyo('Y', 28)], NEGRO, puntas=(('fila − de arriba', (-11, 2.2)), ('fila − de abajo', (-11, 0))))
    d.notas.append((P(3), globo(x(20), hoyo('H', 1)[1], 'nunca unan las dos filas +', ROJO)))

    # Paso 4. TIP41C de pie, arriba de la protoboard, con las patas dobladas a A7 (B), A8 (C) y A9 (E)
    t = poner_patas(Pieza(carpeta, 'powertransistor_npn', paso=P(4)), 'connector1leg', x(8), 31)
    for k, c in enumerate((7, 8, 9)):
        t.doblar(f'connector{k}leg', hoyo('A', c))
    d.pieza(t)
    y_patas = t.y + t.alto + 2.6
    d.frente.append((P(4), ''.join(texto(x(c), y_patas, letra, 2.0, '#111') for c, letra in ((7, 'B'), (8, 'C'), (9, 'E')))
                     + texto(x(8), 28.5, 'TIP41C', 2.4, '#333')))
    d.notas.append((P(4), globo(x(8) + 17, 40, 'letras hacia ustedes', '#555')))

    # Paso 5. D9 → E3 (sube, baja entre el Arduino y la protoboard y va por la canaleta); 220 Ω de C3 a C7 (la base)
    p9 = D(9)
    d.cable(P(5), [p9, (p9[0], 57), (148, 57), (148, 84.4), (x(3), 84.4), hoyo('E', 3)], AZUL, puntas=('D9', ('E3', (-5, 0))))
    r = d.pieza(Pieza(carpeta, 'resistor_220', paso=P(5)))
    r.anclar('connector0pin', hoyo('C', 3))
    d.notas.append((P(5), globo(x(5), hoyo('B', 1)[1] - 0.6, '220 Ω', '#8a6d3b')))

    # Paso 6. 10 kΩ de D7 (la base) a D11; de A11, un cable a la fila − de arriba. El emisor (E9) → fila − de abajo.
    r = d.pieza(resistencia(carpeta, P(6), '10 kΩ'))
    r.anclar('connector0pin', hoyo('D', 7))
    d.notas.append((P(6), globo(x(9), 74.6, '10 kΩ', '#8a6d3b')))
    d.cable(P(6), [hoyo('A', 11), hoyo('X', 11)], NEGRO, puntas=(('A11', (4.8, 0)), ('fila −', (6.5, 0))))
    d.cable(P(6), [hoyo('E', 9), hoyo('Y', 9)], NEGRO, puntas=(('E9', (-4.5, 0.5)), ('fila −', (-6.5, 0))))

    if not motor:
        # Paso 7. Colector (B8) → B15 por un cable; LED con las patas dobladas: corta (cátodo) → A15, larga → A16;
        # 220 Ω de D16 a D20; de A20, un cable rojo a la fila + de arriba (los 5 V de la fuente).
        d.cable(7, [hoyo('B', 8), (x(8), 71), (x(15), 71), hoyo('B', 15)], VERDE, puntas=(None, ('B15', (3.6, 2.6))))
        d.notas.append((7, globo(x(8), 51.5, 'colector (B8)', VERDE)))
        led = poner_patas(Pieza(carpeta, 'LED-5mm-red-leg', paso=7), 'connector0leg', x(15), 34)
        led.doblar('connector0leg', hoyo('A', 15)).doblar('connector1leg', hoyo('A', 16))
        d.pieza(led)
        d.notas.append((7, globo(x(15) - 5.5, 41, 'corta', NEGRO)))
        d.notas.append((7, globo(x(16) + 5.5, 41, 'larga', ROJO)))
        r = d.pieza(Pieza(carpeta, 'resistor_220', paso=7))
        r.anclar('connector0pin', hoyo('D', 16))
        d.notas.append((7, globo(x(18), hoyo('E', 1)[1] + 0.8, '220 Ω', '#8a6d3b')))
        d.cable(7, [hoyo('A', 20), hoyo('W', 20)], ROJO, puntas=(('A20', (4.8, 0)), ('fila +', (6, -1.5))))
    else:
        # El cable del colector (B8 → B15) se queda; el LED, su 220 Ω y el cable de A20 se quitan.
        d.cable(0, [hoyo('B', 8), (x(8), 71), (x(15), 71), hoyo('B', 15)], VERDE)
        # Paso 1. Motor TT arriba a la derecha: un cable → D15 (la columna del colector) y el otro → fila + de arriba (W16)
        m = d.pieza(Pieza(carpeta, 'gear-motor_2_breadboard', 198, 2, paso=1))
        t0, t1 = m.pin('connector0pin'), m.pin('connector1pin')
        d.cable(1, [t0, (x(16), t0[1]), hoyo('W', 16)], '#c0392b', hembra='pelado', puntas=(None, ('fila +', (-6.5, -2))))
        d.cable(1, [t1, (x(17), t1[1]), (x(17), 76), (x(15), 76), hoyo('D', 15)], NEGRO, hembra='pelado',
                puntas=(None, ('D15', (-4.8, 1))))
        d.frente.append((1, texto(252, 40, 'Motor TT', 2.6, '#333')))
        # Paso 2. Diodo 1N4007 de W15 (franja, cátodo) a A15
        dio = d.pieza(Pieza(carpeta, 'diode', giro=90, paso=2))
        dio.anclar('connector0pin', hoyo('W', 15))
        d.notas.append((2, globo(216, 57, 'franja del diodo → fila +', '#555')))
        # Paso 3. Capacitor de 470–1000 µF con las patas dobladas: franja (−) → X25, la otra (+) → W26
        cap = poner_patas(Pieza(carpeta, 'electrolytic_capacitor_small_leg', paso=3), 'connector0leg', x(25), 40)
        cap.doblar('connector0leg', hoyo('X', 25)).doblar('connector1leg', hoyo('W', 26))
        d.pieza(cap)
        d.notas.append((3, globo(x(25) + 1, 66.5, 'franja (−) → fila −', '#1d4ed8')))
        d.notas.append((3, globo(243, 41, 'larga (+) → fila +', ROJO)))

    # Paso 8. Perilla en la mitad de abajo (F22, F24, F26): izquierda → fila + de abajo (5V del Arduino), derecha → fila −,
    # centro → A0
    sp, _ = perilla(x(24), hoyo('F', 22)[1], 'velocidad')
    d.frente.append((P(8), sp))
    d.cable(P(8), [hoyo('J', 22), hoyo('Z', 22)], ROJO)
    d.cable(P(8), [hoyo('J', 26), hoyo('Y', 26)], NEGRO)
    a0, j = b.A(0), hoyo('J', 24)
    d.cable(P(8), [j, (j[0], 121), (a0[0], 121), a0], '#e9c46a', puntas=(None, ('A0', (-3.5, -4.2))))
    d.notas.append((P(8), globo(x(24), 128, 'izquierda → fila +  ·  centro → A0  ·  derecha → fila −', '#555')))

    # Paso 9. Sensor IR (FC-51) arriba, en el túnel: OUT → D2 (baja derecho), GND → fila − de arriba (X1) y
    # VCC → fila + de arriba (W2), con cables macho–hembra
    ir = Pieza(carpeta, 'fc-51_2', paso=P(9))
    ir.anclar('connector0pin', (D(2)[0], 0))
    ir.y = 0
    d.pieza(ir)
    out, gnd, vcc = (ir.pin(f'connector{k}pin', 'abajo') for k in range(3))
    d.fondo.append((P(9), zona(ir.caja()[0] - 2.5, 0.5, ir.ancho + 5, 46, 'Túnel')))
    d.cable(P(9), [out, D(2)], CELESTE, hembra=True, puntas=(('OUT', (-4.5, 3)), ('D2', (-3.6, 2.6))))
    d.cable(P(9), [gnd, (gnd[0], 54), (x(1), 54), hoyo('X', 1)], NEGRO, hembra=True, puntas=(None, ('fila −', (-6.5, 2))))
    d.cable(P(9), [vcc, (vcc[0], 52), (x(2), 52), hoyo('W', 2)], ROJO, hembra=True, puntas=(None, ('fila +', (6.5, -3))))
    return d


def clasificador(carpeta):
    """Nodo clasificador (tabla de la Guía 8 práctica): el bus I2C en dos columnas de la protoboard (SCL en la 17, SDA en
    la 18) con A5 y A4 del Arduino, el TCS34725 y los cables al nodo banda; la pantalla LCD I2C en los pines SDA y SCL de
    arriba del Arduino (son los mismos A4 y A5); botón de paro D7; servo D6 con la fuente de la protoboard de la banda;
    GND común con la fila − de la fuente."""
    d = Diagrama(270, 150, {1: 'el Arduino clasificador a su protoboard', 2: 'A4 y A5 a dos columnas (el bus I2C)',
                            3: 'sensor de color TCS34725', 4: 'pantalla LCD I2C', 5: 'botón de paro (D7)',
                            6: 'servo (D6) con la fuente de la banda', 7: 'unir con el nodo banda'}, bajar=8)
    b = arduino_y_protoboard(d, carpeta, unir_filas=False)
    hoyo, D, ard, x = b.hoyo, b.D, b.ard, lambda c: columna(b, c)
    # Las filas de arriba se unen con las de abajo por la izquierda (por la derecha pasan los cables al nodo banda)
    d.cable(1, [hoyo('Z', 1), hoyo('W', 1)], ROJO)
    d.cable(1, [hoyo('Y', 4), hoyo('X', 4)], NEGRO)

    # Paso 2. A5 → J17 y A4 → J18 (salen por abajo y entran a la mitad de abajo de la protoboard)
    a4, a5 = b.A(4), b.A(5)
    d.cable(2, [a5, (a5[0], 124), (x(17), 124), hoyo('J', 17)], '#e9c46a', puntas=(('A5', (3.2, -3.6)), ('J17', (-5, 1.5))))
    d.cable(2, [a4, (a4[0], 126.5), (x(18), 126.5), hoyo('J', 18)], VERDE, puntas=(('A4', (-3.2, -3.6)), ('J18', (5, 1.5))))
    d.notas.append((2, globo(x(17) - 6, hoyo('G', 1)[1], 'SCL', '#b08900')))
    d.notas.append((2, globo(x(18) + 6, hoyo('G', 1)[1], 'SDA', VERDE)))

    # Paso 3. TCS34725 arriba de la protoboard, con sus pines sobre las columnas 14 a 20: VIN → fila +, GND → fila −,
    # SCL → F17 y SDA → F18 (bajan derecho)
    st, pt = sensor_color(x(14), 23)
    d.frente.append((3, st))
    d.fondo.append((3, zona(x(14) - 5, 19, 25.5, 31, 'Túnel')))
    d.cable(3, [pt['VIN'], hoyo('W', 14)], ROJO, hembra=True, puntas=(None, ('fila +', (-6.5, -1.5))))
    d.cable(3, [pt['GND'], hoyo('X', 15)], NEGRO, hembra=True, puntas=(None, ('fila −', (-6.5, 2.5))))
    d.cable(3, [pt['SCL'], hoyo('F', 17)], '#e9c46a', hembra=True, puntas=(None, ('F17', (-4.5, 0.5))))
    d.cable(3, [pt['SDA'], hoyo('F', 18)], VERDE, hembra=True, puntas=(None, ('F18', (4.5, 0.5))))

    # Paso 4. Pantalla LCD arriba a la izquierda: SDA y SCL a los pines SDA y SCL de arriba del Arduino (junto a AREF);
    # VCC y GND bajan por la izquierda a las filas de abajo (Z5 y Y7; Y6 no existe)
    sl, pl = pantalla_lcd(16, 10)
    d.frente.append((4, sl))
    SCL, SDA = ard.pin('connector60pin'), ard.pin('connector59pin')
    for nombre, xl, destino, y_abajo, col, punta in (('GND', 2, hoyo('Y', 7), 133, NEGRO, ('fila −', (6.5, 1))),
                                                   ('VCC', 3.5, hoyo('Z', 5), 131, ROJO, ('fila +', (-6.5, 1)))):
        px, py = pl[nombre]
        d.cable(4, [(px, py), (xl, py), (xl, y_abajo), (destino[0], y_abajo), destino], col, hembra=True, puntas=(None, punta))
    for nombre, xl, destino, y_lado, col in (('SDA', 5, SDA, 50.5, VERDE), ('SCL', 6.5, SCL, 52.5, '#e9c46a')):
        px, py = pl[nombre]
        d.cable(4, [(px, py), (xl, py), (xl, y_lado), (destino[0], y_lado), destino], col, hembra=True,
                puntas=(None, (nombre, (0, -4.2) if nombre == 'SCL' else (0, -6.4))))
    d.notas.append((4, globo(60, 57.5, 'SDA y SCL de arriba = A4 y A5', '#555')))

    # Paso 5. Botón de paro sobre la canaleta (patas en E24, F24, E26 y F26): D7 → A24 (pasa por arriba de todo) y la
    # pata en diagonal (columna 26, abajo) → fila − de abajo
    bt = d.pieza(Pieza(carpeta, 'basic_pbutton', paso=5))
    bt.anclar('connector2pin', hoyo('E', 24))
    p7 = D(7)
    d.cable(5, [p7, (p7[0], 3), (x(24), 3), hoyo('A', 24)], TURQUESA, puntas=(('D7', (-3.6, 2.6)), ('A24', (-5.5, 0))))
    d.cable(5, [hoyo('J', 26), hoyo('Y', 26)], NEGRO, puntas=(('J26', (5, 0)), 'fila −'))

    # Paso 6. El nodo banda (en pequeño, a la derecha) y el servo arriba a la derecha: rojo → fila + de la fuente,
    # café → fila − de la fuente (en la protoboard de la banda) y naranja → D6 (por arriba de todo)
    sc, ll = caja_nodo_banda(245, 56)
    d.fondo.append((6, sc))
    sv = d.pieza(Pieza(carpeta, 'Dagu_DGServo_9g_Top_view_breadboard', 246, 46, giro=-90, paso=6))
    patas = [sv.mundo(4.58, (sv.cajas[f'connector{j}leg'][1] + sv.cajas[f'connector{j}leg'][3] / 2) * sv.escala) for j in range(3)]
    s = ''
    llegada = {}
    for (px, py), col in zip(patas, (CAFE, ROJO, NARANJA)):
        llegada[col] = (px, py + 4)
        s += f'<line x1="{px:.2f}" y1="{py:.2f}" x2="{px:.2f}" y2="{py + 4:.2f}" stroke="{col}" stroke-width="0.95"/>'
    d.frente.append((6, s + texto(sv.caja()[0] + sv.caja()[2] / 2, 9.5, 'servo', 2.4, '#333')))
    d.cable(6, [llegada[ROJO], (llegada[ROJO][0], ll['+'][1]), ll['+']], ROJO, hembra=True, puntas=(None, None))
    d.cable(6, [llegada[CAFE], (llegada[CAFE][0], ll['−'][1]), ll['−']], CAFE, hembra=True, puntas=(None, None))
    n_ = llegada[NARANJA]
    p6 = D(6)
    d.cable(6, [n_, (n_[0], n_[1] + 2), (267, n_[1] + 2), (267, 6), (p6[0], 6), p6], NARANJA, hembra=True,
            puntas=(None, ('D6', (3.6, 2.6))))
    d.notas.append((6, globo(234, 52, 'rojo +  ·  café −', '#555')))

    # Paso 7. Unir con el nodo banda: SCL (G17) → A5 de la banda, SDA (H18) → A4 de la banda, y la fila − de arriba
    # (X29) → la fila − de la fuente (GND común)
    d.cable(7, [hoyo('G', 17), (x(17), 91.3), ll['A5']], '#e9c46a', puntas=(('G17', (-4.8, -1.5)), None))
    d.cable(7, [hoyo('H', 18), (x(18), 93.8), ll['A4']], VERDE, puntas=(('H18', (-4.8, 2)), None))
    d.cable(7, [hoyo('X', 29), (240, hoyo('X', 29)[1]), (240, ll['−2'][1]), ll['−2']], NEGRO, puntas=(('X29', (-1, 3.6)), None))
    d.notas.append((7, globo(x(26), 100, 'A4 con A4 · A5 con A5 · GND común', '#555')))
    return d


# ----------------------------------------------------------------------------------------------- mini invernadero
def sensor_dht11(x_s, y):
    """Sensor de temperatura DHT11 en su placa (dibujo propio): cuerpo azul con rejilla y 3 pines hacia abajo
    (S, +, −, de izquierda a derecha, separados 2,54 mm); x_s = dónde cae el pin S. Devuelve el SVG y la punta de cada pin."""
    x0 = x_s - 2.4
    s = (f'<rect x="{x0 - 1:.2f}" y="{y + 15}" width="12.1" height="7" rx="0.6" fill="#1b5e20" stroke="#0d3311" stroke-width="0.3"/>'
         f'<rect x="{x0:.2f}" y="{y}" width="10.1" height="15.5" rx="0.8" fill="#4fa3e0" stroke="#1565c0" stroke-width="0.35"/>')
    for fila in range(5):
        for col in range(3):
            s += f'<rect x="{x0 + 1.6 + col * 2.5:.2f}" y="{y + 1.6 + fila * 2.6:.2f}" width="1.6" height="1.6" rx="0.3" fill="#1e5f9a"/>'
    pines = {}
    for k, nombre in enumerate(('S', '+', '−')):
        px = x_s + k * 2.54
        pines[nombre] = (px, y + 26)
        s += (f'<rect x="{px - 0.45:.2f}" y="{y + 21.5}" width="0.9" height="4.5" fill="#b0b0b0"/>'
              + texto(px, y + 20.6, nombre, 1.9, '#fff', fondo=False))
    return s, pines


def sensor_suelo(x_aout, y):
    """Sensor de humedad de suelo capacitivo (dibujo propio), parado como en la maceta: placa negra con la punta hacia
    abajo y 3 pines hacia arriba (AOUT, VCC, GND, de izquierda a derecha); x_aout = dónde cae AOUT, y = punta de los pines.
    Devuelve el SVG y la punta de cada pin."""
    x0 = x_aout - 3.4
    y0 = y + 4.5
    s = (f'<path d="M {x0:.2f} {y0:.2f} h 12 v 36 l -6 5 l -6 -5 z" fill="#212121" stroke="#000" stroke-width="0.3"/>'
         f'<line x1="{x0 + 0.6:.2f}" y1="{y0 + 14:.2f}" x2="{x0 + 11.4:.2f}" y2="{y0 + 14:.2f}" stroke="#eee" stroke-width="0.4" stroke-dasharray="1 0.8"/>'
         + texto(x0 + 6, y0 + 9.5, 'humedad', 1.8, '#ddd', fondo=False)
         + texto(x0 + 6, y0 + 25, 'tierra hasta', 1.7, '#bbb', fondo=False)
         + texto(x0 + 6, y0 + 27.3, 'la línea', 1.7, '#bbb', fondo=False))
    pines = {}
    for k, nombre in enumerate(('AOUT', 'VCC', 'GND')):
        px = x_aout + k * 2.54
        pines[nombre] = (px, y)
        s += (f'<rect x="{px - 0.45:.2f}" y="{y}" width="0.9" height="4.5" fill="#b0b0b0"/>'
              f'<text x="{px + 0.6:.2f}" y="{y0 + 6.2:.2f}" font-family="Arial" font-size="1.5" font-weight="bold" fill="#fff" '
              f'transform="rotate(-90 {px + 0.6:.2f} {y0 + 6.2:.2f})">{nombre}</text>')
    return s, pines


def invernadero(carpeta):
    """Circuito del mini invernadero (tabla de la Guía 7 práctica anterior): servo de la ventana D9, botón D2, luz (LED
    blanco con 220 Ω) D6, sensor de humedad A0, DHT11 D7 y módulo relé D8, que prende la bomba con la fuente de 5 V del
    jack hembra (jack + → COM, NO → bomba +, bomba − → jack −)."""
    d = Diagrama(250, 180, {1: 'la protoboard recibe 5V y GND', 2: 'servo de la ventana (D9)', 3: 'botón de la ventana (D2)',
                            4: 'la luz (D6)', 5: 'sensor de humedad (A0)', 6: 'sensor de temperatura DHT11 (D7)',
                            7: 'módulo relé (D8)', 8: 'fuente, jack y bomba'})
    b = arduino_y_protoboard(d, carpeta)
    hoyo, D = b.hoyo, b.D

    # Cables de D7, D6 y D2 por la canaleta hasta la fila E (como por_la_canaleta: el pin de más a la izquierda va por
    # afuera y entra en la columna de más a la izquierda, así no se cruzan)
    carril = {7: (53, 150, 81.4), 6: (55, 148, 82.9), 2: (59, 144, 85.9)}

    def canaleta(paso, n, fila, color, etiqueta=(5.5, 0)):
        y_arriba, x_bajada, y_carril = carril[n]
        px, py = D(n)
        e = hoyo('E', fila)
        d.cable(paso, [(px, py), (px, y_arriba), (x_bajada, y_arriba), (x_bajada, y_carril), (e[0], y_carril), e], color,
                puntas=(f'D{n}', (f'E{fila}', etiqueta)))

    # Paso 2. Servo de la ventana, bajo el techo: naranja → D9, rojo → fila + y café → fila − de abajo
    d.fondo.append((2, zona(18, 118, 62, 30, 'Bajo el techo: el servo en su soporte')))
    servo_hacia_la_derecha(d, carpeta, b, 2, 9, mas=4, menos=5, x=68.2, y=139.7)

    # Paso 3. Botón con las patas en las filas A y D (columnas 24 y 26): D2 → E24 por la canaleta; E26 → fila − de abajo
    bt = d.pieza(Pieza(carpeta, 'basic_pbutton', paso=3))
    bt.anclar('connector2pin', hoyo('A', 24))
    canaleta(3, 2, 24, TURQUESA, etiqueta=(-5.5, 0))
    d.cable(3, [hoyo('E', 26), hoyo('Y', 26)], NEGRO, puntas=(('E26', (5.5, 0)), 'fila −'))

    # Paso 4. Luz: LED blanco en el techo, con 2 cables macho–hembra: pata corta → fila − de arriba (X16), pata larga → A17;
    # resistencia de 220 Ω de C13 a C17 y D6 → E13 por la canaleta
    d.fondo.append((4, zona(196, 13, 17, 32, 'Techo: luz')))
    led = Pieza(carpeta, 'LED-5mm-red-leg', paso=4, colores={'#E60000': '#FFF6D5'})
    led.anclar('connector0leg', (hoyo('X', 16)[0], 0))
    led.y = 18
    d.pieza(led)
    for pata, destino, col, puntas in (('connector0leg', hoyo('X', 16), NEGRO, (('corta', (-5.2, 2)), ('fila −', (-6.5, 0)))),
                                       ('connector1leg', hoyo('A', 17), ROJO, (('larga', (5.2, 5.5)), ('A17', (5.5, 0))))):
        x, y = led.pin(pata, 'abajo')
        d.cable(4, [(x, y - 1.6), (x, y + 5), destino], col, hembra=True, puntas=puntas)
    r = d.pieza(Pieza(carpeta, 'resistor_220', paso=4))
    r.anclar('connector0pin', hoyo('C', 13))
    d.notas.append((4, globo(hoyo('B', 15)[0], hoyo('B', 13)[1], '220 Ω', '#8a6d3b')))
    canaleta(4, 6, 13, AMARILLO)
    d.frente.append((4, texto(led.pin('connector0leg')[0] + 1.3, 16.8, 'LED blanco', 2.3, '#333')))

    # Paso 5. Sensor de humedad en la maceta (abajo a la derecha): VCC → fila + (Z22), GND → fila − (Y23), AOUT → A0
    d.fondo.append((5, zona(200, 123, 34, 52, 'Maceta', abajo=True)))
    ss, ps = sensor_suelo(hoyo('J', 21)[0], 126)
    d.frente.append((5, ss))
    d.cable(5, [ps['VCC'], hoyo('Z', 22)], ROJO, hembra=True, puntas=(None, ('fila +', (6.5, 1.2))))
    d.cable(5, [ps['GND'], hoyo('Y', 23)], NEGRO, hembra=True, puntas=(None, ('fila −', (6.5, -1.2))))
    a0 = b.A(0)
    d.cable(5, [ps['AOUT'], (ps['AOUT'][0], 121), (a0[0], 121), a0], VERDE, hembra=True, puntas=(None, ('A0', (4.2, 4.2))))

    # Paso 6. DHT11 en la pared, con 3 cables macho–hembra que bajan derecho: S → A8 (y D7 → E8 por la canaleta),
    # + → fila + (W9), − → fila − (X10)
    d.fondo.append((6, zona(174, 13, 17, 32, 'Pared: DHT11')))
    sd, pd = sensor_dht11(hoyo('A', 8)[0], 17)
    d.frente.append((6, sd))
    d.cable(6, [pd['S'], hoyo('A', 8)], MORADO, hembra=True, puntas=(None, ('A8', (-4.8, 0))))
    d.cable(6, [pd['+'], hoyo('W', 9)], ROJO, hembra=True, puntas=(None, None))
    d.cable(6, [pd['−'], hoyo('X', 10)], NEGRO, hembra=True, puntas=(None, ('fila −', (6.5, 0))))
    canaleta(6, 7, 8, MORADO, etiqueta=(-5.2, 0))

    # Paso 7. Módulo relé en el compartimento seco: IN → D8, GND → fila −, VCC → fila + (de arriba)
    s, tornillos, pines = modulo_rele(76, 12, D(8)[0])
    d.frente.append((7, s))
    d.cable(7, [pines['IN'], D(8)], AZUL, hembra=True, puntas=(None, ('D8', (0, 4.2))))
    d.cable(7, [pines['GND'], (pines['GND'][0], 49), (hoyo('X', 3)[0], 49), hoyo('X', 3)], NEGRO, hembra=True,
            puntas=(None, 'fila −'))
    d.cable(7, [pines['VCC'], (pines['VCC'][0], 46.5), (hoyo('W', 4)[0], 46.5), hoyo('W', 4)], ROJO, hembra=True,
            puntas=(None, ('fila +', (6.5, -2.6))))

    # Paso 8. Fuente de 5 V en el jack hembra; jack + → COM, NO → bomba + (rojo), bomba − (negro) → jack −
    d.fondo.append((8, zona(4, 33, 40, 21, 'Depósito con agua', abajo=True)))
    sj, tj, boca = jack_hembra(50, 20)
    sb, pb = mini_bomba(8, 38)
    fuente = (f'<rect x="24" y="20" width="16" height="9" rx="1.5" fill="#2f2f2f"/>'
              + texto(32, 25.6, 'Fuente 5 V', 2.1, '#fff', fondo=False)
              + f'<path d="M 40 24.5 L {boca[0]:.2f} {boca[1]:.2f}" stroke="#1b1b1b" stroke-width="1.4" fill="none"/>')
    d.frente.append((8, sj + sb + fuente))
    d.cable(8, [tj['+'], (tj['+'][0], 13), (tornillos['COM'][0], 13), tornillos['COM']], ROJO, hembra='pelado')
    d.cable(8, [tornillos['NO'], (tornillos['NO'][0], 10.5), (pb['+'][0], 10.5), pb['+']], ROJO, hembra='pelado')
    d.cable(8, [tj['−'], (tj['−'][0], 15.5), (pb['−'][0], 15.5), pb['−']], NEGRO, hembra='pelado')
    d.notas.append((8, globo(tornillos['COM'][0] + 6, tornillos['COM'][1] - 6.5, 'COM', ROJO)))
    d.notas.append((8, globo(tornillos['NO'][0] + 5, tornillos['NO'][1] - 6.5, 'NO', ROJO)))
    return d


# ----------------------------------------------------------------------------------------------- laberinto inclinable
def modulo_joystick(x_vrx, y):
    """Módulo joystick KY-023 visto desde arriba (dibujo propio): placa de 26 × 34 mm con la palanca y 5 pines hacia
    arriba (GND, +5V, VRx, VRy, SW, de izquierda a derecha); x_vrx = dónde cae VRx, y = punta de los pines.
    Devuelve el SVG y la punta de cada pin."""
    x0, y0 = x_vrx - 13, y + 4.5
    s = (f'<rect x="{x0:.2f}" y="{y0:.2f}" width="26" height="34" rx="1.2" fill="#1565c0" stroke="#0d3c7a" stroke-width="0.4"/>'
         f'<rect x="{x0 + 3:.2f}" y="{y0 + 8:.2f}" width="20" height="20" rx="1" fill="#2b2b2b"/>'
         f'<circle cx="{x_vrx:.2f}" cy="{y0 + 18:.2f}" r="7.5" fill="#3a3a3a" stroke="#111" stroke-width="0.4"/>'
         f'<circle cx="{x_vrx:.2f}" cy="{y0 + 18:.2f}" r="5" fill="#1b1b1b" stroke="#555" stroke-width="0.4"/>'
         + ''.join(f'<circle cx="{cx:.2f}" cy="{y0 + 31:.2f}" r="1.3" fill="#e3f2fd"/>' for cx in (x0 + 2.8, x0 + 23.2)))
    pines = {}
    for k, nombre in enumerate(('GND', '+5V', 'VRx', 'VRy', 'SW')):
        px = x_vrx + (k - 2) * 2.54
        pines[nombre] = (px, y)
        s += (f'<rect x="{px - 0.45:.2f}" y="{y}" width="0.9" height="4.8" fill="#b0b0b0"/>'
              f'<text x="{px + 0.6:.2f}" y="{y0 + 6.6:.2f}" font-family="Arial" font-size="1.6" font-weight="bold" fill="#fff" '
              f'transform="rotate(-90 {px + 0.6:.2f} {y0 + 6.6:.2f})">{nombre}</text>')
    return s, pines


def laberinto(carpeta):
    """Circuito del laberinto (tabla de la Guía 6 práctica anterior): la fuente de 5 V en el jack hembra va a las filas +
    y − de arriba (servos), el 5V y el GND del Arduino a las de abajo (joystick) y solo las dos filas − se unen (GND
    común). Servo del marco D9, servo del tablero D10; joystick VRx → A0, VRy → A1 (SW no se usa)."""
    d = Diagrama(250, 196, {1: 'el Arduino a las filas de abajo', 2: 'la fuente de 5 V a las filas de arriba', 3: 'GND común',
                            4: 'servo del marco (D9)', 5: 'servo del tablero (D10)', 6: 'el joystick (A0 y A1)'}, bajar=8)
    b = arduino_y_protoboard(d, carpeta, unir_filas=False)
    hoyo, D = b.hoyo, b.D

    # Paso 2. Fuente de 5 V en el jack hembra; jack + → fila + de arriba, jack − → fila − de arriba (como la garra)
    sj, tj, boca = jack_hembra(220, 42)
    fuente = (f'<rect x="224" y="20" width="16" height="9" rx="1.5" fill="#2f2f2f"/>' + texto(232, 25.6, 'Fuente 5 V', 2.1, '#fff', fondo=False)
              + f'<path d="M 224 26.5 L 218.5 26.5 L 218.5 {boca[1]:.2f} L {boca[0]:.2f} {boca[1]:.2f}" stroke="#1b1b1b" stroke-width="1.4" fill="none"/>')
    d.frente.append((2, sj + fuente))
    d.cable(2, [tj['−'], hoyo('X', 28)], NEGRO, hembra='pelado', puntas=(None, ('fila −', (-6.5, 3.5))))
    d.cable(2, [tj['+'], (tj['+'][0], 50), (hoyo('W', 29)[0], 50), hoyo('W', 29)], ROJO, hembra='pelado',
            puntas=(None, ('fila +', (6.5, -3))))

    # Paso 3. GND común: un cable de la fila − de arriba a la fila − de abajo. Las filas + no se unen nunca.
    d.cable(3, [hoyo('X', 1), hoyo('Y', 1)], NEGRO, puntas=(('fila − de arriba', (-11, 0)), ('fila − de abajo', (-11, 0))))
    d.notas.append((3, globo(hoyo('E', 4)[0] + 14, hoyo('E', 4)[1] + 4, 'nunca unan las dos filas +', ROJO)))

    # Pasos 4 y 5. Servos parados arriba de la protoboard (el del tablero a la izquierda, para que los cables a D10 y D9
    # no se crucen), con su conector de 3 y cables macho–macho: café → fila −, rojo → fila + (de arriba: la fuente),
    # naranja → su pin
    for k, (paso, nombre, pin, fila) in enumerate(((5, 'tablero', 10, 3), (4, 'marco', 9, 13))):
        X = hoyo('X', fila)[0] - 7.62
        sv = d.pieza(Pieza(carpeta, 'Dagu_DGServo_9g_Top_view_breadboard', X, 46, giro=-90, paso=paso))
        patas = [sv.mundo(4.58, (sv.cajas[f'connector{j}leg'][1] + sv.cajas[f'connector{j}leg'][3] / 2) * sv.escala) for j in range(3)]
        hoyos_con = [X + 10.16 - 2.54, X + 10.16, X + 10.16 + 2.54]           # café, rojo, naranja
        s = ''
        for (px, py), hx, col in zip(patas, hoyos_con, (CAFE, ROJO, NARANJA)):
            s += f'<path d="M {px:.2f} {py:.2f} L {px:.2f} {py + 1.5:.2f} L {hx:.2f} 44" fill="none" stroke="{col}" stroke-width="0.95"/>'
        s += f'<rect x="{X + 6.16:.2f}" y="44" width="8" height="6" rx="0.5" fill="#1b1b1b" stroke="#000" stroke-width="0.2"/>'
        s += texto(X + 6.35, 1.2, f'servo del {nombre}', 2.4, '#333', fondo=False)
        d.frente.append((paso, s))
        cafe, rojo, naranja = ((hx, 50) for hx in hoyos_con)
        d.cable(paso, [cafe, hoyo('X', fila)], CAFE, puntas=(None, ('fila −', (-6.5, 3.5))))
        d.cable(paso, [rojo, hoyo('W', fila + 1)], ROJO, puntas=(None, ('fila +', (6.5, -2.5))))
        nivel = 51.5 + 1.5 * k                                   # más a la derecha, más abajo: no se cruzan
        p = D(pin)
        d.cable(paso, [naranja, (naranja[0], nivel), (p[0], nivel), p], NARANJA, puntas=(None, (f'D{pin}', (0, 4.2))))

    # Paso 6. Joystick en su base, debajo del Arduino: VRx y VRy suben derecho a A0 y A1; +5V y GND dan la vuelta por
    # abajo hasta las filas + y − de abajo (las del Arduino). SW no se usa.
    a0 = b.A(0)
    sjoy, pj = modulo_joystick(a0[0], 128)
    d.fondo.append((6, zona(a0[0] - 18, 125, 36, 49, 'Base del joystick', abajo=True)))
    d.frente.append((6, sjoy))
    d.cable(6, [pj['VRx'], a0], VERDE, hembra=True, puntas=(None, ('A0', (-3.6, 2.4))))
    d.cable(6, [pj['VRy'], b.A(1)], AMARILLO, hembra=True, puntas=(None, ('A1', (3.6, 2.4))))
    gnd, mas = pj['GND'], pj['+5V']
    d.cable(6, [gnd, (gnd[0], 126), (102, 126), (102, 178), (hoyo('Y', 5)[0], 178), hoyo('Y', 5)], NEGRO, hembra=True,
            puntas=(None, ('fila −', (-6.5, 0))))
    d.cable(6, [mas, (mas[0], 124), (99, 124), (99, 181), (hoyo('Z', 7)[0], 181), hoyo('Z', 7)], ROJO, hembra=True,
            puntas=(None, ('fila +', (6.5, 1))))
    d.notas.append((6, globo(a0[0] + 30, 150, 'SW no se usa', '#777')))
    return d


PROYECTOS = {'puente': puente, 'dispensador': dispensador, 'dispensador-doble': lambda c: dispensador(c, doble=True),
             'robot': robot, 'futbol': futbol, 'garra': garra, 'banda': banda,
             'banda-motor': lambda c: banda(c, motor=True), 'clasificador': clasificador,
             'invernadero': invernadero,
             'laberinto': laberinto}

if __name__ == '__main__':
    PROYECTOS[sys.argv[1]](sys.argv[2]).dibujar(sys.argv[3])
