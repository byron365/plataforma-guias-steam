---
titulo: El marcador real
guia: 8
sabado: 8
sesion: Integración de sistemas
duracion: 120
---

# Guía 8 · El marcador real

## Objetivo del día

Instalar los sensores infrarrojos en las porterías, armar el marcador **copiando el circuito del simulador**, calibrar los sensores y subir el programa final.

**Al terminar tendremos:** la cancha con su marcador electrónico real, que detecta los goles y los celebra.

## Materiales del equipo

- Cancha con porterías y el soporte del marcador (sábado 7)
- Arduino UNO + cable USB
- 2 sensores infrarrojos de obstáculos (FC-51 o similar)
- Pantalla OLED SSD1306, buzzer, botón
- Protoboard, cables largos (macho-hembra), pegamento caliente
- Cinta doble cara o silicona, destornillador pequeño
- Computadora con Arduino IDE, el proyecto de Wokwi abierto y `equipo_NOMBRE_marcador.txt` (Guía 6)

## Parte 1 · Instalar los sensores (25 min)

1. Acuesta cada sensor sobre el **pie** que está detrás de la portería, con los componentes hacia arriba y los ojitos hacia la **ventana del fondo**, mirando hacia la cancha.
2. Empújalo hasta que la orilla de la placa toque el **tope**: los ojitos quedan dentro de la ventana, sin salirse hacia la cancha. Fíjalo con una gota de pegamento caliente en la placa (no en los ojitos ni en el tornillo azul, que se usa para calibrar).
3. Lleven los cables del sensor desde la parte de atrás del pie hasta el marcador, pegados con cinta por el borde de la base.
   - Pongan cables macho–hembra en los tres pines del sensor (la punta hembra en el sensor) y márquenlos con cinta: "azul" y "rojo", según la portería.

[IMAGEN 5.1: sensor infrarrojo montado detrás de la portería con sus emisores en la ventana del fondo]

4. Coloca la pantalla por detrás de la **ventana del soporte del marcador**, con el vidrio tapando la ventana, y el buzzer por detrás de su **agujero**.
   - Péguenlos con cinta doble cara o silicona, solo en la placa (nunca sobre el vidrio de la pantalla).

## Parte 2 · El circuito, copiado del simulador (25 min)

Es el mismo circuito de Wokwi: tengan la simulación abierta y copien **cable por cable**. Lo único distinto: en lugar de los botones de las porterías van los **sensores**, que tienen tres pines.

Conecten con el **USB desconectado**. En la protoboard, las filas largas de los bordes (**+** y **−**) están conectadas a lo largo.

1. Cable del **5V** del Arduino a la fila **+** y de **GND** a la fila **−**.
2. **Sensores:** VCC → fila **+**, GND → fila **−**, OUT → su pin (D3 la azul, D4 la roja).
3. **Botón de inicio:** sobre la canaleta del centro, dos patas en diagonal: una → **D2**, la otra → fila **−**.
4. **Buzzer:** pata **+** (marcada o la más larga) → **D5**; la otra → fila **−**.
5. **OLED:** lean el orden de sus pines (algunas traen GND primero). VCC → fila **+**, GND → fila **−**, SDA → **A4**, SCL → **A5**.

| Componente | Conexión |
| --- | --- |
| Sensor portería azul | VCC → 5V · GND → GND · OUT → D3 |
| Sensor portería roja | VCC → 5V · GND → GND · OUT → D4 |
| Botón de inicio | D2 y GND |
| Buzzer | + → D5 · − → GND |
| OLED | SDA → A4 · SCL → A5 · VCC → 5V · GND → GND |

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones" circuito="futbol-real"
:::

[IMAGEN 5.2: circuito real del marcador con Arduino, OLED, buzzer, botón y los cables de los dos sensores]

## Parte 3 · Probar y calibrar los sensores (30 min)

