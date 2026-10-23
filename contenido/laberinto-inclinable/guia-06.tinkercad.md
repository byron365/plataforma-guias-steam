---
titulo: Movimiento suave y una meta que avisa
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · Movimiento suave y una meta que avisa

## Objetivo del día

Hacer que el tablero se mueva suave, instalar el sensor infrarrojo en la meta y cargar el juego completo con pantalla, buzzer y cronómetro.

**Al terminar tendremos:** el juego completo funcionando en el laberinto real.

## Materiales del equipo

- Laberinto armado (sábado 5)
- Sensor infrarrojo de obstáculos (FC-51 o similar)
- Pantalla OLED SSD1306
- Buzzer
- Cables, cinta doble cara, pegamento caliente
- Piezas impresas: soporte del sensor, soporte de la pantalla y base del joystick (Guía 5)

## Parte 1 · ¿Por qué tiembla? (10 min)

Si el servo va **directo** a donde marca el joystick, el tablero da saltos y la canica sale disparada. La solución es **suavizar**: en cada vuelta del `loop` el servo solo avanza una parte del camino.

```cpp
angX += (metaX - angX) * SUAVE;
```

Si `SUAVE` es 0,2, en cada vuelta avanza el **20 %** de lo que le falta.

`angX += algo` significa "a `angX` súmale `algo`". Y `(metaX - angX)` es lo que le falta para llegar.

Cambien SUAVE en la animación y miren cómo llega el servo a su meta:

:::animacion tipo="suavizado"
:::

:::pregunta id="g6-p1"
Si el servo está en 90° y la meta es 100°, con SUAVE = 0,2, ¿en qué ángulo queda después de una vuelta? ¿Y después de dos?
:::

## Parte 2 · Probar el suavizado (20 min)

Usa el código de prueba del sábado 4 con estos cambios: declara `float angX = 90, angY = 90;` arriba y dentro del `loop`:

1. Abran su programa de prueba (`equipo_NOMBRE_prueba_servos`, el de la Guía 4 con su inclinación de la Guía 5) y guárdenlo como `equipo_NOMBRE_suave`.
2. **Arriba**, debajo de `const int INCLINACION = …;`, escriban dos líneas nuevas: `const float SUAVE = 0.2;` y `float angX = 90, angY = 90;`. (Sin la primera, el programa no sabe qué es `SUAVE` y da error.)
3. **En el `loop()`**, borren las cuatro primeras líneas (las dos `int angX = map(…)` / `int angY = map(…)` y los dos `write`) y escriban en su lugar las seis de abajo. Las líneas `Serial.print` se quedan.
4. Si en la Guía 5 invirtieron un eje, inviertan igual los números en su `map` nuevo.

```cpp
int metaX = map(analogRead(A0), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
int metaY = map(analogRead(A1), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
angX += (metaX - angX) * SUAVE;
angY += (metaY - angY) * SUAVE;
servoX.write(angX);
servoY.write(angY);
```

5. Para cada fila, cambien el número de `const float SUAVE = 0.2;`, suban el código, pongan las pilas y jueguen una vez (cronómetro del celular).

:::tabla id="g6-suave"
| SUAVE | ¿Cómo se siente el control? | Tiempo a la meta (s) |
| --- | --- | --- |
| 1.0 (sin suavizar) | | |
| 0.5 | | |
| 0.2 | | |
| 0.05 | | |
:::

Nuestro valor de SUAVE: ______

## Parte 3 · El sensor de la meta (25 min)

El sensor infrarrojo emite una luz invisible. Si algo está cerca, la luz rebota y el sensor pone su salida en **LOW**.

Acerquen la canica en la animación y miren qué pasa con la salida del sensor:

:::animacion tipo="ir" objeto="Canica" pin="D3"
:::

1. Pega el **soporte del sensor** debajo del tablero, con su hueco justo debajo del agujero de la meta. Mete el sensor y conéctalo.
   - Para centrarlo: miren hacia la luz por el agujero de la meta y muevan el soporte hasta ver el hueco completo. Péguenlo con pegamento caliente por los bordes de la tapa.
   - Metan el sensor por abajo, **parado y con los dos "ojitos" hacia arriba** (uno claro y uno oscuro), hasta que toquen el tablero. El tornillo azul queda afuera del tubo.
   - Dejen los cables con un poco de holgura para que no frenen el tablero cuando se inclina.
2. Conecta: **VCC → 5V**, **GND → GND**, **OUT → D3**.
   - Con el USB desconectado. VCC y GND a las filas del **Arduino** (las de abajo), no a las de las pilas.
3. Pon la canica sobre el agujero y gira el **tornillo azul** (potenciómetro) del sensor hasta que su LED se encienda solo con la canica encima.
   - Conecten el USB (el sensor necesita energía). Giren el tornillo con un destornillador pequeño, poco a poco.

