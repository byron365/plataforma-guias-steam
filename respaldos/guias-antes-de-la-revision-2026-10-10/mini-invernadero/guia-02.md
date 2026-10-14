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

:::tabla id="g2-plantas"
| Maceta | ¿Ya germinó? | Altura (cm) | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El boceto (25 min)

Mide la caja del equipo y dibuja el invernadero **de frente** y **de lado**:

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

[IMAGEN 2.1: boceto del invernadero de frente y de lado con la ventana en el techo, el depósito y el compartimento seco]

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

:::pregunta id="g2-p1"
¿Por qué el Arduino debe ir en un compartimento separado?
:::

## Parte 3 · Conociendo Blender (15 min)

1. Abre Blender y borra el cubo (**X**).
2. **Propiedades de escena → Unidades**: Escala de unidad **0.001**, Longitud **Milímetros**.

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico |
| Mostrar panel de medidas | Tecla N |

[IMAGEN 2.2: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

## Parte 4 · El soporte del servo (25 min)

1. **Caja exterior:** Shift + A → Malla → Cubo. Panel N: Dimensiones X = 32, Y = 18, Z = 20 · Ubicación Z = 10.
2. **Hueco:** otro cubo de X = 23.4, Y = 12.8, Z = 18 en Z = 12 (un poco más grande que el servo: la **holgura**).
3. Selecciona la caja → Modificadores (llave) → **Booleano** → **Diferencia** → objeto: el hueco. Oculta el hueco (**H**) y aplica.

:::animacion tipo="booleano"
:::

[IMAGEN 2.3: soporte del servo terminado en Blender]

## Parte 5 · La bisagra (25 min)

La bisagra tiene dos **hojas** que giran sobre un **pasador** (un palito de pincho).

1. **Hoja:** cubo de X = 30, Y = 20, Z = 3.
2. **Nudillo:** cilindro de 6 mm de diámetro y 30 mm de largo, acostado en el borde de la hoja (rotación Y = 90°).
3. **Agujero del pasador:** cilindro de **3 mm** de diámetro y 40 mm de largo en el mismo lugar → Booleano Diferencia.
4. Une hoja y nudillo (**Ctrl + J**). Esa es una hoja de la bisagra; se imprimen **dos** y se unen con el palito.

[IMAGEN 2.4: hoja de bisagra con su nudillo y el agujero para el pasador]

:::pregunta id="g2-p2"
El palito mide unos 2,5 mm. ¿Por qué el agujero mide 3 mm?
:::

5. Guarda `equipo_NOMBRE_invernadero.blend`. Exporta (*Solo selección*): `equipo_NOMBRE_soporte.stl` y `equipo_NOMBRE_bisagra.stl`.

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

## Bitácora (15 min)

:::pregunta id="g2-b1"
¿Qué herramienta de Blender nos pareció más útil?
:::

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir esta semana: 1 soporte y 2 hojas de bisagra por equipo (≈1 h en total).
- Si la caja es de plástico delgado, la bisagra se puede pegar con silicona; si es de cartón, también sirve una bisagra de cinta.
- g2-p2: holgura para que el pasador gire sin trabarse.
- Tiempo total: 10 + 25 + 15 + 25 + 25 + 5 + 15 = 120 minutos.
:::
