---
titulo: Un soporte que se inclina en dos ejes
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · Un soporte que se inclina en dos ejes

## Objetivo del día

Diseñar el soporte tipo **cardán** que permite inclinar el tablero en dos direcciones y conectar el joystick real con los dos servos.

**Al terminar tendremos:** las piezas del soporte listas para imprimir y los dos servos reales moviéndose con el joystick.

## Materiales del equipo

- Computadora con internet (cuenta de Tinkercad) y Arduino IDE
- Arduino UNO + cable USB
- Módulo joystick
- 2 servos SG90 o MG90S
- Portapilas de 4 pilas AA
- Protoboard y cables
- Pieza de prueba impresa y canica

## Parte 1 · Resultado de la pieza de prueba (10 min)

Pasa la canica por los tres pasillos e inclina la pieza:

Inclinen la pieza despacio hacia un lado y hacia el otro, con la canica dentro de cada pasillo. "Rueda libre" significa que pasa sin tocar las paredes; "roza" que las toca o se frena.

| Pasillo | ¿Pasa la canica? | ¿Rueda libre o roza? |
| --- | --- | --- |
| 18 mm | | |
| 20 mm | | |
| 22 mm | | |

:::pregunta id="g4-p1"
¿Qué ancho de pasillo es el mejor para nuestra canica? ¿Hay que cambiar algo del tablero?
:::

## Parte 2 · ¿Qué es un cardán? (10 min)

Un **cardán** son dos marcos, uno dentro del otro, que giran sobre ejes perpendiculares. El marco de afuera gira hacia adelante y atrás (eje X), y el de adentro gira a los lados (eje Y). Así el tablero puede inclinarse hacia cualquier lado. Los estabilizadores de cámara y las brújulas de los barcos funcionan igual.

En nuestro laberinto, el "marco de adentro" es el propio tablero. Muevan los controles de la animación y miren qué parte gira con cada eje:

:::animacion tipo="cardan"
:::

[IMAGEN 4.1: foto de un estabilizador de cámara (gimbal) mostrando sus ejes de giro]

## Parte 3 · Modelar el soporte (40 min)

El soporte tiene dos piezas que se imprimen aparte: la **base con sus torres** y el **marco**. Cada una va en su propio diseño de Codeblocks (al agrupar, los huecos se restan de todo lo que hay en el diseño).

Recuerda: cada forma nace **centrada** (en X = 0, Y = 0, Z = 0), **Mover** mueve la última forma que agregaste y **Girar alrededor** (de Modificar) la gira desde su centro.

| Pieza | Medidas |
| --- | --- |
| Base | 240 × 240 × 5 mm |
| Torres (2) | 20 × 10 × 70 mm, en los lados izquierdo y derecho de la base |
| Marco exterior | Cuadro de 220 × 220 mm por fuera, 200 × 200 por dentro, 8 mm de grosor |
| Ejes | Cilindros de 5 mm de diámetro y 15 mm de largo |
| Agujeros para ejes | Cilindros huecos de **5,4 mm** de diámetro (Radio 2.7) |
| Ventana para servo | 23 × 12,5 mm en una torre y en un lado del marco |

1. **Diseño de la base:** **+ Crear → Codeblocks**, con el nombre `equipo_NOMBRE_base`.
   - **Base:** **Cubo** con primer **A = 240**, **L = 240**, segundo **A = 5**. Debajo, **Mover: X 0, Y 0, Z 2.5**.
   - **Torres:** dos **Cubos** con primer **A = 10**, **L = 20**, segundo **A = 70** (de lado se ven delgadas). Uno con **Mover: X −116, Y 0, Z 40** y el otro con **Mover: X 116, Y 0, Z 40**. Quedan paradas en las orillas izquierda y derecha de la base, con 1 mm de holgura respecto al marco.
   - **Agujeros en las torres** (para los ejes del marco): dos **Cilindros** huecos con **Radio = 2.7**, **A = 20**, **Lados = 32**. A cada uno, debajo, **Girar alrededor** con **Eje y** y **90** grados (queda acostado), y luego **Mover: X −116, Y 0, Z 60** para el primero y **Mover: X 116, Y 0, Z 60** para el segundo.
   - **Ventana para el servo:** un **Cubo** hueco de 23 × 12,5 mm que atraviese **una** de las torres. Ubíquenla de forma que el **eje del servo** quede alineado con el eje que va a mover (a la altura Z = 60): usen un servo real para ver dónde queda su eje dentro de su cuerpo.
   - Al final, **Seleccionar todo** y **Group Selection**. Ejecuta con **▷** y revisa.
