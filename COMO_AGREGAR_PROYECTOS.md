# Cómo agregar proyectos, guías e imágenes

No hace falta programar: solo carpetas, archivos de texto e imágenes.
Los cambios se ven al **recargar la página**; no hace falta reiniciar el servidor.

## 1. Crear la carpeta del proyecto

Dentro de `contenido/` crea una carpeta con el nombre del proyecto en **minúsculas, sin
espacios ni tildes** (usa guiones). Ejemplo: `contenido/puente-levadizo/`.

Dentro van:

```
contenido/puente-levadizo/
├── proyecto.json      ← datos del proyecto
├── guia-01.md         ← Guía 1
├── guia-02.md         ← Guía 2
├── ...
├── guia-14.md
├── imagenes/
│   ├── portada.jpg    ← imagen de la tarjeta en la página de inicio
│   ├── IMAGEN_1.3.png
│   └── ...
└── archivos/          ← (opcional) plantillas para descargar: .blend, .stl, .ino, .pdf…
```

Lo más fácil: copia la carpeta `garra-robotica`, cámbiale el nombre y edita lo de adentro.

## 2. El archivo proyecto.json

Ábrelo con el Bloc de notas (o VS Code):

```json
{
  "nombre": "Puente levadizo automatizado",
  "nivel": "Básico",
  "descripcion": "Una frase corta que aparece en la tarjeta.",
  "color": "#3B82F6",
  "imagen": "portada.jpg",
  "orden": 2,
  "guias": [
    { "numero": 1, "archivo": "guia-01.md" },
    { "numero": 2, "archivo": "guia-02.md", "titulo": "Título opcional" }
  ]
}
```

- `color`: color de la tarjeta mientras no haya imagen de portada.
- `imagen`: nombre del archivo dentro de `imagenes/`.
- `orden`: posición en la página de inicio (1 = primero).
- `versiones` (opcional): versiones distintas de algunas guías, por ejemplo con otro programa de diseño 3D.
  Se escribe `"versiones": [{ "id": "blender", "nombre": "Blender" }, { "id": "tinkercad", "nombre": "Tinkercad (bloques)" }]`.
  La **primera** es la normal (los archivos `guia-02.md`). Para otra versión de una guía se crea, junto a la normal,
  `guia-02.tinkercad.md` (el id de la versión antes de `.md`). Las guías sin ese archivo se ven igual en todas las versiones.
  Si el título cambia en esa versión, escríbanlo en el `titulo:` del encabezado del archivo de la versión (tiene prioridad sobre el de `proyecto.json`).
  El docente elige la versión de cada equipo en la pestaña **Equipos**.
  **Importante:** la versión debe tener **los mismos campos** que la normal (mismos `id`, mismas tablas con casillas
  vacías, misma cantidad de casillas en los checklists); así un equipo puede cambiar de versión sin perder respuestas.
  Para comprobarlo: `node herramientas/comparar-versiones.js "<carpeta de la plataforma>" <proyecto> <versión> <guías…>`.
  Para sus imágenes usen otro código, por ejemplo `[IMAGEN 2.3T: …]` → `IMAGEN_2.3T.png`.
- `pasoAPaso` (opcional): las guías se muestran **paso por paso** (si pones `"pasoAPaso": false`, cada parte se ve completa),
  con botones "Paso anterior" / "Siguiente paso" y "Ver toda la parte". Los pasos se cortan solos:
  cada número de una lista (1., 2., 3.…) es un paso, y cada tabla, pregunta, animación, foto o código va
  en un paso junto con el texto que lo presenta. Un subtítulo `###` o una línea `---` empiezan un paso nuevo; una imagen que quedaría sola se une al paso anterior.
- `titulo` (opcional): si no lo pones, se usa el encabezado `# ...` de la guía.
- Si una guía de la lista todavía no tiene archivo, aparece como **"Próximamente"**.

Cuidado con las comas: cada línea lleva coma al final **menos la última** de cada grupo.

## 3. Escribir una guía (guia-01.md)

> **Nombres de menús de Blender:** escríbanlos como aparecen en **Blender 5.2 en español** (por ejemplo
> **Agregar modificador → Generar → Repetir**, **Listado**, **Posición**). La tabla de nombres está en
> `REVISION_GUIAS.md`, sección "Nombres de Blender en español".

Es Markdown normal (lo que exportas de tu documento), con algunos detalles:

