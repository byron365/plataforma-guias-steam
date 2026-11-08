# Genera los STL del puente levadizo con las mismas formas y medidas de los bloques de Tinkercad (guías 2T y 3T).
# Uso: blender --background --factory-startup --python puente_stl.py -- <carpeta de salida>
import sys, os, math, bpy

salida = sys.argv[sys.argv.index('--') + 1]
os.makedirs(salida, exist_ok=True)

# Formas como en Codeblocks: nacen centradas y se mueven a (x, y, z). Medidas en mm.
# ('c', ancho, largo, alto, x, y, z, hueco) cubo · ('y', radio, alto, x, y, z, hueco, girada_en_y) cilindro
# Medidas revisadas el 7 de noviembre con el plano del SG90 (Addicore: cuerpo 22,5 × 11,8 × 22,7; pestañas de
# 31,9 a 15,9 mm de la base y 2,5 de grueso; cable a 4,5 mm de la base, en la punta contraria al eje) y del HC-SR04
# (Makerguides: placa 45 × 20, ojos de Ø16 y 12 de alto a 26 mm entre centros, cristal entre los dos ojos).
# Orilla: el servo acostado queda 0,7 mm abajo del camino (antes sobresalía 3,8 mm y la torre no asentaba) y su cable
# sale por un canal hacia atrás. La ranura es más honda, más larga y más ancha para que la oreja y la corona giren.
PIEZAS = {
    'orilla': [('c', 60, 88, 30, 0, 0, 15, 0),
               ('c', 24, 14, 22, -19, 9, 21, 1),           # ranura (brazo y oreja)
               ('c', 23.8, 5, 14, -11.5, 17.5, 24.5, 1),   # ventana (parte del eje)
               ('c', 33.4, 19.4, 14, -11.5, 29.7, 24.5, 1),  # cajón del servo, piso a 17,5 mm
               ('c', 7, 18, 14, 5.5, 37, 24.5, 1)],        # canal del cable, sale por atrás
    'hoja': [('c', 80, 40, 4, 0, 0, 6, 0), ('c', 72, 2, 6, -4, 19, 11, 0),
             ('c', 72, 2, 6, -4, -19, 11, 0), ('c', 38, 4, 8, 39, 21, 4, 0)],
    'torre_semaforo': [('c', 38, 26, 45, 0, 0, 22.5, 0), ('c', 34, 22, 44, 0, 0, 21, 1), ('c', 12, 4, 8, 0, 12, 4, 1),
                       # LEDs de 5 mm: agujero de 5,4 (la impresora los deja un poco más chicos; la pestaña de 5,8 no pasa)
                       ('y', 2.7, 10, 18, 0, 34, 1, 1), ('y', 2.7, 10, 18, 0, 26, 1, 1), ('y', 2.7, 10, 18, 0, 18, 1, 1)],
    'torre_buzzer': [('c', 38, 26, 45, 0, 0, 22.5, 0), ('c', 34, 22, 44, 0, 0, 21, 1), ('c', 12, 4, 8, 0, 12, 4, 1),
                     ('y', 6.4, 10, 0, 0, 44, 1, 0)],    # buzzer de 12 mm: agujero de 12,8
    'soporte_sensor': [('c', 4, 48, 28, 0, 0, 14, 0), ('c', 20, 48, 3, 12, 0, 1.5, 0),
                       ('y', 8.5, 10, 0, 13, 15, 1, 1), ('y', 8.5, 10, 0, -13, 15, 1, 1),   # ojos de 16: agujeros de 17
                       ('c', 6, 12.4, 6, 0, 0, 7, 1)],   # hueco del cristal: así la placa del sensor queda pegada
}
# Archivo → (pieza, espejo en X). El espejo es el mismo que Escala X −1 en Tinkercad.
ARCHIVOS = {
    'puente_orilla_A': ('orilla', False), 'puente_orilla_B': ('orilla', True),
    'puente_hoja_A': ('hoja', False), 'puente_hoja_B': ('hoja', True),
    'puente_torre_semaforo': ('torre_semaforo', False), 'puente_torre_buzzer': ('torre_buzzer', False),
    'puente_soporte_sensor': ('soporte_sensor', False),
}

def crear(forma, espejo):
    s = -1 if espejo else 1
    if forma[0] == 'c':
        _, w, d, h, x, y, z, hueco = forma
        bpy.ops.mesh.primitive_cube_add(size=1, location=(s * x, y, z))
        obj = bpy.context.object
        obj.scale = (w, d, h)
    else:
        _, r, h, x, y, z, hueco, girada = forma
        bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=r, depth=h, location=(s * x, y, z),
                                            rotation=(0, math.radians(90) if girada else 0, 0))
        obj = bpy.context.object
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    return obj, bool(hueco)

for nombre, (pieza, espejo) in ARCHIVOS.items():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    formas = [crear(f, espejo) for f in PIEZAS[pieza]]
    solidos = [o for o, h in formas if not h]
    huecos = [o for o, h in formas if h]
    # Unir los sólidos y restar los huecos (como "Group Selection")
    base = solidos[0]
    for otro, tipo in [(o, 'UNION') for o in solidos[1:]] + [(o, 'DIFFERENCE') for o in huecos]:
        mod = base.modifiers.new('bool', 'BOOLEAN')
        mod.operation = tipo
        mod.solver = 'EXACT'
        mod.object = otro
        bpy.context.view_layer.objects.active = base
        bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(otro, do_unlink=True)
    bpy.ops.object.select_all(action='DESELECT')
    base.select_set(True)
    bpy.context.view_layer.objects.active = base
    ruta = os.path.join(salida, nombre + '.stl')
    bpy.ops.wm.stl_export(filepath=ruta, export_selected_objects=True, global_scale=1.0, apply_modifiers=True)
    d = base.dimensions
    print(f'OK {nombre}: {d.x:.1f} x {d.y:.1f} x {d.z:.1f} mm, {len(base.data.polygons)} caras')
