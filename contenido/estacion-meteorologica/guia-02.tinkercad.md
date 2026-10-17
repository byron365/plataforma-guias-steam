---
titulo: Una casa para los sensores
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Una casa para los sensores

## Objetivo del día

Diseñar la carcasa de la estación: un boceto con medidas y coordenadas, y el modelo 3D de la torre de platos en Tinkercad Codeblocks (diseño 3D con bloques).

**Al terminar tendremos:** la torre de platos con sus columnas modelada en Tinkercad y guardada.

## Materiales del equipo

- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)
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

Las 3 columnas van a **40 mm del centro**, separadas **120°**. Para saber dónde ponerlas en Tinkercad usamos coordenadas:

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

## Parte 3 · Conociendo Tinkercad Codeblocks (10 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea un diseño de Codeblocks.
   - Arriba a la derecha, botón **+ Crear** → **Codeblocks**.
   - Se abre el editor. Si aparece una ventana de bienvenida o un tutorial, ciérrala.
3. Ponle nombre al diseño.
   - Arriba a la izquierda aparece un nombre inventado (por ejemplo "Tremendous Jaiks-Esboo"). Haz clic sobre él, bórralo y escribe `equipo_NOMBRE_estacion` (cambia NOMBRE por el de tu equipo). Presiona **Enter**.
   - El diseño se guarda solo mientras trabajas. Lo encuentras otra vez en Tinkercad: **Diseños → Codeblocks**.

Conoce las partes del editor:

| Parte | Dónde está y para qué sirve |
| --- | --- |
| Categorías | Columna de círculos de colores a la izquierda: **Formas**, **Modificar**, **Controlar**, **Matemáticas**, **Variables**, **Plantillas**, **Marcar** |
| Bloques | Junto a las categorías. Al tocar una categoría se ven sus bloques |
| Área de programa | El espacio oscuro del centro: ahí se arrastran y se unen los bloques |
| Vista 3D | El recuadro de la derecha con el **Plano de trabajo**: ahí aparece la pieza |
| Botones de abajo | **▷** ejecuta el programa; **↻** borra la pieza para volver a empezar |

Aprende a usar los bloques. Prueba cada acción:

| Acción | Cómo se hace |
| --- | --- |
| Agregar un bloque | Arrástralo desde la izquierda al área de programa |
| Unir dos bloques | Suelta un bloque justo debajo de otro: encaja como una pieza de rompecabezas |
| Borrar un bloque | Arrástralo de vuelta a la columna de bloques de la izquierda |
| Ver las medidas de una forma | Toca la flecha **›** del bloque. Para ocultarlas, toca **‹** |
| Cambiar un número | Haz clic en el número, borra, escribe el nuevo y haz clic afuera. Usa **punto** para decimales (34.6) |
| Ver la pieza | Botón **▷** de abajo. En la vista 3D: arrastra con el mouse para girarla (si no gira, prueba arrastrando con el botón derecho) y usa la rueda para acercar |
| Deshacer | Flecha **↶** de arriba a la izquierda del área de programa |

- **Las medidas están en milímetros.** Si escribes 50, la pieza mide 50 mm. No hay que configurar unidades.
- Cada forma nueva aparece **centrada**: su centro queda en X = 0, Y = 0, Z = 0, así que la mitad queda arriba del plano de trabajo y la mitad abajo. Con **Mover** la llevan a su lugar.
- **Mover** mueve la última forma que agregaste.
- **¿Te perdiste en la vista 3D?** Toca la casita 🏠 que está a la izquierda de la vista.

