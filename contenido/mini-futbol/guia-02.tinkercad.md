---
titulo: Una cancha a escala
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Una cancha a escala

## Objetivo del día

Calcular las medidas de la cancha a escala, hacer el boceto y modelar la portería en Tinkercad Codeblocks (diseño 3D con bloques) usando simetría.

**Al terminar tendremos:** el boceto de la cancha con medidas a escala y la portería modelada en Tinkercad.

## Materiales del equipo

- Papel cuadriculado, regla, compás y lápiz
- Calculadora
- Computadora con internet y cuenta de Tinkercad (la del equipo o la que indique el docente)
- Pelota que usaremos (ping pong o similar)

## Parte 1 · ¿Qué es una escala? (15 min)

Una cancha profesional mide **105 × 68 m**. Para que quepa en la mesa usamos una **escala 1:200**: cada centímetro de la maqueta representa 200 cm (2 m) de la cancha real.

> Medida de la maqueta = Medida real ÷ 200

Elijan cada objeto en la animación y miren cuánto mediría en nuestra maqueta:

:::animacion tipo="escala" escala="200" fija="si" ejemplo="Largo de la cancha|105" objetos="Jugador (alto)|1.8; Autobús (largo)|12; Cancha de básquetbol (largo)|28"
:::

:::pregunta id="g2-p1"
Si la escala fuera 1:100, ¿la maqueta sería más grande o más pequeña? ¿Cabría en una mesa?
:::

## Parte 2 · Calcular la cancha (25 min)

Pasa todo a centímetros y divide entre 200:

1. **Metros a centímetros:** multiplica por 100 (1 m = 100 cm). Por ejemplo, 68 m × 100 = 6800 cm. Con decimales también: 9,15 m × 100 = 915 cm.
2. **A escala:** divide los centímetros entre 200 con la calculadora.
3. La primera fila ya está resuelta como ejemplo. Redondeen a una cifra decimal.

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

Midan su pelota con el calibrador o con la regla (su diámetro, lo ancho) para responder:

:::pregunta id="g2-p2"
A escala, la portería medirá menos de 4 cm. Nuestra pelota mide ______ cm. ¿Podrá entrar? ¿Qué decisión debemos tomar?
:::

En los juegos de mesa la portería se **agranda** para que se pueda jugar. La nuestra medirá **10 cm de ancho**, **5 cm de alto** y **4 cm de fondo**. El resto de la cancha sí va a escala.

## Parte 3 · El boceto (20 min)

Dibuja la cancha en el papel cuadriculado (1 cuadro = 1 cm o a la mitad si no cabe):

Usen las medidas de su tabla. Si dibujan a la mitad, dividan cada medida entre 2, pero escriban la medida real de la maqueta al lado.

1. El rectángulo de 52,5 × 34 cm.
2. La línea central y el círculo central.
   - Para el círculo: abran el compás con el radio de su tabla y pinchen en el centro de la cancha.
3. Las dos áreas grandes.
   - Una en cada lado corto, centrada: el "largo del área" va a lo ancho de la cancha y el "fondo del área" hacia adentro.
4. Las dos porterías de 10 cm, y en cada una dónde irá el **sensor**.
5. Dónde irá el **marcador** (a un lado de la cancha).

[IMAGEN 2.1: boceto de la cancha en papel cuadriculado con medidas a escala, porterías y ubicación del marcador]

:::foto id="g2-boceto"
Foto del boceto con medidas.
:::

## Parte 4 · La portería en Tinkercad con simetría (40 min)

Una portería es **igual a la izquierda y a la derecha**. Modelamos solo la mitad, la copiamos y le damos la vuelta como en un **espejo**.

Miren en la animación cómo la mitad se copia en espejo:

:::animacion tipo="simetria"
:::

Usamos **Tinkercad Codeblocks**: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Las medidas están en **milímetros**. La portería quedará con la boca hacia el frente (Y negativo) y el fondo hacia atrás.

**Antes de empezar, cómo se usa Codeblocks** (vuelvan aquí si se les olvida algo):

- **Entrar:** **tinkercad.com**, inicien sesión con la cuenta que indique el docente → **+ Crear → Codeblocks**. Si aparece un tutorial, ciérrenlo.
- **Nombre del diseño:** clic sobre el nombre inventado de arriba a la izquierda, escriban `equipo_NOMBRE_porteria` y **Enter**. Se guarda solo; después lo encuentran en **Diseños → Codeblocks**.
- **Categorías** (columna de la izquierda): **Formas** (Cubo, Cilindro…), **Modificar** (Mover, Copiar, Escala…), **Controlar** (Repetir).
- **Agregar un bloque:** arrástrenlo al área del centro. **Unir:** suéltenlo justo debajo de otro hasta que encaje. **Borrar:** arrástrenlo de vuelta a la columna de bloques.
- **Medidas de una forma:** toquen la flecha **›** del bloque. En el **Cubo**, el primer **A** es el ancho (X), **L** el largo (Y) y el segundo **A** el alto (Z). Dejen **arista = 0**.
- **Escribir un número:** clic en el número, borren, escriban y clic afuera. Usen **punto** para los decimales.
- Cada forma nueva aparece **centrada** en X = 0, Y = 0, Z = 0. **Mover** mueve la última forma que agregaron.
- **Ver la pieza:** botón **▷** de abajo. En la vista 3D: arrastren para girar y usen la rueda para acercar. La casita 🏠 vuelve a la vista inicial.
- **Deshacer:** flecha **↶** de arriba a la izquierda.

