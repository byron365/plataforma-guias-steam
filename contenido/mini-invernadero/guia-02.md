---
titulo: Diseñar la casa de la planta
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Diseñar la casa de la planta

## Objetivo del día

Dibujar el invernadero con medidas y dar los primeros pasos en Blender modelando el soporte del servo y la bisagra de la ventana.

**Al terminar tendremos:** el boceto del invernadero y dos piezas exportadas para imprimir: el soporte del servo y la bisagra.

## Materiales del equipo

- Bitácora, lápiz, regla
- La caja que usaremos (para medirla)
- 1 servo SG90 (para medirlo)
- Computadora con Blender y mouse con rueda

## Parte 1 · Revisar las plantas (10 min)

Cada sábado empezamos revisando las dos macetas:

- **¿Ya germinó?** Si ya salió de la tierra algún brote verde.
- **Altura:** pon la regla parada en la tierra, junto a la planta más alta, y mide hasta la punta. Si no ha salido, escribe 0.
- **Observaciones:** color, si la tierra está seca o húmeda, si hay hojitas…

:::tabla id="g2-plantas"
| Maceta | ¿Ya germinó? | Altura (cm) | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El boceto (25 min)

Mide la caja del equipo y dibuja el invernadero **de frente** y **de lado**:

Midan con la regla por fuera de la caja: **largo** es el lado más grande de la base, **ancho** el más corto y **alto** desde la mesa hasta arriba.

| Medida de la caja | Valor (cm) |
| --- | --- |
| Largo | |
| Ancho | |
| Alto | |

En el boceto marca:

1. La **maceta** en el centro.
2. La **ventana** en el techo (por ahí sale el aire caliente, porque el aire caliente sube).
3. El **servo** que empuja la ventana.
4. El **depósito de agua**, la **bomba** y la **manguera** que llega a la maceta.
5. Un **compartimento seco**, separado, para el Arduino y la protoboard.

Hagan dos dibujos en la misma hoja: "de frente" (como si miraran la caja de cara) y "de lado" (desde un costado). Escriban las medidas de la caja junto a cada lado.

[IMAGEN 2.1: boceto del invernadero de frente y de lado con la ventana en el techo, el depósito y el compartimento seco]

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

:::pregunta id="g2-p1"
¿Por qué el Arduino debe ir en un compartimento separado?
:::

## Parte 3 · Conociendo Blender (15 min)

1. Abre Blender y borra el cubo (**X**).
   - Si aparece una ventana de bienvenida, haz clic fuera de ella.
   - Clic en el cubo, mouse sobre la vista 3D y **X → Borrar** (o la tecla Suprimir).
2. **Propiedades de la escena → Unidades**: Escala de unidades **0.001**, Longitud **Milímetros**.
   - En el panel **Propiedades** (abajo a la derecha), haz clic en el icono de **Escena** (un cono con dos esferitas) y abre **Unidades**.
   - **Escala de unidades:** escribe 0.001 y Enter. **Longitud:** elige Milímetros.
   - Así, cuando escribas 32, Blender entiende 32 mm.
3. Guarda: **Archivo → Guardar como** → `equipo_NOMBRE_invernadero.blend`. Desde ahora guarda seguido con **Ctrl + S**.

Pon el mouse sobre la vista 3D y prueba cada acción:

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico |
| Mostrar panel de medidas | Tecla N |

- **¿Sin teclado numérico?** Usa el dibujo de ejes arriba a la derecha de la vista: bolita **Y** (verde) = de frente, **X** (roja) = de lado, **Z** (azul) = desde arriba. O el menú **Vista → Punto de vista**.
- **¿Te perdiste?** Tecla **Inicio** (Home) con el mouse sobre la vista.
- El **Panel N** tiene la pestaña **Elemento** (Posición, Rotación, Dimensiones). El **Listado**, arriba a la derecha, es la lista de objetos.

