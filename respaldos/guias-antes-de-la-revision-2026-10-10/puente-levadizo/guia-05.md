---
titulo: El puente sube con un botón
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · El puente sube con un botón

## Objetivo del día

Montar los servos y las hojas, conectar el semáforo, el buzzer y un botón, y programar la secuencia completa en modo manual.

**Al terminar tendremos:** el puente haciendo toda su secuencia (alarma, semáforo, subir, esperar, bajar) al presionar un botón.

## Materiales del equipo

- Base con torres (sábado 4)
- 2 servos SG90, 2 hojas impresas
- Semáforo (LEDs y resistencias), buzzer, botón
- Arduino UNO, protoboard, cables largos
- Tornillos pequeños, silicona

## Parte 1 · Montar servos y hojas (30 min)

1. **Centra los servos en 0°** antes de montar: sube un código con `izq.write(0); der.write(0);` en el `setup()`.
2. Mete cada servo en su soporte.
3. Coloca el brazo (horn) del servo en el encastre de la hoja, con la hoja **plana** (cerrada).
4. Fija el brazo a la hoja con un tornillo pequeño o silicona.

[IMAGEN 5.1: servo dentro de su soporte con el brazo unido al encastre de la hoja]

**¡Ojo!** Las dos hojas giran en **sentidos contrarios**, porque los servos están mirándose. Por eso a uno le damos el ángulo `a` y al otro `180 - a`:

:::animacion tipo="espejo-servos"
:::

:::pregunta id="g5-p1"
Si la hoja izquierda está en 30°, ¿qué ángulo recibe el servo derecho?
:::

## Parte 2 · El circuito completo (30 min)

| Componente | Conexión |
| --- | --- |
| LED verde / amarillo / rojo | D2 / D3 / D4 (con 220 Ω) → GND |
| Buzzer | + → D5 · − → GND |
| Botón | Una pata → D6 · otra → GND |
| Servo izquierdo | Naranja → D9 · Rojo → 5V · Café → GND |
| Servo derecho | Naranja → D10 · Rojo → 5V · Café → GND |

[IMAGEN 5.2: circuito completo en la protoboard con semáforo, buzzer, botón y los dos servos]

:::animacion tipo="conexiones" circuito="puente-boton"
:::

## Parte 3 · La secuencia con botón (35 min)

```cpp
#include <Servo.h>
Servo izq, der;

const int VERDE = 2, AMARILLO = 3, ROJO = 4, BUZZER = 5, BOTON = 6;
const int ANGULO_ARRIBA = 75;   // grados
const int TIEMPO_ARRIBA = 4000; // ms
const int VELOCIDAD = 25;       // ms por grado

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(ROJO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BOTON, INPUT_PULLUP);
  izq.attach(9);
  der.attach(10);
  ponerAngulo(0);
  digitalWrite(VERDE, HIGH);
}

// Mueve las dos hojas en espejo
void ponerAngulo(int a) {
  izq.write(a);
  der.write(180 - a);
}

// Mueve el puente despacio de un ángulo a otro
void moverPuente(int desde, int hasta) {
  int paso = (hasta > desde) ? 1 : -1;
  for (int a = desde; a != hasta; a += paso) {
    ponerAngulo(a);
    delay(VELOCIDAD);
  }
  ponerAngulo(hasta);
}

void loop() {
  if (digitalRead(BOTON) == LOW) {   // botón presionado
    digitalWrite(VERDE, LOW);
    digitalWrite(AMARILLO, HIGH);
    tone(BUZZER, 1000, 1500);        // alarma
    delay(2000);
    digitalWrite(AMARILLO, LOW);
    digitalWrite(ROJO, HIGH);
    moverPuente(0, ANGULO_ARRIBA);
    delay(TIEMPO_ARRIBA);
    moverPuente(ANGULO_ARRIBA, 0);
    digitalWrite(ROJO, LOW);
    digitalWrite(VERDE, HIGH);
  }
}
```

| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Al presionar, se enciende el amarillo y suena la alarma | | |
| Después se enciende el rojo | | |
| Las dos hojas suben juntas | | |
| Esperan arriba y bajan | | |
| Vuelve el verde | | |

:::pregunta id="g5-p2"
Si una hoja sube y la otra baja, ¿qué parte del código o del montaje hay que revisar?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] Las hojas están montadas en los servos.
- [ ] El circuito completo está conectado.
- [ ] El botón inicia la secuencia completa.
- [ ] Las dos hojas se mueven en espejo.
:::

## Reto extra

Haz que la alarma suene **intermitente** (pitidos cortos) mientras el puente está arriba.

## Bitácora (20 min)

:::foto id="g5-foto"
Video corto del puente subiendo con el botón.
:::

:::pregunta id="g5-b1"
¿Qué hace la función `ponerAngulo()` y por qué usa `180 - a`?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g5-p1: 180 − 30 = 150°.
- Dos SG90 sin carga funcionan desde el 5V del Arduino; si el Arduino se reinicia al moverlos, usar portapilas de 4 AA uniendo su GND con el del Arduino.
- Si las hojas no quedan planas en 0°, quitar el brazo y girarlo un diente; o cambiar el ángulo de "abajo" en el código.
- Tiempo total: 30 + 30 + 35 + 5 + 20 = 120 minutos.
:::
