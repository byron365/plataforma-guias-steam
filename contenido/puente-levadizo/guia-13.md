---
titulo: Nuestro puente, de portada
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Nuestro puente, de portada

## Objetivo del día

Hacer el render final del puente en Blender, completar la bitácora y reflexionar sobre lo aprendido.

**Al terminar tendremos:** el render final, la bitácora completa y la reflexión de cada integrante.

## Materiales del equipo

- Computadora con Blender
- Archivos `equipo_NOMBRE_puente.blend` y del barco
- Bitácora de todos los sábados

## Parte 1 · El puente completo en Blender (40 min)

Un **render** es una "foto" del modelo 3D con colores y luces. Recuerden: medidas en el **Panel N → Elemento**; color en la pestaña **Material** (esfera roja en Propiedades → **Nuevo** → **Color base**).

1. Abre el archivo del puente. Ya tiene el soporte y la hoja.
   - Si están en otra computadora, descárguenlo de "Archivos del equipo" (Guía 3); si es `.zip`, clic derecho → **Extraer todo**.
   - Guárdenlo como `equipo_NOMBRE_render.blend` para no cambiar el original.
2. **Duplica** la hoja (**Shift + D**) y gírala para que quede en el otro lado (**R Z 180**).
   - Clic en la hoja, **Shift + D**, clic derecho (la copia queda en el mismo lugar).
   - Con el mouse sobre la vista 3D: **R**, **Z**, **180**, **Enter**.
   - Muévela para que las dos puntas se toquen en el centro del río: mira desde arriba (tecla **7** o bolita **Z**) y cambia su Posición X en el Panel N (por ejemplo, la original en X = −75 y la copia en X = 75).
3. **Torres:** cubos altos (60 × 60 × 325 mm) a cada lado.
   - Un cubo con esas Dimensiones, junto a la punta exterior de una hoja, y otro igual (**Shift + D**) del otro lado. Súbanlos para que su parte de abajo quede a la altura del río (Posición Z = 162.5 si el río está en Z = 0).
4. **Río:** un plano azul debajo; **orillas**: planos verdes.
   - **Shift + A → Malla → Plano**, con Dimensiones X = 305 (el río) e Y = 200, debajo de las hojas, con material azul.
   - Dos planos más a los lados, con material verde, para las orillas.
5. Levanta las dos hojas (**R Y 40** y **R Y −40**) y coloca el barco pasando.
   - Clic en una hoja: **R**, **Y**, **40**, **Enter**. En la otra: **R**, **Y**, **−40**, **Enter**. Si alguna baja en vez de subir, usa el número con el otro signo.
   - Después de girarlas, acomódalas (con **G**) para que su punta exterior siga junto a su torre.
   - **Barco:** **Archivo → Anexar** → `equipo_NOMBRE_barco.blend` → carpeta **Object** (puede aparecer como **Objeto**) → `casco` → **Anexar**. Muévelo al centro del río con **G**.
6. Agrega una luz de **Sol**, coloca la cámara y renderiza (**F12**) con **Eevee**.
   - Luz: **Shift + A → Luz → Sol**. Si no hay cámara: **Shift + A → Cámara**.
   - Gira la vista hasta que se vea bien el puente con el barco y presiona **Ctrl + Alt + 0** (sin teclado numérico: **Vista → Alinear vista → Alinear cámara activa a la vista**).
   - Pestaña **Procesamiento** (cámara trasera) en Propiedades: Motor de procesamiento **EEVEE**.
   - **F12** y espera a que termine.
7. Guarda la imagen: `equipo_NOMBRE_final.png`.
   - En la ventana del render: **Imagen → Guardar como**. Guarda también el `.blend` con **Ctrl + S**.

[IMAGEN 13.1: render final del puente con las hojas levantadas, las torres, el río azul y el barco pasando]

:::foto id="g13-render"
Render final del equipo.
:::

## Parte 2 · Repaso de la bitácora (30 min)

Revisen la bitácora y las guías en la plataforma (cada guía guarda sus respuestas y fotos). Para cada grupo de sábados, escriban en una frase lo más importante que hicieron.

:::tabla id="g13-linea"
| Sábados | Lo más importante que hicimos |
| --- | --- |
| 1-3 | |
| 4-6 | |
| 7-9 | |
| 10-12 | |
:::

Revisen y marquen. Si falta algo, complétenlo hoy:

:::checklist id="g13-bitacora"
- [ ] Todas las guías tienen sus preguntas respondidas.
- [ ] Hay fotos de cada etapa.
- [ ] El código final tiene comentarios y está guardado.
:::

## Parte 3 · Reflexión (30 min)

Respondan con sinceridad: no hay respuestas buenas o malas. Las preguntas individuales las responde cada quien desde su propia sesión.

:::pregunta id="g13-p1"
¿Cuál fue el problema más difícil del proyecto y cómo lo resolvimos?
:::

:::pregunta id="g13-p2" individual="si"
¿Qué aprendí en este proyecto que no sabía antes?
:::

:::pregunta id="g13-p3" individual="si"
¿Qué rol me gustó más y por qué?
:::

:::opciones id="g13-p4"
¿Cómo calificarías el proyecto?
- Muy divertido y aprendí mucho
- Divertido
- Normal
- Difícil, pero valió la pena
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Guardamos el render final.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Haz una **animación** del puente abriéndose: fotograma clave de rotación de las hojas en el fotograma 1 (cerradas) y en el 48 (abiertas). Renderiza con **Ctrl + F12**.

1. En la línea de tiempo (abajo), pon el fotograma actual en **1**. Con las hojas cerradas, selecciona una y, con el mouse sobre los valores de **Rotación** del Panel N, presiona **I** (se ponen amarillos). Repite con la otra hoja.
2. Cambia al fotograma **48**, gira las hojas a su posición abierta y vuelve a presionar **I** sobre la Rotación de cada una.
3. Presiona **Espacio** para ver la animación. Antes de **Ctrl + F12**, pregunten al docente en qué carpeta guardar los fotogramas (Propiedades → pestaña **Salida**).

## Bitácora (15 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro puente levadizo?
:::

Antes de irse, suban `equipo_NOMBRE_render.blend` y el `.png` del render juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos finales y fotos para el portafolio del nivel.
- Si Blender va lento en algunas computadoras, renderizar a 1280 × 720.
- Tiempo total: 40 + 30 + 30 + 5 + 15 = 120 minutos.
:::
