---
titulo: De la simulación a la realidad
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · De la simulación a la realidad

## Objetivo del día

Terminar la carcasa en Blender y exportarla para imprimir, y conectar los sensores reales (DHT22 y fotorresistencia) al Arduino.

**Al terminar tendremos:** el archivo STL de la carcasa listo y el Arduino real midiendo temperatura, humedad y luz.

## Materiales del equipo

- Computadora con Blender y Arduino IDE
- Arduino UNO + cable USB
- Sensor DHT22 (o DHT11)
- Fotorresistencia (LDR) y resistencia de 10 kΩ
- Protoboard y cables

## Parte 1 · Terminar la carcasa (35 min)

Abre **equipo_NOMBRE_estacion.blend** y agrega las piezas que faltan:

- Si están en otra computadora, descárguenlo del recuadro de la Guía 2 (o de "Archivos del equipo" en la página del proyecto).
- Las medidas van en el **Panel N** (tecla N) → **Elemento**. Pongan nombre a cada pieza en el Listado (doble clic sobre su nombre).

| Pieza | Medidas | Para qué sirve |
| --- | --- | --- |
| Tapa | Disco de 100 mm, 3 mm de grosor, **sin agujero** | Cubre de la lluvia y el sol |
| Base | Disco de 100 mm, 4 mm de grosor | Sostiene la torre |
| Soporte del sensor | Cubo 20 × 10 × 30 mm con ranura de 16 × 9 × 26 mm | Sujeta el DHT22 en el centro |
| Agujero de cables | Cilindro de 10 mm en la base (modificador Booleana) | Pasar los cables al Arduino |

Cómo hacer cada pieza:

- **Tapa:** **Shift + A → Malla → Cilindro** con Dimensiones X = 100, Y = 100, Z = 3 y Posición Z = **81.5** (queda apoyada sobre las columnas, que terminan en 80).
- **Base:** cilindro de X = 100, Y = 100, Z = 4 con Posición Z = **−2** (queda debajo del primer plato).
- **Soporte del sensor:** cubo de X = 20, Y = 10, Z = 30 con Posición Z = **15** (parado sobre la base, en el centro).
- **Ranura del soporte:** cubo de X = 16, Y = 9, Z = 26 con Posición Z = **18** (queda abierta por arriba, para meter el sensor).
- **Agujero de cables:** cilindro de X = 10, Y = 10, Z = 20 con Posición X = **15**, Y = 0, Z = −2 (en la base, al lado del soporte, dentro del agujero de los platos).

1. Coloca la tapa encima del último plato y la base debajo del primero.
   - Ya quedan en su lugar con las Ubicaciones de arriba. Mírenlo de lado (tecla **1** o bolita **Y**).
2. Para la ranura del soporte usa el modificador **Booleana** en modo **Diferencia** con un cubo de 16 × 9 × 26.
   - Clic en el soporte → llave inglesa → **Agregar modificador → Generar → Booleana** → **Diferencia** → Objeto: la ranura → **Aplicar** → borra la ranura.
   - Hagan lo mismo con la **base** y el **agujero de cables**.
3. **Antes de unir:** selecciona la torre y **aplica** el modificador Repetir (Ctrl + A sobre el modificador).
   - Clic en la torre (el `plato`) → en el modificador **Repetir**, flechita **⌄ → Aplicar**.
4. Selecciona todas las piezas y únelas con **Ctrl + J**.
   - Clic en una pieza y **Shift + clic** en cada una de las demás (torre, columnas, tapa, base y soporte). Luego **Ctrl + J**.
5. **Archivo → Exportar → STL**, activa *Sólo lo seleccionado*, nombre: **equipo_NOMBRE_carcasa.stl**.
   - **Archivo → Exportar → STL (.stl)**, a la derecha activa **Sólo lo seleccionado**, escribe el nombre y presiona **Exportar STL**. Guarda el `.blend` con **Ctrl + S**.

[IMAGEN 4.1: carcasa completa en Blender con tapa, torre de platos, soporte del sensor y base con agujero para cables]

:::pregunta id="g4-p1"
¿Por qué la tapa no lleva agujero central y los platos sí?
:::

:::pregunta id="g4-p2"
¿Qué pasaría si unes las piezas con Ctrl + J sin aplicar antes el modificador Repetir?
:::

## Parte 2 · El sensor de luz por dentro (15 min)

La **fotorresistencia (LDR)** cambia su resistencia con la luz: con mucha luz deja pasar más corriente. El Arduino no mide resistencia, mide **voltaje**, así que la combinamos con una resistencia fija de 10 kΩ en un **divisor de voltaje**.

Cambien la luz en la animación y miren cómo cambian la resistencia y el voltaje que llega al Arduino:

:::animacion tipo="ldr"
:::

## Parte 3 · Conectar los sensores reales (25 min)

Hagan todo con el Arduino **desconectado**. Recuerden: en la protoboard, las filas largas de los bordes (**+** y **−**) están conectadas a lo largo; en el centro, cada fila corta de 5 agujeros está conectada entre sí.

