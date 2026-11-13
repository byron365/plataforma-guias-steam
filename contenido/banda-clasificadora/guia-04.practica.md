---
titulo: Simulamos el nodo banda
guia: 4
sabado: 4
sesion: Simulación (1)
duracion: 120
---

# Guía 4 · Simulamos el nodo banda

## Objetivo del día

Conocer **Tinkercad Circuits** y simular el Arduino de la banda: el transistor que mueve el motor, la perilla de velocidad y el sensor que avisa cuando llega una pieza.

**Al terminar tendremos:** el nodo banda simulado: la perilla cambia la velocidad del motor y el Monitor serie cuenta las piezas que llegan.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del equipo
- Bitácora y lápiz

Mientras simulamos (sábados 4, 5 y 6), se imprimen las piezas que diseñaron en las guías 2 y 3.

## Parte 1 · Conociendo Tinkercad Circuits (15 min)

Un **simulador** imita un circuito real: el Arduino, el motor y los cables son virtuales, pero el código es el mismo. Así probamos todo sin miedo a quemar nada y, cuando funcione, lo armamos de verdad.

1. Entra a **tinkercad.com** con la cuenta del equipo.
2. Arriba a la derecha, **+ Crear → Circuitos**.
3. Haz clic en el nombre inventado de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_banda_sim`. **Enter**. El diseño se guarda solo.

| Parte | Dónde está y para qué sirve |
| --- | --- |
| Área de trabajo | El centro de la pantalla: ahí se arma el circuito |
| Componentes | Panel de la derecha, en **Básico**. Arriba tiene **Buscar** para encontrar una pieza por su nombre |
| Código | Botón de arriba: abre el programa del Arduino |
| Iniciar simulación | Botón de arriba: enciende el circuito. Cambia a **Detener simulación** |
| Monitor en serie | Abajo del panel de código, como en Arduino IDE |

[IMAGEN 4.1S: editor de Tinkercad Circuits con sus partes señaladas: área de trabajo, panel de componentes, botón Código e Iniciar simulación]

**Cómo se usan:**

- **Poner una pieza:** arrástrala del panel de la derecha al área de trabajo.
- **Cambiarla:** haz clic sobre ella. Aparece un cuadro con sus datos (por ejemplo, el valor de una resistencia).
- **Poner un cable:** haz clic en un pin o un agujero de la protoboard y luego en el otro extremo. Al pasar el mouse por un pin, Tinkercad dice su nombre.
- **Borrar:** selecciona la pieza o el cable y presiona **Supr**.

## Parte 2 · El transistor, primero con un LED (35 min)

El Arduino da unos 20 mA por pin; el motor necesita cientos. El **transistor** es un interruptor electrónico: una corriente pequeña en su **base** deja pasar una corriente grande entre **colector** y **emisor**. Con PWM en la base, controlamos la velocidad. En la banda real usaremos el **TIP41C**; en Tinkercad usamos el **Transistor NPN**, que funciona igual.

Antes del motor, probamos con una carga que no se daña: un LED.

1. **Arduino y protoboard:** arrastra un **Arduino Uno R3** y una **Placa de pruebas pequeña**, uno al lado del otro.
2. **La fuente:** en **Buscar** escribe `fuente` y arrastra la **Fuente de alimentación** (está en **Otros componentes**). Haz clic sobre ella y pon **5 V**: es la fuente de 5 V de la banda real. Ponla arriba de la protoboard.
3. **Las filas de arriba (la fuente):** el cable rojo del **+** de la fuente a la fila **+** de arriba y el negro del **−** a la fila **−** de arriba.
4. **Las filas de abajo (el Arduino):** un cable del **5V** del Arduino a la fila **+** de abajo y otro de un **GND** a la fila **−** de abajo.
5. **El GND común:** un cable que una la fila **−** de arriba con la fila **−** de abajo. Así la fuente y el Arduino comparten la tierra. ¡Ojo! Las dos filas **+** **no** se unen: una tiene los 5 V de la fuente y la otra los del Arduino.
6. **El transistor:** arrastra un **Transistor NPN (BJT)** a la mitad de abajo de la protoboard, con cada pata en una columna distinta. Mirándolo de frente, en su cuerpo dice **C B E**: de izquierda a derecha, las patas son **colector**, **base** y **emisor**. Si pasas el mouse por cada pata, Tinkercad también dice su nombre.
7. **La base:** un cable de **D9** del Arduino a una columna libre y, desde ahí, una **Resistencia** de **220 Ω** hasta la columna de la **base** (la pata del centro). Es la resistencia que protege al pin del Arduino.
8. **El emisor:** un cable de la columna del **emisor** (pata derecha, **E**) a la fila **−** de abajo.
9. **El LED:** arrastra un **LED** a una columna libre, a la derecha del transistor.
   - Un cable de la columna del **colector** (pata izquierda, **C**) a la pata **recta** del LED, el **cátodo** (−).
   - Desde la pata **doblada** del LED, el **ánodo** (+), una **Resistencia** de **220 Ω** hacia otra columna libre, y de ahí un cable a la fila **+** de arriba (los 5 V de la fuente).
10. **La perilla:** arrastra un **Potenciómetro**: pata de un extremo → fila **−** de abajo, centro → **A0**, pata del otro extremo → fila **+** de abajo.

Las resistencias se cambian de valor haciendo clic sobre ellas. Repasen las conexiones del transistor:

| Pata del transistor | Va a |
| --- | --- |
| Base (centro, **B**) | Resistencia de 220 Ω → D9 del Arduino |
| Emisor (derecha, **E**) | Fila − (GND común) |
| Colector (izquierda, **C**) | Cátodo del LED; el ánodo, con su resistencia de 220 Ω, a los 5 V de la fuente |

[IMAGEN 4.2S: nodo banda simulado en Tinkercad Circuits: fuente de 5 V, transistor NPN con la base en D9 por una resistencia de 220 Ω, el emisor a GND y el colector al LED, y la perilla en A0]

> **Para recordar:** en un transistor NPN, el **emisor** siempre va a **GND** y la **carga** (el LED, y después el motor) va entre los **5 V** y el **colector**. Si se conectan al revés, en el simulador el LED puede encender un poco, pero el motor de verdad no se movería.

11. Toca **Código**. Arriba dice **Bloques**: ábrelo y elige **Texto**. Aparece la pregunta "¿Está seguro?": toca **Continuar**. Borra todo (**Ctrl + A** y **Supr**) y escribe:

```cpp
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  int vel = analogRead(A0) / 4;   // perilla: 0 a 255
  analogWrite(9, vel);
}
```

12. **Iniciar simulación** y gira la perilla (haz clic sobre ella y arrastra). Para medir el voltaje entre colector y emisor, arrastra un **Multímetro**, ponlo en **Voltaje** y toca con su cable rojo el colector y con el negro el emisor.

:::tabla id="g4p-led"
| Perilla | Brillo del LED | Voltaje entre colector y emisor (V) |
| --- | --- | --- |
| Mínimo | | |
| Mitad | | |
| Máximo | | |
:::


## Parte 3 · Ahora el motor (25 min)

1. **Detén la simulación.** Quita el LED y su resistencia de 220 Ω. En su lugar va el motor: arrastra un **Motor de CC**; un cable del motor a la fila **+** de arriba (5 V de la fuente) y el otro al **colector**.
2. Arrastra un **Diodo** y ponlo en paralelo con el motor: la **franja (cátodo) hacia el lado de los 5 V** y la otra pata hacia el colector. Protege al transistor cuando el motor se apaga.
3. **Iniciar simulación** y gira la perilla. El motor muestra a cuántas vueltas por minuto (**RPM**) gira.

:::tabla id="g4p-motor"
| Perilla | RPM del motor | Voltaje entre colector y emisor (V) |
| --- | --- | --- |
| 25 % | | |
| 50 % | | |
| 100 % | | |
:::

:::pregunta id="g4p-p1"
Con la perilla al máximo, ¿qué voltaje queda entre colector y emisor? Entonces, ¿cuántos voltios le llegan al motor, si la fuente da 5 V?
:::

## Parte 4 · El sensor de piezas (25 min)

En la banda real, un **sensor IR** avisa cuando pasa una pieza: su salida se pone en **LOW**. Tinkercad no tiene ese sensor, así que usamos un **pulsador**: presionarlo es como si pasara una pieza.

1. Detén la simulación. Arrastra un **Pulsador** sobre la canaleta de la protoboard. Dos patas en diagonal: una → **D2**, la otra → fila **−** de abajo.
2. Borra el código y escribe el del nodo banda (por ahora sin hablar con el otro Arduino):

```cpp
const int MOTOR = 9;      // base del transistor (PWM)
const int POT = A0;       // velocidad
const int SENSOR_IR = 2;  // llegada de pieza (en el simulador, un pulsador)

