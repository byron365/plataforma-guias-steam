---
titulo: La base gira y nace la pinza
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · La base gira y nace la pinza

## Objetivo del día

Montar las primeras piezas impresas (base y plato giratorio) con su servo, y modelar en Tinkercad la **pinza de engranes**.

**Al terminar tendremos:** la base de la garra girando con una perilla y la pinza exportada en STL.

## Materiales del equipo

- Base y plato giratorio impresos
- 1 servo SG90 con sus tornillos y brazos (horns)
- Destornillador pequeño
- Arduino UNO, protoboard, cables y 1 potenciómetro
- Computadora con Arduino IDE, internet y la cuenta de Tinkercad del equipo

## Parte 1 · Repaso rápido (10 min)

Revisen las piezas impresas: ¿coinciden con lo que diseñaron? Midan el hueco de la base con el calibrador.

Para medir un hueco por dentro se usan las **puntas pequeñas de arriba** del calibrador: ciérralas, mételas en el hueco y ábrelas hasta que toquen las dos paredes. Lee la medida igual que siempre.

| Medida del hueco | Valor (mm) |
| --- | --- |
| Largo | |
| Ancho | |

Ahora prueben meter el servo en el hueco con cuidado, sin forzarlo:

:::opciones id="g4-entra"
¿Entra el servo?
- Sí
- Muy justo
- No
:::

## Parte 2 · Montar la base (35 min)

**Muy importante:** antes de atornillar cualquier pieza al servo, hay que ponerlo en el centro (90°). Así el brazo podrá girar lo mismo hacia los dos lados.

1. **Centrar el servo:**
   - Con el Arduino **desconectado** de la computadora, conecta el servo directo al Arduino: cable **café → GND**, cable **rojo → 5V**, cable **naranja → pin 9**.
   - Conecta el USB, abre Arduino IDE, elige la placa **Arduino Uno** y su puerto en la lista **Seleccionar placa** (arriba).
   - Crea un programa nuevo (**Archivo → Nuevo boceto**), borra lo que trae y escribe este código:

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

   - Súbelo con **→ (Subir)** y espera "Carga completada". El servo gira un poquito y se queda quieto: ya está en 90°.
   - Desde ahora, **no gires el eje con la mano**, o se descentra.

2. **Coloca el servo en la base**, con el eje hacia arriba, y atornilla sus pestañas.
   - Pasa los cables por el hueco con cuidado, sin doblarlos fuerte.
   - Las pestañas quedan apoyadas en el borde de arriba de la base, sobre los dos agujeros pequeños.
   - Usa los tornillos que vienen en la bolsita del servo. Aprieta hasta que el servo no se mueva, pero sin forzar: el plástico se puede romper.

[IMAGEN 4.1: servo colocado dentro de la base, con las pestañas atornilladas]

3. **Atornilla un brazo (horn) del servo debajo del plato giratorio**, centrado en el agujero.
   - Pon el brazo contra la cara de **abajo** del plato, de modo que su agujero central quede justo debajo del agujero central del plato.
   - Fíjalo con los tornillos pequeños de la bolsita del servo.

4. **Encaja el plato en el eje del servo** con la pared de soporte mirando al frente, y fija el tornillo central.
   - "Al frente" es hacia donde quedará la persona que maneja la garra.
   - Empuja el plato hacia abajo hasta que el brazo entre en el eje.
   - Pasa el tornillo central (el más largo de la bolsita) por el agujero del plato y atorníllalo al eje, sin apretar demasiado.

[IMAGEN 4.2: plato giratorio montado sobre la base, con la pared de soporte al frente]

