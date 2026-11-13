---
titulo: Subimos los programas al robot
guia: 10
sabado: 10
sesion: Práctica de armado (2)
tipo: armado
duracion: 120
---

# Guía 10 · Subimos los programas al robot

## Objetivo del día

Usar Arduino IDE para subir al robot un programa de prueba de los motores y, cuando funcionen, el programa final con el cambio para usar el Bluetooth.

**Al terminar tendremos:** los motores probados (adelante, atrás y giro) y el programa final `equipo_NOMBRE_robot` en el Arduino, listo para manejar con la app en la Guía 11.

## Materiales del equipo

- Robot con el circuito conectado y revisado por el docente (Guía 9)
- Computadora con Arduino IDE y el cable USB del Arduino
- `equipo_NOMBRE_robot.txt` (Guía 5)
- Una caja para poner el robot con las ruedas en el aire

## Parte 1 · Conociendo Arduino IDE (20 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 10.1AR: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

## Parte 2 · Conectar el Arduino (15 min)

1. Con las **dos baterías apagadas**, conecten el USB del Arduino del robot a la computadora. Se enciende la luz **ON** del Arduino.
2. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…**
3. En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.
4. Arriba debe decir **Arduino UNO**, y abajo a la derecha ya no debe decir **[no conectado]**.

[IMAGEN 10.2AR: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

## Parte 3 · Prueba de motores (40 min)

1. Pongan el robot sobre una caja, con las ruedas en el aire.
2. Programa nuevo, escriban el código, guárdenlo como `equipo_NOMBRE_prueba_motores` y toquen **✓ Verificar**.
3. Toquen **→ Subir**, el botón que está al lado de Verificar, y esperen a que el cuadro de mensajes diga que terminó, sin letras rojas.
4. Enciendan las dos baterías con sus interruptores: las ruedas hacen adelante, atrás, giro y pausa, y se repite.

[IMAGEN 10.4AR: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

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

:::tabla id="g10ar-motores"
| Paso | ¿Lo hizo bien? | Si no, ¿qué pasó? |
| --- | --- | --- |
| Adelante | | |
| Atrás | | |
| Giro a la derecha | | |
:::

> Si un motor gira al revés, apaguen las baterías e **intercambien sus dos cables** en OUT1/OUT2 (o OUT3/OUT4).

## Parte 4 · El programa final (30 min)

1. Apaguen las dos baterías. Con el robot sobre la caja, abran `equipo_NOMBRE_robot.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 5), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_robot`.
2. **Cambio importante:** en el simulador, `bt` era el Monitor en serie. Ahora es el Bluetooth. Borren estas dos líneas:

```cpp
// En el simulador, "bt" es el Monitor en serie
#define bt Serial
```

   y escriban en su lugar:

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);  // RX, TX al HC-05
```

3. Revisen que diga `TIMEOUT = 500`. Toquen **✓ Verificar**: debe aparecer el aviso **Compilación completada**.

[IMAGEN 10.3AR: Arduino IDE con el programa final del robot verificado, con las líneas de SoftwareSerial y el aviso Compilación completada]

4. Toquen **→ Subir** y esperen a que termine. Desconecten el USB: en la Guía 11 el robot se maneja con la app.

:::checklist id="g10ar-subido"
- [ ] La prueba de motores hizo adelante, atrás y giro.
- [ ] El programa final tiene `SoftwareSerial` en lugar de `#define bt Serial`.
- [ ] El programa final se verificó sin errores y subió al Arduino.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g10ar-logramos"
- [ ] Elegimos la placa y el puerto en Arduino IDE.
- [ ] Los motores hacen adelante, atrás y giro.
- [ ] El programa final está cargado en el robot.
:::

## Bitácora (10 min)

:::foto id="g10ar-foto"
Video corto de las ruedas haciendo la prueba de motores.
:::

Antes de irse, **apaguen las dos baterías**.

:::archivo id="g10-archivo"
**Archivo de trabajo:** suban `equipo_NOMBRE_prueba_motores` y `equipo_NOMBRE_robot` (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con app (11 sábados), guía de armado (tipo: armado):** nueva el 13 de noviembre. Junta la prueba de motores de la Guía 8 (Parte 5) y el programa final de la Guía 9 (Parte 3), con las partes de Arduino IDE. Campos propios (g10ar-…).
- Imágenes 10.1AR a 10.4AR: capturas de Arduino IDE 2.3.10 en español con el programa final del robot ya cambiado a `SoftwareSerial`, tomadas sin Arduino conectado (por eso la 10.2AR no muestra el COM).
- Si con USB funciona y con baterías no, revisar la pila de 9 V (que esté cargada y su interruptor encendido) y el GND común entre el L298N y el Arduino.
- Con el L298N los motores reciben unos 2 V menos que con el TB6612: si con la velocidad baja solo zumban, es normal.
- Si un equipo no terminó el circuito de la Guía 9, que lo termine y lo revise el docente antes de conectar las baterías.
- Tiempo total: 20 + 15 + 40 + 30 + 5 + 10 = 120 minutos.
:::
