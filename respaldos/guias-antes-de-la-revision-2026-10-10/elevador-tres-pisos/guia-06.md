---
titulo: ¿Para justo en el piso?
guia: 6
sabado: 6
sesion: Pruebas funcionales
duracion: 120
---

# Guía 6 · ¿Para justo en el piso?

## Objetivo del día

Medir la precisión con la que la cabina se detiene en cada piso, probar la atención de llamadas y los dispositivos de seguridad.

**Al terminar tendremos:** la tabla de precisión por piso, la matriz de pruebas de requisitos y el registro de fallos encontrados.

## Materiales del equipo

- Elevador completo
- Regla milimétrica, marcador
- Pesas (carga de la cabina)
- Cronómetro

## Parte 1 · Precisión de parada (40 min)

Marca en la torre la altura exacta de cada piso. Después de cada viaje, mide cuántos mm quedó la cabina **arriba (+)** o **abajo (−)** de la marca.

:::tabla id="g6-precision"
| Viaje | Desde → hasta | Sin carga (mm) | Con carga (mm) |
| --- | --- | --- | --- |
| 1 | 1 → 2 | | |
| 2 | 2 → 3 | | |
| 3 | 3 → 1 | | |
| 4 | 1 → 3 | | |
| 5 | 3 → 2 | | |
| 6 | 2 → 1 | | |
| Promedio | | | |
:::

:::animacion tipo="grafica-datos" tabla="g6-precision"
:::

:::pregunta id="g6-p1"
¿La cabina se pasa más al subir o al bajar? ¿Y con carga o sin carga? ¿Por qué crees que pasa?
:::

## Parte 2 · Llamadas (30 min)

:::tabla id="g6-llamadas"
| Prueba | Resultado esperado | Resultado | ¿Aprueba? |
| --- | --- | --- | --- |
| Llamar desde el piso donde ya está la cabina | Abre (espera 2 s) sin moverse | | |
| Llamar 3 y luego 2 rápido estando en 1 | Va al 2 primero (más cercano) | | |
| Llamar los 3 pisos a la vez | Atiende los 3 | | |
| Presionar el botón 5 veces seguidas | Una sola llamada | | |
| Llamar mientras la cabina viaja | La llamada se guarda | | |
:::

Tiempo promedio de espera (desde llamar hasta que llega): ______ s

## Parte 3 · Seguridad (35 min)

:::tabla id="g6-seguridad"
| Prueba | Resultado esperado | Resultado | ¿Aprueba? |
| --- | --- | --- | --- |
| Paro de emergencia subiendo | Se detiene al instante | | |
| Paro de emergencia bajando | Se detiene al instante | | |
| Soltar el paro | Continúa el viaje | | |
| Presionar a mano el final de carrera de arriba mientras sube | Se detiene | | |
| Desconectar el nodo del piso 2 | Los pisos 1 y 3 siguen funcionando | | |
| Desconectar el bus completo | | | |
:::

:::pregunta id="g6-p2"
¿Qué pasó al desconectar el bus completo? ¿Es seguro? ¿Qué debería pasar en un elevador real?
:::

:::pregunta id="g6-p3"
Al soltar el paro, el elevador sigue solo. ¿Es correcto? ¿Qué hacen los elevadores reales?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] Medimos la precisión con y sin carga.
- [ ] Probamos la atención de llamadas.
- [ ] Probamos todos los dispositivos de seguridad.
- [ ] Registramos los fallos.
:::

## Bitácora (10 min)

:::tabla id="g6-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- Las fallas de hoy son la entrada de la guía 7: registrar, no corregir todo.
- g6-p2: si falla el bus, la central no recibe llamadas pero el motor sigue controlado por sus propios sensores; es una degradación segura. Discutir si debería además avisar del error.
- g6-p3: en elevadores reales, tras un paro de emergencia el sistema queda bloqueado hasta un rearme manual.
- Tiempo total: 40 + 30 + 35 + 5 + 10 = 120 minutos.
:::
