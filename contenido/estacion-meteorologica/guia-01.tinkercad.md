---
titulo: Un clima que se puede programar
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · Un clima que se puede programar

## Objetivo del día

Conocer el proyecto, formar el equipo con sus roles y hacer nuestra primera estación meteorológica en el simulador Wokwi.

**Al terminar tendremos:** un Arduino virtual que mide temperatura y humedad y las muestra en pantalla.

## Materiales del equipo

- Computadora con internet
- Cuenta en wokwi.com (una por equipo)
- Cuaderno o bitácora

## Parte 1 · ¿Qué vamos a construir? (15 min)

Una **estación meteorológica** mide el clima: temperatura, humedad y luz. La nuestra tendrá una pantalla, un LED que cambia de color y una carcasa impresa en 3D.

Y tendrá algo especial: un **gemelo digital**. Es una copia en la computadora (en Tinkercad) que cambia de color con los datos reales que mide la estación.

Muevan la temperatura en la animación y miren cómo cambian la estación y su gemelo:

:::animacion tipo="gemelo-digital"
:::

[IMAGEN 1.1: render de la estación meteorológica terminada junto a su gemelo digital]

:::pregunta id="g1-p1"
¿Dónde se usan las estaciones meteorológicas en la vida real? Escribe dos ejemplos.
:::

## Parte 2 · Nuestro equipo (15 min)

Cada integrante tendrá un rol. Los roles cambian en algunos proyectos, pero en este los mantendremos.

1. Lean qué hace cada rol y decidan quién tendrá cada uno (si son menos de cuatro, alguien tiene dos).
2. Escriban los nombres en la columna **Integrante**.

| Rol | ¿Qué hace? | Integrante |
| --- | --- | --- |
| Diseñador CAD | Modela la carcasa y el gemelo digital en Tinkercad (Codeblocks) | |
| Constructor | Arma el circuito y la estación | |
| Programador | Escribe y prueba el código | |
| Analista | Anota datos, hace gráficas y cuida la bitácora | |

3. Elijan un nombre para el equipo:

Nombre de nuestro equipo: ______

## Parte 3 · De bloques a texto (15 min)

En Básico programamos con bloques. Ahora escribiremos **código de texto**. Todo programa de Arduino tiene dos partes:

| Parte | ¿Cuándo se ejecuta? | Ejemplo |
| --- | --- | --- |
| `setup()` | Una sola vez, al encender | Preparar el sensor |
| `loop()` | Una y otra vez, sin parar | Medir la temperatura |

Reglas del código de texto:

1. Cada instrucción termina con **punto y coma** `;`
2. Los bloques se abren y cierran con **llaves** `{ }`
3. Lo que va después de `//` es un **comentario**: el Arduino lo ignora, sirve para explicar.

Además: las **mayúsculas y minúsculas cuentan** (`DHT` no es lo mismo que `Dht`). Si el programa tiene un error, el simulador muestra un mensaje en rojo con el número de línea: léanlo con calma, casi siempre falta un `;` o una llave.

[IMAGEN 1.2: comparación de un bloque de "esperar 2 segundos" junto a su versión en texto delay(2000);]

## Parte 4 · Primera estación en Wokwi (35 min)

**Wokwi** es un simulador: arma y prueba circuitos de Arduino en la computadora, sin piezas reales. La página está en inglés; aquí van los nombres de los botones tal como aparecen.

1. Entra a **wokwi.com**, crea un proyecto nuevo de **Arduino Uno**.
   - Inicien sesión con la cuenta del equipo (botón **Sign in**, arriba a la derecha).
   - Bajen hasta **Start from Scratch** y elijan **Arduino Uno**.
   - Se abre una pantalla con el código a la izquierda (pestaña `sketch.ino`) y el Arduino dibujado a la derecha.
2. Con el botón **+** agrega un sensor **DHT22**.
   - El **+** es el botón azul arriba del dibujo. Escriban *DHT22* en el buscador y hagan clic en él.
   - Arrástrenlo cerca del Arduino.
3. Conecta:
   - Para hacer un cable: haz clic en la punta de un pin y luego en el pin de destino. Para borrar un cable: haz clic en él y presiona **Supr**.
   - Al pasar el mouse sobre un pin aparece su nombre.

| Pin del DHT22 | Pin del Arduino |
| --- | --- |
| VCC | 5V |
| SDA | D2 |
| GND | GND |

   El DHT22 de Wokwi tiene un cuarto pin, **NC**, que no se conecta.

