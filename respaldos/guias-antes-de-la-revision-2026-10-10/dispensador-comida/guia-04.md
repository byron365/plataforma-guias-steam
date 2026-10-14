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

:::tabla id="g4-angulos"
| Cono | Ángulo de la pared (con transportador) | ¿Cayó toda la comida? | ¿Se atascó? |
| --- | --- | --- | --- |
| Plano | ≈ 30° | | |
| Medio | ≈ 45° | | |
| Empinado | ≈ 60° | | |
:::

:::animacion tipo="embudo-angulo"
:::

:::pregunta id="g4-p1"
¿Qué ángulo funcionó mejor? ¿Nuestro embudo impreso es parecido?
:::

## Parte 2 · Base y torre (35 min)

1. **Base:** rectángulo de 25 × 20 cm. Deja espacio para el plato y para el Arduino.
2. **Torre:** dos paredes de cartón o madera de unos 25 cm de alto que sostendrán el embudo arriba del plato.
3. Pega el **embudo** entre las paredes, con la salida a unos **5 cm** sobre el plato.
4. **Depósito:** corta el fondo de la botella (con el docente). Métela boca abajo en el cuello del embudo.

[IMAGEN 4.1: estructura con la base, las dos paredes, el embudo y la botella boca abajo]

## Parte 3 · Montar la compuerta (35 min)

1. **Centra el servo en 0°** con un código corto (`compuerta.write(0);` en el `setup`).
2. Pega el **soporte del servo** al lado de la salida del embudo.
3. Mete el servo en el soporte y coloca la **compuerta** en su brazo, de modo que en 0° tape la salida.
4. Gira el brazo con la mano a 70°: la compuerta debe **destapar** por completo la salida sin chocar.

[IMAGEN 4.2: compuerta montada en el servo tapando la salida del embudo]

:::checklist id="g4-revision"
- [ ] En 0° la compuerta tapa toda la salida.
- [ ] En 70° la salida queda libre.
- [ ] La compuerta no roza con el embudo.
- [ ] La estructura no se tambalea.
:::

## Parte 4 · Prueba sin electrónica (10 min)

Llena la botella hasta la mitad con croquetas y mueve la compuerta con la mano 5 veces.

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
