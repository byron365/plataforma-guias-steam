---
titulo: Una casa, cuatro equipos
guia: 1
sabado: 1
sesion: Definición del proyecto
duracion: 120
---

# Guía 1 · Una casa, cuatro equipos

## Objetivo del día

Definir qué hará la casa inteligente, repartir los nodos entre los equipos, escribir los requisitos y hacer la primera prueba de comunicación I2C entre dos Arduino.

**Al terminar tendremos:** el nodo asignado a nuestro equipo, la tabla de requisitos y dos Arduino comunicándose por I2C.

## Materiales del equipo

- 2 Arduino UNO con cable USB
- 1 potenciómetro de 10 kΩ, 1 LED con 220 Ω
- Protoboard, cables

## Parte 1 · El proyecto del grupo (20 min)

Todo el grupo construirá **una sola casa** a escala. Cada equipo desarrolla una parte:

| Nodo | Dirección I2C | ¿Qué hace? |
| --- | --- | --- |
| **Central** | Maestro | Recibe órdenes del celular por Bluetooth, las reenvía a los nodos y muestra el estado en una pantalla |
| **Sala** | 8 | Tira LED de 12 V con brillo regulable y encendido automático con sensor de luz |
| **Cuarto** | 9 | Ventilador de 12 V cuya velocidad depende de la temperatura |
| **Entrada** | 10 | Cerradura con relé y alarma con sensor de movimiento |

[IMAGEN 1.1: render de la maqueta de la casa inteligente con la sala, el cuarto, la entrada y la unidad central]

Miren la animación: así funcionará la casa completa.

:::animacion tipo="casa"
:::

El docente reparte los nodos entre los equipos. Marquen el suyo:

:::opciones id="g1-nodo"
¿Qué nodo desarrollará nuestro equipo?
- Central
- Sala
- Cuarto
- Entrada
:::

## Parte 2 · Roles (10 min)

| Rol | Responsabilidad | Nombre |
| --- | --- | --- |
| Arquitecto | Diagrama de bloques del nodo y su lugar en el sistema; energía | |
| Ingeniero de potencia | MOSFET, relé, fuente, protecciones del nodo | |
| Ingeniero de comunicaciones | Mensajes I2C del nodo (y Bluetooth en la central) | |
| Programador e integrador | Código del nodo y pruebas de integración con los otros equipos | |

Nombre del equipo: ______

## Parte 3 · Requisitos (25 min)

Un **requisito** es algo que el sistema debe cumplir y que se puede **comprobar** con una prueba.

Requisitos de **toda la casa** (se escriben entre todos): para cada uno, escriban cómo lo comprobarían, y acuerden entre todos el R5.

:::tabla id="g1-requisitos-casa"
| N.º | Requisito | Tipo | ¿Cómo lo comprobaremos? |
| --- | --- | --- | --- |
| R1 | Cada nodo responde a las órdenes del celular en menos de 1 s | Funcional | |
| R2 | La pantalla central muestra el estado real de cada nodo | Funcional | |
| R3 | Las cargas de 12 V están aisladas de la lógica y protegidas | Seguridad | |
| R4 | La fuente soporta todo encendido a la vez | Rendimiento | |
| R5 | | | |
:::

Requisitos de **nuestro nodo**: tres cosas que su nodo debe cumplir (miren la tabla de la Parte 1). Ejemplo para la sala: "La tira se enciende sola cuando la luz ambiente baja de 30 %" → se comprueba tapando el sensor de luz.

:::tabla id="g1-requisitos-nodo"
| N.º | Requisito | ¿Cómo lo comprobaremos? |
| --- | --- | --- |
| N1 | | |
| N2 | | |
| N3 | | |
:::

## Parte 4 · Primera prueba I2C (50 min)

El **I2C** usa dos cables compartidos (**SDA = A4**, **SCL = A5**) y una tierra común. Un **maestro** pregunta y ordena; cada **esclavo** tiene una dirección.

