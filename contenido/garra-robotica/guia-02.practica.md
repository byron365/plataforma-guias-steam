---
titulo: La garra en Blender (1): base y plato giratorio
guia: 2
sabado: 2
sesion: Diseño 3D
duracion: 120
---

# Guía 2 · La garra en Blender (1): base y plato giratorio

## Objetivo del día

Dar los primeros pasos en Blender y modelar la **base** (donde va el servo que hace girar todo el brazo) y el **plato giratorio** (que va encima y sostiene el servo del hombro).

**Al terminar tendremos:** la base y el plato exportados en STL, listos para que el docente los imprima esta semana.

## Materiales del equipo

- 1 servo SG90 (para comparar)
- Computadora con Blender y el archivo `base_garra.blend`
- Mouse con rueda (Blender es mucho más fácil con mouse)

## Parte 1 · Repaso rápido (5 min)

El sábado pasado el servo obedeció a una perilla. Hoy empezamos a diseñar el cuerpo de la garra: la base, el plato, dos eslabones y la pinza.

:::pregunta id="g2p-p1"
¿Entre qué ángulos limitamos el servo y por qué?
:::

## Parte 2 · Conociendo Blender (15 min)

Vamos a usar el archivo `base_garra.blend`. Ya tiene las medidas en milímetros y un servo de referencia en gris.

1. **Descarga el archivo** con el botón de abajo. El navegador lo guarda en la carpeta **Descargas**.

:::descarga archivo="base_garra.blend"
Guárdalo en la computadora y ábrelo con Blender (Archivo → Abrir).
:::

2. **Ábrelo en Blender:** si aparece una ventana de bienvenida, haz clic fuera de ella. Luego **Archivo → Abrir**, entra a **Descargas**, elige `base_garra.blend` y presiona **Abrir**.
3. **Guárdalo con el nombre de tu equipo:** **Archivo → Guardar como**, escribe `equipo_NOMBRE_base.blend` y presiona **Guardar como**. Desde ahora, guarda seguido con **Ctrl + S**.
4. **Conoce las partes de la pantalla:**
   - **Vista 3D:** el espacio grande del centro, donde está el servo gris.
   - **Listado:** la lista de objetos arriba a la derecha.
   - **Propiedades:** el panel de abajo a la derecha, con una columna de iconos pequeños.
   - **Panel N:** se abre y se cierra con la tecla **N** (con el mouse sobre la vista 3D). En su pestaña **Elemento** están la Posición, la Rotación y las Dimensiones.

