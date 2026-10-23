---
titulo: El laberinto en 3D (1): el tablero
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · El laberinto en 3D (1): el tablero

## Objetivo del día

Conocer las piezas de nuestro laberinto, dibujar el laberinto del equipo en papel y empezar a diseñar el **tablero** en Tinkercad Codeblocks (diseño 3D con bloques).

**Al terminar tendremos:** el laberinto dibujado en papel y el tablero con sus bordes y sus primeras paredes en Tinkercad.

## Materiales del equipo

- Papel cuadriculado, regla y lápiz
- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)
- Una canica y una regla o calibrador (para medirla)

## Parte 1 · Nuestro laberinto (10 min)

El tablero con el laberinto va dentro de un **marco**, y el marco va entre dos **torres**. Un servo inclina el marco hacia adelante y atrás; el otro inclina el tablero a los lados. Así la canica rueda hacia donde mueven el joystick.

[IMAGEN 2.1T: laberinto diseñado en Tinkercad, con etiquetas: tablero con el laberinto, canica, agujero de la meta, marco, servo del tablero, servo del marco, torre del eje, torre del servo, base de MDF o cartón, soporte de la pantalla y base del joystick]

Las piezas que diseñamos e imprimimos:

| Pieza | ¿Para qué sirve? | ¿Cuándo? |
| --- | --- | --- |
| Tablero | El laberinto con sus paredes; la canica rueda encima | Hoy y el sábado 3 |
| Marco | Sostiene el tablero y al servo que lo inclina a los lados | Sábado 3 |
| Torre del servo y torre del eje | Sostienen el marco en el aire, a los lados | Sábado 3 |
| Soporte del sensor, de la pantalla y base del joystick | Piezas pequeñas para que todo quede fijo | Sábado 5 |

Lo que **no** se imprime: la base (una tabla de MDF o cartón grueso), los dos servos, los palitos de pincho que hacen de ejes, el Arduino y los cables.

## Parte 2 · El laberinto en papel (25 min)

1. **Midan la canica** con el calibrador (ciérrenlo suavemente sobre ella) o con la regla. Anótenlo en la bitácora.
2. Dibujen un cuadro de **7 × 7 casillas**. Usen casillas grandes, de 2 × 2 cuadritos del papel.
3. Escriban las **letras A a G** arriba (columnas, de izquierda a derecha) y los **números 1 a 7** a la izquierda (filas, con el **1 abajo**), como en la batalla naval.
4. Marquen la **salida** en A1 y la **meta** en una casilla lejana.
5. Dibujen las paredes **sobre las líneas** entre casillas, nunca en medio de una casilla. Reglas:
   - Un **solo camino** correcto de la salida a la meta.
   - Al menos **3 callejones sin salida**.
   - Ninguna pared tapa la meta por completo.
   - Usen lápiz: es normal borrar y probar.

[IMAGEN 2.1: ejemplo de laberinto de 7 por 7 casillas en papel cuadriculado con letras, números, salida y meta]

6. Pidan a alguien de otro equipo que lo resuelva con el dedo. Si se pierde o encuentra dos caminos, corríjanlo.

:::pregunta id="g2t-p1"
Cada casilla mide 25 mm y cada pared 3 mm. ¿Cuánto espacio queda para que pase la canica? ¿Cabe la nuestra?
:::

:::foto id="g2t-boceto"
Foto del laberinto en papel.
:::

**De casillas a milímetros.** En Tinkercad el centro del tablero es el punto (0, 0) y cada casilla mide 25 mm. Completen la tabla: de una columna a la siguiente se suman 25.

:::tabla id="g2t-columnas"
| Columna | A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- | --- |
| X (mm) | −75 | −50 | | 0 | | | 75 |
:::

Las filas funcionan igual en el eje **Y**: la fila 1 es −75 y la fila 7 es 75. Comprueben en la animación dónde cae cada casilla:

:::animacion tipo="coordenadas-3d" modo="tablero"
:::

:::pregunta id="g2t-meta"
¿Cuáles son la X y la Y en milímetros de la casilla de nuestra meta?
:::

## Parte 3 · Conociendo Tinkercad Codeblocks (15 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea el diseño del tablero.
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

Tres reglas que vamos a usar siempre:

- **Las medidas están en milímetros.**
- Cada forma nace con su **centro** en X = 0, Y = 0, Z = 0. El bloque **Mover** (de Modificar) mueve la **última forma** que agregaste: con él la ponen en su lugar.
- El **Cubo** pide **A** (ancho, X), **L** (largo, Y), **A** (alto, Z) y **arista** (déjenla en 0).

## Parte 4 · El tablero (55 min)

1. **La placa:** un Cubo de 180 × 180 × 3 mm. No se mueve: queda en el centro.
   - De **Formas**, arrastra un **Cubo** y toca su **›**: primer **A = 180**, **L = 180**, segundo **A = 3**, **arista = 0**.
   - Ejecuta con **▷**: debe aparecer una placa cuadrada y delgada.
