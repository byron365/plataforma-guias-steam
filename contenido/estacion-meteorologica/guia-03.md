---
titulo: Pensar antes de programar
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · Pensar antes de programar

## Objetivo del día

Planificar el programa con variables, pseudocódigo y diagrama de flujo, y simular el circuito completo de la estación en Wokwi.

**Al terminar tendremos:** la estación completa funcionando en el simulador (sensores, pantalla y LED de colores) y un cronograma del equipo.

## Materiales del equipo

- Computadora con internet y el proyecto de Wokwi del sábado 1
- Bitácora

## Parte 1 · Variables y tipos de datos (15 min)

Una **variable** es una caja con nombre donde el Arduino guarda un dato. Cada caja tiene un **tipo**:

| Tipo | Guarda | Ejemplo en la estación |
| --- | --- | --- |
| `int` | Números enteros | `int luz = 75;` |
| `float` | Números con decimales | `float temp = 24.6;` |
| `const` | Un valor que no cambia | `const float CALOR = 28.0;` |
| `bool` | Verdadero o falso | `bool alerta = true;` |

Fíjense en el ejemplo: `int luz = 75;` se lee "crear una caja de tipo entero llamada luz y guardar en ella 75".

:::pregunta id="g3-p1"
¿Qué tipo usarías para guardar la humedad (por ejemplo 63,5 %)? ¿Y para guardar el número de un pin?
:::

## Parte 2 · Pseudocódigo y diagrama de flujo (20 min)

El **pseudocódigo** es el programa escrito en español, paso a paso. Complétalo en equipo:

- Los pasos 2 y 6 están vacíos: escriban qué más lee la estación y qué hace con los datos (piensen en la pantalla).
- En los pasos 3 a 5 escriban el color del LED para cada caso.

:::tabla id="g3-pseudo"
| Paso | ¿Qué hace la estación? |
| --- | --- |
| 1 | Leer la temperatura y la humedad |
| 2 | |
| 3 | Si la temperatura es menor que FRÍO → LED ______ |
| 4 | Si la temperatura es mayor que CALOR → LED ______ |
| 5 | Si no → LED ______ |
| 6 | |
| 7 | Esperar 2 segundos y volver al paso 1 |
:::

Así se ve como diagrama de flujo:

:::animacion tipo="diagrama-flujo" programa="estacion" ocultar="si"
:::

## Parte 3 · El circuito completo en Wokwi (35 min)

Abre tu proyecto del sábado 1 y agrega los nuevos componentes:

- Usen el enlace que guardaron en la bitácora de la Guía 1 (o, con la sesión iniciada en Wokwi, **My Projects**).
- Agreguen con el botón **+**: *Photoresistor sensor*, *SSD1306 OLED*, *RGB LED* y tres *Resistor*.
- Para cambiar el valor de una resistencia: haz clic en ella y escribe **220** en su valor.
- Para hacer un cable: clic en la punta de un pin y clic en el destino. Al pasar el mouse sobre un pin aparece su nombre.

| Componente | Conexión |
| --- | --- |
| DHT22 | VCC → 5V · SDA → D2 · GND → GND |
| Sensor de luz (Photoresistor sensor) | VCC → 5V · GND → GND · AO → A0 |
| Pantalla OLED SSD1306 | VCC → 5V · GND → GND · SDA → A4 · SCL → A5 |
| LED RGB (cátodo común) | R → D9 · G → D10 · B → D11 (cada uno con resistencia de 220 Ω) · COM → GND |

- **LED RGB:** cada color pasa por su resistencia: pin D9 → resistencia → pata **R**; D10 → resistencia → **G**; D11 → resistencia → **B**. La pata **COM** (común) va a GND.
- El sensor de luz tiene también un pin **DO**: no se conecta.

[IMAGEN 3.1: circuito completo en Wokwi con DHT22, sensor de luz, pantalla OLED y LED RGB]

Toquen cada cable de la animación para comparar con su circuito:

:::animacion tipo="conexiones" circuito="estacion"
:::

En **Library Manager** agrega también **Adafruit SSD1306** y **Adafruit GFX Library**. Luego copia el código base:

- Pestaña **Library Manager** → **+** → busquen cada una y elíjanla. La *DHT sensor library* ya debe estar del sábado 1.
- En `sketch.ino`, borren el código del sábado 1 y escriban (o peguen) este programa completo:

