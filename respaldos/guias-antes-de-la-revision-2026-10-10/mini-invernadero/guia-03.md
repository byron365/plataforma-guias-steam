---
titulo: Causas y efectos
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · Causas y efectos

## Objetivo del día

Identificar las variables del invernadero, hacer el mapa de causa y efecto y el diagrama de flujo, y modelar las piezas que faltan.

**Al terminar tendremos:** la tabla de variables, el diagrama de flujo, el clip de la manguera exportado y el cronograma del equipo.

## Materiales del equipo

- Bitácora
- Computadora con Blender y el archivo del sábado 2
- Manguera de la bomba (para medirla)

## Parte 1 · Revisar las plantas (10 min)

:::tabla id="g3-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Variables del invernadero (20 min)

Una **variable** es algo que cambia y podemos medir.

:::tabla id="g3-variables"
| Variable | ¿Con qué la medimos? | Unidad | ¿Qué hace el invernadero si cambia? |
| --- | --- | --- | --- |
| Humedad de la tierra | Sensor de humedad | Número 0 a 1023 | |
| Temperatura del aire | | °C | |
| Luz | Temporizador | Minutos | |
| Agua del depósito | | | |
:::

## Parte 3 · Mapa de causa y efecto (15 min)

Un **mapa de causa y efecto** muestra qué provoca qué, como un círculo:

> Tierra seca → la bomba se enciende → la tierra se moja → la bomba se apaga → la planta usa el agua → tierra seca...

:::animacion tipo="causa-efecto"
:::

:::pregunta id="g3-p1"
Escribe el mapa de causa y efecto de la **ventana**, empezando por "Hace calor".
:::

## Parte 4 · Diagrama de flujo (20 min)

| Figura | Significa |
| --- | --- |
| Óvalo | Inicio |
| Rectángulo | Una acción |
| Rombo | Una pregunta Sí / No |

:::tabla id="g3-flujo"
| Paso | ¿Qué hace el invernadero? |
| --- | --- |
| 1 | Leer la humedad de la tierra |
| 2 | ¿Tierra seca o botón presionado? Sí → ______ |
| 3 | Leer la temperatura |
| 4 | ¿Más de 30 °C? Sí → ______ |
| 5 | ¿Menos de 27 °C? Sí → ______ |
| 6 | ¿Es hora de luz? Sí → ______ · No → apagar luz |
| 7 | Enviar los datos a la computadora y volver al paso 1 |
:::

:::animacion tipo="diagrama-flujo" programa="invernadero" ocultar="si"
:::

Dibuja el diagrama en la bitácora.

## Parte 5 · Clip para la manguera (25 min)

El clip sostiene la manguera sobre la maceta para que el agua caiga en la tierra.

1. Mide el diámetro de la manguera: ______ mm.
2. Abre el archivo del sábado 2. **Anillo:** cilindro de 12 mm de diámetro y 8 mm de alto. Réstale (Booleano) un cilindro del diámetro de la manguera **+ 0,5 mm**.
3. **Abertura:** resta un cubo pequeño (4 mm de ancho) en un lado del anillo, para que la manguera entre a presión.
4. **Pestaña:** cubo de 20 × 10 × 2 mm pegado al anillo, para fijarlo a la pared.
5. Exporta `equipo_NOMBRE_clip.stl`.

[IMAGEN 3.1: clip de manguera en Blender con anillo abierto y pestaña para pegar]

## Parte 6 · Cronograma (15 min)

:::tabla id="g3-cronograma"
| Sábado | Meta | Responsable principal |
| --- | --- | --- |
| 4 | Caja, ventana y servo | |
| 5 | Bomba y riego con botón | |
| 6 | Calibrar el riego automático | |
| 7 | Temperatura y registro de datos | |
| 8 | Luz automática y presentación | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos la tabla de variables.
- [ ] Hicimos los mapas de causa y efecto.
- [ ] Completamos el diagrama de flujo.
- [ ] Exportamos el clip de la manguera.
- [ ] Tenemos cronograma.
:::

## Reto extra

Diseña una **bandeja** para poner debajo de la maceta y recoger el agua que sobra.

## Bitácora (10 min)

:::pregunta id="g3-b1"
¿Qué diferencia hay entre un control **manual** y uno **automático**? Da un ejemplo del invernadero.
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Flujo: 2 regar; 4 abrir ventana; 5 cerrar ventana; 6 encender luz.
- Variables: temperatura con DHT11; agua del depósito con sensor de nivel (se ve en el sábado 11).
- Imprimir los clips esta semana (≈10 min cada uno).
- Tiempo total: 10 + 20 + 15 + 20 + 25 + 15 + 5 + 10 = 120 minutos.
:::
