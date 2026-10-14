---
titulo: Robot y mando por dentro
guia: 4
sabado: 4
sesion: Implementación electrónica
duracion: 120
---

# Guía 4 · Robot y mando por dentro

## Objetivo del día

Montar la electrónica del robot (potencia, puente H, motores y sensor) y del mando, y configurar los dos HC-05 con comandos AT para que se emparejen solos.

**Al terminar tendremos:** el robot moviendo sus motores con un código de prueba y los dos HC-05 emparejados.

## Materiales del equipo

- Chasis con 2 motores DC y ruedas
- TB6612FNG, LM2596 ajustado, batería con interruptor y fusible
- HC-SR04, divisor de batería
- 2 HC-05, resistencias de 1 kΩ y 2 kΩ
- Joystick, OLED, 2 Arduino UNO, protoboards, cables

## Parte 1 · Potencia del robot (30 min)

Conecta en este orden, **con la batería desconectada**:

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

:::checklist id="g4-potencia"
- [ ] Ningún cable de batería llega directo al pin 5V del Arduino.
- [ ] El regulador está ajustado a 5,0 V.
- [ ] Todas las tierras están unidas.
- [ ] Hay fusible entre la batería y el resto.
:::

## Parte 2 · Puente H, motores y sensor (25 min)

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

Divisor de batería en **A0** (sábado 3).

- **TB6612FNG:** pónganlo en la protoboard y conecten sus pines según la tabla. Los dos cables de cada motor van a AO1/AO2 (izquierdo) y BO1/BO2 (derecho).
- **HC-SR04:** va al frente del robot, mirando hacia adelante.
- **Divisor:** las dos resistencias de 10 kΩ como en la Guía 3, con el punto medio en **A0**, el extremo de arriba en el **+** de la batería (después del interruptor) y el de abajo en GND.

Prueba de motores:

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

:::tabla id="g4-motores"
| Paso | ¿Lo hizo bien? | Si no, ¿qué pasó? |
| --- | --- | --- |
| Adelante | | |
| Atrás | | |
| Giro a la derecha | | |
:::

> Si un motor gira al revés, **intercambia sus dos cables** en AO1/AO2 (o BO1/BO2).

## Parte 3 · Configurar los HC-05 (40 min)

El **RX del HC-05 trabaja a 3,3 V**: desde el TX del Arduino (D11) usa un divisor **1 kΩ / 2 kΩ**.

El cable de D11 pasa por la resistencia de 1 kΩ y llega a RXD; desde RXD sale otra resistencia de 2 kΩ hacia GND. Ármenlo en la protoboard con todo apagado.

| HC-05 | Arduino |
| --- | --- |
| VCC / GND | 5V / GND |
| TXD | D10 (RX del Arduino) |
| RXD | D11 → 1 kΩ → RXD, y RXD → 2 kΩ → GND |
| EN / KEY | 3,3 V (solo para entrar en modo AT) |

[IMAGEN 4.2: conexión del HC-05 con el divisor de 1 kΩ y 2 kΩ en su pin RXD]

Código puente para modo AT (sube a un Arduino):

Configuraremos los dos HC-05 **uno por uno** con el mismo Arduino: primero el del robot y después el del mando. Programa nuevo, escriban el código, guárdenlo como `equipo_NOMBRE_puente_at` y súbanlo.

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);

void setup() {
  Serial.begin(9600);
  bt.begin(38400);          // velocidad del modo AT
  Serial.println("Listo para comandos AT");
}

void loop() {
  if (bt.available()) Serial.write(bt.read());
  if (Serial.available()) bt.write(Serial.read());
}
```

1. Desconecta el HC-05, mantén presionado su botón y vuelve a conectarlo: el LED parpadea **lento** (modo AT).
   - "Desconectar" es quitar su cable de VCC. Si el módulo tiene botón, dejen el pin EN sin conectar. Si **no** tiene botón, conecten EN a 3,3 V antes de volver a conectar VCC.
   - Parpadeo lento = más o menos una vez cada 2 segundos. Si parpadea rápido, no entró: repitan.
2. Monitor serie a **9600** y "Ambos NL & CR". Escribe `AT` → debe responder `OK`.
   - La lista con "Ambos NL & CR" está junto a la de los baudios, abajo a la derecha del Monitor serie.
   - Escriban cada comando de la tabla en la caja de arriba, presionen **Enter** y copien la respuesta. Escríbanlos con mayúsculas y sin espacios.

:::tabla id="g4-at"
| Módulo | Comando | Respuesta |
| --- | --- | --- |
| Robot (esclavo) | AT+ROLE=0 | |
| Robot (esclavo) | AT+ADDR? (anotar la dirección) | |
| Robot (esclavo) | AT+UART=9600,0,0 | |
| Mando (maestro) | AT+ROLE=1 | |
| Mando (maestro) | AT+CMODE=0 | |
| Mando (maestro) | AT+BIND=dirección del esclavo (con comas en vez de dos puntos) | |
| Mando (maestro) | AT+UART=9600,0,0 | |
:::

3. Reinicia los dos módulos normalmente. Si quedaron emparejados, sus LEDs parpadean **dos veces cada 2 segundos**.
   - Para cambiar de módulo: quiten los cables del HC-05 del robot, conecten el del mando de la misma forma, entren al modo AT y escriban sus comandos.
   - En `AT+BIND` escriban la dirección que anotaron del robot, cambiando los dos puntos (`:`) por comas.
   - Al final, cada HC-05 vuelve a su Arduino **sin** EN conectado y sin presionar el botón. Enciendan los dos.

:::pregunta id="g4-p1"
¿Por qué el RX del HC-05 necesita un divisor de voltaje y el TX no?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] La potencia del robot está montada con GND común.
- [ ] Los motores hacen adelante, atrás y giro.
- [ ] Los dos HC-05 están configurados.
- [ ] Los HC-05 se emparejan solos al encender.
:::

## Reto extra

Repite la prueba de UART del sábado 1, pero ahora **inalámbrica**: dos Arduino con sus HC-05 enviándose texto.

Suban a los dos Arduino el programa `equipo_NOMBRE_uart` de la Guía 1. Los HC-05 ya están en D10 y D11, así que no hay que cambiar nada del código.

## Bitácora (10 min)

:::tabla id="g4-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La dirección que da AT+ADDR? viene como 98d3:31:f5a1b2; en AT+BIND se escribe 98d3,31,f5a1b2.
- Algunos HC-05 no responden a 38400 en modo AT si se entra con EN en alto desde el arranque: probar con el botón.
- Revisar el armado de potencia de cada equipo **antes** de conectar la batería: es el punto de mayor riesgo.
- Montar el mando (joystick A0/A1, OLED A4/A5, HC-05 10/11) puede quedar para inicio del sábado 5 si falta tiempo.
- Tiempo total: 30 + 25 + 40 + 5 + 10 = 110 minutos (10 de margen).
:::