2. **Diseño del marco:** otro diseño, `equipo_NOMBRE_marco`.
   - **Marco:** **Cubo** con primer **A = 220**, **L = 220**, segundo **A = 8** y **Mover: X 0, Y 0, Z 60**. Debajo, otro **Cubo** hueco con primer **A = 200**, **L = 200**, segundo **A = 10** y **Mover: X 0, Y 0, Z 60**: deja el centro vacío.
3. **Ejes y agujeros del marco** (en el mismo diseño del marco):
   - **Ejes del marco** (izquierda y derecha): dos **Cilindros** sólidos con **Radio = 2.5**, **A = 15**. A cada uno, **Girar alrededor** con **Eje y** y **90**, y **Mover: X −117.5, Y 0, Z 60** el primero y **Mover: X 117.5, Y 0, Z 60** el segundo. Salen del marco y entran en las torres.
   - **Agujeros del tablero** (adelante y atrás): dos **Cilindros** huecos con **Radio = 2.7**, **A = 20**. A cada uno, **Girar alrededor** con **Eje x** y **90**, y **Mover: X 0, Y −105, Z 60** el primero y **Mover: X 0, Y 105, Z 60** el segundo.
   - **Ventana para el otro servo:** un **Cubo** hueco de 23 × 12,5 mm en el lado de **adelante o atrás** del marco, alineado con el eje que va a mover.
   - Al final, **Seleccionar todo** y **Group Selection**. Ejecuta con **▷** y revisa que los ejes salgan por los lados.
   - **Ejes del tablero:** el tablero también necesita dos ejes (uno adelante y otro atrás) que entren en esos agujeros. Pregunten al docente cómo los harán: si el tablero todavía no está impreso, se agregan en su diseño `equipo_NOMBRE_laberinto`, antes del último Seleccionar todo (**Cilindros** de **Radio 2.5** y **A = 15**, con **Girar alrededor Eje x 90** y **Mover** en X = 0, Y = −97.5 y 97.5, Z = 0); si ya está impreso, se imprimen aparte y se pegan, o se usan palitos de pincho.

[IMAGEN 4.2T: soporte cardán en Tinkercad Codeblocks con base, torres, marco exterior y ventanas para los servos]

:::pregunta id="g4-p2"
El eje mide 5 mm y su agujero 5,4 mm. ¿Para qué sirven esos 0,4 mm de diferencia?
:::

4. Exporta cada pieza desde su diseño: **equipo_NOMBRE_base.stl** y **equipo_NOMBRE_marco.stl**.
   - En cada diseño: **Compartir** → **.STL**, y cámbiale el nombre si hace falta.

## Parte 4 · Servos reales con el joystick (30 min)

Los servos usan **pilas aparte** y todas las tierras se unen (**GND común**):

Hagan todo con el USB desconectado y **sin pilas** en el portapilas. En la protoboard usen las filas largas de los bordes: **arriba** para las pilas y **abajo** para el Arduino.

1. **Energía:** cable rojo del portapilas → fila **+** de arriba; cable negro → fila **−** de arriba. Del Arduino: **5V** → fila **+** de abajo; **GND** → fila **−** de abajo.
2. **GND común:** un cable de la fila **−** de arriba a la fila **−** de abajo. (¡Nunca unan las dos filas **+**!)
3. **Joystick** (módulo real, pines con su nombre impreso): **+5V** → fila **+** de abajo; **GND** → fila **−** de abajo; **VRx** → **A0**; **VRy** → **A1**; **SW** → **D2**.
4. **Servos** (con tres cables macho–macho en cada conector): rojo → fila **+** de **arriba** (pilas); café → fila **−** de arriba; naranja → **D9** (servo X) y **D10** (servo Y).

