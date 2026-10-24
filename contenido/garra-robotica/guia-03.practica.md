---
titulo: La garra en Blender (2): eslabones y pinza
guia: 3
sabado: 3
sesion: Diseño 3D
duracion: 120
---

# Guía 3 · La garra en Blender (2): eslabones y pinza

## Objetivo del día

Modelar en Blender los dos **eslabones** del brazo (hombro y codo) y la **pinza de engranes**.

**Al terminar tendremos:** las cinco piezas que faltan exportadas en STL; con las del sábado 2, toda la garra lista para imprimir.

## Materiales del equipo

- Computadora con Blender y el archivo `equipo_NOMBRE_base.blend` del sábado 2. Si les toca otra computadora, descárguenlo del recuadro "Archivo de trabajo" de la Guía 2 o de "Archivos del equipo" en la página del proyecto.

## Parte 1 · Ponerse al día (10 min)

Si el sábado 2 no terminaron la base o el plato, termínenlos ahora con la **Guía 2** y expórtenlos.

**Recordatorio de cómo restar con el modificador Booleana** (lo usarás muchas veces hoy): selecciona la pieza → **llave inglesa azul** en Propiedades → **Agregar modificador → Generar → Booleana** → **Diferencia** → en **Objeto** elige el cortador → flechita **⌄ → Aplicar** → borra el cortador (clic derecho sobre su nombre en el Listado → **Borrar**).

Las medidas van en el **Panel N** (tecla N), pestaña **Elemento**. Cuando no se indique una Posición, deja X = 0, Y = 0, Z = 0. Ponle nombre a cada objeto en el Listado.

## Parte 2 · Los eslabones (30 min)

**Preparar el archivo:** abre `equipo_NOMBRE_base.blend` y guárdalo como `equipo_NOMBRE_brazo.blend` (**Archivo → Guardar como**). Oculta la base y el plato con **H**.

**Eslabón del hombro:** une el servo del hombro con el servo del codo. Es una barra plana con un agujero en una punta y la ventana de un servo en la otra.

1. **Barra:** cubo de X = 100, Y = 20, Z = 4. Llámalo `hombro`.
2. **Agujero del eje** en un extremo: cilindro de X = 2.2, Y = 2.2, Z = 10 con Posición X = −42. Réstalo al `hombro`.
3. **Ventana del servo del codo** en el otro extremo: cubo de X = 23.4, Y = 12.8, Z = 10 con Posición X = 30. Réstalo.
4. **Agujeros de las pestañas:** dos cilindros de X = 2, Y = 2, Z = 10 (parados), en X = 16.25 y X = 43.75 (13.75 mm a cada lado del centro de la ventana). Júntalos con **Ctrl + J** y réstalos.
5. **Muévelo a un lado:** Posición **Y = −80**.

[IMAGEN 3.3: eslabón del hombro con el agujero del eje y la ventana del servo]

**Eslabón del codo:** igual pero más corto y un poco más angosto; une el codo con la pinza. Se hace con **los mismos pasos**, con otros números.

**Ojo:** no lo hagas duplicando el hombro y cambiando sus Dimensiones: Blender estiraría también la ventana y los agujeros, y el servo ya no entraría.

1. **Barra:** cubo de X = 85, Y = 16, Z = 4. Llámalo `codo`.
2. **Agujero del eje:** cilindro de X = 2.2, Y = 2.2, Z = 10 en X = −34.5. Réstalo.
3. **Ventana del servo:** cubo de X = 23.4, Y = 12.8, Z = 10 en X = 22.5. Réstalo.
4. **Agujeros de las pestañas:** cilindros de X = 2, Y = 2, Z = 10 en X = 8.75 y X = 36.25. Júntalos y réstalos.

**Exporta** cada eslabón (clic solo en él → **Archivo → Exportar → STL**, **Sólo lo seleccionado**): `equipo_NOMBRE_hombro.stl` y `equipo_NOMBRE_codo.stl`. Guarda con **Ctrl + S**.

:::pregunta id="g3p-p1"
¿Por qué el eslabón del codo es más corto que el del hombro? (Pista: palanca y peso.)
:::

## Parte 3 · La pinza de engranes (60 min)

La pinza tiene dos engranes iguales que giran en sentidos opuestos. El servo mueve uno (el **motriz**) y el otro lo sigue (el **seguidor**): así las dos mitades cierran parejas.

:::animacion tipo="engranes"
:::

[IMAGEN 4.3: render de la pinza de engranes terminada, señalando engrane motriz y engrane seguidor]

**Preparar el archivo:** abre `equipo_NOMBRE_base.blend` y guárdalo como `equipo_NOMBRE_pinza.blend`. Oculta la base y el plato con **H**; deja el servo gris a la vista (lo usarás en el paso 7).

1. **Activar los engranes en Blender** (solo la primera vez en cada computadora):
   - Con el mouse sobre la vista 3D, **Shift + A → Malla**. Si ya aparece **Gears** (o **Engranajes**), salta al paso 2.
   - Si no aparece: **Editar → Preferencias → Administrar extensiones**; si sale **Permitir acceso en línea**, presiónalo; busca **Extra Mesh Objects** y presiona **Instalar**. Cierra la ventana.

