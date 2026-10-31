---
titulo: Probamos el dispensador doble y lo presentamos
guia: 8
sabado: 8
sesion: Pruebas y presentación
duracion: 120
---

# Guía 8 · Probamos el dispensador doble y lo presentamos

## Objetivo del día

Probar el dispensador doble con cereal y agua, ajustar las porciones a ojo hasta que sirva bien y hacer la demostración final.

**Al terminar tendremos:** el dispensador doble sirviendo bien cereal y líquido, con los botones y a su hora, y la demostración presentada.

## Materiales del equipo

- Dispensador doble armado con su circuito y el programa final (sábado 7)
- Cereal, agua, vaso, plato y una bandeja o trapo (para derrames)
- La fuente de 5 V de la bomba
- Computadora con Arduino IDE y el circuito simulado en Tinkercad

## Parte 1 · ¿Funciona igual que en el simulador? (20 min)

1. Revisen que la bomba esté sumergida. Conecten el USB y enchufen la fuente de 5 V (el tomacorriente lejos del agua). Debe estar el programa `equipo_NOMBRE_final` (si no, súbanlo otra vez).
2. Abran el **Monitor serie** (lupa arriba a la derecha) a **9600 baudios**.
3. Presionen cada botón y esperen la comida automática. Marquen la tabla:

:::tabla id="g8dp-comparar"
| Prueba | ¿En el simulador funcionaba? | ¿En el dispensador real funciona? | Si no, ¿qué revisamos? |
| --- | --- | --- | --- |
| Botón C: aviso, LED y compuerta | | | |
| Botón L: aviso grave, LED y bomba | | | |
| La bomba se apaga sola al pasar el tiempo | | | |
| Sirve solo cereal y líquido al pasar el intervalo | | | |
| El Monitor cuenta las porciones | | | |
:::

Si algo falla en el real pero funcionaba en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Tinkercad.

## Parte 2 · Pruebas con cereal y agua (35 min)

Pongan la bandeja debajo de todo. Llenen la botella hasta la mitad con cereal.

1. Presionen cada botón 3 veces, esperando entre una y otra. Después de cada prueba, vacíen el plato y el vaso.

:::tabla id="g8dp-pruebas"
| Prueba | Botón | ¿Salió cereal o líquido? | ¿Se atascó o se derramó? |
| --- | --- | --- | --- |
| 1 | C | | |
| 2 | C | | |
| 3 | C | | |
| 4 | L | | |
| 5 | L | | |
| 6 | L | | |
:::

2. Ajusten a ojo, cambiando los **Ajustes del equipo** y subiendo el programa otra vez:
   - **El cereal se atasca** → `ABIERTA` a 90. Revisen que la compuerta no choque; si choca, regresen a 70 y avisen al docente.
   - **La porción de cereal se ve muy poca o demasiada** → cambien `TIEMPO_GATO`. Una buena porción de gato apenas cubre el fondo del plato.
   - **El vaso queda muy vacío o se derrama** → cambien `BOMBA_GATO`.
3. Prueben con `MASCOTA = 3`: las porciones deben verse unas cuatro veces la del gato, **sin derramar el vaso**.

:::tabla id="g8dp-ajustes"
| Ajuste | Valor final | ¿Por qué? |
| --- | --- | --- |
| ABIERTA (°) | | |
| TIEMPO_GATO (ms) | | |
| BOMBA_GATO (ms) | | |
| MASCOTA | | |
:::

:::pregunta id="g8dp-p1"
¿Qué ajuste tuvieron que hacer en el dispensador real que no hacía falta en el simulador? ¿Por qué?
:::

## Parte 3 · El horario con comida (10 min)

1. Dejen la botella con cereal, el plato y el vaso vacíos.
2. No toquen nada durante el intervalo: debe servir solo, cereal y después líquido.
3. Revisen en el Monitor serie el número de las porciones.

## Parte 4 · Demostración final (40 min)

Cada equipo presenta su dispensador en **3 minutos**. Repartan las partes (una persona puede tener dos) y escriban 2 o 3 ideas cortas para cada una:

:::tabla id="g8dp-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| El problema: mascotas solas en casa | | |
| Cómo diseñamos las piezas en Tinkercad | | |
| Cómo lo simulamos: la compuerta, el relé y la bomba | | |
| Demostración: cereal, líquido y comida automática | | |
:::

1. Ensayen una vez (10 min).
2. Presenten por turnos. Mientras los demás equipos presentan, escuchen y hagan al menos una pregunta.

## ¿Lo logramos? (5 min)

:::checklist id="g8dp-logramos"
- [ ] Comparamos el dispensador real con el simulado.
- [ ] Probamos cereal y líquido y ajustamos las porciones.
- [ ] El dispensador sirvió solo a su hora.
- [ ] Presentamos el dispensador.
:::

## Reto extra

Haz que el LED **parpadee** mientras la bomba está encendida, para que se note que está sirviendo líquido.

Pista: en `servirLiquido()`, cambien el `delay` por un `for` que apague y encienda el LED; hagan que el tiempo total siga siendo el de la porción.

## Bitácora (10 min)

:::foto id="g8dp-foto"
Video del dispensador sirviendo cereal y líquido.
:::

:::pregunta id="g8dp-b1"
Si tuvieran que hacer otro proyecto, ¿lo simularían primero? ¿Por qué?
:::

Antes de irse, **desenchufen la fuente**, vacíen el recipiente del agua y sequen la bomba.

:::archivo id="g8-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) con los ajustes del dispensador real. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión doble práctica (8 sábados):** último sábado. Las porciones se ajustan a ojo, sin báscula ni vaso medidor (decisión de Bairon). Sin ficha técnica ni cartel. Campos propios (g8dp-…).
- Nunca encender la bomba en seco por mucho tiempo: se daña. Si gira débil, revisar que la fuente sea de 5 V y al menos 1 A, y que los tornillos del jack y del relé estén apretados.
- Algunos módulos relé se activan con LOW: si la bomba se enciende al arrancar, invertir HIGH y LOW en las líneas de la bomba.
- Si se escapa cereal con la compuerta cerrada, acercar la compuerta a la salida o pegarle un pedazo de fomi.
- Para la demostración, `INTERVALO = 60000` (un minuto) o menos, para que se vea la comida automática.
- Tiempo total: 20 + 35 + 10 + 40 + 5 + 10 = 120 minutos.
:::
