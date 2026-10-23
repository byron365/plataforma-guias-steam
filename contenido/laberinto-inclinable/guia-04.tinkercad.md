---
titulo: Armar el laberinto impreso
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · Armar el laberinto impreso

## Objetivo del día

Armar las piezas impresas sobre la base, conectar el joystick y los dos servos reales, y hacer que el tablero se mueva.

**Al terminar tendremos:** el laberinto armado y el tablero inclinándose con el joystick.

## Materiales del equipo

- Piezas impresas: tablero, marco, torre del servo y torre del eje
- Base de MDF o cartón grueso de unos 30 × 25 cm, 4 tornillos para madera pequeños (o pegamento caliente)
- 2 palitos de pincho (o clavos de 3 mm) y tijeras o alicate para cortarlos
- 2 servos SG90 con sus brazos y sus tornillos
- Arduino UNO + cable USB, módulo joystick, portapilas de 4 pilas AA, protoboard y cables
- Pegamento caliente (silicona), destornillador pequeño, regla y lápiz
- Computadora con Arduino IDE

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · Revisar las piezas (10 min)

Prueben cada cosa **sin pegar nada** y marquen:

:::checklist id="g4t-piezas"
- [ ] El servo entra en la ventana del marco y en la ventana de la torre del servo, sin forzarlo.
- [ ] El palito de pincho pasa por el agujero de la torre del eje y por los dos agujeros del marco.
- [ ] El palito entra en la bisagra del tablero.
- [ ] El tablero cabe dentro del marco sin tocarlo.
:::

Si algo no entra, avisen al docente antes de seguir: a veces basta con limpiar los bordes con una lija o pasar un clavo por el agujero.

## Parte 2 · Las torres en la base (15 min)

1. Con regla y lápiz, tracen en la base una **línea de lado a lado por el centro**.
2. Pongan las dos torres sobre esa línea, una frente a la otra, con las **caras lisas (sin aletas) mirando hacia adentro**.
   - Mirando la base desde adelante (desde donde jugarán), la **torre del servo** va a la **derecha** y la **torre del eje** a la **izquierda**.
   - La distancia entre las dos caras lisas debe ser de **21,3 cm**. Cada torre a la misma distancia del centro.
   - Los agujeros de las torres deben quedar a la misma altura y uno frente al otro.
3. Atornillen cada pie con dos tornillos (con el docente) o péguenlo con bastante pegamento caliente.

## Parte 3 · El circuito y los servos en 90° (25 min)

Hagan todo con el USB desconectado y **sin pilas**. En la protoboard usen las filas largas de los bordes: **arriba** para las pilas y **abajo** para el Arduino.

1. **Energía:** cable rojo del portapilas → fila **+** de arriba; cable negro → fila **−** de arriba. Del Arduino: **5V** → fila **+** de abajo; **GND** → fila **−** de abajo.
2. **GND común:** un cable de la fila **−** de arriba a la fila **−** de abajo. (¡Nunca unan las dos filas **+**!)
3. **Joystick** (los pines tienen su nombre impreso): **+5V** → fila **+** de abajo; **GND** → fila **−** de abajo; **VRx** → **A0**; **VRy** → **A1**; **SW** → **D2**.
4. **Servos** (con tres cables macho–macho en cada conector): rojo → fila **+** de **arriba** (pilas); café → fila **−** de arriba; naranja → **D9** (servo del marco) y **D10** (servo del tablero). Marquen cada servo con un papelito: "D9 marco" y "D10 tablero".

| Componente | Conexión |
| --- | --- |
| Joystick | +5V → 5V Arduino · VRx → A0 · VRy → A1 · SW → D2 · GND → GND |
| Servo del marco | Naranja → D9 · Rojo → + pilas · Café → − pilas |
| Servo del tablero | Naranja → D10 · Rojo → + pilas · Café → − pilas |
| GND común | − pilas ↔ GND Arduino |

Miren en la animación por qué el GND común es necesario:

:::animacion tipo="gnd-comun" pin="9" pilas="4 AA (6 V)"
:::

[IMAGEN 4.3: circuito real con joystick, dos servos y portapilas con el GND común señalado]

**Servos en 90°:** antes de pegar los brazos, los dos servos deben estar en **90°** (tablero plano).

1. Conecten el USB, abran **Arduino IDE** y elijan **Arduino Uno** y su puerto en **Seleccionar placa**.
2. **Archivo → Nuevo boceto**, borren lo que trae y escriban este código. Súbanlo (→).
3. Pongan las pilas: los dos servos giran a 90° y se quedan quietos. **No giren sus ejes con la mano después de esto.**

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

4. Saquen las pilas otra vez para el montaje.

## Parte 4 · El montaje (45 min)

Sigan el orden. Miren la imagen del laberinto completo para ver dónde va cada cosa:

[IMAGEN 2.1T: laberinto diseñado en Tinkercad, con etiquetas: tablero con el laberinto, canica, agujero de la meta, marco, servo del tablero, servo del marco, torre del eje, torre del servo, base de MDF o cartón, soporte de la pantalla y base del joystick]

