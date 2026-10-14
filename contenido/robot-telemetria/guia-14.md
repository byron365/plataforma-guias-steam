---
titulo: Del mando al celular
guia: 14
sabado: 14
sesion: Proyección a Intermedio III
duracion: 120
---

# Guía 14 · Del mando al celular

## Objetivo del día

Controlar el robot desde el celular con una app Bluetooth, conocer los encoders y el control en lazo cerrado, y diseñar el robot 2.0.

**Al terminar tendremos:** el robot manejado desde una app del celular y el plan del robot 2.0.

## Materiales del equipo

- Robot (con su HC-05 esclavo)
- Celular Android con una app de terminal o de control Bluetooth (por ejemplo "Serial Bluetooth Terminal")
- Bitácora

## Parte 1 · El celular como mando (40 min)

El HC-05 del robot es **esclavo**: cualquier maestro puede conectarse a él, también un celular.

1. Apaga el mando (para liberar al HC-05 del robot).
   - Desconecten su USB. Pongan el robot sobre una caja con las ruedas en el aire para las primeras pruebas.
2. En el celular, empareja el Bluetooth con el HC-05 (clave **1234** o **0000**).
   - Se hace desde los ajustes de Bluetooth del celular. Se necesita un celular **Android**.
3. Abre la app, conéctate al módulo y escribe `M,150,150`. ¿Avanza?
   - Instalen **Serial Bluetooth Terminal**. En la app: menú → **Devices** → elijan el HC-05 y toquen conectar.
   - En los ajustes de la app, revisen que al enviar agregue un salto de línea (**Newline: CR+LF** o **LF**): el robot espera el salto de línea para saber que terminó el mensaje.
   - Escriban el mensaje abajo y toquen la flecha de enviar.

[IMAGEN 14.1: app de terminal Bluetooth en un celular con botones configurados para enviar las órdenes M al robot]

4. Configura **botones** (macros) en la app:
   - Mantengan presionado un botón **M1**, **M2**… de la barra de botones para darle un nombre (por ejemplo "Adelante") y el mensaje de la tabla.

:::tabla id="g14-botones"
| Botón | Mensaje | ¿Funcionó? |
| --- | --- | --- |
| Adelante | M,150,150 | |
| Atrás | M,-150,-150 | |
| Izquierda | M,-120,120 | |
| Derecha | M,120,-120 | |
| Parar | M,0,0 | |
:::

:::pregunta id="g14-p1"
Al presionar "Adelante" una vez, el robot avanza menos de un segundo y se detiene. ¿Por qué? ¿Qué parte del código lo causa?
:::

La app también muestra la telemetría `T,bat,dist` que envía el robot: el celular ya funciona como mando con pantalla.

## Parte 2 · Lazo abierto y lazo cerrado (25 min)

Hoy el robot funciona en **lazo abierto**: le damos un PWM y "esperamos" que vaya a cierta velocidad. Si una rueda roza o la batería baja, va más lento y no se entera.

En **lazo cerrado**, un **encoder** (un disco con ranuras y un sensor) mide cuánto gira cada rueda, y el programa corrige el PWM para mantener la velocidad pedida.

Miren en la animación la diferencia entre lazo abierto y lazo cerrado:

:::animacion tipo="lazo-cerrado" sistema="robot"
:::

Completen la tabla con Sí, No o una explicación corta. En la última fila, un ejemplo de la vida diaria para cada tipo.

:::tabla id="g14-lazos"
| | Lazo abierto | Lazo cerrado |
| --- | --- | --- |
| ¿Mide lo que pasa? | | |
| ¿Corrige errores? | | |
| ¿Avanza recto si un motor es más débil? | | |
| Ejemplo cotidiano | | |
:::

:::pregunta id="g14-p2"
Da un ejemplo de lazo cerrado en tu casa o en un carro.
:::

## Parte 3 · El robot 2.0 (40 min)

Marquen las ideas que el equipo le pondría al robot 2.0:

:::checklist id="g14-ideas"
- [ ] App propia con joystick en pantalla
- [ ] Encoders y velocidad en lazo cerrado
- [ ] Varios sensores de distancia
- [ ] Cámara con video al celular
- [ ] Control por WiFi en vez de Bluetooth
- [ ] Brazo o pinza sobre el robot
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del robot 2.0 | |
| Nuevos requisitos | |
| Cambios en la arquitectura (nodos y enlaces) | |
| Cambios en la potencia | |
| ¿Qué necesitamos aprender? | |
:::

Dibujen el diagrama de bloques del robot 2.0 (con los mismos colores de flechas de la Guía 2) y súbanlo:

:::foto id="g14-boceto"
Diagrama de bloques del robot 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Manejamos el robot desde el celular.
- [ ] Entendimos la diferencia entre lazo abierto y cerrado.
- [ ] Diseñamos el robot 2.0 con su diagrama de bloques.
:::

## Reto extra

Usa una app con **joystick** en pantalla que envíe valores, y adapta el robot para que acepte también ese formato (sin romper el protocolo `M,izq,der`).

## Bitácora (10 min)

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g14-b1" individual="si"
¿Qué es lo que más quiero aprender en Intermedio III?
:::

:::archivo id="g14-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- g14-p1: el TIMEOUT de seguridad detiene el robot si no llegan mensajes cada 500 ms; desde la app hay que repetir el mensaje (algunas apps permiten "repetir mientras se mantiene presionado") o aumentar el TIMEOUT solo para esta prueba.
- iPhone no es compatible con el HC-05 (usa Bluetooth clásico); se necesita Android.
- Tiempo total: 40 + 25 + 40 + 5 + 10 = 120 minutos.
:::
