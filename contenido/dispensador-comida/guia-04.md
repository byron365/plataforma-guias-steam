---
titulo: Una estructura que no se atasca
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · Una estructura que no se atasca

## Objetivo del día

Probar qué inclinación de embudo deja caer mejor la comida y construir la estructura del dispensador: base, depósito, embudo y compuerta.

**Al terminar tendremos:** el dispensador armado con la compuerta montada en el servo, listo para conectar.

## Materiales del equipo

- Embudo, compuerta y soporte impresos
- Botella plástica (depósito)
- Cartón grueso, MDF o madera para la base y la torre
- Palitos, silicona, tornillos pequeños
- Servo SG90
- Croquetas, cartulina, transportador

## Parte 1 · El experimento del ángulo (25 min)

Haz tres conos de cartulina con distinta inclinación y prueba cuál deja caer la comida sin atascarse:

1. **Hacer cada cono:** recorta un círculo de cartulina, córtalo del borde al centro y enróllalo. Mientras más lo cierres (más se encima la cartulina), más **empinado** queda el cono. Pégalo con cinta y corta la punta para dejar una salida de unos 2,5 cm. Hagan los tres conos con la misma salida.
2. **Medir el ángulo:** sostengan el cono parado, con la boca ancha hacia arriba. Pongan el transportador pegado a la pared del cono, con su línea recta horizontal (paralela a la mesa). Lean el ángulo entre la pared del cono y esa línea horizontal. Ajusten el cono (más cerrado o más abierto) hasta que se acerque al ángulo de la tabla.
3. **Probar:** tapen la salida con un dedo, pongan un puñado de croquetas, suelten el dedo sobre un plato y observen.

:::tabla id="g4-angulos"
| Cono | Ángulo de la pared (con transportador) | ¿Cayó toda la comida? | ¿Se atascó? |
| --- | --- | --- | --- |
| Plano | ≈ 30° | | |
| Medio | ≈ 45° | | |
| Empinado | ≈ 60° | | |
:::

Comparen sus resultados con la animación: muevan el ángulo y miren cuándo se atasca la comida.

:::animacion tipo="embudo-angulo"
:::

:::pregunta id="g4-p1"
¿Qué ángulo funcionó mejor? ¿Nuestro embudo impreso es parecido?
:::

## Parte 2 · Base y torre (35 min)

1. **Base:** rectángulo de 25 × 20 cm. Deja espacio para el plato y para el Arduino.
   - Marquen el rectángulo con regla y lápiz y córtenlo (si es madera o MDF, el docente lo corta).
   - Pongan el plato encima y marquen con lápiz dónde irá: debajo del centro de la torre. Dejen a un lado un espacio para el Arduino y la protoboard.
2. **Torre:** dos paredes de cartón o madera de unos 25 cm de alto que sostendrán el embudo arriba del plato.
   - Recorten dos rectángulos iguales de unos 25 cm de alto.
   - Péguenlos parados sobre la base, uno a cada lado de la marca del plato, separados lo justo para que el embudo quede apretado entre ellos.
3. Pega el **embudo** entre las paredes, con la salida a unos **5 cm** sobre el plato.
   - Midan con la regla desde el plato hasta la salida del embudo antes de pegar.
   - Usen silicona (con ayuda del docente) o palitos atravesados debajo del borde del embudo para que no se resbale.
4. **Depósito:** corta el fondo de la botella (con el docente). Métela boca abajo en el cuello del embudo.
   - Marquen con plumón una línea alrededor de la botella, cerca del fondo. El docente la corta.
   - Sin tapa, métanla boca abajo en el cuello del embudo. La parte cortada queda arriba: por ahí se rellena.

[IMAGEN 4.1: estructura con la base, las dos paredes, el embudo y la botella boca abajo]

## Parte 3 · Montar la compuerta (35 min)

1. **Centra el servo en 0°** con un código corto (`compuerta.write(0);` en el `setup`).
   - Conecten el servo directo al Arduino: **naranja → D9**, **rojo → 5V**, **café → GND**.
   - Suban el programa de la Guía 1 (`equipo_NOMBRE_compuerta`; si están en otra computadora, descárguenlo del recuadro de la Guía 1). En su `setup` tiene `compuerta.write(0);`, así que al encender pone el servo en 0°.
   - Cuando el servo se quede quieto, desconecten el USB. No giren el eje con la mano.
2. Pega el **soporte del servo** al lado de la salida del embudo.
   - Póngalo a la altura de la salida, de modo que el eje del servo quede cerca de la orilla de la salida.
3. Mete el servo en el soporte y coloca la **compuerta** en su brazo, de modo que en 0° tape la salida.
   - Metan un brazo (horn) del servo en el encastre de la compuerta.
   - Encajen el brazo en el eje del servo con la paleta justo debajo de la salida, tapándola.
   - Pongan el tornillo central del eje.
4. Gira el brazo con la mano a 70°: la compuerta debe **destapar** por completo la salida sin chocar.
   - Gírenlo **despacio** y sin forzar (si se traba, no empujen más). Después regrésenlo a 0°.
   - Si prefieren no moverlo a mano: conecten también el botón como en la Guía 1 y presiónenlo; el programa abre la compuerta a 70° por un segundo.

[IMAGEN 4.2: compuerta montada en el servo tapando la salida del embudo]

Revisen y marquen:

:::checklist id="g4-revision"
- [ ] En 0° la compuerta tapa toda la salida.
- [ ] En 70° la salida queda libre.
- [ ] La compuerta no roza con el embudo.
- [ ] La estructura no se tambalea.
:::

## Parte 4 · Prueba sin electrónica (10 min)

Llena la botella hasta la mitad con croquetas y mueve la compuerta con la mano 5 veces.

Pongan una bandeja o caja debajo (las croquetas ruedan). Abran la compuerta despacio, ciérrenla y anoten cada prueba. En la última columna, revisen si caen croquetas aunque la compuerta esté cerrada.

| Prueba | ¿Cayó comida? | ¿Se atascó? | ¿Se escapó comida con la compuerta cerrada? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] Hicimos el experimento del ángulo.
- [ ] La estructura está armada.
- [ ] La compuerta está montada en el servo.
- [ ] Probamos con croquetas.
:::

## Bitácora (10 min)

:::foto id="g4-foto"
Foto del dispensador armado.
:::

:::pregunta id="g4-b1"
¿Qué problema de la estructura tuvimos que resolver hoy?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- El docente corta la botella; los estudiantes marcan la línea.
- Si se escapa comida con la compuerta cerrada, acercar la compuerta a la salida o pegarle un pedazo de fomi.
- Recordar rotar roles a partir del sábado 5.
- Tiempo total: 25 + 35 + 35 + 10 + 5 + 10 = 120 minutos.
:::
