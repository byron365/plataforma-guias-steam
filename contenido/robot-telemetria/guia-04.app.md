---
titulo: Simulamos el robot
guia: 4
sabado: 4
sesion: Simulación (1)
duracion: 120
---

# Guía 4 · Simulamos el robot

## Objetivo del día

Conocer **Tinkercad Circuits** y simular la parte del robot: el puente H con los dos motores, el sensor de distancia y la medición de la batería.

**Al terminar tendremos:** el robot simulado moviendo sus motores adelante, atrás y girando, y midiendo la distancia y la batería en el Monitor serie.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del equipo
- Bitácora y lápiz

Mientras simulamos y hacemos la app (sábados 4 a 7), se imprimen las piezas que diseñaron en las guías 2 y 3.

## Parte 1 · Conociendo Tinkercad Circuits (15 min)

Un **simulador** imita un circuito real: el Arduino, los motores y los cables son virtuales, pero el código es el mismo. Así probamos todo sin miedo a quemar nada y, cuando funcione, lo armamos de verdad.

1. Entra a **tinkercad.com** con la cuenta del equipo.
2. Arriba a la derecha, **+ Crear → Circuitos**.
3. Haz clic en el nombre inventado de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_robot_sim`. **Enter**. El diseño se guarda solo.

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

## Parte 2 · El puente H y los motores (45 min)

En el robot real usamos el módulo **L298N**. Tinkercad no lo tiene, pero tiene el chip **L293D**, que hace lo mismo: deja que el Arduino controle la dirección y la velocidad de dos motores. Los pines del Arduino son los mismos, así que el código también.

1. **Arduino y protoboard:** arrastra un **Arduino Uno R3** y una **Placa de pruebas pequeña**, uno al lado del otro.
2. **Filas + y −:** un cable del **5V** del Arduino a la fila **+** de la protoboard y otro del **GND** a la fila **−**.
3. **El chip:** en **Buscar** escribe `L293D` y arrastra el **controlador de motor de puente H L293D** sobre la canaleta del centro de la protoboard, con la mitad de sus patas de cada lado.
   - Las patas se cuentan desde la **muesca** (la media luna de un extremo del chip): la pata 1 está a un lado de la muesca y se sigue en U, por abajo y luego por arriba, hasta la 16.
   - Pasa el mouse por cada pata para ver su nombre antes de conectarla.
4. **Los motores:** arrastra dos **Motor de aficionado**: son como los motores TT del robot. Uno es el izquierdo y el otro el derecho.
5. **La batería de los motores:** arrastra una **Pila de 9 V**. En el robot real será la batería 2S de 7,4 V.
6. Conecta con cables, como en la tabla:

| Pata del L293D | Va a | En el robot real (L298N) |
| --- | --- | --- |
| 1 (habilita 1 y 2) | D5 | ENA |
| 2 (entrada 1) / 7 (entrada 2) | D7 / D8 | IN1 / IN2 |
| 3 y 6 (salidas 1 y 2) | Las dos patas del motor izquierdo | OUT1, OUT2 |
| 9 (habilita 3 y 4) | D6 | ENB |
| 10 (entrada 3) / 15 (entrada 4) | D4 / D9 | IN3 / IN4 |
| 11 y 14 (salidas 3 y 4) | Las dos patas del motor derecho | OUT3, OUT4 |
| 16 (potencia 1) | fila + (5 V del Arduino) | El L298N la saca de la batería |
| 8 (potencia 2) | Pila + | Borne +12V |
| 4, 5, 12 y 13 (tierra) | fila − | GND |

- El **−** de la pila va también a la fila **−**: así la pila y el Arduino comparten la tierra (**GND común**), igual que en el robot real.

[IMAGEN 4.2S: robot simulado en Tinkercad Circuits: Arduino, chip L293D en la protoboard, dos motores y la pila de 9 V]

7. Toca **Código**. Arriba dice **Bloques**: ábrelo y elige **Texto**. Aparece la pregunta "¿Está seguro?": toca **Continuar**. Borra todo (**Ctrl + A** y **Supr**) y escribe la prueba de motores:

```cpp
// Puente H: PWMA = ENA, AIN1 = IN1, AIN2 = IN2, PWMB = ENB, BIN1 = IN3, BIN2 = IN4
const int PWMA = 5, AIN1 = 7, AIN2 = 8;
const int PWMB = 6, BIN1 = 4, BIN2 = 9;

