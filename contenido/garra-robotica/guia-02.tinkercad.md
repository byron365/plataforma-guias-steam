---
titulo: Del papel a Tinkercad
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Del papel a Tinkercad

## Objetivo del día

Dibujar nuestra garra con medidas reales y dar los primeros pasos en Tinkercad Codeblocks (diseño 3D con bloques) modelando la **base**, la pieza donde irá el servo que hace girar todo el brazo.

**Al terminar tendremos:** boceto con medidas y el diseño de la base en Tinkercad, listo para que el docente lo imprima esta semana.

## Materiales del equipo

- Bitácora, lápiz, regla y borrador
- 1 servo SG90 (para medirlo)
- Calibrador o regla con milímetros
- Computadora con internet
- Cuenta de Tinkercad (la del equipo o la que indique el docente)
- Mouse con rueda

## Parte 1 · Repaso rápido (10 min)

El sábado pasado el servo obedeció a una perilla. Hoy empezamos a diseñar el cuerpo de la garra.

:::pregunta id="g2-p1"
¿Entre qué ángulos limitamos el servo y por qué?
:::

## Parte 2 · Boceto con medidas (25 min)

1. **Mide el servo** con el calibrador y completa la tabla. Así se usa el calibrador:
   - Abre las puntas, pon el servo entre ellas y ciérralas suavemente hasta que lo toquen (sin apretar).
   - Lee los milímetros en la regla grande, donde marca el cero de la regla pequeña. Si tu calibrador es digital, lee el número de la pantalla.
   - **Cuerpo** es solo la cajita, sin las pestañas. Las **pestañas** son las dos orejitas con agujeros de los lados.
   - El **alto del cuerpo** se mide desde el fondo de la cajita hasta su parte de arriba, **sin** contar el eje blanco.

| Medida del servo | Valor (mm) |
| --- | --- |
| Largo del cuerpo | |
| Ancho del cuerpo | |
| Alto del cuerpo | |
| Largo total con pestañas | |

2. **Dibuja la garra de lado** en tu bitácora, con estas medidas de referencia. "De lado" significa como si la vieras desde un costado: la base abajo, el brazo subiendo y la pinza en la punta.

| Parte | Medida sugerida |
| --- | --- |
| Base | 40 × 20 mm, 19 mm de alto |
| Plato de apoyo | 100 mm de diámetro |
| Brazo (hombro a codo) | 80 mm |
| Antebrazo (codo a pinza) | 70 mm |
| Pinza abierta | 60 mm de ancho |

   **Consejo:** usa una escala fácil, por ejemplo 1 cm del papel = 2 cm de la garra (todo a la mitad). Así el brazo de 80 mm se dibuja de 40 mm. Escribe la medida real junto a cada parte.

[IMAGEN 2.1: ejemplo de boceto lateral de la garra con medidas anotadas]

3. Marca con un círculo dónde va cada servo: base, hombro, codo y pinza.

4. Tomen una foto del boceto con el celular y súbanla aquí:

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

## Parte 3 · Conociendo Tinkercad Codeblocks (15 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea un diseño de Codeblocks.
   - Arriba a la derecha, botón **+ Crear** → **Codeblocks**.
   - Se abre el editor. Si aparece una ventana de bienvenida o un tutorial, ciérrala.
3. Ponle nombre al diseño.
   - Arriba a la izquierda aparece un nombre inventado (por ejemplo "Tremendous Jaiks-Esboo"). Haz clic sobre él, bórralo y escribe `equipo_NOMBRE_base` (cambia NOMBRE por el de tu equipo). Presiona **Enter**.
   - El diseño se guarda solo mientras trabajas. Lo encuentras otra vez en Tinkercad: **Diseños → Codeblocks**.

4. **Conoce las partes del editor:**

