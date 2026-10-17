# Plataforma de guías · STEAM Robotics Academy

> Estado del desarrollo, pendientes y notas para continuar: ver `ESTADO_DEL_PROYECTO.md`.

Plataforma web que corre en tu computadora. Los estudiantes la abren desde sus
celulares, tabletas o computadoras conectados al **mismo Wi-Fi**. Funciona sin internet.

## Arrancar

**Lo más fácil:** doble clic en **`Iniciar plataforma.bat`**. Se abre una ventana negra con la
dirección y el código QR. Para apagar la plataforma, cierra esa ventana (o `Ctrl + C`).

**Desde la terminal:**

1. Abre una terminal (PowerShell) en esta carpeta.
   Truco: en el Explorador de archivos, abre la carpeta, escribe `powershell` en la barra
   de direcciones y presiona Enter.
2. Escribe:

   ```
   npm start
   ```

3. La consola muestra algo así:

   ```
   En esta computadora:  http://localhost:3000
   Para los estudiantes (misma red Wi-Fi):
      http://192.168.1.20:3000    (Wi-Fi)
   ```

   y un **código QR** que los estudiantes pueden escanear con la cámara.

4. Para apagarlo: `Ctrl + C` en la terminal.

La **galería de animaciones** (todas las animaciones con su bloque para copiar) está en
`http://localhost:3000/animaciones`.

> La primera vez que se instala en otra PC hay que correr `npm install` antes de `npm start`.

## Encontrar tu IP local (si no la ves en la consola)

1. Abre PowerShell y escribe `ipconfig`.
2. Busca la sección **Adaptador de LAN inalámbrica Wi-Fi**.
3. La línea **Dirección IPv4** (por ejemplo `192.168.1.20`) es tu IP.
   La dirección para los estudiantes es `http://192.168.1.20:3000`.

La IP puede cambiar entre un sábado y otro: revisa siempre lo que dice la consola al arrancar.

## Permitir el puerto en el firewall de Windows (una sola vez)

Si en tu PC funciona pero en los celulares no carga, Windows está bloqueando el puerto.

1. Busca **PowerShell** en el menú Inicio → clic derecho → **Ejecutar como administrador**.
2. Pega este comando y presiona Enter:

   ```
   New-NetFirewallRule -DisplayName "Plataforma guías STEAM (3000)" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow -Profile Private
   ```

3. Asegúrate de que el Wi-Fi del aula esté marcado como red **Privada**:
   Configuración → Red e Internet → Wi-Fi → (tu red) → Tipo de perfil de red → **Privada**.

Para quitar la regla más adelante:
`Remove-NetFirewallRule -DisplayName "Plataforma guías STEAM (3000)"`

Si el router del aula tiene activado el "aislamiento de clientes" (AP isolation), los
dispositivos no se pueden ver entre sí. En ese caso hay que desactivarlo en el router.

## Configuración (.env)

El archivo `.env` se crea solo la primera vez. Ábrelo con el Bloc de notas:

```
DOCENTE_CLAVE=cambia-esta-clave   ← contraseña del panel del docente
PUERTO=3000                       ← puerto (si lo cambias, cambia también la regla del firewall)
```

## Carpetas

| Carpeta | Qué contiene |
| --- | --- |
| `contenido/` | Proyectos y guías en Markdown (ver `COMO_AGREGAR_PROYECTOS.md`) |
| `contenido/<proyecto>/archivos/` | Plantillas que los estudiantes descargan desde la guía (por ejemplo `base_garra.blend`) |
| `publico/` | Páginas, estilos, fuentes, animaciones. Aquí va el logo: `publico/img/logo.jpg` |
| `datos/` | Base de datos (`plataforma.db`) con equipos, respuestas y progreso |
| `respaldos/` | Copias de seguridad de la base de datos y espejo de `subidas/` |
| `subidas/` | Fotos de la bitácora y archivos de trabajo de los equipos |
| `servidor/` | Código del servidor |

Los datos de los estudiantes **nunca salen de tu PC**: todo queda en `datos/` y `subidas/`.

## Panel del docente

Abre `http://localhost:3000/docente` y entra con la contraseña `DOCENTE_CLAVE` del `.env`
(la sesión dura 12 horas). Pestañas:

