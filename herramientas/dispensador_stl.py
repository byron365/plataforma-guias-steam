# Genera los STL del dispensador doble con las mismas formas y medidas de los bloques de Tinkercad (guías 2 y 3, versión doble).
# Uso: blender --background --factory-startup --python dispensador_stl.py -- <carpeta de salida>
import sys, os, math, bpy

salida = sys.argv[sys.argv.index('--') + 1]
os.makedirs(salida, exist_ok=True)

# Formas como en Codeblocks: nacen centradas y se mueven a (x, y, z). Medidas en mm.
# ('c', ancho, largo, alto, x, y, z, hueco) cubo · ('y', radio, alto, x, y, z, hueco) cilindro
# ('k', radio_superior, radio_inferior, alto, x, y, z, hueco) cono
PIEZAS = {
    'torre_cereal': [('c', 100, 110, 4, 0, 55, 2, 0), ('c', 100, 5, 150, 0, 2.5, 75, 0),
                     ('c', 100, 95, 4, 0, 52.5, 148, 0), ('y', 41, 10, 0, 55, 148, 1),
                     ('c', 37, 65, 4, -31.5, 37.5, 78.4, 0), ('c', 23.4, 12.8, 10, -27.5, 55, 78.4, 1)],
    'compuerta': [('c', 54, 30, 3, 0, 0, 0, 0), ('y', 4, 5, -22, 0, 4, 0), ('y', 2.5, 6, -22, 0, 4.5, 1)],
    'embudo': [('k', 40, 12.5, 50, 0, 0, 0, 0), ('k', 38.5, 10, 52, 0, 0, 0, 1),
               ('y', 45, 3, 0, 0, 26.5, 0), ('y', 16.5, 15, 0, 0, 35.5, 0), ('y', 14.5, 40, 0, 0, 30, 1)],
    'torre_liquido': [('c', 60, 110, 4, 0, 55, 2, 0), ('c', 60, 5, 110, 0, 2.5, 55, 0),
                      ('c', 20, 75, 6, 0, 42.5, 107, 0), ('y', 3.75, 20, 0, 70, 107, 1)],
}
# Archivo → (pieza, acostada). "Acostada" = la pared de atrás queda sobre la cama de la impresora.
ARCHIVOS = {
    'dispensador_torre_cereal': ('torre_cereal', True),
    'dispensador_compuerta': ('compuerta', False),
    'dispensador_embudo': ('embudo', False),
    'dispensador_torre_liquido': ('torre_liquido', True),
}

def crear(forma):
    if forma[0] == 'c':
        _, w, d, h, x, y, z, hueco = forma
        bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
        bpy.context.object.scale = (w, d, h)
    elif forma[0] == 'y':
        _, r, h, x, y, z, hueco = forma
        bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=r, depth=h, location=(x, y, z))
    else:
        _, r_sup, r_inf, h, x, y, z, hueco = forma
        bpy.ops.mesh.primitive_cone_add(vertices=32, radius1=r_inf, radius2=r_sup, depth=h, location=(x, y, z))
    obj = bpy.context.object
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    return obj, bool(hueco)

for nombre, (pieza, acostada) in ARCHIVOS.items():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    formas = [crear(f) for f in PIEZAS[pieza]]
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
    # Acostar la pieza (girar 90° en X: la cara de atrás, Y = 0, pasa a ser la de abajo)
    if acostada:
        base.rotation_euler = (math.radians(90), 0, 0)
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    # Dejarla apoyada en Z = 0 y centrada en X e Y
    xs, ys, zs = zip(*[v.co[:] for v in base.data.vertices])
    base.location = (-(min(xs) + max(xs)) / 2, -(min(ys) + max(ys)) / 2, -min(zs))
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
    ruta = os.path.join(salida, nombre + '.stl')
    bpy.ops.wm.stl_export(filepath=ruta, export_selected_objects=True, global_scale=1.0, apply_modifiers=True)
    d = base.dimensions
    print(f'OK {nombre}: {d.x:.1f} x {d.y:.1f} x {d.z:.1f} mm, {len(base.data.polygons)} caras')
