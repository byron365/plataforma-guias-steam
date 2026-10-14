---
titulo: ¡La garra completa!
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · ¡La garra completa!

## Objetivo del día

Montar la pinza, encontrar los límites seguros de cada articulación y probar qué objetos puede agarrar la garra.

**Al terminar tendremos:** la garra completa funcionando en modo manual, con ángulos ajustados a nuestro diseño y un registro de pruebas.

## Materiales del equipo

- Garra montada hasta el codo y circuito del sábado 5
- Piezas de la pinza impresas, tornillo M3 con tuerca
- 5 objetos ligeros: pelota de esponja, dado, tapa de botella, borrador y vaso de papel
- Ligas o cinta de goma, destornillador

## Parte 1 · Repaso rápido (10 min)

Conecten el circuito y comprueben que base, hombro y codo siguen respondiendo.

:::pregunta id="g6-p1"
¿Cuál es la regla de oro cuando usamos pilas para los servos?
:::

## Parte 2 · Montar la pinza (30 min)

1. **Lija un poco los engranes** si no giran suave al juntarlos con la mano.
2. **Servo de la pinza:** colócalo en la ventana de la placa de la pinza y atornilla las pestañas.
3. **Pon el servo en 60°** (pinza a medio abrir) cambiando el código de centrar de la guía 4 a `write(60)` en el pin 9.
4. **Engrane motriz:** atorníllalo al brazo del servo con las mandíbulas medio abiertas.
5. **Engrane seguidor:** fíjalo con el tornillo M3 y la tuerca, sin apretar demasiado: debe girar libre. Revisa que los dientes encajen.
6. **Une la placa de la pinza** al extremo del eslabón del codo.

[IMAGEN 6.1: pinza montada en el eslabón del codo, señalando engrane motriz, seguidor y tornillo M3]

## Parte 3 · Encontrar los límites seguros (25 min)

Cada garra es distinta: hay que descubrir hasta dónde puede girar cada articulación sin chocar. Agrega `Serial.begin(9600);` en el `setup()` y cambia el `loop()` por este:

```cpp
void loop() {
  int b = leer(A0, 0, 180);
  int h = leer(A1, 15, 165);
  int c = leer(A2, 15, 165);
  int p = leer(A3, 30, 90);
  base.write(b);
  hombro.write(h);
  codo.write(c);
  pinza.write(p);
  Serial.print(b);  Serial.print("  ");
  Serial.print(h);  Serial.print("  ");
  Serial.print(c);  Serial.print("  ");
  Serial.println(p);
  delay(50);
}
```

Abre el Monitor Serie y mueve **una perilla a la vez, muy despacio**. Cuando una pieza esté a punto de chocar o el servo zumbe, anota el número:

| Articulación | Mínimo seguro | Máximo seguro |
| --- | --- | --- |
| Base | | |
| Hombro | | |
| Codo | | |
| Pinza (cerrada / abierta) | | |

Ahora **escribe tus límites en el código**, en los números de cada `leer()`, y súbelo de nuevo.

[IMAGEN 6.2: Monitor Serie mostrando las cuatro columnas de ángulos]

## Parte 4 · Pruebas de agarre (35 min)

Intenten mover cada objeto de la mesa a un vaso, tres veces. Marquen ✓ si lo lograron o ✗ si falló.

| Objeto | Intento 1 | Intento 2 | Intento 3 | ¿Qué falló? |
| --- | --- | --- | --- | --- |
| Pelota de esponja | | | | |
| Dado | | | | |
| Tapa de botella | | | | |
| Borrador | | | | |
| Vaso de papel | | | | |

**Ajustes que pueden hacer:**

- Si los objetos resbalan: pongan ligas o cinta de goma en las mandíbulas.
- Si la garra se vuelca: agreguen peso en el plato de apoyo.
- Si un eslabón se dobla: anótenlo para la versión 2 (sábado 11).
- Si el hombro no levanta: acorten el movimiento o usen un servo MG90S.

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] La pinza abre y cierra con su perilla.
- [ ] Encontramos y programamos los límites de las 4 articulaciones.
- [ ] Probamos los 5 objetos.
- [ ] Anotamos qué mejoraríamos.
:::

## Reto extra

Cronometren cuánto tardan en mover los 5 objetos al vaso. ¡Ese será su primer récord!

Tiempo: ______ s

## Bitácora (15 min)

:::foto id="g6-foto"
Video de la garra agarrando un objeto.
:::

:::pregunta id="g6-b1"
¿Qué objeto fue el más difícil y por qué?
:::

:::pregunta id="g6-b2"
Lista de mejoras para la versión 2.
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Revisar que el engrane seguidor gire libre; si el tornillo M3 está muy apretado, el servo de la pinza se fuerza.
- Guardar la tabla de límites: se usa el sábado 7 para la rutina automática.
- Tiempo total: 10 + 30 + 25 + 35 + 5 + 15 = 120 minutos.
:::
