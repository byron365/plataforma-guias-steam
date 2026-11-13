---
titulo: Simulamos la temperatura y el programa final
guia: 5
sabado: 5
sesion: Simulación (3)
duracion: 120
---

# Guía 5 · Simulamos la temperatura y el programa final

## Objetivo del día

Agregar el sensor de temperatura, hacer que la ventana se abra sola con el calor y juntar todo en el **programa final** del invernadero: riego, ventana, luz y registro de datos.

**Al terminar tendremos:** el invernadero completo funcionando en el simulador y el programa final guardado para subirlo al Arduino real.

## Materiales del equipo

- Computadora con internet y la cuenta de Wokwi del equipo
- El proyecto de Wokwi del sábado 3 (su enlace está en la bitácora de la Guía 3)
- Regla para medir las plantas
- Bitácora

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g5p-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Una ventana que no se vuelve loca (10 min)

Queremos que la ventana se **abra con calor** y se **cierre con frío**. Si usáramos un solo número (abrir sobre 30 °C y cerrar bajo 30 °C), cerca de 30 la ventana abriría y cerraría sin parar. Por eso usamos **dos** números: abrir sobre **30 °C** y cerrar bajo **27 °C**. Entre 27 y 30, la ventana **se queda como estaba**. Eso se llama **histéresis**.

Suban y bajen la temperatura en la animación y miren qué hace la ventana entre 27 y 30 °C:

:::animacion tipo="histeresis"
:::

:::pregunta id="g5p-p1"
La ventana está abierta y la temperatura baja a 28 °C. ¿Se cierra? ¿Por qué?
:::

## Parte 3 · El riego y la temperatura en Wokwi (25 min)

Abran su proyecto de Wokwi del sábado 3 (la luz y la ventana). Con la simulación detenida, agreguen el **riego** que probaron en Tinkercad el sábado 4 y el **sensor de temperatura**.

**El riego:** Wokwi no tiene sensor de humedad de tierra ni bomba, así que usamos un **Potentiometer** (perilla) como sensor, que da un número **más alto cuando la tierra está más seca** (como el sensor real), y un **LED** azul con su **Resistor** de 220 Ω como bomba. Wokwi sí tiene el **Relay Module**, igual al módulo relé real.

| Pieza | Conexión |
| --- | --- |
| Potenciómetro: VCC / SIG / GND | 5V / A0 / GND |
| Relé: VCC / GND / IN | 5V / GND / 8 |
| Relé: COM | 5V del Arduino (en el invernadero real: el + de la fuente de 5 V) |
| Relé: NO | Resistencia de 220 Ω → pata **A** del LED azul |
| LED azul: pata **C** | GND (en el real: la bomba va al − de la fuente) |

- El botón del pin 2 se queda: desde hoy es el botón de **riego manual**.

**La temperatura:** en el invernadero real usaremos el **DHT11**. Wokwi tiene el **DHT22**, que es su hermano mayor: se conecta igual y usa la misma librería.

1. Agreguen un **DHT22** con el botón **+**.
2. Conecten: **VCC → 5V**, **SDA → pin 7**, **GND → GND**. El pin **NC** no se conecta.
3. Agreguen la librería: arriba del código, pestaña **Library Manager** → botón **+** → escriban **DHT sensor library** y elíjanla de la lista (la de Adafruit).

Ahora el circuito tiene todo: la luz (6), el botón (2), el servo (9), el sensor de humedad (A0), el relé con la "bomba" (8) y el sensor de temperatura (7).

[IMAGEN 5.1P: invernadero completo simulado en Wokwi: luz, botón, servo de la ventana, potenciómetro como sensor de humedad, relé con el LED de la bomba y sensor DHT22]

## Parte 4 · El programa final (40 min)

Vuelvan a `sketch.ino`, borren todo y escriban el programa completo. Junta lo de las guías 3 y 4, más la ventana automática y el registro de datos:

