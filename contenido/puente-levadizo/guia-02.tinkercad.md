---
titulo: El puente en 3D (1): orillas y hojas
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · El puente en 3D (1): orillas y hojas

## Objetivo del día

Conocer las piezas de nuestro puente y diseñar en Tinkercad Codeblocks (diseño 3D con bloques) las dos primeras: la **orilla**, donde va el servo, y la **hoja**, la parte del puente que se levanta.

**Al terminar tendremos:** la orilla y la hoja diseñadas y exportadas en STL, cada una con su copia en espejo (4 archivos).

## Materiales del equipo

- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)
- 1 servo SG90 con su brazo (para mirarlo)
- Bitácora y lápiz

## Parte 1 · Las piezas del puente (10 min)

Nuestro puente es una maqueta hecha de **piezas que se imprimen en 3D y se pegan**. Hoy diseñamos las dos primeras y el próximo sábado las demás.

[IMAGEN 2.1T: puente completo diseñado en Tinkercad: dos orillas con su camino, una hoja bajada y otra levantada, la torre del semáforo, la torre del buzzer y el soporte del sensor]

| Pieza | ¿Cuántas? | ¿Para qué sirve? | ¿Cuándo? |
| --- | --- | --- | --- |
| Orilla | 2 | El camino de los carros. Adentro va el servo | Hoy |
| Hoja | 2 | La parte del puente que se levanta | Hoy |
| Torre del semáforo | 1 | Tapa un servo y lleva los 3 LEDs | Sábado 3 |
| Torre del buzzer | 1 | Tapa el otro servo y lleva el buzzer | Sábado 3 |
| Soporte del sensor | 1 | Sostiene el sensor ultrasónico | Sábado 3 |

Las dos orillas **no son iguales**: una es el **reflejo** de la otra, como tu mano derecha y tu mano izquierda. Con las hojas pasa lo mismo. Por eso hoy diseñamos una orilla y una hoja y luego sacamos su copia en espejo.

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
   - Arriba a la izquierda aparece un nombre inventado (por ejemplo "Tremendous Jaiks-Esboo"). Haz clic sobre él, bórralo y escribe `equipo_NOMBRE_orilla` (cambia NOMBRE por el de tu equipo). Presiona **Enter**.
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

- **Las medidas están en milímetros.** Si escribes 30, la pieza mide 30 mm (3 cm).
- **Cada forma nace con su centro en el plano de trabajo:** la mitad queda arriba y la mitad abajo. Por eso, después de cada forma va un bloque **Mover** que la lleva a su lugar. Para que una forma quede **apoyada** en el plano, en **Z** se escribe la **mitad de su alto**.
- **Un hueco es una forma que se resta.** Se marca tocando el **círculo rayado** del bloque (el círculo de color se pone gris). El hueco se resta de las formas sólidas cuando el programa termina con **Seleccionar todo** y **Group Selection**.

**¿Te perdiste en la vista 3D?** Toca la casita 🏠 que está a la izquierda de la vista.

