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
2. Nombra las columnas con letras (**A** a **G**) y las filas con números (**1** a **7**), como en el juego de batalla naval.
3. Marca la **salida** en la casilla A1 y la **meta** en una casilla lejana.
4. Dibuja las paredes. Reglas:
   - Debe haber **un solo camino** correcto de la salida a la meta.
   - Al menos **3 callejones sin salida**.
   - Ninguna pared puede tapar la meta por completo.

[IMAGEN 2.1: ejemplo de laberinto de 7 por 7 casillas en papel cuadriculado con letras, números, salida y meta]

5. Escribe el camino correcto con coordenadas: A1 → A2 → B2 → ...

:::pregunta id="g2-p2"
Escribe el camino correcto de tu laberinto usando coordenadas.
:::

:::foto id="g2-boceto"
Foto del laberinto en papel.
:::

## Parte 3 · De casillas a milímetros (15 min)

En Blender el centro del tablero es el punto (0, 0). Cada casilla mide 25 mm, así que los centros de las columnas son:

| Columna | A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- | --- |
| X (mm) | −75 | −50 | | 0 | | | 75 |

Las filas funcionan igual en el eje Y: fila 1 = −75, fila 7 = 75.

:::animacion tipo="coordenadas-3d" modo="tablero"
:::

:::pregunta id="g2-p3"
¿Cuáles son las coordenadas X, Y en milímetros de la casilla de tu meta?
:::

## Parte 4 · El tablero en Blender (35 min)

1. Configura las unidades: **Escala de unidad 0.001**, **Longitud: Milímetros**.
2. Borra el cubo inicial. **Shift + A → Malla → Cubo.** En el panel lateral (**N**) escribe sus dimensiones: X **180**, Y **180**, Z **3**.
3. **Bordes:** agrega un cubo de 180 × 3 × 12 mm y colócalo en Y = 88,5, Z = 7,5. Duplícalo (**Shift + D**) para los otros tres lados (rota 90° con **R Z 90** los de los lados).
4. **Activa el ajuste a la cuadrícula:** en el imán de la barra superior elige **Incremento** y en el panel N usa valores múltiplos de 12,5 para colocar las paredes.
5. Modela las **primeras 5 paredes** de tu laberinto: cubos de 25 × 3 × 12 mm (o 50, 75... según lo largas que sean).

[IMAGEN 2.2: tablero de 180 por 180 mm en Blender con sus cuatro bordes y las primeras paredes del laberinto]

6. Guarda como **equipo_NOMBRE_laberinto.blend**.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] El laberinto en papel cumple las reglas.
- [ ] Escribimos el camino con coordenadas.
- [ ] Completamos la tabla de columnas en mm.
- [ ] El tablero tiene sus 4 bordes en Blender.
- [ ] Modelamos las primeras paredes y guardamos el archivo.
:::

## Reto extra

Usa el modificador **Matriz** para hacer una fila de paredes iguales de un solo golpe (desplazamiento constante de 25 mm).

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Para qué sirven las coordenadas al pasar el diseño del papel a Blender?
:::

:::pregunta id="g2-b2"
¿Qué fue lo más difícil de diseñar un laberinto con un solo camino?
:::

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
