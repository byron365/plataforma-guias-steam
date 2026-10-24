---
titulo: Armar el robot
guia: 4
sabado: 4
sesion: Construcción y electrónica
duracion: 120
---

# Guía 4 · Armar el robot

## Objetivo del día

Armar las piezas impresas con los motores, las ruedas y el sensor, conectar las dos baterías, el puente H L298N y el sensor, y hacer girar los motores con un código de prueba.

**Al terminar tendremos:** el robot armado y sus ruedas haciendo adelante, atrás y giro.

## Materiales del equipo

- Piezas impresas: chasis, soporte del sensor, 4 postes y bandeja
- 2 motores TT con sus ruedas, rueda loca, 4 tornillos M3 × 30 con tuerca (o 2 cinchos delgados) y 4 palitos de pincho
- Batería de los motores (2S, 7,4 V) en su portabaterías, con fusible e interruptor
- Pila de 9 V con su broche y plug para el jack del Arduino (5,5 × 2,1 mm), con un segundo interruptor
- Puente H L298N, protoboard pequeña, Arduino UNO con cable USB, HC-SR04, 2 resistencias de 10 kΩ y cables
- Pegamento caliente (silicona), cinta doble faz, destornillador, tijeras o alicate, multímetro

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · Revisar las piezas (10 min)

Prueben cada cosa **sin pegar nada** y marquen:

:::checklist id="g4p-piezas"
- [ ] El portabaterías de los motores entra en el cerco de la bandeja.
- [ ] Los ojos del HC-SR04 asoman por los agujeros del soporte.
- [ ] Un palito de pincho pasa por un poste y por los agujeros del chasis y de la bandeja.
- [ ] Los tornillos (o el cincho) pasan por la ranura de la oreja y por los agujeros del motor.
:::

Si algo no entra, avisen al docente antes de seguir: a veces basta con limpiar los bordes con una lija o pasar un clavo por el agujero.

## Parte 2 · El piso de abajo (30 min)

Miren la imagen del robot completo para ver dónde va cada cosa:

[IMAGEN 2.1P: robot y mando diseñados en Tinkercad, con etiquetas: batería de los motores, bandeja, poste, pila de 9 V del Arduino, sensor HC-SR04 en su soporte, chasis, rueda loca, Arduino, puente H L298N, rueda y motor TT, joystick, pantalla OLED y caja del mando]

1. **Volteen el chasis:** las orejas y la columna quedan **abajo**.
2. **Los motores.**
   - Pongan cada motor debajo del chasis, por **fuera** de su oreja: la cara de arriba del motor pegada a la placa y el eje hacia **afuera**.
   - Pasen los dos tornillos por los agujeros del motor y por la ranura de la oreja, y pongan las tuercas. Si usan cincho, páselo por los dos agujeros del motor y por la ranura, y apriételo.
   - Los cables de los motores suben por el **paso de los cables** del chasis.
3. **Las ruedas:** a presión en el eje de cada motor, hasta el fondo.
4. **La rueda loca:** péguenla (o atorníllenla) en la punta de la columna, en el frente.
5. **El sensor.**
   - Metan el HC-SR04 en su soporte desde atrás, con los ojos asomando por los agujeros y los pines hacia arriba.
   - Volteen el chasis otra vez (ruedas abajo) y peguen el soporte con silicona **sobre** el chasis, en el borde del frente, mirando hacia adelante.
6. **Los postes:** peguen los cuatro postes sobre los agujeros del chasis, con un palito de pincho adentro de cada uno para que queden alineados.
7. **La pila de 9 V del Arduino:** sobre el chasis, entre los postes, con cinta doble faz o velcro. Su cable sube a la bandeja por el paso de los cables.

✔ **Revisa:** pongan el robot en el piso. Debe quedar **horizontal**, apoyado en las dos ruedas y en la rueda loca.

## Parte 3 · La bandeja y las dos baterías (30 min)

