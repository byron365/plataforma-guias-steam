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

:::animacion tipo="elevador"
:::

## Parte 2 · Roles (10 min)

| Rol | Responsabilidad | Nombre |
| --- | --- | --- |
| Arquitecto | Diagramas centralizado y distribuido, flujo de señales, energía | |
| Ingeniero de potencia | Fuente, regulador, puente H, finales de carrera | |
| Ingeniero de comunicaciones | I2C maestro–esclavos, direcciones, sondeo | |
| Programador e integrador | Código de la central y de los nodos, pruebas | |

Nombre del equipo: ______

## Parte 3 · Requisitos (25 min)

Un elevador es un **sistema crítico**: un error puede lastimar a alguien. Por eso los requisitos de **seguridad** son tan importantes como los de funcionamiento.

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

:::animacion tipo="puente-h"
:::

| ENA | IN1 | IN2 | Motor |
| --- | --- | --- | --- |
| PWM | HIGH | LOW | Sube |
| PWM | LOW | HIGH | Baja |
| 0 | — | — | Libre (sigue por inercia) |
| 255 | HIGH | HIGH | **Freno activo** |

**Conexiones:**

| L298N | Destino |
| --- | --- |
| +12V | Fuente + (con fusible) |
| GND | Fuente − **y** GND del Arduino |
| ENA | D5 (quita el puente/jumper de ENA) |
| IN1 / IN2 | D7 / D8 |
| OUT1 / OUT2 | Motor |
| Botón "subir" / "bajar" | D2 / D3 a GND |

[IMAGEN 1.2: L298N conectado al Arduino, al motor y a la fuente, con el jumper de ENA retirado]

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
