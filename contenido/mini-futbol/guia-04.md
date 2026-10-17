---
titulo: La cancha y el trofeo en 3D
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · La cancha y el trofeo en 3D

## Objetivo del día

Construir la cancha con sus líneas a escala, colocar las porterías impresas y escanear en 3D un objeto real (un trofeo o mascota) para imprimirlo.

**Al terminar tendremos:** la cancha armada con sus porterías y el modelo 3D escaneado listo para imprimir.

## Materiales del equipo

- Base de cartón grueso, cartón pluma o MDF de 60 × 40 cm
- Fomi o cartulina verde, marcador o cinta blanca
- Tiras de cartón de 3 cm de alto para las bandas laterales
- Dos porterías impresas
- Regla, compás, tijeras, pegamento caliente
- Celular con app de escaneo 3D (por ejemplo Polycam, KIRI Engine o Scaniverse)
- Objeto para escanear: trofeo pequeño, figura o mascota

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · La cancha (40 min)

1. Corta la base y fórrala con el fomi verde.
   - Si es MDF, el docente la corta. Peguen el fomi con pegamento en las orillas y en el centro, alisándolo con la mano para que no queden burbujas.
2. Traza las líneas con las medidas a escala del sábado 2:
   - Copien en la tabla el radio del círculo y las medidas del área grande que calcularon en la Guía 2.
   - Marquen primero a lápiz con la regla; cuando todo esté bien, repasen con marcador o cinta blanca.
   - El rectángulo de la cancha va centrado en la base (sobran unos 3,75 cm a cada lado del largo y 3 cm a cada lado del ancho).

| Línea | Medida en la maqueta |
| --- | --- |
| Rectángulo de la cancha | 52,5 × 34 cm |
| Círculo central (radio) | |
| Área grande | |

3. Pega las **bandas laterales** (tiras de 3 cm) para que la pelota no se salga. Deja abiertos los huecos de las porterías.
   - Las tiras van paradas sobre las líneas del borde de la cancha.
   - En el centro de cada lado corto dejen un hueco de **10 cm** (el ancho de la portería).
4. Pega las porterías en el centro de cada lado corto. La ventana del sensor debe quedar **mirando hacia la cancha**.
   - La boca de cada portería, justo en su hueco de la banda; el fondo, hacia afuera de la cancha.
5. Haz un agujero pequeño detrás de cada portería para pasar los cables.
   - Con la punta de un lápiz o un destornillador (con cuidado), en la base, justo detrás de la ventana del sensor.

[IMAGEN 4.1: cancha armada con líneas blancas a escala, bandas laterales y las dos porterías pegadas]

:::pregunta id="g4-p1"
¿Por qué las bandas laterales no deben tapar el hueco de las porterías?
:::

## Parte 2 · ¿Qué es el escaneo 3D? (10 min)

Un escáner 3D toma muchas fotos de un objeto desde todos los lados y calcula su forma. Así obtenemos un modelo 3D de algo real **sin modelarlo a mano**. Se usa en museos, en medicina y en los videojuegos.

Miren en la animación cómo las fotos desde distintos lados forman el modelo:

:::animacion tipo="escaneo-3d"
:::

## Parte 3 · Escanear el trofeo (30 min)

1. Pon el objeto sobre una mesa con buena luz y un fondo sin muchos detalles.
   - Luz pareja, sin sol directo ni sombras fuertes. Un mantel o cartulina de un solo color debajo ayuda.
2. Abre la app de escaneo en modo **foto** (fotogrametría).
   - Cada app lo llama un poco distinto ("Photo mode", "Foto"…). Pregunten al docente si no lo encuentran.
3. Camina alrededor del objeto tomando fotos: **una vuelta abajo, una a media altura y una desde arriba**. Al menos 40 fotos.
   - Muévanse despacio, sin mover el objeto. Cada foto debe ver un poco de la anterior.
   - Mantengan siempre el objeto completo dentro de la pantalla.
4. Procesa el modelo y expórtalo como **OBJ** o **STL**.
   - La app tarda unos minutos en procesar. Después, en el menú de exportar, elijan OBJ o STL y envíenlo a la computadora (por correo, cable o como indique el docente).

[IMAGEN 4.2: estudiante escaneando un trofeo pequeño con el celular girando a su alrededor]

| Intento | Número de fotos | ¿Cómo salió el modelo? |
| --- | --- | --- |
| 1 | | |
| 2 | | |

:::pregunta id="g4-p2"
¿Qué partes del objeto fueron más difíciles de escanear? ¿Por qué crees que pasa?
:::

## Parte 4 · Limpiar y escalar en Blender (25 min)

Abran Blender con un archivo nuevo en milímetros (Propiedades → **Escena** → **Unidades** → Escala de unidades 0.001, Longitud Milímetros), borren el cubo y guarden como `equipo_NOMBRE_trofeo.blend`.

- **Unidades:** en el panel **Propiedades** (abajo a la derecha), clic en el icono de **Escena** (cono con dos esferitas) → sección **Unidades** → Escala de unidades **0.001** → Longitud **Milímetros**.
- **Borrar el cubo:** clic en el cubo, mouse sobre la vista 3D y **X → Borrar**.
- **Guardar:** **Archivo → Guardar como**, escriban el nombre y **Guardar**.
- Recuerden: los atajos (Shift + A, N, X, G…) solo funcionan con el **mouse encima de la vista 3D**. Las medidas se escriben en el **Panel N** (tecla **N**) → pestaña **Elemento**: doble clic en la casilla, borren, escriban el número y **Enter**.