| Pestaña | Para qué |
| --- | --- |
| **Avance** | Equipos en filas y guías en columnas, con colores por estado. Se actualiza solo cada 15 s. Toca una celda para ver las respuestas de ese equipo en esa guía, con tus notas. |
| **Equipos** | Crear equipos con su PIN (el 🎲 propone uno al azar), cambiar nombre o PIN, elegir la **versión de las guías** (en proyectos que la tienen), desbloquear una guía solo para un equipo, reiniciar su progreso o borrarlo. |
| **Guías** | Desbloquear o bloquear cada guía para todo el proyecto, ver cada guía con las notas del docente y crear un proyecto nuevo. |
| **Compartir** | Dirección y código QR para los estudiantes (con botón de pantalla completa para proyectarlo). |
| **Exportar** | Descargar todas las respuestas o el avance en CSV (Excel o Google Sheets). |

Notas:

- Si cambias el PIN de un equipo, sus dispositivos tienen que volver a entrar.
- **Versiones de las guías:** todos los proyectos que usan Blender (**Dispensador**, **Mini invernadero**, **Puente levadizo**,
  **Laberinto inclinable**, **Estación meteorológica**, **Garra robótica** y **Mini fútbol**) tienen dos versiones del diseño 3D: **Blender** y
  **Tinkercad (bloques)**, que usa Tinkercad Codeblocks. En la pestaña **Equipos**, cada tarjeta tiene el menú
  **"Versión de las guías"**: elige la que verá ese equipo. Solo cambian las guías de diseño 3D (Dispensador e Invernadero: 1, 2, 3 y 13;
  Puente: 1, 2, 3, 8 y 13; Laberinto: 1, 2, 3, 4, 11 y 13; Estación: 1, 2, 4, 8, 10, 11 y 13; Garra: 1, 2, 3, 4, 8, 10, 11 y 13;
  Mini fútbol: 1, 2, 3, 8 y 13); las demás son iguales. En el Mini fútbol, la Parte 4 de la Guía 4 (limpiar el trofeo escaneado)
  se queda en Blender: la hace el docente o un equipo con Blender. Puedes cambiarla en cualquier
  momento: **las respuestas se conservan**. En el visor de una guía, sin equipo elegido, el menú **Versión** muestra cada una.
  Tinkercad necesita internet y una cuenta de Tinkercad para cada equipo (o una clase de Tinkercad).
- En el visor de respuestas, la casilla **"Solo notas del docente"** deja solo tus notas de esa guía.
- Una guía abierta para todo el proyecto no se puede cerrar para un solo equipo; al revés sí
  (abrir una guía solo para un equipo que va adelantado).

Para empezar de cero (borra equipos, respuestas y progreso): apaga el servidor y borra
los archivos `datos/plataforma.db*` y la carpeta `subidas/`.

## Fotos y videos de la bitácora

En los espacios `:::foto` de las guías, los estudiantes tocan **📷 Agregar foto o video** y eligen
tomar la foto con la cámara o subirla de la galería.

- Las fotos se achican en el celular antes de subirse (máx. 1600 px, JPG): suben rápido y ocupan
  poco (normalmente menos de 400 KB cada una).
- Los videos se suben tal cual, hasta 80 MB (unos 30–60 segundos en un celular).
- Hasta 10 archivos por espacio. El equipo puede borrar los suyos (tocando × dos veces).
- Se guardan en `subidas/<proyecto>/equipo-<id>/guia-<n>/`. Solo los ve el equipo que los subió
  y el docente (en el visor de respuestas del panel). El CSV de respuestas indica la ruta de cada archivo.
- Al reiniciar o borrar un equipo desde el panel, también se borran sus fotos.

## Archivos de trabajo del equipo

Los alumnos no siempre usan la misma computadora. Por eso, en la **Bitácora de cada guía** hay un
recuadro 💾 **Archivo de trabajo**: el equipo sube ahí su archivo antes de irse (.blend, .stl, .ino,
.zip, .txt, .docx, .xlsx o .csv) y la próxima sesión lo descarga desde cualquier PC.

- Máximo **100 MB** por archivo. Se guardan las **últimas 5 versiones** de cada recuadro; al subir la
  sexta, la más vieja se borra sola.
- En la página del proyecto, la sección **💾 Archivos del equipo** reúne todo lo que el equipo subió,
  agrupado por guía, para no tener que buscar en qué guía estaba.
- Se guardan en `subidas/<proyecto>/equipo-<id>/archivos/guia-<n>/`. Solo los descargan el equipo dueño
  y el docente: en el panel, pestaña **Equipos** → "Archivos de trabajo" de cada equipo, y en el visor
  de respuestas de cada guía. El CSV de respuestas trae una fila por versión.
