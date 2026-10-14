---
titulo: El documento técnico
guia: 9
sabado: 9
sesion: Documentación técnica
duracion: 120
---

# Guía 9 · El documento técnico

## Objetivo del día

Escribir el documento técnico del robot: diagrama de bloques final, esquemático, protocolo, mediciones y resultados de pruebas.

**Al terminar tendremos:** el documento técnico completo del sistema, listo para la presentación.

## Materiales del equipo

- Todas las tablas de las guías anteriores
- Computadora (procesador de texto o la plataforma)
- Robot y mando (para revisar conexiones)

## Parte 1 · Diagrama de bloques final (20 min)

Compara el diagrama del sábado 2 con lo que realmente construimos:

Pongan la foto del diagrama de la Guía 2 junto al robot y al mando. Anoten cada bloque o conexión que cambió (por ejemplo, el capacitor de la Guía 7 o un pin distinto) y por qué.

:::tabla id="g9-cambios"
| Bloque o conexión | En el diseño | En lo construido | ¿Por qué cambió? |
| --- | --- | --- | --- |
| | | | |
| | | | |
:::

Actualiza el diagrama y súbelo:

Dibujen el diagrama corregido en una hoja nueva y tomen la foto:

:::foto id="g9-diagrama"
Diagrama de bloques final.
:::

## Parte 2 · Esquemático y tabla de conexiones (30 min)

Un **esquemático** muestra cada conexión con símbolos eléctricos. Dibújalo a mano o en una herramienta (Fritzing, KiCad, Wokwi). Acompáñalo con la tabla completa:

Revisen los cables en el robot y en el mando y completen la última columna (por ejemplo, "D5, D7, D8"). Las tablas de conexiones están en las guías 3, 4 y 5.

:::tabla id="g9-conexiones"
| Nodo | Componente | Pin del componente | Pin del Arduino / destino |
| --- | --- | --- | --- |
| Robot | TB6612FNG | PWMA, AIN1, AIN2 | |
| Robot | TB6612FNG | PWMB, BIN1, BIN2 | |
| Robot | TB6612FNG | STBY | |
| Robot | HC-SR04 | Trig, Echo | |
| Robot | Divisor de batería | Punto medio | |
| Robot | HC-05 | TXD, RXD | |
| Robot | LM2596 | OUT+ / OUT− | |
| Mando | Joystick | VRx, VRy | |
| Mando | OLED | SDA, SCL | |
| Mando | HC-05 | TXD, RXD | |
:::

[IMAGEN 9.1: esquemático del robot con la batería, el fusible, el LM2596, el TB6612FNG, el Arduino, el HC-05 y el HC-SR04]

Tomen una foto o captura del esquemático y súbanla:

:::foto id="g9-esquematico"
Esquemático del equipo.
:::

## Parte 3 · El protocolo documentado (20 min)

Para la **Frecuencia**, busquen en el código cada cuánto se envía cada mensaje (el número que se compara con `millis()`). En **Qué pasa si se pierde**, piensen qué hace el otro nodo si ese mensaje no llega. En la última fila agreguen otro mensaje si crearon uno en algún reto (por ejemplo `P` o `A`).

:::tabla id="g9-protocolo"
| Mensaje | Dirección | Formato | Frecuencia | Qué pasa si se pierde |
| --- | --- | --- | --- | --- |
| Órdenes | Mando → Robot | M,izq,der\n | | |
| Telemetría | Robot → Mando | T,bat,dist\n | | |
| | | | | |
:::

## Parte 4 · Mediciones y pruebas (30 min)

Resume en el documento:

1. El **presupuesto de energía**: calculado (sábado 2) contra medido (sábado 8).
2. La **matriz de pruebas** (sábado 6) con el resultado final después de las correcciones (sábado 7).
3. Los **5 fallos más importantes** de la bitácora, con su causa y solución.

Copien el criterio de la tabla de la Guía 6 y el resultado final después de las correcciones de las guías 7 y 8:

:::tabla id="g9-resumen"
| Requisito | Criterio | Resultado final | ¿Aprueba? |
| --- | --- | --- | --- |
| R1 | | | |
| R2 | | | |
| R3 | | | |
| Alcance | | | |
| Freno ante obstáculos | | | |
:::

## Parte 5 · Ficha técnica (10 min)

La **ficha técnica** resume los números del robot. Búsquenlos en sus tablas: alcance y tiempo de parada (Guía 6), corriente y distancia de freno (Guía 8). La autonomía medida es la que recalcularon en la Guía 8.

:::tabla id="g9-ficha"
| Característica | Valor |
| --- | --- |
| Nodos | |
| Microcontroladores | |
| Enlace | |
| Alcance medido | |
| Batería y autonomía medida | |
| Corriente máxima medida | |
| Velocidad de reacción ante pérdida de señal | |
| Distancia de freno | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9-logramos"
- [ ] El diagrama de bloques coincide con lo construido.
- [ ] Hay esquemático y tabla de conexiones.
- [ ] El protocolo está documentado.
- [ ] Están el presupuesto, las pruebas y los fallos principales.
:::

## Bitácora (5 min)

:::pregunta id="g9-b1"
¿Qué parte del documento le serviría más a otro equipo que quiera construir este robot?
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** si dibujaron el esquemático en Wokwi, suban el proyecto (descárguenlo como .zip: menú de la flecha junto a **Save** → **Download project zip**). Si escribieron el documento en Word, también pueden subirlo aquí (.docx).
:::

:::docente
- Wokwi sirve para dibujar el esquemático del mando (todos sus componentes existen); el robot se puede dibujar parcialmente.
- El documento puede ser un archivo compartido o la misma plataforma; lo importante es que esté completo para el sábado 10.
- Tiempo total: 20 + 30 + 20 + 30 + 10 + 5 + 5 = 120 minutos.
:::
