---
titulo: Simulamos el partido
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos el partido

## Objetivo del día

Agregar al marcador simulado el **tiempo del partido**: empieza con el botón, cuenta hacia atrás en la pantalla, celebra cada gol con un mensaje y pita el final.

**Al terminar tendremos:** el código base del marcador funcionando en Wokwi, con goles, tiempo y sonidos.

## Materiales del equipo

- Computadora con internet y la cuenta de Wokwi del equipo
- El proyecto de Wokwi de la Guía 4 (el enlace está en esa guía)
- Bitácora, lápiz y calculadora

## Parte 1 · El tiempo en milisegundos (15 min)

`millis()` es el tiempo, en milisegundos, desde que se encendió el Arduino. Un segundo tiene **1000** milisegundos (ms).

Para saber cuánto lleva el partido, el Arduino guarda el `millis()` del momento en que se presionó el botón de inicio (`inicio`) y lo resta del `millis()` de ahora:

> Tiempo del partido = millis() − inicio

:::tabla id="g5p-ms"
| Tiempo | En milisegundos |
| --- | --- |
| 1 segundo | 1000 |
| 30 segundos | |
| 2 minutos | |
| 3 minutos | |
:::

:::pregunta id="g5p-p1"
El partido empezó cuando `millis()` valía 5000. Ahora `millis()` vale 65 000. ¿Cuántos segundos lleva el partido?
:::

## Parte 2 · El código del partido (45 min)

Abran su proyecto de Wokwi. En `sketch.ino`, borren el código de la Guía 4 y escriban (o peguen) este programa completo:

```cpp
#include <Wire.h>
#include <Adafruit_SSD1306.h>

// --- Pines ---
const int BOTON = 2;
const int SENSOR_AZUL = 3;  // portería azul
const int SENSOR_ROJO = 4;  // portería roja
const int BUZZER = 5;

// --- Ajustes del equipo ---
const unsigned long DURACION = 180000; // 3 min en ms
const unsigned long PAUSA_GOL = 1500;  // ms

Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);
int golesAzul = 0, golesRojo = 0;
unsigned long inicio = 0, ultimoGol = 0;
bool jugando = false;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(SENSOR_AZUL, INPUT_PULLUP);   // en el real: INPUT
  pinMode(SENSOR_ROJO, INPUT_PULLUP);   // en el real: INPUT
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
  mostrarMarcador(DURACION);
}

// Suma un gol y lo celebra
void gol(int &goles, String equipo) {
  goles++;
  ultimoGol = millis();
  pantalla.clearDisplay();
  pantalla.setTextSize(3);
  pantalla.setCursor(20, 10);
  pantalla.print("GOL!");
  pantalla.setTextSize(2);
  pantalla.setCursor(40, 45);
  pantalla.print(equipo);
  pantalla.display();
  tone(BUZZER, 1000, 150);
  delay(200);
  tone(BUZZER, 1500, 400);
  delay(1000);
}

// Dibuja el marcador y el tiempo
void mostrarMarcador(unsigned long resta) {
  pantalla.clearDisplay();
  pantalla.setTextSize(1);
  pantalla.setCursor(0, 0);
  pantalla.print("AZUL            ROJO");
  pantalla.setTextSize(3);
  pantalla.setCursor(10, 22);
  pantalla.print(golesAzul);
  pantalla.print(" - ");
  pantalla.print(golesRojo);
  pantalla.setTextSize(1);
  pantalla.setCursor(30, 56);
  pantalla.print("Quedan ");
  pantalla.print(resta / 1000);
  pantalla.print(" s");
  pantalla.display();
}

void loop() {
  // 1. Esperar el botón para empezar
  if (!jugando) {
    if (digitalRead(BOTON) == LOW) {
      golesAzul = 0;
      golesRojo = 0;
      inicio = millis();
      jugando = true;
      tone(BUZZER, 2000, 600);  // silbato
    }
    return;
  }

  // 2. ¿Gol? (LOW = pelota en el sensor)
  bool listo = millis() - ultimoGol > PAUSA_GOL;
  if (listo && digitalRead(SENSOR_AZUL) == LOW)
    gol(golesRojo, "ROJO");
  if (listo && digitalRead(SENSOR_ROJO) == LOW)
    gol(golesAzul, "AZUL");

  // 3. Tiempo y fin del partido
  unsigned long pasado = millis() - inicio;
  if (pasado >= DURACION) {
    jugando = false;
    mostrarMarcador(0);
    tone(BUZZER, 2000, 1500);  // final
    return;
  }
  mostrarMarcador(DURACION - pasado);
}
```

