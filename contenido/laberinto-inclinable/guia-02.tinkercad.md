---
titulo: Diseñar el laberinto
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Diseñar el laberinto

## Objetivo del día

Diseñar el laberinto del equipo en papel cuadriculado usando coordenadas y empezar a modelarlo en Tinkercad Codeblocks (diseño 3D con bloques).

**Al terminar tendremos:** el laberinto dibujado con coordenadas y el tablero con sus bordes y las primeras paredes en Tinkercad.

## Materiales del equipo

- Papel cuadriculado, regla y lápiz
- Computadora con internet y cuenta de Tinkercad (la del equipo o la que indique el docente)
- Una canica (para medir)

## Parte 1 · Las medidas del tablero (15 min)

Midan el diámetro de la canica con el calibrador (ciérrenlo suavemente sobre ella) o, si no hay, con la regla entre dos libros paralelos.

| Parte | Medida |
| --- | --- |
| Tablero | 180 × 180 mm, 3 mm de grosor |
| Cuadrícula | 7 × 7 casillas de 25 mm |
| Paredes | 3 mm de grosor y 12 mm de alto |
| Canica | Mídela: ______ mm de diámetro |

:::pregunta id="g2-p1"
Si la casilla mide 25 mm y la pared 3 mm, ¿cuánto espacio queda para que pase la canica? ¿Cabe la canica del equipo?
:::

## Parte 2 · El laberinto en papel (30 min)

1. Dibuja un cuadro de 7 × 7 casillas en el papel cuadriculado.
   - Usen casillas grandes, por ejemplo de 2 × 2 cuadritos del papel, para que se vea bien.
2. Nombra las columnas con letras (**A** a **G**) y las filas con números (**1** a **7**), como en el juego de batalla naval.
   - Letras arriba, de izquierda a derecha. Números a la izquierda, de **abajo hacia arriba** (la fila 1 abajo), igual que en Tinkercad.
3. Marca la **salida** en la casilla A1 y la **meta** en una casilla lejana.
4. Dibuja las paredes. Reglas:
   - Debe haber **un solo camino** correcto de la salida a la meta.
   - Al menos **3 callejones sin salida**.
   - Ninguna pared puede tapar la meta por completo.
   - Las paredes van siempre sobre las **líneas** entre casillas, nunca en medio de una casilla.
   - Usen lápiz: es normal borrar y probar varias veces.

[IMAGEN 2.1: ejemplo de laberinto de 7 por 7 casillas en papel cuadriculado con letras, números, salida y meta]

5. Escribe el camino correcto con coordenadas: A1 → A2 → B2 → ...
   - Pidan a alguien de otro equipo que resuelva su laberinto con el dedo: si se pierde o encuentra dos caminos, revísenlo.

:::pregunta id="g2-p2"
Escribe el camino correcto de tu laberinto usando coordenadas.
:::

:::foto id="g2-boceto"
Foto del laberinto en papel.
:::

## Parte 3 · De casillas a milímetros (15 min)

En Tinkercad el centro del tablero es el punto (0, 0). Cada casilla mide 25 mm, así que los centros de las columnas son:

Completen los espacios: de una columna a la siguiente se suman 25 mm.

| Columna | A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- | --- |
| X (mm) | −75 | −50 | | 0 | | | 75 |

Las filas funcionan igual en el eje Y: fila 1 = −75, fila 7 = 75.

Comprueben en la animación dónde cae cada casilla:

:::animacion tipo="coordenadas-3d" modo="tablero"
:::

:::pregunta id="g2-p3"
¿Cuáles son las coordenadas X, Y en milímetros de la casilla de tu meta?
:::

## Parte 4 · El tablero en Tinkercad (35 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet.

1. Crea el diseño.
   - Entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente. Si la página está en inglés, al final de la página elige **Español**.
   - Arriba a la derecha: **+ Crear → Codeblocks**. Si aparece un tutorial, ciérralo.
   - Haz clic en el nombre de arriba a la izquierda (un nombre inventado), bórralo y escribe `equipo_NOMBRE_laberinto`. **Enter**. El diseño se guarda solo; lo encuentras en **Diseños → Codeblocks**.

Conoce el editor:

| Parte | Para qué sirve |
| --- | --- |
| Categorías (círculos de colores a la izquierda) | **Formas** trae las piezas (Cubo, Cilindro…); **Modificar** trae Mover, Girar, Seleccionar todo… |
| Área de programa (centro) | Ahí se arrastran y se unen los bloques, uno debajo de otro |
| Vista 3D (derecha) | Ahí aparece la pieza al ejecutar |
| Botón **▷** (abajo) | Ejecuta el programa |

| Acción | Cómo se hace |
| --- | --- |
| Agregar un bloque | Arrástralo desde la izquierda al área de programa |
| Unir bloques | Suelta un bloque justo debajo de otro, hasta que encaje |
| Borrar un bloque | Arrástralo de vuelta a la columna de bloques |
| Ver las medidas de una forma | Toca la flecha **›** del bloque |
| Cambiar un número | Clic en el número, escribe el nuevo y clic afuera. Decimales con **punto** (88.5) |
| Mirar la pieza | En la vista 3D, arrastra con el mouse para girarla (si no gira, con el botón derecho) y usa la rueda para acercar. La casita 🏠 vuelve a la vista inicial |