```cpp
#include <Wire.h>
#include <DHT.h>
#include <Adafruit_SSD1306.h>

// --- Pines ---
const int PIN_DHT = 2;
const int PIN_LUZ = A0;
const int LED_R = 9;
const int LED_G = 10;
const int LED_B = 11;

// --- Ajustes del equipo ---
const float FRIO = 20.0;   // °C
const float CALOR = 28.0;  // °C
const int ESPERA = 2000;   // ms

DHT dht(PIN_DHT, DHT22);
Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);

void setup() {
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_B, OUTPUT);
  dht.begin();
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
  Serial.begin(9600);
}

// Enciende el LED RGB con un color
void ponerColor(int r, int g, int b) {
  analogWrite(LED_R, r);
  analogWrite(LED_G, g);
  analogWrite(LED_B, b);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int luz = map(analogRead(PIN_LUZ), 0, 1023, 0, 100);

  if (isnan(temp) || isnan(hum)) {
    Serial.println("Error del sensor");
    delay(ESPERA);
    return;
  }

  if (temp < FRIO) {
    ponerColor(0, 0, 255);    // azul
  } else if (temp > CALOR) {
    ponerColor(255, 0, 0);    // rojo
  } else {
    ponerColor(0, 255, 0);    // verde
  }

  pantalla.clearDisplay();
  pantalla.setTextSize(2);
  pantalla.setCursor(0, 0);
  pantalla.print(temp, 1);
  pantalla.println(" C");
  pantalla.setTextSize(1);
  pantalla.print("Humedad: ");
  pantalla.println(hum, 0);
  pantalla.print("Luz: ");
  pantalla.println(luz);
  pantalla.display();

  Serial.print(temp);
  Serial.print(",");
  Serial.print(hum);
  Serial.print(",");
  Serial.println(luz);
  delay(ESPERA);
}
```

Presionen **Play**. Si la pantalla queda negra, revisen los cables SDA (A4) y SCL (A5). Guarden con **Save**.

**¿Cómo hace colores el LED RGB?** Mezcla luz roja, verde y azul. Cada color va de 0 (apagado) a 255 (máximo).

Mezclen colores en la animación moviendo los tres controles:

:::animacion tipo="rgb"
:::

## Parte 4 · Probar la simulación (15 min)

Mueve el control de temperatura del DHT22 y anota:

Con la simulación andando, hagan clic en el DHT22, pongan cada temperatura y esperen 2 segundos a que se actualice.

| Temperatura | Color del LED | ¿Qué muestra la pantalla? |
| --- | --- | --- |
| 15 °C | | |
| 24 °C | | |
| 32 °C | | |

[IMAGEN 3.2: simulación en Wokwi con la pantalla OLED mostrando 32.0 C y el LED en rojo]

:::pregunta id="g3-p2"
¿Qué pasaría si cambias `CALOR` a 25.0? Pruébalo con 26 °C y describe el resultado.
:::

Para probarlo: detengan la simulación, cambien `28.0` por `25.0` en la línea `const float CALOR = 28.0;`, presionen Play y pongan 26 °C. Después regrésenlo a 28.0.

## Parte 5 · Cronograma del equipo (15 min)

Planifiquen qué hará cada rol en los próximos sábados:

Escriban en cada fila quién será el responsable principal (el que se asegura de que se cumpla; el equipo ayuda).

:::tabla id="g3-cronograma"
| Sábado | Meta | Responsable principal |
| --- | --- | --- |
| 4 | Carcasa completa + sensores reales | |
| 5 | Pantalla y LED reales, código completo | |
| 6 | Montaje y calibración | |
| 7 | Registro de datos y gráfica | |
| 8 | Gemelo digital y presentación | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos el pseudocódigo.
- [ ] El circuito completo está en Wokwi.
- [ ] La pantalla muestra temperatura, humedad y luz.
- [ ] El LED cambia de color con la temperatura.
- [ ] Tenemos cronograma.
:::

## Reto extra

Agrega un cuarto color: si la temperatura pasa de **35 °C**, el LED se pone **morado** (rojo + azul). Pista: agrega un `else if` antes del de `CALOR`.

## Bitácora (15 min)

:::pregunta id="g3-b1"
¿Para qué sirve hacer el pseudocódigo antes de programar?
:::

:::pregunta id="g3-b2"
¿Qué significa `const` y por qué lo usamos para FRÍO y CALOR?
:::

Antes de irse, guarden en Wokwi (**Save**) y descarguen el proyecto como `.zip` (menú de la flecha junto a **Save** → **Download project zip**). Súbanlo aquí: el sábado 5 usarán este código en el Arduino real.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- En Wokwi, el LED RGB tiene la propiedad "common" (cátodo/ánodo): debe quedar en cátodo común.
- Si la OLED queda en negro, revisar la dirección 0x3C y los pines A4/A5.
- Reto: `if (temp > 35) ponerColor(255, 0, 255);` debe ir antes de `temp > CALOR`, si no nunca se cumple. Buen momento para hablar del orden de los if.
- Antes del sábado 4: imprimir las torres de platos de cada equipo (archivo del sábado 2) o tenerlas listas para imprimir.
- Tiempo total: 15 + 20 + 35 + 15 + 15 + 5 + 15 = 120 minutos.
:::
