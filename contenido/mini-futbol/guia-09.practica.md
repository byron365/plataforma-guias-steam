---
titulo: Subimos los programas y calibramos los sensores
guia: 9
sabado: 9
sesion: Práctica de armado (2)
tipo: armado
duracion: 120
---

# Guía 9 · Subimos los programas y calibramos los sensores

## Objetivo del día

Usar Arduino IDE para subir un programa de prueba, calibrar los sensores de las porterías y subir el programa final del marcador.

**Al terminar tendremos:** la cancha con su marcador electrónico real, que detecta los goles y los celebra.

## Materiales del equipo

- Cancha con el marcador conectado y revisado (Guía 8)
- Computadora con Arduino IDE y el cable USB del Arduino
- `equipo_NOMBRE_marcador.txt` (Guía 6) y el proyecto de Wokwi abierto
- Destornillador pequeño y la pelota

## Parte 1 · Conociendo Arduino IDE (15 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 9.1A: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

## Parte 2 · Conectar el Arduino (10 min)

1. Conecten el USB del Arduino a la computadora. Se enciende la luz **ON** del Arduino.
2. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…**
3. En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.

[IMAGEN 9.2A: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

## Parte 3 · Probar y calibrar los sensores (40 min)

1. **Archivo → Nuevo boceto**, borra lo que trae, escribe este código de prueba, verifica (✓) y súbelo (→).
2. Abre el Monitor serie (lupa, arriba a la derecha) y elige **9600 baudios**.

[IMAGEN 9.4A: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

```cpp
void setup() {
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.print("Azul: ");
  Serial.print(digitalRead(3));
  Serial.print("   Rojo: ");
  Serial.println(digitalRead(4));
  delay(200);
}
```

Cada sensor tiene un **tornillo azul** (potenciómetro) que cambia hasta qué distancia detecta.

3. Gira el tornillo **a la izquierda** hasta que el LED del sensor se apague sin pelota. Giren con el destornillador pequeño, poco a poco (un cuarto de vuelta cada vez).
4. Gíralo **poco a poco a la derecha** hasta que detecte la pelota dentro de la portería, pero **no** cuando pasa por fuera, frente a ella. Después de cada pequeño giro, pongan la pelota dentro y fuera, y miren el LED y el Monitor serie.

Muevan el tornillo en la animación y miren cómo cambia la distancia a la que detecta:

:::animacion tipo="calibracion-ir"
:::

Hagan cada prueba en las dos porterías y escriban Sí o No. En la última columna, ¿el sensor hizo lo que debía?

:::tabla id="g9a-calibracion"
| Prueba | Portería azul (¿detecta?) | Portería roja (¿detecta?) | ¿Es correcto? |
| --- | --- | --- | --- |
| Pelota en el fondo de la portería | | | |
| Pelota en la línea de gol | | | |
| Pelota pasando frente a la portería, por fuera | | | |
| Mano de un jugador cerca de la portería | | | |
:::

## Parte 4 · El programa final (40 min)

1. Abran `equipo_NOMBRE_marcador.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 6), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_marcador`.
2. Instalen las librerías **Adafruit SSD1306** y **Adafruit GFX Library**: **Gestor de bibliotecas** (icono de los libros a la izquierda) → buscar → **Instalar** (si pregunta por otras, **Instalar todo**).
3. **Cambio importante:** en `setup()` cambien `INPUT_PULLUP` por `INPUT` en los dos sensores (el sensor real ya da su propia señal).
   - Son las líneas de `SENSOR_AZUL` y `SENSOR_ROJO`, las que dicen `// en el real: INPUT`. El botón de inicio se queda con `INPUT_PULLUP`.
4. Verifiquen (✓): debe aparecer el aviso **Compilación completada**. Después súbanlo (→).

[IMAGEN 9.3A: Arduino IDE con el programa del marcador verificado, con los sensores en INPUT y el aviso Compilación completada]

5. Prueben metiendo goles con la mano: presionen el botón de inicio (suena el silbato) y metan la pelota en cada portería.

[IMAGEN 5.3: marcador terminado a un lado de la cancha mostrando AZUL 1 - 0 ROJO]

:::tabla id="g9a-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Gol en la portería azul suma al ROJO | | |
| Gol en la portería roja suma al AZUL | | |
| Suena la celebración | | |
| El tiempo baja | | |
:::

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Wokwi y con el diagrama de la Guía 8. Desconecten el USB antes de cambiar un cable.

:::pregunta id="g9a-p1"
¿Pasó que un gol se contó dos veces o que un gol no se contó? Describe qué pasó.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9a-logramos"
- [ ] Elegimos la placa y el puerto en Arduino IDE.
- [ ] Los sensores están calibrados: detectan dentro, no por fuera.
- [ ] El marcador real cuenta los goles.
- [ ] El buzzer celebra los goles.
:::

## Bitácora (10 min)

:::foto id="g9a-foto"
Video corto de un gol con el marcador sumando.
:::

:::pregunta id="g9a-b1"
¿Qué problema tuvimos hoy y cómo lo resolvimos?
:::

Antes de irse, guarden `equipo_NOMBRE_marcador` (**Ctrl + S**) y súbanlo aquí.

:::archivo id="g9-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (10 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Junta la calibración y el programa final que estaban en la Guía 8 (Partes 3 y 4), con las partes de Arduino IDE. Campos propios (g9a-…): g9a-calibracion, g9a-pruebas y g9a-p1 eran g8p-calibracion, g8p-pruebas y g8p-p1.
- Imágenes 9.1A a 9.4A: capturas de Arduino IDE 2.3.10 en español con el programa del marcador (el de la Guía 5 con los cambios de la Guía 6 y los sensores en `INPUT`), tomadas sin Arduino conectado (por eso la 9.2A no muestra el COM).
- Antes de la clase, instalar las librerías Adafruit SSD1306 y Adafruit GFX en cada computadora si no hay internet en el aula.
- Si un sensor marca siempre 0, está detectando algo cerca (la propia portería): girar su tornillo azul para bajar la sensibilidad.
- Pelotas blancas se detectan mejor que las negras.
- g9a-p1 prepara la prueba de 20 goles de la Guía 10.
- Tiempo total: 15 + 10 + 40 + 40 + 5 + 10 = 120 minutos.
:::