### Encabezado (opcional)

Al inicio del archivo puede ir un encabezado con los datos de la guía. La plataforma muestra
"Guía 1 · Sábado 1 · Introducción al proyecto STEAM" arriba de la guía y en la lista:

```
---
titulo: ¡Nuestra primera articulación!
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---
```

(Si `proyecto.json` también trae `titulo`, `sabado` o `sesion`, se usa el de `proyecto.json`.)

### Título y partes

```markdown
# Guía 1 · Conociendo el servo

## Parte 1: Exploración (15 min)
...
## Parte 2: Armado (30 min)
...
## ¿Lo logramos?
...
```

- `# ` (un numeral) = título de la guía.
- `## ` (dos numerales) = **cada parte** (un paso con su barra de progreso).
- El tiempo sugerido se toma del título: `(15 min)`. También sirve una línea
  `Tiempo sugerido: 15 min` al inicio de la parte.
- Lo que esté antes del primer `##` se muestra como parte "Introducción".

### Cosas que se convierten solas

| Escribes | Los estudiantes ven |
| --- | --- |
| `______` (4 o más guiones bajos) | Un campo para escribir |
| Una línea que solo tiene `______` | Un cuadro de texto amplio |
| Una tabla con celdas vacías | Tabla editable (solo las celdas vacías se llenan) |
| `- [ ] texto` | Casilla para marcar |
| `[IMAGEN 4.3: descripción]` | La imagen `imagenes/IMAGEN_4.3.png` (o .jpg), o un recuadro gris si aún no existe |
| Bloque de código con ` ``` ` | Código con colores y botón **Copiar** |

Las casillas que estén en una parte llamada **"¿Lo logramos?"** son las que hay que
marcar todas para poder completar la guía.

### Bloques especiales

Empiezan con `:::nombre` y terminan con `:::` solo en su línea.

**Pregunta abierta** (se guarda sola mientras escriben):

```
:::pregunta id="g1-p1"
¿Qué articulación de tu brazo se parece más a un servo?
:::
```

**Pregunta individual** (cada integrante guarda su propia respuesta y puede ver las de sus compañeros):

```
:::pregunta id="g13-r1" individual="si"
¿Qué sé hacer ahora que no sabía al empezar el proyecto?
:::
```

**Opción única** (botones grandes; se elige una):

```
:::opciones id="g4-entra"
¿Entra el servo?
- Sí
- Muy justo
- No
:::
```

**Foto o video para la bitácora** (el equipo los sube desde el celular; hasta 10 por espacio):

```
:::foto id="g1-foto"
Foto del montaje para la bitácora.
:::
```

**Botón para descargar un archivo** (de la carpeta `archivos/` del proyecto; el texto de adentro es opcional):

```
:::descarga archivo="base_garra.blend"
Guárdalo en la computadora y ábrelo con Blender.
:::
```

Se permiten `.blend`, `.stl`, `.obj`, `.ino`, `.pdf`, `.zip`, `.txt`, `.csv`, `.png` y `.jpg`. Si el archivo
no está, la guía muestra un aviso en su lugar.

**Archivo de trabajo del equipo** (el equipo sube su .blend, .stl, .ino, .zip, .txt, .docx, .xlsx o .csv y lo descarga
en otra PC; hasta 100 MB, se guardan las últimas 5 versiones). Va al final de la Bitácora de cada guía,
antes de la nota `:::docente`; el texto nombra el programa que se usó en esa guía:

```
:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend). La próxima sesión lo descargan en cualquier computadora.
:::
```

**Lista de verificación**:

```
:::checklist id="g1-logramos"
- Nuestro equipo tiene nombre y roles.
- El servo se movió solo a 0°, 90° y 180°.
:::
```

Si el `id` contiene la palabra `logramos`, cuenta para completar la guía.

**Tabla con nombre fijo** (útil si después otra parte la usa, por ejemplo la rutina de la Guía 7):

```
:::tabla id="g7-rutina"
| Paso | Base | Hombro | Codo | Pinza |
| --- | --- | --- | --- | --- |
| 1 | | | | |
:::
```

**Animación interactiva**:

```
:::animacion tipo="servo"
Texto opcional debajo de la animación.
:::
```

**Para verlas todas funcionando**, con su bloque listo para copiar, abre
`http://localhost:3000/animaciones` (la galería). Los ejemplos están en
`contenido/_galeria/animaciones.md`.

