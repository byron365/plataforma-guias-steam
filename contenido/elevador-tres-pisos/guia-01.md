---
titulo: Subir, bajar y frenar
guia: 1
sabado: 1
sesion: Definición del proyecto
duracion: 120
---

# Guía 1 · Subir, bajar y frenar

## Objetivo del día

Definir los requisitos de funcionamiento y de seguridad del elevador y controlar un motor DC con un puente H: subir, bajar, cambiar la velocidad y frenar.

**Al terminar tendremos:** la tabla de requisitos, los roles del equipo y un motor DC controlado en ambos sentidos con PWM.

## Materiales del equipo

- Arduino UNO, puente H L298N (o TB6612FNG)
- Motor DC con reductora
- Fuente o pilas de 9–12 V
- 2 botones, protoboard, cables, multímetro

## Parte 1 · El proyecto (15 min)

Construiremos un **elevador a escala de tres pisos**. Un motor DC sube y baja la cabina con un hilo y una polea. En cada piso hay un botón de llamada, un LED y un display que muestra dónde está la cabina. Habrá finales de carrera y un paro de emergencia.

Primero lo haremos **centralizado** (todo en un Arduino) y luego **distribuido** (un Arduino por piso, comunicados por I2C), para compararlos.

[IMAGEN 1.1: render del elevador de tres pisos con la torre, la cabina, el motor arriba y los nodos de cada piso]

Miren la animación: así funcionará el elevador completo.

:::animacion tipo="elevador"
:::

## Parte 2 · Roles (10 min)

| Rol | Responsabilidad | Nombre |
| --- | --- | --- |
| Arquitecto | Diagramas centralizado y distribuido, flujo de señales, energía | |
| Ingeniero de potencia | Fuente, regulador, puente H, finales de carrera | |
| Ingeniero de comunicaciones | I2C maestro–esclavos, direcciones, sondeo | |
| Programador e integrador | Código de la central y de los nodos, pruebas | |

Repártanse los cuatro roles y escriban cada nombre en la columna **Nombre**. Si el equipo tiene menos de cuatro integrantes, alguien toma dos roles.

Nombre del equipo: ______

## Parte 3 · Requisitos (25 min)

Un elevador es un **sistema crítico**: un error puede lastimar a alguien. Por eso los requisitos de **seguridad** son tan importantes como los de funcionamiento.

Un **requisito** es algo que el elevador debe cumplir y que se puede **comprobar** con una prueba.

1. Para R1 a R4, escriban en la última columna cómo lo comprobarían. Ejemplo para R1: "Llamamos desde el piso 2 y medimos con una regla dónde se detuvo la cabina".
2. En R5 y R6 escriban dos requisitos más que propongan ustedes. En **Tipo** pongan **Funcional** (lo que hace) o **Seguridad** (lo que evita que alguien se lastime).

:::tabla id="g1-requisitos"
| N.º | Requisito | Tipo | ¿Cómo lo comprobaremos? |
| --- | --- | --- | --- |
| R1 | La cabina se detiene en el piso llamado | Funcional | |
| R2 | Nunca pasa de los finales de carrera | Seguridad | |
| R3 | El paro de emergencia detiene el motor al instante | Seguridad | |
| R4 | Atiende llamadas de los tres pisos sin perderlas | Funcional | |
| R5 | | | |
| R6 | | | |
:::

:::pregunta id="g1-p1"
Escribe una situación peligrosa que podría pasar en un elevador real y qué requisito la evita.
:::

## Parte 4 · El puente H (60 min)

Un **puente H** son cuatro interruptores electrónicos que permiten cambiar el sentido de giro del motor. Con **PWM** en el pin ENA controlamos la velocidad.

Miren en la animación cómo se cierran los interruptores para cada sentido de giro:

:::animacion tipo="puente-h"
:::

| ENA | IN1 | IN2 | Motor |
| --- | --- | --- | --- |
| PWM | HIGH | LOW | Sube |
| PWM | LOW | HIGH | Baja |
| 0 | — | — | Libre (sigue por inercia) |
| 255 | HIGH | HIGH | **Freno activo** |

Cada fila de la tabla es una combinación de señales que el Arduino le manda al puente H. **HIGH** es encendido (5 V) y **LOW** es apagado (0 V).

**Conexiones:** hagan todo con el USB y la fuente **desconectados**.

