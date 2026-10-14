---
titulo: La torre cobra vida
guia: 4
sabado: 4
sesion: Implementación electrónica
duracion: 120
---

# Guía 4 · La torre cobra vida

## Objetivo del día

Construir la torre, la cabina y el sistema de polea; montar el motor, los sensores de piso, los finales de carrera y el paro de emergencia, y probar que la cabina "busca" el piso 1 al encender.

**Al terminar tendremos:** la torre armada con su electrónica y la cabina bajando sola hasta el piso 1 al encender.

## Materiales del equipo

- MDF o cartón grueso, varillas guía, hilo, polea o carrete
- Motor con reductora, L298N, fuente con fusible, LM2596 a 5 V
- 3 reed switch (o IR) e imán, 2 finales de carrera, botón de paro
- Arduino central, cables largos

## Parte 1 · Mecánica (45 min)

1. Arma la torre con sus diagonales (Guía 3) y las dos guías verticales.
   - Usen las medidas de su boceto. Revisen con una escuadra que las esquinas queden rectas antes de que seque el pegamento.
   - Las dos guías deben quedar **paralelas**: midan la distancia entre ellas abajo, en el medio y arriba; tiene que ser la misma.
2. Monta el **motor arriba**, con el carrete en su eje.
   - Sujeten el motor con tornillos o abrazaderas para que no gire ni se incline al tirar del hilo.
3. Ata el hilo a la cabina, pásalo por el carrete y al otro lado cuelga el **contrapeso**.
   - Aten el hilo al centro del techo de la cabina para que suba derecha.
   - Den 3 o 4 vueltas al carrete para que el hilo no resbale.
   - El contrapeso es el que decidieron en la Guía 3.
4. Comprueba a mano que la cabina sube y baja sin rozar.
   - Giren el carrete despacio con la mano, de abajo hasta arriba. Si la cabina se traba en algún punto, revisen las guías en esa altura.

[IMAGEN 4.1: torre armada con la cabina en las guías, el motor y el carrete arriba y el contrapeso al costado]

## Parte 2 · Sensores y seguridad (30 min)

| Elemento | Ubicación | Pin del Arduino central |
| --- | --- | --- |
| Reed piso 1 / 2 / 3 | Altura de cada piso (imán en la cabina) | D2 / D3 / D4 |
| Final de carrera abajo | Un poco **debajo** del piso 1 | A0 |
| Final de carrera arriba | Un poco **arriba** del piso 3 | A1 |
| Paro de emergencia | En la base, fácil de alcanzar | A2 |
| L298N ENA / IN1 / IN2 | — | D5 / D7 / D8 |

Todos los sensores van entre su pin y GND (usaremos `INPUT_PULLUP`).

**Cómo montarlos** (con la fuente y el USB desconectados):

1. **Imán:** péguenlo al costado de la cabina que mira hacia los sensores.
2. **Reed switch:** péguenlo en la pared de la torre a la altura de cada piso, frente al imán. Tiene dos patas iguales: una al pin y otra a GND. Es de vidrio: no doblen las patas pegado al vidrio.
3. **Finales de carrera:** el código lee **LOW = tocado**, así que usen las patas **C** → GND y **NO** (NA) → pin.
4. **Paro de emergencia:** igual que los finales de carrera, usen su contacto NA: una pata a A2 y la otra a GND.
5. **Puente H:** se conecta igual que en la Guía 1 (sin el jumper de ENA, GND común con la fuente y el Arduino).
6. **LM2596:** antes de conectarlo al Arduino, conecten la fuente a su entrada (IN+ e IN−), pongan el multímetro en voltaje en la salida (OUT+ y OUT−) y giren el tornillito dorado hasta leer **5,0 V**. Solo entonces conecten OUT+ al pin **5V** del Arduino y OUT− a GND.

[IMAGEN 4.2: reed switch en la pared de la torre a la altura de un piso y el imán pegado a la cabina]

En la animación pueden revisar cada conexión de la central:

:::animacion tipo="conexiones" circuito="elevador-central"
:::

## Parte 3 · Probar cada sensor (20 min)