5. **Prueba con la perilla:**
   - Desconecta el USB.
   - Arma el circuito de la perilla de la guía 1: cable del **5V** del Arduino a la fila **+** de la protoboard y del **GND** a la fila **−**; **rojo** del servo a la fila **+**, **café** a la fila **−** y **naranja** al **pin 9**; potenciómetro con la **pata izquierda** a la fila **+**, la **pata derecha** a la fila **−** y la **pata del centro** al pin **A0**.
   - Abre el programa de la perilla de la guía 1 (`equipo_NOMBRE_perilla`). Si estás en otra computadora, descárgalo del recuadro "Archivo de trabajo" de la Guía 1. Revisa que la línea del `map` termine en `30, 150);` (los límites de 30° a 150° del mini reto).
   - Conecta el USB, súbelo y gira la perilla. ¡La base de la garra gira!

:::pregunta id="g4-p1"
¿Qué pasaría si atornilláramos el plato sin centrar antes el servo?
:::

## Parte 3 · Modelando la pinza (55 min)

La pinza tiene dos engranes iguales que giran en sentidos opuestos. El servo mueve uno (el **motriz**) y el otro lo sigue (el **seguidor**): así las dos mitades cierran parejas.

:::animacion tipo="engranes"
:::

[IMAGEN 4.3: render de la pinza de engranes terminada, señalando engrane motriz y engrane seguidor]

Son **tres diseños**: engrane motriz, engrane seguidor y placa (al exportar se guarda todo lo que hay en el diseño).

Recuerda: cada forma nace **centrada**, **Mover** mueve la última forma que agregaste y **Girar alrededor** la gira desde su centro.

1. **Diseño nuevo:** **+ Crear → Codeblocks**, con el nombre `equipo_NOMBRE_pinza_motriz`.

2. **Engrane de 12 dientes:** Codeblocks no tiene un bloque de engrane, así que lo armamos: un disco y, encima, barras que cruzan todo el disco. Cada barra sale por los dos lados: son **dos dientes**.
   - **Disco:** un **Cilindro** con **Radio = 8.5**, **A = 4**, **Lados = 32**.
   - **Primera barra:** un **Cubo** con primer **A = 23**, **L = 2.5**, segundo **A = 4**, **arista = 0**. No lo muevas: cruza el disco por el centro y sobresale 3 mm de cada lado.
   - **Las demás barras:** de **Controlar**, el bloque **Repetir** con **5** veces. **Dentro**, de **Modificar**, **Copiar** y debajo **Girar alrededor** con **Eje z** y **30** grados. Cada vuelta copia la última barra y la gira 30°.
   - Ejecuta con **▷** y mira desde arriba (cara **SUPERIOR** del cubito de vistas): deben verse **12 dientes** parejos alrededor del disco (6 barras × 2 lados).

[IMAGEN 4.4T: engrane de 12 dientes hecho con un cilindro y barras giradas con Repetir en Tinkercad Codeblocks]

3. **Mandíbula:** **debajo** del Repetir (no dentro), un **Cubo** con primer **A = 6**, **L = 45**, segundo **A = 4**, **arista = 0** y **Mover: X 0, Y −22.5, Z 0**.
   - Así su punta de arriba queda en el centro del engrane y la mandíbula sale 45 mm hacia abajo (vista desde arriba).

4. **Agujero del centro:** un **Cilindro** hueco (círculo rayado) con **Radio = 1.1** (2.2 ÷ 2), **A = 10**, **Lados = 16**. No lo muevas. Es para el tornillo del brazo del servo.

5. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** un engrane con su mandíbula y un agujero pequeño en el centro.

[IMAGEN 4.5T: engrane motriz con su mandíbula y el agujero del centro en Tinkercad Codeblocks]

6. **Engrane seguidor:** diseño nuevo `equipo_NOMBRE_pinza_seguidor`, con **los mismos bloques** de los pasos 2 a 5.
   - Solo cambia el agujero: **Radio = 1.6** (3.2 ÷ 2). Es para el tornillo M3 que hace de eje.
   - Los dos engranes son iguales y las mandíbulas son rectas: al armarlas, una queda como espejo de la otra.

