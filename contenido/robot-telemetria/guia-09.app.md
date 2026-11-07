---
titulo: ¡A manejar con la app!
guia: 9
sabado: 9
sesion: Programación y pruebas
duracion: 120
---

# Guía 9 · ¡A manejar con la app!

## Objetivo del día

Conectar el HC-05 al robot, subir el programa final, emparejar el celular y salir a manejar con la app, viendo la batería y la distancia en la pantalla.

**Al terminar tendremos:** el robot manejado desde el celular, con la telemetría en la app.

## Materiales del equipo

- Robot armado (sábado 8)
- Módulo HC-05, resistencias de 1 kΩ y 2 kΩ, cables
- El celular Android con la app instalada (sábado 7)
- Computadora con Arduino IDE y `equipo_NOMBRE_robot.txt` (Guía 5)
- Espacio libre en el piso y una caja o pared como obstáculo

## Parte 1 · Ponerse al día (10 min)

Si el sábado 8 no terminaron de armar el robot, termínenlo ahora con la **Guía 8**. Después revisen:

:::checklist id="g9a-robot"
- [ ] El robot queda horizontal sobre sus ruedas.
- [ ] La prueba de motores hace adelante, atrás y giro.
:::

## Parte 2 · El HC-05 en el robot (25 min)

El **HC-05** es el módulo Bluetooth del robot. De fábrica ya sirve para conectarse con un celular: no hay que configurarlo.

Su **RX trabaja a 3,3 V**: desde el TX del Arduino (D11) usa un divisor **1 kΩ / 2 kΩ**. El cable de D11 pasa por la resistencia de 1 kΩ y llega a RXD; desde RXD sale otra resistencia de 2 kΩ hacia GND. Ármenlo en la protoboard del robot con todo apagado.

| HC-05 | Arduino |
| --- | --- |
| VCC / GND | 5V / GND |
| TXD | D10 (RX del Arduino) |
| RXD | D11 → 1 kΩ → RXD, y RXD → 2 kΩ → GND |
| EN / KEY | Sin conectar |

[IMAGEN 4.2: conexión del HC-05 con el divisor de 1 kΩ y 2 kΩ en su pin RXD]

:::pregunta id="g9a-p1"
¿Por qué el RX del HC-05 necesita un divisor de voltaje y el TX no?
:::

## Parte 3 · El programa final (15 min)

1. Pongan el robot sobre una caja, con las ruedas en el aire.
2. Conecten el Arduino por USB. Abran `equipo_NOMBRE_robot.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 5), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_robot`.
3. **Cambio importante:** en el simulador, `bt` era el Monitor en serie. Ahora es el Bluetooth. Borren estas dos líneas:

```cpp
// En el simulador, "bt" es el Monitor en serie
#define bt Serial
```

   y escriban en su lugar:

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);  // RX, TX al HC-05
```

4. Revisen que diga `TIMEOUT = 500`. Verifiquen (✓) y suban (→).

## Parte 4 · Emparejar y conectar (20 min)

1. Enciendan el robot con sus dos interruptores. El LED del HC-05 parpadea **rápido**: está esperando.
2. En el celular: **Ajustes → Bluetooth**. Activen el Bluetooth y busquen dispositivos. Elijan **HC-05** y escriban la clave **1234** (si no funciona, **0000**). Esto se hace solo una vez.
3. Abran la app, toquen **Conectar con el robot** y elijan **HC-05** en la lista.
4. El texto debe cambiar a **Conectado** y el LED del HC-05 parpadea **lento**.
5. En unos segundos deben aparecer la batería y la distancia.

:::tabla id="g9a-conexion"
| Prueba | ¿Funcionó? | Observación |
| --- | --- | --- |
| El celular se emparejó con el HC-05 | | |
| La app dice Conectado | | |
| La app muestra la batería | | |
| La app muestra la distancia y cambia al acercar la mano al sensor | | |
| Con el robot sobre la caja, cada botón mueve las ruedas | | |
:::

## Parte 5 · ¡A manejar! (25 min)

Pongan el robot en el piso, con espacio libre, y hagan cada prueba.

:::tabla id="g9a-integracion"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| **Adelante** → el robot avanza | | |
| **Atrás** → retrocede | | |
| **Izquierda** y **Derecha** → gira hacia ese lado | | |
| Al soltar → se detiene | | |
| El deslizador cambia la velocidad | | |
| La distancia baja al acercarse a la caja | | |
| Cerrar la app con el robot avanzando → se detiene | | |
:::

:::pregunta id="g9a-p2"
¿Hasta qué distancia del robot sigue funcionando la app? ¿Qué pasa cuando se aleja demasiado?
:::

## Parte 6 · Ajustes finales (15 min)

Revisen si les pasa algo de esta tabla y cómo lo solucionaron:

:::tabla id="g9a-motores"
| Síntoma | Causa probable | ¿Nos pasó? | Solución |
| --- | --- | --- | --- |
| Un motor gira al revés | Cables del motor invertidos | | |
| Izquierda y Derecha están cambiados | Números de esos botones en los bloques | | |
| El robot gira cuando debería ir recto | Motores distintos o PWM igual a velocidades distintas | | |
| Un motor no gira | Cable suelto, pin equivocado o la batería de los motores apagada | | |
| Los motores zumban pero no se mueven | PWM muy bajo para arrancar | | |
:::

Para un robot que se desvía, compensen en el código:

1. La línea `const float AJUSTE_DER = 0.92;` va en `// --- Ajustes del equipo ---`.
2. En `procesar()`, cambien la línea `motor(PWMB, BIN1, BIN2, der);` por la del recuadro.
3. Prueben con **Adelante**. Si sigue desviándose, cambien 0.92 por otro número (0.95, 0.90…). Si el más rápido es el **izquierdo**, hagan lo mismo con el motor izquierdo: una constante `AJUSTE_IZQ` y la línea `motor(PWMA, AIN1, AIN2, izq * AJUSTE_IZQ);` (y dejen el derecho como estaba).

