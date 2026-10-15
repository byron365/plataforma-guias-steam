# Estado del proyecto · Plataforma de guías STEAM

*Última actualización: 14 de octubre de 2026*

Este documento resume qué está hecho, qué falta y cómo retomar el trabajo.
Para usar la plataforma, ver `LEEME.md`. Para escribir guías, ver `COMO_AGREGAR_PROYECTOS.md`.
Respaldo del código y las guías en GitHub: https://github.com/byron365/plataforma-guias-steam (ver `LEEME.md`).

> **Estado:** las animaciones de los 11 proyectos están completas (112 en la galería, 129 bloques en las guías).
> **Archivos de trabajo del equipo:** listos (10 de octubre), ver sección 2.1.1.
> **13 de octubre:** guías paso a paso, bitácora del equipo, revisión de las 154 guías y nombres de Blender 5.2
> (secciones 2.1.2 a 2.1.5).
> **14 de octubre:** proyecto respaldado en GitHub (público; sin datos de estudiantes ni contraseña) y animación de
> simetría con los nombres de Blender 5.2. Para subir cambios: `git add -A`, `git commit -m "…"`, `git push` (ver `LEEME.md`).
> **Próximo paso:** probar en clase el modo paso a paso y la bitácora, revisar los puntos "Para revisar" de
> `REVISION_GUIAS.md` y completar los pendientes del docente (sección 2.2).

---

## 1. Lo que está terminado

Las **4 fases** del plan original (`PROMPT_plataforma_guias.md`) están completas y probadas.

| Fase | Qué incluye |
| --- | --- |
| **1** | Servidor (Node + Express + SQLite), página de inicio, entrada con equipo + PIN + nombre, guía interactiva por partes con autoguardado, animaciones del servo y la perilla |
| **2** | Lector de las 14 guías de la Garra (encabezado `---`, `:::opciones`, `:::foto`, preguntas individuales) y las animaciones de conexiones, booleano, engranes, GND común, diagrama de flujo, rutina y joystick. Galería en `/animaciones` |
| **3** | Panel del docente en `/docente`: avance con colores, equipos y PIN, desbloqueo por proyecto o por equipo, visor de respuestas con notas, reinicio, CSV y QR |
| **4** | Fotos y videos en la bitácora, respaldos diarios automáticos, `Iniciar plataforma.bat` |

**Después de la Fase 4:**
- Interfaz en **celeste** (antes naranja).
- **Logo:** recortado en la cabecera, completo en la portada.
- **Modo oscuro** con botón 🌙/☀️.
- **Guía 3 de la Garra:** el diagrama de flujo oculta las respuestas (`ocultar="si"`).
- **Plantilla `base_garra.blend`** (9 de octubre): unidades en mm y un servo SG90 de referencia en gris,
  con las medidas de la Guía 2. Está en `contenido/garra-robotica/archivos/` y se descarga desde la Guía 2
  con el bloque nuevo `:::descarga` (ruta `/archivos/<proyecto>/<archivo>`).
- **Ajustes en las guías de los demás proyectos** (solo en los bloques `:::animacion`, el texto no cambió):
  - Guía 3 de cada proyecto: `ocultar="si"` en el diagrama de flujo.
  - Bloques de servo con el nombre del código: `variable="izq"`, `"ventana"`, `"compuerta"` e `inicial="0"`.
  - Circuitos de la protoboard aparte de los de Wokwi: Estación G5 → `estacion-real`,
    Laberinto G6 → `laberinto-real`, Mini fútbol G5 → `futbol-real`.
  - Estación G2 → `coordenadas-3d modo="columnas"`; Laberinto G2 → `modo="tablero"`.
  - Laberinto G1 → `joystick servos="no"` (la lectura de Y la descubren en Wokwi).
  - Laberinto G6 / Mini fútbol G5 → `ir objeto="Canica"` / `"Pelota"`.
  - Mini fútbol G2 → `escala fija="si"` con objetos que no están en la tabla (la pregunta g2-p1 pide pensar qué pasa con 1:100).
  - Intermedio II: `diagrama-bloques ... ocultar="si"` en la Guía 2 de los cuatro proyectos; Casa G1 `i2c orden="L"`,
    Casa G3 `mosfet pwm="no"`; Elevador G5 `i2c esclavos=...`; `sistema="..."` en `caida-voltaje`, `rampa`,
    `lazo-cerrado` y `protocolo`; Robot G3 `puente-h sentidos="Adelante|Atrás"`; Robot G4 `gnd-comun pilas=...`.

