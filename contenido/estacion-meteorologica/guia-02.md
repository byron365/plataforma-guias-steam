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

- **Vista de arriba:** como si miraras la torre desde el techo. Se ve un círculo (el plato), el agujero del centro y los tres puntitos de las columnas. Usen el compás.
- **Vista de lado:** como si la miraras desde un costado. Se ven los platos como rayitas, uno encima de otro, con su separación.
- Pueden dibujar a la mitad del tamaño real (1 cm del papel = 2 cm reales) y escribir las medidas reales al lado.

| Pieza | Medida |
| --- | --- |
| Platos | 6 platos de 100 mm de diámetro y 2 mm de grosor |
| Separación | 15 mm entre plato y plato |
| Agujero central | 50 mm de diámetro (ahí va el sensor) |
| Columnas | 3 columnas de 6 mm de diámetro |

Las 3 columnas van a **40 mm del centro**, separadas **120°**. Para saber dónde ponerlas en Blender usamos coordenadas:

> X = 40 × cos(ángulo)  Y = 40 × sin(ángulo)

Con la calculadora: revisa que esté en grados (**DEG** o **D** en la pantalla). Para cos(120°) escribe `cos 120` (o `120 cos`, según la calculadora), multiplícalo por 40 y anota el resultado. La primera fila ya está resuelta como ejemplo. Redondeen a una cifra decimal.

| Columna | Ángulo | X (mm) | Y (mm) |
| --- | --- | --- | --- |
| 1 | 0° | 40 | 0 |
| 2 | 120° | | |
| 3 | 240° | | |

Comprueben sus números con la animación: muestra dónde queda cada columna vista desde arriba.

:::animacion tipo="coordenadas-3d" modo="columnas"
:::

**Volumen interior:** el hueco del sensor es un cilindro de 50 mm de diámetro y 75 mm de alto.

El radio (r) es la mitad del diámetro: 25 mm. Hagan la multiplicación con la calculadora. Para pasar de mm³ a cm³, dividan entre 1000.

> V = π × r² × h = 3,14 × 25 × 25 × 75 ≈ ______ mm³ (≈ ______ cm³)

:::pregunta id="g2-p2"
El DHT22 mide 15 × 25 × 8 mm. ¿Cabe dentro del agujero central? Explica cómo lo sabes.
:::

## Parte 3 · Blender en milímetros (10 min)

1. Abre Blender y borra el cubo inicial (**X**).
   - Si aparece una ventana de bienvenida, haz clic fuera de ella.
   - Clic en el cubo, con el mouse sobre la vista 3D: **X → Borrar** (o la tecla Suprimir).
2. En **Propiedades de la escena → Unidades**: Sistema **Métrico**, Escala de unidades **0.001**, Longitud **Milímetros**.
   - En el panel **Propiedades** (abajo a la derecha), haz clic en el icono de **Escena** (un cono con dos esferitas) y abre la sección **Unidades**.
   - **Sistema de unidades:** Métrico. **Escala de unidades:** escribe 0.001 y Enter. **Longitud:** Milímetros.
3. Guarda de una vez: **Archivo → Guardar como** → `equipo_NOMBRE_estacion.blend` (cambien NOMBRE por el de su equipo). Desde ahora, guarden seguido con **Ctrl + S**.

[IMAGEN 2.2: panel de Unidades de Blender con escala 0.001 y longitud en milímetros]

**Para moverte en la vista 3D:** girar = mantener la rueda del mouse y mover; desplazar = Shift + rueda; acercar = girar la rueda. Vista de arriba / frente / lado = teclas 7, 1 y 3 del teclado numérico (sin teclado numérico: las bolitas de colores del dibujo de ejes, arriba a la derecha). Medidas exactas: **Panel N** (tecla N), pestaña **Elemento**.

## Parte 4 · Un plato por extrusión (25 min)

**Extruir** es "estirar" una forma plana para darle grosor, como cuando se empuja plastilina por un molde.

1. **Shift + A → Malla → Círculo.** En el panel que aparece: Radio **50**, Tipo de relleno **Abanico de triángulos**.
   - El panel aparece abajo a la izquierda (si está cerrado, haz clic en su título). Llénalo enseguida, antes de hacer otra cosa, o desaparece.
   - **Tipo de relleno:** elige **Abanico de triángulos** (en inglés, *Triangle Fan*). Así el círculo queda relleno, como una tapa.
2. Pasa a modo edición (**Tab**), selecciona todo (**A**) y **extruye** (**E**) **2** mm hacia arriba.
   - Con el mouse sobre la vista 3D: **Tab**, luego **A** (todo se pone naranja), luego **E**, escribe **2** y presiona **Enter**.

