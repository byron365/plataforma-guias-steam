---
titulo: El dispensador que sabe la hora
guia: 14
sabado: 14
sesion: Proyección a Básico II
duracion: 120
---

# Guía 14 · El dispensador que sabe la hora

## Objetivo del día

Conocer el simulador Wokwi y un reloj de tiempo real, simulando un dispensador que sirve a horas exactas, e imaginar el dispensador 2.0.

**Al terminar tendremos:** un dispensador simulado que sirve a una hora programada y el plan del dispensador 2.0.

## Materiales del equipo

- Computadora con internet
- Cuenta en wokwi.com

## Parte 1 · ¿Qué hora es para el Arduino? (10 min)

Nuestro dispensador usa `millis()`: cuenta el tiempo desde que se encendió, pero **no sabe la hora**. Si se va la luz, empieza de cero. Un **reloj de tiempo real (RTC)** es un módulo con pila propia que siempre sabe la hora, aunque se apague el Arduino.

:::pregunta id="g14-p1"
¿Qué problema tendría nuestro dispensador si se va la luz a las 3 de la tarde?
:::

## Parte 2 · Dispensador con reloj en Wokwi (50 min)

**Wokwi** es un simulador: arma y prueba circuitos de Arduino en la computadora, sin piezas reales. La página está en inglés; aquí van los nombres de los botones tal como aparecen.

1. Crea un proyecto de **Arduino Uno** en wokwi.com.
   - Entren a **wokwi.com** e inicien sesión con la cuenta del equipo (o la que indique el docente).
   - Bajen hasta **Start from Scratch** y elijan **Arduino Uno**.
   - A la izquierda está el código (`sketch.ino`) y a la derecha el dibujo del circuito.
2. Agrega un **RTC DS1307**, un **Servo**, un **Buzzer** y un **LED**.
   - Usa el botón **+** azul arriba del dibujo y escribe el nombre de cada pieza en el buscador: *RTC (DS1307)*, *Servo*, *Buzzer*, *LED*. Agrega también un **Resistor** (resistencia) para el LED.
   - Arrastra cada pieza cerca del Arduino.
3. **Conecta los cables.** Para hacer un cable, haz clic en la punta de un pin y luego en el pin de destino. Para borrar uno, haz clic en él y presiona **Supr**.

| Componente | Pin |
| --- | --- |
| RTC SDA / SCL | A4 / A5 |
| Servo PWM | D9 |
| LED | D4 (con resistencia) |
| Buzzer | D5 |

   Detalle de cada conexión:
   - **RTC:** SDA → A4, SCL → A5, 5V → 5V, GND → GND.
   - **Servo:** PWM → 9, V+ → 5V, GND → GND.
   - **LED:** pin 4 del Arduino → resistencia → pata **A** (ánodo, la doblada) del LED; pata **C** (cátodo) → GND.
   - **Buzzer:** pin **2** del buzzer → D5; pin **1** → GND.
   - Si al pasar el mouse sobre un pin ves su nombre, úsalo para confirmar que es el correcto.

[IMAGEN 14.1: dispensador simulado en Wokwi con el reloj DS1307, el servo, el LED y el buzzer]

4. En **Library Manager** agrega **RTClib**.
   - Arriba del código hay pestañas: `sketch.ino`, `diagram.json` y **Library Manager**. Haz clic en **Library Manager**.
   - Presiona el **+**, escribe **RTClib** y elígela de la lista.
5. Copia el código:
   - Vuelve a la pestaña `sketch.ino`, borra lo que trae y escribe (o pega) este programa:

```cpp
#include <RTClib.h>
#include <Servo.h>

RTC_DS1307 reloj;
Servo compuerta;
int ultimoMinuto = -1;

void setup() {
  Serial.begin(9600);
  reloj.begin();
  compuerta.attach(9);
  compuerta.write(0);
  pinMode(4, OUTPUT);
}

void servir() {
  tone(5, 1500, 300);
  digitalWrite(4, HIGH);
  compuerta.write(70);
  delay(1000);
  compuerta.write(0);
  digitalWrite(4, LOW);
}

void loop() {
  DateTime ahora = reloj.now();
  Serial.print(ahora.hour());
  Serial.print(":");
  Serial.println(ahora.minute());

  // servir cada vez que el minuto termina en 0 (10, 20, 30...)
  if (ahora.minute() % 10 == 0 && ahora.minute() != ultimoMinuto) {
    servir();
    ultimoMinuto = ahora.minute();
  }
  delay(1000);
}
```

6. Presiona **Play** y mira la hora en el Monitor serie.
   - **Play** es el botón verde con un triángulo ▶, arriba del dibujo.
   - El Monitor serie aparece abajo del dibujo y muestra la hora cada segundo. El reloj toma la hora de la computadora.
   - Servirá cuando el minuto termine en 0. Si falta mucho, pueden probar cambiando el `10` de `ahora.minute() % 10` por `2` (sirve en los minutos pares) y volver a presionar Play.
7. Guarden la simulación con **Save** y copien el enlace de la barra del navegador para la bitácora.

`%` da el **residuo** de una división: `25 % 10` es 5, y `30 % 10` es 0. Por eso `ahora.minute() % 10 == 0` es verdadero en los minutos 0, 10, 20, 30, 40 y 50.

:::pregunta id="g14-p2"
En una casa, ¿qué condición escribirías para que sirva a las 7:00 de la mañana? (Pista: `ahora.hour() == 7`.)
:::

## Parte 3 · El dispensador 2.0 (40 min)

Marquen las ideas que le pondrían a su dispensador 2.0:

:::checklist id="g14-ideas"
- [ ] Reloj de tiempo real con horarios exactos
- [ ] Báscula electrónica para pesar la porción
- [ ] Control y avisos desde el celular
- [ ] Cámara para ver a la mascota
- [ ] Agua además de comida
- [ ] Pantalla con la hora de la siguiente comida
:::

Con las ideas que marcaron, completen el plan:

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del dispensador 2.0 | |
| ¿Qué mejoras tendría? | |
| ¿Qué componentes nuevos necesitaría? | |
| ¿Qué necesitamos aprender? | |
:::

Dibujen en la bitácora cómo se vería, con flechas que señalen cada mejora, y súbanlo:

:::foto id="g14-boceto"
Foto del boceto del dispensador 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Creamos el dispensador en Wokwi.
- [ ] El reloj muestra la hora.
- [ ] Diseñamos el dispensador 2.0.
:::

## Reto extra

Programa **tres horarios** de comida (por ejemplo 7:00, 12:00 y 18:00) usando `||`.

Pista: `||` significa "o". Una condición con `||` es verdadera si se cumple **cualquiera** de sus partes, por ejemplo `ahora.hour() == 7 || ahora.hour() == 12`.

## Bitácora (15 min)

:::pregunta id="g14-b1"
Enlace de nuestra simulación en Wokwi:
:::

:::pregunta id="g14-b2" individual="si"
¿Qué es lo que más quiero aprender en Básico II?
:::

Si quieren llevarse la simulación, descarguen el proyecto de Wokwi como `.zip` (en el menú de la flecha junto a **Save**, opción **Download project zip**) y súbanlo aquí.

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- En Wokwi el DS1307 toma la hora de la computadora al iniciar la simulación.
- `ultimoMinuto` evita servir muchas veces durante el mismo minuto: buena oportunidad para repasar por qué se necesita.
- Mencionar que en Básico II se usan más módulos que hablan por I2C (A4/A5), como pantallas OLED.
- Tiempo total: 10 + 50 + 40 + 5 + 15 = 120 minutos.
:::
