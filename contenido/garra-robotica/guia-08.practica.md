---
titulo: Armamos la garra
guia: 8
sabado: 8
sesion: Construcción del prototipo
duracion: 120
---

# Guía 8 · Armamos la garra

## Objetivo del día

Centrar los servos, montar las piezas impresas (base, plato, brazo y pinza), armar el circuito **copiándolo del simulador** y subir el programa final.

**Al terminar tendremos:** la garra completa moviéndose con las cuatro perillas.

## Materiales del equipo

- Piezas impresas: base, plato giratorio, eslabón del hombro, eslabón del codo, engrane motriz, engrane seguidor y placa de la pinza
- 4 servos SG90 o MG90S (el hombro, de preferencia MG90S) con sus tornillos y brazos (horns)
- Tornillo M3 con tuerca, lija fina, destornillador pequeño, cinta para etiquetas
- Arduino UNO con cable USB, protoboard, cables, 4 potenciómetros de 10 kΩ y 1 pulsador
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos
- Computadora con Arduino IDE, el circuito simulado abierto en Tinkercad y `equipo_NOMBRE_rutina.txt` (Guía 6)

## Parte 1 · Centrar los servos (15 min)

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
4. Desconecta el USB, cambia al siguiente servo y vuelve a conectar el USB: el código ya está en el Arduino y centra el nuevo servo. Centra así **tres** servos y ponles una etiqueta de cinta: **B** (base), **H** (hombro) y **C** (codo).
5. **El de la pinza va en 60°** (pinza a medio abrir): cambia `miServo.write(90);` por `miServo.write(60);`, súbelo con el cuarto servo conectado y ponle la etiqueta **P**.

Desde ahora, **no giren los ejes con la mano**.

## Parte 2 · Base, plato y brazo (30 min)

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

## Parte 3 · La pinza (20 min)

1. **Lija un poco los dientes de los engranes** si no giran suave al juntarlos con la mano.
2. **Servo de la pinza (P):** colócalo en la ventana de la placa de la pinza y atornilla las pestañas.
3. **Engrane motriz:** atornilla un brazo del servo debajo de su agujero central y encájalo en el eje con las mandíbulas **medio abiertas**. Pon el tornillo central.
4. **Engrane seguidor:** pasa el tornillo M3 por su agujero y por el de la placa, con la tuerca por debajo. Antes de apretar, gíralo para que su mandíbula quede en espejo con la otra. Debe girar libre con el dedo.
5. **Une la placa de la pinza** al extremo del eslabón del codo, con los tornillos que indique el docente.

[IMAGEN 6.1: pinza montada en el eslabón del codo, señalando engrane motriz, seguidor y tornillo M3]

## Parte 4 · El circuito, copiado del simulador (25 min)

Es el mismo circuito de Tinkercad: tengan la simulación abierta y copien **cable por cable**. Lo único distinto es la fuente: en lugar de la Fuente de alimentación del simulador, la **fuente de 5 V** se enchufa en el **jack hembra**, que tiene dos tornillos marcados **+** y **−**. Para meter un cable en un tornillo: aflójenlo con el destornillador, metan la punta pelada del cable y aprieten.

Arma todo con el **USB desconectado** y la **fuente desenchufada**.

| Qué | Conexión |
| --- | --- |
| Jack hembra + / − | Fila **+** de arriba / fila **−** de arriba |
| Arduino 5V / GND | Fila **+** de abajo / fila **−** de abajo |
| GND común | Un cable de la fila **−** de arriba a la fila **−** de abajo. **Nunca unas las dos filas +.** |
| Servos (rojo / café / naranja) | Fila + de arriba / fila − de arriba / su pin: base **D3**, hombro **D5**, codo **D6**, pinza **D9** |
| Perillas (izquierda / centro / derecha) | Fila + de abajo / su pin: base **A0**, hombro **A1**, codo **A2**, pinza **A3** / fila − de abajo |
| Pulsador | Una pata → **D2** · la pata en diagonal → fila − de abajo |

Pongan las perillas en el mismo orden que la garra y márquenlas con cinta.

[IMAGEN 5.2F: circuito completo de la garra con la fuente de 5 V en su jack hembra en las filas de arriba, los 4 servos, las 4 perillas, el pulsador y el GND común]

:::checklist id="g8p-revision"
- [ ] El + del jack va a la fila + de arriba y el − a la fila − de arriba.
- [ ] GND común unido.
- [ ] Ningún servo en el 5V del Arduino.
- [ ] Cada cable naranja en su pin.
:::

## Parte 5 · Subir el programa final (15 min)

1. Abran `equipo_NOMBRE_rutina.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 6), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_rutina`.
2. Conecten el USB, verifiquen (✓) y súbanlo (→). Después enchufen la fuente de 5 V al tomacorriente y a su jack hembra.
3. **Prueben una perilla a la vez, despacio.** Si una pieza va a chocar, suelten la perilla. Si algo hace ruido raro o se calienta, desenchufen la fuente.
4. Todavía **no presionen el botón**: las posiciones de la rutina se corrigen la próxima semana.

:::tabla id="g8p-respuesta"
| Articulación | ¿Se mueve? | ¿Gira al lado correcto? |
| --- | --- | --- |
| Base | | |
| Hombro | | |
| Codo | | |
| Pinza | | |
:::

> Si una articulación gira al revés de la perilla, intercambien los dos últimos números de su `leer()`, como en la Guía 4. Ejemplo: `leer(A1, 165, 15)`.

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Tinkercad.

## ¿Lo logramos? (5 min)

:::checklist id="g8p-logramos"
- [ ] Centramos los cuatro servos antes de atornillar.
- [ ] La base, el brazo y la pinza están montados.
- [ ] El circuito es igual al del simulador, con la fuente y el GND común.
- [ ] Las cuatro perillas mueven su articulación.
:::

## Bitácora (10 min)

:::foto id="g8p-foto"
Foto de la garra armada con su circuito.
:::

:::pregunta id="g8p-b1"
¿Qué problema tuvimos al armar y cómo lo resolvimos?
:::

Antes de irse, desenchufen la fuente y el USB.

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (9 sábados), desde el 31 de octubre:** el montaje de la Guía 4 práctica anterior (centrar servos, base, plato y brazo) y de la pinza de la Guía 5 práctica anterior, con el circuito copiado de la simulación. Campos propios (g8p-…).
- La fuente de 5 V con jack hembra reemplaza al portapilas de 4 AA (decisión de Bairon). Que sea de al menos 2 A: cuatro servos juntos piden bastante corriente.
- Si el servo no entra en la base, lijar el hueco.
- Revisar el GND común de cada equipo antes de que enchufen la fuente: es el error más frecuente.
- Si el Arduino se reinicia al mover varias perillas, revisar que ningún servo esté en el 5V del Arduino.
- Revisar que el engrane seguidor gire libre; si el tornillo M3 está muy apretado, el servo de la pinza se fuerza.
- El programa final ya tiene el modo manual: no hace falta otro programa para probar las perillas.
- Tiempo total: 15 + 30 + 20 + 25 + 15 + 5 + 10 = 120 minutos.
:::
