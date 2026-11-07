---
titulo: Simulamos el nodo clasificador
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos el nodo clasificador

## Objetivo del día

Agregar al simulador el segundo Arduino, el **clasificador**: lee el color de la pieza, gira la canaleta hacia su contenedor, muestra el color en la pantalla y tiene un botón de paro.

**Al terminar tendremos:** el clasificador simulado: al cambiar el color con las perillas, la canaleta gira al contenedor correcto y la pantalla dice qué color ve.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_banda_sim` (sábado 4)
- Bitácora

## Parte 1 · ¿Cómo reconoce un color? (20 min)

El sensor de color de la banda real (TCS34725) mide cuánta luz **roja (R)**, **verde (G)** y **azul (B)** le llega de la pieza. Una pieza roja refleja más rojo que verde y azul; una verde, más verde; una azul, más azul.

> Si R es el mayor de los tres → roja. Si G es el mayor → verde. Si no → azul.

Tinkercad no tiene ese sensor, así que lo imitamos con **tres perillas**: una dice cuánto rojo ve, otra cuánto verde y otra cuánto azul.

:::tabla id="g5p-colores"
| R | G | B | ¿Qué color diría el programa? |
| --- | --- | --- | --- |
| 800 | 200 | 150 | |
| 100 | 700 | 300 | |
| 200 | 300 | 900 | |
| 500 | 500 | 100 | |
:::

:::pregunta id="g5p-p1"
En la última fila, R y G son iguales. ¿Qué color dice el programa? ¿Les parece correcto?
:::

Ahora compruébenlo: giren las tres perillas para formar cada fila de la tabla y miren qué decide el programa, hacia dónde gira la canaleta y qué línea del código se ilumina. Después inventen sus propios colores.

:::animacion tipo="perillas-color"
:::

## Parte 2 · El clasificador en el simulador (35 min)

Abran `equipo_NOMBRE_banda_sim` en Tinkercad (**Diseños → Circuitos**). Con la simulación detenida, al lado de la banda agreguen:

1. **Un segundo Arduino Uno R3:** será el **clasificador**. Déjenlo separado para no confundirlos. En el panel de código aparecerán dos: **1** es la banda y **2** es el clasificador.
2. **Tres Potenciómetro:** el "sensor de color". Pónganles una nota o recuérdenlos en orden: rojo, verde y azul.
3. **El servo de la canaleta:** un **Microservomotor**.
4. **La pantalla:** en **Buscar** escriban `lcd` y arrastren la **LCD 16 x 2 (I2C)**. Hagan clic sobre ella y cambien **Tipo: Basado en PCF8574** y **Dirección: 39 (0x27)**, como la pantalla real.
5. **Botón de paro:** un **Pulsador**.
6. Conecten, todo al **Arduino del clasificador**:

| Componente | Arduino clasificador |
| --- | --- |
| Perillas R / G / B: pata del centro | A0 / A1 / A2 |
| Perillas: patas de los extremos | 5V y GND |
| Servo: señal / potencia / tierra | D6 / 5V / GND |
| Pantalla GND / VCC / SDA / SCL | GND / 5V / A4 / A5 |
| Botón de paro | D7 y, en diagonal, GND |

- Pasen el mouse por los pines del servo para ver cuál es la señal, la potencia y la tierra.
- En la banda real, el servo toma la energía de la fuente de 5 V; en el simulador puede ir al 5V del Arduino.

[IMAGEN 5.1S: nodo clasificador simulado en Tinkercad Circuits: tres perillas como sensor de color, servo de la canaleta, pantalla LCD 16 × 2 I2C y botón de paro]

## Parte 3 · El programa del clasificador (35 min)

1. Toquen **Código**, elijan **2 (Arduino Uno R3)** en la lista de la derecha, cámbienlo a **Texto** (y **Continuar**) y borren todo.
2. Escriban:

```cpp
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

Servo desviador;
LiquidCrystal_I2C pantalla(0x27, 16, 2);  // dirección, columnas, filas

// En el simulador, tres perillas hacen de sensor de color
const int PERILLA_R = A0, PERILLA_G = A1, PERILLA_B = A2;
const int PARO = 7;
const int ANG[3] = {30, 90, 150};  // canaleta: rojo, verde, azul
const char* NOMBRE[3] = {"ROJO ", "VERDE", "AZUL "};

void setup() {
  pinMode(PARO, INPUT_PULLUP);
  desviador.attach(6);
  pantalla.init();
  pantalla.backlight();
}

// 0 = rojo, 1 = verde, 2 = azul
int leerColor() {
  int r = analogRead(PERILLA_R);
  int g = analogRead(PERILLA_G);
  int b = analogRead(PERILLA_B);
  if (r > g && r > b) return 0;
  if (g > r && g > b) return 1;
  return 2;
}

