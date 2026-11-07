---
titulo: Simulamos los goles
guia: 4
sabado: 4
sesion: Simulación (1)
duracion: 120
---

# Guía 4 · Simulamos los goles

## Objetivo del día

Armar en **Wokwi** el circuito completo del marcador (botón de inicio, dos "sensores", buzzer y pantalla) y programar la primera parte del juego: contar los goles de cada equipo y celebrarlos.

**Al terminar tendremos:** el marcador simulado sumando los goles de cada portería en la pantalla, con el silbato de inicio y el sonido de gol.

## Materiales del equipo

- Computadora con internet y la cuenta de Wokwi del equipo
- El enlace del proyecto de Wokwi de la Guía 1 (está en su bitácora)
- Bitácora y lápiz

Mientras simulamos (sábados 4, 5 y 6), se imprimen la portería y el soporte del marcador que diseñaron en las guías 2 y 3.

## Parte 1 · El sensor de la portería (15 min)

El sensor infrarrojo tiene dos "ojitos": uno **emite** luz infrarroja (invisible) y otro la **recibe**. Si la pelota pasa frente a él, la luz rebota, el receptor la ve y el sensor pone su salida en **LOW**. Su LED se enciende.

Acerquen la pelota en la animación y miren qué pasa con la salida del sensor:

:::animacion tipo="ir" objeto="Pelota" pin="D3"
:::

En Wokwi no hay sensor infrarrojo de obstáculos, así que usamos **botones** que funcionan igual: con `INPUT_PULLUP`, el botón suelto da **HIGH** y presionado da **LOW**, como el sensor cuando ve la pelota.

:::pregunta id="g4p-p1"
En el simulador, ¿qué hacemos con el mouse para "meter un gol" en la portería azul?
:::

## Parte 2 · El circuito completo en Wokwi (35 min)

1. Abran el proyecto de la Guía 1: con el enlace de su bitácora, o en **wokwi.com** → **My Projects** con la sesión iniciada. Ya tiene la pantalla y el botón de D3.
2. Agreguen con el **+**: dos *Pushbutton* más y un *Buzzer*.
   - Para cada botón: una pata de un lado → su pin; una pata del otro lado → GND (las patas del mismo lado están unidas por dentro).
   - **Buzzer:** el pin **2** es el +, el pin **1** es el −.
   - Al pasar el mouse sobre un pin aparece su nombre.
3. Para no confundirse, acomoden los botones: el de inicio en medio, el de la portería azul a la izquierda y el de la roja a la derecha.

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

## Parte 3 · Contar los goles (40 min)

En `sketch.ino`, borren el código de la Guía 1 y escriban este programa. Las librerías de la pantalla ya están de la Guía 1.

```cpp
#include <Wire.h>
#include <Adafruit_SSD1306.h>

// --- Pines ---
const int BOTON = 2;
const int SENSOR_AZUL = 3;  // portería azul
const int SENSOR_ROJO = 4;  // portería roja
const int BUZZER = 5;

Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);
int golesAzul = 0, golesRojo = 0;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(SENSOR_AZUL, INPUT_PULLUP);   // en el real: INPUT
  pinMode(SENSOR_ROJO, INPUT_PULLUP);   // en el real: INPUT
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
}

void loop() {
  // 1. Botón de inicio: marcador en cero y silbato
  if (digitalRead(BOTON) == LOW) {
    golesAzul = 0;
    golesRojo = 0;
    tone(BUZZER, 2000, 600);  // silbato
    delay(500);
  }

  // 2. ¿Gol? (LOW = pelota en el sensor)
  if (digitalRead(SENSOR_AZUL) == LOW) {
    golesRojo++;              // entró en la portería azul
    tone(BUZZER, 1500, 400);
    delay(500);               // espera para no contar doble
  }
  if (digitalRead(SENSOR_ROJO) == LOW) {
    golesAzul++;              // entró en la portería roja
    tone(BUZZER, 1500, 400);
    delay(500);
  }

  // 3. El marcador en la pantalla
  pantalla.clearDisplay();
  pantalla.setTextSize(1);
  pantalla.setCursor(0, 0);
  pantalla.print("AZUL            ROJO");
  pantalla.setTextSize(3);
  pantalla.setCursor(10, 22);
  pantalla.print(golesAzul);
  pantalla.print(" - ");
  pantalla.print(golesRojo);
  pantalla.display();
}
```

