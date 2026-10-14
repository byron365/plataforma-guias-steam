---
titulo: Elegir con números
guia: 3
sabado: 3
sesion: Selección de componentes
duracion: 120
---

# Guía 3 · Elegir con números

## Objetivo del día

Comparar los puentes H L298N y TB6612FNG, elegir batería, regulador y fusible con cálculos, y diseñar el divisor que mide la batería.

**Al terminar tendremos:** la tabla de selección de componentes justificada, el regulador ajustado a 5,0 V y el divisor de batería probado.

## Materiales del equipo

- Puente H L298N y TB6612FNG (para observarlos)
- Regulador LM2596, batería o fuente de 7–8 V
- Multímetro
- Resistencias de 10 kΩ (2)
- Arduino UNO

## Parte 1 · ¿Cómo funciona un puente H? (20 min)

Un **puente H** son cuatro transistores que funcionan como interruptores. Cerrando dos en diagonal, la corriente pasa por el motor en un sentido; cerrando los otros dos, en el sentido contrario. Con **PWM** (encender y apagar muy rápido) controlamos la velocidad.

:::animacion tipo="puente-h" sentidos="Adelante|Atrás"
:::

| IN1 | IN2 | PWM | Motor |
| --- | --- | --- | --- |
| HIGH | LOW | 200 | Adelante, rápido |
| LOW | HIGH | 100 | Atrás, lento |
| LOW | LOW | 0 | Libre (se detiene solo) |
| HIGH | HIGH | — | Freno |

:::animacion tipo="pwm"
:::

## Parte 2 · L298N contra TB6612FNG (25 min)

:::tabla id="g3-comparacion"
| Característica | L298N | TB6612FNG |
| --- | --- | --- |
| Tipo de transistor | Bipolar | MOSFET |
| Caída de voltaje aprox. | 2 V | 0,5 V |
| Corriente por canal | 2 A | 1,2 A (3,2 A pico) |
| Tamaño | Grande, con disipador | Pequeño |
| Voltaje que llega al motor con batería de 7,4 V | | |
| Potencia perdida en calor con 0,5 A (P = V × I) | | |
:::

:::pregunta id="g3-p1"
¿Cuál conviene para nuestro robot y por qué? Usa los números de la tabla.
:::

## Parte 3 · Batería, fusible y regulador (30 min)

**Batería:** 2S Li-ion = dos celdas de 3,7 V en serie → 7,4 V nominal, **8,4 V** llena y unos **6,4 V** descargada.

**Fusible:** debe aguantar la corriente normal pero cortar ante un cortocircuito:

> Fusible ≈ corriente máxima esperada × 1,5

Corriente máxima esperada (presupuesto del sábado 2 con motores al arrancar ≈ 2 × 600 mA + 150 mA): ______ mA → fusible de ______ A.

**Regulador LM2596:** baja los 7,4 V a 5 V para la lógica. Es **conmutado**: pierde poca energía en calor, a diferencia de un regulador lineal.

1. Conecta la batería (o fuente) a la entrada IN+ / IN−.
2. Con el multímetro en la salida, gira el tornillo del potenciómetro azul hasta leer **5,0 V**.
3. **Solo después** conéctalo al pin 5V del Arduino.

[IMAGEN 3.1: regulador LM2596 con el multímetro midiendo 5,0 V en la salida mientras se ajusta el tornillo]

| Medición | Voltaje |
| --- | --- |
| Entrada del regulador | |
| Salida antes de ajustar | |
| Salida ajustada | |

:::pregunta id="g3-p2"
¿Qué pasaría si conectamos el regulador al Arduino sin ajustarlo antes?
:::

## Parte 4 · El divisor de batería (30 min)

El Arduino solo puede medir hasta **5 V** en sus pines analógicos y la batería llega a 8,4 V. Un **divisor de voltaje** con dos resistencias iguales la divide entre 2:

> Vsalida = Vbatería × R2 ÷ (R1 + R2)

:::animacion tipo="divisor"
:::

Con R1 = R2 = 10 kΩ, 8,4 V → ______ V (¿es menor que 5 V?).

Arma el divisor: batería + → 10 kΩ → **A0** → 10 kΩ → GND (unido al GND de la batería).

```cpp
const float FACTOR_BAT = 2.0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(A0);
  float v = lectura * 5.0 / 1023 * FACTOR_BAT;
  Serial.println(v, 2);
  delay(500);
}
```

:::tabla id="g3-divisor"
| Medición | Valor |
| --- | --- |
| Batería con el multímetro (V) | |
| Batería según el Arduino (V) | |
| Diferencia (V) | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Entendemos cómo el puente H cambia el sentido y la velocidad.
- [ ] Elegimos el puente H con números.
- [ ] Calculamos el fusible.
- [ ] El regulador entrega 5,0 V.
- [ ] El divisor mide la batería.
:::

## Reto extra

Calcula el divisor que usarías para una batería de **12 V** (que llega a 12,6 V) con una R2 de 10 kΩ.

## Bitácora (10 min)

:::tabla id="g3-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Tabla: L298N → ≈5,4 V al motor y 1 W de calor con 0,5 A; TB6612 → ≈6,9 V y 0,25 W.
- Fusible: ≈1,35 A × 1,5 ≈ 2 A.
- Divisor: 8,4 V → 4,2 V. Reto: R1 ≈ 16 kΩ (o 15 kΩ + margen) para que 12,6 V queden en ≈4,8 V.
- Baterías de litio: siempre en portabaterías con protección, no perforarlas ni cargarlas sin supervisión.
- Si un equipo no tiene batería 2S, usar 6 pilas AA (9 V nuevas): ajustar FACTOR y los límites de batería baja.
- Tiempo total: 20 + 25 + 30 + 30 + 5 + 10 = 120 minutos.
:::