| Componente | Conexión |
| --- | --- |
| Joystick | +5V → 5V Arduino · VRx → A0 · VRy → A1 · SW → D2 · GND → GND |
| Servo X | Naranja → D9 · Rojo → + pilas · Café → − pilas |
| Servo Y | Naranja → D10 · Rojo → + pilas · Café → − pilas |
| GND común | − pilas ↔ GND Arduino |

Miren en la animación por qué el GND común es necesario:

:::animacion tipo="gnd-comun" pin="9" pilas="4 AA (6 V)"
:::

[IMAGEN 4.3: circuito real con joystick, dos servos y portapilas con el GND común señalado]

Sube este código de prueba:

1. Conecta el USB, abre **Arduino IDE** y elige **Arduino Uno** y su puerto en **Seleccionar placa**.
2. **Archivo → Nuevo boceto**, borra lo que trae y escribe el código. Guárdalo como `equipo_NOMBRE_prueba_servos`.
3. Verifica (✓), sube (→) y **después** pon las pilas.

```cpp
#include <Servo.h>
Servo servoX, servoY;

const int CENTRO = 90;
const int INCLINACION = 15;

void setup() {
  servoX.attach(9);
  servoY.attach(10);
  Serial.begin(9600);
}

void loop() {
  int angX = map(analogRead(A0), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
  int angY = map(analogRead(A1), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
  servoX.write(angX);
  servoY.write(angY);
  Serial.print(angX);
  Serial.print(",");
  Serial.println(angY);
  delay(20);
}
```

4. Abre el **Monitor serie** (lupa, arriba a la derecha) a **9600 baudios**: verás los dos ángulos separados por una coma. Mueve el joystick y anota.

| Prueba | Ángulo X | Ángulo Y |
| --- | --- | --- |
| Joystick en el centro | | |
| Todo a la derecha | | |
| Todo hacia arriba | | |

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] Probamos la pieza de holgura.
- [ ] El soporte cardán está modelado y exportado.
- [ ] Los servos usan pilas con GND común.
- [ ] Los dos servos se mueven con el joystick.
:::

## Reto extra

En el joystick real el centro casi nunca da exactamente 512. Haz que si la lectura está entre 490 y 530 el servo quede exactamente en `CENTRO` (esto se llama **zona muerta**).

Pista: guarden la lectura en una variable antes del `map` y usen un `if` que pregunte si está entre 490 y 530 (`lectura > 490 && lectura < 530`); en ese caso, el ángulo es `CENTRO`.

## Bitácora (15 min)

:::foto id="g4-foto"
Foto de la pieza de prueba y del circuito con los servos.
:::

:::pregunta id="g4-b1"
Explica con tus palabras cómo un cardán logra inclinar en dos direcciones.
:::

Antes de irse: saquen las pilas. Guarden juntos en un `.zip` los `.stl` y el programa `equipo_NOMBRE_prueba_servos` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban los .stl y su código de Arduino (.ino). Los diseños de bloques quedan guardados en Tinkercad. La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Durante la semana: imprimir base y marco de cada equipo (≈4-5 h en total). El tablero ya debe estar impreso para el sábado 5.
- Si el tablero no cabe junto con el marco en la cama de impresión, imprimir el marco en dos mitades unidas con tornillos.
- Opción rápida si falta tiempo de impresión: marco de cartón grueso o madera MDF con ejes de palitos de pincho.
- g4-p2: holgura para que el eje gire sin trabarse (las impresoras agregan un poco de material).
- Tiempo total: 10 + 10 + 40 + 30 + 5 + 15 = 110 minutos (10 de margen).
:::
