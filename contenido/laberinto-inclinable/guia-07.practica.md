---
titulo: Subimos el programa y ajustamos el control
guia: 7
sabado: 7
sesion: Práctica de armado (2)
tipo: armado
duracion: 120
---

# Guía 7 · Subimos el programa y ajustamos el control

## Objetivo del día

Usar Arduino IDE para subir el programa final al laberinto y ajustar el control con la canica de verdad.

**Al terminar tendremos:** el laberinto funcionando: la canica recorre el tablero con el joystick.

## Materiales del equipo

- Laberinto armado con el circuito conectado y revisado (Guía 6)
- La fuente de 5 V (ya conectada al jack en la Guía 6)
- Canica y celular para cronometrar
- Computadora con Arduino IDE, el cable USB del Arduino, el proyecto de Wokwi abierto y `equipo_NOMBRE_control.txt` (Guía 4)

## Parte 1 · Conociendo Arduino IDE (20 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 7.1A: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

## Parte 2 · Conectar el Arduino (10 min)

1. Con la fuente **desenchufada**, conecten el USB del Arduino a la computadora. Se enciende la luz **ON** del Arduino.
2. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…**
3. En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.

[IMAGEN 7.2A: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

## Parte 3 · El programa final (20 min)

1. Abran `equipo_NOMBRE_control.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 4), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_control`.
2. Toquen **✓ Verificar**: debe aparecer el aviso **Compilación completada**.

[IMAGEN 7.3A: Arduino IDE con el programa del control verificado y el aviso Compilación completada]

3. Toquen **→ Subir**, el botón que está al lado de Verificar, y esperen a que el cuadro de mensajes diga que terminó, sin letras rojas.

[IMAGEN 7.4A: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

4. Después enchufen la fuente.
5. Muevan el joystick **despacio**: el tablero debe inclinarse. Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Wokwi y con los diagramas de la Guía 6. Desenchufen la fuente y desconecten el USB antes de cambiar un cable.

## Parte 4 · Ajustar el control (50 min)

Pongan la canica en la salida y muevan el joystick **despacio** hacia cada lado:

:::tabla id="g7a-sentido"
| Movimiento del joystick | ¿Hacia dónde se inclina el tablero? | ¿Es lo esperado? |
| --- | --- | --- |
| Derecha | | |
| Izquierda | | |
| Arriba | | |
| Abajo | | |
:::

Si un eje se mueve **al revés**, cambien el orden de los dos últimos números de su `map`, como en la Guía 4: `CENTRO + INCLINACION, CENTRO - INCLINACION`.

Ahora busquen su inclinación. Cambien `INCLINACION` por el número de cada fila, suban el código y lleven la canica a la meta. Una persona cronometra con el celular (si no llega, escriban "no llegó").

:::tabla id="g7a-inclinacion"
| INCLINACION | ¿La canica se mueve? | ¿Es fácil de controlar? | Tiempo para llegar a la meta (s) |
| --- | --- | --- | --- |
| 5 | | | |
| 10 | | | |
| 15 | | | |
| 20 | | | |
:::

Si el tablero da saltos, bajen `SUAVE`; si responde muy lento, súbanlo.

:::pregunta id="g7a-p1"
¿Qué valores de INCLINACION y SUAVE elegimos y por qué?
:::

Dejen en el código los valores elegidos, súbanlo y guárdenlo (**Ctrl + S**).

## ¿Lo logramos? (5 min)

:::checklist id="g7a-logramos"
- [ ] Elegimos la placa y el puerto en Arduino IDE.
- [ ] El programa final está en el Arduino.
- [ ] Los ejes se mueven hacia el lado correcto.
- [ ] Elegimos la inclinación y la canica llega a la meta.
:::

## Bitácora (15 min)

:::foto id="g7a-foto"
Video corto de la canica moviéndose por el laberinto.
:::

Antes de irse: desenchufen la fuente y el USB, y suban `equipo_NOMBRE_control` aquí.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (8 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Antes eran las Partes 3 y 4 de la Guía 6 práctica, más las partes de Arduino IDE. Campos propios (g7a-…): g7a-sentido, g7a-inclinacion, g7a-p1 y g7a-foto eran g6p-….
- Imágenes 7.1A a 7.4A: capturas de Arduino IDE 2.3.10 en español con el programa del control (Guía 4), tomadas sin Arduino conectado (por eso la 7.2A no muestra el COM).
- Si el Arduino se reinicia al mover el joystick, revisar que los servos estén en la fuente y no en el 5V del Arduino.
- Con INCLINACION mayor de 20 la canica suele saltar las paredes.
- Si un equipo no termina, sigue al inicio del sábado 8.
- Tiempo total: 20 + 10 + 20 + 50 + 5 + 15 = 120 minutos.
:::