| Parte | Dónde está y para qué sirve |
| --- | --- |
| Categorías | Columna de círculos de colores a la izquierda: **Formas**, **Modificar**, **Controlar**, **Matemáticas**, **Variables**, **Plantillas**, **Marcar** |
| Bloques | Junto a las categorías. Al tocar una categoría se ven sus bloques |
| Área de programa | El espacio oscuro del centro: ahí se arrastran y se unen los bloques |
| Vista 3D | El recuadro de la derecha con el **Plano de trabajo**: ahí aparece la pieza |
| Botones de abajo | **▷** ejecuta el programa; **↻** borra la pieza para volver a empezar |

[IMAGEN 2.2T: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

5. **Aprende a usar los bloques.** Prueba cada acción:

| Acción | Cómo se hace |
| --- | --- |
| Agregar un bloque | Arrástralo desde la izquierda al área de programa |
| Unir dos bloques | Suelta un bloque justo debajo de otro: encaja como una pieza de rompecabezas |
| Borrar un bloque | Arrástralo de vuelta a la columna de bloques de la izquierda |
| Ver las medidas de una forma | Toca la flecha **›** del bloque. Para ocultarlas, toca **‹** |
| Cambiar un número | Haz clic en el número, borra, escribe el nuevo y haz clic afuera. Usa **punto** para decimales (23.4, no 23,4) |
| Ver la pieza | Botón **▷** de abajo. En la vista 3D: arrastra con el mouse para girarla (si no gira, prueba arrastrando con el botón derecho) y usa la rueda para acercar |
| Deshacer | Flecha **↶** de arriba a la izquierda del área de programa |

   - **Las medidas están en milímetros.** Si escribes 40, la pieza mide 40 mm.
   - Cada forma nueva aparece **centrada**: su centro queda en X = 0, Y = 0, Z = 0, así que la mitad queda arriba del plano de trabajo y la mitad abajo. Con **Mover** la llevan a su lugar.
   - **Mover** mueve la última forma que agregaste.
   - **¿Te perdiste?** Toca la casita 🏠 que está a la izquierda de la vista 3D.

**Prueba:** arrastra un **Cubo**, ejecuta con **▷**, gira la vista y míralo de frente, de lado y desde arriba (para ver desde arriba, toca la cara **SUPERIOR** del cubito de vistas). Después bórralo.

## Parte 4 · Modelando la base (50 min)

La base es una caja con un hueco donde entra el servo. Sus pestañas se apoyan en el borde de arriba.

En Tinkercad, un hueco es una forma marcada como **hueco** (con el círculo rayado): al **agrupar**, se resta de las formas sólidas.

1. **Caja exterior:**
   - Toca la categoría **Formas** y arrastra el bloque **Cubo** al área de programa. Ahora dice **Añadir**.
   - Toca su flecha **›** y escribe: primer **A** (ancho, X) = **40**, **L** (largo, Y) = **20**, segundo **A** (alto, Z) = **19**, **arista** = **0**.
   - De **Modificar**, arrastra **Mover:** debajo y escribe **X: 0**, **Y: 0**, **Z: 9.5**. Así la caja queda parada sobre el plano de trabajo (de 0 a 19 mm).

[IMAGEN 2.3T: bloque Cubo con las medidas de la caja exterior y su bloque Mover]

2. **Hueco del servo:** debajo, otro **Cubo** con primer **A = 23.4**, **L = 12.8**, segundo **A = 17**, **arista = 0**.
   - Toca su **círculo rayado**: el círculo de color se pone gris. Eso significa que es un **hueco**.
   - Debajo, **Mover: X 0, Y 0, Z 11.5**.

   Mide 0,6 mm más que el servo: es la **holgura** para que entre sin forzarlo.

3. **Restar el hueco a la caja:** de **Modificar**, arrastra **Seleccionar todo** y debajo **Group Selection** (este bloque aparece en inglés: quiere decir "agrupar la selección").
   - Ejecuta con **▷**. **✔ Revisa:** gira la vista: la caja debe tener el hueco arriba. Si sale sólida, revisa que el segundo cubo tenga el círculo de color en gris.

Miren en la animación qué hace cada forma de combinar piezas. Al agrupar, un hueco hace la **Diferencia** (restar):

:::animacion tipo="booleano"
:::

[IMAGEN 2.4T: caja de la base con el hueco del servo en Tinkercad Codeblocks]

4. **Agujeros para tornillos:** dos cilindros huecos de 2 mm de diámetro.
   - **Antes** de **Seleccionar todo** (arrastra los bloques nuevos entre el último Mover y Seleccionar todo), un **Cilindro** con **Radio = 1** (2 ÷ 2), **A = 10**, **Lados = 16**, marcado como **hueco**.
   - Debajo, **Mover: X 13.75, Y 0, Z 14**.
   - Otro **Cilindro** igual, hueco, con **Mover: X −13.75, Y 0, Z 14** (con el signo menos).

5. **Plato de apoyo:** también antes de **Seleccionar todo**, un **Cilindro** sólido con **Radio = 50**, **A = 4**, **Lados = 64** y **Mover: X 0, Y 0, Z −2**. Es un disco ancho que evita que la garra se vuelque.

6. **Unir:** ejecuta con **▷**. Como todo está antes de **Seleccionar todo** y **Group Selection**, la caja, el plato y los huecos quedan en una sola pieza.

[IMAGEN 2.5T: base terminada en Tinkercad Codeblocks, vista 3/4, con el hueco del servo y los agujeros]

7. **Comprueba:** compara las medidas del hueco (23.4 × 12.8) con las del servo que anotaste en la tabla de la Parte 2.
   - El hueco debe ser un poco más grande que el cuerpo del servo. Si tu servo mide más, cambia los números del hueco.
   - Mira desde arriba (cara **SUPERIOR**): el hueco y los dos agujeros deben quedar centrados en la caja.

8. **Exporta:**
   - Arriba a la derecha, **Compartir** → en **Descargar un archivo**, toca **.STL**. El archivo queda en **Descargas**.
   - Si no se llama `equipo_NOMBRE_base.stl`, cámbiale el nombre: clic derecho → **Cambiar nombre**.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Medimos el servo y completamos la tabla.
- [ ] Tenemos el boceto de la garra con medidas.
- [ ] Sabemos usar los bloques y girar la vista en Tinkercad.
- [ ] La base tiene hueco, agujeros y plato de apoyo.
- [ ] El diseño quedó guardado y exportamos el STL.
:::

## Reto extra

Agrega una ranura de 8 × 4 mm en una pared de la base para que salgan los cables del servo.

Pista: es otro **Cubo** hueco, antes de **Seleccionar todo**. Usa un cubo con primer **A = 10** (un poco más largo que el grueso de la pared, para que la atraviese completa), **L = 8** (ancho) y segundo **A = 4** (alto), y muévelo a una de las paredes cortas de la caja con **X 16** y la Z a la altura por donde salen los cables del servo.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Qué bloque de Tinkercad nos pareció más útil?
:::

:::pregunta id="g2-b2"
¿Por qué el hueco es un poco más grande que el servo?
:::

:::pregunta id="g2-b3"
¿Qué fue lo más difícil y cómo lo resolvimos?
:::

Antes de irse, suban aquí `equipo_NOMBRE_base.stl`. El diseño de bloques queda guardado en Tinkercad (**Diseños → Codeblocks**).

:::archivo id="g2-archivo"
**Archivo de trabajo:** suban aquí el .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las bases esta semana: se montan el sábado 4.
- Si un equipo no termina, puede usar la base de referencia del archivo del docente.
- Errores comunes: escribir medidas sin punto decimal, olvidar marcar el hueco (círculo gris), poner bloques después de Seleccionar todo.
- **Versión Tinkercad (Codeblocks):** mismas medidas que la versión Blender. No hay servo de referencia (el archivo `base_garra.blend` es de Blender): se comprueba comparando el hueco con las medidas del servo de la Parte 2. Tinkercad necesita internet y una cuenta por equipo (o una clase de Tinkercad).
- Tiempo total: 10 + 25 + 15 + 50 + 5 + 15 = 120 minutos.
:::
