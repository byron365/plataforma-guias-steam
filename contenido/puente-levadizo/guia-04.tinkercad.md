---
titulo: Armamos el puente
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · Armamos el puente

## Objetivo del día

Armar el puente con las piezas impresas: las orillas sobre la base, los servos en su cajón, las hojas pegadas a los servos, los LEDs y el buzzer en sus torres y el soporte del sensor.

**Al terminar tendremos:** el puente armado sobre la base, con las dos hojas planas y los servos listos para programar.

## Materiales del equipo

- Las 7 piezas impresas: orillas A y B, hojas A y B, torre del semáforo, torre del buzzer y soporte del sensor
- Base de MDF o cartón grueso de 50 × 30 cm
- 2 servos SG90 con sus brazos y tornillos
- Arduino UNO con su cable USB, protoboard, cables macho–macho y macho–hembra
- 3 LEDs (verde, amarillo y rojo) y el buzzer
- Pistola de silicona, regla, lápiz, cinta adhesiva
- Un libro o una caja (para sostener las hojas mientras se pegan)

**Seguridad con la silicona caliente:** la punta de la pistola y la silicona recién puesta queman. No toquen la silicona hasta que se ponga opaca (unos segundos) y dejen la pistola siempre parada en su base.

## Parte 1 · Revisar las piezas (10 min)

1. Quiten los soportes de impresión de las hojas (debajo de la oreja), con los dedos o con unas pinzas, sin doblar la oreja.
2. Prueben cada pieza **sin pegar nada** y marquen:

:::checklist id="g4t-piezas"
- [ ] El servo entra acostado en el cajón de cada orilla, con sus pestañas, y el eje asoma por la ventana.
- [ ] La oreja de cada hoja entra en la ranura de su orilla (la A con la A y la B con la B).
- [ ] Un LED entra por dentro de la torre del semáforo en cada agujero.
- [ ] El buzzer entra en el agujero del techo de la torre del buzzer.
- [ ] Los ojos del sensor asoman por los agujeros del soporte.
:::

Si alguna pieza no entra, no la fuercen: avisen al docente.

[IMAGEN 4.1T: las 7 piezas impresas del puente sobre la mesa con su nombre: orillas A y B, hojas A y B, torre del semáforo, torre del buzzer y soporte del sensor]

## Parte 2 · La base (15 min)

1. Dibuja el **río** en el centro de la base: 16,4 cm de ancho.
   - La base mide 50 cm de largo: marquen el centro (25 cm) y midan 8,2 cm hacia cada lado. Tracen dos líneas de orilla de adelante hacia atrás.
2. Pon las orillas **sin pegar**: la A a la derecha del río y la B a la izquierda.
   - El borde de la ranura va justo sobre la línea del río.
   - El camino queda adelante y el cajón del servo atrás.
   - Déjenlas centradas de adelante hacia atrás: quedan unos 10 cm libres adelante y otros 10 atrás.
3. Pongan las hojas encima, con la oreja dentro de su ranura, para ver cómo quedan: las dos puntas deben quedar casi juntas en el medio del río.
4. Marquen con lápiz el contorno de cada orilla, quiten las hojas y peguen las orillas con silicona.
5. Marquen también dónde irán las otras cosas:
   - Adelante de la orilla A, junto al río: el soporte del sensor.
   - Atrás de la orilla A: el Arduino y la protoboard.

:::checklist id="g4t-base"
- [ ] Entre las dos orillas hay 16,4 cm.
- [ ] Las ranuras miran al río.
- [ ] Las orillas están pegadas y derechas.
:::

## Parte 3 · Centrar los servos (25 min)

**¡Ojo!** Las dos hojas giran en **sentidos contrarios**, porque los servos están mirándose. Por eso a uno le damos el ángulo `a` y al otro `180 - a`:

Muevan la animación y fíjense en el ángulo que recibe cada servo:

:::animacion tipo="espejo-servos"
:::

:::pregunta id="g4t-p1"
Si la hoja izquierda está en 30°, ¿qué ángulo recibe el servo derecho?
:::

Antes de pegar las hojas, cada servo tiene que estar en la posición de **puente cerrado**: el izquierdo en 0° y el derecho en 180°.

1. Con el Arduino desconectado, conecten **solo los dos servos**:
   - El servo **izquierdo** (va en la orilla B): naranja → **D9**.
   - El servo **derecho** (va en la orilla A): naranja → **D10**.
   - Los dos rojos → **5V** y los dos cafés → **GND** (usen las filas **+** y **−** de la protoboard).
   - Márquenlos con cinta: **I** el izquierdo y **D** el derecho.
2. Conecten el USB, elijan **Arduino Uno** y su puerto en **Seleccionar placa**, creen un programa nuevo, borren lo que trae y escriban:

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

3. Guárdenlo como `equipo_NOMBRE_centrar`, verifiquen (✓) y súbanlo (→).
4. Esperen a que los servos se queden quietos y desconecten el USB. Desde ahora **no giren los ejes con la mano**. Dejen los cables conectados.

## Parte 4 · Montar servos y hojas (35 min)

Empiecen por la orilla A con el servo **D**:

1. Mete el servo **acostado** en el cajón.
   - Las pestañas quedan dentro del cajón y la parte de arriba del servo (donde está el eje) entra en la ventana. El eje debe asomar dentro de la ranura.
   - El cable del servo queda hacia atrás, metido en el canal de la orilla: sale por la cara de atrás.
   - **✔ Revisa:** el servo no sobresale del camino.
   - Pongan una gota de silicona en cada pestaña para que el servo no se mueva.
