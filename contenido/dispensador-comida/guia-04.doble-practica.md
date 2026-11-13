---
titulo: Simulamos el dispensador doble
guia: 4
sabado: 4
sesion: Simulación (1)
duracion: 120
---

# Guía 4 · Simulamos el dispensador doble

## Objetivo del día

Conocer **Tinkercad Circuits** y simular la primera parte del dispensador doble: la compuerta del cereal con el servo, los dos botones, el LED y la alarma.

**Al terminar tendremos:** el dispensador doble en el simulador: el botón del cereal abre la compuerta y el del líquido da su aviso (la bomba llega el sábado 5).

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del equipo
- Bitácora y lápiz

Mientras simulamos (sábados 4, 5 y 6), se imprimen las piezas que diseñaron en las guías 2 y 3.

## Parte 1 · Conociendo Tinkercad Circuits (15 min)

Un **simulador** imita un circuito real: el Arduino, el servo y los cables son virtuales, pero el código es el mismo. Así probamos todo sin miedo a quemar nada y, cuando funcione, lo armamos de verdad.

1. Entra a **tinkercad.com** con la cuenta del equipo.
2. Arriba a la derecha, **+ Crear → Circuitos**.
3. Haz clic en el nombre inventado de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_doble_sim`. **Enter**. El diseño se guarda solo.

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

1. **Arduino y protoboard:** arrastra un **Arduino Uno R3** y una **Placa de pruebas pequeña**, uno al lado del otro, sin que se tapen.
2. **Filas + y −:** un cable del **5V** del Arduino a la fila **+** de la protoboard y otro del **GND** a la fila **−**.
3. **Servo de la compuerta:** arrastra un **Microservomotor** fuera de la protoboard. Pasa el mouse por sus tres pines para ver cuál es la señal, la potencia (+) y la tierra (−).
4. **Dos botones:** arrastra dos **Pulsador** sobre la canaleta del centro de la protoboard, separados. El de la izquierda será el del **cereal** y el de la derecha, el del **líquido**.
5. **LED:** arrastra un **LED** a la protoboard y una **Resistencia** desde la fila de su pata larga (el **ánodo**) hacia otra fila libre. Haz clic en la resistencia y cambia su valor a **220 Ω**.
6. **Buzzer:** busca **Piezo** y ponlo en la protoboard.
7. Conecta con cables, como en la tabla:

| Componente | Conexión |
| --- | --- |
| Servo de la compuerta | Señal → D9 · Potencia → fila + · Tierra → fila − |
| Botón del cereal | Una pata → D2 · la pata en diagonal → fila − |
| Botón del líquido | Una pata → D3 · la pata en diagonal → fila − |
| LED | Resistencia → D4 · cátodo (pata corta) → fila − |
| Piezo (buzzer) | + → D5 · − → fila − |

[IMAGEN 4.2DP: dispensador doble simulado en Tinkercad Circuits: servo, dos pulsadores, LED y piezo conectados al Arduino]

## Parte 3 · Dos funciones, dos botones (35 min)

Una **función** es un grupo de instrucciones con nombre. Este programa tiene dos: `servirCereal()` mueve la compuerta y `servirLiquido()`, por ahora, solo da el aviso. El `loop` revisa los dos botones y llama a la función que toca.

1. Toca **Código**. Arriba dice **Bloques**: ábrelo y elige **Texto**. Aparece la pregunta "¿Está seguro?": toca **Continuar**.
2. Borra todo lo que trae (**Ctrl + A** y **Supr**) y escribe:

```cpp
#include <Servo.h>
Servo compuerta;

const int BOTON_CEREAL = 2;
const int BOTON_LIQUIDO = 3;
const int LED = 4;
const int BUZZER = 5;
const int CERRADA = 0;
const int ABIERTA = 70;
const int TIEMPO_ABIERTA = 1000;   // ms con la compuerta abierta

