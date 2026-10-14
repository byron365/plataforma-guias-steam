// ============================================================
// Animación "conexiones": diagrama de cables entre el Arduino UNO
// y los componentes. Al pasar el dedo o el mouse sobre un cable
// se ve a qué pin va.
//
// Los cables se escriben como una tabla dentro del bloque:
//
//   :::animacion tipo="conexiones"
//   | Desde | Hasta | Color | Nota |
//   | --- | --- | --- | --- |
//   | Servo pinza: señal | D9 | naranja | Pin con ~ (PWM) |
//   | Servo pinza: + | 5V | rojo | |
//   | Servo pinza: − | GND | café | |
//   :::
//
// - Los extremos del Arduino se escriben solo con el pin: D9, A0, 5V, GND, VIN, 3.3V...
// - Los de un componente, como "Componente: terminal".
// - Colores: rojo, negro, café, naranja, amarillo, azul, verde, blanco, morado, gris.
//
// También hay circuitos listos, con los pines de las guías y de garra_robotica.ino:
//   circuito="servo"            un servo al Arduino (guía 1)
//   circuito="servo-perilla"    servo + potenciómetro (guía 1)
//   circuito="garra-completa"   4 servos con pilas + 4 perillas + GND común (guía 5)
//   circuito="garra-servos"     solo servos + portapilas + GND común
//   circuito="garra-control"    perillas + botón
//   circuito="garra"            todo, con el botón (guía 7)
//   circuito="semaforo"         3 LEDs en D2, D3, D4 (puente levadizo, guía 1)
//   circuito="puente-boton"     semáforo, buzzer, botón y dos servos (puente levadizo, guía 5)
//   circuito="dispensador-basico"  servo D9, botón D2, LED D4 (dispensador, guía 1)
//   circuito="dispensador"      lo anterior + buzzer D5 (dispensador, guía 5)
//   circuito="estacion"         DHT22, módulo de luz, OLED y LED RGB (estación, guía 3 en Wokwi)
//   circuito="estacion-real"    lo mismo con la LDR y su resistencia de 10 kΩ (estación, guías 4 y 5)
//   circuito="laberinto"        joystick, 2 servos, botón de meta, OLED y buzzer (laberinto, guía 3 en Wokwi)
//   circuito="laberinto-real"   servos con pilas y GND común, sensor IR en la meta (laberinto, guías 4 y 6)
//   circuito="futbol"           botones de inicio y de las porterías, OLED y buzzer (mini fútbol, guía 3 en Wokwi)
//   circuito="futbol-real"      sensores IR en las porterías (mini fútbol, guía 5)
//   circuito="banda-potencia"   MOSFET, motor, diodo, perilla y sensor IR (banda clasificadora, guía 4)
//   circuito="casa-nodos"       un botón por nodo: sala, cuarto, entrada y central (casa inteligente, guía 4)
//   circuito="elevador-central" puente H, reed, finales de carrera, paro y bus I2C (elevador, guía 4)
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

// ---------- Circuitos listos (pines de garra_robotica.ino) ----------
const SERVOS_GARRA = [['base', 3], ['hombro', 5], ['codo', 6], ['pinza', 9]];
const PERILLAS_GARRA = [['base', 'A0'], ['hombro', 'A1'], ['codo', 'A2'], ['pinza', 'A3']];
const CIRCUITOS = {
  'garra-servos': [
    ...SERVOS_GARRA.flatMap(([n, pin]) => [
      [`Servo ${n}: señal`, `D${pin}`, 'naranja', `Pin ~${pin} (PWM)`],
      [`Servo ${n}: +`, 'Portapilas: +', 'rojo', 'Energía de las pilas'],
      [`Servo ${n}: −`, 'Portapilas: −', 'café', 'Tierra de las pilas'],
    ]),
    ['Portapilas: −', 'GND', 'negro', 'GND común: une la tierra de las pilas con la del Arduino'],
  ],
  'garra-control': [
    ...PERILLAS_GARRA.flatMap(([n, pin]) => [
      [`Perilla ${n}: extremo`, '5V', 'rojo', ''],
      [`Perilla ${n}: centro`, pin, 'amarillo', `Entrada analógica ${pin}`],
      [`Perilla ${n}: extremo 2`, 'GND', 'negro', ''],
    ]),
    ['Botón: pata 1', 'D2', 'verde', 'Entrada con INPUT_PULLUP'],
    ['Botón: pata 2', 'GND', 'negro', ''],
  ],
};
CIRCUITOS.garra = [...CIRCUITOS['garra-servos'], ...CIRCUITOS['garra-control']];

