---
titulo: Bus, voltaje y direcciones
guia: 7
sabado: 7
sesion: Corrección de fallos
duracion: 120
---

# Guía 7 · Bus, voltaje y direcciones

## Objetivo del día

Diagnosticar y corregir los fallos típicos de la integración: direcciones I2C repetidas, caídas de voltaje, ruido en el bus y estado desactualizado en la pantalla.

**Al terminar tendremos:** la casa funcionando de forma confiable y la bitácora de fallos del grupo al día.

## Materiales del equipo

- Casa integrada, multímetro
- Resistencias de 4,7 kΩ (pull-up), capacitores de 470 µF
- Matriz de pruebas del sábado 6

## Parte 1 · Método (10 min)

> **Síntoma → hipótesis → prueba → causa → solución → verificar.** Una sola cosa a la vez, y avisando a los demás equipos.

:::tabla id="g7-pendientes"
| Fallo del sábado 6 | Nodo | Hipótesis | Prueba |
| --- | --- | --- | --- |
| | | | |
| | | | |
:::

## Parte 2 · ¿Quién está en el bus? (20 min)

Carga en la central el ejemplo **I2C scanner** (Archivo → Ejemplos → Wire → i2c_scanner) y abre el monitor:

:::tabla id="g7-scanner"
| Dirección esperada | Dispositivo | ¿Aparece? |
| --- | --- | --- |
| 0x08 | Sala | |
| 0x09 | Cuarto | |
| 0x0A | Entrada | |
| 0x3C | OLED | |
:::

:::pregunta id="g7-p1"
¿Qué pasa si dos nodos tienen la misma dirección? ¿Cómo lo detecta el scanner?
:::

## Parte 3 · Caídas de voltaje (30 min)

:::tabla id="g7-voltaje"
| Situación | 12 V en la bornera | 12 V en el nodo más lejano | 5 V en la central | 5 V en el nodo más lejano |
| --- | --- | --- | --- | --- |
| Todo apagado | | | | |
| Ventilador arrancando | | | | |
| Solenoide activándose | | | | |
| Todo encendido | | | | |
:::

:::animacion tipo="caida-voltaje" sistema="casa"
:::

Soluciones (prueba de a una):

1. Cable **más grueso** y más corto para los 12 V.
2. **Capacitor de 470 µF** cerca del ventilador y del solenoide.
3. Cada nodo toma su 5 V del LM2596 por un cable propio, no encadenado.

:::pregunta id="g7-p2"
¿Qué solución funcionó y cómo lo comprobaste con mediciones?
:::

## Parte 4 · Ruido en el bus (30 min)

El I2C fue diseñado para distancias cortas. Con cables largos y cargas que conmutan cerca, aparecen errores.

:::tabla id="g7-ruido"
| Síntoma | Causa probable | ¿Nos pasó? | Solución |
| --- | --- | --- | --- |
| Lecturas raras al encender el ventilador | Ruido del motor en el bus | | |
| Un nodo responde a veces sí y a veces no | Cable largo o mal contacto | | |
| La central se "congela" | El bus quedó bloqueado | | |
| Todo falla al conectar el 4.º nodo | Faltan o sobran pull-ups | | |
:::

Ideas: separar el cable del bus de los cables de 12 V, trenzar SDA con GND y SCL con GND, resistencias **pull-up de 4,7 kΩ** de SDA y SCL a 5 V (solo una vez en todo el bus), y en la central `Wire.setWireTimeout(3000, true);` para que no se congele.

## Parte 5 · Estado real en la pantalla (20 min)

Si un nodo no responde, la central debe mostrarlo en lugar de mostrar datos viejos:

```cpp
bool conectado[3] = {false, false, false};

// en leerNodos():
Wire.requestFrom(NODOS[i], (byte)2);
if (Wire.available() == 2) {
  estado[i][0] = Wire.read();
  estado[i][1] = Wire.read();
  conectado[i] = true;
} else {
  conectado[i] = false;
}

// en mostrar(): si !conectado[i], escribir "Sala: sin conexion"
```

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] El scanner encuentra los 4 dispositivos.
- [ ] Medimos y corregimos caídas de voltaje.
- [ ] Revisamos el ruido en el bus.
- [ ] La pantalla muestra "sin conexión" cuando falta un nodo.
:::

## Bitácora (5 min)

:::tabla id="g7-fallos"
| Síntoma | Causa | Solución | Equipo |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Muchos módulos (como la OLED) ya traen pull-ups; con varios en paralelo la resistencia equivalente baja. Normalmente con la OLED basta; agregar 4,7 kΩ solo si hay errores.
- `Wire.setWireTimeout` existe en las versiones recientes del núcleo de Arduino AVR; si no compila, actualizar el núcleo.
- g7-p1: los dos responden a la vez y los datos se mezclan; el scanner muestra una sola dirección y el sistema se comporta de forma errática.
- Tiempo total: 10 + 20 + 30 + 30 + 20 + 5 + 5 = 120 minutos.
:::
