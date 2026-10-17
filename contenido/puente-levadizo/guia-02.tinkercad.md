---
titulo: Un puente a escala
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Un puente a escala

## Objetivo del día

Calcular las medidas del puente a escala, dibujar el boceto y dar los primeros pasos en Tinkercad Codeblocks (diseño 3D con bloques) modelando el soporte del servo.

**Al terminar tendremos:** el boceto con medidas a escala y el soporte del servo listo para imprimir.

## Materiales del equipo

- Bitácora, lápiz, regla y calculadora
- 1 servo SG90 (para medirlo)
- Regla o calibrador en milímetros
- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)

## Parte 1 · ¿Qué es una escala? (15 min)

Una maqueta es una copia pequeña de algo real. La **escala** dice cuántas veces más pequeña es. Usaremos **1:200**: 1 cm de la maqueta representa 200 cm (2 m) del puente real.

> Medida de la maqueta = Medida real ÷ 200

Prueben la animación: cambien la medida real y miren cuánto mide en la maqueta.

:::animacion tipo="escala"
:::

## Parte 2 · Calcular el puente (20 min)

Pasa las medidas del Tower Bridge a centímetros y divide entre 200:

1. **Metros a centímetros:** multiplica por 100 (1 m = 100 cm). Por ejemplo, 61 m × 100 = 6100 cm.
2. **A escala:** divide los centímetros entre 200 con la calculadora.
3. La primera fila ya está resuelta como ejemplo. Completen las demás de la misma forma.

:::tabla id="g2-escala"
| Parte | Medida real | En cm | ÷ 200 = maqueta (cm) |
| --- | --- | --- | --- |
| Tramo que se abre | 61 m | 6100 | 30,5 |
| Cada hoja (la mitad) | 30,5 m | | |
| Altura de las torres | 65 m | | |
| Ancho del puente | 18 m | | |
:::

:::pregunta id="g2-p1"
Si la torre de nuestra maqueta midiera 50 cm, ¿cuánto mediría la torre real con escala 1:200?
:::

## Parte 3 · El boceto (20 min)

Dibuja el puente **de lado** en la bitácora con las medidas de la tabla:

"De lado" es como si lo vieras desde la orilla del río: las torres paradas, el río en medio y las hojas cruzándolo. Si la hoja no alcanza, dibujen a una escala más pequeña (por ejemplo, todo a la mitad) y escriban la medida real de la maqueta junto a cada parte.

1. Las dos torres y la base.
2. Las dos hojas del puente, abajo (cerradas) y con línea punteada arriba (abiertas).
3. Marca dónde va cada **servo** (en el punto de giro de cada hoja).
4. Marca dónde van el **sensor**, el **semáforo** y el **buzzer**.

[IMAGEN 2.1: ejemplo de boceto lateral del puente con medidas, hojas abiertas en punteado y ubicación de servos y sensor]

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

