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

Si les toca otra computadora, descarguen el archivo del sábado 2 del recuadro "Archivo de trabajo" de la Guía 2 (o de "Archivos del equipo", en la página del proyecto). Si es un `.zip`, clic derecho → **Extraer todo**.

## Parte 1 · Revisar las plantas (10 min)

Midan la altura con la regla parada en la tierra, hasta la punta de la planta más alta. Cuenten las hojas y anoten lo que vean.

:::tabla id="g3-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Variables del invernadero (20 min)

Una **variable** es algo que cambia y podemos medir.

Completen los espacios vacíos. Para cada variable piensen: ¿con qué aparato la medimos?, ¿en qué unidad?, y si cambia, ¿qué hace el invernadero (regar, abrir la ventana, encender la luz…)?

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

Recorran el círculo en la animación, paso a paso:

:::animacion tipo="causa-efecto"
:::

Ahora hagan uno igual para la ventana: cada paso causa el siguiente, con flechas, hasta volver al inicio.

:::pregunta id="g3-p1"
Escribe el mapa de causa y efecto de la **ventana**, empezando por "Hace calor".
:::

## Parte 4 · Diagrama de flujo (20 min)

Un diagrama de flujo muestra, con figuras y flechas, los pasos del programa en orden.

| Figura | Significa |
| --- | --- |
| Óvalo | Inicio |
| Rectángulo | Una acción |
| Rombo | Una pregunta Sí / No |

Completen los espacios con la acción que hace el invernadero cuando la respuesta es **Sí**:

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

Dibuja el diagrama en la bitácora: óvalo de Inicio, rectángulos para las acciones (pasos 1, 3 y 7), rombos para las preguntas (pasos 2, 4, 5 y 6) con sus flechas Sí y No, y una flecha del paso 7 de regreso al paso 1.

## Parte 5 · Clip para la manguera (25 min)

El clip sostiene la manguera sobre la maceta para que el agua caiga en la tierra.

1. Mide el diámetro de la manguera: ______ mm.
   - Mide lo ancho de la manguera por fuera, con el calibrador (o con la regla, con cuidado).
2. Abre el archivo del sábado 2. **Anillo:** cilindro de 12 mm de diámetro y 8 mm de alto. Réstale (modificador Booleana) un cilindro del diámetro de la manguera **+ 0,5 mm**.
   - Abre `equipo_NOMBRE_invernadero.blend`. Las piezas del sábado 2 están a un lado; si estorban, muévelas con el Panel N (Posición X).
   - **Shift + A → Malla → Cilindro**, Dimensiones X = 12, Y = 12, Z = 8. Llámalo `clip`.
   - Cortador: otro cilindro con X e Y = diámetro de la manguera + 0.5 (por ejemplo, si mide 7 mm, escribe 7.5) y Z = 20, en el mismo lugar.
   - Réstalo al `clip`: llave inglesa → **Agregar modificador → Generar → Booleana** → **Diferencia** → Objeto: el cortador → **Aplicar** → borra el cortador.
3. **Abertura:** resta un cubo pequeño (4 mm de ancho) en un lado del anillo, para que la manguera entre a presión.
   - Cubo de X = 4, Y = 10, Z = 20 con Posición Y = 6: se "come" un pedacito del anillo de un lado.
   - Réstalo al `clip` con el modificador Booleana y aplica. Mira desde arriba (tecla **7**): el anillo debe quedar como una letra C.
4. **Pestaña:** cubo de 20 × 10 × 2 mm pegado al anillo, para fijarlo a la pared.
   - Cubo de X = 20, Y = 10, Z = 2 con Posición Y = −10, del lado contrario a la abertura.
   - Únelo al `clip`: clic en la pestaña, **Shift + clic** en el `clip`, **Ctrl + J**.
5. Exporta `equipo_NOMBRE_clip.stl`.
   - Clic solo en el `clip` → **Archivo → Exportar → STL (.stl)** → **Sólo lo seleccionado** → nombre → **Exportar STL**. Guarda el `.blend` con **Ctrl + S**.

[IMAGEN 3.1: clip de manguera en Blender con anillo abierto y pestaña para pegar]

## Parte 6 · Cronograma (15 min)

Escriban un responsable principal para cada meta: quien se asegura de que salga (el equipo ayuda).

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

Pista: mide el fondo de tu maceta. Haz un cilindro un poco más ancho y bajo, y réstale otro cilindro un poco más angosto subido 2 mm, para que quede con fondo y borde.

## Bitácora (10 min)

:::pregunta id="g3-b1"
¿Qué diferencia hay entre un control **manual** y uno **automático**? Da un ejemplo del invernadero.
:::

Antes de irse, suban el `.blend` y el `.stl` del clip (juntos en un `.zip`: clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Flujo: 2 regar; 4 abrir ventana; 5 cerrar ventana; 6 encender luz.
- Variables: temperatura con DHT11; agua del depósito con sensor de nivel (se ve en el sábado 11).
- Imprimir los clips esta semana (≈10 min cada uno).
- Tiempo total: 10 + 20 + 15 + 20 + 25 + 15 + 5 + 10 = 120 minutos.
:::
