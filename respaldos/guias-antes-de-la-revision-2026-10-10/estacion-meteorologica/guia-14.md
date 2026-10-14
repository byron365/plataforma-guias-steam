---
titulo: La estación se conecta
guia: 14
sabado: 14
sesion: Proyección a Básico III
duracion: 120
---

# Guía 14 · La estación se conecta

## Objetivo del día

Ver cómo una estación puede enviar sus datos por internet (lo que aprenderemos más adelante) y diseñar la idea de nuestra estación 2.0.

**Al terminar tendremos:** una simulación de estación con WiFi y el plan de la estación 2.0 del equipo.

## Materiales del equipo

- Computadora con internet y cuenta de Wokwi
- Estación del equipo (para la exposición final)

## Parte 1 · ¿Y si los datos viajaran? (15 min)

Hasta ahora los datos llegan a la computadora por el cable USB. Las estaciones reales envían sus datos por **WiFi** a internet, y cualquiera puede verlos desde el celular.

Para eso se usan placas como el **ESP32**: parecida al Arduino, pero con WiFi incluido.

:::animacion tipo="wifi-datos"
:::

:::pregunta id="g14-p1"
¿Qué ventajas tendría ver los datos de la estación desde el celular?
:::

## Parte 2 · Demostración: estación WiFi en Wokwi (35 min)

1. En Wokwi crea un proyecto nuevo con **ESP32**.
2. Agrega un **DHT22**: VCC → 3V3, SDA → pin 15, GND → GND.
3. Copia este código (el docente explicará cada parte):

```cpp
#include <WiFi.h>
#include <DHT.h>

DHT dht(15, DHT22);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin("Wokwi-GUEST", "");     // red WiFi del simulador
  Serial.print("Conectando");
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }
  Serial.println(" listo!");
  Serial.print("Mi direccion: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  float temp = dht.readTemperature();
  Serial.print("Enviando temperatura: ");
  Serial.println(temp);
  delay(2000);
}
```

4. Presiona **Play** y observa cómo se conecta a la red.

[IMAGEN 14.1: simulación en Wokwi de un ESP32 con DHT22 conectándose a la red Wokwi-GUEST]

:::pregunta id="g14-p2"
Compara este código con el de nuestra estación. ¿Qué partes son iguales y cuáles son nuevas?
:::

## Parte 3 · Nuestra estación 2.0 (35 min)

Diseñen la estación del futuro. Elijan qué agregarían:

:::checklist id="g14-ideas"
- [ ] Datos por WiFi al celular
- [ ] Sensor de lluvia
- [ ] Anemómetro (velocidad del viento) impreso en 3D
- [ ] Sensor de presión atmosférica (BMP280)
- [ ] Panel solar para no usar cable
- [ ] Gemelo digital que cambie solo con los datos en vivo
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre de la estación 2.0 | |
| Sensores nuevos | |
| ¿Cómo se verían los datos? | |
| ¿Cómo sería la carcasa? | |
| ¿Qué necesitamos aprender? | |
:::

:::foto id="g14-boceto"
Foto del boceto de la estación 2.0.
:::

## Parte 4 · Exposición final y despedida (20 min)

Todas las estaciones se colocan juntas, encendidas, como una **red de estaciones**. Recorran las mesas y comparen las temperaturas que marca cada una.

:::tabla id="g14-red"
| Equipo | Temperatura | Humedad | Color del LED |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
:::

[IMAGEN 14.2: todas las estaciones de los equipos juntas formando una red de estaciones en el salón]

:::pregunta id="g14-p3"
¿Todas las estaciones marcan lo mismo? ¿Por qué podría haber diferencias?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Simulamos la estación WiFi con ESP32.
- [ ] Diseñamos la estación 2.0.
- [ ] Participamos en la red de estaciones.
:::

## Reto extra

Investiga qué es **ThingSpeak** o **Adafruit IO** y cómo se usan para graficar datos en internet.

## Bitácora (10 min)

:::pregunta id="g14-b1" individual="si"
¿Qué es lo que más quiero aprender en el siguiente nivel?
:::

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- El ESP32 funciona a 3,3 V: recordar que no se conecta igual que el UNO (por eso VCC va a 3V3).
- En Wokwi el ESP32 tarda en compilar; arrancar la simulación al inicio de la Parte 2.
- Avanzado (solo demostración del docente): enviar el dato a ThingSpeak con HTTPClient.
- En la red de estaciones, las diferencias deben ser pequeñas si todas están calibradas: buena forma de cerrar el tema de calibración.
- Tiempo total: 15 + 35 + 35 + 20 + 5 + 10 = 120 minutos.
:::
