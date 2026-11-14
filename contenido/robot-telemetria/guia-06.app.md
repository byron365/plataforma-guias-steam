---
titulo: La app (1): la pantalla y los botones
guia: 6
sabado: 6
sesion: App Inventor (1)
duracion: 120
---

# Guía 6 · La app (1): la pantalla y los botones

## Objetivo del día

Conocer **MIT App Inventor**, diseñar la pantalla de la app y programar con bloques la conexión Bluetooth y los cuatro botones.

**Al terminar tendremos:** la pantalla de la app terminada y los bloques que conectan el Bluetooth y calculan la velocidad de cada motor.

## Materiales del equipo

- Computadora con internet y mouse
- Una cuenta de Google (la del equipo o la que indique el docente)
- El mensaje de cada botón (tabla de la Guía 5)
- Si hay: un celular o tablet Android con la app **MIT AI2 Companion**, para ver la app en vivo
- Bitácora

**Cómo leer las imágenes:** cada recuadro morado tiene un número. El número es el paso de la lista que está junto a la imagen.

## Parte 1 · Conociendo App Inventor (20 min)

**MIT App Inventor** es una página gratuita para crear apps de Android con bloques, como Scratch. Tiene dos pantallas: el **Diseñador**, donde se dibuja la app, y **Bloques**, donde se programa.

1. Entren a **ai2.appinventor.mit.edu** e inicien sesión con la cuenta de Google. Si aparece un aviso de bienvenida, toquen **Continuar**.
2. Si la página está en inglés: arriba a la derecha, en **English**, elijan **Español**.
3. Creen el proyecto como muestran las dos imágenes:

[IMAGEN 6.1A: menú Proyectos abierto con la opción Comenzar un proyecto nuevo]

1. Toquen el menú **Proyectos**, en la barra de arriba.
2. Elijan **Comenzar un proyecto nuevo**.

[IMAGEN 6.2A: aviso Crear un nuevo proyecto de App Inventor con el nombre escrito y el botón Aceptar]

1. En **Nombre del proyecto** escriban `equipo_NOMBRE_robot` (sin espacios ni tildes). Lo demás se deja como está.
2. Toquen **Aceptar**. El proyecto se guarda solo.

Se abre el **Diseñador**. Así se va a ver cuando la app esté terminada:

[IMAGEN 6.3A: Diseñador de App Inventor con la pantalla de la app terminada y sus partes numeradas: Paleta, Visor, Componentes, Cambiar nombre, Propiedades y los botones Diseñador y Bloques]

| N.º | Parte | Dónde está y para qué sirve |
| --- | --- | --- |
| 1 | Paleta | A la izquierda: las piezas de la app. Arriba tiene **Buscar Componentes** |
| 2 | Visor | En el centro: la pantalla del celular |
| 3 | Componentes | Las piezas que ya pusimos, en orden |
| 4 | Cambiar nombre | Debajo de Componentes: le pone nombre a la pieza elegida |
| 5 | Propiedades | A la derecha: los datos de la pieza elegida (texto, tamaño, color…) |
| 6 | Diseñador y Bloques | Botones de arriba a la derecha: pasan de una pantalla a la otra |

**Cómo se usan:**

- **Poner una pieza:** arrástrala de la Paleta al Visor.
- **Cambiarle el nombre:** elígela en Componentes, toca **Cambiar nombre**, escribe el nombre y toca **Aceptar**.
- **Cambiar un dato:** elige la pieza, busca el dato en Propiedades, escribe el valor y presiona **Enter**.

## Parte 2 · La pantalla de la app (40 min)

Pongan las piezas **en este orden, de arriba abajo**, y cámbienles el nombre.

**1. Título y centrado**

[IMAGEN 6.4A: Screen1 elegido en Componentes, DispHorizontal en Centro y Título con el texto Robot con app]

1. En Componentes, toquen **Screen1**.
2. En Propiedades, en **DispHorizontal**, elijan **Centro**. Así todas las piezas quedan centradas.
3. Bajen en Propiedades hasta **Título**. Borren `Screen1`, escriban `Robot con app` y presionen **Enter**.

**2. El botón de conectar**

[IMAGEN 6.5A: SelectorDeLista arrastrado de la Paleta a la pantalla del celular y su nombre en Componentes]

