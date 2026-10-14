---
titulo: El contrato entre nodos
guia: 2
sabado: 2
sesion: Diseño de arquitectura
duracion: 120
---

# Guía 2 · El contrato entre nodos

## Objetivo del día

Diseñar entre todos el diagrama de bloques de la casa y acordar el "contrato" de mensajes I2C; cada equipo dibuja el diagrama de su nodo y simula su lógica en Wokwi.

**Al terminar tendremos:** el diagrama general de la casa, la tabla de mensajes acordada por todos los equipos y la lógica de nuestro nodo probada en el simulador.

## Materiales del equipo

- Hojas grandes, marcadores
- Computadora con internet (Wokwi)

## Parte 1 · Diagrama general (25 min) · todo el grupo

Un **diagrama de bloques** dibuja cada parte como un rectángulo y las conexiones como flechas de colores, según lo que viaja por ellas:

| Color de flecha | Tipo |
| --- | --- |
| Rojo | 12 V (cargas) |
| Naranja | 5 V (lógica) |
| Azul | Señales de control |
| Verde | Datos (I2C, Bluetooth) |

:::animacion tipo="diagrama-bloques" sistema="casa" ocultar="si"
:::

Bloques: fuente 12 V + fusible, bornera de distribución, LM2596 (5 V), central, HC-05, OLED, nodo sala (MOSFET + tira LED + LDR), nodo cuarto (MOSFET + ventilador + DHT11), nodo entrada (relé + cerradura + PIR + buzzer), bus I2C.

Entre todos, en una hoja grande: un rectángulo por bloque, agrupando los de cada habitación, y flechas de colores entre ellos. El bus I2C es una línea larga que pasa por todos los nodos y la central.

:::foto id="g2-diagrama-casa"
Foto del diagrama general de la casa.
:::

:::pregunta id="g2-p1"
¿Qué es una topología **en bus**? ¿Qué ventaja tiene para agregar habitaciones?
:::

## Parte 2 · El contrato de mensajes (30 min) · todo el grupo

Para que nodos hechos por equipos distintos funcionen juntos, todos deben respetar el mismo **contrato**:

Lean juntos la tabla. Las casillas vacías del estado significan que esa orden usa el mismo estado que la fila de arriba del mismo nodo. Si el grupo acuerda algún cambio, escríbanlo en la tabla y en la hoja de la pared.

- **Órdenes** de la central a un nodo: **2 bytes** → una letra (la orden) y un número (el valor).
- **Estado** que la central pide a cada nodo: **2 bytes**.

:::tabla id="g2-contrato"
| Nodo | Dirección | Orden (letra) | Valor | Significado | Estado: byte 1 | Estado: byte 2 |
| --- | --- | --- | --- | --- | --- | --- |
| Sala | 8 | L | 0–100 | Brillo en % | Brillo actual (%) | Luz ambiente (%) |
| Sala | 8 | L | 255 | Modo automático | | |
| Cuarto | 9 | V | 0–100 | Velocidad en % | Velocidad actual (%) | Temperatura (°C) |
| Cuarto | 9 | V | 255 | Modo automático | | |
| Entrada | 10 | A | 1 | Abrir la cerradura 2 s | ¿Puerta abierta? (0/1) | ¿Alarma sonando? (0/1) |
| Entrada | 10 | F | 1 / 0 | Armar / desarmar alarma | | |
:::

**Órdenes del celular a la central** (texto terminado en salto de línea):

:::tabla id="g2-celular"
| Mensaje | Significado |
| --- | --- |
| L75 | Luz de la sala al 75 % |
| LA | Luz de la sala en automático |
| V50 | Ventilador al 50 % |
| VA | Ventilador en automático |
| A | Abrir la puerta |
| N | Escena "noche" |
| F | Escena "fuera de casa" (arma la alarma) |
| C | Escena "en casa" (desarma la alarma) |
:::

:::pregunta id="g2-p2"
Si un equipo decide por su cuenta enviar 3 bytes de estado en lugar de 2, ¿qué pasaría en la central?
:::

## Parte 3 · Diagrama de nuestro nodo (20 min) · cada equipo