void setup() {
  pinMode(BOTON_CEREAL, INPUT_PULLUP);
  pinMode(BOTON_LIQUIDO, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  compuerta.attach(9);
  compuerta.write(CERRADA);
}

// Sirve una porción de cereal
void servirCereal() {
  tone(BUZZER, 1500, 300);         // aviso
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(TIEMPO_ABIERTA);
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
}

// Por ahora solo avisa; la bomba llega el sábado 5
void servirLiquido() {
  tone(BUZZER, 1000, 300);         // aviso más grave
  digitalWrite(LED, HIGH);
  delay(1000);
  digitalWrite(LED, LOW);
}

void loop() {
  if (digitalRead(BOTON_CEREAL) == LOW) {
    servirCereal();
    delay(500);                    // evitar doble toque
  }
  if (digitalRead(BOTON_LIQUIDO) == LOW) {
    servirLiquido();
    delay(500);
  }
}
```

3. Toca **Iniciar simulación**. Si sale un recuadro rojo de error, lean la línea que marca y revisen esa parte del código.
4. Hagan clic en cada pulsador y observen. Marquen la tabla.

:::tabla id="g4dp-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Botón del cereal: aviso agudo, LED y el servo gira y regresa | | |
| Botón del líquido: aviso grave y LED, el servo no se mueve | | |
| Sin presionar, todo queda quieto | | |
:::

Fíjate en las líneas `const int …` del principio: son **constantes**, números con nombre. Si queremos cambiar cuánto se abre la compuerta, solo cambiamos `ABIERTA` en un lugar.

:::pregunta id="g4dp-p1"
¿Cómo sabe el programa cuál de las dos funciones tiene que usar?
:::

## Parte 4 · Probar en el simulador (15 min)

Prueben distintos valores sin miedo: detengan la simulación, cambien el número, inicien otra vez y presionen el botón del cereal.

:::tabla id="g4dp-ajustes"
| Cambio | ¿Qué se ve en el servo? |
| --- | --- |
| `ABIERTA = 90` | |
| `TIEMPO_ABIERTA = 500` | |
| `TIEMPO_ABIERTA = 2000` | |
:::

Al terminar, dejen `ABIERTA = 70` y `TIEMPO_ABIERTA = 1000`.

## ¿Lo logramos? (5 min)

:::checklist id="g4dp-logramos"
- [ ] El circuito con los dos pulsadores está armado en Tinkercad.
- [ ] El código está en modo Texto y sin errores.
- [ ] El botón del cereal mueve la compuerta y el del líquido da su aviso.
:::

## Reto extra

Haz que el aviso del líquido sean **dos pitidos cortos** en lugar de uno, para distinguirlo mejor del cereal.

Pista: dos `tone` cortos con un `delay` entre ellos, al principio de `servirLiquido()`.

## Bitácora (15 min)

:::foto id="g4dp-foto"
Captura de pantalla del circuito simulado (tecla **Impr Pant** o la herramienta Recortes de Windows).
:::

:::pregunta id="g4dp-b1"
¿Para qué sirve simular antes de armar el circuito de verdad?
:::

El diseño queda guardado en Tinkercad (**Diseños → Circuitos**). El próximo sábado seguimos en el mismo.

:::archivo id="g4-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión doble práctica (10 sábados):** guías 1 a 3 iguales a la versión doble; 4, 5 y 6 simulan el dispensador por partes en Tinkercad Circuits mientras se imprimen las piezas; 7 arma el dispensador, 8 y 9 son guías de armado (circuito con relé y bomba, y subir el programa) y 10 prueba y presenta. Campos propios (g4dp-…).
- Imprimir esta semana y la siguiente las 4 piezas (torre del cereal, compuerta, embudo y torre del líquido) y tener los componentes de la lista para el sábado 7.
- Mismos pines que la Guía 5 doble: botón del cereal D2, botón del líquido D3, LED D4, buzzer D5, servo D9 (y el relé en D8 el sábado 5).
- En Tinkercad, al pasar de Bloques a Texto pueden quedar restos del ejemplo: por eso se borra todo con Ctrl + A.
- g4dp-p1: el `loop` pregunta por cada botón con su `if`; si el del cereal está presionado llama a `servirCereal()`, y si es el del líquido, a `servirLiquido()`.
- Tiempo total: 15 + 35 + 35 + 15 + 5 + 15 = 120 minutos.
:::