1. **Ubiquen las piezas en la bandeja** (con cinta doble faz gruesa o una gota de silicona en las esquinas): el portabaterías en su cerco, adelante; el Arduino atrás a un lado, con su jack hacia el borde; el L298N atrás al otro lado y la protoboard pequeña delante del L298N. Los dos interruptores y el fusible, en un borde de la bandeja.
2. **Pongan la bandeja** sobre los postes: los palitos entran en sus agujeros. Corten lo que sobre de cada palito y pongan una gota de silicona arriba.
3. **Conecten las dos baterías** en este orden, **con las dos desconectadas**. El robot tiene **dos fuentes separadas**: la batería 2S solo para el L298N y los motores, y la pila de 9 V solo para el Arduino.

| Desde | Hasta |
| --- | --- |
| Batería de los motores + | Fusible → interruptor → borne **+12V** del L298N |
| Batería de los motores − | Borne **GND** del L298N |
| Borne **GND** del L298N | Un **GND** del Arduino (GND común) |
| Pila de 9 V | Segundo interruptor → plug al **jack** del Arduino |
| Borne **5V** del L298N | **Nada** (queda libre) |

Lean la tabla fila por fila y hagan una conexión a la vez:

1. El **+** de la batería de los motores pasa primero por el fusible y luego por el interruptor, y llega al borne **+12V** del L298N (puede decir 12V o VCC). Funciona con 7,4 V.
2. El **−** de la batería va al borne **GND** del L298N.
3. En ese mismo borne GND pongan otro cable hasta un **GND** del Arduino. Sin este cable, el L298N no entiende las señales del Arduino.
4. La pila de 9 V va al **jack** del Arduino, con su propio interruptor en el cable rojo. El Arduino baja los 9 V a 5 V con su regulador interno.
5. El borne **5V** del L298N queda **libre**: no lo conecten al Arduino. Dejen puesto el puente (jumper) que trae junto a los bornes: así el L298N se alimenta solo con su batería.
6. Antes de conectar las baterías, **pidan al docente que revise** el armado.

Miren en la animación por qué todas las tierras deben estar unidas:

:::animacion tipo="gnd-comun" pilas="Batería 2S (7,4 V)"
:::

[IMAGEN 4.1P: las dos fuentes del robot: batería 2S con fusible e interruptor al L298N, pila de 9 V con interruptor al jack del Arduino y el cable de GND común entre el L298N y el Arduino]

:::checklist id="g4p-potencia"
- [ ] La pila de 9 V llega al jack del Arduino; ninguna batería llega al pin 5V.
- [ ] El borne 5V del L298N está libre.
- [ ] El GND del L298N está unido a un GND del Arduino.
- [ ] Hay fusible entre la batería de los motores y el L298N.
:::

## Parte 4 · Puente H, motores y sensor (25 min)

| L298N | Arduino / motor | Nombre en el código |
| --- | --- | --- |
| ENA | D5 | PWMA |
| IN1 / IN2 | D7 / D8 | AIN1 / AIN2 |
| ENB | D6 | PWMB |
| IN3 / IN4 | D4 / D9 | BIN1 / BIN2 |
| OUT1, OUT2 | Motor izquierdo | — |
| OUT3, OUT4 | Motor derecho | — |

| HC-SR04 | Arduino |
| --- | --- |
| VCC / GND | 5V / GND |
| Trig / Echo | D2 / D3 |

- **L298N:** primero **quiten los dos puentes (jumpers) de ENA y ENB**; si se quedan, los motores siempre van a fondo. Después conecten los pines según la tabla. Los dos cables de cada motor van a los bornes OUT1/OUT2 (izquierdo) y OUT3/OUT4 (derecho).
- **HC-SR04 y HC-05:** toman la energía del pin **5V** del Arduino (y su GND).
- **HC-SR04:** sus cables suben del soporte a la bandeja por el costado.
- **Divisor de batería:** el Arduino mide la batería en **A0**, pero solo aguanta hasta 5 V y la batería llega a 8,4 V. Dos resistencias iguales de 10 kΩ la dividen entre 2.
  - En la protoboard, pongan las dos resistencias en fila, una después de la otra. El punto donde se unen va a **A0**.
  - El otro extremo de la primera resistencia va al **+** de la batería de los motores (después del interruptor); el otro extremo de la segunda, a GND.
  - Así el Arduino mide la batería que mueve el robot, no la pila de 9 V.

## Parte 5 · Prueba de motores (15 min)

