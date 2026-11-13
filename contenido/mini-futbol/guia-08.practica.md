---
titulo: Conectamos el marcador real
guia: 8
sabado: 8
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 8 · Conectamos el marcador real

## Objetivo del día

Instalar los sensores infrarrojos en las porterías y la pantalla y el buzzer en el soporte, y conectar el marcador paso a paso, siguiendo los diagramas. Es el mismo circuito del simulador.

**Al terminar tendremos:** la cancha con los sensores, la pantalla y el buzzer instalados y todo el circuito del marcador conectado y revisado, listo para subir los programas en la Guía 9.

## Materiales del equipo

- Cancha con porterías y el soporte del marcador (sábado 7)
- Arduino UNO y protoboard
- 2 sensores infrarrojos de obstáculos (FC-51 o similar)
- Pantalla OLED SSD1306, buzzer, botón
- Cables largos (macho–hembra) y macho–macho, pegamento caliente
- Cinta doble cara o silicona
- El proyecto de Wokwi abierto (Guía 6)

**Regla de oro:** el Arduino se queda **desconectado** del USB todo el sábado. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · Instalar los sensores y la pantalla (25 min)

1. Acuesta cada sensor sobre el **pie** que está detrás de la portería, con los componentes hacia arriba y los ojitos hacia la **ventana del fondo**, mirando hacia la cancha.
2. Empújalo hasta que la orilla de la placa toque el **tope**: los ojitos quedan dentro de la ventana, sin salirse hacia la cancha. Fíjalo con una gota de pegamento caliente en la placa (no en los ojitos ni en el tornillo azul, que se usa para calibrar).
3. Lleven los cables del sensor desde la parte de atrás del pie hasta el marcador, pegados con cinta por el borde de la base.
   - Pongan cables macho–hembra en los tres pines del sensor (la punta hembra en el sensor) y márquenlos con cinta: "azul" y "rojo", según la portería.

[IMAGEN 5.1: sensor infrarrojo montado detrás de la portería con sus emisores en la ventana del fondo]

4. Coloca la pantalla por detrás de la **ventana del soporte del marcador**, con el vidrio tapando la ventana, y el buzzer por detrás de su **agujero**.
   - Péguenlos con cinta doble cara o silicona, solo en la placa (nunca sobre el vidrio de la pantalla).
   - Pongan cables macho–hembra en los pines de la pantalla y en las patas del buzzer (la punta hembra en la pata). Marquen con cinta la pata **+** del buzzer (marcada o la más larga).

## Parte 2 · Cómo leer los diagramas (10 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

- En la protoboard, las filas largas de los bordes (**+** y **−**) están conectadas a lo largo. Arriba y abajo hay una fila **+** y una fila **−**; las de arriba **no** están unidas con las de abajo: en el paso 1 se unen con dos cables.
- Cada agujero del centro tiene su letra (A a J) y su número (1 a 30), impresos en la protoboard: **A6** es la letra A en el número 6.
- Las etiquetas blancas dicen dónde va cada punta: **D4** es el pin 4 del Arduino, **A4** es el pin A4 (abajo, en ANALOG IN) y **fila −** es cualquier agujero de una fila −.
- El dibujo no muestra dónde va cada pieza en la cancha: los sensores se quedan en sus porterías y la pantalla y el buzzer en el soporte.

[IMAGEN 8.7A: circuito completo del marcador: los dos sensores de las porterías, el botón de inicio, el buzzer y la pantalla OLED]

## Parte 3 · Las filas + y − (10 min)

**Paso 1.**

1. Un cable rojo del **5V** del Arduino a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo.
2. Un cable rojo de la fila **+** de abajo a la fila **+** de arriba y uno negro de la fila **−** de abajo a la fila **−** de arriba, en el extremo derecho de la protoboard.

[IMAGEN 8.1A: paso 1, 5V y GND del Arduino a las filas + y − de abajo y dos cables que las unen con las de arriba]

## Parte 4 · Los sensores de las porterías (20 min)