| tipo | Qué hace | Opciones |
| --- | --- | --- |
| `servo` | Deslizador que gira el servo y muestra `write()` | `variable="pinza"` `min="30"` `max="90"` `inicial="90"` |
| `perilla` | Perilla → `analogRead` → `map` → ángulo | `pin="A0"` `min="0"` `max="180"` `servo="no"` |
| `conexiones` | Diagrama de cables; al tocar un cable dice a qué pin va | `circuito="semaforo"`, `"puente-boton"`, `"dispensador-basico"`, `"dispensador"`, `"estacion"`, `"estacion-real"`, `"laberinto"`, `"laberinto-real"`, `"futbol"`, `"futbol-real"`, `"banda-potencia"`, `"casa-nodos"` (con un botón por nodo), `"elevador-central"`, `"servo"`, `"servo-perilla"`, `"garra-completa"`, `"garra-servos"`, `"garra-control"` o `"garra"`, **o** una tabla (ver abajo) |
| `booleano` | Booleana de Blender en modo Diferencia | `base="Base"` `cortador="Cubo.001"` |
| `engranes` | Pinza de dos engranes que giran al revés | `cerrada="30"` `abierta="90"` `dientes="12"` `variable="pinza"` |
| `fuente` (o `gnd-comun`) | Pilas + servo; unir o separar el GND común | `pin="9"` `pilas="4 AA (6 V)"` |
| `flujo` (o `diagrama-flujo`) | Diagrama de flujo paso a paso | `programa="garra"`, `"puente"`, `"invernadero"`, `"dispensador"`, `"estacion"`, `"laberinto"`, `"futbol"` o una lista con los pasos (ver abajo); `ocultar="si"` |
| `rutina` | Garra 2D que repite una rutina, un servo a la vez | `tabla="g7-posiciones"` (tabla del equipo), `cerrada` `abierta` `velocidad="15"` `pinza="60"` |
| `joystick` | Joystick: control directo o paso a paso | `pinx="A0"` `piny="A1"` `ejex="Base"` `ejey="Hombro"` `alto="700"` `bajo="300"` `modo="pasos"` `servos="no"` |
| `puente` | Puente levadizo completo (barco, sensor, semáforo, alarma, hojas) | `distancia="10"` `angulo="75"` `arriba="4000"` `velocidad="25"` |
| `semaforo` | Código del semáforo corriendo línea por línea; los `delay` se pueden cambiar | `verde="3000"` `amarillo="1000"` `rojo="3000"` |
| `escala` | Cuánto mide algo en una maqueta (1:50 a 1:500) | `escala="200"` `ejemplo="Tramo|61"` `objetos="Nombre|metros; …"` `fija="si"` |
| `triangulo` | Cuadrado, triángulo y cuadrado con diagonal al empujar una esquina | — |
| `espejo-servos` | Dos servos que se miran: `a` y `180 − a`, con opción de ver el error | `max="90"` `izq="izq"` `der="der"` |
| `ultrasonico` | Cómo mide el HC-SR04: el sonido va y vuelve | `objeto="Barco"` `max="50"` |
| `grafica-carga` | Gráfica en vivo de una tabla de peso contra cuánto bajó | `tabla="g7-carga"` `limite="10"` `objetivo="200"` |
| `invernadero` | Mini invernadero completo (riego, ventana con histéresis, luz con temporizador) | `umbral="500"` `riego="3000"` `abrir="30"` `cerrar="27"` `luzon="60000"` `luzoff="60000"` |
| `causa-efecto` | Mapa de causa y efecto en círculo, paso a paso | una lista con los pasos (sin lista: ciclo del riego) |
| `rele` | El relé como interruptor: bobina, COM, NO y la bomba | `pin="8"` `carga="Bomba"` `variable="BOMBA"` |
| `umbral` | Recta de 0 a 1023 con los promedios de la tabla y un umbral movible | `tabla="g6-calibracion"` `inicial="500"` `variable="UMBRAL_SECO"` |
| `histeresis` | Ventana con dos límites contra uno solo, con lámpara y gráfica | `abrir="30"` `cerrar="27"` |
| `temporizador` | `millis() % ciclo` como la aguja de un reloj; luz encendida si `t < LUZ_ON` | `luzon="60000"` `luzoff="60000"` |
| `nivel-agua` | Sensor de nivel de tiras dentro del depósito; LED si no supera el mínimo | `minimo="100"` `pin="A1"` `maximo="620"` |
| `dispensador` | Dispensador completo (perilla, botón, horario automático, monitor serie) | `abierta="70"` `msporgramo="20"` `intervalo="60000"` |
| `mecanismos` | Compuerta giratoria, disco giratorio y tornillo funcionando | — |
| `embudo-angulo` | Ángulo de la pared del embudo: las croquetas resbalan o se atascan; lijado o sin lijar | `angulo="62"` `croquetas="18"` |
| `tiempo-gramos` | Dispersión de tiempo contra gramos con línea de tendencia (lee la tabla aunque esté en otra guía) | `tabla="g6-gramos"` |
| `selector` | Perilla con 3 zonas → `gramosSegunTamano()` | `pin="A0"` |
| `pasos-porcion` | Una sola apertura contra servir en pasos (líneas de tiempo) | `gramos="50"` `msporgramo="20"` `paso="200"` `pausa="150"` |
| `nivel-ultrasonico` | Ultrasónico arriba de la botella: distancia a la comida y LED de recargar | `vacio="15"` `alto="25"` |
| `gemelo-digital` | Estación real y su gemelo en Blender que se pinta como el LED | `frio="20"` `calor="28"` `inicial="24.6"` |
| `coordenadas-3d` | Coordenadas X, Y vistas desde arriba como en Blender | `modo="columnas"` (`radio="40"`) o `modo="tablero"` (`casilla="25"`) |
| `extrusion` | Círculo → modo edición → seleccionar → extruir, con las teclas de Blender | `radio="50"` `grosor="2"` `lados="16"` |
| `rgb` | Mezcla de rojo, verde y azul (0 a 255) y `ponerColor()` | `r` `g` `b` |
| `ldr` | Fotorresistencia en un divisor de voltaje; se puede intercambiar con la resistencia | `fija="10"` `pin="A0"` |
| `oled` | Pantalla de 128 × 64 por I2C; código de la estación o mensaje propio con `setTextSize`/`setCursor` | `direccion="0x3C"` `mensaje="Hola!"` |
| `calibracion` | Estación simulada contra un termómetro; tabla de lecturas y `AJUSTE_TEMP` | `sesgo="1.3"` `salon="24"` |
| `max-min` | Máxima y mínima que se recuerdan, con gráfica y pantalla OLED | `salon="24"` `mano="31"` |
| `wifi-datos` | Los datos por cable USB o por WiFi (ESP32 → router → internet → celular) | `red="Wokwi-GUEST"` `temp="24.6"` |
| `laberinto` | Laberinto completo: joystick, canica, cronómetro, récord y pantalla OLED | `centro="90"` `inclinacion="15"` `suave="0.2"` |
| `cardan` | Soporte cardán: marco (servo X) y tablero (servo Y) en perspectiva | `centro="90"` `inclinacion="15"` |
| `suavizado` | `angX += (metaX − angX) × SUAVE` en una gráfica, directo contra suavizado | `centro="90"` `inclinacion="15"` `suave="0.2"` |
| `ir` | Sensor infrarrojo: emisor, receptor, tornillo de sensibilidad y salida LOW/HIGH | `objeto="Canica"` `pin="D3"` `alcance="4"` |
| `eeprom` | La RAM se borra al apagar y la EEPROM no: el récord con `EEPROM.get/put` | — |
| `acelerometro` | MPU6050: la gravedad repartida entre los ejes al inclinarlo | — |
| `futbol` | Cancha con marcador: sensores en las porterías, OLED, silbato y tiempo | `duracion="180000"` `pausa="1500"` |
| `simetria` | Modificador Simetrizar (Mirror) de Blender: la mitad modelada y su copia; origen fuera de X = 0 | `mitad="50"` `alto="50"` |
| `escaneo-3d` | Fotogrametría: la cámara a tres alturas y el modelo que se arma con las fotos | `porvuelta="14"` |
| `calibracion-ir` | Portería vista desde arriba: zona del sensor con el tornillo azul; pelota y mano arrastrables | `alcance="90"` `pin="D3"` |
| `antirrebote` | Línea de tiempo: rebotes de la señal, `gol()` ocupado y `PAUSA_GOL` | `pausa="1500"` |
| `oled-animacion` | El `for` de "GOL" que crece y el parpadeo con `invertDisplay()`; melodía de ejemplo | `texto="GOL"` |
| `contador-personas` | Dos sensores en la puerta: entró (A → B) o salió (B → A) | — |
| `bluetooth` | Los mensajes `MARCADOR:` y `TIEMPO:` del Arduino al HC-05 y al celular | `duracion="180"` |
| `banda` | Banda clasificadora completa: dos nodos, IR, color, desviador y display RR-VV-AA | `recorrido="1200"` `rojo="30"` `verde="90"` `azul="150"` |
| `i2c` | Maestro y esclavos en el bus: dirección, ACK y datos por SDA/SCL | `esclavos="Nombre|dirección; …"` (por defecto `"Esclavo|8"`) · `orden="L"` (orden de 2 bytes) |\|dirección; …"` (por defecto `"Esclavo\|8"`) |
| `diagrama-bloques` | Bloques del sistema con flechas por tipo (potencia, lógica, control, datos) | `sistema="banda"`, `"casa"`, `"elevador"` o `"robot"` · `ocultar="si"` |
| `mosfet` | Señal pequeña en el gate, corriente grande en la carga; PWM o encendido/apagado | `carga="Motor"` o `"Tira LED"` · `pwm="no"` · `pin="9"` |
| `rueda-libre` | Apagar el MOSFET de golpe con y sin diodo: el voltaje del drain | — |
| `protocolo` | Mensajes entre nodos como diagrama de secuencia, paso a paso | `sistema="banda"` o `"robot"` |
| `calibracion-color` | Barras de R, G y B por color de pieza, con la tabla del equipo | `tabla="g6-calibracion"` |
| `proporcion-color` | Crudos contra proporciones (R/C, G/C, B/C) al cambiar la luz | `limiterojo="0.45"` `limiteverde="0.40"` `limiteazul="0.38"` |
| `grafica-datos` | Gráfica de línea de cualquier tabla del equipo; se elige la columna | `tabla="g8-velocidad"` `x="…"` `y="…"` `referencia="90"` |
| `matriz-confusion` | Matriz de confusión coloreada con la tabla del equipo | `tabla="g12-confusion"` |
| `casa` | Casa completa: celular → central → nodos sala, cuarto y entrada, con pantalla OLED | — |
| `optoacoplador` | La señal cruza al relé como luz: LED, fototransistor, bobina y contactos | `pin="7"` `carga="Cerradura"` |
| `integracion` | Un problema escondido en un nodo: conectar todo de una vez o de a uno | — |
| `caida-voltaje` | Caída de voltaje al arrancar una carga y las soluciones de la guía | `sistema="casa"` o `"robot"` |
| `iot` | Página web del ESP32: `/on` y `/off` encienden el LED | `pin="2"` `titulo="Casa STEAM"` |
| `elevador` | Elevador completo: homing, llamadas, rampa, reed, finales de carrera, paro y displays | `velmax="200"` |
| `puente-h` | Cuatro interruptores: sentido con IN1/IN2, velocidad con PWM, libre y freno | `sentidos="Sube\|Baja"` `pines="D5\|D7\|D8"` |
| `siete-segmentos` | Tocar segmentos y ver el binario (0b g f e d c b a) y el `for` con `bitRead()` | `pines="4"` (pin del segmento a) |
| `contrapeso` | Polea con cabina y contrapeso: diferencia, fuerza y torque | `cabina="200"` `contrapeso="100"` `radio="1.5"` |
| `rampa` | La velocidad cambia poco a poco | `sistema="elevador"` (`llegada="90"`) o `"robot"` (`paso="15"`) |
| `algoritmo-ascensor` | "Más cercana" contra "del ascensor": orden en que atiende las llamadas | `pisos="3"` (hasta 8) |
| `lazo-cerrado` | Sensores de piso contra encoder, o robot en lazo abierto contra cerrado | `sistema="elevador"` o `"robot"` |
| `robot-mando` | Robot y mando: joystick, mensajes `M,izq,der`, telemetría `T,bat,dist`, OLED y TIMEOUT | `timeout="500"` |
| `uart` | Dos Arduino por UART: cables cruzados y cada letra bit a bit | — |
| `pwm` | Señal que prende y apaga: ciclo de trabajo, promedio y motor | `valor="128"` `pin="D5"` |
| `divisor` | Divisor de batería: lo que llega a A0 y la cuenta del código | `r1="10"` `r2="10"` `factor="2.0"` |
| `mezcla-diferencial` | izq = avance + giro, der = avance − giro, con el robot visto desde arriba | `zona="20"` |

