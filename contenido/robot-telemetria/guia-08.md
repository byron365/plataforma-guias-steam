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

Miren en la animación cómo la velocidad real persigue a la pedida:

:::animacion tipo="rampa" sistema="robot"
:::

En el robot, guarda la velocidad actual de cada motor y acércala a la pedida en cada vuelta:

**Dónde va cada parte** (guarden antes una copia: **Archivo → Guardar como** → `equipo_NOMBRE_robot_rampa`):

1. Las tres primeras líneas (`velIzq`, `pedidaIzq` y `PASO`) y la función `acercar()` van arriba, debajo de `String buffer = "";`.
2. En `procesar()`, cambien las dos líneas que mueven los motores (`motor(PWMA, …, izq)` y `motor(PWMB, …, der)`) por `pedidaIzq = izq;` y `pedidaDer = der;`. Si en la Guía 7 agregaron un ajuste, multiplíquenlo aquí: `pedidaDer = der * AJUSTE_DER;`.
3. En el bloque `// 2. Seguridad: sin señal, detener`, cambien las dos líneas `motor(…, 0)` por `pedidaIzq = 0;` y `pedidaDer = 0;` (ver el **Ojo** de abajo).
4. Las cuatro últimas líneas tienen que ejecutarse **cada 20 ms**. Usen el mismo truco que la telemetría: arriba declaren `unsigned long ultimaRampa = 0;` y al final del `loop()` escriban `if (millis() - ultimaRampa >= 20) {`, las cuatro líneas, `ultimaRampa = millis();` y `}`.

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

En cada fila cambien el número de `PASO`, suban de nuevo y manejen el robot acelerando a fondo. Con `PASO = 255` la velocidad cambia de golpe, como antes de la rampa.

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

- La línea `const int DIST_FRENO = 15;` va arriba, con los ajustes del equipo.
- El resto (desde `long d = distancia();`) va dentro del bloque de 20 ms de la rampa, **antes** de `velIzq = acercar(…)`: así el freno cambia lo pedido antes de mover los motores.

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

Pongan una caja o una pared como obstáculo y acerquen el robot de frente. Para cambiar `DIST_FRENO`, cambien el 15 y suban de nuevo. Midan con la regla la distancia final.

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

Pistas:

- **Mando:** en `mostrar()`, la línea del aviso puede mostrarse solo la mitad del tiempo. `(millis() / 500) % 2` vale 0 y 1 alternando cada medio segundo.
- **Robot:** el voltaje `v` se calcula en el bloque de telemetría. Guárdenlo en una variable global (por ejemplo `float bateria`) y, en `procesar()`, si `bateria < 6.8`, limiten `izq` y `der` con `constrain(…, -150, 150)`.

:::pregunta id="g8-p3"
¿Por qué conviene limitar la velocidad con la batería baja?
:::

## Parte 4 · Consumo real (30 min)

Pon el multímetro **en serie** con la batería (modo 10 A, cable rojo en la entrada de 10 A). Con el robot levantado (ruedas en el aire) y luego en el piso:

1. Con el interruptor apagado, desconecten el cable que va del **+** de la batería al fusible y pongan el multímetro **en medio**: punta roja hacia la batería y negra hacia el fusible.
2. Para las velocidades 128 y 255, suban al robot el programa `equipo_NOMBRE_prueba_motores` de la Guía 4 cambiando los `150` por `128` (y luego por `255`). Lean el multímetro durante el tramo "adelante".
3. **Motor forzado:** con el robot en el piso empujando una pared, lean el valor y apaguen en 2 segundos.
4. Si el multímetro muestra amperes, multipliquen por 1000 para tener mA. Al terminar, vuelvan a subir `equipo_NOMBRE_robot_rampa`, regresen el cable a su lugar y la punta roja al borne de voltaje.

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

Antes de irse, suban el programa del robot y el del mando juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

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