### Proyectos cargados

Todas las guías cargan sin errores. Las notas del docente nunca llegan a los estudiantes.

| Proyecto | Nivel | Guías | Animaciones listas |
| --- | --- | --- | --- |
| Garra robótica | Básico | 14 | ✅ todas (11) |
| Dispensador de comida para mascotas | Básico | 14 | ✅ todas (13) — 7 de octubre |
| Mini invernadero inteligente | Básico | 14 | ✅ todas (10) — 7 de octubre |
| Puente levadizo automatizado | Básico | 14 | ✅ todas (12) — 7 de octubre |
| Estación meteorológica con gemelo digital | Básico II | 14 | ✅ todas (13) — 7 de octubre |
| Laberinto inclinable | Básico II | 14 | ✅ todas (13) — 7 de octubre |
| Mini fútbol con marcador electrónico | Básico II | 14 | ✅ todas (13) — 7 de octubre |
| Banda transportadora clasificadora | Intermedio II | 14 | ✅ todas (11) — 9 de octubre |
| Casa inteligente distribuida | Intermedio II | 14 | ✅ todas (9) — 9 de octubre |
| Elevador a escala de tres pisos | Intermedio II | 14 | ✅ todas (11) — 9 de octubre |
| Robot con mando y telemetría | Intermedio II | 14 | ✅ todas (13) — 9 de octubre |

Mientras una animación no existe, la guía muestra *"La animación … todavía no está disponible"*
en su lugar. **Todo lo demás de la guía funciona.**

---

## 2. Lo que falta

### 2.1 Animaciones de los proyectos nuevos (trabajo principal)

**Todas las animaciones están hechas** (9 de octubre): no queda ningún tipo, programa de diagrama de flujo
ni circuito pendiente. Este inventario queda como referencia de dónde se usa cada una. Las de la Garra sirven de base: muchas se pueden armar
reutilizando el servo, la perilla, el diagrama de flujo y el diagrama de conexiones.

**Compartidas entre varios proyectos** (conviene hacerlas primero):

| Animación | Proyectos | Dónde |
| --- | --- | --- |
| ~~`diagrama-bloques`~~ ✅ | 4 | Sistemas `banda`, `casa`, `elevador` y `robot` |
| ~~`grafica-datos`~~ ✅ | 3 | Sirve para cualquier tabla del equipo (Elevador G6, Robot G6 ya la usan) |
| ~~`i2c`~~ ✅ | 3 | Elevador G5 ya tiene sus 3 pisos (`esclavos=`) |
| ~~`caida-voltaje`~~ ✅ | 2 | Casa G7 (`sistema="casa"`) y Robot G7 (`sistema="robot"`) |
| ~~`coordenadas-3d`~~ ✅ | 2 | Estación G2, Laberinto G2 |
| ~~`escala`~~ ✅ | 2 | Mini fútbol G2 (Puente G2 ya la usa) |
| ~~`ir`~~ ✅ | 2 | Laberinto G6, Mini fútbol G5 |
| ~~`lazo-cerrado`~~ ✅ | 2 | `sistema="elevador"` y `sistema="robot"` |
| ~~`mosfet`~~ ✅ | 2 | Casa G3 con `pwm="no"` (su tabla pregunta si regula con PWM) |
| ~~`protocolo`~~ ✅ | 2 | Sistemas `banda` y `robot` |
| ~~`puente-h`~~ ✅ | 2 | Robot G3 con `sentidos="Adelante|Atrás"` |
| ~~`rampa`~~ ✅ | 2 | `sistema="elevador"` (frenado) y `sistema="robot"` (aceleración) |