[IMAGEN 6.1T: sensor infrarrojo parado en su soporte impreso, pegado debajo del tablero bajo el agujero de la meta]

| Prueba | LED del sensor |
| --- | --- |
| Sin canica | |
| Canica sobre el agujero | |
| Canica a una casilla de distancia | |

## Parte 4 · Juego completo (35 min)

1. Monta la pantalla y el buzzer en su soporte, el joystick en su base, y conecta la pantalla OLED (SDA → A4, SCL → A5) y el buzzer (+ → D5).
   - **Soporte de la pantalla:** la pantalla va por detrás, con su vidrio tapando la ventana (cinta doble cara solo en la placa, no en el vidrio). El buzzer entra por detrás en su agujero. Pongan el soporte al lado del laberinto, mirando hacia los jugadores.
   - **Base del joystick:** encajen el joystick en el cerco, con los pines del lado de la abertura.
   - Con el USB desconectado. **OLED:** lean el orden de sus pines (algunas traen GND primero): VCC → fila **+** del Arduino, GND → fila **−**, SDA → **A4**, SCL → **A5**.
   - **Buzzer:** pata **+** (marcada o la más larga) → **D5**; la otra → fila **−**.
2. Carga el código del juego completo.
   - Instalen las librerías **Adafruit SSD1306** y **Adafruit GFX Library** en el **Gestor de bibliotecas** (icono de los libros a la izquierda; si pregunta por otras, **Instalar todo**).
   - **Archivo → Nuevo boceto**, borren lo que trae y escriban (o peguen) el código de abajo con cuidado. Guárdenlo como `equipo_NOMBRE_juego`.
   - El programa espera el botón del joystick, cuenta el tiempo con `millis()`, mueve el tablero con el suavizado de la Parte 2 y, cuando el sensor ve la canica, suena el buzzer y muestra el tiempo (o "RECORD!").

```cpp
#include <Servo.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>

// --- Pines ---
const int JOY_X = A0;
const int JOY_Y = A1;
const int BOTON = 2;   // botón del joystick
const int META = 3;    // sensor infrarrojo de la meta
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
  pinMode(META, INPUT);   // el sensor real ya tiene su resistencia
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
3. Ajusta `INCLINACION` y `SUAVE` con tus valores.
   - Están en **Ajustes del equipo**. Si invirtieron un eje en la Guía 5, inviertan también los números de su `map` en este código.
   - Verifiquen (✓), suban (→) y pongan las pilas.

[IMAGEN 6.2: laberinto completo con la pantalla OLED mostrando el tiempo y el joystick al lado]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones" circuito="laberinto-real"
:::

Jueguen 3 partidas:

Para empezar: presionen el botón del joystick (hundan la palanca). El tiempo corre hasta que la canica llega al agujero de la meta.

| Partida | Jugador | Tiempo (s) | ¿Funcionó el sensor? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] El tablero se mueve suave.
- [ ] El sensor detecta la canica en la meta.
- [ ] La pantalla muestra el cronómetro.
- [ ] El buzzer suena al empezar y al llegar.
- [ ] Jugamos 3 partidas completas.
:::

## Reto extra

Cuando la canica llega a la meta, haz que el buzzer toque una **melodía de victoria** de tres notas (por ejemplo 1000, 1300 y 1600 Hz).

Pista: dentro del bloque de la meta, cambien el `tone(BUZZER, 1500, 800);` por tres `tone` cortos, cada uno seguido de un `delay` un poco más largo que la nota.

## Bitácora (15 min)

:::foto id="g6-foto"
Video de una partida completa.
:::

:::pregunta id="g6-b1"
¿Qué diferencia notaron entre el control sin suavizar y con suavizado?
:::

Antes de irse: saquen las pilas y suban `equipo_NOMBRE_juego` aquí. Es el programa del juego de aquí en adelante.

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g6-p1: 90 + (100 − 90) × 0,2 = 92°; luego 92 + 8 × 0,2 = 93,6°.
- `angX` debe ser `float`; si es `int`, con SUAVE pequeño nunca llega (se trunca a 0 el avance).
- Si el sensor detecta la luz del salón, cubrirlo con un tubito de cartón negro.
- Si el sensor dispara sin canica, alejarlo un poco del agujero o bajar su sensibilidad.
- **Versión Tinkercad (21 de octubre):** igual que la normal, pero con las piezas impresas de la Guía 5T (soporte del sensor, soporte de la pantalla y base del joystick) y con el código del juego escrito aquí, porque en esta versión no se hace el juego en Wokwi de la Guía 3. Ya trae `pinMode(META, INPUT)` para el sensor real. Mismos campos que la normal.
- Tiempo total: 10 + 20 + 25 + 35 + 5 + 15 = 110 minutos (10 de margen).
:::
