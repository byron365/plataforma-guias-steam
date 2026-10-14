---
titulo: El documento técnico
guia: 9
sabado: 9
sesion: Documentación técnica
duracion: 120
---

# Guía 9 · El documento técnico

## Objetivo del día

Escribir el documento técnico de la banda: diagramas, esquemáticos, protocolo, tabla de calibración, porcentaje de aciertos y bitácora de fallos.

**Al terminar tendremos:** el documento técnico completo de la banda clasificadora.

## Materiales del equipo

- Todas las tablas de las guías anteriores
- Computadora
- Banda (para revisar conexiones)

## Parte 1 · Diagrama de bloques final (20 min)

Saquen el diagrama de bloques de la Guía 2 y compárenlo con la banda que construyeron, bloque por bloque y cable por cable. En la tabla anoten **solo lo que cambió** (un bloque nuevo, una conexión distinta, un pin diferente) y por qué. Después corrijan el diagrama (o hagan uno nuevo, en limpio) y tómenle foto.

:::tabla id="g9-cambios"
| Bloque o conexión | En el diseño (sábado 2) | En lo construido | ¿Por qué cambió? |
| --- | --- | --- | --- |
| | | | |
| | | | |
:::

:::foto id="g9-diagrama"
Diagrama de bloques final.
:::

## Parte 2 · Esquemáticos (35 min)

Dibuja un esquemático por nodo. El de la etapa de potencia debe mostrar el MOSFET, las dos resistencias, el diodo y el fusible.

Un **esquemático** dibuja el circuito con símbolos (no con dibujos de las piezas). Pueden usar los símbolos de sus hojas de datos o pedirle al docente una hoja de símbolos. Escriban el número de pin junto a cada cable.

Para la tabla de conexiones, revisen los cables reales de su banda (no solo las guías): si algo cambió, manda lo que está armado.

[IMAGEN 9.1: esquemático de la etapa de potencia con el IRLZ44N, la resistencia de gate, la de 10 kΩ, el diodo de rueda libre y el motor]

:::tabla id="g9-conexiones"
| Nodo | Componente | Pin | Destino |
| --- | --- | --- | --- |
| Banda | MOSFET gate | | |
| Banda | Potenciómetro | | |
| Banda | Sensor IR | | |
| Clasificador | TCS34725 | SDA, SCL | |
| Clasificador | Servo | | |
| Clasificador | MAX7219 | DIN, CLK, CS | |
| Clasificador | Botón de paro | | |
| Ambos | Bus I2C | | |
:::

:::foto id="g9-esquematico"
Esquemáticos del equipo.
:::

## Parte 3 · Protocolo y buses (20 min)

Completen la tabla con lo que usaron: las direcciones I2C (las que encontró el escáner de la Guía 5), el pin de selección del SPI y qué datos viajan por cada bus. El protocolo de mensajes está en la Guía 2.

:::tabla id="g9-buses"
| Bus | Dispositivos | Dirección o pin de selección | Velocidad | ¿Qué viaja? |
| --- | --- | --- | --- | --- |
| I2C | Clasificador (maestro), banda, TCS34725 | | 100 kHz | |
| SPI | Clasificador → MAX7219 | CS = D10 | | |
:::

## Parte 4 · Resultados (35 min)

Junten en el documento los resultados de las guías anteriores (todo está guardado en la plataforma):

1. La **tabla de calibración** final (proporciones y límites).
2. La **gráfica velocidad contra aciertos** (sábado 8).
3. La evolución del **porcentaje de aciertos**: sábado 6 → sábado 7 → hoy.
4. Los **5 fallos más importantes** de la bitácora.

Copien el porcentaje de aciertos de cada sábado y qué cambiaron para mejorarlo:

:::tabla id="g9-evolucion"
| Momento | Aciertos (%) | ¿Qué cambiamos? |
| --- | --- | --- |
| Sábado 6 | | Primera prueba |
| Sábado 7 | | |
| Sábado 8 | | |
:::

Y la ficha técnica con los datos finales:

:::tabla id="g9-ficha"
| Característica | Valor |
| --- | --- |
| Nodos y buses | |
| Colores que clasifica | |
| Velocidad máxima con 90 % de aciertos | |
| Piezas por minuto | |
| Corriente máxima del motor | |
| Fuente y protecciones | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9-logramos"
- [ ] Diagrama de bloques final.
- [ ] Esquemáticos de los dos nodos.
- [ ] Buses y protocolo documentados.
- [ ] Calibración, gráficas, aciertos y fallos principales.
:::

## Bitácora (5 min)

:::pregunta id="g9-b1"
¿Qué parte del documento le serviría más a un técnico de mantenimiento de una fábrica?
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- El documento puede ser un archivo compartido o la plataforma; debe estar completo para el sábado 10.
- Tiempo total: 20 + 35 + 20 + 35 + 5 + 5 = 120 minutos.
:::
