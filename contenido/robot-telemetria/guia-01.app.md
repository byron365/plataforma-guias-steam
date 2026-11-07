---
titulo: El robot y el celular conversan
guia: 1
sabado: 1
sesion: Definición del proyecto
duracion: 120
---

# Guía 1 · El robot y el celular conversan

## Objetivo del día

Definir los requisitos del robot y de la app, decidir qué datos viajan en cada dirección y hacer que el Arduino obedezca mensajes de texto.

**Al terminar tendremos:** la tabla de requisitos, los roles del equipo y un Arduino que obedece órdenes escritas en el Monitor serie.

## Materiales del equipo

- Arduino UNO con cable USB
- Computadora con Arduino IDE

## Parte 1 · El proyecto (15 min)

Construiremos un **robot con dos motores DC** que se maneja desde una **app en un celular Android**, hecha por nosotros en **MIT App Inventor**. El robot y el celular se comunican por **Bluetooth**: la app envía órdenes y el robot responde con **telemetría** (voltaje de batería y distancia a obstáculos).

Miren en la animación qué viaja de la app al robot y del robot a la app:

:::animacion tipo="protocolo" sistema="robot-app"
:::

Esto es un **sistema distribuido**: el celular y el Arduino, cada uno con su responsabilidad, cooperan por un enlace de comunicación.

## Parte 2 · Roles del equipo (10 min)

| Rol | Responsabilidad | Nombre |
| --- | --- | --- |
| Arquitecto | Diagrama de bloques, flujo de señales y presupuesto de energía | |
| Ingeniero de potencia | Batería, regulador, puente H y protecciones | |
| Ingeniero de comunicaciones | Protocolo, HC-05 y la app | |
| Programador e integrador | Código del robot, bloques de la app, pruebas y corrección de fallos | |

Repártanse los cuatro roles y escriban cada nombre en la columna **Nombre**. Si el equipo tiene menos de cuatro integrantes, alguien toma dos roles.

Nombre del equipo: ______

## Parte 3 · Requisitos (25 min)

Un **requisito** es algo que el sistema **debe** cumplir y que se puede comprobar.

1. Para R1 a R3, escriban en la última columna cómo lo comprobarían. Ejemplo para R1: "Presionamos cada botón de la app y miramos si el robot hace lo mismo".
2. En R4, R5 y R6 escriban tres requisitos más que propongan ustedes. En **Tipo** pongan funcional (lo que hace), seguridad (lo que evita accidentes) o rendimiento (qué tan rápido, lejos o cuánto dura).

:::tabla id="g1-requisitos"
| N.º | Requisito | Tipo (funcional / seguridad / rendimiento) | ¿Cómo lo comprobaremos? |
| --- | --- | --- | --- |
| R1 | El robot avanza, retrocede y gira según los botones de la app | Funcional | |
| R2 | Si el robot pierde la señal, se detiene en menos de 1 s | Seguridad | |
| R3 | La app muestra la batería del robot | Funcional | |
| R4 | | | |
| R5 | | | |
| R6 | | | |
:::

Ahora decidan qué datos viajan. En **¿Cada cuánto?** escriban cada cuánto tiempo creen que hace falta enviar ese dato (por ejemplo, "10 veces por segundo" o "cada segundo"). Completen los rangos que faltan.

:::tabla id="g1-datos"
| Dirección | ¿Qué dato viaja? | ¿Cada cuánto? | Rango de valores |
| --- | --- | --- | --- |
| App → Robot | Velocidad del motor izquierdo | | −255 a 255 |
| App → Robot | Velocidad del motor derecho | | |
| Robot → App | Voltaje de la batería | | |
| Robot → App | Distancia al obstáculo | | |
:::

:::pregunta id="g1-p1"
¿Por qué R2 es un requisito de seguridad y qué podría pasar si no se cumple?
:::

## Parte 4 · El Arduino recibe órdenes (45 min)

