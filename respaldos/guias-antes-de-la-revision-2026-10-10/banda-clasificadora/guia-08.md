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

:::tabla id="g8-velocidad"
| Velocidad (valor PWM) | Piezas por minuto | Aciertos de 10 | Aciertos (%) |
| --- | --- | --- | --- |
| 100 | | | |
| 140 | | | |
| 180 | | | |
| 220 | | | |
| 255 | | | |
:::

:::animacion tipo="grafica-datos" tabla="g8-velocidad" y="aciertos (%)"
:::

:::pregunta id="g8-p1"
¿Cuál es la velocidad más alta que mantiene al menos 90 % de aciertos? ¿Qué limita la velocidad: el sensor, el servo o el tiempo?
:::

## Parte 2 · Recorrido automático (35 min)

Con la tabla del sábado 6 (velocidad contra RECORRIDO) podemos calcular el tiempo para cualquier velocidad. Como el tiempo es inversamente proporcional a la velocidad:

> RECORRIDO ≈ K ÷ velocidad  →  K = RECORRIDO medido × velocidad

:::tabla id="g8-k"
| Velocidad | RECORRIDO medido (ms) | K = RECORRIDO × velocidad |
| --- | --- | --- |
| Baja | | |
| Media | | |
| Alta | | |
| Promedio de K | | |
:::

En el clasificador, usa la velocidad que envía el nodo banda:

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

## Parte 3 · Calor y consumo (25 min)

:::tabla id="g8-calor"
| Velocidad | Corriente del motor (mA) | Temperatura del MOSFET después de 5 min | Temperatura del motor |
| --- | --- | --- | --- |
| 50 % | | | |
| 100 % | | | |
| 100 % con piezas encima | | | |
:::

> Potencia en el MOSFET ≈ corriente² × RDS (0,022 Ω)

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

## Bitácora (15 min)

:::tabla id="g8-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g8-p2: evita dividir entre 0 o tiempos enormes cuando la banda va casi detenida.
- g8-p3: con 0,5 A → 0,5² × 0,022 ≈ 5,5 mW: no necesita disipador. Es buen momento para comparar con el L298N.
- Medir temperatura con el dedo solo después de desconectar; mejor con termómetro infrarrojo si hay.
- Tiempo total: 40 + 35 + 25 + 5 + 15 = 120 minutos.
:::
