---
titulo: Subimos el programa al Arduino
guia: 9
sabado: 9
sesion: Práctica de armado (2)
tipo: armado
duracion: 120
---

# Guía 9 · Subimos el programa al Arduino

## Objetivo del día

Pasar el programa final del simulador al Arduino real con Arduino IDE, revisar la abertura de la compuerta y comprobar que el dispensador hace lo mismo que en el simulador.

**Al terminar tendremos:** el programa `equipo_NOMBRE_final` funcionando en el Arduino del dispensador y la tabla de comparación con el simulador completa.

## Materiales del equipo

- Dispensador con el circuito conectado y revisado (Guía 8)
- Computadora con Arduino IDE y el cable USB del Arduino
- `equipo_NOMBRE_final.txt` (Guía 6) y el circuito simulado abierto en Tinkercad
- Plato y destornillador pequeño

## Parte 1 · Conociendo Arduino IDE (15 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 9.1A: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

## Parte 2 · Conectar el Arduino (15 min)

1. Antes de conectar nada, revisen que la lista de la Guía 8 esté completa.
2. Conecten el USB del Arduino a la computadora. Se enciende la luz **ON** del Arduino.
3. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…**
4. En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.
5. Arriba debe decir **Arduino UNO**, y abajo a la derecha ya no debe decir **[no conectado]**.

[IMAGEN 9.2A: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

## Parte 3 · El programa final (20 min)

1. Abran `equipo_NOMBRE_final.txt` y copien todo.
2. En Arduino IDE, abran un programa nuevo, borren lo que trae y peguen el código.
3. Guárdenlo como `equipo_NOMBRE_final` (con el nombre de su equipo).
4. Toquen **✓ Verificar** y esperen. Si todo está bien, aparece el aviso **Compilación completada** y, en el cuadro de mensajes, cuánto espacio usa el programa.

[IMAGEN 9.3A: Arduino IDE con el programa del dispensador verificado: aviso Compilación completada y el espacio que usa el programa en el cuadro de mensajes]

Si aparece un error en rojo, lean la línea que dice: casi siempre falta un pedazo del código al copiar. Copien todo otra vez desde el archivo.

## Parte 4 · Subirlo y revisar la compuerta (20 min)

1. Toquen **→ Subir**, el botón que está al lado de Verificar. El IDE vuelve a verificar el programa y lo pasa al Arduino por el cable USB.
2. Esperen a que el cuadro de mensajes diga que terminó, sin letras rojas. Mientras sube, parpadean las luces **TX** y **RX** del Arduino. La compuerta queda cerrada.

[IMAGEN 9.4A: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

3. Presionen el botón una vez, **sin comida**: debe sonar el aviso, encenderse el LED y abrirse la compuerta el tiempo de su mascota.
4. **Revisen la abertura:** la compuerta debe destapar la salida sin chocar con la torre y después volver a taparla.
   - Si no tapa la salida en 0°: desconecten el USB, saquen el brazo del eje, gírenlo un poquito y vuelvan a encajarlo.
   - Si la paleta roza el embudo: avisen al docente.

:::checklist id="g9a-subido"
- [ ] El programa se verificó sin errores y subió al Arduino.
- [ ] En 0° la compuerta tapa toda la salida.
- [ ] Al abrir, la salida queda libre y la compuerta no choca.
:::

## Parte 5 · ¿Funciona igual que en el simulador? (35 min)

1. Abran el **Monitor serie** (lupa arriba a la derecha) a **9600 baudios**.
2. Sin comida todavía, presionen el botón y esperen la comida automática: sin tocar nada, debe servir sola al pasar el intervalo. Marquen la tabla:

:::tabla id="g9a-comparar"
| Prueba | ¿En el simulador funcionaba? | ¿En el dispensador real funciona? | Si no, ¿qué revisamos? |
| --- | --- | --- | --- |
| Al presionar el botón, suena el aviso | | | |
| Se enciende el LED | | | |
| La compuerta se abre y se cierra | | | |
| Sirve sola al pasar el intervalo | | | |
| El Monitor cuenta las comidas | | | |
:::

Si algo falla en el real pero funcionaba en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con el simulador y con el diagrama de la Guía 8. Desconecten el USB antes de cambiar un cable.

## ¿Lo logramos? (5 min)

:::checklist id="g9a-logramos"
- [ ] Elegimos la placa y el puerto en Arduino IDE.
- [ ] Subimos el programa final al Arduino.
- [ ] La compuerta abre y tapa bien la salida.
- [ ] Comparamos el dispensador real con el simulado.
:::

## Bitácora (10 min)

:::foto id="g9a-foto"
Foto del dispensador con la compuerta abierta y Arduino IDE en la pantalla.
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica, guía de armado (tipo: armado):** primer contacto de los estudiantes con Arduino IDE (en la Guía 7 el docente dejó el servo en 0°). Junta el programa final y la revisión de la abertura, que estaban en la Guía 7, y la comparación con el simulador, que estaba al inicio de la Guía 8. Campos propios (g9a-…).
- Antes de la clase: Arduino IDE instalado en cada computadora, con la placa Arduino AVR (Arduino Uno) y la biblioteca Servo (viene con el IDE).
- Imágenes 9.1A a 9.4A: capturas de Arduino IDE 2.3.10 en español con el programa final del dispensador, tomadas sin Arduino conectado (por eso la 9.2A no muestra el COM).
- Con el programa final, el dispensador sirve solo cada minuto: avisar al equipo para que no se asusten. Si molesta mientras revisan, desconectar el USB.
- Compuerta nueva (12 de noviembre, ver Guía 2): si el brazo de la academia es más alto que el del plano y la paleta roza el embudo, poner un anillo de cartón debajo de la tapa del embudo.
- Si un equipo no terminó la revisión de la Guía 8, que la termine antes de conectar el USB.
- Tiempo total: 15 + 15 + 20 + 20 + 35 + 5 + 10 = 120 minutos.
:::
