---
titulo: Simulamos el dispensador
guia: 4
sabado: 4
sesion: Simulación (1)
duracion: 120
---

# Guía 4 · Simulamos el dispensador

## Objetivo del día

Conocer **Tinkercad Circuits** y simular el dispensador: la compuerta con el servo, el botón, el LED y la alarma, con una función que sirve una porción.

**Al terminar tendremos:** el dispensador funcionando en el simulador: al presionar el botón suena el aviso, se enciende el LED y la compuerta se abre y se cierra.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del equipo
- Bitácora y lápiz

Mientras simulamos (sábados 4, 5 y 6), se imprimen las piezas que diseñaron en las guías 2 y 3.

## Parte 1 · Conociendo Tinkercad Circuits (15 min)

Un **simulador** imita un circuito real: el Arduino, el servo y los cables son virtuales, pero el código es el mismo. Así probamos todo sin miedo a quemar nada y, cuando funcione, lo armamos de verdad.

1. Entra a **tinkercad.com** con la cuenta del equipo.
2. Arriba a la derecha, **+ Crear → Circuitos**.
3. Haz clic en el nombre inventado de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_dispensador_sim`. **Enter**. El diseño se guarda solo.

| Parte | Dónde está y para qué sirve |
| --- | --- |
| Área de trabajo | El centro de la pantalla: ahí se arma el circuito |
| Componentes | Panel de la derecha, en **Básico**. Arriba tiene **Buscar** para encontrar una pieza por su nombre |
| Código | Botón de arriba: abre el programa del Arduino |
| Iniciar simulación | Botón de arriba: enciende el circuito. Cambia a **Detener simulación** |
| Monitor en serie | Abajo del panel de código, como en Arduino IDE |

[IMAGEN 4.1P: editor de Tinkercad Circuits con sus partes señaladas: área de trabajo, panel de componentes, botón Código e Iniciar simulación]

**Cómo se usan:**

- **Poner una pieza:** arrástrala del panel de la derecha al área de trabajo.
- **Cambiarla:** haz clic sobre ella. Aparece un cuadro con sus datos (por ejemplo, el color del LED o el valor de la resistencia).
- **Poner un cable:** haz clic en un pin o un agujero de la protoboard y luego en el otro extremo. Al pasar el mouse por un pin, Tinkercad dice su nombre.
- **Borrar:** selecciona la pieza o el cable y presiona **Supr**.

## Parte 2 · El circuito en el simulador (35 min)

Es el circuito de la Guía 1 más el buzzer.

1. **Arduino y protoboard:** arrastra un **Arduino Uno R3** y una **Placa de pruebas pequeña**, uno al lado del otro, sin que se tapen.
2. **Filas + y −:** un cable del **5V** del Arduino a la fila **+** de la protoboard y otro del **GND** a la fila **−**.
3. **Servo:** arrastra un **Microservomotor** fuera de la protoboard. Pasa el mouse por sus tres pines para ver cuál es la señal, la potencia (+) y la tierra (−).
4. **Botón:** arrastra un **Pulsador** sobre la canaleta del centro de la protoboard.
5. **LED:** arrastra un **LED** a la protoboard y una **Resistencia** desde la fila de su pata larga (el **ánodo**) hacia otra fila libre. Haz clic en la resistencia y cambia su valor a **220 Ω**.
6. **Buzzer:** busca **Piezo** y ponlo en la protoboard.
7. Conecta con cables, como en la tabla:

| Componente | Conexión |
| --- | --- |
| Servo | Señal → D9 · Potencia → fila + · Tierra → fila − |
| Pulsador | Una pata → D2 · la pata en diagonal → fila − |
| LED | Resistencia → D4 · cátodo (pata corta) → fila − |
| Piezo (buzzer) | + → D5 · − → fila − |

[IMAGEN 4.2P: dispensador simulado en Tinkercad Circuits: servo, pulsador, LED y piezo conectados al Arduino]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones" circuito="dispensador"
:::

## Parte 3 · Una función para servir (35 min)

Una **función** es un grupo de instrucciones con nombre. La escribimos una vez y la usamos cuantas veces queramos.

1. Toca **Código**. Arriba dice **Bloques**: ábrelo y elige **Texto**. Aparece la pregunta "¿Está seguro?": toca **Continuar**.
2. Borra todo lo que trae (**Ctrl + A** y **Supr**) y escribe:

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

3. Toca **Iniciar simulación**. Si sale un recuadro rojo de error, lean la línea que marca y revisen esa parte del código.
4. Haz clic sobre el **pulsador** y observa: suena el piezo, se enciende el LED y el brazo del servo gira y regresa. Marquen la tabla.

:::tabla id="g4p-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Al presionar, suena el aviso | | |
| Se enciende el LED | | |
| El brazo del servo gira a 70° y regresa a 0° | | |
| Al soltar, todo queda quieto hasta el siguiente toque | | |
:::

Fíjate en las líneas `const int …` del principio: son **constantes**, números con nombre. Si queremos cambiar cuánto se abre la compuerta, solo cambiamos `ABIERTA` en un lugar.

:::pregunta id="g4p-p1"
¿Qué ventaja tiene escribir `servir()` como función en lugar de poner todas sus líneas dentro del `loop`?
:::

## Parte 4 · Probar en el simulador (15 min)

Prueben distintos valores sin miedo: detengan la simulación, cambien el número, inicien otra vez y presionen el pulsador.

:::tabla id="g4p-ajustes"
| Cambio | ¿Qué se ve en el servo? |
| --- | --- |
| `ABIERTA = 90` | |
| `TIEMPO_ABIERTA = 500` | |
| `TIEMPO_ABIERTA = 2000` | |
:::

Al terminar, dejen `ABIERTA = 70` y `TIEMPO_ABIERTA = 1000`.

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] El circuito está armado en Tinkercad.
- [ ] El código está en modo Texto y sin errores.
- [ ] Al presionar el pulsador, el dispensador simulado sirve.
:::

## Reto extra

Haz que el LED **parpadee** tres veces antes de abrir la compuerta, como aviso para la mascota.

Pista: un `for` que se repita 3 veces con `digitalWrite(LED, HIGH)`, un `delay` corto, `digitalWrite(LED, LOW)` y otro `delay`, al principio de `servir()`.

## Bitácora (15 min)

:::foto id="g4p-foto"
Captura de pantalla del circuito simulado (tecla **Impr Pant** o la herramienta Recortes de Windows).
:::

:::pregunta id="g4p-b1"
¿Para qué sirve simular antes de armar el circuito de verdad?
:::

El diseño queda guardado en Tinkercad (**Diseños → Circuitos**). El próximo sábado seguimos en el mismo.

:::archivo id="g4-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica (8 sábados):** guías 1 a 3 iguales a la versión Tinkercad; 4, 5 y 6 simulan el dispensador por partes en Tinkercad Circuits mientras se imprimen las piezas; 7 arma todo en físico y 8 prueba y presenta. Campos propios (g4p-…).
- Imprimir esta semana y la siguiente las piezas (torre, compuerta y embudo) y tener los componentes de la lista para el sábado 7.
- En Tinkercad, al pasar de Bloques a Texto pueden quedar restos del ejemplo: por eso se borra todo con Ctrl + A.
- El pulsador del simulador se presiona con un clic. Si no responde, revisar que cruce la canaleta y que el cable vaya a la pata en diagonal.
- g4p-p1: se escribe una vez y se puede llamar desde varios lugares (en la Guía 6, el horario automático también llama a `servir()`); el `loop` queda corto y fácil de leer.
- Tiempo total: 15 + 35 + 35 + 15 + 5 + 15 = 120 minutos.
:::
