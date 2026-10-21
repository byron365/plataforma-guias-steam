# Genera los STL del puente levadizo con las mismas formas y medidas de los bloques de Tinkercad (guías 2T y 3T).
# Uso: blender --background --factory-startup --python puente_stl.py -- <carpeta de salida>
import sys, os, math, bpy

salida = sys.argv[sys.argv.index('--') + 1]
os.makedirs(salida, exist_ok=True)

# Formas como en Codeblocks: nacen centradas y se mueven a (x, y, z). Medidas en mm.
# ('c', ancho, largo, alto, x, y, z, hueco) cubo · ('y', radio, alto, x, y, z, hueco, girada_en_y) cilindro
PIEZAS = {
    'orilla': [('c', 60, 88, 30, 0, 0, 15, 0), ('c', 22, 12, 12, -20, 10, 26, 1),
               ('c', 23.4, 5, 10, -11.5, 17.5, 27, 1), ('c', 32.8, 19, 10, -11.5, 29.5, 27, 1)],
    'hoja': [('c', 80, 40, 4, 0, 0, 6, 0), ('c', 72, 2, 6, -4, 19, 11, 0),
             ('c', 72, 2, 6, -4, -19, 11, 0), ('c', 38, 4, 8, 39, 21, 4, 0)],
    'torre_semaforo': [('c', 38, 26, 45, 0, 0, 22.5, 0), ('c', 34, 22, 44, 0, 0, 21, 1), ('c', 12, 4, 8, 0, 12, 4, 1),
                       ('y', 2.6, 10, 18, 0, 34, 1, 1), ('y', 2.6, 10, 18, 0, 26, 1, 1), ('y', 2.6, 10, 18, 0, 18, 1, 1)],
    'torre_buzzer': [('c', 38, 26, 45, 0, 0, 22.5, 0), ('c', 34, 22, 44, 0, 0, 21, 1), ('c', 12, 4, 8, 0, 12, 4, 1),
                     ('y', 6.2, 10, 0, 0, 44, 1, 0)],
    'soporte_sensor': [('c', 4, 48, 28, 0, 0, 14, 0), ('c', 20, 48, 3, 12, 0, 1.5, 0),
                       ('y', 8.3, 10, 0, 13, 15, 1, 1), ('y', 8.3, 10, 0, -13, 15, 1, 1)],
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
