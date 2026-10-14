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

Para cada revisión escriban Sí o No; si algo está mal, escriban qué hay que arreglar (por ejemplo, "quitar un hilito de plástico entre dos platos"). Para probar el sensor, métanlo con cuidado en su soporte, sin forzar.

| Revisión | ¿Bien? | ¿Qué hay que arreglar? |
| --- | --- | --- |
| Los platos no están pegados entre sí | | |
| El DHT22 entra en el soporte | | |
| Los cables pasan por el agujero de la base | | |
| La tapa cubre bien el sensor | | |

## Parte 2 · Montaje (30 min)

Hagan el montaje con el USB **desconectado**.

1. Pasa el DHT22 por dentro de la torre y fíjalo en su soporte.
   - Primero desconecten el DHT22 de la protoboard. Pongan en sus pines los cables largos macho–hembra (la punta hembra entra en el pin del sensor).
   - Metan el sensor por el hueco de los platos hasta la ranura del soporte. Si queda flojo, un pedacito de cinta lo sujeta.
2. Saca sus 3 cables por el agujero de la base con cables largos.
   - Pasen las puntas macho por el agujero de cables de la base.
   - Conéctenlas otra vez como antes: VCC → fila **+**, DATA → pin **2**, GND → fila **−**. Anoten el color de cada cable para no confundirse.
3. Fija la carcasa a la base de cartón o madera.
   - Con silicona (con el docente) o tornillos, sin tapar el agujero de los cables.
4. Coloca a un lado el Arduino, la protoboard, la pantalla y el LED (que se vean bien).
   - Separados unos centímetros de la torre: el Arduino se calienta un poco y no debe estar pegado al sensor.
5. La **LDR** queda fuera de la torre, mirando hacia arriba (debe recibir luz).
6. Conecten el USB y revisen que la pantalla vuelva a mostrar los datos.

[IMAGEN 6.1: estación montada con la torre de platos, el Arduino, la pantalla OLED y el LED RGB sobre una base]

:::pregunta id="g6-p1"
¿Por qué la LDR va fuera de la torre y el DHT22 va dentro?
:::

## Parte 3 · Comparar con un termómetro (30 min)

Coloca el termómetro comercial **junto a la estación** y espera 5 minutos para que los dos se estabilicen. Después anota 5 lecturas, una por minuto:

- Pongan el termómetro a la altura de la torre, a unos centímetros, sin tocarla. No lo sostengan con la mano (la mano lo calienta).
- Cada minuto (usen el cronómetro del celular), una persona lee la pantalla de la estación y otra el termómetro, **al mismo tiempo**.
- **Diferencia** = Termómetro − Nuestra estación. Puede salir negativa (si la estación marca más que el termómetro): escriban el signo menos.
- **Promedio** de una columna = suma de los 5 números ÷ 5.

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

Abran `equipo_NOMBRE_estacion` (Guía 5) y guárdenlo como `equipo_NOMBRE_calibrada`. Las piezas de abajo van así:

- Las dos líneas `const float AJUSTE…` van en **Ajustes del equipo**, junto a `FRIO` y `CALOR`.
- En el `loop()`, busquen las dos líneas que leen el sensor (`float temp = dht.readTemperature();` y `float hum = dht.readHumidity();`) y **reemplácenlas** por las dos de abajo, que suman el ajuste.

```cpp
const float AJUSTE_TEMP = 0.8;   // diferencia promedio del equipo
const float AJUSTE_HUM = 0.0;

// en el loop, justo después de leer:
float temp = dht.readTemperature() + AJUSTE_TEMP;
float hum = dht.readHumidity() + AJUSTE_HUM;
```

Muevan el ajuste en la animación y miren cómo la línea de la estación se acerca a la del termómetro:

:::animacion tipo="calibracion"
:::

1. Escribe tu diferencia promedio en `AJUSTE_TEMP` (puede ser negativa).
   - Con punto decimal y, si es negativa, con el signo menos: por ejemplo `-0.6`.
2. Si el termómetro también mide humedad, calcula su diferencia y ponla en `AJUSTE_HUM`.
3. Sube el código y repite 3 lecturas:
   - Esperen 2 minutos después de subirlo y vuelvan a leer al mismo tiempo la estación y el termómetro, una vez por minuto.

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

Antes de irse, suban `equipo_NOMBRE_calibrada` aquí: es el programa que usarán de ahora en adelante.

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
