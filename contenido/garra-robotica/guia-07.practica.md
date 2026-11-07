---
titulo: Terminamos las piezas en Blender
guia: 7
sabado: 7
sesion: Diseño 3D
duracion: 120
---

# Guía 7 · Terminamos las piezas en Blender

## Objetivo del día

Probar el servo real en la base y el plato ya impresos, terminar en Blender los eslabones y la pinza, revisar sus medidas y exportarlos para imprimir.

**Al terminar tendremos:** las cinco piezas del brazo y la pinza revisadas y exportadas en STL, listas para que el docente las imprima esta semana.

## Materiales del equipo

- Base y plato giratorio impresos (Guía 2)
- 1 servo SG90 y calibrador o regla
- Computadora con Blender y los archivos `equipo_NOMBRE_brazo.blend` y `equipo_NOMBRE_pinza.blend` (Guía 3). Si les toca otra computadora, descárguenlos del recuadro "Archivo de trabajo" de la Guía 3.

## Parte 1 · El servo en las piezas impresas (20 min)

Midan el hueco de la base con las **puntas pequeñas de arriba** del calibrador: ciérrenlas, métanlas en el hueco y ábranlas hasta que toquen las dos paredes.

:::tabla id="g7p-hueco"
| Medida del hueco | En el diseño (mm) | En la pieza impresa (mm) |
| --- | --- | --- |
| Largo | 23.4 | |
| Ancho | 12.8 | |
:::

Prueben meter el servo en el hueco de la base y en la ventana de la pared del plato, con cuidado, sin forzarlo:

:::opciones id="g7p-entra-base"
¿Entra el servo en la base?
- Sí
- Muy justo
- No
:::

:::opciones id="g7p-entra-plato"
¿Entra el servo en la ventana del plato?
- Sí
- Muy justo
- No
:::

Si entró **muy justo** o **no entró**, lijen el hueco hasta que entre. Las ventanas de los eslabones y de la placa de la pinza miden lo mismo (23.4 × 12.8), así que en la Parte 2 las agrandarán antes de imprimirlas.

## Parte 2 · Terminar las piezas (40 min)

1. **Ponerse al día:** abran `equipo_NOMBRE_brazo.blend` y `equipo_NOMBRE_pinza.blend`. Si les faltó algo en la Guía 3 (un eslabón, un engrane, un agujero o la placa), termínenlo ahora con los pasos de la **Guía 3**.
2. **Solo si el servo entró muy justo o no entró:** agranden la ventana de cada pieza restándole un cubo un poco más grande.
   - Cubo de X = **23.7**, Y = **13.1**, Z = 10, en la posición de la tabla.
   - Réstalo a la pieza con el modificador **Booleana** (**Diferencia** → **Aplicar**) y borra el cubo.

| Pieza | Archivo | Posición del cubo nuevo |
| --- | --- | --- |
| Eslabón del hombro | `equipo_NOMBRE_brazo.blend` | X = 30, Y = −80 |
| Eslabón del codo | `equipo_NOMBRE_brazo.blend` | X = 22.5, Y = 0 |
| Placa de la pinza | `equipo_NOMBRE_pinza.blend` | Encima de la ventana: mira desde arriba (tecla **7**) con rayos X (**Alt + Z**) y muévelo hasta que la cubra |

**Recordatorio del modificador Booleana:** selecciona la pieza → **llave inglesa azul** en Propiedades → **Agregar modificador → Generar → Booleana** → **Diferencia** → en **Objeto** elige el cubo → flechita **⌄ → Aplicar** → borra el cubo (clic derecho sobre su nombre en el Listado → **Borrar**).

:::opciones id="g7p-ventanas"
¿Agrandamos las ventanas?
- No hizo falta
- Sí, las tres
:::

## Parte 3 · Revisar las medidas (30 min)

Antes de imprimir, cada pieza debe medir lo que dice el diseño. Haz clic en cada una y lee sus **Dimensiones** en el **Panel N** (tecla N), pestaña **Elemento**.

