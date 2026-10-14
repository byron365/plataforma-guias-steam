---
titulo: El invernadero riega solo
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · El invernadero riega solo

## Objetivo del día

Calibrar el sensor para decidir cuándo la tierra está "seca", medir cuánta agua da la bomba y activar el riego automático.

**Al terminar tendremos:** el riego automático calibrado, que riega lo justo sin inundar la maceta.

## Materiales del equipo

- Invernadero con bomba y sensor
- Vaso medidor o jeringa (ml)
- Un poco de tierra seca en un vaso aparte

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g6-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Calibrar el umbral (30 min)

El **umbral** es el número que separa "seca" de "húmeda". Para elegirlo, medimos:

1. Conecten el invernadero (sin pilas por ahora: hoy primero solo medimos) y suban su programa de la Guía 5 (`equipo_NOMBRE_riego`; si están en otra computadora, descárguenlo del recuadro de esa guía). Abran el **Monitor serie** a 9600 baudios.
2. Para cada fila, claven el sensor en esa tierra (sin pasar la línea marcada), esperen unos segundos y anoten tres números en Valor 1, 2 y 3 (uno cada pocos segundos).
   - **Muy seca:** el vaso de tierra seca.
   - **Un poco húmeda:** tierra seca con unas cucharadas de agua, bien mezclada.
   - **Recién regada:** la maceta justo después de regarla.
3. **Promedio** = (Valor 1 + Valor 2 + Valor 3) ÷ 3.

:::tabla id="g6-calibracion"
| Tierra | Valor 1 | Valor 2 | Valor 3 | Promedio |
| --- | --- | --- | --- | --- |
| Muy seca (vaso aparte) | | | | |
| Un poco húmeda | | | | |
| Recién regada | | | | |
:::

> Umbral = un número entre el promedio de "un poco húmeda" y el de "muy seca"

Esta animación usa los números de su tabla. Muevan el umbral y miren cuándo regaría:

:::animacion tipo="umbral" tabla="g6-calibracion"
:::

Nuestro umbral: UMBRAL_SECO = ______

:::pregunta id="g6-p1"
Si ponemos el umbral muy cerca del valor "recién regada", ¿qué pasaría con la planta?
:::

## Parte 3 · ¿Cuánta agua da la bomba? (25 min)

Pon la manguera en el vaso medidor y riega con distintos tiempos:

1. Saquen la manguera del clip y métanla en el vaso medidor vacío (la bomba sigue dentro del depósito con agua).
2. Pongan las pilas.
3. En la línea `const int TIEMPO_RIEGO = 3000;` cambien el número por el de la fila, suban el código y presionen el botón **una** vez.
4. Lean cuántos ml cayeron, anótenlo y regresen el agua al depósito.
5. Repitan con cada tiempo. Al terminar, regresen la manguera al clip.

:::tabla id="g6-agua"
| TIEMPO_RIEGO (ms) | Agua (ml) |
| --- | --- |
| 1000 | |
| 2000 | |
| 3000 | |
| 5000 | |
:::

:::pregunta id="g6-p2"
Nuestra maceta necesita unos 30 ml cada vez. ¿Qué TIEMPO_RIEGO debemos usar?
:::

## Parte 4 · Riego automático (35 min)

Cambia el `loop` del sábado 5:

1. Guarden el programa con otro nombre: **Archivo → Guardar como** → `equipo_NOMBRE_automatico`.
2. Escriban la línea `const int UMBRAL_SECO = 500;` arriba, junto a las otras constantes, y cambien el 500 por **su** umbral.
3. Cambien `TIEMPO_RIEGO` por el tiempo que eligieron en la pregunta anterior.
4. Selecciona todo el `loop()` (desde `void loop() {` hasta su llave de cierre `}`), bórralo y escribe el nuevo:

```cpp
const int UMBRAL_SECO = 500;   // escribe tu umbral

void loop() {
  int suelo = analogRead(A0);
  bool manual = digitalRead(BOTON) == LOW;
  Serial.println(suelo);

  if (suelo > UMBRAL_SECO || manual) {   // seca O botón
    regar();
    delay(5000);   // esperar a que el agua baje al sensor
  }
  delay(1000);
}
```

`||` significa "o": riega si la tierra está seca **o** si presionan el botón.

5. Verifica (✓) y sube (→).

:::pregunta id="g6-p3"
¿Para qué sirve el `delay(5000)` después de regar? (Recuerda lo que vimos del sensor el sábado 5.)
:::

**Prueba:** saca el sensor de la maceta y clávalo en el vaso de tierra seca. La bomba debe regar. Vuelve a ponerlo en la maceta húmeda: debe dejar de regar.

Mientras el sensor está en el vaso de tierra seca, pongan la manguera en el vaso medidor para no inundar la maceta.

| Prueba | ¿Regó? | ¿Es lo correcto? |
| --- | --- | --- |
| Sensor en tierra seca | | |
| Sensor en tierra húmeda | | |
| Botón presionado con tierra húmeda | | |

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] Calibramos el umbral con 3 mediciones.
- [ ] Medimos cuánta agua da la bomba.
- [ ] El riego automático funciona.
- [ ] El botón sigue funcionando como riego manual.
:::

## Reto extra

Cuenta cuántas veces regó el invernadero con una variable `int riegos = 0;` y muéstrala en el Monitor serie.

Pistas: declárala arriba, fuera de las funciones. Súmale 1 (`riegos++;`) dentro de `regar()` y muéstrala con `Serial.println(riegos);`.

## Bitácora (15 min)

:::pregunta id="g6-b1"
¿Por qué hay que calibrar el sensor en lugar de usar cualquier número?
:::

Antes de irse: saquen las pilas y suban `equipo_NOMBRE_automatico` aquí.

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Con un sensor capacitivo, "seco" es un número alto; con resistivo es al revés (`suelo < UMBRAL`).
- g6-p3: el agua tarda en llegar al sensor; sin la espera, regaría varias veces seguidas e inundaría la maceta.
- Si un equipo inunda la maceta, cambiar la tierra húmeda por seca antes del sábado 7.
- Tiempo total: 10 + 30 + 25 + 35 + 5 + 15 = 120 minutos.
:::
