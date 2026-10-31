---
titulo: Armamos la casa y la ventana
guia: 6
sabado: 6
sesion: Construcción del prototipo
duracion: 120
---

# Guía 6 · Armamos la casa y la ventana

## Objetivo del día

Preparar el cuerpo del invernadero, montar la ventana con la bisagra impresa y el servo que la empuja, y ajustar cuánto se abre.

**Al terminar tendremos:** la casa del invernadero lista, con su ventana que se abre y se cierra con el botón.

## Materiales del equipo

- Caja transparente o de plástico reciclado
- Cartón o plástico para el compartimento seco, regla y plumón
- Piezas impresas: 2 hojas de bisagra y el soporte del servo; palito de pincho y un palito de paleta
- Servo SG90 con su brazo, botón, Arduino UNO con cable USB, protoboard, cables
- Cutter (lo usa el docente), silicona (con el docente), cinta, tijeras
- Computadora con Arduino IDE

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g6p-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El cuerpo del invernadero (30 min)

Miren la imagen del invernadero completo para ver dónde va cada cosa:

[IMAGEN 2.1T: mini invernadero diseñado en Tinkercad, con etiquetas: clip de la manguera, manguera, planta, depósito de agua con la bomba, maceta, ventana del techo, palito que empuja la ventana, bisagra impresa, servo en su soporte impreso, sensor de temperatura, sensor de humedad, caja y compartimento seco]

1. **Compartimento seco:** pega una caja pequeña o un separador de cartón a un lado del invernadero, **fuera** de la zona de la planta. Ahí irán el Arduino y la protoboard.
   - Debe caber el Arduino con la protoboard al lado. Pruébenlo antes de pegar.
   - Lo importante es que el agua de la maceta y del depósito no pueda llegar ahí.
2. **La ventana:** con ayuda del docente, corta un rectángulo de **8 × 6 cm** en el techo. Ese pedazo será la ventana: guárdenlo.
   - Ustedes marcan el rectángulo con regla y plumón; el docente corta con el cutter.
   - Márquenlo cerca de un lado del techo, no en el centro: al lado de la ventana irá el servo.
3. **El lugar de cada cosa:** marquen con plumón dónde irán la maceta, el depósito de agua y el soporte del servo (bajo el techo, junto al lado de la ventana que se abrirá).

:::pregunta id="g6p-p1"
¿Por qué la ventana va en el techo y no abajo?
:::

## Parte 3 · La bisagra (20 min)

[IMAGEN 4.1T: techo del invernadero en Tinkercad con etiquetas: ventana, bisagra con sus dos hojas y el palito, palito pegado al brazo del servo, servo en su soporte bajo el techo y borde del corte]

1. Pongan las dos hojas de la bisagra una al lado de la otra, en el borde donde la ventana debe girar, con los nudillos alineados.
2. Pasen el palito de pincho por los dos nudillos y corten lo que sobre.
3. Peguen una hoja al techo y la otra a la ventana (silicona con el docente, o cinta fuerte).
   - La bisagra va en el lado de la ventana **contrario** al servo.
4. Comprueben que la ventana abre y cierra sin trabarse. Si se traba, revisen que el palito esté derecho y que no haya silicona en los nudillos.

:::checklist id="g6p-bisagra"
- [ ] La ventana gira sobre la bisagra sin trabarse.
- [ ] Al cerrarla, tapa el corte del techo.
:::

## Parte 4 · El servo que empuja (30 min)

1. **El circuito**, igual que en el simulador (Guía 3), con el USB desconectado:
   - 5V del Arduino a la fila **+** de la protoboard y GND a la fila **−**.
   - **Servo:** naranja → pin **9**, rojo → fila **+**, café → fila **−** (con tres cables macho–macho en su conector).
   - **Botón:** sobre la canaleta del centro; dos patas en **diagonal**: una → pin **2**, la otra → fila **−**.
2. **El programa:** conecten el USB, elijan **Arduino Uno** y su puerto en **Seleccionar placa**, creen un programa nuevo y escriban el de la ventana (es la parte de la ventana de la Guía 3):

```cpp
#include <Servo.h>
Servo ventana;

const int BOTON = 2;
const int ANGULO_ABIERTA = 60;   // grados
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
      ventana.write(ANGULO_ABIERTA);
    } else {
      ventana.write(0);
    }
    delay(500);                       // evitar doble toque
  }
}
```

3. Guárdenlo como `equipo_NOMBRE_ventana`, verifiquen (✓) y súbanlo (→). Al encender, el servo va a **0°**.
4. Pega el **soporte del servo** debajo del techo, junto al corte, del lado contrario a la bisagra (el que se abre).
5. Pega un palito de paleta al brazo del servo: será la "mano" que empuja la ventana hacia arriba.
   - Encaja el brazo en el eje del servo (en 0°) y pega el palito encima con silicona o cinta, **acostado, justo debajo de la ventana cerrada**.
   - Mete el servo en el soporte, con el eje del lado del corte.
6. Presionen el botón: el palito sube por el corte y empuja la ventana. Si no la alcanza, alárguenlo o acerquen el soporte.

## Parte 5 · Ajustar la apertura (15 min)

Cambien el número de `ANGULO_ABIERTA` por cada valor de la tabla, suban el código, abran la ventana con el botón y observen. Si el servo zumba o empuja contra algo, eso es "forzar".

:::tabla id="g6p-angulos"
| Ángulo de "abierta" | ¿Cuánto se abre la ventana? | ¿El servo fuerza o choca? |
| --- | --- | --- |
| 30 | | |
| 60 | | |
| 90 | | |
:::

Nuestro ángulo de ventana abierta: ANGULO_ABIERTA = ______

:::pregunta id="g6p-p2"
¿Qué le pasa al servo si el ángulo es demasiado grande y la ventana ya no puede abrirse más?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] Revisamos las plantas.
- [ ] El compartimento seco está pegado y la ventana cortada.
- [ ] La ventana gira sobre la bisagra.
- [ ] El servo abre y cierra la ventana con el botón.
- [ ] Elegimos el ángulo de la ventana.
:::

## Bitácora (10 min)

:::foto id="g6p-foto"
Video corto de la ventana abriéndose con el botón.
:::

:::pregunta id="g6p-b1"
¿Qué problema tuvieron hoy al armar la casa y cómo lo resolvieron?
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión práctica (8 sábados):** junta el cuerpo del invernadero de la Guía 3 Tinkercad y el montaje de la ventana de la Guía 4 Tinkercad en un solo sábado. Las piezas impresas (bisagra, soporte del servo y clip) deben estar listas antes. Campos propios (g6p-…).
- El docente corta la caja con el cutter; los estudiantes marcan.
- El ángulo elegido (g6p-angulos) se escribe en `ANGULO_ABIERTA` del programa final el sábado 7.
- g6p-p1: el aire caliente sube; una ventana arriba deja salir el calor.
- g6p-p2: el servo se queda empujando, zumba y se calienta; puede dañarse o despegar la ventana.
- Tiempo total: 10 + 30 + 20 + 30 + 15 + 5 + 10 = 120 minutos.
:::
