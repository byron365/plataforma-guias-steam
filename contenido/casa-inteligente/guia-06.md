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

Usen el programa "central de pruebas" de la Guía 5 (Parte 2), con el Monitor serie en **Sin ajuste de línea**. Envíen cada orden del contrato y revisen que el estado tenga 2 números. La central se prueba sola: con el celular conectado, sus órdenes deben responder "OK" en la app.

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

Cada vez que agreguen un nodo: apaguen todo, conecten su bus (A4, A5 y GND con los de la central), enciendan y prueben **sus** órdenes desde el celular. Si algo falla, quiten el último nodo: así saben cuál causa el problema.

1. Central + sala → probar.
2. + cuarto → probar.
3. + entrada → probar.
4. Encender todas las cargas a la vez.

Avancen paso a paso en la animación para ver el orden de la integración:

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

Una persona envía las órdenes desde el celular y otra anota. Para el **tiempo de respuesta**, cronometren desde que tocan el botón hasta que la carga reacciona (o escriban "inmediato" si es menos de 1 s). **¿Aprueba?** es Sí si el resultado real y la pantalla coinciden con lo esperado.

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

- **Corriente total:** el multímetro en serie entre la fuente y la bornera (como en la Guía 3), con el docente.
- **Voltajes:** el multímetro en voltaje continuo (punta roja en **V**) en la bornera (12 V) y en la salida del LM2596 (5 V). Midan justo cuando se abre la cerradura.
- Fíjense si algún Arduino se reinicia (su pantalla o sus cargas se apagan un momento).

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

Anoten los fallos de hoy (síntoma, causa, solución y qué equipo lo resolvió).

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
