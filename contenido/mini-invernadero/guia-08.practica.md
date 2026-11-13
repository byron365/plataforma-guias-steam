---
titulo: Subimos el programa al invernadero
guia: 8
sabado: 8
sesion: Práctica de armado (2)
tipo: armado
duracion: 120
---

# Guía 8 · Subimos el programa al invernadero

## Objetivo del día

Usar Arduino IDE para probar la ventana y elegir cuánto se abre, subir el programa final y calibrar el umbral con tierra de verdad.

**Al terminar tendremos:** el invernadero funcionando solo: riega cuando la tierra se seca, abre la ventana con calor y enciende la luz.

## Materiales del equipo

- El invernadero con el circuito conectado y revisado (Guía 7)
- La fuente de 5 V (ya conectada al jack en la Guía 7) y el depósito con agua
- Un poco de tierra seca en un vaso aparte y un vaso vacío
- Computadora con Arduino IDE, el cable USB del Arduino y `equipo_NOMBRE_final.txt` (Guía 5)

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g8a-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Conociendo Arduino IDE (15 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 8.1A: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

1. Con la fuente **desenchufada**, conecten el USB del Arduino a la computadora. Se enciende la luz **ON** del Arduino.
2. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…** En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.

[IMAGEN 8.2A: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

## Parte 3 · La ventana: cuánto se abre (25 min)

1. Creen un programa nuevo y escriban el de la ventana (es la parte de la ventana de la Guía 3):

```cpp
#include <Servo.h>
Servo ventana;

const int BOTON = 2;
const int ANGULO_ABIERTA = 60;   // grados
bool abierta = false;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);   // botón suelto = HIGH
  ventana.attach(9);
  ventana.write(0);               // cerrada
}

void loop() {
  if (digitalRead(BOTON) == LOW) {    // botón presionado
    abierta = !abierta;               // cambiar: abierta <-> cerrada
    if (abierta) {
      ventana.write(ANGULO_ABIERTA);
    } else {
      ventana.write(0);
    }
    delay(500);                       // evitar doble toque
  }
}
```

2. Guárdenlo como `equipo_NOMBRE_ventana` y toquen **✓ Verificar**: debe aparecer el aviso **Compilación completada**.

[IMAGEN 8.3A: Arduino IDE con el programa de la ventana verificado y el aviso Compilación completada]

3. Toquen **→ Subir**, el botón que está al lado de Verificar, y esperen a que el cuadro de mensajes diga que terminó, sin letras rojas. Al encender, el servo va a **0°**.

[IMAGEN 8.4A: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

4. Presionen el botón: el palito sube por el corte y empuja la ventana. Si no la alcanza, alárguenlo o acerquen el soporte.

**Ajustar la apertura:** cambien el número de `ANGULO_ABIERTA` por cada valor de la tabla, suban el código, abran la ventana con el botón y observen. Si el servo zumba o empuja contra algo, eso es "forzar".

:::tabla id="g8a-angulos"
| Ángulo de "abierta" | ¿Cuánto se abre la ventana? | ¿El servo fuerza o choca? |
| --- | --- | --- |
| 30 | | |
| 60 | | |
| 90 | | |
:::

Nuestro ángulo de ventana abierta: ANGULO_ABIERTA = ______

:::pregunta id="g8a-p1"
¿Qué le pasa al servo si el ángulo es demasiado grande y la ventana ya no puede abrirse más?
:::

## Parte 4 · El programa final (15 min)

1. En Arduino IDE instalen la librería del sensor de temperatura: abran el **Gestor de bibliotecas** (icono de los libros, a la izquierda), busquen **DHT sensor library**, elijan la de **Adafruit** y presionen **Instalar** (si pregunta por otras, **Instalar todo**).
2. Abran `equipo_NOMBRE_final.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 5), copien todo, péguenlo en un programa nuevo y guárdenlo como `equipo_NOMBRE_final`.
3. Hagan **dos cambios**:
   - En la línea `DHT dht(DHT_PIN, DHT22);` cambien **DHT22** por **DHT11** (el sensor real).
   - En `ANGULO_ABIERTA` pongan el ángulo que eligieron en la Parte 3.
4. Verifiquen (✓) y súbanlo (→). Enchufen la fuente de 5 V.
   - **Si la bomba se enciende sola sin que la tierra esté seca**, desenchufen la fuente y avisen al docente: algunos relés funcionan "al revés".

## Parte 5 · Calibrar el umbral (30 min)

El **umbral** (`UMBRAL_SECO`) es el número que separa "seca" de "húmeda". En el simulador era una perilla; ahora lo medimos con tierra de verdad.

1. Abran el **Monitor serie** a 9600 baudios: el primer número de cada línea es la humedad de la tierra.
2. Para cada fila, claven el sensor en esa tierra (sin pasar la línea marcada), esperen unos segundos y anoten tres números.
   - **Muy seca:** el vaso de tierra seca.
   - **Un poco húmeda:** tierra seca con unas cucharadas de agua, bien mezclada.
   - **Recién regada:** la maceta justo después de regarla.
3. **Promedio** = (Valor 1 + Valor 2 + Valor 3) ÷ 3.

:::tabla id="g8a-calibracion"
| Tierra | Valor 1 | Valor 2 | Valor 3 | Promedio |
| --- | --- | --- | --- | --- |
| Muy seca (vaso aparte) | | | | |
| Un poco húmeda | | | | |
| Recién regada | | | | |
:::

> Umbral = un número entre el promedio de "un poco húmeda" y el de "muy seca"

Esta animación usa los números de su tabla. Muevan el umbral y miren cuándo regaría:

:::animacion tipo="umbral" tabla="g8a-calibracion"
:::

4. Pongan su número en `UMBRAL_SECO`, súbanlo otra vez y devuelvan el sensor a la maceta.

Nuestro umbral: UMBRAL_SECO = ______

## Parte 6 · Probar el invernadero (10 min)

:::checklist id="g8a-pruebas"
- [ ] Con el sensor en la tierra seca del vaso, riega solo (con la manguera en otro vaso).
- [ ] Manteniendo presionado el botón 1 segundo, riega a mano.
- [ ] La luz se enciende y se apaga cada minuto.
- [ ] Con calor (lámpara, con el docente), la ventana se abre; al enfriarse, se cierra.
:::

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Wokwi y con los diagramas de la Guía 7. Desenchufen la fuente y desconecten el USB antes de cambiar un cable.

## ¿Lo logramos? (5 min)

:::checklist id="g8a-logramos"
- [ ] Revisamos las plantas.
- [ ] Elegimos el ángulo de la ventana.
- [ ] El programa final está en el Arduino, con DHT11 y nuestro ángulo.
- [ ] Calibramos el umbral con tierra de verdad.
- [ ] El invernadero funciona solo.
:::

## Bitácora (10 min)

:::pregunta id="g8a-b1"
¿Qué fue distinto en el invernadero real comparado con el simulador?
:::

Antes de irse, **desenchufen la fuente** y suban el programa final con su umbral.

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión práctica (9 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Junta el programa de la ventana y el ajuste del ángulo de la Guía 6 práctica anterior (Partes 4 y 5) con el programa final, la calibración y las pruebas de la Guía 7 práctica anterior (Partes 3 a 5), más las partes de Arduino IDE. Campos propios (g8a-…): g8a-angulos y g8a-p1 eran g6p-angulos y g6p-p2; g8a-calibracion, g8a-pruebas y g8a-b1 eran g7p-….
- Imágenes 8.1A a 8.4A: capturas de Arduino IDE 2.3.10 en español con el programa de la ventana, tomadas sin Arduino conectado (por eso la 8.2A no muestra el COM).
- g8a-p1: el servo se queda empujando, zumba y se calienta; puede dañarse o despegar la ventana.
- El programa final es el del simulador con dos cambios: `DHT22` → `DHT11` y el ángulo de la ventana.
- Algunos módulos relé se activan con LOW: si la bomba se enciende al arrancar, invertir HIGH y LOW en las líneas de la bomba.
- Nunca encender la bomba en seco. Si gira débil, revisar que la fuente sea de 5 V y al menos 1 A, y los tornillos del jack y del relé.
- Si el DHT11 da "nan" en el Monitor, revisar el cable de DATA (D7) y que la librería sea la de Adafruit.
- Tiempo total: 10 + 15 + 25 + 15 + 30 + 10 + 5 + 10 = 120 minutos. Si falta tiempo, la Parte 6 se hace al inicio de la Guía 9.
:::