2. **Los bordes:** cuatro Cubos de 3 mm de grueso y 12 mm de alto, parados alrededor de la placa.
   - **Borde de atrás:** un **Cubo** con primer **A = 180**, **L = 3**, segundo **A = 12**. Debajo, **Mover: X 0, Y 88.5, Z 7.5**.
   - **Borde de adelante:** otro **Cubo** igual y **Mover: X 0, Y −88.5, Z 7.5** (con el signo menos).
   - **Borde derecho:** un **Cubo** con primer **A = 3**, **L = 180**, segundo **A = 12** (el largo va en L, así no hay que girarlo). Debajo, **Mover: X 88.5, Y 0, Z 7.5**.
   - **Borde izquierdo:** otro igual y **Mover: X −88.5, Y 0, Z 7.5**.
   - Ejecuta con **▷**. **✔ Revisa:** la placa tiene un borde en cada lado, sin huecos en las esquinas.

**Cómo ubicar cada pared.** Cada pared es un **Cubo** con su **Mover**, y va sobre una línea entre casillas:

| Pared | Medidas del Cubo | En su Mover |
| --- | --- | --- |
| **Horizontal** (separa una fila de otra) | A = **25** (o 50, 75… si tapa varias casillas), L = **3**, A = **12** | **X** = centro de su columna (de la tabla) · **Y** = la línea entre filas |
| **Vertical** (separa una columna de otra) | A = **3**, L = **25** (o 50, 75…), A = **12** | **X** = la línea entre columnas · **Y** = centro de su fila |

- Las líneas entre casillas están en **−62.5, −37.5, −12.5, 12.5, 37.5 y 62.5**.
- En todas las paredes, la **Z** es **7.5** (paradas sobre la placa).
- Si una pared tapa dos casillas (largo 50), su centro queda justo entre esas dos casillas. Por ejemplo, una pared horizontal entre las filas 1 y 2 que tapa las columnas A y B: Cubo **50 × 3 × 12** y **Mover: X −62.5, Y −62.5, Z 7.5**.

[IMAGEN 2.2T: tablero del laberinto en Tinkercad Codeblocks, con etiquetas: placa del tablero, borde, pared horizontal y pared vertical]

3. **Las paredes:** modelen las paredes de su dibujo, una por una.
   - Para cada pared: un **Cubo** con sus medidas y, debajo, su **Mover**.
   - Ejecuta con **▷** después de cada pared y compárala con el papel. Para mirar desde arriba, toca la cara **SUPERIOR** del cubito de vistas.
   - Si una pared quedó mal, cambia los números de su bloque: no hay que borrarla.
   - Vayan tachando en el papel las paredes que ya modelaron.
4. El diseño se guarda solo. Si no terminaron todas las paredes, el sábado 3 siguen en el mismo diseño.

## ¿Lo logramos? (5 min)

:::checklist id="g2t-logramos"
- [ ] El laberinto en papel cumple las reglas.
- [ ] Completamos la tabla de columnas en milímetros.
- [ ] El tablero tiene sus 4 bordes en Tinkercad.
- [ ] Modelamos paredes y coinciden con el papel.
:::

## Reto extra

Usa el bloque **Repetir** para hacer una fila de paredes iguales de un solo golpe.

Pista: después de una pared (su Cubo y su Mover), agrega de **Controlar** el bloque **Repetir** con 3 veces y, **dentro**, de **Modificar** el bloque **Copiar** y debajo un **Mover** con 25 en el eje de la fila (X o Y). Cada vuelta copia la última pared y la corre 25 mm.

## Bitácora (10 min)

:::pregunta id="g2t-b1"
¿Para qué sirven las coordenadas al pasar el laberinto del papel a Tinkercad?
:::

El diseño queda guardado en su cuenta de Tinkercad (**Diseños → Codeblocks**). Guarden el papel con el laberinto: el sábado 3 lo necesitan.

:::archivo id="g2-archivo"
**Archivo de trabajo:** su diseño de bloques queda guardado en Tinkercad: en cualquier computadora entran con la misma cuenta y lo abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…).
:::

:::docente
- **Versión Tinkercad, reestructurada el 21 de octubre** (más práctica, como el Puente, el Dispensador y el Mini fútbol): los sábados 2 y 3 se diseñan todas las piezas grandes; el 4 se arma. Campos propios (g2t-…).
- Diseños de referencia en la cuenta del docente: "Laberinto inclinable - propuesta completa" (todo armado) y "Laberinto - modelo tablero / marco / torres / piezas pequenas", con los mismos bloques de las guías.
- g2t-p1: 25 − 3 = 22 mm de paso. Con canica de 16 mm quedan 6 mm de holgura. Si la canica mide más de 20 mm, avisar: no pasará bien.
- Columnas: C = −25, E = 25, F = 50.
- Error frecuente: paredes que se cruzan a medias; las posiciones siempre son centros de casilla (múltiplos de 25) o líneas (terminan en .5).
- Se quitaron de esta versión la pieza de prueba de holgura y el juego completo en Wokwi (el código del juego pasa a la Guía 6).
- Tiempo total: 10 + 25 + 15 + 55 + 5 + 10 = 120 minutos.
:::