7. **Placa de soporte:** diseño nuevo `equipo_NOMBRE_pinza_placa`. Es la pieza donde va atornillado el servo de la pinza; los engranes van encima.
   - En este diseño, el punto X = 0, Y = 0 es donde irá el **centro del engrane motriz** (justo encima del eje del servo). El engrane seguidor va 20.5 mm a la derecha (X = 20.5).
   - **Placa:** un **Cubo** con primer **A = 60**, **L = 35**, segundo **A = 4**, **arista = 0** y **Mover: X 10.25, Y 8, Z 0**. Cubre los centros de los dos engranes y queda **detrás** de ellos (del lado contrario a las mandíbulas).
   - **Ventana para el servo:** midan con el calibrador la distancia del **centro del eje** del servo al **borde más cercano** de su cuerpo. La ventana mide 23.4 mm: su centro va a 11.7 − (esa distancia) del eje. Por ejemplo, si mide 6 mm: 11.7 − 6 = 5.7.
   - Agrega un **Cubo** hueco con primer **A = 23.4**, **L = 12.8**, segundo **A = 10** y **Mover: X** = −(el número que calcularon, con signo menos; en el ejemplo, **−5.7**), **Y 0, Z 0**.
   - **Agujero bajo el engrane seguidor:** un **Cilindro** hueco con **Radio = 1.6**, **A = 10** y **Mover: X 20.5, Y 0, Z 0**.
   - **Seleccionar todo** y **Group Selection**. Ejecuta con **▷** y revisa desde arriba que la ventana y el agujero queden dentro de la placa.

8. **Exporta** tres archivos, uno desde cada diseño (**Compartir** → **.STL**, y cámbiale el nombre si hace falta):
   - `equipo_NOMBRE_pinza_motriz` → `equipo_NOMBRE_pinza_motriz.stl`
   - `equipo_NOMBRE_pinza_seguidor` → `equipo_NOMBRE_pinza_seguidor.stl`
   - `equipo_NOMBRE_pinza_placa` → `equipo_NOMBRE_pinza_placa.stl`

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

Pista: en los diseños de los engranes, antes de **Seleccionar todo**, agrega **Cubos** de 2 × 2 × 2 mm en la cara interna de la punta de cada mandíbula (la que mira a la otra mandíbula). La mandíbula va de X −3 a 3 y de Y 0 a −45: un cubito en **X 4, Y −42, Z 0** queda pegado a un lado de la punta. Recuerden que, al armar la pinza, la cara interna de una mandíbula es la del lado contrario en la otra. Después vuelvan a exportar.

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

Antes de irse, guarden juntos en un `.zip` los tres `.stl` y el programa de la perilla (`.ino`). Para hacer el `.zip`: selecciónenlos en la carpeta → clic derecho → **Comprimir en archivo ZIP** (o **Enviar a → Carpeta comprimida**). Súbanlo aquí:

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban los .stl que exportaron y su código de Arduino (.ino). Los diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las piezas de la pinza esta semana; se montan el sábado 6.
- Si el servo no entra en la base, lijar el hueco o anotar el ajuste para la versión 2.
- Los engranes impresos pueden necesitar lijado ligero para girar suaves.
- **Versión Tinkercad (Codeblocks):** no hay bloque de engrane; se arma con un disco de radio 8.5 y 6 barras de 23 × 2.5 mm giradas 30° con Repetir (12 dientes rectos, punta a 11.5 mm). Con los centros a 20.5 mm queda 0,5 mm de juego entre la punta de un diente y el fondo del otro. Los dientes rectos no ruedan tan suave como los de la extensión de Blender: lijar y probar. La ventana del servo en la placa depende de la distancia eje-borde que mida cada equipo (≈ 6 mm en el SG90 → X ≈ −5.7).
- Tiempo total: 10 + 35 + 55 + 5 + 15 = 120 minutos.
:::