1. Pongan el robot sobre una caja, con las ruedas en el aire.
2. Conecten el Arduino del robot por USB. Programa nuevo, escriban el código, guárdenlo como `equipo_NOMBRE_prueba_motores`, verifiquen (✓) y suban (→).
3. Enciendan las dos baterías con sus interruptores: las ruedas hacen adelante, atrás, giro y pausa, y se repite.

```cpp
// L298N: PWMA = ENA, AIN1 = IN1, AIN2 = IN2, PWMB = ENB, BIN1 = IN3, BIN2 = IN4
const int PWMA = 5, AIN1 = 7, AIN2 = 8;
const int PWMB = 6, BIN1 = 4, BIN2 = 9;

void motor(int pwm, int in1, int in2, int vel) {
  digitalWrite(in1, vel > 0);
  digitalWrite(in2, vel < 0);
  analogWrite(pwm, abs(vel));
}

void setup() {
  int pines[] = {PWMA, AIN1, AIN2, PWMB, BIN1, BIN2};
  for (int p : pines) pinMode(p, OUTPUT);
}

void loop() {
  motor(PWMA, AIN1, AIN2, 150);  motor(PWMB, BIN1, BIN2, 150);   delay(1500); // adelante
  motor(PWMA, AIN1, AIN2, -150); motor(PWMB, BIN1, BIN2, -150);  delay(1500); // atrás
  motor(PWMA, AIN1, AIN2, 150);  motor(PWMB, BIN1, BIN2, -150);  delay(1000); // gira
  motor(PWMA, AIN1, AIN2, 0);    motor(PWMB, BIN1, BIN2, 0);     delay(2000); // para
}
```

:::tabla id="g4p-motores"
| Paso | ¿Lo hizo bien? | Si no, ¿qué pasó? |
| --- | --- | --- |
| Adelante | | |
| Atrás | | |
| Giro a la derecha | | |
:::

> Si un motor gira al revés, **intercambia sus dos cables** en OUT1/OUT2 (o OUT3/OUT4).

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] El robot queda horizontal sobre sus ruedas.
- [ ] Las dos baterías están conectadas, con GND común y fusible.
- [ ] Los motores hacen adelante, atrás y giro.
:::

## Bitácora (5 min)

:::foto id="g4p-foto"
Foto del robot armado.
:::

Antes de irse: **apaguen las dos baterías** y suban aquí `equipo_NOMBRE_prueba_motores`.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** el armado de las piezas impresas, la potencia, los motores y el sensor de la Guía 4 normal y el divisor de la Guía 3 normal. Desde el 23 de octubre usa **dos fuentes separadas** (batería 2S → fusible → interruptor → L298N; pila de 9 V → interruptor → jack del Arduino) y el **puente H L298N** en lugar del TB6612 y el LM2596. Mismos pines del Arduino que la versión completa (D5, D7, D8, D6, D4, D9), así el código solo pierde STBY. Los HC-05 pasan a la Guía 5. Campos propios (g4p-…).
- Revisar el armado de potencia de cada equipo **antes** de conectar las baterías: es el punto de mayor riesgo. Errores típicos: el borne 5V del L298N conectado al Arduino, falta del GND común o los puentes de ENA/ENB puestos.
- El L298N pierde unos 2 V: con la batería llena a los motores les llegan unos 6,4 V, y con 6,4 V en la batería, unos 4,4 V. Los motores TT andan, pero más lento que con el TB6612; si con PWM bajo solo zumban, es normal.
- Con el puente de 5V puesto, el L298N alimenta su lógica con su regulador interno desde la batería de los motores; su borne 5V es una salida y no se usa: las dos fuentes van separadas a propósito.
- La pila de 9 V alimenta el Arduino, el HC-05 y el HC-SR04 (unos 110 mA): dura pocas horas; tener pilas de repuesto.
- Si los motores TT vienen sin cables, soldarlos antes de la clase.
- Si el robot no queda horizontal, revisar el alto de la columna (Guía 2): se puede compensar con una arandela o con silicona debajo de la rueda loca.
- Baterías de litio: siempre en portabaterías con protección, no perforarlas ni cargarlas sin supervisión.
- Si un equipo no termina, sigue al inicio del sábado 5 (Guía 5, Parte 1).
- Tiempo total: 10 + 30 + 30 + 25 + 15 + 5 + 5 = 120 minutos.
:::
