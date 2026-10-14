---
titulo: Del papel a Blender
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Del papel a Blender

## Objetivo del día

Dibujar nuestra garra con medidas reales y dar los primeros pasos en Blender modelando la **base**, la pieza donde irá el servo que hace girar todo el brazo.

**Al terminar tendremos:** boceto con medidas y el archivo de Blender de la base, listo para que el docente lo imprima esta semana.

## Materiales del equipo

- Bitácora, lápiz, regla y borrador
- 1 servo SG90 (para medirlo)
- Calibrador o regla con milímetros
- Computadora con Blender y el archivo `base_garra.blend`
- Mouse con rueda (Blender es mucho más fácil con mouse)

## Parte 1 · Repaso rápido (10 min)

El sábado pasado el servo obedeció a una perilla. Hoy empezamos a diseñar el cuerpo de la garra.

:::pregunta id="g2-p1"
¿Entre qué ángulos limitamos el servo y por qué?
:::

## Parte 2 · Boceto con medidas (25 min)

1. **Mide el servo** con el calibrador y completa la tabla:

| Medida del servo | Valor (mm) |
| --- | --- |
| Largo del cuerpo | |
| Ancho del cuerpo | |
| Alto del cuerpo | |
| Largo total con pestañas | |

2. **Dibuja la garra de lado** en tu bitácora, con estas medidas de referencia:

| Parte | Medida sugerida |
| --- | --- |
| Base | 40 × 20 mm, 19 mm de alto |
| Plato de apoyo | 100 mm de diámetro |
| Brazo (hombro a codo) | 80 mm |
| Antebrazo (codo a pinza) | 70 mm |
| Pinza abierta | 60 mm de ancho |

[IMAGEN 2.1: ejemplo de boceto lateral de la garra con medidas anotadas]

3. Marca con un círculo dónde va cada servo: base, hombro, codo y pinza.

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

## Parte 3 · Conociendo Blender (15 min)

Abre el archivo `base_garra.blend`. Ya tiene las medidas en milímetros y un servo de referencia en gris.

:::descarga archivo="base_garra.blend"
Guárdalo en la computadora y ábrelo con Blender (Archivo → Abrir).
:::

[IMAGEN 2.2: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico |
| Seleccionar | Clic izquierdo |
| Mostrar panel de medidas | Tecla N |

**Prueba:** gira alrededor del servo gris y míralo de frente, de lado y desde arriba.

## Parte 4 · Modelando la base (50 min)

La base es una caja con un hueco donde entra el servo. Sus pestañas se apoyan en el borde de arriba.

1. **Caja exterior:** Shift + A → Malla → Cubo. Con la tecla N abre el panel y escribe:
   - Dimensiones: X = 40, Y = 20, Z = 19
   - Ubicación: X = 0, Y = 0, Z = 9.5

[IMAGEN 2.3: panel N con las dimensiones y la ubicación de la caja exterior]

2. **Hueco del servo:** agrega otro cubo y escribe:
   - Dimensiones: X = 23.4, Y = 12.8, Z = 17
   - Ubicación: X = 0, Y = 0, Z = 11.5

   Mide 0,6 mm más que el servo: es la **holgura** para que entre sin forzarlo.

3. **Restar el hueco a la caja:** selecciona la caja exterior → pestaña de la llave (Modificadores) → Añadir modificador → Booleano. Elige **Diferencia** y en Objeto selecciona el cubo del hueco.

:::animacion tipo="booleano"
:::

[IMAGEN 2.4: modificador Booleano en modo Diferencia con el cubo del hueco seleccionado]

4. Selecciona el cubo del hueco y ocúltalo con la tecla **H**. ¡Ya ves la caja hueca!
5. Vuelve a seleccionar la caja y aplica el modificador (flecha del modificador → Aplicar).
6. **Agujeros para tornillos:** agrega un cilindro (Shift + A → Malla → Cilindro) con Dimensiones X = 2, Y = 2, Z = 10 y Ubicación X = 13.75, Y = 0, Z = 14. Duplícalo (Shift + D) y cambia su X a −13.75. Resta ambos con Booleanos como en el paso 3.
7. **Plato de apoyo:** agrega un cilindro con Dimensiones X = 100, Y = 100, Z = 4 y Ubicación Z = −2. Evita que la garra se vuelque.
8. **Unir:** selecciona la caja y el plato (Shift + clic) y presiona Ctrl + J.

[IMAGEN 2.5: base terminada en Blender, vista 3/4, con el servo de referencia adentro]

9. **Comprueba:** muestra el servo gris de referencia. Debe caber en el hueco sin atravesar las paredes.
10. **Guarda** como `equipo_NOMBRE_base.blend` y exporta la base: Archivo → Exportar → STL, con "Solo selección" activado. Nombre: `equipo_NOMBRE_base.stl`.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Medimos el servo y completamos la tabla.
- [ ] Tenemos el boceto de la garra con medidas.
- [ ] Sabemos girar, mover y acercar la vista en Blender.
- [ ] La base tiene hueco, agujeros y plato de apoyo.
- [ ] Guardamos el .blend y exportamos el STL.
:::

## Reto extra

Agrega una ranura de 8 × 4 mm en una pared de la base para que salgan los cables del servo.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Qué herramienta de Blender nos pareció más útil?
:::

:::pregunta id="g2-b2"
¿Por qué el hueco es un poco más grande que el servo?
:::

:::pregunta id="g2-b3"
¿Qué fue lo más difícil y cómo lo resolvimos?
:::

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las bases esta semana: se montan el sábado 4.
- Si un equipo no termina, puede usar la base de referencia del archivo del docente.
- Errores comunes: escribir medidas sin punto decimal, olvidar ocultar el cubo del hueco, exportar toda la escena en vez de la selección.
- Tiempo total: 10 + 25 + 15 + 50 + 5 + 15 = 120 minutos.
:::
