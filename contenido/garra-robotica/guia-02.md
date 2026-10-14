---
titulo: Del papel a Blender
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Del papel a Blender

## Objetivo del día

Dibujar nuestra garra con medidas reales y dar los primeros pasos en Blender modelando la **base**, la pieza donde irá el servo que hace girar todo el brazo.

**Al terminar tendremos:** boceto con medidas y el archivo de Blender de la base, listo para que el docente lo imprima esta semana.

## Materiales del equipo

- Bitácora, lápiz, regla y borrador
- 1 servo SG90 (para medirlo)
- Calibrador o regla con milímetros
- Computadora con Blender y el archivo `base_garra.blend`
- Mouse con rueda (Blender es mucho más fácil con mouse)

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

## Parte 3 · Conociendo Blender (15 min)

Vamos a usar el archivo `base_garra.blend`. Ya tiene las medidas en milímetros y un servo de referencia en gris.

1. **Descarga el archivo** con el botón de abajo. El navegador lo guarda en la carpeta **Descargas**.

:::descarga archivo="base_garra.blend"
Guárdalo en la computadora y ábrelo con Blender (Archivo → Abrir).
:::

2. **Ábrelo en Blender:** abre Blender. Si aparece una ventana de bienvenida, haz clic fuera de ella para cerrarla. Luego ve a **Archivo → Abrir**, entra a la carpeta **Descargas**, elige `base_garra.blend` y presiona **Abrir**.

3. **Guárdalo con el nombre de tu equipo** para no cambiar la plantilla: **Archivo → Guardar como**, escribe `equipo_NOMBRE_base.blend` (cambia NOMBRE por el de tu equipo) y presiona **Guardar como**. Desde ahora, guarda seguido con **Ctrl + S**.

4. **Conoce las partes de la pantalla:**
   - **Vista 3D:** el espacio grande del centro, donde está el servo gris.
   - **Listado:** la lista de objetos arriba a la derecha. Ahí aparece cada pieza con su nombre.
   - **Propiedades:** el panel de abajo a la derecha, con una columna de iconos pequeños.
   - **Panel N:** se abre y se cierra con la tecla **N** (con el mouse sobre la vista 3D). En su pestaña **Elemento** están la Posición, la Rotación y las Dimensiones del objeto seleccionado.

