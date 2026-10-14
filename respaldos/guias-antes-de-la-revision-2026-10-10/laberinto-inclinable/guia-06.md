---
titulo: Movimiento suave y una meta que avisa
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · Movimiento suave y una meta que avisa

## Objetivo del día

Hacer que el tablero se mueva suave, instalar el sensor infrarrojo en la meta y cargar el juego completo con pantalla, buzzer y cronómetro.

**Al terminar tendremos:** el juego completo funcionando en el laberinto real.

## Materiales del equipo

- Laberinto armado (sábado 5)
- Sensor infrarrojo de obstáculos (FC-51 o similar)
- Pantalla OLED SSD1306
- Buzzer
- Cables, cinta doble cara

## Parte 1 · ¿Por qué tiembla? (10 min)

Si el servo va **directo** a donde marca el joystick, el tablero da saltos y la canica sale disparada. La solución es **suavizar**: en cada vuelta del `loop` el servo solo avanza una parte del camino.

```cpp
angX += (metaX - angX) * SUAVE;
```

Si `SUAVE` es 0,2, en cada vuelta avanza el **20 %** de lo que le falta.

:::animacion tipo="suavizado"
:::

:::pregunta id="g6-p1"
Si el servo está en 90° y la meta es 100°, con SUAVE = 0,2, ¿en qué ángulo queda después de una vuelta? ¿Y después de dos?
:::

## Parte 2 · Probar el suavizado (20 min)

Usa el código de prueba del sábado 4 con estos cambios: declara `float angX = 90, angY = 90;` arriba y dentro del `loop`:

```cpp
int metaX = map(analogRead(A0), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
int metaY = map(analogRead(A1), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
angX += (metaX - angX) * SUAVE;
angY += (metaY - angY) * SUAVE;
servoX.write(angX);
servoY.write(angY);
```

:::tabla id="g6-suave"
| SUAVE | ¿Cómo se siente el control? | Tiempo a la meta (s) |
| --- | --- | --- |
| 1.0 (sin suavizar) | | |
| 0.5 | | |
| 0.2 | | |
| 0.05 | | |
:::

Nuestro valor de SUAVE: ______

## Parte 3 · El sensor de la meta (25 min)

El sensor infrarrojo emite una luz invisible. Si algo está cerca, la luz rebota y el sensor pone su salida en **LOW**.

:::animacion tipo="ir" objeto="Canica" pin="D3"
:::

1. Pega el sensor **debajo del tablero**, apuntando hacia arriba por el agujero de la meta.
2. Conecta: **VCC → 5V**, **GND → GND**, **OUT → D3**.
3. Pon la canica sobre el agujero y gira el **tornillo azul** (potenciómetro) del sensor hasta que su LED se encienda solo con la canica encima.

[IMAGEN 6.1: sensor infrarrojo pegado debajo del tablero apuntando hacia el agujero de la meta]

| Prueba | LED del sensor |
| --- | --- |
| Sin canica | |
| Canica sobre el agujero | |
| Canica a una casilla de distancia | |

## Parte 4 · Juego completo (35 min)

1. Conecta la pantalla OLED (SDA → A4, SCL → A5) y el buzzer (+ → D5).
2. Carga el código base del sábado 3. **Cambio importante:** el sensor real ya tiene su propia resistencia, así que en `setup()` cambia `pinMode(META, INPUT_PULLUP);` por `pinMode(META, INPUT);`.
3. Ajusta `INCLINACION` y `SUAVE` con tus valores.

[IMAGEN 6.2: laberinto completo con la pantalla OLED mostrando el tiempo y el joystick al lado]

:::animacion tipo="conexiones" circuito="laberinto-real"
:::

Jueguen 3 partidas:

| Partida | Jugador | Tiempo (s) | ¿Funcionó el sensor? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] El tablero se mueve suave.
- [ ] El sensor detecta la canica en la meta.
- [ ] La pantalla muestra el cronómetro.
- [ ] El buzzer suena al empezar y al llegar.
- [ ] Jugamos 3 partidas completas.
:::

## Reto extra

Cuando la canica llega a la meta, haz que el buzzer toque una **melodía de victoria** de tres notas (por ejemplo 1000, 1300 y 1600 Hz).

## Bitácora (15 min)

:::foto id="g6-foto"
Video de una partida completa.
:::

:::pregunta id="g6-b1"
¿Qué diferencia notaron entre el control sin suavizar y con suavizado?
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g6-p1: 90 + (100 − 90) × 0,2 = 92°; luego 92 + 8 × 0,2 = 93,6°.
- `angX` debe ser `float`; si es `int`, con SUAVE pequeño nunca llega (se trunca a 0 el avance).
- Si el sensor detecta la luz del salón, cubrirlo con un tubito de cartón negro.
- Si el sensor dispara sin canica, alejarlo un poco del agujero o bajar su sensibilidad.
- Tiempo total: 10 + 20 + 25 + 35 + 5 + 15 = 110 minutos (10 de margen).
:::
