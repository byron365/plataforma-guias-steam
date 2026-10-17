---
titulo: ¿Cómo dejar caer la comida?
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · ¿Cómo dejar caer la comida?

## Objetivo del día

Comparar tres mecanismos para soltar comida, elegir uno, hacer el boceto y dar los primeros pasos en Tinkercad Codeblocks (diseño 3D con bloques) con el soporte del servo.

**Al terminar tendremos:** el mecanismo elegido, el boceto con medidas y el soporte del servo listo para imprimir.

## Materiales del equipo

- Bitácora, lápiz, regla
- Cartón, tijeras, cinta (prototipo rápido)
- Croquetas o cereal
- Botella plástica grande (para medirla)
- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)

## Parte 1 · Tres mecanismos (20 min)

Miren la animación de los tres mecanismos. Cambien de uno a otro y observen cómo cae la comida en cada uno:

:::animacion tipo="mecanismos"
:::

Lean la tabla y comparen las ventajas y desventajas:

| Mecanismo | ¿Cómo funciona? | Ventaja | Desventaja |
| --- | --- | --- | --- |
| Compuerta giratoria | Una paleta tapa la salida y el servo la gira para abrir | Muy simple | Se puede atascar si hay mucha comida |
| Disco giratorio | Un disco con un hueco gira y deja caer una porción | Porciones parejas | Más difícil de construir |
| Tornillo | Un tornillo grande empuja la comida | Muy preciso | Necesita un motor que gire sin parar |

:::opciones id="g2-mecanismo"
¿Qué mecanismo elegimos?
- Compuerta giratoria
- Disco giratorio
- Tornillo
:::

:::pregunta id="g2-p1"
¿Por qué elegimos ese mecanismo?
:::

## Parte 2 · Prototipo de cartón (20 min)

Antes de imprimir, probamos la idea con cartón:

1. Haz un cono de cartón (embudo) y pégalo con cinta.
   - Dibuja en el cartón un círculo de unos 20 cm y recórtalo.
   - Corta desde el borde hasta el centro (como un radio) y enrolla el círculo hasta formar un cono.
   - Corta la punta para dejar un agujero de unos 2,5 cm (del tamaño de una moneda grande) y pega con cinta.
2. Tapa la salida con un pedazo de cartón que puedas girar con el dedo (la compuerta).
   - Recorta un rectángulo un poco más grande que el agujero.
   - Pégalo con una tira de cinta solo de un lado, como una bisagra, para que gire.
3. Llena el embudo de croquetas, abre la compuerta y observa.
   - Sostengan el embudo sobre un plato o una caja (las croquetas ruedan).
   - Repitan tres veces y anoten en la tabla.

[IMAGEN 2.1: prototipo de cartón con un embudo y una compuerta de cartón soltando croquetas]

| Prueba | ¿Cayó la comida? | ¿Se atascó? |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |

## Parte 3 · El boceto (20 min)

Dibuja el dispensador **de lado** con estas partes. "De lado" es como si lo vieras desde un costado: la botella arriba, el embudo debajo, la compuerta en la salida y el plato abajo.

Antes de dibujar, mide el **diámetro** de tu botella (lo ancho del círculo) con la regla y anótalo en la tabla.

| Parte | Medida sugerida |
| --- | --- |
| Depósito (botella) | Mide tu botella: diámetro ______ cm |
| Embudo | Entrada 80 mm, salida 25 mm, 50 mm de alto |
| Compuerta | 40 × 30 mm, debajo de la salida |
| Altura total | La salida debe quedar 5 cm sobre el plato |

Marca dónde van el **servo**, el **botón**, el **LED**, el **buzzer** y el **Arduino**.

Escribe la medida junto a cada parte del dibujo. Recuerda: 10 mm = 1 cm.

[IMAGEN 2.2: boceto lateral del dispensador con la botella, el embudo, la compuerta, el servo y el plato]

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

## Parte 4 · Conociendo Tinkercad Codeblocks (15 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea un diseño de Codeblocks.
   - Arriba a la derecha, botón **+ Crear** → **Codeblocks**.
   - Se abre el editor. Si aparece una ventana de bienvenida o un tutorial, ciérrala.
3. Ponle nombre al diseño.
   - Arriba a la izquierda aparece un nombre inventado (por ejemplo "Tremendous Jaiks-Esboo"). Haz clic sobre él, bórralo y escribe `equipo_NOMBRE_soporte` (cambia NOMBRE por el de tu equipo). Presiona **Enter**.
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
| Cambiar un número | Haz clic en el número, borra, escribe el nuevo y haz clic afuera. Usa **punto** para decimales (23.4) |
| Ver la pieza | Botón **▷** de abajo. En la vista 3D: arrastra con el mouse para girarla (si no gira, prueba arrastrando con el botón derecho) y usa la rueda para acercar |
| Deshacer | Flecha **↶** de arriba a la izquierda del área de programa |