Miren en la animación cómo una figura plana se vuelve sólida al extruirla:

:::animacion tipo="extrusion"
:::

3. Vuelve a modo objeto (**Tab**). Ya tienes un disco de 100 mm.
   - En el Listado (arriba a la derecha), haz doble clic en su nombre y llámalo `plato`.
4. **El agujero:** crea un cilindro de radio **25** y alto **10**, en el centro. Selecciona el plato, agrega el modificador **Booleana**, operación **Diferencia**, objeto: el cilindro. Aplica y oculta el cilindro.
   - **Shift + A → Malla → Cilindro**. En el Panel N escribe Dimensiones X = 50, Y = 50, Z = 10 (radio 25 = diámetro 50). Llámalo `hueco`.
   - Clic en el `plato` → en Propiedades, icono de la **llave inglesa azul** (Modificadores) → **Agregar modificador → Generar → Booleana** → **Diferencia** → en **Objeto** elige `hueco`.
   - Clic en el `hueco` y **H** para ocultarlo; vuelve a hacer clic en el `plato` → flechita **⌄** del modificador → **Aplicar**.
   - Ya no necesitas el `hueco`: clic derecho sobre su nombre en el Listado → **Borrar**.

[IMAGEN 2.3: plato de 100 mm con el agujero central de 50 mm hecho con el modificador Booleana]

## Parte 5 · Seis platos con Repetir (15 min)

1. Con el plato seleccionado agrega el modificador **Repetir** (Array).
   - Llave inglesa → **Agregar modificador → Generar → Repetir**.
2. Cantidad: **6**. Desactiva *Desplazamiento relativo* y activa *Desplazamiento constante*: **Z = 15**.
   - En el modificador, **Cantidad** = 6.
   - Quita la palomita de **Desplazamiento relativo**.
   - Pon la palomita en **Desplazamiento constante** y, en su **Distancia**, escribe X = 0, Y = 0, **Z = 15**.
   - Mira de lado (tecla **1** o bolita **Y**): deben verse seis platos, uno encima de otro.

[IMAGEN 2.4: torre de seis platos creada con el modificador Repetir y desplazamiento constante en Z]

3. **Columnas:** crea un cilindro de radio **3** y alto **80**. Colócalo en las coordenadas de la columna 1 (X 40, Y 0). Duplícalo (**Shift + D**) dos veces y ponlo en las coordenadas de tu tabla.
   - **Shift + A → Malla → Cilindro** con Dimensiones X = 6, Y = 6, Z = 80.
   - Posición X = 40, Y = 0, **Z = 40** (así va del primer plato hasta un poco más arriba del último).
   - **Shift + D** y clic derecho; en el Panel N escribe la X y la Y de la columna 2 de tu tabla (con el signo menos si lo tiene, y punto decimal). Repite para la columna 3.
   - Mira desde arriba (tecla **7**): las tres columnas deben quedar dentro del plato, fuera del agujero, y a la misma distancia entre ellas.
4. Guarda el archivo como **equipo_NOMBRE_estacion.blend**.
   - Con **Ctrl + S** (ya tiene ese nombre).

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

Pistas: guarda una copia antes (**Archivo → Guardar como** → `equipo_NOMBRE_estacion_prueba.blend`). Para seleccionar solo el borde: en Modo Edición, **Alt + clic** sobre una arista del borde de afuera selecciona toda la vuelta.

## Bitácora (15 min)

:::foto id="g2-foto"
Foto del boceto con medidas.
:::

:::pregunta id="g2-b1"
¿Para qué sirvió calcular las coordenadas de las columnas?
:::

:::pregunta id="g2-b2"
¿Qué ventaja tiene el modificador Repetir frente a copiar el plato 6 veces a mano?
:::

Antes de irse, suban `equipo_NOMBRE_estacion.blend` aquí: lo van a terminar el sábado 4.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Coordenadas esperadas: columna 2 ≈ (−20, 34,6); columna 3 ≈ (−20, −34,6).
- Volumen: 3,14 × 625 × 75 ≈ 147 187 mm³ ≈ 147 cm³.
- g2-p2: sí cabe; el lado más largo del sensor (25 mm) es menor que el diámetro (50 mm) y que la altura (75 mm).
- Si el modificador Booleana falla, revisar que el cilindro atraviese todo el plato.
- Tiempo total: 10 + 25 + 10 + 25 + 15 + 5 + 15 = 105 minutos (15 de margen para Blender).
:::