En la galería se puede ver una sola animación con `/animaciones?ver=tipo`
(por ejemplo `/animaciones?ver=puente`).

**Diagrama de flujo con respuestas ocultas.** Con `ocultar="si"` se esconde lo que va entre
{llaves} en cada paso (por ejemplo `Luz {amarilla} y alarma` → "Luz ___ y alarma"); si ningún paso
tiene llaves, los recuadros de acción muestran "?". Aparece un botón **Mostrar respuestas**. Sirve cuando el equipo debe completar
el diagrama antes de verlo:

```
:::animacion tipo="diagrama-flujo" programa="garra" ocultar="si"
:::
```

Dentro de un bloque `:::animacion`, **las tablas y las listas son datos** para la animación;
el resto del texto se muestra debajo como pie.

**Conexiones con tabla.** Los pines del Arduino se escriben solos (`D9`, `A0`, `5V`, `GND`,
`VIN`, `3.3V`); los componentes como `Nombre: terminal`:

```
:::animacion tipo="conexiones"
| Desde | Hasta | Color | Nota |
| --- | --- | --- | --- |
| Servo pinza: señal | D9 | naranja | Pin con ~ (PWM) |
| Servo pinza: + | Portapilas: + | rojo | |
| Portapilas: − | GND | negro | GND común |
:::
```