void loop() {
  // 1. Botón de paro: canaleta al centro y aviso
  if (digitalRead(PARO) == LOW) {
    desviador.write(90);
    pantalla.setCursor(0, 0);
    pantalla.print("PARO            ");
    delay(200);
    return;
  }

  // 2. Leer el color y girar la canaleta
  int c = leerColor();
  desviador.write(ANG[c]);

  // 3. Mostrar el color y los tres valores (0 a 255)
  pantalla.setCursor(0, 0);
  pantalla.print("Color: ");
  pantalla.print(NOMBRE[c]);
  pantalla.print("    ");
  pantalla.setCursor(0, 1);
  pantalla.print("R");
  pantalla.print(analogRead(PERILLA_R) / 4);
  pantalla.print(" G");
  pantalla.print(analogRead(PERILLA_G) / 4);
  pantalla.print(" B");
  pantalla.print(analogRead(PERILLA_B) / 4);
  pantalla.print("   ");
  delay(200);
}
```

- `ANG[3]` es una **lista** de tres ángulos: `ANG[0]` es el del rojo, `ANG[1]` el del verde y `ANG[2]` el del azul. Por eso `ANG[c]` da el ángulo del color que se leyó.
- `return` dentro del `loop` hace que, con el paro presionado, el resto del `loop` no se ejecute.

## Parte 4 · Probar los colores (15 min)

1. **Iniciar simulación.** Hagan clic en cada perilla y gírenla arrastrando para formar cada color de la tabla.
2. Miren hacia dónde apunta el brazo del servo y qué dice la pantalla.

:::tabla id="g5p-pruebas"
| Perillas | Color en la pantalla | Ángulo del servo (30, 90 o 150) | ¿Correcto? |
| --- | --- | --- | --- |
| R alta, G y B bajas | | | |
| G alta, R y B bajas | | | |
| B alta, R y G bajas | | | |
| Botón de paro presionado | | | |
:::

:::pregunta id="g5p-p2"
Si quisieran que el contenedor del azul quedara un poco más a la derecha, ¿qué número del código cambiarían?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] El clasificador tiene sus tres perillas, el servo, la pantalla y el botón de paro.
- [ ] La pantalla muestra el color y los valores R, G y B.
- [ ] La canaleta gira al ángulo de cada color.
- [ ] El botón de paro deja la canaleta al centro.
:::

## Reto extra

Agrega un cuarto caso: si los tres valores son muy bajos (todos menores que 100), la pantalla dice **NADA** y la canaleta se queda al centro (no hay pieza bajo el sensor).

Pista: en `leerColor()`, antes de los otros `if`, uno que responda `-1` si los tres son menores que 100; y en el `loop`, si `c` es `-1`, no usar `ANG[c]`.

## Bitácora (10 min)

:::foto id="g5p-foto"
Captura de pantalla del clasificador simulado con la pantalla mostrando un color.
:::

:::pregunta id="g5p-b1"
¿Qué ventaja tiene guardar los tres ángulos en una lista `ANG[3]` en lugar de escribir tres `if` con cada número?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- Simulador de las tres perillas (`perillas-color`, 6 de noviembre): usa la misma lógica de `leerColor()`. Sirve para comprobar la tabla g5p-colores antes de armar el circuito.
- **Versión Práctica (10 sábados):** el clasificador se simula con un segundo Arduino en el mismo diseño. El TCS34725 se imita con **tres potenciómetros** (como la simulación en Wokwi de la Guía 2 completa); solo cambia `leerColor()`. Campos propios (g5p-…). Las respuestas de la Guía 5 anterior (los dos nodos) pasaron a la Guía 8 (g8p-…).
- La pantalla es la **LCD 16 × 2 I2C** (decisión de Bairon, también en la banda real, en lugar del MAX7219). En Tinkercad: **Tipo: Basado en PCF8574**, **Dirección: 39 (0x27)**; la librería LiquidCrystal I2C ya está incluida en Tinkercad.
- g5p-colores: rojo, verde, azul y azul (R y G empatan, ningún `if` se cumple y el programa responde azul).
- g5p-p1: dice azul, aunque B es el más bajo: es un caso que el programa no resuelve bien. En la banda real casi no pasa con piezas rojas, verdes y azules; en la Guía 10 se mejora con proporciones.
- g5p-p2: el 150 de `ANG[3]` (por ejemplo 160).
- g5p-b1: los ángulos están juntos en un lugar fácil de ajustar, y el código elige con `ANG[c]` sin repetir líneas.
- Tiempo total: 20 + 35 + 35 + 15 + 5 + 10 = 120 minutos.
:::
