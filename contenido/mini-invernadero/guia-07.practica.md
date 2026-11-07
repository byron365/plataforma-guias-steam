---
titulo: El circuito completo en el invernadero
guia: 7
sabado: 7
sesion: Integración de sistemas
duracion: 120
---

# Guía 7 · El circuito completo en el invernadero

## Objetivo del día

Armar en el invernadero real el circuito que ya funciona en el simulador: la bomba con su relé, el sensor de humedad, el de temperatura y la luz. Subir el programa final y calibrar el umbral con tierra de verdad.

**Al terminar tendremos:** el invernadero funcionando solo: riega cuando la tierra se seca, abre la ventana con calor y enciende la luz.

## Materiales del equipo

- El invernadero con su ventana (sábado 6)
- Mini bomba de agua de 5 V, manguera y clip impreso
- Módulo relé de 5 V
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos
- Depósito (botella o vaso grande con agua)
- Sensor de humedad de suelo, sensor de temperatura DHT11, LED blanco con resistencia de 220 Ω
- Arduino, protoboard, cables y destornillador pequeño
- Un poco de tierra seca en un vaso aparte
- Computadora con Arduino IDE y `equipo_NOMBRE_final.txt` (Guía 5)

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g7p-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El circuito real (40 min)

Abran su proyecto de Wokwi y copien el circuito, con el USB desconectado y la fuente de 5 V **desenchufada**. El servo y el botón ya están conectados desde el sábado 6. Las diferencias con el simulador son la bomba de verdad, el sensor de humedad de verdad y el DHT11.

| Componente | Conexión |
| --- | --- |
| Luz: LED blanco | Pata larga → 220 Ω → **D6** · pata corta → GND |
| Sensor de humedad | VCC → 5V · GND → GND · AOUT → **A0** |
| Sensor DHT11 | VCC (+) → 5V · GND (−) → GND · DATA (S) → **D7** |
| Relé VCC / GND / IN | 5V / GND / **D8** |
| Jack hembra + | Relé **COM** |
| Relé **NO** | Bomba + (cable rojo) |
| Bomba − (cable negro) | Jack hembra − |

- **Relé:** de un lado tiene los pines VCC, GND e IN; del otro, tres tornillos **COM**, **NO** y **NC**. Para meter un cable: aflojen el tornillo con el destornillador, metan la punta pelada y aprieten. **NC** no se usa.
- **Fuente y bomba:** la fuente de 5 V se enchufa en el **jack hembra**, que tiene dos tornillos **+** y **−**. Un cable del **+** del jack al **COM** del relé; un cable del **NO** del relé al cable rojo de la bomba; el cable negro de la bomba al **−** del jack. Donde se unan dos cables pelados, tuérzanlos y cúbranlos con cinta aislante.
- **DHT11:** sus pines pueden decir **+**, **−** y **S** (o OUT): + es VCC, − es GND y S es DATA. Péguenlo con cinta en una pared, a media altura, lejos de la manguera y del depósito.
- **Luz:** el LED blanco va arriba, dentro del invernadero, apuntando a la planta.
- El Arduino, la protoboard y el relé van en el **compartimento seco**.

[IMAGEN 7.1P: circuito completo del invernadero: relé con la bomba y la fuente de 5 V en su jack, sensor de humedad, DHT11, luz, servo y botón]

Ahora el agua:

1. Mete la bomba en el depósito, **sumergida** y acostada en el fondo. Nunca la enciendan fuera del agua: se daña.
2. Pasa la manguera hasta la maceta y sujétala con el clip, apuntando a la tierra.
3. Clava el sensor de humedad en la tierra de la maceta "Con sistema", sin pasar la línea marcada, entre la planta y la orilla.

:::checklist id="g7p-revision"
- [ ] El Arduino y el relé están en el compartimento seco.
- [ ] La bomba está sumergida y la manguera apunta a la tierra.
- [ ] El DHT11 está lejos del agua.
- [ ] El tomacorriente y la fuente de 5 V están lejos del agua.
:::

## Parte 3 · El programa final (15 min)