// Guía 1, Parte 4: un servo conectado directo al Arduino
CIRCUITOS.servo = [
  ['Servo: cable café', 'GND', 'café', 'Tierra (negativo)'],
  ['Servo: cable rojo', '5V', 'rojo', 'Energía'],
  ['Servo: cable naranja', 'D9', 'naranja', 'Señal: le dice a qué ángulo ir'],
];
// Guía 1, Parte 5: servo + potenciómetro
CIRCUITOS['servo-perilla'] = [
  ...CIRCUITOS.servo,
  ['Perilla: pata izquierda', '5V', 'rojo', 'Comparte el 5V con el servo (por la protoboard)'],
  ['Perilla: pata del centro', 'A0', 'amarillo', 'El voltaje cambia al girar la perilla'],
  ['Perilla: pata derecha', 'GND', 'negro', 'Comparte GND con el servo (por la protoboard)'],
];
// Puente levadizo · Guía 1: semáforo (pata larga → 220 Ω → pin; pata corta → GND)
const LEDS_SEMAFORO = [['verde', 'D2'], ['amarillo', 'D3'], ['rojo', 'D4']];
CIRCUITOS.semaforo = LEDS_SEMAFORO.flatMap(([color, pin]) => [
  [`LED ${color}: pata larga`, pin, color, 'Pasa por una resistencia de 220 Ω'],
  [`LED ${color}: pata corta`, 'GND', 'negro', 'Riel de GND de la protoboard'],
]);
// Puente levadizo · Guía 5: semáforo, buzzer, botón y los dos servos
CIRCUITOS['puente-boton'] = [
  ...CIRCUITOS.semaforo,
  ['Buzzer: +', 'D5', 'morado', 'Alarma: tone(BUZZER, 1000, 1500)'],
  ['Buzzer: −', 'GND', 'negro', ''],
  ['Botón: pata 1', 'D6', 'azul', 'Entrada con INPUT_PULLUP'],
  ['Botón: pata 2', 'GND', 'negro', ''],
  ['Servo izquierdo: naranja', 'D9', 'naranja', 'Señal: izq.write(a)'],
  ['Servo izquierdo: rojo', '5V', 'rojo', ''],
  ['Servo izquierdo: café', 'GND', 'café', ''],
  ['Servo derecho: naranja', 'D10', 'naranja', 'Señal: der.write(180 − a)'],
  ['Servo derecho: rojo', '5V', 'rojo', ''],
  ['Servo derecho: café', 'GND', 'café', ''],
];

// Dispensador · Guía 1: servo, botón y LED
CIRCUITOS['dispensador-basico'] = [
  ['Servo: naranja', 'D9', 'naranja', 'Señal: compuerta.write()'],
  ['Servo: rojo', '5V', 'rojo', ''],
  ['Servo: café', 'GND', 'café', ''],
  ['Botón: pata 1', 'D2', 'azul', 'Entrada con INPUT_PULLUP'],
  ['Botón: pata 2', 'GND', 'negro', ''],
  ['LED: pata larga', 'D4', 'verde', 'Pasa por una resistencia de 220 Ω'],
  ['LED: pata corta', 'GND', 'negro', ''],
];
// Dispensador · Guía 5: lo anterior + buzzer
CIRCUITOS.dispensador = [
  ...CIRCUITOS['dispensador-basico'],
  ['Buzzer: +', 'D5', 'morado', 'Llamar a la mascota: tone(BUZZER, 1500, 300)'],
  ['Buzzer: −', 'GND', 'negro', ''],
];

// Estación meteorológica: pantalla OLED y LED RGB (iguales en Wokwi y en la protoboard)
const OLED_Y_RGB = [
  ['OLED: VCC', '5V', 'rojo', ''],
  ['OLED: GND', 'GND', 'negro', ''],
  ['OLED: SDA', 'A4', 'azul', 'I2C: datos'],
  ['OLED: SCL', 'A5', 'amarillo', 'I2C: reloj'],
  ['LED RGB: R', 'D9', 'rojo', 'Pasa por una resistencia de 220 Ω'],
  ['LED RGB: G', 'D10', 'verde', 'Pasa por una resistencia de 220 Ω'],
  ['LED RGB: B', 'D11', 'azul', 'Pasa por una resistencia de 220 Ω'],
  ['LED RGB: común (pata larga)', 'GND', 'negro', 'Cátodo común'],
];
// Estación · Guía 3 (Wokwi): DHT22, módulo de luz, OLED y LED RGB
CIRCUITOS.estacion = [
  ['DHT22: VCC', '5V', 'rojo', ''],
  ['DHT22: SDA', 'D2', 'blanco', 'Datos del sensor: DHT dht(2, DHT22)'],
  ['DHT22: GND', 'GND', 'negro', ''],
  ['Sensor de luz: VCC', '5V', 'rojo', ''],
  ['Sensor de luz: GND', 'GND', 'negro', ''],
  ['Sensor de luz: AO', 'A0', 'naranja', 'analogRead(PIN_LUZ)'],
  ...OLED_Y_RGB,
];
// Estación · Guías 4 y 5 (protoboard): la LDR con su resistencia de 10 kΩ en lugar del módulo
CIRCUITOS['estacion-real'] = [
  ['DHT22: VCC', '5V', 'rojo', ''],
  ['DHT22: DATA', 'D2', 'blanco', 'Datos del sensor'],
  ['DHT22: GND', 'GND', 'negro', ''],
  ['LDR: pata 1', '5V', 'rojo', ''],
  ['LDR: pata 2', 'A0', 'naranja', 'Divisor de voltaje: el punto del medio va a A0'],
  ['Resistencia 10 kΩ: pata 1', 'A0', 'naranja', 'Entre A0 y GND'],
  ['Resistencia 10 kΩ: pata 2', 'GND', 'negro', ''],
  ...OLED_Y_RGB,
];

