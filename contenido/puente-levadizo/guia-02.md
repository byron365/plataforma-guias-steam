---
titulo: Un puente a escala
guia: 2
sabado: 2
sesion: Ideación y diseño
duracion: 120
---

# Guía 2 · Un puente a escala

## Objetivo del día

Calcular las medidas del puente a escala, dibujar el boceto y dar los primeros pasos en Blender modelando el soporte del servo.

**Al terminar tendremos:** el boceto con medidas a escala y el soporte del servo listo para imprimir.

## Materiales del equipo

- Bitácora, lápiz, regla y calculadora
- 1 servo SG90 (para medirlo)
- Regla o calibrador en milímetros
- Computadora con Blender y mouse con rueda

## Parte 1 · ¿Qué es una escala? (15 min)

Una maqueta es una copia pequeña de algo real. La **escala** dice cuántas veces más pequeña es. Usaremos **1:200**: 1 cm de la maqueta representa 200 cm (2 m) del puente real.

> Medida de la maqueta = Medida real ÷ 200

Prueben la animación: cambien la medida real y miren cuánto mide en la maqueta.

:::animacion tipo="escala"
:::

## Parte 2 · Calcular el puente (20 min)

Pasa las medidas del Tower Bridge a centímetros y divide entre 200:

1. **Metros a centímetros:** multiplica por 100 (1 m = 100 cm). Por ejemplo, 61 m × 100 = 6100 cm.
2. **A escala:** divide los centímetros entre 200 con la calculadora.
3. La primera fila ya está resuelta como ejemplo. Completen las demás de la misma forma.

:::tabla id="g2-escala"
| Parte | Medida real | En cm | ÷ 200 = maqueta (cm) |
| --- | --- | --- | --- |
| Tramo que se abre | 61 m | 6100 | 30,5 |
| Cada hoja (la mitad) | 30,5 m | | |
| Altura de las torres | 65 m | | |
| Ancho del puente | 18 m | | |
:::

:::pregunta id="g2-p1"
Si la torre de nuestra maqueta midiera 50 cm, ¿cuánto mediría la torre real con escala 1:200?
:::

## Parte 3 · El boceto (20 min)

Dibuja el puente **de lado** en la bitácora con las medidas de la tabla:

"De lado" es como si lo vieras desde la orilla del río: las torres paradas, el río en medio y las hojas cruzándolo. Si la hoja no alcanza, dibujen a una escala más pequeña (por ejemplo, todo a la mitad) y escriban la medida real de la maqueta junto a cada parte.

1. Las dos torres y la base.
2. Las dos hojas del puente, abajo (cerradas) y con línea punteada arriba (abiertas).
3. Marca dónde va cada **servo** (en el punto de giro de cada hoja).
4. Marca dónde van el **sensor**, el **semáforo** y el **buzzer**.

[IMAGEN 2.1: ejemplo de boceto lateral del puente con medidas, hojas abiertas en punteado y ubicación de servos y sensor]

:::foto id="g2-boceto"
Foto del boceto del equipo.
:::

## Parte 4 · Conociendo Blender (15 min)

1. Abre Blender. Borra el cubo inicial (selecciónalo y presiona **X**).
   - Si aparece una ventana de bienvenida, haz clic fuera de ella.
   - Con el mouse sobre la vista 3D: **X → Borrar** (o la tecla Suprimir).
2. Pon las medidas en milímetros: **Propiedades de la escena → Unidades**: Escala de unidades **0.001**, Longitud **Milímetros**.
   - En el panel **Propiedades** (abajo a la derecha), clic en el icono de **Escena** (un cono con dos esferitas) y abre **Unidades**.
   - **Escala de unidades:** escribe 0.001 y Enter. **Longitud:** Milímetros.
3. Guarda: **Archivo → Guardar como** → `equipo_NOMBRE_puente.blend`. Desde ahora guarda seguido con **Ctrl + S**.

Pon el mouse sobre la vista 3D y prueba cada acción:

| Acción | Cómo se hace |
| --- | --- |
| Girar la vista | Mantener la rueda del mouse y mover |
| Mover la vista | Shift + rueda y mover |
| Acercar o alejar | Girar la rueda |
| Vista de frente / lado / arriba | Teclas 1, 3 y 7 del teclado numérico |
| Mostrar panel de medidas | Tecla N |

- **¿Sin teclado numérico?** Usa el dibujo de ejes arriba a la derecha de la vista: bolita **Y** (verde) = de frente, **X** (roja) = de lado, **Z** (azul) = desde arriba. O el menú **Vista → Punto de vista**.
- **¿Te perdiste?** Tecla **Inicio** (Home) con el mouse sobre la vista.
- El **Panel N** tiene la pestaña **Elemento** (Posición, Rotación, Dimensiones). El **Listado**, arriba a la derecha, es la lista de objetos.

