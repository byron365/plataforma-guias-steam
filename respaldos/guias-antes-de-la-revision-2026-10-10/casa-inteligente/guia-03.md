---
titulo: Cargas de 12 V con seguridad
guia: 3
sabado: 3
sesion: Selección de componentes
duracion: 120
---

# Guía 3 · Cargas de 12 V con seguridad

## Objetivo del día

Medir las cargas, elegir MOSFET o relé para cada una, calcular el consumo total de la casa y elegir la fuente, el fusible y la distribución de energía.

**Al terminar tendremos:** la tabla de selección de nuestro nodo y el presupuesto de energía de toda la casa.

## Materiales del equipo

- Tira LED de 12 V, ventilador de 12 V, solenoide de 12 V (o servo)
- Fuente de 12 V, multímetro
- MOSFET IRLZ44N, módulo relé optoacoplado, diodos 1N4007

## Parte 1 · MOSFET o relé (25 min)

:::animacion tipo="mosfet" carga="Tira LED" pwm="no"
:::

:::tabla id="g3-comparacion"
| Característica | MOSFET (IRLZ44N) | Relé optoacoplado |
| --- | --- | --- |
| ¿Puede regular con PWM? | | |
| Velocidad de conmutación | Muy rápida | Lenta (mecánico) |
| ¿Aísla la lógica de la carga? | No (GND común) | Sí (optoacoplador) |
| Ruido | Silencioso | Hace "clic" |
| Desgaste | No | Sí, contactos mecánicos |
| Buena opción para… | | |
:::

:::pregunta id="g3-p1"
¿Por qué la tira LED y el ventilador usan MOSFET, pero la cerradura usa relé?
:::

**Optoacoplador:** dentro del módulo, un LED enciende un fototransistor. La señal del Arduino viaja **como luz**: no hay conexión eléctrica entre la lógica y la bobina del relé.

:::animacion tipo="optoacoplador"
:::

## Parte 2 · Medir las cargas (30 min)

Conecta cada carga directo a 12 V con el multímetro **en serie** (modo 10 A):

:::tabla id="g3-cargas"
| Carga | Corriente medida (mA) | Potencia (W) = 12 × I | ¿Necesita diodo de protección? |
| --- | --- | --- | --- |
| Tira LED (largo usado: ______ cm) | | | |
| Ventilador | | | |
| Solenoide de la cerradura | | | |
:::

:::pregunta id="g3-p2"
¿Cuáles de estas cargas son **inductivas** (tienen bobina) y necesitan diodo de rueda libre?
:::

## Parte 3 · Presupuesto de energía de la casa (35 min) · todo el grupo

:::tabla id="g3-presupuesto"
| Consumo | Línea | Corriente (mA) |
| --- | --- | --- |
| Tira LED | 12 V | |
| Ventilador | 12 V | |
| Solenoide | 12 V | |
| 4 Arduino UNO (≈50 mA c/u) | 5 V | 200 |
| HC-05 | 5 V | 40 |
| OLED | 5 V | 20 |
| Relé (bobina) | 5 V | 70 |
| PIR, DHT11, LDR | 5 V | 10 |
| Total en 5 V | | |
| Lo que toma el LM2596 de los 12 V ≈ (5 × I₅ᵥ) ÷ (12 × 0,85) | 12 V | |
| **Total de la fuente de 12 V** | 12 V | |
:::

> Fuente recomendada: total × 1,3 (margen del 30 %) · Fusible ≈ total × 1,5

:::pregunta id="g3-p3"
¿Alcanza una fuente de 12 V y 3 A? ¿Qué fusible pondremos?
:::

## Parte 4 · Distribución de energía (20 min)

Una **bornera de distribución** reparte los 12 V y el GND a cada habitación desde un solo punto, después del fusible.

[IMAGEN 3.1: bornera de distribución con la entrada de 12 V con fusible y salidas a la sala, el cuarto, la entrada y el LM2596]

:::tabla id="g3-nodo"
| Componente de nuestro nodo | Elegido | ¿Por qué? |
| --- | --- | --- |
| Interruptor de la carga | | |
| Diodo de protección | | |
| Resistencias de gate (si hay MOSFET) | | |
| Sensor | | |
| Cable para 12 V (grosor) | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Comparamos MOSFET y relé.
- [ ] Medimos nuestras cargas.
- [ ] Completamos el presupuesto de la casa.
- [ ] Elegimos fuente, fusible y componentes del nodo.
:::

## Bitácora (5 min)

:::tabla id="g3-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- Trabajar solo con baja tensión (12 V máximo); nunca conectar nada a 110/220 V.
- g3-p2: el ventilador (motor) y el solenoide son inductivos; la tira LED no.
- Si no hay solenoide, la cerradura puede ser un servo (no necesita relé, va al 5 V del LM2596); el relé puede entonces encender una luz de 12 V de la entrada.
- Tiempo total: 25 + 30 + 35 + 20 + 5 + 5 = 120 minutos.
:::