// Laberinto: OLED y buzzer (iguales en Wokwi y en la protoboard)
const OLED_Y_BUZZER = [
  ['OLED: VCC', '5V', 'rojo', ''],
  ['OLED: GND', 'GND', 'negro', ''],
  ['OLED: SDA', 'A4', 'azul', 'I2C: datos'],
  ['OLED: SCL', 'A5', 'amarillo', 'I2C: reloj'],
  ['Buzzer: +', 'D5', 'morado', 'tone(BUZZER, …)'],
  ['Buzzer: −', 'GND', 'negro', ''],
];
// Laberinto · Guía 3 (Wokwi): servos al 5V del Arduino y un botón que hace de sensor de meta
CIRCUITOS.laberinto = [
  ['Joystick: VCC', '5V', 'rojo', ''],
  ['Joystick: HORZ', 'A0', 'verde', 'Eje X: analogRead(JOY_X)'],
  ['Joystick: VERT', 'A1', 'amarillo', 'Eje Y: analogRead(JOY_Y)'],
  ['Joystick: SEL', 'D2', 'azul', 'Botón del joystick (INPUT_PULLUP)'],
  ['Joystick: GND', 'GND', 'negro', ''],
  ['Servo X: PWM', 'D9', 'naranja', 'servoX.attach(9)'],
  ['Servo X: V+', '5V', 'rojo', ''],
  ['Servo X: GND', 'GND', 'café', ''],
  ['Servo Y: PWM', 'D10', 'naranja', 'servoY.attach(10)'],
  ['Servo Y: V+', '5V', 'rojo', ''],
  ['Servo Y: GND', 'GND', 'café', ''],
  ['Botón de meta: pata 1', 'D3', 'blanco', 'En Wokwi simula el sensor IR: da LOW al presionarlo'],
  ['Botón de meta: pata 2', 'GND', 'negro', ''],
  ...OLED_Y_BUZZER,
];
// Laberinto · Guías 4 y 6 (protoboard): servos con pilas y GND común, sensor IR en la meta
CIRCUITOS['laberinto-real'] = [
  ['Joystick: +5V', '5V', 'rojo', ''],
  ['Joystick: VRx', 'A0', 'verde', 'Eje X'],
  ['Joystick: VRy', 'A1', 'amarillo', 'Eje Y'],
  ['Joystick: SW', 'D2', 'azul', 'Botón del joystick'],
  ['Joystick: GND', 'GND', 'negro', ''],
  ['Servo X: naranja', 'D9', 'naranja', 'Señal'],
  ['Servo X: rojo', 'Portapilas: +', 'rojo', 'Energía de las pilas'],
  ['Servo X: café', 'Portapilas: −', 'café', ''],
  ['Servo Y: naranja', 'D10', 'naranja', 'Señal'],
  ['Servo Y: rojo', 'Portapilas: +', 'rojo', 'Energía de las pilas'],
  ['Servo Y: café', 'Portapilas: −', 'café', ''],
  ['Portapilas: −', 'GND', 'negro', 'GND común: une la tierra de las pilas con la del Arduino'],
  ['Sensor IR: VCC', '5V', 'rojo', ''],
  ['Sensor IR: GND', 'GND', 'negro', ''],
  ['Sensor IR: OUT', 'D3', 'blanco', 'Da LOW cuando ve la canica (pinMode INPUT)'],
  ...OLED_Y_BUZZER,
];

