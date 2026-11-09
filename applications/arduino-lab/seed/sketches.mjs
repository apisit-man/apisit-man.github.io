import {normalize} from './model.mjs';
// Original examples for supported lesson parameters, not a source interpreter.
// Physical build: verify component pinouts/supply ratings before using these sketches.
export function sketch(id,params={}){
 const p=normalize(id,params);
 const head='// Arduino Lab TH-EN | Uno R3 | generated guided example\n';
 const analog=(body,setup='')=>`void setup() { Serial.begin(9600); ${setup} }\nvoid loop() {\n${body}\n  delay(100);\n}\n`;
 const distance=`float readDistanceCm() {\n  digitalWrite(9, LOW); delayMicroseconds(2);\n  digitalWrite(9, HIGH); delayMicroseconds(10); digitalWrite(9, LOW);\n  unsigned long us = pulseIn(10, HIGH, ${id==='sensor'?p.timeoutUs:25000}UL);\n  return us == 0 ? -1.0 : us * 0.0343 / 2.0;\n}\n`;
 let code;
 switch(id){
 case 'board':code='void setup() { pinMode(LED_BUILTIN, OUTPUT); digitalWrite(LED_BUILTIN, HIGH); }\nvoid loop() {}\n';break;
 case 'blink':code=`void setup() { pinMode(13, OUTPUT); }\nvoid loop() {\n  digitalWrite(13, HIGH); delay(${p.onMs});\n  digitalWrite(13, LOW); delay(${p.offMs});\n}\n`;break;
 case 'button':code=`const unsigned long DEBOUNCE_MS = ${p.debounceMs};\nbool candidate = false, stable = false, led = false;\nunsigned long changedAt = 0;\nvoid setup() { pinMode(2, INPUT_PULLUP); pinMode(13, OUTPUT); }\nvoid loop() {\n  bool pressed = digitalRead(2) == LOW;\n  if (pressed != candidate) { candidate = pressed; changedAt = millis(); }\n  if (millis() - changedAt >= DEBOUNCE_MS && stable != candidate) {\n    stable = candidate;\n    ${p.mode==='toggle'?'if (stable) led = !led;':'led = stable;'}\n  }\n  digitalWrite(13, led ? HIGH : LOW);\n}\n`;break;
 case 'knob':code=analog('  int raw = analogRead(A0);\n  int pwm = map(raw, 0, 1023, 0, 255);\n  analogWrite(9, pwm); Serial.println(raw);','pinMode(9, OUTPUT);');break;
 case 'rgb':code=`void setup() { pinMode(9, OUTPUT); pinMode(10, OUTPUT); pinMode(11, OUTPUT); }\nvoid loop() {\n  analogWrite(9, ${p.r}); analogWrite(10, ${p.g}); analogWrite(11, ${p.b});\n}\n`;break;
 case 'light':code=analog(`  int raw = analogRead(A0);\n  digitalWrite(13, raw < ${p.threshold} ? HIGH : LOW);\n  Serial.println(raw);`,'pinMode(13, OUTPUT);');break;
 case 'sensor':code=distance+analog('  float cm = readDistanceCm();\n  if (cm < 0) Serial.println("NO_ECHO"); else Serial.println(cm, 1);','pinMode(9, OUTPUT); pinMode(10, INPUT);');break;
 case 'sound':code=`void setup() { tone(8, ${p.hz}, ${p.durationMs}); }\nvoid loop() {}\n`;break;
 case 'piano':code=`const byte KEYS[8] = {2,3,4,5,6,7,8,9};\nconst unsigned int NOTES[8] = {${[262,294,330,349,392,440,494,523].map(v=>v*(p.octave===5?2:1)).join(',')}};\nvoid setup() { for (byte i=0; i<8; i++) pinMode(KEYS[i], INPUT_PULLUP); }\nvoid loop() {\n  int key = -1;\n  for (byte i=0; i<8; i++) if (digitalRead(KEYS[i]) == LOW) { key=i; break; }\n  if (key < 0) noTone(10); else tone(10, NOTES[key]);\n}\n`;break;
 case 'motor':code=`// D5 drives a suitable driver; never connect the motor directly to D5.\nvoid setup() { pinMode(5, OUTPUT); analogWrite(5, ${p.pwm}); }\nvoid loop() {}\n`;break;
 case 'heat':code=analog('  int raw = analogRead(A0);\n  float volts = raw * (5.0 / 1023.0);\n  float degC = (volts - 0.5) * 100.0;\n  Serial.println(degC, 1);');break;
 case 'servo':code=`#include <Servo.h>\nServo arm;\nvoid setup() { arm.attach(9); arm.write(${p.angle}); }\nvoid loop() {}\n`;break;
 case 'stepper':code=`#include <Stepper.h>\nconst int STEPS_PER_REV = ${p.stepsPerRev};\nStepper wheel(STEPS_PER_REV, 8, 10, 9, 11);\nvoid setup() { wheel.setSpeed(${p.speedRpm}); }\nvoid loop() { wheel.step(${p.direction}); }\n`;break;
 case 'plant':code=`#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SSD1306.h>\nAdafruit_SSD1306 display(128, 64, &Wire, -1);\nbool oledOK = false;\nvoid setup() {\n  Serial.begin(9600);\n  oledOK = display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n}\nvoid loop() {\n  int raw = analogRead(A0);\n  int relative = constrain(map(raw, ${p.dryRaw}, ${p.wetRaw}, 0, 100), 0, 100);\n  Serial.println(relative);\n  if (oledOK) {\n    display.clearDisplay(); display.setTextColor(SSD1306_WHITE);\n    display.setTextSize(2); display.setCursor(0,0);\n    display.print(relative); display.println("% relative");\n    display.setTextSize(1);\n    display.println(relative < 30 ? "DRY" : relative > 80 ? "WET" : "OK");\n    display.display();\n  }\n  delay(200);\n}\n`;break;
 case 'force':code=`#include <Servo.h>\nServo needle;\nvoid setup() { Serial.begin(9600); needle.attach(9); }\nvoid loop() {\n  int raw = analogRead(A0);\n  needle.write(map(raw, 0, 1023, 0, 180));\n  if (raw >= ${p.threshold}) tone(8, 1568); else noTone(8);\n  Serial.println(raw); delay(50);\n}\n`;break;
 case 'project':code=distance+analog(`  float cm = readDistanceCm();\n  bool valid = cm >= 0;\n  digitalWrite(4, valid && cm <= ${p.nearCm});\n  digitalWrite(3, valid && cm > ${p.nearCm} && cm <= ${p.farCm});\n  digitalWrite(2, valid && cm > ${p.farCm});\n  if (!valid) Serial.println("NO_ECHO"); else Serial.println(cm, 1);`,'pinMode(9, OUTPUT); pinMode(10, INPUT);\n  pinMode(2, OUTPUT); pinMode(3, OUTPUT); pinMode(4, OUTPUT);');break;
 }
 return head+code;
}
