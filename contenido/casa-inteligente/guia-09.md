---
titulo: El manual de la casa
guia: 9
sabado: 9
sesion: Documentación técnica
duracion: 120
---

# Guía 9 · El manual de la casa

## Objetivo del día

Escribir el documento técnico de la casa: cada equipo documenta su nodo y entre todos el sistema completo, con diagramas, protocolo y presupuesto de energía medido.

**Al terminar tendremos:** el documento técnico de la casa con un capítulo por nodo.

## Materiales del equipo

- Todas las tablas de las guías anteriores
- Multímetro, casa integrada
- Computadora

## Parte 1 · Capítulo de nuestro nodo (45 min) · cada equipo

Llenen cada sección con los datos de **su** nodo. Todo lo tienen en las guías anteriores: el contrato (Guía 2), los componentes y protecciones (Guías 3 y 4) y el código (Guías 5 y 8).

:::tabla id="g9-nodo"
| Sección | Contenido |
| --- | --- |
| Función del nodo | |
| Dirección I2C | |
| Sensores | |
| Cargas y cómo se controlan | |
| Protecciones | |
| Modo automático | |
| Órdenes que acepta | |
| Estado que envía (2 bytes) | |
:::

Agreguen una fila por cada cable de su nodo (revisen lo que está armado, no solo las guías: si algo cambió, manda lo construido):

:::tabla id="g9-conexiones"
| Componente | Pin | Destino |
| --- | --- | --- |
| | | |
| | | |
| | | |
| | | |
:::

[IMAGEN 9.1: esquemático del nodo cuarto con el MOSFET, el diodo, el ventilador de 12 V y el DHT11]

Dibujen el **esquemático** de su nodo: el circuito con símbolos (no con dibujos de las piezas), con el número de pin junto a cada cable. Tómenle foto y súbanla:

:::foto id="g9-esquematico"
Esquemático de nuestro nodo.
:::

## Parte 2 · Presupuesto de energía medido (30 min) · todo el grupo

Copien lo calculado en la Guía 3 y lo medido en las Guías 6 y 7. **Diferencia** = medido − calculado.

:::tabla id="g9-energia"
| Carga | Calculado (sábado 3, mA) | Medido (mA) | Diferencia |
| --- | --- | --- | --- |
| Tira LED al 100 % | | | |
| Ventilador al 100 % | | | |
| Solenoide | | | |
| Lógica (5 V) | | | |
| Todo encendido | | | |
:::

:::pregunta id="g9-p1"
¿La fuente de 3 A tiene suficiente margen con todo encendido? ¿Cuánto?
:::

## Parte 3 · El sistema completo (30 min) · todo el grupo

1. **Diagrama de bloques final** (actualizado con lo construido).
2. **Contrato de mensajes** final (sábado 2) con cualquier cambio acordado.
3. **Escenas** disponibles y qué hace cada una.
4. **Bitácora de fallos del grupo**: los 5 más importantes.

Completen qué hace cada escena en cada habitación (está en `procesar()` de la central). Agreguen también la escena del grupo de la Guía 8 en su documento.

:::tabla id="g9-escenas"
| Mensaje | Escena | Sala | Cuarto | Entrada |
| --- | --- | --- | --- | --- |
| N | Noche | | | |
| F | Fuera | | | |
| C | En casa | | | |
| | | | | |
:::

:::foto id="g9-diagrama-final"
Diagrama de bloques final de la casa.
:::

## Parte 4 · Ficha técnica (10 min)

Y la ficha técnica con los datos finales de toda la casa:

:::tabla id="g9-ficha"
| Característica | Valor |
| --- | --- |
| Nodos y direcciones | |
| Enlaces (Bluetooth, I2C) | |
| Cargas de 12 V | |
| Fuente y fusible | |
| Consumo máximo medido | |
| Tiempo de respuesta medido | |
| Escenas | |
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9-logramos"
- [ ] Nuestro nodo tiene su capítulo y esquemático.
- [ ] El presupuesto de energía tiene valores medidos.
- [ ] Están el diagrama final, el contrato y las escenas.
:::

:::docente
- Un equipo coordina el documento general (sugerido: el de la central).
- Tiempo total: 45 + 30 + 30 + 10 + 5 = 120 minutos.
:::
