---
titulo: Probamos el dispensador y lo presentamos
guia: 10
sabado: 10
sesion: Pruebas y presentación
duracion: 120
---

# Guía 10 · Probamos el dispensador y lo presentamos

## Objetivo del día

Probar el dispensador real con croquetas, ajustar la porción a ojo hasta que sirva bien y hacer la demostración final.

**Al terminar tendremos:** el dispensador sirviendo bien la porción de su mascota, con el botón y a su hora, y la demostración presentada.

## Materiales del equipo

- Dispensador armado con su circuito y el programa final (guías 8 y 9)
- Croquetas, plato y una bandeja o caja (las croquetas ruedan)
- Computadora con Arduino IDE y el circuito simulado en Tinkercad

## Parte 1 · Pruebas con croquetas (45 min)

Conecten el USB y abran el **Monitor serie** a **9600 baudios**, como en la Guía 9.

Pongan la bandeja debajo de todo. Llenen la botella hasta la mitad con croquetas.

1. Presionen el botón 5 veces, esperando entre una y otra, y anoten. Después de cada prueba, vacíen el plato.

:::tabla id="g10p-pruebas"
| Prueba | ¿Cayó comida? | ¿Se atascó? | ¿Se escapó comida con la compuerta cerrada? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
:::

2. Ajusten a ojo, cambiando los **Ajustes del equipo** y subiendo el programa otra vez:
   - **Se atasca** → `ABIERTA` a 90. Revisen que la compuerta no choque; si choca, regresen a 70 y avisen al docente.
   - **La porción del gato se ve muy poca o demasiada** → cambien `TIEMPO_GATO`. Una buena porción de gato apenas cubre el fondo del plato.
3. Con su `TIEMPO_GATO` elegido, prueben las tres mascotas: la del perro grande debe verse unas cuatro veces la del gato.

:::tabla id="g10p-ajustes"
| Ajuste | Valor final | ¿Por qué? |
| --- | --- | --- |
| ABIERTA (°) | | |
| TIEMPO_GATO (ms) | | |
| MASCOTA | | |
:::

:::pregunta id="g10p-p1"
¿Qué ajuste tuvieron que hacer en el dispensador real que no hacía falta en el simulador? ¿Por qué?
:::

## Parte 2 · El horario con comida (10 min)

1. Dejen la botella con croquetas y el plato vacío.
2. No toquen nada durante el intervalo: el dispensador debe servir solo.
3. Revisen en el Monitor serie el número de la comida.

## Parte 3 · Demostración final (50 min)

Cada equipo presenta su dispensador en **3 minutos**. Repartan las partes (una persona puede tener dos) y escriban 2 o 3 ideas cortas para cada una:

:::tabla id="g10p-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| El problema: mascotas solas en casa | | |
| Cómo diseñamos las piezas en Tinkercad | | |
| Cómo lo simulamos antes de armarlo | | |
| Demostración: porción con el botón y comida automática | | |
:::

1. Ensayen una vez (15 min).
2. Presenten por turnos. Mientras los demás equipos presentan, escuchen y hagan al menos una pregunta.

## ¿Lo logramos? (5 min)

:::checklist id="g10p-logramos"
- [ ] Hicimos 5 pruebas con croquetas y ajustamos la porción.
- [ ] El dispensador sirvió solo a su hora.
- [ ] Presentamos el dispensador.
:::

## Reto extra

Haz que el buzzer toque una melodía corta (tres notas) para llamar a la mascota en lugar de un solo pitido.

Pista: en `servir()`, cambien el `tone(BUZZER, 1500, 300);` por tres `tone` con notas distintas y un `delay` entre ellos.

## Bitácora (10 min)

:::foto id="g10p-foto"
Video del dispensador sirviendo croquetas.
:::

:::pregunta id="g10p-b1"
Si tuvieran que hacer otro proyecto, ¿lo simularían primero? ¿Por qué?
:::

:::archivo id="g10-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) con los ajustes del dispensador real. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica (10 sábados):** último sábado; antes era la Guía 8. La comparación con el simulador (antes Parte 1) pasó a la Guía 9. La porción se ajusta a ojo, sin báscula (decisión de Bairon). Sin ficha técnica ni cartel. Campos propios (g10p-…).
- Si se escapa comida con la compuerta cerrada, acercar la compuerta a la salida o pegarle un pedazo de fomi.
- Si el servo se traba con croquetas grandes, probar croquetas más pequeñas o `ABIERTA` mayor.
- Para la demostración, `INTERVALO = 60000` (un minuto) o menos, para que se vea la comida automática.
- Invitar a las familias a la demostración si es posible.
- Tiempo total: 45 + 10 + 50 + 5 + 10 = 120 minutos.
:::
