---
titulo: Embudo y compuerta
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · Embudo y compuerta

## Objetivo del día

Planificar el programa con un diagrama de flujo y modelar el embudo y la compuerta en Blender.

**Al terminar tendremos:** el diagrama de flujo, el embudo y la compuerta exportados en STL y el cronograma del equipo.

## Materiales del equipo

- Bitácora
- Computadora con Blender y el archivo del sábado 2
- Botella del depósito

## Parte 1 · Diagrama de flujo (20 min)

| Figura | Significa |
| --- | --- |
| Óvalo | Inicio |
| Rectángulo | Una acción |
| Rombo | Una pregunta Sí / No |

:::tabla id="g3-flujo"
| Paso | ¿Qué hace el dispensador? |
| --- | --- |
| 1 | ¿Ya pasó el tiempo de la siguiente comida? Sí → ir a SERVIR |
| 2 | ¿Se presionó el botón? Sí → ir a SERVIR |
| 3 | Volver al paso 1 |
| SERVIR a | Sonar el buzzer para llamar a la mascota |
| SERVIR b | ______ |
| SERVIR c | ______ |
| SERVIR d | Esperar según la porción |
| SERVIR e | ______ |
:::

:::animacion tipo="diagrama-flujo" programa="dispensador" ocultar="si"
:::

Dibuja el diagrama en la bitácora.

## Parte 2 · El embudo (35 min)

Un embudo con paredes **empinadas** deja caer la comida; uno muy plano se atasca.

1. Abre `equipo_NOMBRE_dispensador.blend`.
2. **Shift + A → Malla → Cono.** En el panel que aparece:
   - Vértices: **32**
   - Radio 1 (abajo): **12.5** (salida de 25 mm)
   - Radio 2 (arriba): **40** (entrada de 80 mm)
   - Profundidad: **50**
3. **Hueco:** duplica el cono (**Shift + D**), y hazlo un poco más pequeño (**S 0.92**) y un poco más alto (**S Z 1.2**). Resta con **Booleano → Diferencia** y aplica. Ahora el embudo es hueco.
4. **Cuello:** cilindro de diámetro **igual a la boca de tu botella + 1 mm**, 15 mm de alto, hueco, arriba del embudo: ahí entra la botella boca abajo.

[IMAGEN 3.1: embudo hueco en Blender con el cuello para la botella]

:::animacion tipo="embudo-angulo"
:::

:::pregunta id="g3-p1"
¿Por qué la salida del embudo (25 mm) debe ser más grande que una croqueta?
:::

## Parte 3 · La compuerta (25 min)

1. **Paleta:** cubo de X = 40, Y = 30, Z = 3. Tapa la salida del embudo por completo.
2. **Encastre:** en un extremo de la paleta, un cilindro de 8 mm de diámetro y 5 mm de alto. Réstale un cilindro de **5 mm** (ahí entra el brazo del servo).
3. Une todo (**Ctrl + J**).

[IMAGEN 3.2: compuerta en Blender: paleta con el encastre para el servo]

4. Exporta `equipo_NOMBRE_embudo.stl` y `equipo_NOMBRE_compuerta.stl`.

## Parte 4 · Cronograma (15 min)

:::tabla id="g3-cronograma"
| Sábado | Meta | Responsable principal |
| --- | --- | --- |
| 4 | Estructura: depósito, embudo, base y compuerta | |
| 5 | Circuito completo y servido manual | |
| 6 | Medir gramos y corregir atascos | |
| 7 | Gráfica y documentación | |
| 8 | Porciones por tamaño, horario y presentación | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos el diagrama de flujo.
- [ ] El embudo es hueco y tiene cuello.
- [ ] La compuerta tapa la salida.
- [ ] Exportamos las dos piezas.
- [ ] Tenemos cronograma.
:::

## Reto extra

Agrega al embudo una **pestaña** con dos agujeros para atornillarlo a la estructura.

## Bitácora (20 min)

:::pregunta id="g3-b1"
¿Qué partes del diagrama de flujo son "manuales" y cuáles "automáticas"?
:::

:::pregunta id="g3-b2"
¿Qué fue lo más difícil de modelar el embudo?
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Flujo: b encender el LED; c abrir la compuerta; e cerrar la compuerta y apagar el LED.
- Con esas medidas el ángulo de la pared es de unos 62° respecto a la horizontal: suficiente para croquetas.
- Imprimir esta semana embudo (≈2 h) y compuerta (≈15 min).
- Si la boca de la botella es muy variable, hacer el cuello de 30 mm y ajustar con cinta.
- Tiempo total: 20 + 35 + 25 + 15 + 5 + 20 = 120 minutos.
:::
