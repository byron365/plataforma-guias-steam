---
titulo: Centralizado o distribuido
guia: 2
sabado: 2
sesion: Diseño de arquitectura
duracion: 120
---

# Guía 2 · Centralizado o distribuido

## Objetivo del día

Diseñar las dos arquitecturas del elevador (centralizada y distribuida) con diagramas de bloques, compararlas y simular en Wokwi un nodo de piso.

**Al terminar tendremos:** los dos diagramas de bloques, la tabla de comparación inicial y el nodo de piso funcionando en el simulador.

## Materiales del equipo

- Bitácora, hojas grandes, marcadores
- Computadora con internet (Wokwi)

## Parte 1 · Versión centralizada (25 min)

Todo se conecta a **un solo Arduino**: motor, sensores de piso, finales de carrera, paro, y los botones, LEDs y displays de los tres pisos.

Completen la columna **Pines que usa**: cada sensor, final de carrera, botón o LED usa **1 pin**, y cada display usa 7. Multipliquen por la cantidad y sumen todo en la última fila.

:::tabla id="g2-centralizada"
| Elemento | Cantidad | Pines que usa |
| --- | --- | --- |
| Puente H (ENA, IN1, IN2) | 1 | 3 |
| Sensores de piso | 3 | |
| Finales de carrera | 2 | |
| Paro de emergencia | 1 | |
| Botones de llamada | 3 | |
| LEDs de llamada | 3 | |
| Displays de 7 segmentos (7 pines cada uno) | 3 | |
| Total de pines | | |
:::

:::pregunta id="g2-p1"
El UNO tiene 20 pines (D0–D13 y A0–A5), y D0–D1 los usa el USB. ¿Cabe la versión centralizada? ¿Qué tendríamos que quitar?
:::

## Parte 2 · Versión distribuida (25 min)

Un **controlador central** maneja el motor y la seguridad. Cada piso tiene su **nodo** (un Arduino) con botón, LED y display. Todos se conectan por **I2C**: solo 4 cables recorren la torre (SDA, SCL, 5V, GND).

:::animacion tipo="diagrama-bloques" sistema="elevador" ocultar="si"
:::

En cada piso, anoten qué **lee** el nodo (entradas) y qué **controla** (salidas):

:::tabla id="g2-distribuida"
| Nodo | Dirección I2C | Entradas | Salidas |
| --- | --- | --- | --- |
| Central (maestro) | — | Sensores de piso, finales de carrera, paro | Puente H |
| Piso 1 | 8 | | |
| Piso 2 | 9 | | |
| Piso 3 | 10 | | |
:::

[IMAGEN 2.1: diagramas de bloques lado a lado: versión centralizada con muchos cables y versión distribuida con el bus I2C]

Un **diagrama de bloques** dibuja cada parte como un rectángulo y las conexiones como flechas. En dos hojas grandes, dibujen la versión centralizada y la distribuida: en la distribuida, el bus I2C es una línea larga que pasa por los cuatro Arduino. Tomen una foto de las dos hojas y súbanla:

:::foto id="g2-diagramas"
Foto de los dos diagramas del equipo.
:::

## Parte 3 · Comparación inicial (15 min)

Por ahora escriban lo que **creen**, mirando sus diagramas. En la Guía 9 la completarán con lo que midan en el elevador real.

:::tabla id="g2-comparacion"
| Criterio | Centralizada | Distribuida |
| --- | --- | --- |
| Cables que suben por la torre | | |
| Pines del Arduino principal | | |
| ¿Qué tan fácil es agregar un cuarto piso? | | |
| ¿Qué pasa si falla un Arduino? | | |
| Costo (número de Arduino) | | |
| Dificultad de programar | | |
:::

## Parte 4 · Mensajes I2C (15 min)

Para que la central y los pisos se entiendan, se ponen de acuerdo en qué mensajes se mandan. Lean juntos la tabla: la central **pregunta** a cada piso si alguien llamó y después le **informa** dónde está la cabina.

:::tabla id="g2-protocolo"
| Mensaje | Dirección | Bytes | Significado |
| --- | --- | --- | --- |
| Pregunta | Central → `requestFrom(nodo, 1)` | 1 | ¿Alguien presionó el botón? (1 = sí) |
| Informe | Central → nodo | 2 | Byte 1: piso actual (1–3) · Byte 2: LED de llamada (0/1) |
:::

