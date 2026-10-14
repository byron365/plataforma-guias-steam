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

:::tabla id="g12-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · ¿Dónde se usa? (25 min)

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

:::tabla id="g12-ficha"
| Condición | Lo que necesita | Ajuste en el código |
| --- | --- | --- |
| Humedad de la tierra | | UMBRAL_SECO = |
| Cantidad de agua | | TIEMPO_RIEGO = |
| Temperatura máxima | | TEMP_ABRIR = |
| Temperatura para cerrar | | TEMP_CERRAR = |
| Horas de luz | | LUZ_ON = |
:::

## Parte 4 · Probar los ajustes (25 min)

Cambien los valores en el código y prueben que el invernadero responde a la nueva planta:

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

## Bitácora (15 min)

:::pregunta id="g12-b1"
¿Qué cambiaría en la estructura del invernadero para la planta que elegimos?
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- Al terminar, devolver los ajustes originales para no dañar la planta del proyecto.
- Valores orientativos: cactus riega poco (umbral alto); lechuga quiere tierra siempre húmeda y menos calor (abrir a 25 °C).
- Tiempo total: 10 + 25 + 40 + 25 + 5 + 15 = 120 minutos.
:::