[IMAGEN 2.2: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

5. **Aprende a moverte.** Pon el mouse sobre la vista 3D y prueba cada acción:

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico |
| Seleccionar | Clic izquierdo |
| Mostrar panel de medidas | Tecla N |

   **¿Tu teclado no tiene números a la derecha (teclado numérico)?** Usa el dibujo de ejes de colores arriba a la derecha de la vista 3D: haz clic en la bolita **Y** (verde) para ver de frente, en la **X** (roja) para ver de lado y en la **Z** (azul) para ver desde arriba. También sirve el menú **Vista → Punto de vista**.

   **¿Te perdiste?** Pon el mouse sobre la vista 3D y presiona la tecla **Inicio** (Home): Blender acomoda la vista para que se vea todo.

**Prueba:** gira alrededor del servo gris y míralo de frente, de lado y desde arriba.

## Parte 4 · Modelando la base (50 min)

La base es una caja con un hueco donde entra el servo. Sus pestañas se apoyan en el borde de arriba.

Todas las medidas se escriben en el **Panel N → pestaña Elemento**. Para escribir un número: haz doble clic en la casilla, borra lo que tiene, escribe el número y presiona **Enter**. Usa **punto** para los decimales (23.4, no 23,4).

1. **Caja exterior:**
   - Pon el mouse sobre la vista 3D y presiona **Shift + A → Malla → Cubo**. Aparece un cubo pequeño en el centro.
   - Abre el Panel N (tecla **N**) y, con el cubo seleccionado, escribe:
   - Dimensiones: X = 40, Y = 20, Z = 19
   - Posición: X = 0, Y = 0, Z = 9.5
   - **Ponle nombre:** en el Listado, haz doble clic sobre "Cubo", escribe `caja` y presiona Enter. Con nombres es mucho más fácil no confundirse.

[IMAGEN 2.3: panel N con las dimensiones y la ubicación de la caja exterior]

2. **Hueco del servo:** agrega otro cubo (**Shift + A → Malla → Cubo**), llámalo `hueco` y escribe:
   - Dimensiones: X = 23.4, Y = 12.8, Z = 17
   - Posición: X = 0, Y = 0, Z = 11.5

   Mide 0,6 mm más que el servo: es la **holgura** para que entre sin forzarlo.

3. **Restar el hueco a la caja:**
   - Haz clic en la **caja** para seleccionarla (también puedes hacer clic en su nombre en el Listado).
   - En Propiedades, haz clic en el icono de la **llave inglesa azul** (Modificadores).
   - Presiona **Agregar modificador → Generar → Booleana**.
   - Revisa que esté elegido **Diferencia** (significa "restar").
   - En la casilla **Objeto**, haz clic y elige `hueco` de la lista.

Miren en la animación qué hace cada modo del modificador Booleana:

:::animacion tipo="booleano"
:::

[IMAGEN 2.4: modificador Booleana en modo Diferencia con el cubo del hueco seleccionado]

4. **Mira el resultado:** selecciona el cubo del `hueco` y ocúltalo con la tecla **H**. ¡Ya ves la caja hueca!

5. **Aplica el modificador** para que el hueco quede fijo en la caja:
   - Vuelve a seleccionar la **caja**.
   - En el modificador Booleana, haz clic en la flechita **⌄** que está a la derecha de su nombre y elige **Aplicar** (o pon el mouse sobre el modificador y presiona Ctrl + A).
   - El modificador desaparece de la lista: eso significa que ya se aplicó.
   - Ahora borra el cubo del hueco, que ya no sirve: en el Listado, haz clic derecho sobre `hueco` → **Borrar**.

6. **Agujeros para tornillos:**
   - Agrega un cilindro: **Shift + A → Malla → Cilindro**.
   - Escribe Dimensiones X = 2, Y = 2, Z = 10 y Posición X = 13.75, Y = 0, Z = 14.
   - Duplícalo: con el cilindro seleccionado presiona **Shift + D** y enseguida **clic derecho** (así la copia se queda en el mismo lugar). Cambia la Posición X de la copia a **−13.75** (con el signo menos).
   - Junta los dos cilindros en un solo objeto: haz clic en uno, **Shift + clic** en el otro y presiona **Ctrl + J**. Llámalo `tornillos`.
   - Resta los `tornillos` a la caja igual que en los pasos 3 a 5: selecciona la caja → llave inglesa → Agregar modificador → Generar → Booleana → Diferencia → Objeto: `tornillos` → Aplicar → borra `tornillos` desde el Listado.

7. **Plato de apoyo:** agrega un cilindro y escribe Dimensiones X = 100, Y = 100, Z = 4 y Posición X = 0, Y = 0, Z = −2. Llámalo `plato`. Es un disco ancho que evita que la garra se vuelque.

8. **Unir:** haz clic en el `plato`, luego **Shift + clic** en la `caja` y presiona **Ctrl + J**. Ahora son una sola pieza, que conserva el nombre `caja`.

[IMAGEN 2.5: base terminada en Blender, vista 3/4, con el servo de referencia adentro]

9. **Comprueba:** el servo gris de referencia debe caber en el hueco sin atravesar las paredes.
   - Si el servo no se ve, presiona **Alt + H** (muestra todo lo oculto).
   - Presiona **Alt + Z** para ver a través de las piezas (vista de rayos X) y míralo de frente, de lado y desde arriba. Presiona Alt + Z otra vez para volver a la vista normal.
   - Si el servo atraviesa una pared, revisa las medidas del paso 2.

10. **Guarda y exporta:**
    - Guarda con **Ctrl + S** (el archivo ya se llama `equipo_NOMBRE_base.blend`).
    - Haz clic **solo en la base** para seleccionarla (el servo gris no se debe imprimir).
    - Ve a **Archivo → Exportar → STL (.stl)**.
    - En la ventana que se abre, a la derecha, activa la casilla **Sólo lo seleccionado**.
    - Escribe el nombre `equipo_NOMBRE_base.stl` y presiona **Exportar STL**.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Medimos el servo y completamos la tabla.
- [ ] Tenemos el boceto de la garra con medidas.
- [ ] Sabemos girar, mover y acercar la vista en Blender.
- [ ] La base tiene hueco, agujeros y plato de apoyo.
- [ ] Guardamos el .blend y exportamos el STL.
:::

## Reto extra

Agrega una ranura de 8 × 4 mm en una pared de la base para que salgan los cables del servo.

Pista: es otro modificador Booleana en modo Diferencia. Usa un cubo de 8 mm de ancho y 4 mm de alto, un poco más largo que el grueso de la pared para que la atraviese completa, y colócalo en la pared por donde salen los cables del servo gris.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Qué herramienta de Blender nos pareció más útil?
:::

:::pregunta id="g2-b2"
¿Por qué el hueco es un poco más grande que el servo?
:::

:::pregunta id="g2-b3"
¿Qué fue lo más difícil y cómo lo resolvimos?
:::

Antes de irse, suban aquí `equipo_NOMBRE_base.blend` (y el `.stl`, si lo exportaron). Así la próxima sesión lo descargan en cualquier computadora.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las bases esta semana: se montan el sábado 4.
- Si un equipo no termina, puede usar la base de referencia del archivo del docente.
- Errores comunes: escribir medidas sin punto decimal, olvidar ocultar el cubo del hueco, exportar toda la escena en vez de la selección.
- Tiempo total: 10 + 25 + 15 + 50 + 5 + 15 = 120 minutos.
:::
