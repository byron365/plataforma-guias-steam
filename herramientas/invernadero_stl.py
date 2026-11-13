# Genera los STL del mini invernadero (soporte del servo, hoja de bisagra y clip de la manguera) con los mismos bloques
# de Tinkercad (Guía 2T, partes 4, 5 y 6).
# Revisado el 12 de noviembre: la salida de las mini bombas de 3–6 V mide 7,5 mm por fuera, así que su manguera mide
# unos 8 mm por fuera.
# - Hueco de 8,5 mm (antes 7,5, para una manguera de 7).
# - Abertura de 6 mm (antes 4): la manguera de silicona se aprieta un poco para entrar y queda sujeta; con 4 mm había que
#   abrir el anillo de PLA 3 a 4 mm y se podía quebrar.
# - Pestaña parada de 20 × 4 × 8, bien unida al anillo (antes era una placa de 2 mm a media altura que apenas tocaba el
#   anillo y necesitaba soportes). Se pega plana en la pared: el anillo queda parado y la manguera apunta hacia abajo.
# Uso: blender --background --factory-startup --python invernadero_stl.py -- <carpeta de salida>
import sys, os, math, bpy

salida = sys.argv[sys.argv.index('--') + 1]
os.makedirs(salida, exist_ok=True)


def cubo(w, d, h, x=0, y=0, z=0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    obj = bpy.context.object
    obj.scale = (w, d, h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return obj


def cilindro(r, h, x=0, y=0, z=0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=r, depth=h, location=(x, y, z))
    return bpy.context.object


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


def cilindro_x(r, h, x=0, y=0, z=0):
    # Cilindro acostado a lo largo de X (como Girar alrededor, Eje y, 90)
    obj = cilindro(r, h, x, y, z)
    obj.rotation_euler = (0, math.radians(90), 0)
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    return obj


def soporte_servo():
    # Caja de 32 × 18 × 20 con el hueco del servo (23.4 × 12.8, piso de 3 mm). Revisado el 12 de noviembre (plano del SG90
    # de Addicore): el cable sale por la punta del servo contraria al eje, a 4,5 mm de su base; entre la punta y la pared
    # quedaban 0,45 mm y el cable plano (1,2 mm) no cabía. Ranura de 6 mm en una punta, abierta arriba, para el cable.
    return agrupar(cubo(32, 18, 20), huecos=[cubo(23.4, 12.8, 18, 0, 0, 2), cubo(6, 6, 14, 14, 0, 4)])


def bisagra():
    # Hoja de 30 × 20 × 3 apoyada en la cama y nudillo de Ø7 acostado en su borde, tocando la cama; agujero de 3,5 mm.
    # Revisado el 12 de noviembre: antes el nudillo (Ø6) iba centrado en el grueso de la hoja y sobresalía 1,5 mm por
    # debajo: la hoja quedaba al aire (con soportes al imprimir) y no se podía pegar plana. Con el agujero de 3 mm, un
    # palito de 3 no entraba (la impresora deja los agujeros unas décimas más chicos).
    return agrupar(cubo(30, 20, 3, 0, 0, 1.5), [cilindro_x(3.5, 30, 0, 10, 3.5)], [cilindro_x(1.75, 40, 0, 10, 3.5)])


def clip(diametro_manguera=8):
    radio_hueco = (diametro_manguera + 0.5) / 2
    return agrupar(cilindro(6.5, 8),                                  # anillo de Ø13 y 8 de alto
                   [cubo(20, 4, 8, 0, -6.5, 0)],                      # pestaña parada (su cara de atrás, en Y −8.5, va en la pared)
                   [cilindro(radio_hueco, 20),                        # hueco de la manguera
                    cubo(6, 10, 20, 0, 6.5, 0)])                      # abertura de 6 mm, del lado contrario a la pestaña


PIEZAS = {'invernadero_soporte_servo': soporte_servo, 'invernadero_bisagra': bisagra, 'invernadero_clip': clip}

if __name__ == '__main__':
    for nombre, crear in PIEZAS.items():
        bpy.ops.object.select_all(action='SELECT')
        bpy.ops.object.delete()
        base = crear()
        bpy.ops.object.select_all(action='DESELECT')
        base.select_set(True)
        bpy.context.view_layer.objects.active = base
        # Dejarla apoyada en Z = 0 y centrada en X e Y
        bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
        xs, ys, zs = zip(*[v.co[:] for v in base.data.vertices])
        base.location = (-(min(xs) + max(xs)) / 2, -(min(ys) + max(ys)) / 2, -min(zs))
        bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
        ruta = os.path.join(salida, nombre + '.stl')
        bpy.ops.wm.stl_export(filepath=ruta, export_selected_objects=True, global_scale=1.0, apply_modifiers=True)
        d = base.dimensions
        print(f'OK {nombre}: {d.x:.1f} x {d.y:.1f} x {d.z:.1f} mm, {len(base.data.polygons)} caras')
