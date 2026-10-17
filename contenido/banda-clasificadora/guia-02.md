---
titulo: Dividir el proceso en nodos
guia: 2
sabado: 2
sesion: Diseño de arquitectura
duracion: 120
---

# Guía 2 · Dividir el proceso en nodos

## Objetivo del día

Dividir el proceso en subsistemas, repartirlos entre los dos nodos, dibujar el diagrama de bloques, acordar los mensajes I2C y simular en Wokwi la decisión de color.

**Al terminar tendremos:** el diagrama de bloques, el protocolo I2C acordado y la lógica de clasificación probada en el simulador.

## Materiales del equipo

- Bitácora, hojas grandes, marcadores
- Computadora con internet (Wokwi)

## Parte 1 · Del proceso a los subsistemas (20 min)

Un proceso industrial siempre sigue el flujo **sensor → decisión → actuador**:

- **Sensor:** lo que mide algo del mundo (una perilla, un detector).
- **Decisión:** la pregunta que responde el programa con esa medida.
- **Actuador:** lo que se mueve o muestra algo (motor, servo, display).

Completen los espacios vacíos de cada etapa. La primera fila está completa como ejemplo. Los componentes que usaremos están en la tabla de la Parte 2.

:::tabla id="g2-flujo"
| Etapa | Sensor | Decisión | Actuador |
| --- | --- | --- | --- |
| Mover la banda | Perilla de velocidad | ¿A qué velocidad? ¿Hay paro? | Motor DC |
| Detectar la pieza | | ¿Llegó una pieza nueva? | — |
| Identificar el color | | ¿Rojo, verde o azul? | — |
| Desviar la pieza | — | ¿Cuándo y a qué ángulo? | |
| Contar | — | | Display |
:::

## Parte 2 · Diagrama de bloques (30 min)

Un **diagrama de bloques** dibuja cada parte como un rectángulo y las conexiones como flechas de colores, según lo que viaja por ellas:

| Color de flecha | Tipo |
| --- | --- |
| Rojo | Potencia (12 V, motor) |
| Naranja | Lógica (5 V) |
| Azul | Señales de control (PWM, pines) |
| Verde | Datos (I2C, SPI) |

1. Para cada bloque de la tabla, escriban con qué otro bloque se conecta y el tipo de conexión (potencia, lógica, control o datos).
2. Luego dibújenlo en una hoja grande: un rectángulo por bloque, agrupando los del nodo **banda** a un lado y los del **clasificador** al otro, y flechas con los colores de arriba.

:::tabla id="g2-bloques"
| Bloque | Nodo | Conectado a | Tipo de conexión |
| --- | --- | --- | --- |
| Fuente 12 V + fusible | — | | |
| Regulador LM2596 (5 V) | — | | |
| Arduino banda (esclavo 8) | Banda | | |
| MOSFET + diodo | Banda | | |
| Motor DC 12 V | Banda | | |
| Potenciómetro | Banda | | |
| Sensor IR de llegada | Banda | | |
| Arduino clasificador (maestro) | Clasificador | | |
| Sensor de color TCS34725 | Clasificador | | I2C (dirección 0x29) |
| Servo desviador | Clasificador | | |
| Display MAX7219 | Clasificador | | SPI |
| Botón de paro | Clasificador | | |
:::

:::animacion tipo="diagrama-bloques" sistema="banda" ocultar="si"
:::

:::foto id="g2-diagrama"
Foto del diagrama de bloques del equipo.
:::

:::pregunta id="g2-p1"
El sensor de color y el Arduino de la banda usan el mismo bus I2C. ¿Cómo sabe cada uno que el mensaje es para él?
:::

## Parte 3 · El protocolo I2C (20 min)

Un **protocolo** es el acuerdo de qué mensajes se envían y qué significa cada byte. Las dos primeras filas son los mensajes que usaremos; en la tercera, propongan un mensaje nuevo que les gustaría agregar (por ejemplo, para cambiar la velocidad desde el clasificador).

:::tabla id="g2-protocolo"
| Mensaje | Quién lo envía | Bytes | Significado |
| --- | --- | --- | --- |
| Pregunta de estado | Maestro → `requestFrom(8, 2)` | 2 | Byte 1: ¿llegó pieza? (0/1) · Byte 2: velocidad (0–255) |
| Orden | Maestro → `beginTransmission(8)` | 1 | `'S'` = detener · `'G'` = avanzar |
| | | | |
:::

:::pregunta id="g2-p2"
El aviso de pieza se borra cuando el maestro lo lee. ¿Qué pasaría si el maestro preguntara muy despacio, por ejemplo cada 2 segundos?
:::

## Parte 4 · Simular la decisión de color (40 min)

**¿Para qué es esta simulación?** Antes de armar la banda queremos comprobar que la **decisión** del clasificador funciona: "llega una pieza → ¿de qué color es? → mover el desviador al lugar correcto".

El sensor de color real (TCS34725) no da el nombre del color: da **tres números**, cuánta luz **roja**, **verde** y **azul** refleja la pieza. Una pieza roja refleja mucho rojo y poco de los otros dos. El programa compara los tres números y elige el **más grande**.

Wokwi no tiene ese sensor, así que lo imitamos con piezas que sí tiene:

