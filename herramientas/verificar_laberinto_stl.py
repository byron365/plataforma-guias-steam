# Verifica el laberinto (versión Práctica) armado como dicen las guías 5 y 6: torres en la base, servo del marco en la torre,
# marco entre las torres, servo del tablero en el marco, tablero con su bisagra y los brazos de los servos pegados.
# Medidas reales: SG90 (Addicore: cuerpo 22,5 × 11,8 × 22,7, pestañas a 15,9 de la base, corona de 4 y estría de 3,2) y su
# brazo (Printables: centro de Ø7,4 × 5,2 que entra 2,75 en la estría). Joystick KY-023 de 34 × 26 en su base.
# Compara las medidas de las guías antes del 12 de noviembre con las nuevas: mide choques de los servos y sus brazos,
# y gira el marco y el tablero ±25° para ver si rozan algo.
# Uso: blender --background --factory-startup --python verificar_laberinto_stl.py -- <carpeta para la imagen>
import sys, os, math, bpy, bmesh
from mathutils import Vector, Matrix

SALIDA = sys.argv[sys.argv.index('--') + 1]
EJE_Z = 120.0                      # los dos ejes de giro quedan a 120 mm de la base

VERSIONES = {
    # grosor del lado de adelante del marco (hacia afuera) y distancia entre las caras lisas de las torres
    'anterior': {'frente': 6, 'torres': 213},
    'nueva': {'frente': 8, 'torres': 215},
}


def limpiar():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()


def fijar(o):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o


def caja(w, d, h, x, y, z):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    o = bpy.context.object
    o.scale = (w, d, h)
    return fijar(o)


def cil(r, largo, x, y, z, eje='z'):
    rot = {'x': (0, math.radians(90), 0), 'y': (math.radians(90), 0, 0), 'z': (0, 0, 0)}[eje]
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=r, depth=largo, location=(x, y, z), rotation=rot)
    return fijar(bpy.context.object)


def booleana(base, otro, tipo, borrar=True):
    m = base.modifiers.new('b', 'BOOLEAN')
    m.operation, m.solver, m.object = tipo, 'EXACT', otro
    bpy.context.view_layer.objects.active = base
    bpy.ops.object.modifier_apply(modifier=m.name)
    if borrar:
        bpy.data.objects.remove(otro, do_unlink=True)
    return base


def pieza(solidos, huecos=()):
    for o in solidos[1:]:
        booleana(solidos[0], o, 'UNION')
    for o in huecos:
        booleana(solidos[0], o, 'DIFFERENCE')
    return solidos[0]


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


def poner(o, m):
    o.data.transform(m)
    o.data.update()
    return o


def copia(o):
    c = o.copy()
    c.data = o.data.copy()
    bpy.context.collection.objects.link(c)
    return c


# --- Piezas con los bloques de las guías 2 y 3 (en su propio sistema de coordenadas) ---
def tablero():
    s = [caja(180, 180, 3, 0, 0, 0), caja(180, 3, 12, 0, 88.5, 7.5), caja(180, 3, 12, 0, -88.5, 7.5),
         caja(3, 180, 12, 88.5, 0, 7.5), caja(3, 180, 12, -88.5, 0, 7.5), caja(12, 6, 12, 0, 93, 7.5)]
    return pieza(s, [cil(2, 14, 0, 98, 7.5, 'y'), cil(4, 10, 62.5, 62.5, 0, 'z')])


def marco(frente):
    s = [caja(198, frente, 19, 0, -97 - frente / 2, 9.5), caja(198, 6, 19, 0, 100, 9.5),
         caja(6, 194, 19, 96, 0, 9.5), caja(6, 194, 19, -96, 0, 9.5)]
    h = [caja(23.4, frente + 4, 12.8, -5.4, -97 - frente / 2, 9.5), cil(2, 10, 0, 100, 9.5, 'y'), cil(2, 10, -96, 0, 9.5, 'x')]
    return pieza(s, h)


def torre(con_servo):
    s = [caja(6, 40, 134, 0, 0, 67), caja(15, 5, 134, 10.5, 17.5, 67), caja(15, 5, 134, 10.5, -17.5, 67), caja(30, 70, 4, 12, 0, 2)]
    h = [cil(2, 10, 12, 28, 2), cil(2, 10, 12, -28, 2)]
    h.append(caja(10, 12.8, 23.4, 0, 0, 114.6) if con_servo else cil(2, 10, 0, 0, 120, 'x'))
    return pieza(s, h)


