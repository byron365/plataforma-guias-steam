---
titulo: El robot en 3D (1): el chasis
guia: 2
sabado: 2
sesion: Diseño 3D
duracion: 120
---

# Guía 2 · El robot en 3D (1): el chasis

## Objetivo del día

Conocer las piezas de nuestro robot, medir los motores y las ruedas, y diseñar en Tinkercad Codeblocks el **chasis** y el **soporte del sensor**.

**Al terminar tendremos:** el chasis y el soporte del sensor exportados en STL y listos para imprimir.

## Materiales del equipo

- Un motor TT con su rueda, la rueda loca y el sensor HC-SR04
- Regla o calibrador
- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)

## Parte 1 · Nuestro robot (10 min)

El robot tiene **dos pisos**. Abajo, el **chasis** lleva los dos motores con sus ruedas, la rueda loca y el sensor de distancia. Arriba, la **bandeja** lleva la batería, el Arduino y la electrónica. Cuatro **postes** unen los dos pisos. El **mando** es una caja con el joystick y la pantalla.

[IMAGEN 2.1P: robot y mando diseñados en Tinkercad, con etiquetas: portabaterías, bandeja, poste, sensor HC-SR04 en su soporte, chasis, rueda loca, Arduino, TB6612 en la protoboard, rueda y motor TT, joystick, pantalla OLED y caja del mando]

Las piezas que diseñamos e imprimimos:

| Pieza | ¿Para qué sirve? | ¿Cuándo la diseñamos? |
| --- | --- | --- |
| Chasis | Piso de abajo: sostiene los motores y la rueda loca | Hoy |
| Soporte del sensor | Sostiene el HC-SR04 mirando hacia adelante | Hoy |
| Bandeja y 4 postes | Piso de arriba: batería, Arduino y electrónica | Sábado 3 |
| Caja y tapa del mando | Guardan el Arduino del mando, con el joystick y la pantalla encima | Sábado 3 |

Lo que **no** se imprime: los motores, las ruedas, la rueda loca, la batería, los Arduino, los módulos y los cables.

## Parte 2 · Medir antes de diseñar (15 min)

El chasis tiene que calzar con **nuestras** piezas. Midan con la regla o el calibrador y anoten:

- **Grosor del motor:** de la cara donde sale el eje a la cara del otro lado (sin contar el eje).
- **Alto del motor:** con el motor acostado, como va en el robot.
- **Alto de la rueda loca:** desde la mesa hasta la parte de arriba de su base.

:::tabla id="g2p-medidas"
| Medida | Ejemplo (mm) | Nuestra medida (mm) |
| --- | --- | --- |
| Grosor del motor | 18.8 | |
| Alto del motor | 22.5 | |
| Diámetro de la rueda | 65 | |
| Alto de la rueda loca | 20 | |
:::

Con esas medidas calculamos dos números del chasis. Primero, con el ejemplo:

- **X de la oreja** (dónde va la pieza que sujeta cada motor) = 60 − grosor del motor − 1.5 = 60 − 18.8 − 1.5 = **39.7**
- **Alto de la columna** de la rueda loca = diámetro de la rueda ÷ 2 + alto del motor ÷ 2 − alto de la rueda loca = 32.5 + 11.25 − 20 = 23.75 → redondeado, **24**

:::tabla id="g2p-calculos"
| Número del chasis | Ejemplo | Con nuestras medidas |
| --- | --- | --- |
| X de la oreja | 39.7 | |
| Alto de la columna | 24 | |
:::

Si sus números salen iguales al ejemplo, usen el ejemplo. Si salen distintos, en la Parte 4 cambien el ejemplo por los suyos.

## Parte 3 · Conociendo Tinkercad Codeblocks (15 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea el diseño del chasis.
   - Arriba a la derecha: **+ Crear → Codeblocks**. Si aparece un tutorial, ciérralo.
   - Haz clic en el nombre de arriba a la izquierda (un nombre inventado), bórralo y escribe `equipo_NOMBRE_chasis`. **Enter**. El diseño se guarda solo; lo encuentras en **Diseños → Codeblocks**.

Conoce el editor:

| Parte | Para qué sirve |
| --- | --- |
| Categorías (círculos de colores a la izquierda) | **Formas** trae las piezas (Cubo, Cilindro…); **Modificar** trae Mover, Girar, Seleccionar todo… |
| Área de programa (centro) | Ahí se arrastran y se unen los bloques, uno debajo de otro |
| Vista 3D (derecha) | Ahí aparece la pieza al ejecutar |
| Botón **▷** (abajo) | Ejecuta el programa |