- **Reiniciar el progreso NO borra estos archivos.** Solo se borran si borras el equipo.

## Bitácora del equipo (notas)

En todas las guías y en la página del proyecto hay un botón flotante **📓 Bitácora** (abajo a la derecha).
Abre un panel con las notas del equipo para anotar ideas, fallos o medidas en cualquier momento.

- Cada nota es aparte y guarda **quién la escribió, en qué guía y cuándo** (y quién la editó). Así dos
  compañeros pueden escribir a la vez sin borrarse. Todo el equipo puede editar o borrar cualquier nota.
- Se guardan solas mientras escriben, en la base de datos (entran en los respaldos diarios).
  Máximo 5000 letras por nota y 300 notas por equipo.
- El docente las ve en el panel, pestaña **Equipos** → "Bitácora" de cada equipo, y el CSV de
  respuestas trae una fila por nota.
- **Reiniciar el progreso NO borra la bitácora.** Solo se borra si borras el equipo.

## Respaldos

- Cada día se guarda automáticamente una copia de la base de datos en `respaldos/`
  (`plataforma-AAAA-MM-DD.db`), al arrancar y revisando cada hora.
- Desde el panel (pestaña **Exportar**) puedes hacer un respaldo en cualquier momento.
- Se conservan los 30 más recientes.
- La carpeta `subidas/` (fotos, videos y archivos de trabajo) se copia **cada hora** a `respaldos/subidas/`.
  Solo se copian los archivos nuevos (un archivo subido nunca cambia), así que el espejo ocupa lo mismo que
  `subidas/` y no 30 veces más. Lo que se borra de `subidas/` (versiones viejas, fotos borradas) pasa a
  `respaldos/subidas-borradas/<fecha>/` y se elimina a los 30 días.
- Ojo: todo está en el mismo disco. De vez en cuando copia `respaldos/` a una memoria USB.

**Para restaurar un respaldo:** apaga el servidor; en `datos/` mueve `plataforma.db`
(y `plataforma.db-wal` y `plataforma.db-shm` si existen) a otra carpeta; copia el respaldo a
`datos/` con el nombre `plataforma.db`; vuelve a arrancar. Si también se perdieron fotos o archivos,
copia el contenido de `respaldos/subidas/` dentro de `subidas/`.

## Llevar la plataforma a otra computadora

1. Instala Node.js en una versión **LTS** (20, 22 o 24). Con versiones "Current" muy nuevas
   (por ejemplo Node 26) `better-sqlite3` puede no instalarse.
2. Copia toda la carpeta `Plataforma-guias` **sin** `node_modules`: esa carpeta se compila para la
   versión de Node de cada computadora y no sirve en otra.
3. Doble clic en `Iniciar plataforma.bat`: la primera vez instala lo necesario (`npm install`,
   requiere internet solo esa vez).

## Respaldo del código y las guías en GitHub

El proyecto está en **https://github.com/byron365/plataforma-guias-steam** (repositorio **público**).
Es un respaldo de las guías, la plataforma y la documentación, y guarda el historial de cada cambio.

**Qué NO se sube** (lo impide el archivo `.gitignore`): las respuestas y la base de datos (`datos/`), las fotos
y archivos de los equipos (`subidas/`), las copias de la base de datos de `respaldos/`, la contraseña (`.env`)
y `node_modules/`. Sí se sube `respaldos/guias-antes-de-la-revision-2026-10-10/` (guías originales y su verificador).

> Ojo: como es público, cualquiera puede leer las guías, **incluidas las notas `:::docente` con las respuestas**.

**Para subir los cambios nuevos** (en una terminal abierta en esta carpeta):

```
git add -A
git commit -m "Qué cambió, en pocas palabras"
git push
```

- Antes de `git commit` puedes revisar qué se va a subir con `git status`.
- La primera vez en una computadora nueva, `git push` abre el navegador para iniciar sesión en GitHub.
- Los cambios se firman como "Bairon Alas" con el correo privado de GitHub (configurado solo en este proyecto).

**Para recuperar el proyecto en otra computadora:** `git clone https://github.com/byron365/plataforma-guias-steam.git`
y luego sigue "Llevar la plataforma a otra computadora". Las respuestas y fotos no vienen: se restauran desde
`respaldos/` (ver "Respaldos").
