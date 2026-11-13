---
titulo: Subimos el programa a la garra
guia: 10
sabado: 10
sesion: Práctica de armado (2)
tipo: armado
duracion: 120
---

# Guía 10 · Subimos el programa a la garra

## Objetivo del día

Usar Arduino IDE para subir el programa final a la garra y probar cada perilla con su articulación.

**Al terminar tendremos:** la garra completa moviéndose con las cuatro perillas.

## Materiales del equipo

- Garra con el circuito conectado y revisado (Guía 9)
- Computadora con Arduino IDE y el cable USB del Arduino
- La fuente de 5 V (ya conectada al jack en la Guía 9)
- `equipo_NOMBRE_rutina.txt` (Guía 6) y el circuito simulado abierto en Tinkercad

## Parte 1 · Conociendo Arduino IDE (20 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 10.1A: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

## Parte 2 · Conectar el Arduino (15 min)

1. Con la fuente **desenchufada**, conecten el USB del Arduino a la computadora. Se enciende la luz **ON** del Arduino.
2. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…**
3. En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.

[IMAGEN 10.2A: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

## Parte 3 · Subir el programa final (25 min)

1. Abran `equipo_NOMBRE_rutina.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 6), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_rutina`.
2. Toquen **✓ Verificar**: debe aparecer el aviso **Compilación completada**.

[IMAGEN 10.3A: Arduino IDE con el programa de la garra verificado y el aviso Compilación completada]

3. Toquen **→ Subir**, el botón que está al lado de Verificar, y esperen a que el cuadro de mensajes diga que terminó, sin letras rojas.

[IMAGEN 10.4A: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

4. Después enchufen la fuente de 5 V al tomacorriente y a su jack hembra.

## Parte 4 · Probar las perillas (40 min)

1. **Prueben una perilla a la vez, despacio.** Si una pieza va a chocar, suelten la perilla. Si algo hace ruido raro o se calienta, desenchufen la fuente.
2. Todavía **no presionen el botón**: las posiciones de la rutina se corrigen en la Guía 11.

:::tabla id="g10a-respuesta"
| Articulación | ¿Se mueve? | ¿Gira al lado correcto? |
| --- | --- | --- |
| Base | | |
| Hombro | | |
| Codo | | |
| Pinza | | |
:::

> Si una articulación gira al revés de la perilla, intercambien los dos últimos números de su `leer()`, como en la Guía 4. Ejemplo: `leer(A1, 165, 15)`.

3. Abran el **Monitor serie** (lupa arriba a la derecha) a **9600 baudios**: deben aparecer los cuatro ángulos, y cambian al girar las perillas.

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Tinkercad y con el diagrama de la Guía 9. Desenchufen la fuente y desconecten el USB antes de cambiar un cable.

## ¿Lo logramos? (5 min)

:::checklist id="g10a-logramos"
- [ ] Elegimos la placa y el puerto en Arduino IDE.
- [ ] El programa final está en el Arduino.
- [ ] Las cuatro perillas mueven su articulación, al lado correcto.
- [ ] El Monitor serie muestra los cuatro ángulos.
:::

## Bitácora (15 min)

:::foto id="g10a-foto"
Video corto de la garra moviéndose con las perillas.
:::

Antes de irse, desenchufen la fuente y el USB.

:::archivo id="g10-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (11 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Antes era la Parte 5 de la Guía 8, más las partes de Arduino IDE. Campos propios (g10a-…); g10a-respuesta era g8p-respuesta.
- Imágenes 10.1A a 10.4A: capturas de Arduino IDE 2.3.10 en español con el programa de la rutina (Guía 6), tomadas sin Arduino conectado (por eso la 10.2A no muestra el COM).
- El programa final ya tiene el modo manual: no hace falta otro programa para probar las perillas. Los ángulos del Monitor serie sirven en la Guía 11 para los límites y las posiciones.
- Si el Arduino se reinicia al mover varias perillas, revisar que ningún servo esté en el 5V del Arduino.
- Revisar el GND común de cada equipo antes de que enchufen la fuente: es el error más frecuente.
- Tiempo total: 20 + 15 + 25 + 40 + 5 + 15 = 120 minutos.
:::
