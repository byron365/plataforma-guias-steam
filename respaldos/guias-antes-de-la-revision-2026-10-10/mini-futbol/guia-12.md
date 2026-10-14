---
titulo: Sensores que cuentan
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · Sensores que cuentan

## Objetivo del día

Investigar dónde se usan sensores para contar cosas y convertir nuestro marcador en un **contador de personas** para la puerta del salón.

**Al terminar tendremos:** un contador de entradas y salidas funcionando en la puerta del salón.

## Materiales del equipo

- Marcador (Arduino, 2 sensores IR, OLED, buzzer)
- Cinta, cables largos
- Computadora con internet y Arduino IDE

## Parte 1 · Investigación (25 min)

:::tabla id="g12-investigacion"
| Lugar | ¿Qué cuentan o detectan? | ¿Para qué les sirve? |
| --- | --- | --- |
| Supermercado o centro comercial | | |
| Fábrica (banda transportadora) | | |
| Parqueo | | |
| Estadio de fútbol (tecnología de gol) | | |
| Puertas automáticas | | |
:::

:::pregunta id="g12-p1"
En el fútbol profesional existe la "tecnología de línea de gol". ¿Cómo funciona?
:::

## Parte 2 · ¿Entró o salió? (15 min)

Con **dos sensores** en la puerta, uno afuera (A) y otro adentro (B), sabemos la dirección:

| Se activa primero | Después | Significa |
| --- | --- | --- |
| A (afuera) | B (adentro) | Alguien **entró** |
| B (adentro) | A (afuera) | Alguien **salió** |

:::animacion tipo="contador-personas"
:::

## Parte 3 · El contador de personas (50 min)

1. Pega los dos sensores en el marco de la puerta a la altura de la cintura, separados **10 cm**: A del lado del pasillo, B del lado del salón.
2. A → D3, B → D4 (igual que las porterías).
3. Sube este código:

```cpp
#include <Wire.h>
#include <Adafruit_SSD1306.h>

const int SENSOR_A = 3;   // afuera
const int SENSOR_B = 4;   // adentro
const int BUZZER = 5;

Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);
int adentro = 0, entradas = 0;

void setup() {
  pinMode(SENSOR_A, INPUT);
  pinMode(SENSOR_B, INPUT);
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
  mostrar();
}

void mostrar() {
  pantalla.clearDisplay();
  pantalla.setTextSize(1);
  pantalla.setCursor(0, 0);
  pantalla.print("Personas adentro:");
  pantalla.setTextSize(3);
  pantalla.setCursor(45, 20);
  pantalla.print(adentro);
  pantalla.setTextSize(1);
  pantalla.setCursor(0, 56);
  pantalla.print("Entradas hoy: ");
  pantalla.print(entradas);
  pantalla.display();
}

// Espera hasta 1 segundo a que se active el otro sensor
bool esperar(int pin) {
  unsigned long t = millis();
  while (millis() - t < 1000) {
    if (digitalRead(pin) == LOW) return true;
  }
  return false;
}

void loop() {
  if (digitalRead(SENSOR_A) == LOW && esperar(SENSOR_B)) {
    adentro++;
    entradas++;
    tone(BUZZER, 1500, 100);
    mostrar();
    delay(800);
  }
  if (digitalRead(SENSOR_B) == LOW && esperar(SENSOR_A)) {
    if (adentro > 0) adentro--;
    tone(BUZZER, 800, 100);
    mostrar();
    delay(800);
  }
}
```

[IMAGEN 12.1: dos sensores infrarrojos pegados en el marco de la puerta con el contador OLED mostrando las personas adentro]

4. Pruébalo: pasen uno por uno, entrando y saliendo.

:::tabla id="g12-prueba"
| Prueba | Personas reales adentro | Lo que marca el contador | ¿Acertó? |
| --- | --- | --- | --- |
| Entra 1 | 1 | | |
| Entran 2 más | 3 | | |
| Sale 1 | 2 | | |
| Entran 2 juntos | 4 | | |
| Salen todos | 0 | | |
:::

:::pregunta id="g12-p2"
¿En qué prueba falló el contador? ¿Por qué crees que pasó?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Completamos la investigación.
- [ ] Instalamos los sensores en la puerta.
- [ ] El contador distingue entradas y salidas.
- [ ] Hicimos la tabla de pruebas.
:::

## Reto extra

Agrega un **límite de aforo**: si hay más de 10 personas adentro, el buzzer suena y la pantalla dice "LLENO".

## Bitácora (15 min)

:::pregunta id="g12-b1"
¿Qué cambió del código del marcador al del contador, y qué se mantuvo igual?
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g12-p1: usa cámaras de alta velocidad o un campo magnético con un chip en el balón; avisa al árbitro en su reloj en menos de un segundo.
- Dos personas pasando juntas o muy pegadas cuentan como una: es la limitación más importante, conviene discutirla.
- Si los sensores detectan la pared del frente, bajar su sensibilidad.
- Al terminar, los equipos regresan los sensores a las porterías.
- Tiempo total: 25 + 15 + 50 + 5 + 15 = 110 minutos (10 de margen para instalar en la puerta).
:::