```cpp
const float AJUSTE_DER = 0.92;   // si el derecho es más rápido
motor(PWMB, BIN1, BIN2, der * AJUSTE_DER);
```

## ¿Lo logramos? (5 min)

:::checklist id="g9a-logramos"
- [ ] El programa final está cargado.
- [ ] El robot obedece a los botones de la app.
- [ ] La telemetría llega a la app.
- [ ] El robot se detiene si se cierra la app.
:::

## Reto extra

Armen con conos (o vasos) un **slalom** de 4 conos y midan cuánto tarda cada piloto en recorrerlo ida y vuelta sin tocar ninguno.

## Bitácora (5 min)

:::pregunta id="g9a-b1"
¿Qué parte del proyecto les costó más: el diseño 3D, la app, el armado o la programación? ¿Por qué?
:::

:::foto id="g9a-foto"
Video corto del robot manejado con la app.
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con app (9 sábados):** el HC-05 de la Guía 8 Práctica, sin comandos AT: conectado a un celular, el módulo trabaja como esclavo con su configuración de fábrica (9600 baudios, clave 1234 o 0000). Las tablas de pruebas y de motores son las de la Guía 9 Práctica. Es la última guía de esta versión. Campos propios (g9a-…).
- **Antes de la clase, probar la app con un robot armado y un celular:** la app se comprobó hasta generar el APK, pero no se ha probado con un HC-05 real.
- Si la app dice Conectado pero el robot no obedece, revisar TXD → D10 y RXD → D11 (con divisor), y que el código tenga `SoftwareSerial`. Algunos HC-05 vienen a otra velocidad: se revisa con `AT+UART?` como en la Guía 8 Práctica.
- Si el HC-05 no aparece en la lista de la app, primero hay que emparejarlo en los Ajustes del celular.
- Si la app se cierra al tocar **Conectar con el robot**, revisar que tenga el permiso de **Dispositivos cercanos** en los Ajustes del celular.
- La pila de 9 V alimenta también al HC-05: si el módulo se reinicia, cambiar la pila.
- g9a-p1: el TX del Arduino da 5 V y el RX del HC-05 solo aguanta 3,3 V; el TX del HC-05 da 3,3 V, que el Arduino lee sin problema.
- g9a-p2: unos 10 m sin obstáculos, según el celular. Al perder la señal, la app queda sin enviar órdenes y el robot se detiene por el TIMEOUT.
- Con el L298N los motores reciben unos 2 V menos que con el TB6612: si con la velocidad baja solo zumban, es normal; suban el deslizador.
- Si con USB funciona y con baterías no, revisar la pila de 9 V (que esté cargada y su interruptor encendido) y el GND común entre el L298N y el Arduino.
- El reto del slalom sale de la pista de la Guía 10 normal.
- Tiempo total: 10 + 25 + 15 + 20 + 25 + 15 + 5 + 5 = 120 minutos.
:::
