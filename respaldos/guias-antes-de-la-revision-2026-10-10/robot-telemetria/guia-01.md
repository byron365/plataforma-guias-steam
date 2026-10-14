---
titulo: Dos cerebros que conversan
guia: 1
sabado: 1
sesion: Definición del proyecto
duracion: 120
---

# Guía 1 · Dos cerebros que conversan

## Objetivo del día

Definir los requisitos del robot y del mando, decidir qué datos viajan en cada dirección y hacer que dos Arduino se envíen mensajes por cable.

**Al terminar tendremos:** la tabla de requisitos, los roles del equipo y dos Arduino UNO intercambiando mensajes por UART con SoftwareSerial.

## Materiales del equipo

- 2 Arduino UNO con cable USB
- 2 LEDs con resistencia de 220 Ω y 1 botón
- Cables y protoboard
- Dos computadoras (o una con dos puertos USB) con Arduino IDE

## Parte 1 · El proyecto (15 min)

Construiremos un **robot con dos motores DC** y un **mando** independiente con joystick y pantalla. Cada uno tiene su propio Arduino y se comunican por **Bluetooth**: el mando envía órdenes y el robot responde con **telemetría** (voltaje de batería y distancia a obstáculos).

[IMAGEN 1.1: render del robot con su mando, mostrando las flechas de órdenes y telemetría entre ambos]

:::animacion tipo="robot-mando"
:::

Esto es un **sistema distribuido**: dos controladores, cada uno con su responsabilidad, que cooperan por un enlace de comunicación.

## Parte 2 · Roles del equipo (10 min)

| Rol | Responsabilidad | Nombre |
| --- | --- | --- |
| Arquitecto | Diagrama de bloques, flujo de señales y presupuesto de energía | |
| Ingeniero de potencia | Batería, regulador, puente H y protecciones | |
| Ingeniero de comunicaciones | Protocolo, UART, HC-05 | |
| Programador e integrador | Código de cada nodo, pruebas y corrección de fallos | |

Nombre del equipo: ______

## Parte 3 · Requisitos (25 min)

Un **requisito** es algo que el sistema **debe** cumplir y que se puede comprobar.

:::tabla id="g1-requisitos"
| N.º | Requisito | Tipo (funcional / seguridad / rendimiento) | ¿Cómo lo comprobaremos? |
| --- | --- | --- | --- |
| R1 | El robot avanza, retrocede y gira según el joystick | Funcional | |
| R2 | Si el robot pierde la señal, se detiene en menos de 1 s | Seguridad | |
| R3 | El mando muestra la batería del robot | Funcional | |
| R4 | | | |
| R5 | | | |
| R6 | | | |
:::

:::tabla id="g1-datos"
| Dirección | ¿Qué dato viaja? | ¿Cada cuánto? | Rango de valores |
| --- | --- | --- | --- |
| Mando → Robot | Velocidad del motor izquierdo | | −255 a 255 |
| Mando → Robot | Velocidad del motor derecho | | |
| Robot → Mando | Voltaje de la batería | | |
| Robot → Mando | Distancia al obstáculo | | |
:::

:::pregunta id="g1-p1"
¿Por qué R2 es un requisito de seguridad y qué podría pasar si no se cumple?
:::

## Parte 4 · UART entre dos Arduino (45 min)

El **UART** envía datos bit a bit por un cable (TX) y los recibe por otro (RX). El UNO tiene un solo UART (pines 0 y 1) y lo usa el USB, así que crearemos un segundo puerto con **SoftwareSerial** en los pines 10 y 11.

:::animacion tipo="uart"
:::

| Arduino A | Arduino B |
| --- | --- |
| D10 (RX) | D11 (TX) |
| D11 (TX) | D10 (RX) |
| GND | GND |

> Los cables **se cruzan**: lo que uno transmite, el otro lo recibe. Y la **tierra es común**: sin GND compartido, los bits no tienen referencia.

[IMAGEN 1.2: dos Arduino UNO unidos con TX y RX cruzados y GND común]

Sube el mismo código a los dos Arduino. En el Arduino A conecta un botón en D2 (a GND) y en el B un LED en D13 (el integrado sirve).

```cpp
#include <SoftwareSerial.h>
SoftwareSerial enlace(10, 11);   // RX, TX

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  Serial.begin(9600);            // al monitor
  enlace.begin(9600);            // al otro Arduino
}

void loop() {
  // Enviar: si se presiona el botón
  if (digitalRead(2) == LOW) {
    enlace.println("LED,1");
    delay(300);
  }
  // Enviar lo que se escriba en el Monitor serie
  if (Serial.available()) {
    enlace.write(Serial.read());
  }
  // Recibir: mostrar y actuar
  if (enlace.available()) {
    String m = enlace.readStringUntil('\n');
    Serial.println("Recibí: " + m);
    if (m.startsWith("LED,1")) digitalWrite(13, !digitalRead(13));
  }
}
```

:::tabla id="g1-pruebas"
| Prueba | ¿Funcionó? | Observación |
| --- | --- | --- |
| Botón en A cambia el LED de B | | |
| Texto escrito en el monitor de A aparece en B | | |
| Texto de B aparece en A | | |
| Desconectar el GND común | | |
:::

:::pregunta id="g1-p2"
¿Qué pasó al desconectar el GND común? Explica por qué.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Tenemos roles.
- [ ] Escribimos al menos 6 requisitos comprobables.
- [ ] Definimos qué datos viajan en cada dirección.
- [ ] Dos Arduino se envían mensajes en ambos sentidos.
:::

## Reto extra

Envía desde A el mensaje `PWM,128` y haz que B ajuste el brillo de un LED en D9 con ese valor (`analogWrite`). Pista: `m.substring(4).toInt()`.

## Bitácora (20 min)

:::tabla id="g1-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::pregunta id="g1-b1"
¿Qué ventajas y desventajas tiene dividir el sistema en dos Arduino en lugar de uno?
:::

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La bitácora de fallos (síntoma, causa, solución) acompaña todo el proyecto: insistir en llenarla cada sábado; es la mejor evidencia de aprendizaje del nivel.
- `readStringUntil` tiene un tiempo de espera de 1 s por defecto; aquí basta. En el robot se usará lectura carácter por carácter, que no bloquea.
- g1-p2: sin GND común los niveles de voltaje no tienen referencia y llegan caracteres basura o nada.
- Tiempo total: 15 + 10 + 25 + 45 + 5 + 20 = 120 minutos.
:::
