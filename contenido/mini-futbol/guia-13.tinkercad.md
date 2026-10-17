---
titulo: El cierre de la temporada
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · El cierre de la temporada

## Objetivo del día

Hacer la imagen final de la cancha en Tinkercad, dejar el código final comentado, completar la bitácora y reflexionar.

**Al terminar tendremos:** la imagen final, el código final guardado y la bitácora completa.

## Materiales del equipo

- Computadora con internet, cuenta de Tinkercad y Arduino IDE
- Medidas de la cancha (Guía 2)
- Bitácora de todos los sábados

## Parte 1 · Imagen final (35 min)

Una imagen final (en Blender se llama *render*) es una "foto" del modelo 3D con colores. Vamos a armar en Tinkercad una **maqueta** de la cancha con las porterías y la pelota, y a sacarle una "foto".

**Recordatorio de Codeblocks** (vuelvan aquí si se les olvida algo):

- Cada forma nace **centrada** en X = 0, Y = 0, Z = 0. **Mover** mueve la última forma que agregaron.
- En el **Cubo**, el primer **A** es el ancho (X), **L** el largo (Y) y el segundo **A** el alto (Z). Dejen **arista = 0**.
- **Color de una forma:** el **círculo de color** de su bloque **Añadir**: clic y elijan el color.
- **Color de un grupo:** el bloque **Definir color** (de **Modificar**) con **Rojo**, **Verde** y **Azul** (de 0 a 255) pinta lo que está seleccionado.
- **Seleccionar todo** selecciona **todo** lo que ya existe. Por eso las porterías se hacen **primero**: así al agruparlas no se pega nada más.

1. **Diseño nuevo:** **+ Crear → Codeblocks**, con el nombre `equipo_NOMBRE_maqueta`.
2. **Portería azul** (en el lado izquierdo, con la boca hacia el centro de la cancha). Son cinco **Cubos**, cada uno con su **Mover**:

| Pieza | Cubo (A, L, A) | Mover (X, Y, Z) |
| --- | --- | --- |
| Poste 1 | 5, 5, 50 | −262.5, 50, 25 |
| Poste 2 | 5, 5, 50 | −262.5, −50, 25 |
| Travesaño | 5, 105, 5 | −262.5, 0, 50 |
| Fondo | 3, 100, 50 | −302.5, 0, 25 |
| Piso | 40, 100, 3 | −282.5, 0, 1.5 |

   - Debajo: **Seleccionar todo**, **Group Selection** y **Definir color** con **0, 0, 255** (azul).
3. **Portería roja** en espejo, como en la Guía 2:
   - **Copiar**; **Escala:** **X = −1**, **Y = 1**, **Z = 1** (desde: centro); **Mover: X 564, Y 0, Z 0** (la pasa al otro extremo); **Definir color** con **255, 0, 0** (rojo).
   - Ejecuten con **▷**: deben verse las dos porterías frente a frente.
4. **Cancha:** un **Cubo** con primer **A = 525**, **L = 340**, segundo **A = 2** y **Mover: X 0, Y 0, Z −1** (su cara de arriba queda en Z = 0). Círculo de color: **verde**.
5. **Líneas blancas** de 3 mm de ancho y 1 mm de alto, subidas a **Z = 0.5** para que se vean encima del verde. Círculo de color: **blanco**.
   - **Media cancha:** Cubo 3, 340, 1 con **Mover: X 0, Y 0, Z 0.5**.
   - **Bordes largos:** Cubo 525, 3, 1 con **Mover Y 168.5** (Z 0.5); otro igual con **Y −168.5**.
   - **Bordes cortos:** Cubo 3, 340, 1 con **Mover X 261** (Z 0.5); otro igual con **X −261**.
   - **Áreas grandes:** con sus medidas de la Guía 2 (pasen los cm a mm multiplicando por 10), tres Cubos por área: uno paralelo al borde corto (del largo del área) y dos que lo unen al borde (del fondo del área). Calculen sus Mover desde el borde corto (X = ±261).
   - **Círculo central:** un **Tubo** con **Radio = 46** (el radio de 46 mm de su tabla), **Grosor del muro = 3**, **A = 1** y **Mover: X 0, Y 0, Z 0.5**. Queda un anillo de 3 mm.