1. **Quiten el jumper de ENA.** Es la pequeña pieza de plástico negro que une los dos pines de ENA. Sáquenla con los dedos o con una pinza y guárdenla en la bolsa del equipo. De los dos pines de ENA, uno recibe la señal y el otro da 5 V: busquen la marca impresa en la placa o pidan al docente que les señale el de la señal, y conecten **D5** a ese.
2. Cables de IN1 e IN2 a D7 y D8, y los dos cables del motor a los tornillos OUT1 y OUT2 (se aflojan con el destornillador, se mete el cable y se aprieta).
3. El GND del L298N va **a la vez** al negativo de la fuente y a un GND del Arduino. Si falta este cable, el motor no obedece.
4. El fusible va en el cable **positivo** de la fuente, antes de llegar a +12V.
5. Cada botón va con una pata a su pin (D2 o D3) y otra a GND. En los botones de 4 patas, usen dos patas en **diagonal**.

| L298N | Destino |
| --- | --- |
| +12V | Fuente + (con fusible) |
| GND | Fuente − **y** GND del Arduino |
| ENA | D5 (quita el puente/jumper de ENA) |
| IN1 / IN2 | D7 / D8 |
| OUT1 / OUT2 | Motor |
| Botón "subir" / "bajar" | D2 / D3 a GND |

[IMAGEN 1.2: L298N conectado al Arduino, al motor y a la fuente, con el jumper de ENA retirado]

**Subir el programa:**

1. Conecten el Arduino por USB (la fuente todavía desconectada).
2. En Arduino IDE, en la lista **Seleccionar placa** de arriba, elijan **Arduino Uno** y su puerto (COM…).
3. **Archivo → Nuevo**, borren lo que trae y escriban el código de abajo.
4. Guárdenlo con **Archivo → Guardar como** con el nombre `equipo_NOMBRE_motor`.
5. Presionen **Verificar** (✓) y luego **Subir** (→). Abajo debe decir "Carga completada".
6. Ahora sí, conecten la fuente.

```cpp
const int ENA = 5, IN1 = 7, IN2 = 8;

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(2, INPUT_PULLUP);   // subir
  pinMode(3, INPUT_PULLUP);   // bajar
}

void motor(int v) {           // + sube, - baja
  digitalWrite(IN1, v > 0);
  digitalWrite(IN2, v < 0);
  analogWrite(ENA, abs(v));
}

void frenar() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, 255);
}

void loop() {
  if (digitalRead(2) == LOW) motor(150);
  else if (digitalRead(3) == LOW) motor(-150);
  else frenar();
}
```

**Cómo hacer cada prueba:**

- **Subir / bajar:** mantengan presionado cada botón y anoten hacia dónde gira el motor. Si gira al revés, intercambien los dos cables del motor en OUT1 y OUT2.
- **Soltar con freno activo:** suelten el botón y miren cuánto tarda en detenerse el eje.
- **Cambiar `frenar()` por `motor(0)`:** en la última línea del `loop()`, cambien `else frenar();` por `else motor(0);`, suban de nuevo (→) y repitan. Al terminar, déjenlo otra vez con `frenar()`.
- **Velocidad mínima:** cambien el `150` de `motor(150)` por números más bajos (120, 100, 80, 60…) y suban cada vez. Anoten el número más bajo con el que el motor todavía arranca.

:::tabla id="g1-pruebas"
| Prueba | Observación |
| --- | --- |
| Botón subir | |
| Botón bajar | |
| Soltar con freno activo | |
| Cambiar `frenar()` por `motor(0)` y soltar | |
| Velocidad mínima a la que el motor arranca (PWM) | |
:::

:::pregunta id="g1-p2"
¿Qué diferencia notaste entre `frenar()` y `motor(0)`? ¿Cuál conviene para que la cabina no se pase del piso?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Tenemos roles.
- [ ] Escribimos requisitos de funcionamiento y de seguridad.
- [ ] El motor sube y baja con los botones.
- [ ] Probamos el freno activo y el libre.
:::

## Bitácora (5 min)

La **bitácora de fallos** acompaña todo el proyecto: cada vez que algo no funcione, anoten el síntoma (qué se ve), la causa (por qué pasó) y la solución (qué hicieron).

:::tabla id="g1-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La bitácora de fallos (síntoma, causa, solución) acompaña todo el proyecto.
- El L298N trae un jumper en ENA: si se deja puesto, el motor va siempre a fondo y el PWM no funciona.
- Si el L298N tiene el jumper de 5V y la fuente es de 12 V o menos, su regulador interno da 5 V; aun así se usará un LM2596 para la lógica del sistema completo.
- g1-p2: el freno activo detiene casi al instante; libre sigue girando por inercia.
- Tiempo total: 15 + 10 + 25 + 60 + 5 + 5 = 120 minutos.
:::