**Diagrama de flujo.** Un paso por línea. Tipos: `[inicio]` `[fin]` `[proceso]` `[decision]`
`[entrada]` `[salida]` `[espera]`. Con `→ 2` se indica a qué paso sigue (si no, sigue el de abajo);
en una decisión, `→ sí: 5, no: 3`:

```
:::animacion tipo="flujo"
1. [inicio] Encender el Arduino
2. [decision] ¿Botón presionado? → sí: 5, no: 3
3. [entrada] Leer las 4 perillas
4. [salida] Mover los 4 servos → 2
5. [proceso] Rutina automática → 2
:::
```

**Rutina con los ángulos del equipo.** Pon un `id` a la tabla y úsalo en `tabla` (o `campo`). La tabla puede
tener columnas `Servo | Ángulo` (un servo por fila, como `mover()` en el código) o
`Base | Hombro | Codo | Pinza` (una posición completa por fila). En el ángulo de la pinza
también valen las palabras "abierta" y "cerrada". La garra se actualiza mientras escriben.

```
:::tabla id="g7-rutina"
| Paso | Servo | Ángulo | Acción |
| --- | --- | --- | --- |
| 1 | Pinza | | abrir |
| 2 | Base | | al objeto |
:::

:::animacion tipo="rutina" campo="g7-rutina"
:::
```