Miren en la animación cómo viaja una orden de dos bytes (la letra y el número):

:::animacion tipo="i2c" orden="L"
:::

Pongan una etiqueta de cinta a cada Arduino: **M** (maestro) y **E** (esclavo). Conecten con los USB desconectados:

| Maestro | Esclavo |
| --- | --- |
| A4 | A4 |
| A5 | A5 |
| GND | GND |

En el **esclavo** agreguen: potenciómetro (pata izquierda → 5V, centro → **A0**, pata derecha → GND) y LED (pata larga → 220 Ω → **D9**; pata corta → GND).

**Esclavo (dirección 8):** recibe un brillo para un LED en D9 y responde con el valor de una perilla en A0.

Conecten **solo** el **E** por USB, elijan **Arduino Uno** y su puerto en **Seleccionar placa**, creen un programa nuevo con este código, guárdenlo como `equipo_NOMBRE_esclavo` y súbanlo.

```cpp
#include <Wire.h>
volatile byte brillo = 0;

void setup() {
  pinMode(9, OUTPUT);
  Wire.begin(8);
  Wire.onReceive(recibir);
  Wire.onRequest(responder);
}

void loop() {
  analogWrite(9, brillo);
}

void recibir(int n) {
  char orden = Wire.read();     // una letra
  byte valor = Wire.read();     // un número
  if (orden == 'L') brillo = map(valor, 0, 100, 0, 255);
}

void responder() {
  Wire.write(analogRead(A0) / 4);
}
```

**Maestro:** envía lo que escribas en el Monitor serie (por ejemplo `50`) como orden `L` y muestra la respuesta.

Ahora conecten el **M** (su puerto puede tener otro número COM), suban este código (`equipo_NOMBRE_maestro`) y conecten también el **E** a la computadora o a un cargador USB para que tenga energía.

```cpp
#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    int v = Serial.parseInt();
    Wire.beginTransmission(8);
    Wire.write('L');
    Wire.write(constrain(v, 0, 100));
    Wire.endTransmission();
  }
  Wire.requestFrom(8, 1);
  if (Wire.available()) {
    Serial.print("Perilla del esclavo: ");
    Serial.println(Wire.read());
  }
  delay(500);
}
```

**Para escribir órdenes:** abran el Monitor serie del maestro (lupa, 9600 baudios). Abajo a la derecha hay una lista que dice **Nueva línea**: cámbienla a **Sin ajuste de línea**. (Si se queda en "Nueva línea", el maestro lee el salto de línea como un 0 y apaga el LED un segundo después.) Escriban el número en la caja de arriba y presionen **Enter**.

:::tabla id="g1-pruebas"
| Prueba | ¿Funcionó? |
| --- | --- |
| Escribir 100: el LED se enciende a tope | |
| Escribir 20: el LED se ve tenue | |
| El maestro muestra la perilla del esclavo | |
:::

:::pregunta id="g1-p1"
Este mensaje tiene dos bytes: una letra y un número. ¿Para qué sirve la letra?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Sabemos qué nodo desarrollará el equipo.
- [ ] Escribimos requisitos de la casa y del nodo.
- [ ] Probamos I2C con orden y respuesta.
:::

## Bitácora (10 min)

La **bitácora de fallos** acompaña todo el proyecto: cada vez que algo no funcione, anoten el síntoma, la causa y la solución.

:::tabla id="g1-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

Antes de irse, suban los dos programas juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Con 4 equipos, uno por nodo. Con 3, el equipo de la central también hace la entrada; con más de 4, duplicar nodos (dos salas con direcciones 8 y 11, por ejemplo) o agregar un nodo nuevo (cochera, jardín).
- El éxito depende de la integración: dejar claro desde hoy que el sábado 6 se juntan todos los nodos.
- La bitácora de fallos acompaña todo el proyecto.
- Tiempo total: 20 + 10 + 25 + 50 + 5 + 10 = 120 minutos.
:::