```cpp
const int PISO[3] = {2, 3, 4};
const int FIN_ABAJO = A0, FIN_ARRIBA = A1, PARO = A2;

void setup() {
  for (int i = 0; i < 3; i++) pinMode(PISO[i], INPUT_PULLUP);
  pinMode(FIN_ABAJO, INPUT_PULLUP);
  pinMode(FIN_ARRIBA, INPUT_PULLUP);
  pinMode(PARO, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  Serial.print("Pisos: ");
  for (int i = 0; i < 3; i++) Serial.print(digitalRead(PISO[i]) == LOW ? "X " : "- ");
  Serial.print(" Abajo:"); Serial.print(digitalRead(FIN_ABAJO) == LOW);
  Serial.print(" Arriba:"); Serial.print(digitalRead(FIN_ARRIBA) == LOW);
  Serial.print(" Paro:"); Serial.println(digitalRead(PARO) == LOW);
  delay(200);
}
```

1. Desconecten la fuente (el motor queda sin energía). El Arduino central va conectado solo por USB.
2. Programa nuevo (**Archivo → Nuevo**), escriban el código, guárdenlo como `equipo_NOMBRE_sensores`, verifiquen (✓) y suban (→).
3. Abran el **Monitor serie** (la lupa arriba a la derecha) y elijan **9600 baudios** abajo a la derecha.
4. Cada línea muestra los tres pisos: **X** = detecta la cabina, **-** = no la detecta. Después de Abajo, Arriba y Paro aparece **1** si está activado y **0** si no.

Mueve la cabina **a mano** (motor sin energía) y anota:

Copien en **Pisos** lo que muestra el monitor (por ejemplo `X - -`) y en **Abajo** y **Arriba** el 0 o el 1. Presionen también el paro y revisen que **Paro** cambie a 1.

Cuando la cabina toca el final de carrera de abajo, el sensor del piso 1 **también** debe marcar X: si no, suban un poco el final de carrera o bajen el reed hasta que se cumplan las dos cosas.

:::tabla id="g4-sensores"
| Posición de la cabina | Pisos | Abajo | Arriba |
| --- | --- | --- | --- |
| En el piso 1 | | | |
| Entre 1 y 2 | | | |
| En el piso 2 | | | |
| En el piso 3 | | | |
| Tocando el tope de arriba | | | |
:::

## Parte 4 · Buscar el piso 1 al encender (20 min)

Al encender, la central no sabe dónde está la cabina. Por eso **baja despacio hasta el final de carrera** (esto se llama *homing*):

1. En el programa de sensores, busquen en el `setup()` la última línea `pinMode(PARO, INPUT_PULLUP);` y peguen debajo las líneas de abajo (sin cambiar nada más).
2. Pongan la cabina a mitad de la torre con la mano y conecten la fuente.
3. Una persona tiene la mano lista en el cable de la fuente: si la cabina no se detiene al tocar el final de carrera, lo desconecta.
4. Suban el programa (→) y miren: la cabina debe bajar despacio y detenerse al tocar el final de carrera de abajo.

```cpp
// agrega al setup() de la prueba anterior, después de los pinMode:
pinMode(5, OUTPUT); pinMode(7, OUTPUT); pinMode(8, OUTPUT);
digitalWrite(7, LOW); digitalWrite(8, HIGH);   // bajar
analogWrite(5, 120);                            // despacio
while (digitalRead(FIN_ABAJO) == HIGH) {}       // hasta tocar el tope
analogWrite(5, 0);
```

:::pregunta id="g4-p1"
¿Qué pasaría si el final de carrera de abajo no funcionara durante el *homing*? ¿Cómo lo evitarías?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] La torre es rígida y la cabina no roza.
- [ ] Los tres sensores de piso detectan la cabina.
- [ ] Los finales de carrera y el paro funcionan.
- [ ] La cabina busca el piso 1 al encender.
:::

:::tabla id="g4-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::docente
- Probar el *homing* con la mano lista en el paro (o en el cable de la fuente) la primera vez.
- g4-p1: la cabina chocaría abajo; se puede agregar un tiempo máximo (si en 10 s no toca el tope, detener y avisar error).
- Si el imán no activa el reed, acercarlo o usar un imán de neodimio.
- Tiempo total: 45 + 30 + 20 + 20 + 5 = 120 minutos.
:::
