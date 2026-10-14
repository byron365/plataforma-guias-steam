---
titulo: Una fábrica en miniatura
guia: 1
sabado: 1
sesion: Definición del proyecto
duracion: 120
---

# Guía 1 · Una fábrica en miniatura

## Objetivo del día

Definir qué clasificará la banda, cuántos colores y qué se cuenta, escribir los requisitos y hacer que dos Arduino se comuniquen por I2C.

**Al terminar tendremos:** la tabla de requisitos, los roles del equipo y dos Arduino intercambiando datos por I2C (maestro y esclavo).

## Materiales del equipo

- 2 Arduino UNO con cable USB
- 1 potenciómetro de 10 kΩ, 1 LED con 220 Ω
- Cables y protoboard
- Computadora con Arduino IDE

## Parte 1 · El proyecto (15 min)

En las fábricas, las **bandas transportadoras** llevan productos y los **clasifican** automáticamente. La nuestra: un motor DC mueve la banda, un sensor detecta cada pieza, un sensor de color la identifica y un servo la desvía al contenedor correcto. Un display muestra cuántas piezas hay de cada color.

Usaremos **dos Arduino**: uno controla la banda y otro la clasificación, comunicados por **I2C**.

[IMAGEN 1.1: render de la banda clasificadora con el motor, el sensor de color, el servo desviador, los tres contenedores y el display]

:::animacion tipo="banda"
:::

## Parte 2 · Roles (10 min)

| Rol | Responsabilidad | Nombre |
| --- | --- | --- |
| Arquitecto | Diagrama de bloques, flujo de señales y presupuesto de energía | |
| Ingeniero de potencia | Fuente de 12 V, regulador, MOSFET y protecciones | |
| Ingeniero de comunicaciones | I2C entre placas, I2C al sensor, SPI al display | |
| Programador e integrador | Código de cada nodo, calibración y corrección de fallos | |

Nombre del equipo: ______

## Parte 3 · Definir el proyecto (25 min)

:::tabla id="g1-definicion"
| Pregunta | Decisión del equipo |
| --- | --- |
| ¿Qué piezas clasificaremos? (cubos impresos, tapitas, fichas) | |
| Tamaño de las piezas | |
| ¿Cuántos colores? | 3 (rojo, verde, azul) |
| ¿Qué pasa con una pieza de otro color? | |
| ¿Qué se muestra en el display? | |
| ¿Cuántas piezas por minuto queremos clasificar? | |
:::

:::tabla id="g1-requisitos"
| N.º | Requisito | Tipo | ¿Cómo lo comprobaremos? |
| --- | --- | --- | --- |
| R1 | Clasifica correctamente al menos el 90 % de un lote de 30 piezas | Rendimiento | |
| R2 | La velocidad de la banda se ajusta con una perilla y se mantiene estable | Funcional | |
| R3 | Un botón de paro detiene la banda al instante | Seguridad | |
| R4 | | | |
| R5 | | | |
:::

## Parte 4 · I2C entre dos Arduino (50 min)

El **I2C** usa solo dos cables compartidos por todos los dispositivos: **SDA** (datos) y **SCL** (reloj). Hay un **maestro** que pregunta y **esclavos** con una dirección (un número). En el UNO, SDA es **A4** y SCL es **A5**.

:::animacion tipo="i2c"
:::

| Arduino maestro | Arduino esclavo |
| --- | --- |
| A4 (SDA) | A4 (SDA) |
| A5 (SCL) | A5 (SCL) |
| GND | GND |

> A diferencia del UART, en I2C los cables **no se cruzan**: SDA con SDA y SCL con SCL.

[IMAGEN 1.2: dos Arduino UNO unidos por A4, A5 y GND para comunicarse por I2C]

**Esclavo (dirección 8):** lee un potenciómetro en A0 y lo envía cuando el maestro pregunta; enciende un LED en D9 con el brillo que le ordenan.

```cpp
#include <Wire.h>
volatile byte brillo = 0;

void setup() {
  pinMode(9, OUTPUT);
  Wire.begin(8);                // soy el esclavo 8
  Wire.onRequest(responder);    // cuando el maestro pregunta
  Wire.onReceive(recibir);      // cuando el maestro ordena
}

void loop() {
  analogWrite(9, brillo);
}

void responder() {
  Wire.write(analogRead(A0) / 4);   // un byte: 0 a 255
}

void recibir(int n) {
  brillo = Wire.read();
}
```

**Maestro:** pide el valor al esclavo, lo muestra y le devuelve una orden.

```cpp
#include <Wire.h>

void setup() {
  Wire.begin();                 // soy el maestro
  Serial.begin(9600);
}

void loop() {
  Wire.requestFrom(8, 1);       // pedir 1 byte al esclavo 8
  if (Wire.available()) {
    byte valor = Wire.read();
    Serial.println(valor);
    Wire.beginTransmission(8);  // ordenar al esclavo 8
    Wire.write(valor);          // brillo = valor de la perilla
    Wire.endTransmission();
  }
  delay(100);
}
```

:::tabla id="g1-pruebas"
| Prueba | ¿Funcionó? | Observación |
| --- | --- | --- |
| El maestro muestra el valor de la perilla | | |
| El LED del esclavo cambia con la perilla | | |
| Cambiar la dirección del esclavo a 9 sin cambiar el maestro | | |
| Desconectar el GND común | | |
:::

:::pregunta id="g1-p1"
¿Qué pasó al cambiar la dirección del esclavo? ¿Para qué sirven las direcciones en I2C?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Definimos piezas, colores y conteo.
- [ ] Escribimos al menos 5 requisitos comprobables.
- [ ] Dos Arduino se comunican por I2C en ambos sentidos.
:::

## Reto extra

Haz que el esclavo envíe **dos bytes**: el valor de la perilla y si un botón en D2 está presionado. En el maestro usa `Wire.requestFrom(8, 2)`.

## Bitácora (15 min)

:::tabla id="g1-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::pregunta id="g1-b1"
¿Por qué dividir la banda en dos nodos y no hacerlo todo con un Arduino?
:::

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La bitácora de fallos acompaña todo el proyecto: es la mejor evidencia de aprendizaje del nivel.
- Si las piezas son cubos impresos, imprimir 10 de cada color (≈20 mm) antes del sábado 6.
- Las funciones `onRequest` y `onReceive` se ejecutan como interrupciones: dentro de ellas no usar `delay` ni `Serial`.
- Tiempo total: 15 + 10 + 25 + 50 + 5 + 15 = 120 minutos.
:::