[IMAGEN 2.2T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

## Parte 5 · Modelar el soporte del servo (35 min)

El soporte es una caja con un hueco donde entra el servo, y se pega en la base al pie de cada torre.

1. **Mide el servo:**
   - Con el calibrador: abre las puntas, pon el servo entre ellas y ciérralas hasta que lo toquen, sin apretar. Lee los milímetros.
   - Mide solo la cajita (el **cuerpo**), sin las pestañas de los lados y sin el eje.

| Medida del servo | Valor (mm) |
| --- | --- |
| Largo del cuerpo | |
| Ancho del cuerpo | |
| Alto del cuerpo | |

En Tinkercad, un hueco es una forma marcada como **hueco**: al **agrupar**, se resta de las formas sólidas y deja el espacio vacío.

2. **Caja exterior:** un Cubo de 32 × 18 × 20 mm.
   - En el diseño `equipo_NOMBRE_soporte`, toca la categoría **Formas** y arrastra el bloque **Cubo** al área de programa. Ahora dice **Añadir** y tiene un dibujo de cubo.
   - Toca la flecha **›** del bloque para ver sus medidas: **A**, **L**, **A**, **arista**.
   - El primer **A** es el **ancho** (X): escribe **32**. **L** es el **largo** (Y): **18**. El segundo **A** es el **alto** (Z): **20**. Deja **arista** en **0**.
3. **Hueco:** otro Cubo de 23.4 × 12.8 × 18 mm, marcado como hueco. Mide un poco más que el servo: es la **holgura**.
   - Arrastra otro **Cubo** y suéltalo justo debajo del primero, hasta que encaje.
   - Toca su **›** y escribe: primer A = **23.4**, L = **12.8**, segundo A = **18**, arista = **0**. Compara estas medidas con las del servo que mediste.
   - En el bloque hay dos círculos: el de color (el color de la pieza) y uno **rayado**. Toca el **círculo rayado**: el círculo de color se pone gris. Eso significa que esta forma es un **hueco**.
4. **Subir el hueco 2 mm** para que el soporte tenga piso.
   - Toca la categoría **Modificar** y arrastra el bloque **Mover:** debajo del hueco.
   - Escribe **X: 0**, **Y: 0**, **Z: 2**. El bloque Mover mueve la **última forma** que agregaste: el hueco sube 2 mm, así abajo queda un piso de 3 mm y arriba el hueco sale de la caja.
5. **Agrupar:** así el hueco se resta de la caja.
   - De **Modificar**, arrastra **Seleccionar todo** debajo de Mover.
   - Después arrastra **Group Selection** debajo de Seleccionar todo (en esta versión de Tinkercad ese bloque está en inglés: quiere decir "agrupar la selección").
   - Ejecuta con **▷** (abajo). En la vista 3D debe aparecer la caja con el hueco arriba. Gírala para ver adentro.
   - **✔ Revisa:** si la caja sale sólida, revisa que el segundo cubo tenga el círculo de color en gris (hueco) y que Seleccionar todo y Group Selection estén al final.

[IMAGEN 2.3T: soporte del servo terminado en Tinkercad Codeblocks con su hueco]

6. Exporta `equipo_NOMBRE_soporte.stl`. Se imprimen **dos**.
   - Arriba a la derecha, botón **Compartir**. Se abre la ventana **Exportar y compartir**.
   - En **Descargar un archivo**, toca **.STL**. El archivo se guarda en la carpeta **Descargas** de la computadora.
   - Si no se llama `equipo_NOMBRE_soporte.stl`, cámbiale el nombre: clic derecho sobre él → **Cambiar nombre**.
   - Se exporta uno solo: el docente imprime dos copias.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Completamos la tabla de escala.
- [ ] El boceto tiene medidas y la ubicación de servos y sensor.
- [ ] Sabemos usar los bloques de Tinkercad.
- [ ] El soporte tiene su hueco y está exportado en STL.
:::

## Reto extra

Haz una ranura de 8 × 4 mm en una pared del soporte para que salgan los cables del servo.

Pista: antes de **Seleccionar todo**, agrega otro **Cubo** marcado como **hueco** con primer **A = 10** (más largo que el grueso de la pared, para que la atraviese), **L = 8** y segundo **A = 4**, y muévelo con **Mover: X 14, Y 0, Z 8** (arriba, en una de las paredes cortas).

## Bitácora (10 min)

:::pregunta id="g2-b1"
¿Para qué sirve hacer una maqueta a escala antes de construir algo real?
:::

:::pregunta id="g2-b2"
¿Por qué el hueco es un poco más grande que el servo?
:::

Antes de irse, suban aquí `equipo_NOMBRE_soporte.stl`. El programa de bloques se queda guardado en su cuenta de Tinkercad (**Diseños → Codeblocks**).

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí el .stl que exportaron. Su diseño de bloques queda guardado en Tinkercad: en cualquier computadora entran con la misma cuenta y lo abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Resultados: hoja 15,25 cm; torres 32,5 cm; ancho 9 cm. g2-p1: 50 × 200 = 10 000 cm = 100 m.
- Si las torres a escala quedan muy altas para la base, se pueden hacer de 25 cm: comentar que en las maquetas a veces se ajusta la escala de alguna parte.
- Imprimir los soportes esta semana (≈30 min cada uno).
- **Versión Tinkercad (Codeblocks):** mismas piezas y medidas que la versión Blender. En Codeblocks las formas nacen centradas en el origen, igual que en Blender, así que los números de Mover son las mismas Posiciones. Tinkercad necesita internet y una cuenta para cada equipo (o una clase de Tinkercad).
- El hueco se resta solo al **agrupar**: el programa debe terminar con **Seleccionar todo** y **Group Selection** (este bloque aparece en inglés).
- Tiempo total: 15 + 20 + 20 + 15 + 35 + 5 + 10 = 120 minutos.
:::
