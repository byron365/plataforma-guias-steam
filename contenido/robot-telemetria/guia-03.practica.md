---
titulo: El robot en 3D (2): la bandeja y el mando
guia: 3
sabado: 3
sesion: Diseño 3D y energía
duracion: 120
---

# Guía 3 · El robot en 3D (2): la bandeja y el mando

## Objetivo del día

Diseñar los postes, la bandeja (el piso de arriba del robot) y la caja del mando, y dejar el regulador LM2596 ajustado a 5 V para la próxima semana.

**Al terminar tendremos:** todas las piezas del robot y del mando exportadas en STL y el regulador entregando 5,0 V.

## Materiales del equipo

- El portabaterías del robot y el joystick, con una regla o calibrador
- Computadora con internet y la cuenta de Tinkercad
- Regulador LM2596, batería (o fuente de 7–8 V), multímetro y destornillador pequeño

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

[IMAGEN 3.1P: bandeja en Tinkercad Codeblocks, con etiquetas: cerco del portabaterías, paso de los cables, agujeros de los postes, placa de la bandeja y el lugar del Arduino, la protoboard y el LM2596]

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

## Parte 5 · La caja del mando (35 min)

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

## Parte 6 · El regulador a 5 V (15 min)

El **LM2596** baja el voltaje de la batería (unos 7,4 V) a **5 V** para el Arduino. Viene sin ajustar: hay que ajustarlo **antes** de conectarlo.

1. Conecta la batería (o fuente) a la entrada IN+ / IN−.
   - Positivo (rojo) a **IN+** y negativo (negro) a **IN−**. Revisen dos veces antes de conectar: al revés se puede dañar.
2. Con el multímetro en la salida, gira el tornillo del potenciómetro azul hasta leer **5,0 V**.
   - Multímetro en **voltaje de corriente directa** (V con una línea recta, escala 20 V). Punta roja en **OUT+**, negra en **OUT−**.
   - Anoten en la tabla la entrada y la salida **antes** de girar.
   - Giren el tornillo con un destornillador pequeño, poco a poco, y miren si el voltaje sube o baja. Puede necesitar muchas vueltas.
3. Pongan una etiqueta de cinta al regulador: "5,0 V". **No lo conecten todavía al Arduino:** eso es el sábado 4.

[IMAGEN 3.1: regulador LM2596 con el multímetro midiendo 5,0 V en la salida mientras se ajusta el tornillo]

:::tabla id="g3p-regulador"
| Medición | Voltaje |
| --- | --- |
| Entrada del regulador | |
| Salida antes de ajustar | |
| Salida ajustada | |
:::

:::pregunta id="g3p-p2"
¿Qué pasaría si conectamos el regulador al Arduino sin ajustarlo antes?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3p-logramos"
- [ ] Exportamos el poste y la bandeja.
- [ ] Exportamos la caja y la tapa del mando.
- [ ] El regulador entrega 5,0 V.
:::

## Bitácora (5 min)

Antes de irse: suban los `.stl` de hoy juntos en un `.zip`. El docente imprimirá todo para el sábado 4.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban el .zip con sus .stl. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** reemplaza la comparación de puentes H, el fusible y el divisor de la Guía 3 normal por el diseño de la bandeja y del mando; se conserva el ajuste del regulador (Parte 3 de la normal). Campos propios (g3p-…).
- Impresión: 4 postes (≈ 15 min cada uno), bandeja (≈ 2 h), caja del mando (≈ 2,5 h) y tapa (≈ 1 h), sin soportes. La tapa se imprime con el cerco hacia arriba.
- Portabaterías de ejemplo: 2 celdas 18650 (77 × 41 mm). Si usan 6 pilas AA (ver la nota de la Guía 3 normal), medir su portapilas.
- La tapa se apoya sobre las paredes de la caja; se sujeta con cinta por un lado (como bisagra) para poder abrirla. El joystick se pega en su cerco con una gota de silicona y la pantalla, por debajo de la ventana.
- g3p-p1: el largo del hueco (77.6 → 79.6) y el del cerco (83.6 → 85.6). Las posiciones no cambian.
- g3p-p2: si sale con más de 5 V (por ejemplo, el voltaje de la batería) puede quemar el Arduino.
- Tiempo total: 10 + 10 + 10 + 30 + 35 + 15 + 5 + 5 = 120 minutos.
:::
