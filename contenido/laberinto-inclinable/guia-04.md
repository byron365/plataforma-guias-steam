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

- Computadora con Blender y Arduino IDE
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

Abre un archivo nuevo **equipo_NOMBRE_soporte.blend** (unidades en mm).

- **Archivo → Nuevo → General**, borra el cubo (**X → Borrar**).
- Unidades: Propiedades → icono de **Escena** → **Unidades** → Escala de unidades **0.001**, Longitud **Milímetros**.
- **Archivo → Guardar como** → `equipo_NOMBRE_soporte.blend`.
- Las medidas van en el **Panel N** (tecla N) → **Elemento**. Pongan nombre a cada pieza en el Listado.

| Pieza | Medidas |
| --- | --- |
| Base | 240 × 240 × 5 mm |
| Torres (2) | 20 × 10 × 70 mm, en los lados izquierdo y derecho de la base |
| Marco exterior | Cuadro de 220 × 220 mm por fuera, 200 × 200 por dentro, 8 mm de grosor |
| Ejes | Cilindros de 5 mm de diámetro y 15 mm de largo |
| Agujeros para ejes | Cilindros de **5,4 mm** de diámetro (modificador Booleana) |
| Ventana para servo | 23 × 12,5 mm en una torre y en un lado del marco |

1. Modela la base y las dos torres.
   - **Base:** cubo de X = 240, Y = 240, Z = 5, Posición Z = 2.5.
   - **Torres:** cubos de X = 10, Y = 20, Z = 70 (de lado se ven delgadas), con Posición X = **−116** y X = **116**, Y = 0, Z = **40**. Quedan paradas en las orillas izquierda y derecha de la base, con 1 mm de holgura respecto al marco.
2. **Marco:** haz un cubo de 220 × 220 × 8 y réstale con el modificador Booleana un cubo de 200 × 200 × 10.
   - Los dos cubos en Posición Z = **60** (el marco queda entre las torres, a 60 mm de altura).
   - Clic en el marco → llave inglesa → **Agregar modificador → Generar → Booleana** → **Diferencia** → Objeto: el cubo de 200 → **Aplicar** → borra ese cubo.
3. Agrega los ejes del marco en los lados izquierdo y derecho (eje X), y los agujeros del tablero en los lados de adelante y atrás (eje Y).
   - **Ejes del marco:** cilindros de X = 5, Y = 5, Z = 15, acostados con Rotación Y = **90**, en X = **−117.5** y X = **117.5**, Y = 0, Z = 60. Salen del marco y atraviesan las torres. Únelos al marco con **Ctrl + J**.
   - **Agujeros en las torres** (para esos ejes): cilindros de X = 5.4, Y = 5.4, Z = 20, Rotación Y = 90, en X = −116 y X = 116, Z = 60. Réstalos a cada torre con el modificador Booleana.
   - **Agujeros del tablero en el marco** (adelante y atrás): cilindros de X = 5.4, Y = 5.4, Z = 20, acostados con Rotación X = **90**, en X = 0, Y = **−105** y Y = **105**, Z = 60. Réstalos al marco con el modificador Booleana.
   - **Ejes del tablero:** el tablero también necesita dos ejes (uno adelante y otro atrás) que entren en esos agujeros. Pregunten al docente cómo los harán: si el tablero todavía no está impreso, se agregan en su archivo (cilindros de X = 5, Y = 5, Z = 15 con Rotación X = 90, en X = 0, Y = −97.5 y 97.5, Z = 0, unidos con Ctrl + J); si ya está impreso, se imprimen aparte y se pegan, o se usan palitos de pincho.
4. Haz las ventanas para los servos.
   - Una ventana de 23 × 12,5 mm que atraviese **una** torre, y otra igual en el lado de **adelante o atrás** del marco.
   - Ubíquenlas de forma que el **eje del servo** quede alineado con el eje que va a mover (a la altura Z = 60). Usen un servo real para ver dónde queda su eje dentro de su cuerpo.
   - Réstenlas con el modificador Booleana.

[IMAGEN 4.2: soporte cardán en Blender con base, torres, marco exterior y ventanas para los servos]

:::pregunta id="g4-p2"
El eje mide 5 mm y su agujero 5,4 mm. ¿Para qué sirven esos 0,4 mm de diferencia?
:::

5. Exporta cada pieza por separado: **equipo_NOMBRE_base.stl**, **equipo_NOMBRE_marco.stl**.
   - Une la base con las dos torres (**Ctrl + J**): esa es la pieza `base`.
   - Para cada pieza: clic solo en ella → **Archivo → Exportar → STL (.stl)** → **Sólo lo seleccionado** → nombre → **Exportar STL**. Guarda con **Ctrl + S**.

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

Antes de irse: saquen las pilas. Guarden juntos en un `.zip` el `.blend`, los `.stl` y el programa `equipo_NOMBRE_prueba_servos` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Durante la semana: imprimir base y marco de cada equipo (≈4-5 h en total). El tablero ya debe estar impreso para el sábado 5.
- Si el tablero no cabe junto con el marco en la cama de impresión, imprimir el marco en dos mitades unidas con tornillos.
- Opción rápida si falta tiempo de impresión: marco de cartón grueso o madera MDF con ejes de palitos de pincho.
- g4-p2: holgura para que el eje gire sin trabarse (las impresoras agregan un poco de material).
- Tiempo total: 10 + 10 + 40 + 30 + 5 + 15 = 110 minutos (10 de margen).
:::