| Acción | Cómo se hace |
| --- | --- |
| Agregar un bloque | Arrástralo desde la izquierda al área de programa |
| Unir bloques | Suelta un bloque justo debajo de otro, hasta que encaje |
| Borrar un bloque | Arrástralo de vuelta a la columna de bloques |
| Ver las medidas de una forma | Toca la flecha **›** del bloque |
| Cambiar un número | Clic en el número, escribe el nuevo y clic afuera. Decimales con **punto** (39.7) |
| Hacer una forma **hueca** | Toca su **círculo rayado** (el círculo de color se pone gris). Al agrupar, lo hueco se resta |
| Mirar la pieza | En la vista 3D, arrastra con el mouse para girarla (si no gira, con el botón derecho) y usa la rueda para acercar. La casita 🏠 vuelve a la vista inicial |

Tres reglas que vamos a usar siempre:

- **Las medidas están en milímetros.**
- Cada forma nace con su **centro** en X = 0, Y = 0, Z = 0. El bloque **Mover** (de Modificar) mueve la **última forma** que agregaste: con él la ponen en su lugar.
- El **Cubo** pide **A** (ancho, X), **L** (largo, Y), **A** (alto, Z) y **arista** (déjenla en 0). El **Cilindro** pide **Radio**, **A** (alto) y **Lados** (pongan 32 para que salga redondo).

## Parte 4 · El chasis (50 min)

El chasis se diseña **como se imprime**: la placa sobre la cama de la impresora y las orejas y la columna hacia arriba. Al armar el robot **se voltea**: las orejas y la columna quedan abajo.

[IMAGEN 2.2P: chasis en Tinkercad Codeblocks, con etiquetas: placa del chasis, oreja del motor con su ranura, columna de la rueda loca, paso de los cables y agujero para un poste]

Agreguen cada bloque **debajo** del anterior y ejecuten con **▷** después de cada paso.

1. **La placa:** un **Cubo** con primer **A = 120**, **L = 160**, segundo **A = 4**. Debajo, **Mover: X 0, Y 0, Z 2**.
   - El lado de **Y positiva** (Y = 80) es el **frente** del robot: ahí irán la rueda loca y el sensor.
2. **La primera oreja:** un **Cubo** con primer **A = 3**, **L = 30**, segundo **A = 24**. Debajo, **Mover: X 39.7, Y −20, Z 16** (o su X de la oreja).
   - El motor se atornilla a esta oreja. Su cara lisa va contra la oreja y el eje queda hacia afuera.
3. **La ranura de la oreja (hueco):** un **Cubo** con primer **A = 10**, **L = 3.4**, segundo **A = 20**, marcado como **hueco**. Debajo, **Mover: X 39.7, Y −20, Z 16** (la misma posición que la oreja).
   - Por la ranura pasan los dos tornillos del motor (o un cincho). Es larga para que sirva aunque los agujeros del motor estén un poco más arriba o más abajo.
4. **La segunda oreja y su ranura:** repitan los pasos 2 y 3 con **X −39.7** (con el signo menos) en los dos **Mover**.
   - **✔ Revisa:** dos orejas iguales, una frente a la otra, cada una con su ranura.
5. **La columna de la rueda loca:** un **Cilindro** con **Radio = 12**, **A = 24** (o su alto de la columna), **Lados = 32**. Debajo, **Mover: X 0, Y 60, Z 16**.
   - Si su alto de la columna no es 24, la Z cambia: Z = 4 + alto ÷ 2. Con 24: 4 + 12 = **16**.
6. **El paso de los cables (hueco):** un **Cubo** con primer **A = 40**, **L = 12**, segundo **A = 10**, hueco. Debajo, **Mover: X 0, Y −10, Z 2**.
7. **Los agujeros de los postes (huecos):** cuatro **Cilindros** con **Radio = 1.8**, **A = 10**, **Lados = 32**, huecos. Cada uno con su **Mover**:

| Agujero | X | Y | Z |
| --- | --- | --- | --- |
| 1 (adelante) | 48 | 68 | 2 |
| 2 (adelante) | −48 | 68 | 2 |
| 3 (atrás) | 48 | −68 | 2 |
| 4 (atrás) | −48 | −68 | 2 |