def servo_y_brazo():
    """SG90 con el eje hacia +Z en su sistema. El servo entra por la ventana desde afuera: la cara de sus pestañas del lado
    del eje se apoya en la cara de afuera de la pared, que queda en z = 0. El eje queda en x = 0 y el cuerpo va hacia −X
    (el eje está a 5,9 mm de la punta de +X). Brazo largo hacia +X."""
    x1 = 5.9
    cx = x1 - 11.25
    cuerpo = pieza([caja(22.5, 11.8, 22.7, cx, 0, -15.9 + 11.35), caja(31.9, 11.8, 2.5, cx, 0, 1.25),
                    cil(5.9, 4, 0, 0, 6.8 + 2), caja(8.8, 5, 4, -4.4, 0, 6.8 + 2), cil(2.3, 3.2, 0, 0, 10.8 + 1.6)])
    abajo = 14.0 - 2.75
    brazo = pieza([cil(3.7, 5.2, 0, 0, abajo + 2.6), caja(18.1, 5, 2.6, 9.05, 0, abajo + 5.2 - 0.9 - 1.3)])
    bajar = Matrix.Translation((0, 0, -2.5))          # la cara de arriba de las pestañas (z 2.5) pasa a z 0
    poner(cuerpo, bajar); poner(brazo, bajar)
    return cuerpo, brazo, abajo + 5.2 - 2.5


def girar_x(o, grados):
    m = Matrix.Translation((0, 0, EJE_Z)) @ Matrix.Rotation(math.radians(grados), 4, 'X') @ Matrix.Translation((0, 0, -EJE_Z))
    return poner(o, m)


def girar_y(o, grados, z):
    m = Matrix.Translation((0, 0, z)) @ Matrix.Rotation(math.radians(grados), 4, 'Y') @ Matrix.Translation((0, 0, -z))
    return poner(o, m)


def armar(p):
    """Devuelve todas las piezas en su lugar, con el marco y el tablero planos."""
    cara = p['torres'] / 2
    t_servo = poner(torre(True), Matrix.Translation((cara + 3, 0, 0)))                         # aletas hacia afuera (+X)
    t_eje = poner(torre(False), Matrix.Translation((-cara - 3, 0, 0)) @ Matrix.Rotation(math.pi, 4, 'Z'))
    m = poner(marco(p['frente']), Matrix.Translation((0, 0, EJE_Z - 9.5)))
    tb = poner(tablero(), Matrix.Translation((0, 0, EJE_Z - 9.5 + 2)))
    # Servo del marco: en la ventana de la torre, pestañas en la cara de las aletas (x = cara + 6), eje hacia −X a z 120;
    # brazo acostado (hacia +Y)
    sm, bm, _ = servo_y_brazo()
    # parado: el largo del servo queda vertical, con el eje (a 5,9 mm de una punta) arriba, a z 120
    giro = Matrix.Translation((cara + 6, 0, EJE_Z)) @ Matrix.Rotation(math.radians(-90), 4, 'Y')
    poner(sm, giro); poner(bm, giro @ Matrix.Rotation(math.radians(90), 4, 'Z'))
    # Servo del tablero: en la ventana del marco, pestañas en la cara de afuera del lado de adelante, eje hacia +Y en x 0;
    # cuerpo hacia −X ("eje hacia la derecha"); brazo acostado (hacia +X)
    st, bt, _ = servo_y_brazo()
    giro = Matrix.Translation((0, -97 - p['frente'], EJE_Z)) @ Matrix.Rotation(math.radians(-90), 4, 'X')
    poner(st, giro); poner(bt, giro)
    return t_servo, t_eje, m, tb, sm, bm, st, bt


