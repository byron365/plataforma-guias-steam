---
titulo: La banda en 3D (2): túnel, puente y canaleta
guia: 3
sabado: 3
sesion: Diseño 3D
duracion: 120
---

# Guía 3 · La banda en 3D (2): túnel, puente y canaleta

## Objetivo del día

Diseñar el **túnel** de los sensores, el **puente de salida** por donde cae la pieza y la **canaleta** que la lleva a su contenedor.

**Al terminar tendremos:** las tres piezas exportadas en STL; con las del sábado 2, toda la mecánica de la banda.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad
- El sensor de color TCS34725 y el sensor IR (para ver dónde van)

## Parte 1 · Ponerse al día (10 min)

Si el sábado 2 no terminaron alguna pieza, termínenla ahora con la **Guía 2** y expórtenla.

## Parte 2 · El túnel de los sensores (35 min)

El sensor de color necesita **oscuridad** para medir bien. El túnel es un puente sobre la banda: el **TCS34725** va encima del techo, mirando hacia abajo por una ventana, y el **sensor IR** va pegado por fuera de una pared, mirando por otra ventana.

[IMAGEN 3.1P: túnel, puente de salida y canaleta en Tinkercad Codeblocks, con etiquetas: ventana del sensor de color, ventana del sensor IR, túnel del sensor, tope, agujero por donde cae la pieza, puente de salida, canaleta con su rampa y sus paredes, y pata]

Diseño nuevo: `equipo_NOMBRE_tunel`. El túnel se diseña **parado**, como va en la banda.

1. **El techo:** un **Cubo** con primer **A = 50**, **L = 86**, segundo **A = 3**. Debajo, **Mover: X 0, Y 0, Z 98.5**.
2. **Una pared:** un **Cubo** con primer **A = 50**, **L = 3**, segundo **A = 97**. Debajo, **Mover: X 0, Y 41.5, Z 48.5**.
3. **La otra pared:** igual, con **Mover: X 0, Y −41.5, Z 48.5** (con el signo menos).
   - Entre las paredes quedan 80 mm: pasan la banda (60 mm) y sus bordes.
4. **La ventana del sensor de color (hueco):** un **Cubo** hueco con primer **A = 12**, **L = 12**, segundo **A = 10**. Debajo, **Mover: X 0, Y 0, Z 98.5**.
5. **La ventana del sensor IR (hueco):** un **Cubo** hueco con primer **A = 16**, **L = 10**, segundo **A = 8**. Debajo, **Mover: X −15, Y −41.5, Z 80**.
   - Queda en la pared de Y negativa, cerca de la entrada: a 10 mm sobre la banda, a la altura de las piezas.
6. **Seleccionar todo**, **Group Selection** y ejecuta. **✔ Revisa:** las dos ventanas atraviesan el techo y la pared.
7. **Exporta** `equipo_NOMBRE_tunel.stl`.

:::pregunta id="g3p-p1"
La banda está a 70 mm de la base y el techo empieza a 97 mm. ¿Cuánto espacio queda para que pasen las piezas? ¿Caben nuestras piezas?
:::

## Parte 3 · El puente de salida (30 min)

Al final de la banda la pieza cae por un **agujero** a la canaleta, que está debajo. El **tope** la frena si viene rápido. Las dos **patas** están solo en el lado de la banda, para que la canaleta pueda girar.

Diseño nuevo: `equipo_NOMBRE_puente`.

1. **La placa:** un **Cubo** con primer **A = 34**, **L = 110**, segundo **A = 3**. Debajo, **Mover: X 0, Y 0, Z 67.5**.
2. **Una pata:** un **Cubo** con primer **A = 12**, **L = 3**, segundo **A = 66**. Debajo, **Mover: X −11, Y 53.5, Z 33**.
3. **La otra pata:** igual, con **Mover: X −11, Y −53.5, Z 33**.
4. **El tope:** un **Cubo** con primer **A = 3**, **L = 40**, segundo **A = 25**. Debajo, **Mover: X 15.5, Y 0, Z 81.5**.
5. **El agujero (hueco):** un **Cubo** hueco con primer **A = 26**, **L = 28**, segundo **A = 10**. Debajo, **Mover: X −2, Y 0, Z 67.5**.
6. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_puente.stl`.

## Parte 4 · La canaleta giratoria (30 min)

La canaleta es una **rampa** con dos paredes que se pega encima del servo. El servo la gira hacia el contenedor del color: **30°**, **90°** o **150°**.

La rampa se hace con la forma **Cuña**, que no tiene medidas: nace como un bloque de 20 × 20 × 20 mm con el lado alto hacia **Y negativa**, y se agranda con el bloque **Escala** (de Modificar), que multiplica cada medida.

Diseño nuevo: `equipo_NOMBRE_canaleta`.

1. **La rampa:** de **Formas**, una **Cuña**. Debajo, de **Modificar**, **Escala** con **X = 1.5**, **Y = 2.75**, **Z = 1.25** (desde: centro), y debajo **Mover: X 0, Y 21.5, Z 12.5**.
   - 20 × 1.5 = 30 mm de ancho, 20 × 2.75 = 55 de largo y 20 × 1.25 = 25 de alto.
   - **✔ Revisa:** el lado alto queda cerca del centro (Y = 0) y la rampa baja hacia Y positiva.
2. **Una pared:** un **Cubo** con primer **A = 2**, **L = 55**, segundo **A = 30**. Debajo, **Mover: X 16, Y 21.5, Z 15**.
3. **La otra pared:** igual, con **Mover: X −16, Y 21.5, Z 15**.
4. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_canaleta.stl`.

:::pregunta id="g3p-p2"
¿Para qué sirve que la canaleta sea una rampa y no una placa plana?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3p-logramos"
- [ ] Exportamos el túnel con sus dos ventanas.
- [ ] Exportamos el puente de salida con su agujero y su tope.
- [ ] Exportamos la canaleta.
:::

## Bitácora (10 min)

:::pregunta id="g3p-b1"
¿Qué fue lo más difícil de usar la Cuña con Escala? ¿Cómo comprobaron que quedó bien?
:::

Antes de irse: suban los tres `.stl` juntos en un `.zip`. El docente los imprimirá para el sábado 4.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban el .zip con sus .stl. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (7 sábados), nueva el 23 de octubre:** reemplaza la selección de componentes (MOSFET, protecciones, presupuesto de energía, sensores) por el diseño del túnel, el puente y la canaleta. Campos propios (g3p-…).
- Desviador: en lugar de una paleta que empuja (con un solo servo da dos salidas, no tres), una **canaleta giratoria** debajo del final de la banda. Los ángulos del código siguen siendo 30, 90 y 150; a 90° la canaleta apunta hacia adelante.
- El túnel y el puente se imprimen **volteados** (techo y placa sobre la cama): en el programa de la impresora, girarlos 180°. La canaleta y la Cuña salen sin soportes.
- La Cuña de Codeblocks no tiene medidas propias: 20 × 20 × 20 mm, centrada, lado alto en Y negativa; se ajusta con Escala (comprobado en Tinkercad el 23 de octubre).
- g3p-p1: 97 − 70 = 27 mm; piezas de 20 mm pasan con 7 mm de sobra, y el sensor queda a 1 cm de ellas (como pide la Guía 4 normal).
- g3p-p2: con la pendiente la pieza se desliza sola hasta el contenedor; en una placa plana se quedaría quieta.
- Tiempo total: 10 + 35 + 30 + 30 + 5 + 10 = 120 minutos.
:::
