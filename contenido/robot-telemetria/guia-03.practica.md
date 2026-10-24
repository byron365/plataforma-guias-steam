---
titulo: El robot en 3D (2): la bandeja y el mando
guia: 3
sabado: 3
sesion: Diseño 3D y energía
duracion: 120
---

# Guía 3 · El robot en 3D (2): la bandeja y el mando

## Objetivo del día

Diseñar los postes, la bandeja (el piso de arriba del robot) y la caja del mando.

**Al terminar tendremos:** todas las piezas del robot y del mando exportadas en STL y listas para imprimir.

## Materiales del equipo

- El portabaterías de los motores y el joystick, con una regla o calibrador
- Computadora con internet y la cuenta de Tinkercad

## Parte 1 · Ponerse al día (10 min)

Si el sábado 2 no terminaron el chasis o el soporte del sensor, termínenlos ahora con la **Guía 2, Partes 4 y 5**, y expórtenlos.

## Parte 2 · Medir (10 min)

El portabaterías va dentro de un **cerco** en la bandeja, y el joystick dentro de otro cerco en la tapa del mando. Los huecos se hacen **0,6 mm más grandes** que la pieza, para que entre sin forzar.

:::tabla id="g3p-medidas"
| Medida | Ejemplo (mm) | Nuestra medida (mm) | Hueco = medida + 0,6 |
| --- | --- | --- | --- |
| Portabaterías: largo | 77 | | |
| Portabaterías: ancho | 41 | | |
| Placa del joystick: ancho | 26 | | |
| Placa del joystick: largo | 34 | | |
:::

## Parte 3 · Los postes (10 min)

Los cuatro postes unen el chasis con la bandeja. Tienen un agujero en el centro por donde pasa un palito de pincho.

Creen un diseño nuevo (**+ Crear → Codeblocks**) llamado `equipo_NOMBRE_poste`.

1. **El poste:** un **Cilindro** con **Radio = 5**, **A = 40**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 20**.
2. **El agujero (hueco):** un **Cilindro** con **Radio = 1.8**, **A = 50**, **Lados = 32**, hueco. Debajo, **Mover: X 0, Y 0, Z 20**.
3. **Seleccionar todo** y **Group Selection**. **✔ Revisa:** el agujero atraviesa el poste de arriba abajo.
4. **Exporta** `equipo_NOMBRE_poste.stl`. Es uno solo: el docente imprime **cuatro**.

## Parte 4 · La bandeja (30 min)

La bandeja es el piso de arriba. Tiene los mismos cuatro agujeros que el chasis (para los postes), un paso para los cables y un cerco donde encaja el portabaterías.

[IMAGEN 3.1P: bandeja en Tinkercad Codeblocks, con etiquetas: cerco del portabaterías, paso de los cables, agujeros de los postes, placa de la bandeja y el lugar del Arduino, el L298N y la protoboard]

Diseño nuevo: `equipo_NOMBRE_bandeja`.

1. **La placa:** un **Cubo** con primer **A = 120**, **L = 160**, segundo **A = 3**. Debajo, **Mover: X 0, Y 0, Z 1.5**.
2. **El cerco:** un **Cubo** con primer **A = 83.6**, **L = 47.6**, segundo **A = 8**. Debajo, **Mover: X 0, Y 45, Z 4**.
   - El cerco mide el hueco + 6 (3 mm de pared por cada lado): 77.6 + 6 = 83.6 y 41.6 + 6 = 47.6.
3. **El hueco del portabaterías:** un **Cubo** hueco con primer **A = 77.6**, **L = 41.6** (los de su tabla), segundo **A = 10**. Debajo, **Mover: X 0, Y 45, Z 8**.
   - Empieza justo encima de la placa: la placa no se agujerea.
4. **El paso de los cables (hueco):** un **Cubo** con primer **A = 40**, **L = 12**, segundo **A = 10**, hueco. Debajo, **Mover: X 0, Y −10, Z 1.5**.
5. **Los agujeros de los postes:** cuatro **Cilindros** huecos con **Radio = 1.8**, **A = 10**, **Lados = 32**, en **X ±48** y **Y ±68**, todos con **Z 1.5** (las mismas X e Y del chasis, Guía 2).
6. **Seleccionar todo** y **Group Selection**. **✔ Revisa:** el cerco está del lado del frente (Y positiva) y tiene fondo.
7. **Exporta** `equipo_NOMBRE_bandeja.stl`.

