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
- Bitácora

## Parte 1 · Conociendo App Inventor (20 min)

**MIT App Inventor** es una página gratuita para crear apps de Android con bloques, como Scratch. Tiene dos pantallas: el **Diseñador**, donde se dibuja la app, y **Bloques**, donde se programa.

1. Entren a **ai2.appinventor.mit.edu** e inicien sesión con la cuenta de Google. Si aparece un aviso de bienvenida, toquen **Continuar**.
2. Si la página está en inglés: arriba a la derecha, en **English**, elijan **Español**.
3. **Proyectos → Comenzar un proyecto nuevo**. Escriban `equipo_NOMBRE_robot` (sin espacios ni tildes) y toquen **Aceptar**. El proyecto se guarda solo.

[IMAGEN 6.1A: Diseñador de App Inventor con la pantalla de la app terminada: Paleta, Visor, componentes y Propiedades]

| Parte | Dónde está y para qué sirve |
| --- | --- |
| Paleta | A la izquierda: las piezas de la app. Arriba tiene **Buscar Componentes** |
| Visor | En el centro: la pantalla del celular |
| Componentes | Las piezas que ya pusimos, en orden. Abajo tiene **Cambiar nombre** |
| Propiedades | A la derecha: los datos de la pieza elegida (texto, tamaño, color…) |
| Diseñador y Bloques | Botones de arriba a la derecha: pasan de una pantalla a la otra |

**Cómo se usan:**

- **Poner una pieza:** arrástrala de la Paleta al Visor.
- **Cambiarle el nombre:** elígela en Componentes, toca **Cambiar nombre**, escribe el nombre y toca **Aceptar**.
- **Cambiar un dato:** elige la pieza, busca el dato en Propiedades, escribe el valor y presiona **Enter**.

## Parte 2 · La pantalla de la app (40 min)

Pongan las piezas **en este orden, de arriba abajo**, y cámbienles el nombre:

1. **Título y centrado:** elijan **Screen1** en Componentes. En Propiedades pongan **DispHorizontal: Centro** y **Título: Robot con app**.
2. **El botón de conectar:** arrastren un **SelectorDeLista**. Nombre `Conectar`, **Texto:** `Conectar con el robot`.
3. **El estado:** una **Etiqueta**. Nombre `Estado`, **Texto:** `Desconectado`.
4. **La cuadrícula:** busquen `tabular` en **Buscar Componentes** y arrastren una **DisposiciónTabular**. Pongan **Columnas: 3** y **Filas: 3**.
5. **Los cuatro botones:** arrastren un **Botón** a cada casilla, formando una cruz: arriba al centro, en medio a la izquierda, en medio a la derecha y abajo al centro.

| Casilla | Nombre | Texto |
| --- | --- | --- |
| Arriba al centro | `Adelante` | Adelante |
| En medio a la izquierda | `Izquierda` | Izquierda |
| En medio a la derecha | `Derecha` | Derecha |
| Abajo al centro | `Atras` (sin tilde) | Atrás |

6. **El resto, debajo de la cuadrícula:**

| Pieza | Nombre | Propiedades |
| --- | --- | --- |
| Etiqueta | `TextoVelocidad` | **Texto:** Velocidad |
| Deslizador | `Velocidad` | **ValorMax:** 255 · **ValorMin:** 100 · **PosiciónDelPulsador:** 180 |
| Etiqueta | `Bateria` (sin tilde) | **Texto:** Batería: -- V |
| Etiqueta | `Distancia` | **Texto:** Distancia: -- cm |
| Etiqueta | `Orden` | **Texto:** M,0,0 |

7. **Las piezas invisibles:** no se ven en la pantalla del celular; aparecen debajo del Visor, en **Componentes no visibles**.

| Pieza | ¿Dónde está? | Propiedades |
| --- | --- | --- |
| ClienteBluetooth | Paleta → **Conectividad** | **ByteDelimitador:** 10 · marquen **DesconectarSiError** |
| Reloj | Paleta → **Sensores** | **IntervaloDelTemporizador:** 100 |

