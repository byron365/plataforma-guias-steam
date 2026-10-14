---
titulo: Cultivar en otros lugares
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · Cultivar en otros lugares

## Objetivo del día

Investigar dónde se usa el riego automático y adaptar nuestro invernadero a otra planta o a un terrario para mascotas.

**Al terminar tendremos:** la ficha de aplicaciones y una "ficha de cultivo" con los ajustes del invernadero para otro uso.

## Materiales del equipo

- Invernadero completo
- Computadora con internet

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g12-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · ¿Dónde se usa? (25 min)

Para cada lugar, piensen (o busquen en internet) qué condición hay que cuidar (agua, temperatura, luz…) y qué sensores de los que conocemos usarían.

:::tabla id="g12-aplicaciones"
| Lugar | ¿Qué se controla? | ¿Qué sensores usaría? |
| --- | --- | --- |
| Jardín de una casa | | |
| Finca de café o de hortalizas | | |
| Terrario de una tortuga o reptil | | |
| Huerto escolar | | |
| Cancha de fútbol | | |
:::

[IMAGEN 12.1: sistema de riego por goteo en un cultivo de hortalizas]

:::pregunta id="g12-p1"
En El Salvador, ¿qué cultivo crees que se beneficiaría más del riego automático? ¿Por qué?
:::

## Parte 3 · Ficha de cultivo (40 min)

Cada planta o animal necesita condiciones distintas. Elijan uno e investiguen:

:::opciones id="g12-eleccion"
¿Para qué adaptaremos el invernadero?
- Cactus
- Lechuga
- Tomate
- Terrario de tortuga
:::

1. Busquen en internet frases como *"cuidados de la lechuga riego temperatura"* o *"temperatura terrario tortuga"* (con la opción que eligieron), o usen el material que entregue el docente.
2. En **Lo que necesita**, escriban con sus palabras lo que encontraron (por ejemplo: "tierra siempre húmeda", "máximo 25 °C", "10 horas de luz").
3. En **Ajuste en el código**, escriban el número que pondrían en esa constante. Piensen en sus mediciones: el umbral sale de su calibración de la Guía 6, el tiempo de riego de su tabla de ml, y las horas de luz se pasan a milisegundos (horas × 60 × 60 × 1000).

:::tabla id="g12-ficha"
| Condición | Lo que necesita | Ajuste en el código |
| --- | --- | --- |
| Humedad de la tierra | | UMBRAL_SECO = ____ |
| Cantidad de agua | | TIEMPO_RIEGO = ____ |
| Temperatura máxima | | TEMP_ABRIR = ____ |
| Temperatura para cerrar | | TEMP_CERRAR = ____ |
| Horas de luz | | LUZ_ON = ____ |
:::

## Parte 4 · Probar los ajustes (25 min)

Cambien los valores en el código y prueben que el invernadero responde a la nueva planta:

1. Abran `equipo_NOMBRE_v2` (Guía 11) y guárdenlo como `equipo_NOMBRE_otra_planta`, para no perder los ajustes de su planta.
2. En **Ajustes del equipo**, cambien los valores por los de su ficha. Para probar la luz en clase, dejen `LUZ_ON` en un minuto (60000); su valor real queda anotado en la ficha.
3. Suban el código y prueben: riego con el vaso de tierra seca (manguera en un vaso), ventana con la lámpara (con el docente) y luz esperando un ciclo.
4. Al terminar, vuelvan a subir `equipo_NOMBRE_v2` para que su planta siga con sus ajustes de siempre.

| Prueba | ¿Funcionó con los nuevos valores? |
| --- | --- |
| Riego | |
| Ventana | |
| Luz | |

:::pregunta id="g12-p2"
¿Por qué es útil tener los ajustes juntos al inicio del código, como constantes?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Completamos la tabla de aplicaciones.
- [ ] Investigamos las necesidades de otra planta o animal.
- [ ] Cambiamos los ajustes del código y los probamos.
:::

## Reto extra

Haz una tabla con los ajustes para **tres** plantas distintas y compárenlas: ¿cuál necesita más agua? ¿cuál más calor?

Háganla en la bitácora o en una hoja de cálculo: una columna por planta y una fila por ajuste.

## Bitácora (15 min)

:::pregunta id="g12-b1"
¿Qué cambiaría en la estructura del invernadero para la planta que elegimos?
:::

Antes de irse, suban `equipo_NOMBRE_otra_planta` aquí.

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Al terminar, devolver los ajustes originales para no dañar la planta del proyecto.
- Valores orientativos: cactus riega poco (umbral alto); lechuga quiere tierra siempre húmeda y menos calor (abrir a 25 °C).
- Tiempo total: 10 + 25 + 40 + 25 + 5 + 15 = 120 minutos.
:::
