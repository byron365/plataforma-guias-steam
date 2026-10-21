# Genera los STL del mini fútbol (portería y soporte del marcador) con las mismas formas y medidas de los bloques de Tinkercad (guías 2T y 3T).
# Uso: blender --background --factory-startup --python futbol_stl.py -- <carpeta de salida>
import sys, os, math, bpy

salida = sys.argv[sys.argv.index('--') + 1]
os.makedirs(salida, exist_ok=True)

def cubo(w, d, h, x=0, y=0, z=0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    obj = bpy.context.object
    obj.scale = (w, d, h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return obj

def cilindro(r, h, x=0, y=0, z=0, girado_x=0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=r, depth=h, location=(x, y, z),
                                        rotation=(math.radians(girado_x), 0, 0))
    obj = bpy.context.object
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    return obj

def agrupar(base, solidos=(), huecos=()):
    # Une los sólidos y resta los huecos (como "Group Selection")
    for otro, tipo in [(o, 'UNION') for o in solidos] + [(o, 'DIFFERENCE') for o in huecos]:
        mod = base.modifiers.new('bool', 'BOOLEAN')
        mod.operation = tipo
        mod.solver = 'EXACT'
        mod.object = otro
        bpy.context.view_layer.objects.active = base
        bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(otro, do_unlink=True)
    return base

def porteria():
    # Media portería (X de 0 a 52.5) y su copia en espejo con Mover X −52.5: queda simétrica en X = 0
    partes = []
    for s in (1, -1):
        partes += [cubo(5, 5, 50, s * 50, 0, 25), cubo(50, 5, 5, s * 25, 0, 50),
                   cubo(50, 3, 50, s * 25, 40, 25), cubo(50, 40, 3, s * 25, 20, 1.5)]
    ventana = cubo(12, 10, 25, 0, 40, 25)
    return agrupar(partes[0], partes[1:], [ventana])

def soporte_marcador():
    # Panel con la ventana de la pantalla y el agujero del buzzer, inclinado −15° en X (hacia atrás), sobre la base
    panel = agrupar(cubo(70, 4, 50), huecos=[cubo(25, 10, 14, 0, 0, 8), cilindro(6.2, 10, 0, 0, -14, girado_x=90)])
    panel.rotation_euler = (math.radians(-15), 0, 0)
    bpy.ops.object.select_all(action='DESELECT')
    panel.select_set(True)
    bpy.context.view_layer.objects.active = panel
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    panel.location = (0, 0, 27.5)
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
    return agrupar(panel, [cubo(70, 45, 4, 0, 2.5, 2)])

for nombre, crear in {'futbol_porteria': porteria, 'futbol_soporte_marcador': soporte_marcador}.items():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    base = crear()
    bpy.ops.object.select_all(action='DESELECT')
    base.select_set(True)
    bpy.context.view_layer.objects.active = base
    # Dejarla apoyada en Z = 0 y centrada en X e Y
    xs, ys, zs = zip(*[v.co[:] for v in base.data.vertices])
    base.location = (-(min(xs) + max(xs)) / 2, -(min(ys) + max(ys)) / 2, -min(zs))
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
    ruta = os.path.join(salida, nombre + '.stl')
    bpy.ops.wm.stl_export(filepath=ruta, export_selected_objects=True, global_scale=1.0, apply_modifiers=True)
    d = base.dimensions
    print(f'OK {nombre}: {d.x:.1f} x {d.y:.1f} x {d.z:.1f} mm, {len(base.data.polygons)} caras')
