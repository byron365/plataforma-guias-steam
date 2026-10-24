---
titulo: La casa y la ventana en la mesa
guia: 3
sabado: 3
sesion: Construcción del prototipo
duracion: 120
---

# Guía 3 · La casa y la ventana en la mesa

## Objetivo del día

Preparar el cuerpo del invernadero (el compartimento seco y el corte de la ventana) y programar en la mesa el servo que abrirá la ventana.

**Al terminar tendremos:** la caja lista para montar las piezas impresas y el programa de la ventana funcionando con un botón.

## Materiales del equipo

- Caja transparente o de plástico reciclado
- Cartón o plástico para el compartimento seco, regla y plumón
- Cutter (lo usa el docente), silicona, cinta
- Servo SG90 con su brazo, botón, Arduino UNO con cable USB, protoboard, cables
- Computadora con Arduino IDE

## Parte 1 · Revisar las plantas (10 min)

Midan la altura con la regla parada en la tierra, hasta la punta de la planta más alta. Cuenten las hojas y anoten lo que vean.

:::tabla id="g3-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Ponerse al día (10 min)

Si el sábado 2 no terminaron alguna pieza (soporte, bisagra o clip), termínenla ahora con la **Guía 2** y expórtenla. El docente las imprime para el sábado 4.

## Parte 3 · El cuerpo del invernadero (35 min)

Miren la imagen del invernadero completo para ver dónde va cada cosa:

[IMAGEN 2.1T: mini invernadero diseñado en Tinkercad, con etiquetas: clip de la manguera, manguera, planta, depósito de agua con la bomba, maceta, ventana del techo, palito que empuja la ventana, bisagra impresa, servo en su soporte impreso, sensor de temperatura, sensor de humedad, caja y compartimento seco]

1. **Compartimento seco:** pega una caja pequeña o un separador de cartón a un lado del invernadero, **fuera** de la zona de la planta. Ahí irán el Arduino y la protoboard.
   - Debe caber el Arduino con la protoboard al lado. Pruébenlo antes de pegar.
   - Lo importante es que el agua de la maceta y del depósito no pueda llegar ahí.
2. **La ventana:** con ayuda del docente, corta un rectángulo de **8 × 6 cm** en el techo. Ese pedazo será la ventana: guárdenlo.
   - Ustedes marcan el rectángulo con regla y plumón; el docente corta con el cutter.
   - Márquenlo cerca de un lado del techo, no en el centro: al lado de la ventana irá el servo.
3. **El lugar de cada cosa:** marquen con plumón dónde irán la maceta, el depósito de agua y el soporte del servo (bajo el techo, junto al lado de la ventana que se abrirá).

:::pregunta id="g3t-p1"
¿Por qué la ventana va en el techo y no abajo?
:::

## Parte 4 · La ventana en la mesa (45 min)

Antes de montar nada en la caja, programamos el servo sobre la mesa. El sábado 4 solo habrá que montarlo.

Conecta el servo (**naranja → D9**, **rojo → 5V**, **café → GND**) y un botón entre **D2** y **GND**. Con el Arduino **desconectado**:

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

5. Verifica (✓) y sube (→). Pongan el brazo en el eje del servo y presionen el botón: el brazo gira a 60°; presiónenlo otra vez: vuelve a 0°.
6. Guarden el programa: **Archivo → Guardar como** → `equipo_NOMBRE_ventana`.

Muevan el servo en la animación: en 0° la ventana está cerrada.

:::animacion tipo="servo" variable="ventana" inicial="0"
:::

:::tabla id="g3t-prueba"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| Al encender, el brazo va a 0° | | |
| Un toque al botón: el brazo gira a 60° | | |
| Otro toque: vuelve a 0° | | |
:::

:::pregunta id="g3t-p2"
¿Qué hace la línea `abierta = !abierta;`?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3t-logramos"
- [ ] Revisamos las plantas.
- [ ] El invernadero tiene compartimento seco.
- [ ] La ventana está cortada en el techo.
- [ ] El servo se mueve con el botón.
:::

## Bitácora (15 min)

:::pregunta id="g3t-b1"
¿Qué diferencia hay entre un control **manual** y uno **automático**? Da un ejemplo del invernadero.
:::

Antes de irse, suban aquí `equipo_NOMBRE_ventana`.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, reestructurada el 23 de octubre:** se quitan las variables, los mapas de causa y efecto, el diagrama de flujo y el cronograma; entran el cuerpo del invernadero y el programa de la ventana de la Guía 4 normal (en la mesa, mientras se imprimen las piezas). Campos propios (g3t-…); la tabla de plantas mantiene su campo.
- El docente corta con el cutter; los estudiantes marcan con regla.
- g3t-p1: el aire caliente sube; por arriba sale mejor.
- g3t-p2: cambia el valor de verdadero a falso o al revés (`!` significa "lo contrario").
- g3t-b1: manual = la persona presiona el botón para abrir; automático = el sensor de temperatura abre la ventana solo (sábado 7).
- Tiempo total: 10 + 10 + 35 + 45 + 5 + 15 = 120 minutos.
:::
