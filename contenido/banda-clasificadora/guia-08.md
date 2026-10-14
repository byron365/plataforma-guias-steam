---
titulo: Más rápido sin equivocarse
guia: 8
sabado: 8
sesion: Optimización del sistema
duracion: 120
---

# Guía 8 · Más rápido sin equivocarse

## Objetivo del día

Encontrar la velocidad máxima a la que la banda clasifica sin errores, hacer que el desviador se sincronice solo con la velocidad y revisar el calor de la etapa de potencia.

**Al terminar tendremos:** la gráfica velocidad contra aciertos, el RECORRIDO automático y las mediciones de temperatura y corriente.

## Materiales del equipo

- Banda completa, 30 piezas
- Multímetro, cronómetro
- Hoja de cálculo

## Parte 1 · Velocidad contra aciertos (40 min)

Pasa **10 piezas** mezcladas a cada velocidad:

1. **Ver el valor PWM:** en el clasificador, dentro del `loop()`, justo después de la línea `int vel = Wire.read();`, agreguen `Serial.println(vel);`. Suban el código y abran el Monitor serie: verán la velocidad que manda la banda (0 a 255). Giren la perilla hasta acercarse a cada valor de la tabla.
2. Pasen 10 piezas mezcladas, de una en una. Cronometren desde que entra la primera hasta que cae la última.
3. **Piezas por minuto** = 10 ÷ segundos × 60. **Aciertos (%)** = aciertos ÷ 10 × 100.

:::tabla id="g8-velocidad"
| Velocidad (valor PWM) | Piezas por minuto | Aciertos de 10 | Aciertos (%) |
| --- | --- | --- | --- |
| 100 | | | |
| 140 | | | |
| 180 | | | |
| 220 | | | |
| 255 | | | |
:::

Esta gráfica se dibuja con los datos de su tabla:

:::animacion tipo="grafica-datos" tabla="g8-velocidad" y="aciertos (%)"
:::

:::pregunta id="g8-p1"
¿Cuál es la velocidad más alta que mantiene al menos 90 % de aciertos? ¿Qué limita la velocidad: el sensor, el servo o el tiempo?
:::

## Parte 2 · Recorrido automático (35 min)

Con la tabla del sábado 6 (velocidad contra RECORRIDO) podemos calcular el tiempo para cualquier velocidad. Como el tiempo es inversamente proporcional a la velocidad:

("Inversamente proporcional" quiere decir que si la velocidad se duplica, el tiempo se reduce a la mitad.)

> RECORRIDO ≈ K ÷ velocidad  →  K = RECORRIDO medido × velocidad

:::tabla id="g8-k"
| Velocidad | RECORRIDO medido (ms) | K = RECORRIDO × velocidad |
| --- | --- | --- |
| Baja | | |
| Media | | |
| Alta | | |
| Promedio de K | | |
:::

Para la columna **Velocidad** usen el valor PWM (0 a 255) de cada posición de la perilla de la Guía 6 (pónganla en su marca y léanla en el Monitor serie, como en la Parte 1). Multipliquen y luego promedien las tres K.

En el clasificador, usa la velocidad que envía el nodo banda:

1. `const long K = …;` e `int velActual = 150;` van arriba, en **Ajustes del equipo**. Cambien 150000 por su promedio de K.
2. `velActual = vel;` va en el `loop()`, justo después de `int vel = Wire.read();`.
3. En `clasificar()`, **reemplacen** la línea `moverEn = max(millis(), ultimaPieza + RECORRIDO);` por las dos líneas de abajo.
4. Verifiquen (✓) y suban (→).

```cpp
const long K = 150000;    // escribe tu promedio
int velActual = 150;      // se actualiza en cada pregunta al nodo banda

// en loop(), al leer los 2 bytes:
velActual = vel;

// en clasificar():
unsigned long recorrido = K / max(velActual, 60);
moverEn = max(millis(), ultimaPieza + recorrido);
```

:::pregunta id="g8-p2"
¿Para qué sirve `max(velActual, 60)`?
:::

Prueba: cambia la velocidad con la perilla **mientras** clasifica. ¿Sigue acertando?

Anoten el resultado en su bitácora de fallos si algo sale mal.

## Parte 3 · Calor y consumo (25 min)

**Medir la corriente del motor:** con la fuente desenchufada, pongan el multímetro en corriente continua (punta roja en el conector **A** o **10A**) y conéctenlo **en serie** entre el +12 V y el + del motor, como en la Guía 3. Enchufen, lean y desenchufen. Al terminar, regresen la punta roja al conector **V**.

**Temperatura:** después de 5 minutos funcionando, desenchufen y toquen un instante el MOSFET y el motor (o usen un termómetro infrarrojo si hay). Anoten frío, tibio o caliente.

:::tabla id="g8-calor"
| Velocidad | Corriente del motor (mA) | Temperatura del MOSFET después de 5 min | Temperatura del motor |
| --- | --- | --- | --- |
| 50 % | | | |
| 100 % | | | |
| 100 % con piezas encima | | | |
:::

> Potencia en el MOSFET ≈ corriente² × RDS (0,022 Ω)

Usen la corriente en **amperios** (mA ÷ 1000). El resultado sale en vatios (W).

:::pregunta id="g8-p3"
Calcula la potencia que se pierde en el MOSFET con la corriente máxima medida. ¿Necesita disipador?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] Encontramos la velocidad máxima con 90 % de aciertos.
- [ ] El RECORRIDO se calcula según la velocidad.
- [ ] Medimos corriente y temperatura.
:::

## Reto extra

Haz que el display muestre la velocidad de la banda en piezas por minuto durante 2 segundos al mover la perilla.

Pistas: guarden la velocidad anterior en una variable; si la nueva cambia más de 10, muestren un número en el display con `display.setDigit(...)` y guarden `millis()`; después de 2 segundos vuelvan a `mostrarCuentas()`.

## Bitácora (15 min)

Anoten los fallos de hoy (síntoma, causa y solución).

:::tabla id="g8-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

Antes de irse: desenchufen la fuente y suban el programa del clasificador con K y la hoja de cálculo, juntos en un `.zip`.

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g8-p2: evita dividir entre 0 o tiempos enormes cuando la banda va casi detenida.
- g8-p3: con 0,5 A → 0,5² × 0,022 ≈ 5,5 mW: no necesita disipador. Es buen momento para comparar con el L298N.
- Medir temperatura con el dedo solo después de desconectar; mejor con termómetro infrarrojo si hay.
- Tiempo total: 40 + 35 + 25 + 5 + 15 = 120 minutos.
:::
