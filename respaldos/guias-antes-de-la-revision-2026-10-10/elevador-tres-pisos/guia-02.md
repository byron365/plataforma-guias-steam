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

:::tabla id="g2-distribuida"
| Nodo | Dirección I2C | Entradas | Salidas |
| --- | --- | --- | --- |
| Central (maestro) | — | Sensores de piso, finales de carrera, paro | Puente H |
| Piso 1 | 8 | | |
| Piso 2 | 9 | | |
| Piso 3 | 10 | | |
:::

[IMAGEN 2.1: diagramas de bloques lado a lado: versión centralizada con muchos cables y versión distribuida con el bus I2C]

:::foto id="g2-diagramas"
Foto de los dos diagramas del equipo.
:::

## Parte 3 · Comparación inicial (15 min)

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

| Componente | Pin |
| --- | --- |
| Segmentos a, b, c, d, e, f, g | D4, D5, D6, D7, D8, D9, D10 (con 220 Ω) |
| Común del display | GND |
| Botón | D2 y GND |
| LED | D3 (con 220 Ω) |

[IMAGEN 2.2: nodo de piso simulado en Wokwi con el display de 7 segmentos, el botón y el LED]

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

:::animacion tipo="siete-segmentos"
:::

:::pregunta id="g2-p3"
¿Qué número binario corresponde al "2"? ¿Qué segmentos enciende?
:::

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
