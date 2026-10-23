---
titulo: Bluetooth y el mando
guia: 5
sabado: 5
sesion: Comunicación y mando
duracion: 120
---

# Guía 5 · Bluetooth y el mando

## Objetivo del día

Configurar los dos HC-05 con comandos AT para que se emparejen solos, armar el mando en su caja y comprobar que el robot y el mando se envían mensajes sin cables.

**Al terminar tendremos:** el mando armado y los dos Arduino conversando por Bluetooth.

## Materiales del equipo

- El robot armado (sábado 4)
- Caja y tapa del mando impresas
- 2 HC-05, resistencias de 1 kΩ y 2 kΩ (dos de cada una), protoboard pequeña
- Arduino UNO del mando con cable USB, joystick, pantalla OLED, cables
- Pegamento caliente (silicona) y cinta
- Computadora con Arduino IDE

## Parte 1 · Ponerse al día (10 min)

Si el sábado 4 no terminaron de armar el robot, termínenlo ahora con la **Guía 4**. Después revisen:

:::checklist id="g5p-robot"
- [ ] El robot queda horizontal sobre sus ruedas.
- [ ] La prueba de motores hace adelante, atrás y giro.
:::

## Parte 2 · Configurar los HC-05 (40 min)

El **RX del HC-05 trabaja a 3,3 V**: desde el TX del Arduino (D11) usa un divisor **1 kΩ / 2 kΩ**.

El cable de D11 pasa por la resistencia de 1 kΩ y llega a RXD; desde RXD sale otra resistencia de 2 kΩ hacia GND. Ármenlo en la protoboard del robot con todo apagado.

| HC-05 | Arduino |
| --- | --- |
| VCC / GND | 5V / GND |
| TXD | D10 (RX del Arduino) |
| RXD | D11 → 1 kΩ → RXD, y RXD → 2 kΩ → GND |
| EN / KEY | 3,3 V (solo para entrar en modo AT) |

[IMAGEN 4.2: conexión del HC-05 con el divisor de 1 kΩ y 2 kΩ en su pin RXD]

Configuraremos los dos HC-05 **uno por uno** con el Arduino del robot (conectado por USB, con la batería apagada): primero el del robot y después el del mando. Programa nuevo, escriban el código, guárdenlo como `equipo_NOMBRE_puente_at` y súbanlo.

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);

void setup() {
  Serial.begin(9600);
  bt.begin(38400);          // velocidad del modo AT
  Serial.println("Listo para comandos AT");
}

