---
titulo: Armamos el puente de verdad
guia: 7
sabado: 7
sesion: Construcción del prototipo
duracion: 120
---

# Guía 7 · Armamos el puente de verdad

## Objetivo del día

Armar el puente con las piezas impresas y los componentes reales, copiando el circuito que ya funciona en el simulador.

**Al terminar tendremos:** el puente armado sobre la base, con los servos montados, el circuito conectado y el programa del simulador subido al Arduino.

## Materiales del equipo

- Las 7 piezas impresas: orillas A y B, hojas A y B, torre del semáforo, torre del buzzer y soporte del sensor
- Base de MDF delgado o cartón grueso de 50 × 30 cm
- 2 servos SG90 con sus brazos y tornillos, 3 LEDs, 3 resistencias de 220 Ω, buzzer, botón y sensor HC-SR04
- Arduino UNO con su cable USB, protoboard, cables macho–macho y macho–hembra
- Pistola de silicona, regla, lápiz, cinta adhesiva y un libro o una caja
- El circuito simulado abierto en Tinkercad y `equipo_NOMBRE_automatico.txt` (Guía 6)

**Seguridad con la silicona caliente:** la punta de la pistola y la silicona recién puesta queman. No toquen la silicona hasta que se ponga opaca (unos segundos) y dejen la pistola siempre parada en su base.

## Parte 1 · Piezas y base (15 min)

1. Quiten los soportes de impresión de las hojas (debajo de la oreja) y prueben sin pegar que el servo entre acostado en el cajón de cada orilla. Si algo no entra, no lo fuercen: avisen al docente.
2. Dibuja el **río** en el centro de la base: 16,4 cm de ancho.
   - Marquen el centro del largo (25 cm), midan 8,2 cm hacia cada lado y tracen dos líneas de adelante hacia atrás.
3. Pon las orillas: la A a la derecha del río y la B a la izquierda, con el borde de la ranura justo sobre la línea. El camino queda adelante y el cajón del servo atrás.
4. Marquen su contorno con lápiz y péguenlas con silicona.

## Parte 2 · Centrar los servos (15 min)

En el simulador vieron que, con el puente cerrado, el servo izquierdo está en 0° y el derecho en 180°. Antes de pegar las hojas hay que dejar los servos de verdad en esa posición.

1. Con el Arduino desconectado, conecten **solo los dos servos**, igual que en el simulador:
   - Izquierdo (va en la orilla B): naranja → **D9**. Derecho (va en la orilla A): naranja → **D10**.
   - Los rojos → **5V** y los cafés → **GND** (filas **+** y **−** de la protoboard).
   - Márquenlos con cinta: **I** y **D**.
2. Conecten el USB, abran Arduino IDE, elijan **Arduino Uno** y su puerto, creen un programa nuevo y escriban:

```cpp
#include <Servo.h>
Servo izq, der;

void setup() {
  izq.attach(9);
  der.attach(10);
  izq.write(0);    // hoja izquierda cerrada
  der.write(180);  // hoja derecha cerrada (en espejo)
}

void loop() {
}
```

3. Súbanlo (→), esperen a que los servos se queden quietos y desconecten el USB. Desde ahora **no giren los ejes con la mano**.

## Parte 3 · Montar servos y hojas (30 min)

Empiecen por la orilla A con el servo **D**:

1. Mete el servo **acostado** en el cajón: las pestañas dentro del cajón y la parte del eje en la ventana, con el eje asomando en la ranura. El cable va en el canal de la orilla y sale por atrás; el servo no debe sobresalir del camino. Una gota de silicona en cada pestaña.
2. Pon el brazo de **un solo lado** en el eje, acostado y apuntando al río, sin girar el eje (si no queda justo, en el diente más cercano). Pongan el tornillo del centro.
3. Pon la hoja A **cerrada**: la oreja dentro de la ranura, pegada al brazo, y el tablero plano a la altura del camino. Sostengan la punta con un libro o una caja.
4. Pega el brazo a la oreja con silicona y sostén hasta que enfríe. Nada de silicona en el eje ni en la ventana.
5. Repitan en la orilla B con el servo **I** y la hoja B.

[IMAGEN 4.2T: servo acostado en el cajón de la orilla, con su brazo pegado a la oreja de la hoja dentro de la ranura]

## Parte 4 · Torres y sensor (20 min)

