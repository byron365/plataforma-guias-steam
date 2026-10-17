---
titulo: Un barco para la demostración
guia: 8
sabado: 8
sesion: Preparación de presentación
duracion: 120
---

# Guía 8 · Un barco para la demostración

## Objetivo del día

Modelar en Tinkercad Codeblocks un barco para la demostración y preparar el guion y el cartel de la presentación.

**Al terminar tendremos:** el barco exportado para imprimir, el guion con lo que dice cada integrante y el cartel empezado.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Ficha técnica y datos del sábado 7
- Cartulina, marcadores, fotos del proyecto

## Parte 1 · Modelar el barco (45 min)

El barco debe ser **más alto** que el puente cerrado, para que se note que necesita que se abra.

Antes de empezar, midan con la regla la altura del puente cerrado (de la mesa al tablero) para compararla al final.

Recuerda: cada forma nace **centrada** (su centro en X = 0, Y = 0, Z = 0) y **Mover** mueve la última forma que agregaste.

1. Diseño nuevo. **Casco:** un Cubo de 60 × 30 × 15 mm.
   - En Tinkercad: **+ Crear → Codeblocks**. Ponle de nombre `equipo_NOMBRE_barco` (clic en el nombre de arriba a la izquierda).
   - De **Formas**, arrastra un **Cubo**, toca su **›** y escribe primer **A = 60**, **L = 30**, segundo **A = 15**, **arista = 0**.
   - Debajo, **Mover: X −10, Y 0, Z 0** (lo corre un poco hacia atrás para dejar lugar a la punta).
2. **Proa (la punta de adelante):** un Cilindro del mismo ancho y alto que el casco, pegado al frente. Así el barco queda con la punta redondeada.
   - Debajo, un **Cilindro** con **Radio = 15** (la mitad de los 30 mm de ancho), **A = 15**, **Lados = 32**, **arista = 0**.
   - Debajo, **Mover: X 20, Y 0, Z 0**. Queda justo en la punta del casco.
3. **Cabina:** un Cubo de 30 × 20 × 15 mm encima del casco.
   - Debajo, un **Cubo** con primer **A = 30**, **L = 20**, segundo **A = 15**.
   - Debajo, **Mover: X 0, Y 0, Z 15** (queda apoyada encima del casco).
4. **Mástil:** un cilindro de 3 mm de diámetro y 60 mm de alto, detrás de la cabina.
   - Debajo, un **Cilindro** con **Radio = 1.5**, **A = 60**, **Lados = 32**.
   - Debajo, **Mover: X −25, Y 0, Z 37.5** (así empieza en la parte de arriba del casco).
5. **Bandera:** un Cubo delgado de 15 × 1 × 10 mm arriba del mástil.
   - Debajo, un **Cubo** con primer **A = 15**, **L = 1**, segundo **A = 10**.
   - Debajo, **Mover: X −17.5, Y 0, Z 62**: queda colgando de la punta del mástil, como una bandera.
6. **Agrupar** y exportar `equipo_NOMBRE_barco.stl`.
   - **Seleccionar todo** y **Group Selection**. Ejecuta con **▷** y revisa el barco en la vista 3D.
   - **Compartir** → **.STL**. Cámbiale el nombre a `equipo_NOMBRE_barco.stl` si hace falta.

[IMAGEN 8.1T: barco modelado en Tinkercad Codeblocks con proa redondeada, cabina, mástil y bandera]

Para la altura total, piensen dónde empieza y dónde termina el barco: el casco está centrado (la mitad de su alto queda debajo de Z = 0) y la bandera tiene su centro en Z = 62 (la mitad de su alto queda arriba de ese número).

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
| La escala y el diseño en Tinkercad | 1 min | | |
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

Antes de irse, suban aquí `equipo_NOMBRE_barco.stl`. El diseño de bloques queda guardado en Tinkercad.

:::archivo id="g8-archivo"
**Archivo de trabajo:** suban aquí el .stl que exportaron. Su diseño de bloques queda guardado en Tinkercad: en cualquier computadora entran con la misma cuenta y lo abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir los barcos esta semana (≈40 min cada uno).
- **Versión Tinkercad (Codeblocks):** la punta del casco es un cilindro (proa redondeada) en vez de juntar vértices como en Blender; el resto usa las mismas medidas y posiciones.
- Si un barco no detecta bien con el sensor, agregarle una "vela" plana de cartón al frente: el ultrasonido rebota mejor en superficies planas.
- Pedir que el cartel quede terminado para el sábado 9.
- Tiempo total: 45 + 35 + 25 + 5 + 10 = 120 minutos.
:::