## Parte 5 · La caja del mando (45 min)

El Arduino del mando, su protoboard y el HC-05 van **dentro** de la caja. La **tapa** lleva el joystick encima (en su cerco) y la pantalla debajo, asomada por una ventana.

[IMAGEN 3.2P: caja y tapa del mando en Tinkercad, con etiquetas: agujero para el USB, caja del mando, salida de los cables del joystick, cerco del joystick, ventana de la pantalla y tapa]

**La caja** (diseño `equipo_NOMBRE_caja_mando`):

1. **El bloque:** un **Cubo** con primer **A = 126**, **L = 66**, segundo **A = 33**. Debajo, **Mover: X 0, Y 0, Z 16.5**.
2. **El interior (hueco):** un **Cubo** hueco con primer **A = 120**, **L = 60**, segundo **A = 40**. Debajo, **Mover: X 0, Y 0, Z 23**.
   - Así quedan paredes de 3 mm y un piso de 3 mm.
3. **El agujero del USB (hueco):** un **Cubo** hueco con primer **A = 10**, **L = 16**, segundo **A = 14**. Debajo, **Mover: X −61.5, Y 15, Z 12**.
   - Atraviesa la pared izquierda. El Arduino se pone pegado a esa pared, con su conector USB frente al agujero.
4. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_caja_mando.stl`.

**La tapa** (diseño `equipo_NOMBRE_tapa_mando`):

1. **La placa:** un **Cubo** con primer **A = 126**, **L = 66**, segundo **A = 3**. Debajo, **Mover: X 0, Y 0, Z 1.5**.
2. **La ventana de la pantalla (hueco):** un **Cubo** hueco con primer **A = 25**, **L = 14**, segundo **A = 10**. Debajo, **Mover: X 30, Y 0, Z 1.5**.
3. **El cerco del joystick:** un **Cubo** con primer **A = 32.6**, **L = 40.6**, segundo **A = 6**. Debajo, **Mover: X −30, Y 0, Z 6**.
4. **El hueco del joystick:** un **Cubo** hueco con primer **A = 26.6**, **L = 34.6** (los de su tabla), segundo **A = 10**. Debajo, **Mover: X −30, Y 0, Z 8**.
5. **La salida de los cables (hueco):** un **Cubo** hueco con primer **A = 16**, **L = 10**, segundo **A = 20**. Debajo, **Mover: X −30, Y 18.8, Z 5**.
   - Atraviesa el cerco y la tapa: por ahí bajan los cables del joystick hacia el Arduino.
6. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_tapa_mando.stl`.

:::pregunta id="g3p-p1"
Si nuestro portabaterías midiera 2 mm más de largo, ¿qué números de la bandeja tendríamos que cambiar?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3p-logramos"
- [ ] Exportamos el poste y la bandeja.
- [ ] Exportamos la caja y la tapa del mando.
:::

## Bitácora (10 min)

:::pregunta id="g3p-b1"
¿Qué medida de nuestras piezas fue la más importante para que todo encaje? ¿Por qué?
:::

Antes de irse: suban los `.stl` de hoy juntos en un `.zip`. El docente imprimirá todo para el sábado 4.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban el .zip con sus .stl. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** reemplaza la Guía 3 normal (comparación de puentes H, batería, fusible, regulador y divisor) por el diseño de la bandeja y del mando. Desde el 23 de octubre el robot usa dos fuentes (batería 2S para los motores y pila de 9 V al jack del Arduino) y puente H L298N: no hay regulador que ajustar. Campos propios (g3p-…).
- Impresión: 4 postes (≈ 15 min cada uno), bandeja (≈ 2 h), caja del mando (≈ 2,5 h) y tapa (≈ 1 h), sin soportes. La tapa se imprime con el cerco hacia arriba.
- Portabaterías de los motores de ejemplo: 2 celdas 18650 (77 × 41 mm). Si usan 6 pilas AA (ver la nota de la Guía 3 normal), medir su portapilas.
- La tapa se apoya sobre las paredes de la caja; se sujeta con cinta por un lado (como bisagra) para poder abrirla. El joystick se pega en su cerco con una gota de silicona y la pantalla, por debajo de la ventana.
- g3p-p1: el largo del hueco (77.6 → 79.6) y el del cerco (83.6 → 85.6). Las posiciones no cambian.
- Tiempo total: 10 + 10 + 10 + 30 + 45 + 5 + 10 = 120 minutos.
:::
