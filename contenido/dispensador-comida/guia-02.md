---
titulo: ¿Cómo dejar caer la comida?
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · ¿Cómo dejar caer la comida?

## Objetivo del día

Comparar tres mecanismos para soltar comida, elegir uno, hacer el boceto y dar los primeros pasos en Blender con el soporte del servo.

**Al terminar tendremos:** el mecanismo elegido, el boceto con medidas y el soporte del servo listo para imprimir.

## Materiales del equipo

- Bitácora, lápiz, regla
- Cartón, tijeras, cinta (prototipo rápido)
- Croquetas o cereal
- Botella plástica grande (para medirla)
- Computadora con Blender y mouse con rueda

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

## Parte 4 · Conociendo Blender (15 min)

1. Abre Blender y borra el cubo (**X**).
   - Si aparece una ventana de bienvenida, haz clic fuera de ella.
   - Haz clic en el cubo para seleccionarlo, pon el mouse sobre la vista 3D y presiona **X → Borrar** (o la tecla Suprimir).
2. **Propiedades de la escena → Unidades**: Escala de unidades **0.001**, Longitud **Milímetros**.
   - Propiedades es el panel de abajo a la derecha. Haz clic en el icono de **Escena** (un cono con dos esferitas).
   - Abre la sección **Unidades**.
   - En **Escala de unidades** escribe **0.001** y presiona Enter.
   - En **Longitud** elige **Milímetros**.
   - Ahora, cuando escribas 32 en una medida, Blender entiende 32 mm.
3. Guarda el archivo: **Archivo → Guardar como** → `equipo_NOMBRE_dispensador.blend` (cambia NOMBRE por el de tu equipo). Desde ahora, guarda seguido con **Ctrl + S**.

Aprende a moverte en la vista 3D. Pon el mouse sobre ella y prueba cada acción:

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico |
| Mostrar panel de medidas | Tecla N |

- **¿Sin teclado numérico?** Usa el dibujo de ejes de colores arriba a la derecha de la vista: bolita **Y** (verde) = de frente, **X** (roja) = de lado, **Z** (azul) = desde arriba. También sirve **Vista → Punto de vista**.
- **¿Te perdiste?** Presiona la tecla **Inicio** (Home) con el mouse sobre la vista: se ve todo otra vez.
- El **Panel N** tiene la pestaña **Elemento**, con Posición, Rotación y Dimensiones del objeto seleccionado. El **Listado** (arriba a la derecha) es la lista de objetos.

[IMAGEN 2.3: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

## Parte 5 · El soporte del servo (30 min)

Las medidas se escriben en el **Panel N → Elemento**: doble clic en la casilla, escribe el número y Enter. Usa **punto** para decimales (23.4).

1. **Caja exterior:** cubo de X = 32, Y = 18, Z = 20 · Posición Z = 10.
   - **Shift + A → Malla → Cubo** (con el mouse sobre la vista 3D).
   - En Dimensiones escribe X = 32, Y = 18, Z = 20. En Posición, Z = 10.
   - En el Listado, haz doble clic en su nombre y llámalo `soporte`.
2. **Hueco:** cubo de X = 23.4, Y = 12.8, Z = 18 en Z = 12 (un poco más grande que el servo: la **holgura**).
   - Agrega otro cubo, escribe esas Dimensiones y Posición Z = 12, y llámalo `hueco`.
3. Modificador **Booleana** en modo **Diferencia** con el hueco, oculta el hueco (**H**) y aplica.
   - Selecciona el `soporte` → en Propiedades, icono de la **llave inglesa azul** → **Agregar modificador → Generar → Booleana**.
   - Revisa que diga **Diferencia** y en **Objeto** elige `hueco`.
   - Selecciona el `hueco` y presiona **H** para ocultarlo: ya ves el soporte hueco.
   - Selecciona otra vez el `soporte`, haz clic en la flechita **⌄** del modificador y elige **Aplicar**.
   - Borra el `hueco`: en el Listado, clic derecho sobre su nombre → **Borrar**.

Miren en la animación qué hace cada modo del modificador Booleana:

:::animacion tipo="booleano"
:::

[IMAGEN 2.4: soporte del servo terminado en Blender]

4. Guarda `equipo_NOMBRE_dispensador.blend` y exporta `equipo_NOMBRE_soporte.stl` (*Sólo lo seleccionado*).
   - Guarda con **Ctrl + S**.
   - Haz clic solo en el `soporte`, ve a **Archivo → Exportar → STL (.stl)**.
   - A la derecha, activa **Sólo lo seleccionado**. Escribe el nombre y presiona **Exportar STL**.

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

Antes de irse, suban `equipo_NOMBRE_dispensador.blend` (y el `.stl`) aquí. La próxima semana seguirán trabajando en ese mismo archivo.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Las guías siguientes están escritas para la **compuerta giratoria**, la más adecuada para el nivel. Si un equipo elige disco, el docente puede adaptar la pieza del sábado 3 (disco de 60 mm con un hueco de 20 mm).
- Imprimir los soportes esta semana (≈30 min cada uno).
- Tiempo total: 20 + 20 + 20 + 15 + 30 + 5 + 10 = 120 minutos.
:::
