# Verifica las piezas del dispensador (versión sencilla y doble) contra modelos de los componentes reales.
# Arma el mecanismo como queda montado: torre del cereal, SG90 colgando de su repisa con su cable, brazo de un lado,
# compuerta boca abajo, embudo apoyado con su tapa, cuello de una botella de 28 mm, torre del líquido y manguera de 8 mm.
# Mide en mm³ cuánto chocan las piezas y gira la compuerta de −90° a 90° para ver si choca al abrir.
# Compara las medidas de un generador anterior con las actuales (herramientas/dispensador_stl.py).
# Uso: blender --background --factory-startup --python verificar_dispensador_stl.py -- <generador anterior .py> <carpeta para la imagen>
import sys, os, re, math, bpy, bmesh
from mathutils import Vector, Matrix

args = sys.argv[sys.argv.index('--') + 1:]
ANTERIOR, SALIDA = args[0], args[1]
ACTUAL = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dispensador_stl.py')


def leer_piezas(ruta):
    """Lee el diccionario PIEZAS de un generador sin ejecutarlo completo."""
    texto = open(ruta, encoding='utf-8').read()
    bloque = re.search(r'PIEZAS = \{.*?\n\}', texto, re.S).group(0)
    datos = {}
    exec(bloque, {}, datos)
    return datos['PIEZAS']


def limpiar():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()


def forma(f):
    if f[0] == 'c':
        _, w, d, h, x, y, z, hueco = f
        bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
        bpy.context.object.scale = (w, d, h)
    elif f[0] == 'y':
        _, r, h, x, y, z, hueco = f
        bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=r, depth=h, location=(x, y, z))
    else:
        _, rs, ri, h, x, y, z, hueco = f
        bpy.ops.mesh.primitive_cone_add(vertices=48, radius1=ri, radius2=rs, depth=h, location=(x, y, z))
    o = bpy.context.object
    # Con location=True las coordenadas de la malla quedan iguales a las del mundo: así mover() y girar() son exactos
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o, bool(hueco)


def booleana(base, otro, tipo, borrar=True):
    m = base.modifiers.new('b', 'BOOLEAN')
    m.operation, m.solver, m.object = tipo, 'EXACT', otro
    bpy.context.view_layer.objects.active = base
    bpy.ops.object.modifier_apply(modifier=m.name)
    if borrar:
        bpy.data.objects.remove(otro, do_unlink=True)
    return base


def pieza(formas):
    """Igual que el generador: une los sólidos y resta los huecos."""
    objs = [forma(f) for f in formas]
    base = [o for o, h in objs if not h][0]
    for o, h in objs:
        if o is not base and not h:
            booleana(base, o, 'UNION')
    for o, h in objs:
        if h:
            booleana(base, o, 'DIFFERENCE')
    return base


def mover(o, matriz):
    o.data.transform(matriz)
    o.data.update()
    return o


def caja(w, d, h, x, y, z):
    return forma(('c', w, d, h, x, y, z, 0))[0]


def cil(r, z0, z1, x, y):
    return forma(('y', r, z1 - z0, x, y, (z0 + z1) / 2, 0))[0]


def unir(objs):
    for o in objs[1:]:
        booleana(objs[0], o, 'UNION')
    return objs[0]


def volumen(o):
    bm = bmesh.new()
    bm.from_mesh(o.data)
    v = abs(bm.calc_volume())
    bm.free()
    return v


def choque(a, b):
    c = a.copy()
    c.data = a.data.copy()
    bpy.context.collection.objects.link(c)
    booleana(c, b, 'INTERSECT', borrar=False)
    v = volumen(c)
    bpy.data.objects.remove(c, do_unlink=True)
    return v


EJE = (-22.0, 55.0)          # eje del servo: a 22 mm del centro de la salida del embudo (x 0, y 55)
TAB = 80.4                   # cara de arriba de la repisa del servo: ahí se apoyan las pestañas
FONDO = TAB - 15.9           # cara de abajo del servo (pestañas a 15,9 mm de la base)


def servo():
    """SG90 parado, colgando de sus pestañas, con el eje hacia arriba y hacia el embudo (plano de Addicore)."""
    x1 = EJE[0] + 5.9                  # punta del lado del eje
    x0 = x1 - 22.5
    cx = (x0 + x1) / 2
    cuerpo = unir([caja(22.5, 11.8, 22.7, cx, 55, FONDO + 11.35), caja(31.9, 11.8, 2.5, cx, 55, TAB + 1.25),
                   cil(5.9, FONDO + 22.7, FONDO + 26.7, *EJE),
                   caja(8.8, 5, 4, EJE[0] - 4.4, 55, FONDO + 24.7),          # lóbulo de la corona
                   cil(2.3, FONDO + 26.7, FONDO + 29.9, *EJE)])
    cable = unir([caja(4, 3.6, 1.2, x0 - 2, 55, FONDO + 4.5), caja(1.2, 3.6, 20, x0 - 4.6, 55, FONDO + 4.5 - 9.4)])
    return cuerpo, cable


def brazo():
    """Brazo de un lado (plano de Printables): centro Ø7,4 × 5,2 sobre el eje (entra 2,75 mm), brazo de 2,6 de grueso
    a 0,9 mm de la cara de arriba, hasta 18,1 mm del centro, apuntando hacia la salida (+X) con la compuerta cerrada."""
    abajo = FONDO + 29.9 - 2.75
    centro = cil(3.7, abajo, abajo + 5.2, *EJE)
    largo = caja(18.1, 5, 2.6, EJE[0] + 9.05, 55, abajo + 5.2 - 0.9 - 1.3)
    return unir([centro, largo]), abajo + 5.2


