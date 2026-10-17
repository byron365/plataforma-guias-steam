---
titulo: Nuestra garra, de portada
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Nuestra garra, de portada

## Objetivo del día

Crear una imagen profesional de nuestra garra en Tinkercad, completar la bitácora y reflexionar sobre todo lo que aprendimos.

**Al terminar tendremos:** la imagen final de la garra, la bitácora completa y la reflexión de cada integrante.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Bitácora completa
- Memoria USB o carpeta compartida para guardar los archivos finales

Los diseños de todas las piezas están en Tinkercad (**Diseños → Codeblocks**) y los `.stl` en la sección **Archivos del equipo** de la página del proyecto.

## Parte 1 · Repaso rápido (10 min)

Repasen la bitácora desde el sábado 1.

En la plataforma pueden abrir cada guía y ver sus respuestas y fotos de cada sábado.

:::pregunta id="g13-p1"
¿Cuál fue el momento más emocionante del proyecto?
:::

## Parte 2 · La imagen final (50 min)

Una imagen final (en Blender se llama *render*) es una "foto" del modelo 3D, con colores, como las de los catálogos.

Las piezas están en diseños distintos, así que haremos una **maqueta** de la garra armada en un diseño nuevo: cada pieza como una forma sencilla, en su lugar y con su color.

**Colores:** cada bloque **Añadir** tiene un **círculo de color**: haz clic en él y elige el color de esa pieza.

Recuerda: cada forma nace **centrada** y **Mover** mueve la última forma que agregaste. Aquí **no** se usa Seleccionar todo ni Group Selection: así cada pieza conserva su color.

1. **Diseño nuevo:** **+ Crear → Codeblocks**, con el nombre `equipo_NOMBRE_maqueta`.
2. **Arma la garra de abajo hacia arriba** (ejecuta con **▷** después de cada pieza para revisar):

| Pieza | Bloque y medidas | Mover (X, Y, Z) |
| --- | --- | --- |
| Plato de apoyo | Cilindro: Radio 50, A 4, Lados 64 | 0, 0, −2 |
| Caja de la base | Cubo: 40, 20, 19 | 0, 0, 9.5 |
| Plato giratorio | Cilindro: Radio 20, A 4, Lados 64 | 0, 0, 25 |
| Pared de soporte | Cubo: 40, 4, 30 | 0, 0, 42 |
| Eslabón del hombro (de pie) | Cubo: 20, 4, 100 | 0, −6, 92 |
| Eslabón del codo (hacia adelante) | Cubo: 85, 4, 16 | 42.5, −10, 140 |
| Engrane motriz | Cilindro: Radio 10, A 4, Lados 32 | 95, −20, 140 |
| Engrane seguidor | Cilindro: Radio 10, A 4, Lados 32 | 95, 0.5, 140 |
| Mandíbula 1 | Cubo: 45, 6, 4 | 117.5, −20, 140 |
| Mandíbula 2 | Cubo: 45, 6, 4 | 117.5, 0.5, 140 |

   - En los Cubos, los tres números son primer **A**, **L** y segundo **A** (con **arista = 0**).
   - Es una maqueta: no hacen falta huecos ni dientes. Si quieren, cambien los números para que se parezca más a su garra (por ejemplo, el brazo inclinado con **Girar alrededor**).
3. **Dale color a cada pieza** con su círculo de color: por ejemplo base gris, brazo de un color y pinza de otro.

[IMAGEN 13.1T: maqueta de la garra en Tinkercad Codeblocks con piezas de colores]

4. **Guardar la imagen:**
   - **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**.
   - Gira y acerca la garra hasta que se vea bien ("Incline y aplique zoom para obtener la vista perfecta").
   - Presiona **Captura de pantalla**. La imagen queda en **Descargas**: cámbiale el nombre a `equipo_NOMBRE_render.png`.

[IMAGEN 13.2T: ejemplo de imagen final de una garra en Tinkercad con piezas de colores]

:::foto id="g13-render"
Nuestra imagen final.
:::