1. **El servo del tablero en el marco** (servo D10).
   - Miren el marco **desde adelante** (desde afuera, con la ventana frente a ustedes).
   - Metan el servo por la ventana desde afuera, con el **eje hacia la derecha**: el eje debe quedar justo en el centro del marco. Las pestañas se apoyan en la cara de afuera.
   - Atornillen las pestañas con los tornillos del servo (o pónganles una gota de silicona).
2. **El servo del marco en la torre** (servo D9).
   - Metan el servo por la ventana de la torre del servo **desde afuera** (desde el lado de las aletas), **parado y con el eje arriba**. El eje queda mirando hacia el centro de la base.
   - Atornillen sus pestañas a la torre.
3. **Los brazos:** pongan un brazo largo en el eje de cada servo, **acostado** (horizontal). No hace falta el tornillo del centro.
4. **El marco entre las torres.**
   - Pongan el marco entre las torres: su **lado izquierdo** (el del agujero) junto a la torre del eje y su **lado derecho** junto al brazo del servo.
   - Corten un palito de unos 3 cm. Pásenlo por el agujero de la torre del eje y métanlo en el agujero del marco.
   - Con el marco **plano** (horizontal), peguen el brazo del servo al lado derecho del marco con silicona. Si queda un espacio entre el brazo y el marco, rellénenlo con silicona.
   - Pongan una gota de silicona donde el palito entra en el marco (por dentro), para que el palito gire junto con el marco.
5. **El tablero dentro del marco.**
   - Pongan el tablero dentro del marco con la **bisagra atrás** (junto al agujero de atrás del marco).
   - Pasen otro palito de unos 3 cm por el agujero de atrás del marco y métanlo en la bisagra. Una gota de silicona donde entra en la bisagra.
   - Con el tablero **plano**, peguen el brazo del servo del tablero al borde de adelante del tablero.
6. Esperen un minuto a que la silicona enfríe y revisen:

:::checklist id="g4t-montaje"
- [ ] El marco gira sobre su palito y el brazo del servo, sin rozar las torres.
- [ ] El tablero gira dentro del marco sin rozarlo.
- [ ] Con la canica en el centro, el tablero está casi plano (la canica no sale rodando).
- [ ] Ningún cable estorba el movimiento.
:::

## Parte 5 · ¡El joystick mueve el tablero! (15 min)

1. **Archivo → Nuevo boceto**, borren lo que trae y escriban este código. Guárdenlo como `equipo_NOMBRE_prueba_servos`.
2. Verifiquen (✓), suban (→) y **después** pongan las pilas.

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

3. Abran el **Monitor serie** (lupa, arriba a la derecha) a **9600 baudios**: verán los dos ángulos separados por una coma. Muevan el joystick **despacio** y anoten:

:::tabla id="g4t-angulos"
| Prueba | Ángulo X | Ángulo Y | ¿Se movió el tablero? |
| --- | --- | --- | --- |
| Joystick en el centro | | | |
| Todo a la derecha | | | |
| Todo hacia arriba | | | |
:::

:::pregunta id="g4t-p1"
Con el joystick en el centro, ¿qué ángulo tienen los servos? ¿Por qué pegamos los brazos con los servos en ese ángulo?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4t-logramos"
- [ ] Las torres están fijas en la base.
- [ ] El marco y el tablero giran libres.
- [ ] Los servos usan pilas con GND común.
- [ ] El tablero se inclina con el joystick.
:::

## Bitácora (5 min)

:::foto id="g4t-foto"
Foto del laberinto armado.
:::

Antes de irse: **saquen las pilas** y suban aquí `equipo_NOMBRE_prueba_servos`.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, nueva el 21 de octubre:** junta el circuito real de la Guía 4 normal con el centrado y el montaje de la Guía 5 normal, adaptados a las piezas impresas de las guías 2T y 3T. Campos propios (g4t-…).
- Distancia entre torres: las caras lisas quedan a 212,6 mm (21,3 cm). Entre la torre y el marco quedan unos 7 mm para el brazo del servo; si el brazo no alcanza el marco, se rellena con silicona.
- El servo del marco está parado con el eje a 120 mm de la base, igual que el agujero de la torre del eje: los dos deben quedar alineados. Si el marco queda torcido, revisar que las torres estén a la misma distancia del centro.
- El servo del tablero entra con el eje hacia la derecha (mirando desde adelante); si entra al revés, el eje queda 1 cm corrido y el tablero roza.
- La unión brazo–pieza es el punto débil: si se despega, limpiar y volver a pegar con más silicona, o atornillar el brazo con los tornillos pequeños del servo.
- Si el Arduino se reinicia al mover el joystick, revisar que los servos estén en las pilas y no en el 5V del Arduino.
- g4t-p1: 90°. Así el tablero queda plano en el centro y puede inclinarse lo mismo hacia los dos lados.
- Si un equipo no termina el montaje, sigue al inicio del sábado 5 (Guía 5, Parte 1).
- Tiempo total: 10 + 15 + 25 + 45 + 15 + 5 + 5 = 120 minutos.
:::
