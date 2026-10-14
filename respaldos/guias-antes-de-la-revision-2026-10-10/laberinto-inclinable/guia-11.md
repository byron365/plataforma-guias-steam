---
titulo: Fácil, medio o difícil
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Fácil, medio o difícil

## Objetivo del día

Aplicar la mejora elegida: niveles de dificultad que se escogen con el joystick, o un laberinto versión 2.

**Al terminar tendremos:** el laberinto mejorado y probado.

## Materiales del equipo

- Laberinto completo
- Computadora con Arduino IDE y Blender

:::opciones id="g11-mejora"
¿Qué mejora eligió el equipo?
- A · Niveles de dificultad
- B · Laberinto versión 2
:::

## Parte 1 · ¿Qué hace difícil al juego? (10 min)

| Ajuste | Fácil | Difícil |
| --- | --- | --- |
| INCLINACION | Poca (la canica va lenta) | Mucha (la canica va rápida) |
| SUAVE | Bajo (movimiento lento) | Alto (movimiento brusco) |
| Tiempo máximo | Mucho | Poco |

## Parte 2 · La mejora elegida (75 min)

### Opción A · Niveles de dificultad

Antes de empezar, la pantalla muestra el nivel. Al mover el joystick a la **derecha** cambia de nivel; con el **botón** empieza la partida.

Cambia las constantes por variables:

```cpp
int nivel = 1;            // 1 fácil, 2 medio, 3 difícil
int inclinacion = 10;
float suave = 0.1;

void elegirNivel() {
  if (analogRead(JOY_X) > 900) {      // joystick a la derecha
    nivel = nivel + 1;
    if (nivel > 3) nivel = 1;
    tone(BUZZER, 800, 100);
    delay(400);                        // para que no salte varios niveles
  }
  if (nivel == 1) { inclinacion = 10; suave = 0.1; }
  if (nivel == 2) { inclinacion = 15; suave = 0.2; }
  if (nivel == 3) { inclinacion = 20; suave = 0.4; }
  mostrar("Nivel " + String(nivel), "Boton=jugar");
}
```

En el `loop`, antes de `if (!jugando) return;` llama a `elegirNivel()` cuando no se está jugando:

```cpp
if (!jugando) {
  elegirNivel();
  return;
}
```

Y en el `map` usa `inclinacion` en lugar de `INCLINACION`, y `suave` en lugar de `SUAVE`.

[IMAGEN 11.1: pantalla OLED mostrando "Nivel 2 Boton=jugar" antes de iniciar la partida]

:::tabla id="g11-niveles"
| Nivel | Inclinación | Suave | Tiempo de prueba (s) | ¿Es justo el nivel? |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
:::

:::pregunta id="g11-p1"
¿Por qué necesitamos el `delay(400)` al cambiar de nivel?
:::

### Opción B · Laberinto versión 2

Rediseñen el tablero con lo aprendido en el torneo:

- Más callejones sin salida o caminos que engañan.
- Paredes curvas (usa un **Cilindro** cortado por la mitad con Booleano).
- Zonas con **obstáculos** (columnas en medio del pasillo).
- El nombre del equipo grabado en el tablero.

1. Dibújenlo primero en papel con coordenadas.
2. Modélenlo en Blender a partir del archivo del sábado 3 (guárdenlo con otro nombre).
3. Exporten **equipo_NOMBRE_tablero_v2.stl**.

[IMAGEN 11.2: laberinto versión 2 en Blender con paredes curvas y obstáculos]

:::pregunta id="g11-p2"
¿Qué cambiaron en la versión 2 y por qué creen que será mejor?
:::

## Parte 3 · Prueba final (15 min)

:::checklist id="g11-pruebas"
- [ ] La mejora funciona.
- [ ] El juego completo sigue funcionando (meta, récord, pantalla).
- [ ] Jugamos al menos 3 partidas de prueba.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Hicimos la mejora elegida.
- [ ] Probamos y anotamos resultados.
:::

## Reto extra

Guarda un **récord distinto para cada nivel** usando tres variables: `record1`, `record2` y `record3`.

## Bitácora (15 min)

:::foto id="g11-foto"
Foto o video de la mejora funcionando.
:::

:::pregunta id="g11-b1"
¿Qué diferencia hay entre una constante (`const`) y una variable? ¿Por qué tuvimos que cambiarlas hoy?
:::

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Opción A: error frecuente, olvidar reemplazar `INCLINACION` por `inclinacion` en los dos `map`.
- Opción B: imprimir los tableros v2 durante la semana para usarlos en el sábado 13.
- Equipos rápidos pueden hacer las dos mejoras.
- g11-p1: sin la pausa, el loop corre tan rápido que el nivel cambia muchas veces con un solo movimiento.
- Tiempo total: 10 + 75 + 15 + 5 + 15 = 120 minutos.
:::