2. Pon el brazo del servo.
   - Usen el brazo de **un solo lado** (el más largo). Pónganlo en el eje **acostado**, apuntando hacia el río, sin girar el eje.
   - Si no queda justo acostado, pónganlo en el diente que quede más cerca.
   - Pongan el tornillo pequeño del centro, que sujeta el brazo al eje.
3. Pon la hoja A **cerrada**.
   - Su oreja entra en la ranura y queda pegada al brazo.
   - El tablero tiene que quedar plano, a la altura del camino de la orilla. Sostengan la punta de la hoja con un libro o una caja.
4. Pega el brazo a la oreja con silicona y sostén hasta que enfríe.
   - La silicona va solo entre el brazo y la oreja. Nada de silicona en el eje ni en la ventana: el servo tiene que poder girar.
5. Repitan en la orilla B con el servo **I** y la hoja B.
6. **Prueba:** conecten el USB. Las dos hojas deben quedarse quietas y planas, porque el programa las deja en la posición de cerrado.

[IMAGEN 4.2T: servo acostado en el cajón de la orilla, con su brazo pegado a la oreja de la hoja dentro de la ranura]

## Parte 5 · Torres y soporte del sensor (20 min)

1. Pon los LEDs en la torre del semáforo, **por dentro**: el rojo en el agujero de arriba, el amarillo en el del medio y el verde en el de abajo.
   - Una gota de silicona por dentro sujeta cada LED. Las patas quedan hacia adentro de la torre.
2. Pon un cable macho–hembra en cada pata (la punta hembra entra en la pata).
   - Usen un color para las patas largas y otro para las cortas, o márquenlas con cinta.
   - Saquen los cables por la salida de atrás de la torre.
3. Pon el buzzer en el agujero del techo de la torre del buzzer, también por dentro, con una gota de silicona.
   - Un cable macho–hembra en cada pata. Marquen con cinta el cable de la pata **+**.
4. Pon cada torre encima de su orilla, tapando el servo, justo detrás de la ranura y con la pared del lado del río alineada con el borde de la orilla.
   - La del semáforo va sobre la orilla A, con los LEDs mirando hacia afuera (al lado contrario del río). La del buzzer va sobre la orilla B.
   - La salida de los cables queda atrás. La ranura queda libre: la oreja de la hoja tiene que poder subir.
   - **Todavía no las peguen:** se pegan en la Guía 5, cuando todo funcione.
5. Pega el soporte del sensor a la base.
   - La placa va parada justo sobre la línea del río, tocando el frente de la orilla A. El pie queda hacia afuera del río.
   - Los agujeros de los ojos miran al otro lado del río.

[IMAGEN 4.3T: puente armado sobre la base: orillas pegadas a 16,4 cm, hojas cerradas, torres encima de cada orilla y soporte del sensor adelante de la orilla A]

## ¿Lo logramos? (5 min)

:::checklist id="g4t-logramos"
- [ ] Las orillas están pegadas a 16,4 cm.
- [ ] Los servos están centrados y montados en su cajón.
- [ ] Las hojas quedan planas al conectar el USB.
- [ ] Los LEDs y el buzzer están en sus torres, con sus cables.
- [ ] El soporte del sensor está pegado.
:::

## Reto extra

Construye una **pasarela superior** que una las dos torres por arriba (como el Tower Bridge) usando palitos y **triángulos**.

Pista: dos palitos largos de torre a torre (o varios unidos), con diagonales en zigzag entre ellos. Debe quedar más alta que el barco. Pégala hasta que las torres estén pegadas (Guía 5).

## Bitácora (10 min)

:::foto id="g4t-foto"
Foto del puente armado.
:::

:::pregunta id="g4t-b1"
¿Qué pieza fue la más difícil de montar y cómo lo resolvieron?
:::

:::pregunta id="g4-b2"
¿Qué rol tuvo cada integrante hoy?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Guía reestructurada (versión Tinkercad):** se arma el puente impreso que diseñaron en las guías 2 y 3. Se quitaron de esta versión el experimento del cuadrado y el triángulo y las torres de palitos (los triángulos quedan en el reto extra). Tiene campos propios (g4t-…).
- El centrado de los servos y la animación del espejo pasaron de la Guía 5 a esta, porque las hojas se pegan hoy. g4t-p1: 180 − 30 = 150°.
- Base de 50 × 30 cm: el puente mide unos 28 × 9 cm. Adelante queda lugar para el soporte del sensor y la llegada del barco; atrás, para el Arduino y la protoboard.
- Si un servo no entra en el cajón, lijar un poco las paredes o reimprimir la orilla con el cajón más grande (por ejemplo 33.4 × 19.5, ver Guía 2).
- Si una hoja no queda plana, se saca el brazo del eje junto con la hoja y se vuelve a poner un diente más allá. El ajuste fino se hace en el código (Guía 5).
- Las torres se dejan sin pegar hasta la Guía 5 para poder revisar los cables de los LEDs, el buzzer y los servos.
- Supervisar la pistola de silicona; tener un vaso con agua fría cerca para quemaduras leves.
- Recordar rotar roles a partir del sábado 5.
- Tiempo total: 10 + 15 + 25 + 35 + 20 + 5 + 10 = 120 minutos.
:::