[IMAGEN 2.2: interfaz de Blender con sus partes señaladas: vista 3D, Outliner, panel de propiedades y panel N]

## Parte 5 · Modelar el soporte del servo (35 min)

El soporte es una caja con un hueco donde entra el servo, y se pega en la base al pie de cada torre.

1. **Mide el servo:**
   - Con el calibrador: abre las puntas, pon el servo entre ellas y ciérralas hasta que lo toquen, sin apretar. Lee los milímetros.
   - Mide solo la cajita (el **cuerpo**), sin las pestañas de los lados y sin el eje.

| Medida del servo | Valor (mm) |
| --- | --- |
| Largo del cuerpo | |
| Ancho del cuerpo | |
| Alto del cuerpo | |

Las medidas se escriben en el **Panel N → Elemento**: doble clic en la casilla, escribe y Enter. Decimales con **punto** (23.4).

2. **Caja exterior:** Shift + A → Malla → Cubo. En el panel N: Dimensiones X = 32, Y = 18, Z = 20 · Posición Z = 10.
   - Llámala `soporte` (doble clic en su nombre en el Listado).
3. **Hueco:** otro cubo de X = 23.4, Y = 12.8, Z = 18 en Posición Z = 12. Mide un poco más que el servo: es la **holgura**.
   - Llámalo `hueco`. Compara sus medidas con las del servo que mediste.
4. Selecciona la caja exterior → Modificadores (llave) → **Booleana** → **Diferencia** → objeto: el cubo del hueco. Oculta el hueco con **H** y aplica el modificador.
   - Clic en el `soporte` → en Propiedades, icono de la **llave inglesa azul** → **Agregar modificador → Generar → Booleana**.
   - Revisa que diga **Diferencia** y en **Objeto** elige `hueco`.
   - Clic en el `hueco` y **H**: ya ves el soporte hueco.
   - Clic otra vez en el `soporte` → flechita **⌄** del modificador → **Aplicar**.
   - Borra el `hueco`: clic derecho sobre su nombre en el Listado → **Borrar**.

Miren en la animación qué hace cada modo del modificador Booleana:

:::animacion tipo="booleano"
:::

[IMAGEN 2.3: soporte del servo terminado en Blender con su hueco]

5. Guarda como `equipo_NOMBRE_puente.blend` y exporta: Archivo → Exportar → STL, con *Sólo lo seleccionado*. Nombre: `equipo_NOMBRE_soporte.stl`. Se imprimen **dos**.
   - Guarda con **Ctrl + S**. Haz clic solo en el `soporte`.
   - **Archivo → Exportar → STL (.stl)**, activa **Sólo lo seleccionado** a la derecha, escribe el nombre y presiona **Exportar STL**.
   - Se exporta uno solo: el docente imprime dos copias.

## ¿Lo logramos? (5 min)

:::checklist id="g2-logramos"
- [ ] Completamos la tabla de escala.
- [ ] El boceto tiene medidas y la ubicación de servos y sensor.
- [ ] Sabemos mover la vista en Blender.
- [ ] El soporte tiene su hueco y está exportado en STL.
:::

## Reto extra

Haz una ranura de 8 × 4 mm en una pared del soporte para que salgan los cables del servo.

Pista: otro modificador Booleana en modo Diferencia con un cubo de 8 mm de ancho y 4 mm de alto, un poco más largo que el grueso de la pared para que la atraviese, colocado arriba en una de las paredes cortas.

## Bitácora (10 min)

:::pregunta id="g2-b1"
¿Para qué sirve hacer una maqueta a escala antes de construir algo real?
:::

:::pregunta id="g2-b2"
¿Por qué el hueco es un poco más grande que el servo?
:::

Antes de irse, suban el `.blend` y el `.stl` (juntos en un `.zip`: selecciónenlos → clic derecho → **Comprimir en archivo ZIP**). La próxima semana seguirán en este archivo.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Resultados: hoja 15,25 cm; torres 32,5 cm; ancho 9 cm. g2-p1: 50 × 200 = 10 000 cm = 100 m.
- Si las torres a escala quedan muy altas para la base, se pueden hacer de 25 cm: comentar que en las maquetas a veces se ajusta la escala de alguna parte.
- Imprimir los soportes esta semana (≈30 min cada uno).
- Tiempo total: 15 + 20 + 20 + 15 + 35 + 5 + 10 = 120 minutos.
:::
