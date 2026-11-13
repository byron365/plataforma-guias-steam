---
titulo: Probamos el dispensador doble y lo presentamos
guia: 10
sabado: 10
sesion: Pruebas y presentación
duracion: 120
---

# Guía 10 · Probamos el dispensador doble y lo presentamos

## Objetivo del día

Probar el dispensador doble con cereal y agua, ajustar las porciones a ojo hasta que sirva bien y hacer la demostración final.

**Al terminar tendremos:** el dispensador doble sirviendo bien cereal y líquido, con los botones y a su hora, y la demostración presentada.

## Materiales del equipo

- Dispensador doble armado con su circuito y el programa final (guías 8 y 9)
- Cereal, agua, vaso, plato y una bandeja o trapo (para derrames)
- La fuente de 5 V de la bomba
- Computadora con Arduino IDE y el circuito simulado en Tinkercad

## Parte 1 · Pruebas con cereal y agua (45 min)

Revisen que la bomba esté sumergida, conecten el USB, enchufen la fuente de 5 V (el tomacorriente lejos del agua) y abran el **Monitor serie** a **9600 baudios**, como en la Guía 9.

Pongan la bandeja debajo de todo. Llenen la botella hasta la mitad con cereal.

1. Presionen cada botón 3 veces, esperando entre una y otra. Después de cada prueba, vacíen el plato y el vaso.

:::tabla id="g10dp-pruebas"
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

:::tabla id="g10dp-ajustes"
| Ajuste | Valor final | ¿Por qué? |
| --- | --- | --- |
| ABIERTA (°) | | |
| TIEMPO_GATO (ms) | | |
| BOMBA_GATO (ms) | | |
| MASCOTA | | |
:::

:::pregunta id="g10dp-p1"
¿Qué ajuste tuvieron que hacer en el dispensador real que no hacía falta en el simulador? ¿Por qué?
:::

## Parte 2 · El horario con comida (10 min)

1. Dejen la botella con cereal, el plato y el vaso vacíos.
2. No toquen nada durante el intervalo: debe servir solo, cereal y después líquido.
3. Revisen en el Monitor serie el número de las porciones.

## Parte 3 · Demostración final (50 min)

Cada equipo presenta su dispensador en **3 minutos**. Repartan las partes (una persona puede tener dos) y escriban 2 o 3 ideas cortas para cada una:

:::tabla id="g10dp-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| El problema: mascotas solas en casa | | |
| Cómo diseñamos las piezas en Tinkercad | | |
| Cómo lo simulamos: la compuerta, el relé y la bomba | | |
| Demostración: cereal, líquido y comida automática | | |
:::

1. Ensayen una vez (15 min).
2. Presenten por turnos. Mientras los demás equipos presentan, escuchen y hagan al menos una pregunta.

## ¿Lo logramos? (5 min)

:::checklist id="g10dp-logramos"
- [ ] Probamos cereal y líquido y ajustamos las porciones.
- [ ] El dispensador sirvió solo a su hora.
- [ ] Presentamos el dispensador.
:::

## Reto extra

Haz que el LED **parpadee** mientras la bomba está encendida, para que se note que está sirviendo líquido.

Pista: en `servirLiquido()`, cambien el `delay` por un `for` que apague y encienda el LED; hagan que el tiempo total siga siendo el de la porción.

## Bitácora (10 min)

:::foto id="g10dp-foto"
Video del dispensador sirviendo cereal y líquido.
:::

:::pregunta id="g10dp-b1"
Si tuvieran que hacer otro proyecto, ¿lo simularían primero? ¿Por qué?
:::

Antes de irse, **desenchufen la fuente**, vacíen el recipiente del agua y sequen la bomba.

:::archivo id="g10-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) con los ajustes del dispensador real. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión doble práctica (10 sábados):** último sábado; antes era la Guía 8. La comparación con el simulador (antes Parte 1) pasó a la Guía 9. Las porciones se ajustan a ojo, sin báscula ni vaso medidor (decisión de Bairon). Sin ficha técnica ni cartel. Campos propios (g10dp-…).
- Nunca encender la bomba en seco por mucho tiempo: se daña. Si gira débil, revisar que la fuente sea de 5 V y al menos 1 A, y que los tornillos del jack y del relé estén apretados.
- Algunos módulos relé se activan con LOW: si la bomba se enciende al arrancar, invertir HIGH y LOW en las líneas de la bomba.
- Si se escapa cereal con la compuerta cerrada, acercar la compuerta a la salida o pegarle un pedazo de fomi.
- Para la demostración, `INTERVALO = 60000` (un minuto) o menos, para que se vea la comida automática.
- Tiempo total: 45 + 10 + 50 + 5 + 10 = 120 minutos.
:::