1. En la Paleta, en **Interfaz de usuario**, busquen **SelectorDeLista**.
2. Arrástrenlo sin soltar el botón del mouse hasta la pantalla del celular y suéltenlo. Aparece un botón con el texto `Texto para SelectorDeLista1`.
3. En Componentes aparece con el nombre **SelectorDeLista1**.

[IMAGEN 6.6A: aviso Renombrar componente con el nuevo nombre Conectar]

1. En Componentes, toquen **SelectorDeLista1**.
2. Toquen **Cambiar nombre**.
3. En **Nuevo nombre** escriban `Conectar`.
4. Toquen **Aceptar**.

[IMAGEN 6.7A: propiedad Texto del SelectorDeLista con el texto Conectar con el robot]

1. En Propiedades, bajen hasta **Texto**. Borren lo que dice, escriban `Conectar con el robot` y presionen **Enter**.

Estos tres pasos (**poner la pieza, cambiarle el nombre y cambiar sus datos**) se repiten igual con todas las piezas que siguen.

**3. El estado**

Arrastren una **Etiqueta** (también en **Interfaz de usuario**) debajo del botón. Nombre `Estado`, **Texto:** `Desconectado`.

**4. La cuadrícula**

[IMAGEN 6.8A: Buscar Componentes con la palabra tabular y la DisposiciónTabular arrastrada debajo de Desconectado]

1. En **Buscar Componentes**, arriba de la Paleta, escriban `tabular`.
2. Arrastren la **DisposiciónTabular** a la pantalla del celular, debajo de `Desconectado`.

[IMAGEN 6.9A: DisposiciónTabular en el Visor con Columnas 3 y Filas 3 en Propiedades]

1. En el Visor aparece un cuadro vacío: es la cuadrícula.
2. En Propiedades pongan **Columnas:** `3`.
3. Y **Filas:** `3`.

Borren la palabra `tabular` de **Buscar Componentes** para ver otra vez todas las piezas.

**5. Los cuatro botones**

Arrastren un **Botón** (en **Interfaz de usuario**) adentro del cuadro de la cuadrícula, en cada casilla de la cruz. Después cámbienle el nombre y el texto a cada uno:

[IMAGEN 6.10A: los cuatro botones en cruz dentro de la cuadrícula y sus nombres dentro de DisposiciónTabular1 en Componentes]

| N.º | Casilla | Nombre | Texto |
| --- | --- | --- | --- |
| 1 | Arriba al centro | `Adelante` | Adelante |
| 2 | En medio a la izquierda | `Izquierda` | Izquierda |
| 3 | En medio a la derecha | `Derecha` | Derecha |
| 4 | Abajo al centro | `Atras` (sin tilde) | Atrás |

En Componentes, los cuatro botones quedan **adentro** de DisposiciónTabular1 (un poco más a la derecha). Si un botón quedó afuera, arrástrenlo otra vez adentro del cuadro.

**6. El resto, debajo de la cuadrícula**

| Pieza | Nombre | Propiedades |
| --- | --- | --- |
| Etiqueta | `TextoVelocidad` | **Texto:** Velocidad |
| Deslizador | `Velocidad` | **ValorMax:** 255 · **ValorMin:** 100 · **PosiciónDelPulsador:** 180 |
| Etiqueta | `Bateria` (sin tilde) | **Texto:** Batería: -- V |
| Etiqueta | `Distancia` | **Texto:** Distancia: -- cm |
| Etiqueta | `Orden` | **Texto:** M,0,0 |

El **Deslizador** está en **Interfaz de usuario**. Sus datos se ponen así:

[IMAGEN 6.11A: deslizador Velocidad elegido, con ValorMax 255, ValorMin 100 y PosiciónDelPulsador 180]

1. En Componentes, toquen **Velocidad**.
2. **ValorMax:** `255`.
3. **ValorMin:** `100`.
4. Bajen hasta **PosiciónDelPulsador:** `180`.

**7. Las piezas invisibles**

No se ven en la pantalla del celular: aparecen debajo del Visor, en **Componentes no visibles**.

[IMAGEN 6.12A: grupo Conectividad abierto en la Paleta, ClienteBluetooth y ClienteBluetooth1 en Componentes no visibles]