[IMAGEN 1.3: circuito en Wokwi con el Arduino Uno y el DHT22 conectado a 5V, D2 y GND]

4. En la pestaña **Library Manager** agrega la librería **DHT sensor library**.
   - Arriba del código, haz clic en la pestaña **Library Manager**, luego en el botón **+**, escribe *DHT sensor library* y elígela de la lista.
   - Una **librería** es código ya hecho por otras personas que nos ahorra trabajo (en este caso, para leer el sensor).
5. Copia este código:
   - Vuelve a la pestaña `sketch.ino`, borra lo que trae y escribe (o pega) el programa con cuidado.

```cpp
#include <DHT.h>

DHT dht(2, DHT22);   // sensor en el pin 2

void setup() {
  dht.begin();
  Serial.begin(9600);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  Serial.print("Temperatura: ");
  Serial.print(temp);
  Serial.print(" C   Humedad: ");
  Serial.print(hum);
  Serial.println(" %");

  delay(2000);
}
```

6. Presiona **Play** (▶). Los datos aparecen abajo, en el **Monitor serie**.
   - **Play** es el botón verde con un triángulo, arriba del dibujo. La primera vez tarda unos segundos en arrancar.
   - Cada 2 segundos aparece una línea nueva con la temperatura y la humedad.
   - Para detener, el botón del cuadrado (stop).

[IMAGEN 1.4: simulación corriendo en Wokwi con el monitor serie mostrando temperatura y humedad]

7. Guarden el proyecto: botón **Save** (arriba). Wokwi le pone un enlace propio: lo verán en la barra del navegador.

## Parte 5 · Experimentar con el simulador (15 min)

Haz clic sobre el DHT22 mientras corre la simulación: aparecen **controles deslizantes**. Mueve la temperatura y anota lo que muestra el monitor.

Pongan el control en cada temperatura de la tabla, esperen a que salga una línea nueva en el monitor y anoten lo que dice.

| Temperatura en el control | ¿Qué muestra el monitor? | ¿Coincide? |
| --- | --- | --- |
| 10 °C | | |
| 25 °C | | |
| 35 °C | | |

:::pregunta id="g1-p2"
La temperatura se guarda en una variable `float` y no en una `int`. Mira los números del monitor: ¿por qué crees que se usa `float`?
:::

**Mini reto:** muestra también la temperatura en grados **Fahrenheit**. Agrega esta línea después de leer `temp` e imprímela:

1. Escribe la línea de abajo en el `loop()`, justo debajo de `float hum = dht.readHumidity();`.
2. Para imprimirla, antes de la línea `Serial.println(" %");` agrega dos líneas: `Serial.print("   F: ");` y `Serial.print(tempF);`.
3. Detén la simulación, vuelve a presionar **Play** y pon el control en 25 °C.

```cpp
float tempF = temp * 1.8 + 32;
```

:::pregunta id="g1-p3"
Si la temperatura es 25 °C, ¿cuántos °F muestra tu programa?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Cada integrante tiene su rol.
- [ ] El circuito del DHT22 está en Wokwi.
- [ ] El monitor serie muestra temperatura y humedad.
- [ ] Probamos los controles del sensor y llenamos la tabla.
:::

## Reto extra

Guarda tu proyecto de Wokwi y copia su enlace en la bitácora. Lo usaremos el sábado 3. Si te sobra tiempo, cambia `delay(2000)` por `delay(500)`: ¿qué pasa?

## Bitácora (15 min)

Para el enlace: presionen **Save**, hagan clic en la barra de direcciones del navegador, cópienla (Ctrl + C) y péguenla abajo (Ctrl + V).

:::pregunta id="g1-b1"
Enlace de nuestro proyecto en Wokwi:
:::

:::pregunta id="g1-b2"
¿Qué es un gemelo digital? Explícalo con tus palabras.
:::

:::pregunta id="g1-b3"
¿Qué fue lo más difícil de pasar de bloques a código de texto?
:::

Si quieren, descarguen también el proyecto como `.zip` (en el menú de la flecha junto a **Save**, opción **Download project zip**) y súbanlo aquí.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Crear las cuentas de Wokwi antes de la clase si la conexión es lenta.
- Error frecuente: olvidar el punto y coma o escribir `Dht` en vez de `DHT`. Enseñar a leer el mensaje de error.
- Si aparece `nan` en el monitor, revisar el cable SDA en D2.
- Respuesta g1-p3: 25 × 1,8 + 32 = 77 °F.
- Tiempo total: 15 + 15 + 15 + 35 + 15 + 5 + 15 = 115 minutos (5 de margen).
:::
