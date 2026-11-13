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

Pasar el programa final del simulador al Arduino real con Arduino IDE, probar la compuerta y la bomba con sus botones y comprobar que el dispensador doble hace lo mismo que en el simulador.

**Al terminar tendremos:** el programa `equipo_NOMBRE_final` funcionando en el Arduino del dispensador doble y la tabla de comparación con el simulador completa.

## Materiales del equipo

- Dispensador doble con el circuito conectado y revisado (Guía 8)
- Computadora con Arduino IDE y el cable USB del Arduino
- La fuente de 5 V de la bomba (ya puesta en el jack en la Guía 8)
- `equipo_NOMBRE_final.txt` (Guía 6) y el circuito simulado abierto en Tinkercad
- Agua en el recipiente, vaso, plato y una bandeja o trapo (para derrames)

> **Seguridad:** el tomacorriente y el cargador van **lejos del agua**. Desenchufen la fuente y desconecten el USB antes de cambiar cualquier cable.

## Parte 1 · Conociendo Arduino IDE (15 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 9.1AD: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

## Parte 2 · Conectar el Arduino (15 min)

1. Antes de conectar nada, revisen que la lista de la Guía 8 esté completa y que la fuente siga **desenchufada**.
2. Conecten el USB del Arduino a la computadora. Se enciende la luz **ON** del Arduino.
3. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…**
4. En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.
5. Arriba debe decir **Arduino UNO**, y abajo a la derecha ya no debe decir **[no conectado]**.

[IMAGEN 9.2AD: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

## Parte 3 · El programa final (15 min)

1. Abran `equipo_NOMBRE_final.txt` y copien todo.
2. En Arduino IDE, abran un programa nuevo, borren lo que trae y peguen el código.
3. Guárdenlo como `equipo_NOMBRE_final` (con el nombre de su equipo).
4. Toquen **✓ Verificar** y esperen. Si todo está bien, aparece el aviso **Compilación completada** y, en el cuadro de mensajes, cuánto espacio usa el programa.

[IMAGEN 9.3AD: Arduino IDE con el programa del dispensador doble verificado: aviso Compilación completada y el espacio que usa el programa en el cuadro de mensajes]

Si aparece un error en rojo, lean la línea que dice: casi siempre falta un pedazo del código al copiar. Copien todo otra vez desde el archivo.

## Parte 4 · Subirlo y probar con los botones (25 min)

1. Toquen **→ Subir**, el botón que está al lado de Verificar. El IDE vuelve a verificar el programa y lo pasa al Arduino por el cable USB.
2. Esperen a que el cuadro de mensajes diga que terminó, sin letras rojas. Mientras sube, parpadean las luces **TX** y **RX** del Arduino.

[IMAGEN 9.4AD: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

3. Revisen que la bomba esté **sumergida**. Enchufen la fuente de 5 V al tomacorriente.
   - **Si la bomba se enciende sola sin presionar nada**, desenchufen la fuente y avisen al docente: algunos relés funcionan "al revés".
4. Presionen el botón **C** (sin cereal todavía): la compuerta se abre y se cierra. Presionen el botón **L**: la bomba echa agua al vaso.
5. **Revisen la abertura:** la compuerta debe destapar la salida sin chocar y volver a taparla.
   - Si no tapa en 0°: desenchufen la fuente, desconecten el USB, saquen el brazo del eje, gírenlo un poquito y vuelvan a encajarlo.
   - Si la paleta roza el embudo: avisen al docente.

:::checklist id="g9ad-subido"
- [ ] El programa se verificó sin errores y subió al Arduino.
- [ ] El botón C abre y cierra la compuerta, y en 0° tapa la salida.
- [ ] El botón L enciende la bomba y el agua cae en el vaso.
:::

## Parte 5 · ¿Funciona igual que en el simulador? (35 min)

1. Abran el **Monitor serie** (lupa arriba a la derecha) a **9600 baudios**.
2. Presionen cada botón y esperen la comida automática. Marquen la tabla:

:::tabla id="g9ad-comparar"
| Prueba | ¿En el simulador funcionaba? | ¿En el dispensador real funciona? | Si no, ¿qué revisamos? |
| --- | --- | --- | --- |
| Botón C: aviso, LED y compuerta | | | |
| Botón L: aviso grave, LED y bomba | | | |
| La bomba se apaga sola al pasar el tiempo | | | |
| Sirve solo cereal y líquido al pasar el intervalo | | | |
| El Monitor cuenta las porciones | | | |
:::

Si algo falla en el real pero funcionaba en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con el simulador y con el diagrama de la Guía 8. Desenchufen la fuente y desconecten el USB antes de cambiar un cable.

## ¿Lo logramos? (5 min)

:::checklist id="g9ad-logramos"
- [ ] Elegimos la placa y el puerto en Arduino IDE.
- [ ] Subimos el programa final al Arduino.
- [ ] La compuerta y la bomba funcionan con sus botones.
- [ ] Comparamos el dispensador real con el simulado.
:::

## Bitácora (10 min)

:::foto id="g9ad-foto"
Video del dispensador doble con el botón C y el botón L.
:::

Antes de irse, **desenchufen la fuente**, vacíen el vaso y dejen el dispensador armado.

:::archivo id="g9-archivo"
**Archivo de trabajo:** suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión doble práctica, guía de armado (tipo: armado):** primer contacto de los estudiantes con Arduino IDE (en la Guía 7 el docente dejó el servo en 0°). Junta el programa final y la revisión de la abertura, que estaban en la Guía 7, y la comparación con el simulador, que estaba al inicio de la Guía 8. Campos propios (g9ad-…).
- Antes de la clase: Arduino IDE instalado en cada computadora, con la placa Arduino AVR (Arduino Uno) y la biblioteca Servo (viene con el IDE).
- Imágenes 9.1AD a 9.4AD: capturas de Arduino IDE 2.3.10 en español con el programa final del dispensador doble, tomadas sin Arduino conectado (por eso la 9.2AD no muestra el COM).
- Algunos módulos relé se activan con LOW (la bomba se enciende al arrancar): en ese caso invertir HIGH y LOW en las líneas de la bomba, o usar el pin "activo alto" si el módulo lo tiene.
- Con el programa final, el dispensador sirve solo cada minuto (cereal y líquido): tener la bomba siempre sumergida mientras esté conectado.
- Si un equipo no terminó la revisión de la Guía 8, que la termine antes de conectar el USB y enchufar la fuente.
- Tiempo total: 15 + 15 + 15 + 25 + 35 + 5 + 10 = 120 minutos.
:::
