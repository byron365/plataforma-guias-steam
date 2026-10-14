---
titulo: Suave, seguro y eficiente
guia: 8
sabado: 8
sesion: Optimización del sistema
duracion: 120
---

# Guía 8 · Suave, seguro y eficiente

## Objetivo del día

Optimizar el robot: rampa de aceleración, frenado automático ante obstáculos, alerta de batería baja y medición del consumo real.

**Al terminar tendremos:** el robot con aceleración suave y freno ante obstáculos, y la tabla de consumo medido.

## Materiales del equipo

- Robot y mando
- Multímetro (modo corriente, 10 A)
- Caja o pared como obstáculo

## Parte 1 · Rampa de aceleración (30 min)

Pasar de 0 a 255 de golpe pide un pico de corriente, hace patinar las ruedas y puede reiniciar la lógica. Con una **rampa**, la velocidad real se acerca poco a poco a la pedida.

:::animacion tipo="rampa" sistema="robot"
:::

En el robot, guarda la velocidad actual de cada motor y acércala a la pedida en cada vuelta:

```cpp
int velIzq = 0, velDer = 0;          // velocidad real
int pedidaIzq = 0, pedidaDer = 0;    // lo que pide el mando
const int PASO = 15;                  // cuánto cambia cada 20 ms

int acercar(int actual, int meta) {
  if (actual < meta) return min(actual + PASO, meta);
  if (actual > meta) return max(actual - PASO, meta);
  return actual;
}

// en procesar(): guardar en pedidaIzq / pedidaDer en lugar de mover los motores

// en loop(), cada 20 ms:
velIzq = acercar(velIzq, pedidaIzq);
velDer = acercar(velDer, pedidaDer);
motor(PWMA, AIN1, AIN2, velIzq);
motor(PWMB, BIN1, BIN2, velDer);
```

:::tabla id="g8-rampa"
| PASO | Tiempo de 0 a 255 (ms) | ¿Cómo se siente el manejo? | ¿Hubo reinicios? |
| --- | --- | --- | --- |
| 255 (sin rampa) | | | |
| 30 | | | |
| 15 | | | |
| 5 | | | |
:::

:::pregunta id="g8-p1"
Con PASO = 15 y una vuelta cada 20 ms, ¿cuánto tarda en llegar de 0 a 255?
:::

> **Ojo:** el timeout de seguridad debe poner `pedidaIzq` y `pedidaDer` en 0. Si la parada sin señal también usa rampa, decide si eso cumple el requisito R2.

## Parte 2 · Freno ante obstáculos (30 min)

Si hay un obstáculo a menos de **15 cm** y el mando pide avanzar, el robot no avanza (sí puede retroceder o girar).

```cpp
const int DIST_FRENO = 15;   // cm
long d = distancia();
if (d > 0 && d < DIST_FRENO) {
  if (pedidaIzq > 0 && pedidaDer > 0) {   // ambos adelante
    pedidaIzq = 0;
    pedidaDer = 0;
  }
}
```

:::tabla id="g8-freno"
| Velocidad al acercarse | DIST_FRENO (cm) | ¿Chocó? | Distancia final al obstáculo (cm) |
| --- | --- | --- | --- |
| Lenta | 15 | | |
| Rápida | 15 | | |
| Rápida | 25 | | |
:::

:::pregunta id="g8-p2"
¿Por qué a mayor velocidad hace falta una distancia de freno mayor?
:::

## Parte 3 · Alerta de batería baja (15 min)

El mando ya muestra "BATERIA!" bajo 6,8 V. Mejóralo: que la pantalla **parpadee** y el robot limite su velocidad máxima a 150 cuando la batería esté baja.

:::pregunta id="g8-p3"
¿Por qué conviene limitar la velocidad con la batería baja?
:::

## Parte 4 · Consumo real (30 min)

Pon el multímetro **en serie** con la batería (modo 10 A, cable rojo en la entrada de 10 A). Con el robot levantado (ruedas en el aire) y luego en el piso:

:::tabla id="g8-consumo"
| Situación | Corriente (mA) |
| --- | --- |
| Encendido, quieto | |
| Ruedas en el aire, velocidad 128 | |
| Ruedas en el aire, velocidad 255 | |
| En el piso, velocidad 255 | |
| Empujando una pared (motor forzado) | |
:::

Compara con el presupuesto del sábado 2: ¿nos quedamos cortos o sobrados?

:::pregunta id="g8-p4"
Con la corriente real en el piso, recalcula la autonomía. ¿Cambió mucho?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] El robot acelera con rampa.
- [ ] Frena ante obstáculos al avanzar.
- [ ] La alerta de batería baja limita la velocidad.
- [ ] Medimos el consumo real.
:::

## Reto extra

Modo automático: si se presiona el botón del joystick (envía `A`), el robot avanza solo y, al encontrar un obstáculo, retrocede, gira y sigue. Otro toque vuelve al modo manual.

## Bitácora (10 min)

:::tabla id="g8-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g8-p1: 255 ÷ 15 = 17 vueltas × 20 ms ≈ 340 ms.
- Medir el motor forzado solo un par de segundos: es la corriente de bloqueo y calienta driver y motor.
- Nunca conectar el multímetro en modo corriente en paralelo con la batería: es un cortocircuito.
- `distancia()` con pulseIn puede tardar hasta 20 ms; medirla cada 100 ms y no en cada vuelta para no frenar el loop.
- Tiempo total: 30 + 30 + 15 + 30 + 5 + 10 = 120 minutos.
:::
