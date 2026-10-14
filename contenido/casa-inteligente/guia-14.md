---
titulo: La casa en internet
guia: 14
sabado: 14
sesion: Proyección a Intermedio III
duracion: 120
---

# Guía 14 · La casa en internet

## Objetivo del día

Descubrir cómo una casa se controla por WiFi desde cualquier lugar (internet de las cosas) con una simulación en Wokwi, y diseñar la casa 2.0.

**Al terminar tendremos:** un ESP32 simulado sirviendo una página web que enciende una luz, y el plan de la casa 2.0.

## Materiales del equipo

- Computadora con internet y cuenta de Wokwi
- Casa integrada (para la exposición final)

## Parte 1 · Bluetooth o WiFi (15 min)

Completen la tabla con lo que saben (o lo que investiguen) de cada tecnología:

:::tabla id="g14-comparacion"
| | Bluetooth (HC-05) | WiFi (ESP32) |
| --- | --- | --- |
| Alcance | Unos 10 m | Toda la casa, e internet |
| ¿Se controla desde fuera de casa? | | |
| ¿Varios celulares a la vez? | | |
| Consumo | | |
:::

El **internet de las cosas (IoT)** son objetos conectados a internet que envían datos y reciben órdenes desde cualquier lugar.

Miren en la animación cómo viaja una orden desde un celular lejos de la casa:

:::animacion tipo="iot"
:::

## Parte 2 · Una luz controlada desde una página web (50 min)

La página de Wokwi está en inglés; aquí van los nombres de los botones tal como aparecen.

1. En Wokwi crea un proyecto con **ESP32**.
   - En **wokwi.com**, inicien sesión, bajen hasta **Start from Scratch** y elijan **ESP32**.
2. Agrega un **LED** en el pin **2** (con resistencia) a GND.
   - Con el botón **+** agreguen *LED* y *Resistor*. Cables: pin **D2** del ESP32 → resistencia → pata **A** del LED; pata **C** → **GND**.
3. Copia el código:
   - En `sketch.ino`, borren lo que trae y escriban (o peguen) el programa.

```cpp
#include <WiFi.h>
#include <WebServer.h>

WebServer servidor(80);
const int LUZ = 2;

void pagina() {
  String html = "<h1>Casa STEAM</h1>";
  html += "<p><a href='/on'>Encender sala</a></p>";
  html += "<p><a href='/off'>Apagar sala</a></p>";
  servidor.send(200, "text/html", html);
}

void setup() {
  Serial.begin(115200);
  pinMode(LUZ, OUTPUT);
  WiFi.begin("Wokwi-GUEST", "");
  while (WiFi.status() != WL_CONNECTED) delay(200);
  Serial.println(WiFi.localIP());

  servidor.on("/", pagina);
  servidor.on("/on", []() { digitalWrite(LUZ, HIGH); pagina(); });
  servidor.on("/off", []() { digitalWrite(LUZ, LOW); pagina(); });
  servidor.begin();
}

void loop() {
  servidor.handleClient();
}
```

4. Presiona **Play**. Wokwi permite abrir la página del ESP32 con su **IoT Gateway** (sigue las instrucciones del docente) o puedes ver en el monitor la dirección asignada.
   - **Play** es el botón verde ▶. El ESP32 tarda en arrancar; en el Monitor serie aparecerá su dirección (cuatro números separados por puntos).
   - Si el docente les muestra la página, prueben los enlaces **Encender sala** y **Apagar sala** y miren el LED.

[IMAGEN 14.1: simulación en Wokwi de un ESP32 con un LED y la página web con los enlaces para encender y apagar la sala]

:::pregunta id="g14-p1"
En nuestra casa, ¿dónde iría el ESP32: reemplazando a la central, a un nodo o como un nodo más? Explica tu respuesta.
:::

## Parte 3 · La casa 2.0 (40 min) · todo el grupo

Marquen las ideas que el grupo le pondría a la casa 2.0:

:::checklist id="g14-ideas"
- [ ] Control desde internet (fuera de casa)
- [ ] Asistente de voz
- [ ] Medidor de consumo eléctrico con sensor de corriente
- [ ] Nodos inalámbricos (sin cable de bus)
- [ ] Cámara en la entrada
- [ ] Historial de temperatura y movimiento
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre de la casa 2.0 | |
| Nuevos nodos | |
| Cambios en la arquitectura | |
| Cambios en la potencia | |
| Riesgos de seguridad al conectarla a internet | |
| ¿Qué necesitamos aprender? | |
:::

Dibujen el diagrama de bloques de la casa 2.0 (como el de la Guía 2) y súbanlo:

:::foto id="g14-boceto"
Diagrama de bloques de la casa 2.0.
:::

:::pregunta id="g14-p2"
¿Qué riesgos tiene que una casa se pueda controlar desde internet? ¿Cómo se protegería?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Comparamos Bluetooth y WiFi.
- [ ] Simulamos una luz controlada por una página web.
- [ ] Diseñamos la casa 2.0.
:::

## Bitácora (10 min)

:::pregunta id="g14-b1" individual="si"
¿Qué es lo que más quiero aprender en Intermedio III?
:::

Si quieren llevarse la simulación, descarguen el proyecto de Wokwi como `.zip` (menú de la flecha junto a **Save** → **Download project zip**) y súbanlo aquí.

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Revisar antes de la clase cómo abrir el servidor web del ESP32 en Wokwi (Wokwi IoT Gateway o el reenvío de puertos de Wokwi para VS Code); si no está disponible, mostrar la idea con el monitor serie y explicar la página.
- El ESP32 trabaja a 3,3 V: no conectar directo a las cargas ni a los nodos de 5 V sin adaptar niveles.
- g14-p2: contraseñas débiles, accesos no autorizados; se protege con contraseñas, cifrado y actualizaciones.
- Tiempo total: 15 + 50 + 40 + 5 + 10 = 120 minutos.
:::
