---
titulo: Armamos el laberinto
guia: 6
sabado: 6
sesion: Construcción del prototipo
duracion: 120
---

# Guía 6 · Armamos el laberinto

## Objetivo del día

Montar el marco y el tablero, conectar el joystick **copiando el circuito del simulador**, subir el programa final y ajustar el control con la canica de verdad.

**Al terminar tendremos:** el laberinto funcionando: la canica recorre el tablero con el joystick.

## Materiales del equipo

- Base con las torres y los servos (sábado 5), marco y tablero impresos, base del joystick impresa
- 2 palitos de pincho (o clavos de 3 mm) y tijeras o alicate para cortarlos
- Arduino UNO + cable USB, protoboard y cables, módulo joystick
- Fuente de 5 V con su jack hembra
- Pegamento caliente (silicona), destornillador pequeño, canica, celular para cronometrar
- Computadora con Arduino IDE, el proyecto de Wokwi abierto y `equipo_NOMBRE_control.txt` (Guía 4)

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · El montaje (45 min)

Sigan el orden. Miren la imagen del laberinto completo para ver dónde va cada cosa:

[IMAGEN 2.1P: laberinto diseñado en Tinkercad, con etiquetas: tablero con el laberinto, canica, agujero de la meta, marco, servo del tablero, servo del marco, torre del eje, torre del servo, base de MDF o cartón y base del joystick]

1. **Los brazos:** pongan un brazo largo en el eje de cada servo, **acostado** (horizontal). No hace falta el tornillo del centro.
2. **El marco entre las torres.**
   - Pongan el marco entre las torres: su **lado izquierdo** (el del agujero) junto a la torre del eje y su **lado derecho** junto al brazo del servo.
   - Corten un palito de unos 3 cm. Pásenlo por el agujero de la torre del eje y métanlo en el agujero del marco.
   - Con el marco **plano** (horizontal), peguen el brazo del servo al lado derecho del marco con silicona. Si queda un espacio entre el brazo y el marco, rellénenlo con silicona.
   - Pongan una gota de silicona donde el palito entra en el marco (por dentro), para que el palito gire junto con el marco.
3. **El tablero dentro del marco.**
   - Pongan el tablero dentro del marco con la **bisagra atrás** (junto al agujero de atrás del marco).
   - Pasen otro palito de unos 3 cm por el agujero de atrás del marco y métanlo en la bisagra. Una gota de silicona donde entra en la bisagra.
   - Con el tablero **plano**, peguen el brazo del servo del tablero al borde de adelante del tablero.
4. Esperen un minuto a que la silicona enfríe y revisen:

:::checklist id="g6p-montaje"
- [ ] El marco gira sobre su palito y el brazo del servo, sin rozar las torres.
- [ ] El tablero gira dentro del marco sin rozarlo.
- [ ] Con la canica en el centro, el tablero está casi plano (la canica no sale rodando).
- [ ] Ningún cable estorba el movimiento.
:::

## Parte 2 · El joystick (20 min)

Con el USB desconectado y la fuente desenchufada.

1. **Base del joystick:** encajen el joystick en el cerco, con los pines del lado de la abertura.
2. **Revisen la energía** de la Guía 5: si desarmaron el circuito, vuelvan a armarlo con la **Guía 5, Parte 4**.
3. **Conecten el joystick copiando Wokwi.** Va a las filas del **Arduino** (las de abajo), no a las de la fuente. El pin **SW** (el botón) no se usa.

