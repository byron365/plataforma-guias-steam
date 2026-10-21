---
titulo: La cancha y el marcador completo
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · La cancha y el marcador completo

## Objetivo del día

Construir la cancha con sus líneas a escala, colocar las porterías y el soporte impresos, y simular en Wokwi el marcador completo: dos sensores, tiempo, pantalla y sonidos.

**Al terminar tendremos:** la cancha armada con sus porterías y el programa del marcador funcionando en el simulador, listo para los sensores reales del sábado 5.

## Materiales del equipo

- Base de cartón grueso, cartón pluma o MDF de 60 × 40 cm
- Fomi o cartulina verde, marcador o cinta blanca
- Tiras de cartón de 3 cm de alto para las bandas laterales
- Las dos porterías y el soporte del marcador impresos
- Regla, compás, tijeras, pegamento caliente, calculadora
- Computadora con internet y el proyecto de Wokwi del sábado 1

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · Las medidas a escala (10 min)

Una cancha profesional mide **105 × 68 m**. Para que quepa en la mesa usamos una **escala 1:200**: cada centímetro de la maqueta representa 200 cm (2 m) de la cancha real. Por eso nuestra cancha mide **52,5 × 34 cm**.

> Medida de la maqueta = Medida real ÷ 200

Calculen las líneas que van a trazar. Pasen los metros a centímetros (× 100) y dividan entre 200. Redondeen a una cifra decimal.

:::tabla id="g4t-escala"
| Parte de la cancha | Medida real | En cm | ÷ 200 = maqueta (cm) |
| --- | --- | --- | --- |
| Largo | 105 m | 10 500 | 52,5 |
| Radio del círculo central | 9,15 m | | |
| Largo del área grande | 40,3 m | | |
| Fondo del área grande | 16,5 m | | |
:::

## Parte 2 · La cancha (35 min)

1. Corta la base y fórrala con el fomi verde.
   - Si es MDF, el docente la corta. Peguen el fomi con pegamento en las orillas y en el centro, alisándolo con la mano para que no queden burbujas.
2. Traza las líneas con las medidas de su tabla:
   - El rectángulo de la cancha, de **52,5 × 34 cm**, va centrado en la base (sobran unos 3,75 cm a cada lado del largo y 3 cm a cada lado del ancho).
   - La línea central y el **círculo central**: abran el compás con el radio de su tabla y pinchen en el centro de la cancha.
   - Las dos **áreas grandes**, una en cada lado corto, centradas: el "largo del área" va a lo ancho de la cancha y el "fondo del área" hacia adentro.
   - Marquen primero a lápiz con la regla; cuando todo esté bien, repasen con marcador o cinta blanca.
3. Pega las **bandas laterales** (tiras de 3 cm) para que la pelota no se salga.
   - Las tiras van paradas sobre las líneas del borde de la cancha.
   - En el centro de cada lado corto dejen un hueco de **10 cm** (el ancho de la portería).
4. Pega las **porterías** en el centro de cada lado corto. La ventana del sensor debe quedar **mirando hacia la cancha**.
   - La boca de cada portería, justo en su hueco de la banda; el fondo, hacia afuera de la cancha.
5. Haz un agujero pequeño detrás de cada portería para pasar los cables.
   - Con la punta de un lápiz o un destornillador (con cuidado), en la base, justo detrás de la ventana del sensor.
6. Pongan el **soporte del marcador** a un lado de la cancha, mirando hacia los jugadores. La pantalla y el buzzer se colocan el sábado 5.

[IMAGEN 2.1T: mini fútbol diseñado en Tinkercad, con etiquetas: portería azul, portería roja, cancha a escala, bandas laterales, pelota, soporte del marcador, Arduino y protoboard con el botón]

:::pregunta id="g4t-p1"
¿Por qué las bandas laterales no deben tapar el hueco de las porterías?
:::

## Parte 3 · El circuito completo en Wokwi (20 min)

En Wokwi no hay sensor infrarrojo de obstáculos, así que usamos **botones** que funcionan igual (dan LOW cuando "detectan").

Abran el proyecto del sábado 1 (con el enlace de su bitácora, o en **My Projects** con la sesión iniciada). Ya tiene la pantalla y el botón de D3. Agreguen con el **+**: dos *Pushbutton* más y un *Buzzer*.