:::tabla id="g2-nodo"
Cada equipo anota los bloques de **su** nodo: sensores, cargas, módulos y el bus. Ejemplo para la sala: "LDR | A0 | entrada | 5 V".

| Bloque de nuestro nodo | Pin del Arduino | Tipo (entrada / salida / bus) | Voltaje |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
:::

:::foto id="g2-diagrama-nodo"
Diagrama de bloques de nuestro nodo.
:::

## Parte 4 · Simular la lógica del nodo (40 min) · cada equipo

En Wokwi simulamos el nodo **sin I2C**: las órdenes se escriben en el Monitor serie (por ejemplo `L50` o `V255`) y un LED representa la carga de 12 V.

1. En **wokwi.com**, inicien sesión, **Start from Scratch → Arduino Uno**.
2. Con el botón **+** agreguen los componentes de su nodo (tabla de abajo). Cada LED con una resistencia (*Resistor*): pin → resistencia → pata **A** del LED; pata **C** → GND.
3. Hagan los cables: clic en la punta de un pin y clic en el destino. Al pasar el mouse sobre un pin aparece su nombre.

| Nodo | Componentes en Wokwi |
| --- | --- |
| Sala | LED en D9, fotorresistencia (Photoresistor sensor) en A0 |
| Cuarto | LED en D9, DHT22 en D2 (en lugar del DHT11) |
| Entrada | LED en D7 (relé), botón en D2 (en lugar del PIR), buzzer en D5 |
| Central | Pantalla OLED SSD1306 (A4/A5) mostrando un estado de prueba |

[IMAGEN 2.1: simulación en Wokwi del nodo sala con el LED como tira y la fotorresistencia como sensor de luz]

Ejemplo para la **sala** (los otros equipos lo adaptan):

- **Cuarto:** la letra es `V` y la decisión automática depende de la temperatura del DHT22 (librería *DHT sensor library* en **Library Manager**).
- **Entrada:** la orden `A1` enciende el LED de D7 dos segundos; `F1`/`F0` arman o desarman; si está armada y se presiona el botón de D2, suena el buzzer.
- **Central:** solo prueben que la pantalla muestre un texto (librerías *Adafruit SSD1306* y *Adafruit GFX Library*).

```cpp
byte pedido = 0, brillo = 0, luz = 0;

void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    char orden = Serial.read();
    int valor = Serial.parseInt();
    if (orden == 'L') pedido = valor;
  }
  luz = map(analogRead(A0), 0, 1023, 0, 100);
  if (pedido == 255) brillo = luz < 30 ? 80 : 0;   // automático
  else brillo = pedido;
  analogWrite(9, map(brillo, 0, 100, 0, 255));
  Serial.print("Brillo: "); Serial.print(brillo);
  Serial.print("  Luz: "); Serial.println(luz);
  delay(300);
}
```

Presionen **Play** (botón verde ▶). Escriban cada orden en la caja del Monitor serie (abajo) y presionen **Enter**. Anoten tres órdenes que probaron, lo que esperaban y lo que pasó.

:::tabla id="g2-simulacion"
| Orden escrita | Resultado esperado | Resultado obtenido |
| --- | --- | --- |
| | | |
| | | |
| | | |
:::

Guarden con **Save** y descarguen el proyecto como `.zip` (menú de la flecha junto a **Save** → **Download project zip**) para subirlo aquí.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Tenemos el diagrama general de la casa.
- [ ] Todos los equipos aceptaron el contrato de mensajes.
- [ ] Dibujamos el diagrama de nuestro nodo.
- [ ] La lógica del nodo funciona en Wokwi.
:::

:::docente
- El contrato es el corazón del proyecto: imprimirlo y pegarlo en la pared; cualquier cambio se discute con todo el grupo.
- g2-p2: la central lee 2 bytes; el tercero quedaría en el buffer y desordenaría las lecturas.
- La OLED de la central comparte el bus I2C con los nodos (dirección 0x3C): no hay conflicto con 8, 9 y 10.
- Tiempo total: 25 + 30 + 20 + 40 + 5 = 120 minutos.
:::
