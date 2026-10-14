---
titulo: Motor, sensores y torre
guia: 3
sabado: 3
sesion: Selección de componentes
duracion: 120
---

# Guía 3 · Motor, sensores y torre

## Objetivo del día

Elegir el motor, el puente H y los sensores de piso con cálculos, decidir el contrapeso y probar la resistencia de la torre.

**Al terminar tendremos:** la tabla de selección justificada, el cálculo de torque y el diseño de la torre probado.

## Materiales del equipo

- Motor con reductora, polea o carrete, hilo resistente
- Finales de carrera (microswitch), reed switch e imán, sensor IR
- Báscula, regla, multímetro
- Palitos o tiras de MDF para la prueba de la torre

## Parte 1 · ¿Tiene fuerza el motor? (30 min)

Pesa la cabina con su carga máxima y calcula el **torque** que necesita el motor:

> Fuerza (N) = masa (kg) × 9,8  Torque (N·cm) = Fuerza × radio de la polea (cm)

Completen la tabla en orden, de arriba hacia abajo:

1. Pongan la cabina vacía en la báscula y anoten su masa en gramos.
2. Decidan la **carga máxima** (las pesas que llevará la cabina) y pésenla también.
3. **Masa total (kg)** = (cabina + carga) ÷ 1000. Ejemplo: 200 g + 50 g = 250 g = 0,25 kg.
4. **Fuerza** = masa total × 9,8.
5. **Radio de la polea:** midan con la regla el ancho del carrete donde se enrolla el hilo (el diámetro) y divídanlo entre 2.
6. **Torque necesario** = fuerza × radio.
7. Busquen el torque del motor en su hoja de datos o en la etiqueta. Si viene en kg·cm, multiplíquenlo por 9,8 para pasarlo a N·cm (ver la nota debajo de la tabla).

:::tabla id="g3-torque"
| Dato | Valor |
| --- | --- |
| Masa de la cabina vacía (g) | |
| Carga máxima (g) | |
| Masa total (kg) | |
| Fuerza (N) | |
| Radio de la polea (cm) | |
| Torque necesario (N·cm) | |
| Torque del motor (hoja de datos, N·cm) | |
:::

> 1 kg·cm ≈ 9,8 N·cm

:::pregunta id="g3-p1"
¿El motor alcanza? Si no, ¿qué podemos cambiar sin comprar otro motor?
:::

**El contrapeso:** un peso del otro lado de la polea que equilibra la cabina. El motor solo tiene que mover la **diferencia**.

Miren en la animación cómo el contrapeso ayuda al motor:

:::animacion tipo="contrapeso"
:::

:::pregunta id="g3-p2"
Si la cabina pesa 150 g y el contrapeso 120 g, ¿qué masa tiene que levantar el motor? ¿Por qué no hacemos el contrapeso igual a la cabina?
:::

## Parte 2 · Sensores de piso (25 min)

Lean las tres opciones y, en la última columna, escriban **Sí** en la que elijan para detectar los pisos y **No** en las otras:

:::tabla id="g3-sensores"
| Opción | ¿Cómo detecta? | Ventaja | Desventaja | ¿La elegimos? |
| --- | --- | --- | --- | --- |
| Reed switch + imán | El imán de la cabina cierra el contacto | Barato, no le afecta la luz | Hay que alinear bien | |
| Sensor IR de obstáculos | La cabina refleja la luz | Fácil de montar | La luz del salón puede afectar | |
| Microswitch | La cabina presiona una palanca | Muy seguro | Desgaste, golpe mecánico | |
:::

**Finales de carrera:** son microswitch al tope de arriba y de abajo. Tienen contacto **NA** (normalmente abierto) y **NC** (normalmente cerrado).

Un microswitch tiene tres patas marcadas con letras: **C** (común), **NO** (en español NA) y **NC**. Compruébenlo con el multímetro en **continuidad** (el símbolo del sonido): puntas en C y NO, y presionen la palanca; luego en C y NC, y presionen otra vez. Anoten en su bitácora cuándo suena cada par.

