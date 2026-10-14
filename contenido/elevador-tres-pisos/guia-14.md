---
titulo: Saber dónde está la cabina
guia: 14
sabado: 14
sesion: Proyección a Intermedio III
duracion: 120
---

# Guía 14 · Saber dónde está la cabina

## Objetivo del día

Llamar al elevador desde el celular con un HC-05, conocer los encoders y el control en lazo cerrado, y diseñar el elevador 2.0.

**Al terminar tendremos:** el elevador atendiendo llamadas desde el celular y el plan del elevador 2.0.

## Materiales del equipo

- Elevador completo
- HC-05 con divisor 1 kΩ / 2 kΩ
- Celular Android con "Serial Bluetooth Terminal"

## Parte 1 · Llamar desde el celular (40 min)

Conecta el HC-05 a la central con SoftwareSerial en **D9 (RX)** y **D10 (TX)**:

| HC-05 | Central |
| --- | --- |
| VCC / GND | 5V / GND |
| TXD | D9 |
| RXD | D10 → 1 kΩ → RXD, y RXD → 2 kΩ → GND |

El HC-05 recibe con 3,3 V y el Arduino envía 5 V. Por eso RXD lleva un **divisor**: el cable de D10 pasa por la resistencia de 1 kΩ y llega a RXD; desde RXD sale otra resistencia de 2 kΩ hacia GND. Ármenlo en la protoboard con todo apagado.

**Dónde va cada parte del código** (en el último programa de la central; guarden una copia como `equipo_NOMBRE_central_bt`). *SoftwareSerial* ya viene con Arduino IDE: no hay que instalar nada.

1. Las dos primeras líneas (`#include` y `SoftwareSerial bt`) van arriba, debajo de `#include <Wire.h>`.
2. `bt.begin(9600);` va en el `setup()`, debajo de `Wire.begin();`.
3. El bloque `if (bt.available())` va al inicio del `loop()`, justo después de `void loop() {`.
4. Las dos líneas de `// al llegar a un piso:` van en la parte `// 3. ¿Llegamos?`, justo debajo de `llamada[destino] = false;`. Tienen que ir **antes** de `destino = -1;`, porque usan el número del destino.

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(9, 10);

// en setup():
bt.begin(9600);

// al inicio de loop():
if (bt.available()) {
  char c = bt.read();
  if (c >= '1' && c <= '3') {
    llamada[c - '1'] = true;
    bt.print("Llamada al piso ");
    bt.println(c);
  }
}

// al llegar a un piso:
bt.print("Llego al piso ");
bt.println(destino + 1);
```

[IMAGEN 14.1: celular con botones 1, 2 y 3 en una app Bluetooth para llamar al elevador]

**En el celular (Android):**

1. Instalen **Serial Bluetooth Terminal**. Enciendan el Bluetooth del celular y emparejen el **HC-05** desde los ajustes del celular (la clave suele ser **1234** o **0000**).
2. En la app: menú → **Devices** → elijan el HC-05 y conéctense.
3. Escriban `3` abajo y toquen la flecha de enviar. También pueden mantener presionado un botón **M1**, **M2**… de la barra para guardar los mensajes `1`, `2` y `3`.

:::tabla id="g14-celular"
| Prueba | ¿Funciona? |
| --- | --- |
| Enviar "3" llama al piso 3 | |
| El celular recibe "Llego al piso 3" | |
| Los botones de los pisos siguen funcionando | |
| Enviar "7" no hace nada | |
:::

:::pregunta id="g14-p1"
¿Por qué es importante que el programa ignore mensajes como "7"?
:::

## Parte 2 · Encoders y lazo cerrado (25 min)

Hoy la central solo sabe en qué piso está la cabina **cuando pasa por un sensor**. Entre pisos, no sabe nada. Un **encoder** en el eje del motor cuenta las vueltas: así la central conoce la **posición exacta** en todo momento y puede frenar justo a tiempo.

Miren en la animación cómo viaja la cabina con solo sensores de piso y con encoder:

:::animacion tipo="lazo-cerrado" sistema="elevador"
:::

Completen la tabla con Sí, No o una explicación corta:

:::tabla id="g14-encoder"
| | Con sensores de piso | Con encoder |
| --- | --- | --- |
| ¿Sabe la posición entre pisos? | | |
| ¿Puede frenar antes de llegar? | | |
| ¿Necesita *homing*? | | |
| ¿Qué pasa si el hilo se estira? | | |
:::

:::pregunta id="g14-p2"
¿Por qué un elevador con encoder igual necesita los finales de carrera?
:::

## Parte 3 · El elevador 2.0 (40 min)

Marquen las ideas que el equipo le pondría al elevador 2.0:

:::checklist id="g14-ideas"
- [ ] Encoder y control de posición en lazo cerrado
- [ ] Botonera interna en la cabina
- [ ] Más pisos (nodos nuevos sin cambiar la central)
- [ ] Sensor de peso (sobrecarga)
- [ ] Pantalla y voz en la cabina
- [ ] Monitoreo remoto de fallas
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del elevador 2.0 | |
| Nuevos requisitos de seguridad | |
| Cambios en la arquitectura | |
| Cambios en la potencia | |
| ¿Qué necesitamos aprender? | |
:::

Dibujen el diagrama de bloques del elevador 2.0 (como los de la Guía 2) y súbanlo:

:::foto id="g14-boceto"
Diagrama de bloques del elevador 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Llamamos al elevador desde el celular.
- [ ] Entendimos la diferencia con un encoder.
- [ ] Diseñamos el elevador 2.0.
:::

## Bitácora (10 min)

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g14-b1" individual="si"
¿Qué es lo que más quiero aprender en Intermedio III?
:::

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- D9 y D10 están libres en la central (D6 si se usó para la puerta). SoftwareSerial puede hacer temblar un servo; si pasa, comentarlo como limitación.
- g14-p2: el encoder puede fallar o "perder pasos"; los finales de carrera son una protección física independiente del software.
- Tiempo total: 40 + 25 + 40 + 5 + 10 = 120 minutos.
:::