int piezas = 0;
bool antes = false;

void setup() {
  pinMode(MOTOR, OUTPUT);
  pinMode(SENSOR_IR, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  // 1. Velocidad del motor con PWM
  int velocidad = analogRead(POT) / 4;  // 0 a 255
  analogWrite(MOTOR, velocidad);

  // 2. Flanco: la pieza recién llega
  bool ahora = digitalRead(SENSOR_IR) == LOW;
  if (ahora && !antes) {
    piezas++;
    Serial.print("Pieza ");
    Serial.print(piezas);
    Serial.print("   velocidad ");
    Serial.println(velocidad);
  }
  antes = ahora;
  delay(5);
}
```

3. **Iniciar simulación**, abran el **Monitor en serie** y presionen el pulsador varias veces, cambiando la perilla entre una y otra.

:::tabla id="g4p-pruebas"
| Prueba | ¿Funciona? | Lo que muestra el Monitor |
| --- | --- | --- |
| La perilla cambia las RPM del motor | | |
| Con la perilla al mínimo el motor se detiene | | |
| Cada toque al pulsador suma una pieza | | |
| Si se deja presionado, cuenta una sola pieza | | |
:::

:::pregunta id="g4p-p2"
¿Qué es un **flanco**? ¿Por qué el programa cuenta solo cuando la pieza **recién** llega (`ahora && !antes`) y no mientras el pulsador sigue presionado?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] El transistor controla el brillo del LED con la perilla.
- [ ] El motor cambia de velocidad con la perilla.
- [ ] El emisor va a GND y la carga (LED o motor) al colector.
- [ ] El diodo está con la franja hacia los 5 V.
- [ ] El Monitor cuenta las piezas una por una.
:::

## Reto extra

Haz que el motor **se detenga 2 segundos** cada vez que llega una pieza, como si esperara a que la lean, y luego siga.

Pista: dentro del `if` del flanco, `analogWrite(MOTOR, 0);`, un `delay(2000);` y después el programa sigue solo con la velocidad de la perilla.

## Bitácora (15 min)

:::foto id="g4p-foto"
Captura de pantalla del nodo banda simulado (tecla **Impr Pant** o la herramienta Recortes de Windows).
:::

:::pregunta id="g4p-b1"
¿Para qué sirve el transistor? ¿Qué pasaría si conectáramos el motor directo al pin 9?
:::

El diseño queda guardado en Tinkercad (**Diseños → Circuitos**). El próximo sábado le agregamos el nodo clasificador en el mismo diseño.

:::archivo id="g4-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Práctica (10 sábados), desde el 30 de octubre:** las guías 4, 5 y 6 simulan el sistema por partes en Tinkercad Circuits mientras se imprimen las piezas; 7 arma la banda y la potencia, 8 los dos nodos, 9 calibra y 10 es luz, ángulos y el lote final. **Desde el 13 de noviembre son 11 sábados:** 7 arma la banda, 8 conecta los circuitos de los dos nodos y 9 sube los programas (LED, motor y primera prueba), guías de armado; 10 calibra y 11 es luz, ángulos y el lote final. Campos propios (g4p-…). Las respuestas de la Guía 4 anterior (armar la banda) pasaron a la Guía 7 (g7p-…).
- En Tinkercad no hay TIP41C ni sensor IR de obstáculos: se usan el **Transistor NPN (BJT)** y un **Pulsador** (presionado = pieza). La fuente de 5 V con jack de la banda real se representa con la **Fuente de alimentación** en 5 V. Mismo circuito de las guías 8 y 9: D9 → 220 Ω → base, emisor a GND común, carga (LED y luego motor) entre +5 V de la fuente y colector, con el diodo en paralelo al motor. La resistencia de 10 kΩ entre base y GND de la Guía 8 (mantiene el transistor apagado mientras el Arduino arranca) no hace falta en el simulador.
- El transistor NPN de Tinkercad tiene escrito **C B E** en el cuerpo (colector, base, emisor de izquierda a derecha). Si un equipo lo conecta con colector y emisor invertidos, el LED igual enciende algo en el simulador (el transistor conduce al revés con muy poca ganancia), pero con el TIP41C y el motor real no funcionaría: revisar que el emisor vaya a GND. El TIP41C real tiene otro orden (**B C E**), ver la Guía 8.
- El capacitor de la banda real no hace falta en el simulador; se agrega en la Guía 9.
- El código del nodo banda usa `INPUT_PULLUP` en el pin del sensor: funciona con el pulsador del simulador y con el módulo IR real.
- g4p-p1: queda algo menos de 1 V entre colector y emisor; al motor le llegan unos 4 a 4,8 V.
- g4p-p2: un flanco es el cambio de "no hay pieza" a "hay pieza"; si contara mientras está presionado, sumaría una pieza cada 5 ms.
- g4p-b1: el pin no da la corriente del motor; se podría dañar el Arduino.
- Tiempo total: 15 + 35 + 25 + 25 + 5 + 15 = 120 minutos.
:::
