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

**Preparar el archivo:** abre `equipo_NOMBRE_base.blend` y guárdalo como `equipo_NOMBRE_pinza.blend` (**Archivo → Guardar como**). Oculta la base con **H**; deja el servo gris a la vista, porque lo usarás en el paso 7.

1. **Activar los engranes en Blender** (solo la primera vez en cada computadora):
   - Pon el mouse sobre la vista 3D y presiona **Shift + A → Malla**. Si ya aparece **Gears** (o **Engranajes**) en la lista, salta al paso 2.
   - Si no aparece: **Editar → Preferencias → Administrar extensiones**.
   - Si aparece un botón **Permitir acceso en línea**, presiónalo (necesita internet).
   - En el buscador escribe **Extra Mesh Objects** y presiona **Instalar**.
   - Cierra la ventana de Preferencias.

[IMAGEN 4.4: ventana de Preferencias con el complemento Extra Mesh Objects activado]

2. **Primer engrane (motriz):**
   - **Shift + A → Malla → Gears → Gear**. Esta extensión no viene traducida, así que sus menús aparecen en inglés (si en su computadora salen en español, serán **Engranajes → Engranaje**).
   - Enseguida aparece un panel pequeño abajo a la izquierda (si está cerrado, haz clic en su título para abrirlo). Escribe ahí (las opciones están en inglés): **Number of Teeth = 12** (número de dientes), **Radius = 10** (radio), **Width = 4** (ancho). Revisa que la Posición X sea 0.
   - Hazlo enseguida: si haces otra cosa antes, ese panel desaparece. Si pasa, borra el engrane y créalo otra vez.
   - Ponle nombre: `engrane_motriz`.

[IMAGEN 4.5: panel de opciones del engranaje con 12 dientes, radio 10 y ancho 4]

3. **Segundo engrane (seguidor):**
   - Con el primero seleccionado, presiona **Shift + D** y luego **clic derecho** (la copia se queda encima del original).
   - En el Panel N escribe Posición **X = 20.5**. Llámalo `engrane_seguidor`.
   - Mira desde arriba (tecla **7**, o la bolita **Z** del dibujo de ejes) y acércate a donde se tocan: los dientes deben encajar sin encimarse.
   - Si se enciman, gíralo un poco en Z: en el Panel N prueba **Rotación Z = 15** (medio diente). Ajusta hasta que calcen.

4. **Mandíbula:**
   - Agrega un cubo con Dimensiones X = 6, Y = 45, Z = 4.
   - Colócalo para que salga hacia abajo desde el primer engrane (vista desde arriba): Posición X = 0, Y = −22.5. Así su punta de arriba queda en el centro del engrane y la mandíbula sale 45 mm hacia abajo.
   - Llámalo `mandibula_1`. **Todavía no lo unas** al engrane.

5. **Simetría:**
   - Duplica la mandíbula (**Shift + D** y clic derecho) y escribe su Posición X = 20.5, para que salga del segundo engrane. Llámala `mandibula_2`.
   - Refléjala en X: con el mouse sobre la vista 3D presiona **Ctrl + M**, luego la tecla **X** y luego **Enter**. Las dos mitades quedan como en un espejo.
   - Une cada mandíbula con su engrane: clic en `mandibula_1`, **Shift + clic** en `engrane_motriz`, **Ctrl + J**. Después: clic en `mandibula_2`, **Shift + clic** en `engrane_seguidor`, **Ctrl + J**.

6. **Agujeros** (con el modificador Booleana en modo Diferencia, igual que en la base):
   - En el centro del engrane motriz: cilindro de X = 2.2, Y = 2.2, Z = 10 en Posición X = 0, Y = 0. Es para el tornillo del brazo del servo. Réstalo al `engrane_motriz`.
   - En el centro del engrane seguidor: cilindro de X = 3.2, Y = 3.2, Z = 10 en Posición X = 20.5, Y = 0. Es para el tornillo M3 que hace de eje. Réstalo al `engrane_seguidor`.
   - Recuerda: Aplicar el modificador y después borrar el cilindro cortador.

7. **Placa de soporte:**
   - Agrega un cubo de X = 60, Y = 35, Z = 4 y llámalo `placa`. Es la pieza donde va atornillado el servo de la pinza.
   - Colócala **detrás** de los engranes (del lado contrario a las mandíbulas) y **debajo** de ellos, cubriendo los centros de los dos engranes. Mira de frente (tecla **1**) y baja su Posición Z hasta que quede justo debajo de los engranes, sin tocarlos.
   - **Ventana para el servo:** muestra el servo gris (**Alt + H** si está oculto) y muévelo con el Panel N hasta que su **eje** quede justo debajo del centro del engrane motriz. Mira desde arriba con rayos X (**Alt + Z**) para comprobarlo.
   - Agrega un cubo de X = 23.4, Y = 12.8 y un poco más alto que la placa (Z = 10), colócalo centrado en el **cuerpo** del servo gris y réstalo a la `placa`.
   - **Agujero bajo el engrane seguidor:** cilindro de X = 3.2, Y = 3.2, Z = 10 en X = 20.5, Y = 0. Réstalo a la `placa`.

8. **Exporta** tres archivos. Para cada pieza: haz clic solo en ella (en el Listado), **Archivo → Exportar → STL (.stl)**, activa **Sólo lo seleccionado** y escribe el nombre:
   - `engrane_motriz` → `equipo_NOMBRE_pinza_motriz.stl`
   - `engrane_seguidor` → `equipo_NOMBRE_pinza_seguidor.stl`
   - `placa` → `equipo_NOMBRE_pinza_placa.stl`

   Guarda el archivo de Blender con **Ctrl + S**.

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

Pista: agrega cubos de 2 × 2 × 2 mm en la cara interna de la punta de cada mandíbula (la que mira a la otra mandíbula) y únelos a su engrane con Ctrl + J. Después vuelve a exportar.

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

Antes de irse, guarden juntos en un `.zip` el archivo `equipo_NOMBRE_pinza.blend`, los tres `.stl` y el programa de la perilla (`.ino`). Para hacer el `.zip`: selecciónenlos en la carpeta → clic derecho → **Comprimir en archivo ZIP** (o **Enviar a → Carpeta comprimida**). Súbanlo aquí:

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las piezas de la pinza esta semana; se montan el sábado 6.
- Si el servo no entra en la base, lijar el hueco o anotar el ajuste para la versión 2.
- Los engranes impresos pueden necesitar lijado ligero para girar suaves.
- La extensión Extra Mesh Objects (engranes) se instala con internet una sola vez por computadora: conviene instalarla antes de la clase.
- Tiempo total: 10 + 35 + 55 + 5 + 15 = 120 minutos.
:::