```cpp
// Mini invernadero inteligente
// STEAM Robotics Academy · Básico · Docente: Bairon Alas
// Requiere la librería "DHT sensor library" de Adafruit

#include <Servo.h>
#include <DHT.h>  // librería DHT

// --- Pines ---
const int SENSOR_SUELO = A0;
const int BOTON = 2;
const int LUZ = 6;
const int DHT_PIN = 7;
const int BOMBA = 8;       // relé
const int SERVO_VENT = 9;

// --- Ajustes del equipo ---
const int UMBRAL_SECO = 500;     // calibrar
const int TIEMPO_RIEGO = 3000;   // ms
const float TEMP_ABRIR = 30.0;   // °C
const float TEMP_CERRAR = 27.0;  // °C
const int ANGULO_ABIERTA = 60;   // grados
const unsigned long LUZ_ON = 60000;  // ms
const unsigned long LUZ_OFF = 60000; // ms

DHT dht(DHT_PIN, DHT22);   // en el invernadero real: DHT11
Servo ventana;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LUZ, OUTPUT);
  pinMode(BOMBA, OUTPUT);
  digitalWrite(BOMBA, LOW);  // apagada
  ventana.attach(SERVO_VENT);
  ventana.write(0);          // cerrada
  dht.begin();
  Serial.begin(9600);
}

void regar() {
  digitalWrite(BOMBA, HIGH);
  delay(TIEMPO_RIEGO);
  digitalWrite(BOMBA, LOW);
}

void loop() {
  // 1. Riego automático o manual
  int suelo = analogRead(SENSOR_SUELO);
  bool manual = digitalRead(BOTON) == LOW;
  if (suelo > UMBRAL_SECO || manual) {
    regar();
    delay(5000);  // el agua baja
  }

  // 2. Ventilación con histéresis
  float temp = dht.readTemperature();
  if (temp > TEMP_ABRIR) {
    ventana.write(ANGULO_ABIERTA);
  }
  if (temp < TEMP_CERRAR) {
    ventana.write(0);
  }

  // 3. Luz con temporizador
  unsigned long ciclo = LUZ_ON + LUZ_OFF;
  unsigned long t = millis() % ciclo;
  if (t < LUZ_ON) {
    digitalWrite(LUZ, HIGH);
  } else {
    digitalWrite(LUZ, LOW);
  }

  // 4. Registro de datos: suelo,temperatura
  Serial.print(suelo);
  Serial.print(",");
  Serial.println(temp);
  delay(1000);
}
```

- Desde hoy el botón es solo para regar a mano: la ventana se mueve sola con la temperatura.
- Cada segundo el Monitor escribe una línea con dos números separados por coma: la humedad de la tierra y la temperatura. El sábado 9 usaremos esas líneas para hacer una gráfica.

## Parte 5 · Probar todo (20 min)

1. **Play.** Con la simulación andando, hagan clic en el DHT22: aparece una barra para cambiar la temperatura (y otra para la humedad del aire, que no usamos). Para moverla de a poco, hagan clic en la barra y usen las flechas del teclado.

[IMAGEN 5.2P: simulación andando con el panel del DHT22 abierto, la barra de temperatura y el Monitor escribiendo los datos]

2. Hagan cada prueba y anoten qué pasa.
   - **Riego a mano:** mantengan presionado el botón **1 segundo**. El programa lo revisa una vez por vuelta, así que un clic rápido se le puede escapar.
   - **Luz:** cuenten el minuto con el reloj de arriba a la derecha del simulador. Si la simulación va lenta, ese reloj avanza más despacio que uno de verdad.

:::tabla id="g5p-ventana"
| Temperatura | Estado de la ventana |
| --- | --- |
| Al empezar (24 °C) | |
| Subiendo, a 29 °C | |
| Al pasar 30 °C | |
| Bajando, a 28 °C | |
| Al bajar de 27 °C | |
:::