[IMAGEN 2.2T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

## Parte 3 · La orilla (45 min)

La orilla es un bloque con el camino arriba y tres huecos en una esquina, donde va el servo:

| Hueco | ¿Para qué sirve? |
| --- | --- |
| Cajón | Ahí entra el servo **acostado**, con sus pestañas |
| Ventana | Por ahí asoma la parte del servo que tiene el eje |
| Ranura | Ahí gira el brazo del servo junto con la hoja |

Trabajen en el diseño `equipo_NOMBRE_orilla`. Cada paso es un bloque de forma y, debajo, su bloque **Mover**.

1. **El bloque de la orilla:** un Cubo de 60 × 88 × 30 mm.
   - Toca la categoría **Formas** y arrastra el bloque **Cubo** al área de programa. Ahora dice **Añadir** y tiene un dibujo de cubo.
   - Toca su flecha **›** para ver las medidas: **A**, **L**, **A**, **arista**.
   - El primer **A** es el **ancho** (X): escribe **60**. **L** es el **largo** (Y): **88**. El segundo **A** es el **alto** (Z): **30**. Deja **arista** en **0**.
   - Toca la categoría **Modificar** y arrastra **Mover:** debajo del cubo, hasta que encaje. Escribe **X: 0**, **Y: 0**, **Z: 15** (la mitad de 30, para que quede apoyado).
   - Ejecuta con **▷**: debe aparecer un bloque gris acostado sobre el plano.
2. **La ranura (hueco):** un Cubo de 22 × 12 × 12 mm.
   - Debajo de Mover, otro **Cubo** con primer A = **22**, L = **12**, segundo A = **12**, arista = **0**.
   - Toca su **círculo rayado** para que sea hueco (el círculo de color se pone gris).
   - Debajo, **Mover: X −20, Y 10, Z 26** (con el signo menos en el −20).
3. **La ventana del servo (hueco):** un Cubo de 23.4 × 5 × 10 mm.
   - Otro **Cubo** con primer A = **23.4**, L = **5**, segundo A = **10**, arista = **0**, marcado como **hueco**.
   - Debajo, **Mover: X −11.5, Y 17.5, Z 27**.
4. **El cajón del servo (hueco):** un Cubo de 32.8 × 19 × 10 mm.
   - Otro **Cubo** con primer A = **32.8**, L = **19**, segundo A = **10**, arista = **0**, marcado como **hueco**.
   - Debajo, **Mover: X −11.5, Y 29.5, Z 27**.
5. **Agrupar:** así los huecos se restan del bloque.
   - De **Modificar**, arrastra **Seleccionar todo** debajo del último Mover.
   - Después arrastra **Group Selection** debajo (en esta versión de Tinkercad ese bloque está en inglés: quiere decir "agrupar la selección").
   - Ejecuta con **▷** y gira la vista 3D.
   - **✔ Revisa:** en una esquina de arriba deben verse los tres huecos juntos, como en la imagen. La ranura llega hasta el borde del bloque: ese borde es el que mira al río.
   - Si los huecos salen como cajas transparentes, revisa que **Seleccionar todo** y **Group Selection** estén al final. Si algún hueco salió en otro lugar, revisa los números de su **Mover** (sobre todo los signos menos).

[IMAGEN 2.3T: orilla terminada en Tinkercad Codeblocks, con la ranura en el borde del río y el cajón del servo detrás]

:::pregunta id="g2t-p1"
Los huecos miden un poco más que el servo. ¿Por qué no los hacemos exactamente del mismo tamaño?
:::

6. **Exporta la primera orilla:** `equipo_NOMBRE_orilla_A.stl`.
   - Arriba a la derecha, botón **Compartir**. Se abre la ventana **Exportar y compartir**.
   - En **Descargar un archivo**, toca **.STL**. El archivo se guarda en la carpeta **Descargas** de la computadora.
   - Cámbiale el nombre: clic derecho sobre él → **Cambiar nombre** → `equipo_NOMBRE_orilla_A.stl`.
7. **La orilla en espejo:** agrega **Escala** al final y exporta otra vez.
   - De **Modificar**, arrastra **Escala** debajo de **Group Selection**. Escribe **X: −1**, **Y: 1**, **Z: 1**.
   - Ejecuta con **▷**: la ranura debe pasar al **otro lado** del bloque.
   - Exporta igual que en el paso 6 y nombra el archivo `equipo_NOMBRE_orilla_B.stl`.

## Parte 4 · La hoja (30 min)

La hoja es el tablero por donde pasan los carros, con una baranda a cada lado. En una punta tiene una **oreja**: una pestaña que entra en la ranura de la orilla y donde se pega el brazo del servo. Cuando el servo gira, la hoja sube.

La hoja va en su **propio diseño**, porque al exportar se guarda todo lo que hay en el diseño.

- En Tinkercad: **+ Crear → Codeblocks**. Haz clic en el nombre de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_hoja`. **Enter**.

1. **Tablero:** un Cubo de 80 × 40 × 4 mm.
   - De **Formas**, un **Cubo** con primer A = **80**, L = **40**, segundo A = **4**, arista = **0**.
   - Debajo, **Mover: X 0, Y 0, Z 6**. (Queda 4 mm arriba del plano: ese espacio es para la oreja.)
2. **Barandas:** dos Cubos de 72 × 2 × 6 mm, paradas en los bordes del tablero.
   - Un **Cubo** con primer A = **72**, L = **2**, segundo A = **6**. Debajo, **Mover: X −4, Y 19, Z 11**.
   - Otro **Cubo** igual. Debajo, **Mover: X −4, Y −19, Z 11** (con el signo menos en el −19).
3. **Oreja:** un Cubo de 38 × 4 × 8 mm que sale por una punta, del lado de una baranda.
   - Un **Cubo** con primer A = **38**, L = **4**, segundo A = **8**. Debajo, **Mover: X 39, Y 21, Z 4**.
4. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** gira la vista 3D. Debes ver el tablero con sus dos barandas y, en una punta, la oreja que sobresale hacia afuera, pegada a una baranda.

[IMAGEN 2.4T: hoja del puente en Tinkercad Codeblocks con tablero, barandas y la oreja en una punta]

5. **Exporta la primera hoja:** `equipo_NOMBRE_hoja_A.stl` (**Compartir** → **.STL**, y cambia el nombre en **Descargas**).
6. **La hoja en espejo:** agrega **Escala** debajo de **Group Selection** con **X: −1**, **Y: 1**, **Z: 1**. Ejecuta: la oreja pasa a la otra punta. Exporta `equipo_NOMBRE_hoja_B.stl`.

:::pregunta id="g2t-p2"
Si nuestro servo midiera 2 mm más de largo, ¿qué números de la orilla tendríamos que cambiar y por cuánto?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2t-logramos"
- [ ] Sabemos usar los bloques de Tinkercad.
- [ ] La orilla tiene sus tres huecos en una esquina.
- [ ] La hoja tiene sus barandas y su oreja.
- [ ] Exportamos los 4 archivos: orilla A y B, hoja A y B.
:::

## Reto extra

Dibuja la **línea del centro del camino** en la orilla y en la hoja: rayitas de 8 × 1 mm, separadas 6 mm, que sobresalgan 0,5 mm del camino.

Pista: en la orilla, antes de **Seleccionar todo**, agrega un **Cubo** con primer **A = 8**, **L = 1** y segundo **A = 1**, y muévelo con **Mover: X −21, Y −14, Z 30** (el camino no está en el centro de la orilla: está corrido hacia un lado). Para las siguientes rayitas, cubos iguales con **X = −7**, **X = 7** y **X = 21** (cada una 14 mm más allá: 8 de la rayita + 6 de espacio). En la hoja, las rayitas van con **Y = 0** y **Z = 8**.

## Bitácora (10 min)

:::pregunta id="g2t-b1"
¿Qué fue lo más difícil de diseñar hoy y cómo lo resolvieron?
:::

Antes de irse, junten los 4 `.stl` en un `.zip` (selecciónenlos, clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. Los programas de bloques se quedan guardados en su cuenta de Tinkercad (**Diseños → Codeblocks**).

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí el .zip con los .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Guía reestructurada (versión Tinkercad):** el sábado 2 y el 3 se dedican a diseñar el puente completo en piezas imprimibles. Se quitaron de esta versión la tabla de escala, el boceto y el soporte suelto del servo. Por eso esta guía tiene campos propios (g2t-…): si un equipo cambia de versión, no conserva estas respuestas.
- Diseño completo de referencia en la cuenta del docente: "Puente levadizo - propuesta completa" y un diseño por pieza ("Puente - modelo orilla", "Puente - modelo hoja"…), con los mismos bloques de la guía.
- Medidas del servo usadas: SG90 de 22,8 × 12,2 × 22,5 mm, con pestañas de 32,2 mm. El hueco deja unos 0,3 mm de holgura. La oreja de la hoja queda a 7 mm de la cara del servo, que es el espacio para el brazo. **Antes de imprimir las 2 orillas, conviene probar con un servo de la academia.** Si el cajón queda justo, se agrandan un poco sus medidas (por ejemplo 33.4 × 19.5).
- Los servos quedan en espejo, como en las guías 5 a 7, así que el código `a` y `180 - a` funciona sin cambios.
- La orilla A va a la derecha del río y la B a la izquierda, separadas 16,4 cm. La hoja A va con la orilla A.
- Impresión: las orillas se imprimen tal como salen, con el camino hacia arriba. Las hojas necesitan **soportes** en el programa de impresión, porque la oreja queda debajo del tablero.
- g2t-p1: si el hueco fuera exacto, el servo no entraría o quedaría muy apretado; la impresora no es perfecta (holgura).
- g2t-p2: el primer A (el largo, en X) del cajón y de la ventana, 2 mm más cada uno (32.8 → 34.8 y 23.4 → 25.4). Las Y y Z no cambian.
- Tiempo total: 10 + 20 + 45 + 30 + 5 + 10 = 120 minutos.
:::
