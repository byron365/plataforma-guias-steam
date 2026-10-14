---
titulo: Ni pasarse ni perder llamadas
guia: 7
sabado: 7
sesion: Corrección de fallos
duracion: 120
---

# Guía 7 · Ni pasarse ni perder llamadas

## Objetivo del día

Corregir los fallos encontrados: la cabina que se pasa del piso, llamadas que se pierden, el comportamiento ante fallas de comunicación y el rearme después del paro.

**Al terminar tendremos:** el elevador deteniéndose con más precisión, sin perder llamadas y con un paro de emergencia que exige rearme.

## Materiales del equipo

- Elevador completo, tablas de la Guía 6
- Regla, multímetro

## Parte 1 · Método (10 min)

> **Síntoma → hipótesis → prueba → causa → solución → verificar.** Una sola cosa a la vez.

Copien de la bitácora de la Guía 6 los fallos que encontraron. Para cada uno escriban una **hipótesis** (por qué creen que pasa) y una **prueba** para comprobarla.

:::tabla id="g7-pendientes"
| Fallo del sábado 6 | Hipótesis | Prueba |
| --- | --- | --- |
| | | |
| | | |
:::

## Parte 2 · La cabina se pasa del piso (40 min)

La cabina llega con velocidad y la **inercia** la lleva un poco más allá. Dos soluciones:

1. **Freno activo** al llegar (IN1 = IN2 = HIGH) en lugar de solo apagar.
2. **Aproximación lenta**: bajar la velocidad cuando falta poco (por ejemplo, al pasar el piso anterior o tras cierto tiempo de viaje).

**Agregar el freno activo** al programa de la central (`equipo_NOMBRE_central`):

1. Ábranlo con **Archivo → Abrir** y guarden una copia con **Archivo → Guardar como** → `equipo_NOMBRE_central_freno`.
2. Debajo de la línea `void parar() { motor(0); vel = 0; }` escriban la función `frenar()` del recuadro (las primeras seis líneas).
3. En el `loop()`, en la parte `// 3. ¿Llegamos?`, cambien la línea `parar();` por `frenar();`. Lo demás de ese bloque se queda igual (por eso el recuadro muestra `...`).
4. Verifiquen (✓) y suban (→).

```cpp
void frenar() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, 255);
  vel = 0;
}

// en loop(), al llegar:
if (p == destino) {
  frenar();
  ...
}
```

**Cómo llenar la tabla:**

- **Sin cambios:** saquen los números de la tabla de precisión de la Guía 6 (sin carga). Los viajes 1, 2 y 4 son de subida y los viajes 3, 5 y 6 de bajada: promedien cada grupo por separado.
- **Con freno activo:** repitan los seis viajes como en la Guía 6 y promedien igual.
- **Con freno activo + VEL_MAX menor:** en `// --- Ajustes del equipo ---` cambien el `200` de `VEL_MAX` por un número menor (por ejemplo 150), suban de nuevo y repitan los viajes.

:::tabla id="g7-precision"
| Cambio | Error promedio subiendo (mm) | Error promedio bajando (mm) |
| --- | --- | --- |
| Sin cambios (sábado 6) | | |
| Con freno activo | | |
| Con freno activo + VEL_MAX menor | | |
:::

:::pregunta id="g7-p1"
¿Qué solución redujo más el error? ¿Hubo alguna desventaja (golpe, velocidad)?
:::

## Parte 3 · Llamadas perdidas (25 min)

Lean cada síntoma. En **¿Nos pasó?** escriban Sí o No según sus pruebas de la Guía 6. Si les pasó, escriban en **Solución** qué cambiaron.

:::tabla id="g7-llamadas"
| Síntoma | Causa probable | ¿Nos pasó? | Solución |
| --- | --- | --- | --- |
| Toque rápido no registrado | El nodo lee el botón muy de vez en cuando | | |
| La llamada se borra antes de llegar | La central borra `llamada[]` en otro lugar | | |
| Un piso nunca responde | Dirección repetida o cable del bus | | |
| Se registra pero la cabina no va | `elegirDestino()` no lo considera | | |
:::

## Parte 4 · Paro con rearme (25 min)

Un elevador real, tras un paro de emergencia, **no sigue solo**: queda bloqueado hasta que alguien lo rearma. Usaremos el botón de llamada del piso 1 como rearme, o un botón aparte en **A3**:

1. Conecten un botón con una pata a **A3** y otra a GND, en la base junto al paro.
2. Las dos primeras líneas del recuadro (`bool bloqueado` y `const int REARME`) van arriba, debajo de `const int PARO = A2;`.
3. En el `setup()`, debajo de `pinMode(PARO, INPUT_PULLUP);`, agreguen `pinMode(REARME, INPUT_PULLUP);`.
4. El resto (desde `if (digitalRead(PARO) == LOW) bloqueado = true;`) va al inicio del `loop()`, justo después de la línea `void loop() {`.
5. Suban y prueben: presionen el paro, suéltenlo (la cabina sigue quieta) y luego presionen el rearme.

```cpp
bool bloqueado = false;
const int REARME = A3;   // pinMode(REARME, INPUT_PULLUP) en setup

// al inicio del loop():
if (digitalRead(PARO) == LOW) bloqueado = true;
if (bloqueado) {
  frenar();
  if (digitalRead(PARO) == HIGH && digitalRead(REARME) == LOW) bloqueado = false;
  return;
}
```

:::pregunta id="g7-p2"
¿Por qué el rearme exige que el paro ya esté soltado **y** que se presione otro botón?
:::

## Parte 5 · Volver a probar (15 min)

Repitan las pruebas de la Guía 6 de cada requisito (R1 a R4 de la Guía 1). Escriban Sí o No y qué cambiaron para lograrlo:

:::tabla id="g7-reprueba"
| Requisito | ¿Aprueba ahora? | ¿Qué cambiamos? |
| --- | --- | --- |
| R1 Se detiene en el piso | | |
| R2 Finales de carrera | | |
| R3 Paro de emergencia | | |
| R4 No pierde llamadas | | |
:::

Antes de irse, suban los programas de hoy juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Redujimos el error de parada.
- [ ] Ya no se pierden llamadas.
- [ ] El paro exige rearme.
- [ ] Volvimos a probar los requisitos.
:::

Bitácora de fallos de hoy:

:::tabla id="g7-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::docente
- Si el freno activo hace "rebotar" la cabina por el contrapeso, combinarlo con una velocidad de llegada menor.
- El código base tiene `delay(2000)` al llegar: durante ese tiempo no se revisa el paro. Buen ejemplo de fallo de diseño para discutir; puede cambiarse por una espera con `millis()`.
- Tiempo total: 10 + 40 + 25 + 25 + 15 + 5 = 120 minutos.
:::
