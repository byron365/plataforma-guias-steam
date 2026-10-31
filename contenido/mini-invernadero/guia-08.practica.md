---
titulo: Plantas, datos y demostración
guia: 8
sabado: 8
sesion: Pruebas y presentación
duracion: 120
---

# Guía 8 · Plantas, datos y demostración

## Objetivo del día

Comparar la planta del invernadero con la planta control, graficar los datos que registra el invernadero y presentar el proyecto con una demostración en vivo.

**Al terminar tendremos:** la comparación de las dos plantas, una gráfica de los datos y la demostración presentada.

## Materiales del equipo

- El invernadero completo, con el programa final y el umbral calibrado (sábado 7)
- La fuente de 5 V de la bomba
- Un vaso con tierra seca (para la demostración)
- Regla y computadora con Arduino IDE y hoja de cálculo

## Parte 1 · El grupo control (25 min)

Mide las dos plantas con cuidado:

- **Altura:** regla parada en la tierra, hasta la punta de la planta más alta.
- **Número de hojas:** cuéntenlas dos personas; si no coinciden, cuenten otra vez.
- **Color de las hojas:** por ejemplo verde oscuro, verde claro, amarillas, con manchas.
- **Tierra:** tóquenla con un dedo: ¿seca o húmeda?

:::tabla id="g8p-plantas"
| Maceta | Altura (cm) | Número de hojas | Color de las hojas | ¿Tierra seca o húmeda? |
| --- | --- | --- | --- | --- |
| Con sistema | | | | |
| Control | | | | |
:::

Junten en una hoja de cálculo las alturas de **todos los sábados** y hagan una gráfica de línea con las dos plantas:

1. Columna A: número de sábado. Columna B: altura "Con sistema". Columna C: altura "Control". Las alturas están en la Parte 1 de cada guía, en la plataforma.
2. Seleccionen las tres columnas → **Insertar → Gráfico → Línea**. Pónganle título y nombre a los ejes ("Sábado" y "Altura (cm)").

[IMAGEN 10.1: gráfica de crecimiento de las dos plantas a lo largo de los sábados]

:::pregunta id="g8p-p1"
¿Qué planta creció más? ¿Fue por el invernadero o pudo haber otra causa (luz, semilla, riego a mano)?
:::

## Parte 2 · Los datos del invernadero (25 min)

El programa final escribe cada segundo una línea con la humedad de la tierra y la temperatura (por ejemplo `512,26.00`).

1. Conecten el invernadero y abran el **Monitor serie** a 9600 baudios.
2. Dejen el sensor de humedad en el vaso de **tierra seca** (con la manguera en otro vaso) y esperen a que riegue una vez; después devuélvanlo a la maceta. Así los datos tendrán un riego.
3. Después de unos 5 minutos, seleccionen las líneas del Monitor (**Ctrl + A** dentro del Monitor), cópienlas (**Ctrl + C**) y péguenlas en la columna A de una hoja de cálculo nueva.
4. Separen los dos números: **Datos → Texto en columnas**, elijan **coma** como separador.
5. Seleccionen la columna de la humedad → **Insertar → Gráfico → Línea**. Agreguen una flecha o un cuadro de texto (**Insertar → Formas**) donde se ve el riego.

:::foto id="g8p-grafica"
Foto o captura de la gráfica de la humedad de la tierra, señalando el riego.
:::

:::pregunta id="g8p-p2"
En la gráfica, ¿qué le pasa al número de la humedad justo después de regar? ¿Por qué?
:::

## Parte 3 · Demostración final (50 min)

La presentación dura **4 minutos**. Repartan las partes (una persona puede tener dos) y escriban 2 o 3 ideas cortas de qué decir o mostrar en cada una:

:::tabla id="g8p-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| ¿Qué necesita una planta y qué hace un invernadero? | | |
| Cómo diseñamos las piezas en Tinkercad y simulamos en Wokwi | | |
| Las dos plantas y la gráfica de los datos | | |
| Demostración: secar la tierra y ver que riega | | |
:::

1. Ensayen una vez con cronómetro (10 min).
2. Presenten por turnos. Para la demostración, pongan el sensor en el vaso de tierra seca y muestren cómo riega (con la manguera en un vaso).
3. Mientras los demás equipos presentan, escuchen y hagan al menos una pregunta.

## ¿Lo logramos? (5 min)

:::checklist id="g8p-logramos"
- [ ] Medimos y comparamos las dos plantas.
- [ ] Hicimos la gráfica de crecimiento.
- [ ] Hicimos la gráfica de los datos del invernadero.
- [ ] Presentamos el invernadero con la demostración.
:::

## Reto extra

Hagan también la gráfica de la **temperatura** y comparen: ¿cambió la temperatura cuando se abrió la ventana?

## Bitácora (15 min)

:::foto id="g8p-foto"
Foto de las dos plantas juntas y del invernadero completo.
:::

:::pregunta id="g8p-b1"
Si siguieran con el proyecto, ¿qué le cambiarían al invernadero? ¿Por qué?
:::

Antes de irse, **desenchufen la fuente**, saquen la bomba del agua y séquenla.

:::archivo id="g8-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) y la hoja de cálculo con las gráficas. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión práctica (8 sábados):** último sábado. Junta la comparación con el grupo control de la Guía 10 normal, las gráficas de la Guía 8 normal y la presentación (Guía 9 normal), sin cartel. Campos propios (g8p-…).
- Las semillas se sembraron el sábado 1; para el sábado 8 la planta de rábano o frijol debería tener varias hojas.
- g8p-p1: hay que pensar en otras causas: la luz que recibió cada maceta, que una semilla sea más fuerte, cuánta agua recibió la control.
- g8p-p2: el número baja (la tierra está más húmeda) y después sube despacio a medida que se seca.
- Si el Monitor serie no deja copiar, usar el **Serial Plotter** (Herramientas) para ver la gráfica directamente y hacer una captura.
- Tiempo total: 25 + 25 + 50 + 5 + 15 = 120 minutos.
:::
