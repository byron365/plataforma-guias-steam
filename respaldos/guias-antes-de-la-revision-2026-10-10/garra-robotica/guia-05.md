---
titulo: Cuatro perillas, cuatro servos
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Cuatro perillas, cuatro servos

## Objetivo del día

Montar el brazo (hombro y codo) y conectar el circuito completo: cuatro perillas, cuatro servos y una fuente externa para los motores.

**Al terminar tendremos:** el brazo moviéndose con perillas, articulación por articulación.

## Materiales del equipo

- Base con plato (sábado 4), eslabón del hombro y eslabón del codo impresos
- 4 servos SG90 o MG90S (el hombro, de preferencia MG90S)
- 4 potenciómetros de 10 kΩ
- Portapilas de 4 pilas AA con pilas
- Arduino UNO, protoboard grande y cables
- Tornillos y destornillador

## Parte 1 · Seguridad y repaso (10 min)

Cuatro servos piden más corriente de la que da el Arduino. Si los conectamos todos al Arduino, se reinicia y la garra tiembla. Por eso los servos usarán **pilas aparte**, con una regla de oro:

> **Todas las tierras (GND) deben estar unidas.** Sin GND común, los servos no entienden la señal del Arduino.

:::animacion tipo="gnd-comun"
:::

## Parte 2 · Montar el brazo (30 min)

1. **Centra los servos del hombro y del codo** con el código de la guía 4 (`write(90)`), uno a la vez.
2. **Servo del hombro:** colócalo en la ventana de la pared del plato y atornilla sus pestañas.
3. **Eslabón del hombro:** atornilla un brazo (horn) del servo al agujero del extremo y encájalo en el eje del servo, con el eslabón apuntando hacia arriba.
4. **Servo del codo:** colócalo en la ventana del eslabón del hombro.
5. **Eslabón del codo:** igual que el paso 3, en el eje del servo del codo, apuntando al frente.

[IMAGEN 5.1: brazo montado con base, hombro y codo, señalando cada servo]

## Parte 3 · El circuito por etapas (30 min)

Construye el circuito en este orden y revisa cada etapa antes de seguir.

**Etapa A · Energía**

1. Riel superior de la protoboard: **+ de las pilas** (rojo) y **− de las pilas** (negro).
2. Riel inferior: **5V del Arduino** y **GND del Arduino**.
3. Une con un cable los dos rieles negativos (GND común).

**Etapa B · Servos** (rojo y café al riel de las pilas; naranja al Arduino)

| Servo | Pin de señal |
| --- | --- |
| Base | D3 |
| Hombro | D5 |
| Codo | D6 |
| Pinza (suelto por ahora) | D9 |

**Etapa C · Perillas** (patas de los lados al riel del Arduino; centro a su pin)

| Perilla | Pin |
| --- | --- |
| Base | A0 |
| Hombro | A1 |
| Codo | A2 |
| Pinza | A3 |

[IMAGEN 5.2: diagrama del circuito completo con los dos rieles, las 4 perillas, los 4 servos y la unión de GND]

:::animacion tipo="conexiones" circuito="garra-completa"
:::

:::checklist id="g5-revision"
- [ ] GND común unido
- [ ] Ningún servo en el 5V del Arduino
- [ ] Cada cable naranja en su pin
:::

## Parte 4 · El código del modo manual (30 min)

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
}

void loop() {
  base.write(leer(A0, 0, 180));
  hombro.write(leer(A1, 15, 165));
  codo.write(leer(A2, 15, 165));
  pinza.write(leer(A3, 30, 90));
  delay(20);
}
```

1. Sube el código con las pilas desconectadas. Después conecta las pilas.
2. **Prueba una perilla a la vez,** despacio. Si una pieza va a chocar, suelta la perilla.
3. Anota cómo responde cada articulación:

| Articulación | ¿Se mueve? | ¿Gira al lado correcto? | Observaciones |
| --- | --- | --- | --- |
| Base | | | |
| Hombro | | | |
| Codo | | | |
| Pinza (suelta) | | | |

:::pregunta id="g5-p1"
La función `leer()` se usa 4 veces. ¿Qué ventaja tiene escribirla una sola vez?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] Hombro y codo están montados.
- [ ] El circuito tiene GND común y los servos usan las pilas.
- [ ] Las cuatro perillas mueven su servo.
- [ ] Llenamos la tabla de respuesta.
:::

## Reto extra

Si una articulación gira al revés de la perilla, arréglalo sin tocar cables: intercambia los dos últimos números de su `leer()`. Ejemplo: `leer(A1, 165, 15)`.

## Bitácora (15 min)

:::foto id="g5-foto"
Video corto o foto del brazo moviéndose.
:::

:::pregunta id="g5-b1"
¿Por qué los servos usan pilas aparte?
:::

:::pregunta id="g5-b2"
¿Qué articulación necesita ajustes?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Revisar el GND común de cada equipo antes de que conecten las pilas: es el error más frecuente.
- Si el Arduino se reinicia al mover varias perillas, revisar que ningún servo esté en el 5V del Arduino.
- La pinza se monta el sábado 6: hoy solo se comprueba que su servo responde.
- Tiempo total: 10 + 30 + 30 + 30 + 5 + 15 = 120 minutos.
:::
