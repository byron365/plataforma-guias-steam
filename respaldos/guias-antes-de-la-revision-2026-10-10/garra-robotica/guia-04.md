---
titulo: La base gira y nace la pinza
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · La base gira y nace la pinza

## Objetivo del día

Montar las primeras piezas impresas (base y plato giratorio) con su servo, y modelar en Blender la **pinza de engranes**.

**Al terminar tendremos:** la base de la garra girando con una perilla y la pinza exportada en STL.

## Materiales del equipo

- Base y plato giratorio impresos
- 1 servo SG90 con sus tornillos y brazos (horns)
- Destornillador pequeño
- Arduino UNO, protoboard, cables y 1 potenciómetro
- Computadora con Arduino IDE y Blender

## Parte 1 · Repaso rápido (10 min)

Revisen las piezas impresas: ¿coinciden con lo que diseñaron? Midan el hueco de la base con el calibrador.

| Medida del hueco | Valor (mm) |
| --- | --- |
| Largo | |
| Ancho | |

:::opciones id="g4-entra"
¿Entra el servo?
- Sí
- Muy justo
- No
:::

## Parte 2 · Montar la base (35 min)

**Muy importante:** antes de atornillar cualquier pieza al servo, hay que ponerlo en el centro (90°). Así el brazo podrá girar lo mismo hacia los dos lados.

1. **Centrar el servo:** conéctalo como en la guía 1 y sube este código:

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

2. **Coloca el servo en la base**, con el eje hacia arriba, y atornilla sus pestañas.

[IMAGEN 4.1: servo colocado dentro de la base, con las pestañas atornilladas]

3. **Atornilla un brazo (horn) del servo debajo del plato giratorio**, centrado en el agujero.
4. **Encaja el plato en el eje del servo** con la pared de soporte mirando al frente, y fija el tornillo central.

[IMAGEN 4.2: plato giratorio montado sobre la base, con la pared de soporte al frente]

5. **Prueba:** sube el código de la perilla de la guía 1 (con límites de 30° a 150°) y gira la perilla. ¡La base de la garra gira!

:::pregunta id="g4-p1"
¿Qué pasaría si atornilláramos el plato sin centrar antes el servo?
:::

## Parte 3 · Modelando la pinza (55 min)

La pinza tiene dos engranes iguales que giran en sentidos opuestos. El servo mueve uno y el otro lo sigue: así las dos mitades cierran parejas.

:::animacion tipo="engranes"
:::

[IMAGEN 4.3: render de la pinza de engranes terminada, señalando engrane motriz y engrane seguidor]

1. **Activar los engranes en Blender:** Editar → Preferencias → Complementos → busca "Extra Mesh Objects" y actívalo.

[IMAGEN 4.4: ventana de Preferencias con el complemento Extra Mesh Objects activado]

2. **Primer engrane:** Shift + A → Malla → Engranajes → Engranaje. En el panel que aparece abajo a la izquierda escribe: Número de dientes = 12, Radio = 10, Ancho = 4. Ubicación X = 0.

[IMAGEN 4.5: panel de opciones del engranaje con 12 dientes, radio 10 y ancho 4]

3. **Segundo engrane:** duplica el primero (Shift + D) y muévelo a X = 20.5. Mira desde arriba (tecla 7): los dientes deben encajar sin encimarse. Si se enciman, gíralo un poco en Z hasta que calcen.
4. **Mandíbula:** agrega un cubo de X = 6, Y = 45, Z = 4 y colócalo para que salga hacia abajo desde el primer engrane. Únelo al engrane con Ctrl + J.
5. **Simetría:** duplica esa mandíbula, refléjala en X (Ctrl + M y luego X) y únela al segundo engrane. Las dos mitades quedan como en un espejo.
6. **Agujeros:** en el centro del engrane motriz, un cilindro de 2.2 mm (tornillo del brazo del servo); en el centro del engrane seguidor, uno de 3.2 mm (tornillo M3 que hace de eje). Réstalos con Booleanos.
7. **Placa de soporte:** cubo de X = 60, Y = 35, Z = 4 detrás de los engranes, con una ventana para el servo (23.4 × 12.8 mm) y un agujero de 3.2 mm bajo el engrane seguidor. Usa el servo gris de referencia para que su eje quede justo debajo del engrane motriz.
8. **Exporta** tres archivos: `equipo_NOMBRE_pinza_motriz.stl`, `equipo_NOMBRE_pinza_seguidor.stl` y `equipo_NOMBRE_pinza_placa.stl`.

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] Centramos el servo antes de atornillar.
- [ ] La base y el plato están montados.
- [ ] La base gira con la perilla.
- [ ] Modelamos los dos engranes con sus mandíbulas.
- [ ] Exportamos las tres piezas de la pinza.
:::

## Reto extra

Agrega pequeños dientes o una textura en la punta de las mandíbulas (cubos de 2 mm) para que agarren mejor.

## Bitácora (15 min)

:::foto id="g4-foto"
Foto de la base girando.
:::

:::pregunta id="g4-b1"
¿Por qué los dos engranes deben ser iguales?
:::

:::pregunta id="g4-b2"
¿Qué cambiaríamos de la base si la volviéramos a imprimir?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las piezas de la pinza esta semana; se montan el sábado 6.
- Si el servo no entra en la base, lijar el hueco o anotar el ajuste para la versión 2.
- Los engranes impresos pueden necesitar lijado ligero para girar suaves.
- Tiempo total: 10 + 35 + 55 + 5 + 15 = 120 minutos.
:::