:::pregunta id="g3-p3"
Para seguridad, muchos sistemas usan el contacto NC: si se corta el cable, el sistema cree que llegó al tope y se detiene. ¿Por qué es más seguro así?
:::

## Parte 3 · Puente H y fuente (20 min)

En **¿Por qué?** escriban la razón de cada elección. Para la fuente y el fusible, revisen con el docente lo que hay en la academia y anoten su voltaje y sus amperios.

:::tabla id="g3-seleccion"
| Componente | Opción | ¿Por qué? |
| --- | --- | --- |
| Puente H | L298N / TB6612FNG | |
| Fuente de potencia | | |
| Regulador para la lógica | LM2596 a 5 V | |
| Fusible | | |
| Paro de emergencia | Botón tipo hongo | |
:::

**Para medir la corriente:**

1. Usen el montaje de la Guía 1 (Arduino, L298N, motor y botones) y aten el hilo de la cabina con su carga al eje del motor.
2. Con la fuente desconectada, pongan el multímetro en **amperes** (A) con la punta roja en el borne de **10A** o **A** (no el de mA, que se puede quemar).
3. Desconecten el cable positivo que va de la fuente al L298N y pongan el multímetro **en medio**: punta roja hacia la fuente y negra hacia +12V del L298N.
4. Conecten la fuente, mantengan presionado el botón **subir** y lean el valor mientras sube la cabina. Si sale en A, multiplíquenlo por 1000 para tenerlo en mA.
5. Al terminar, regresen la punta roja al borne de voltaje.

Mide la corriente del motor levantando la cabina con carga: ______ mA.

## Parte 4 · La torre (40 min)

La torre debe ser **rígida**: si se dobla, la cabina roza y se atasca.

| Medida | Valor sugerido |
| --- | --- |
| Altura total | 60 cm (3 pisos de 18 cm + espacio del motor) |
| Base | 20 × 20 cm |
| Cabina | 8 × 8 × 10 cm |
| Guías de la cabina | 2 varillas o rieles verticales |

**Prueba estructural:** arma un tramo de torre de 20 cm con y sin refuerzos en diagonal, y empuja la parte de arriba con 200 g de fuerza (una pesa colgada con hilo sobre una polea, o un dinamómetro):

**Cómo hacer la prueba:**

1. Peguen o sujeten la base del tramo a la mesa para que no se mueva.
2. Pongan una regla de pie junto a la punta y marquen dónde está antes de empujar.
3. Apliquen los 200 g de fuerza de lado y midan en mm cuánto se movió la punta.
4. Repitan agregando diagonales en una cara y luego en todas las caras.

:::tabla id="g3-torre"
| Tramo | Desplazamiento de la punta (mm) | ¿Se deformó? |
| --- | --- | --- |
| Sin diagonales | | |
| Con diagonales en una cara | | |
| Con diagonales en todas las caras | | |
:::

[IMAGEN 3.1: boceto de la torre con las medidas, la polea arriba, la cabina, el contrapeso y la ubicación de los sensores de piso]

Dibujen en una hoja el boceto de su torre con las medidas y súbanlo:

:::foto id="g3-boceto"
Boceto de la torre del equipo.
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Calculamos el torque necesario.
- [ ] Decidimos el contrapeso.
- [ ] Elegimos los sensores de piso y de final de carrera.
- [ ] Probamos la rigidez de la torre.
:::

:::docente
- g3-p2: 30 g. Si fueran iguales, la cabina no bajaría sola al perder tensión y el hilo podría aflojarse; un poco de diferencia mantiene el hilo tenso.
- g3-p3: es "seguro ante fallas" (fail-safe): una falla del cableado lleva al estado seguro.
- El código base usa INPUT_PULLUP y LOW = activado; con contacto NC hay que invertir la lógica (HIGH = tope).
- Tiempo total: 30 + 25 + 20 + 40 + 5 = 120 minutos.
:::