El `loop()` tiene tres partes, marcadas con comentarios:

| Parte del `loop()` | Qué hace |
| --- | --- |
| 1. Esperar el botón | Mientras no hay partido, solo espera el botón de inicio. Al presionarlo: goles en cero, guarda `inicio` y suena el silbato |
| 2. ¿Gol? | Si un sensor da LOW, llama a `gol()` con el equipo que anotó |
| 3. Tiempo y fin | Calcula cuánto lleva el partido; si llegó a `DURACION`, pita el final |

## Parte 3 · Probar el partido (35 min)

Presionen **Play** y prueben con los botones: el de D2 empieza el partido; los de D3 y D4 son los "sensores". Guarden con **Save**.

[IMAGEN 3.2: simulación en Wokwi con la pantalla mostrando el marcador 2 - 1 y el tiempo restante]

:::tabla id="g5p-pruebas"
| Prueba | ¿Funciona? |
| --- | --- |
| Antes de empezar, los botones de las porterías no suman | |
| El botón de inicio hace sonar el silbato | |
| El botón azul suma gol al ROJO | |
| El botón rojo suma gol al AZUL | |
| La pantalla dice "GOL!" y el equipo | |
| El tiempo baja | |
| Al acabar el tiempo suena el final | |
:::

Para probar el final sin esperar 3 minutos: detengan la simulación, cambien el número de `DURACION`, presionen **Play** otra vez y empiecen un partido.

:::pregunta id="g5p-p2"
Cambia `DURACION` para que el partido dure 30 segundos. ¿Qué número escribiste?
:::

:::opciones id="g5p-final"
Cuando se acaba el tiempo y presionan un botón de portería, ¿qué pasa?
- Suma un gol
- No suma: el partido terminó
- Empieza otro partido
:::

Al terminar, dejen `DURACION` en 180000 y guarden con **Save**.

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] El código base está en Wokwi y sin errores.
- [ ] El partido empieza con el botón y el tiempo baja.
- [ ] Los goles se celebran con "GOL!" y sonido.
- [ ] Probamos el final con un partido corto.
:::

## Reto extra

Haz que la pantalla diga **"FIN"** y el ganador (o "EMPATE") cuando se acaba el tiempo.

Pista: en el bloque del fin del partido, antes del `return;`, comparen `golesAzul` con `golesRojo` (con `if`, `else if` y `else`) y escriban en la pantalla el mensaje que toque.

## Bitácora (20 min)

:::pregunta id="g5p-b1"
¿Qué hace la función `gol()` y por qué la usamos dos veces?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** si quieren, descarguen el proyecto de Wokwi (menú de la flecha junto a **Save** → **Download project zip**) y súbanlo aquí, o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (9 sábados):** el código base del marcador de la Guía 4 Tinkercad (Parte 4), ahora solo en el simulador; la cancha pasa a la Guía 7. Campos propios (g5p-…).
- g5p-ms: 30 000, 120 000 y 180 000.
- g5p-p1: 65 000 − 5000 = 60 000 ms = 60 segundos.
- g5p-p2: 30000.
- g5p-final: no suma, porque `jugando` vuelve a `false` y el `loop` solo espera el botón de inicio.
- `int &goles` (por referencia) permite que la función cambie la variable original; explicarlo como "le damos la caja, no una copia".
- La línea de `PAUSA_GOL` se explica en la Guía 6 (antirrebote).
- Tiempo total: 15 + 45 + 35 + 5 + 20 = 120 minutos.
:::