6. **Pelota:** una **Esfera** con **Radio = 20** (40 mm de diámetro) y **Mover: X 0, Y 0, Z 20** (apoyada en la cancha). Círculo de color: blanco.
7. **Trofeo** (opcional): el trofeo escaneado no se puede poner en Codeblocks. Pueden hacer uno sencillo a un costado: **Cilindro** Radio 15, A 5 con **Mover X 0, Y −220, Z 2.5**; **Cilindro** Radio 3, A 25 con **Mover X 0, Y −220, Z 17.5**; y **Cono** (Radio inferior 8, Radio superior 15, A 20) con **Mover X 0, Y −220, Z 40**. Color dorado o el que quieran.
8. **Guardar la imagen:**
   - **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**.
   - Giren la vista hasta ver la cancha desde una esquina ("Incline y aplique zoom para obtener la vista perfecta").
   - Presionen **Captura de pantalla**. La imagen queda en **Descargas**: cámbienle el nombre a `equipo_NOMBRE_final.png`.

[IMAGEN 13.1T: maqueta de la cancha de mini fútbol en Tinkercad con las porterías azul y roja y la pelota]

:::foto id="g13-render"
Imagen final del equipo.
:::

## Parte 2 · Código final con comentarios (25 min)

Abran su programa más reciente del marcador y revisen punto por punto. Un **comentario** empieza con `//`: el Arduino no lo lee, es una nota para las personas.

:::checklist id="g13-codigo"
- [ ] Encabezado con proyecto, equipo, fecha y docente.
- [ ] Comentarios en cada función y bloque del loop.
- [ ] Los ajustes del equipo (DURACION, PAUSA_GOL, GOLES_GANAR) juntos y explicados.
- [ ] Guardado como **equipo_NOMBRE_futbol_final.ino**.
:::

Ejemplo de encabezado (escríbanlo al principio del programa, con el nombre de su equipo):

```cpp
// Mini fútbol con marcador electrónico
// Equipo: ______
// STEAM Robotics Academy · Básico II · Docente: Bairon Alas
// Sensores IR en cada portería; marcador OLED, tiempo y buzzer.
```

Para el último punto: **Archivo → Guardar como** → `equipo_NOMBRE_futbol_final`. Verifiquen (✓) que sigue sin errores.

## Parte 3 · Repaso de la bitácora (25 min)

En la plataforma, cada guía guarda sus respuestas y fotos: ábranlas una por una. Para cada grupo de sábados, escriban en una frase lo más importante que hicieron.

:::tabla id="g13-linea"
| Sábado | Lo más importante que hicimos |
| --- | --- |
| 1-3 | |
| 4-6 | |
| 7-8 | |
| 9-10 | |
| 11-12 | |
:::

## Parte 4 · Reflexión (20 min)

Respondan con sinceridad: no hay respuestas buenas o malas. Las preguntas individuales las responde cada quien desde su propia sesión.

:::pregunta id="g13-p1"
¿Cuál fue el problema más difícil del proyecto y cómo lo resolvimos?
:::

:::pregunta id="g13-p2" individual="si"
¿Qué habilidad mejoré más en este proyecto? ¿Por qué?
:::

:::pregunta id="g13-p3" individual="si"
Un consejo para un estudiante que empezará este proyecto el próximo año:
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
- [ ] Guardamos la imagen final.
- [ ] El código final tiene comentarios.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Hagan una **animación** corta de la maqueta girando, para mostrarla en la presentación.

Pasos: **Compartir** → **Imagen o vídeo** → **GIF animado**. La animación queda en **Descargas**.

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro mini fútbol con marcador electrónico?
:::

Antes de irse, suban la imagen `.png` y `equipo_NOMBRE_futbol_final` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La maqueta queda guardada en Tinkercad (**Diseños → Codeblocks**). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar imágenes finales, códigos y gráficas para el portafolio del nivel.
- **Versión Tinkercad (Codeblocks):** Codeblocks no importa archivos STL, por eso la escena es una maqueta con formas sencillas; el trofeo escaneado se sustituye por uno simple (opcional). Las porterías se hacen primero porque Seleccionar todo agrupa todo lo que ya existe.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::
