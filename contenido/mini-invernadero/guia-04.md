---
titulo: La casa y su ventana
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · La casa y su ventana

## Objetivo del día

Construir el cuerpo del invernadero con su compartimento seco, colocar la ventana con bisagra y programar el servo que la abre.

**Al terminar tendremos:** el invernadero armado con una ventana que se abre y se cierra con un botón.

## Materiales del equipo

- Caja transparente o de plástico reciclado
- Bisagra y soporte del servo impresos, palito de pincho
- Cartón o plástico para el compartimento seco
- Servo SG90, botón, Arduino, protoboard, cables
- Cutter (con el docente), silicona, cinta

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g4-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El cuerpo del invernadero (35 min)

1. **Compartimento seco:** pega una caja pequeña o un separador de cartón a un lado del invernadero, **fuera** de la zona de la planta. Ahí irán el Arduino y la protoboard.
   - Debe caber el Arduino con la protoboard al lado. Pruébenlo antes de pegar.
   - Lo importante es que el agua de la maceta y del depósito no pueda llegar ahí.
2. **Ventana:** con ayuda del docente, corta un rectángulo de 8 × 6 cm en el techo. Ese pedazo será la ventana.
   - Ustedes marcan el rectángulo con regla y plumón; el docente corta con el cutter.
3. **Bisagra:** pega una hoja de la bisagra al techo y la otra a la ventana. Únelas con el palito de pincho.
   - Pongan las dos hojas una al lado de la otra, en el borde donde la ventana debe girar, con los nudillos alineados.
   - Pasen el palito de pincho por los dos nudillos y corten lo que sobre.
   - Peguen una hoja al techo y la otra a la ventana (silicona con el docente, o cinta fuerte).
4. Comprueba que la ventana abre y cierra sin trabarse.
   - Ábranla con un dedo varias veces. Si se traba, revisen que el palito esté derecho y que no haya silicona en los nudillos.

[IMAGEN 4.1: techo del invernadero con la ventana cortada y la bisagra impresa unida con el palito]

:::pregunta id="g4-p1"
¿Por qué la ventana va en el techo y no abajo?
:::

## Parte 3 · El servo que empuja (25 min)

1. Pega el **soporte del servo** debajo del techo, junto a la ventana.
   - Del lado contrario a la bisagra, para que el servo empuje la orilla que se abre.
2. Pega un palito de paleta al brazo del servo: será la "mano" que empuja la ventana hacia arriba.
   - Encaja un brazo (horn) en el eje del servo y pega el palito encima con silicona o cinta.
   - Mete el servo en el soporte.
3. Prueba a mano: al girar el brazo, el palito debe levantar la ventana.
   - Gíralo **despacio** y sin forzar. Si el palito no alcanza la ventana, alárguenlo o acerquen el soporte.

[IMAGEN 4.2: servo bajo el techo con un palito en el brazo empujando la ventana hacia arriba]

Muevan el servo en la animación: en 0° la ventana está cerrada.

:::animacion tipo="servo" variable="ventana" inicial="0"
:::

## Parte 4 · Programar la ventana (35 min)

Conecta el servo (**naranja → D9**, **rojo → 5V**, **café → GND**) y un botón entre **D2** y **GND**.

Con el Arduino **desconectado**:

1. Cable del **5V** del Arduino a la fila **+** de la protoboard y de un **GND** a la fila **−**.
2. **Servo:** con tres cables macho–macho en su conector: naranja → pin **9**, rojo → fila **+**, café → fila **−**.
3. **Botón:** clávalo sobre la canaleta del centro de la protoboard (dos patas de cada lado). Usa dos patas en **diagonal** (esquinas opuestas): una → pin **2**; la otra → fila **−**.
4. Conecta el USB, elige **Arduino Uno** y su puerto en **Seleccionar placa**, crea un programa nuevo (**Archivo → Nuevo boceto**), borra lo que trae y escribe:

```cpp
#include <Servo.h>
Servo ventana;

const int BOTON = 2;
bool abierta = false;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);   // botón suelto = HIGH
  ventana.attach(9);
  ventana.write(0);               // cerrada
}

void loop() {
  if (digitalRead(BOTON) == LOW) {    // botón presionado
    abierta = !abierta;               // cambiar: abierta <-> cerrada
    if (abierta) {
      ventana.write(60);
    } else {
      ventana.write(0);
    }
    delay(500);                       // evitar doble toque
  }
}
```

5. Verifica (✓) y sube (→). Presiona el botón: la ventana se abre; presiónalo otra vez: se cierra.
6. **Prueba otros ángulos:** cambia el `60` de `ventana.write(60);` por cada número de la tabla, sube el código, abre la ventana y observa. Si el servo zumba o empuja contra algo, eso es "forzar".

:::tabla id="g4-angulos"
| Ángulo de "abierta" | ¿Cuánto se abre la ventana? | ¿El servo fuerza o choca? |
| --- | --- | --- |
| 30 | | |
| 60 | | |
| 90 | | |
:::

Elijan el ángulo que abre bien la ventana sin forzar, déjenlo en el código y anótenlo:

Nuestro ángulo de ventana abierta: ______

:::pregunta id="g4-p2"
¿Qué hace la línea `abierta = !abierta;`?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] El invernadero tiene compartimento seco.
- [ ] La ventana tiene bisagra y abre sin trabarse.
- [ ] El servo abre y cierra la ventana con el botón.
- [ ] Elegimos el ángulo de apertura.
:::

## Reto extra

Haz que la ventana se abra **despacio**, grado por grado, con un `for`.

Pista: en vez de `ventana.write(60);`, un `for` que vaya de 0 a tu ángulo, sumando 1 cada vez, con `ventana.write(i);` y un `delay(15);` adentro.

## Bitácora (10 min)

:::foto id="g4-foto"
Foto del invernadero con la ventana abierta.
:::

:::pregunta id="g4-b1"
¿Qué problemas tuvimos con la ventana y cómo los resolvimos?
:::

Antes de irse, guarden el programa (**Archivo → Guardar como** → `equipo_NOMBRE_ventana`) y súbanlo aquí.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- El docente corta con el cutter; los estudiantes marcan con regla.
- Si la caja es muy delgada y se dobla, reforzar el borde de la ventana con un marco de palitos.
- g4-p2: cambia el valor de verdadero a falso o al revés (`!` significa "lo contrario").
- Recordar rotar roles a partir de la guía 5.
- Tiempo total: 10 + 35 + 25 + 35 + 5 + 10 = 120 minutos.
:::