:::tabla id="g5p-pruebas"
| Prueba | ¿Funciona? |
| --- | --- |
| Con la perilla del sensor al máximo, la "bomba" riega sola | |
| Manteniendo presionado el botón 1 segundo, riega a mano | |
| La luz está encendida el primer minuto y luego se apaga | |
| El Monitor escribe líneas como `350,24.00` | |
:::

:::pregunta id="g5p-p2"
¿Qué número cambiarían si su ventana real se abre bien con 45° en vez de 60°?
:::

**Muy importante:** este es el programa que van a subir al Arduino real el sábado 8. Guarden con **Save**, copien el código completo de `sketch.ino`, péguenlo en un bloc de notas y guárdenlo como `equipo_NOMBRE_final.txt`.

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] Revisamos las plantas.
- [ ] La ventana se abre con calor y se cierra con frío, con histéresis.
- [ ] El riego, el botón y la luz siguen funcionando.
- [ ] Guardamos `equipo_NOMBRE_final.txt`.
:::

## Reto extra

Haz que, si la temperatura pasa de **35 °C**, además de abrir la ventana se encienda la "bomba" un momento para refrescar la tierra.

Pista: un `if` más en la parte 2 del `loop`, que llame a `regar()` si `temp > 35`.

## Bitácora (10 min)

:::pregunta id="g5p-b1"
¿Qué creen que será distinto cuando armen el circuito en el invernadero real?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_final.txt` con el código final del simulador. El sábado 8 lo pegan en Arduino IDE. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí.
:::

:::docente
- **Versión práctica (8 sábados):** el programa final es el de la Guía 8 normal, con el ángulo de la ventana en la constante `ANGULO_ABIERTA` y el sensor DHT22 de Wokwi. En el invernadero real solo cambia una palabra: `DHT22` por `DHT11` (Guía 8). Campos propios (g5p-…).
- La histéresis y el registro de datos son los de la Guía 7 normal; el temporizador de la luz, el de la Guía 8 normal.
- El riego se probó en Tinkercad (Guía 4); aquí se agrega en Wokwi con un potenciómetro (más alto = más seco, sin el `1023 -` que hacía falta en Tinkercad) y el **Relay Module** con un LED azul como bomba.
- g5p-p1: no; solo se cierra bajo 27 °C. Entre 27 y 30 °C se queda como estaba (histéresis).
- g5p-p2: `ANGULO_ABIERTA` (de 60 a 45).
- El DHT22 de Wokwi empieza en 24 °C; su barra permite subir hasta 80 °C.
- **Probado en Wokwi el 6 de noviembre** con el código de esta guía, tal cual: compila con Servo y DHT sensor library, y pasan la ventana con histéresis, el riego automático, el riego con el botón y la luz (encendida el primer minuto y apagada después). El circuito de la imagen 5.1P está en `herramientas/wokwi/mini-invernadero-guia-05.diagram.json`: se pega en la pestaña `diagram.json` de un proyecto nuevo.
- El botón se lee una sola vez por vuelta del `loop`, y la vuelta dura cerca de 1 segundo: un clic corto no se detecta. Tampoco se detecta durante un riego, que dura 8 segundos (3 de bomba y 5 de espera).
- Si la perilla se queda sobre el umbral, el programa riega una y otra vez, cada 8 segundos: es lo esperado. Para terminar la prueba, bajen la perilla.
- En una computadora lenta la simulación puede ir muy por debajo del 100 % (el porcentaje sale junto al reloj) y la prueba de la luz tarda más que un minuto real. Si no alcanza el tiempo, basta con ver la luz encendida y bajar `LUZ_ON` a 10000 para ver cómo se apaga.
- En el plan gratuito de Wokwi los proyectos solo se guardan como **públicos**: el nombre del proyecto no debe llevar nombres de estudiantes.
- Tiempo total: 10 + 10 + 25 + 40 + 20 + 5 + 10 = 120 minutos.
:::