8. **Agrupar** para que los huecos se resten: de **Modificar**, **Seleccionar todo** y debajo **Group Selection** (este bloque aparece en inglés: quiere decir "agrupar la selección"). Ejecuten.

:::checklist id="g2p-chasis"
- [ ] La placa tiene las dos orejas con su ranura.
- [ ] La columna de la rueda loca está del lado del frente (Y positiva).
- [ ] Se ven el paso de los cables y los cuatro agujeros de los postes.
:::

9. **Exporta** `equipo_NOMBRE_chasis.stl`: **Compartir** → **.STL**, y cambia el nombre en **Descargas**.

:::pregunta id="g2p-p1"
¿Por qué la columna de la rueda loca tiene que medir justo eso? ¿Qué le pasaría al robot si fuera mucho más alta?
:::

## Parte 5 · El soporte del sensor (15 min)

El HC-SR04 tiene dos "ojos" redondos. El soporte es una **L**: una base que se pega sobre el chasis y un panel con dos agujeros por donde asoman los ojos.

[IMAGEN 2.3P: soporte del HC-SR04 en Tinkercad, con etiquetas: agujeros para los ojos del sensor, panel que mira hacia adelante y base que se pega sobre el chasis]

Creen otro diseño (**+ Crear → Codeblocks**) y llámenlo `equipo_NOMBRE_soporte_sensor`.

1. **La base:** un **Cubo** con primer **A = 50**, **L = 15**, segundo **A = 3**. Debajo, **Mover: X 0, Y 0, Z 1.5**.
2. **El panel:** un **Cubo** con primer **A = 50**, **L = 3**, segundo **A = 26**. Debajo, **Mover: X 0, Y 6, Z 16**.
3. **El ojo izquierdo (hueco):** un **Cilindro** con **Radio = 9**, **A = 10**, **Lados = 32**, hueco. Debajo, **Girar alrededor** con **Eje x** y **90** (para acostarlo), y **Mover: X −13, Y 6, Z 13**.
4. **El ojo derecho (hueco):** igual que el paso 3, con **Mover: X 13, Y 6, Z 13**.
5. **Seleccionar todo** y **Group Selection**. **✔ Revisa:** los dos agujeros atraviesan el panel.
6. **Exporta** `equipo_NOMBRE_soporte_sensor.stl`.

> Los ojos del HC-SR04 están separados unos 26 mm (de centro a centro). Si al medir el suyo da otro número, la X de cada ojo es la mitad: con 26 → **13** y **−13**.

## ¿Lo logramos? (5 min)

:::checklist id="g2p-logramos"
- [ ] Medimos el motor, la rueda y la rueda loca.
- [ ] Calculamos la X de la oreja y el alto de la columna.
- [ ] Exportamos el chasis.
- [ ] Exportamos el soporte del sensor.
:::

## Bitácora (10 min)

:::pregunta id="g2p-b1"
¿Qué fue lo más difícil de pasar las medidas reales a los bloques de Tinkercad?
:::

Antes de irse: suban los dos `.stl` juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**). El docente los imprimirá para el sábado 4.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban el .zip con sus .stl. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** reemplaza la arquitectura (diagrama de bloques, presupuesto de energía e intérprete en Wokwi) por el diseño 3D del robot. Campos propios (g2p-…).
- Diseños de referencia en la cuenta del docente: "Robot con mando - propuesta completa" y "Robot - modelo chasis / soporte del sensor / bandeja / caja y tapa del mando", con los mismos bloques de las guías. STL de ejemplo: `herramientas/robot_stl.py`.
- El chasis se imprime como sale (orejas y columna hacia arriba), sin soportes. Unas 3 h por chasis con relleno bajo.
- El motor TT va **debajo** del chasis, con su cara de arriba pegada a la placa y el eje hacia afuera; la ranura de la oreja sirve para los dos tornillos M3 × 30 que atraviesan el motor (con tuerca afuera) o para un cincho delgado. Las medidas de ejemplo son de un TT común (18.8 × 22.5 mm de sección): revisar con un motor de la academia antes de imprimir para todos.
- g2p-p1: la columna deja el chasis horizontal (a la altura que le dan las ruedas). Si fuera más alta, el robot quedaría inclinado hacia atrás y las ruedas motrices patinarían o se levantarían.
- Si la rueda loca es más alta que el chasis sobre el piso (cálculo negativo), no lleva columna: se atornilla directo a la placa.
- Tiempo total: 10 + 15 + 15 + 50 + 15 + 5 + 10 = 120 minutos.
:::
