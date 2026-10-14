---
titulo: La cancha y el trofeo en 3D
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · La cancha y el trofeo en 3D

## Objetivo del día

Construir la cancha con sus líneas a escala, colocar las porterías impresas y escanear en 3D un objeto real (un trofeo o mascota) para imprimirlo.

**Al terminar tendremos:** la cancha armada con sus porterías y el modelo 3D escaneado listo para imprimir.

## Materiales del equipo

- Base de cartón grueso, cartón pluma o MDF de 60 × 40 cm
- Fomi o cartulina verde, marcador o cinta blanca
- Tiras de cartón de 3 cm de alto para las bandas laterales
- Dos porterías impresas
- Regla, compás, tijeras, pegamento caliente
- Celular con app de escaneo 3D (por ejemplo Polycam, KIRI Engine o Scaniverse)
- Objeto para escanear: trofeo pequeño, figura o mascota

## Parte 1 · La cancha (40 min)

1. Corta la base y fórrala con el fomi verde.
2. Traza las líneas con las medidas a escala del sábado 2:

| Línea | Medida en la maqueta |
| --- | --- |
| Rectángulo de la cancha | 52,5 × 34 cm |
| Círculo central (radio) | |
| Área grande | |

3. Pega las **bandas laterales** (tiras de 3 cm) para que la pelota no se salga. Deja abiertos los huecos de las porterías.
4. Pega las porterías en el centro de cada lado corto. La ventana del sensor debe quedar **mirando hacia la cancha**.
5. Haz un agujero pequeño detrás de cada portería para pasar los cables.

[IMAGEN 4.1: cancha armada con líneas blancas a escala, bandas laterales y las dos porterías pegadas]

:::pregunta id="g4-p1"
¿Por qué las bandas laterales no deben tapar el hueco de las porterías?
:::

## Parte 2 · ¿Qué es el escaneo 3D? (10 min)

Un escáner 3D toma muchas fotos de un objeto desde todos los lados y calcula su forma. Así obtenemos un modelo 3D de algo real **sin modelarlo a mano**. Se usa en museos, en medicina y en los videojuegos.

:::animacion tipo="escaneo-3d"
:::

## Parte 3 · Escanear el trofeo (30 min)

1. Pon el objeto sobre una mesa con buena luz y un fondo sin muchos detalles.
2. Abre la app de escaneo en modo **foto** (fotogrametría).
3. Camina alrededor del objeto tomando fotos: **una vuelta abajo, una a media altura y una desde arriba**. Al menos 40 fotos.
4. Procesa el modelo y expórtalo como **OBJ** o **STL**.

[IMAGEN 4.2: estudiante escaneando un trofeo pequeño con el celular girando a su alrededor]

| Intento | Número de fotos | ¿Cómo salió el modelo? |
| --- | --- | --- |
| 1 | | |
| 2 | | |

:::pregunta id="g4-p2"
¿Qué partes del objeto fueron más difíciles de escanear? ¿Por qué crees que pasa?
:::

## Parte 4 · Limpiar y escalar en Blender (25 min)

1. **Archivo → Importar → OBJ** (o STL).
2. Borra lo que no sea el objeto (la mesa escaneada): en modo edición selecciona esas caras y bórralas (**X**).
3. Escálalo para que mida **6 cm de alto** (panel **N** → Dimensiones Z = 60).
4. Si tiene agujeros, usa el modificador **Remallado** (Remesh) en modo **Vóxel** para cerrarlo.
5. Agrega una **base**: cilindro de 30 mm de diámetro y 5 mm de alto debajo del objeto. Une con **Ctrl + J**.
6. Exporta como **equipo_NOMBRE_trofeo.stl**.

[IMAGEN 4.3: trofeo escaneado en Blender, limpio, escalado a 6 cm y con base cilíndrica]

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] La cancha tiene sus líneas a escala.
- [ ] Las porterías están pegadas con la ventana del sensor hacia la cancha.
- [ ] Escaneamos el objeto en 3D.
- [ ] Limpiamos, escalamos y exportamos el trofeo.
:::

## Reto extra

Escanea a un **compañero** (de los hombros hacia arriba) y conviértelo en un jugador miniatura de 4 cm para la cancha.

## Bitácora (10 min)

:::foto id="g4-foto"
Foto de la cancha con las porterías.
:::

:::pregunta id="g4-b1"
¿Qué diferencia hay entre modelar un objeto y escanearlo? ¿Cuándo conviene cada uno?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y el modelo escaneado (.stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Instalar la app de escaneo antes de la clase en al menos un celular por equipo; Polycam y KIRI tienen modo gratuito con límite de escaneos.
- Objetos brillantes, transparentes o negros escanean mal: sugerir cubrirlos con talco o elegir otro objeto.
- Si el escaneo falla, pueden modelar un trofeo con Torno (modificador Screw) a partir de un perfil.
- Durante la semana: imprimir los trofeos (opcional) para el torneo del sábado 9.
- Tiempo total: 40 + 10 + 30 + 25 + 5 + 10 = 120 minutos.
:::
