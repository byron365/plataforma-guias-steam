---
titulo: Simulamos las cuatro articulaciones
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos las cuatro articulaciones

## Objetivo del día

Completar la garra en el simulador: **cuatro servos** con **cuatro perillas**, los servos con una **fuente de 5 V aparte** y el **GND común**, y los **límites seguros** escritos en el código.

**Al terminar tendremos:** el circuito completo de la garra simulado, en modo manual, con el Monitor en serie mostrando los cuatro ángulos.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_garra_sim` (sábado 4)
- Bitácora y lápiz

## Parte 1 · ¿Por qué una fuente aparte? (15 min)

Cuatro servos piden más corriente de la que da el Arduino: si los conectamos al Arduino, se reinicia y la garra tiembla. Por eso en la garra real los servos usan una **fuente de 5 V aparte** (un cargador con su jack), con una regla de oro:

> **Todas las tierras (GND) deben estar unidas.** Sin GND común, los servos no entienden la señal del Arduino.

¿Por qué? La señal del Arduino es un voltaje que se mide **comparado con su GND**. Si el servo tiene otro GND que no está unido, no tiene con qué comparar y no entiende la señal.

En la protoboard vamos a usar las filas así:

| Filas | Qué llevan | Qué se conecta ahí |
| --- | --- | --- |
| + y − de **arriba** | La fuente de 5 V | Los 4 servos |
| + y − de **abajo** | El 5V y el GND del Arduino | Las 4 perillas (y el botón, la próxima semana) |
| Un cable entre las dos filas **−** | El **GND común** | — |

**Nunca se unen las dos filas +:** una tiene los 5 V de la fuente y la otra los del Arduino.

:::pregunta id="g5p-p1"
Si se nos olvida el cable del GND común, ¿qué creen que harán los servos al girar las perillas?
:::

## Parte 2 · El circuito completo en el simulador (45 min)

Abran `equipo_NOMBRE_garra_sim` en Tinkercad (**Diseños → Circuitos**). Ya tiene la base y el hombro de la semana pasada.

1. **Los servos se cambian de filas:** borra los cables **+** y **−** de los dos servos (selecciónalos y **Supr**). Los de las perillas se quedan.
2. **La fuente:** en **Buscar** escribe `fuente` y arrastra la **Fuente de alimentación** (está en **Otros componentes**). Haz clic sobre ella y pon **5 V**: es la fuente de 5 V de la garra real. Ponla arriba de la protoboard.
3. **Las filas de arriba (la fuente):** el cable rojo del **+** de la fuente a la fila **+** de arriba y el negro del **−** a la fila **−** de arriba.
4. **El GND común:** un cable que una la fila **−** de arriba con la fila **−** de abajo.
5. **Dos servos más:** arrastra otros dos **Microservomotor** (el codo y la pinza). Ponlos en fila con los otros, en el orden de la garra: base, hombro, codo y pinza.
6. **Los cuatro servos a la fuente:** potencia (+) de cada servo → fila **+** de arriba; tierra (−) → fila **−** de arriba; señal → su pin.
7. **Dos perillas más:** arrastra otros dos **Potenciómetro** y conéctalos como las otras: pata izquierda → fila + de abajo, pata derecha → fila − de abajo y pata del centro → su pin.

| Articulación | Señal del servo | Centro de la perilla |
| --- | --- | --- |
| Base | D3 | A0 |
| Hombro | D5 | A1 |
| Codo | D6 | A2 |
| Pinza | D9 | A3 |

Si no caben las cuatro perillas, cambien la protoboard por una **Placa de pruebas** (la grande) y pasen los cables.

[IMAGEN 5.1S: garra simulada en Tinkercad Circuits: Fuente de alimentación de 5 V en las filas de arriba con los 4 servos, las 4 perillas en las filas de abajo con el 5V y el GND del Arduino, y el cable del GND común]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones"
| Desde | Hasta | Color | Nota |
| --- | --- | --- | --- |
| Servo base: señal | D3 | naranja | Pin con ~ (PWM) |
| Servo base: + | Fuente 5 V: + | rojo | Por la fila + de arriba |
| Servo base: − | Fuente 5 V: − | café | Por la fila − de arriba |
| Servo hombro: señal | D5 | naranja | |
| Servo hombro: + | Fuente 5 V: + | rojo | |
| Servo hombro: − | Fuente 5 V: − | café | |
| Servo codo: señal | D6 | naranja | |
| Servo codo: + | Fuente 5 V: + | rojo | |
| Servo codo: − | Fuente 5 V: − | café | |
| Servo pinza: señal | D9 | naranja | |
| Servo pinza: + | Fuente 5 V: + | rojo | |
| Servo pinza: − | Fuente 5 V: − | café | |
| Fuente 5 V: − | GND | negro | GND común: une la tierra de la fuente con la del Arduino |
| Perilla base: centro | A0 | amarillo | Lados a la fila + y − de abajo |
| Perilla hombro: centro | A1 | amarillo | |
| Perilla codo: centro | A2 | amarillo | |
| Perilla pinza: centro | A3 | amarillo | |
| Perillas: + | 5V | rojo | Fila + de abajo |
| Perillas: − | GND | negro | Fila − de abajo |
:::

:::checklist id="g5p-revision"
- [ ] La fuente está en 5 V.
- [ ] GND común unido entre las dos filas −.
- [ ] Ningún servo en las filas del Arduino.
- [ ] Las dos filas + no están unidas.
- [ ] Cada señal en su pin.
:::

8. **El modo manual:** toca **Código**, borra todo y escribe:

```cpp
#include <Servo.h>
Servo base, hombro, codo, pinza;

