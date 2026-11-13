---
titulo: Simulamos el semáforo y la alarma
guia: 4
sabado: 4
sesion: Simulación (1)
duracion: 120
---

# Guía 4 · Simulamos el semáforo y la alarma

## Objetivo del día

Conocer **Tinkercad Circuits**, planear la secuencia del puente con un diagrama de flujo y simular el semáforo, la alarma y el botón antes de tocar las piezas reales.

**Al terminar tendremos:** el diagrama de flujo y un circuito simulado que hace la secuencia del semáforo y la alarma al presionar un botón.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del equipo
- Bitácora y lápiz

Mientras simulamos (sábados 4, 5 y 6), se imprimen las piezas del puente que diseñaron en las guías 2 y 3.

## Parte 1 · Conociendo Tinkercad Circuits (15 min)

Un **simulador** imita un circuito real: el Arduino, los LEDs y los cables son virtuales, pero el código es el mismo. Así probamos todo sin miedo a quemar nada y, cuando funcione, lo armamos de verdad.

1. Entra a **tinkercad.com** con la cuenta del equipo.
2. Arriba a la derecha, **+ Crear → Circuitos**.
3. Haz clic en el nombre inventado de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_puente_sim`. **Enter**. El diseño se guarda solo.

| Parte | Dónde está y para qué sirve |
| --- | --- |
| Área de trabajo | El centro de la pantalla: ahí se arma el circuito |
| Componentes | Panel de la derecha, en **Básico**. Arriba tiene **Buscar** para encontrar una pieza por su nombre |
| Código | Botón de arriba: abre el programa del Arduino |
| Iniciar simulación | Botón de arriba: enciende el circuito. Cambia a **Detener simulación** |
| Monitor en serie | Abajo del panel de código, como en Arduino IDE |

[IMAGEN 4.1P: editor de Tinkercad Circuits con sus partes señaladas: área de trabajo, panel de componentes, botón Código e Iniciar simulación]

**Cómo se usan:**

- **Poner una pieza:** arrástrala del panel de la derecha al área de trabajo.
- **Cambiarla:** haz clic sobre ella. Aparece un cuadro con sus datos (por ejemplo, el color del LED o el valor de la resistencia).
- **Poner un cable:** haz clic en un pin o un agujero de la protoboard y luego en el otro extremo. Con el selector de color de arriba le cambias el color.
- **Borrar:** selecciona la pieza o el cable y presiona **Supr**.

## Parte 2 · El diagrama de flujo (20 min)

Antes de armar, planeamos los pasos del puente. Un **diagrama de flujo** muestra los pasos de un programa en orden. Usa figuras:

| Figura | Significa |
| --- | --- |
| Óvalo | Inicio |
| Rectángulo | Una acción (encender, mover, esperar) |
| Rombo | Una pregunta con respuesta Sí / No |

Ordena la secuencia del puente:

Completen los espacios con lo que pasa en cada paso (los colores del semáforo y lo que hace el puente).

:::tabla id="g4p-secuencia"
| Paso | ¿Qué hace el puente? |
| --- | --- |
| 1 | Medir la distancia |
| 2 | ¿Hay un barco a menos de 10 cm? Si no, volver al paso 1 |
| 3 | Luz ______ y alarma |
| 4 | Luz ______ |
| 5 | ______ el puente |
| 6 | Esperar 4 segundos |
| 7 | ______ el puente |
| 8 | Luz ______ |
:::

:::animacion tipo="diagrama-flujo" programa="puente" ocultar="si"
:::

Dibuja el diagrama completo en la bitácora: óvalo de Inicio, un rombo para la pregunta del paso 2 (con su flecha "No" que regresa al paso 1) y rectángulos para las acciones, unidos con flechas. Del paso 8, una flecha de regreso al paso 1.

Hoy simulamos los pasos 3, 4, 6 y 8 (semáforo y alarma). Los pasos 1 y 2 los hará un **botón** por ahora; el puente que sube y baja llega el sábado 5 y el sensor el sábado 6.

## Parte 3 · El circuito en el simulador (40 min)

1. **Arduino y protoboard:** arrastra un **Arduino Uno R3** y una **Placa de pruebas pequeña**. Déjalos uno al lado del otro, sin que se tapen.
2. **Filas + y −:** un cable del **5V** del Arduino a la fila **+** de la protoboard y otro del **GND** a la fila **−**.
3. **Tres LEDs:** arrastra tres **LED** a la protoboard. Al soltarlos, sus patas entran en los agujeros.
   - Haz clic en cada uno y cambia su **color**: rojo, amarillo y verde.
   - Pasa el mouse sobre las patas: Tinkercad dice cuál es el **ánodo** (+, la pata larga, doblada) y cuál el **cátodo** (−).
4. **Tres resistencias:** arrastra una **Resistencia** por LED, desde la fila de la pata larga hacia otra fila libre. Haz clic en cada una y cambia su valor a **220 Ω**.
5. **Buzzer:** busca **Piezo** y ponlo en la protoboard.
6. **Botón:** arrastra un **Pulsador** sobre la canaleta del centro de la protoboard.
7. Conecta con cables, como en la tabla:

| Componente | Conexión |
| --- | --- |
| LED verde / amarillo / rojo | Resistencia → D2 / D3 / D4 · cátodo → fila − |
| Piezo (buzzer) | + → D5 · − → fila − |
| Pulsador | Una pata → D6 · la pata en diagonal → fila − |

[IMAGEN 4.2P: semáforo, piezo y pulsador armados en Tinkercad Circuits, con sus cables al Arduino]

Comparen su circuito con la animación, cable por cable (por ahora sin los servos):

:::animacion tipo="conexiones" circuito="puente-boton"
:::

## Parte 4 · La secuencia con botón (30 min)

1. Toca **Código**. Arriba dice **Bloques**: ábrelo y elige **Texto**. Aparece la pregunta "¿Está seguro?": toca **Continuar**.
2. Borra todo lo que trae (**Ctrl + A** y **Supr**) y escribe:

```cpp
const int VERDE = 2, AMARILLO = 3, ROJO = 4, BUZZER = 5, BOTON = 6;
const int TIEMPO_ARRIBA = 4000; // ms

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(ROJO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BOTON, INPUT_PULLUP);
  digitalWrite(VERDE, HIGH);
}

