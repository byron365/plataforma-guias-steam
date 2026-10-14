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

:::animacion tipo="mecanismos"
:::

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
2. Tapa la salida con un pedazo de cartón que puedas girar con el dedo (la compuerta).
3. Llena el embudo de croquetas, abre la compuerta y observa.

[IMAGEN 2.1: prototipo de cartón con un embudo y una compuerta de cartón soltando croquetas]

| Prueba | ¿Cayó la comida? | ¿Se atascó? |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |

## Parte 3 · El boceto (20 min)

Dibuja el dispensador **de lado** con estas partes:

| Parte | Medida sugerida |
| --- | --- |
| Depósito (botella) | Mide tu botella: diámetro ______ cm |
| Embudo | Entrada 80 mm, salida 25 mm, 50 mm de alto |
| Compuerta | 40 × 30 mm, debajo de la salida |
| Altura total | La salida debe quedar 5 cm sobre el plato |

Marca dónde van el **servo**, el **botón**, el **LED**, el **buzzer** y el **Arduino**.

[IMAGEN 2.2: boceto lateral del dispensador con la botella, el embudo, la compuerta, el servo y el plato]

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

## Parte 4 · Conociendo Blender (15 min)

1. Abre Blender y borra el cubo (**X**).
2. **Propiedades de escena → Unidades**: Escala de unidad **0.001**, Longitud **Milímetros**.

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico |
| Mostrar panel de medidas | Tecla N |

[IMAGEN 2.3: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

## Parte 5 · El soporte del servo (30 min)

1. **Caja exterior:** cubo de X = 32, Y = 18, Z = 20 · Ubicación Z = 10.
2. **Hueco:** cubo de X = 23.4, Y = 12.8, Z = 18 en Z = 12 (un poco más grande que el servo: la **holgura**).
3. Booleano **Diferencia** con el hueco, oculta el hueco (**H**) y aplica.

:::animacion tipo="booleano"
:::

[IMAGEN 2.4: soporte del servo terminado en Blender]

4. Guarda `equipo_NOMBRE_dispensador.blend` y exporta `equipo_NOMBRE_soporte.stl` (*Solo selección*).

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

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Las guías siguientes están escritas para la **compuerta giratoria**, la más adecuada para el nivel. Si un equipo elige disco, el docente puede adaptar la pieza del sábado 3 (disco de 60 mm con un hueco de 20 mm).
- Imprimir los soportes esta semana (≈30 min cada uno).
- Tiempo total: 20 + 20 + 20 + 15 + 30 + 5 + 10 = 120 minutos.
:::