**De un solo proyecto:**

| Proyecto | Animaciones |
| --- | --- |
| ~~Dispensador~~ ✅ | Completo: `dispensador`, `mecanismos`, `embudo-angulo`, `tiempo-gramos`, `selector`, `pasos-porcion`, `nivel-ultrasonico` |
| ~~Invernadero~~ ✅ | Completo: `invernadero`, `causa-efecto`, `rele`, `umbral`, `histeresis`, `temporizador`, `nivel-agua` |
| ~~Puente levadizo~~ ✅ | Completo: `puente`, `semaforo`, `triangulo`, `espejo-servos`, `ultrasonico`, `grafica-carga` |
| ~~Estación meteorológica~~ ✅ | Completo: `gemelo-digital`, `extrusion`, `rgb`, `ldr`, `oled`, `calibracion`, `max-min`, `wifi-datos` (+ `coordenadas-3d`) |
| ~~Laberinto~~ ✅ | Completo: `laberinto`, `cardan`, `suavizado`, `eeprom`, `acelerometro` (+ `ir`, `coordenadas-3d` y `joystick servos="no"`) |
| ~~Mini fútbol~~ ✅ | Completo: `futbol`, `simetria`, `escaneo-3d`, `calibracion-ir`, `antirrebote`, `oled-animacion`, `contador-personas`, `bluetooth` (+ `escala fija="si"` e `ir`) |
| ~~Banda clasificadora~~ ✅ | Completo: `banda`, `rueda-libre`, `calibracion-color`, `proporcion-color`, `matriz-confusion` (+ las compartidas `i2c`, `diagrama-bloques`, `mosfet`, `protocolo`, `grafica-datos`) |
| ~~Casa inteligente~~ ✅ | Completo: `casa`, `optoacoplador`, `integracion`, `iot` (+ `caida-voltaje`, `i2c orden="L"`, `mosfet pwm="no"`, `diagrama-bloques sistema="casa"`) |
| ~~Elevador~~ ✅ | Completo: `elevador`, `siete-segmentos`, `contrapeso`, `algoritmo-ascensor` (+ `puente-h`, `rampa`, `lazo-cerrado`, `i2c`, `grafica-datos`) |
| ~~Robot con telemetría~~ ✅ | Completo: `robot-mando`, `uart`, `pwm`, `divisor`, `mezcla-diferencial` (+ las compartidas con su `sistema="robot"`) |

**Diagramas de flujo** (`tipo="diagrama-flujo" programa="…"`, todos en la Guía 3):
Todos listos: `garra`, `puente`, `invernadero`, `dispensador`, `estacion`, `laberinto` y `futbol` ✅.
Se arman leyendo la guía y el `.ino` de cada proyecto. También se pueden escribir como lista
dentro del bloque, sin programar nada (ver `COMO_AGREGAR_PROYECTOS.md`).

**Circuitos** (`tipo="conexiones" circuito="…"`):
Todos listos.
(`semaforo` y `puente-boton` del Puente; `dispensador-basico` y `dispensador` del Dispensador;
`estacion` y `estacion-real` de la Estación; `laberinto` y `laberinto-real` del Laberinto; `futbol` y `futbol-real` del Mini fútbol; `banda-potencia` de la Banda; `casa-nodos` de la Casa, con un botón por nodo; `elevador-central` del Elevador ✅.)
Los pines se toman de las guías y de los `.ino` de cada proyecto, que están fuera de esta
carpeta en `../Básico 1/`, `../Básico 2/` e `../Intermedio 2/`.

