---
titulo: El juego completo en el simulador
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · El juego completo en el simulador

## Objetivo del día

Planificar el programa del juego, simularlo completo en Wokwi y terminar el tablero en Blender con una pieza de prueba de holgura.

**Al terminar tendremos:** el juego funcionando en el simulador, el tablero terminado y una pieza de prueba lista para imprimir.

## Materiales del equipo

- Computadora con internet, Blender y el proyecto de Wokwi del sábado 1
- Canica

## Parte 1 · Pseudocódigo (15 min)

Completa el programa del juego en español:

:::tabla id="g3-pseudo"
| Paso | ¿Qué hace el laberinto? |
| --- | --- |
| 1 | Mostrar "Presiona para jugar" en la pantalla |
| 2 | Si se presiona el botón → empezar a contar el tiempo y sonar un pitido |
| 3 | Leer el joystick y ______ |
| 4 | Mostrar el ______ en la pantalla |
| 5 | Si el sensor de la meta detecta la canica → ______ |
| 6 | Si el tiempo es menor que el récord → ______ |
| 7 | Volver el tablero al centro y esperar |
:::

:::animacion tipo="diagrama-flujo" programa="laberinto" ocultar="si"
:::

## Parte 2 · El circuito completo en Wokwi (30 min)

Abre el proyecto del sábado 1 y agrega:

| Componente | Conexión |
| --- | --- |
| Joystick | VCC → 5V · HORZ → A0 · VERT → A1 · SEL → D2 · GND → GND |
| Servo X | PWM → D9 · V+ → 5V · GND → GND |
| Servo Y | PWM → D10 · V+ → 5V · GND → GND |
| Botón (simula el sensor de meta) | Una pata → D3 · otra → GND |
| Pantalla OLED SSD1306 | SDA → A4 · SCL → A5 · VCC → 5V · GND → GND |
| Buzzer | + → D5 · − → GND |

[IMAGEN 3.1: circuito completo del laberinto en Wokwi con joystick, dos servos, botón de meta, OLED y buzzer]

:::animacion tipo="conexiones" circuito="laberinto"
:::

En Wokwi no hay sensor infrarrojo de obstáculos, así que lo simulamos con un **botón**: presionarlo es como si la canica llegara a la meta. Los dos dan **LOW** al activarse.

Agrega las librerías **Adafruit SSD1306** y **Adafruit GFX Library** y copia el código base:

```cpp
#include <Servo.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>

// --- Pines ---
const int JOY_X = A0;
const int JOY_Y = A1;
const int BOTON = 2;   // botón del joystick
const int META = 3;    // sensor IR (en Wokwi: botón)
const int BUZZER = 5;

// --- Ajustes del equipo ---
const int CENTRO = 90;       // tablero plano
const int INCLINACION = 15;  // grados máximos
const float SUAVE = 0.2;     // 0 lento, 1 directo

Servo servoX, servoY;
Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);
float angX = CENTRO, angY = CENTRO;
unsigned long inicio = 0, record = 0;
bool jugando = false;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(META, INPUT_PULLUP);
  servoX.attach(9);
  servoY.attach(10);
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
  mostrar("Presiona", "para jugar");
}

// Escribe dos líneas en la pantalla
void mostrar(String a, String b) {
  pantalla.clearDisplay();
  pantalla.setTextSize(2);
  pantalla.setCursor(0, 0);
  pantalla.println(a);
  pantalla.println(b);
  pantalla.display();
}

void loop() {
  // 1. Iniciar con el botón
  if (!jugando && digitalRead(BOTON) == LOW) {
    jugando = true;
    inicio = millis();
    tone(BUZZER, 1000, 200);
  }
  if (!jugando) return;

  // 2. Joystick -> inclinación
  int metaX = map(analogRead(JOY_X), 0, 1023,
                  CENTRO - INCLINACION, CENTRO + INCLINACION);
  int metaY = map(analogRead(JOY_Y), 0, 1023,
                  CENTRO - INCLINACION, CENTRO + INCLINACION);
  angX += (metaX - angX) * SUAVE;  // suavizar
  angY += (metaY - angY) * SUAVE;
  servoX.write(angX);
  servoY.write(angY);

  // 3. Tiempo en la pantalla
  float seg = (millis() - inicio) / 1000.0;
  mostrar("Tiempo", String(seg, 1) + " s");

  // 4. ¿Llegó a la meta?
  if (digitalRead(META) == LOW) {
    jugando = false;
    unsigned long t = millis() - inicio;
    tone(BUZZER, 1500, 800);
    String s = String(t / 1000.0, 1) + " s";
    if (record == 0 || t < record) {
      record = t;
      mostrar("RECORD!", s);
    } else {
      mostrar("Meta", s);
    }
    angX = CENTRO;  angY = CENTRO;
    servoX.write(CENTRO);
    servoY.write(CENTRO);
    delay(3000);
  }
  delay(20);
}
```

