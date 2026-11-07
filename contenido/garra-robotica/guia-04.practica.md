---
titulo: Simulamos la base y el hombro
guia: 4
sabado: 4
sesion: Simulación (1)
duracion: 120
---

# Guía 4 · Simulamos la base y el hombro

## Objetivo del día

Conocer **Tinkercad Circuits** y simular las dos primeras articulaciones de la garra: la **base** y el **hombro**, cada una con su perilla.

**Al terminar tendremos:** dos servos simulados que siguen a dos perillas, y el Monitor en serie mostrando sus ángulos.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del equipo
- Bitácora y lápiz

Mientras simulamos (sábados 4, 5 y 6), se imprimen la base y el plato que diseñaron en la Guía 2. Los eslabones y la pinza se terminan y se revisan en la Guía 7, antes de imprimirlos.

## Parte 1 · Conociendo Tinkercad Circuits (15 min)

Un **simulador** imita un circuito real: el Arduino, los servos y los cables son virtuales, pero el código es el mismo. Así probamos todo sin miedo a quemar nada y, cuando funcione, lo armamos de verdad.

1. Entra a **tinkercad.com** con la cuenta del equipo.
2. Arriba a la derecha, **+ Crear → Circuitos**.
3. Haz clic en el nombre inventado de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_garra_sim`. **Enter**. El diseño se guarda solo.

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

## Parte 2 · La base con su perilla (35 min)

Es el circuito de la perilla de la Guía 1, ahora en el simulador.

1. **Arduino y protoboard:** arrastra un **Arduino Uno R3** y una **Placa de pruebas pequeña**, uno al lado del otro, sin que se tapen.
2. **Filas de abajo:** un cable del **5V** del Arduino a la fila **+** de **abajo** de la protoboard y otro de un **GND** a la fila **−** de abajo.
3. **Servo de la base:** arrastra un **Microservomotor** fuera de la protoboard. Pasa el mouse por sus tres pines para ver cuál es la señal, la potencia (+) y la tierra (−).
4. **Perilla de la base:** arrastra un **Potenciómetro** a la protoboard, con cada pata en una columna distinta.
5. Conecta con cables, como en la tabla:

| Componente | Conexión |
| --- | --- |
| Servo base | Señal → **D3** · Potencia → fila + de abajo · Tierra → fila − de abajo |
| Perilla base | Pata izquierda → fila + de abajo · pata del centro → **A0** · pata derecha → fila − de abajo |

6. Toca **Código**. Arriba dice **Bloques**: ábrelo y elige **Texto**. Aparece la pregunta "¿Está seguro?": toca **Continuar**.
7. Borra todo lo que trae (**Ctrl + A** y **Supr**) y escribe:

```cpp
#include <Servo.h>
Servo base;

// Convierte una perilla en grados
int leer(int pin, int minimo, int maximo) {
  return map(analogRead(pin), 0, 1023, minimo, maximo);
}

void setup() {
  base.attach(3);
  Serial.begin(9600);
}

void loop() {
  int b = leer(A0, 0, 180);
  base.write(b);
  Serial.println(b);   // ángulo de la base
  delay(20);
}
```

8. Toca **Iniciar simulación** y abre el **Monitor en serie**. Si sale un recuadro rojo de error, lean la línea que marca y revisen esa parte del código.
9. Haz clic sobre la perilla y arrastra su perilla para girarla. Mira el brazo del servo y el número del Monitor.

:::tabla id="g4p-base"
| Perilla de la base | Ángulo en el Monitor | ¿Hacia dónde apunta el brazo del servo? |
| --- | --- | --- |
| Toda a la izquierda | | |
| En el centro | | |
| Toda a la derecha | | |
:::

La función `leer()` es nueva: hace el mismo `map` de la Guía 1, pero con nombre. Así, para cada perilla escribimos una sola línea.

## Parte 3 · El hombro (35 min)

1. **Detener simulación.** Agrega otro **Microservomotor** (el hombro) y otro **Potenciómetro** (la perilla del hombro).
2. Conéctalos igual que los de la base, pero en otros pines:

| Componente | Conexión |
| --- | --- |
| Servo hombro | Señal → **D5** · Potencia → fila + de abajo · Tierra → fila − de abajo |
| Perilla hombro | Pata izquierda → fila + de abajo · pata del centro → **A1** · pata derecha → fila − de abajo |

[IMAGEN 4.2S: base y hombro simulados en Tinkercad Circuits: dos servos en D3 y D5 y dos potenciómetros en A0 y A1, con las filas de abajo en 5V y GND del Arduino]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones"
| Desde | Hasta | Color | Nota |
| --- | --- | --- | --- |
| Servo base: señal | D3 | naranja | Pin con ~ (PWM) |
| Servo base: + | 5V | rojo | Por la fila + de abajo |
| Servo base: − | GND | café | Por la fila − de abajo |
| Servo hombro: señal | D5 | naranja | Pin con ~ (PWM) |
| Servo hombro: + | 5V | rojo | Por la fila + de abajo |
| Servo hombro: − | GND | café | Por la fila − de abajo |
| Perilla base: izquierda | 5V | rojo | |
| Perilla base: centro | A0 | amarillo | |
| Perilla base: derecha | GND | negro | |
| Perilla hombro: izquierda | 5V | rojo | |
| Perilla hombro: centro | A1 | amarillo | |
| Perilla hombro: derecha | GND | negro | |
:::

3. Cambia el código para que mueva los dos servos:

```cpp
#include <Servo.h>
Servo base, hombro;

