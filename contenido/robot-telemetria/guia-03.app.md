---
titulo: El robot en 3D (2): la bandeja
guia: 3
sabado: 3
sesion: Diseño 3D y energía
duracion: 120
---

# Guía 3 · El robot en 3D (2): la bandeja

## Objetivo del día

Diseñar los postes y la bandeja (el piso de arriba del robot) y revisar todas las piezas.

**Al terminar tendremos:** todas las piezas del robot exportadas en STL y listas para imprimir.

## Materiales del equipo

- El portabaterías de los motores, con una regla o calibrador
- Computadora con internet y la cuenta de Tinkercad

## Parte 1 · Ponerse al día (20 min)

Si el sábado 2 no terminaron el chasis o el soporte del sensor, termínenlos ahora con la **Guía 2, Partes 4 y 5**, y expórtenlos.

## Parte 2 · Medir (10 min)

El portabaterías va dentro de un **cerco** en la bandeja. Los huecos se hacen **0,6 mm más grandes** que la pieza, para que entre sin forzar.

:::tabla id="g3p-medidas"
| Medida | Ejemplo (mm) | Nuestra medida (mm) | Hueco = medida + 0,6 |
| --- | --- | --- | --- |
| Portabaterías: largo | 77 | | |
| Portabaterías: ancho | 41 | | |
:::

## Parte 3 · Los postes (15 min)

Los cuatro postes unen el chasis con la bandeja. Tienen un agujero en el centro por donde pasa un palito de pincho.

Creen un diseño nuevo (**+ Crear → Codeblocks**) llamado `equipo_NOMBRE_poste`.

1. **El poste:** un **Cilindro** con **Radio = 5**, **A = 40**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 20**.
2. **El agujero (hueco):** un **Cilindro** con **Radio = 1.8**, **A = 50**, **Lados = 32**, hueco. Debajo, **Mover: X 0, Y 0, Z 20**.
3. **Seleccionar todo** y **Group Selection**. **✔ Revisa:** el agujero atraviesa el poste de arriba abajo.
4. **Exporta** `equipo_NOMBRE_poste.stl`. Es uno solo: el docente imprime **cuatro**.

## Parte 4 · La bandeja (40 min)

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

:::pregunta id="g3p-p1"
Si nuestro portabaterías midiera 2 mm más de largo, ¿qué números de la bandeja tendríamos que cambiar?
:::

## Parte 5 · Revisar las piezas (20 min)

Abran cada diseño, ejecútenlo con **▷**, gírenlo y marquen:

:::checklist id="g3a-revision"
- [ ] Chasis: orejas de los motores, columna de la rueda loca, paso de los cables y cuatro agujeros de los postes.
- [ ] Soporte del sensor: los dos agujeros de los ojos atraviesan el panel.
- [ ] Poste: el agujero lo atraviesa de arriba abajo.
- [ ] Bandeja: cerco del portabaterías, paso de los cables y cuatro agujeros de los postes.
- [ ] Los `.stl` están en Descargas con su nombre correcto.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3p-logramos"
- [ ] Exportamos el poste y la bandeja.
- [ ] Revisamos todas las piezas.
:::

## Bitácora (10 min)

:::pregunta id="g3p-b1"
¿Qué medida de nuestras piezas fue la más importante para que todo encaje? ¿Por qué?
:::

Antes de irse: suban los `.stl` de hoy juntos en un `.zip`. El docente los imprimirá mientras simulamos y hacemos la app.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban el .zip con sus .stl. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con app (9 sábados), nueva el 6 de noviembre:** el mando físico se reemplaza por una **app de Android hecha en MIT App Inventor** (decisión de Bairon: más barato y más simple). Sale el segundo Arduino, el segundo HC-05, el joystick, la pantalla y la caja del mando. Sin la caja del mando, el tiempo que sobra se usa para ponerse al día y revisar las piezas. Mismos campos que la Práctica (g3p-…).
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** reemplaza la Guía 3 normal (comparación de puentes H, batería, fusible, regulador y divisor) por el diseño de la bandeja. Desde el 23 de octubre el robot usa dos fuentes (batería 2S para los motores y pila de 9 V al jack del Arduino) y puente H L298N: no hay regulador que ajustar. Campos propios (g3p-…).
- Impresión: 4 postes (≈ 15 min cada uno) y bandeja (≈ 2 h), sin soportes.
- Portabaterías de los motores de ejemplo: 2 celdas 18650 (77 × 41 mm). Si usan 6 pilas AA (ver la nota de la Guía 3 normal), medir su portapilas.
- g3p-p1: el largo del hueco (77.6 → 79.6) y el del cerco (83.6 → 85.6). Las posiciones no cambian.
- Tiempo total: 20 + 10 + 15 + 40 + 20 + 5 + 10 = 120 minutos.
:::