1. Conecta el USB, abre **Arduino IDE** y elige **Arduino Uno** y su puerto en la lista **Seleccionar placa** (arriba).
2. **Archivo → Nuevo boceto**, borra lo que trae, escribe este código de prueba, verifica (✓) y súbelo (→).
3. Abre el Monitor serie (lupa, arriba a la derecha) y elige **9600 baudios**.

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

4. Gira el tornillo **a la izquierda** hasta que el LED del sensor se apague sin pelota. Giren con el destornillador pequeño, poco a poco (un cuarto de vuelta cada vez).
5. Gíralo **poco a poco a la derecha** hasta que detecte la pelota dentro de la portería, pero **no** cuando pasa por fuera, frente a ella. Después de cada pequeño giro, pongan la pelota dentro y fuera, y miren el LED y el Monitor serie.

Muevan el tornillo en la animación y miren cómo cambia la distancia a la que detecta:

:::animacion tipo="calibracion-ir"
:::

Hagan cada prueba en las dos porterías y escriban Sí o No. En la última columna, ¿el sensor hizo lo que debía?

:::tabla id="g8p-calibracion"
| Prueba | Portería azul (¿detecta?) | Portería roja (¿detecta?) | ¿Es correcto? |
| --- | --- | --- | --- |
| Pelota en el fondo de la portería | | | |
| Pelota en la línea de gol | | | |
| Pelota pasando frente a la portería, por fuera | | | |
| Mano de un jugador cerca de la portería | | | |
:::

## Parte 4 · El programa final (20 min)

1. Abran `equipo_NOMBRE_marcador.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 6), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_marcador`.
2. Instalen las librerías **Adafruit SSD1306** y **Adafruit GFX Library**: **Gestor de bibliotecas** (icono de los libros a la izquierda) → buscar → **Instalar** (si pregunta por otras, **Instalar todo**).
3. **Cambio importante:** en `setup()` cambien `INPUT_PULLUP` por `INPUT` en los dos sensores (el sensor real ya da su propia señal).
   - Son las líneas de `SENSOR_AZUL` y `SENSOR_ROJO`, las que dicen `// en el real: INPUT`. El botón de inicio se queda con `INPUT_PULLUP`.
4. Verifiquen (✓) y suban (→).
5. Prueben metiendo goles con la mano: presionen el botón de inicio (suena el silbato) y metan la pelota en cada portería.

[IMAGEN 5.3: marcador terminado a un lado de la cancha mostrando AZUL 1 - 0 ROJO]

:::tabla id="g8p-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Gol en la portería azul suma al ROJO | | |
| Gol en la portería roja suma al AZUL | | |
| Suena la celebración | | |
| El tiempo baja | | |
:::

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Wokwi.

:::pregunta id="g8p-p1"
¿Pasó que un gol se contó dos veces o que un gol no se contó? Describe qué pasó.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8p-logramos"
- [ ] Los dos sensores están instalados en las porterías.
- [ ] Los sensores están calibrados: detectan dentro, no por fuera.
- [ ] El marcador real cuenta los goles.
- [ ] El buzzer celebra los goles.
:::

## Bitácora (15 min)

:::foto id="g8p-foto"
Video corto de un gol con el marcador sumando.
:::

:::pregunta id="g8p-b1"
¿Qué problema tuvimos hoy y cómo lo resolvimos?
:::

Antes de irse, guarden `equipo_NOMBRE_marcador` (**Ctrl + S**) y súbanlo aquí.

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (9 sábados):** la instalación de los sensores y el marcador real de la Guía 5 Tinkercad y la calibración de la Guía 6 normal, con el programa final de la simulación (Guía 6). Campos propios (g8p-…).
- Si un sensor marca siempre 0, está detectando algo cerca (la propia portería): girar su tornillo azul para bajar la sensibilidad.
- Si los cables son muy largos (más de 50 cm), trenzar señal y GND para reducir interferencias.
- Pelotas blancas se detectan mejor que las negras.
- g8p-p1 prepara la prueba de 20 goles de la Guía 9.
- Tiempo total: 25 + 25 + 30 + 20 + 5 + 15 = 120 minutos.
:::