## Parte 3 · Revisión de la bitácora (25 min)

Revisen que la bitácora tenga todo. Lo que falte, complétenlo ahora:

Repártanse la lista: cada integrante revisa algunos sábados, en la bitácora de papel y en la plataforma (cada guía guarda sus respuestas y fotos).

:::checklist id="g13-bitacora"
- [ ] Roles del equipo (sábado 1)
- [ ] Boceto con medidas (sábado 2)
- [ ] Diagrama de flujo y cronograma (sábado 3)
- [ ] Fotos de cada etapa del montaje (sábados 4 a 6)
- [ ] Tabla de límites y tabla de pruebas de agarre (sábado 6)
- [ ] Ficha técnica: conexiones, esquema, posiciones y código comentado (sábado 7)
- [ ] Guion y tiempos del reto (sábados 8 y 9)
- [ ] Autoevaluación, gráfica y lista de mejoras (sábado 10)
- [ ] Comparación de versión 1 y versión 2 (sábado 11)
- [ ] Aplicaciones reales y reto programado (sábado 12)
- [ ] Imagen final (hoy)
:::

## Parte 4 · Reflexión individual (20 min)

Cada integrante responde con sus propias palabras:

Cada quien responde desde su propia sesión (entrando con su nombre). No hay respuestas buenas o malas: escriban lo que de verdad piensan.

:::pregunta id="g13-r1" individual="si"
¿Qué sé hacer ahora que no sabía al empezar el proyecto?
:::

:::pregunta id="g13-r2" individual="si"
¿Qué fue lo más difícil y cómo lo superé?
:::

:::pregunta id="g13-r3" individual="si"
¿Qué rol disfruté más: diseñador, constructor, programador o documentador? ¿Por qué?
:::

:::pregunta id="g13-r4" individual="si"
Si empezáramos de nuevo, ¿qué haría distinto?
:::

## Parte 5 · Guardar el trabajo (10 min)

Guarden en la memoria USB o carpeta compartida una carpeta con el nombre del equipo que tenga:

- Archivos .stl de todas las piezas (versión 1 y 2)
- El código final de Arduino (.ino)
- La imagen final
- Fotos y videos del proyecto

Cómo hacerlo:

1. En el Explorador de archivos, entren a la memoria USB (o a la carpeta compartida) y creen una carpeta nueva: clic derecho → **Nuevo → Carpeta**, con el nombre del equipo.
2. Copien adentro cada archivo de la lista (clic derecho → **Copiar**, y en la carpeta, clic derecho → **Pegar**).
3. Revisen que estén todos abriendo la carpeta.
4. Además, compriman esa carpeta en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo en el recuadro de abajo. Si pesa más de 100 MB, suban solo los `.stl` y el `.ino`.

:::archivo id="g13-archivo"
**Archivo de trabajo:** suban aquí el `.zip` con los archivos del equipo. Los diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Tenemos la imagen final de la garra.
- [ ] La bitácora está completa.
- [ ] Cada integrante escribió su reflexión.
- [ ] Guardamos todos los archivos del equipo.
:::

## Reto extra

Hagan una segunda imagen desde otro ángulo, o una animación corta de la garra girando.

Para la segunda imagen: **Compartir** → **Imagen o vídeo**, gira la garra a otro ángulo, **Captura de pantalla** y guárdala con otro nombre (`equipo_NOMBRE_render2.png`). Para la animación, en lugar de Captura de pantalla elijan **GIF animado**.

:::docente
- Las imágenes sirven para un mural del grupo o para compartir con las familias.
- **Versión Tinkercad (Codeblocks):** Codeblocks no puede juntar piezas de otros diseños, por eso se hace una maqueta sencilla con las medidas de cada pieza. Las posiciones de la tabla son un ejemplo: cada equipo puede ajustarlas.
- Las preguntas de la Parte 4 son individuales: cada integrante debe responder con su propio nombre.
- Tiempo total: 10 + 50 + 25 + 20 + 10 + 5 = 120 minutos.
:::
