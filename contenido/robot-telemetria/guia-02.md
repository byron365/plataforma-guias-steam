---
titulo: La arquitectura del robot
guia: 2
sabado: 2
sesion: Diseño de arquitectura
duracion: 120
---

# Guía 2 · La arquitectura del robot

## Objetivo del día

Diseñar el diagrama de bloques del sistema, el flujo de señales, el protocolo de mensajes y el presupuesto de energía, y simular en Wokwi el intérprete de mensajes del robot.

**Al terminar tendremos:** el diagrama de bloques, el protocolo documentado, el presupuesto de energía y un intérprete de mensajes funcionando en el simulador.

## Materiales del equipo

- Bitácora, hojas grandes, marcadores
- Computadora con internet (Wokwi)
- Requisitos del sábado 1

## Parte 1 · Diagrama de bloques (30 min)

Un **diagrama de bloques** muestra las partes del sistema como cajas y las señales como flechas. Distingue con colores:

| Color de flecha | Tipo |
| --- | --- |
| Rojo | Energía de potencia (batería, motores) |
| Naranja | Energía de lógica (5 V) |
| Azul | Señales de control (PWM, pines) |
| Verde | Datos (UART, I2C, Bluetooth) |

:::animacion tipo="diagrama-bloques" sistema="robot" ocultar="si"
:::

Dibuja el diagrama completo con estos bloques:

1. Primero completen la tabla: en **Entradas**, qué recibe cada bloque (energía o señales) y en **Salidas**, qué entrega. La primera fila es un ejemplo.
2. En una hoja grande, dibujen un rectángulo por bloque, agrupando los del mando a un lado y los del robot al otro.
3. Unan los bloques con flechas del color que corresponde a lo que viaja por ellas. El enlace Bluetooth entre los dos HC-05 es una flecha verde que cruza de un lado al otro.

:::tabla id="g2-bloques"
| Bloque | Nodo | Entradas | Salidas |
| --- | --- | --- | --- |
| Joystick | Mando | 5 V | 2 señales analógicas (A0, A1) |
| Arduino del mando | Mando | | |
| Pantalla OLED | Mando | | |
| HC-05 maestro | Mando | | |
| HC-05 esclavo | Robot | | |
| Arduino del robot | Robot | | |
| Puente H TB6612FNG | Robot | | |
| 2 motores DC | Robot | | |
| HC-SR04 | Robot | | |
| Batería 7,4 V + fusible | Robot | | |
| Regulador LM2596 (5 V) | Robot | | |
| Divisor de batería | Robot | | |
:::

[IMAGEN 2.1: diagrama de bloques del robot y el mando con flechas de potencia, lógica, control y datos en colores]

Tomen una foto del diagrama y súbanla:

:::foto id="g2-diagrama"
Foto del diagrama de bloques del equipo.
:::

## Parte 2 · El protocolo (20 min)

Un **protocolo** es un acuerdo sobre cómo se escriben los mensajes. El nuestro usa texto separado por comas y termina con salto de línea `\n`:

| Mensaje | Dirección | Significado | Ejemplo |
| --- | --- | --- | --- |
| `M,izq,der` | Mando → Robot | Velocidad de cada motor (−255 a 255) | `M,150,-80` |
| `T,bat,dist` | Robot → Mando | Batería (V) y distancia (cm) | `T,7.4,32` |

:::pregunta id="g2-p1"
¿Para qué sirve la letra inicial (M o T)? ¿Y el salto de línea final?
:::

:::pregunta id="g2-p2"
El mando envía `M,150,-80`. ¿Qué hace el robot: avanza, retrocede o gira? ¿Hacia qué lado?
:::

## Parte 3 · Presupuesto de energía (25 min)

Antes de elegir la batería calculamos cuánta corriente consume todo:

En cada fila, **Total** = corriente × cantidad. En la última fila sumen todos los totales.