1. Creen el diseño `equipo_NOMBRE_porteria` (ver arriba).
2. **Poste:** cubo de 5 × 5 × 50 mm. Colócalo en X = 50 (la mitad del ancho de 100 mm).
   - De **Formas**, un **Cubo** con primer **A = 5**, **L = 5**, segundo **A = 50**.
   - Debajo, de **Modificar**, **Mover: X 50, Y 0, Z 25** (así queda parado sobre el piso).
3. **Mitad del travesaño:** cubo de 50 × 5 × 5 mm desde X = 0 hasta X = 50, arriba del poste (Z = 50).
   - Un **Cubo** con primer **A = 50**, **L = 5**, segundo **A = 5**.
   - **Mover: X 25** (la mitad entre 0 y 50), **Y 0**, **Z 50**.
4. **Mitad del fondo y del piso:** placas de 3 mm de grosor y 40 mm de fondo.
   - **Fondo** (pared de atrás): **Cubo** con primer **A = 50**, **L = 3**, segundo **A = 50** y **Mover: X 25, Y 40, Z 25**.
   - **Piso:** **Cubo** con primer **A = 50**, **L = 40**, segundo **A = 3** y **Mover: X 25, Y 20, Z 1.5**.
   - Ejecuten con **▷** y giren la vista para revisar que las cuatro piezas se toquen: poste, travesaño, fondo y piso.
5. Unan la media portería y hagan la otra mitad en **espejo**.
   - **Unir:** de **Modificar**, **Seleccionar todo** y debajo **Group Selection** (aparece en inglés: "agrupar la selección").
   - **Copiar:** debajo, el bloque **Copiar**. La copia queda encima de la original.
   - **Espejo:** debajo, el bloque **Escala:** que tiene **X**, **Y** y **Z**. Escriban **X = −1**, **Y = 1**, **Z = 1** (deja **desde: centro**). Una escala de −1 da vuelta la copia de izquierda a derecha, como en un espejo.
   - **Pasarla al otro lado:** debajo, **Mover: X −52.5, Y 0, Z 0**. La media portería mide 52.5 mm de ancho (de X = 0 al borde del poste), así que la copia queda justo del otro lado.
   - Ejecuten con **▷**: aparece la portería completa.

[IMAGEN 2.2T: media portería en Tinkercad Codeblocks y su copia en espejo con el bloque Escala]

6. En la pared del fondo dejen una **ventana de 12 × 25 mm**: ahí irá el sensor infrarrojo mirando hacia adentro.
   - Debajo, un **Cubo** con primer **A = 12**, **L = 10**, segundo **A = 25**, marcado como **hueco** (toquen su círculo rayado: el círculo de color se pone gris).
   - **Mover: X 0, Y 40, Z 25** (en el centro del fondo).
   - **Unir todo:** otra vez **Seleccionar todo** y **Group Selection**. Ejecuten con **▷**: la ventana queda abierta en el fondo.
7. No hace falta guardar: Tinkercad guarda solo. El sábado 3 lo exportarán para imprimir.

[IMAGEN 2.3T: portería completa con la ventana para el sensor en el fondo, en Tinkercad Codeblocks]

:::pregunta id="g2-p3"
¿Qué ventaja tiene copiar la mitad en espejo en lugar de modelar las dos mitades a mano?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Completamos la tabla de escala.
- [ ] Decidimos el tamaño de la portería.
- [ ] El boceto tiene medidas y la ubicación de sensores y marcador.
- [ ] La portería está modelada con la copia en espejo y tiene ventana para el sensor.
:::

## Reto extra

Agrega a la portería una **red**: usa el bloque **Repetir** con un cilindro delgado (1 mm) para crear barras pegadas al fondo, por dentro. Las barras van a los dos lados de la ventana del sensor, que ocupa de X = −6 a X = 6.

**Truco:** si las barras de un lado se ponen **antes** del primer **Seleccionar todo**, el espejo del paso 5 hace solo las del otro lado.

1. **Primera barra:** arrastren los bloques nuevos entre el **Mover** del piso y el primer **Seleccionar todo**.
   - Un **Cilindro** con **Radio = 0.5**, **A = 47**, **Lados = 16**.
   - **Mover: X 12, Y 38, Z 26.5**. Así queda parada sobre el piso (que mide 3 mm), pegada a la cara de adentro del fondo y a 6 mm del borde de la ventana.
2. **Repetir las barras:** de **Controlar**, **Repetir** con **4** veces. **Dentro**, **Copiar** y debajo **Mover: X 8, Y 0, Z 0**.
   - Quedan barras en X = 12, 20, 28, 36 y 44 (la última, antes del poste, que empieza en 47.5).
3. Ejecuten con **▷**: el espejo agrega las barras en X = −12 a −44.
4. Miren de frente: ninguna barra debe tapar la ventana.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Por qué agrandamos la portería y no la dejamos a escala?
:::

Su diseño queda guardado en Tinkercad (**Diseños → Codeblocks**): el sábado 3 lo exportarán para imprimir.

:::archivo id="g2-archivo"
**Archivo de trabajo:** sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…).
:::

:::docente
- Resultados de la tabla: ancho 34 cm; círculo 4,6 cm; área 20,2 × 8,3 cm; portería 3,7 cm.
- Pelota sugerida: ping pong (4 cm) o pelota de esponja pequeña; la portería de 10 × 5 cm deja espacio.
- **Versión Tinkercad (Codeblocks):** mismas medidas que la versión Blender. El espejo se hace con Copiar + **Escala X = −1** (desde el centro) + **Mover X −52.5**; probado el 16 de octubre. Si la copia queda encimada, revisar el Mover; si no sale en espejo, revisar que la X de Escala sea −1. Tinkercad necesita internet y una cuenta por equipo (o una clase de Tinkercad).
- Tiempo total: 15 + 25 + 20 + 40 + 5 + 15 = 120 minutos.
:::