[IMAGEN 4.4: ventana de Preferencias con el complemento Extra Mesh Objects activado]

2. **Engrane motriz:** **Shift + A → Malla → Gears → Gear** (los menús de esta extensión salen en inglés). En el panel pequeño de abajo a la izquierda escribe enseguida **Number of Teeth = 12**, **Radius = 10**, **Width = 4**. Revisa que la Posición X sea 0. Llámalo `engrane_motriz`.
   - Si haces otra cosa antes, ese panel desaparece: borra el engrane y créalo otra vez.

[IMAGEN 4.5: panel de opciones del engranaje con 12 dientes, radio 10 y ancho 4]

3. **Engrane seguidor:** **Shift + D** y **clic derecho**; en el Panel N, Posición **X = 20.5**. Llámalo `engrane_seguidor`.
   - Mira desde arriba (tecla **7**) donde se tocan: los dientes deben encajar sin encimarse. Si se enciman, prueba **Rotación Z = 15** (medio diente).
4. **Mandíbula:** cubo de X = 6, Y = 45, Z = 4 con Posición X = 0, Y = −22.5. Llámalo `mandibula_1`. **Todavía no lo unas** al engrane.
5. **Simetría:**
   - Duplica la mandíbula (**Shift + D**, clic derecho), Posición X = 20.5, y llámala `mandibula_2`.
   - Refléjala: con el mouse sobre la vista 3D, **Ctrl + M**, tecla **X** y **Enter**.
   - Une cada mandíbula con su engrane: `mandibula_1` + **Shift + clic** `engrane_motriz` + **Ctrl + J**; después `mandibula_2` + **Shift + clic** `engrane_seguidor` + **Ctrl + J**.
6. **Agujeros:**
   - Centro del engrane motriz: cilindro de X = 2.2, Y = 2.2, Z = 10 en X = 0, Y = 0 (tornillo del brazo del servo). Réstalo al `engrane_motriz`.
   - Centro del engrane seguidor: cilindro de X = 3.2, Y = 3.2, Z = 10 en X = 20.5, Y = 0 (tornillo M3 que hace de eje). Réstalo al `engrane_seguidor`.
7. **Placa de soporte:**
   - Cubo de X = 60, Y = 35, Z = 4 llamado `placa`, **detrás** de los engranes (del lado contrario a las mandíbulas) y **debajo** de ellos, cubriendo los dos centros. Mira de frente (tecla **1**) y baja su Posición Z hasta que quede justo debajo de los engranes.
   - **Ventana del servo:** mueve el servo gris (Panel N) hasta que su **eje** quede debajo del centro del engrane motriz (compruébalo desde arriba con **Alt + Z**). Agrega un cubo de X = 23.4, Y = 12.8, Z = 10 centrado en el **cuerpo** del servo y réstalo a la `placa`.
   - **Agujero bajo el engrane seguidor:** cilindro de X = 3.2, Y = 3.2, Z = 10 en X = 20.5, Y = 0. Réstalo a la `placa`.
8. **Exporta** tres archivos (clic solo en cada pieza → **Exportar → STL**, **Sólo lo seleccionado**):
   - `engrane_motriz` → `equipo_NOMBRE_pinza_motriz.stl`
   - `engrane_seguidor` → `equipo_NOMBRE_pinza_seguidor.stl`
   - `placa` → `equipo_NOMBRE_pinza_placa.stl`

   Guarda con **Ctrl + S**.

## ¿Lo logramos? (5 min)

:::checklist id="g3p-logramos"
- [ ] Modelamos los dos eslabones.
- [ ] Modelamos los dos engranes con sus mandíbulas.
- [ ] La placa tiene la ventana del servo y el agujero del seguidor.
- [ ] Exportamos las cinco piezas en STL.
:::

## Bitácora (15 min)

:::pregunta id="g3p-b1"
¿Por qué los dos engranes de la pinza deben ser iguales?
:::

Antes de irse, guarden juntos en un `.zip` los archivos `equipo_NOMBRE_brazo.blend` y `equipo_NOMBRE_pinza.blend` y los cinco `.stl`, y súbanlo aquí. El docente imprimirá todo para el sábado 4.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban sus archivos de Blender (.blend) y los .stl en un .zip. La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (7 sábados), nueva el 24 de octubre:** los eslabones de la Guía 3 normal y la pinza de la Guía 4 normal, sin diagrama de flujo ni cronograma. Campos propios (g3p-…).
- La extensión Extra Mesh Objects (engranes) se instala con internet una sola vez por computadora: **instalarla antes de la clase**.
- Imprimir eslabones y pinza esta semana. Revisar en el programa de impresión que las piezas midan lo correcto (si salen diminutas, la escala de exportación está mal). Los engranes pueden necesitar lijado ligero.
- Los equipos más lentos pueden usar las piezas de referencia del docente.
- g3p-p1: el servo del hombro carga todo lo que está más allá; un antebrazo corto pesa menos y hace menos palanca.
- Tiempo total: 10 + 30 + 60 + 5 + 15 = 120 minutos.
:::
