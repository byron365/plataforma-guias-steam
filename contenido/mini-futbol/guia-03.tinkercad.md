---
titulo: El marcador completo en el simulador
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · El marcador completo en el simulador

## Objetivo del día

Planificar el programa del marcador con pseudocódigo y diagrama de flujo, simularlo completo en Wokwi y exportar las porterías.

**Al terminar tendremos:** el marcador completo (dos sensores, tiempo, pantalla y sonidos) funcionando en el simulador y las porterías listas para imprimir.

## Materiales del equipo

- Computadora con internet, la cuenta de Tinkercad y el proyecto de Wokwi del sábado 1

## Parte 1 · Pseudocódigo (15 min)

El **pseudocódigo** es el programa escrito en palabras, paso a paso. Completen los espacios pensando en cómo es un partido de verdad: cómo empieza, qué pasa con cada gol y cómo termina.

:::tabla id="g3-pseudo"
| Paso | ¿Qué hace el marcador? |
| --- | --- |
| 1 | Mostrar el marcador 0 - 0 y esperar el botón |
| 2 | Al presionar el botón → poner los goles en 0, empezar el tiempo y sonar el ______ |
| 3 | Si el sensor de la portería azul detecta la pelota → gol del equipo ______ |
| 4 | Si el sensor de la portería roja detecta la pelota → gol del equipo ______ |
| 5 | Mostrar el marcador y el ______ que queda |
| 6 | Si se acabó el tiempo → ______ |
:::

:::animacion tipo="diagrama-flujo" programa="futbol" ocultar="si"
:::

:::pregunta id="g3-p1"
Si la pelota entra en la portería **azul**, ¿qué equipo anotó el gol? ¿Por qué?
:::

## Parte 2 · El circuito completo en Wokwi (25 min)

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

## Parte 3 · El código base (35 min)

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

| Prueba | ¿Funciona? |
| --- | --- |
| El botón de inicio hace sonar el silbato | |
| El botón azul suma gol al ROJO | |
| El botón rojo suma gol al AZUL | |
| La pantalla dice "GOL!" y el equipo | |
| El tiempo baja | |
| Al acabar el tiempo suena el final | |

Para probarlo: cambien el número de `DURACION`, presionen Play otra vez y empiecen un partido.

:::pregunta id="g3-p2"
Cambia `DURACION` para que el partido dure 30 segundos. ¿Qué número escribiste?
:::

## Parte 4 · Exportar las porterías (15 min)

1. Abre en Tinkercad el diseño **equipo_NOMBRE_porteria** (**Diseños → Codeblocks**).
   - En cualquier computadora sirve: entren con la misma cuenta de Tinkercad.
2. Ejecuta con **▷** y revisa que se vea la portería **completa** (las dos mitades) con la ventana del fondo abierta.
   - Si sale solo la mitad, revisa los bloques **Copiar**, **Escala** (X = −1) y **Mover** (X −52.5) de la Guía 2.
3. Exporta como **equipo_NOMBRE_porteria.stl** (se imprimen dos: una azul y una roja).
   - Arriba a la derecha, **Compartir** → en **Descargar un archivo**, toca **.STL**. El archivo queda en **Descargas**.
   - Si no se llama `equipo_NOMBRE_porteria.stl`, cámbiale el nombre: clic derecho → **Cambiar nombre**.

## Parte 5 · Cronograma (10 min)

Escriban un responsable principal para cada meta (el que se asegura de que se cumpla; el equipo ayuda).

:::tabla id="g3-cronograma"
| Sábado | Meta | Responsable principal |
| --- | --- | --- |
| 4 | Cancha, porterías y escaneo 3D | |
| 5 | Sensores reales y marcador | |
| 6 | Antirrebote, calibración y partido completo | |
| 7 | Partidos de prueba y ficha técnica | |
| 8 | Tabla de posiciones y presentación | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos el pseudocódigo.
- [ ] El marcador completo funciona en Wokwi.
- [ ] Probamos todas las partes del juego.
- [ ] Exportamos la portería en STL.
- [ ] Tenemos cronograma.
:::

## Reto extra

Haz que la pantalla diga **"FIN"** y el ganador (o "EMPATE") cuando se acaba el tiempo.

Pista: en el bloque del fin del partido, antes del `return;`, comparen `golesAzul` con `golesRojo` (con `if`, `else if` y `else`) y escriban en la pantalla el mensaje que toque.

## Bitácora (15 min)

:::pregunta id="g3-b1"
¿Qué hace la función `gol()` y por qué la usamos dos veces?
:::

Antes de irse, suban juntos en un `.zip` el `.stl` y el proyecto de Wokwi descargado (menú de la flecha junto a **Save** → **Download project zip**). Para el `.zip`: selecciónenlos → clic derecho → **Comprimir en archivo ZIP**.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban el .stl de la portería, su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g3-p1: gol del equipo ROJO, porque la portería azul la defiende el equipo azul.
- g3-p2: 30000.
- `int &goles` (por referencia) permite que la función cambie la variable original; explicarlo como "le damos la caja, no una copia".
- Durante la semana: imprimir dos porterías por equipo (≈1,5 h cada una), de preferencia en colores azul y rojo.
- Tiempo total: 15 + 25 + 35 + 15 + 10 + 5 + 15 = 120 minutos.
:::