1. En la Paleta, bajen hasta el grupo **Conectividad** y tóquenlo para abrirlo.
2. Arrastren **ClienteBluetooth** a la pantalla del celular.
3. Aparece debajo del celular, en **Componentes no visibles**.

[IMAGEN 6.13A: propiedades del ClienteBluetooth1 con ByteDelimitador 10 y DesconectarSiError marcado]

1. En Componentes, toquen **ClienteBluetooth1**.
2. **ByteDelimitador:** `10`.
3. Marquen la casilla **DesconectarSiError**.

Ahora abran el grupo **Sensores** de la Paleta y arrastren un **Reloj** de la misma forma:

[IMAGEN 6.14A: Reloj1 elegido en Componentes con IntervaloDelTemporizador 100]

1. En Componentes, toquen **Reloj1**.
2. **IntervaloDelTemporizador:** `100`.

:::pregunta id="g6a-p1"
El reloj tiene un intervalo de 100 milisegundos. ¿Cuántas veces por segundo se va a enviar la orden al robot?
:::

### Ver la app en vivo en el celular

Si tienen un celular o tablet Android, pueden ver la app mientras la hacen. Cada cambio que hagan en el Diseñador o en Bloques aparece solo en el celular.

1. **En el celular:** abran **Google Play**, busquen **MIT AI2 Companion** e instálenla (es gratis).
2. Conecten el celular a **la misma red Wi-Fi** que la computadora.
3. **En App Inventor**, como muestran las dos imágenes:

[IMAGEN 6.15A: menú Conectar abierto con la opción AI Companion]

1. Toquen el menú **Conectar**, en la barra de arriba.
2. Elijan **AI Companion**.

[IMAGEN 6.16A: aviso Conectado a Companion con el lugar del código QR y del código de 6 letras]

1. Aparece un aviso con un **código QR**.
2. Al lado sale un **código de 6 letras**.

Ahora, **en el celular**:

1. Abran **MIT AI2 Companion** y elijan una de las dos formas:
   - Toquen **scan QR code** y apunten la cámara al código QR de la pantalla.
   - O escriban las 6 letras en el cuadro de texto y toquen **connect with code**.
2. Esperen unos segundos: la app aparece en el celular.

Si no se conecta: revisen que los dos estén en la misma Wi-Fi y prueben **Conectar → Reiniciar conexión**. Para terminar, cierren la app del celular.

## Parte 3 · Conectar con el robot (20 min)

Toquen **Bloques**, arriba a la derecha.

[IMAGEN 6.17A: pantalla de Bloques vacía con los cajones Integrados, los cajones de cada pieza, el Visor, la papelera y los botones Diseñador y Bloques]

1. **Integrados:** los cajones de bloques generales (Control, Lógica, Matemáticas, Texto, Listas, Colores, Variables, Procedimientos).
2. Debajo, un cajón por **cada pieza de la app**, con sus mismos nombres.
3. El **Visor**: ahí se arman los bloques. Al tocar un cajón se abre con sus bloques; se arrastran al Visor y encajan como un rompecabezas.
4. La **papelera**: para borrar un bloque, arrástrenlo hasta ella (o elíjanlo y presionen **Supr**).
5. **Diseñador** y **Bloques**: para volver a la pantalla de la app.

Armen el primer bloque paso a paso:

[IMAGEN 6.18A: cajón Conectar abierto con el bloque cuando Conectar.AntesDeSelección señalado]

1. Toquen el cajón **Conectar**, debajo de Screen1.
2. Arrastren **cuando Conectar.AntesDeSelección** al Visor.

[IMAGEN 6.19A: cajón Control abierto con el bloque si, entonces, else señalado y una flecha hasta el hueco ejecutar]

1. Toquen el cajón **Control**.
2. Arrastren el segundo bloque, el que trae **si / entonces / else**, y suéltenlo dentro del hueco **ejecutar**.

[IMAGEN 6.20A: el bloque si, entonces, else encajado dentro de cuando Conectar.AntesDeSelección]

Cuando encaja bien, el **si** queda pegado adentro del **ejecutar**. Si quedó suelto, arrástrenlo otra vez de la palabra **si**.