// Mini fútbol · Guía 3 (Wokwi): botones que hacen de sensores (dan LOW al "detectar")
CIRCUITOS.futbol = [
  ['Botón de inicio: pata 1', 'D2', 'verde', 'INPUT_PULLUP'],
  ['Botón de inicio: pata 2', 'GND', 'negro', ''],
  ['Botón "sensor portería azul": pata 1', 'D3', 'azul', 'SENSOR_AZUL'],
  ['Botón "sensor portería azul": pata 2', 'GND', 'negro', ''],
  ['Botón "sensor portería roja": pata 1', 'D4', 'rojo', 'SENSOR_ROJO'],
  ['Botón "sensor portería roja": pata 2', 'GND', 'negro', ''],
  ...OLED_Y_BUZZER,
];
// Mini fútbol · Guía 5 (cancha real): sensores infrarrojos en las porterías
CIRCUITOS['futbol-real'] = [
  ['Sensor portería azul: VCC', '5V', 'rojo', ''],
  ['Sensor portería azul: GND', 'GND', 'negro', ''],
  ['Sensor portería azul: OUT', 'D3', 'azul', 'Da LOW cuando ve la pelota'],
  ['Sensor portería roja: VCC', '5V', 'rojo', ''],
  ['Sensor portería roja: GND', 'GND', 'negro', ''],
  ['Sensor portería roja: OUT', 'D4', 'naranja', 'Da LOW cuando ve la pelota'],
  ['Botón de inicio: pata 1', 'D2', 'verde', 'INPUT_PULLUP'],
  ['Botón de inicio: pata 2', 'GND', 'negro', ''],
  ...OLED_Y_BUZZER,
];

// Banda clasificadora · Guía 4: etapa de potencia del nodo banda, perilla y sensor IR
CIRCUITOS['banda-potencia'] = [
  ['MOSFET: gate', 'D9', 'azul', 'Pasa por una resistencia de 220 Ω'],
  ['MOSFET: gate (10 kΩ)', 'GND', 'negro', 'Resistencia de 10 kΩ entre el gate y GND'],
  ['MOSFET: source', 'GND', 'negro', 'GND común con la fuente de 12 V'],
  ['MOSFET: drain', 'Motor: −', 'naranja', ''],
  ['Motor: +', 'Fuente 12 V: +', 'rojo', 'Los 12 V nunca tocan un pin del Arduino'],
  ['Diodo 1N4007: franja', 'Fuente 12 V: +', 'rojo', 'En paralelo con el motor, franja hacia +12 V'],
  ['Diodo 1N4007: otra pata', 'Motor: −', 'gris', ''],
  ['Fuente 12 V: −', 'GND', 'negro', 'GND común entre el Arduino y la fuente'],
  ['Perilla: extremo', '5V', 'rojo', ''],
  ['Perilla: centro', 'A0', 'amarillo', 'Velocidad: analogRead(POT) / 4'],
  ['Perilla: extremo 2', 'GND', 'negro', ''],
  ['Sensor IR: VCC', '5V', 'rojo', ''],
  ['Sensor IR: GND', 'GND', 'negro', ''],
  ['Sensor IR: OUT', 'D2', 'blanco', 'Llegada de pieza (LOW = pieza)'],
];