[IMAGEN 2.2: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

## Parte 4 · El soporte del servo (25 min)

Las medidas se escriben en el **Panel N → Elemento**: doble clic en la casilla, escribe y Enter. Decimales con **punto** (23.4).

1. **Caja exterior:** Shift + A → Malla → Cubo. Panel N: Dimensiones X = 32, Y = 18, Z = 20 · Posición Z = 10.
   - En el Listado, doble clic en su nombre y llámalo `soporte`.
2. **Hueco:** otro cubo de X = 23.4, Y = 12.8, Z = 18 en Z = 12 (un poco más grande que el servo: la **holgura**).
   - Llámalo `hueco`.
3. Selecciona la caja → Modificadores (llave) → **Booleana** → **Diferencia** → objeto: el hueco. Oculta el hueco (**H**) y aplica.
   - Clic en el `soporte` → en Propiedades, icono de la **llave inglesa azul** → **Agregar modificador → Generar → Booleana**.
   - Revisa que diga **Diferencia** y en **Objeto** elige `hueco`.
   - Clic en el `hueco` y **H** para ocultarlo: ya ves el soporte hueco.
   - Clic otra vez en el `soporte` → flechita **⌄** del modificador → **Aplicar**.
   - Borra el `hueco`: clic derecho sobre su nombre en el Listado → **Borrar**.
4. Muévelo a un lado para que no estorbe a la bisagra: Posición X = **60**.

Miren en la animación qué hace cada modo del modificador Booleana:

:::animacion tipo="booleano"
:::

[IMAGEN 2.3: soporte del servo terminado en Blender]

## Parte 5 · La bisagra (25 min)

La bisagra tiene dos **hojas** que giran sobre un **pasador** (un palito de pincho).

1. **Hoja:** cubo de X = 30, Y = 20, Z = 3.
   - Llámalo `hoja`. Déjalo en Posición X = 0, Y = 0, Z = 0.
2. **Nudillo:** cilindro de 6 mm de diámetro y 30 mm de largo, acostado en el borde de la hoja (rotación Y = 90°).
   - **Shift + A → Malla → Cilindro**, con Dimensiones X = 6, Y = 6, Z = 30.
   - Acuéstalo: Rotación Y = **90**. Ahora va a lo largo de la hoja.
   - Ponlo en el borde: Posición X = 0, Y = **10**, Z = 0. (La hoja mide 20 en Y, así que su borde está en Y = 10.) Llámalo `nudillo`.
3. **Agujero del pasador:** cilindro de **3 mm** de diámetro y 40 mm de largo en el mismo lugar → modificador Booleana en modo Diferencia.
   - Cilindro con Dimensiones X = 3, Y = 3, Z = 40, Rotación Y = 90 y la misma Posición del nudillo (Y = 10).
   - Réstalo al `nudillo` con el modificador Booleana (Diferencia → Aplicar → borra el cortador).
   - **✔ Revisa** de lado (tecla **3** o bolita **X**): debe verse un círculo con agujero en el borde de la hoja.
4. Une hoja y nudillo (**Ctrl + J**). Esa es una hoja de la bisagra; se imprimen **dos** y se unen con el palito.
   - Clic en el `nudillo`, **Shift + clic** en la `hoja`, **Ctrl + J**. La pieza se queda con el nombre `hoja`.

[IMAGEN 2.4: hoja de bisagra con su nudillo y el agujero para el pasador]

:::pregunta id="g2-p2"
El palito mide unos 2,5 mm. ¿Por qué el agujero mide 3 mm?
:::

5. Guarda `equipo_NOMBRE_invernadero.blend`. Exporta (*Sólo lo seleccionado*): `equipo_NOMBRE_soporte.stl` y `equipo_NOMBRE_bisagra.stl`.
   - Guarda con **Ctrl + S**.
   - Para cada pieza: clic solo en ella → **Archivo → Exportar → STL (.stl)** → activa **Sólo lo seleccionado** (a la derecha) → nombre → **Exportar STL**.
   - Solo se exporta **una** hoja: el docente imprime dos copias.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Revisamos las plantas.
- [ ] El boceto tiene medidas y todas sus partes.
- [ ] Modelamos el soporte del servo.
- [ ] Modelamos la bisagra.
- [ ] Exportamos las dos piezas en STL.
:::

## Reto extra

Agrega dos agujeros de 3 mm en cada hoja de la bisagra para atornillarla o coserla a la caja.

Pista: dos cilindros de 3 mm de diámetro, parados (sin rotación) y más altos que la hoja, en la parte plana de la hoja, lejos del nudillo. Réstalos con el modificador Booleana y vuelve a exportar.

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Qué herramienta de Blender nos pareció más útil?
:::

Antes de irse, guarden juntos en un `.zip` el `.blend` y los dos `.stl` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. La próxima semana seguirán en este archivo.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir esta semana: 1 soporte y 2 hojas de bisagra por equipo (≈1 h en total).
- Si la caja es de plástico delgado, la bisagra se puede pegar con silicona; si es de cartón, también sirve una bisagra de cinta.
- g2-p2: holgura para que el pasador gire sin trabarse.
- Tiempo total: 10 + 25 + 15 + 25 + 25 + 5 + 15 = 120 minutos.
:::