1. LEDs en la torre del semáforo, **por dentro**: rojo arriba, amarillo en medio, verde abajo, con una gota de silicona.
2. Buzzer en el agujero del techo de la torre del buzzer, también por dentro.
3. Un cable macho–hembra en cada pata de los LEDs y del buzzer (la punta hembra en la pata). Marquen con cinta las patas largas y la **+** del buzzer, y saquen los cables por la salida de atrás de la torre.
4. Pongan cada torre sobre su orilla, tapando el servo, justo detrás de la ranura sin taparla (semáforo en la A, con los LEDs hacia afuera; buzzer en la B). **Todavía no las peguen.**
5. Pega el soporte del sensor a la base: la placa parada sobre la línea del río, tocando el frente de la orilla A, con el pie hacia afuera. Mete el sensor por detrás, con los pines hacia **arriba**, y fíjalo con una gota de silicona en las esquinas.

[IMAGEN 4.3T: puente armado sobre la base: orillas pegadas a 16,4 cm, hojas cerradas, torres encima de cada orilla y soporte del sensor adelante de la orilla A]

## Parte 5 · El circuito real (25 min)

Abran su circuito simulado en Tinkercad y cópienlo cable por cable. Las conexiones son las mismas:

| Componente | Conexión |
| --- | --- |
| LED verde / amarillo / rojo | Pata larga → resistencia de 220 Ω → D2 / D3 / D4 · pata corta → fila − |
| Buzzer | + → D5 · − → fila − |
| Botón | Una pata → D6 · la pata en diagonal → fila − |
| Sensor HC-SR04 | Vcc → fila + · Trig → D7 · Echo → D8 · GND → fila − |
| Servo izquierdo / derecho | Naranja → D9 / D10 · Rojo → fila + · Café → fila − (ya conectados) |

- Los cables de los LEDs llegan desde la torre: el de la pata larga va a una fila libre con su resistencia, y del otro lado de la resistencia un cable a su pin.
- Los cables de la orilla B (servo izquierdo y buzzer) cruzan el río por el borde de atrás de la base, pegados planos con cinta. Si un cable no alcanza, únanlo con otro.

[IMAGEN 5.2: circuito completo en la protoboard con semáforo, buzzer, botón y los dos servos]

Cuando todo esté conectado:

1. Abran `equipo_NOMBRE_automatico.txt`, copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_automatico`.
2. Verifiquen (✓) y súbanlo (→). Debe encenderse el verde y las hojas deben quedarse planas.

:::checklist id="g7p-revision"
- [ ] Las orillas están pegadas a 16,4 cm y las hojas quedan planas.
- [ ] Cada cable está en el mismo pin que en el simulador.
- [ ] El programa subió sin errores y se enciende el verde.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] El puente está armado sobre la base.
- [ ] Los servos están centrados y montados.
- [ ] El circuito real es igual al simulado.
- [ ] El programa del simulador está en el Arduino.
:::

## Bitácora (10 min)

:::foto id="g7p-foto"
Foto del puente armado con su circuito.
:::

:::pregunta id="g7p-b1"
¿En qué les ayudó tener el circuito simulado al conectar el circuito real?
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica:** junta el armado de la Guía 4 Tinkercad y el circuito de la Guía 5 Tinkercad en un solo sábado. Es una sesión apretada: conviene tener las piezas impresas revisadas (soportes quitados) y los componentes separados por equipo antes de empezar. Campos propios (g7p-…).
- Si un servo no entra en el cajón, lijar las paredes. Las orillas impresas con las medidas anteriores al 7 de noviembre dejan el servo 3,8 mm afuera del camino y sin salida para el cable: hay que reimprimirlas con las medidas nuevas de la Guía 2 (STL de la academia en `..\STL\Puente levadizo - STL para imprimir`).
- Si una hoja no queda plana, se saca el brazo del eje junto con la hoja y se pone un diente más allá; el ajuste fino se hace en la Guía 8.
- Las torres se pegan en la Guía 8, cuando todo funcione.
- Si no alcanza el tiempo, lo que falte del circuito se termina al inicio de la Guía 8.
- Supervisar la pistola de silicona; tener un vaso con agua fría cerca para quemaduras leves.
- Tiempo total: 15 + 15 + 30 + 20 + 25 + 5 + 10 = 120 minutos.
:::
