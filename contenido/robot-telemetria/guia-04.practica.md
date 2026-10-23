---
titulo: Armar el robot
guia: 4
sabado: 4
sesion: Construcción y electrónica
duracion: 120
---

# Guía 4 · Armar el robot

## Objetivo del día

Armar las piezas impresas con los motores, las ruedas y el sensor, montar la electrónica del robot y hacer girar los motores con un código de prueba.

**Al terminar tendremos:** el robot armado y sus ruedas haciendo adelante, atrás y giro.

## Materiales del equipo

- Piezas impresas: chasis, soporte del sensor, 4 postes y bandeja
- 2 motores TT con sus ruedas, rueda loca, 4 tornillos M3 × 30 con tuerca (o 2 cinchos delgados) y 4 palitos de pincho
- Portabaterías con batería, interruptor y fusible; LM2596 ajustado a 5,0 V (sábado 3)
- TB6612FNG, protoboard pequeña, Arduino UNO con cable USB, HC-SR04, 2 resistencias de 10 kΩ y cables
- Pegamento caliente (silicona), cinta doble faz, destornillador, tijeras o alicate, multímetro

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · Revisar las piezas (10 min)

Prueben cada cosa **sin pegar nada** y marquen:

:::checklist id="g4p-piezas"
- [ ] El portabaterías entra en el cerco de la bandeja.
- [ ] Los ojos del HC-SR04 asoman por los agujeros del soporte.
- [ ] Un palito de pincho pasa por un poste y por los agujeros del chasis y de la bandeja.
- [ ] Los tornillos (o el cincho) pasan por la ranura de la oreja y por los agujeros del motor.
:::

Si algo no entra, avisen al docente antes de seguir: a veces basta con limpiar los bordes con una lija o pasar un clavo por el agujero.

## Parte 2 · El piso de abajo (30 min)

Miren la imagen del robot completo para ver dónde va cada cosa:

[IMAGEN 2.1P: robot y mando diseñados en Tinkercad, con etiquetas: portabaterías, bandeja, poste, sensor HC-SR04 en su soporte, chasis, rueda loca, Arduino, TB6612 en la protoboard, rueda y motor TT, joystick, pantalla OLED y caja del mando]

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

✔ **Revisa:** pongan el robot en el piso. Debe quedar **horizontal**, apoyado en las dos ruedas y en la rueda loca.

## Parte 3 · La bandeja y la potencia (30 min)

1. **Ubiquen las piezas en la bandeja** (con cinta doble faz o una gota de silicona): el portabaterías en su cerco, adelante; el Arduino atrás a un lado y la protoboard pequeña atrás al otro lado; el LM2596 entre los dos. El interruptor y el fusible, en un borde de la bandeja.
2. **Pongan la bandeja** sobre los postes: los palitos entran en sus agujeros. Corten lo que sobre de cada palito y pongan una gota de silicona arriba.
3. **Conecten la potencia** en este orden, **con la batería desconectada**:

| Desde | Hasta |
| --- | --- |
| Batería + | Fusible → interruptor → VM del TB6612 y IN+ del LM2596 |
| Batería − | GND del TB6612, IN− del LM2596 |
| OUT+ del LM2596 (5,0 V) | 5V del Arduino y VCC del TB6612 |
| OUT− del LM2596 | GND del Arduino |

Lean la tabla fila por fila y hagan una conexión a la vez:

1. El **+** de la batería pasa primero por el fusible y luego por el interruptor. Desde el interruptor salen dos cables: uno a **VM** del TB6612 (la energía de los motores) y otro a **IN+** del LM2596.
2. El **−** de la batería va a un **GND** del TB6612 y a **IN−** del LM2596.
3. **OUT+** del LM2596 (ya ajustado a 5,0 V en la Guía 3) va al pin **5V** del Arduino y a **VCC** del TB6612 (la energía de su lógica).
4. **OUT−** va a un **GND** del Arduino. Así todas las tierras quedan unidas.
5. Antes de conectar la batería, **pidan al docente que revise** el armado.

Miren en la animación por qué todas las tierras deben estar unidas:

:::animacion tipo="gnd-comun" pilas="Batería 2S (7,4 V)"
:::