1. En Arduino IDE instalen la librería del sensor de temperatura: abran el **Gestor de bibliotecas** (icono de los libros, a la izquierda), busquen **DHT sensor library**, elijan la de **Adafruit** y presionen **Instalar** (si pregunta por otras, **Instalar todo**).
2. Abran `equipo_NOMBRE_final.txt`, copien todo, péguenlo en un programa nuevo y guárdenlo como `equipo_NOMBRE_final`.
3. Hagan **dos cambios**:
   - En la línea `DHT dht(DHT_PIN, DHT22);` cambien **DHT22** por **DHT11** (el sensor real).
   - En `ANGULO_ABIERTA` pongan el ángulo que eligieron el sábado 6.
4. Verifiquen (✓) y súbanlo (→). Enchufen la fuente de 5 V.
   - **Si la bomba se enciende sola sin que la tierra esté seca**, desenchufen la fuente y avisen al docente: algunos relés funcionan "al revés".

## Parte 4 · Calibrar el umbral (30 min)

El **umbral** (`UMBRAL_SECO`) es el número que separa "seca" de "húmeda". En el simulador era una perilla; ahora lo medimos con tierra de verdad.

1. Abran el **Monitor serie** a 9600 baudios: el primer número de cada línea es la humedad de la tierra.
2. Para cada fila, claven el sensor en esa tierra (sin pasar la línea marcada), esperen unos segundos y anoten tres números.
   - **Muy seca:** el vaso de tierra seca.
   - **Un poco húmeda:** tierra seca con unas cucharadas de agua, bien mezclada.
   - **Recién regada:** la maceta justo después de regarla.
3. **Promedio** = (Valor 1 + Valor 2 + Valor 3) ÷ 3.

:::tabla id="g7p-calibracion"
| Tierra | Valor 1 | Valor 2 | Valor 3 | Promedio |
| --- | --- | --- | --- | --- |
| Muy seca (vaso aparte) | | | | |
| Un poco húmeda | | | | |
| Recién regada | | | | |
:::

> Umbral = un número entre el promedio de "un poco húmeda" y el de "muy seca"

Esta animación usa los números de su tabla. Muevan el umbral y miren cuándo regaría:

:::animacion tipo="umbral" tabla="g7p-calibracion"
:::

4. Pongan su número en `UMBRAL_SECO`, súbanlo otra vez y devuelvan el sensor a la maceta.

Nuestro umbral: UMBRAL_SECO = ______

## Parte 5 · Probar el invernadero (10 min)

:::checklist id="g7p-pruebas"
- [ ] Con el sensor en la tierra seca del vaso, riega solo (con la manguera en otro vaso).
- [ ] Manteniendo presionado el botón 1 segundo, riega a mano.
- [ ] La luz se enciende y se apaga cada minuto.
- [ ] Con calor (lámpara, con el docente), la ventana se abre; al enfriarse, se cierra.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] Revisamos las plantas.
- [ ] El circuito real es igual al simulado (con la bomba, el sensor y el DHT11 de verdad).
- [ ] Calibramos el umbral con tierra de verdad.
- [ ] El invernadero funciona solo.
:::

## Bitácora (10 min)

:::pregunta id="g7p-b1"
¿Qué fue distinto en el invernadero real comparado con el simulador?
:::

Antes de irse, **desenchufen la fuente** y suban el programa final con su umbral.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión práctica (8 sábados):** junta la bomba y el relé de la Guía 5 normal, la calibración del umbral de la Guía 6 normal, el DHT11 de la Guía 7 normal y la luz de la Guía 8 normal. La bomba usa una **fuente de 5 V con jack hembra de bornera** en lugar del portapilas (decisión de Bairon). Campos propios (g7p-…).
- El programa es el del simulador con dos cambios: `DHT22` → `DHT11` y el ángulo de la ventana.
- Algunos módulos relé se activan con LOW: si la bomba se enciende al arrancar, invertir HIGH y LOW en las líneas de la bomba.
- Nunca encender la bomba en seco. Si gira débil, revisar que la fuente sea de 5 V y al menos 1 A, y los tornillos del jack y del relé.
- Si el DHT11 da "nan" en el Monitor, revisar el cable de DATA (D7) y que la librería sea la de Adafruit.
- Tiempo total: 10 + 40 + 15 + 30 + 10 + 5 + 10 = 120 minutos. Si falta tiempo, la Parte 5 se hace al inicio de la Guía 8.
:::