El **UART** envía datos bit a bit por un cable (TX) y los recibe por otro (RX). El UNO tiene un solo UART (pines 0 y 1) y lo usa el USB: por ahí la computadora le habla al Arduino. Hoy el **Monitor serie** hace de celular: lo que escribamos ahí le llega al Arduino como una orden.

Miren en la animación cómo viaja una letra bit por bit:

:::animacion tipo="uart"
:::

Vamos a encender y apagar el LED que ya trae la placa junto al pin 13 (marcado **L**).

1. Conecten el Arduino por USB. En Arduino IDE, en **Seleccionar placa**, elijan **Arduino Uno** y su puerto (COM…).
2. **Archivo → Nuevo**, escriban el código, guárdenlo como `equipo_NOMBRE_uart`, verifiquen (✓) y suban (→).
3. Abran el **Monitor serie** (la lupa arriba a la derecha), a **9600 baudios** y con **Nueva línea** en la lista de al lado: así cada mensaje termina con un salto de línea.

```cpp
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);            // al monitor
}

void loop() {
  // Recibir: mostrar y actuar
  if (Serial.available()) {
    String m = Serial.readStringUntil('\n');
    Serial.println("Recibí: " + m);
    if (m.startsWith("LED,1")) digitalWrite(13, HIGH);
    if (m.startsWith("LED,0")) digitalWrite(13, LOW);
  }
}
```

Para enviar texto, escríbanlo en la caja de arriba del Monitor serie y presionen **Enter**. Hagan cada prueba y anoten qué pasó:

:::tabla id="g1-pruebas"
| Mensaje | ¿Qué hizo el LED? | ¿Qué respondió el Arduino? |
| --- | --- | --- |
| `LED,1` | | |
| `LED,0` | | |
| `led,1` | | |
| `HOLA` | | |
:::

:::pregunta id="g1-p2"
¿Por qué `led,1` no enciende el LED? ¿Qué nos dice eso sobre los mensajes que enviará la app?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Tenemos roles.
- [ ] Escribimos al menos 6 requisitos comprobables.
- [ ] Definimos qué datos viajan en cada dirección.
- [ ] El Arduino obedece los mensajes del Monitor serie.
:::

## Reto extra

Envía desde el Monitor serie el mensaje `PWM,128` y haz que el Arduino ajuste el brillo de un LED en D9 con ese valor (`analogWrite`). Pista: `m.substring(4).toInt()`.

El LED de D9 va con su resistencia de 220 Ω (pata larga hacia D9, pata corta a GND). Agreguen `pinMode(9, OUTPUT);` en el `setup()` y, debajo de las líneas del LED en el `loop()`, otra línea parecida que revise si el mensaje empieza con `PWM,`.

## Bitácora (20 min)

La **bitácora de fallos** acompaña todo el proyecto: cada vez que algo no funcione, anoten el síntoma (qué se ve), la causa (por qué pasó) y la solución (qué hicieron).

:::tabla id="g1-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::pregunta id="g1-b1"
¿Qué ventajas y desventajas tiene usar un celular como mando en lugar de construir uno?
:::

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con app (9 sábados), nueva el 6 de noviembre:** el mando físico se reemplaza por una **app de Android hecha en MIT App Inventor** (decisión de Bairon: más barato y más simple). Esta guía usa un solo Arduino: en lugar de unir dos por cable, el Monitor serie hace de celular. Mismos campos que la Guía 1 normal.
- La bitácora de fallos (síntoma, causa, solución) acompaña todo el proyecto: insistir en llenarla cada sábado; es la mejor evidencia de aprendizaje del nivel.
- `readStringUntil` tiene un tiempo de espera de 1 s por defecto; aquí basta. En el robot se usará lectura carácter por carácter, que no bloquea.
- g1-p2: el Arduino compara letra por letra y distingue mayúsculas de minúsculas; la app tendrá que enviar los mensajes exactamente como los espera el código.
- Tiempo total: 15 + 10 + 25 + 45 + 5 + 20 = 120 minutos.
:::
