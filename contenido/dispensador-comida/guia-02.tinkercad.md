---
titulo: El dispensador en 3D (1): torre y compuerta
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · El dispensador en 3D (1): torre y compuerta

## Objetivo del día

Conocer las piezas de nuestro dispensador y diseñar en Tinkercad Codeblocks (diseño 3D con bloques) las dos primeras: la **torre** y la **compuerta**.

**Al terminar tendremos:** la torre y la compuerta diseñadas y exportadas en STL.

## Materiales del equipo

- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)
- 1 servo SG90 con su brazo (para mirarlo)
- Bitácora y lápiz

## Parte 1 · Nuestro dispensador (10 min)

Las croquetas bajan desde una botella por un **embudo**. Abajo, una **compuerta** movida por un **servo** tapa la salida; cuando el servo gira, la compuerta se abre y cae una porción en el plato. Todo va en una **torre** que diseñamos e imprimimos nosotros.

[IMAGEN 2.1T: dispensador diseñado en Tinkercad, con etiquetas: botella, embudo con cuello, torre, compuerta, servo, plato, Arduino y protoboard con el botón, el LED y el buzzer]

Las piezas que diseñamos e imprimimos:

| Pieza | ¿Para qué sirve? | ¿Cuándo? |
| --- | --- | --- |
| Torre | Sostiene el embudo arriba y el servo en medio; el plato va en su pie | Hoy |
| Compuerta | Tapa la salida del embudo; el servo la gira para abrir | Hoy |
| Embudo con cuello | Recibe la botella y lleva las croquetas a la compuerta | Sábado 3 |

Lo que **no** se imprime: la botella (una pequeña, de unos 600 ml), el plato, el Arduino y la protoboard con el botón, el LED y el buzzer.

Tomen el servo y busquen sus partes: el **cuerpo** (la cajita), las dos **pestañas** de los lados, el **eje** (donde se encaja el brazo) y el **brazo**.

## Parte 2 · Conociendo Tinkercad Codeblocks (20 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea un diseño de Codeblocks.
   - Arriba a la derecha, botón **+ Crear** → **Codeblocks**.
   - Se abre el editor. Si aparece una ventana de bienvenida o un tutorial, ciérrala.
3. Ponle nombre al diseño.
   - Arriba a la izquierda aparece un nombre inventado (por ejemplo "Tremendous Jaiks-Esboo"). Haz clic sobre él, bórralo y escribe `equipo_NOMBRE_torre` (cambia NOMBRE por el de tu equipo). Presiona **Enter**.
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

Tres reglas que usaremos todo el día:

- **Las medidas están en milímetros.** Si escribes 100, la pieza mide 100 mm (10 cm).
- **Cada forma nace con su centro en el plano de trabajo:** la mitad queda arriba y la mitad abajo. Por eso, después de cada forma va un bloque **Mover** que la lleva a su lugar. Para que una forma quede **apoyada** en el plano, en **Z** se escribe la **mitad de su alto**.
- **Un hueco es una forma que se resta.** Se marca tocando el **círculo rayado** del bloque (el círculo de color se pone gris). El hueco se resta de las formas sólidas cuando el programa termina con **Seleccionar todo** y **Group Selection**.

**¿Te perdiste en la vista 3D?** Toca la casita 🏠 que está a la izquierda de la vista.