// Convierte una perilla en grados
int leer(int pin, int minimo, int maximo) {
  return map(analogRead(pin), 0, 1023, minimo, maximo);
}

void setup() {
  base.attach(3);
  hombro.attach(5);
  codo.attach(6);
  pinza.attach(9);
  Serial.begin(9600);
}

void loop() {
  int b = leer(A0, 0, 180);
  int h = leer(A1, 15, 165);
  int c = leer(A2, 15, 165);
  int p = leer(A3, 30, 90);
  base.write(b);
  hombro.write(h);
  codo.write(c);
  pinza.write(p);
  // Ángulos en el Monitor: base, hombro, codo y pinza
  Serial.print(b);  Serial.print("  ");
  Serial.print(h);  Serial.print("  ");
  Serial.print(c);  Serial.print("  ");
  Serial.println(p);
  delay(50);
}
```

9. **Iniciar simulación** y abre el **Monitor en serie**: cuatro columnas, en orden **base, hombro, codo y pinza**. Prueba una perilla a la vez.

:::tabla id="g5p-respuesta"
| Articulación | ¿Se mueve su servo? | ¿Su columna cambia en el Monitor? |
| --- | --- | --- |
| Base | | |
| Hombro | | |
| Codo | | |
| Pinza | | |
:::

## Parte 3 · Los límites seguros (40 min)

Cada articulación de la garra real tiene un **límite seguro**: hasta dónde puede girar sin chocar ni forzar el servo. En el código, el límite son los **dos últimos números** de cada `leer()`: aunque la perilla llegue al fondo, el servo nunca pasa de ahí.

En la pinza, el mínimo es **cerrada** y el máximo es **abierta**.

1. Gira cada perilla hasta el fondo, para un lado y para el otro, y anota en la tabla los números que aparecen en el Monitor.

:::tabla id="g5p-limites"
| Articulación | Ángulo con la perilla toda a la izquierda | Ángulo con la perilla toda a la derecha | Límites en el código |
| --- | --- | --- | --- |
| Base | | | 0 y 180 |
| Hombro | | | 15 y 165 |
| Codo | | | 15 y 165 |
| Pinza (cerrada / abierta) | | | 30 y 90 |
:::

2. **Practiquen cambiar un límite:** supongan que, en la garra real, la pinza ya aprieta el objeto en 40° y se abre lo suficiente en 80°. Cambien la línea de la pinza por `int p = leer(A3, 40, 80);`, inicien la simulación y giren su perilla hasta el fondo.

:::opciones id="g5p-pinza"
Con `leer(A3, 40, 80)`, ¿qué números da la pinza en el Monitor?
- De 30 a 90
- De 40 a 80
- De 0 a 180
:::

3. Dejen otra vez `leer(A3, 30, 90)`. Los límites de verdad se miden con la garra armada, en la Guía 9.

:::pregunta id="g5p-p2"
¿Por qué conviene que el límite esté en el código y no solo en el cuidado del piloto al girar la perilla?
:::

4. **Guarden una copia del código:** cópienlo del panel Código (**Ctrl + A**, **Ctrl + C**) a un bloc de notas y guárdenlo como `equipo_NOMBRE_manual.txt`.

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] Los servos usan la fuente de 5 V y hay GND común.
- [ ] Las cuatro perillas mueven su servo.
- [ ] El Monitor en serie muestra los cuatro ángulos.
- [ ] Sabemos dónde se escriben los límites seguros.
:::

## Bitácora (15 min)

:::foto id="g5p-foto"
Captura de pantalla del circuito completo simulado.
:::

:::pregunta id="g5p-b1"
Expliquen con sus palabras para qué sirve el GND común.
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_manual.txt` (y la bitácora, si la llevan en .txt o .docx).
:::

:::docente
- **Versión Blender práctica (9 sábados), desde el 31 de octubre:** el circuito por etapas y el modo manual de la Guía 5 práctica anterior, ahora en Tinkercad Circuits. La garra real usa una **fuente de 5 V con jack hembra** en lugar del portapilas de 4 AA (decisión de Bairon); en el simulador es la **Fuente de alimentación** en 5 V. Campos propios (g5p-…).
- Revisar el GND común de cada equipo: es el error más frecuente. En el simulador los servos igual pueden moverse sin él; explicar que en la garra real no.
- La animación de GND común del proyecto (`gnd-comun`) dibuja un portapilas; por eso aquí se usa el diagrama de conexiones con la fuente.
- g5p-p1: no se moverían bien o temblarían sin control, porque no entienden la señal.
- g5p-limites: los mismos números de cada `leer()` (0 y 180; 15 y 165; 15 y 165; 30 y 90).
- g5p-pinza: de 40 a 80.
- g5p-p2: el código no deja pasar el límite aunque el piloto se equivoque o gire rápido; así no se rompen piezas ni se fuerza el servo.
- Tiempo total: 15 + 45 + 40 + 5 + 15 = 120 minutos.
:::