// Convierte una perilla en grados
int leer(int pin, int minimo, int maximo) {
  return map(analogRead(pin), 0, 1023, minimo, maximo);
}

void setup() {
  base.attach(3);
  hombro.attach(5);
  Serial.begin(9600);
}

void loop() {
  int b = leer(A0, 0, 180);
  int h = leer(A1, 15, 165);
  base.write(b);
  hombro.write(h);
  // Ángulos en el Monitor: base y hombro
  Serial.print(b);
  Serial.print("\t");
  Serial.println(h);
  delay(20);
}
```

4. **Iniciar simulación.** Gira cada perilla hasta el fondo, para un lado y para el otro, y miren el Monitor: la primera columna es la base y la segunda, el hombro.

:::tabla id="g4p-hombro"
| Perilla del hombro | Ángulo en el Monitor |
| --- | --- |
| Toda a la izquierda | |
| Toda a la derecha | |
:::

:::pregunta id="g4p-p1"
La base va de 0 a 180, pero en el código el hombro va de 15 a 165. ¿Por qué creen que el hombro no usa todo el giro del servo?
:::

## Parte 4 · El sentido del giro (15 min)

En la garra real, si una articulación se mueve al revés de su perilla, no hace falta cambiar ningún cable: se intercambian los **dos últimos números** de su `leer()`.

1. Cambia la línea del hombro por `int h = leer(A1, 165, 15);` e inicia la simulación.
2. Gira la perilla del hombro y compara con lo que pasaba antes.

:::opciones id="g4p-sentido"
Con `leer(A1, 165, 15)`, al girar la perilla a la derecha, el ángulo...
- Sube
- Baja
- No cambia
:::

Al terminar, dejen otra vez `leer(A1, 15, 165)`.

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] El circuito de la base y el hombro está armado en Tinkercad.
- [ ] El código está en modo Texto y sin errores.
- [ ] Cada servo sigue a su perilla.
- [ ] Probamos a invertir el sentido del hombro.
:::

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
- **Versión Blender práctica (9 sábados), desde el 31 de octubre:** guías 1 a 3 iguales; 4, 5 y 6 simulan la garra por partes en **Tinkercad Circuits** (base y hombro; las cuatro articulaciones con la fuente; botón y rutina); 7 termina y revisa las piezas en Blender; 8 arma todo en físico y 9 son pruebas, ajustes y el reto. Antes era de 7 sábados: el contenido de las guías 4 a 7 anteriores se repartió en las guías 5 a 9. Campos propios (g4p-…).
- Imprimir esta semana y la siguiente la base y el plato (Guía 2): en la Guía 7 se prueba el servo real en ellos. Tener los componentes de la lista para el sábado 8.
- Mismos pines de la garra en todas las guías: servos en D3 (base), D5 (hombro), D6 (codo) y D9 (pinza); perillas en A0 a A3; botón en D2.
- En Tinkercad, al pasar de Bloques a Texto pueden quedar restos del ejemplo: por eso se borra todo con Ctrl + A.
- Hoy los dos servos usan el 5V del Arduino porque en el simulador no pasa nada. En la Guía 5 se explica por qué la garra real necesita una fuente aparte.
- g4p-p1: para que el brazo no choque contra el plato o la mesa en los extremos; los límites de verdad se encuentran con la garra armada (Guía 9).
- g4p-sentido: baja.
- Tiempo total: 15 + 35 + 35 + 15 + 5 + 15 = 120 minutos.
:::