| Componente | Conexión |
| --- | --- |
| Joystick | +5V → fila + de abajo · GND → fila − de abajo · VRx → A0 · VRy → A1 |
| Servo del marco | Naranja → D9 · Rojo → + fuente · Café → − fuente |
| Servo del tablero | Naranja → D10 · Rojo → + fuente · Café → − fuente |
| GND común | − fuente ↔ GND Arduino |

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones"
| Desde | Hasta | Color | Nota |
| --- | --- | --- | --- |
| Joystick: +5V | 5V | rojo | |
| Joystick: VRx | A0 | verde | Eje X |
| Joystick: VRy | A1 | amarillo | Eje Y |
| Joystick: GND | GND | negro | |
| Servo X: naranja | D9 | naranja | Señal |
| Servo X: rojo | Fuente 5 V: + | rojo | Energía de la fuente |
| Servo X: café | Fuente 5 V: − | café | |
| Servo Y: naranja | D10 | naranja | Señal |
| Servo Y: rojo | Fuente 5 V: + | rojo | Energía de la fuente |
| Servo Y: café | Fuente 5 V: − | café | |
| Fuente 5 V: − | GND | negro | GND común: une la tierra de la fuente con la del Arduino |
:::

## Parte 3 · El programa final (15 min)

1. Abran `equipo_NOMBRE_control.txt` (si están en otra computadora, descárguenlo del recuadro de la Guía 4), copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_control`.
2. Conecten el USB, verifiquen (✓) y suban (→). Después enchufen la fuente.
3. Muevan el joystick **despacio**: el tablero debe inclinarse. Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Wokwi.

## Parte 4 · Ajustar el control (25 min)

Pongan la canica en la salida y muevan el joystick **despacio** hacia cada lado:

:::tabla id="g6p-sentido"
| Movimiento del joystick | ¿Hacia dónde se inclina el tablero? | ¿Es lo esperado? |
| --- | --- | --- |
| Derecha | | |
| Izquierda | | |
| Arriba | | |
| Abajo | | |
:::

Si un eje se mueve **al revés**, cambien el orden de los dos últimos números de su `map`, como en la Guía 4: `CENTRO + INCLINACION, CENTRO - INCLINACION`.

Ahora busquen su inclinación. Cambien `INCLINACION` por el número de cada fila, suban el código y lleven la canica a la meta. Una persona cronometra con el celular (si no llega, escriban "no llegó").

:::tabla id="g6p-inclinacion"
| INCLINACION | ¿La canica se mueve? | ¿Es fácil de controlar? | Tiempo para llegar a la meta (s) |
| --- | --- | --- | --- |
| 5 | | | |
| 10 | | | |
| 15 | | | |
| 20 | | | |
:::

Si el tablero da saltos, bajen `SUAVE`; si responde muy lento, súbanlo.

:::pregunta id="g6p-p1"
¿Qué valores de INCLINACION y SUAVE elegimos y por qué?
:::

Dejen en el código los valores elegidos, súbanlo y guárdenlo (**Ctrl + S**).

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] El marco y el tablero giran libres.
- [ ] Los servos usan la fuente de 5 V con GND común.
- [ ] Los ejes se mueven hacia el lado correcto.
- [ ] Elegimos la inclinación y la canica llega a la meta.
:::

## Bitácora (10 min)

:::foto id="g6p-foto"
Video corto de la canica moviéndose por el laberinto.
:::

:::pregunta id="g6p-b1"
¿Qué problemas mecánicos tuvimos y cómo los resolvimos?
:::

Antes de irse: desenchufen la fuente y el USB, y suban `equipo_NOMBRE_control` aquí.

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (7 sábados):** el montaje de la Guía 4 Tinkercad y el control y la inclinación de la Guía 5 Tinkercad, con el programa final de la simulación. Campos propios (g6p-…).
- El servo del marco está parado con el eje a 120 mm de la base, igual que el agujero de la torre del eje: los dos deben quedar alineados. Si el marco queda torcido, revisar que las torres estén a la misma distancia del centro.
- La unión brazo–pieza es el punto débil: si se despega, limpiar y volver a pegar con más silicona, o atornillar el brazo con los tornillos pequeños del servo.
- Si el Arduino se reinicia al mover el joystick, revisar que los servos estén en la fuente y no en el 5V del Arduino.
- Con INCLINACION mayor de 20 la canica suele saltar las paredes.
- Si un equipo no termina, sigue al inicio del sábado 7.
- Tiempo total: 45 + 20 + 15 + 25 + 5 + 10 = 120 minutos.
:::
