---
titulo: Servir con un botón
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Servir con un botón

## Objetivo del día

Conectar el servo, el botón, el LED y el buzzer al dispensador y programar el servido manual con una función.

**Al terminar tendremos:** el dispensador sirviendo comida al presionar el botón, con sonido y luz de aviso.

## Materiales del equipo

- Dispensador armado (sábado 4)
- Botón, LED con resistencia de 220 Ω, buzzer
- Arduino UNO, protoboard, cables largos
- Croquetas y plato

## Parte 1 · El circuito completo (30 min)

Hagan todo con el Arduino **desconectado**. Usen cables largos para que el servo alcance la compuerta.

1. **Energía en la protoboard:** cable del **5V** del Arduino a la fila **+**, y de un **GND** a la fila **−**.
2. **Servo:** naranja → **D9**, rojo → fila **+**, café → fila **−**.
3. **Botón:** sobre la canaleta del centro de la protoboard; dos patas en diagonal: una → **D2**, la otra → fila **−**.
4. **LED:** pata larga → resistencia de 220 Ω → **D4**; pata corta → fila **−**.
5. **Buzzer:** pata **+** (marcada con + o la más larga) → **D5**; pata **−** → fila **−**.

| Componente | Conexión |
| --- | --- |
| Servo | Naranja → D9 · Rojo → 5V · Café → GND |
| Botón | D2 y GND |
| LED | 220 Ω → D4 · pata corta → GND |
| Buzzer | + → D5 · − → GND |

Coloca el botón, el LED y el buzzer en el **frente** del dispensador, donde se vean.

- Si la protoboard tiene pegamento por detrás, pueden pegarla en el frente de la base; si no, fíjenla con cinta doble cara.
- El Arduino va a un lado, en el espacio que dejaron en la base.

[IMAGEN 5.1: frente del dispensador con el botón, el LED y el buzzer, y el Arduino a un lado]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones" circuito="dispensador"
:::

## Parte 2 · Una función para servir (35 min)

Una **función** es un grupo de instrucciones con nombre. La escribimos una vez y la usamos cuantas veces queramos.

1. Conecta el USB, abre Arduino IDE y elige **Arduino Uno** y su puerto en **Seleccionar placa**.
2. **Archivo → Nuevo boceto**, borra lo que trae y escribe este programa completo:

```cpp
#include <Servo.h>
Servo compuerta;

const int BOTON = 2;
const int LED = 4;
const int BUZZER = 5;
const int CERRADA = 0;
const int ABIERTA = 70;
const int TIEMPO_ABIERTA = 1000;   // ms

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  compuerta.attach(9);
  compuerta.write(CERRADA);
}

// Sirve una porción de comida
void servir() {
  tone(BUZZER, 1500, 300);     // llamar a la mascota
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(TIEMPO_ABIERTA);
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
}

void loop() {
  if (digitalRead(BOTON) == LOW) {
    servir();
    delay(500);                 // evitar doble toque
  }
}
```

3. Guárdalo como `equipo_NOMBRE_servir` (**Archivo → Guardar como**), verifica (✓) y súbelo (→).

Fíjate en las líneas `const int …` del principio: son **constantes**, números con nombre. Si queremos cambiar cuánto se abre la compuerta, solo cambiamos `ABIERTA` en un lugar.

:::pregunta id="g5-p1"
¿Qué ventaja tiene poner todo en la función `servir()` en vez de escribirlo dentro del `loop`?
:::

## Parte 3 · Primeras pruebas (35 min)

Llena la botella hasta la mitad. Presiona el botón 5 veces y observa:

Pongan el plato debajo de la salida y una bandeja debajo de todo. Después de cada prueba, vacíen el plato.

:::tabla id="g5-pruebas"
| Prueba | ¿Sonó y se encendió el LED? | ¿Cayó comida? | ¿Se atascó? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
:::

[IMAGEN 5.2: croquetas cayendo al plato con la compuerta abierta y el LED encendido]

Si se atasca, prueba abrir más la compuerta (ABIERTA = 90) o abrirla dos veces seguidas:

- **Abrir más:** en la línea `const int ABIERTA = 70;` cambia el 70 por 90, sube el código y prueba otra vez.
- **Abrir dos veces:** dentro del `if` del `loop`, escribe `servir();` dos veces seguidas.

| ABIERTA | ¿Se atascó? |
| --- | --- |
| 70 | |
| 90 | |

Antes de seguir, revisen que con 90 la compuerta no choque con nada. Si choca, regresen a 70.

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] El circuito está completo.
- [ ] La función `servir()` funciona.
- [ ] El botón sirve comida con sonido y luz.
- [ ] Hicimos 5 pruebas.
:::

## Reto extra

Haz una melodía para llamar a la mascota: tres notas seguidas (`tone` y `delay`) en vez de un solo pitido.

Pista: en `servir()`, cambia la línea de `tone` por tres líneas `tone(BUZZER, nota, 200);`, cada una seguida de `delay(250);`. Prueben notas entre 500 (grave) y 2000 (aguda).

## Bitácora (15 min)

:::foto id="g5-foto"
Video corto del dispensador sirviendo con el botón.
:::

:::pregunta id="g5-b1"
¿Qué es una función en programación? Explícalo con tus palabras.
:::

Antes de irse, guarden `equipo_NOMBRE_servir` (**Ctrl + S**) y súbanlo aquí: lo usarán el próximo sábado.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Hacer las pruebas sobre una bandeja o caja: las croquetas ruedan por todos lados.
- Si el servo no tiene fuerza para abrir con mucha comida encima, llenar menos la botella o usar MG90S.
- Tiempo total: 30 + 35 + 35 + 5 + 15 = 120 minutos.
:::