void loop() {
  if (bt.available()) Serial.write(bt.read());
  if (Serial.available()) bt.write(Serial.read());
}
```

1. Desconecta el HC-05, mantén presionado su botón y vuelve a conectarlo: el LED parpadea **lento** (modo AT).
   - "Desconectar" es quitar su cable de VCC. Si el módulo tiene botón, dejen el pin EN sin conectar. Si **no** tiene botón, conecten EN a 3,3 V antes de volver a conectar VCC.
   - Parpadeo lento = más o menos una vez cada 2 segundos. Si parpadea rápido, no entró: repitan.
2. Monitor serie a **9600** y "Ambos NL & CR". Escribe `AT` → debe responder `OK`.
   - La lista con "Ambos NL & CR" está junto a la de los baudios, abajo a la derecha del Monitor serie.
   - Escriban cada comando de la tabla en la caja de arriba, presionen **Enter** y copien la respuesta. Escríbanlos con mayúsculas y sin espacios.

:::tabla id="g5p-at"
| Módulo | Comando | Respuesta |
| --- | --- | --- |
| Robot (esclavo) | AT+ROLE=0 | |
| Robot (esclavo) | AT+ADDR? (anotar la dirección) | |
| Robot (esclavo) | AT+UART=9600,0,0 | |
| Mando (maestro) | AT+ROLE=1 | |
| Mando (maestro) | AT+CMODE=0 | |
| Mando (maestro) | AT+BIND=dirección del esclavo (con comas en vez de dos puntos) | |
| Mando (maestro) | AT+UART=9600,0,0 | |
:::

3. Cambien de módulo y terminen.
   - Para cambiar de módulo: quiten los cables del HC-05 del robot, conecten el del mando de la misma forma, entren al modo AT y escriban sus comandos.
   - En `AT+BIND` escriban la dirección que anotaron del robot, cambiando los dos puntos (`:`) por comas.
   - Al final, el HC-05 del robot vuelve a su protoboard **sin** EN conectado y sin presionar el botón. El del mando se queda aparte para la Parte 3. Pónganle una etiqueta de cinta a cada uno: "robot" y "mando".

:::pregunta id="g5p-p1"
¿Por qué el RX del HC-05 necesita un divisor de voltaje y el TX no?
:::

## Parte 3 · Armar el mando (35 min)

| Componente | Arduino del mando |
| --- | --- |
| Joystick VRx / VRy | A0 / A1 |
| OLED SDA / SCL | A4 / A5 |
| HC-05 TXD / RXD | D10 / D11 (con divisor 1 kΩ / 2 kΩ) |

- El joystick, la OLED y el HC-05 llevan también **VCC → 5V** y **GND → GND** del Arduino del mando (en el joystick, el pin de energía puede decir **+5V**).
- El divisor del HC-05 se arma igual que en la Parte 2: D11 → 1 kΩ → RXD, y RXD → 2 kΩ → GND. El pin EN queda sin conectar.
- El mando se alimenta por USB (computadora o cargador de celular).

Arman todo **dentro de la caja**:

1. **El Arduino:** en el fondo, pegado a la pared del agujero, con su conector USB frente al agujero. Una tira de cinta doble faz abajo para que no se mueva.
2. **La protoboard pequeña** al lado del Arduino, con el HC-05 del mando y su divisor.
3. **La pantalla:** por debajo de la tapa, con la parte que se ilumina frente a la ventana. Unas gotas de silicona en las esquinas de su placa (no sobre la pantalla).
4. **El joystick:** en su cerco, encima de la tapa, con los pines hacia la salida de los cables. Una gota de silicona en el cerco.
5. **Los cables:** del joystick bajan por la salida; de la pantalla van directo al Arduino.
6. **La tapa:** sobre la caja. Péguenla con cinta por un lado, como una bisagra, para poder abrirla.

[IMAGEN 5.1P: mando armado en su caja impresa, con el joystick encima de la tapa y la pantalla asomada por su ventana]

## Parte 4 · ¡Mensajes sin cables! (20 min)

Repitan la prueba de la Guía 1, pero ahora **inalámbrica**. Los HC-05 ya están en D10 y D11, así que el programa `equipo_NOMBRE_uart` de la Guía 1 sirve sin cambios.

1. Suban `equipo_NOMBRE_uart` al Arduino del **robot** y al del **mando** (cada uno por su USB).
   - **Con una sola computadora:** abran una segunda ventana con **Archivo → Nueva**, peguen el mismo código y elijan ahí el puerto del otro Arduino. Cada ventana tiene su propio Monitor serie.
2. Esperen a que los dos HC-05 se emparejen: sus LEDs parpadean **dos veces cada 2 segundos**.
3. Abran los dos **Monitor serie** a **9600 baudios** con **Nueva línea**, escriban un texto en cada uno y presionen **Enter**.

:::tabla id="g5p-prueba"
| Prueba | ¿Funcionó? | Observación |
| --- | --- | --- |
| Los LEDs de los dos HC-05 parpadean dos veces cada 2 s | | |
| Texto del mando aparece en el monitor del robot | | |
| Texto del robot aparece en el monitor del mando | | |
| Alejando el mando 3 m, los textos siguen llegando | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] Los dos HC-05 están configurados.
- [ ] El mando está armado en su caja.
- [ ] El robot y el mando se envían texto sin cables.
:::

## Bitácora (10 min)

:::pregunta id="g5p-b1"
¿Qué fallo tuvimos hoy, cuál era la causa y cómo lo solucionamos?
:::

:::foto id="g5p-foto"
Foto del mando armado.
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** la Parte 3 de la Guía 4 normal (HC-05), el montaje del mando de la Guía 5 normal dentro de la caja impresa y, como prueba, el reto de la Guía 4 normal (UART inalámbrica). Campos propios (g5p-…).
- La dirección que da AT+ADDR? viene como 98d3:31:f5a1b2; en AT+BIND se escribe 98d3,31,f5a1b2.
- Algunos HC-05 no responden a 38400 en modo AT si se entra con EN en alto desde el arranque: probar con el botón.
- Para la Parte 4, el robot puede quedarse con la batería apagada: el USB alimenta su Arduino y su HC-05.
- La OLED de 0,96" tiene la zona visible corrida hacia un lado de su placa: ubicarla mirando la ventana desde arriba antes de pegarla.
- Tiempo total: 10 + 40 + 35 + 20 + 5 + 10 = 120 minutos.
:::
