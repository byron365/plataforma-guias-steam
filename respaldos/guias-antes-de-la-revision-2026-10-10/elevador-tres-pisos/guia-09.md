---
titulo: Centralizado contra distribuido
guia: 9
sabado: 9
sesion: Documentación técnica
duracion: 120
---

# Guía 9 · Centralizado contra distribuido

## Objetivo del día

Escribir el documento técnico del elevador, con la comparación argumentada entre las dos arquitecturas, los esquemáticos y los resultados de las pruebas.

**Al terminar tendremos:** el documento técnico completo, con la comparación de arquitecturas basada en datos.

## Materiales del equipo

- Tablas de todas las guías
- Elevador (para revisar conexiones)
- Computadora

## Parte 1 · La comparación con datos (40 min)

Completa la tabla del sábado 2 con lo que **medimos** en el sábado 5:

:::tabla id="g9-comparacion"
| Criterio | Centralizada | Distribuida | ¿Cuál gana? |
| --- | --- | --- | --- |
| Cables que suben por la torre | | | |
| Pines usados en la central | | | |
| Pines libres en la central | | | |
| Pasos para agregar un 4.º piso | | | |
| ¿Qué pasa si falla un piso? | | | |
| ¿Qué pasa si falla la central? | | | |
| Número de programas a mantener | | | |
| Costo aproximado | | | |
:::

:::pregunta id="g9-p1"
Escribe un párrafo argumentando cuál arquitectura elegirías para un edificio real de 20 pisos y por qué. Usa al menos tres datos de la tabla.
:::

:::pregunta id="g9-p2"
¿En qué caso elegirías la versión centralizada?
:::

## Parte 2 · Esquemáticos (35 min)

Dibuja dos esquemáticos: la **central** (fuente, fusible, LM2596, L298N, motor, sensores, paro) y un **nodo de piso** (botón, LED, display).

[IMAGEN 9.1: esquemático de la central del elevador con el L298N, el motor, los sensores de piso, los finales de carrera y el paro]

:::tabla id="g9-conexiones"
| Nodo | Componente | Pin | Destino |
| --- | --- | --- | --- |
| Central | L298N ENA, IN1, IN2 | | |
| Central | Sensores de piso | | |
| Central | Finales de carrera | | |
| Central | Paro / rearme | | |
| Piso | Botón, LED | | |
| Piso | Segmentos a–g | | |
| Todos | Bus I2C | | |
:::

:::foto id="g9-esquematicos"
Esquemáticos del equipo.
:::

## Parte 3 · Seguridad documentada (20 min)

:::tabla id="g9-seguridad"
| Riesgo | Protección | ¿Cómo se probó? | Resultado |
| --- | --- | --- | --- |
| La cabina choca arriba | | | |
| La cabina choca abajo | | | |
| Alguien necesita detenerlo ya | | | |
| Falla un nodo de piso | | | |
| Falla el bus I2C | | | |
| Cortocircuito en la fuente | | | |
:::

## Parte 4 · Resultados y ficha (20 min)

:::tabla id="g9-ficha"
| Característica | Valor |
| --- | --- |
| Arquitectura final | |
| Pisos y direcciones I2C | |
| Error de parada promedio | |
| Tiempo de 1 a 3 | |
| Espera promedio / máxima | |
| Corriente del motor con carga | |
| Fuente y protecciones | |
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9-logramos"
- [ ] Comparamos las arquitecturas con datos.
- [ ] Escribimos el argumento para un edificio real.
- [ ] Tenemos los dos esquemáticos.
- [ ] Documentamos la seguridad y los resultados.
:::

:::docente
- La comparación argumentada es uno de los criterios de evaluación del proyecto: pedir datos, no opiniones.
- g9-p2: un sistema pequeño que no crecerá, donde el costo y la simplicidad pesan más.
- Tiempo total: 40 + 35 + 20 + 20 + 5 = 120 minutos.
:::