Ahora completen los dos bloques hasta que queden igual que en la imagen. El primero prepara la lista de dispositivos Bluetooth antes de abrirla; el segundo se conecta al que elijamos.

[IMAGEN 6.21A: bloques Conectar.AntesDeSelección y Conectar.DespuésDeSelección]

| Bloque | ¿Dónde está? |
| --- | --- |
| cuando Conectar.AntesDeSelección / DespuésDeSelección | Cajón **Conectar** |
| si / entonces | Cajón **Control**. Para agregar el `else`, usen el bloque que ya lo trae |
| ClienteBluetooth1.Habilitado / DireccionesYNombres | Cajón **ClienteBluetooth1** (verde claro) |
| poner Conectar.Elementos como | Cajón **Conectar** (verde oscuro) |
| poner Estado.Texto como | Cajón **Estado** |
| llamar ClienteBluetooth1.Conectar | Cajón **ClienteBluetooth1** (morado) |
| Conectar.Selección | Cajón **Conectar** (verde claro) |
| El texto entre comillas | Cajón **Texto** (el primer bloque) |

Para escribir en un bloque de texto, toquen el espacio entre las comillas, escriban y presionen **Enter**.

## Parte 4 · Los botones (25 min)

Cada botón funciona **mientras se mantiene presionado**: al presionar, el robot se mueve; al soltar, se detiene. Vamos a guardar la velocidad de cada motor en dos variables, `izq` y `der`, y a escribir **una sola vez** el cálculo en un procedimiento llamado `mover`.

**1. Las variables**

[IMAGEN 6.22A: cajón Variables abierto con el bloque inicializar global nombre como señalado]

1. Toquen el cajón **Variables**.
2. Arrastren **inicializar global nombre como** al Visor.

Toquen la palabra `nombre`, escriban `izq` y presionen **Enter**. En el hueco de la derecha conecten un **0** (cajón **Matemáticas**, el primer bloque). Hagan otra igual llamada `der`.

**2. El procedimiento:** en **Procedimientos**, arrastren el bloque **como procedimiento ejecutar**. Escriban `mover` en lugar de `procedimiento`.

**3. Sus dos entradas**

[IMAGEN 6.23A: globo del engranaje del procedimiento mover, con entrada x a la izquierda y las entradas izquierdo y derecho adentro de entradas]

1. Toquen el engranaje azul del bloque `mover`. Se abre un globo con dos lados.
2. Arrastren el bloque **entrada: x** del lado izquierdo hacia adentro de **entradas**, a la derecha. Háganlo dos veces.
3. Toquen cada `x` y cámbienla: la primera por `izquierdo` y la segunda por `derecho`. Los nombres aparecen arriba del bloque `mover`. Toquen el engranaje otra vez para cerrar el globo.

**4. Adentro:** dos bloques **poner global izq a** (cajón **Variables**, el bloque **poner**; en su lista elijan `global izq` o `global der`). Cada uno multiplica su entrada por la velocidad.

- La multiplicación (**×**) y **redondear** están en **Matemáticas**.
- **Velocidad.PosiciónDelPulsador** está en el cajón **Velocidad**.
- **tomar izquierdo** sale del mismo procedimiento:

[IMAGEN 6.24A: el mouse sobre la palabra izquierdo del procedimiento mover y los bloques tomar izquierdo y poner izquierdo que aparecen]

1. Pongan el mouse sobre la palabra `izquierdo` del bloque `mover`, sin hacer clic.
2. Aparecen dos bloques: arrastren **tomar izquierdo** a su lugar. Con `derecho` es igual.

**5. El texto de la velocidad:** el bloque **cuando Velocidad.PosiciónCambiada** muestra el número en la pantalla. El bloque **unir** está en **Texto**.

Así quedan las variables, el procedimiento y el texto de la velocidad:

[IMAGEN 6.25A: variables izq y der, procedimiento mover y evento Velocidad.PosiciónCambiada]

Ahora, los ocho bloques de los botones. El bloque **Llamar mover** está en **Procedimientos**, y los **cuando … .Presionar** y **cuando … .Soltar**, en el cajón de cada botón.