print('=====', 'resultados')
for nombre, p in VERSIONES.items():
    limpiar()
    t_servo, t_eje, m, tb, sm, bm, st, bt = armar(p)
    print(f"--- Medidas {nombre}: lado de adelante del marco de {p['frente']} mm, torres a {p['torres'] / 10:.1f} cm")
    print(f'  Servo del marco en su torre: {choque(sm, t_servo):.1f} mm³ · su brazo contra el marco: {choque(bm, m):.1f} mm³ '
          f'· el servo contra el marco: {choque(sm, m):.1f} mm³')
    print(f'  Servo del tablero en el marco: {choque(st, m):.1f} mm³ · su brazo contra el tablero: {choque(bt, tb):.1f} mm³ '
          f'· el servo contra el tablero: {choque(st, tb):.1f} mm³')
    print(f'  Tablero dentro del marco (plano): {choque(tb, m):.1f} mm³')
    vs = [v.co for v in m.data.vertices]
    print(f'  Marco: {max(v.x for v in vs) - min(v.x for v in vs):.0f} × {max(v.y for v in vs) - min(v.y for v in vs):.0f} mm '
          f'(cama de 220 × 220)')
    # El tablero gira sobre su eje (Y, a z 120) dentro del marco; el marco gira sobre el eje de las torres (X, a z 120)
    roces = []
    for g in (-25, -15, 15, 25):
        c = girar_y(copia(tb), g, EJE_Z)
        v = choque(c, m) + choque(c, st)
        if v > 0.05:
            roces.append(f'tablero {g}°: {v:.0f} mm³')
        bpy.data.objects.remove(c, do_unlink=True)
    for g in (-25, -15, 15, 25):
        partes = [girar_x(copia(o), g) for o in (m, tb, st, bt)]
        v = sum(choque(o, t) for o in partes for t in (t_servo, t_eje, sm))
        if v > 0.05:
            roces.append(f'marco {g}°: {v:.0f} mm³')
        bajo = min(min(x.co.z for x in o.data.vertices) for o in partes)
        if bajo < 0.5:
            roces.append(f'marco {g}°: toca la base (z {bajo:.1f})')
        for o in partes:
            bpy.data.objects.remove(o, do_unlink=True)
    print('  Inclinando ±25°: ' + ('; '.join(roces) if roces else 'nada roza'))

# Base del joystick (del generador) con un KY-023 de 34 × 26 y sus 5 pines con cables hembra
sys.argv = [sys.argv[0], '--', os.path.join(SALIDA, 'tmp_laberinto')]
texto = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'laberinto_stl.py'), encoding='utf-8').read()
espacio = {'__name__': 'piezas'}
exec(texto[:texto.index('PIEZAS = {')], espacio)
limpiar()
base = fijar(espacio['base_joystick']())
ky = pieza([caja(26, 34, 1.6, 0, 0, 4.8), caja(16, 16, 12, 0, -2, 11.6), caja(12.7, 14 + 6, 2.5, 0, 17 + 10, 6.85)])
print(f'  Base del joystick con el KY-023 y sus cables: choque {choque(ky, base):.1f} mm³ (hueco 26,6 × 34,6 para 26 × 34)')

# Imagen del laberinto nuevo, con el marco inclinado 10° y el tablero −10°
limpiar()
t_servo, t_eje, m, tb, sm, bm, st, bt = armar(VERSIONES['nueva'])
for o in (tb, st, bt):
    pass
girar_y(tb, -10, EJE_Z)
for o in (m, tb, st, bt):
    girar_x(o, 10)
colores = ((t_servo, (0.82, 0.82, 0.8, 1)), (t_eje, (0.82, 0.82, 0.8, 1)), (m, (0.3, 0.6, 0.85, 1)), (tb, (0.95, 0.85, 0.4, 1)),
           (sm, (0.15, 0.35, 0.9, 1)), (bm, (1, 1, 1, 1)), (st, (0.15, 0.35, 0.9, 1)), (bt, (1, 1, 1, 1)),
           (caja(300, 250, 4, 0, 0, -2), (0.55, 0.45, 0.35, 1)))
for o, color in colores:
    o.color = color
esc = bpy.context.scene
esc.render.engine = 'BLENDER_WORKBENCH'
esc.display.shading.color_type = 'OBJECT'
esc.display.shading.show_cavity = True
esc.render.resolution_x, esc.render.resolution_y = 1300, 950
bpy.ops.object.camera_add(location=(260, -420, 330))
cam = bpy.context.object
cam.data.lens = 45
cam.rotation_euler = (Vector((0, 0, 85)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
esc.camera = cam
esc.render.filepath = os.path.join(SALIDA, 'laberinto_armado.png')
bpy.ops.render.render(write_still=True)
