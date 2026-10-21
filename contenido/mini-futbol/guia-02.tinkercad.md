---
titulo: El mini fútbol en 3D (1): la portería
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · El mini fútbol en 3D (1): la portería

## Objetivo del día

Conocer las piezas del mini fútbol y diseñar en Tinkercad Codeblocks (diseño 3D con bloques) la **portería** con su ventana para el sensor, usando simetría.

**Al terminar tendremos:** la portería diseñada y exportada en STL, lista para imprimir dos (una azul y una roja).

## Materiales del equipo

- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)
- 1 sensor infrarrojo de obstáculos (FC-51 o similar) y la pelota (para mirarlos)
- Regla o calibrador, bitácora y lápiz

## Parte 1 · Nuestro mini fútbol (10 min)

La cancha va sobre una base de cartón con bandas a los lados. En cada lado corto hay una **portería impresa** con un **sensor infrarrojo** detrás de su ventana: cuando entra la pelota, el Arduino suma el gol. El marcador se ve en una **pantalla OLED** puesta en un **soporte impreso**, con el buzzer para celebrar.

[IMAGEN 2.1T: mini fútbol diseñado en Tinkercad, con etiquetas: portería azul, portería roja, cancha a escala, bandas laterales, pelota, soporte del marcador, Arduino y protoboard con el botón]

Las piezas que diseñamos e imprimimos:

| Pieza | ¿Para qué sirve? | ¿Cuándo? |
| --- | --- | --- |
| Portería (se imprimen 2: azul y roja) | Recibe la pelota; detrás de su ventana va el sensor | Hoy |
| Soporte del marcador | Sostiene la pantalla y el buzzer a un lado de la cancha | Sábado 3 |

Lo que **no** se imprime: la base con la cancha y las bandas (cartón, sábado 4), la pelota, el Arduino, la protoboard, los sensores y la pantalla.

En los juegos de mesa la portería se **agranda** para que se pueda jugar. La nuestra medirá **10 cm de ancho**, **5 cm de alto** y **4 cm de fondo**.

## Parte 2 · Conociendo Tinkercad Codeblocks (20 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea un diseño de Codeblocks.
   - Arriba a la derecha, botón **+ Crear** → **Codeblocks**.
   - Se abre el editor. Si aparece una ventana de bienvenida o un tutorial, ciérrala.
3. Ponle nombre al diseño.
   - Arriba a la izquierda aparece un nombre inventado (por ejemplo "Tremendous Jaiks-Esboo"). Haz clic sobre él, bórralo y escribe `equipo_NOMBRE_porteria` (cambia NOMBRE por el de tu equipo). Presiona **Enter**.
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
| Cambiar un número | Haz clic en el número, borra, escribe el nuevo y haz clic afuera. Usa **punto** para decimales (52.5) |
| Ver la pieza | Botón **▷** de abajo. En la vista 3D: arrastra con el mouse para girarla (si no gira, prueba arrastrando con el botón derecho) y usa la rueda para acercar |
| Deshacer | Flecha **↶** de arriba a la izquierda del área de programa |

Tres reglas que usaremos todo el día:

- **Las medidas están en milímetros.** Si escribes 50, la pieza mide 50 mm (5 cm).
- **Cada forma nace con su centro en el plano de trabajo:** la mitad queda arriba y la mitad abajo. Por eso, después de cada forma va un bloque **Mover** que la lleva a su lugar. Para que una forma quede **apoyada** en el plano, en **Z** se escribe la **mitad de su alto**.
- **Un hueco es una forma que se resta.** Se marca tocando el **círculo rayado** del bloque (el círculo de color se pone gris). El hueco se resta de las formas sólidas cuando el programa termina con **Seleccionar todo** y **Group Selection**.

**¿Te perdiste en la vista 3D?** Toca la casita 🏠 que está a la izquierda de la vista.

## Parte 3 · La portería con simetría (55 min)

Una portería es **igual a la izquierda y a la derecha**. Modelamos solo la mitad, la copiamos y le damos la vuelta como en un **espejo**.

Miren en la animación cómo la mitad se copia en espejo:

:::animacion tipo="simetria"
:::

