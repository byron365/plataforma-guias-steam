---
titulo: Las piezas y la cancha
guia: 7
sabado: 7
sesion: Construcción del prototipo
duracion: 120
---

# Guía 7 · Las piezas y la cancha

## Objetivo del día

Revisar que el sensor, la pantalla y el buzzer reales quepan en las piezas impresas, corregir en Tinkercad lo que haga falta y construir la cancha con sus líneas a escala.

**Al terminar tendremos:** las piezas revisadas y la cancha armada con sus porterías y el soporte del marcador.

## Materiales del equipo

- Las dos porterías y el soporte del marcador impresos (guías 2 y 3)
- 1 sensor infrarrojo de obstáculos, la pantalla OLED, el buzzer y la pelota
- Regla o calibrador
- Base de cartón grueso, cartón pluma o MDF de 60 × 40 cm
- Cartulina verde, marcador o cinta blanca
- Tiras de cartón de 3 cm de alto para las bandas laterales
- Compás, tijeras, pegamento caliente, calculadora
- Computadora con internet y la cuenta de Tinkercad del equipo

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · ¿Caben las piezas reales? (15 min)

Prueben cada pieza real en su lugar, con cuidado, sin forzarla. **Todavía no peguen nada.**

:::tabla id="g7p-piezas"
| Prueba | ¿Cabe o funciona? | Observaciones |
| --- | --- | --- |
| Los ojitos del sensor se asoman por la ventana del fondo de la portería | | |
| La pelota entra entre los postes de la portería | | |
| El vidrio de la pantalla tapa la ventana del soporte por detrás | | |
| El buzzer entra justo en su agujero del soporte | | |
:::

## Parte 2 · Corregir en Tinkercad (20 min)

**Solo si algo no cupo.** Abran su diseño en Tinkercad (**Diseños → Codeblocks**), cambien el número y exporten otra vez (**Compartir** → **.STL**). El docente lo vuelve a imprimir para el sábado 8.

| Problema | Diseño | Qué cambiar |
| --- | --- | --- |
| Los ojitos del sensor no caben en la ventana | `equipo_NOMBRE_porteria` | El primer **A** del cubo de la ventana (por ejemplo, de 12 a 14). Guía 2, Parte 3, paso 5 |
| El buzzer no entra en su agujero | `equipo_NOMBRE_soporte_marcador` | El **Radio** del cilindro del agujero: la mitad de lo ancho del buzzer + 0,2 mm. Guía 3, Parte 3, paso 3 |
| Falta exportar una pieza | La que falte | Termínenla con los pasos de la Guía 2 o la Guía 3 y expórtenla |

:::opciones id="g7p-corregir"
¿Tuvimos que corregir alguna pieza?
- No, todo cupo
- Sí, la portería
- Sí, el soporte
- Sí, las dos
:::

Si todo cupo, empiecen ya la Parte 3.

## Parte 3 · Las medidas a escala (10 min)

Una cancha profesional mide **105 × 68 m**. Para que quepa en la mesa usamos una **escala 1:200**: cada centímetro de la maqueta representa 200 cm (2 m) de la cancha real. Por eso nuestra cancha mide **52,5 × 34 cm**.

> Medida de la maqueta = Medida real ÷ 200

Calculen las líneas que van a trazar. Pasen los metros a centímetros (× 100) y dividan entre 200. Redondeen a una cifra decimal.

:::tabla id="g7p-escala"
| Parte de la cancha | Medida real | En cm | ÷ 200 = maqueta (cm) |
| --- | --- | --- | --- |
| Largo | 105 m | 10 500 | 52,5 |
| Radio del círculo central | 9,15 m | | |
| Largo del área grande | 40,3 m | | |
| Fondo del área grande | 16,5 m | | |
:::

## Parte 4 · La cancha (55 min)

1. Corta la base y fórrala con la cartulina verde.
   - Si es MDF, el docente la corta. Peguen la cartulina con pegamento en las orillas y en el centro, alisándolo con la mano para que no queden burbujas.
2. Traza las líneas con las medidas de su tabla:
   - El rectángulo de la cancha, de **52,5 × 34 cm**, va centrado en la base (sobran unos 3,75 cm a cada lado del largo y 3 cm a cada lado del ancho).
   - La línea central y el **círculo central**: abran el compás con el radio de su tabla y pinchen en el centro de la cancha.
   - Las dos **áreas grandes**, una en cada lado corto, centradas: el "largo del área" va a lo ancho de la cancha y el "fondo del área" hacia adentro.
   - Marquen primero a lápiz con la regla; cuando todo esté bien, repasen con marcador o cinta blanca.
3. Pega las **bandas laterales** (tiras de 3 cm) para que la pelota no se salga.
   - Las tiras van paradas sobre las líneas del borde de la cancha.
   - En el centro de cada lado corto dejen un hueco de **10 cm** (el ancho de la portería).
4. Pega las **porterías** en el centro de cada lado corto. La ventana del sensor debe quedar **mirando hacia la cancha**.
   - La boca de cada portería, justo en su hueco de la banda; el fondo, hacia afuera de la cancha.
   - Si una portería se va a volver a imprimir, peguen la que tienen solo con un punto de pegamento, para cambiarla el sábado 8.
5. Haz un agujero pequeño detrás de cada portería para pasar los cables.
   - Con la punta de un lápiz o un destornillador (con cuidado), en la base, justo detrás de la ventana del sensor.
6. Pongan el **soporte del marcador** a un lado de la cancha, mirando hacia los jugadores. La pantalla y el buzzer se colocan el sábado 8.

[IMAGEN 4.1: cancha armada con líneas blancas a escala, bandas laterales y las dos porterías pegadas]

:::pregunta id="g7p-p1"
¿Por qué las bandas laterales no deben tapar el hueco de las porterías?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] Probamos el sensor, la pantalla y el buzzer en las piezas impresas.
- [ ] Corregimos y exportamos lo que hizo falta.
- [ ] La cancha tiene sus líneas a escala y sus bandas.
- [ ] Las porterías están pegadas con la ventana del sensor hacia la cancha.
:::

## Bitácora (15 min)

:::foto id="g7p-foto"
Foto de la cancha con las porterías.
:::

:::pregunta id="g7p-b1"
¿Qué pieza tuvimos que revisar con más cuidado y por qué?
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** si corrigieron una pieza, suban aquí el .stl nuevo. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (9 sábados):** la revisión de piezas (medidas de la Guía 2 y la Guía 3 Tinkercad, ahora con las piezas impresas) y la cancha de la Guía 4 Tinkercad. Campos propios (g7p-…).
- Reimprimir esta semana las piezas que se corrijan, para el sábado 8.
- Medidas de ejemplo: los dos ojitos del FC-51 ocupan unos 11 mm de ancho (ventana de 12 mm); agujero de 12,4 mm para el buzzer de 12 mm.
- Resultados de la escala: círculo 4,6 cm; área 20,2 × 8,3 cm.
- g7p-p1: la pelota tiene que poder entrar a la portería para que el sensor la vea; si la banda tapa el hueco, no hay gol posible.
- Si un equipo va lento, la cancha puede terminarse al inicio del sábado 8.
- Tiempo total: 15 + 20 + 10 + 55 + 5 + 15 = 120 minutos.
:::
