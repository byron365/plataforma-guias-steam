---
titulo: Montar la base y el brazo
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · Montar la base y el brazo

## Objetivo del día

Centrar los servos, montar las piezas impresas de la base, el plato y el brazo (hombro y codo), y hacer girar la base con una perilla.

**Al terminar tendremos:** el brazo armado hasta el codo y la base girando con la perilla.

## Materiales del equipo

- Piezas impresas: base, plato giratorio, eslabón del hombro y eslabón del codo
- 3 servos SG90 o MG90S (el hombro, de preferencia MG90S) con sus tornillos y brazos (horns)
- Destornillador pequeño, cinta para etiquetas, calibrador o regla
- Arduino UNO con cable USB, protoboard, cables y 1 potenciómetro
- Computadora con Arduino IDE

## Parte 1 · Revisar las piezas (10 min)

Midan el hueco de la base con las **puntas pequeñas de arriba** del calibrador: ciérrenlas, métanlas en el hueco y ábranlas hasta que toquen las dos paredes.

:::tabla id="g4p-hueco"
| Medida del hueco | Valor (mm) |
| --- | --- |
| Largo | |
| Ancho | |
:::

Prueben meter un servo en el hueco con cuidado, sin forzarlo:

:::opciones id="g4p-entra"
¿Entra el servo?
- Sí
- Muy justo
- No
:::

## Parte 2 · Centrar los servos (15 min)

**Muy importante:** antes de atornillar cualquier pieza a un servo, hay que ponerlo en el centro (90°). Así cada articulación podrá girar lo mismo hacia los dos lados.

1. Con el Arduino **desconectado**, conecta un servo directo al Arduino: cable **café → GND**, **rojo → 5V**, **naranja → pin 9**.
2. Conecta el USB, abre Arduino IDE, elige **Arduino Uno** y su puerto en **Seleccionar placa**. Crea un programa nuevo (**Archivo → Nuevo boceto**), borra lo que trae y escribe:

```cpp
#include <Servo.h>
Servo miServo;

void setup() {
  miServo.attach(9);
  miServo.write(90);  // centro
}

void loop() {
}
```

3. Súbelo con **→ (Subir)**. El servo gira un poquito y se queda quieto: ya está en 90°.
4. Desconecta el USB, cambia al siguiente servo y vuelve a conectar el USB: el código ya está en el Arduino y centra el nuevo servo. Centra así los **tres** servos.
5. Ponle una etiqueta de cinta a cada uno: **B** (base), **H** (hombro) y **C** (codo). Desde ahora, **no giren sus ejes con la mano**.

## Parte 3 · La base y el plato (25 min)

1. **Coloca el servo B en la base**, con el eje hacia arriba, y atornilla sus pestañas sobre los dos agujeros pequeños del borde. Pasa los cables por el hueco sin doblarlos fuerte. Aprieta sin forzar: el plástico se puede romper.

[IMAGEN 4.1: servo colocado dentro de la base, con las pestañas atornilladas]

2. **Atornilla un brazo (horn) debajo del plato giratorio**, con su agujero central justo debajo del agujero central del plato.
3. **Encaja el plato en el eje del servo** con la pared mirando al frente (hacia donde estará quien maneja la garra) y pon el tornillo central sin apretar demasiado.

[IMAGEN 4.2: plato giratorio montado sobre la base, con la pared de soporte al frente]

## Parte 4 · El brazo (25 min)

1. **Servo del hombro (H):** colócalo en la ventana de la pared del plato, con el eje hacia afuera, y atornilla sus pestañas en los dos agujeros de los lados.
2. **Eslabón del hombro:** atornilla un brazo del servo al agujero redondo del extremo (no a la ventana), encájalo en el eje del servo H con el eslabón **apuntando hacia arriba** y pon el tornillo central.
3. **Servo del codo (C):** colócalo en la ventana de la otra punta del eslabón del hombro y atornilla sus pestañas.
4. **Eslabón del codo:** igual que el paso 2, en el eje del servo C, pero **apuntando al frente** (acostado hacia adelante).

[IMAGEN 5.1: brazo montado con base, hombro y codo, señalando cada servo]

**✔ Revisa:** sin conectar nada, el brazo queda como una L: el eslabón del hombro de pie y el del codo hacia adelante.

## Parte 5 · La base gira con la perilla (25 min)

1. Desconecta el USB. Arma el circuito de la perilla de la Guía 1 con el servo **B**:
   - **5V** del Arduino a la fila **+** de la protoboard y **GND** a la fila **−**.
   - Servo: **rojo** a la fila **+**, **café** a la fila **−** y **naranja** al **pin 9**.
   - Potenciómetro: **pata izquierda** a la fila **+**, **pata derecha** a la fila **−** y **pata del centro** al pin **A0**.
2. Abre el programa de la perilla de la Guía 1 (`equipo_NOMBRE_perilla`; si estás en otra computadora, descárgalo del recuadro "Archivo de trabajo" de la Guía 1). Revisa que la línea del `map` termine en `30, 150);`.
3. Conecta el USB, súbelo y gira la perilla despacio. ¡La base de la garra gira!

:::pregunta id="g4p-p1"
¿Qué pasaría si atornilláramos el plato sin centrar antes el servo?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] Centramos los tres servos antes de atornillar.
- [ ] La base y el plato están montados.
- [ ] El brazo queda como una L.
- [ ] La base gira con la perilla.
:::

## Bitácora (15 min)

:::foto id="g4p-foto"
Foto del brazo armado.
:::

:::pregunta id="g4p-b1"
¿Qué problema tuvimos al armar y cómo lo resolvimos?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (7 sábados), nueva el 24 de octubre:** el montaje de la base de la Guía 4 normal y el del brazo de la Guía 5 normal. Campos propios (g4p-…).
- Si el servo no entra en la base, lijar el hueco.
- Hoy el servo de la base usa el 5V del Arduino (uno solo, sin carga): está bien. Desde el sábado 5, con los cuatro servos, van a pilas.
- g4p-p1: el servo no podría girar lo mismo hacia los dos lados; un lado chocaría o se quedaría corto.
- Tiempo total: 10 + 15 + 25 + 25 + 25 + 5 + 15 = 120 minutos.
:::