// Casa inteligente · Guía 4: cada equipo arma un nodo (se elige con botones)
const BUS_CASA = [
  ['Bus I2C: SDA', 'A4', 'azul', 'Mismo bus para la central y los tres nodos'],
  ['Bus I2C: SCL', 'A5', 'amarillo', ''],
  ['Bus I2C: GND', 'GND', 'negro', 'GND común'],
];
const MOSFET_CASA = (carga) => [
  ['MOSFET: gate', 'D9', 'azul', 'Pasa por una resistencia de 220 Ω'],
  ['MOSFET: gate (10 kΩ)', 'GND', 'negro', 'Resistencia de 10 kΩ entre el gate y GND'],
  ['MOSFET: source', 'GND', 'negro', 'GND común'],
  ['MOSFET: drain', `${carga}: −`, 'naranja', ''],
  [`${carga}: +`, '12 V: +', 'rojo', 'Desde la bornera de distribución'],
];
CIRCUITOS['casa-nodos'] = {
  Sala: [
    ...MOSFET_CASA('Tira LED'),
    ['LDR: pata 1', '5V', 'rojo', '5 V → LDR → A0 → 10 kΩ → GND'],
    ['LDR: pata 2', 'A0', 'naranja', ''],
    ['Resistencia 10 kΩ: pata 1', 'A0', 'naranja', ''],
    ['Resistencia 10 kΩ: pata 2', 'GND', 'negro', ''],
    ...BUS_CASA,
  ],
  Cuarto: [
    ...MOSFET_CASA('Ventilador'),
    ['Diodo 1N4007: franja', '12 V: +', 'rojo', 'En paralelo con el ventilador, franja hacia +12 V'],
    ['Diodo 1N4007: otra pata', 'Ventilador: −', 'gris', ''],
    ['DHT11: VCC', '5V', 'rojo', ''],
    ['DHT11: DATA', 'D2', 'blanco', 'DHT dht(2, DHT11)'],
    ['DHT11: GND', 'GND', 'negro', ''],
    ...BUS_CASA,
  ],
  Entrada: [
    ['Relé: IN', 'D7', 'azul', 'RELE = 7'],
    ['Relé: VCC', '5V', 'rojo', ''],
    ['Relé: GND', 'GND', 'negro', ''],
    ['Relé: COM', '12 V: +', 'rojo', 'Lado de 12 V (aislado de la lógica)'],
    ['Relé: NO', 'Solenoide: +', 'rojo', ''],
    ['Solenoide: −', '12 V: −', 'negro', 'Con diodo 1N4007 en paralelo (franja a +)'],
    ['PIR: VCC', '5V', 'rojo', ''],
    ['PIR: OUT', 'D2', 'verde', 'PIR = 2'],
    ['PIR: GND', 'GND', 'negro', ''],
    ['Buzzer: +', 'D5', 'morado', 'BUZZER = 5'],
    ['Buzzer: −', 'GND', 'negro', ''],
    ...BUS_CASA,
  ],
  Central: [
    ['HC-05: VCC', '5V', 'rojo', ''],
    ['HC-05: GND', 'GND', 'negro', ''],
    ['HC-05: TXD', 'D10', 'verde', 'SoftwareSerial bt(10, 11)'],
    ['HC-05: RXD', 'D11', 'azul', 'Con divisor de voltaje 1 kΩ / 2 kΩ'],
    ['OLED: VCC', '5V', 'rojo', ''],
    ['OLED: GND', 'GND', 'negro', ''],
    ['OLED: SDA', 'A4', 'azul', 'Mismo bus que los nodos (0x3C)'],
    ['OLED: SCL', 'A5', 'amarillo', ''],
    ...BUS_CASA,
  ],
};

// Elevador · Guía 4: la central (puente H, sensores de piso, finales de carrera, paro y bus I2C)
CIRCUITOS['elevador-central'] = [
  ['L298N: ENA', 'D5', 'azul', 'PWM (quita el jumper de ENA)'],
  ['L298N: IN1', 'D7', 'verde', 'Sentido'],
  ['L298N: IN2', 'D8', 'amarillo', 'Sentido'],
  ['L298N: OUT1', 'Motor: +', 'naranja', ''],
  ['L298N: OUT2', 'Motor: −', 'naranja', ''],
  ['L298N: +12V', 'Fuente 12 V: +', 'rojo', 'Con fusible'],
  ['L298N: GND', 'GND', 'negro', 'GND común con la fuente y el Arduino'],
  ['Fuente 12 V: −', 'GND', 'negro', 'GND común'],
  ['Reed piso 1: pata 1', 'D2', 'blanco', 'INPUT_PULLUP: LOW = cabina en el piso'],
  ['Reed piso 1: pata 2', 'GND', 'negro', ''],
  ['Reed piso 2: pata 1', 'D3', 'blanco', ''],
  ['Reed piso 2: pata 2', 'GND', 'negro', ''],
  ['Reed piso 3: pata 1', 'D4', 'blanco', ''],
  ['Reed piso 3: pata 2', 'GND', 'negro', ''],
  ['Final de carrera abajo: pata 1', 'A0', 'morado', 'Un poco debajo del piso 1'],
  ['Final de carrera abajo: pata 2', 'GND', 'negro', ''],
  ['Final de carrera arriba: pata 1', 'A1', 'morado', 'Un poco arriba del piso 3'],
  ['Final de carrera arriba: pata 2', 'GND', 'negro', ''],
  ['Paro de emergencia: pata 1', 'A2', 'rojo', 'Botón tipo hongo'],
  ['Paro de emergencia: pata 2', 'GND', 'negro', ''],
  ['Bus I2C: SDA', 'A4', 'azul', 'Hacia los nodos de piso'],
  ['Bus I2C: SCL', 'A5', 'amarillo', ''],
  ['Bus I2C: GND', 'GND', 'negro', ''],
];

// Guía 5: los 4 servos con pilas, las 4 perillas con el Arduino y GND común (sin botón todavía)
CIRCUITOS['garra-completa'] = [
  ...CIRCUITOS['garra-servos'],
  ...CIRCUITOS['garra-control'].filter(([desde]) => !desde.startsWith('Botón')),
];