// vel: -255 (atrás) a 255 (adelante)
void motor(int pwm, int in1, int in2, int vel) {
  digitalWrite(in1, vel > 0);
  digitalWrite(in2, vel < 0);
  analogWrite(pwm, abs(vel));
}

void setup() {
  int pines[] = {PWMA, AIN1, AIN2, PWMB, BIN1, BIN2};
  for (int p : pines) pinMode(p, OUTPUT);
}

void loop() {
  motor(PWMA, AIN1, AIN2, 150);  motor(PWMB, BIN1, BIN2, 150);   delay(1500); // adelante
  motor(PWMA, AIN1, AIN2, -150); motor(PWMB, BIN1, BIN2, -150);  delay(1500); // atrás
  motor(PWMA, AIN1, AIN2, 150);  motor(PWMB, BIN1, BIN2, -150);  delay(1000); // gira
  motor(PWMA, AIN1, AIN2, 0);    motor(PWMB, BIN1, BIN2, 0);     delay(2000); // para
}
```

8. Toca **Iniciar simulación**. Cada motor muestra a cuántas vueltas por minuto (**RPM**) gira; si gira al revés, el número sale con signo menos.

:::tabla id="g4p-motores"
| Paso | ¿Qué muestran los dos motores? | ¿Lo hizo bien? |
| --- | --- | --- |
| Adelante | | |
| Atrás | | |
| Giro a la derecha | | |
| Para | | |
:::

> Si un motor gira al revés que el otro cuando deberían ir iguales, **intercambia sus dos cables** en las salidas del chip, igual que se hace en el robot real.

:::pregunta id="g4p-p1"
¿Qué número del código cambiarían para que el robot avance más despacio? ¿Qué pasa con las RPM?
:::

## Parte 3 · El sensor y la batería (40 min)

El robot le manda a la app dos datos: la **distancia** al obstáculo y el **voltaje de la batería**.

1. **Sensor:** en **Buscar** escribe `ultrasónico` y arrastra el que dice **HC-SR04** y tiene **4 pines** (está en **Otros componentes**). El otro (PING, de 3 pines) **no** es el nuestro. Ponlo fuera de la protoboard.
2. **Divisor de la batería:** el Arduino solo aguanta 5 V en sus entradas y la pila tiene 9 V. Dos **Resistencias** iguales de **10 kΩ** la dividen entre 2.
   - Pon las dos resistencias en fila en la protoboard, una después de la otra.
   - El otro extremo de la primera va al **+** de la pila; el otro extremo de la segunda, a la fila **−**.
   - El punto donde se unen las dos resistencias va a **A0**.
3. Conecta el sensor:

| HC-SR04 | Arduino |
| --- | --- |
| Vcc / GND | fila + / fila − |
| Trig / Echo | D2 / D3 |

[IMAGEN 4.3S: sensor HC-SR04 y divisor de la batería en Tinkercad Circuits: el sensor en D2 y D3, y las dos resistencias de 10 kΩ entre el + de la pila y GND, con su punto medio en A0]

4. Borra el código y escribe la prueba de los sensores:

```cpp
const int TRIG = 2, ECHO = 3;
const int BATERIA = A0;        // divisor 10k / 10k
const float FACTOR_BAT = 2.0;  // el divisor parte el voltaje entre 2

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
}