:::tabla id="g2-energia"
| Componente | Corriente típica (mA) | Cantidad | Total (mA) |
| --- | --- | --- | --- |
| Motor DC con carga | 250 | 2 | |
| Arduino UNO | 50 | 1 | |
| HC-05 | 40 | 1 | |
| HC-SR04 | 15 | 1 | |
| TB6612FNG (lógica) | 2 | 1 | |
| Total del robot | | | |
:::

> Autonomía (h) ≈ capacidad de la batería (mAh) × 0,8 ÷ corriente total (mA)

:::pregunta id="g2-p3"
Con una batería 2S de 2000 mAh, ¿cuántos minutos durará el robot? ¿Por qué multiplicamos por 0,8?
:::

**Regla de oro del nivel:** la potencia (motores) y la lógica (Arduino) van **separadas**, pero con la **tierra en común**.

## Parte 4 · Simular el intérprete en Wokwi (30 min)

Antes de tener el robot, probamos que el Arduino entienda los mensajes. En Wokwi (Arduino Uno, sin componentes) escribimos los mensajes a mano en el Monitor serie:

La página de Wokwi está en inglés; aquí van los nombres tal como aparecen.

1. En **wokwi.com**, inicien sesión, bajen hasta **Start from Scratch** y elijan **Arduino Uno**. No hace falta agregar componentes.
2. En la pestaña `sketch.ino`, borren lo que trae y escriban el programa de abajo.
3. Presionen **Play** (botón verde ▶). Abajo aparece el Monitor serie.
4. Escriban cada mensaje de la tabla en la caja del monitor y presionen **Enter**. Wokwi agrega el salto de línea solo.

```cpp
String buffer = "";

void procesar(String m) {
  int c1 = m.indexOf(',');
  int c2 = m.indexOf(',', c1 + 1);
  if (m[0] != 'M' || c1 < 0 || c2 < 0) {
    Serial.println("Mensaje invalido: " + m);
    return;
  }
  int izq = constrain(m.substring(c1 + 1, c2).toInt(), -255, 255);
  int der = constrain(m.substring(c2 + 1).toInt(), -255, 255);
  Serial.print("Izq: ");
  Serial.print(izq);
  Serial.print("  Der: ");
  Serial.println(der);
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\n') {
      procesar(buffer);
      buffer = "";
    } else if (c != '\r') {
      buffer += c;
    }
  }
}
```

Copien en **Resultado obtenido** lo que respondió el monitor:

:::tabla id="g2-simulacion"
| Mensaje escrito | Resultado esperado | Resultado obtenido |
| --- | --- | --- |
| M,150,-80 | Izq 150, Der −80 | |
| M,300,0 | Izq 255 (limitado) | |
| X,10,10 | Inválido | |
| M,100 | Inválido | |
| M,-255,-255 | Atrás a fondo | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] El diagrama de bloques tiene todos los bloques y tipos de flecha.
- [ ] Documentamos el protocolo.
- [ ] Calculamos el presupuesto de energía y la autonomía.
- [ ] El intérprete funciona en Wokwi con mensajes válidos e inválidos.
:::

## Reto extra

Agrega al intérprete un mensaje `P` (parar) que ponga los dos motores en 0.

Pista: al inicio de `procesar()`, antes de revisar si empieza con `M`, revisen si `m[0]` es `'P'`; si lo es, impriman "Izq: 0  Der: 0" y terminen con `return;`.

## Bitácora (10 min)

:::tabla id="g2-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

Guarden con **Save** y descarguen el proyecto como `.zip` (menú de la flecha junto a **Save** → **Download project zip**) para subirlo aquí.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g2-p2: izquierdo adelante y derecho atrás → gira sobre su eje hacia la derecha.
- g2-p3: total ≈ 607 mA; 2000 × 0,8 ÷ 607 ≈ 2,6 h ≈ 158 min. El 0,8 es margen: la batería no se descarga al 100 % y la corriente real varía.
- En Wokwi el Monitor serie debe enviar con salto de línea (por defecto lo hace).
- Tiempo total: 30 + 20 + 25 + 30 + 5 + 10 = 120 minutos.
:::
