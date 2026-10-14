---
titulo: Una cancha a escala
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Una cancha a escala

## Objetivo del día

Calcular las medidas de la cancha a escala, hacer el boceto y modelar la portería en Blender usando simetría.

**Al terminar tendremos:** el boceto de la cancha con medidas a escala y la portería modelada en Blender.

## Materiales del equipo

- Papel cuadriculado, regla, compás y lápiz
- Calculadora
- Computadora con Blender
- Pelota que usaremos (ping pong o similar)

## Parte 1 · ¿Qué es una escala? (15 min)

Una cancha profesional mide **105 × 68 m**. Para que quepa en la mesa usamos una **escala 1:200**: cada centímetro de la maqueta representa 200 cm (2 m) de la cancha real.

> Medida de la maqueta = Medida real ÷ 200

:::animacion tipo="escala" escala="200" fija="si" ejemplo="Largo de la cancha|105" objetos="Jugador (alto)|1.8; Autobús (largo)|12; Cancha de básquetbol (largo)|28"
:::

:::pregunta id="g2-p1"
Si la escala fuera 1:100, ¿la maqueta sería más grande o más pequeña? ¿Cabría en una mesa?
:::

## Parte 2 · Calcular la cancha (25 min)

Pasa todo a centímetros y divide entre 200:

:::tabla id="g2-escala"
| Parte de la cancha | Medida real | En cm | ÷ 200 = maqueta (cm) |
| --- | --- | --- | --- |
| Largo | 105 m | 10 500 | 52,5 |
| Ancho | 68 m | | |
| Radio del círculo central | 9,15 m | | |
| Largo del área grande | 40,3 m | | |
| Fondo del área grande | 16,5 m | | |
| Ancho de la portería | 7,32 m | | |
:::

:::pregunta id="g2-p2"
A escala, la portería medirá menos de 4 cm. Nuestra pelota mide ______ cm. ¿Podrá entrar? ¿Qué decisión debemos tomar?
:::

En los juegos de mesa la portería se **agranda** para que se pueda jugar. La nuestra medirá **10 cm de ancho**, **5 cm de alto** y **4 cm de fondo**. El resto de la cancha sí va a escala.

## Parte 3 · El boceto (20 min)

Dibuja la cancha en el papel cuadriculado (1 cuadro = 1 cm o a la mitad si no cabe):

1. El rectángulo de 52,5 × 34 cm.
2. La línea central y el círculo central.
3. Las dos áreas grandes.
4. Las dos porterías de 10 cm, y en cada una dónde irá el **sensor**.
5. Dónde irá el **marcador** (a un lado de la cancha).

[IMAGEN 2.1: boceto de la cancha en papel cuadriculado con medidas a escala, porterías y ubicación del marcador]

:::foto id="g2-boceto"
Foto del boceto con medidas.
:::

## Parte 4 · La portería en Blender con simetría (40 min)

Una portería es **igual a la izquierda y a la derecha**. Modelamos solo la mitad y Blender copia el otro lado con el modificador **Simetría** (Mirror).

:::animacion tipo="simetria"
:::

1. Unidades: **Escala 0.001**, **Longitud: Milímetros**. Borra el cubo.
2. **Poste:** cubo de 5 × 5 × 50 mm. Colócalo en X = 50 (la mitad del ancho de 100 mm).
3. **Mitad del travesaño:** cubo de 50 × 5 × 5 mm desde X = 0 hasta X = 50, arriba del poste (Z = 50).
4. **Mitad del fondo y del piso:** placas de 3 mm de grosor y 40 mm de fondo.
5. Une las piezas (**Ctrl + J**), pon el origen en (0, 0, 0) y agrega el modificador **Simetría** en el eje **X**.

[IMAGEN 2.2: media portería en Blender con el modificador Simetría generando la otra mitad]

6. En la pared del fondo deja una **ventana de 12 × 25 mm** (Booleano): ahí irá el sensor infrarrojo mirando hacia adentro.
7. Guarda como **equipo_NOMBRE_porteria.blend**.

[IMAGEN 2.3: portería completa con la ventana para el sensor en el fondo]

:::pregunta id="g2-p3"
¿Qué ventaja tiene usar Simetría en lugar de modelar las dos mitades a mano?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Completamos la tabla de escala.
- [ ] Decidimos el tamaño de la portería.
- [ ] El boceto tiene medidas y la ubicación de sensores y marcador.
- [ ] La portería está modelada con Simetría y tiene ventana para el sensor.
:::

## Reto extra

Agrega a la portería una **red**: usa el modificador **Matriz** con un cilindro delgado (1 mm) para crear barras en el fondo.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Por qué agrandamos la portería y no la dejamos a escala?
:::

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Resultados de la tabla: ancho 34 cm; círculo 4,6 cm; área 20,2 × 8,3 cm; portería 3,7 cm.
- Pelota sugerida: ping pong (4 cm) o pelota de esponja pequeña; la portería de 10 × 5 cm deja espacio.
- La Simetría necesita que el origen del objeto esté en X = 0: si la copia sale desplazada, revisar el origen (Objeto → Fijar origen).
- Tiempo total: 15 + 25 + 20 + 40 + 5 + 15 = 120 minutos.
:::
