---
titulo: El invernadero del futuro
guia: 14
sabado: 14
sesion: Proyección a Básico II
duracion: 120
---

# Guía 14 · El invernadero del futuro

## Objetivo del día

Conocer el simulador Wokwi y una pantalla OLED, simulando un invernadero que muestra sus datos, e imaginar el invernadero 2.0.

**Al terminar tendremos:** un invernadero simulado que muestra temperatura y humedad en una pantalla, y el plan del invernadero 2.0.

## Materiales del equipo

- Computadora con internet
- Cuenta en wokwi.com
- Código final del invernadero

## Parte 1 · ¿Qué es un simulador? (10 min)

Un **simulador** imita un circuito real en la computadora. En **Wokwi** podemos probar código sin cables y con componentes que todavía no tenemos, como una **pantalla OLED**.

:::pregunta id="g14-p1"
¿Qué ventajas tiene probar un circuito en un simulador antes de armarlo?
:::

## Parte 2 · Invernadero con pantalla en Wokwi (50 min)

La página de Wokwi está en inglés; aquí van los nombres de los botones tal como aparecen.

1. Crea un proyecto de **Arduino Uno** en wokwi.com.
   - Entren a **wokwi.com** e inicien sesión con la cuenta del equipo (o la que indique el docente).
   - Bajen hasta **Start from Scratch** y elijan **Arduino Uno**. A la izquierda queda el código (`sketch.ino`) y a la derecha el dibujo.
2. Agrega un **DHT22** (en Wokwi se usa este en lugar del DHT11), un **Potenciómetro** (simulará el sensor de humedad), un **Servo** y una pantalla **SSD1306 OLED**.
   - Con el botón **+** azul (arriba del dibujo) busquen: *DHT22*, *Potentiometer*, *Servo* y *SSD1306 OLED*. Acomódenlas cerca del Arduino.
3. **Conecta los cables.** Haz clic en la punta de un pin y luego en el pin de destino. Para borrar un cable, clic en él y **Supr**. Al pasar el mouse sobre un pin aparece su nombre.

| Componente | Pin |
| --- | --- |
| DHT22 SDA | D7 |
| Potenciómetro (centro) | A0 |
| Servo PWM | D9 |
| OLED SDA / SCL | A4 / A5 |

   Además, cada pieza necesita energía:
   - **DHT22:** VCC → 5V, GND → GND (el pin NC no se conecta).
   - **Potenciómetro:** VCC → 5V, GND → GND; SIG (el del centro) → A0.
   - **Servo:** V+ → 5V, GND → GND.
   - **OLED:** VCC → 5V, GND → GND.
   - El Arduino de Wokwi tiene varios pines GND y 5V; pueden usar cualquiera.

[IMAGEN 14.1: invernadero simulado en Wokwi con DHT22, potenciómetro, servo y pantalla OLED mostrando los datos]

4. En **Library Manager** agrega **DHT sensor library**, **Adafruit SSD1306** y **Adafruit GFX Library**.
   - Arriba del código, clic en la pestaña **Library Manager** → botón **+** → escriban el nombre de cada librería y elíjanla de la lista.
5. Copia el código:
   - Vuelvan a la pestaña `sketch.ino`, borren lo que trae y escriban (o peguen) este programa:

```cpp
#include <Wire.h>
#include <DHT.h>
#include <Servo.h>
#include <Adafruit_SSD1306.h>

DHT dht(7, DHT22);
Servo ventana;
Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);

void setup() {
  dht.begin();
  ventana.attach(9);
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
}

void loop() {
  float temp = dht.readTemperature();
  int suelo = analogRead(A0);

  if (temp > 30) ventana.write(60);
  if (temp < 27) ventana.write(0);

  pantalla.clearDisplay();
  pantalla.setTextSize(2);
  pantalla.setCursor(0, 0);
  pantalla.print(temp, 1);
  pantalla.println(" C");
  pantalla.setTextSize(1);
  pantalla.print("Suelo: ");
  pantalla.println(suelo);
  if (suelo > 500) pantalla.println("Tierra seca!");
  pantalla.display();
  delay(1000);
}
```

6. Presiona **Play**. Haz clic en el DHT22 y cambia la temperatura; gira el potenciómetro.
   - **Play** es el botón verde con el triángulo ▶. La pantalla OLED debe mostrar la temperatura y el valor del suelo.
   - Con la simulación andando, haz clic en el DHT22: aparece una barra para cambiar la temperatura.
   - Haz clic en el potenciómetro y arrástralo (o usa su barrita) para girarlo.
   - Para cada fila de la tabla, pongan ese valor y anoten qué pasa con el servo y con la pantalla.

| Prueba | ¿Qué pasa? |
| --- | --- |
| Temperatura a 35 °C | |
| Temperatura a 20 °C | |
| Potenciómetro al máximo | |

7. Guarden la simulación con **Save** y copien el enlace de la barra del navegador para la bitácora.

:::pregunta id="g14-p2"
¿Qué ventaja tendría una pantalla en nuestro invernadero real?
:::

## Parte 3 · El invernadero 2.0 (40 min)

Marquen las ideas que le pondrían a su invernadero 2.0:

:::checklist id="g14-ideas"
- [ ] Pantalla con los datos
- [ ] Varios sensores de humedad para varias macetas
- [ ] Alertas en el celular
- [ ] Ventilador además de la ventana
- [ ] Panel solar
- [ ] Sensor de luz para encender la lámpara solo cuando está oscuro
:::

Con las ideas que marcaron, completen el plan:

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del invernadero 2.0 | |
| ¿Qué mejoras tendría? | |
| ¿Qué componentes nuevos necesitaría? | |
| ¿Qué necesitamos aprender? | |
:::

Dibujen en la bitácora cómo se vería, con flechas que señalen cada mejora, y súbanlo:

:::foto id="g14-boceto"
Foto del boceto del invernadero 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Creamos el invernadero en Wokwi.
- [ ] La pantalla muestra los datos.
- [ ] Diseñamos el invernadero 2.0.
:::

## Reto extra

Agrega a la simulación un **LED** que se encienda cuando la tierra está seca.

Pistas: agreguen un *LED* y un *Resistor* con el botón +. Pin del Arduino → resistencia → pata **A** del LED; pata **C** → GND. En el código: `pinMode` en el `setup()` y, en el `loop()`, encender el LED si `suelo > 500` y apagarlo si no.

## Bitácora (15 min)

:::pregunta id="g14-b1"
Enlace de nuestra simulación en Wokwi:
:::

:::pregunta id="g14-b2" individual="si"
¿Qué es lo que más quiero aprender en Básico II?
:::

Si quieren llevarse la simulación, descarguen el proyecto de Wokwi como `.zip` (en el menú de la flecha junto a **Save**, opción **Download project zip**) y súbanlo aquí.

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Wokwi no tiene sensor de humedad de suelo: el potenciómetro lo imita (girarlo = tierra más seca o más húmeda).
- Mencionar que en Básico II la estación meteorológica usa justo esta pantalla OLED y el DHT22.
- Tiempo total: 10 + 50 + 40 + 5 + 15 = 120 minutos.
:::