Presionen **Play**. Si sale un error en rojo, lean la línea que indica: casi siempre falta un `;` o una llave.

:::tabla id="g4p-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| La pantalla muestra AZUL 0 - 0 ROJO | | |
| El botón de inicio hace sonar el silbato y pone 0 - 0 | | |
| El botón azul suma un gol al ROJO | | |
| El botón rojo suma un gol al AZUL | | |
| Cada gol suena | | |
:::

:::pregunta id="g4p-p2"
Si la pelota entra en la portería **azul**, ¿qué equipo anotó el gol? Busquen en el `loop` la línea que lo decide.
:::

Las líneas `const int …` del principio son **constantes**: números con nombre. Si un sensor cambia de pin, solo se cambia en un lugar.

## Parte 4 · Guardar (10 min)

1. Presionen **Save**.
2. Copien la dirección de la barra del navegador y péguenla abajo: la usarán los próximos sábados.

:::pregunta id="g4p-enlace"
Enlace de nuestro proyecto de Wokwi:
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] El circuito completo está armado en Wokwi.
- [ ] Cada portería suma el gol al equipo correcto.
- [ ] Suenan el silbato y el gol.
- [ ] Guardamos el proyecto.
:::

## Reto extra

Cambia los sonidos de la celebración: que cada equipo tenga **su propio sonido** de gol.

Pista: cada gol tiene su propia línea `tone(BUZZER, 1500, 400);`. Cambien el primer número (la nota) en una de las dos.

## Bitácora (15 min)

:::foto id="g4p-foto"
Captura de pantalla del circuito simulado (tecla **Impr Pant** o la herramienta Recortes de Windows).
:::

:::pregunta id="g4p-b1"
¿Para qué sirve simular el marcador antes de armarlo con los sensores de verdad?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** si quieren, descarguen el proyecto de Wokwi (menú de la flecha junto a **Save** → **Download project zip**) y súbanlo aquí, o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (9 sábados), nueva el 31 de octubre:** guías 1 a 3 iguales a la versión Tinkercad (marcador básico en Wokwi, portería y soporte del marcador en Tinkercad Codeblocks); 4, 5 y 6 simulan todo el marcador por partes en **Wokwi** (goles, tiempo del partido, antirrebote y estadísticas); 7 revisa las piezas impresas y arma la cancha; 8 instala los sensores y arma el marcador real, y 9 es la prueba de 20 goles, las reglas y el torneo (decisión de Bairon). Campos propios (g4p-…).
- Imprimir esta semana y la siguiente las dos porterías (azul y roja) y el soporte del marcador. Tener los componentes de la lista para el sábado 8.
- En Wokwi no hay sensor infrarrojo de obstáculos: se usan botones con `INPUT_PULLUP` (presionado = LOW, como el sensor que ve la pelota). En el marcador real los sensores van con `INPUT` (Guía 8).
- Hoy el `delay(500)` evita contar un gol varias veces; en la Guía 6 se cambia por el antirrebote con `millis()`.
- g4p-p1: hacer clic en el botón de D3 (el "sensor de la portería azul").
- g4p-p2: gol del equipo ROJO, porque la portería azul la defiende el equipo azul (línea `golesRojo++;` dentro del `if` del SENSOR_AZUL).
- Tiempo total: 15 + 35 + 40 + 10 + 5 + 15 = 120 minutos.
:::