- Para cada botón: una pata de un lado → su pin; una pata del otro lado → GND (las patas del mismo lado están unidas por dentro).
- **Buzzer:** el pin **2** es el +, el pin **1** es el −.
- Al pasar el mouse sobre un pin aparece su nombre.

| Componente | Conexión |
| --- | --- |
| Botón de inicio | D2 y GND |
| Botón "sensor portería azul" | D3 y GND |
| Botón "sensor portería roja" | D4 y GND |
| Buzzer | + → D5 · − → GND |
| OLED SSD1306 | SDA → A4 · SCL → A5 · VCC → 5V · GND → GND |

[IMAGEN 3.1: circuito completo del marcador en Wokwi con tres botones, buzzer y pantalla OLED]

Toquen cada cable de la animación para comparar con su circuito:

:::animacion tipo="conexiones" circuito="futbol"
:::

## Parte 4 · El código base (35 min)

En `sketch.ino`, borren el código del sábado 1 y escriban (o peguen) este programa completo. Las librerías de la pantalla ya están del sábado 1.

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

Presionen **Play** y prueben con los botones: el de D2 empieza el partido; los de D3 y D4 son los "sensores". Guarden con **Save**.

[IMAGEN 3.2: simulación en Wokwi con la pantalla mostrando el marcador 2 - 1 y el tiempo restante]

:::tabla id="g4t-pruebas"
| Prueba | ¿Funciona? |
| --- | --- |
| El botón de inicio hace sonar el silbato | |
| El botón azul suma gol al ROJO | |
| El botón rojo suma gol al AZUL | |
| La pantalla dice "GOL!" y el equipo | |
| El tiempo baja | |
| Al acabar el tiempo suena el final | |
:::

:::pregunta id="g4t-p2"
Si la pelota entra en la portería **azul**, ¿qué equipo anotó el gol? Busquen en el `loop` la línea que lo decide.
:::

Para probar el final sin esperar 3 minutos: cambien el número de `DURACION`, presionen Play otra vez y empiecen un partido.

:::pregunta id="g4t-p3"
Cambia `DURACION` para que el partido dure 30 segundos. ¿Qué número escribiste?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4t-logramos"
- [ ] La cancha tiene sus líneas a escala y sus bandas.
- [ ] Las porterías están pegadas con la ventana del sensor hacia la cancha.
- [ ] El marcador completo funciona en Wokwi.
- [ ] Probamos todas las partes del juego.
:::

## Reto extra

Haz que la pantalla diga **"FIN"** y el ganador (o "EMPATE") cuando se acaba el tiempo.

Pista: en el bloque del fin del partido, antes del `return;`, comparen `golesAzul` con `golesRojo` (con `if`, `else if` y `else`) y escriban en la pantalla el mensaje que toque.

## Bitácora (15 min)

:::foto id="g4t-foto"
Foto de la cancha con las porterías.
:::

:::pregunta id="g4t-b1"
¿Qué hace la función `gol()` y por qué la usamos dos veces?
:::

Antes de irse, descarguen el proyecto de Wokwi (menú de la flecha junto a **Save** → **Download project zip**) y súbanlo aquí.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, nueva el 21 de octubre:** junta la cancha de la Guía 4 normal (sin el escaneo 3D, que queda solo en la versión Blender) con el marcador completo en Wokwi que antes estaba en la Guía 3. La tabla de escala es la de la Guía 2 normal, solo con las líneas que se trazan. Campos propios (g4t-…).
- Resultados de la escala: círculo 4,6 cm; área 20,2 × 8,3 cm.
- g4t-p2: gol del equipo ROJO, porque la portería azul la defiende el equipo azul (línea `gol(golesRojo, "ROJO")`).
- g4t-p3: 30000.
- `int &goles` (por referencia) permite que la función cambie la variable original; explicarlo como "le damos la caja, no una copia".
- Si un equipo va lento, la cancha puede terminarse al inicio del sábado 5: el programa de Wokwi es lo que se necesita para seguir.
- Tiempo total: 10 + 35 + 20 + 35 + 5 + 15 = 120 minutos.
:::
