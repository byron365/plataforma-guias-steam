---
titulo: Nuestra garra, de portada
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Nuestra garra, de portada

## Objetivo del día

Crear una imagen profesional (render) de nuestra garra en Blender, completar la bitácora y reflexionar sobre todo lo que aprendimos.

**Al terminar tendremos:** el render final de la garra, la bitácora completa y la reflexión de cada integrante.

## Materiales del equipo

- Computadora con Blender y todos los archivos de piezas del equipo
- Bitácora completa
- Memoria USB o carpeta compartida para guardar los archivos finales

Si les toca otra computadora, descarguen sus archivos de la sección **Archivos del equipo** de la página del proyecto (base de la Guía 2, brazo de la Guía 3, pinza de la Guía 4 y pinza v2 de la Guía 11). Si alguno es un `.zip`, ábranlo con clic derecho → **Extraer todo**.

## Parte 1 · Repaso rápido (10 min)

Repasen la bitácora desde el sábado 1.

En la plataforma pueden abrir cada guía y ver sus respuestas y fotos de cada sábado.

:::pregunta id="g13-p1"
¿Cuál fue el momento más emocionante del proyecto?
:::

## Parte 2 · El render final (50 min)

Un render es una "foto" del modelo 3D, con colores y luces, como las de los catálogos.

**Preparar el archivo:** abre `equipo_NOMBRE_base.blend` (ya está en milímetros) y guárdalo como `equipo_NOMBRE_render.blend` (**Archivo → Guardar como**). Ahí vas a juntar todas las piezas. Si el servo gris estorba, selecciónalo y bórralo (**X → Borrar**): no es parte de la garra.

1. **Junta todas las piezas** en un archivo nuevo: Archivo → Anexar → elige el .blend de cada pieza → carpeta Object → la pieza. (También puedes usar Archivo → Importar → STL.)
   - **Archivo → Anexar**, busca `equipo_NOMBRE_brazo.blend` y haz doble clic en él.
   - Entra a la carpeta **Object** (puede aparecer como **Objeto**). Verás los nombres que les pusiste a las piezas.
   - Elige `plato_giro` y presiona **Anexar**. Repite para `hombro` y `codo`.
   - Haz lo mismo con el archivo de la pinza (la v2 si la tienen): `engrane_motriz`, `engrane_seguidor` y `placa`.
   - Si una pieza solo la tienen en `.stl`: **Archivo → Importar → STL (.stl)** y elígela.
2. **Arma la garra** en la pantalla, como está en la vida real:
   - Mover: tecla **G** y luego X, Y o Z para mover en un solo eje.
   - Girar: tecla **R**, luego el eje y el número de grados. Ejemplo: R, X, 90.
   - Al terminar cada movimiento, presiona **Enter** (o clic izquierdo) para dejarlo; **Esc** o clic derecho lo cancela.
   - Ve pieza por pieza, de abajo hacia arriba: base, plato giratorio, eslabón del hombro (de pie), eslabón del codo (hacia adelante) y pinza en la punta.
   - Mira desde varios lados (teclas **1**, **3** y **7**, o las bolitas de colores) para revisar que las piezas se toquen sin atravesarse.
   - Si no encuentras una pieza, haz clic en su nombre en el Listado y, con el mouse sobre la vista 3D, presiona la tecla **.** del teclado numérico (o **Vista → Encuadrar lo seleccionado**).
3. **Dale color a cada pieza:** selecciónala → pestaña Material (esfera roja) → Nuevo → cambia el Color base.
   - La pestaña Material es el icono de la **esfera roja**, abajo en la columna de iconos de Propiedades.
   - Presiona **Nuevo**, haz clic en el rectángulo blanco de **Color base** y elige un color en la rueda.

[IMAGEN 13.1: panel de Material con el botón Nuevo y el Color base señalados]

4. **Coloca la cámara:** gira la vista hasta que la garra se vea bien y presiona **Ctrl + Alt + 0** (teclado numérico). La cámara toma esa vista.
   - Si en el Listado **no hay una Cámara**, agrégala primero: **Shift + A → Cámara**.
   - Si **no hay luz**, agrega un sol: **Shift + A → Luz → Sol**. Sin luz, el render sale oscuro.
   - Sin teclado numérico: **Vista → Alinear vista → Alinear cámara activa a la vista**.
   - Verás un rectángulo: es lo que va a salir en la foto. Si la garra queda cortada, aléjate un poco con la rueda y vuelve a alinear la cámara.
5. **Motor de procesamiento:** pestaña Procesamiento (cámara trasera) → Motor: Eevee.
   - Es el icono de la parte de atrás de una cámara, arriba en la columna de iconos de Propiedades. En **Motor de procesamiento** elige **EEVEE**.
6. **Renderiza:** presiona **F12**. En la ventana que se abre: Imagen → Guardar como → `equipo_NOMBRE_render.png`.
   - Espera a que la imagen termine de aparecer (unos segundos).
   - Si sale toda gris u oscura, revisa el paso 4 (cámara y luz).
   - Cierra la ventana del render cuando hayas guardado la imagen. Guarda también el archivo de Blender con **Ctrl + S**.

[IMAGEN 13.2: ejemplo de render final de una garra con piezas de colores]

:::foto id="g13-render"
Nuestro render final.
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
- [ ] Render final (hoy)
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

- Archivos .blend y .stl de todas las piezas (versión 1 y 2)
- El código final de Arduino (.ino)
- El render final
- Fotos y videos del proyecto

Cómo hacerlo:

1. En el Explorador de archivos, entren a la memoria USB (o a la carpeta compartida) y creen una carpeta nueva: clic derecho → **Nuevo → Carpeta**, con el nombre del equipo.
2. Copien adentro cada archivo de la lista (clic derecho → **Copiar**, y en la carpeta, clic derecho → **Pegar**).
3. Revisen que estén todos abriendo la carpeta.
4. Además, compriman esa carpeta en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo en el recuadro de abajo. Si pesa más de 100 MB, suban solo los `.blend`, los `.stl` y el `.ino`.

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Tenemos el render final de la garra.
- [ ] La bitácora está completa.
- [ ] Cada integrante escribió su reflexión.
- [ ] Guardamos todos los archivos del equipo.
:::

## Reto extra

Hagan un segundo render desde otro ángulo, o una animación corta girando la cámara alrededor de la garra.

Para el segundo render: gira la vista a otro ángulo, vuelve a alinear la cámara (paso 4), presiona **F12** y guárdala con otro nombre (`equipo_NOMBRE_render2.png`).

:::docente
- Los renders sirven para un mural del grupo o para compartir con las familias.
- Si un equipo tiene piezas desalineadas al anexar, revisar que todas usen la misma escala (milímetros).
- Las preguntas de la Parte 4 son individuales: cada integrante debe responder con su propio nombre.
- Tiempo total: 10 + 50 + 25 + 20 + 10 + 5 = 120 minutos.
:::