:::pregunta id="g2-p2"
El nodo borra el "pedido" después de responder. ¿Por qué la central guarda la llamada en su propia lista (`llamada[]`) en lugar de preguntar otra vez?
:::

## Parte 5 · Simular un nodo de piso (35 min)

En Wokwi crea un **Arduino Uno** con un **display de 7 segmentos** (cátodo común), un **botón** y un **LED**.

La página de Wokwi está en inglés; aquí van los nombres tal como aparecen.

1. En **wokwi.com**, inicien sesión, bajen hasta **Start from Scratch** y elijan **Arduino Uno**.
2. Con el botón **+** agreguen: *7 Segment Display*, *Pushbutton*, *LED* y ocho *Resistor* (siete para los segmentos y una para el LED).
3. **Cátodo común:** Wokwi pone el display de **ánodo** común. Abran la pestaña `diagram.json`, busquen la parte `"wokwi-7segment"` y dentro de sus `"attrs"` agreguen `"common": "cathode"`. Debe quedar así: `"attrs": { "common": "cathode" }` (si ya había algo dentro, sepárenlo con una coma).
4. Hagan los cables según la tabla: clic en la punta de un pin y clic en el destino. Al pasar el mouse sobre un pin aparece su nombre. Cada segmento va pin → resistencia → letra del display (A, B, C…); el pin **COM** del display va a **GND**.
5. El botón tiene dos lados: una pata del lado **1** a D2 y una pata del lado **2** a GND. El LED: D3 → resistencia → pata **A**; pata **C** → GND.

| Componente | Pin |
| --- | --- |
| Segmentos a, b, c, d, e, f, g | D4, D5, D6, D7, D8, D9, D10 (con 220 Ω) |
| Común del display | GND |
| Botón | D2 y GND |
| LED | D3 (con 220 Ω) |

[IMAGEN 2.2: nodo de piso simulado en Wokwi con el display de 7 segmentos, el botón y el LED]

6. En la pestaña `sketch.ino` borren lo que trae y escriban el programa. Presionen **Play** (botón verde ▶) y hagan clic en el botón: el número debe avanzar 1 → 2 → 3 → 1 y el LED parpadear.

```cpp
const int BOTON = 2, LED = 3;
const int SEG[7] = {4, 5, 6, 7, 8, 9, 10};   // a..g
const byte NUM[4] = {0b0111111, 0b0000110, 0b1011011, 0b1001111}; // 0,1,2,3
int piso = 1;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  for (int i = 0; i < 7; i++) pinMode(SEG[i], OUTPUT);
}

void mostrar(int n) {
  for (int i = 0; i < 7; i++) digitalWrite(SEG[i], bitRead(NUM[n], i));
}

void loop() {
  if (digitalRead(BOTON) == LOW) {   // simular que la cabina avanza
    piso = piso % 3 + 1;
    digitalWrite(LED, HIGH);
    delay(300);
    digitalWrite(LED, LOW);
  }
  mostrar(piso);
}
```

En la animación, toquen los segmentos para encenderlos o apagarlos y miren cómo cambian los bits:

:::animacion tipo="siete-segmentos"
:::

:::pregunta id="g2-p3"
¿Qué número binario corresponde al "2"? ¿Qué segmentos enciende?
:::

Guarden con **Save** y descarguen el proyecto como `.zip` (menú de la flecha junto a **Save** → **Download project zip**) para subirlo aquí.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Contamos los pines de la versión centralizada.
- [ ] Dibujamos las dos arquitecturas.
- [ ] Hicimos la comparación inicial.
- [ ] El nodo de piso funciona en Wokwi.
:::

:::docente
- g2-p1: centralizada ≈ 3 + 3 + 2 + 1 + 3 + 3 + 21 = 36 pines: no cabe. Habría que multiplexar displays o usar uno solo; esto motiva la versión distribuida.
- g2-p2: si la central no lo guardara, la llamada se perdería mientras la cabina va a otro piso.
- g2-p3: 0b1011011 → a, b, d, e, g.
- La comparación se completa con datos reales en la guía 9.
- Tiempo total: 25 + 25 + 15 + 15 + 35 + 5 = 120 minutos.
:::
