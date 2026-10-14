---
titulo: Un barco para la demostración
guia: 8
sabado: 8
sesion: Preparación de presentación
duracion: 120
---

# Guía 8 · Un barco para la demostración

## Objetivo del día

Modelar en Blender un barco para la demostración y preparar el guion y el cartel de la presentación.

**Al terminar tendremos:** el barco exportado para imprimir, el guion con lo que dice cada integrante y el cartel empezado.

## Materiales del equipo

- Computadora con Blender
- Ficha técnica y datos del sábado 7
- Cartulina, marcadores, fotos del proyecto

## Parte 1 · Modelar el barco (45 min)

El barco debe ser **más alto** que el puente cerrado, para que se note que necesita que se abra.

Antes de empezar, midan con la regla la altura del puente cerrado (de la mesa al tablero) para compararla al final.

1. Archivo nuevo (unidades en mm). **Casco:** cubo de X = 80, Y = 30, Z = 15.
   - **Archivo → Nuevo → General**. Borra el cubo que trae (**X → Borrar**).
   - Unidades: Propiedades → icono de **Escena** (cono con dos esferitas) → **Unidades** → Escala de unidades **0.001**, Longitud **Milímetros**.
   - Guarda como `equipo_NOMBRE_barco.blend`.
   - **Shift + A → Malla → Cubo** y, en el Panel N (tecla N) → **Elemento**, Dimensiones X = 80, Y = 30, Z = 15. Llámalo `casco`.
2. **Punta del barco:** en modo edición (**Tab**) selecciona los dos vértices de adelante arriba y los dos de abajo, y júntalos con **S** (escala) en Y hasta casi 0. Así queda en punta.
   - Con el casco seleccionado, presiona **Tab** (Modo Edición) y luego la tecla **1** de arriba del teclado (selección de vértices).
   - Presiona **Alt + A** para no tener nada seleccionado.
   - Mira desde arriba (tecla **7** del teclado numérico o bolita **Z**) y activa rayos X con **Alt + Z**, para seleccionar también los vértices de abajo.
   - Arrastra un rectángulo con el mouse alrededor de la **punta derecha** del casco (los 4 vértices de adelante).
   - Presiona **S**, luego **Y**, escribe **0.05** y **Enter**: los vértices se juntan y el casco queda en punta.
   - Sal con **Tab** y quita los rayos X con **Alt + Z**.
3. **Cabina:** cubo de 30 × 20 × 15 encima del casco.
   - Dimensiones X = 30, Y = 20, Z = 15. Posición Z = **15**, para que quede apoyada encima del casco. Llámala `cabina`.
4. **Mástil:** cilindro de 3 mm de diámetro y 60 mm de alto.
   - Dimensiones X = 3, Y = 3, Z = 60. Posición X = **−25** (detrás de la cabina) y Z = **37.5** (así empieza en la parte de arriba del casco). Llámalo `mastil`.
5. **Bandera:** cubo delgado de 15 × 1 × 10 arriba del mástil.
   - Posición X = **−17.5** y Z = **62**: queda colgando de la punta del mástil, como una bandera.
6. Une todo (**Ctrl + J**) y exporta `equipo_NOMBRE_barco.stl`.
   - Clic en la bandera, **Shift + clic** en el mástil, en la cabina y al final en el `casco`; luego **Ctrl + J**.
   - **Archivo → Exportar → STL (.stl)** → **Sólo lo seleccionado** → nombre → **Exportar STL**. Guarda con **Ctrl + S**.

[IMAGEN 8.1: barco modelado en Blender con casco en punta, cabina, mástil y bandera]

Para ver la altura total: selecciona el barco y lee el valor de **Dimensiones Z** en el Panel N (pestaña **Elemento**).

:::pregunta id="g8-p1"
¿Qué altura total tiene el barco? ¿Es más alto que el puente cerrado?
:::

## Parte 2 · Guion de la presentación (35 min)

La presentación dura **5 minutos**. Cada integrante presenta una parte:

Repartan las partes (una persona puede tener dos) y escriban en **¿Qué se dice o se muestra?** 2 o 3 ideas cortas para cada una. No hace falta memorizar: solo saber qué contar.

:::tabla id="g8-guion"
| Parte | Tiempo | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- | --- |
| ¿Qué es un puente levadizo y para qué sirve? | 1 min | | |
| La escala y el diseño en Blender | 1 min | | |
| Las torres con triángulos y la prueba de carga | 1 min | | |
| El circuito, el sensor y el diagrama de flujo | 1 min | | |
| Demostración en vivo con el barco | 1 min | | |
:::

Ensayen una vez con cronómetro. Tiempo del ensayo: ______

## Parte 3 · El cartel (25 min)

El cartel debe tener:

- Nombre del equipo y del puente.
- Foto o render del puente.
- El cálculo de la escala.
- El diagrama de flujo.
- El resultado de la prueba de carga.

Consejos: primero repartan el espacio a lápiz y luego pasen a marcador; título grande (que se lea a tres pasos) y frases cortas. Los datos están en las Guías 2, 3 y 7.

[IMAGEN 8.2: ejemplo de cartel del puente con foto, escala, diagrama de flujo y prueba de carga]

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] El barco está modelado y exportado.
- [ ] El guion tiene responsable para cada parte.
- [ ] Ensayamos con cronómetro.
- [ ] Empezamos el cartel.
:::

## Reto extra

Pinten el río en la base y agreguen detalles (casitas, árboles, carros de papel) para que la maqueta se vea más real.

## Bitácora (10 min)

:::pregunta id="g8-b1"
¿Qué parte de la presentación nos pone más nerviosos y cómo la vamos a practicar?
:::

Antes de irse, suban `equipo_NOMBRE_barco.blend` y el `.stl` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir los barcos esta semana (≈40 min cada uno).
- Si un barco no detecta bien con el sensor, agregarle una "vela" plana de cartón al frente: el ultrasonido rebota mejor en superficies planas.
- Pedir que el cartel quede terminado para el sábado 9.
- Tiempo total: 45 + 35 + 25 + 5 + 10 = 120 minutos.
:::
