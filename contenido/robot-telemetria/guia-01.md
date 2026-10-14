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

Miren en la animación qué viaja del mando al robot y del robot al mando:

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

Repártanse los cuatro roles y escriban cada nombre en la columna **Nombre**. Si el equipo tiene menos de cuatro integrantes, alguien toma dos roles.

Nombre del equipo: ______

## Parte 3 · Requisitos (25 min)

Un **requisito** es algo que el sistema **debe** cumplir y que se puede comprobar.

1. Para R1 a R3, escriban en la última columna cómo lo comprobarían. Ejemplo para R1: "Movemos el joystick hacia adelante, atrás y a los lados y miramos si el robot hace lo mismo".
2. En R4, R5 y R6 escriban tres requisitos más que propongan ustedes. En **Tipo** pongan funcional (lo que hace), seguridad (lo que evita accidentes) o rendimiento (qué tan rápido, lejos o cuánto dura).

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

Ahora decidan qué datos viajan. En **¿Cada cuánto?** escriban cada cuánto tiempo creen que hace falta enviar ese dato (por ejemplo, "10 veces por segundo" o "cada segundo"). Completen los rangos que faltan.

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

Miren en la animación cómo viaja una letra bit por bit:

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

1. Pongan una etiqueta de cinta a cada Arduino: **A** y **B**. Hagan los tres cables de la tabla con los USB desconectados.
2. En el **A**, el botón va con una pata a D2 y otra a GND (en los botones de 4 patas, dos patas en diagonal). En el **B** no hace falta conectar nada: usaremos el LED que ya trae la placa junto al pin 13 (marcado **L**).
3. Conecten el **A** por USB. En Arduino IDE, en **Seleccionar placa**, elijan **Arduino Uno** y su puerto (COM…). **Archivo → Nuevo**, escriban el código, guárdenlo como `equipo_NOMBRE_uart`, verifiquen (✓) y suban (→). *SoftwareSerial* ya viene con Arduino IDE: no hay que instalar nada.
4. Conecten el **B** y suban el mismo programa (elijan el puerto del B; tiene otro número COM).
5. **Con una sola computadora:** abran una segunda ventana con **Archivo → Nueva**, peguen el mismo código y elijan ahí el puerto del otro Arduino. Cada ventana tiene su propio Monitor serie.
6. Abran el **Monitor serie** (la lupa arriba a la derecha) de cada Arduino, a **9600 baudios** y con **Nueva línea** en la lista de al lado: así cada mensaje termina con un salto de línea.

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

Hagan cada prueba y anoten Sí o No:

- Para enviar texto, escríbanlo en la caja de arriba del Monitor serie y presionen **Enter**.
- Para la última prueba, quiten el cable de GND entre los dos Arduino, envíen otra vez y miren qué llega. Al terminar, vuelvan a conectarlo.
- **Ojo:** si los dos Arduino están conectados a la **misma** computadora, sus tierras siguen unidas por los cables USB y no notarán nada. Para esta prueba, conecten el **B** a un cargador de celular por USB (o a otra computadora) y usen la prueba del botón.

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

El LED de D9 va con su resistencia de 220 Ω (pata larga hacia D9, pata corta a GND). En el B agreguen `pinMode(9, OUTPUT);` en el `setup()` y, debajo de la línea del LED en el `loop()`, otra línea parecida que revise si el mensaje empieza con `PWM,`.

## Bitácora (20 min)

La **bitácora de fallos** acompaña todo el proyecto: cada vez que algo no funcione, anoten el síntoma (qué se ve), la causa (por qué pasó) y la solución (qué hicieron).

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
