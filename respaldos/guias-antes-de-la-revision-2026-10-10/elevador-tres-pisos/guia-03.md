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

:::animacion tipo="contrapeso"
:::

:::pregunta id="g3-p2"
Si la cabina pesa 150 g y el contrapeso 120 g, ¿qué masa tiene que levantar el motor? ¿Por qué no hacemos el contrapeso igual a la cabina?
:::

## Parte 2 · Sensores de piso (25 min)

:::tabla id="g3-sensores"
| Opción | ¿Cómo detecta? | Ventaja | Desventaja | ¿La elegimos? |
| --- | --- | --- | --- | --- |
| Reed switch + imán | El imán de la cabina cierra el contacto | Barato, no le afecta la luz | Hay que alinear bien | |
| Sensor IR de obstáculos | La cabina refleja la luz | Fácil de montar | La luz del salón puede afectar | |
| Microswitch | La cabina presiona una palanca | Muy seguro | Desgaste, golpe mecánico | |
:::

**Finales de carrera:** son microswitch al tope de arriba y de abajo. Tienen contacto **NA** (normalmente abierto) y **NC** (normalmente cerrado).

:::pregunta id="g3-p3"
Para seguridad, muchos sistemas usan el contacto NC: si se corta el cable, el sistema cree que llegó al tope y se detiene. ¿Por qué es más seguro así?
:::

## Parte 3 · Puente H y fuente (20 min)

:::tabla id="g3-seleccion"
| Componente | Opción | ¿Por qué? |
| --- | --- | --- |
| Puente H | L298N / TB6612FNG | |
| Fuente de potencia | | |
| Regulador para la lógica | LM2596 a 5 V | |
| Fusible | | |
| Paro de emergencia | Botón tipo hongo | |
:::

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

:::tabla id="g3-torre"
| Tramo | Desplazamiento de la punta (mm) | ¿Se deformó? |
| --- | --- | --- |
| Sin diagonales | | |
| Con diagonales en una cara | | |
| Con diagonales en todas las caras | | |
:::

[IMAGEN 3.1: boceto de la torre con las medidas, la polea arriba, la cabina, el contrapeso y la ubicación de los sensores de piso]

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