[IMAGEN 2.2T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

## Parte 4 · Un plato con su agujero (25 min)

**Extruir** es "estirar" una forma plana para darle grosor, como cuando se empuja plastilina por un molde. Un plato es un círculo estirado 2 mm: en Tinkercad eso es un **Cilindro** muy bajito.

Miren en la animación cómo una figura plana se vuelve sólida al extruirla:

:::animacion tipo="extrusion"
:::

1. **El plato:** un disco de 100 mm de diámetro y 2 mm de grosor.
   - Toca la categoría **Formas** y arrastra el bloque **Cilindro** al área de programa. Ahora dice **Añadir**.
   - Toca su flecha **›** y escribe: **Radio = 50** (100 ÷ 2), **A = 2**, **Lados = 64** (más lados = círculo más redondo).
   - De **Modificar**, arrastra **Mover:** debajo y escribe **X: 0**, **Y: 0**, **Z: 1**. Así el plato queda apoyado sobre el plano de trabajo (de 0 a 2 mm).
2. **El agujero:** un cilindro de 50 mm de diámetro, marcado como hueco.
   - Debajo, otro **Cilindro** con **Radio = 25**, **A = 10**, **Lados = 64**. No lo muevas: queda en el centro y atraviesa todo el plato.
   - Toca su **círculo rayado**: el círculo de color se pone gris. Eso significa que es un **hueco**.
3. **Agrupar:** de **Modificar**, arrastra **Seleccionar todo** y debajo **Group Selection** (este bloque aparece en inglés: quiere decir "agrupar la selección"). Al agrupar, el hueco se resta del plato.
   - Ejecuta con **▷**. **✔ Revisa:** debe verse un disco con el agujero en el centro. Si sale lleno, revisa que el segundo cilindro tenga el círculo de color en gris.

[IMAGEN 2.3T: plato de 100 mm con el agujero central de 50 mm en Tinkercad Codeblocks]

## Parte 5 · Seis platos con Repetir (15 min)

1. De **Controlar**, arrastra el bloque **Repetir** debajo de **Group Selection** y cambia el número a **5**.
2. **Dentro** del Repetir (en su hueco), de **Modificar**, pon el bloque **Copiar** y debajo un **Mover:** con **X: 0**, **Y: 0**, **Z: 15**.
   - Cada vuelta copia el último plato y lo sube 15 mm. Con el plato original y 5 copias quedan **6 platos**.
   - Ejecuta con **▷** y mira de lado: deben verse seis platos, uno encima de otro.

[IMAGEN 2.4T: torre de seis platos hecha con el bloque Repetir en Tinkercad Codeblocks]

3. **Columnas:** un cilindro de radio **3** y alto **80** en cada una de las coordenadas de tu tabla.
   - **Debajo** del Repetir (no dentro), un **Cilindro** con **Radio = 3**, **A = 80**, **Lados = 32**.
   - Debajo, **Mover: X 40, Y 0, Z 40** (columna 1). La Z = 40 hace que vaya del primer plato hasta un poco más arriba del último.
   - Repite para la columna 2: otro **Cilindro** igual y un **Mover** con la X y la Y de la columna 2 de tu tabla (con el signo menos si lo tiene, y punto decimal) y **Z 40**. Lo mismo para la columna 3.
   - Ejecuta con **▷** y mira desde arriba (cara **SUPERIOR** del cubito de vistas): las tres columnas deben quedar dentro del plato, fuera del agujero, y a la misma distancia entre ellas.
4. No hace falta guardar: Tinkercad guarda solo. El diseño queda en **Diseños → Codeblocks** con el nombre `equipo_NOMBRE_estacion`.

[IMAGEN 2.5T: torre completa con seis platos y tres columnas a 120° en Tinkercad Codeblocks]

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] El boceto tiene medidas y coordenadas.
- [ ] Calculamos el volumen interior.
- [ ] El plato tiene su agujero central.
- [ ] La torre tiene 6 platos y 3 columnas en su lugar.
- [ ] El diseño quedó guardado en Tinkercad.
:::

## Reto extra

Las estaciones reales usan platos un poco **inclinados** (como un sombrero) para que escurra la lluvia. Prueben un plato con el borde 3 mm más abajo que el centro. ¿Cómo queda la torre?

Pista: cambien el **Cilindro** del plato por un **Cono** con **Radio inferior = 50**, **Radio superior = 25**, **A = 3** y **Mover Z 1.5**; debajo, otro **Cono** igual pero **hueco**, con **Mover Z −0.5**. El plato queda de 2 mm de grosor, como un sombrero. Si no les gusta, regresen el Cilindro (o usen **↶**).

## Bitácora (15 min)

:::foto id="g2-foto"
Foto del boceto con medidas.
:::

:::pregunta id="g2-b1"
¿Para qué sirvió calcular las coordenadas de las columnas?
:::

:::pregunta id="g2-b2"
¿Qué ventaja tiene el bloque Repetir frente a poner el plato 6 veces a mano?
:::

Su diseño queda guardado en Tinkercad (**Diseños → Codeblocks**): lo van a terminar el sábado 4.

:::archivo id="g2-archivo"
**Archivo de trabajo:** sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…).
:::

:::docente
- Coordenadas esperadas: columna 2 ≈ (−20, 34,6); columna 3 ≈ (−20, −34,6).
- Volumen: 3,14 × 625 × 75 ≈ 147 187 mm³ ≈ 147 cm³.
- g2-p2: sí cabe; el lado más largo del sensor (25 mm) es menor que el diámetro (50 mm) y que la altura (75 mm).
- Si el agujero no aparece, revisar que el cilindro esté marcado como hueco (círculo gris) y que esté antes de Seleccionar todo / Group Selection.
- Si el Repetir no hace la torre, revisar que Copiar y Mover estén **dentro** del bloque Repetir.
- **Versión Tinkercad (Codeblocks):** mismas medidas que la versión Blender. Las formas nacen centradas, por eso el plato lleva Mover Z 1 para quedar de 0 a 2 mm. Tinkercad necesita internet y una cuenta por equipo (o una clase de Tinkercad).
- Tiempo total: 10 + 25 + 10 + 25 + 15 + 5 + 15 = 105 minutos (15 de margen para Tinkercad).
:::