La portería quedará con la boca hacia el frente (Y negativo) y el fondo hacia atrás. Trabajen en el diseño `equipo_NOMBRE_porteria`.

1. **Poste:** cubo de 5 × 5 × 50 mm. Colócalo en X = 50 (la mitad del ancho de 100 mm).
   - Toca la categoría **Formas** y arrastra el bloque **Cubo** al área de programa. Toca su flecha **›**: el primer **A** es el **ancho** (X), **L** el **largo** (Y) y el segundo **A** el **alto** (Z). Escribe **A = 5**, **L = 5**, **A = 50** y deja **arista = 0**.
   - Debajo, de **Modificar**, **Mover: X 50, Y 0, Z 25** (así queda parado sobre el piso).
2. **Mitad del travesaño:** cubo de 50 × 5 × 5 mm desde X = 0 hasta X = 50, arriba del poste (Z = 50).
   - Un **Cubo** con primer **A = 50**, **L = 5**, segundo **A = 5**.
   - **Mover: X 25** (la mitad entre 0 y 50), **Y 0**, **Z 50**.
3. **Mitad del fondo y del piso:** placas de 3 mm de grosor y 40 mm de fondo.
   - **Fondo** (pared de atrás): **Cubo** con primer **A = 50**, **L = 3**, segundo **A = 50** y **Mover: X 25, Y 40, Z 25**.
   - **Piso:** **Cubo** con primer **A = 50**, **L = 40**, segundo **A = 3** y **Mover: X 25, Y 20, Z 1.5**.
   - Ejecuten con **▷** y giren la vista para revisar que las cuatro piezas se toquen: poste, travesaño, fondo y piso.
4. Unan la media portería y hagan la otra mitad en **espejo**.
   - **Unir:** de **Modificar**, **Seleccionar todo** y debajo **Group Selection** (aparece en inglés: "agrupar la selección").
   - **Copiar:** debajo, el bloque **Copiar**. La copia queda encima de la original.
   - **Espejo:** debajo, el bloque **Escala:** que tiene **X**, **Y** y **Z**. Escriban **X = −1**, **Y = 1**, **Z = 1** (deja **desde: centro**). Una escala de −1 da vuelta la copia de izquierda a derecha, como en un espejo.
   - **Pasarla al otro lado:** debajo, **Mover: X −52.5, Y 0, Z 0**. La media portería mide 52.5 mm de ancho (de X = 0 al borde del poste), así que la copia queda justo del otro lado.
   - Ejecuten con **▷**: aparece la portería completa.

[IMAGEN 2.2T: media portería en Tinkercad Codeblocks y su copia en espejo con el bloque Escala]

5. En la pared del fondo dejen una **ventana de 12 × 25 mm**: ahí irá el sensor infrarrojo mirando hacia adentro.
   - Debajo, un **Cubo** con primer **A = 12**, **L = 10**, segundo **A = 25**, marcado como **hueco** (toquen su círculo rayado: el círculo de color se pone gris).
   - **Mover: X 0, Y 40, Z 25** (en el centro del fondo).
   - **Unir todo:** otra vez **Seleccionar todo** y **Group Selection**. Ejecuten con **▷**: la ventana queda abierta en el fondo.
   - **✔ Revisa:** si sale solo la mitad, revisa los bloques **Copiar**, **Escala** (X = −1) y **Mover** (X −52.5). Si la ventana no se abre, revisa que su cubo esté marcado como hueco.

[IMAGEN 2.3T: portería completa con la ventana para el sensor en el fondo, en Tinkercad Codeblocks]

:::pregunta id="g2t-p1"
¿Qué ventaja tiene copiar la mitad en espejo en lugar de modelar las dos mitades a mano?
:::

## Parte 4 · ¿Cabe el sensor? Exportar (20 min)

1. Tomen el sensor infrarrojo. En una punta tiene sus dos "ojitos" (el que **emite** la luz y el que la **recibe**). Con la regla o el calibrador, midan el ancho de los dos ojitos juntos y anótenlo.
2. Midan también la pelota (lo ancho).

:::tabla id="g2t-medidas"
| Medida | Ejemplo (mm) | Nuestra medida (mm) | ¿Cabe? |
| --- | --- | --- | --- |
| Los dos ojitos del sensor juntos (ancho) | 11 | | Debe ser menos de 12 (ventana) |
| Pelota (lo ancho) | 40 | | Debe ser menos de 95 (entre los postes) |
:::

