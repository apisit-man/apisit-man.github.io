import { normalize } from './model';

// Original examples for supported lesson parameters, not a source interpreter.
// Physical build: verify component pinouts/supply ratings before using these sketches.
export function sketch(id: string, params: Record<string, any> = {}): string {
  const p = normalize(id, params);
  const head = '// Arduino Lab TH-EN | Uno R3 | generated guided example\n// Author: Dr. Apisit Tongchai · apisit-man.github.io\n\n';
  const analog = (body: string, setup = '') =>
    `void setup() {\n  Serial.begin(9600);\n${setup ? '  ' + setup + '\n' : ''}}\n\nvoid loop() {\n${body}\n  delay(100);\n}\n`;
  const distance = `float readDistanceCm() {\n  digitalWrite(9, LOW); delayMicroseconds(2);\n  digitalWrite(9, HIGH); delayMicroseconds(10); digitalWrite(9, LOW);\n  unsigned long us = pulseIn(10, HIGH, ${
    id === 'sensor' ? p.timeoutUs : 25000
  }UL);\n  return us == 0 ? -1.0 : us * 0.0343 / 2.0;\n}\n\n`;

  let code = '';
  switch (id) {
    case 'board':
      code = 'void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n  digitalWrite(LED_BUILTIN, HIGH);\n}\n\nvoid loop() {}\n';
      break;
    case 'blink':
      code = `void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(${p.onMs});\n  digitalWrite(13, LOW);\n  delay(${p.offMs});\n}\n`;
      break;
    case 'button':
      code = `const unsigned long DEBOUNCE_MS = ${p.debounceMs};\nbool candidate = false, stable = false, led = false;\nunsigned long changedAt = 0;\n\nvoid setup() {\n  pinMode(2, INPUT_PULLUP);\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  bool pressed = digitalRead(2) == LOW;\n  if (pressed != candidate) { candidate = pressed; changedAt = millis(); }\n  if (millis() - changedAt >= DEBOUNCE_MS && stable != candidate) {\n    stable = candidate;\n    ${p.mode === 'toggle' ? 'if (stable) led = !led;' : 'led = stable;'}\n  }\n  digitalWrite(13, led ? HIGH : LOW);\n}\n`;
      break;
    case 'knob':
      code = analog(
        '  int raw = analogRead(A0);\n  int pwm = map(raw, 0, 1023, 0, 255);\n  analogWrite(9, pwm);\n  Serial.println(raw);',
        'pinMode(9, OUTPUT);'
      );
      break;
    case 'rgb':
      code = `void setup() {\n  pinMode(9, OUTPUT);\n  pinMode(10, OUTPUT);\n  pinMode(11, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(9, ${p.r});\n  analogWrite(10, ${p.g});\n  analogWrite(11, ${p.b});\n}\n`;
      break;
    case 'light':
      code = analog(
        `  int raw = analogRead(A0);\n  digitalWrite(13, raw < ${p.threshold} ? HIGH : LOW);\n  Serial.println(raw);`,
        'pinMode(13, OUTPUT);'
      );
      break;
    case 'sensor':
      code =
        distance +
        analog(
          '  float cm = readDistanceCm();\n  if (cm < 0) Serial.println("NO_ECHO");\n  else Serial.println(cm, 1);',
          'pinMode(9, OUTPUT);\n  pinMode(10, INPUT);'
        );
      break;
    case 'sound':
      code = `void setup() {\n  tone(8, ${p.hz}, ${p.durationMs});\n}\n\nvoid loop() {}\n`;
      break;
    case 'piano':
      code = `const byte KEYS[8] = {2,3,4,5,6,7,8,9};\nconst unsigned int NOTES[8] = {${[262, 294, 330, 349, 392, 440, 494, 523]
        .map((v) => v * (p.octave === 5 ? 2 : 1))
        .join(',')}};\n\nvoid setup() {\n  for (byte i=0; i<8; i++) pinMode(KEYS[i], INPUT_PULLUP);\n}\n\nvoid loop() {\n  int key = -1;\n  for (byte i=0; i<8; i++) {\n    if (digitalRead(KEYS[i]) == LOW) { key = i; break; }\n  }\n  if (key < 0) noTone(10);\n  else tone(10, NOTES[key]);\n}\n`;
      break;
    case 'motor':
      code = `// D5 drives a driver transistor/MOSFET; never connect the motor directly to D5.\nvoid setup() {\n  pinMode(5, OUTPUT);\n  analogWrite(5, ${p.pwm});\n}\n\nvoid loop() {}\n`;
      break;
    case 'heat':
      code = analog(
        '  int raw = analogRead(A0);\n  float volts = raw * (5.0 / 1023.0);\n  float degC = (volts - 0.5) * 100.0;\n  Serial.println(degC, 1);'
      );
      break;
    case 'servo':
      code = `#include <Servo.h>\nServo arm;\n\nvoid setup() {\n  arm.attach(9);\n  arm.write(${p.angle});\n}\n\nvoid loop() {}\n`;
      break;
    case 'stepper':
      code = `#include <Stepper.h>\nconst int STEPS_PER_REV = ${p.stepsPerRev};\nStepper wheel(STEPS_PER_REV, 8, 10, 9, 11);\n\nvoid setup() {\n  wheel.setSpeed(${p.speedRpm});\n}\n\nvoid loop() {\n  wheel.step(${p.direction});\n}\n`;
      break;
    case 'plant':
      code = `#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SSD1306.h>\n\nAdafruit_SSD1306 display(128, 64, &Wire, -1);\nbool oledOK = false;\n\nvoid setup() {\n  Serial.begin(9600);\n  oledOK = display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n}\n\nvoid loop() {\n  int raw = analogRead(A0);\n  int relative = constrain(map(raw, ${p.dryRaw}, ${p.wetRaw}, 0, 100), 0, 100);\n  Serial.println(relative);\n  if (oledOK) {\n    display.clearDisplay();\n    display.setTextColor(SSD1306_WHITE);\n    display.setTextSize(2);\n    display.setCursor(0,0);\n    display.print(relative);\n    display.println("% relative");\n    display.setTextSize(1);\n    display.println(relative < 30 ? "DRY" : relative > 80 ? "WET" : "OK");\n    display.display();\n  }\n  delay(200);\n}\n`;
      break;
    case 'force':
      code = `#include <Servo.h>\nServo needle;\n\nvoid setup() {\n  Serial.begin(9600);\n  needle.attach(9);\n}\n\nvoid loop() {\n  int raw = analogRead(A0);\n  needle.write(map(raw, 0, 1023, 0, 180));\n  if (raw >= ${p.threshold}) tone(8, 1568);\n  else noTone(8);\n  Serial.println(raw);\n  delay(50);\n}\n`;
      break;
    case 'project':
      code =
        distance +
        analog(
          `  float cm = readDistanceCm();\n  bool valid = cm >= 0;\n  digitalWrite(4, valid && cm <= ${p.nearCm});\n  digitalWrite(3, valid && cm > ${p.nearCm} && cm <= ${p.farCm});\n  digitalWrite(2, valid && cm > ${p.farCm});\n  if (!valid) Serial.println("NO_ECHO");\n  else Serial.println(cm, 1);`,
          'pinMode(9, OUTPUT);\n  pinMode(10, INPUT);\n  pinMode(2, OUTPUT);\n  pinMode(3, OUTPUT);\n  pinMode(4, OUTPUT);'
        );
      break;
  }
  return head + code;
}