- **Las medidas están en milímetros.** Si escribes 32, la pieza mide 32 mm.
- Cada forma nueva aparece **centrada**: su centro queda en X = 0, Y = 0, Z = 0, así que la mitad queda arriba del plano de trabajo y la mitad abajo. Con **Mover** la llevan a su lugar.
- **¿Te perdiste en la vista 3D?** Toca la casita 🏠 que está a la izquierda de la vista.

[IMAGEN 2.3T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

## Parte 5 · El soporte del servo (30 min)

El soporte es una caja con un **hueco** donde entra el servo. En Tinkercad, un hueco es una forma marcada como **hueco**: al **agrupar**, se resta de las formas sólidas y deja el espacio vacío.

1. **Caja exterior:** un Cubo de 32 × 18 × 20 mm.
   - Toca la categoría **Formas** y arrastra el bloque **Cubo** al área de programa. Ahora dice **Añadir** y tiene un dibujo de cubo.
   - Toca la flecha **›** del bloque para ver sus medidas: **A**, **L**, **A**, **arista**.
   - El primer **A** es el **ancho** (X): escribe **32**. **L** es el **largo** (Y): **18**. El segundo **A** es el **alto** (Z): **20**. Deja **arista** en **0**.
2. **Hueco:** otro Cubo de 23.4 × 12.8 × 18 mm, marcado como hueco. Mide un poco más que el servo: es la **holgura**.
   - Arrastra otro **Cubo** y suéltalo justo debajo del primero, hasta que encaje.
   - Toca su **›** y escribe: primer A = **23.4**, L = **12.8**, segundo A = **18**, arista = **0**.
   - En el bloque hay dos círculos: el de color (el color de la pieza) y uno **rayado**. Toca el **círculo rayado**: el círculo de color se pone gris. Eso significa que esta forma es un **hueco**.
3. **Subir el hueco 2 mm** para que el soporte tenga piso.
   - Toca la categoría **Modificar** y arrastra el bloque **Mover:** debajo del hueco.
   - Escribe **X: 0**, **Y: 0**, **Z: 2**. El bloque Mover mueve la **última forma** que agregaste: el hueco sube 2 mm, así abajo queda un piso de 3 mm y arriba el hueco sale de la caja.
4. **Agrupar:** así el hueco se resta de la caja.
   - De **Modificar**, arrastra **Seleccionar todo** debajo de Mover.
   - Después arrastra **Group Selection** debajo de Seleccionar todo (en esta versión de Tinkercad ese bloque está en inglés: quiere decir "agrupar la selección").
5. Ejecuta el programa con **▷** (abajo).
   - En la vista 3D debe aparecer la caja con el hueco arriba. Gírala para ver adentro.
   - **✔ Revisa:** si la caja sale sólida, revisa que el segundo cubo tenga el círculo de color en gris (hueco) y que Seleccionar todo y Group Selection estén al final.

[IMAGEN 2.4T: soporte del servo terminado en Tinkercad Codeblocks]

6. Exporta `equipo_NOMBRE_soporte.stl`.
   - Arriba a la derecha, botón **Compartir**. Se abre la ventana **Exportar y compartir**.
   - En **Descargar un archivo**, toca **.STL**. El archivo se guarda en la carpeta **Descargas** de la computadora.
   - Si el archivo no se llama `equipo_NOMBRE_soporte.stl`, cámbiale el nombre: clic derecho sobre él → **Cambiar nombre**.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Comparamos los tres mecanismos y elegimos uno.
- [ ] Probamos el prototipo de cartón.
- [ ] El boceto tiene medidas.
- [ ] Exportamos el soporte del servo.
:::

## Bitácora (10 min)

:::pregunta id="g2-b1"
¿Para qué sirve hacer un prototipo de cartón antes de imprimir?
:::

Antes de irse, suban aquí `equipo_NOMBRE_soporte.stl`. El programa de bloques se queda guardado en su cuenta de Tinkercad (**Diseños → Codeblocks**): la próxima semana seguirán desde ahí.

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí el .stl que exportaron. Su diseño de bloques queda guardado en Tinkercad: en cualquier computadora entran con la misma cuenta y lo abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Las guías siguientes están escritas para la **compuerta giratoria**, la más adecuada para el nivel. Si un equipo elige disco, el docente puede adaptar la pieza del sábado 3 (disco de 60 mm con un hueco de 20 mm).
- Imprimir los soportes esta semana (≈30 min cada uno).
- **Versión Tinkercad (Codeblocks):** las piezas y medidas son las mismas que en la versión Blender. Tinkercad necesita internet. Cada equipo necesita una cuenta de Tinkercad (o una clase de Tinkercad del docente) para que sus diseños queden guardados.
- En Codeblocks el hueco se resta solo al **agrupar**: el programa debe terminar con **Seleccionar todo** y **Group Selection** (este bloque aparece en inglés).
- Tiempo total: 20 + 20 + 20 + 15 + 30 + 5 + 10 = 120 minutos.
:::