| En la simulación | Imita a | Qué hace |
| --- | --- | --- |
| Potenciómetro "R" | Canal rojo del sensor de color | Girarlo es como poner una pieza más o menos roja |
| Potenciómetro "G" | Canal verde del sensor de color | Igual, con el verde |
| Potenciómetro "B" | Canal azul del sensor de color | Igual, con el azul |
| Botón "llega pieza" | Sensor infrarrojo de llegada | Presionarlo es como si una pieza llegara al sensor |
| Servo | Desviador | Gira hacia la salida del color elegido |

Ojo: aquí los potenciómetros **no** son la perilla de velocidad del diagrama de la Parte 2. Solo en esta simulación hacen de sensor de color.

1. En **wokwi.com**, inicien sesión, **Start from Scratch → Arduino Uno**.
2. Con el botón **+** agreguen tres *Potentiometer*, un *Servo* y un *Pushbutton*.
3. Conecten (clic en la punta de un pin y clic en el destino; al pasar el mouse sobre un pin aparece su nombre):
   - Cada potenciómetro: **VCC** → 5V, **GND** → GND, **SIG** → su pin de la tabla.
   - **Servo:** **PWM** → D6, **V+** → 5V, **GND** → GND.
   - **Botón:** una pata de un lado → D2; una pata del otro lado → GND.

| Componente | Pin |
| --- | --- |
| Potenciómetro "R" | A0 |
| Potenciómetro "G" | A1 |
| Potenciómetro "B" | A2 |
| Servo | D6 |
| Botón "llega pieza" | D2 y GND |

[IMAGEN 2.1: simulación en Wokwi con tres potenciómetros como canales de color, un botón y el servo desviador]

4. En `sketch.ino`, borren lo que trae y escriban el programa:

```cpp
#include <Servo.h>
Servo desviador;
const int ANG[3] = {30, 90, 150};   // rojo, verde, azul
int cuenta[3] = {0, 0, 0};
const char* NOMBRE[3] = {"Rojo", "Verde", "Azul"};

int leerColor() {
  int r = analogRead(A0), g = analogRead(A1), b = analogRead(A2);
  if (r > g && r > b) return 0;
  if (g > r && g > b) return 1;
  return 2;
}

void setup() {
  pinMode(2, INPUT_PULLUP);
  desviador.attach(6);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(2) == LOW) {          // llegó una pieza
    int c = leerColor();
    cuenta[c]++;
    desviador.write(ANG[c]);
    Serial.print(NOMBRE[c]);
    Serial.print("  R:"); Serial.print(cuenta[0]);
    Serial.print(" V:"); Serial.print(cuenta[1]);
    Serial.print(" A:"); Serial.println(cuenta[2]);
    delay(500);
  }
}
```

**Cómo decide:** `leerColor()` lee los tres potenciómetros y devuelve 0 (rojo), 1 (verde) o 2 (azul) según cuál es mayor. `ANG` guarda el ángulo del servo para cada color y `cuenta` lleva cuántas piezas van de cada color.

5. Presionen **Play** (botón verde ▶). Para cada fila de la tabla:
   - Hagan clic en cada potenciómetro y gírenlo. Wokwi no muestra el número, pero no hace falta que quede exacto: todo a la izquierda es 0, todo a la derecha 1023 y a la mitad unos 512. Lo que importa es **cuál queda más alto**.
   - En la última fila los tres deben ser **exactamente iguales**: llévenlos los tres **todo a la izquierda** (en 0).
   - Presionen el botón "llega pieza" y anoten lo que dice el Monitor serie y hacia dónde apunta el servo.

:::tabla id="g2-simulacion"
| R | G | B | Color esperado | Resultado | Ángulo del servo |
| --- | --- | --- | --- | --- | --- |
| 900 | 200 | 200 | Rojo | | |
| 200 | 800 | 300 | Verde | | |
| 100 | 200 | 700 | Azul | | |
| 500 | 500 | 500 | ¿? | | |
:::

:::pregunta id="g2-p3"
¿Qué color elige el programa cuando los tres valores son iguales? ¿Es correcto? ¿Qué debería pasar?
:::

Guarden con **Save** y copien el enlace de la barra del navegador en su bitácora.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Completamos el flujo sensor → decisión → actuador.
- [ ] El diagrama de bloques tiene todos los bloques y tipos de conexión.
- [ ] Acordamos el protocolo I2C.
- [ ] La decisión de color funciona en Wokwi.
:::

## Bitácora (5 min)

Anoten aquí los fallos de hoy (síntoma, causa y solución), igual que en la Guía 1.

:::tabla id="g2-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

Si quieren llevarse la simulación, descarguen el proyecto de Wokwi como `.zip` (menú de la flecha junto a **Save** → **Download project zip**) y súbanlo aquí.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g2-p1: por la dirección; cada dispositivo solo responde a la suya (TCS34725 = 0x29, Arduino banda = 8).
- g2-p2: si llegan dos piezas entre preguntas, solo se cuenta una; el maestro debe preguntar seguido (cada 20 ms en el código).
- g2-p3: elige azul porque es el caso "si no"; abre la idea del contenedor de rechazo (reto del sábado 13).
- Tiempo total: 20 + 30 + 20 + 40 + 5 + 5 = 120 minutos.
:::
