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

## Parte 4 · La portería en Blender con simetría (40 min)

Una portería es **igual a la izquierda y a la derecha**. Modelamos solo la mitad y Blender copia el otro lado con el modificador **Simetrizar** (Mirror).

Miren en la animación cómo la mitad se copia en espejo:

:::animacion tipo="simetria"
:::

Las medidas van en el **Panel N** (tecla N) → pestaña **Elemento**. Usa **punto** para los decimales. La portería quedará con la boca hacia el frente (Y negativo) y el fondo hacia atrás.

**Antes de empezar, cómo se usa Blender** (vuelvan aquí si se les olvida algo):

- **Los atajos de teclado** (Shift + A, N, X, H…) solo funcionan con el **mouse encima de la vista 3D** (el espacio grande del centro, con la cuadrícula).
- **Agregar una pieza:** mouse sobre la vista 3D → **Shift + A** → **Malla** → **Cubo** (o Cilindro, Plano…). Si no recuerdan el atajo, usen el menú **Agregar** de la barra de arriba de la vista 3D. La pieza nueva aparece en el **cursor 3D** (la mirilla roja y blanca) y queda seleccionada.
- **Panel N:** con el mouse sobre la vista 3D presionen **N**; se abre a la derecha de la vista. Arriba tiene pestañas verticales: elijan **Elemento**. Ahí están **Posición**, **Rotación**, **Escala** y **Dimensiones**. Si no aparece: menú **Vista → Barra lateral**.
- **Escribir un número:** doble clic en la casilla, borren lo que tiene, escriban el número y presionen **Enter**. No arrastren el mouse sobre la casilla: eso cambia el número sin control.
- **Seleccionar:** clic sobre la pieza (se pone con borde naranja). **Listado** es la lista de objetos arriba a la derecha; también se puede hacer clic ahí sobre el nombre.
- **Cambiar el nombre:** doble clic sobre el nombre en el Listado, escriban el nombre nuevo y **Enter**.
- **Mirar el modelo:** rueda del mouse = acercar o alejar; mantener apretada la rueda y mover = girar la vista; **Shift** + rueda apretada = mover la vista.
- **Deshacer:** **Ctrl + Z**.

1. Unidades: **Escala 0.001**, **Longitud: Milímetros**. Borra el cubo.
   - Abran Blender (clic fuera de la ventana de bienvenida). Propiedades → icono de **Escena** (cono con dos esferitas) → **Unidades** → Escala de unidades **0.001** → Longitud **Milímetros**.
   - Clic en el cubo (queda con borde naranja), mouse sobre la vista 3D y **X → Borrar**. Guarden: **Archivo → Guardar como** → `equipo_NOMBRE_porteria.blend`.
2. **Poste:** cubo de 5 × 5 × 50 mm. Colócalo en X = 50 (la mitad del ancho de 100 mm).
   - Mouse sobre la vista 3D → **Shift + A → Malla → Cubo**. Aparece un cubo en el centro, ya seleccionado.
   - Abran el Panel N (tecla **N**) → pestaña **Elemento**.
   - En **Dimensiones** escriban X = 5, Y = 5, Z = 50 (doble clic en cada casilla, número y **Enter**).
   - En **Posición** escriban X = 50, Y = 0, Z = 25 (así queda parado sobre el piso).
   - En el Listado, doble clic sobre "Cubo", escriban `poste` y **Enter**.
3. **Mitad del travesaño:** cubo de 50 × 5 × 5 mm desde X = 0 hasta X = 50, arriba del poste (Z = 50).
   - Mouse sobre la vista 3D → **Shift + A → Malla → Cubo**.
   - Panel N → **Elemento** → **Dimensiones**: X = 50, Y = 5, Z = 5.
   - **Posición**: X = 25 (la mitad entre 0 y 50), Y = 0, Z = 50.
   - En el Listado, llámenlo `travesano`.
4. **Mitad del fondo y del piso:** placas de 3 mm de grosor y 40 mm de fondo.
   - **Fondo** (pared de atrás): mouse sobre la vista 3D → **Shift + A → Malla → Cubo**. Panel N → **Elemento** → Dimensiones X = 50, Y = 3, Z = 50; Posición X = 25, Y = 40, Z = 25. En el Listado, llámenlo `fondo`.
   - **Piso:** otra vez **Shift + A → Malla → Cubo**. Dimensiones X = 50, Y = 40, Z = 3; Posición X = 25, Y = 20, Z = 1.5. Llámenlo `piso`.
   - Giren la vista (rueda del mouse apretada) para revisar que las cuatro piezas se toquen: poste, travesaño, fondo y piso.