:::tabla id="g7p-medidas"
| Pieza | En el diseño (X × Y × Z, mm) | En el Panel N | ¿Coinciden? |
| --- | --- | --- | --- |
| Eslabón del hombro | 100 × 20 × 4 | | |
| Eslabón del codo | 85 × 16 × 4 | | |
| Placa de la pinza | 60 × 35 × 4 | | |
| Engrane motriz con su mandíbula | Z = 4 | | |
| Engrane seguidor con su mandíbula | Z = 4 | | |
:::

Después, comprueben con el servo gris de referencia que todo encaja. Muestren todo con **Alt + H** y miren con rayos X (**Alt + Z**) desde arriba (tecla **7**) y de frente (tecla **1**):

:::checklist id="g7p-revision"
- [ ] Los eslabones tienen el agujero del eje en una punta y la ventana con sus dos agujeros en la otra.
- [ ] Los dientes de los dos engranes encajan sin encimarse.
- [ ] El eje del servo gris queda debajo del centro del engrane motriz y el servo no atraviesa la placa.
- [ ] El agujero del engrane seguidor coincide con el de la placa (X = 20.5).
- [ ] Las dos mandíbulas quedan en espejo.
:::

Si una pieza no coincide, revisen el paso de la **Guía 3** donde se hizo y corríjanlo.

:::pregunta id="g7p-p1"
¿Por qué es mejor encontrar un error de medida ahora, en Blender, que después de imprimir?
:::

## Parte 4 · Exportar (15 min)

Exporta cada pieza por separado (el servo gris **no** se imprime). Para cada una: clic **solo** en su nombre en el Listado → **Archivo → Exportar → STL (.stl)** → activa **Sólo lo seleccionado** → escribe su nombre → **Exportar STL**.

| Pieza | Nombre del archivo |
| --- | --- |
| `hombro` | `equipo_NOMBRE_hombro.stl` |
| `codo` | `equipo_NOMBRE_codo.stl` |
| `engrane_motriz` | `equipo_NOMBRE_pinza_motriz.stl` |
| `engrane_seguidor` | `equipo_NOMBRE_pinza_seguidor.stl` |
| `placa` | `equipo_NOMBRE_pinza_placa.stl` |

Si ya los habían exportado en la Guía 3, expórtenlos otra vez con el mismo nombre y acepten reemplazarlos. Guarden los dos archivos de Blender con **Ctrl + S**.

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] Probamos el servo en la base y el plato impresos.
- [ ] Terminamos los eslabones y la pinza.
- [ ] Revisamos las medidas de las cinco piezas.
- [ ] Exportamos los cinco STL.
:::

## Bitácora (10 min)

:::pregunta id="g7p-b1"
¿Qué problema encontramos al revisar las piezas y cómo lo resolvimos?
:::

Antes de irse, guarden juntos en un `.zip` los archivos `equipo_NOMBRE_brazo.blend` y `equipo_NOMBRE_pinza.blend` y los cinco `.stl` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. El docente los imprimirá para el sábado 8.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban sus archivos de Blender (.blend) y los .stl en un .zip. La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (9 sábados), desde el 31 de octubre:** la revisión de piezas de la Guía 4 práctica anterior (medir el hueco y probar el servo), antes de imprimir el brazo y la pinza. Campos propios (g7p-…).
- La base y el plato se imprimieron durante las simulaciones (sábados 4 a 6). **Imprimir esta semana** los eslabones y la pinza (cinco piezas) para el sábado 8.
- Agrandar las ventanas 0,3 mm es el mismo ajuste de "más holgura" de la Guía 11 (Versión 2.0). Si el servo entró bien en la base, no hace falta.
- Revisar en el programa de impresión que las piezas midan lo correcto (si salen diminutas, la escala de exportación está mal). Los engranes pueden necesitar lijado ligero.
- Los equipos más lentos pueden usar las piezas de referencia del docente.
- g7p-p1: corregir en Blender toma minutos; un error impreso se descubre al armar y obliga a imprimir de nuevo (tiempo y filamento).
- Tiempo total: 20 + 40 + 30 + 15 + 5 + 10 = 120 minutos.
:::