> **Forma de trabajo acordada:** ir proyecto por proyecto (empezando por el que se use primero
> en clases), guía por guía, como se hizo con la Garra. No inventar contenido pedagógico:
> usar lo que dicen las guías y los `.ino`; preguntar si algo no está claro.

### 2.1.1 Archivos de trabajo del equipo ✅ (programado el 10 de octubre)

**Hecho:** bloque `:::archivo` en la Bitácora de las 154 guías (en las 16 guías sin Bitácora, al final de la última
parte antes de "¿Lo logramos?"); texto con el programa en las 123 guías de la tabla y texto general en las 31 restantes.
Servidor: `servidor/archivos-equipo.js`, tabla `archivos_equipo`, subida `POST /api/guias/:n/archivos/:campo`
(nombre en la cabecera X-Nombre-Archivo), descarga privada `/api/archivos-equipo/:id`, lista `/api/mis-archivos`.
Navegador: `publico/js/archivos-equipo.js` (guía, página del proyecto y panel). Respaldos: espejo cada hora en
`respaldos/subidas/` + `respaldos/subidas-borradas/<fecha>/` (30 días). Reiniciar progreso no borra los archivos;
borrar el equipo sí. Probado en el puerto 3001 (versiones, tipos, 100 MB, permisos, CSV, respaldos, borrado).
**Tipos (10 de octubre):** Bairon agregó .xlsx y .csv para las hojas de cálculo; las guías con H dicen "su hoja de cálculo (.xlsx o .csv)".

Plan original:

**Problema:** los alumnos no siempre usan la misma computadora de la academia. Lo que hicieron en Blender
(u otro archivo) se queda en la PC de esa sesión.
**Idea:** al terminar la guía, el equipo sube su archivo a la plataforma; en la siguiente sesión lo descarga
desde cualquier PC y sigue donde se quedó.

