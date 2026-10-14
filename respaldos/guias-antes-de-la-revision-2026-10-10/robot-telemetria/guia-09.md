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

:::tabla id="g9-cambios"
| Bloque o conexión | En el diseño | En lo construido | ¿Por qué cambió? |
| --- | --- | --- | --- |
| | | | |
| | | | |
:::

Actualiza el diagrama y súbelo:

:::foto id="g9-diagrama"
Diagrama de bloques final.
:::

## Parte 2 · Esquemático y tabla de conexiones (30 min)

Un **esquemático** muestra cada conexión con símbolos eléctricos. Dibújalo a mano o en una herramienta (Fritzing, KiCad, Wokwi). Acompáñalo con la tabla completa:

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

:::foto id="g9-esquematico"
Esquemático del equipo.
:::

## Parte 3 · El protocolo documentado (20 min)

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
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Wokwi sirve para dibujar el esquemático del mando (todos sus componentes existen); el robot se puede dibujar parcialmente.
- El documento puede ser un archivo compartido o la misma plataforma; lo importante es que esté completo para el sábado 10.
- Tiempo total: 20 + 30 + 20 + 30 + 10 + 5 + 5 = 120 minutos.
:::
