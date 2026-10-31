---
titulo: El puente sube con un botón
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · El puente sube con un botón

## Objetivo del día

Conectar el semáforo, el buzzer y un botón al puente armado, planear la secuencia con un diagrama de flujo y programarla en modo manual.

**Al terminar tendremos:** el puente haciendo toda su secuencia (alarma, semáforo, subir, esperar, bajar) al presionar un botón, y las torres pegadas.

## Materiales del equipo

- Puente armado (sábado 4), con los servos conectados y los LEDs y el buzzer en sus torres
- Botón y 3 resistencias de 220 Ω
- Arduino UNO, protoboard, cables macho–macho y macho–hembra
- Cinta adhesiva, pistola de silicona
- Bitácora

## Parte 1 · El circuito completo (30 min)

Hagan todo con el USB desconectado. Los servos ya están conectados desde el sábado 4; agreguen lo demás:

| Componente | Conexión |
| --- | --- |
| LED verde / amarillo / rojo | D2 / D3 / D4 (con 220 Ω) → GND |
| Buzzer | + → D5 · − → GND |
| Botón | Una pata → D6 · otra → GND |
| Servo izquierdo (orilla B) | Naranja → D9 · Rojo → 5V · Café → GND |
| Servo derecho (orilla A) | Naranja → D10 · Rojo → 5V · Café → GND |

- **Semáforo:** igual que en la Guía 1, pero las patas de los LEDs llegan con los cables que salen de la torre.
  - El cable de la pata larga va a una fila libre de la protoboard. En esa fila, una resistencia de 220 Ω, y del otro lado de la resistencia, un cable a su pin.
  - El cable de la pata corta va a la fila **−**.
- **Buzzer:** el cable de la pata **+** (el que marcaron con cinta) → pin **5**; el otro → fila **−**.
- **Botón:** sobre la canaleta del centro de la protoboard. Dos patas en **diagonal**: una → pin **6**; la otra → fila **−**.
- **Cables de la orilla B:** los del servo izquierdo y los del buzzer cruzan el río por el borde de atrás de la base. Péguenlos planos con cinta para que el barco pase sin engancharse.
  - Si un cable macho–hembra no alcanza, únanlo con otro: la punta macho de uno entra en la hembra del otro.
  - Si el cable del servo no alcanza, alárguenlo con cables macho–macho (entran en el conector del servo).

[IMAGEN 5.2: circuito completo en la protoboard con semáforo, buzzer, botón y los dos servos]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones" circuito="puente-boton"
:::

## Parte 2 · La secuencia del puente (20 min)

Antes de programar, planeamos los pasos. Hoy los pasos 1 y 2 los hace un **botón**; el sábado 6 los hará el sensor ultrasónico.

Un **diagrama de flujo** muestra los pasos de un programa en orden. Usa figuras:

| Figura | Significa |
| --- | --- |
| Óvalo | Inicio |
| Rectángulo | Una acción (encender, mover, esperar) |
| Rombo | Una pregunta con respuesta Sí / No |

Ordena la secuencia del puente:

Completen los espacios con lo que pasa en cada paso (los colores del semáforo y lo que hace el puente).

:::tabla id="g5t-secuencia"
| Paso | ¿Qué hace el puente? |
| --- | --- |
| 1 | Medir la distancia |
| 2 | ¿Hay un barco a menos de 10 cm? Si no, volver al paso 1 |
| 3 | Luz ______ y alarma |
| 4 | Luz ______ |
| 5 | ______ el puente |
| 6 | Esperar 4 segundos |
| 7 | ______ el puente |
| 8 | Luz ______ |
:::

:::animacion tipo="diagrama-flujo" programa="puente" ocultar="si"
:::

Dibuja el diagrama completo en la bitácora: óvalo de Inicio, un rombo para la pregunta del paso 2 (con su flecha "No" que regresa al paso 1) y rectángulos para las acciones, unidos con flechas. Del paso 8, una flecha de regreso al paso 1.

## Parte 3 · La secuencia con botón (35 min)

Conecten el USB, elijan **Arduino Uno** y su puerto en **Seleccionar placa**, creen un programa nuevo, borren lo que trae y escriban:

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

1. Guárdalo como `equipo_NOMBRE_boton`, verifica (✓) y súbelo (→). Debe encenderse la luz verde y las hojas deben quedarse planas.
2. Presiona el botón una vez y observa la secuencia completa. Marquen cada fila de la tabla.

:::tabla id="g5t-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Al presionar, se enciende el amarillo y suena la alarma | | |
| Después se enciende el rojo | | |
| Las dos hojas suben juntas | | |
| Esperan arriba y bajan | | |
| Vuelve el verde | | |
:::

:::pregunta id="g5-p2"
Si una hoja sube y la otra baja, ¿qué parte del código o del montaje hay que revisar?
:::

## Parte 4 · Pegar las torres (10 min)

Cuando toda la secuencia funcione:

1. Desconecten el USB.
2. Levanten cada torre, pongan silicona en el borde de abajo y péguenla en su lugar, sin aplastar los cables que salen por atrás.
3. Ordenen los cables con cinta sobre la base, sin que pasen por el medio del río.
4. Conecten el USB y prueben una vez más con el botón.

## ¿Lo logramos? (5 min)

:::checklist id="g5t-logramos"
- [ ] El circuito completo está conectado.
- [ ] Dibujamos el diagrama de flujo de la secuencia.
- [ ] El botón inicia la secuencia completa.
- [ ] Las dos hojas se mueven en espejo.
- [ ] Las torres están pegadas.
:::

## Reto extra

Haz que la alarma suene **intermitente** (pitidos cortos) mientras el puente está arriba.

Pista: en vez de `delay(TIEMPO_ARRIBA);`, un `for` que se repita varias veces con un pitido corto (`tone`) y una pausa en cada vuelta. Hagan que el tiempo total sea parecido a 4 segundos.

## Bitácora (20 min)

:::foto id="g5-foto"
Video corto del puente subiendo con el botón.
:::

:::foto id="g5t-diagrama"
Foto del diagrama de flujo que dibujaron en la bitácora (lo van a usar en la Guía 7).
:::

:::pregunta id="g5-b1"
¿Qué hace la función `ponerAngulo()` y por qué usa `180 - a`?
:::

Antes de irse, guarden `equipo_NOMBRE_boton` (**Ctrl + S**) y súbanlo aquí: el próximo sábado lo van a usar.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Guía reestructurada (versión Tinkercad):** el centrado de los servos y el montaje de las hojas pasaron a la Guía 4. Esta guía agrega el diagrama de flujo, que en la versión Tinkercad se quitó de la Guía 3 (la Guía 7 lo compara con el código). Lo nuevo tiene campos propios (g5t-…).
- g5t-secuencia: paso 3 amarillo; 4 rojo; 5 subir; 7 bajar; 8 verde.
- Dos SG90 con las hojas puestas suelen funcionar desde el 5V del Arduino; si el Arduino se reinicia al moverlos, conectar el eliminador de 9 V al jack del Arduino (puede quedar también el USB). Por el jack, el 5V del Arduino entrega más corriente que por el USB solo.
- Si las hojas no quedan planas en 0°, cambiar el ángulo de "abajo" en el código, o sacar el brazo del eje junto con la hoja y ponerlo un diente más allá.
- Los cables que cruzan el río van planos por el borde de atrás de la base, por donde el barco ya terminó de pasar.
- Tiempo total: 30 + 20 + 35 + 10 + 5 + 20 = 120 minutos.
:::
