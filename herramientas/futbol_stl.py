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

# Revisado el 12 de noviembre con las medidas del FC-51 (placa de 31,3 × 14,2 × 6,6 mm; con los ojitos, 39 mm: los ojitos
# de 5 mm sobresalen 7,7 mm de la placa y juntos miden unos 11 de ancho).
# - Ventana de 12 → 14 mm: con 12 quedaban 0,5 mm por lado (la impresora deja los huecos un poco más chicos).
# - Pie del sensor detrás del fondo: antes la placa se pegaba solo por su orilla contra la pared y, apoyada ahí, los ojitos
#   asomaban 4,7 mm dentro de la portería, donde les pega la pelota. Con el pie, la placa queda acostada a la altura justa
#   (ojitos a Z 23, la altura del centro de la pelota) y un tope deja la punta de los ojitos 1 mm adentro de la ventana.
def porteria():
    # Media portería (X de 0 a 52.5) y su copia en espejo con Mover X −52.5: queda simétrica en X = 0
    partes = []
    for s in (1, -1):
        partes += [cubo(5, 5, 50, s * 50, 0, 25), cubo(50, 5, 5, s * 25, 0, 50),
                   cubo(50, 3, 50, s * 25, 40, 25), cubo(50, 40, 3, s * 25, 20, 1.5)]
    partes += [cubo(16, 30, 18.4, 0, 56.5, 9.2),        # pie del sensor (la placa se apoya arriba, en Z 18.4)
               cubo(16, 5.7, 1.5, 0, 44.35, 19.15)]     # tope: la orilla de la placa queda a 5,7 mm del fondo
    ventana = cubo(14, 10, 25, 0, 40, 25)
    return agrupar(partes[0], partes[1:], [ventana])

def soporte_marcador():
    # Panel con la ventana de la pantalla y el agujero del buzzer, inclinado −15° en X (hacia atrás), sobre la base.
    # Buzzer de Ø12 × 8,5: agujero de 12,8 (antes 12,4; la impresora deja los agujeros unas décimas más chicos).
    # Ventana de 25 → 23 mm de ancho: el vidrio de la OLED (26,7) la tapaba solo 0,85 mm por lado; la parte que se ilumina
    # mide 21,7, así que se sigue viendo completa.
    panel = agrupar(cubo(70, 4, 50), huecos=[cubo(23, 10, 14, 0, 0, 8), cilindro(6.4, 10, 0, 0, -14, girado_x=90)])
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
