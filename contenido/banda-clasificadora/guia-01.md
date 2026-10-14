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

Miren la animación: así funcionará la banda completa.

:::animacion tipo="banda"
:::

## Parte 2 · Roles (10 min)

Lean las responsabilidades, repartan los roles (si son menos de cuatro, alguien tiene dos) y escriban los nombres.

| Rol | Responsabilidad | Nombre |
| --- | --- | --- |
| Arquitecto | Diagrama de bloques, flujo de señales y presupuesto de energía | |
| Ingeniero de potencia | Fuente de 12 V, regulador, MOSFET y protecciones | |
| Ingeniero de comunicaciones | I2C entre placas, I2C al sensor, SPI al display | |
| Programador e integrador | Código de cada nodo, calibración y corrección de fallos | |

Nombre del equipo: ______

## Parte 3 · Definir el proyecto (25 min)

Decidan en equipo y escriban sus respuestas. Piensen en lo que tienen a mano para las piezas y en lo que se puede probar en clase.

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

Un **requisito** es algo que la banda debe cumplir y que se puede **comprobar** con una prueba. Los tres primeros ya están; escriban cómo comprobarían cada uno, y agreguen dos requisitos propios (R4 y R5) con su tipo (Funcional, Rendimiento o Seguridad).

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

Miren en la animación cómo el maestro llama a un esclavo por su dirección:

:::animacion tipo="i2c"
:::

**Antes de empezar:** pongan una etiqueta de cinta en cada Arduino: **M** (maestro) y **E** (esclavo). Así no se confunden al subir los programas.

**Conexiones** (con los dos USB desconectados):

| Arduino maestro | Arduino esclavo |
| --- | --- |
| A4 (SDA) | A4 (SDA) |
| A5 (SCL) | A5 (SCL) |
| GND | GND |

> A diferencia del UART, en I2C los cables **no se cruzan**: SDA con SDA y SCL con SCL.

En el **esclavo** agreguen:

- **Potenciómetro:** pata izquierda → 5V, pata del centro → **A0**, pata derecha → GND.
- **LED:** pata larga → resistencia de 220 Ω → **D9**; pata corta → GND.

[IMAGEN 1.2: dos Arduino UNO unidos por A4, A5 y GND para comunicarse por I2C]

**Esclavo (dirección 8):** lee un potenciómetro en A0 y lo envía cuando el maestro pregunta; enciende un LED en D9 con el brillo que le ordenan.

1. Conecten **solo** el Arduino **E** a la computadora. En **Seleccionar placa** elijan **Arduino Uno** y su puerto (COM…).
2. **Archivo → Nuevo boceto**, borren lo que trae, escriban este programa y guárdenlo como `equipo_NOMBRE_esclavo`. Verifiquen (✓) y suban (→).

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

3. Desconecten el **E** y conecten el **M**. En **Seleccionar placa** elijan su puerto (puede ser otro número COM).
4. Programa nuevo con el código de abajo, guárdenlo como `equipo_NOMBRE_maestro` y súbanlo.
5. Conecten también el **E** (por USB a otro puerto de la computadora, o a un cargador USB) para que tenga energía. Abran el **Monitor serie** del maestro (lupa, 9600 baudios).

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

6. Hagan cada prueba de la tabla. Para cambiar la dirección: en el programa del esclavo, cambien `Wire.begin(8);` por `Wire.begin(9);` y súbanlo al **E**; al terminar, regrésenlo a 8. Para la última prueba, quiten un momento el cable de GND entre las placas y vuelvan a ponerlo.

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

Pistas: en el esclavo, `pinMode(2, INPUT_PULLUP)` y un segundo `Wire.write(...)` dentro de `responder()`. En el maestro, después de `requestFrom(8, 2)`, dos `Wire.read()` seguidos (el primero es la perilla, el segundo el botón).

## Bitácora (15 min)

La **bitácora de fallos** acompaña todo el proyecto: cada vez que algo no funcione, anoten qué pasó (síntoma), por qué pasó (causa) y cómo lo arreglaron (solución).

:::tabla id="g1-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::pregunta id="g1-b1"
¿Por qué dividir la banda en dos nodos y no hacerlo todo con un Arduino?
:::

Antes de irse, suban los dos programas (`equipo_NOMBRE_esclavo` y `equipo_NOMBRE_maestro`) juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La bitácora de fallos acompaña todo el proyecto: es la mejor evidencia de aprendizaje del nivel.
- Si las piezas son cubos impresos, imprimir 10 de cada color (≈20 mm) antes del sábado 6.
- Las funciones `onRequest` y `onReceive` se ejecutan como interrupciones: dentro de ellas no usar `delay` ni `Serial`.
- Tiempo total: 15 + 10 + 25 + 50 + 5 + 15 = 120 minutos.
:::