1. **Archivo → Importar → OBJ** (o STL).
   - El menú dice **Wavefront (.obj)** o **STL (.stl)**.
   - En la ventana que se abre, busquen la carpeta donde guardaron el archivo del celular, clic sobre él y **Importar**.
   - Si no ven el modelo (puede salir muy pequeño o muy grande), haz clic en su nombre en el Listado y, con el mouse sobre la vista 3D, presiona la tecla **.** del teclado numérico (o **Vista → Encuadrar lo seleccionado**).
2. Borra lo que no sea el objeto (la mesa escaneada): en modo edición selecciona esas caras y bórralas (**X**).
   - **Tab** (Modo Edición), tecla **3** de arriba del teclado (selección de caras), **Alt + A** para no tener nada seleccionado.
   - Arrastra un rectángulo sobre las caras de la mesa (con **Alt + Z** ves a través) y presiona **X → Caras**. Repite hasta dejar solo el objeto. Sal con **Tab**.
3. Si tiene agujeros, usa el modificador **Rehacer malla** (Remesh) en modo **Vóxeles** para cerrarlo.
   - Hazlo **antes** de cambiarle el tamaño. Primero mira su altura en el Panel N (**Dimensiones Z**).
   - Llave inglesa → **Agregar modificador → Generar → Rehacer malla** → modo **Vóxeles**.
   - En **Tamaño de vóxeles** escribe la altura dividida entre 100 (por ejemplo, si Z dice 0.15, escribe 0.0015). Si se ve como una bola sin detalles, bájalo un poco; si Blender se pone muy lento, súbelo.
   - Cuando se vea bien: flechita **⌄ → Aplicar**.
4. Escálalo para que mida **6 cm de alto** (panel **N** → Dimensiones Z = 60).
   - Clic en el objeto. Panel N (tecla **N**) → pestaña **Elemento** → **Dimensiones Z**: doble clic, escriban 60 y **Enter**.
   - Si X e Y no cambiaron igual (el objeto se ve estirado), miren el número que quedó en **Escala Z** y escríbanlo también en **Escala X** y **Escala Y**.
5. Agrega una **base**: cilindro de 30 mm de diámetro y 5 mm de alto debajo del objeto. Une con **Ctrl + J**.
   - Mouse sobre la vista 3D → **Shift + A → Malla → Cilindro** (si no recuerdan el atajo: menú **Agregar** de la barra de arriba de la vista 3D → **Malla → Cilindro**).
   - Panel N → **Elemento** → **Dimensiones**: X = 30, Y = 30, Z = 5. En **Posición** escriban la misma X e Y que tiene el objeto.
   - **Mirar de frente:** tecla **1** del teclado numérico (sin teclado numérico: clic en el círculo verde **sin letra** de los ejes de colores, arriba a la derecha de la vista 3D).
   - **Bajarlo hasta los pies del objeto:** con el cilindro seleccionado, presionen **G** y luego **Z** (así solo se mueve hacia arriba o abajo), muevan el mouse hasta que el cilindro toque la parte de abajo del objeto y hagan clic para soltarlo. Si se arrepienten, clic derecho cancela.
   - **Unirlos:** clic en el cilindro, **Shift + clic** en el objeto y, con el mouse sobre la vista 3D, **Ctrl + J**.
6. Exporta como **equipo_NOMBRE_trofeo.stl**.
   - Clic en el trofeo. Menú **Archivo → Exportar → STL (.stl)**.
   - A la derecha de la ventana, activen **Sólo lo seleccionado**. Abajo escriban el nombre y presionen **Exportar STL**.
   - De vuelta en Blender, guarden con **Ctrl + S**.

[IMAGEN 4.3: trofeo escaneado en Blender, limpio, escalado a 6 cm y con base cilíndrica]

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] La cancha tiene sus líneas a escala.
- [ ] Las porterías están pegadas con la ventana del sensor hacia la cancha.
- [ ] Escaneamos el objeto en 3D.
- [ ] Limpiamos, escalamos y exportamos el trofeo.
:::

## Reto extra

Escanea a un **compañero** (de los hombros hacia arriba) y conviértelo en un jugador miniatura de 4 cm para la cancha.

## Bitácora (10 min)

:::foto id="g4-foto"
Foto de la cancha con las porterías.
:::

:::pregunta id="g4-b1"
¿Qué diferencia hay entre modelar un objeto y escanearlo? ¿Cuándo conviene cada uno?
:::

Antes de irse, suban `equipo_NOMBRE_trofeo.blend` y el `.stl` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y el modelo escaneado (.stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Instalar la app de escaneo antes de la clase en al menos un celular por equipo; Polycam y KIRI tienen modo gratuito con límite de escaneos.
- Objetos brillantes, transparentes o negros escanean mal: sugerir cubrirlos con talco o elegir otro objeto.
- Si el escaneo falla, pueden modelar un trofeo con el modificador Enroscar (Screw) a partir de un perfil.
- Durante la semana: imprimir los trofeos (opcional) para el torneo del sábado 9.
- Equipos con la versión Tinkercad: la Parte 4 se queda en Blender (Codeblocks no abre modelos escaneados). La hace el docente o un equipo que tenga Blender, con el archivo que el equipo escaneó.
- Tiempo total: 40 + 10 + 30 + 25 + 5 + 10 = 120 minutos.
:::
