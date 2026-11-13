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

Pasar el programa del simulador al Arduino real con Arduino IDE y comprobar que el puente hace lo mismo que en el simulador.

**Al terminar tendremos:** el programa `equipo_NOMBRE_automatico` funcionando en el Arduino del puente y la tabla de comparación con el simulador completa.

## Materiales del equipo

- Puente con el circuito conectado y revisado (Guía 8)
- Computadora con Arduino IDE y el cable USB del Arduino
- Eliminador de 9 V (ya puesto en el jack en la Guía 8)
- `equipo_NOMBRE_automatico.txt` (Guía 6) y el circuito simulado abierto en Tinkercad
- Un "barco" para probar: una caja pequeña, un bloque o un vaso

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

## Parte 3 · El programa del puente (20 min)

1. Abran `equipo_NOMBRE_automatico.txt` y copien todo.
2. En Arduino IDE, abran un programa nuevo, borren lo que trae y peguen el código.
3. Guárdenlo como `equipo_NOMBRE_automatico` (con el nombre de su equipo).
4. Toquen **✓ Verificar** y esperen. Si todo está bien, aparece el aviso **Compilación completada** y, en el cuadro de mensajes, cuánto espacio usa el programa.

[IMAGEN 9.3A: Arduino IDE con el programa del puente verificado: aviso Compilación completada y el espacio que usa el programa en el cuadro de mensajes]

Si aparece un error en rojo, lean la línea que dice: casi siempre falta un pedazo del código al copiar. Copien todo otra vez desde el archivo.

## Parte 4 · Subirlo al Arduino (15 min)

1. Toquen **→ Subir**, el botón que está al lado de Verificar. El IDE vuelve a verificar el programa y lo pasa al Arduino por el cable USB.
2. Esperen a que el cuadro de mensajes diga que terminó, sin letras rojas. Mientras sube, parpadean las luces **TX** y **RX** del Arduino.
3. Debe encenderse el **verde** y las hojas deben quedarse **planas**.
4. Enchufen el eliminador a la pared. Con el eliminador, el Arduino no se reinicia cuando se mueven los servos.

[IMAGEN 9.4A: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

:::checklist id="g9a-subido"
- [ ] El programa se verificó sin errores.
- [ ] El programa subió al Arduino.
- [ ] Se enciende el verde y las hojas quedan planas.
:::

## Parte 5 · ¿Funciona igual que en el simulador? (40 min)

1. Abran el **Monitor serie** (lupa arriba a la derecha) a **9600 baudios**.
2. Con el río **vacío**, el sensor debe mostrar un número grande (más de 20) o 0. Si muestra un número pequeño, está viendo la orilla B o una torre: avisen al docente.
3. Pasen el barco frente al sensor y marquen la tabla:

:::tabla id="g9a-comparar"
| Prueba | ¿En el simulador funcionaba? | ¿En el puente real funciona? | Si no, ¿qué revisamos? |
| --- | --- | --- | --- |
| Se enciende el verde al empezar | | | |
| Al llegar el barco: amarillo y alarma | | | |
| Luego el rojo | | | |
| Las dos hojas suben juntas, en espejo | | | |
| Esperan arriba y bajan hasta quedar planas | | | |
| Vuelve el verde | | | |
:::

Si algo falla en el real pero funcionaba en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con el simulador y con el diagrama de la Guía 8. Desconecten el USB y el eliminador antes de cambiar un cable.

:::pregunta id="g9a-p1"
¿Qué cosa funcionó distinto en el puente real que en el simulador? ¿Por qué creen que pasó?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9a-logramos"
- [ ] Elegimos la placa y el puerto en Arduino IDE.
- [ ] Subimos el programa del simulador al Arduino.
- [ ] Comparamos el puente real con el simulado.
:::

## Bitácora (10 min)

:::foto id="g9a-foto"
Foto del puente con el verde encendido y Arduino IDE en la pantalla.
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica, guía de armado (tipo: armado):** primer contacto de los estudiantes con Arduino IDE (en la Guía 7 el docente subió el programa de centrado). Junta los pasos para subir el programa que estaban al final de la Guía 7 y la comparación con el simulador que estaba al inicio de la Guía 8. Campos propios (g9a-…).
- Antes de la clase: Arduino IDE instalado en cada computadora, con la placa Arduino AVR (Arduino Uno) y la biblioteca Servo (viene con el IDE).
- Si un equipo no terminó la revisión de la Guía 8, que la termine antes de conectar el USB.
- Si el Arduino se reinicia cuando se mueven los servos, revisar que el eliminador esté enchufado.
- Si un objeto no se detecta bien, usar uno con una cara plana hacia el sensor (una caja): el ultrasonido rebota mejor en superficies planas.
- Tiempo total: 15 + 15 + 20 + 15 + 40 + 5 + 10 = 120 minutos.
:::
