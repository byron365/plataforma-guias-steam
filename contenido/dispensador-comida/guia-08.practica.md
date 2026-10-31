---
titulo: Probamos el dispensador y lo presentamos
guia: 8
sabado: 8
sesion: Pruebas y presentación
duracion: 120
---

# Guía 8 · Probamos el dispensador y lo presentamos

## Objetivo del día

Probar el dispensador real con croquetas, ajustar la porción a ojo hasta que sirva bien y hacer la demostración final.

**Al terminar tendremos:** el dispensador sirviendo bien la porción de su mascota, con el botón y a su hora, y la demostración presentada.

## Materiales del equipo

- Dispensador armado con su circuito y el programa final (sábado 7)
- Croquetas, plato y una bandeja o caja (las croquetas ruedan)
- Computadora con Arduino IDE y el circuito simulado en Tinkercad

## Parte 1 · ¿Funciona igual que en el simulador? (20 min)

1. Conecten el USB. Debe estar el programa `equipo_NOMBRE_final` del sábado 7 (si no, súbanlo otra vez).
2. Abran el **Monitor serie** (lupa arriba a la derecha) a **9600 baudios**.
3. Sin comida todavía, presionen el botón y esperen la comida automática. Marquen la tabla:

:::tabla id="g8p-comparar"
| Prueba | ¿En el simulador funcionaba? | ¿En el dispensador real funciona? | Si no, ¿qué revisamos? |
| --- | --- | --- | --- |
| Al presionar el botón, suena el aviso | | | |
| Se enciende el LED | | | |
| La compuerta se abre y se cierra | | | |
| Sirve sola al pasar el intervalo | | | |
| El Monitor cuenta las comidas | | | |
:::

Si algo falla en el real pero funcionaba en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Tinkercad.

## Parte 2 · Pruebas con croquetas (35 min)

Pongan la bandeja debajo de todo. Llenen la botella hasta la mitad con croquetas.

1. Presionen el botón 5 veces, esperando entre una y otra, y anoten. Después de cada prueba, vacíen el plato.

:::tabla id="g8p-pruebas"
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

:::tabla id="g8p-ajustes"
| Ajuste | Valor final | ¿Por qué? |
| --- | --- | --- |
| ABIERTA (°) | | |
| TIEMPO_GATO (ms) | | |
| MASCOTA | | |
:::

:::pregunta id="g8p-p1"
¿Qué ajuste tuvieron que hacer en el dispensador real que no hacía falta en el simulador? ¿Por qué?
:::

## Parte 3 · El horario con comida (10 min)

1. Dejen la botella con croquetas y el plato vacío.
2. No toquen nada durante el intervalo: el dispensador debe servir solo.
3. Revisen en el Monitor serie el número de la comida.

## Parte 4 · Demostración final (40 min)

Cada equipo presenta su dispensador en **3 minutos**. Repartan las partes (una persona puede tener dos) y escriban 2 o 3 ideas cortas para cada una:

:::tabla id="g8p-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| El problema: mascotas solas en casa | | |
| Cómo diseñamos las piezas en Tinkercad | | |
| Cómo lo simulamos antes de armarlo | | |
| Demostración: porción con el botón y comida automática | | |
:::

1. Ensayen una vez (10 min).
2. Presenten por turnos. Mientras los demás equipos presentan, escuchen y hagan al menos una pregunta.

## ¿Lo logramos? (5 min)

:::checklist id="g8p-logramos"
- [ ] Comparamos el dispensador real con el simulado.
- [ ] Hicimos 5 pruebas con croquetas y ajustamos la porción.
- [ ] El dispensador sirvió solo a su hora.
- [ ] Presentamos el dispensador.
:::

## Reto extra

Haz que el buzzer toque una melodía corta (tres notas) para llamar a la mascota en lugar de un solo pitido.

Pista: en `servir()`, cambien el `tone(BUZZER, 1500, 300);` por tres `tone` con notas distintas y un `delay` entre ellos.

## Bitácora (10 min)

:::foto id="g8p-foto"
Video del dispensador sirviendo croquetas.
:::

:::pregunta id="g8p-b1"
Si tuvieran que hacer otro proyecto, ¿lo simularían primero? ¿Por qué?
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) con los ajustes del dispensador real. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica (8 sábados):** último sábado. La porción se ajusta a ojo, sin báscula (decisión de Bairon). Sin ficha técnica ni cartel. Campos propios (g8p-…).
- Si se escapa comida con la compuerta cerrada, acercar la compuerta a la salida o pegarle un pedazo de fomi.
- Si el servo se traba con croquetas grandes, probar croquetas más pequeñas o `ABIERTA` mayor.
- Para la demostración, `INTERVALO = 60000` (un minuto) o menos, para que se vea la comida automática.
- Invitar a las familias a la demostración si es posible.
- Tiempo total: 20 + 35 + 10 + 40 + 5 + 10 = 120 minutos.
:::