// Distancia en cm con el HC-SR04
long distancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 20000);
  return t * 0.034 / 2;
}

void loop() {
  int lectura = analogRead(BATERIA);
  float v = lectura * 5.0 / 1023 * FACTOR_BAT;
  Serial.print("Bateria: ");
  Serial.print(v, 1);
  Serial.print(" V   Distancia: ");
  Serial.print(distancia());
  Serial.println(" cm");
  delay(300);
}
```

5. **Iniciar simulación** y abran el **Monitor en serie**. Hagan clic sobre el sensor: aparece un **objeto** frente a él con su distancia. Arrástrenlo y anoten.

:::tabla id="g4p-sensores"
| Distancia del objeto en Tinkercad (cm) | Lo que muestra el Monitor (cm) | Batería en el Monitor (V) |
| --- | --- | --- |
| 10 | | |
| 50 | | |
| 150 | | |
:::

:::pregunta id="g4p-p2"
La pila es de 9 V, pero a la pata A0 solo llegan 4,5 V. ¿Por qué el Monitor muestra 9 V?
:::

Si el Monitor muestra la distancia siempre en **0**, revisen los cables de Trig y Echo (el 0 quiere decir que no llegó el eco). Si muestra más de 200 cm, el objeto está muy lejos y el sensor no lo alcanza.

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] El chip L293D, los dos motores y la pila están conectados.
- [ ] Los motores hacen adelante, atrás, giro y pausa.
- [ ] El Monitor muestra la distancia y la batería.
:::

## Reto extra

Haz que el robot **no avance** si hay un obstáculo a menos de 20 cm: en la prueba de motores, que el paso "adelante" solo se haga si la distancia es mayor que 20.

Pista: copien la función `distancia()` y las constantes del sensor al programa de los motores, y pongan el "adelante" dentro de un `if`.

## Bitácora (15 min)

:::foto id="g4p-foto"
Captura de pantalla del robot simulado (tecla **Impr Pant** o la herramienta Recortes de Windows).
:::

:::pregunta id="g4p-b1"
¿Qué es distinto entre el puente H del simulador (L293D) y el del robot real (L298N)? ¿Qué es igual?
:::

El diseño queda guardado en Tinkercad (**Diseños → Circuitos**). El próximo sábado seguimos en el mismo diseño.

:::archivo id="g4-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Práctica con app (9 sábados), nueva el 6 de noviembre:** el mando físico se reemplaza por una **app de Android hecha en MIT App Inventor** (decisión de Bairon: más barato y más simple). Sale el segundo Arduino, el segundo HC-05, el joystick, la pantalla y la caja del mando. Las guías 4 y 5 simulan el robot en Tinkercad Circuits; 6 y 7 hacen la app; 8 arma el robot y 9 conecta el HC-05 y maneja. Esta guía usa los mismos campos que la Práctica (g4p-…).
- En Tinkercad no hay L298N ni motor TT: se usan el chip **L293D** (buscar "L293D") y el **Motor de aficionado**. Mismos pines del Arduino que el robot real (D5, D7, D8, D6, D4, D9), así que los programas no cambian. En el L293D la pata 16 es la alimentación de la lógica (5 V) y la 8 la de los motores.
- La pila de 9 V del simulador hace de batería 2S: con el divisor 1:2, el Monitor muestra unos 9 V (en el robot real, 7,4 a 8,4 V).
- En Tinkercad hay dos sensores ultrasónicos: el **PING** de 3 pines (en Básico) y el **HC-SR04** de 4 pines (en Otros componentes al buscar). Usar el HC-SR04.
- g4p-p1: el 150 de "adelante" (por ejemplo 100); las RPM bajan.
- g4p-p2: el código multiplica por `FACTOR_BAT = 2.0`, porque el divisor de dos resistencias iguales parte el voltaje a la mitad.
- Tiempo total: 15 + 45 + 40 + 5 + 15 = 120 minutos.
:::
