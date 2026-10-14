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

:::tabla id="g9-buses"
| Bus | Dispositivos | Dirección o pin de selección | Velocidad | ¿Qué viaja? |
| --- | --- | --- | --- | --- |
| I2C | Clasificador (maestro), banda, TCS34725 | | 100 kHz | |
| SPI | Clasificador → MAX7219 | CS = D10 | | |
:::

## Parte 4 · Resultados (35 min)

1. La **tabla de calibración** final (proporciones y límites).
2. La **gráfica velocidad contra aciertos** (sábado 8).
3. La evolución del **porcentaje de aciertos**: sábado 6 → sábado 7 → hoy.
4. Los **5 fallos más importantes** de la bitácora.

:::tabla id="g9-evolucion"
| Momento | Aciertos (%) | ¿Qué cambiamos? |
| --- | --- | --- |
| Sábado 6 | | Primera prueba |
| Sábado 7 | | |
| Sábado 8 | | |
:::

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