## Parte 3 · Jugar en el simulador (15 min)

| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Al presionar el joystick empieza el tiempo | | |
| Los servos se mueven entre 75° y 105° | | |
| Al presionar el botón de meta suena el buzzer | | |
| La primera vez aparece "RECORD!" | | |
| Si tardo más, aparece "Meta" | | |

:::pregunta id="g3-p1"
¿Qué variable guarda el récord? ¿Por qué empieza en 0?
:::

## Parte 4 · Terminar el tablero y probar la holgura (30 min)

1. Abre **equipo_NOMBRE_laberinto.blend** y termina todas las paredes.
2. En la casilla de la meta haz un **agujero de 8 mm** con Booleano (ahí mirará el sensor desde abajo).
3. **Pieza de prueba:** antes de imprimir el tablero entero (¡tarda horas!), imprimimos una pieza pequeña: un trozo de tablero de 80 × 30 mm con **tres pasillos** de 18, 20 y 22 mm de ancho.
4. Exporta la pieza de prueba como **equipo_NOMBRE_prueba.stl** y el tablero como **equipo_NOMBRE_tablero.stl**.

[IMAGEN 3.2: pieza de prueba de holgura con tres pasillos de 18, 20 y 22 mm junto a una canica]

[IMAGEN 3.3: tablero completo del laberinto en Blender con todas las paredes y el agujero de la meta]

:::pregunta id="g3-p2"
¿Por qué conviene imprimir primero una pieza de prueba pequeña?
:::

## Parte 5 · Cronograma (10 min)

:::tabla id="g3-cronograma"
| Sábado | Meta | Responsable principal |
| --- | --- | --- |
| 4 | Soporte cardán en Blender + servos reales con joystick | |
| 5 | Tablero montado e inclinándose | |
| 6 | Sensor de meta, pantalla y juego completo | |
| 7 | Récord, tabla de tiempos y ficha técnica | |
| 8 | Reglas del torneo y presentación | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos el pseudocódigo.
- [ ] El juego funciona completo en Wokwi.
- [ ] El tablero está terminado con el agujero de la meta.
- [ ] Exportamos la pieza de prueba y el tablero.
:::

## Reto extra

Haz que en la pantalla aparezca también el récord mientras juegas, en letra pequeña debajo del tiempo.

## Bitácora (15 min)

:::pregunta id="g3-b1"
¿Qué hace `millis()` y por qué la usamos para el cronómetro en vez de `delay()`?
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl), su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Durante la semana: imprimir primero las piezas de prueba (≈20 min) y después los tableros (≈3-4 h).
- Si la canica no pasa bien por el pasillo de 22 mm, ajustar la cuadrícula o conseguir canicas más pequeñas.
- `millis()` cuenta los milisegundos desde que se encendió el Arduino; restar `inicio` da el tiempo de juego.
- g3-p1: `record` en 0 significa "todavía no hay récord".
- Tiempo total: 15 + 30 + 15 + 30 + 10 + 5 + 15 = 120 minutos.
:::
