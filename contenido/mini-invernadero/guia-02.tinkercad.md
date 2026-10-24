---
titulo: Las piezas del invernadero en 3D
guia: 2
sabado: 2
sesion: Diseño 3D
duracion: 120
---

# Guía 2 · Las piezas del invernadero en 3D

## Objetivo del día

Conocer cómo será nuestro invernadero y diseñar en Tinkercad Codeblocks sus tres piezas impresas: el **soporte del servo**, la **bisagra** de la ventana y el **clip** de la manguera.

**Al terminar tendremos:** las tres piezas exportadas en STL y listas para imprimir.

## Materiales del equipo

- Un servo SG90 y la manguera de la bomba (para medirlos)
- Regla o calibrador
- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)

## Parte 1 · Revisar las plantas (10 min)

Cada sábado empezamos revisando las dos macetas:

- **¿Ya germinó?** Si ya salió de la tierra algún brote verde.
- **Altura:** pon la regla parada en la tierra, junto a la planta más alta, y mide hasta la punta. Si no ha salido, escribe 0.
- **Observaciones:** color, si la tierra está seca o húmeda, si hay hojitas…

:::tabla id="g2-plantas"
| Maceta | ¿Ya germinó? | Altura (cm) | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Nuestro invernadero (10 min)

El invernadero es una caja con la **maceta** adentro. Un **depósito** con una **bomba** riega la tierra por una **manguera**; una **ventana** en el techo se abre con un **servo** cuando hace calor; y el Arduino va en un **compartimento seco**, lejos del agua.

[IMAGEN 2.1T: mini invernadero diseñado en Tinkercad, con etiquetas: clip de la manguera, manguera, planta, depósito de agua con la bomba, maceta, ventana del techo, palito que empuja la ventana, bisagra impresa, servo en su soporte impreso, sensor de temperatura, sensor de humedad, caja y compartimento seco]

Las piezas que diseñamos hoy (el docente las imprime para los sábados 4 y 5):

| Pieza | ¿Para qué sirve? | ¿Cuántas se imprimen? |
| --- | --- | --- |
| Soporte del servo | Sostiene el servo bajo el techo, junto a la ventana | 1 |
| Bisagra | La ventana gira sobre ella; dos hojas unidas por un palito de pincho | 2 hojas |
| Clip de la manguera | Sostiene la manguera sobre la maceta | 1 |

## Parte 3 · Conociendo Tinkercad Codeblocks (15 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea un diseño de Codeblocks.
   - Arriba a la derecha, botón **+ Crear** → **Codeblocks**. Si aparece una ventana de bienvenida o un tutorial, ciérrala.
3. Ponle nombre al diseño.
   - Arriba a la izquierda aparece un nombre inventado. Haz clic sobre él, bórralo y escribe `equipo_NOMBRE_soporte` (cambia NOMBRE por el de tu equipo). Presiona **Enter**.
   - El diseño se guarda solo mientras trabajas. Lo encuentras otra vez en Tinkercad: **Diseños → Codeblocks**.

