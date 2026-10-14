---
titulo: Trabajar entre equipos
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Trabajar entre equipos

## Objetivo del día

Reflexionar sobre el trabajo entre equipos y la integración de sistemas, completar la bitácora y el código final, y (opcional) diseñar un nodo nuevo.

**Al terminar tendremos:** la reflexión del equipo, el código final del nodo documentado y la bitácora completa.

## Materiales del equipo

- Casa integrada
- Bitácora de fallos del grupo

## Parte 1 · La integración en el mundo real (20 min)

:::tabla id="g13-mundo"
| Proyecto real | ¿Quiénes lo construyen? | ¿Qué "contrato" necesitan? |
| --- | --- | --- |
| Un carro (motor, frenos, radio de distintas fábricas) | | |
| Una aplicación del celular y su servidor | | |
| Una estación espacial (módulos de varios países) | | |
| Una casa inteligente comercial (focos y sensores de marcas distintas) | | |
:::

:::pregunta id="g13-p1"
¿Qué pasaría si cada fábrica de focos inteligentes inventara su propio protocolo?
:::

## Parte 2 · Reflexión (30 min)

:::pregunta id="g13-p2"
¿Qué aprendimos al depender de otros equipos para que nuestro nodo funcionara?
:::

:::pregunta id="g13-p3"
¿Cuál fue el fallo de integración más difícil y cómo lo resolvieron los equipos juntos?
:::

:::pregunta id="g13-p4" individual="si"
¿Qué habilidad de trabajo en equipo mejoré en este proyecto?
:::

## Parte 3 · Reto opcional: un nodo nuevo (45 min)

Diseñen un nodo nuevo para la casa **sin cambiar** los nodos existentes: solo se agrega su dirección en la central y sus órdenes.

:::opciones id="g13-nuevo"
¿Qué nodo nuevo diseñamos?
- Cochera (portón con servo y sensor de distancia)
- Jardín (riego con bomba y sensor de humedad)
- Cocina (sensor de gas o humo con alarma)
- Otro
:::

:::tabla id="g13-diseno"
| Pregunta | Respuesta |
| --- | --- |
| Dirección I2C | |
| Órdenes (letra y valor) | |
| Estado (2 bytes) | |
| Carga y cómo se controla | |
| Protecciones | |
| Consumo adicional para la fuente | |
:::

:::pregunta id="g13-p5"
¿Qué tan fácil fue agregar el nodo nuevo gracias a la arquitectura en bus y al contrato?
:::

## Parte 4 · Código final (20 min)

:::checklist id="g13-codigo"
- [ ] Encabezado con proyecto, nodo, dirección, equipo y docente.
- [ ] Cada función comentada.
- [ ] Ajustes del nodo juntos y explicados.
- [ ] Guardado como **equipo_NOMBRE_nodo_SALA.ino** (o CUARTO, ENTRADA, CENTRAL).
:::

:::archivo id="g13-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Completamos la tabla de integración en el mundo real.
- [ ] Escribimos la reflexión.
- [ ] El código final está documentado.
:::

:::docente
- El nodo nuevo se puede construir si hay tiempo y materiales; si no, basta con el diseño completo.
- g13-p1: no podrían funcionar juntos; por eso existen estándares (por ejemplo Matter, Zigbee).
- Tiempo total: 20 + 30 + 45 + 20 + 5 = 120 minutos.
:::
