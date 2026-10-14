---
titulo: Una casa para los sensores
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Una casa para los sensores

## Objetivo del día

Diseñar la carcasa de la estación: un boceto con medidas y coordenadas, y el modelo 3D de la torre de platos en Blender.

**Al terminar tendremos:** la torre de platos con sus columnas modelada en Blender y guardada.

## Materiales del equipo

- Computadora con Blender
- Papel cuadriculado, regla, compás y lápiz
- Calculadora

## Parte 1 · ¿Por qué una carcasa? (10 min)

Si el sensor recibe el sol directo, mide el calor del sol y no el del aire. Por eso las estaciones reales usan una **torre de platos** (llamada *escudo de radiación*): da sombra, pero deja pasar el aire.

[IMAGEN 2.1: foto de un escudo de radiación real de una estación meteorológica, con platos apilados]

:::pregunta id="g2-p1"
¿Por qué los platos tienen espacios entre ellos en lugar de ser una caja cerrada?
:::

## Parte 2 · Boceto con medidas (25 min)

Dibuja en el papel cuadriculado la vista de arriba y la vista de lado con estas medidas:

| Pieza | Medida |
| --- | --- |
| Platos | 6 platos de 100 mm de diámetro y 2 mm de grosor |
| Separación | 15 mm entre plato y plato |
| Agujero central | 50 mm de diámetro (ahí va el sensor) |
| Columnas | 3 columnas de 6 mm de diámetro |

Las 3 columnas van a **40 mm del centro**, separadas **120°**. Para saber dónde ponerlas en Blender usamos coordenadas:

> X = 40 × cos(ángulo)  Y = 40 × sin(ángulo)

| Columna | Ángulo | X (mm) | Y (mm) |
| --- | --- | --- | --- |
| 1 | 0° | 40 | 0 |
| 2 | 120° | | |
| 3 | 240° | | |

:::animacion tipo="coordenadas-3d" modo="columnas"
:::

**Volumen interior:** el hueco del sensor es un cilindro de 50 mm de diámetro y 75 mm de alto.

> V = π × r² × h = 3,14 × 25 × 25 × 75 ≈ ______ mm³ (≈ ______ cm³)

:::pregunta id="g2-p2"
El DHT22 mide 15 × 25 × 8 mm. ¿Cabe dentro del agujero central? Explica cómo lo sabes.
:::

## Parte 3 · Blender en milímetros (10 min)

1. Abre Blender y borra el cubo inicial (**X**).
2. En **Propiedades de escena → Unidades**: Sistema **Métrico**, Escala de unidad **0.001**, Longitud **Milímetros**.

[IMAGEN 2.2: panel de Unidades de Blender con escala 0.001 y longitud en milímetros]

## Parte 4 · Un plato por extrusión (25 min)

1. **Shift + A → Malla → Círculo.** En el panel que aparece: Radio **50**, Tipo de relleno **Abanico**.
2. Pasa a modo edición (**Tab**), selecciona todo (**A**) y **extruye** (**E**) **2** mm hacia arriba.

:::animacion tipo="extrusion"
:::

3. Vuelve a modo objeto (**Tab**). Ya tienes un disco de 100 mm.
4. **El agujero:** crea un cilindro de radio **25** y alto **10**, en el centro. Selecciona el plato, agrega el modificador **Booleano**, operación **Diferencia**, objeto: el cilindro. Aplica y oculta el cilindro.

[IMAGEN 2.3: plato de 100 mm con el agujero central de 50 mm hecho con el modificador Booleano]

## Parte 5 · Seis platos con Matriz (15 min)

1. Con el plato seleccionado agrega el modificador **Matriz** (Array).
2. Cantidad: **6**. Desactiva *Desplazamiento relativo* y activa *Desplazamiento constante*: **Z = 15**.

[IMAGEN 2.4: torre de seis platos creada con el modificador Matriz y desplazamiento constante en Z]

3. **Columnas:** crea un cilindro de radio **3** y alto **80**. Colócalo en las coordenadas de la columna 1 (X 40, Y 0). Duplícalo (**Shift + D**) dos veces y ponlo en las coordenadas de tu tabla.
4. Guarda el archivo como **equipo_NOMBRE_estacion.blend**.

[IMAGEN 2.5: torre completa con seis platos y tres columnas a 120°]

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] El boceto tiene medidas y coordenadas.
- [ ] Calculamos el volumen interior.
- [ ] El plato tiene su agujero central.
- [ ] La torre tiene 6 platos y 3 columnas en su lugar.
- [ ] Guardamos el archivo .blend.
:::

## Reto extra

Las estaciones reales usan platos un poco **inclinados** (como un sombrero) para que escurra la lluvia. En modo edición selecciona solo el borde del plato y bájalo 3 mm (**G**, **Z**, **-3**). ¿Cómo queda la torre?

## Bitácora (15 min)

:::foto id="g2-foto"
Foto del boceto con medidas.
:::

:::pregunta id="g2-b1"
¿Para qué sirvió calcular las coordenadas de las columnas?
:::

:::pregunta id="g2-b2"
¿Qué ventaja tiene el modificador Matriz frente a copiar el plato 6 veces a mano?
:::

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Coordenadas esperadas: columna 2 ≈ (−20, 34,6); columna 3 ≈ (−20, −34,6).
- Volumen: 3,14 × 625 × 75 ≈ 147 187 mm³ ≈ 147 cm³.
- g2-p2: sí cabe; el lado más largo del sensor (25 mm) es menor que el diámetro (50 mm) y que la altura (75 mm).
- Si el Booleano falla, revisar que el cilindro atraviese todo el plato.
- Tiempo total: 10 + 25 + 10 + 25 + 15 + 5 + 15 = 105 minutos (15 de margen para Blender).
:::