[IMAGEN 2.2T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

| Acción | Cómo se hace |
| --- | --- |
| Agregar un bloque | Arrástralo desde la izquierda al área de programa |
| Unir dos bloques | Suelta un bloque justo debajo de otro: encaja como una pieza de rompecabezas |
| Borrar un bloque | Arrástralo de vuelta a la columna de bloques de la izquierda |
| Ver las medidas de una forma | Toca la flecha **›** del bloque. Para ocultarlas, toca **‹** |
| Cambiar un número | Haz clic en el número, borra, escribe el nuevo y haz clic afuera. Usa **punto** para decimales (23.4) |
| Ver la pieza | Botón **▷** de abajo. En la vista 3D: arrastra con el mouse para girarla (si no gira, prueba con el botón derecho) y usa la rueda para acercar |
| Deshacer | Flecha **↶** de arriba a la izquierda del área de programa |

- **Las medidas están en milímetros.** Si escribes 32, la pieza mide 32 mm.
- Cada forma nueva aparece **centrada**: su centro queda en X = 0, Y = 0, Z = 0. Con **Mover** la llevan a su lugar.
- Un **hueco** es una forma que se resta: se marca tocando su **círculo rayado** (el círculo de color se pone gris) y se resta al **agrupar**.
- **¿Te perdiste en la vista 3D?** Toca la casita 🏠 que está a la izquierda de la vista.

## Parte 4 · El soporte del servo (20 min)

El soporte es una caja con un **hueco** donde entra el servo, un poco más grande que él (la **holgura**).

[IMAGEN 2.3T: soporte del servo en Tinkercad Codeblocks, con etiquetas: hueco del servo de 23.4 × 12.8 mm y caja de 32 × 18 × 20 mm]

1. **Caja exterior:** en el diseño `equipo_NOMBRE_soporte`, de **Formas** arrastra un **Cubo**. Toca su **›**: primer **A = 32** (ancho), **L = 18** (largo), segundo **A = 20** (alto), **arista = 0**.
2. **Hueco:** debajo, otro **Cubo** con primer **A = 23.4**, **L = 12.8**, segundo **A = 18**, **arista = 0**. Toca su **círculo rayado** para que sea hueco.
   - De **Modificar**, arrastra **Mover:** debajo y escribe **X: 0**, **Y: 0**, **Z: 2**. El hueco sube 2 mm: abajo queda un piso de 3 mm y arriba el hueco sale de la caja.
3. **Agrupar:** de **Modificar**, **Seleccionar todo** y debajo **Group Selection** (este bloque aparece en inglés: quiere decir "agrupar la selección").
   - Ejecuta con **▷**. **✔ Revisa:** gira la vista 3D: la caja debe tener el hueco arriba. Si sale sólida, revisa que el segundo cubo tenga el círculo en gris.
4. **Exporta** `equipo_NOMBRE_soporte.stl`: arriba a la derecha, **Compartir** → **.STL**. Si en **Descargas** no se llama así, cámbiale el nombre (clic derecho → **Cambiar nombre**).

## Parte 5 · La bisagra (25 min)

Cada hoja de la bisagra es una placa con un **nudillo** (un cilindro acostado) con un agujero para el **pasador** (un palito de pincho). Se imprimen dos hojas iguales.

[IMAGEN 2.4T: hoja de bisagra en Tinkercad Codeblocks, con etiquetas: hoja de 30 × 20 × 3 mm, nudillo y agujero del pasador]

Recuerda: **Girar alrededor** (de Modificar) gira la última forma desde su centro.

1. Diseño nuevo: **+ Crear → Codeblocks**, con el nombre `equipo_NOMBRE_bisagra`.
2. **Hoja:** un **Cubo** con primer **A = 30**, **L = 20**, segundo **A = 3**, **arista = 0**. No lo muevas.
3. **Nudillo:** un **Cilindro** con **Radio = 3**, **A = 30**, **Lados = 32**.
   - **Acostarlo:** debajo, **Girar alrededor** con **Eje y** y **90** grados.
   - Debajo, **Mover: X 0, Y 10, Z 0**. (La hoja mide 20 en Y, así que su borde está en Y = 10.)
4. **Agujero del pasador:** otro **Cilindro** con **Radio = 1.5**, **A = 40**, **Lados = 32**, marcado como **hueco**. Debajo, **Girar alrededor** con **Eje y** y **90**, y **Mover: X 0, Y 10, Z 0**.
5. **Seleccionar todo**, **Group Selection** y ejecuta. **✔ Revisa** mirando de lado: un círculo con agujero en el borde de la hoja.
6. **Exporta** `equipo_NOMBRE_bisagra.stl`. Solo se exporta **una** hoja: el docente imprime dos.

:::pregunta id="g2t-p1"
El palito mide unos 2,5 mm. ¿Por qué el agujero mide 3 mm?
:::

## Parte 6 · El clip de la manguera (20 min)

El clip se pega en la pared, encima de la maceta, y sostiene la manguera para que el agua caiga en la tierra. Tiene un **anillo** abierto donde la manguera entra a presión y una **pestaña** para pegarlo.

[IMAGEN 2.5T: clip de la manguera en Tinkercad Codeblocks, con etiquetas: anillo con el hueco de la manguera, abertura y pestaña para pegar]

Primero midan el diámetro de la manguera **por fuera**, con el calibrador o la regla:

:::tabla id="g2t-manguera"
| Medida | Ejemplo (mm) | Nuestra medida (mm) |
| --- | --- | --- |
| Diámetro de la manguera | 7 | |
| Radio del hueco = (diámetro + 0.5) ÷ 2 | 3.75 | |
:::

1. Diseño nuevo: `equipo_NOMBRE_clip`.
2. **Anillo:** un **Cilindro** con **Radio = 6**, **A = 8**, **Lados = 32**.
3. **Hueco de la manguera:** otro **Cilindro** hueco con **Radio = 3.75** (o el de su tabla) y **A = 20**. No lo muevas: queda en el centro del anillo.
4. **Abertura:** un **Cubo** hueco con primer **A = 4**, **L = 10**, segundo **A = 20**. Debajo, **Mover: X 0, Y 6, Z 0**: se "come" un pedacito del anillo.
5. **Pestaña:** un **Cubo** (sólido) con primer **A = 20**, **L = 10**, segundo **A = 2**. Debajo, **Mover: X 0, Y −10, Z 0**, del lado contrario a la abertura.
6. **Seleccionar todo**, **Group Selection** y ejecuta. **✔ Revisa** desde arriba (cara **SUPERIOR** del cubito de vistas): el anillo como una letra C, con la pestaña del otro lado.
7. **Exporta** `equipo_NOMBRE_clip.stl`.

## ¿Lo logramos? (5 min)

:::checklist id="g2t-logramos"
- [ ] Revisamos las plantas.
- [ ] Exportamos el soporte del servo.
- [ ] Exportamos la bisagra.
- [ ] Exportamos el clip de la manguera.
:::

## Reto extra

Agrega dos agujeros de 3 mm en la hoja de la bisagra para atornillarla o coserla a la caja.

Pista: antes de **Seleccionar todo**, dos **Cilindros** huecos con **Radio = 1.5** y **A = 10** (parados, sin girar), en la parte plana de la hoja y lejos del nudillo (por ejemplo **Mover: X −8, Y −4, Z 0** y **Mover: X 8, Y −4, Z 0**). Ejecuta y vuelve a exportar.

## Bitácora (15 min)

:::pregunta id="g2t-b1"
¿Qué bloque de Tinkercad nos pareció más útil y por qué?
:::

Antes de irse, guarden juntos en un `.zip` los tres `.stl` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí.

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí los .stl que exportaron (o el .zip). Sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, reestructurada el 23 de octubre** (más práctica, como el Puente y el Laberinto): se quita el boceto y se diseñan aquí las tres piezas (el clip venía en la Guía 3). Campos propios (g2t-…); la tabla de plantas mantiene su campo.
- Diseños de referencia en la cuenta del docente: "Mini invernadero - propuesta completa" (caja sin la pared de adelante, de 30 × 20 × 20 cm de ejemplo) e "Invernadero - modelo piezas".
- Imprimir esta semana: 1 soporte, 2 hojas de bisagra y 1 clip por equipo (≈ 1 h 10 min en total).
- g2t-p1: holgura para que el pasador gire sin trabarse.
- Si la caja es de plástico delgado, la bisagra se pega con silicona; si es de cartón, también sirve una bisagra de cinta.
- Tiempo total: 10 + 10 + 15 + 20 + 25 + 20 + 5 + 15 = 120 minutos.
:::
