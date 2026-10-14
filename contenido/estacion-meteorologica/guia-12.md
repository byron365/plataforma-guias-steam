---
titulo: Nuestra estación en el mundo
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · Nuestra estación en el mundo

## Objetivo del día

Investigar en qué otros lugares se usa una estación como la nuestra y hacer un experimento real: comparar dos lugares de la escuela.

**Al terminar tendremos:** datos de dos lugares de la escuela comparados en una gráfica y una propuesta de nueva aplicación.

## Materiales del equipo

- Estación completa (con cables largos o batería/power bank)
- Computadora con internet y hoja de cálculo

## Parte 1 · Investigación (25 min)

Busquen en internet y completen:

Para cada lugar, busquen frases como *"control de temperatura en museos"* o *"humedad en bodegas de alimentos"*. Escriban con sus palabras qué mediría la estación y para qué sirve ese dato (no copien textos completos).

:::tabla id="g12-investigacion"
| Lugar | ¿Qué mediría la estación? | ¿Para qué sirve ese dato? |
| --- | --- | --- |
| Un invernadero o cultivo | | |
| Un museo o biblioteca | | |
| Un centro de datos (servidores) | | |
| Un hospital o farmacia | | |
| Una bodega de alimentos | | |
:::

:::pregunta id="g12-p1"
En El Salvador, ¿qué institución mide el clima del país? ¿Cuántas estaciones crees que tiene?
:::

## Parte 2 · Reto: dos lugares de la escuela (50 min)

Elijan **dos lugares** distintos de la escuela (por ejemplo: el salón y el patio, la sombra de un árbol y el sol, junto a una ventana y lejos de ella).

Una **hipótesis** es lo que creemos que va a pasar, antes de medir. Por ejemplo: "En el patio al sol hará más calor y habrá menos humedad que en el salón". Escriban la suya:

Nuestra hipótesis: ______

1. Cambia `ESPERA` a **10000**.
   - Abran su programa más reciente (`equipo_NOMBRE_v2`, Guía 11) y en **Ajustes del equipo** pongan `const int ESPERA = 10000;`. Súbanlo.
2. Lleva la estación al **lugar 1**. Espera 5 minutos y registra **10 minutos** de datos.
   - Si llevan la computadora: abran el Monitor serie y, al terminar, copien los datos como en la Guía 7.
   - Si no: la estación funciona con un power bank conectado al USB (pidan uno al docente).
   - Los 5 minutos de espera son para que el sensor se acostumbre al lugar.
3. Repite en el **lugar 2**.
4. Si no hay computadora en ese lugar, anota a mano lo que muestra la pantalla cada minuto.
   - En la tabla, escriban arriba el nombre de cada lugar y anoten temperatura, humedad y luz en los minutos indicados (cronómetro del celular).

:::tabla id="g12-lugares"
| Minuto | Lugar 1: ______ (°C) | Lugar 2: ______ (°C) | Humedad L1 | Humedad L2 | Luz L1 | Luz L2 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |
| 2 | | | | | | |
| 4 | | | | | | |
| 6 | | | | | | |
| 8 | | | | | | |
| 10 | | | | | | |
:::

[IMAGEN 12.1: estación meteorológica midiendo en el patio de la escuela a la sombra de un árbol]

5. Hagan una gráfica de línea con las dos temperaturas juntas.
   - En la hoja de cálculo: columna A los minutos, columna B las temperaturas del lugar 1 y columna C las del lugar 2. Seleccionen las tres columnas → **Insertar → Gráfico → Línea**.
   - Para la **diferencia promedio**: calculen el promedio de cada lugar (`=PROMEDIO(B:B)` y `=PROMEDIO(C:C)`) y resten uno menos el otro.

Tomen una captura: **Windows + Shift + S**, arrastren un rectángulo sobre la gráfica, péguenla en Paint (Ctrl + V) y guárdenla; o tomen una foto de la pantalla.

:::foto id="g12-grafica"
Captura de la gráfica comparando los dos lugares.
:::

:::pregunta id="g12-p2"
¿Se cumplió nuestra hipótesis? ¿Cuál fue la diferencia promedio entre los dos lugares?
:::

## Parte 3 · Nueva aplicación (20 min)

Imaginen que alguien les pide usar su estación para otra cosa. Elijan una aplicación de la investigación y describan:

:::tabla id="g12-propuesta"
| Pregunta | Respuesta |
| --- | --- |
| ¿Dónde se usaría? | |
| ¿Qué cambiaría en el código? (límites FRÍO / CALOR) | |
| ¿Qué cambiaría en la carcasa? | |
| ¿Qué sensor nuevo agregarían? | |
| ¿Quién usaría los datos? | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Completamos la investigación.
- [ ] Medimos en dos lugares de la escuela.
- [ ] Hicimos la gráfica comparativa.
- [ ] Escribimos la propuesta de nueva aplicación.
:::

## Reto extra

Cambien los límites `FRIO` y `CALOR` para la aplicación que eligieron (por ejemplo, un museo necesita entre 18 °C y 22 °C) y prueben que el LED reacciona correctamente.

## Bitácora (15 min)

:::pregunta id="g12-b1"
¿Por qué es importante tener una hipótesis antes de medir?
:::

:::pregunta id="g12-b2"
¿Qué aplicación de la estación les pareció más interesante y por qué?
:::

Antes de irse, guarden la hoja de cálculo como `.xlsx` y súbanla aquí.

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g12-p1: el MARN (Ministerio de Medio Ambiente y Recursos Naturales), a través del Observatorio Ambiental, opera la red de estaciones meteorológicas. Verificar la cifra actual con los estudiantes en su sitio web.
- Para medir fuera del salón: power bank por USB o pila de 9 V en el jack del Arduino.
- Coordinar los lugares para que no todos los equipos salgan al mismo sitio.
- Tiempo total: 25 + 50 + 20 + 5 + 15 = 115 minutos (5 de margen para traslados).
:::