5. Une las piezas (**Ctrl + J**), pon el origen en (0, 0, 0) y agrega el modificador **Simetrizar** en el eje **X**.
   - Clic en una pieza y **Shift + clic** en las demás (las cuatro quedan con borde naranja). Con el mouse sobre la vista 3D, **Ctrl + J**: se vuelven un solo objeto. En el Listado, llámalo `porteria`.
   - **Origen:** presiona **Shift + C** (el cursor 3D, la mirilla roja y blanca, vuelve al centro). Luego **Objeto → Definir origen → Origen al cursor 3D**.
   - **Simetrizar:** con la `porteria` seleccionada, busquen el panel **Propiedades** (abajo a la derecha, con una columna de iconos a su izquierda). Clic en la **llave inglesa azul** (Modificadores) → **Agregar modificador → Generar → Simetrizar**. Revisen que esté marcado el eje **X**. Aparece la otra mitad.

[IMAGEN 2.2: media portería en Blender con el modificador Simetrizar generando la otra mitad]

6. En la pared del fondo deja una **ventana de 12 × 25 mm** (modificador Booleana): ahí irá el sensor infrarrojo mirando hacia adentro.
   - Mouse sobre la vista 3D → **Shift + A → Malla → Cubo**. Panel N → **Elemento** → Dimensiones X = 12, Y = 10, Z = 25; Posición X = 0, Y = 40, Z = 25 (en el centro del fondo). En el Listado, llámalo `ventana`.
   - Clic en la `porteria` → Propiedades → llave inglesa → **Agregar modificador → Generar → Booleana**. En el modificador Booleana dejen marcado **Diferencia**; en la casilla **Objeto** hagan clic y elijan `ventana` de la lista. Los modificadores nuevos se ponen al final, así que queda **debajo** del Simetrizar.
   - Clic en la `ventana` y, con el mouse sobre la vista 3D, presionen **H** para ocultarla y ver el hueco. (Para volver a verla: **Alt + H**.) **No apliquen** los modificadores todavía: se aplican en la Guía 3, antes de exportar.
7. Guarda como **equipo_NOMBRE_porteria.blend**.
   - Con **Ctrl + S**.

[IMAGEN 2.3: portería completa con la ventana para el sensor en el fondo]

:::pregunta id="g2-p3"
¿Qué ventaja tiene usar el modificador Simetrizar en lugar de modelar las dos mitades a mano?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Completamos la tabla de escala.
- [ ] Decidimos el tamaño de la portería.
- [ ] El boceto tiene medidas y la ubicación de sensores y marcador.
- [ ] La portería está modelada con el modificador Simetrizar y tiene ventana para el sensor.
:::

## Reto extra

Agrega a la portería una **red**: usa el modificador **Repetir** (en inglés, Array) con un cilindro delgado (1 mm) para crear barras pegadas al fondo, por dentro. Las barras van a los dos lados de la ventana del sensor, que ocupa de X = −6 a X = 6.

1. **Primera barra:** mouse sobre la vista 3D → **Shift + A → Malla → Cilindro**.
   - Panel N → **Elemento** → **Dimensiones**: X = 1, Y = 1, Z = 47.
   - **Posición**: X = 12, Y = 38, Z = 26.5. Así queda parada sobre el piso (que mide 3 mm), pegada a la cara de adentro del fondo y a 6 mm del borde de la ventana.
   - En el **Listado**, llámenla `red`.
2. **Origen en el centro de la portería** (para que el espejo del paso 4 quede en su lugar): presionen **Shift + C** y luego **Objeto → Definir origen → Origen al cursor 3D**. La barra no se mueve; solo cambia su punto de referencia.
3. **Repetir las barras:** Propiedades → **llave inglesa** → **Agregar modificador → Generar → Repetir**.
   - Desmarquen **Desplazamiento relativo** y marquen **Desplazamiento constante**.
   - En la **Distancia X** del desplazamiento constante escriban 8.
   - En **Cantidad** escriban 5. Quedan barras en X = 12, 20, 28, 36 y 44 (la última, antes del poste, que empieza en 47.5).
4. **El otro lado:** **Agregar modificador → Generar → Simetrizar**, con el eje **X** marcado. Aparecen las barras en X = −12 a −44. Debe quedar **debajo** del Repetir en la lista.
5. Miren de frente: tecla **1** del teclado numérico (sin teclado numérico: clic en el círculo verde **sin letra** de los ejes de colores, arriba a la derecha de la vista 3D). Ninguna barra debe tapar la ventana.
6. Para imprimirla con la portería: en la Guía 3, antes de exportar, apliquen los dos modificadores de la `red` (**⌄ → Aplicar**, primero el de arriba) y únanla a la `porteria` con **Ctrl + J**.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Por qué agrandamos la portería y no la dejamos a escala?
:::

Antes de irse, suban `equipo_NOMBRE_porteria.blend` aquí: el sábado 3 lo exportarán para imprimir.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Resultados de la tabla: ancho 34 cm; círculo 4,6 cm; área 20,2 × 8,3 cm; portería 3,7 cm.
- Pelota sugerida: ping pong (4 cm) o pelota de esponja pequeña; la portería de 10 × 5 cm deja espacio.
- El modificador Simetrizar necesita que el origen del objeto esté en X = 0: si la copia sale desplazada, revisar el origen (Objeto → Definir origen).
- Tiempo total: 15 + 25 + 20 + 40 + 5 + 15 = 120 minutos.
:::
