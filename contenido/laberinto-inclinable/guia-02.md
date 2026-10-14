---
titulo: Diseñar el laberinto
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Diseñar el laberinto

## Objetivo del día

Diseñar el laberinto del equipo en papel cuadriculado usando coordenadas y empezar a modelarlo en Blender.

**Al terminar tendremos:** el laberinto dibujado con coordenadas y el tablero con sus bordes y las primeras paredes en Blender.

## Materiales del equipo

- Papel cuadriculado, regla y lápiz
- Computadora con Blender
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
   - Letras arriba, de izquierda a derecha. Números a la izquierda, de **abajo hacia arriba** (la fila 1 abajo), igual que en Blender.
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

En Blender el centro del tablero es el punto (0, 0). Cada casilla mide 25 mm, así que los centros de las columnas son:

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

## Parte 4 · El tablero en Blender (35 min)

1. Configura las unidades: **Escala de unidades 0.001**, **Longitud: Milímetros**.
   - Abran Blender (si aparece la ventana de bienvenida, clic fuera de ella).
   - En **Propiedades** (abajo a la derecha), icono de **Escena** (un cono con dos esferitas) → sección **Unidades** → **Escala de unidades** = 0.001 → **Longitud** = Milímetros.
2. Borra el cubo inicial. **Shift + A → Malla → Cubo.** En el panel lateral (**N**) escribe sus dimensiones: X **180**, Y **180**, Z **3**.
   - Para borrar: clic en el cubo, mouse sobre la vista 3D y **X → Borrar**.
   - El panel lateral se abre con la tecla **N**; las medidas están en la pestaña **Elemento**. Usa **punto** para los decimales (88.5).
   - En el Listado (arriba a la derecha) haz doble clic en el nombre y llámalo `tablero`.
   - Guarda ya: **Archivo → Guardar como** → `equipo_NOMBRE_laberinto.blend`.
3. **Bordes:** agrega un cubo de 180 × 3 × 12 mm y colócalo en Y = 88,5, Z = 7,5. Duplícalo (**Shift + D**) para los otros tres lados (rota 90° con **R Z 90** los de los lados).
   - Borde de arriba: Dimensiones X = 180, Y = 3, Z = 12; Posición X = 0, Y = 88.5, Z = 7.5.
   - Borde de abajo: **Shift + D**, clic derecho, y cambia Y a −88.5.
   - Borde derecho: **Shift + D**, clic derecho, **R**, **Z**, **90**, **Enter**, y en Posición pon X = 88.5, Y = 0.
   - Borde izquierdo: igual, con X = −88.5.

**Cómo ubicar las paredes del laberinto:** cada pared va sobre una línea entre casillas.

- Una **pared horizontal** (separa una fila de otra) mide X = 25 (o 50, 75… si abarca varias casillas), Y = 3, Z = 12. Su **X** es el centro de su columna (de tu tabla) y su **Y** es la línea entre filas: −62.5, −37.5, −12.5, 12.5, 37.5 o 62.5.
- Una **pared vertical** (separa una columna de otra) mide X = 3, Y = 25 (o más), Z = 12. Su **Y** es el centro de su fila y su **X** es la línea entre columnas: −62.5, −37.5, −12.5, 12.5, 37.5 o 62.5.
- Todas las paredes van en Posición **Z = 7.5** (paradas sobre el tablero).
- Si una pared abarca dos casillas (largo 50), su centro queda justo en la línea entre esas dos casillas.

4. **Activa el ajuste a la cuadrícula:** en el imán de la barra superior elige **Incremento** y en el panel N usa valores múltiplos de 12,5 para colocar las paredes.
   - Si les resulta más fácil, basta con escribir las posiciones en el Panel N como se explicó arriba: siempre son múltiplos de 12.5.
5. Modela las **primeras 5 paredes** de tu laberinto: cubos de 25 × 3 × 12 mm (o 50, 75... según lo largas que sean).
   - Para cada nueva pared: selecciona una pared que ya tengas, **Shift + D**, clic derecho, y cambia sus Dimensiones y su Posición.
   - Miren desde arriba (tecla **7** del teclado numérico o la bolita **Z** del dibujo de ejes) y comparen con el dibujo en papel.

[IMAGEN 2.2: tablero de 180 por 180 mm en Blender con sus cuatro bordes y las primeras paredes del laberinto]

6. Guarda como **equipo_NOMBRE_laberinto.blend**.
   - Con **Ctrl + S** (ya tiene ese nombre).

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] El laberinto en papel cumple las reglas.
- [ ] Escribimos el camino con coordenadas.
- [ ] Completamos la tabla de columnas en mm.
- [ ] El tablero tiene sus 4 bordes en Blender.
- [ ] Modelamos las primeras paredes y guardamos el archivo.
:::

## Reto extra

Usa el modificador **Repetir** para hacer una fila de paredes iguales de un solo golpe (desplazamiento constante de 25 mm).

Pista: selecciona una pared → llave inglesa → **Agregar modificador → Generar → Repetir**. Quita **Desplazamiento relativo**, activa **Desplazamiento constante** con 25 en el eje de la fila, y cambia **Cantidad**.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Para qué sirven las coordenadas al pasar el diseño del papel a Blender?
:::

:::pregunta id="g2-b2"
¿Qué fue lo más difícil de diseñar un laberinto con un solo camino?
:::

Antes de irse, suban `equipo_NOMBRE_laberinto.blend` aquí: el sábado 3 terminarán las paredes.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g2-p1: 25 − 3 = 22 mm de paso. Con canica estándar de 16 mm hay 6 mm de holgura.
- Columnas: C = −25, E = 25, F = 50.
- Error frecuente: paredes que se cruzan a medias; insistir en usar el incremento de la cuadrícula.
- Si el tablero no cabe en la impresora (base menor de 200 mm), reducir a 7 × 7 casillas de 22 mm y tablero de 160 mm.
- Tiempo total: 15 + 30 + 15 + 35 + 5 + 15 = 115 minutos (5 de margen).
:::