[IMAGEN 4.1: distribución de energía del robot con batería, fusible, interruptor, LM2596, TB6612 y Arduino con GND común]

:::checklist id="g4p-potencia"
- [ ] Ningún cable de batería llega directo al pin 5V del Arduino.
- [ ] El regulador está ajustado a 5,0 V.
- [ ] Todas las tierras están unidas.
- [ ] Hay fusible entre la batería y el resto.
:::

## Parte 4 · Puente H, motores y sensor (25 min)

| TB6612FNG | Arduino / motor |
| --- | --- |
| PWMA / AIN1 / AIN2 | D5 / D7 / D8 |
| PWMB / BIN1 / BIN2 | D6 / D4 / D9 |
| STBY | D12 |
| AO1, AO2 | Motor izquierdo |
| BO1, BO2 | Motor derecho |

| HC-SR04 | Arduino |
| --- | --- |
| VCC / GND | 5V / GND |
| Trig / Echo | D2 / D3 |

- **TB6612FNG:** pónganlo en la protoboard y conecten sus pines según la tabla. Los dos cables de cada motor van a AO1/AO2 (izquierdo) y BO1/BO2 (derecho).
- **HC-SR04:** sus cables suben del soporte a la bandeja por el costado.
- **Divisor de batería:** el Arduino mide la batería en **A0**, pero solo aguanta hasta 5 V y la batería llega a 8,4 V. Dos resistencias iguales de 10 kΩ la dividen entre 2.
  - En la protoboard, pongan las dos resistencias en fila, una después de la otra. El punto donde se unen va a **A0**.
  - El otro extremo de la primera resistencia va al **+** de la batería (después del interruptor); el otro extremo de la segunda, a GND.

## Parte 5 · Prueba de motores (15 min)

1. Pongan el robot sobre una caja, con las ruedas en el aire.
2. Conecten el Arduino del robot por USB. Programa nuevo, escriban el código, guárdenlo como `equipo_NOMBRE_prueba_motores`, verifiquen (✓) y suban (→).
3. Enciendan la batería con el interruptor: las ruedas hacen adelante, atrás, giro y pausa, y se repite.

```cpp
const int PWMA = 5, AIN1 = 7, AIN2 = 8;
const int PWMB = 6, BIN1 = 4, BIN2 = 9;
const int STBY = 12;

void motor(int pwm, int in1, int in2, int vel) {
  digitalWrite(in1, vel > 0);
  digitalWrite(in2, vel < 0);
  analogWrite(pwm, abs(vel));
}

void setup() {
  int pines[] = {PWMA, AIN1, AIN2, PWMB, BIN1, BIN2, STBY};
  for (int p : pines) pinMode(p, OUTPUT);
  digitalWrite(STBY, HIGH);
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

> Si un motor gira al revés, **intercambia sus dos cables** en AO1/AO2 (o BO1/BO2).

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] El robot queda horizontal sobre sus ruedas.
- [ ] La potencia está montada con GND común y fusible.
- [ ] Los motores hacen adelante, atrás y giro.
:::

## Bitácora (5 min)

:::foto id="g4p-foto"
Foto del robot armado.
:::

Antes de irse: **apaguen la batería** y suban aquí `equipo_NOMBRE_prueba_motores`.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** el armado de las piezas impresas más las Partes 1 y 2 de la Guía 4 normal (potencia, puente H, motores y sensor) y el divisor de la Guía 3 normal. Los HC-05 pasan a la Guía 5. Campos propios (g4p-…).
- Revisar el armado de potencia de cada equipo **antes** de conectar la batería: es el punto de mayor riesgo.
- Si los motores TT vienen sin cables, soldarlos antes de la clase.
- Si el robot no queda horizontal, revisar el alto de la columna (Guía 2): se puede compensar con una arandela o con silicona debajo de la rueda loca.
- Baterías de litio: siempre en portabaterías con protección, no perforarlas ni cargarlas sin supervisión.
- Si un equipo no termina, sigue al inicio del sábado 5 (Guía 5, Parte 1).
- Tiempo total: 10 + 30 + 30 + 25 + 15 + 5 + 5 = 120 minutos.
:::
