---
titulo: Armamos la garra
guia: 8
sabado: 8
sesion: Construcción del prototipo
duracion: 120
---

# Guía 8 · Armamos la garra

## Objetivo del día

Centrar los servos y montar las piezas impresas: base, plato, brazo y pinza.

**Al terminar tendremos:** la garra armada, con los cuatro servos centrados y montados. El circuito se conecta en la Guía 9.

## Materiales del equipo

- Piezas impresas: base, plato giratorio, eslabón del hombro, eslabón del codo, engrane motriz, engrane seguidor y placa de la pinza
- 4 servos SG90 o MG90S (el hombro, de preferencia MG90S) con sus tornillos y brazos (horns)
- Tornillo M3 con tuerca, lija fina, destornillador pequeño, cinta para etiquetas
- Arduino UNO y 3 cables macho–macho (para centrar los servos)

## Parte 1 · Centrar los servos (20 min)

**Muy importante:** antes de atornillar cualquier pieza a un servo, hay que ponerlo en el centro (90°). Así cada articulación podrá girar lo mismo hacia los dos lados.

1. Con el Arduino **desconectado**, conecta un servo directo al Arduino: cable **café → GND**, **rojo → 5V**, **naranja → pin 9**.
2. Llamen al docente: conecta el USB y sube un programa corto que deja el servo en el centro (90°). El servo gira un poquito y se queda quieto. Cómo se sube un programa lo aprenderán en la Guía 10.
3. Desconecten el USB, cambien al siguiente servo y vuelvan a conectar el USB: el programa ya está en el Arduino y centra el nuevo servo. Centren así **tres** servos y pónganles una etiqueta de cinta: **B** (base), **H** (hombro) y **C** (codo).
4. **El de la pinza va en 60°** (pinza a medio abrir): el docente sube el programa con 60 y el cuarto servo conectado. Pónganle la etiqueta **P**.

Desde ahora, **no giren los ejes con la mano**.

## Parte 2 · Base, plato y brazo (50 min)

1. **Coloca el servo B en la base**, con el eje hacia arriba, y atornilla sus pestañas sobre los dos agujeros pequeños del borde. Pasa los cables por el hueco sin doblarlos fuerte. Aprieta sin forzar: el plástico se puede romper.

[IMAGEN 4.1: servo colocado dentro de la base, con las pestañas atornilladas]

2. **Atornilla un brazo (horn) debajo del plato giratorio**, con su agujero central justo debajo del agujero central del plato.
3. **Encaja el plato en el eje del servo** con la pared mirando al frente (hacia donde estará quien maneja la garra) y pon el tornillo central sin apretar demasiado.

[IMAGEN 4.2: plato giratorio montado sobre la base, con la pared de soporte al frente]

4. **Servo del hombro (H):** colócalo en la ventana de la pared del plato, con el eje hacia afuera, y atornilla sus pestañas en los dos agujeros de los lados.
5. **Eslabón del hombro:** atornilla un brazo del servo al agujero redondo del extremo (no a la ventana), encájalo en el eje del servo H con el eslabón **apuntando hacia arriba** y pon el tornillo central.
6. **Servo del codo (C):** colócalo en la ventana de la otra punta del eslabón del hombro y atornilla sus pestañas.
7. **Eslabón del codo:** igual que el paso 5, en el eje del servo C, pero **apuntando al frente** (acostado hacia adelante).

[IMAGEN 5.1: brazo montado con base, hombro y codo, señalando cada servo]

**✔ Revisa:** sin conectar nada, el brazo queda como una L: el eslabón del hombro de pie y el del codo hacia adelante.

## Parte 3 · La pinza (35 min)

1. **Lija un poco los dientes de los engranes** si no giran suave al juntarlos con la mano.
2. **Servo de la pinza (P):** colócalo en la ventana de la placa de la pinza y atornilla las pestañas.
3. **Engrane motriz:** atornilla un brazo del servo debajo de su agujero central y encájalo en el eje con las mandíbulas **medio abiertas**. Pon el tornillo central.
4. **Engrane seguidor:** pasa el tornillo M3 por su agujero y por el de la placa, con la tuerca por debajo. Antes de apretar, gíralo para que su mandíbula quede en espejo con la otra. Debe girar libre con el dedo.
5. **Une la placa de la pinza** al extremo del eslabón del codo, con los tornillos que indique el docente.

[IMAGEN 6.1: pinza montada en el eslabón del codo, señalando engrane motriz, seguidor y tornillo M3]

## ¿Lo logramos? (5 min)

:::checklist id="g8p-logramos"
- [ ] Centramos los cuatro servos antes de atornillar.
- [ ] La base, el brazo y la pinza están montados.
- [ ] El brazo queda como una L: el eslabón del hombro de pie y el del codo hacia adelante.
:::

## Bitácora (10 min)

:::foto id="g8p-foto"
Foto de la garra armada.
:::

:::pregunta id="g8p-b1"
¿Qué problema tuvimos al armar y cómo lo resolvimos?
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (11 sábados desde el 13 de noviembre):** el montaje de la Guía 4 práctica anterior (centrar servos, base, plato y brazo) y de la pinza de la Guía 5 práctica anterior. El circuito pasó a la Guía 9 y el programa final a la Guía 10 (guías de armado); la revisión del circuito (g8p-revision) y la tabla de las perillas (g8p-respuesta) también. Campos propios (g8p-…).
- **Programa para centrar los servos (lo sube el docente en la Parte 1):** Arduino IDE, placa Arduino Uno y su puerto. Para el servo de la pinza, `miServo.write(60);`:

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
- Si el servo no entra en la base, lijar el hueco.
- Revisar que el engrane seguidor gire libre; si el tornillo M3 está muy apretado, el servo de la pinza se fuerza.
- Tiempo total: 20 + 50 + 35 + 5 + 10 = 120 minutos.
:::