const COLORES = {
  rojo: '#DC2626', negro: '#1F2937', cafe: '#7C4A1E', naranja: '#F97316', amarillo: '#EAB308',
  azul: '#2563EB', verde: '#16A34A', blanco: '#F8FAFC', morado: '#9333EA', gris: '#6B7280',
};

// ---------- Pines del Arduino UNO (en el orden real de la placa) ----------
const PLACA = { x: 20, ancho: 340, alto: 220 };
const PINES_ARRIBA = ['SCL', 'SDA', 'AREF', 'GND', 'D13', 'D12', 'D11', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1', 'D0'];
const PINES_ABAJO = ['IOREF', 'RESET', '3.3V', '5V', 'GND', 'GND2', 'VIN', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];

const quitarTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// "9", "D9", "~9", "pin 9", "Arduino: 9" → "D9";  "a0" → "A0";  "gnd" → "GND"
function pinArduino(texto) {
  let t = String(texto).trim().replace(/^arduino\s*[:·-]?\s*/i, '').replace(/^pin\s*/i, '').replace(/^~/, '').toUpperCase();
  if (/^\d{1,2}$/.test(t)) t = `D${t}`;
  if (t === '3V3' || t === '3,3V') t = '3.3V';
  return [...PINES_ARRIBA, ...PINES_ABAJO, 'GND'].includes(t) ? t : null;
}

function colorDe(nombre, desde, hasta) {
  const n = quitarTildes(nombre || '');
  if (COLORES[n]) return COLORES[n];
  if (/^#[0-9a-f]{3,6}$/i.test(nombre || '')) return nombre;
  const extremos = `${desde} ${hasta}`;
  if (/gnd|−|-/i.test(extremos)) return COLORES.negro;
  if (/5v|vin|\+/i.test(extremos)) return COLORES.rojo;
  return COLORES.azul;
}

let contador = 0;

export default function montar(contenedor, config) {
  // Un circuito con varias partes (por ejemplo, un nodo por equipo): botones para elegir cuál ver
  const partes = CIRCUITOS[config.circuito];
  if (partes && !Array.isArray(partes)) {
    const nombres = Object.keys(partes);
    const caja = el('div', {});
    const botones = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Parte del circuito' });
    const elegir = (n) => {
      botones.querySelectorAll('button').forEach((b) => { const a = b.dataset.parte === n; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
      caja.replaceChildren();
      montar(caja, { ...config, circuito: undefined, filasListas: partes[n] });
    };
    nombres.forEach((n) => botones.append(el('button', { type: 'button', class: 'anim-boton', 'data-parte': n, onclick: () => elegir(n) }, n)));
    contenedor.append(botones, caja);
    elegir(nombres[0]);
    return;
  }
  // ---------- Leer los cables ----------
  let filas = [];
  if (config.tabla && config.tabla.filas.length) {
    const enc = config.tabla.encabezados.map(quitarTildes);
    const col = (patron, porDefecto) => { const i = enc.findIndex((e) => patron.test(e)); return i >= 0 ? i : porDefecto; };
    const cDesde = col(/desde|origen|componente/, 0);
    const cHasta = col(/hasta|destino|pin|arduino/, 1);
    const cColor = col(/color/, 2);
    const cNota = col(/nota|para que|uso|descripcion/, 3);
    filas = config.tabla.filas.map((f) => [f[cDesde], f[cHasta], f[cColor], f[cNota]]);
  } else if (config.filasListas) {
    filas = config.filasListas;
  } else if (CIRCUITOS[config.circuito]) {
    filas = CIRCUITOS[config.circuito];
  }
  filas = filas.filter((f) => f[0] && f[1]);
  if (filas.length === 0) {
    contenedor.append(el('p', { class: 'animacion-cargando' }, 'Este diagrama no tiene cables. Agrega una tabla Desde | Hasta | Color o un circuito="garra".'));
    return;
  }

  // Componentes y sus terminales, en orden de aparición
  const componentes = new Map();
  const extremo = (texto) => {
    const pin = pinArduino(texto);
    if (pin) return { tipo: 'pin', pin };
    const [nombre, terminal = ''] = String(texto).split(':').map((s) => s.trim());
    if (!componentes.has(nombre)) componentes.set(nombre, []);
    if (!componentes.get(nombre).includes(terminal)) componentes.get(nombre).push(terminal);
    return { tipo: 'componente', nombre, terminal };
  };
  let gndUsados = 0;
  const cables = filas.map(([desde, hasta, color, nota]) => {
    const a = extremo(desde); const b = extremo(hasta);
    // Los cables a GND se reparten entre los pines GND de la placa
    for (const e of [a, b]) if (e.tipo === 'pin' && e.pin === 'GND') e.pin = ['GND', 'GND2', 'GND'][gndUsados++ % 3];
    return { a, b, desde, hasta, color: colorDe(color, desde, hasta), nombreColor: color || '', nota: nota || '' };
  });

  // ---------- Medidas ----------
  const X_COMP = 560; const ANCHO_COMP = 200; const ALTO_TERM = 24; const CABEZA = 30; const SEP = 14;
  const posTerminal = new Map();
  let y = 20;
  const cajas = [];
  for (const [nombre, terminales] of componentes) {
    const alto = CABEZA + terminales.length * ALTO_TERM + 6;
    cajas.push({ nombre, terminales, y, alto });
    terminales.forEach((t, i) => posTerminal.set(`${nombre}:${t}`, { x: X_COMP, y: y + CABEZA + i * ALTO_TERM + ALTO_TERM / 2 }));
    y += alto + SEP;
  }
  const ALTO = Math.max(y + 10, PLACA.alto + 190);
  const placaY = Math.max(95, (ALTO - PLACA.alto) / 2);
  const yArriba = placaY + 14; const yAbajo = placaY + PLACA.alto - 14;
  const posPin = new Map();
  PINES_ARRIBA.forEach((p, i) => posPin.set(p, { x: PLACA.x + 64 + i * 15 + (i >= 10 ? 10 : 0), y: yArriba, lado: -1 }));
  PINES_ABAJO.forEach((p, i) => posPin.set(p, { x: PLACA.x + 118 + i * 15 + (i >= 7 ? 12 : 0), y: yAbajo, lado: 1 }));
  const punto = (e) => (e.tipo === 'pin' ? posPin.get(e.pin) : posTerminal.get(`${e.nombre}:${e.terminal}`));

  // ---------- Dibujo ----------
  const raiz = svg('svg', { viewBox: `0 0 800 ${ALTO}`, class: 'conexiones-svg', role: 'img', 'aria-label': 'Diagrama de conexiones con el Arduino UNO' });

  // Placa
  const placa = svg('g', { class: 'conexiones-placa' },
    svg('rect', { x: PLACA.x, y: placaY, width: PLACA.ancho, height: PLACA.alto, rx: 12, class: 'placa-arduino' }),
    svg('rect', { x: PLACA.x - 12, y: placaY + 40, width: 46, height: 40, rx: 4, class: 'placa-usb' }),
    svg('rect', { x: PLACA.x - 8, y: placaY + 150, width: 40, height: 36, rx: 4, class: 'placa-jack' }),
    svg('rect', { x: PLACA.x + 150, y: placaY + 80, width: 110, height: 44, rx: 4, class: 'placa-chip' }),
    svg('text', { x: PLACA.x + 205, y: placaY + 150, class: 'placa-texto', 'text-anchor': 'middle' }, 'Arduino UNO'),
  );
  raiz.append(placa);
  for (const [nombre, p] of posPin) {
    const etiqueta = nombre === 'GND2' ? 'GND' : nombre;
    placa.append(
      svg('rect', { x: p.x - 5, y: p.y - 5, width: 10, height: 10, rx: 1, class: 'pin-hueco', 'data-pin': nombre }),
      svg('text', { x: p.x, y: p.y + (p.lado < 0 ? 12 : -10), class: 'pin-nombre', 'text-anchor': 'end', transform: `rotate(-90 ${p.x} ${p.y + (p.lado < 0 ? 12 : -10)})`, dx: p.lado < 0 ? -0 : 0, dy: 3 }, etiqueta),
    );
  }
  // Las etiquetas de abajo se leen hacia arriba: se ajusta el anclaje
  placa.querySelectorAll('text.pin-nombre').forEach((t) => {
    const y0 = Number(t.getAttribute('y'));
    if (y0 > yAbajo - 20) t.setAttribute('text-anchor', 'start');
  });

  // Componentes
  for (const caja of cajas) {
    const g = svg('g', { class: 'conexiones-componente' },
      svg('rect', { x: X_COMP, y: caja.y, width: ANCHO_COMP, height: caja.alto, rx: 10 }),
      svg('text', { x: X_COMP + 14, y: caja.y + 20, class: 'componente-nombre' }, caja.nombre));
    caja.terminales.forEach((t, i) => {
      const p = posTerminal.get(`${caja.nombre}:${t}`);
      g.append(svg('circle', { cx: p.x, cy: p.y, r: 5, class: 'terminal' }),
        svg('text', { x: p.x + 14, y: p.y + 4, class: 'componente-terminal' }, t || '•'));
    });
    raiz.append(g);
  }

  // Cables
  const capaCables = svg('g', { class: 'conexiones-cables' });
  raiz.append(capaCables);
  let carril = 0;
  cables.forEach((c, i) => {
    const p = punto(c.a); const q = punto(c.b);
    let d;
    if (c.a.tipo === 'componente' && c.b.tipo === 'componente') {
      const x = X_COMP - 30 - (carril++ % 6) * 12; // entre componentes: un lazo por la izquierda
      d = `M ${p.x} ${p.y} C ${x} ${p.y}, ${x} ${q.y}, ${q.x} ${q.y}`;
    } else {
      const [comp, pin] = c.a.tipo === 'pin' ? [q, p] : [p, q];
      const curva = pin.lado * (70 + (i % 5) * 14);
      d = `M ${comp.x} ${comp.y} C ${comp.x - 150} ${comp.y}, ${pin.x} ${pin.y + curva}, ${pin.x} ${pin.y}`;
    }
    const g = svg('g', { class: 'cable', tabindex: '-1', 'data-indice': i });
    g.append(
      svg('path', { d, class: 'cable-contorno' }),
      svg('path', { d, class: 'cable-color', stroke: c.color }),
      svg('path', { d, class: 'cable-zona' }), // zona invisible más ancha para tocar con el dedo
    );
    capaCables.append(g);
    c.grupo = g;
  });

  // ---------- Información e interacción ----------
  const info = el('div', { class: 'conexiones-info', 'aria-live': 'polite' });
  const lista = el('div', { class: 'conexiones-lista' });
  const idLista = `lista-cables-${++contador}`;
  contenedor.append(el('div', { class: 'anim-conexiones' },
    el('div', { class: 'conexiones-dibujo' }, raiz), info,
    el('details', { class: 'conexiones-detalles' }, el('summary', { id: idLista }, `Ver la lista de cables (${cables.length})`), lista)));

  const nombreExtremo = (e) => (e.tipo === 'pin' ? `Arduino ${e.pin === 'GND2' ? 'GND' : e.pin}` : `${e.nombre}${e.terminal ? ` (${e.terminal})` : ''}`);
  const textoCable = (c) => `${nombreExtremo(c.a)} → ${nombreExtremo(c.b)}`;

  function seleccionar(indices, titulo) {
    const activos = new Set(indices);
    raiz.classList.toggle('con-seleccion', activos.size > 0);
    cables.forEach((c, i) => c.grupo.classList.toggle('activo', activos.has(i)));
    if (activos.size === 0) {
      info.replaceChildren(el('span', { class: 'conexiones-ayuda' }, 'Pasa el dedo o el mouse sobre un cable para ver a qué pin va.'));
      return;
    }
    if (activos.size === 1) {
      const c = cables[indices[0]];
      info.replaceChildren(
        el('span', { class: 'conexiones-muestra', style: `background:${c.color}` }),
        el('strong', {}, textoCable(c)),
        c.nombreColor ? el('span', {}, ` · cable ${c.nombreColor}`) : null,
        c.nota ? el('span', { class: 'conexiones-nota' }, c.nota) : null);
    } else {
      info.replaceChildren(el('strong', {}, titulo), el('span', {}, ` · ${activos.size} cables`));
    }
  }

  cables.forEach((c, i) => {
    c.grupo.addEventListener('pointerenter', () => seleccionar([i]));
    c.grupo.addEventListener('click', (e) => { e.stopPropagation(); seleccionar([i]); });
    lista.append(el('button', { type: 'button', class: 'conexiones-boton', onclick: () => seleccionar([i]) },
      el('span', { class: 'conexiones-muestra', style: `background:${c.color}` }), textoCable(c)));
  });
  // Tocar un componente o un pin resalta todos sus cables
  raiz.querySelectorAll('.conexiones-componente').forEach((g, k) => {
    const nombre = cajas[k].nombre;
    const indices = cables.map((c, i) => ((c.a.nombre === nombre || c.b.nombre === nombre) ? i : -1)).filter((i) => i >= 0);
    g.addEventListener('pointerenter', () => seleccionar(indices, nombre));
    g.addEventListener('click', (e) => { e.stopPropagation(); seleccionar(indices, nombre); });
  });
  raiz.querySelectorAll('.pin-hueco').forEach((h) => {
    const pin = h.dataset.pin;
    const indices = cables.map((c, i) => ((c.a.pin === pin || c.b.pin === pin) ? i : -1)).filter((i) => i >= 0);
    if (!indices.length) return;
    h.classList.add('usado');
    h.addEventListener('pointerenter', () => seleccionar(indices, `Pin ${pin === 'GND2' ? 'GND' : pin}`));
  });
  raiz.addEventListener('click', () => seleccionar([]));
  raiz.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') seleccionar([]); });

  seleccionar([]);
}