[IMAGEN 2.2: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico (o las bolitas Y, X y Z del dibujo de ejes de arriba a la derecha) |
| Seleccionar | Clic izquierdo |
| ¿Te perdiste? | Tecla **Inicio** (Home): Blender acomoda la vista para que se vea todo |

## Parte 3 · La base (45 min)

La base es una caja con un hueco donde entra el servo. Sus pestañas se apoyan en el borde de arriba.

Todas las medidas se escriben en el **Panel N → pestaña Elemento**: doble clic en la casilla, escribe el número y **Enter**. Usa **punto** para los decimales (23.4, no 23,4).

1. **Caja exterior:** **Shift + A → Malla → Cubo**. Escribe Dimensiones X = 40, Y = 20, Z = 19 y Posición X = 0, Y = 0, Z = 9.5. En el Listado, doble clic sobre "Cubo" y llámalo `caja`.

[IMAGEN 2.3: panel N con las dimensiones y la ubicación de la caja exterior]

2. **Hueco del servo:** otro cubo, llamado `hueco`, con Dimensiones X = 23.4, Y = 12.8, Z = 17 y Posición X = 0, Y = 0, Z = 11.5. Mide 0,6 mm más que el servo: es la **holgura** para que entre sin forzarlo.
3. **Restar el hueco a la caja:** selecciona la **caja** → en Propiedades, **llave inglesa azul** (Modificadores) → **Agregar modificador → Generar → Booleana** → **Diferencia** → en **Objeto** elige `hueco`.

Miren en la animación qué hace cada modo del modificador Booleana:

:::animacion tipo="booleano"
:::

[IMAGEN 2.4: modificador Booleana en modo Diferencia con el cubo del hueco seleccionado]

4. **Aplicar:** selecciona el `hueco` y ocúltalo con **H** para ver la caja hueca. Vuelve a seleccionar la **caja**, en el modificador haz clic en la flechita **⌄** → **Aplicar**. Borra el `hueco` (clic derecho sobre su nombre en el Listado → **Borrar**).
5. **Agujeros para tornillos:** **Shift + A → Malla → Cilindro** con Dimensiones X = 2, Y = 2, Z = 10 y Posición X = 13.75, Y = 0, Z = 14. Duplícalo (**Shift + D** y **clic derecho**) y cambia la X de la copia a **−13.75**. Selecciona los dos (clic y **Shift + clic**), únelos con **Ctrl + J**, llámalos `tornillos` y réstalos a la caja igual que en los pasos 3 y 4.
6. **Plato de apoyo:** un cilindro con Dimensiones X = 100, Y = 100, Z = 4 y Posición Z = −2. Llámalo `plato`. Evita que la garra se vuelque.
7. **Unir:** clic en el `plato`, **Shift + clic** en la `caja` y **Ctrl + J**. Ahora son una sola pieza, `caja`.

[IMAGEN 2.5: base terminada en Blender, vista 3/4, con el servo de referencia adentro]

**✔ Revisa:** con **Alt + Z** (rayos X) mira de frente, de lado y desde arriba: el servo gris cabe en el hueco sin atravesar las paredes. (Si no se ve el servo, **Alt + H**.)

## Parte 4 · El plato giratorio (30 min)

Va sobre el servo de la base. Encima lleva una pared donde se atornilla el servo del hombro, acostado. Usa la misma técnica: formas y modificadores Booleana.

Primero oculta la base con **H** para que no estorbe.

1. **Plato:** un **Cilindro** con Dimensiones X = 40, Y = 40, Z = 4. Llámalo `plato_giro`.
2. **Agujero central** para el tornillo del brazo del servo: cilindro de X = 2.2, Y = 2.2, Z = 10. Réstalo al `plato_giro`.
3. **Pared de soporte:** un **Cubo** con Dimensiones X = 40, Y = 4, Z = 30 y Posición Z = 17. Llámalo `pared`.
4. **Ventana del servo en la pared:** cubo de X = 23.4, Y = 10, Z = 12.8 con Posición Z = 18. Réstalo a la `pared`.
5. **Agujeros de las pestañas:** cilindro de X = 2, Y = 2, Z = 10; en el Panel N escribe **Rotación X = 90** (queda acostado) y Posición X = 13.75, Y = 0, Z = 18. Duplícalo (**Shift + D**, clic derecho) con X = **−13.75**. Júntalos con **Ctrl + J** y réstalos a la `pared`.
6. **Une plato y pared:** clic en la `pared`, **Shift + clic** en el `plato_giro`, **Ctrl + J**.
7. **Muévelo a un lado:** Posición **Y = 80**.

[IMAGEN 3.2: plato giratorio con su pared de soporte y la ventana del servo]

**✔ Revisa:** la pared está parada sobre el plato, con una ventana rectangular y un agujero a cada lado.

## Parte 5 · Exportar (5 min)

Exporta cada pieza por separado (el servo gris **no** se imprime). Para cada una:

1. Muéstrala si está oculta (**Alt + H**) y haz clic **solo** en su nombre en el Listado.
2. **Archivo → Exportar → STL (.stl)**, activa **Sólo lo seleccionado** a la derecha.
3. Escribe su nombre y presiona **Exportar STL**: `caja` → `equipo_NOMBRE_base.stl` y `plato_giro` → `equipo_NOMBRE_plato.stl`.

Guarda el archivo de Blender con **Ctrl + S**.

## ¿Lo logramos? (5 min)

:::checklist id="g2p-logramos"
- [ ] Sabemos girar, mover y acercar la vista en Blender.
- [ ] La base tiene hueco, agujeros y plato de apoyo.
- [ ] El plato giratorio tiene su pared con ventana y agujeros.
- [ ] Exportamos los dos STL.
:::

## Bitácora (15 min)

:::pregunta id="g2p-b1"
¿Por qué el hueco es un poco más grande que el servo?
:::

:::pregunta id="g2p-b2"
¿Qué fue lo más difícil en Blender y cómo lo resolvimos?
:::

Antes de irse, suban aquí `equipo_NOMBRE_base.blend` y los dos `.stl` juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend) y los .stl. La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (7 sábados), nueva el 24 de octubre:** la Guía 2 normal sin el boceto, más el plato giratorio de la Guía 3 normal. Campos propios (g2p-…).
- Imprimir base y plato esta semana: se montan el sábado 4.
- Si un equipo no termina, puede usar la base de referencia del archivo del docente.
- Errores comunes: escribir medidas sin punto decimal, olvidar ocultar el cubo del hueco, exportar toda la escena en vez de la selección.
- Tiempo total: 5 + 15 + 45 + 30 + 5 + 5 + 15 = 120 minutos.
:::
