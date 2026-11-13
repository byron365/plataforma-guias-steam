---
titulo: Armamos la casa y la ventana
guia: 6
sabado: 6
sesion: Construcción del prototipo
duracion: 120
---

# Guía 6 · Armamos la casa y la ventana

## Objetivo del día

Preparar el cuerpo del invernadero y montar la ventana con la bisagra impresa y el servo que la empuja.

**Al terminar tendremos:** la casa del invernadero lista, con su ventana y el servo que la empuja en su lugar, lista para conectar el circuito en la Guía 7.

## Materiales del equipo

- Caja transparente o de plástico reciclado
- Cartón o plástico para el compartimento seco, regla y plumón
- Piezas impresas: 2 hojas de bisagra y el soporte del servo; palito de pincho y un palito de paleta
- Servo SG90 con su brazo; Arduino UNO y 3 cables macho–macho (para poner el servo en 0°)
- Cutter (lo usa el docente), silicona (con el docente), cinta, tijeras

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g6p-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El cuerpo del invernadero (35 min)

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

## Parte 3 · La bisagra (25 min)

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

## Parte 4 · El servo que empuja (35 min)

**Muy importante:** antes de pegar el palito al brazo del servo, el servo debe estar en **0°** (ventana cerrada).

1. Con el Arduino **desconectado**, conecten el servo directo al Arduino: cable **café → GND**, **rojo → 5V**, **naranja → pin 9**.
2. Llamen al docente: conecta el USB y sube un programa corto que deja el servo en 0°. El servo gira un poquito y se queda quieto. Cómo se sube un programa lo aprenderán en la Guía 8.
3. Desconecten el USB y los tres cables del servo. Desde ahora, **no giren el eje del servo con la mano**.
4. Pega el **soporte del servo** debajo del techo, junto al corte, del lado contrario a la bisagra (el que se abre).
5. Pega un palito de paleta al brazo del servo: será la "mano" que empuja la ventana hacia arriba.
   - Encaja el brazo en el eje del servo (en 0°) y pega el palito encima con silicona o cinta, **acostado, justo debajo de la ventana cerrada**.
   - Mete el servo en el soporte, con el eje del lado del corte y el cable por la **ranura** de la punta (el cable sale por la punta contraria al eje).

La ventana se prueba con el botón y se elige cuánto se abre en la Guía 8, cuando suban el programa.

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] Revisamos las plantas.
- [ ] El compartimento seco está pegado y la ventana cortada.
- [ ] La ventana gira sobre la bisagra.
- [ ] El servo está en su soporte, en 0°, con el palito justo debajo de la ventana.
:::

## Bitácora (10 min)

:::foto id="g6p-foto"
Foto de la casa con la ventana y el servo en su lugar.
:::

:::pregunta id="g6p-b1"
¿Qué problema tuvieron hoy al armar la casa y cómo lo resolvieron?
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, pueden subirla aquí (.txt o .docx). La próxima sesión la descargan en cualquier computadora y siguen donde se quedaron.
:::

:::docente
- **Versión práctica:** junta el cuerpo del invernadero de la Guía 3 Tinkercad y el montaje de la ventana de la Guía 4 Tinkercad en un solo sábado. Las piezas impresas (bisagra, soporte del servo y clip) deben estar listas antes. Campos propios (g6p-…).
- **Desde el 13 de noviembre (9 sábados):** solo el armado. El circuito del servo y del botón pasó a la Guía 7 y el programa de la ventana con el ajuste del ángulo, a la Guía 8 (guías de armado): g6p-angulos y g6p-p2 ahora son g8a-angulos y g8a-p1. El servo lo pone en 0° el docente.
- **Programa para poner el servo en 0° (lo sube el docente en la Parte 4):** Arduino IDE, placa Arduino Uno y su puerto:

```cpp
#include <Servo.h>
Servo ventana;

void setup() {
  ventana.attach(9);
  ventana.write(0);   // cerrada
}

void loop() {
}
```
- El docente corta la caja con el cutter; los estudiantes marcan.
- g6p-p1: el aire caliente sube; una ventana arriba deja salir el calor.
- Tiempo total: 10 + 35 + 25 + 35 + 5 + 10 = 120 minutos.
:::