- Si los ojitos miden más de 12 mm, agranden el **A** del cubo de la ventana (por ejemplo a 14) y ejecuten otra vez.

3. **Exporta** `equipo_NOMBRE_porteria.stl` (se imprimen dos: una azul y una roja).
   - Arriba a la derecha, botón **Compartir**. Se abre la ventana **Exportar y compartir**.
   - En **Descargar un archivo**, toca **.STL**. El archivo se guarda en la carpeta **Descargas** de la computadora.
   - Cámbiale el nombre: clic derecho sobre él → **Cambiar nombre** → `equipo_NOMBRE_porteria.stl`.

## ¿Lo logramos? (5 min)

:::checklist id="g2t-logramos"
- [ ] Sabemos usar los bloques de Tinkercad.
- [ ] La portería está completa, con la copia en espejo.
- [ ] La ventana del fondo está abierta y caben los ojitos del sensor.
- [ ] Exportamos la portería en STL.
:::

## Reto extra

Agrega a la portería una **red**: usa el bloque **Repetir** con un cilindro delgado (1 mm) para crear barras pegadas al fondo, por dentro. Las barras van a los dos lados de la ventana del sensor, que ocupa de X = −6 a X = 6.

**Truco:** si las barras de un lado se ponen **antes** del primer **Seleccionar todo**, el espejo del paso 4 hace solo las del otro lado.

1. **Primera barra:** arrastren los bloques nuevos entre el **Mover** del piso y el primer **Seleccionar todo**.
   - Un **Cilindro** con **Radio = 0.5**, **A = 47**, **Lados = 16**.
   - **Mover: X 12, Y 38, Z 26.5**. Así queda parada sobre el piso (que mide 3 mm), pegada a la cara de adentro del fondo y a 6 mm del borde de la ventana.
2. **Repetir las barras:** de **Controlar**, **Repetir** con **4** veces. **Dentro**, **Copiar** y debajo **Mover: X 8, Y 0, Z 0**.
   - Quedan barras en X = 12, 20, 28, 36 y 44 (la última, antes del poste, que empieza en 47.5).
3. Ejecuten con **▷**: el espejo agrega las barras en X = −12 a −44.
4. Miren de frente: ninguna barra debe tapar la ventana. Exporten la portería otra vez.

## Bitácora (10 min)

:::pregunta id="g2t-b1"
¿Qué fue lo más difícil de diseñar hoy y cómo lo resolvieron?
:::

Antes de irse, suban aquí `equipo_NOMBRE_porteria.stl`. El diseño de bloques queda guardado en su cuenta de Tinkercad (**Diseños → Codeblocks**).

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí el .stl que exportaron. Su diseño de bloques queda guardado en Tinkercad: en cualquier computadora entran con la misma cuenta y lo abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, reestructurada el 21 de octubre:** se centra en la práctica. Las guías 2 y 3 terminan el diseño (portería y soporte del marcador), la Guía 4 arma la cancha y pasa el marcador completo al simulador, y desde la Guía 5 se trabaja con los sensores reales. La escala se calcula en la Guía 4, solo con las medidas que se trazan; ya no hay boceto. Campos propios (g2t-…).
- La portería es la misma de antes (probada el 16 de octubre): espejo con Copiar + **Escala X = −1** (desde el centro) + **Mover X −52.5**.
- Diseño completo de referencia en la cuenta del docente: "Mini futbol - propuesta completa" (cancha, porterías, bandas, soporte del marcador y electrónica).
- Pelota sugerida: ping pong (4 cm) o pelota de esponja pequeña; la portería de 10 × 5 cm deja espacio.
- Medidas de ejemplo del sensor: los dos ojitos del FC-51 ocupan unos 11 mm de ancho. Si su modelo es más ancho, se agranda la ventana.
- Imprimir esta semana dos porterías por equipo (≈1,5 h cada una), de preferencia en azul y rojo, con el piso sobre la cama.
- Tiempo total: 10 + 20 + 55 + 20 + 5 + 10 = 120 minutos.
:::
