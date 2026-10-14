---
titulo: El día de la integración
guia: 6
sabado: 6
sesion: Pruebas funcionales
duracion: 120
---

# Guía 6 · El día de la integración

## Objetivo del día

Probar cada nodo por separado y luego integrar los cuatro en la casa, comprobando cada orden del celular y lo que muestra la pantalla.

**Al terminar tendremos:** la casa completa funcionando y la matriz de pruebas de integración con resultados.

## Materiales del equipo

- Los cuatro nodos y la maqueta
- Fuente de 12 V, bornera, cable del bus
- Celular con la app configurada

## Parte 1 · Cada nodo por separado (20 min)

Antes de unir, cada equipo demuestra su nodo con el maestro de pruebas:

:::tabla id="g6-separado"
| Nodo | Responde a sus órdenes | Envía 2 bytes de estado | Equipo responsable |
| --- | --- | --- | --- |
| Sala | | | |
| Cuarto | | | |
| Entrada | | | |
| Central (con celular y sin nodos) | | | |
:::

## Parte 2 · Integración paso a paso (30 min) · todo el grupo

No conecten todo de una vez: si algo falla, no sabrán qué fue. Agreguen **un nodo a la vez**:

1. Central + sala → probar.
2. + cuarto → probar.
3. + entrada → probar.
4. Encender todas las cargas a la vez.

:::animacion tipo="integracion"
:::

:::tabla id="g6-pasos"
| Paso | ¿Funcionó? | Problema encontrado |
| --- | --- | --- |
| Central + sala | | |
| + cuarto | | |
| + entrada | | |
| Todo encendido | | |
:::

## Parte 3 · Matriz de pruebas (45 min)

:::tabla id="g6-matriz"
| Orden desde el celular | Resultado esperado | Resultado real | Pantalla correcta | Tiempo de respuesta | ¿Aprueba? |
| --- | --- | --- | --- | --- | --- |
| L100 | Sala a tope | | | | |
| L30 | Sala tenue | | | | |
| LA (tapar la LDR) | Sala se enciende sola | | | | |
| V100 | Ventilador a tope | | | | |
| VA (calentar el DHT11) | Ventilador según temperatura | | | | |
| A | La cerradura se abre 2 s | | | | |
| N | Sala 20 %, ventilador automático | | | | |
| F + movimiento frente al PIR | Alarma y mensaje al celular | | | | |
| C | Alarma desactivada | | | | |
:::

:::pregunta id="g6-p1"
¿La pantalla central siempre mostró el estado **real**? Si no, ¿por qué podría mostrar algo distinto a lo que pasa?
:::

## Parte 4 · Todo encendido (15 min)

Enciende sala al 100 %, ventilador al 100 % y abre la cerradura. Mide:

:::tabla id="g6-carga-total"
| Medición | Valor |
| --- | --- |
| Corriente total de la fuente (mA) | |
| Voltaje de 12 V con todo encendido | |
| Voltaje de 5 V con todo encendido | |
| ¿Algún Arduino se reinició? | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] Probamos cada nodo por separado.
- [ ] Integramos los nodos de uno en uno.
- [ ] Completamos la matriz de pruebas.
- [ ] Medimos con todo encendido.
:::

## Bitácora (5 min)

:::tabla id="g6-fallos"
| Síntoma | Causa | Solución | Equipo |
| --- | --- | --- | --- |
| | | | |
| | | | |
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- El docente coordina la integración; cada equipo tiene un representante en la mesa central.
- Lo que falle hoy se corrige en la guía 7 (direcciones repetidas, caídas de voltaje, ruido en el bus).
- g6-p1: la central guarda el último estado leído; si un nodo no responde, sigue mostrando el viejo. Buena entrada para mostrar "sin conexión".
- Tiempo total: 20 + 30 + 45 + 15 + 5 + 5 = 120 minutos.
:::
