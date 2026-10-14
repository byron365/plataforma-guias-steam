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

**¡Ojo!** Las dos hojas giran en **sentidos contrarios**, porque los servos están mirándose. Por eso a uno le damos el ángulo `a` y al otro `180 - a`:

Muevan la animación y fíjense en el ángulo que recibe cada servo:

:::animacion tipo="espejo-servos"
:::

:::pregunta id="g5-p1"
Si la hoja izquierda está en 30°, ¿qué ángulo recibe el servo derecho?
:::

1. **Centra los servos en 0°** antes de montar: sube un código con `izq.write(0); der.write(0);` en el `setup()`.
   - **Importante:** por lo que acaban de ver, con el puente cerrado el servo **izquierdo** está en 0° pero el **derecho** está en **180°**. Si los centran los dos en 0°, la hoja derecha daría media vuelta al encender el programa.
   - Por eso, hagan esto: con el Arduino desconectado, conecten **solo los dos servos**: izquierdo naranja → **D9**, derecho naranja → **D10**; los dos rojos → **5V** y los dos cafés → **GND** (usen las filas **+** y **−** de la protoboard).
   - Escriban el programa de la **Parte 3** (más abajo), súbanlo y **no presionen** ningún botón. En su `setup()` pone el puente cerrado: izquierdo en 0° y derecho en 180°.
   - Esperen a que los servos se queden quietos y desconecten el USB. No giren los ejes con la mano.
2. Mete cada servo en su soporte.
   - El izquierdo en el soporte de la torre izquierda y el derecho en el de la derecha. Márquenlos con cinta (I y D).
3. Coloca el brazo (horn) del servo en el encastre de la hoja, con la hoja **plana** (cerrada).
   - Metan el brazo en el agujero del encastre de la hoja y encájenlo en el eje del servo, con la hoja acostada sobre el río (cerrada).
4. Fija el brazo a la hoja con un tornillo pequeño o silicona.
   - Pongan también el tornillo central del eje del servo.

[IMAGEN 5.1: servo dentro de su soporte con el brazo unido al encastre de la hoja]

## Parte 2 · El circuito completo (30 min)

Hagan todo con el USB desconectado. Los servos ya están conectados; agreguen lo demás:

| Componente | Conexión |
| --- | --- |
| LED verde / amarillo / rojo | D2 / D3 / D4 (con 220 Ω) → GND |
| Buzzer | + → D5 · − → GND |
| Botón | Una pata → D6 · otra → GND |
| Servo izquierdo | Naranja → D9 · Rojo → 5V · Café → GND |
| Servo derecho | Naranja → D10 · Rojo → 5V · Café → GND |

- **Semáforo:** igual que en la Guía 1. Cada LED: pata larga → resistencia de 220 Ω → su pin; pata corta → fila **−**.
- **Buzzer:** la pata **+** (marcada con + o la más larga) → pin **5**; la otra → fila **−**.
- **Botón:** sobre la canaleta del centro de la protoboard. Dos patas en **diagonal**: una → pin **6**; la otra → fila **−**.
- Usen cables largos para llegar a los servos, a las torres y al semáforo.

[IMAGEN 5.2: circuito completo en la protoboard con semáforo, buzzer, botón y los dos servos]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones" circuito="puente-boton"
:::

## Parte 3 · La secuencia con botón (35 min)

Si ya escribieron el programa en la Parte 1, solo ábranlo. Si no: conecten el USB, elijan **Arduino Uno** y su puerto en **Seleccionar placa**, creen un programa nuevo, borren lo que trae y escriban:

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

1. Guárdalo como `equipo_NOMBRE_boton`, verifica (✓) y súbelo (→). Debe encenderse la luz verde.
2. Presiona el botón una vez y observa la secuencia completa. Marquen cada fila de la tabla.

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

Pista: en vez de `delay(TIEMPO_ARRIBA);`, un `for` que se repita varias veces con un pitido corto (`tone`) y una pausa en cada vuelta. Hagan que el tiempo total sea parecido a 4 segundos.

## Bitácora (20 min)

:::foto id="g5-foto"
Video corto del puente subiendo con el botón.
:::

:::pregunta id="g5-b1"
¿Qué hace la función `ponerAngulo()` y por qué usa `180 - a`?
:::

Antes de irse, guarden `equipo_NOMBRE_boton` (**Ctrl + S**) y súbanlo aquí: el próximo sábado lo van a usar.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g5-p1: 180 − 30 = 150°.
- Dos SG90 sin carga funcionan desde el 5V del Arduino; si el Arduino se reinicia al moverlos, usar portapilas de 4 AA uniendo su GND con el del Arduino.
- Si las hojas no quedan planas en 0°, quitar el brazo y girarlo un diente; o cambiar el ángulo de "abajo" en el código.
- Tiempo total: 30 + 30 + 35 + 5 + 20 = 120 minutos.
:::