:::pregunta id="g6a-p1"
El reloj tiene un intervalo de 100 milisegundos. ¿Cuántas veces por segundo se va a enviar la orden al robot?
:::

## Parte 3 · Conectar con el robot (20 min)

Toquen **Bloques**, arriba a la derecha. A la izquierda están los cajones de bloques: **Integrados** (Control, Lógica, Matemáticas, Texto, Listas, Colores, Variables, Procedimientos) y, debajo, una lista con cada pieza de la app. Al tocar un cajón se abre con sus bloques; se arrastran al Visor y encajan como un rompecabezas.

Armen estos dos bloques. El primero prepara la lista de dispositivos Bluetooth antes de abrirla; el segundo se conecta al que elijamos.

[IMAGEN 6.2A: bloques Conectar.AntesDeSelección y Conectar.DespuésDeSelección]

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

## Parte 4 · Los botones (25 min)

Cada botón funciona **mientras se mantiene presionado**: al presionar, el robot se mueve; al soltar, se detiene. Vamos a guardar la velocidad de cada motor en dos variables, `izq` y `der`, y a escribir **una sola vez** el cálculo en un procedimiento llamado `mover`.

[IMAGEN 6.3A: variables izq y der, procedimiento mover y evento Velocidad.PosiciónCambiada]

1. **Las variables:** en **Variables**, arrastren **inicializar global nombre como**. Escriban `izq` en lugar de `nombre` y conecten un **0** (cajón **Matemáticas**). Hagan otra llamada `der`.
2. **El procedimiento:** en **Procedimientos**, arrastren el bloque **como procedimiento ejecutar**. Escriban `mover` en lugar de `procedimiento`.
3. **Sus dos entradas:** toquen el engranaje azul del bloque y arrastren dos **entrada** hacia adentro. Llámenlas `izquierdo` y `derecho`.
4. **Adentro:** dos bloques **poner global izq a** (cajón **Variables**, el bloque **poner**). Cada uno multiplica su entrada por la velocidad.
   - La multiplicación (**×**) y **redondear** están en **Matemáticas**.
   - **tomar izquierdo** aparece al pasar el mouse sobre la palabra `izquierdo` del procedimiento.
   - **Velocidad.PosiciónDelPulsador** está en el cajón **Velocidad**.
5. **El texto de la velocidad:** el bloque **cuando Velocidad.PosiciónCambiada** muestra el número en la pantalla. El bloque **unir** está en **Texto**.

Ahora, los ocho bloques de los botones. El bloque **Llamar mover** está en **Procedimientos**, y los **cuando … .Presionar** y **cuando … .Soltar**, en el cajón de cada botón.

[IMAGEN 6.4A: bloques Presionar y Soltar de los cuatro botones, cada uno con Llamar mover]

Los dos números son el sentido de cada motor: **1** adelante, **−1** atrás y **0** quieto. Revisen que coincidan con su tabla de la Guía 5.

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
- Cada equipo necesita una cuenta de Google. Revisar antes de la clase que los menús estén en español: aquí se usan esos nombres (versión nb207).
- Atras y Bateria van sin tilde en el **nombre** porque así se escriben más fácil en los bloques; el **texto** que se ve en la app sí lleva tilde.
- `ByteDelimitador = 10` le dice a la app que un mensaje termina con salto de línea: se usa en la Guía 7 para leer la telemetría. `DesconectarSiError` evita que salgan avisos de error sin parar si el robot se apaga.
- El deslizador empieza en 100 porque, con el L298N, a menos de eso los motores solo zumban.
- El texto del bloque `else` aparece en inglés en la interfaz en español.
- g6a-p1: 10 veces por segundo.
- g6a-p2: `izq` = 200 y `der` = −200; al soltar, los dos valen 0.
- g6a-b1: si hay que cambiar el cálculo, se cambia en un solo lugar y los bloques quedan más cortos.
- Tiempo total: 20 + 40 + 20 + 25 + 5 + 10 = 120 minutos.
:::
