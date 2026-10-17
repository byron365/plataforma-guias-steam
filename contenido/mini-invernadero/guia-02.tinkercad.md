---
titulo: Diseñar la casa de la planta
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Diseñar la casa de la planta

## Objetivo del día

Dibujar el invernadero con medidas y dar los primeros pasos en Tinkercad Codeblocks (diseño 3D con bloques) modelando el soporte del servo y la bisagra de la ventana.

**Al terminar tendremos:** el boceto del invernadero y dos piezas exportadas para imprimir: el soporte del servo y la bisagra.

## Materiales del equipo

- Bitácora, lápiz, regla
- La caja que usaremos (para medirla)
- 1 servo SG90 (para medirlo)
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

## Parte 2 · El boceto (25 min)

Mide la caja del equipo y dibuja el invernadero **de frente** y **de lado**:

Midan con la regla por fuera de la caja: **largo** es el lado más grande de la base, **ancho** el más corto y **alto** desde la mesa hasta arriba.

| Medida de la caja | Valor (cm) |
| --- | --- |
| Largo | |
| Ancho | |
| Alto | |

En el boceto marca:

1. La **maceta** en el centro.
2. La **ventana** en el techo (por ahí sale el aire caliente, porque el aire caliente sube).
3. El **servo** que empuja la ventana.
4. El **depósito de agua**, la **bomba** y la **manguera** que llega a la maceta.
5. Un **compartimento seco**, separado, para el Arduino y la protoboard.

Hagan dos dibujos en la misma hoja: "de frente" (como si miraran la caja de cara) y "de lado" (desde un costado). Escriban las medidas de la caja junto a cada lado.

[IMAGEN 2.1: boceto del invernadero de frente y de lado con la ventana en el techo, el depósito y el compartimento seco]

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

:::pregunta id="g2-p1"
¿Por qué el Arduino debe ir en un compartimento separado?
:::

## Parte 3 · Conociendo Tinkercad Codeblocks (15 min)

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

