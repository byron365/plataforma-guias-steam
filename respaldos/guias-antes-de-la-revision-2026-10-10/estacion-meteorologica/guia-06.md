---
titulo: ¿Mide bien nuestra estación?
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · ¿Mide bien nuestra estación?

## Objetivo del día

Montar la electrónica en la carcasa impresa y comprobar si la estación mide bien comparándola con un termómetro comercial. Si hay diferencia, la corregimos en el código (calibración).

**Al terminar tendremos:** la estación armada en su carcasa y calibrada con un error de ±1 °C o menos.

## Materiales del equipo

- Carcasa impresa del equipo
- Estación funcionando (sábado 5)
- Termómetro / higrómetro comercial (uno por grupo)
- Cables largos (macho-hembra) de 20 cm, cinta, tornillos o silicona
- Base de cartón o madera para el Arduino y la pantalla

## Parte 1 · Revisar la impresión (10 min)

Revisa la carcasa antes de montar:

| Revisión | ¿Bien? | ¿Qué hay que arreglar? |
| --- | --- | --- |
| Los platos no están pegados entre sí | | |
| El DHT22 entra en el soporte | | |
| Los cables pasan por el agujero de la base | | |
| La tapa cubre bien el sensor | | |

## Parte 2 · Montaje (30 min)

1. Pasa el DHT22 por dentro de la torre y fíjalo en su soporte.
2. Saca sus 3 cables por el agujero de la base con cables largos.
3. Fija la carcasa a la base de cartón o madera.
4. Coloca a un lado el Arduino, la protoboard, la pantalla y el LED (que se vean bien).
5. La **LDR** queda fuera de la torre, mirando hacia arriba (debe recibir luz).

[IMAGEN 6.1: estación montada con la torre de platos, el Arduino, la pantalla OLED y el LED RGB sobre una base]

:::pregunta id="g6-p1"
¿Por qué la LDR va fuera de la torre y el DHT22 va dentro?
:::

## Parte 3 · Comparar con un termómetro (30 min)

Coloca el termómetro comercial **junto a la estación** y espera 5 minutos para que los dos se estabilicen. Después anota 5 lecturas, una por minuto:

:::tabla id="g6-comparacion"
| Minuto | Nuestra estación (°C) | Termómetro (°C) | Diferencia (°C) |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| Promedio | | | |
:::

> Diferencia = Termómetro − Nuestra estación

:::pregunta id="g6-p2"
¿La diferencia es siempre más o menos igual, o cambia mucho? ¿Qué significa eso?
:::

## Parte 4 · Calibrar en el código (25 min)

Si la diferencia promedio es, por ejemplo, **+0,8 °C**, la estación mide 0,8 °C menos de lo real. Lo corregimos con un **ajuste** (offset):

```cpp
const float AJUSTE_TEMP = 0.8;   // diferencia promedio del equipo
const float AJUSTE_HUM = 0.0;

// en el loop, justo después de leer:
float temp = dht.readTemperature() + AJUSTE_TEMP;
float hum = dht.readHumidity() + AJUSTE_HUM;
```

:::animacion tipo="calibracion"
:::

1. Escribe tu diferencia promedio en `AJUSTE_TEMP` (puede ser negativa).
2. Si el termómetro también mide humedad, calcula su diferencia y ponla en `AJUSTE_HUM`.
3. Sube el código y repite 3 lecturas:

| Minuto | Estación calibrada (°C) | Termómetro (°C) | Diferencia (°C) |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

Nuestro ajuste final: AJUSTE_TEMP = ______

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] La electrónica está montada en la carcasa.
- [ ] Comparamos 5 lecturas con el termómetro.
- [ ] Calculamos el promedio de la diferencia.
- [ ] Después de calibrar, el error es de ±1 °C o menos.
:::

## Reto extra

Pon la estación **al sol** 5 minutos con la carcasa y 5 minutos **sin carcasa** (el sensor solo). ¿Cuánto cambia la temperatura? Así comprobamos si la torre de platos sirve.

## Bitácora (15 min)

:::foto id="g6-foto"
Foto de la estación montada junto al termómetro.
:::

:::pregunta id="g6-b1"
¿Qué es calibrar y por qué es importante en un instrumento de medición?
:::

:::pregunta id="g6-b2"
Si tuvieran que mejorar la carcasa, ¿qué cambiarían?
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si no hay termómetros para todos, rotar uno entre equipos por bloques de 10 minutos.
- Error frecuente: medir antes de esperar 5 minutos; el DHT22 tarda en estabilizarse.
- Un ajuste mayor de 3 °C suele indicar sensor dañado o calor del Arduino/regulador cerca del sensor: alejar el sensor.
- Si las piezas impresas tienen soportes pegados entre platos, retirarlos con pinza antes de la clase.
- Tiempo total: 10 + 30 + 30 + 25 + 5 + 15 = 115 minutos (5 de margen).
:::