Sin `campo`, la rutina repite la de `garra_robotica.ino`.

**Notas para el docente** (los estudiantes **nunca** las ven):

```
:::docente
Un solo servo puede alimentarse desde el 5V del Arduino.
:::
```

**Recuadros de color**: `:::reto`, `:::consejo`, `:::importante`, `:::nota`, `:::bitacora`.
Puedes cambiar el título: `:::reto titulo="Reto relámpago"`.

### Sobre los `id`

- El `id` identifica dónde se guarda cada respuesta. Usa letras, números y guiones,
  por ejemplo `g3-p2` (guía 3, pregunta 2).
- Si no pones `id`, se crea uno automático según el orden. Funciona bien, pero si
  después **insertas** una pregunta o tabla antes de otras, las respuestas ya guardadas
  podrían quedar en el campo equivocado. Por eso conviene poner `id` a todo lo que se
  responde, sobre todo si la guía ya se está usando.

## 4. Imágenes

- Guárdalas en `contenido/<proyecto>/imagenes/`.
- Nómbralas con su código: `IMAGEN_4.3.png`. También se acepta `IMAGEN 4.3.png`
  (con espacio) y `.jpg`, `.jpeg`, `.webp`, `.gif` o `.svg`.
- En la guía, el espacio `[IMAGEN 4.3: descripción]` la muestra sola en cuanto el archivo existe.
- Consejo: que no pesen más de 1 MB cada una, así cargan rápido en los celulares.

## 5. Revisar

Recarga la página. Si un proyecto no aparece, casi siempre es un error de comas o de
comillas en `proyecto.json`: la consola del servidor muestra el mensaje
`No se pudo leer ...proyecto.json`.