Cada sensor tiene tres pines: **OUT**, **GND** y **VCC** (vienen escritos en la placa). En lugar de los botones de las porterías del simulador van los **sensores**.

**Paso 2: portería roja.** OUT → **D4**, GND → **fila −** de arriba y VCC → **fila +** de arriba.

[IMAGEN 8.2A: paso 2, sensor de la portería roja: OUT a D4, GND a la fila − y VCC a la fila +]

**Paso 3: portería azul.** OUT → **D3**, GND → **fila −** de arriba y VCC → **fila +** de arriba.

[IMAGEN 8.3A: paso 3, sensor de la portería azul: OUT a D3, GND a la fila − y VCC a la fila +]

**✔ Revisa:** la portería roja va en **D4** y la azul en **D3**. Si se cambian, cada gol suma al equipo equivocado.

## Parte 5 · Botón de inicio y buzzer (15 min)

**Paso 4: botón de inicio.** Va sobre la canaleta del centro, con sus patas en **E6**, **F6**, **E8** y **F8**.

1. Un cable de **A6** al pin **D2**.
2. Un cable de **J8** a la **fila −** de abajo: es la pata en diagonal.

[IMAGEN 8.4A: paso 4, botón de inicio sobre la canaleta, cable de A6 a D2 y de J8 a la fila − de abajo]

**Paso 5: buzzer.** Pata **+** → **D5** y la otra → **fila −** de arriba.

[IMAGEN 8.5A: paso 5, buzzer en el soporte del marcador: + a D5 y − a la fila −]

## Parte 6 · La pantalla OLED (15 min)

**Paso 6.** Lean el orden de sus pines: algunas pantallas traen **GND** primero y otras **VCC**. Conecten por el nombre, no por el lugar:

| Pin de la pantalla | Va a |
| --- | --- |
| SDA | A4 |
| SCL | A5 |
| VCC | fila + de abajo |
| GND | fila − de abajo |

[IMAGEN 8.6A: paso 6, pantalla OLED: SDA a A4, SCL a A5, VCC a la fila + y GND a la fila − de abajo]

## Parte 7 · Revisión cable por cable (10 min)

Tengan la simulación de Wokwi abierta. Una persona lee cada fila de la tabla y la otra sigue el cable con el dedo:

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

:::checklist id="g8a-revision"
- [ ] La portería roja está en D4 y la azul en D3.
- [ ] El botón de inicio está en D2 y el buzzer en D5.
- [ ] La pantalla tiene SDA en A4 y SCL en A5.
- [ ] Ningún cable rojo toca una fila − ni un cable negro una fila +.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8a-logramos"
- [ ] Los dos sensores están instalados en las porterías.
- [ ] La pantalla y el buzzer están en el soporte del marcador.
- [ ] Todo el circuito está conectado y revisado.
:::

## Bitácora (10 min)

:::foto id="g8a-foto"
Foto del marcador con todos sus cables conectados.
:::

:::pregunta id="g8a-b1"
¿Qué problema tuvimos hoy y cómo lo resolvimos?
:::

:::docente
- **Versión Práctica con Wokwi (10 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Antes, la Guía 8 instalaba los sensores, conectaba el circuito, calibraba y subía el programa en un solo sábado; la calibración y el programa final pasaron a la Guía 9. Campos propios (g8a-…).
- Diagramas hechos con `herramientas/diagramas_armado.py futbol` (dibujos de Fritzing, CC BY-SA 3.0; la pantalla OLED es un dibujo propio porque Fritzing no la trae). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 8.1A a 8.7A.
- En el dibujo, los sensores y el buzzer van con cables macho–hembra directo a sus pines y a las filas + y −, y la pantalla toma 5V y GND de las filas de abajo. La protoboard queda para el botón y para repartir 5V y GND.
- Si los cables son muy largos (más de 50 cm), trenzar señal y GND para reducir interferencias.
- g8a-b1 es la misma pregunta de bitácora de la Guía 8 anterior; la Guía 9 la repite (g9a-b1).
- Tiempo total: 25 + 10 + 10 + 20 + 15 + 15 + 10 + 5 + 10 = 120 minutos.
:::
