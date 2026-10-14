---
titulo: Gato, perro pequeño o perro grande
guia: 8
sabado: 8
sesion: Preparación de presentación
duracion: 120
---

# Guía 8 · Gato, perro pequeño o perro grande

## Objetivo del día

Agregar un selector de tamaño de mascota y el horario automático, cargar el código final y preparar la presentación.

**Al terminar tendremos:** el dispensador sirviendo tres tamaños de porción y comidas automáticas, y el guion de la presentación listo.

## Materiales del equipo

- Dispensador completo
- Potenciómetro de 10 kΩ (el selector)
- Etiquetas: Gato · Perro pequeño · Perro grande
- Cartulina y marcadores

## Parte 1 · Porciones con proporción (15 min)

Una mascota más grande necesita más comida. Usaremos estas porciones de práctica:

En la última columna escriban cuántas veces cabe la porción del gato (30 g) en cada porción. Se calcula dividiendo la porción entre 30.

| Mascota | Porción (g) | ¿Cuántas veces la porción del gato? |
| --- | --- | --- |
| Gato | 30 | 1 |
| Perro pequeño | 60 | |
| Perro grande | 120 | |

Busquen su valor de MS_POR_GRAMO en la Guía 7 (Parte 2) para responder:

:::pregunta id="g8-p1"
Con tu valor de MS_POR_GRAMO, ¿cuántos milisegundos debe abrir la compuerta para el perro grande?
:::

## Parte 2 · El selector (20 min)

El **potenciómetro** es una perilla: el Arduino la lee como un número de 0 a 1023. La dividimos en **tres zonas**:

Muevan la perilla de la animación y miren en qué zona cae cada número:

:::animacion tipo="selector"
:::

| Zona | Valor de la perilla | Mascota |
| --- | --- | --- |
| 1 | 0 a 340 | Gato |
| 2 | 341 a 681 | Perro pequeño |
| 3 | 682 a 1023 | Perro grande |

Conecta el potenciómetro: pata izquierda → **5V**, centro → **A0**, pata derecha → **GND**. Pega las etiquetas alrededor de la perilla.

1. Desconecta el USB.
2. Clava el potenciómetro en la protoboard, cada pata en una fila corta distinta.
3. Míralo de frente (perilla hacia ti, patas abajo): **pata izquierda** → fila **+**; **pata derecha** → fila **−**; **pata del centro** → pin **A0** (en la fila ANALOG IN del Arduino).
4. Pega las etiquetas: **Gato** donde la perilla está girada a un extremo, **Perro grande** en el otro extremo y **Perro pequeño** en medio. En la Parte 3, cuando el programa funcione, comprueben con el Monitor serie que cada etiqueta quedó en su lugar (si están al revés, cámbienlas de lado).

[IMAGEN 8.1: potenciómetro con las etiquetas Gato, Perro pequeño y Perro grande alrededor de la perilla]

## Parte 3 · El código final (30 min)

Este código junta todo: porción según la perilla, botón manual y horario automático. Escribe tus valores en **Ajustes del equipo**:

1. Conecta el USB, **Archivo → Nuevo boceto**, borra lo que trae y escribe el programa completo de abajo.
2. En **Ajustes del equipo** cambia: `ABIERTA` por el ángulo que les funcionó (70 o 90) y `MS_POR_GRAMO` por su valor de la Guía 7.
3. Guárdalo como `equipo_NOMBRE_final`, verifica (✓) y súbelo (→).