[IMAGEN 6.26A: bloques Presionar y Soltar de los cuatro botones, cada uno con Llamar mover]

Los dos números son el sentido de cada motor: **1** adelante, **−1** atrás y **0** quieto. Revisen que coincidan con su tabla de la Guía 5.

Para escribir **−1**, arrastren un **0** de **Matemáticas**, tóquenlo y escriban `-1`.

:::pregunta id="g6a-p2"
Si la velocidad está en 200 y presionamos **Derecha**, ¿qué valores tienen `izq` y `der`? ¿Y al soltar?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6a-logramos"
- [ ] La pantalla tiene todas las piezas, con sus nombres.
- [ ] El ClienteBluetooth1 y el Reloj1 aparecen en Componentes no visibles.
- [ ] Armamos los bloques de Conectar.
- [ ] Armamos las variables, el procedimiento `mover` y los ocho bloques de los botones.
:::

## Bitácora (10 min)

:::foto id="g6a-foto"
Captura de pantalla de la app en el Diseñador (tecla **Impr Pant** o la herramienta Recortes de Windows).
:::

:::pregunta id="g6a-b1"
¿Qué ventaja tiene escribir el cálculo una sola vez en `mover` en lugar de repetirlo en cada botón?
:::

El proyecto queda guardado en App Inventor (**Proyectos → Mis proyectos**). El próximo sábado seguimos en el mismo.

:::archivo id="g6-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del proyecto: **Proyectos → Exportar a mi ordenador el proyecto (.aia) seleccionado**. También pueden subir la bitácora (.txt o .docx).
:::

:::docente
- **Versión Práctica con app (9 sábados), nueva el 6 de noviembre:** App Inventor en lugar del mando físico (decisión de Bairon). Proyecto de referencia en la cuenta del docente: `equipo_robot_app`, comprobado el 6 de noviembre: los bloques no tienen errores y genera el APK. Se conecta con el mismo esquema de la app CAR4x4 de Bairon. Campos propios (g6a-…).
- **Paso a paso con capturas (13 de noviembre, a pedido de Bairon):** como es la primera vez que usan App Inventor, cada acción tiene su captura con recuadros numerados. Se hicieron armando desde cero el proyecto `equipo_ejemplo_robot` en la cuenta del docente (quedó igual al de referencia, con sus 141 bloques). El correo de la cuenta está tapado.
- **AI Companion:** sirve para ver la app en vivo sin generar el APK. Necesita que la computadora y el celular estén en la misma Wi-Fi; algunas redes de invitados no dejan que se vean entre sí. Si no conecta, queda el APK de la Guía 7. El aviso de App Inventor dice que el "modo tradicional" no funciona en conexión segura: se refiere a una forma antigua de conectarse, no al Companion de Google Play. **Probarlo antes de la clase con un celular en la red de la academia** (la conexión con el celular no se probó al hacer las capturas). Los botones de la app del Companion pueden salir en inglés (scan QR code, connect with code).
- Cada equipo necesita una cuenta de Google. Revisar antes de la clase que los menús estén en español: aquí se usan esos nombres (versión nb207).
- Atras y Bateria van sin tilde en el **nombre** porque así se escriben más fácil en los bloques; el **texto** que se ve en la app sí lleva tilde.
- `ByteDelimitador = 10` le dice a la app que un mensaje termina con salto de línea: se usa en la Guía 7 para leer la telemetría. `DesconectarSiError` evita que salgan avisos de error sin parar si el robot se apaga.
- El deslizador empieza en 100 porque, con el L298N, a menos de eso los motores solo zumban.
- El texto del bloque `else` aparece en inglés en la interfaz en español.
- g6a-p1: 10 veces por segundo.
- g6a-p2: `izq` = 200 y `der` = −200; al soltar, los dos valen 0.
- g6a-b1: si hay que cambiar el cálculo, se cambia en un solo lugar y los bloques quedan más cortos.
- Tiempo total: 20 + 40 + 20 + 25 + 5 + 10 = 120 minutos. Con tantos pasos, la Parte 2 es la más larga: si un equipo se atrasa, puede terminar las etiquetas del paso 6 al empezar la Guía 7. Ver la app en vivo no tiene tiempo propio: se hace si hay celular y alcanza el tiempo.
:::