1. **Energía:** un cable del **5V** del Arduino a la fila **+** de la protoboard y otro de **GND** a la fila **−**.
2. **DHT22:** el módulo tiene sus pines marcados (a veces **+**, **out** y **−**). VCC (+) → fila **+**, DATA (out) → pin **2**, GND (−) → fila **−**. Si su sensor tiene 4 patas en vez de 3, pidan ayuda al docente.
3. **LDR y resistencia (divisor de voltaje):**
   - Clava la LDR con cada pata en una fila corta distinta.
   - Una pata de la LDR → cable a la fila **+**.
   - En la fila de la otra pata pon: un cable al pin **A0** y la resistencia de **10 kΩ**, que va de esa fila a la fila **−**.

| Componente | Conexión |
| --- | --- |
| DHT22 | VCC → 5V · DATA → D2 · GND → GND |
| LDR | Una pata → 5V · otra pata → A0 |
| Resistencia 10 kΩ | Entre A0 y GND |

[IMAGEN 4.2: circuito real en protoboard con DHT22 y divisor de voltaje de la LDR con resistencia de 10 kΩ]

En el Arduino IDE instala la librería **DHT sensor library** (Herramientas → Administrar bibliotecas) y sube este código:

1. Abre **Arduino IDE** y conecta el USB. En la lista **Seleccionar placa** (arriba) elige **Arduino Uno** con su puerto.
2. **Librería:** abre el **Gestor de bibliotecas** (icono de los libros en la barra de la izquierda, o **Herramientas → Administrar bibliotecas**). Busca **DHT sensor library**, la que dice **by Adafruit**, y presiona **Instalar**. Si pregunta por otras bibliotecas que necesita, elige **Instalar todo**.
3. **Archivo → Nuevo boceto**, borra lo que trae y escribe el código. Si su sensor es DHT11, cambien `DHT22` por `DHT11`.

```cpp
#include <DHT.h>

DHT dht(2, DHT22);   // cambia a DHT11 si usas ese sensor

void setup() {
  dht.begin();
  Serial.begin(9600);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int luz = map(analogRead(A0), 0, 1023, 0, 100);

  Serial.print("Temp: ");
  Serial.print(temp);
  Serial.print(" C  Hum: ");
  Serial.print(hum);
  Serial.print(" %  Luz: ");
  Serial.println(luz);

  delay(2000);
}
```

4. Verifica (✓) y sube (→). Espera "Carga completada".

Abre el **Monitor serie** (9600 baudios).

- Es la lupa, arriba a la derecha. Abajo a la derecha de su ventana, elijan **9600 baudios**.
- Si sale `nan`, revisen el cable de DATA en el pin 2.

## Parte 4 · Pruebas con el mundo real (20 min)

Para cada prueba, esperen unos segundos y anoten los tres números del Monitor serie. En "con la mano", sostengan el sensor 30 segundos (con el cronómetro del celular) antes de leer.

| Prueba | Temperatura | Humedad | Luz |
| --- | --- | --- | --- |
| Normal, en la mesa | | | |
| Sostener el sensor con la mano 30 s | | | |
| Soplar suavemente sobre el sensor | | | |
| Tapar la LDR con el dedo | | | |
| Lámpara del celular sobre la LDR | | | |

[IMAGEN 4.3: monitor serie del Arduino IDE mostrando las lecturas reales mientras se tapa la LDR]

:::pregunta id="g4-p3"
¿Qué prueba cambió más la humedad? ¿Por qué crees que pasó?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] La carcasa tiene tapa, base, soporte y agujero de cables.
- [ ] Exportamos el archivo STL.
- [ ] El DHT22 real muestra datos en el monitor serie.
- [ ] La luz cambia al tapar y alumbrar la LDR.
- [ ] Llenamos la tabla de pruebas.
:::

## Reto extra

Después de calentar el sensor con la mano, mide **cuántos segundos** tarda en volver a la temperatura de la mesa. ¿Es rápido o lento? Anótalo: nos servirá para la calibración.

## Bitácora (15 min)

:::foto id="g4-foto"
Foto del circuito real con los dos sensores.
:::

:::pregunta id="g4-b1"
¿En qué se parecieron y en qué se diferenciaron los datos del simulador y los reales?
:::

:::pregunta id="g4-b2"
Explica con tus palabras qué hace el divisor de voltaje.
:::

Antes de irse, guarden juntos en un `.zip` el `.blend`, el `.stl` de la carcasa y el programa (**Archivo → Guardar como** → `equipo_NOMBRE_sensores`). Para el `.zip`: selecciónenlos → clic derecho → **Comprimir en archivo ZIP**. Súbanlo aquí.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Esta semana: imprimir las carcasas de cada equipo para el sábado 6 (tiempo aproximado de impresión: 3–4 h por carcasa con 15 % de relleno).
- Si un equipo usa DHT11: cambiar `DHT22` por `DHT11`; mide solo enteros y con ±2 °C.
- Si la luz da al revés (sube al tapar), la LDR y la resistencia están intercambiadas: no es grave, pero conviene corregirlo.
- g4-p2: la torre quedaría con un solo plato al exportar, porque el modificador no se aplica.
- Tiempo total: 35 + 15 + 25 + 20 + 5 + 15 = 115 minutos (5 de margen).
:::