```cpp
// Dispensador de comida para mascotas
// STEAM Robotics Academy · Básico · Docente: Bairon Alas

#include <Servo.h>
Servo compuerta;

// --- Pines ---
const int BOTON = 2;
const int LED = 4;
const int BUZZER = 5;
const int SERVO_PIN = 9;
const int SELECTOR = A0;  // tamaño

// --- Ajustes del equipo ---
const int CERRADA = 0;
const int ABIERTA = 70;
const int MS_POR_GRAMO = 20;  // medir
const unsigned long INTERVALO = 60000;

unsigned long ultimaComida = 0;
int comidasHoy = 0;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  compuerta.attach(SERVO_PIN);
  compuerta.write(CERRADA);
  Serial.begin(9600);
}

// Porción según la perilla
int gramosSegunTamano() {
  int v = analogRead(SELECTOR);
  if (v < 341) return 30;   // gato
  if (v < 682) return 60;   // perro pequeño
  return 120;               // perro grande
}

void servir() {
  int gramos = gramosSegunTamano();
  tone(BUZZER, 1500, 300);  // llamar
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(gramos * MS_POR_GRAMO);  // proporción
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
  comidasHoy++;
  Serial.print("Comida ");
  Serial.print(comidasHoy);
  Serial.print(": ");
  Serial.print(gramos);
  Serial.println(" g");
}

void loop() {
  // 1. Horario automático
  if (millis() - ultimaComida >= INTERVALO) {
    servir();
    ultimaComida = millis();
  }

  // 2. Botón manual
  if (digitalRead(BOTON) == LOW) {
    servir();
    delay(500);  // evitar doble toque
  }
}
```

En clase, `INTERVALO = 60000` (una comida cada minuto) para verlo funcionar. En una casa serían varias horas.

`60000` son milisegundos: 60 000 ms = 60 segundos = 1 minuto.

4. Abre el **Monitor serie** (lupa, arriba a la derecha) a **9600 baudios**. Cada vez que sirve, escribe el número de la comida y los gramos.
5. **Prueba:** para cada fila, pon la perilla en la etiqueta, presiona el botón, pesa en la báscula (con tara) y anota. Para la comida automática, no toquen nada y esperen: al pasar el minuto debe servir sola; en "Gramos esperados" escriban la porción de la etiqueta donde dejaron la perilla.

:::tabla id="g8-pruebas"
| Prueba | Gramos esperados | Gramos reales | ¿Bien? |
| --- | --- | --- | --- |
| Gato con el botón | 30 | | |
| Perro pequeño con el botón | 60 | | |
| Perro grande con el botón | 120 | | |
| Comida automática (esperar 1 min) | | | |
:::

:::pregunta id="g8-p2"
¿Qué hace la línea `if (millis() - ultimaComida >= INTERVALO)`?
:::

## Parte 4 · Guion y cartel (40 min)

La presentación dura 5 minutos. Repartan las partes (una persona puede tener dos) y escriban en **¿Qué se dice o se muestra?** 2 o 3 ideas cortas para cada una. Ensayen con cronómetro.

:::tabla id="g8-guion"
| Parte | Tiempo | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- | --- |
| El problema: mascotas solas en casa | 1 min | | |
| Mecanismo, embudo y diseño 3D | 1 min | | |
| El experimento tiempo contra gramos | 1 min | | |
| El circuito y el código | 1 min | | |
| Demostración: tres porciones y horario | 1 min | | |
:::

El cartel lleva: nombre del equipo, foto del dispensador, la gráfica del experimento, la tabla de porciones y la ficha técnica.

- Primero repartan el espacio a lápiz; después pasen a marcador.
- Título grande (que se lea a tres pasos) y frases cortas.
- La gráfica y la ficha técnica las pueden imprimir o copiar a mano desde la Guía 7.

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] El selector cambia la porción.
- [ ] El horario automático funciona.
- [ ] Probamos las tres porciones con la báscula.
- [ ] El guion tiene responsables.
:::

## Bitácora (10 min)

:::pregunta id="g8-b1"
¿Por qué usamos una perilla en vez de tres botones?
:::

Antes de irse, guarden `equipo_NOMBRE_final` y súbanlo aquí: es el programa de la presentación.

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Las porciones son de práctica para clase; en una casa real se usa la tabla de la bolsa de comida o lo que indique el veterinario.
- g8-p2: revisa si ya pasó el intervalo desde la última comida, sin detener el programa (a diferencia de `delay`).
- Si el perro grande (120 g) vacía el depósito, llenar más la botella para la demostración.
- Tiempo total: 15 + 20 + 30 + 40 + 5 + 10 = 120 minutos.
:::