[IMAGEN 2.3T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

## Parte 3 · La torre (50 min)

La torre tiene cuatro partes:

| Parte | ¿Para qué sirve? |
| --- | --- |
| Pie | La base. Encima va el plato |
| Pared | Une todo, atrás |
| Repisa del embudo | Arriba, con un agujero redondo donde se mete el embudo |
| Repisa del servo | En medio, con un hueco donde el servo entra parado y queda colgando de sus pestañas |

Trabajen en el diseño `equipo_NOMBRE_torre`. Cada paso es un bloque de forma y, debajo, su bloque **Mover**.

1. **El pie:** un Cubo de 100 × 110 × 4 mm.
   - Toca la categoría **Formas** y arrastra el bloque **Cubo** al área de programa. Ahora dice **Añadir** y tiene un dibujo de cubo.
   - Toca su flecha **›** para ver las medidas: **A**, **L**, **A**, **arista**.
   - El primer **A** es el **ancho** (X): escribe **100**. **L** es el **largo** (Y): **110**. El segundo **A** es el **alto** (Z): **4**. Deja **arista** en **0**.
   - Toca la categoría **Modificar** y arrastra **Mover:** debajo del cubo, hasta que encaje. Escribe **X: 0**, **Y: 55**, **Z: 2**.
2. **La pared:** un Cubo de 100 × 5 × 150 mm, parado atrás.
   - Un **Cubo** con primer A = **100**, L = **5**, segundo A = **150**, arista = **0**.
   - Debajo, **Mover: X 0, Y 2.5, Z 75** (la mitad de 150, para que quede apoyada).
   - Ejecuta con **▷**: debe verse una "L" acostada: el pie y la pared.
3. **La repisa del embudo:** un Cubo de 100 × 95 × 4 mm, arriba de todo.
   - Un **Cubo** con primer A = **100**, L = **95**, segundo A = **4**. Debajo, **Mover: X 0, Y 52.5, Z 148**.
4. **El agujero del embudo (hueco):** un cilindro de 82 mm de ancho que atraviesa la repisa.
   - De **Formas**, arrastra un **Cilindro**. Toca su **›** y escribe **Radio = 41** (la mitad de 82), **A = 10**, **Lados = 32**. Márcalo como **hueco** (círculo rayado).
   - Debajo, **Mover: X 0, Y 55, Z 148**.
5. **La repisa del servo:** un Cubo de 37 × 65 × 4 mm, a media altura, hacia un lado.
   - Un **Cubo** con primer A = **37**, L = **65**, segundo A = **4**. Debajo, **Mover: X −31.5, Y 37.5, Z 78.4** (con el signo menos).
6. **El hueco del servo:** un Cubo de 23.4 × 12.8 × 10 mm, marcado como hueco.
   - Un **Cubo** con primer A = **23.4**, L = **12.8**, segundo A = **10**, marcado como **hueco**.
   - Debajo, **Mover: X −27.5, Y 55, Z 78.4**.
7. **Agrupar:** así los huecos se restan.
   - De **Modificar**, arrastra **Seleccionar todo** debajo del último Mover.
   - Después arrastra **Group Selection** debajo (en esta versión de Tinkercad ese bloque está en inglés: quiere decir "agrupar la selección").
   - Ejecuta con **▷** y gira la vista 3D.
   - **✔ Revisa:** arriba debe verse la repisa con un agujero redondo grande y, en medio, la repisa pequeña con un hueco rectangular, como en la imagen.
   - Si los huecos salen como formas transparentes, revisa que **Seleccionar todo** y **Group Selection** estén al final. Si algo salió en otro lugar, revisa los números de su **Mover** (sobre todo los signos menos).

[IMAGEN 2.3D: torre en Tinkercad Codeblocks: pie, pared, repisa del embudo con su agujero y repisa del servo con su hueco]

8. **Exporta** `equipo_NOMBRE_torre.stl`.
   - Arriba a la derecha, botón **Compartir**. Se abre la ventana **Exportar y compartir**.
   - En **Descargar un archivo**, toca **.STL**. El archivo se guarda en la carpeta **Descargas** de la computadora.
   - Cámbiale el nombre: clic derecho sobre él → **Cambiar nombre** → `equipo_NOMBRE_torre.stl`.

:::pregunta id="g2t-p1"
El servo mide 22,8 × 12,2 mm, pero su hueco mide 23,4 × 12,8 mm. ¿Por qué lo hacemos un poco más grande?
:::

## Parte 4 · La compuerta (25 min)

La compuerta es una paleta que tapa la salida del embudo. En una punta tiene un **encastre**: un cilindro con un agujero donde entra el brazo del servo. Cuando el servo gira, la paleta se corre hacia un lado y las croquetas caen.

La compuerta va en su **propio diseño**, porque al exportar se guarda todo lo que hay en el diseño.

- En Tinkercad: **+ Crear → Codeblocks**. Haz clic en el nombre de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_compuerta`. **Enter**.

1. **Paleta:** un Cubo de 54 × 30 × 3 mm. No se mueve: queda en el centro.
   - De **Formas**, un **Cubo** con primer A = **54**, L = **30**, segundo A = **3**, arista = **0**.
2. **Encastre:** un cilindro de 8 mm de ancho y 5 mm de alto, parado sobre una punta de la paleta.
   - Debajo, un **Cilindro** con **Radio = 4** (8 ÷ 2), **A = 5**, **Lados = 32**.
   - Debajo, **Mover: X −22, Y 0, Z 4**.
3. **Agujero del encastre (hueco):** un cilindro de 5 mm de ancho, donde entra el brazo del servo.
   - Debajo, otro **Cilindro** con **Radio = 2.5** (5 ÷ 2), **A = 6**, **Lados = 32**, marcado como **hueco**.
   - Debajo, **Mover: X −22, Y 0, Z 4.5** (en el mismo lugar que el encastre). Empieza justo encima de la paleta, así la paleta no queda agujereada.
4. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** debes ver la paleta con un cilindro hueco en una punta.

[IMAGEN 2.4D: compuerta en Tinkercad Codeblocks: paleta de 54 × 30 mm con el encastre del servo en una punta]

5. **Exporta** `equipo_NOMBRE_compuerta.stl` (**Compartir** → **.STL**, y cambia el nombre en **Descargas**).

En el dispensador, la compuerta va **boca abajo**: la paleta arriba, pegada a la salida del embudo, y el encastre abajo, encajado en el brazo del servo.

:::pregunta id="g2t-p2"
¿Por qué el encastre va en una punta de la paleta y no en el centro?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2t-logramos"
- [ ] Sabemos usar los bloques de Tinkercad.
- [ ] La torre tiene sus dos repisas con sus huecos.
- [ ] La compuerta tiene su encastre en una punta.
- [ ] Exportamos los 2 archivos: torre y compuerta.
:::

## Reto extra

La repisa del servo está "en el aire", agarrada solo de la pared. Ponle un **refuerzo** debajo: una tablita parada que vaya del pie a la repisa.

Pista: en la torre, antes de **Seleccionar todo**, agrega un **Cubo** con primer **A = 4**, **L = 60** y segundo **A = 72**, y muévelo con **Mover: X −47, Y 35, Z 40**. Queda en la orilla de la repisa, lejos del servo y de las croquetas que caen.

## Bitácora (10 min)

:::pregunta id="g2t-b1"
¿Qué fue lo más difícil de diseñar hoy y cómo lo resolvieron?
:::

Antes de irse, junten los 2 `.stl` en un `.zip` (selecciónenlos, clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. Los programas de bloques se quedan guardados en su cuenta de Tinkercad (**Diseños → Codeblocks**).

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí el .zip con los .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad (Codeblocks), reestructurada el 21 de octubre:** se centra en la práctica. Las guías 2 y 3 terminan el diseño (torre, compuerta y embudo) y desde la Guía 4 se arma lo impreso y se programa. Ya no lleva comparación de mecanismos, prototipo de cartón, boceto ni soporte suelto del servo: la torre lo reemplaza.
- Las piezas son las mismas del lado del cereal del dispensador doble (imágenes 2.3D y 2.4D). Campos propios (g2t-…).
- Diseño completo de referencia en la cuenta del docente: "Dispensador sencillo - propuesta completa". Las piezas por separado son los diseños "Dispensador doble - modelo torre cereal", "… compuerta" y "… embudo".
- Medidas: torre de 10 × 11 × 15 cm. El embudo se apoya con su tapa (90 mm) sobre el agujero de 82 mm, y su salida queda a 10 cm del pie. La compuerta queda 1 mm debajo de la salida. El servo (SG90 de 22,8 × 12,2 mm, pestañas a 15,9 mm de la base) cuelga de la repisa con el eje hacia arriba, y su eje queda a 22 mm del centro de la salida. Si el servo de la academia mide distinto, se ajusta el hueco.
- Plato: de menos de 9 cm de ancho y 5 cm de alto, para que quepa en el pie, debajo del servo.
- Impresión: la torre se imprime **acostada sobre la pared** (la pared en la cama), así las repisas no necesitan soportes. STL de referencia: `Dispensador doble - STL para imprimir\dispensador_torre_cereal.stl` y `dispensador_compuerta.stl`.
- g2t-p1: holgura; la impresora no es exacta y el servo no entraría o quedaría muy apretado.
- g2t-p2: al girar desde una punta, la paleta se corre y destapa la salida; si girara desde el centro, seguiría tapándola.
- Tiempo total: 10 + 20 + 50 + 25 + 5 + 10 = 120 minutos.
:::
