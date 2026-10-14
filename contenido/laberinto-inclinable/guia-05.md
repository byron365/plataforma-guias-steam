---
titulo: ¡El tablero se mueve!
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · ¡El tablero se mueve!

## Objetivo del día

Armar el mecanismo completo: tablero, marco y soporte con sus dos servos, y controlar la inclinación con el joystick.

**Al terminar tendremos:** el tablero inclinándose con el joystick y la canica recorriendo el laberinto.

## Materiales del equipo

- Tablero, marco y base impresos
- Circuito del sábado 4 (Arduino, joystick, 2 servos, pilas)
- Brazos (horns) de los servos, tornillos, alambre rígido o varillas
- Destornillador, pegamento caliente
- Canica

## Parte 1 · Centrar los servos (10 min)

Antes de atornillar nada, los servos deben estar en **90°** (tablero plano). Sube este código y deja los servos conectados:

1. Revisen que el circuito esté como el sábado 4 (servos en las pilas, GND común, señales en D9 y D10).
2. Conecten el USB, creen un programa nuevo, borren lo que trae y escriban el código de abajo. Súbanlo (→).
3. Pongan las pilas: los dos servos giran a 90° y se quedan quietos. No giren sus ejes con la mano después de esto.

```cpp
#include <Servo.h>
Servo servoX, servoY;

void setup() {
  servoX.attach(9);
  servoY.attach(10);
  servoX.write(90);
  servoY.write(90);
}

void loop() {
}
```

:::pregunta id="g5-p1"
¿Por qué hay que centrar los servos antes de colocar los brazos y el tablero?
:::

## Parte 2 · Montaje del mecanismo (45 min)

Hagan el montaje con las pilas **fuera** del portapilas.

1. **Servo X:** colócalo en la ventana de la torre. Su eje debe quedar alineado con el eje del marco.
   - Atornillen sus pestañas a la torre con los tornillos de la bolsita del servo.
2. **Marco:** inserta sus ejes en los agujeros de las torres. Une el brazo del servo X al marco.
   - Primero metan el eje del marco en el agujero de la torre sin servo; luego acerquen el otro lado al servo.
   - Pongan un brazo (horn) en el eje del servo X, con el marco **plano** (horizontal), y únanlo al marco con un tornillo, alambre o pegamento caliente (con el docente).
3. **Servo Y:** colócalo en la ventana del marco.
4. **Tablero:** pon sus ejes en los agujeros del marco y une el brazo del servo Y al tablero.
   - Igual que con el marco: el tablero **plano** y el brazo del servo Y unido a él.
5. Verifica que el tablero quede **plano** con los servos en 90°. Si no, quita el brazo y gíralo un diente.
   - Pongan la canica en el centro del tablero: si rueda sola hacia un lado, no está plano.

[IMAGEN 5.1: mecanismo armado con la base, las torres, el marco, el tablero y los dos servos]

Comparen su mecanismo con la animación del cardán:

:::animacion tipo="cardan"
:::

Revisen y marquen:

:::checklist id="g5-montaje"
- [ ] El marco gira libre sobre sus ejes.
- [ ] El tablero gira libre dentro del marco.
- [ ] Con los servos en 90° el tablero está plano.
- [ ] Ningún cable estorba el movimiento.
:::

## Parte 3 · Control con el joystick (25 min)

Sube el código de prueba del sábado 4 (joystick → servos). Pon la canica en la salida y prueba.

- Es `equipo_NOMBRE_prueba_servos` (Guía 4). Si están en otra computadora, descárguenlo del recuadro de esa guía.
- Muevan el joystick **despacio** hacia cada lado y fíjense hacia dónde se inclina el tablero.

| Movimiento del joystick | ¿Hacia dónde se inclina el tablero? | ¿Es lo esperado? |
| --- | --- | --- |
| Derecha | | |
| Izquierda | | |
| Arriba | | |
| Abajo | | |

Si un eje se mueve **al revés**, cambia el orden de los números del `map`:

- Busquen en el `loop()` la línea `int angX = map(…);` (o la de `angY`, según el eje que esté al revés) y cambien de lugar los dos últimos números, como en el ejemplo de abajo. Suban otra vez y prueben.

```cpp
// antes:  CENTRO - INCLINACION, CENTRO + INCLINACION
// al revés:
int angX = map(analogRead(A0), 0, 1023, CENTRO + INCLINACION, CENTRO - INCLINACION);
```

## Parte 4 · ¿Cuánta inclinación necesitamos? (20 min)

Prueba distintos valores de `INCLINACION` y juega una vez con cada uno:

1. En la línea `const int INCLINACION = 15;` cambien el número por el de la fila y suban el código.
2. Pongan la canica en la salida y llévenla a la meta. Una persona cronometra con el celular (si no llega, escriban "no llegó").

:::tabla id="g5-inclinacion"
| INCLINACION | ¿La canica se mueve? | ¿Es fácil de controlar? | Tiempo para llegar a la meta (s) |
| --- | --- | --- | --- |
| 5 | | | |
| 10 | | | |
| 15 | | | |
| 20 | | | |
:::

:::pregunta id="g5-p2"
¿Qué valor de INCLINACION elegimos y por qué?
:::

Dejen en el código el valor elegido y guárdenlo (**Ctrl + S**).

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] El mecanismo está armado.
- [ ] El tablero se inclina en los dos ejes con el joystick.
- [ ] Los ejes se mueven hacia el lado correcto.
- [ ] Elegimos la inclinación ideal.
- [ ] La canica llegó a la meta al menos una vez.
:::

## Reto extra

Si el tablero no queda perfectamente plano en 90°, cambia `CENTRO` por otro valor (por ejemplo 88 o 93) **para cada servo** hasta que la canica se quede quieta en el centro.

Pista: necesitarán dos constantes, una para cada servo (por ejemplo `CENTRO_X` y `CENTRO_Y`), y usar cada una en su `map`.

## Bitácora (15 min)

:::foto id="g5-foto"
Video corto de la canica moviéndose por el laberinto.
:::

:::pregunta id="g5-b1"
¿Qué problemas mecánicos tuvimos y cómo los resolvimos?
:::

Antes de irse: saquen las pilas y suban el programa con su inclinación elegida.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La unión servo–marco es el punto débil: si el brazo del servo patina, usar el brazo con más agujeros y un tornillo adicional, o un alambre rígido tipo biela.
- Si el Arduino se reinicia al mover el joystick, revisar que los servos estén en las pilas y no en el 5V del Arduino.
- Con INCLINACION mayor de 20 la canica suele saltar las paredes.
- Si un equipo usa centros distintos, deben crear `CENTRO_X` y `CENTRO_Y`; bueno para hablar de constantes.
- Tiempo total: 10 + 45 + 25 + 20 + 5 + 15 = 120 minutos.
:::