**Plan propuesto** (se reutiliza casi todo lo de las fotos de la bitácora, `servidor/fotos.js`):
1. **Bloque nuevo en las guías:** `:::archivo id="g2-blend" tipos=".blend,.stl"` con un texto ("Sube tu archivo
   de Blender antes de irte"). Muestra un botón para subir y, debajo, las versiones ya guardadas con botón de descarga.
2. **"Archivos del equipo"** en la página del proyecto: la lista de todo lo que el equipo subió (de cualquier guía),
   para que al empezar la siguiente sesión lo encuentren sin buscar en qué guía lo subieron.
3. **Dónde se guarda:** `subidas/<proyecto>/equipo-<id>/archivos/` y una tabla nueva `archivos_equipo` en la base
   de datos (equipo, guía, campo, nombre original, tamaño, fecha). Como las fotos: solo lo ve el equipo dueño y el
   docente, nunca es público, y no sale de la PC.
4. **Versiones:** no sobrescribir; guardar las últimas versiones (por ejemplo 5) con fecha, para recuperar si alguien
   sube el archivo equivocado.
5. **Panel del docente:** ver y descargar los archivos de cada equipo (útil para revisar y para el portafolio).
6. **Guías donde ponerlo:** las que trabajan en Blender o Wokwi (por ejemplo Garra G2, G11, G13; Estación G2, G4, G8;
   Laberinto G2, G3; Mini fútbol G2, G4…). Se revisa guía por guía con Bairon.

**Decisiones de Bairon (9 de octubre):**
- Tamaño máximo: **100 MB por archivo**. Se guardan las **últimas 5 versiones** de cada recuadro.
- Tipos permitidos: **.blend, .stl, .ino, .zip, .txt, .docx, .xlsx y .csv** (.txt y .docx para quien lleve la bitácora en el
  bloc de notas o en Word).
- Los **respaldos automáticos** copian también los archivos subidos (`subidas/`; hoy solo copian la base de datos).
  Ojo: con archivos de hasta 100 MB los respaldos pueden pesar bastante; revisar cuántos respaldos se guardan.
- El recuadro va en **las 154 guías** (en la parte de Bitácora), para el trabajo con programas y para quien lleve
  la bitácora en .txt o .docx.
- **Los archivos no se borran** al cerrar el ciclo (solo el docente podría borrarlos a mano, si se agrega esa opción).

**Referencia: guías que usan programas** (el recuadro va en todas, pero estas son las más importantes; detectadas buscando Blender = B, Wokwi = W, código de Arduino = A,
hoja de cálculo = H, app de escaneo = E; 123 de 154 guías). Revisarlas al programarlo, porque la búsqueda
es automática y puede incluir una guía que solo menciona el programa:

| Proyecto | Guías |
| --- | --- |
| Garra robótica | 1 (B, A) · 2 (B) · 3 (B) · 4 (B, A) · 5 · 6 · 7 (A) · 8 (B) · 10 (B, H) · 11 (B, A) · 12 (A) · 13 (B) · 14 (W, A) |
| Dispensador | 1 (B, A) · 2 (B) · 3 (B) · 5 · 6 · 7 (A, H) · 8 · 10 (H) · 11 · 12 (A) · 13 (B) · 14 (W, A) |
| Mini invernadero | 1 (B, A) · 2 (B) · 3 (B) · 4 · 5 · 6 · 7 (A, H) · 8 · 10 (H) · 11 · 13 (B) · 14 (W, A) |
| Puente levadizo | 1 (B, A) · 2 (B) · 3 (B, A) · 5 · 6 · 7 · 8 (B) · 10 (H) · 11 · 12 (A) · 13 (B) · 14 (W) |
| Estación meteorológica | 1 (B, W, A) · 2 (B) · 3 (W, A) · 4 (B, A) · 5 (W, A) · 6 · 7 (A, H) · 8 (B, H) · 10 (B, H) · 11 (B, A) · 12 (H) · 13 (B, A) · 14 (W, A) |
| Laberinto | 1 (B, W, A) · 2 (B) · 3 (B, W, A) · 4 (B, A) · 5 · 6 · 7 (A, H) · 10 (H) · 11 (B, A) · 12 (W, A) · 13 (B, A) · 14 (W, A) |
| Mini fútbol | 1 (B, W, A) · 2 (B) · 3 (B, W, A) · 4 (B, E) · 5 · 6 · 7 (A, H) · 8 (B, H) · 10 (H) · 11 · 12 (A) · 13 (B, A) · 14 (A) |
| Banda clasificadora | 1 · 2 (W, A) · 4 · 5 · 6 (H) · 7 · 8 (A, H) · 12 (H) · 13 · 14 (A, H) |
| Casa inteligente | 1 · 2 (W, A) · 4 · 5 · 7 · 8 · 12 (H) · 14 (W, A) |
| Elevador | 1 · 2 (W, A) · 4 · 5 (W, A) · 7 · 8 (A, H) · 12 (H) · 13 · 14 |
| Robot con telemetría | 1 · 2 (W, A) · 3 · 4 · 5 · 7 · 8 · 9 (W) · 12 (H) |

(Sin letra = código de Arduino.) En estas guías conviene que el texto del recuadro nombre el programa
("Sube tu archivo de Blender…"); en las demás, un texto general para la bitácora.

Todas las decisiones están tomadas: en la próxima sesión se puede programar directamente.

### 2.1.3 Bitácora del equipo ✅ (13 de octubre)

Botón flotante 📓 en guías y página del proyecto (`publico/js/bitacora.js`, `servidor/bitacora.js`, tabla `notas`).
Notas separadas con autor, guía y fecha; autoguardado; el docente las ve en la tarjeta del equipo y en el CSV.

### 2.1.2 Guías paso a paso ✅ (13 de octubre)

Cada parte se muestra un paso a la vez (`publico/js/pasos.js`), con "Ver toda la parte" para el proyector.
Está activo en **todos los proyectos** (se apaga con `"pasoAPaso": false` en `proyecto.json`). Revisado en las 154 guías: sin errores ni pasos vacíos.
El equipo vuelve al paso donde iba en cualquier computadora (tabla `posiciones`). La vista del docente no cambia.

- [ ] Probarlo con los chicos y anotar los pasos que queden mal cortados o muy largos para ajustarlos.

### 2.1.4 Revisión de las guías ✅ (10 al 13 de octubre)

Las 154 guías se revisaron para que cada paso esté explicado en detalle para los chicos: se repiten los pasos
completos donde decía "como en la guía N", se corrigieron incoherencias y errores del código o de las medidas,
y los recuadros de archivo de trabajo nombran el programa que se usa ese día. Supuestos: Blender 5.2 en español
y Arduino IDE 2.x.

- **Registro:** `REVISION_GUIAS.md` (por proyecto: "Correcciones" y "Para revisar").
- **Originales:** `respaldos/guias-antes-de-la-revision-2026-10-10/`.
- **Verificador:** `node respaldos/guias-antes-de-la-revision-2026-10-10/verificar.js "<carpeta de la plataforma>" [proyecto]`.
  Compara cada guía con su original y avisa si cambió algo que guarda respuestas (IDs, casillas de tablas,
  líneas `____`, casillas de "¿Lo logramos?"), el código, las animaciones, los títulos de las partes o la cantidad
  de `[IMAGEN]`. Debe decir "OK: respuestas, código y animaciones intactos". Los cambios aprobados están en su
  lista `EXCEPCIONES`.
- **Ojo al editar guías:** las tablas Markdown simples con celdas vacías también guardan respuestas (se numeran
  solas: `g5-tabla-1`, `g5-tabla-2`…). Insertar una tabla nueva antes de ellas mueve las respuestas: usar listas.
- **Mini fútbol (Blender):** cada pieza explica cómo agregarla y dónde escribir sus medidas; reto de la red con
  posiciones exactas; reto de la medalla corregido (hay que convertir el texto a malla antes de unirlo).

### 2.1.5 Nombres de Blender 5.2 ✅ (13 de octubre)

La academia usa **Blender 5.2 en español** y varios nombres de las guías no existían en esa versión
(Matriz → **Repetir**, Simetría → **Simetrizar**, Booleano → **Booleana**, Esquema → **Listado**,
Ubicación → **Posición**, Añadir modificador → **Agregar modificador**, Fuente → **Tipografía**…).
Se corrigieron unas 270 líneas en los 7 proyectos con Blender. La tabla completa está en `REVISION_GUIAS.md`.

- **Cómo comprobar un nombre:** la traducción oficial está en
  `C:\Program Files\Blender Foundation\Blender 5.2\5.2\datafiles\locale\es\LC_MESSAGES\blender.mo`
  (formato gettext; se puede leer con un script pequeño de Node). No adivinar nombres de menús.
- [x] **Animación `simetria`** (Mini fútbol G2): ahora dice **Simetrizar** y **Definir origen** (14 de octubre).
- [ ] Confirmar en una PC de la academia cómo aparecen: la carpeta **Object/Objeto** al anexar (Garra, Puente y
      Laberinto G13) y los menús de la extensión de engranajes (Garra G4, en inglés: **Gears → Gear**).

### 2.2 Pendientes del docente (no son de programación)

- [ ] **Imágenes** de las guías (`IMAGEN_x.y.png`) en la carpeta `imagenes/` de cada proyecto.
      La `IMAGEN_1.1.png` de cada proyecto también es la portada de su tarjeta en el inicio.
- [ ] **Regla del firewall** para el puerto 3000 (comando en `LEEME.md`). Al revisar no se encontró.
- [ ] **Ensayo con celulares reales** (Android e iPhone): entrar por el QR, responder,
      mover una animación y **subir una foto**. Las pruebas se hicieron en Chrome de computadora.
- [ ] Opcional: espacio `:::foto` en la Guía 9 de la Garra (Día de presentación).

### 2.3 Ideas opcionales (cuando haya tiempo)

- Agrupar los proyectos por nivel en la página de inicio (Básico, Básico II, Intermedio II).
  Hoy aparecen todos juntos, ordenados por nombre; se puede definir `"orden"` en cada `proyecto.json`.
- Descargar las fotos de un equipo en un ZIP desde el panel.

---

## 3. Notas técnicas para retomar

**Estructura**

```
servidor/   index.js (arranque) · api-estudiantes.js · api-docente.js · markdown.js (lector de guías)
            contenido.js · progreso.js · fotos.js · respaldos.js · db.js · config.js · util.js
publico/    páginas .html · css/ (estilos, animaciones, docente, tema-oscuro) · js/ · fuentes/ · img/
publico/js/animaciones/   una animación por archivo (<tipo>.js) + comun/ (svg.js, servo-svg.js, grafica.js)
contenido/  un proyecto por carpeta + _galeria/animaciones.md (ejemplos de la galería)
```

**Cómo se agrega una animación nueva**

1. Crear `publico/js/animaciones/<tipo>.js` con `export default function montar(contenedor, config, contexto)`.
   - `config` trae los atributos del bloque. Las tablas y listas escritas dentro del bloque llegan
     como `config.tabla` y `config.lista`.
   - `contexto.respuestas` trae las respuestas del equipo. Por ejemplo, la rutina lee la tabla
     `g7-posiciones`.
2. Estilos en `publico/css/animaciones.css`. Usar las variables de color (`--acento`, `--superficie`,
   `--linea`…) para que funcione también en modo oscuro.
3. Si la guía usa otro nombre, agregar el alias en `ALIAS_ANIMACIONES` (`servidor/markdown.js`).
4. Agregar un ejemplo a `contenido/_galeria/animaciones.md` y documentarla en `COMO_AGREGAR_PROYECTOS.md`.

**Versiones fijadas (por Node 20.10)**

- `better-sqlite3` v11: la v12 no compila y la v13 pide Node 22.
- `marked` v15: la v16 o más nueva solo funciona como ESM.
- No se usa `multer` (las fotos llegan sin intermediarios) ni librerías en el navegador.

**Probar sin tocar los datos reales**

```
set DATOS_DIR=C:\ruta\temporal\datos
set RESPALDOS_DIR=C:\ruta\temporal\respaldos
set SUBIDAS_DIR=C:\ruta\temporal\subidas
set PUERTO=3001
node servidor/index.js
```

**Piezas reutilizables nuevas (7 de octubre):** `comun/grafica.js` (gráfica de línea de una serie,
color validado `--serie-1`; sirve para `grafica-datos`), `ultrasonico` (sirve también para
`nivel-ultrasonico` del Dispensador) y `escala` (también la usa Mini fútbol).
Después: `comun/oled.js` + `comun/letra5x7.js` (pantalla OLED píxel a píxel, misma forma de usar que
Adafruit, con `invertDisplay`), `ir` (sensor infrarrojo genérico) y `coordenadas-3d` con dos modos.
Banda (9 de octubre): `comun/siete-segmentos.js` (display de 7 segmentos, posiciones como LedControl; sirve para
`siete-segmentos` del Elevador). `diagrama-bloques` y `protocolo` tienen un objeto `SISTEMAS`: para Casa,
Elevador y Robot se agrega su sistema ahí. `grafica-datos`, `calibracion-color` y `matriz-confusion` leen la
tabla del equipo aunque esté en otra guía.

**Instalar en otra PC:** usar Node LTS y no copiar `node_modules` (ver `LEEME.md`). En una PC con
Node 26 `better-sqlite3` falló; Bairon lo resolvió allá. Esta PC se queda con Node 20.10 sin cambios.

**Revisión rápida de todas las guías** (detecta animaciones que faltan o marcas sin procesar):
cargar cada guía con `obtenerGuia(proyecto, numero)` de `servidor/contenido.js` y buscar
`data-tipo="…"` sin archivo en `publico/js/animaciones/`.