- **Las medidas están en milímetros.**
- Cada forma nace **centrada** en X = 0, Y = 0, Z = 0. El bloque **Mover** (de Modificar) mueve la **última forma** que agregaste: con él la ponen en su lugar.
- El **Cubo** pide **A** (ancho, X), **L** (largo, Y), **A** (alto, Z) y **arista** (déjenla en 0).

2. **Tablero:** un Cubo de 180 × 180 × 3 mm.
   - De **Formas**, arrastra un **Cubo** y toca su **›**: primer **A = 180**, **L = 180**, segundo **A = 3**, **arista = 0**. No lo muevas.
3. **Bordes:** cuatro Cubos de 3 mm de grueso y 12 mm de alto alrededor del tablero.
   - **Borde de arriba:** **Cubo** con primer **A = 180**, **L = 3**, segundo **A = 12**. Debajo, **Mover: X 0, Y 88.5, Z 7.5**.
   - **Borde de abajo:** otro **Cubo** igual y **Mover: X 0, Y −88.5, Z 7.5**.
   - **Borde derecho:** **Cubo** con primer **A = 3**, **L = 180**, segundo **A = 12** (el largo va en L, así no hay que girarlo). Debajo, **Mover: X 88.5, Y 0, Z 7.5**.
   - **Borde izquierdo:** otro igual y **Mover: X −88.5, Y 0, Z 7.5**.
   - Ejecuta con **▷** y revisa que el tablero tenga sus cuatro bordes.

**Cómo ubicar las paredes del laberinto:** cada pared va sobre una línea entre casillas.

- Una **pared horizontal** (separa una fila de otra) es un Cubo con primer **A = 25** (o 50, 75… si abarca varias casillas), **L = 3**, segundo **A = 12**. En su **Mover**, la **X** es el centro de su columna (de tu tabla) y la **Y** es la línea entre filas: −62.5, −37.5, −12.5, 12.5, 37.5 o 62.5.
- Una **pared vertical** (separa una columna de otra) es un Cubo con primer **A = 3**, **L = 25** (o más), segundo **A = 12**. En su **Mover**, la **Y** es el centro de su fila y la **X** es la línea entre columnas: −62.5, −37.5, −12.5, 12.5, 37.5 o 62.5.
- En todas las paredes, la **Z** del Mover es **7.5** (paradas sobre el tablero).
- Si una pared abarca dos casillas (largo 50), su centro queda justo en la línea entre esas dos casillas.

4. Modela las **primeras 5 paredes** de tu laberinto: para cada una, un **Cubo** con sus medidas y debajo su **Mover**.
   - Ejecuta con **▷** después de cada pared y compárala con el dibujo en papel. Para mirar desde arriba, toca la cara **SUPERIOR** del cubito de vistas de la vista 3D.
   - Si una pared quedó mal, solo cambia los números de su bloque: no hay que borrarla.

[IMAGEN 2.2T: tablero de 180 por 180 mm en Tinkercad Codeblocks con sus cuatro bordes y las primeras paredes del laberinto]

5. El diseño se guarda solo. El sábado 3 seguirán en él.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] El laberinto en papel cumple las reglas.
- [ ] Escribimos el camino con coordenadas.
- [ ] Completamos la tabla de columnas en mm.
- [ ] El tablero tiene sus 4 bordes en Tinkercad.
- [ ] Modelamos las primeras paredes.
:::

## Reto extra

Usa el bloque **Repetir** para hacer una fila de paredes iguales de un solo golpe.

Pista: después de una pared (su Cubo y su Mover), agrega de **Controlar** el bloque **Repetir** con 3 veces y, **dentro**, de **Modificar** el bloque **Copiar** y debajo un **Mover** con 25 en el eje de la fila (X o Y). Cada vuelta copia la última pared y la corre 25 mm.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Para qué sirven las coordenadas al pasar el diseño del papel a Tinkercad?
:::

:::pregunta id="g2-b2"
¿Qué fue lo más difícil de diseñar un laberinto con un solo camino?
:::

El diseño de bloques queda guardado en su cuenta de Tinkercad (**Diseños → Codeblocks**): el sábado 3 terminarán las paredes.

:::archivo id="g2-archivo"
**Archivo de trabajo:** su diseño de bloques queda guardado en Tinkercad: en cualquier computadora entran con la misma cuenta y lo abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…).
:::

:::docente
- g2-p1: 25 − 3 = 22 mm de paso. Con canica estándar de 16 mm hay 6 mm de holgura.
- Columnas: C = −25, E = 25, F = 50.
- Error frecuente: paredes que se cruzan a medias; insistir en que las posiciones sean múltiplos de 12.5.
- **Versión Tinkercad (Codeblocks):** mismas medidas y posiciones que en Blender (en Codeblocks las formas nacen centradas en el origen). Los bordes laterales usan A = 3 y L = 180 en vez de girar el cubo. Tinkercad necesita internet y una cuenta por equipo (o una clase de Tinkercad).
- Si el tablero no cabe en la impresora (base menor de 200 mm), reducir a 7 × 7 casillas de 22 mm y tablero de 160 mm.
- Tiempo total: 15 + 30 + 15 + 35 + 5 + 15 = 115 minutos (5 de margen).
:::