def compuerta(formas, arriba):
    """Compuerta boca abajo: la cara de la paleta que en el diseño queda abajo pasa a ser la de arriba, a 'arriba' mm."""
    o = pieza(formas)
    # Voltear (z → −z) y llevar la cara de arriba de la paleta (z = 1,5 al voltear) a 'arriba'; el encastre en el eje
    mover(o, Matrix.Translation((EJE[0] + 22, 55, arriba - 1.5)) @ Matrix.Scale(-1, 4, (0, 0, 1)) @ Matrix.Scale(-1, 4, (0, 1, 0)))
    return o


def girar(o, grados):
    giro = Matrix.Translation((EJE[0], EJE[1], 0)) @ Matrix.Rotation(math.radians(grados), 4, 'Z') @ Matrix.Translation((-EJE[0], -EJE[1], 0))
    mover(o, giro)


print('=====', 'resultados')
for version, ruta in (('anterior', ANTERIOR), ('nueva', ACTUAL)):
    P = leer_piezas(ruta)
    print(f'--- Medidas {version}')
    limpiar()
    torre = pieza(P['torre_cereal'])
    embudo = pieza(P['embudo'])
    mover(embudo, Matrix.Translation((0, 55, 125)))      # la tapa (z 25 a 28) apoyada en la repisa (z 150)
    cuerpo, cable = servo()
    print(f'  Servo en su hueco: choque con la torre {choque(cuerpo, torre):.1f} mm³ · cable: {choque(cable, torre):.1f} mm³')
    print(f'  Embudo en el agujero de la repisa: choque {choque(embudo, torre):.1f} mm³ (0 = se apoya con la tapa)')
    cuello = cil(14, 150, 168, 0, 55)
    print(f'  Botella de boca de 28 mm en el cuello: choque {choque(cuello, embudo):.1f} mm³')
    b, alto_brazo = brazo()
    # Compuerta anterior: el encastre (Ø5) iba directo; se prueba si el centro del brazo (Ø7,4) entra en él
    if version == 'anterior':
        comp = compuerta(P['compuerta'], 99.0)
        print(f'  Compuerta a 1 mm de la salida, con el brazo puesto en el eje: choque brazo–compuerta {choque(b, comp):.1f} mm³'
              f' (el centro del brazo mide 7,4 y el agujero del encastre 5)')
        print(f'  El brazo llega a z = {alto_brazo:.2f}; la paleta empieza en z = 96: la paleta tendría que subir '
              f'{alto_brazo - 96:.2f} mm y quedaría pegada al embudo (salida a z = 100)')
        arriba = 99.0
    else:
        arriba = 99.2
        comp = compuerta(P['compuerta'], arriba)
        print(f'  Compuerta nueva sobre el brazo: choque brazo–compuerta {choque(b, comp):.1f} mm³ · '
              f'paleta a {100 - arriba:.1f} mm debajo de la salida · choque con el embudo {choque(comp, embudo):.1f} mm³')
    # Giro de la compuerta (con el brazo) hacia los dos lados
    peor = []
    for g in range(-90, 91, 10):
        c = comp.copy(); c.data = comp.data.copy(); bpy.context.collection.objects.link(c)
        girar(c, g)
        v = choque(c, torre) + choque(c, embudo) + choque(c, cuerpo)
        if v > 0.05:
            peor.append(f'{g}° ({v:.0f} mm³)')
        bpy.data.objects.remove(c, do_unlink=True)
    print('  Compuerta girando de −90° a 90°: ' + ('choca en ' + ', '.join(peor) if peor else 'no choca'))
    # Torre del líquido y manguera de 8 mm
    limpiar()
    liquido = pieza(P['torre_liquido'])
    manguera = cil(4, 95, 120, 0, 70)
    print(f'  Manguera de 8 mm en la torre del líquido: choque {choque(manguera, liquido):.1f} mm³')

# Imagen del mecanismo nuevo (sin la pared de adelante: se ve desde el frente)
P = leer_piezas(ACTUAL)
limpiar()
objs = [(pieza(P['torre_cereal']), (0.82, 0.82, 0.8, 1))]
emb = pieza(P['embudo']); mover(emb, Matrix.Translation((0, 55, 125))); objs.append((emb, (0.95, 0.85, 0.3, 1)))
cuerpo, cable = servo(); objs += [(cuerpo, (0.15, 0.35, 0.9, 1)), (cable, (0.95, 0.45, 0.1, 1))]
b, _ = brazo(); objs.append((b, (1, 1, 1, 1)))
comp = compuerta(P["compuerta"], 99.2); objs.append((comp, (0.3, 0.75, 0.35, 1)))
for o, color in objs:
    o.color = color
esc = bpy.context.scene
esc.render.engine = 'BLENDER_WORKBENCH'
esc.display.shading.color_type = 'OBJECT'
esc.display.shading.show_cavity = True
esc.render.resolution_x, esc.render.resolution_y = 1200, 1000
bpy.ops.object.camera_add(location=(-140, 230, 150))
cam = bpy.context.object
cam.data.lens = 55
cam.rotation_euler = (Vector((-12, 55, 92)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
esc.camera = cam
esc.render.filepath = os.path.join(SALIDA, 'dispensador_mecanismo.png')
bpy.ops.render.render(write_still=True)