[IMAGEN 2.2T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

## Parte 4 · El soporte del servo (25 min)

El soporte es una caja con un **hueco** donde entra el servo. En Tinkercad, un hueco es una forma marcada como **hueco**: al **agrupar**, se resta de las formas sólidas y deja el espacio vacío.

1. **Caja exterior:** un Cubo de 32 × 18 × 20 mm.
   - En el diseño `equipo_NOMBRE_soporte`, toca la categoría **Formas** y arrastra el bloque **Cubo** al área de programa. Ahora dice **Añadir**.
   - Toca su flecha **›**: el primer **A** es el **ancho** (X): **32**. **L** es el **largo** (Y): **18**. El segundo **A** es el **alto** (Z): **20**. **arista** = **0**.
2. **Hueco:** otro Cubo de 23.4 × 12.8 × 18 mm, marcado como hueco (un poco más grande que el servo: la **holgura**).
   - Arrastra otro **Cubo** justo debajo del primero, toca su **›** y escribe: primer A = **23.4**, L = **12.8**, segundo A = **18**, arista = **0**.
   - Toca su **círculo rayado**: el círculo de color se pone gris. Eso significa que es un **hueco**.
   - De **Modificar**, arrastra **Mover:** debajo y escribe **X: 0**, **Y: 0**, **Z: 2**. El hueco sube 2 mm: abajo queda un piso de 3 mm y arriba el hueco sale de la caja.
3. **Agrupar:** de **Modificar**, arrastra **Seleccionar todo** y debajo **Group Selection** (este bloque aparece en inglés: quiere decir "agrupar la selección").
   - Ejecuta con **▷**. **✔ Revisa:** gira la vista 3D: la caja debe tener el hueco arriba. Si sale sólida, revisa que el segundo cubo tenga el círculo de color en gris.
4. Exporta `equipo_NOMBRE_soporte.stl`.
   - Arriba a la derecha, **Compartir** → en **Descargar un archivo**, toca **.STL**. El archivo queda en **Descargas**.
   - Si no se llama `equipo_NOMBRE_soporte.stl`, cámbiale el nombre: clic derecho → **Cambiar nombre**.

[IMAGEN 2.3T: soporte del servo terminado en Tinkercad Codeblocks]

## Parte 5 · La bisagra (25 min)

La bisagra tiene dos **hojas** que giran sobre un **pasador** (un palito de pincho). Va en **otro diseño**, porque al exportar se guarda todo lo que hay en el diseño.

Recuerda: cada forma nace **centrada** (en X = 0, Y = 0, Z = 0), **Mover** mueve la última forma que agregaste y **Girar alrededor** (de Modificar) la gira desde su centro.

1. Diseño nuevo: **+ Crear → Codeblocks**, con el nombre `equipo_NOMBRE_bisagra`.
2. **Hoja:** un **Cubo** con primer **A = 30**, **L = 20**, segundo **A = 3**, **arista = 0**. No lo muevas.
3. **Nudillo:** un cilindro de 6 mm de diámetro y 30 mm de largo, acostado en el borde de la hoja.
   - Debajo, un **Cilindro** con **Radio = 3** (6 ÷ 2), **A = 30**, **Lados = 32**, **arista = 0**.
   - **Acostarlo:** de **Modificar**, arrastra **Girar alrededor** debajo. Cambia **Eje x** por **Eje y** y escribe **90** grados. Ahora va a lo largo de la hoja.
   - Debajo, **Mover: X 0, Y 10, Z 0**. (La hoja mide 20 en Y, así que su borde está en Y = 10.)
4. **Agujero del pasador:** un cilindro de **3 mm** de diámetro y 40 mm de largo, hueco, en el mismo lugar.
   - Debajo, otro **Cilindro** con **Radio = 1.5**, **A = 40**, **Lados = 32**, marcado como **hueco** (círculo rayado).
   - Debajo, **Girar alrededor** con **Eje y** y **90** grados, y luego **Mover: X 0, Y 10, Z 0**.
5. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa** mirando de lado: debe verse un círculo con agujero en el borde de la hoja.
   - Esa es una hoja de la bisagra; se imprimen **dos** y se unen con el palito.

[IMAGEN 2.4T: hoja de bisagra en Tinkercad Codeblocks con su nudillo y el agujero para el pasador]

:::pregunta id="g2-p2"
El palito mide unos 2,5 mm. ¿Por qué el agujero mide 3 mm?
:::

6. Exporta `equipo_NOMBRE_bisagra.stl`.
   - **Compartir** → **.STL**, y cámbiale el nombre si hace falta.
   - Solo se exporta **una** hoja: el docente imprime dos copias.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Revisamos las plantas.
- [ ] El boceto tiene medidas y todas sus partes.
- [ ] Modelamos el soporte del servo.
- [ ] Modelamos la bisagra.
- [ ] Exportamos las dos piezas en STL.
:::

## Reto extra

Agrega dos agujeros de 3 mm en cada hoja de la bisagra para atornillarla o coserla a la caja.

Pista: en el diseño de la bisagra, antes de **Seleccionar todo**, agrega dos **Cilindros** huecos con **Radio = 1.5** y **A = 10** (parados, sin girar), en la parte plana de la hoja y lejos del nudillo (por ejemplo **Mover: X −8, Y −4, Z 0** y **Mover: X 8, Y −4, Z 0**). Ejecuta y vuelve a exportar.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Qué bloque de Tinkercad nos pareció más útil?
:::

Antes de irse, guarden juntos en un `.zip` los dos `.stl` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. Los diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**).

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí los .stl que exportaron (o el .zip). Sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir esta semana: 1 soporte y 2 hojas de bisagra por equipo (≈1 h en total).
- Si la caja es de plástico delgado, la bisagra se puede pegar con silicona; si es de cartón, también sirve una bisagra de cinta.
- g2-p2: holgura para que el pasador gire sin trabarse.
- **Versión Tinkercad (Codeblocks):** mismas piezas y medidas que la versión Blender, en dos diseños (soporte y bisagra). Las formas nacen centradas en el origen, como en Blender. Tinkercad necesita internet y una cuenta por equipo (o una clase de Tinkercad).
- Tiempo total: 10 + 25 + 15 + 25 + 25 + 5 + 15 = 120 minutos.
:::