void loop() {
  if (digitalRead(BOTON) == LOW) {   // botón presionado
    digitalWrite(VERDE, LOW);
    digitalWrite(AMARILLO, HIGH);
    tone(BUZZER, 1000, 1500);        // alarma
    delay(2000);
    digitalWrite(AMARILLO, LOW);
    digitalWrite(ROJO, HIGH);
    delay(TIEMPO_ARRIBA);            // aquí subirá y bajará el puente
    digitalWrite(ROJO, LOW);
    digitalWrite(VERDE, HIGH);
  }
}
```

3. Toca **Iniciar simulación**. Debe encenderse el verde.
   - Si sale un recuadro rojo de error, lean la línea que marca y revisen esa parte del código (un `;` o una llave que falte).
4. Haz clic sobre el **pulsador** para presionarlo y observa la secuencia. Marquen la tabla.

:::tabla id="g4p-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Al presionar, se enciende el amarillo y suena la alarma | | |
| Después se enciende el rojo | | |
| Pasan unos segundos y vuelve el verde | | |
:::

:::pregunta id="g4p-p1"
En el diagrama, ¿qué pasos hace hoy el botón? ¿Qué paso del código "guarda el lugar" para el puente?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] Dibujamos el diagrama de flujo.
- [ ] El circuito del semáforo, el piezo y el pulsador está armado en Tinkercad.
- [ ] Al presionar el pulsador, el simulador hace la secuencia.
:::

## Reto extra

Haz que la alarma suene **intermitente** (pitidos cortos) mientras el rojo está encendido.

Pista: en vez de `delay(TIEMPO_ARRIBA);`, un `for` que se repita varias veces con un pitido corto (`tone`) y una pausa en cada vuelta. Hagan que el tiempo total sea parecido a 4 segundos.

## Bitácora (10 min)

:::foto id="g4p-foto"
Captura de pantalla del circuito simulado (tecla **Impr Pant** o la herramienta Recortes de Windows).
:::

:::pregunta id="g4p-b1"
¿Para qué sirve simular antes de armar el circuito de verdad?
:::

El diseño queda guardado en Tinkercad (**Diseños → Circuitos**). El próximo sábado seguimos en el mismo.

:::archivo id="g4-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica (10 sábados):** guías 1 a 3 iguales a la versión Tinkercad; 4, 5 y 6 simulan el puente por partes en Tinkercad Circuits mientras se imprimen las piezas; 7 arma el puente, 8 y 9 son guías de armado (circuito y subir el programa) y 10 ajusta y presenta. Campos propios (g4p-…).
- Imprimir esta semana y la siguiente las 7 piezas (orillas, hojas, torres y soporte del sensor) y tener los componentes de la lista para el sábado 7.
- g4p-secuencia: paso 3 amarillo; 4 rojo; 5 subir; 7 bajar; 8 verde.
- g4p-p1: el botón hace los pasos 1 y 2 (decide cuándo empezar); `delay(TIEMPO_ARRIBA)` guarda el lugar de subir, esperar y bajar.
- En Tinkercad, al pasar de Bloques a Texto pueden quedar restos del ejemplo: por eso se borra todo con Ctrl + A.
- El pulsador del simulador se presiona con un clic; si el equipo no ve la secuencia, revisar que el pulsador cruce la canaleta y que el cable vaya a la pata en diagonal.
- Tiempo total: 15 + 20 + 40 + 30 + 5 + 10 = 120 minutos.
:::
