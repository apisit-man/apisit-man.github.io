(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`board`,`blink`,`button`,`knob`,`rgb`,`light`,`sensor`,`sound`,`piano`,`motor`,`heat`,`servo`,`stepper`,`plant`,`force`,`project`],t=(e,t,n)=>Math.min(n,Math.max(t,e)),n=(e,t)=>typeof e==`number`&&Number.isFinite(e)?e:t,r=(e,r,i,a)=>Math.round(t(n(e,r),i,a)),i=(e,r,i,a)=>t(n(e,r),i,a);Object.freeze({board:{},blink:{onMs:500,offMs:500},button:{mode:`hold`,debounceMs:30},knob:{},rgb:{r:128,g:64,b:0},light:{threshold:400},sensor:{timeoutUs:25e3},sound:{hz:440,durationMs:1e3},piano:{octave:4},motor:{pwm:128},heat:{},servo:{angle:90},stepper:{stepsPerRev:2048,speedRpm:10,direction:1},plant:{dryRaw:800,wetRaw:350},force:{threshold:700},project:{nearCm:15,farCm:40}});function a(t,n={}){if(!e.includes(t))throw Error(`Unknown lesson: `+t);let i=n&&typeof n==`object`?n:{};switch(t){case`blink`:return{onMs:r(i.onMs,500,50,3e3),offMs:r(i.offMs,500,50,3e3)};case`button`:return{mode:i.mode===`toggle`?`toggle`:`hold`,debounceMs:r(i.debounceMs,30,10,100)};case`rgb`:return{r:r(i.r,128,0,255),g:r(i.g,64,0,255),b:r(i.b,0,0,255)};case`light`:return{threshold:r(i.threshold,400,0,1023)};case`sensor`:return{timeoutUs:r(i.timeoutUs,25e3,1e3,3e4)};case`sound`:return{hz:r(i.hz,440,100,2e3),durationMs:r(i.durationMs,1e3,100,3e3)};case`piano`:return{octave:i.octave===5?5:4};case`motor`:return{pwm:r(i.pwm,128,0,255)};case`servo`:return{angle:r(i.angle,90,0,180)};case`stepper`:return{stepsPerRev:r(i.stepsPerRev,2048,200,4096),speedRpm:r(i.speedRpm,10,1,15),direction:i.direction===-1?-1:1};case`plant`:{let e=r(i.wetRaw,350,0,973);return{wetRaw:e,dryRaw:r(i.dryRaw,800,e+50,1023)}}case`force`:return{threshold:r(i.threshold,700,1,1023)};case`project`:{let e=r(i.nearCm,15,2,100);return{nearCm:e,farCm:r(i.farCm,40,e+1,200)}}default:return{}}}function o(){return{timeMs:0,stablePressed:!1,candidatePressed:!1,candidateSinceMs:0,toggled:!1,steps:0}}function s(e,n=o(),s={},c={},l=0){let u=a(e,c),d=i(l,0,0,1e3),f={...n,timeMs:n.timeMs+d},p={};switch(e){case`board`:p={led:!0,pins:{D13:1}};break;case`blink`:{let e=f.timeMs%(u.onMs+u.offMs)<u.onMs;p={led:e,pins:{D13:+e},periodMs:u.onMs+u.offMs};break}case`button`:{let e=s.pressed===!0;e!==f.candidatePressed&&(f.candidatePressed=e,f.candidateSinceMs=f.timeMs),f.timeMs-f.candidateSinceMs>=u.debounceMs&&f.stablePressed!==f.candidatePressed&&(f.stablePressed=f.candidatePressed,f.stablePressed&&(f.toggled=!f.toggled));let t=u.mode===`toggle`?f.toggled:f.stablePressed;p={pressed:e,stablePressed:f.stablePressed,led:t,pins:{D2:+!e,D13:+t}};break}case`knob`:{let e=r(s.adc,512,0,1023),t=Math.trunc(e*255/1023);p={adc:e,pwm:t,duty:t/255,pins:{A0:e,D9:t}};break}case`rgb`:p={...u,hex:`#`+[u.r,u.g,u.b].map(e=>e.toString(16).padStart(2,`0`)).join(``),pins:{D9:u.r,D10:u.g,D11:u.b}};break;case`light`:{let e=r(s.lightAdc,600,0,1023),t=e<u.threshold;p={adc:e,led:t,pins:{A0:e,D13:+t}};break}case`sensor`:case`project`:{let t=s.distanceCm,n=t===null?null:i(t,30,2,400),r=n===null?0:Math.round(n*2/.0343),a=e===`sensor`?u.timeoutUs:25e3,o=n!==null&&r<a,c=o?r*.0343/2:null;if(p={distanceCm:c,echoUs:o?r:0,valid:o,pins:{D9:1,D10:+!!o}},e===`project`){let e=o?(c??0)<=u.nearCm?`red`:(c??0)<=u.farCm?`yellow`:`green`:`unknown`;p={...p,light:e,pins:{...p.pins,D4:+(e===`red`),D3:+(e===`yellow`),D2:+(e===`green`)}}}break}case`sound`:p={hz:f.timeMs<u.durationMs?u.hz:0,active:f.timeMs<u.durationMs,pins:{D8:+(f.timeMs<u.durationMs)}};break;case`piano`:{let e=Number.isInteger(s.key)&&s.key>=0&&s.key<8?s.key:null,t=[262,294,330,349,392,440,494,523],n=e===null?0:t[e]*(u.octave===5?2:1);p={key:e,hz:n,active:n>0,pins:{D10:+!!n,...Object.fromEntries(t.map((t,n)=>[`D`+(n+2),n===e?0:1]))}};break}case`motor`:p={pwm:u.pwm,duty:u.pwm/255,relativeSpeed:u.pwm/255,pins:{D5:u.pwm}};break;case`heat`:{let e=i(s.tempC,25,-40,125),t=r((.5+e/100)/5*1023,153,0,1023);p={environmentC:e,adc:t,voltage:t*5/1023,tempC:(t*5/1023-.5)*100,pins:{A0:t}};break}case`servo`:p={angle:u.angle,pins:{D9:u.angle},nominal:!0};break;case`stepper`:{f.steps+=d*u.speedRpm*u.stepsPerRev/6e4*u.direction;let e=Math.trunc(f.steps);p={steps:e,angle:(e%u.stepsPerRev+u.stepsPerRev)%u.stepsPerRev/u.stepsPerRev*360,phase:(e%4+4)%4,pins:{D8:0,D9:0,D10:0,D11:0}};let t=[[1,0,1,0],[0,1,1,0],[0,1,0,1],[1,0,0,1]][p.phase];[8,10,9,11].forEach((e,n)=>p.pins[`D`+e]=t[n]);break}case`plant`:{let e=r(s.moistureRaw,600,0,1023),n=t(Math.trunc((e-u.dryRaw)*100/(u.wetRaw-u.dryRaw)),0,100);p={adc:e,relativePercent:n,condition:n<30?`dry`:n>80?`wet`:`ok`,pins:{A0:e}};break}case`force`:{let e=r(s.fsrAdc,0,0,1023),t=e>=u.threshold;p={adc:e,angle:Math.trunc(e*180/1023),bell:t,hz:t?1568:0,pins:{A0:e,D9:Math.trunc(e*180/1023),D8:+t}};break}}return{state:f,params:u,output:p}}function c(e,t={}){let n=a(e,t),r=(e,t=``)=>`void setup() {\n  Serial.begin(9600);\n${t?`  `+t+`
`:``}}\n\nvoid loop() {\n${e}\n  delay(100);\n}\n`,i=`float readDistanceCm() {\n  digitalWrite(9, LOW); delayMicroseconds(2);\n  digitalWrite(9, HIGH); delayMicroseconds(10); digitalWrite(9, LOW);\n  unsigned long us = pulseIn(10, HIGH, ${e===`sensor`?n.timeoutUs:25e3}UL);\n  return us == 0 ? -1.0 : us * 0.0343 / 2.0;\n}\n\n`,o=``;switch(e){case`board`:o=`void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
}

void loop() {}
`;break;case`blink`:o=`void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(${n.onMs});\n  digitalWrite(13, LOW);\n  delay(${n.offMs});\n}\n`;break;case`button`:o=`const unsigned long DEBOUNCE_MS = ${n.debounceMs};\nbool candidate = false, stable = false, led = false;\nunsigned long changedAt = 0;\n\nvoid setup() {\n  pinMode(2, INPUT_PULLUP);\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  bool pressed = digitalRead(2) == LOW;\n  if (pressed != candidate) { candidate = pressed; changedAt = millis(); }\n  if (millis() - changedAt >= DEBOUNCE_MS && stable != candidate) {\n    stable = candidate;\n    ${n.mode===`toggle`?`if (stable) led = !led;`:`led = stable;`}\n  }\n  digitalWrite(13, led ? HIGH : LOW);\n}\n`;break;case`knob`:o=r(`  int raw = analogRead(A0);
  int pwm = map(raw, 0, 1023, 0, 255);
  analogWrite(9, pwm);
  Serial.println(raw);`,`pinMode(9, OUTPUT);`);break;case`rgb`:o=`void setup() {\n  pinMode(9, OUTPUT);\n  pinMode(10, OUTPUT);\n  pinMode(11, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(9, ${n.r});\n  analogWrite(10, ${n.g});\n  analogWrite(11, ${n.b});\n}\n`;break;case`light`:o=r(`  int raw = analogRead(A0);\n  digitalWrite(13, raw < ${n.threshold} ? HIGH : LOW);\n  Serial.println(raw);`,`pinMode(13, OUTPUT);`);break;case`sensor`:o=i+r(`  float cm = readDistanceCm();
  if (cm < 0) Serial.println("NO_ECHO");
  else Serial.println(cm, 1);`,`pinMode(9, OUTPUT);
  pinMode(10, INPUT);`);break;case`sound`:o=`void setup() {\n  tone(8, ${n.hz}, ${n.durationMs});\n}\n\nvoid loop() {}\n`;break;case`piano`:o=`const byte KEYS[8] = {2,3,4,5,6,7,8,9};\nconst unsigned int NOTES[8] = {${[262,294,330,349,392,440,494,523].map(e=>e*(n.octave===5?2:1)).join(`,`)}};\n\nvoid setup() {\n  for (byte i=0; i<8; i++) pinMode(KEYS[i], INPUT_PULLUP);\n}\n\nvoid loop() {\n  int key = -1;\n  for (byte i=0; i<8; i++) {\n    if (digitalRead(KEYS[i]) == LOW) { key = i; break; }\n  }\n  if (key < 0) noTone(10);\n  else tone(10, NOTES[key]);\n}\n`;break;case`motor`:o=`// D5 drives a driver transistor/MOSFET; never connect the motor directly to D5.\nvoid setup() {\n  pinMode(5, OUTPUT);\n  analogWrite(5, ${n.pwm});\n}\n\nvoid loop() {}\n`;break;case`heat`:o=r(`  int raw = analogRead(A0);
  float volts = raw * (5.0 / 1023.0);
  float degC = (volts - 0.5) * 100.0;
  Serial.println(degC, 1);`);break;case`servo`:o=`#include <Servo.h>\nServo arm;\n\nvoid setup() {\n  arm.attach(9);\n  arm.write(${n.angle});\n}\n\nvoid loop() {}\n`;break;case`stepper`:o=`#include <Stepper.h>\nconst int STEPS_PER_REV = ${n.stepsPerRev};\nStepper wheel(STEPS_PER_REV, 8, 10, 9, 11);\n\nvoid setup() {\n  wheel.setSpeed(${n.speedRpm});\n}\n\nvoid loop() {\n  wheel.step(${n.direction});\n}\n`;break;case`plant`:o=`#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SSD1306.h>\n\nAdafruit_SSD1306 display(128, 64, &Wire, -1);\nbool oledOK = false;\n\nvoid setup() {\n  Serial.begin(9600);\n  oledOK = display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n}\n\nvoid loop() {\n  int raw = analogRead(A0);\n  int relative = constrain(map(raw, ${n.dryRaw}, ${n.wetRaw}, 0, 100), 0, 100);\n  Serial.println(relative);\n  if (oledOK) {\n    display.clearDisplay();\n    display.setTextColor(SSD1306_WHITE);\n    display.setTextSize(2);\n    display.setCursor(0,0);\n    display.print(relative);\n    display.println("% relative");\n    display.setTextSize(1);\n    display.println(relative < 30 ? "DRY" : relative > 80 ? "WET" : "OK");\n    display.display();\n  }\n  delay(200);\n}\n`;break;case`force`:o=`#include <Servo.h>\nServo needle;\n\nvoid setup() {\n  Serial.begin(9600);\n  needle.attach(9);\n}\n\nvoid loop() {\n  int raw = analogRead(A0);\n  needle.write(map(raw, 0, 1023, 0, 180));\n  if (raw >= ${n.threshold}) tone(8, 1568);\n  else noTone(8);\n  Serial.println(raw);\n  delay(50);\n}\n`;break;case`project`:o=i+r(`  float cm = readDistanceCm();\n  bool valid = cm >= 0;\n  digitalWrite(4, valid && cm <= ${n.nearCm});\n  digitalWrite(3, valid && cm > ${n.nearCm} && cm <= ${n.farCm});\n  digitalWrite(2, valid && cm > ${n.farCm});\n  if (!valid) Serial.println("NO_ECHO");\n  else Serial.println(cm, 1);`,`pinMode(9, OUTPUT);
  pinMode(10, INPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);`)}return`// Arduino Lab TH-EN | Uno R3 | generated guided example
// Author: Dr. Apisit Tongchai · apisit-man.github.io

`+o}var l={schemaVersion:1,locales:[`th`,`en`],lessons:[{id:`board`,order:1,title:{th:`รู้จักบอร์ดและขาเชื่อมต่อ`,en:`Explore the board`},objective:{th:`ระบุส่วนรับเข้า ประมวลผล และส่งออกบนบอร์ดได้`,en:`Identify input, processing and output on the board.`},overview:{th:`ไมโครคอนโทรลเลอร์ทำงานตามโปรแกรม ขาดิจิทัลใช้รับหรือส่งสถานะ ส่วนขาแอนะล็อกอ่านแรงดันแล้วแปลงเป็นตัวเลข เริ่มจากค้นหา USB, GND, 5V, A0 และ D13 บนบอร์ด`,en:`A microcontroller follows a program. Digital pins read or write logic states; analog inputs convert voltage into numbers. Locate USB, GND, 5V, A0 and D13.`},challenge:{th:`ลองทำนายว่า LED บนบอร์ดจะเปลี่ยนอย่างไรเมื่อเริ่มและหยุดแบบจำลอง`,en:`Predict what happens to the onboard LED when the model starts and stops.`},reflection:{th:`ทำไมขา GND จึงต่างจากขารับสัญญาณ`,en:`How does GND differ from a signal input?`},components:[`uno`],connections:[{from:`D13`,to:`LED_BUILTIN`,note:{th:`LED บนบอร์ด`,en:`Onboard LED`}}],defaultParams:{},defaultInputs:{},mode:`guided`,codeGenerator:`board`,model:`board`},{id:`blink`,order:2,title:{th:`กำหนดจังหวะไฟกะพริบ`,en:`Program an LED rhythm`},objective:{th:`เชื่อมโยงระยะเวลาเปิดและปิดกับคาบและความถี่ได้`,en:`Relate on/off time to period and frequency.`},overview:{th:`LED ต้องต่ออนุกรมกับตัวต้านทาน เมื่อขา D13 เป็น HIGH วงจรตัวอย่างนี้ทำให้ไฟติด คาบเท่ากับเวลาเปิดรวมเวลาปิด ความถี่เท่ากับหนึ่งหารด้วยคาบในหน่วยวินาที`,en:`An LED needs a series resistor. In this circuit HIGH at D13 lights the LED. The period is on-time plus off-time; frequency is one divided by the period in seconds.`},challenge:{th:`ทำให้ไฟกะพริบ 2 ครั้งต่อวินาที โดยเปิดและปิดนานเท่ากัน`,en:`Make two flashes per second with equal on and off times.`},reflection:{th:`ถ้าเพิ่มเฉพาะเวลาเปิด ความถี่และสัดส่วนเวลาติดเปลี่ยนอย่างไร`,en:`What happens to frequency and duty cycle if only on-time increases?`},components:[`uno`,`led`,`resistor`,`breadboard`],connections:[{from:`D13`,to:`R1.1`,note:{th:`ตัวต้านทาน 330 Ω แล้วต่อ LED ขั้วบวก`,en:`330 Ω resistor then LED anode`}},{from:`LED.K`,to:`GND`,note:{th:`ขั้วลบของ LED`,en:`LED cathode`}}],defaultParams:{onMs:500,offMs:500},defaultInputs:{},mode:`guided`,codeGenerator:`blink`,model:`blink`},{id:`button`,order:3,title:{th:`ปุ่มกดกับตรรกะควบคุม`,en:`Use a button as input`},objective:{th:`อธิบาย active-low และแยกการกดค้างออกจากการสลับสถานะได้`,en:`Explain active-low logic and distinguish hold from toggle.`},overview:{th:`ต่อปุ่มระหว่าง D2 กับ GND และใช้ INPUT_PULLUP เมื่อไม่กดอ่านได้ HIGH เมื่อกดอ่านได้ LOW แบบกดค้างให้ไฟตามสถานะปุ่ม ส่วนแบบสลับให้การกดใหม่แต่ละครั้งเปลี่ยนไฟหนึ่งครั้ง โดยกรองการเด้งของหน้าสัมผัส`,en:`Connect the button between D2 and GND using INPUT_PULLUP. Released reads HIGH; pressed reads LOW. Hold mode follows the debounced button. Toggle mode flips the LED once per new debounced press.`},challenge:{th:`เลือกแบบสลับ กดค้าง แล้วอธิบายเหตุใดไฟจึงไม่สลับซ้ำตลอดเวลาที่กด`,en:`Select toggle, hold the button, and explain why it does not repeatedly toggle.`},reflection:{th:`เหตุใดค่าที่อ่านได้เป็น LOW ทั้งที่เรากำลังกดปุ่ม`,en:`Why does a pressed button read LOW?`},components:[`uno`,`button`],connections:[{from:`D2`,to:`SW1.A`,note:{th:`ปุ่มขั้วหนึ่ง`,en:`One switch side`}},{from:`SW1.B`,to:`GND`,note:{th:`อีกขั้วหนึ่ง ไม่ใช้ตัวต้านทาน pull-down`,en:`Other switch side; no pull-down resistor`}},{from:`D13`,to:`LED_BUILTIN`,note:{th:`LED บนบอร์ด`,en:`Onboard LED`}}],defaultParams:{mode:`hold`,debounceMs:30},defaultInputs:{pressed:!1},mode:`guided`,codeGenerator:`button`,model:`button`},{id:`knob`,order:4,title:{th:`ปรับความสว่างด้วยลูกบิด`,en:`Dim with a potentiometer`},objective:{th:`แปลงช่วง ADC 0–1023 เป็น PWM 0–255 ได้`,en:`Map ADC 0–1023 to PWM 0–255.`},overview:{th:`ปลายโพเทนชิโอมิเตอร์ต่อกับ 5V และ GND ส่วนขากลางต่อ A0 โปรแกรมแปลงค่าที่อ่านได้ไปเป็น PWM ของ D9 การปรับ PWM เปลี่ยนสัดส่วนเวลา HIGH ไม่ใช่สร้างแรงดันแอนะล็อกแท้บน Uno R3`,en:`Connect the potentiometer ends to 5V/GND and its wiper to A0. Map the reading to PWM on D9. PWM changes the proportion of HIGH time; Uno R3 does not produce a true variable analog voltage here.`},challenge:{th:`ตั้ง ADC ใกล้ 512 แล้วเปรียบเทียบ PWM กับสัดส่วนเวลาติด`,en:`Set ADC near 512 and compare PWM with duty cycle.`},reflection:{th:`ค่ากลางของ ADC กับ PWM จำเป็นต้องเป็นจำนวนเต็มเท่ากันหรือไม่`,en:`Must the midpoint ADC and PWM have the same integer value?`},components:[`uno`,`potentiometer`,`led`,`resistor`],connections:[{from:`POT.1`,to:`5V`,note:{th:`ปลายตัวต้านทาน`,en:`End terminal`}},{from:`POT.2`,to:`A0`,note:{th:`ขากลาง`,en:`Wiper`}},{from:`POT.3`,to:`GND`,note:{th:`ปลายอีกด้าน`,en:`Other end`}},{from:`D9`,to:`R1.1`,note:{th:`330 Ω ต่ออนุกรม LED ไป GND`,en:`330 Ω in series with LED to GND`}}],defaultParams:{},defaultInputs:{adc:512},mode:`guided`,codeGenerator:`knob`,model:`knob`},{id:`rgb`,order:5,title:{th:`ผสมสีด้วยแสงสามสี`,en:`Mix RGB light`},objective:{th:`อธิบายการผสมแสงแบบบวกและควบคุมแต่ละช่องสีได้`,en:`Explain additive light mixing and control each channel.`},overview:{th:`ใช้ RGB LED แบบขั้วลบร่วม แยกตัวต้านทาน 330 Ω ของ R G B คนละตัว แล้วควบคุมด้วย PWM การผสมแสงต่างจากการผสมสีระบาย ค่าตัวเลขแสดงคำสั่ง ไม่ได้รับประกันสีที่ตาเห็นตรงกับจอ`,en:`Use a common-cathode RGB LED with a separate 330 Ω resistor for each channel. Drive R/G/B with PWM. Light mixing differs from paint mixing. Values are commands, not guaranteed matching perceived colours.`},challenge:{th:`สร้างแสงเหลือง แล้วทดสอบว่าจะเปลี่ยนอย่างไรเมื่อเพิ่มสีน้ำเงิน`,en:`Create yellow light, then predict the effect of adding blue.`},reflection:{th:`เพราะเหตุใดแต่ละช่องจึงควรมีตัวต้านทานของตนเอง`,en:`Why should each channel have its own resistor?`},components:[`uno`,`rgb`,`resistor`],connections:[{from:`D9`,to:`R_R`,note:{th:`330 Ω ไปขา R`,en:`330 Ω to R`}},{from:`D10`,to:`R_G`,note:{th:`330 Ω ไปขา G`,en:`330 Ω to G`}},{from:`D11`,to:`R_B`,note:{th:`330 Ω ไปขา B`,en:`330 Ω to B`}},{from:`RGB.K`,to:`GND`,note:{th:`ขั้วลบร่วม`,en:`Common cathode`}}],defaultParams:{r:128,g:64,b:0},defaultInputs:{},mode:`guided`,codeGenerator:`rgb`,model:`rgb`},{id:`light`,order:6,title:{th:`เปิดไฟเมื่อแสงน้อย`,en:`Build a light-sensitive switch`},objective:{th:`ใช้เกณฑ์ตัดสินใจกับค่าเซนเซอร์แสงได้`,en:`Apply a threshold to a light-sensor reading.`},overview:{th:`วงจรนี้ต่อ LDR จาก 5V มายัง A0 และต่อ 10 kΩ จาก A0 ไป GND เมื่อแสงมาก ค่าที่อ่านได้มีแนวโน้มสูงขึ้น โปรแกรมเปิด LED เมื่อค่าน้อยกว่าเกณฑ์ ค่า ADC ไม่ใช่หน่วยลักซ์`,en:`This divider puts the LDR from 5V to A0 and 10 kΩ from A0 to GND. More light tends to increase the reading. The LED turns on below the threshold. ADC is not lux.`},challenge:{th:`เลือกเกณฑ์ 400 แล้วทดสอบค่าต่ำกว่า เท่ากับ และสูงกว่าเกณฑ์`,en:`Choose threshold 400 and test below, at, and above it.`},reflection:{th:`ถ้าสลับตำแหน่ง LDR กับตัวต้านทาน แนวโน้มการอ่านจะเปลี่ยนอย่างไร`,en:`How would swapping the LDR and fixed resistor change the trend?`},components:[`uno`,`ldr`,`resistor`],connections:[{from:`5V`,to:`LDR.1`,note:{th:`LDR`,en:`Photoresistor`}},{from:`LDR.2`,to:`A0`,note:{th:`จุดแบ่งแรงดัน`,en:`Divider junction`}},{from:`A0`,to:`R10K.1`,note:{th:`10 kΩ ไป GND`,en:`10 kΩ to GND`}},{from:`D13`,to:`LED_BUILTIN`,note:{th:`LED บนบอร์ด`,en:`Onboard LED`}}],defaultParams:{threshold:400},defaultInputs:{lightAdc:600},mode:`guided`,codeGenerator:`light`,model:`light`},{id:`sensor`,order:7,title:{th:`วัดระยะด้วยเวลาสะท้อน`,en:`Measure ultrasonic distance`},objective:{th:`อธิบายเหตุผลที่ต้องหารเวลาการเดินทางไปกลับด้วยสองได้`,en:`Explain why round-trip travel time is divided by two.`},overview:{th:`HC-SR04 รุ่น 5V แบบ Trig/Echo ส่งคลื่นแล้วจับเวลาสะท้อน ใช้ระยะประมาณเท่ากับเวลาไมโครวินาทีคูณ 0.0343 หารสอง แบบจำลองสมมติอัตราเร็วเสียงคงที่ หากไม่มี Echo ให้แสดงว่าไม่มีข้อมูล ไม่ใช่ระยะศูนย์`,en:`The classic 5V Trig/Echo HC-SR04 times an echo. Approximate distance in cm is microseconds × 0.0343 / 2. The model assumes constant sound speed. No echo means missing data, not zero distance.`},challenge:{th:`เพิ่มระยะเป็นสองเท่าแล้วทำนายเวลา Echo จากนั้นลองกรณีไม่มี Echo`,en:`Double distance, predict echo time, then test no echo.`},reflection:{th:`อุณหภูมิอากาศหรือพื้นผิววัตถุอาจทำให้ค่าจริงต่างจากแบบจำลองอย่างไร`,en:`How could air temperature or target surface change a real measurement?`},components:[`uno`,`ultrasonic`,`obstacle`],connections:[{from:`HC.VCC`,to:`5V`,note:{th:`รุ่น 5V แบบดั้งเดิม`,en:`Classic 5V module`}},{from:`HC.GND`,to:`GND`,note:{th:`กราวด์`,en:`Ground`}},{from:`HC.TRIG`,to:`D9`,note:{th:`สั่งวัดระยะ`,en:`Trigger`}},{from:`HC.ECHO`,to:`D10`,note:{th:`อ่านเวลาสะท้อน`,en:`Echo input`}}],defaultParams:{timeoutUs:25e3},defaultInputs:{distanceCm:30},mode:`guided`,codeGenerator:`sensor`,model:`sensor`},{id:`sound`,order:8,title:{th:`สร้างเสียงด้วยความถี่`,en:`Explore tone and pitch`},objective:{th:`แยกความถี่เสียงออกจากระยะเวลาเสียงได้`,en:`Distinguish pitch from tone duration.`},overview:{th:`ใช้เพียโซแบบพาสซีฟกับ D8 ตัวอย่างส่งเสียงหนึ่งครั้งเมื่อเริ่มแบบจำลอง ค่าความถี่สัมพันธ์กับระดับเสียงสูงต่ำ ส่วนระยะเวลาบอกว่าเสียงนานเท่าใด ปุ่มปิดเสียงควบคุมลำโพงของเบราว์เซอร์`,en:`Use a passive piezo on D8. The example plays once at start. Frequency relates to pitch; duration controls how long it lasts. Mute controls browser audio.`},challenge:{th:`เปรียบเทียบ 440 Hz กับ 880 Hz โดยคงระยะเวลาเดิม`,en:`Compare 440 Hz and 880 Hz while keeping duration fixed.`},reflection:{th:`การเพิ่มความถี่ทำให้เสียงดังขึ้นเสมอหรือไม่`,en:`Does raising frequency necessarily make sound louder?`},components:[`uno`,`piezo`],connections:[{from:`D8`,to:`PIEZO.+`,note:{th:`เพียโซพาสซีฟกระแสต่ำ`,en:`Low-current passive piezo`}},{from:`PIEZO.-`,to:`GND`,note:{th:`กราวด์`,en:`Ground`}}],defaultParams:{hz:440,durationMs:1e3},defaultInputs:{},mode:`guided`,codeGenerator:`sound`,model:`sound`},{id:`piano`,order:9,title:{th:`คีย์เปียโนแปดเสียง`,en:`Play an eight-key piano`},objective:{th:`เชื่อมปุ่มหลายปุ่มกับตารางความถี่ได้`,en:`Map multiple buttons to a frequency table.`},overview:{th:`ปุ่มแปดปุ่มต่อ D2–D9 แบบ INPUT_PULLUP และเพียโซต่อ D10 เล่นได้ครั้งละหนึ่งเสียง กรณีกดหลายปุ่มให้เลือกหมายเลขต่ำสุด อัตราความถี่ของโน้ตสูงขึ้นหนึ่งอ็อกเทฟเป็นสองเท่าโดยประมาณ`,en:`Eight INPUT_PULLUP keys use D2–D9 and a passive piezo uses D10. Play one note at a time; the lowest-index pressed key wins. One octave higher approximately doubles frequency.`},challenge:{th:`เล่นทำนองสั้นแล้วเปลี่ยนจากอ็อกเทฟ 4 เป็น 5`,en:`Play a short melody, then switch from octave 4 to 5.`},reflection:{th:`เหตุใดระบบนี้จึงเล่นคอร์ดหลายเสียงพร้อมกันไม่ได้`,en:`Why can this implementation not play a chord?`},components:[`uno`,`button`,`piezo`],connections:[{from:`D2–D9`,to:`SW1–SW8.A`,note:{th:`ปุ่มแต่ละปุ่ม อีกขั้วต่อ GND`,en:`Individual switches; other side to GND`}},{from:`D10`,to:`PIEZO.+`,note:{th:`เพียโซ อีกขั้วต่อ GND`,en:`Piezo; other side to GND`}}],defaultParams:{octave:4},defaultInputs:{key:null},mode:`guided`,codeGenerator:`piano`,model:`piano`},{id:`motor`,order:10,title:{th:`ควบคุมมอเตอร์ผ่านวงจรขับ`,en:`Drive a DC motor`},objective:{th:`อธิบายหน้าที่วงจรขับ ไดโอด และ PWM ได้`,en:`Explain driver, flyback diode and PWM roles.`},overview:{th:`D5 ส่ง PWM ไปวงจรขับที่เหมาะกับมอเตอร์ มอเตอร์ใช้แหล่งจ่ายแยกที่มีกระแสเพียงพอและต่อกราวด์ร่วม ไดโอดคร่อมมอเตอร์โดยขั้วคาโทดอยู่ฝั่งบวก ความเร็วสัมพัทธ์ในแบบจำลองเป็นค่าเชิงสาธิต ไม่ใช่ RPM จริง`,en:`D5 sends PWM to a suitable driver. Use a separately rated motor supply with common ground. The flyback diode cathode faces motor positive. Model relative speed is illustrative and not physical RPM.`},challenge:{th:`เปรียบเทียบ duty 25% กับ 75% แล้วอธิบายว่าทำไมจึงไม่ควรสรุปว่า RPM เพิ่มสามเท่า`,en:`Compare 25% and 75% duty and explain why actual RPM need not triple.`},reflection:{th:`ถ้าใช้ขา D5 จ่ายกระแสให้มอเตอร์โดยตรง อาจเกิดอะไรขึ้น`,en:`What could happen if D5 powered the motor directly?`},components:[`uno`,`dc-motor`,`driver`,`diode`,`supply`],connections:[{from:`D5`,to:`DRIVER.IN`,note:{th:`อินพุตวงจรขับที่มีการจำกัดกระแสเหมาะสม`,en:`Suitably limited driver input`}},{from:`MOTOR.+`,to:`EXT.+`,note:{th:`แหล่งจ่ายตามพิกัด`,en:`Rated external supply`}},{from:`MOTOR.-`,to:`DRIVER.OUT`,note:{th:`ทางสวิตช์กำลัง`,en:`Switched power path`}},{from:`EXT.-`,to:`GND`,note:{th:`กราวด์ร่วม`,en:`Common ground`}},{from:`DIODE.K`,to:`MOTOR.+`,note:{th:`แอโนดอยู่ MOTOR.-`,en:`Anode at MOTOR.-`}}],defaultParams:{pwm:128},defaultInputs:{},mode:`guided`,codeGenerator:`motor`,model:`motor`},{id:`heat`,order:11,title:{th:`แปลงแรงดันเป็นอุณหภูมิ`,en:`Read a TMP36 temperature sensor`},objective:{th:`ใช้ค่าชดเชยและความชันของ TMP36 แปลงแรงดันได้`,en:`Use TMP36 offset and slope to convert voltage.`},overview:{th:`TMP36 ให้ประมาณ 0.5 V ที่ 0 °C และเพิ่ม 0.01 V ต่อ °C จึงประมาณอุณหภูมิได้จาก (V − 0.5) × 100 แบบจำลองรวมการปัดค่า ADC 10 บิตไว้แล้ว ค่าอุณหภูมิที่คำนวณจึงอาจต่างจากค่าตั้งเล็กน้อย`,en:`TMP36 outputs about 0.5 V at 0°C and rises 0.01 V/°C. Estimate temperature with (V − 0.5) × 100. This model includes 10-bit ADC quantization, so the calculated value may differ slightly from the setting.`},challenge:{th:`ตั้ง 25 °C คำนวณแรงดันที่ควรได้ แล้วเปรียบเทียบค่าที่อ่าน`,en:`Set 25°C, calculate expected voltage, then compare the reading.`},reflection:{th:`เหตุใดแรงดันอ้างอิงที่ไม่ตรง 5 V จึงทำให้ผลคลาดเคลื่อน`,en:`Why does a reference voltage different from 5 V affect the estimate?`},components:[`uno`,`tmp36`],connections:[{from:`TMP.+VS`,to:`5V`,note:{th:`ตรวจสอบ pinout ของแพ็กเกจก่อนต่อ`,en:`Check package pinout first`}},{from:`TMP.VOUT`,to:`A0`,note:{th:`เอาต์พุตเซนเซอร์`,en:`Sensor output`}},{from:`TMP.GND`,to:`GND`,note:{th:`กราวด์`,en:`Ground`}}],defaultParams:{},defaultInputs:{tempC:25},mode:`guided`,codeGenerator:`heat`,model:`heat`},{id:`servo`,order:12,title:{th:`สั่งมุมของเซอร์โว`,en:`Command a servo angle`},objective:{th:`แยกคำสั่งมุมออกจากผลเชิงกลจริงได้`,en:`Distinguish commanded angle from actual mechanical motion.`},overview:{th:`ส่งสัญญาณควบคุมผ่าน D9 และใช้แหล่งจ่ายตามพิกัดของเซอร์โวพร้อมกราวด์ร่วม ค่ามุม 0–180 เป็นช่วงคำสั่งตัวอย่าง มุมจริงและระยะเคลื่อนที่ขึ้นกับเซอร์โวและโหลด ไม่ใช่การควบคุมความเร็วด้วย PWM แบบ LED`,en:`Send the control signal on D9 and use a suitably rated servo supply with common ground. 0–180 is a nominal command range. Actual travel depends on servo and load; this is not LED-style PWM speed control.`},challenge:{th:`สั่งมุม 30° 90° และ 150° แล้วอธิบายตำแหน่งของแขน`,en:`Command 30°, 90° and 150° and describe the arm position.`},reflection:{th:`เรารู้ตำแหน่งจริงจากคำสั่งมุมเพียงอย่างเดียวได้หรือไม่`,en:`Can a command alone prove the actual position?`},components:[`uno`,`servo`,`supply`],connections:[{from:`D9`,to:`SERVO.SIG`,note:{th:`สัญญาณควบคุม`,en:`Control signal`}},{from:`SERVO.+`,to:`EXT.+`,note:{th:`แหล่งจ่ายตามพิกัด`,en:`Rated external supply`}},{from:`SERVO.GND`,to:`EXT.-/GND`,note:{th:`กราวด์ร่วม`,en:`Common ground`}}],defaultParams:{angle:90},defaultInputs:{},mode:`guided`,codeGenerator:`servo`,model:`servo`},{id:`stepper`,order:13,title:{th:`การหมุนแบบนับก้าว`,en:`Count stepper movement`},objective:{th:`เชื่อมจำนวนก้าว ทิศทาง และมุมหมุนตามค่าตั้งได้`,en:`Relate step count, direction and configured rotation angle.`},overview:{th:`ใช้มอเตอร์ 28BYJ-48 กับวงจรขับ ULN2003 และแหล่งจ่ายที่เหมาะสม ค่าเริ่มต้น 2048 ก้าวต่อรอบเป็นสมมติฐานของโหมดเต็มก้าว ต้องตรวจสอบและปรับตามรุ่น อัตราทด และลำดับขับจริง โหมดครึ่งก้าวไม่ใช้ค่ารอบเดียวกันโดยอัตโนมัติ`,en:`Use a 28BYJ-48 with a ULN2003 driver and suitable supply. Default 2048 steps/revolution is a nominal full-step assumption. Verify motor, gearbox and sequence; half-stepping does not automatically use the same count.`},challenge:{th:`กำหนด 2048 ก้าวต่อรอบ แล้วคำนวณจำนวนก้าวสำหรับครึ่งรอบ`,en:`With 2048 steps/revolution, calculate steps for half a turn.`},reflection:{th:`เหตุใดการเปลี่ยนค่าก้าวต่อรอบในโปรแกรมจึงไม่เปลี่ยนอัตราทดของมอเตอร์จริง`,en:`Why does changing the software count not change the physical gearbox?`},components:[`uno`,`stepper`,`uln2003`,`supply`],connections:[{from:`D8,D9,D10,D11`,to:`ULN.IN1–IN4`,note:{th:`ลำดับ constructor คือ 8,10,9,11`,en:`Constructor order is 8,10,9,11`}},{from:`ULN.MOTOR`,to:`MOTOR.PLUG`,note:{th:`ขั้วต่อห้าสายตามโมดูล`,en:`Five-wire module connector`}},{from:`ULN.V+`,to:`EXT.+`,note:{th:`ตามพิกัดมอเตอร์`,en:`Rated motor supply`}},{from:`ULN.GND`,to:`GND/EXT.-`,note:{th:`กราวด์ร่วม`,en:`Common ground`}}],defaultParams:{stepsPerRev:2048,speedRpm:10,direction:1},defaultInputs:{},mode:`guided`,codeGenerator:`stepper`,model:`stepper`},{id:`plant`,order:14,title:{th:`แสดงความชื้นสัมพัทธ์ของวัสดุปลูก`,en:`Monitor relative soil moisture`},objective:{th:`ปรับเทียบสองจุดและอธิบายข้อจำกัดของร้อยละสัมพัทธ์ได้`,en:`Use two-point calibration and explain relative percentage limits.`},overview:{th:`เลือกโมดูลแอนะล็อกที่อ่านค่าตอนแห้งสูงกว่าตอนเปียก ใช้ค่าที่วัดจริงสองจุดแปลงเป็นสเกล 0–100 และจำกัดช่วง ตัวเลขนี้เป็นสเกลสัมพัทธ์ ไม่ใช่ปริมาณน้ำในดินร้อยละโดยตรง OLED แสดงค่าและสถานะแห้ง พอดี หรือชื้นมาก`,en:`Choose an analog module whose dry reading exceeds wet. Map measured dry/wet references to 0–100 and clamp. This is a relative scale, not volumetric soil water percentage. The OLED shows value and dry/OK/wet status.`},challenge:{th:`ทดสอบค่าแห้ง 800 เปียก 350 และค่ากลาง แล้วลองเกินช่วง`,en:`Test dry 800, wet 350, midpoint and values outside the span.`},reflection:{th:`เหตุใดเปลี่ยนชนิดดินหรือเซนเซอร์แล้วจึงควรปรับเทียบใหม่`,en:`Why recalibrate after changing soil or sensor?`},components:[`uno`,`soil-sensor`,`oled`],connections:[{from:`SOIL.AO`,to:`A0`,note:{th:`แอนะล็อกเอาต์พุต`,en:`Analog output`}},{from:`SOIL.VCC/GND`,to:`RATED/GND`,note:{th:`ตามพิกัดโมดูล ไม่อนุมานทุกตัวเป็น 5V`,en:`Use module rating; not all accept 5V`}},{from:`OLED.SDA`,to:`A4`,note:{th:`I2C ตามโมดูล`,en:`Module-compatible I2C`}},{from:`OLED.SCL`,to:`A5`,note:{th:`ตรวจแรงดันและ pull-up`,en:`Check voltage and pull-ups`}},{from:`OLED.VCC/GND`,to:`RATED/GND`,note:{th:`ตามพิกัดจอ`,en:`Use display rating`}}],defaultParams:{dryRaw:800,wetRaw:350},defaultInputs:{moistureRaw:600},mode:`guided`,codeGenerator:`plant`,model:`plant`},{id:`force`,order:15,title:{th:`เกณฑ์ตรวจจับแรงกด`,en:`Detect pressure with an FSR`},objective:{th:`ใช้ค่าดิบของ FSR สั่งเข็มและเสียงตามเกณฑ์ได้โดยไม่อ้างแรงที่ไม่ได้ปรับเทียบ`,en:`Use raw FSR readings for a pointer and threshold without claiming uncalibrated force.`},overview:{th:`FSR ต่อจาก 5V มายัง A0 และต่อ 10 kΩ จาก A0 ไป GND เมื่อกดมากขึ้น ความต้านทาน FSR ลดลงและค่าดิบมีแนวโน้มสูงขึ้น ใช้สั่งมุมเข็มและเสียงเตือน ค่าดิบไม่ใช่นิวตันหรือกิโลกรัม`,en:`Put FSR from 5V to A0 and 10 kΩ from A0 to GND. Greater pressure tends to lower FSR resistance and raise the reading. Drive a pointer and tone threshold. Raw readings are neither newtons nor kilograms.`},challenge:{th:`ตั้งเกณฑ์ 700 แล้วทดสอบค่าต่ำกว่า เท่ากับ และสูงกว่าเกณฑ์`,en:`Set threshold 700 and test below, at and above it.`},reflection:{th:`ต้องมีข้อมูลอะไรเพิ่มจึงจะรายงานแรงเป็นนิวตันได้`,en:`What additional evidence is needed to report force in newtons?`},components:[`uno`,`fsr`,`resistor`,`servo`,`piezo`,`supply`],connections:[{from:`5V`,to:`FSR.1`,note:{th:`FSR`,en:`Force-sensitive resistor`}},{from:`FSR.2`,to:`A0`,note:{th:`จุดแบ่งแรงดัน`,en:`Divider junction`}},{from:`A0`,to:`R10K.1`,note:{th:`10 kΩ ไป GND`,en:`10 kΩ to GND`}},{from:`D9`,to:`SERVO.SIG`,note:{th:`แหล่งจ่ายเซอร์โวแยก กราวด์ร่วม`,en:`Separate servo supply, common ground`}},{from:`D8`,to:`PIEZO.+`,note:{th:`อีกขั้วต่อ GND`,en:`Other terminal to GND`}}],defaultParams:{threshold:700},defaultInputs:{fsrAdc:0},mode:`guided`,codeGenerator:`force`,model:`force`},{id:`project`,order:16,title:{th:`ออกแบบสัญญาณช่วยจอด`,en:`Design a parking indicator`},objective:{th:`รวมเซนเซอร์ เงื่อนไข และเอาต์พุตหลายตัว พร้อมจัดการข้อมูลหายได้`,en:`Combine sensing, conditions and outputs while handling missing data.`},overview:{th:`วัดระยะด้วย HC-SR04 แล้วเลือกไฟแดงเมื่อระยะไม่เกิน near ไฟเหลืองเมื่อมากกว่า near แต่ไม่เกิน far และไฟเขียวเมื่อมากกว่า far ต้องกำหนด near < far หากไม่มี Echo ให้ดับไฟและแจ้งไม่มีข้อมูล กิจกรรมนี้ไม่ใช่อุปกรณ์ช่วยจอดเพื่อความปลอดภัยจริง`,en:`Measure distance and choose red at or below near, yellow above near through far, and green above far. Enforce near < far. On no echo, turn lights off and show missing data. This learning model is not a real safety parking device.`},challenge:{th:`ออกแบบเกณฑ์ใหม่ ทดสอบใกล้ขอบเขตทั้งสอง และทดสอบไม่มี Echo`,en:`Design new thresholds; test both boundaries and no echo.`},reflection:{th:`จะอธิบายความต่างระหว่างระยะใกล้มากกับเซนเซอร์ไม่มีข้อมูลอย่างไร`,en:`How would you distinguish a very close object from missing sensor data?`},components:[`uno`,`ultrasonic`,`obstacle`,`traffic-led`,`resistor`],connections:[{from:`HC.VCC/GND`,to:`5V/GND`,note:{th:`แหล่งจ่ายโมดูล`,en:`Module supply`}},{from:`HC.TRIG/ECHO`,to:`D9/D10`,note:{th:`ตามบทวัดระยะ`,en:`As in distance lesson`}},{from:`D4`,to:`R_RED`,note:{th:`330 Ω ไป LED แดง แล้ว GND`,en:`330 Ω to red LED then GND`}},{from:`D3`,to:`R_YELLOW`,note:{th:`330 Ω ไป LED เหลือง แล้ว GND`,en:`330 Ω to yellow LED then GND`}},{from:`D2`,to:`R_GREEN`,note:{th:`330 Ω ไป LED เขียว แล้ว GND`,en:`330 Ω to green LED then GND`}}],defaultParams:{nearCm:15,farCm:40},defaultInputs:{distanceCm:30},mode:`guided`,codeGenerator:`project`,model:`project`}]},u=1e3,d=1001,f=1002,p=1003,m=1004,h=1005,g=1006,_=1007,v=1008,y=1009,b=1010,x=1011,S=1012,C=1013,w=1014,T=1015,E=1016,D=1017,O=1018,k=1020,A=35902,j=35899,M=1021,N=1022,ee=1023,P=1026,te=1027,ne=1028,re=1029,ie=1030,ae=1031,oe=1033,F=33776,se=33777,I=33778,ce=33779,le=35840,ue=35841,de=35842,fe=35843,pe=36196,L=37492,me=37496,he=37488,R=37489,ge=37490,_e=37491,ve=37808,ye=37809,be=37810,xe=37811,Se=37812,Ce=37813,we=37814,Te=37815,Ee=37816,De=37817,Oe=37818,ke=37819,Ae=37820,z=37821,je=36492,Me=36494,Ne=36495,B=36283,Pe=36284,V=36285,Fe=36286,Ie=2300,Le=2301,Re=2302,ze=2303,Be=2400,Ve=2401,He=2402,Ue=3200,We=`srgb`,Ge=`srgb-linear`,Ke=`linear`,qe=`srgb`,Je=7680,Ye=35044,Xe=2e3;function Ze(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Qe(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function $e(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function et(){let e=$e(`canvas`);return e.style.display=`block`,e}var tt={};function nt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function rt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=rt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=rt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function it(...e){let t=e.join(` `);t in tt||(tt[t]=!0,H(...e))}function at(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ot={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},st=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ct=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),lt=1234567,ut=Math.PI/180,dt=180/Math.PI;function ft(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ct[e&255]+ct[e>>8&255]+ct[e>>16&255]+ct[e>>24&255]+`-`+ct[t&255]+ct[t>>8&255]+`-`+ct[t>>16&15|64]+ct[t>>24&255]+`-`+ct[n&63|128]+ct[n>>8&255]+`-`+ct[n>>16&255]+ct[n>>24&255]+ct[r&255]+ct[r>>8&255]+ct[r>>16&255]+ct[r>>24&255]).toLowerCase()}function pt(e,t,n){return Math.max(t,Math.min(n,e))}function mt(e,t){return(e%t+t)%t}function ht(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function gt(e,t,n){return e===t?0:(n-e)/(t-e)}function _t(e,t,n){return(1-n)*e+n*t}function vt(e,t,n,r){return _t(e,t,1-Math.exp(-n*r))}function yt(e,t=1){return t-Math.abs(mt(e,t*2)-t)}function bt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function xt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function St(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Ct(e,t){return e+Math.random()*(t-e)}function wt(e){return e*(.5-Math.random())}function Tt(e){e!==void 0&&(lt=e);let t=lt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Et(e){return e*ut}function Dt(e){return e*dt}function Ot(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function kt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function At(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function jt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:H(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Mt(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Nt(e,t){if(t.constructor===Float32Array)return e;let n=Mt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Pt(e,t){if(t.constructor===Float32Array)return e;let n=Mt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var Ft={DEG2RAD:ut,RAD2DEG:dt,generateUUID:ft,clamp:pt,euclideanModulo:mt,mapLinear:ht,inverseLerp:gt,lerp:_t,damp:vt,pingpong:yt,smoothstep:bt,smootherstep:xt,randInt:St,randFloat:Ct,randFloatSpread:wt,seededRandom:Tt,degToRad:Et,radToDeg:Dt,isPowerOfTwo:Ot,ceilPowerOfTwo:kt,floorPowerOfTwo:At,setQuaternionFromProperEuler:jt,normalize:Pt,denormalize:Nt},W=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},It=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lt.copy(this).projectOnVector(e),this.sub(Lt)}reflect(e){return this.sub(Lt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Lt=new G,Rt=new It,K=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return it(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(zt.makeScale(e,t)),this}rotate(e){return it(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(zt.makeRotation(-e)),this}translate(e,t){return it(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(zt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},zt=new K,Bt=new K().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vt=new K().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ht(){let e={enabled:!0,workingColorSpace:Ge,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Wt(e.r),e.g=Wt(e.g),e.b=Wt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Gt(e.r),e.g=Gt(e.g),e.b=Gt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ke:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ge]:{primaries:t,whitePoint:r,transfer:Ke,toXYZ:Bt,fromXYZ:Vt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:r,transfer:qe,toXYZ:Bt,fromXYZ:Vt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),e}var Ut=Ht();function Wt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Gt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Kt,qt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Kt===void 0&&(Kt=$e(`canvas`)),Kt.width=e.width,Kt.height=e.height;let t=Kt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Kt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=$e(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Wt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Wt(t[e]/255)*255):t[e]=Wt(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Jt=0,Yt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Jt++}),this.uuid=ft(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Xt(r[t].image)):e.push(Xt(r[t]))}else e=Xt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Xt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?qt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var Zt=0,Qt=new G,$t=class e extends st{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=d,i=d,a=g,o=v,s=ee,c=y,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zt++}),this.uuid=ft(),this.name=``,this.source=new Yt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new K,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Qt).x}get height(){return this.source.getSize(Qt).y}get depth(){return this.source.getSize(Qt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case u:e.x-=Math.floor(e.x);break;case d:e.x=e.x<0?0:1;break;case f:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case u:e.y-=Math.floor(e.y);break;case d:e.y=e.y<0?0:1;break;case f:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};$t.DEFAULT_IMAGE=null,$t.DEFAULT_MAPPING=300,$t.DEFAULT_ANISOTROPY=1;var en=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},tn=class extends st{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:g,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new en(0,0,e,t),this.scissorTest=!1,this.viewport=new en(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new $t({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:g,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Yt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},nn=class extends tn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},rn=class extends $t{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=p,this.minFilter=p,this.wrapR=d,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},an=class extends $t{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=p,this.minFilter=p,this.wrapR=d,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},on=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/sn.setFromMatrixColumn(e,0).length(),i=1/sn.setFromMatrixColumn(e,1).length(),a=1/sn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ln,e,un)}lookAt(e,t,n){let r=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),dn.crossVectors(n,pn),dn.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),dn.crossVectors(n,pn)),dn.normalize(),fn.crossVectors(pn,dn),r[0]=dn.x,r[4]=fn.x,r[8]=pn.x,r[1]=dn.y,r[5]=fn.y,r[9]=pn.y,r[2]=dn.z,r[6]=fn.z,r[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],P=r[11],te=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*M+c*te,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*M+f*te,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*M+g*te,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*M+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=sn.set(r[0],r[1],r[2]).length(),o=sn.set(r[4],r[5],r[6]).length(),s=sn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),cn.copy(this);let c=1/a,l=1/o,u=1/s;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=l,cn.elements[5]*=l,cn.elements[6]*=l,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,t.setFromRotationMatrix(cn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Xe,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Xe,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},sn=new G,cn=new on,ln=new G(0,0,0),un=new G(1,1,1),dn=new G,fn=new G,pn=new G,mn=new on,hn=new It,gn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-pt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(pt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hn.setFromEuler(this),this.setFromQuaternion(hn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gn.DEFAULT_ORDER=`XYZ`;var _n=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},vn=0,yn=new G,bn=new It,xn=new on,Sn=new G,Cn=new G,wn=new G,Tn=new It,En=new G(1,0,0),Dn=new G(0,1,0),On=new G(0,0,1),kn={type:`added`},An={type:`removed`},jn={type:`childadded`,child:null},Mn={type:`childremoved`,child:null},Nn=class e extends st{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vn++}),this.uuid=ft(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new gn,r=new It,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new on},normalMatrix:{value:new K}}),this.matrix=new on,this.matrixWorld=new on,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _n,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return bn.setFromAxisAngle(e,t),this.quaternion.multiply(bn),this}rotateOnWorldAxis(e,t){return bn.setFromAxisAngle(e,t),this.quaternion.premultiply(bn),this}rotateX(e){return this.rotateOnAxis(En,e)}rotateY(e){return this.rotateOnAxis(Dn,e)}rotateZ(e){return this.rotateOnAxis(On,e)}translateOnAxis(e,t){return yn.copy(e).applyQuaternion(this.quaternion),this.position.add(yn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(En,e)}translateY(e){return this.translateOnAxis(Dn,e)}translateZ(e){return this.translateOnAxis(On,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Sn.copy(e):Sn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Cn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Cn,Sn,this.up):xn.lookAt(Sn,Cn,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),bn.setFromRotationMatrix(xn),this.quaternion.premultiply(bn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kn),jn.child=e,this.dispatchEvent(jn),jn.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(An),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kn),jn.child=e,this.dispatchEvent(jn),jn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cn,e,wn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cn,Tn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Nn.DEFAULT_UP=new G(0,1,0),Nn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var q=class extends Nn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Pn={type:`move`},Fn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new q,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new q,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new q,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new q;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},In={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Rn={h:0,s:0,l:0};function zn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Bn=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=We){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ut.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ut.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ut.workingColorSpace){if(e=mt(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=zn(i,r,e+1/3),this.g=zn(i,r,e),this.b=zn(i,r,e-1/3)}return Ut.colorSpaceToWorking(this,r),this}setStyle(e,t=We){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=We){let n=In[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wt(e.r),this.g=Wt(e.g),this.b=Wt(e.b),this}copyLinearToSRGB(e){return this.r=Gt(e.r),this.g=Gt(e.g),this.b=Gt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=We){return Ut.workingToColorSpace(Vn.copy(this),e),Math.round(pt(Vn.r*255,0,255))*65536+Math.round(pt(Vn.g*255,0,255))*256+Math.round(pt(Vn.b*255,0,255))}getHexString(e=We){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ut.workingColorSpace){Ut.workingToColorSpace(Vn.copy(this),t);let n=Vn.r,r=Vn.g,i=Vn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Ut.workingColorSpace){return Ut.workingToColorSpace(Vn.copy(this),t),e.r=Vn.r,e.g=Vn.g,e.b=Vn.b,e}getStyle(e=We){Ut.workingToColorSpace(Vn.copy(this),e);let t=Vn.r,n=Vn.g,r=Vn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Rn);let n=_t(Ln.h,Rn.h,t),r=_t(Ln.s,Rn.s,t),i=_t(Ln.l,Rn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Vn=new Bn;Bn.NAMES=In;var Hn=class extends Nn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Un=new G,Wn=new G,Gn=new G,Kn=new G,qn=new G,Jn=new G,Yn=new G,Xn=new G,Zn=new G,Qn=new G,$n=new en,er=new en,tr=new en,nr=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Un.subVectors(e,t),r.cross(Un);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Un.subVectors(r,t),Wn.subVectors(n,t),Gn.subVectors(e,t);let a=Un.dot(Un),o=Un.dot(Wn),s=Un.dot(Gn),c=Wn.dot(Wn),l=Wn.dot(Gn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Kn)!==null&&Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Kn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Kn.x),s.addScaledVector(a,Kn.y),s.addScaledVector(o,Kn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return $n.setScalar(0),er.setScalar(0),tr.setScalar(0),$n.fromBufferAttribute(e,t),er.fromBufferAttribute(e,n),tr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector($n,i.x),a.addScaledVector(er,i.y),a.addScaledVector(tr,i.z),a}static isFrontFacing(e,t,n,r){return Un.subVectors(n,t),Wn.subVectors(e,t),Un.cross(Wn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Un.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),Un.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;qn.subVectors(r,n),Jn.subVectors(i,n),Xn.subVectors(e,n);let s=qn.dot(Xn),c=Jn.dot(Xn);if(s<=0&&c<=0)return t.copy(n);Zn.subVectors(e,r);let l=qn.dot(Zn),u=Jn.dot(Zn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(qn,a);Qn.subVectors(e,i);let f=qn.dot(Qn),p=Jn.dot(Qn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Jn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Yn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Yn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(qn,a).addScaledVector(Jn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},rr=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ar.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ar.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ar.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ar):ar.fromBufferAttribute(r,t),ar.applyMatrix4(e.matrixWorld),this.expandByPoint(ar);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),or.copy(e.boundingBox)),or.applyMatrix4(e.matrixWorld),this.union(or)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ar),ar.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),mr.subVectors(this.max,pr),sr.subVectors(e.a,pr),cr.subVectors(e.b,pr),lr.subVectors(e.c,pr),ur.subVectors(cr,sr),dr.subVectors(lr,cr),fr.subVectors(sr,lr);let t=[0,-ur.z,ur.y,0,-dr.z,dr.y,0,-fr.z,fr.y,ur.z,0,-ur.x,dr.z,0,-dr.x,fr.z,0,-fr.x,-ur.y,ur.x,0,-dr.y,dr.x,0,-fr.y,fr.x,0];return!_r(t,sr,cr,lr,mr)||(t=[1,0,0,0,1,0,0,0,1],!_r(t,sr,cr,lr,mr))?!1:(hr.crossVectors(ur,dr),t=[hr.x,hr.y,hr.z],_r(t,sr,cr,lr,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ar).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ar).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ir[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ir[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ir[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ir[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ir[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ir[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ir[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ir[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ir)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ir=[new G,new G,new G,new G,new G,new G,new G,new G],ar=new G,or=new rr,sr=new G,cr=new G,lr=new G,ur=new G,dr=new G,fr=new G,pr=new G,mr=new G,hr=new G,gr=new G;function _r(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){gr.fromArray(e,a);let o=i.x*Math.abs(gr.x)+i.y*Math.abs(gr.y)+i.z*Math.abs(gr.z),s=t.dot(gr),c=n.dot(gr),l=r.dot(gr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var vr=new G,yr=new W,br=0,xr=class extends st{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:br++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ye,this.updateRanges=[],this.gpuType=T,this.version=0,this._normalizationScale=e===void 0?void 0:Mt(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXY(t,yr.x,yr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix4(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyNormalMatrix(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.transformDirection(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Nt(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Pt(e,this.array):Math.round(e*t)}},Sr=class extends xr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Cr=class extends xr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},wr=class extends xr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Tr=new rr,Er=new G,Dr=new G,Or=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Tr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Er,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Dr)),this.expandByPoint(Er.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kr=0,Ar=new on,jr=new Nn,Mr=new G,Nr=new rr,Pr=new rr,Fr=new G,Ir=class e extends st{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kr++}),this.uuid=ft(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ze(e)?Cr:Sr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new K().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ar.makeRotationFromQuaternion(e),this.applyMatrix4(Ar),this}rotateX(e){return Ar.makeRotationX(e),this.applyMatrix4(Ar),this}rotateY(e){return Ar.makeRotationY(e),this.applyMatrix4(Ar),this}rotateZ(e){return Ar.makeRotationZ(e),this.applyMatrix4(Ar),this}translate(e,t,n){return Ar.makeTranslation(e,t,n),this.applyMatrix4(Ar),this}scale(e,t,n){return Ar.makeScale(e,t,n),this.applyMatrix4(Ar),this}lookAt(e){return jr.lookAt(e),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new wr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Nr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(this.boundingBox.min,Nr.min),this.boundingBox.expandByPoint(Fr),Fr.addVectors(this.boundingBox.max,Nr.max),this.boundingBox.expandByPoint(Fr)):(this.boundingBox.expandByPoint(Nr.min),this.boundingBox.expandByPoint(Nr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);else if(e){let n=this.boundingSphere.center;if(Nr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Pr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(Nr.min,Pr.min),Nr.expandByPoint(Fr),Fr.addVectors(Nr.max,Pr.max),Nr.expandByPoint(Fr)):(Nr.expandByPoint(Pr.min),Nr.expandByPoint(Pr.max))}Nr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Fr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Fr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Fr.fromBufferAttribute(a,t),o&&(Mr.fromBufferAttribute(e,t),Fr.add(Mr)),r=Math.max(r,n.distanceToSquared(Fr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new xr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let l=new G,u=new G,d=new G,f=new W,p=new W,m=new W,h=new G,g=new G;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new G,b=new G,x=new G,S=new G;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new xr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Fr.fromBufferAttribute(e,t),Fr.normalize(),e.setXYZ(t,Fr.x,Fr.y,Fr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new xr(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Lr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ye,this.updateRanges=[],this.version=0,this.uuid=ft()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Rr(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Rr(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Rr(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=ft()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var zr=new G,Br=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:Mt(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix4(e),this.setXYZ(t,zr.x,zr.y,zr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.applyNormalMatrix(e),this.setXYZ(t,zr.x,zr.y,zr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.transformDirection(e),this.setXYZ(t,zr.x,zr.y,zr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){nt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new xr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){nt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?Nt(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Pt(e,this.data.array):Math.round(e*t)}},Vr=new G,Hr=new G,Ur=new K,Wr=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Vr.subVectors(n,t).cross(Hr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Vr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ur.getNormalMatrix(e),r=this.coplanarPoint(Vr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Gr=0,Kr=class extends st{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gr++}),this.uuid=ft(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bn(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Je,this.stencilZFail=Je,this.stencilZPass=Je,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Bn().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Wr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new W().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},qr=class extends Kr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new Bn(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Jr,Yr=new G,Xr=new G,Zr=new G,Qr=new W,$r=new W,ei=new on,ti=new G,ni=new G,ri=new G,ii=new W,ai=new W,oi=new W,si=class extends Nn{constructor(e=new qr){if(super(),this.isSprite=!0,this.type=`Sprite`,Jr===void 0){Jr=new Ir;let e=new Lr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Jr.setIndex([0,1,2,0,2,3]),Jr.setAttribute(`position`,new Br(e,3,0,!1)),Jr.setAttribute(`uv`,new Br(e,2,3,!1))}this.geometry=Jr,this.material=e,this.center=new W(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&U(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Xr.setFromMatrixScale(this.matrixWorld),ei.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xr.multiplyScalar(-Zr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ci(ti.set(-.5,-.5,0),Zr,a,Xr,r,i),ci(ni.set(.5,-.5,0),Zr,a,Xr,r,i),ci(ri.set(.5,.5,0),Zr,a,Xr,r,i),ii.set(0,0),ai.set(1,0),oi.set(1,1);let o=e.ray.intersectTriangle(ti,ni,ri,!1,Yr);if(o===null&&(ci(ni.set(-.5,.5,0),Zr,a,Xr,r,i),ai.set(0,1),o=e.ray.intersectTriangle(ti,ri,ni,!1,Yr),o===null))return;let s=e.ray.origin.distanceTo(Yr);s<e.near||s>e.far||t.push({distance:s,point:Yr.clone(),uv:nr.getInterpolation(Yr,ti,ni,ri,ii,ai,oi,new W),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function ci(e,t,n,r,i,a){Qr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?$r.copy(Qr):($r.x=a*Qr.x-i*Qr.y,$r.y=i*Qr.x+a*Qr.y),e.copy(t),e.x+=$r.x,e.y+=$r.y,e.applyMatrix4(ei)}var li=new G,ui=new G,di=new G,fi=new G,pi=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ui.copy(e).add(t).multiplyScalar(.5),di.copy(t).sub(e).normalize(),fi.copy(this.origin).sub(ui);let i=e.distanceTo(t)*.5,a=-this.direction.dot(di),o=fi.dot(this.direction),s=-fi.dot(di),c=fi.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ui).addScaledVector(di,d),f}intersectSphere(e,t){if(e.radius<0)return null;li.subVectors(e.center,this.origin);let n=li.dot(this.direction),r=li.dot(li)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,P=C/w,te=1/w,ne=T-ee*D,re=E-P*D,ie=O-ee*A,ae=k-P*A,oe=j-ee*N,F=M-P*N,se=oe*ae-F*ie,I=ne*F-re*oe,ce=ie*re-ae*ne;if(r){if(se<0||I<0||ce<0)return null}else if((se<0||I<0||ce<0)&&(se>0||I>0||ce>0))return null;let le=se+I+ce;if(le===0)return null;let ue=te*(se*D+I*A+ce*N);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},mi=class extends Kr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Bn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},hi=new on,gi=new pi,_i=new Or,vi=new G,yi=new G,bi=new G,xi=new G,Si=new G,Ci=new G,wi=new G,Ti=new G,J=class extends Nn{constructor(e=new Ir,t=new mi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ci.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Si.fromBufferAttribute(s,e),a?Ci.addScaledVector(Si,r):Ci.addScaledVector(Si.sub(t),r))}t.add(Ci)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_i.copy(n.boundingSphere),_i.applyMatrix4(i),gi.copy(e.ray).recast(e.near),_i.containsPoint(gi.origin)===!1&&(gi.intersectSphere(_i,vi)===null||gi.origin.distanceToSquared(vi)>(e.far-e.near)**2)||(hi.copy(i).invert(),gi.copy(e.ray).applyMatrix4(hi),(n.boundingBox===null||gi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Di(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Di(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Di(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Di(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ei(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ti.copy(s),Ti.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ti);return l<n.near||l>n.far?null:{distance:l,point:Ti.clone(),object:e}}function Di(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,yi),e.getVertexPosition(c,bi),e.getVertexPosition(l,xi);let u=Ei(e,t,n,r,yi,bi,xi,wi);if(u){let e=new G;nr.getBarycoord(wi,yi,bi,xi,e),i&&(u.uv=nr.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=nr.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=nr.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};nr.getNormal(yi,bi,xi,t.normal),u.face=t,u.barycoord=e}return u}var Oi=class extends $t{constructor(e=null,t=1,n=1,r,i,a,o,s,c=p,l=p,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ki=new Or,Ai=new W(.5,.5),ji=new G,Mi=class{constructor(e=new Wr,t=new Wr,n=new Wr,r=new Wr,i=new Wr,a=new Wr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xe,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){return ki.center.set(0,0,0),ki.radius=.7071067811865476+Ai.distanceTo(e.center),ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ji.x=r.normal.x>0?e.max.x:e.min.x,ji.y=r.normal.y>0?e.max.y:e.min.y,ji.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ji)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ni=new on,Pi=class e{constructor(){this.coordinateSystem=Xe,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Ni.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Mi),n[e].setFromProjectionMatrix(Ni,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Mi),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Fi=class extends Kr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Bn(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ii=new G,Li=new G,Ri=new on,zi=new pi,Bi=new Or,Vi=new G,Hi=new G,Ui=class extends Nn{constructor(e=new Ir,t=new Fi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Ii.fromBufferAttribute(t,e-1),Li.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Ii.distanceTo(Li);e.setAttribute(`lineDistance`,new wr(n,1))}else H(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bi.copy(n.boundingSphere),Bi.applyMatrix4(r),Bi.radius+=i,e.ray.intersectsSphere(Bi)===!1)return;Ri.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Ri);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Wi(this,e,zi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Wi(this,e,zi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Wi(this,e,zi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Wi(this,e,zi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Wi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Ii.fromBufferAttribute(s,i),Li.fromBufferAttribute(s,a),n.distanceSqToSegment(Ii,Li,Vi,Hi)>r)return;Vi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Vi);if(!(c<t.near||c>t.far))return{distance:c,point:Hi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Gi=new G,Ki=new G,qi=class extends Ui{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Gi.fromBufferAttribute(t,e),Ki.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Gi.distanceTo(Ki);e.setAttribute(`lineDistance`,new wr(n,1))}else H(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Ji=class extends $t{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Yi=class extends $t{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Xi=class extends $t{constructor(e,t,n=w,r,i,a,o=p,s=p,c,l=P,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Zi=class extends Xi{constructor(e,t=w,n=301,r,i,a=p,o=p,s,c=P){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Qi=class extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Y=class e extends Ir{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new wr(c,3)),this.setAttribute(`normal`,new wr(l,3)),this.setAttribute(`uv`,new wr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},X=class e extends Ir{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new wr(u,3)),this.setAttribute(`normal`,new wr(d,3)),this.setAttribute(`uv`,new wr(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},$i=class e extends X{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ea=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){H(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new W:new G);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new G,r=[],i=[],a=[],o=new G,s=new on;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new G)}i[0]=new G,a[0]=new G;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(pt(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(pt(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},ta=class extends ea{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new W){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},na=class extends ta{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function ra(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ia=new G,aa=new G,oa=new ra,sa=new ra,ca=new ra,la=class extends ea{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new G){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(aa.subVectors(r[0],r[1]).add(r[0]),c=aa);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ia.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ia),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),oa.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),sa.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),ca.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(oa.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),sa.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),ca.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(oa.calc(s),sa.calc(s),ca.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ua(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function da(e,t){let n=1-e;return n*n*t}function fa(e,t){return 2*(1-e)*e*t}function pa(e,t){return e*e*t}function ma(e,t,n,r){return da(e,t)+fa(e,n)+pa(e,r)}function ha(e,t){let n=1-e;return n*n*n*t}function ga(e,t){let n=1-e;return 3*n*n*e*t}function _a(e,t){return 3*(1-e)*e*e*t}function va(e,t){return e*e*e*t}function ya(e,t,n,r,i){return ha(e,t)+ga(e,n)+_a(e,r)+va(e,i)}var ba=class extends ea{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ya(e,r.x,i.x,a.x,o.x),ya(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xa=class extends ea{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ya(e,r.x,i.x,a.x,o.x),ya(e,r.y,i.y,a.y,o.y),ya(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Sa=class extends ea{constructor(e=new W,t=new W){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends ea{constructor(e=new G,t=new G){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wa=class extends ea{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ma(e,r.x,i.x,a.x),ma(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=class extends ea{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ma(e,r.x,i.x,a.x),ma(e,r.y,i.y,a.y),ma(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ea=Object.freeze({__proto__:null,ArcCurve:na,CatmullRomCurve3:la,CubicBezierCurve:ba,CubicBezierCurve3:xa,EllipseCurve:ta,LineCurve:Sa,LineCurve3:Ca,QuadraticBezierCurve:wa,QuadraticBezierCurve3:Ta,SplineCurve:class extends ea{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new W){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ua(o,s.x,c.x,l.x,u.x),ua(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this}}}),Da=class e extends Ir{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Oa=class e extends Ir{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new G,p=new W;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new wr(s,3)),this.setAttribute(`normal`,new wr(c,3)),this.setAttribute(`uv`,new wr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ka=class e extends Ir{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Aa=class e extends Ir{constructor(e=new Ta(new G(-1,-1,0),new G(-1,1,0),new G(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new G,s=new G,c=new W,l=new G,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new wr(u,3)),this.setAttribute(`normal`,new wr(d,3)),this.setAttribute(`uv`,new wr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Ea[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ja(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Na(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Na(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ma(e){let t={};for(let n=0;n<e.length;n++){let r=ja(e[n]);for(let e in r)t[e]=r[e]}return t}function Na(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Pa(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Fa(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ut.workingColorSpace}var Ia={clone:ja,merge:Ma},La=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ra=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,za=class extends Kr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=La,this.fragmentShader=Ra,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ja(e.uniforms),this.uniformsGroups=Pa(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Bn().setHex(r.value);break;case`v2`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new en().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new on().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ba=class extends za{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Va=class extends Kr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Bn(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ha=class extends Kr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ue,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ua=class extends Kr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Wa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ga(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Ka=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},qa=class extends Ka{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Be,endingEnd:Be}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ve:i=e,o=2*t-n;break;case He:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ve:a=e,s=2*n-t;break;case He:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ja=class extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ya=class extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Xa=class extends Ka{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=$a(n,t,g,y,r);i[p]=Za(x,o,_,b,m)}return i}};function Za(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Qa(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function $a(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Za(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Qa(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var eo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Wa(t,this.TimeBufferType),this.values=Wa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Wa(e.times,Array),values:Wa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ga(e.settings)&&(n.settings={inTangents:Wa(e.settings.inTangents,Array),outTangents:Wa(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Xa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ie:t=this.InterpolantFactoryMethodDiscrete;break;case Le:t=this.InterpolantFactoryMethodLinear;break;case Re:t=this.InterpolantFactoryMethodSmooth;break;case ze:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ie;case this.InterpolantFactoryMethodLinear:return Le;case this.InterpolantFactoryMethodSmooth:return Re;case this.InterpolantFactoryMethodBezier:return ze}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Ga(this.settings)&&(to(this.settings.inTangents,e),to(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ga(this.settings)&&(no(this.settings.inTangents,e),no(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Qe(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Re,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ga(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function to(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function no(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}eo.prototype.ValueTypeName=``,eo.prototype.TimeBufferType=Float32Array,eo.prototype.ValueBufferType=Float32Array,eo.prototype.DefaultInterpolation=Le;var ro=class extends eo{constructor(e,t,n){super(e,t,n)}};ro.prototype.ValueTypeName=`bool`,ro.prototype.ValueBufferType=Array,ro.prototype.DefaultInterpolation=Ie,ro.prototype.InterpolantFactoryMethodLinear=void 0,ro.prototype.InterpolantFactoryMethodSmooth=void 0;var io=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}};io.prototype.ValueTypeName=`color`;var ao=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}};ao.prototype.ValueTypeName=`number`;var oo=class extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)It.slerpFlat(i,0,a,c-o,a,c,s);return i}},so=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new oo(this.times,this.values,this.getValueSize(),e)}};so.prototype.ValueTypeName=`quaternion`,so.prototype.InterpolantFactoryMethodSmooth=void 0;var co=class extends eo{constructor(e,t,n){super(e,t,n)}};co.prototype.ValueTypeName=`string`,co.prototype.ValueBufferType=Array,co.prototype.DefaultInterpolation=Ie,co.prototype.InterpolantFactoryMethodLinear=void 0,co.prototype.InterpolantFactoryMethodSmooth=void 0;var lo=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}};lo.prototype.ValueTypeName=`vector`;var uo=class extends Nn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Bn(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},fo=class extends uo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bn(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},po=new on,mo=new G,ho=new G,go=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=y,this.map=null,this.mapPass=null,this.matrix=new on,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mi,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new en(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;mo.setFromMatrixPosition(e.matrixWorld),t.position.copy(mo),ho.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ho),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){po.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(po,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(po)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},_o=new G,vo=new It,yo=new G,bo=class extends Nn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new on,this.projectionMatrix=new on,this.projectionMatrixInverse=new on,this.coordinateSystem=Xe,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_o,vo,yo),yo.x===1&&yo.y===1&&yo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_o,vo,yo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_o,vo,yo),yo.x===1&&yo.y===1&&yo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_o,vo,yo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},xo=new G,So=new W,Co=new W,wo=class extends bo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=dt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ut*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dt*2*Math.atan(Math.tan(ut*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xo.x,xo.y).multiplyScalar(-e/xo.z),xo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xo.x,xo.y).multiplyScalar(-e/xo.z)}getViewSize(e,t){return this.getViewBounds(e,So,Co),t.subVectors(Co,So)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ut*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},To=class extends bo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Eo=class extends go{constructor(){super(new To(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Do=class extends uo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.target=new Nn,this.shadow=new Eo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Oo=-90,ko=1,Ao=class extends Nn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new wo(Oo,ko,e,t);r.layers=this.layers,this.add(r);let i=new wo(Oo,ko,e,t);i.layers=this.layers,this.add(i);let a=new wo(Oo,ko,e,t);a.layers=this.layers,this.add(a);let o=new wo(Oo,ko,e,t);o.layers=this.layers,this.add(o);let s=new wo(Oo,ko,e,t);s.layers=this.layers,this.add(s);let c=new wo(Oo,ko,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},jo=class extends wo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Mo=`\\[\\]\\.:\\/`,No=RegExp(`[\\[\\]\\.:\\/]`,`g`),Po=`[^\\[\\]\\.:\\/]`,Fo=`[^`+Mo.replace(`\\.`,``)+`]`,Io=`((?:WC+[\\/:])*)`.replace(`WC`,Po),Lo=`(WCOD+)?`.replace(`WCOD`,Fo),Ro=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Po),zo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Po),Bo=RegExp(`^`+Io+Lo+Ro+zo+`$`),Vo=[`material`,`materials`,`bones`,`map`],Ho=class{constructor(e,t,n){let r=n||Uo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Uo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(No,``)}static parseTrackName(e){let t=Bo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Vo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Uo.Composite=Ho,Uo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Uo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Uo.prototype.GetterByBindingType=[Uo.prototype._getValue_direct,Uo.prototype._getValue_array,Uo.prototype._getValue_arrayElement,Uo.prototype._getValue_toArray],Uo.prototype.SetterByBindingTypeAndVersioning=[[Uo.prototype._setValue_direct,Uo.prototype._setValue_direct_setNeedsUpdate,Uo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Uo.prototype._setValue_array,Uo.prototype._setValue_array_setNeedsUpdate,Uo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Uo.prototype._setValue_arrayElement,Uo.prototype._setValue_arrayElement_setNeedsUpdate,Uo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Uo.prototype._setValue_fromArray,Uo.prototype._setValue_fromArray_setNeedsUpdate,Uo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Wo=new on,Go=class{constructor(e,t,n=0,r=1/0){this.ray=new pi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new _n,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):U(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Wo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wo),this}intersectObject(e,t=!0,n=[]){return qo(e,this,n,t),n.sort(Ko),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)qo(e[r],this,n,t);return n.sort(Ko),n}};function Ko(e,t){return e.distance-t.distance}function qo(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)qo(r[e],t,n,!0)}}(class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var Jo=class extends qi{constructor(e=10,t=10,n=4473924,r=8947848){n=new Bn(n),r=new Bn(r);let i=t/2,a=e/t,o=e/2,s=[],c=[];for(let e=0,l=0,u=-o;e<=t;e++,u+=a){s.push(-o,0,u,o,0,u),s.push(u,0,-o,u,0,o);let t=e===i?n:r;t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3}let l=new Ir;l.setAttribute(`position`,new wr(s,3)),l.setAttribute(`color`,new wr(c,3));let u=new Fi({vertexColors:!0,toneMapped:!1});super(l,u),this.type=`GridHelper`}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Yo(e,t,n,r){let i=Xo(r);switch(n){case M:return e*t;case ne:return e*t/i.components*i.byteLength;case re:return e*t/i.components*i.byteLength;case ie:return e*t*2/i.components*i.byteLength;case ae:return e*t*2/i.components*i.byteLength;case N:return e*t*3/i.components*i.byteLength;case ee:return e*t*4/i.components*i.byteLength;case oe:return e*t*4/i.components*i.byteLength;case F:case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case I:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:case fe:return Math.max(e,16)*Math.max(t,8)/4;case le:case de:return Math.max(e,8)*Math.max(t,8)/2;case pe:case L:case he:case R:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case me:case ge:case _e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ye:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case be:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case De:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Oe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ke:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ae:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case z:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case je:case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*16;case B:case Pe:return Math.ceil(e/4)*Math.ceil(t/4)*8;case V:case Fe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Xo(e){switch(e){case y:case b:return{byteLength:1,components:1};case S:case x:case E:return{byteLength:2,components:1};case D:case O:return{byteLength:2,components:4};case w:case C:case T:return{byteLength:4,components:1};case A:case j:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Zo(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Qo(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var $o={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new Bn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new K}},envmap:{envMap:{value:null},envMapRotation:{value:new K},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new K}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new K}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new K},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new K},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new K},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new K}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new K}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new K}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Bn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0},uvTransform:{value:new K}},sprite:{diffuse:{value:new Bn(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}}},es={basic:{uniforms:Ma([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:$o.meshbasic_vert,fragmentShader:$o.meshbasic_frag},lambert:{uniforms:Ma([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Bn(0)},envMapIntensity:{value:1}}]),vertexShader:$o.meshlambert_vert,fragmentShader:$o.meshlambert_frag},phong:{uniforms:Ma([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Bn(0)},specular:{value:new Bn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$o.meshphong_vert,fragmentShader:$o.meshphong_frag},standard:{uniforms:Ma([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new Bn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$o.meshphysical_vert,fragmentShader:$o.meshphysical_frag},toon:{uniforms:Ma([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new Bn(0)}}]),vertexShader:$o.meshtoon_vert,fragmentShader:$o.meshtoon_frag},matcap:{uniforms:Ma([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:$o.meshmatcap_vert,fragmentShader:$o.meshmatcap_frag},points:{uniforms:Ma([Z.points,Z.fog]),vertexShader:$o.points_vert,fragmentShader:$o.points_frag},dashed:{uniforms:Ma([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$o.linedashed_vert,fragmentShader:$o.linedashed_frag},depth:{uniforms:Ma([Z.common,Z.displacementmap]),vertexShader:$o.depth_vert,fragmentShader:$o.depth_frag},normal:{uniforms:Ma([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:$o.meshnormal_vert,fragmentShader:$o.meshnormal_frag},sprite:{uniforms:Ma([Z.sprite,Z.fog]),vertexShader:$o.sprite_vert,fragmentShader:$o.sprite_frag},background:{uniforms:{uvTransform:{value:new K},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$o.background_vert,fragmentShader:$o.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new K}},vertexShader:$o.backgroundCube_vert,fragmentShader:$o.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$o.cube_vert,fragmentShader:$o.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$o.equirect_vert,fragmentShader:$o.equirect_frag},distance:{uniforms:Ma([Z.common,Z.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$o.distance_vert,fragmentShader:$o.distance_frag},shadow:{uniforms:Ma([Z.lights,Z.fog,{color:{value:new Bn(0)},opacity:{value:1}}]),vertexShader:$o.shadow_vert,fragmentShader:$o.shadow_frag}};es.physical={uniforms:Ma([es.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new K},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new K},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new K},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new K},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new K},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new K},sheen:{value:0},sheenColor:{value:new Bn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new K},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new K},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new K},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new K},attenuationDistance:{value:0},attenuationColor:{value:new Bn(0)},specularColor:{value:new Bn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new K},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new K},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new K}}]),vertexShader:$o.meshphysical_vert,fragmentShader:$o.meshphysical_frag};var ts={r:0,b:0,g:0},ns=new on,rs=new K;rs.set(-1,0,0,0,1,0,0,0,1);function is(e,t,n,r,i,a){let o=new Bn(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new J(new Y(1,1,1),new za({name:`BackgroundCubeMaterial`,uniforms:ja(es.backgroundCube.uniforms),vertexShader:es.backgroundCube.vertexShader,fragmentShader:es.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ns.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(rs),l.material.toneMapped=Ut.getTransfer(i.colorSpace)!==qe,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new J(new Da(2,2),new za({name:`BackgroundMaterial`,uniforms:ja(es.background.uniforms),vertexShader:es.background.vertexShader,fragmentShader:es.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ut.getTransfer(i.colorSpace)!==qe,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ts,Fa(e)),n.buffers.color.setClear(ts.r,ts.g,ts.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function as(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function os(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ss(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&H(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function cs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Wr,s=new K,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var ls=class extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ji(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Y(5,5,5),i=new za({name:`CubemapFromEquirect`,uniforms:ja(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new J(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=g),new Ao(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},us=256,ds=3,fs=20,ps=256,ms=16,hs=3,gs=new G,_s=new Bn,vs=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ao(1,10,null),this._boxMesh=new J(new Y(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=gs}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(_s));let h=new Ao(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ts(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ws(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(us,At(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?us:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=ys(e,!1,!1),n=Math.log2(e)-ds;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ys(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ts()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ws()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=xs(),this._integrationMaterial=Ss());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/ms);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-hs)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(ps*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Cs());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function ys(e,t,n){return new ls(e,{minFilter:v,generateMipmaps:t,type:E,colorSpace:Ge,depthBuffer:n})}function bs(e,t,n){return new za({name:e,uniforms:t,vertexShader:$o.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function xs(){return bs(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ps}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Ss(){return bs(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:ms}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Cs(){return bs(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${fs}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function ws(){return bs(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Ts(){return bs(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Es(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new ls(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new vs(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new vs(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ds(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&it(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Os(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Cr:Sr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function ks(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function As(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function js(e,t,n){let r=new WeakMap,i=new en;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new rn(h,p,m,u);g.type=T,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new W(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ms(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ns={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Ps(e,t,n,r,i,a){let o=new nn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Ir;u.setAttribute(`position`,new wr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new wr([0,2,0,0,2,0],2));let d=new Ba({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new J(u,d),p=new To(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new nn(t,n,{type:E,depthBuffer:!1,stencilBuffer:!1}),c=new nn(t,n,{type:E,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Xi(t,n),a===!0&&(l.format=te,l.type=k)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Ut.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Ns[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Fs=new $t,Is=new Xi(1,1),Ls=new Zi(1),Rs=new rn,zs=new an,Bs=new Ji,Vs=[],Hs=[],Us=new Float32Array(16),Ws=new Float32Array(9),Gs=new Float32Array(4);function Ks(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Vs[i];if(a===void 0&&(a=new Float32Array(i),Vs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function qs(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Js(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ys(e,t){let n=Hs[t];n===void 0&&(n=new Int32Array(t),Hs[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Xs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Zs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qs(n,t))return;e.uniform2fv(this.addr,t),Js(n,t)}}function Qs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(qs(n,t))return;e.uniform3fv(this.addr,t),Js(n,t)}}function $s(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qs(n,t))return;e.uniform4fv(this.addr,t),Js(n,t)}}function ec(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(qs(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Js(n,t)}else{if(qs(n,r))return;Gs.set(r),e.uniformMatrix2fv(this.addr,!1,Gs),Js(n,r)}}function tc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(qs(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Js(n,t)}else{if(qs(n,r))return;Ws.set(r),e.uniformMatrix3fv(this.addr,!1,Ws),Js(n,r)}}function nc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(qs(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Js(n,t)}else{if(qs(n,r))return;Us.set(r),e.uniformMatrix4fv(this.addr,!1,Us),Js(n,r)}}function rc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qs(n,t))return;e.uniform2iv(this.addr,t),Js(n,t)}}function ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(qs(n,t))return;e.uniform3iv(this.addr,t),Js(n,t)}}function oc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qs(n,t))return;e.uniform4iv(this.addr,t),Js(n,t)}}function sc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qs(n,t))return;e.uniform2uiv(this.addr,t),Js(n,t)}}function lc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(qs(n,t))return;e.uniform3uiv(this.addr,t),Js(n,t)}}function uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qs(n,t))return;e.uniform4uiv(this.addr,t),Js(n,t)}}function dc(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function fc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?dc(Is):Fs,n.setTexture2D(t||a,i)}function pc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||zs,i)}function mc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?dc(Ls):Bs,n.setTextureCube(t||a,i)}function hc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Rs,i)}function gc(e){switch(e){case 5126:return Xs;case 35664:return Zs;case 35665:return Qs;case 35666:return $s;case 35674:return ec;case 35675:return tc;case 35676:return nc;case 5124:case 35670:return rc;case 35667:case 35671:return ic;case 35668:case 35672:return ac;case 35669:case 35673:return oc;case 5125:return sc;case 36294:return cc;case 36295:return lc;case 36296:return uc;case 35678:case 36198:case 36298:case 36306:case 35682:return fc;case 35679:case 36299:case 36307:return pc;case 35680:case 36300:case 36308:case 36293:return mc;case 36289:case 36303:case 36311:case 36292:return hc}}function _c(e,t){e.uniform1fv(this.addr,t)}function vc(e,t){let n=Ks(t,this.size,2);e.uniform2fv(this.addr,n)}function yc(e,t){let n=Ks(t,this.size,3);e.uniform3fv(this.addr,n)}function bc(e,t){let n=Ks(t,this.size,4);e.uniform4fv(this.addr,n)}function xc(e,t){let n=Ks(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Sc(e,t){let n=Ks(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Cc(e,t){let n=Ks(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function wc(e,t){e.uniform1iv(this.addr,t)}function Tc(e,t){e.uniform2iv(this.addr,t)}function Ec(e,t){e.uniform3iv(this.addr,t)}function Dc(e,t){e.uniform4iv(this.addr,t)}function Oc(e,t){e.uniform1uiv(this.addr,t)}function kc(e,t){e.uniform2uiv(this.addr,t)}function Ac(e,t){e.uniform3uiv(this.addr,t)}function jc(e,t){e.uniform4uiv(this.addr,t)}function Mc(e,t,n){let r=this.cache,i=t.length,a=Ys(n,i);qs(r,a)||(e.uniform1iv(this.addr,a),Js(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?dc(Is):Fs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Nc(e,t,n){let r=this.cache,i=t.length,a=Ys(n,i);qs(r,a)||(e.uniform1iv(this.addr,a),Js(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||zs,a[e])}function Pc(e,t,n){let r=this.cache,i=t.length,a=Ys(n,i);qs(r,a)||(e.uniform1iv(this.addr,a),Js(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?dc(Ls):Bs;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Fc(e,t,n){let r=this.cache,i=t.length,a=Ys(n,i);qs(r,a)||(e.uniform1iv(this.addr,a),Js(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Rs,a[e])}function Ic(e){switch(e){case 5126:return _c;case 35664:return vc;case 35665:return yc;case 35666:return bc;case 35674:return xc;case 35675:return Sc;case 35676:return Cc;case 5124:case 35670:return wc;case 35667:case 35671:return Tc;case 35668:case 35672:return Ec;case 35669:case 35673:return Dc;case 5125:return Oc;case 36294:return kc;case 36295:return Ac;case 36296:return jc;case 35678:case 36198:case 36298:case 36306:case 35682:return Mc;case 35679:case 36299:case 36307:return Nc;case 35680:case 36300:case 36308:case 36293:return Pc;case 36289:case 36303:case 36311:case 36292:return Fc}}var Lc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gc(t.type)}},Rc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ic(t.type)}},zc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Bc=/(\w+)(\])?(\[|\.)?/g;function Vc(e,t){e.seq.push(t),e.map[t.id]=t}function Hc(e,t,n){let r=e.name,i=r.length;for(Bc.lastIndex=0;;){let a=Bc.exec(r),o=Bc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Vc(n,l===void 0?new Lc(s,e,t):new Rc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new zc(s),Vc(n,e)),n=e}}}var Uc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Hc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Wc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Gc=37297,Kc=0;function qc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Jc=new K;function Yc(e){Ut._getMatrix(Jc,Ut.workingColorSpace,e);let t=`mat3( ${Jc.elements.map(e=>e.toFixed(4))} )`;switch(Ut.getTransfer(e)){case Ke:return[t,`LinearTransferOETF`];case qe:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Xc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+qc(e.getShaderSource(t),r)}return i}function Zc(e,t){let n=Yc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Qc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function $c(e,t){let n=Qc[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var el=new G;function tl(){return Ut.getLuminanceCoefficients(el),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${el.x.toFixed(4)}, ${el.y.toFixed(4)}, ${el.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function nl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(al).join(`
`)}function rl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function il(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function al(e){return e!==``}function ol(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function sl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var cl=/^[ \t]*#include +<([\w\d./]+)>/gm;function ll(e){return e.replace(cl,ul)}function ul(e,t){let n=$o[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return ll(n)}var dl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fl(e){return e.replace(dl,pl)}function pl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ml(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var hl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function gl(e){return hl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var _l={302:`ENVMAP_MODE_REFRACTION`};function vl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:_l[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var yl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function bl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:yl[e.combine]||`ENVMAP_BLENDING_NONE`}function xl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=gl(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=vl(n),d=bl(n),f=nl(n),p=rl(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(al).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(al).join(`
`),g.length>0&&(g+=`
`)):(h=[ml(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(al).join(`
`),g=[ml(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:$o.tonemapping_pars_fragment,n.toneMapping===0?``:$c(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,$o.colorspace_pars_fragment,Zc(`linearToOutputTexel`,n.outputColorSpace),tl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(al).join(`
`)),o=ll(o),o=ol(o,n),o=sl(o,n),s=ll(s),s=ol(s,n),s=sl(s,n),o=fl(o),s=fl(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Wc(i,i.VERTEX_SHADER,v),x=Wc(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Xc(i,b,`vertex`),n=Xc(i,x,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Uc(i,m),w=il(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Gc)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Kc++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Sl=0,Cl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new wl(e),t.set(e,n)),n}},wl=class{constructor(e){this.id=Sl++,this.code=e,this.usedTimes=0}};function Tl(e){return e===1030||e===37490||e===36285}function El(e,t,n,r,i,a){let o=new _n,s=new Cl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=es[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,ee=!!i.map,P=!!i.matcap,te=!!b,ne=te&&b.isPMREMTexture===!0,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,F=!!i.displacementMap,se=!!i.emissiveMap,I=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.diffuseRoughness>0,fe=i.dispersion>0,pe=i.retroreflectivity>0,L=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,R=le&&!!i.anisotropyMap,ge=ue&&!!i.clearcoatMap,_e=ue&&!!i.clearcoatNormalMap,ve=ue&&!!i.clearcoatRoughnessMap,ye=de&&!!i.diffuseRoughnessMap,be=L&&!!i.iridescenceMap,xe=L&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,Ee=!!i.specularIntensityMap,De=he&&!!i.transmissionMap,Oe=he&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,z=i.alphaTest>0,je=!!i.alphaHash,Me=!!i.extensions,Ne=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let B=ne?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Pe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ut.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:P,envMap:te,envMapMode:te&&b.mapping,envMapPMREM:ne,envMapMaxLod:ne?B.length-1:null,envMapSize:ne?B[0].width:null,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:F,emissiveMap:se,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&Tl(i.normalMap.format),metalnessMap:I,roughnessMap:ce,anisotropy:le,anisotropyMap:R,clearcoat:ue,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:ve,diffuseRoughness:de,diffuseRoughnessMap:ye,dispersion:fe,retroreflection:pe,iridescence:L,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:Ee,transmission:he,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:z,alphaHash:je,combine:i.combine,mapUv:ee&&p(i.map.channel),aoMapUv:re&&p(i.aoMap.channel),lightMapUv:ie&&p(i.lightMap.channel),bumpMapUv:ae&&p(i.bumpMap.channel),normalMapUv:oe&&p(i.normalMap.channel),displacementMapUv:F&&p(i.displacementMap.channel),emissiveMapUv:se&&p(i.emissiveMap.channel),metalnessMapUv:I&&p(i.metalnessMap.channel),roughnessMapUv:ce&&p(i.roughnessMap.channel),anisotropyMapUv:R&&p(i.anisotropyMap.channel),clearcoatMapUv:ge&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:_e&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ye&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:be&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&p(i.sheenRoughnessMap.channel),specularMapUv:we&&p(i.specularMap.channel),specularColorMapUv:Te&&p(i.specularColorMap.channel),specularIntensityMapUv:Ee&&p(i.specularIntensityMap.channel),transmissionMapUv:De&&p(i.transmissionMap.channel),thicknessMapUv:Oe&&p(i.thicknessMap.channel),alphaMapUv:Ae&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(oe||le),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(ee||Ae),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&Ut.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&Ut.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=es[t];n=Ia.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new xl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function Dl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ol(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function kl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Al(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ol),r.length>1&&r.sort(t||kl),i.length>1&&i.sort(t||kl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function jl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Al,e.set(t,[i])):n>=r.length?(i=new Al,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Ml(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new Bn};break;case`SpotLight`:n={position:new G,direction:new G,color:new Bn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new Bn,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new Bn,groundColor:new Bn};break;case`RectAreaLight`:n={color:new Bn,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function Nl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Pl=0;function Fl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Il(e){let t=new Ml,n=Nl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new on,o=new on;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Fl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Pl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Ll(e){let t=new Il(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Rl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ll(e),t.set(n,[a])):r>=i.length?(a=new Ll(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var zl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Vl=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],Hl=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Ul=new on,Wl=new G,Gl=new G;function Kl(e,t,n){let r=new Mi,i=new W,a=new W,o=new en,s=new Ha,c=new Ua,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new za({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:zl,fragmentShader:Bl}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let h=new Ir;h.setAttribute(`position`,new xr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new J(h,f),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let m=y!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let h=d.getFrameExtents();i.multiply(h),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/h.x),i.x=a.x*h.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/h.y),i.y=a.y*h.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new nn(i.x,i.y,{format:ie,type:E,minFilter:g,magFilter:g,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Xi(i.x,i.y,T),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=P,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=p,d.map.depthTexture.magFilter=p}else l.isPointLight?(d.map=new ls(i.x),d.map.depthTexture=new Zi(i.x,w)):(d.map=new nn(i.x,i.y),d.map.depthTexture=new Xi(i.x,i.y,w)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=P,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=g,d.map.depthTexture.magFilter=g):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=p,d.map.depthTexture.magFilter=p);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let y=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Wl.setFromMatrixPosition(l.matrixWorld),e.position.copy(Wl),Gl.copy(e.position),Gl.add(Vl[t]),e.up.copy(Hl[t]),e.lookAt(Gl),e.updateMatrixWorld(),n.makeTranslation(-Wl.x,-Wl.y,-Wl.z),Ul.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Ul,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,y,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new nn(i.x,i.y,{format:ie,type:E}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,C)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=x(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)S(l[e],i,a,o,s,c)}function C(e){e.target.removeEventListener(`dispose`,C);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ql(e,t){function n(){let t=!1,n=new en,r=null,i=new en(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?I(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ot[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?I(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Bn(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(P)[1]),N=ee>=1);let te=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new en().fromArray(re),oe=new en().fromArray(ie);function F(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=F(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=F(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=F(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=F(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),I(e.DEPTH_TEST),o.setFunc(3),he(!1),R(1),I(e.CULL_FACE),L(0);function I(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function L(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ce(e.BLEND),g=!1);else if(g===!1&&(I(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?ce(e.CULL_FACE):I(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?L(0):L(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),_e(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?I(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function R(t){t===0?ce(e.CULL_FACE):(I(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ge(t){t!==k&&(N&&e.lineWidth(t),k=t)}function _e(t,n,r){t?(I(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function ve(t){t?I(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function ye(t){t===void 0&&(t=e.TEXTURE0+M-1),te!==t&&(e.activeTexture(t),te=t)}function be(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+M-1:te);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function xe(){let t=ne[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function z(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function B(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Pe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function V(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,ne={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Bn(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:I,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:L,setMaterial:me,setFlipSided:he,setCullFace:R,setLineWidth:ge,setPolygonOffset:_e,setScissorTest:ve,activeTexture:ye,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:Ae,texImage3D:z,pixelStorei:Me,getParameter:je,updateUBOMapping:Pe,uniformBlockBinding:V,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:Ne,viewport:B,reset:Fe}}function Jl(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new W,y=new WeakMap,b=new Set,x,S=new WeakMap,C=new Set,w=new FinalizationRegistry(e=>C.delete(e)),T=!1;try{T=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function E(e,t){return T?new OffscreenCanvas(e,t):$e(`canvas`)}function D(e,t,n){let r=1,i=Fe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=E(n,a));let o=t?E(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function O(e){return e.generateMipmaps}function k(t){e.generateMipmap(t)}function A(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function j(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ke:Ut.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function M(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function N(e,t){return O(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ee(e){let t=new WeakRef(e);r.get(e).__ref=t,C.add(t),w.register(e,t,t)}function P(e){let t=r.get(e).__ref;t!==void 0&&(C.delete(t),w.unregister(t))}function ne(e){ie(e.target)}function re(e){ae(e.target)}function ie(e){e.removeEventListener(`dispose`,ne),P(e),F(e),e.isVideoTexture&&y.delete(e),e.isHTMLTexture&&b.delete(e)}function ae(e){e.removeEventListener(`dispose`,re),P(e),I(e)}function oe(){for(let e of C){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ae(t):ie(t))}C.clear(),b.clear()}function F(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&se(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function se(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function I(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&ie(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let ce=0;function le(){ce=0}function ue(){return ce}function de(e){ce=e}function fe(){let e=ce;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ce+=1,e}function pe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function L(t,i){let a=r.get(t);if(t.isVideoTexture&&Pe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function he(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function R(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?we(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ge={[u]:e.REPEAT,[d]:e.CLAMP_TO_EDGE,[f]:e.MIRRORED_REPEAT},_e={[p]:e.NEAREST,[m]:e.NEAREST_MIPMAP_NEAREST,[h]:e.NEAREST_MIPMAP_LINEAR,[g]:e.LINEAR,[_]:e.LINEAR_MIPMAP_NEAREST,[v]:e.LINEAR_MIPMAP_LINEAR},ve={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ye(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ge[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ge[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ge[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,_e[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,_e[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ve[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function be(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ne),ee(n));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=pe(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&se(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function xe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=xe(n.start,r.width,4),c=xe(t.start,r.width,4);n.start<=i+1&&a===c&&xe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function Ce(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=be(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Ut.getPrimaries(Ut.workingColorSpace),r=o.colorSpace===``?null:Ut.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=D(o.image,!1,i.maxTextureSize);t=V(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);ye(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,_=d.__version===void 0||l===!0,v=u.dataReady,y=N(o,t);if(o.isDepthTexture)p=M(o.format===te,o.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height),v&&Se(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023){if(r!==null){if(g){if(v){if(o.layerUpdates.size>0){let t=Yo(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}}else if(o.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,t.width,t.height,t.depth),v){if(o.layerUpdates.size>0){let i=Yo(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data)}else if(o.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,p,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Fe(h[0]);n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(_){let r=Fe(t);n.texStorage2D(e.TEXTURE_2D,y,p,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);O(o)&&o.mipmapsAutoUpdate===!0&&k(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function we(t,o,s){if(o.image.length!==6)return;let c=be(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Ut.getPrimaries(Ut.workingColorSpace),r=o.colorSpace===``?null:Ut.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=D(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=V(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=j(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=N(o,h);ye(e.TEXTURE_CUBE_MAP,o);let C;if(o.isDepthTexture){if(v=M(o.format===te,o.type),b){if(y)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,h.width,h.height,0,g,_,null)}}else if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=Fe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}O(o)&&o.mipmapsAutoUpdate===!0&&k(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Te(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ne(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=M(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;B(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=j(o.internalFormat,c,l,o.normalized,o.colorSpace);B(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function De(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?R(i.depthTexture,0):L(i.depthTexture,0);let u=c.__webglTexture,d=Ne(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Oe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)De(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?De(i.__webglFramebuffer[0],t,0):De(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ee(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ee(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ke(t,n,i){let a=r.get(t);n!==void 0&&Te(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Oe(t)}function Ae(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,re),ee(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&B(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=j(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ee(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ye(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Te(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Te(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);O(i)?k(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ye(c,a),Te(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),O(a)&&k(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ye(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Te(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Te(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);O(i)?k(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Oe(t)}function z(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(O(a)&&a.mipmapsAutoUpdate===!0){let t=A(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),k(t),n.unbindTexture()}}}let je=[];function Me(t){if(t.samples>0){if(B(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(je.length=0,je.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&je.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,je))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(i.maxSamples,e.samples)}function B(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Pe(e){let t=o.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function V(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ut.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function Fe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=fe,this.resetTextureUnits=le,this.getTextureUnits=ue,this.setTextureUnits=de,this.setTexture2D=L,this.setTexture2DArray=me,this.setTexture3D=he,this.setTextureCube=R,this.rebindTextures=ke,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=B,this.dispose=oe}function Yl(e,t){function n(n,r=``){let i,a=Ut.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Xl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ql=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new za({vertexShader:Xl,fragmentShader:Zl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new Da(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},$l=class extends st{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Ql,g={},_=t.getContextAttributes(),v=null,b=null,x=[],S=[],C=new W,T=null,E=null,D=new wo;D.viewport=new en;let O=new wo;O.viewport=new en;let A=[D,O],j=new jo,M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new Fn,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new Fn,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new Fn,x[e]=t),t.getHandSpace()};function ne(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function re(){r.removeEventListener(`select`,ne),r.removeEventListener(`selectstart`,ne),r.removeEventListener(`selectend`,ne),r.removeEventListener(`squeeze`,ne),r.removeEventListener(`squeezestart`,ne),r.removeEventListener(`squeezeend`,ne),r.removeEventListener(`end`,re),r.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}M=null,N=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,b=null,I.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(C.width,C.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,ne),r.addEventListener(`selectstart`,ne),r.addEventListener(`selectend`,ne),r.addEventListener(`squeeze`,ne),r.addEventListener(`squeezestart`,ne),r.addEventListener(`squeezeend`,ne),r.addEventListener(`end`,re),r.addEventListener(`inputsourceschange`,ie),_.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(C),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?te:P,a=_.stencil?k:w);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new nn(d.textureWidth,d.textureHeight,{format:ee,type:y,depthTexture:new Xi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new nn(f.framebufferWidth,f.framebufferHeight,{format:ee,type:y,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),I.setContext(r),I.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),j.near=O.near=D.near=t,j.far=O.far=D.far=n,(M!==j.near||N!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,N=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&-5,O.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ae(j,i);for(let e=0;e<a.length;e++)ae(a[e],i);j.projectionMatrix.copy(D.projectionMatrix),j.projectionMatrixInverse.copy(D.projectionMatrixInverse),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,j,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=dt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(e){return g[e]};let F=null;function se(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=A[n];o===void 0&&(o=new wo,o.layers.enable(n),o.viewport=new en,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Qi,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}F&&F(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let I=new Zo;I.setAnimationLoop(se),this.setAnimationLoop=function(e){F=e},this.dispose=function(){}}},eu=new on,tu=new K;tu.set(-1,0,0,0,1,0,0,0,1);function nu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Fa(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(eu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(tu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function ru(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var iu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),au=null;function ou(){return au===null&&(au=new Oi(iu,16,16,ie,E),au.name=`DFG_LUT`,au.minFilter=g,au.magFilter=g,au.wrapS=d,au.wrapT=d,au.generateMipmaps=!1,au.needsUpdate=!0),au}var su=class{constructor(e={}){let{canvas:t=et(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=y}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([oe,ae,re]),g=new Set([y,w,S,k,D,O]),_=new Uint32Array(4),b=new Int32Array(4),x={textures:[],min:[],max:[],resolution:[]},C=null,T=null,A=[],j=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,ee=!1,P=null,te=null,ne=null,ie=null;this._outputColorSpace=We;let F=0,se=0,I=null,ce=-1,le=null,ue=new en,de=new en,fe=null,pe=new Bn(0),L=0,me=t.width,he=t.height,R=1,ge=null,_e=null,ve=new en(0,0,me,he),ye=new en(0,0,me,he),be=!1,xe=new Mi,Se=new Pi,Ce=!1,we=!1,Te=new on,Ee=new G,De=new en,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Ae(){return I===null?R:1}let z=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,B,Pe,V,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,Ge,Ke,qe,Je,Ye,Ze,Qe,$e,tt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,ot,!1),t.addEventListener(`webglcontextrestored`,st,!1),t.addEventListener(`webglcontextcreationerror`,ct,!1),z===null){let t=`webgl2`;if(z=je(t,e),z===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}rt()}catch(e){throw t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),U(`WebGLRenderer: `+e.message),e}function rt(){Me=new Ds(z),Me.init(),Qe=new Yl(z,Me),Ne=new ss(z,Me,e,Qe),B=new ql(z,Me),Ne.reversedDepthBuffer&&d&&B.buffers.depth.setReversed(!0),te=z.createFramebuffer(),ne=z.createFramebuffer(),ie=z.createFramebuffer(),Pe=new As(z),V=new Dl,Fe=new Jl(z,Me,B,V,Ne,Qe,Pe),Ie=new Es(N),Le=new Qo(z),$e=new as(z,Le),Re=new Os(z,Le,Pe,$e),ze=new Ms(z,Re,Le,$e,Pe),Je=new js(z,Ne,Fe),Ge=new cs(V),Be=new El(N,Ie,Me,Ne,$e,Ge),Ve=new nu(N,V),He=new jl,Ue=new Rl(Me),qe=new is(N,Ie,B,ze,p,s),Ke=new Kl(N,ze,Ne),tt=new ru(z,Pe,Ne,B),Ye=new os(z,Me,Pe),Ze=new ks(z,Me,Pe),Pe.programs=Be.programs,N.capabilities=Ne,N.extensions=Me,N.properties=V,N.renderLists=He,N.shadowMap=Ke,N.state=B,N.info=Pe}m!==1009&&(M=new Ps(m,t.width,t.height,o,r,i));let it=new $l(N,z);this.xr=it,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(e){e!==void 0&&(R=e,this.setSize(me,he,!1))},this.getSize=function(e){return e.set(me,he)},this.setSize=function(e,n,r=!0){it.isPresenting?H(`WebGLRenderer: Can't change size while VR device is presenting.`):(me=e,he=n,t.width=Math.floor(e*R),t.height=Math.floor(n*R),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(me*R,he*R).floor()},this.setDrawingBufferSize=function(e,n,r){me=e,he=n,R=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}M.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ue)},this.getViewport=function(e){return e.copy(ve)},this.setViewport=function(e,t,n,r){e.isVector4?ve.set(e.x,e.y,e.z,e.w):ve.set(e,t,n,r),B.viewport(ue.copy(ve).multiplyScalar(Ae()).round())},this.getScissor=function(e){return e.copy(ye)},this.setScissor=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),B.scissor(de.copy(ye).multiplyScalar(Ae()).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(e){B.setScissorTest(be=e)},this.setOpaqueSort=function(e){ge=e},this.setTransparentSort=function(e){_e=e},this.getClearColor=function(e){return e.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(I!==null){let t=I.texture.format;e=h.has(t)}if(e){let e=I.texture.type,t=g.has(e),n=qe.getClearColor(),r=qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,z.clearBufferuiv(z.COLOR,0,_)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,z.clearBufferiv(z.COLOR,0,b))}else r|=z.COLOR_BUFFER_BIT}t&&(r|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&z.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),P=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),qe.dispose(),He.dispose(),Ue.dispose(),Fe.dispose(),V.dispose(),Ie.dispose(),ze.dispose(),Re.dispose(),$e.dispose(),tt.dispose(),Be.dispose(),it.dispose(),it.removeEventListener(`sessionstart`,ht),it.removeEventListener(`sessionend`,gt),_t.stop()};function ot(e){e.preventDefault(),nt(`WebGLRenderer: Context Lost.`),ee=!0}function st(){nt(`WebGLRenderer: Context Restored.`),ee=!1;let e=Pe.autoReset,t=Ke.enabled,n=Ke.autoUpdate,r=Ke.needsUpdate,i=Ke.type;rt(),Pe.autoReset=e,Ke.enabled=t,Ke.autoUpdate=n,Ke.needsUpdate=r,Ke.type=i}function ct(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function lt(e){let t=e.target;t.removeEventListener(`dispose`,lt),ut(t)}function ut(e){dt(e),V.remove(e)}function dt(e){let t=V.get(e).programs;t!==void 0&&(t.forEach(function(e){Be.releaseProgram(e)}),e.isShaderMaterial&&Be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Oe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);B.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Re.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;$e.setup(i,r,s,n,c);let h,g=Ye;if(c!==null&&(h=Le.get(c),g=Ze,g.setIndex(h)),i.isMesh)r.wireframe===!0?(B.setLineWidth(r.wireframeLinewidth*Ae()),g.setMode(z.LINES)):g.setMode(z.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),B.setLineWidth(e*Ae()),i.isLineSegments?g.setMode(z.LINES):i.isLineLoop?g.setMode(z.LINE_LOOP):g.setMode(z.LINE_STRIP)}else i.isPoints?g.setMode(z.POINTS):i.isSprite&&g.setMode(z.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Le.get(c).bytesPerElement:1,o=V.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(z,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ft(e,t,n,r){P!==null&&e.isNodeMaterial&&P.setObject(r,e),Ce===!0&&Ge.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,wt(e,t,r),e.side=0,e.needsUpdate=!0,wt(e,t,r),e.side=2):wt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),P!==null&&P.renderStart(e,t,n),T=Ue.get(n),T.init(t),j.push(T),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(T.pushLight(e),e.castShadow&&T.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(T.pushLight(e),e.castShadow&&T.pushShadow(e))}),T.setupLights(),P!==null&&P.updateLights(T.state.lightsArray),we=this.localClippingEnabled,Ce=Ge.init(this.clippingPlanes,we),Ce===!0&&Ge.setGlobalState(this.clippingPlanes,t),P!==null&&Ke.render(T.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ft(o,n,t,e),r.add(o)}else ft(i,n,t,e),r.add(i)}}),T=j.pop(),P!==null&&P.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=V.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let pt=null;function mt(e){pt&&pt(e)}function ht(){_t.stop()}function gt(){_t.start()}let _t=new Zo;_t.setAnimationLoop(mt),typeof self<`u`&&_t.setContext(self),this.setAnimationLoop=function(e){pt=e,it.setAnimationLoop(e),e===null?_t.stop():_t.start()},it.addEventListener(`sessionstart`,ht),it.addEventListener(`sessionend`,gt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;P!==null&&P.renderStart(e,t);let n=it.enabled===!0&&it.isPresenting===!0,r=M!==null&&(I===null||n)&&M.begin(N,I);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(t),t=it.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,I),T=Ue.get(e,j.length),T.init(t),T.state.textureUnits=Fe.getTextureUnits(),j.push(T),Te.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Se.setFromArrayCamera(t):xe.setFromProjectionMatrix(Te,Xe,t.reversedDepth),we=this.localClippingEnabled,Ce=Ge.init(this.clippingPlanes,we),C=He.get(e,A.length),C.init(),A.push(C),this.info.render.frame++,it.enabled===!0&&it.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&vt(e,t,-1/0,N.sortObjects)}vt(e,t,0,N.sortObjects),C.finish(),P!==null&&P.updateLights(T.state.lightsArray),N.sortObjects===!0&&C.sort(ge,_e),ke=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,ke&&qe.addToRenderList(C,e),this.info.autoReset===!0&&this.info.reset(),Ce===!0&&Ge.beginShadows();let i=T.state.shadowsArray;if(Ke.render(i,e,t),Ce===!0&&Ge.endShadows(),(r&&M.hasRenderPass())===!1){let n=C.opaque,r=C.transmissive;if(T.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];bt(n,r,e,a)}ke&&qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];yt(C,e,n,n.viewport)}}else r.length>0&&bt(n,r,e,t),ke&&qe.render(e),yt(C,e,t)}I!==null&&se===0&&(Fe.updateMultisampleRenderTarget(I),Fe.updateRenderTargetMipmap(I)),r&&M.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),$e.resetDefaultState(),ce=-1,le=null,j.pop(),j.length>0?(T=j[j.length-1],Fe.setTextureUnits(T.state.textureUnits),Ce===!0&&Ge.setGlobalState(N.clippingPlanes,T.state.camera)):T=null,A.pop(),C=A.length>0?A[A.length-1]:null,P!==null&&P.renderEnd()};function vt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)T.pushLight(e),e.castShadow&&T.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Se:xe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&De.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Te);let i=ze.update(e),a=e.material;a.visible&&C.push(e,i,a,n,De.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Se:xe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),De.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),De.copy(e.boundingSphere.center)),De.applyMatrix4(e.matrixWorld).applyMatrix4(Te)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&C.push(e,i,c,n,De.z,s,t)}}else a.visible&&C.push(e,i,a,n,De.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)vt(i[e],t,n,r)}function yt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;T.setupLightsView(n),Ce===!0&&Ge.setGlobalState(N.clippingPlanes,n),r&&B.viewport(ue.copy(r)),i.length>0&&xt(i,t,n),a.length>0&&xt(a,t,n),o.length>0&&xt(o,t,n),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function bt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);T.state.transmissionRenderTarget[r.id]=new nn(1,1,{generateMipmaps:!0,type:e?E:y,minFilter:v,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ut.workingColorSpace})}let a=T.state.transmissionRenderTarget[r.id],o=r.viewport||ue;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),c=N.getActiveCubeFace(),l=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(pe),L=N.getClearAlpha(),L<1&&N.setClearColor(16777215,.5),N.clear(),ke&&qe.render(n);let u=N.toneMapping;N.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),T.setupLightsView(r),Ce===!0&&Ge.setGlobalState(N.clippingPlanes,r),xt(e,n,r),Fe.updateMultisampleRenderTarget(a),Fe.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,St(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Fe.updateMultisampleRenderTarget(a),Fe.updateRenderTargetMipmap(a))}N.setRenderTarget(s,c,l),N.setClearColor(pe,L),d!==void 0&&(r.viewport=d),N.toneMapping=u}function xt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&St(o,t,n,s,l,c)}}function St(e,t,n,r,i,a){P!==null&&i.isNodeMaterial&&P.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function Ct(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function wt(e,t,n){t.isScene!==!0&&(t=Oe);let r=V.get(e),i=T.state.lights,a=T.state.shadowsArray,o=i.state.version,s=Be.getParameters(e,i.state,a,t,n,T.state.lightProbeGridArray),c=Be.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ie.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,lt),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=Be.getUniforms(e),P!==null&&e.isNodeMaterial&&P.build(e,n,s),e.onBeforeCompile(s,N),d=Be.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ge.uniform),Dt(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=Ct(T.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Tt(e,t,n,r,i){let a=V.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=wt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Et(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Uc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=V.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=Oe),Fe.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=I===null?N.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ut.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ie.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=V.get(r),y=T.state.lights;if(Ce===!0&&(we===!0||e!==le)){let t=e===le&&r.id===ce;Ge.setState(r,e,t)}let b=!1,S=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ge.numPlanes||v.numIntersection!==Ge.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===Ct(T.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(S=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let C=v.currentProgram;(b===!0||S===!0)&&(C=S===!0?Tt(r,t,i,s,h):wt(r,t,i),P&&r.isNodeMaterial&&P.onUpdateProgram(r,C,v));let w=!1,E=!1,D=!1,O=C.getUniforms(),k=v.uniforms;if(B.useProgram(C.program)&&(w=!0,E=!0,D=!0),r.id!==ce&&(ce=r.id,E=!0),w||le!==e){B.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(z,`projectionMatrix`,e.projectionMatrix),O.setValue(z,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(z,Ee.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&O.setValue(z,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(z,`isOrthographic`,e.isOrthographicCamera===!0),le!==e&&(le=e,E=!0,D=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(z,`sunShadowMap`,y.state.sunShadowMap,Fe),y.state.directionalShadowMap.length>0&&O.setValue(z,`directionalShadowMap`,y.state.directionalShadowMap,Fe),y.state.spotShadowMap.length>0&&O.setValue(z,`spotShadowMap`,y.state.spotShadowMap,Fe),y.state.pointShadowMap.length>0&&O.setValue(z,`pointShadowMap`,y.state.pointShadowMap,Fe)),i.isSkinnedMesh){O.setOptional(z,i,`bindMatrix`),O.setOptional(z,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(z,`boneTexture`,e.boneTexture,Fe))}i.isBatchedMesh&&(O.setOptional(z,i,`batchingTexture`),O.setValue(z,`batchingTexture`,i._matricesTexture,Fe),O.setOptional(z,i,`batchingIdTexture`),O.setValue(z,`batchingIdTexture`,i._indirectTexture,Fe),O.setOptional(z,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(z,`batchingColorTexture`,i._colorsTexture,Fe));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Je.update(i,n,C),(E||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(z,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=ou()),E){if(O.setValue(z,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&kt(k,D),a&&r.fog===!0&&Ve.refreshFogUniforms(k,a),Ve.refreshMaterialUniforms(k,r,R,he,T.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=x,t=0;for(let n of T.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;k.probesSH.value=e.textures,k.probesMin.value=e.min,k.probesMax.value=e.max,k.probesResolution.value=e.resolution}Uc.upload(z,Et(v),k,Fe)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Uc.upload(z,Et(v),k,Fe),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(z,`center`,i.center),O.setValue(z,`modelViewMatrix`,i.modelViewMatrix),O.setValue(z,`normalMatrix`,i.normalMatrix),O.setValue(z,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];tt.update(n,C),tt.bind(n,C)}}return C}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(e,t,n){let r=V.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),V.get(e.texture).__webglTexture=t,V.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=V.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){I=e,F=t,se=n;let r=null,i=!1,a=!1;if(e){let o=V.get(e);if(o.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(z.FRAMEBUFFER,o.__webglFramebuffer),ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest,B.viewport(ue),B.scissor(de),B.setScissorTest(fe),ce=-1;return}if(o.__webglFramebuffer===void 0)Fe.setupRenderTarget(e);else if(o.__hasExternalTextures)Fe.rebindTextures(e,V.get(e.texture).__webglTexture,V.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&V.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Fe.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=V.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Fe.useMultisampledRTT(e)===!1?V.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest}else ue.copy(ve).multiplyScalar(R).floor(),de.copy(ye).multiplyScalar(R).floor(),fe=be;if(n!==0&&(r=te),B.bindFramebuffer(z.FRAMEBUFFER,r)&&B.drawBuffers(e,r),B.viewport(ue),B.scissor(de),B.setScissorTest(fe),i){let r=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=V.get(e.textures[t]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,t.__webglTexture,n)}ce=-1};function jt(e){let t=V.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){B.bindFramebuffer(z.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&z.readPixels(t,n,r,i,Qe.convert(c),Qe.convert(l),a)}finally{let e=I===null?null:V.get(I).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){B.bindFramebuffer(z.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.bufferData(z.PIXEL_PACK_BUFFER,a.byteLength,z.STREAM_READ),z.readPixels(t,n,r,i,Qe.convert(l),Qe.convert(u),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let p=I===null?null:V.get(I).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,p);let m=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await at(z,m,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,a),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(f),z.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Fe.setTexture2D(e,0),z.copyTexSubImage2D(z.TEXTURE_2D,n,0,0,o,s,i,a),B.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Qe.convert(t.format),_=Qe.convert(t.type),v;t.isData3DTexture?(Fe.setTexture3D(t,0),v=z.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Fe.setTexture2DArray(t,0),v=z.TEXTURE_2D_ARRAY):(Fe.setTexture2D(t,0),v=z.TEXTURE_2D),B.activeTexture(z.TEXTURE0),B.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,t.flipY),B.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),B.pixelStorei(z.UNPACK_ALIGNMENT,t.unpackAlignment);let y=B.getParameter(z.UNPACK_ROW_LENGTH),b=B.getParameter(z.UNPACK_IMAGE_HEIGHT),x=B.getParameter(z.UNPACK_SKIP_PIXELS),S=B.getParameter(z.UNPACK_SKIP_ROWS),C=B.getParameter(z.UNPACK_SKIP_IMAGES);B.pixelStorei(z.UNPACK_ROW_LENGTH,h.width),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,h.height),B.pixelStorei(z.UNPACK_SKIP_PIXELS,l),B.pixelStorei(z.UNPACK_SKIP_ROWS,u),B.pixelStorei(z.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=V.get(e),r=V.get(t),h=V.get(n.__renderTarget),g=V.get(r.__renderTarget);B.bindFramebuffer(z.READ_FRAMEBUFFER,h.__webglFramebuffer),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(e).__webglTexture,i,d+n),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(t).__webglTexture,a,m+n)),z.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,z.DEPTH_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||V.has(e)){let n=V.get(e),r=V.get(t);B.bindFramebuffer(z.READ_FRAMEBUFFER,ne),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,ie);for(let e=0;e<c;e++)w?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,n.__webglTexture,i),T?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,r.__webglTexture,a),i===0?T?z.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):z.copyTexSubImage2D(v,a,f,p,l,u,o,s):z.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,z.COLOR_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?z.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h);B.pixelStorei(z.UNPACK_ROW_LENGTH,y),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,b),B.pixelStorei(z.UNPACK_SKIP_PIXELS,x),B.pixelStorei(z.UNPACK_SKIP_ROWS,S),B.pixelStorei(z.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&z.generateMipmap(v),B.unbindTexture()},this.initRenderTarget=function(e){V.get(e).__webglFramebuffer===void 0&&Fe.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Fe.setTextureCube(e,0):e.isData3DTexture?Fe.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Fe.setTexture2DArray(e,0):Fe.setTexture2D(e,0),B.unbindTexture()},this.resetState=function(){F=0,se=0,I=null,B.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Xe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ut._getUnpackColorSpace()}},cu={uno:{id:`uno`,icon:`🎛️`,name:{th:`บอร์ดไมโครคอนโทรลเลอร์ Arduino Uno R3`,en:`Arduino Uno R3 Microcontroller Board`},category:{th:`หน่วยประมวลผลและควบคุมหลัก`,en:`Core Microcontroller Unit (MCU)`},packageType:{th:`ATmega328P-PU (DIP-28 Socket) บน PCB มาตรฐาน Uno`,en:`ATmega328P-PU (DIP-28 Socket) on Uno Form-Factor PCB`},ratings:{th:`แรงดันลอจิก 5V | กระแสต่อพิน ≤ 20 mA (สูงสุด 40 mA) | ADC 10-bit (0–1023) | PWM 8-bit (0–255) | Clock 16 MHz`,en:`5V Logic | ≤ 20 mA per I/O pin (40 mA abs max) | 10-bit ADC (0–1023) | 8-bit PWM (0–255) | 16 MHz Clock`},pins:[{name:`D0–D13 (DIGITAL)`,badgeColor:`#0284c7`,desc:{th:`พินดิจิทัลรับ/ส่งลอจิก HIGH (5V) หรือ LOW (0V) โดยพินที่มีเครื่องหมาย ~ (D3, D5, D6, D9, D10, D11) รองรับสัญญาณ PWM 8-bit`,en:`Digital I/O pins (HIGH=5V, LOW=0V). Pins marked with ~ (D3, D5, D6, D9, D10, D11) support 8-bit hardware PWM.`}},{name:`A0–A5 (ANALOG IN)`,badgeColor:`#7c3aed`,desc:{th:`พินอ่านแรงดันแอนะล็อก 0–5V เข้าสู่วงจร ADC 10 บิต แปลงเป็นค่าตัวเลข 0–1023 (A4=SDA, A5=SCL สำหรับบัส I2C)`,en:`Analog inputs connected to a 10-bit Successive Approximation ADC (0–5V → 0–1023). A4=SDA and A5=SCL also serve I2C.`}},{name:`5V / 3.3V / VIN`,badgeColor:`#dc2626`,desc:{th:`ขั้วจ่ายไฟเลี้ยงวงจรเซนเซอร์ขนาดเล็ก (5V จากพอร์ต USB หรือเรกูเลเตอร์บนบอร์ด)`,en:`Regulated power rails for low-power sensors and logic IC modules.`}},{name:`GND (3 จุดบนบอร์ด)`,badgeColor:`#475569`,desc:{th:`กราวด์อ้างอิง 0V ร่วมของระบบ ทุกวงจรและแหล่งจ่ายภายนอกต้องต่อถึงกัน`,en:`0V Common Reference Ground. All external supplies and sub-circuits must share GND.`}}],principle:{th:`ชิป ATmega328P ทำงานตามรอบคำสั่ง (fetch-execute) ที่ความถี่ 16 ล้านรอบต่อวินาที อ่านสถานะแรงดันที่พินอินพุต ประมวลผลด้วยโค้ดในฟังก์ชัน setup() และ loop() แล้วสั่งเปลี่ยนสถานะพินเอาต์พุตหรือส่งข้อมูลออกทางพอร์ต USB Serial`,en:`The ATmega328P executes compiled C++ instructions at 16 MHz, sampling input voltages via GPIO/ADC registers and driving output latches or hardware timers for PWM and Serial UART.`},labTip:{th:`ห้ามนำพินดิจิทัลไปขับโหลดกระแสสูง (เช่น มอเตอร์) โดยตรง และห้ามต่อขา 5V เข้ากับ GND โดยไม่มีภาระโหลดเด็ดขาดเพราะจะเกิดการลัดวงจร`,en:`Never drive inductive/high-current loads directly from an I/O pin, and never short the 5V pin directly to GND.`},focusPoint:[-3.8,.4,0]},breadboard:{id:`breadboard`,icon:`📋`,name:{th:`โพรโทบอร์ดแบบไม่ต้องบัดกรี (Half-Size Breadboard)`,en:`Solderless Prototyping Breadboard (400 Tie-Points)`},category:{th:`ฐานต่อวงจรทดลอง`,en:`Prototyping Interconnect`},packageType:{th:`ABS พลาสติกพร้อมคลิปสปริงนิกเกิลฟอสเฟอร์บรอนซ์ด้านใน ระยะห่างรู 2.54 mm (0.1")`,en:`ABS housing with internal phosphor-bronze spring clips, 2.54 mm (0.1") pitch`},ratings:{th:`รองรับแรงดันต่ำ (< 36V) | กระแสแนะนำ ≤ 1A | ขนาดสายไฟที่เหมาะสม 22–24 AWG`,en:`Low-voltage prototyping (< 36V) | ≤ 1A continuous | Accepts 22–24 AWG solid-core leads`},pins:[{name:`แถวส่งไฟ + (เส้นสีแดง)`,badgeColor:`#dc2626`,desc:{th:`รางจ่ายไฟบวก (Power Bus) เชื่อมถึงกันตามแนวยาวตลอดทั้งแถบ`,en:`Positive supply rail connected continuously along the outer length.`}},{name:`แถวกราวด์ - (เส้นสีน้ำเงิน)`,badgeColor:`#2563eb`,desc:{th:`รางกราวด์ 0V (Ground Bus) เชื่อมถึงกันตามแนวยาวตลอดทั้งแถบ`,en:`0V Ground bus rail connected continuously along the outer length.`}},{name:`ช่องเสียบ A–E และ F–J`,badgeColor:`#059669`,desc:{th:`ในแถวตัวเลขเดียวกัน รู A-B-C-D-E เชื่อมถึงกัน 5 รู และ F-G-H-I-J เชื่อมถึงกันอีก 5 รู โดยถูกคั่นกลางด้วยร่องเว้า (Center Trench)`,en:`Terminal strips: holes A–E are common within each numbered row, isolated from F–J by the 7.62 mm center DIP trench.`}}],principle:{th:`ภายในแต่ละแถวมีแผ่นโลหะสปริงหนีบขาอุปกรณ์ไว้ด้วยกัน ทำให้ต่อวงจรและปรับเปลี่ยนได้ทันทีโดยไม่ต้องใช้หัวแร้งบัดกรี ร่องตรงกลางออกแบบมาให้เสียบไอซีหรือปุ่มกด 4 ขาคร่อมสองฝั่งเพื่อไม่ให้ขาด้านซ้ายและขวาช็อตถึงกัน`,en:`Internal spring clips grip component leads in 5-hole terminal groups, while the center ravine prevents DIP packages and tactile switches from shorting across opposite pins.`},labTip:{th:`ระวังการเสียบขาทั้งสองของตัวต้านทานหรือ LED ลงในแถวตัวเลขฝั่งเดียวกัน เพราะคลิปโลหะด้านล่างจะเชื่อมขาทั้งสองเข้าหากันจนลัดวงจร`,en:`Do not plug both leads of a resistor or LED into the same 5-hole row—they will be shorted together by the underlying metal clip.`},focusPoint:[4.2,.3,0]},led:{id:`led`,icon:`💡`,name:{th:`ไดโอดเปล่งแสง (5mm Diffused LED)`,en:`5mm Light-Emitting Diode (LED)`},category:{th:`อุปกรณ์แสดงผลเชิงแสง (Output)`,en:`Optoelectronic Indicator`},packageType:{th:`เลนส์อีพ็อกซีขนาด 5 มม. ขาทะลุรู (Through-Hole)`,en:`5mm T-1¾ Radial Epoxy Dome`},ratings:{th:`แรงดันตกคร่อมเดินหน้า (Vf) ≈ 1.8–2.2V (สีแดง/เหลือง), 3.0–3.2V (สีน้ำเงิน/ขาว) | กระแสใช้งานแนะนำ 10–20 mA`,en:`Forward Voltage (Vf) ≈ 1.8–2.2V (Red/Amber), 3.0–3.2V (Blue/White) | Recommended If = 10–20 mA`},pins:[{name:`Anode (+) ขายาว`,badgeColor:`#ef4444`,desc:{th:`ขั้วบวก (แกนโลหะด้านในโคมมีขนาดเล็กกว่า) ต่อรับไฟบวกผ่านตัวต้านทานจำกัดกระแส`,en:`Positive Anode (longer lead, smaller internal post). Connects to the signal pin via a series resistor.`}},{name:`Cathode (-) ขาสั้น / ขอบปาดเรียบ`,badgeColor:`#475569`,desc:{th:`ขั้วลบ (ฐานแอนวิลด้านในใหญ่กว่า และขอบพลาสติกด้านล่างปาดแบน) ต่อลง GND`,en:`Negative Cathode (shorter lead, flat rim edge, larger internal anvil cup). Connects to GND.`}}],principle:{th:`เป็นสารกึ่งตัวนำชนิด P-N Junction ที่ยอมให้กระแสไหลผ่านในทิศทางไบอัสตรง (Forward Bias) เท่านั้น เมื่ออิเล็กตรอนรวมตัวกับโฮลจะคายพลังงานออกมาเป็นโฟตอนของแสงสีตามชนิดของสารกึ่งตัวนำ`,en:`A P-N junction semiconductor that emits photons via electroluminescence when forward-biased above its threshold voltage Vf.`},labTip:{th:`ต้องต่ออนุกรมกับตัวต้านทาน (เช่น 220Ω–330Ω) เสมอ หากต่อตรงกับ 5V กระแสจะไหลเกินพิกัดจนหลอดขาดทันที`,en:`Always place a current-limiting resistor (e.g., 330 Ω) in series; connecting an LED directly across 5V will destroy the junction.`},focusPoint:[4.2,1,-1.2]},resistor:{id:`resistor`,icon:`〰️`,name:{th:`ตัวต้านทานคงที่ (Axial Film Resistor 330Ω / 10kΩ)`,en:`Fixed Axial Resistor (330 Ω & 10 kΩ)`},category:{th:`อุปกรณ์พาสซีฟจำกัดกระแสและแบ่งแรงดัน`,en:`Passive Current Limiter / Voltage Divider`},packageType:{th:`ตัวต้านทานชนิดฟิล์มขนาด 1/4 วัตต์ อ่านค่าด้วยแถบสี 4 แถบ`,en:`1/4W Axial Through-Hole with 4 Color Bands`},ratings:{th:`330 Ω (ส้ม-ส้ม-น้ำตาล-ทอง) จำกัดกระแส LED ≈ 9 mA | 10 kΩ (น้ำตาล-ดำ-ส้ม-ทอง) สำหรับวงจรแบ่งแรงดันเซนเซอร์`,en:`330 Ω (Orange-Orange-Brown-Gold) limits LED current | 10 kΩ (Brown-Black-Orange-Gold) forms analog voltage dividers`},pins:[{name:`Terminal 1 & 2 (ไม่มีขั้ว)`,badgeColor:`#d97706`,desc:{th:`ตัวต้านทานไม่มีขั้วบวกหรือลบ สามารถเสียบสลับทิศทางได้โดยให้ผลทางไฟฟ้าเหมือนเดิมทุกประการ`,en:`Non-polarized component—can be inserted in either orientation with identical electrical behavior.`}}],principle:{th:`ทำหน้าที่ต้านทานการไหลของกระแสไฟฟ้าตามกฎของโอห์ม (V = I × R) ใช้จำกัดกระแสไม่ให้ทำลาย LED หรือใช้คู่กับเซนเซอร์ต้านทานแปรค่า (เช่น LDR, FSR) เพื่อแปลงการเปลี่ยนความต้านทานให้เป็นแรงดันที่ขา A0 อ่านได้`,en:`Governs current and voltage drops according to Ohm’s Law (V = I × R), protecting LEDs or forming a reference leg in sensor voltage dividers.`},labTip:{th:`สังเกตแถบสีให้แม่นยำ: 330Ω คือ ส้ม-ส้ม-น้ำตาล ส่วน 10kΩ คือ น้ำตาล-ดำ-ส้ม หากใส่ 10kΩ แทน 330Ω ไฟ LED จะติดหรี่มากจนแทบมองไม่เห็น`,en:`Check color bands carefully: 330 Ω is Orange-Orange-Brown, while 10 kΩ is Brown-Black-Orange. Using 10 kΩ on an LED makes it extremely dim.`},focusPoint:[4.2,.6,.2]},button:{id:`button`,icon:`🔘`,name:{th:`ปุ่มกดไมโครสวิตช์ 4 ขา (Tactile Push Button 6×6mm)`,en:`6×6mm Momentary Tactile Push Button Switch`},category:{th:`อุปกรณ์รับค่าดิจิทัล (Digital Input)`,en:`Momentary Digital Switch`},packageType:{th:`สวิตช์ปุ่มกดติด-ปล่อยดับแบบ 4 ขา คร่อมร่องกลางโพรโทบอร์ด`,en:`4-Pin Through-Hole SPST-NO Tactile Switch`},ratings:{th:`12V DC / 50 mA | เวลาการเด้งของหน้าสัมผัส (Contact Bounce) ≈ 5–25 ms`,en:`12V DC / 50 mA | Typical mechanical contact bounce ≈ 5–25 ms`},pins:[{name:`Side A (ขาคู่ฝั่งหนึ่ง → D2)`,badgeColor:`#0284c7`,desc:{th:`ต่อเข้ากับพินดิจิทัลที่เปิดโหมด INPUT_PULLUP (มีตัวต้านทานดึงขึ้น 5V ภายในชิปประมาณ 20kΩ–50kΩ)`,en:`Connected to digital input configured with internal INPUT_PULLUP (~20–50 kΩ to 5V).`}},{name:`Side B (ขาคู่อีกฝั่ง → GND)`,badgeColor:`#475569`,desc:{th:`ต่อลงกราวด์ เมื่อกดปุ่มหน้าสัมผัสจะเชื่อม Side A เข้ากับ GND ทำให้พินอ่านค่าเป็น LOW (Active-Low)`,en:`Connected to GND. Pressing bridges A to B, pulling the input pin to logic LOW (0V).`}}],principle:{th:`ใช้โดมโลหะสปริงภายใน เมื่อยังไม่กดวงจรจะเปิด (Open) ตัวต้านทาน Pull-up ภายในชิปจะดึงแรงดันพินไว้ที่ HIGH (1) เมื่อกดปุ่มโดมโลหะจะยุบตัวเชื่อมลง GND ทำให้แรงดันตกเป็น LOW (0) พร้อมใช้อัลกอริทึม Debounce กรองสัญญาณกระเพื่อมขณะหน้าสัมผัสกระทบกัน`,en:`An internal snap-dome bridges the switch contacts when depressed. With INPUT_PULLUP, the pin idles HIGH and drops LOW when pressed, while software debouncing filters mechanical contact chatter.`},labTip:{th:`เสียบสวิตช์ให้คร่อมร่องกลางของโพรโทบอร์ดเสมอ และเลือกต่อสายจากขาที่อยู่คนละฝั่งกัน (หรือทแยงมุม) เพื่อให้แน่ใจว่าวงจรตัด-ต่อผ่านปุ่มกดจริง`,en:`Straddle the breadboard center trench and wire diagonally opposite legs so you never accidentally wire two already-shorted pins.`},focusPoint:[4.2,.7,1.8]},potentiometer:{id:`potentiometer`,icon:`🎛️`,name:{th:`ตัวต้านทานปรับค่าได้แบบหมุน (10kΩ Rotary Potentiometer)`,en:`10 kΩ Linear Rotary Potentiometer (B10K)`},category:{th:`อุปกรณ์รับค่าแอนะล็อก (Analog Voltage Divider)`,en:`Variable Voltage Divider Input`},packageType:{th:`โพเทนชิโอมิเตอร์แกนหมุนพร้อมหน้าสัมผัสกวาด (Wiper) 3 ขา`,en:`3-Terminal Panel/Breadboard Rotary Potentiometer`},ratings:{th:`ความต้านทานรวม 10 kΩ เชิงเส้น (Type B) | มุมหมุนประมาณ 270° | แรงดันใช้งาน 0–5V`,en:`10 kΩ Linear Taper (B10K) | ~270° Mechanical Travel | 0–5V Operating Span`},pins:[{name:`Pin 1 (CCW End → GND หรือ 5V)`,badgeColor:`#475569`,desc:{th:`ขั้วปลายด้านหนึ่งของแถบความต้านทาน ต่อกับ GND (0V)`,en:`One outer end of the resistive track, connected to GND (0V).`}},{name:`Pin 2 (Wiper ขากลาง → A0)`,badgeColor:`#7c3aed`,desc:{th:`หน้าสัมผัสเลื่อน (Wiper) ให้แรงดันแปรผันต่อเนื่องตั้งแต่ 0V ถึง 5V ตามมุมการหมุน`,en:`Sliding wiper terminal outputting a continuously variable voltage (0–5V) to analog input A0.`}},{name:`Pin 3 (CW End → 5V)`,badgeColor:`#dc2626`,desc:{th:`ขั้วปลายอีกด้านของแถบความต้านทาน ต่อกับไฟเลี้ยง 5V`,en:`Opposite outer end of the resistive track, connected to 5V.`}}],principle:{th:`ทำหน้าที่เป็นวงจรแบ่งแรงดันปรับค่าได้ (Variable Voltage Divider) เมื่อหมุนแกน ตำแหน่งของขากลาง (Wiper) จะแบ่งอัตราส่วนความต้านทานสองฝั่ง ทำให้แรงดันที่ขา A0 เปลี่ยนแปลงเชิงเส้นตั้งแต่ 0.00V (ADC=0) จนถึง 5.00V (ADC=1023)`,en:`Acts as a ratiometric three-terminal voltage divider. Rotating the shaft moves the wiper along a carbon/cermet resistive element, scaling Vout between 0V and 5V.`},labTip:{th:`ขาสัญญาณไป A0 ต้องต่อที่ขากลางเสมอ หากต่อสลับเอาขากลางไปเข้า 5V หรือ GND เมื่อหมุนสุดแกนอาจทำให้ 5V ช็อตลง GND โดยตรงได้!`,en:`Always connect the center wiper pin to A0. Never wire 5V and GND across the center pin, or turning to the end-stop will short 5V to GND!`},focusPoint:[4.2,.9,-.8]},rgb:{id:`rgb`,icon:`🌈`,name:{th:`หลอด LED สามสีขั้วลบร่วม (5mm Common-Cathode RGB LED)`,en:`5mm Common-Cathode RGB LED (4-Pin)`},category:{th:`อุปกรณ์แสดงผลผสมแสงสี (PWM Color Output)`,en:`3-Channel Additive Color Emitter`},packageType:{th:`หลอดใส 5 มม. ภายในบรรจุไดโอด 3 ชิป (Red, Green, Blue) มี 4 ขา`,en:`5mm 4-Lead Package containing Red, Green, and Blue semiconductor dies`},ratings:{th:`แยกควบคุม PWM 3 ช่อง (D9=R, D10=G, D11=B) | ใช้ตัวต้านทาน 330 Ω แยกอิสระทั้ง 3 ขา`,en:`3 Independent PWM Channels (D9=R, D10=G, D11=B) | 3 × 330 Ω individual series resistors`},pins:[{name:`Pin 1: Red Anode (D9 ผ่าน 330Ω)`,badgeColor:`#ef4444`,desc:{th:`ขั้วบวกของชิปแสงสีแดง (Vf ≈ 2.0V)`,en:`Red die anode driven by D9 PWM via a 330 Ω resistor.`}},{name:`Pin 2: Common Cathode (ขายาวสุด → GND)`,badgeColor:`#475569`,desc:{th:`ขั้วลบร่วมของทั้ง 3 สี ต่อลง GND`,en:`Longest lead: shared Common Cathode connected to GND.`}},{name:`Pin 3: Green Anode (D10 ผ่าน 330Ω)`,badgeColor:`#22c55e`,desc:{th:`ขั้วบวกของชิปแสงสีเขียว (Vf ≈ 3.1V)`,en:`Green die anode driven by D10 PWM via a 330 Ω resistor.`}},{name:`Pin 4: Blue Anode (D11 ผ่าน 330Ω)`,badgeColor:`#3b82f6`,desc:{th:`ขั้วบวกของชิปแสงสีน้ำเงิน (Vf ≈ 3.1V)`,en:`Blue die anode driven by D11 PWM via a 330 Ω resistor.`}}],principle:{th:`อาศัยการผสมแสงแบบบวก (Additive Color Mixing) โดยปรับสัดส่วน Duty Cycle ของ PWM (0–255) ในแต่ละแม่สีแสง เช่น แดง+เขียว ได้แสงสีเหลือง, แดง+น้ำเงิน ได้สีม่วงมาเจนตา และเมื่อเปิดครบทั้งสามสีจะได้แสงโทนขาว`,en:`Combines red, green, and blue light additively. Modulating each channel’s PWM duty cycle (0–255) varies perceived hue and brightness.`},labTip:{th:`ห้ามใช้ตัวต้านทานเพียงตัวเดียวต่อที่ขา Common Cathode ร่วมกัน เพราะชิปสีแดงมีแรงดันตกคร่อมต่ำกว่าสีเขียวและน้ำเงิน จะแย่งกระแสไปจนสีอื่นไม่ติดหรือสว่างผิดเพี้ยน`,en:`Never share a single resistor on the common cathode—because Red has a lower forward voltage (~2.0V) than Green/Blue (~3.1V), Red would hog the current.`},focusPoint:[4.2,1,0]},ldr:{id:`ldr`,icon:`☀️`,name:{th:`ตัวต้านทานแปรค่าตามแสง (LDR / Photoresistor GL5528)`,en:`CdS Photoresistor / Light-Dependent Resistor (LDR)`},category:{th:`เซนเซอร์ตรวจวัดความเข้มแสง (Optical Sensor)`,en:`Photoconductive Analog Sensor`},packageType:{th:`แผ่นเซรามิกเคลือบลายคดเคี้ยวของสารแคดเมียมซัลไฟด์ (CdS) ขนาด 5 มม.`,en:`5mm Ceramic Wafer with Serpentine Cadmium-Sulfide (CdS) Track`},ratings:{th:`ความต้านทานในที่มืด ≈ 500 kΩ–1 MΩ | ในที่สว่างจ้า ≈ 1 kΩ–10 kΩ | ใช้คู่กับตัวต้านทานคงที่ 10 kΩ`,en:`Dark Resistance ≈ 500 kΩ–1 MΩ | Bright Light ≈ 1–10 kΩ | Paired with 10 kΩ pull-down resistor`},pins:[{name:`Lead 1 (ต่อไฟเลี้ยง 5V)`,badgeColor:`#dc2626`,desc:{th:`ขาด้านบนของวงจรแบ่งแรงดัน ต่อรับแรงดัน 5V`,en:`Upper leg of the voltage divider connected to 5V.`}},{name:`Lead 2 (จุดร่วม A0 & ตัวต้านทาน 10kΩ)`,badgeColor:`#06b6d4`,desc:{th:`จุดแบ่งแรงดันส่งเข้าขา A0 และต่อผ่านตัวต้านทาน 10 kΩ ลง GND`,en:`Divider node connected to A0 and pulled to GND through a fixed 10 kΩ resistor.`}}],principle:{th:`ปรากฏการณ์โฟโตคอนดักทิวิตี (Photoconductivity): เมื่อโฟตอนของแสงตกกระทบแถบสาร CdS จะกระตุ้นอิเล็กตรอนให้หลุดออกมานำไฟฟ้าได้ดีขึ้น ทำให้ความต้านทานของ LDR ลดลง แรงดันที่จุดแบ่ง A0 จึงสูงขึ้นเมื่อมีแสงสว่างมากขึ้น ($V_{A0} = 5V \\times \\frac{10k\\Omega}{R_{LDR} + 10k\\Omega}$)`,en:`Incident photons excite charge carriers in the CdS track, lowering its resistance. With LDR on the high side and 10 kΩ on the low side, brighter light increases the voltage at A0.`},labTip:{th:`ค่า ADC ที่อ่านได้เป็นสัดส่วนจากวงจรแบ่งแรงดันซึ่งไม่เชิงเส้นกับหน่วยลักซ์ (Lux) จึงเหมาะกับการตั้งเกณฑ์เปรียบเทียบ (Threshold) เพื่อแยกมืด/สว่าง`,en:`The ADC reading reflects a non-linear voltage divider ratio rather than calibrated illuminance in lux, making it ideal for threshold switching.`},focusPoint:[4.2,.9,1.5]},ultrasonic:{id:`ultrasonic`,icon:`📡`,name:{th:`โมดูลวัดระยะทางด้วยคลื่นอัลตราโซนิก (HC-SR04)`,en:`HC-SR04 Ultrasonic Distance Sensor Module`},category:{th:`เซนเซอร์วัดระยะทางแบบไม่สัมผัส (Time-of-Flight Sonar)`,en:`Non-Contact Acoustic Rangefinder`},packageType:{th:`โมดูล PCB 4 พิน พร้อมกระบอกส่งคลื่น (T) และรับคลื่นสะท้อน (R) ความถี่ 40 kHz`,en:`4-Pin PCB Module with Dual 40 kHz Piezoelectric Ultrasonic Transducers (T & R)`},ratings:{th:`แรงดัน 5V DC | ช่วงวัดปกติ 2–400 cm | มุมกระจายคลื่น ~15° | ความถี่คลื่นเสียง 40 kHz`,en:`5V DC Supply | Nominal Range 2–400 cm | ~15° Cone Angle | 40 kHz Ultrasonic Burst`},pins:[{name:`VCC (5V)`,badgeColor:`#dc2626`,desc:{th:`ไฟเลี้ยงวงจรโมดูล 5V`,en:`5V DC power supply input.`}},{name:`Trig (ต่อขา D9)`,badgeColor:`#0284c7`,desc:{th:`ขารับพัลส์คำสั่งเริ่มต้น (ส่ง HIGH นานอย่างน้อย 10 µs เพื่อยิงคลื่น 8 ลูก)`,en:`Trigger input: send a ≥10 µs HIGH pulse to emit an 8-cycle 40 kHz burst.`}},{name:`Echo (ต่อขา D10)`,badgeColor:`#06b6d4`,desc:{th:`ขาส่งสัญญาณ HIGH ออกมาตามเวลาที่คลื่นเดินทางไป-กลับ (อ่านด้วย pulseIn)`,en:`Echo output: stays HIGH for the round-trip acoustic travel duration (µs).`}},{name:`GND (0V)`,badgeColor:`#475569`,desc:{th:`กราวด์ร่วมของวงจร`,en:`Common ground.`}}],principle:{th:`ใช้หลักการ Time-of-Flight (ToF) เมื่อกระตุ้นขา Trig หัวส่ง T จะปล่อยคลื่นเหนือเสียง 40 kHz ออกไปกระทบวัตถุแล้วสะท้อนกลับมาเข้าหัวรับ R เนื่องจากคลื่นต้องเดินทาง "ไปและกลับ" เป็นระยะทาง $2d$ จึงคำนวณระยะทางได้จาก $d = \\frac{t_{\\text{echo}} \\times 0.0343}{2}\\text{ cm}$`,en:`Measures round-trip acoustic Time-of-Flight. Because the ultrasonic pulse travels to the target and back (total path = 2d), distance is half the total travel distance: d = (t_echo × 0.0343) / 2 cm.`},labTip:{th:`เมื่อ pulseIn() คืนค่า 0 แปลว่าหมดเวลารอคลื่นสะท้อน (Timeout / ไม่มีวัตถุในระยะ หรือวัตถุเอียงสะท้อนคลื่นหนี) ต้องจัดการแยกกรณี "ไม่มีข้อมูล" ออกจากระยะ 0 ซม. เสมอ!`,en:`A pulseIn() return value of 0 means timeout (no echo received), NOT zero distance! Always handle missing echo data explicitly in code.`},focusPoint:[3.2,1.5,0]},obstacle:{id:`obstacle`,icon:`🚧`,name:{th:`แผ่นเป้าหมายสะท้อนคลื่นเสียง (Acoustic Target Obstacle)`,en:`Movable Acoustic Target / Obstacle Surface`},category:{th:`วัตถุทดสอบในสภาพแวดล้อม`,en:`Physical Environment Target`},packageType:{th:`แผ่นสะท้อนผิวเรียบตั้งฉากกับแนวแกนคลื่นอัลตราโซนิก`,en:`Flat reflective target plane perpendicular to the sonar beam axis`},ratings:{th:`ระยะจำลองปรับได้ 2–200 cm หรือจำลองสภาวะไร้คลื่นสะท้อน (No Echo)`,en:`Adjustable target distance 2–200 cm plus simulated No-Echo condition`},pins:[{name:`พื้นผิวสะท้อนคลื่น (Reflective Face)`,badgeColor:`#f59e0b`,desc:{th:`สะท้อนคลื่น 40 kHz กลับไปยังตัวรับ R ของโมดูล HC-SR04`,en:`Reflects the 40 kHz ultrasonic wavefront back toward transducer R.`}}],principle:{th:`คลื่นเสียงความถี่สูงสะท้อนได้ดีบนพื้นผิวแข็งและเรียบที่ตั้งฉากกับลำคลื่น หากวัตถุอยู่นอกระยะหรือวัสดุดูดซับเสียง (เช่น ผ้าฟองน้ำ) คลื่นสะท้อนจะอ่อนจนเกิดสภาวะ No Echo`,en:`Hard, flat surfaces normal to the acoustic cone reflect strong echoes, whereas soft textiles, steep angles, or out-of-range targets cause echo timeout.`},labTip:{th:`ในการทดลองจริง ควรใช้วัตถุแผ่นเรียบขนาดใหญ่อย่างน้อย 10×10 ซม. ตั้งให้ขนานกับหน้าเซนเซอร์เพื่อให้ได้ค่าเวลา Echo ที่นิ่งและแม่นยำ`,en:`In physical labs, use a flat rigid card (≥10×10 cm) held parallel to the sensor face for repeatable echo timing.`},focusPoint:[6.8,1.4,0]},piezo:{id:`piezo`,icon:`🔊`,name:{th:`ลำโพงเพียโซแบบพาสซีฟ (Passive Piezo Buzzer)`,en:`Passive Piezoelectric Buzzer Transducer`},category:{th:`อุปกรณ์กำเนิดเสียงด้วยความถี่ (Acoustic Output)`,en:`Piezoelectric Audio Transducer`},packageType:{th:`กระบอกพลาสติกสีดำทรงกลม ภายในบรรจุแผ่นเซรามิกเพียโซอิเล็กทริก`,en:`12mm Cylindrical Acoustic Cavity with Piezoceramic Diaphragm`},ratings:{th:`ขับด้วยคลื่นสี่เหลี่ยมจากคำสั่ง tone() | ช่วงความถี่ที่ได้ยินชัดเจน 100–4,000 Hz`,en:`Driven by square-wave frequency via tone() | Audible test range 100–4,000 Hz`},pins:[{name:`Positive (+) → พินสัญญาณ (D8 หรือ D10)`,badgeColor:`#7c3aed`,desc:{th:`ขั้วบวก (มีเครื่องหมาย + บนตัวถัง) รับสัญญาณพัลส์ความถี่จาก Arduino`,en:`Positive terminal (+) receiving the square-wave tone signal.`}},{name:`Negative (-) → GND`,badgeColor:`#475569`,desc:{th:`ขั้วลบต่อลงกราวด์ร่วม`,en:`Negative terminal connected to GND.`}}],principle:{th:`แผ่นเซรามิกเพียโซจะโก่งตัวและคลายตัวตามจังหวะการสลับแรงดันไฟฟ้า (Piezoelectric Effect) เมื่อส่งสัญญาณคลื่นสี่เหลี่ยมด้วยคำสั่ง tone(pin, hz) แผ่นไดอะแฟรมจะสั่นอัดอากาศเกิดเป็นเสียงที่มีระดับเสียงสูง-ต่ำ (Pitch) ตามความถี่ Hz`,en:`Reverse piezoelectric effect: alternating voltage flexes a ceramic disc at the commanded frequency (Hz), vibrating air to produce musical pitch.`},labTip:{th:`ต้องใช้เพียโซแบบ "Passive" เท่านั้นจึงจะเปลี่ยนความถี่โน้ตดนตรีได้ (แบบ Active จะมีวงจรกำเนิดความถี่คงที่ในตัว จ่ายไฟแล้วดังเสียงเดียว)`,en:`Use a "Passive" buzzer for tone() pitch control; an "Active" buzzer has an internal fixed oscillator and only plays a single fixed beep.`},focusPoint:[4.2,.8,.5]},"dc-motor":{id:`dc-motor`,icon:`⚙️`,name:{th:`มอเตอร์กระแสตรงแบบมีแปรงถ่าน (Brushed DC Motor + ใบพัด)`,en:`Brushed Permanent-Magnet DC Motor with Rotor Fan`},category:{th:`อุปกรณ์ขับเคลื่อนเชิงกล (Electromechanical Actuator)`,en:`Rotary Electromechanical Actuator`},packageType:{th:`ตัวถังเหล็กทรงกระบอกพร้อมแม่เหล็กถาวร ทุ่นอาร์เมเจอร์ และใบพัดแสดงการหมุน`,en:`Cylindrical Metal Can Type-130/140 DC Motor with 3-Blade Visual Impeller`},ratings:{th:`แรงดันแหล่งจ่ายแยก 3–6V DC | กระแสขณะหมุน 150–400 mA (กระแสขณะติดขัด Stall อาจสูงเกิน 800 mA)`,en:`External 3–6V Supply | Running Current 150–400 mA (Stall Current > 800 mA)`},pins:[{name:`Motor (+) → แหล่งจ่ายไฟแยก EXT.+`,badgeColor:`#dc2626`,desc:{th:`ต่อเข้าขั้วบวกของแหล่งจ่ายไฟภายนอกสำหรับมอเตอร์ (และต่อคู่กับขั้ว Cathode ของไดโอด)`,en:`Connected to external motor supply V+ (and flyback diode cathode).`}},{name:`Motor (-) → ขาเอาต์พุตวงจรขับ (Collector / Drain)`,badgeColor:`#059669`,desc:{th:`ต่อเข้าสวิตช์กำลังของทรานซิสเตอร์/ไดรเวอร์เพื่อสวิตช์ลงกราวด์ตามสัญญาณ PWM`,en:`Switched to ground by the driver transistor/MOSFET collector/drain.`}}],principle:{th:`เมื่อกระแสไหลผ่านขดลวดอาร์เมเจอร์ภายในสนามแม่เหล็กถาวร จะเกิดแรงลอเรนตซ์สร้างแรงบิดหมุนเพลา การปรับค่า Duty Cycle ของสัญญาณ PWM จะเปลี่ยนพลังงานเฉลี่ยที่จ่ายให้ขดลวด จึงควบคุมความเร็วสัมพัทธ์ได้`,en:`Current flowing through armature windings inside a permanent magnetic field produces Lorentz torque. Varying PWM duty cycle modulates average applied power.`},labTip:{th:`ความเร็วมอเตอร์กระแสตรงแบบไม่มีเซนเซอร์วัดรอบ (Open-loop) จะเปลี่ยนแปลงตามแรงเสียดทานและภาระโหลด จึงไม่ควรสรุปว่า Duty 50% จะได้ RPM ครึ่งหนึ่งเป๊ะเสมอไป`,en:`Open-loop DC motor speed varies with friction and mechanical load, so PWM duty cycle controls average drive effort rather than guaranteed RPM.`},focusPoint:[4.8,1.3,-1.2]},driver:{id:`driver`,icon:`🔌`,name:{th:`วงจรขับกำลังทรานซิสเตอร์ / มอสเฟต (Low-Side Transistor Driver)`,en:`NPN Transistor / Logic-Level MOSFET Power Driver Stage`},category:{th:`สวิตช์ขยายกระแสไฟฟ้า (Power Electronic Switch)`,en:`Solid-State High-Current Switch`},packageType:{th:`ตัวถัง TO-92 / TO-220 พร้อมตัวต้านทานจำกัดกระแสขาเข้า`,en:`TO-92 / TO-220 Semiconductor Package with Base/Gate Resistor`},ratings:{th:`ใช้สัญญาณกระแสต่ำจากพิน D5 ควบคุมกระแสหลักหลายร้อยมิลลิแอมป์ของมอเตอร์`,en:`Amplifies low-current logic PWM from D5 to switch hundreds of milliamps for the motor`},pins:[{name:`IN (Base / Gate) ← D5 ผ่านตัวต้านทาน`,badgeColor:`#0284c7`,desc:{th:`รับสัญญาณควบคุม PWM จากพิน D5 ของ Arduino`,en:`Receives logic-level PWM from Arduino D5 via a current-limiting resistor.`}},{name:`OUT (Collector / Drain) → Motor (-)`,badgeColor:`#059669`,desc:{th:`ขั้วรับกระแสจากขั้วลบของมอเตอร์เพื่อสวิตช์ลงกราวด์`,en:`Sinks motor current when the driver switch turns ON.`}},{name:`GND (Emitter / Source) → Common GND`,badgeColor:`#475569`,desc:{th:`ต่อลงกราวด์ร่วมระหว่าง Arduino กับแหล่งจ่ายไฟมอเตอร์`,en:`Connected to common ground shared by Arduino and external supply.`}}],principle:{th:`พินของ Arduino จ่ายกระแสได้อย่างปลอดภัยเพียง ~20 mA ซึ่งไม่พอขับมอเตอร์ ทรานซิสเตอร์จึงทำหน้าที่เป็น "วาล์วไฟฟ้า" ที่ใช้สัญญาณเล็กน้อยจากพิน D5 ไปเปิด-ปิดทางเดินกระแสใหญ่จากแบตเตอรี่ภายนอกด้วยความเร็วสูงตามจังหวะ PWM`,en:`Because an Arduino pin can safely source only ~20 mA, the transistor acts as an electronic relay—using a tiny base/gate signal to switch high motor current.`},labTip:{th:`ต้องต่อกราวด์ของแหล่งจ่ายไฟภายนอก (EXT.-) เข้ากับ GND ของ Arduino เสมอ สัญญาณควบคุมที่ขา Base/Gate จึงจะมีจุดอ้างอิง 0V เดียวกัน`,en:`Always tie the negative terminal of the external motor battery to Arduino GND so the control signal has a common 0V reference.`},focusPoint:[3.6,.8,.8]},diode:{id:`diode`,icon:`🛡️`,name:{th:`ไดโอดฟลายแบ็กป้องกันแรงดันย้อนกลับ (1N4007 Flyback Diode)`,en:`1N4007 Flyback / Freewheeling Protection Diode`},category:{th:`อุปกรณ์ป้องกันวงจรจากภาระเหนี่ยวนำ`,en:`Inductive Kickback Snubber`},packageType:{th:`DO-41 ทรงกระบอกสีดำ มีแถบคาดสีเงินแสดงขั้ว Cathode (K)`,en:`DO-41 Axial Package with Silver Cathode Band`},ratings:{th:`ทนแรงดันย้อนกลับสูงสุด 1000V | กระแสเดินหน้าต่อเนื่อง 1A`,en:`1000V Peak Repetitive Reverse Voltage | 1.0A Average Forward Current`},pins:[{name:`Cathode (K - แถบสีเงิน) → ต่อฝั่งไฟบวก MOTOR.+`,badgeColor:`#dc2626`,desc:{th:`ด้านที่มีแถบคาดสีเงิน ต้องหันไปทางขั้วบวกของมอเตอร์/แหล่งจ่าย (Reverse-biased ในสภาวะปกติ)`,en:`Silver-banded Cathode MUST face Motor (+) / positive supply rail.`}},{name:`Anode (A) → ต่อฝั่งสวิตช์ MOTOR.-`,badgeColor:`#059669`,desc:{th:`ต่อเข้ากับจุดเชื่อมระหว่างขั้วลบมอเตอร์และขาเอาต์พุตของทรานซิสเตอร์`,en:`Connected to the switched node between Motor (-) and transistor collector/drain.`}}],principle:{th:`ขดลวดมอเตอร์มีสมบัติความเหนี่ยวนำ ($V = -L \\frac{dI}{dt}$) เมื่อทรานซิสเตอร์ตัดกระแสกะทันหันในแต่ละลูกคลื่น PWM ขดลวดจะสร้างแรงดันกระชากย้อนกลับสูงมาก (Back-EMF Spike) ไดโอดที่ต่อขนานกลับหัวไว้จะเปิดทางให้กระแสเหนี่ยวนำไหลวนสลายตัวในขดลวดอย่างปลอดภัย ไม่ทะลุไปทำลายทรานซิสเตอร์`,en:`When PWM switches OFF, collapsing magnetic flux in the motor coils generates a high-voltage inductive spike. The antiparallel diode conducts this flyback current safely around the motor loop.`},labTip:{th:`ตรวจดูแถบสีเงินบนตัวไดโอดก่อนจ่ายไฟทุกครั้ง: แถบสีเงินต้องอยู่ฝั่งไฟบวก (MOTOR.+) หากต่อกลับด้านจะเกิดการลัดวงจรทันทีที่ทรานซิสเตอร์ทำงาน!`,en:`Double-check the silver band! It must connect to Motor (+). Reversing the flyback diode creates a dead short across the supply when the transistor turns on.`},focusPoint:[4.2,.7,-.2]},supply:{id:`supply`,icon:`🔋`,name:{th:`แหล่งจ่ายไฟภายนอกสำหรับโหลดกำลัง (External 5V–6V Power Supply)`,en:`Dedicated External Power Supply (Battery / Regulated DC)`},category:{th:`ภาคจ่ายไฟกำลัง (Power Rail)`,en:`High-Current Actuator Supply`},packageType:{th:`รางถ่าน AA 4 ก้อน หรือแหล่งจ่ายไฟ DC ควบคุมแรงดันพร้อมสายไฟแดง/ดำ`,en:`4×AA Battery Pack / Bench DC Supply Module`},ratings:{th:`5V–6V DC | จ่ายกระแสรองรับมอเตอร์ เซอร์โว และสเต็ปเปอร์โดยไม่ดึงไฟจากพอร์ต USB ของคอมพิวเตอร์`,en:`5V–6V DC | Isolates high-current motor transients from the Arduino logic regulator`},pins:[{name:`EXT.+ (สายสีแดง)`,badgeColor:`#dc2626`,desc:{th:`จ่ายไฟบวกเข้ากับมอเตอร์ เซอร์โว หรือบอร์ดขับ ULN2003 โดยตรง`,en:`Positive high-current rail feeding the actuator or driver V+.`}},{name:`EXT.- (สายสีดำ → Common GND)`,badgeColor:`#475569`,desc:{th:`ต่อเชื่อมเข้ากับขา GND ของบอร์ด Arduino เพื่อสร้างจุดอ้างอิงแรงดัน 0V ร่วมกัน`,en:`Tied to Arduino GND to establish a single 0V reference.`}}],principle:{th:`การแยกแหล่งจ่ายไฟสำหรับอุปกรณ์กลไกช่วยป้องกันไม่ให้กระแสกระชากขณะมอเตอร์ออกตัวดึงแรงดัน 5V ของชิปไมโครคอนโทรลเลอร์ตก (Brown-out Reset)`,en:`Separating actuator power from the MCU logic rail prevents motor start-up current spikes from causing voltage droop and microcontroller resets.`},labTip:{th:`กฎเหล็กของการใช้แหล่งจ่ายแยก: "แยกสายไฟบวก แต่ต้องรวมสายกราวด์ (Common Ground)" เสมอ`,en:`Golden rule of dual supplies: keep positive rails separate, but ALWAYS connect their negative grounds together.`},focusPoint:[6.2,.7,2.2]},tmp36:{id:`tmp36`,icon:`🌡️`,name:{th:`เซนเซอร์วัดอุณหภูมิแอนะล็อกเชิงเส้น (TMP36GT9Z)`,en:`TMP36 Low-Voltage Precision Centigrade Temperature Sensor`},category:{th:`เซนเซอร์วัดอุณหภูมิแบบแอนะล็อก (Analog Thermal Sensor)`,en:`Solid-State Bandgap Temperature Sensor`},packageType:{th:`ตัวถังพลาสติก TO-92 3 ขา (หน้าตาคล้ายทรานซิสเตอร์ ต้องดูด้านปาดแบน)`,en:`3-Pin TO-92 Package (Flat Front Face Orientation)`},ratings:{th:`ช่วงวัด −40°C ถึง +125°C | ความชัน 10 mV/°C | แรงดันชดเชย (Offset) 0.50V ที่ 0°C`,en:`Range −40°C to +125°C | Scale Factor 10 mV/°C | 500 mV Offset at 0°C`},pins:[{name:`Pin 1 (ซ้ายสุดเมื่อหันด้านแบนเข้าหาตัว): +Vs (5V)`,badgeColor:`#dc2626`,desc:{th:`ขั้วรับไฟเลี้ยงบวก 2.7V–5.5V`,en:`Left pin (flat face toward you): +Vs supply (5V).`}},{name:`Pin 2 (ขากลาง): Vout → A0`,badgeColor:`#f59e0b`,desc:{th:`ขาส่งออกแรงดันแอนะล็อกตามอุณหภูมิ $V_{\\text{out}} = 0.5\\text{V} + (0.01\\text{V}/^\\circ\\text{C}) \\times T$`,en:`Center pin: Analog voltage output proportional to Celsius temperature.`}},{name:`Pin 3 (ขวาสุด): GND`,badgeColor:`#475569`,desc:{th:`ขั้วกราวด์ 0V`,en:`Right pin: Ground (0V).`}}],principle:{th:`ใช้วงจร Bandgap ภายในสารกึ่งตัวนำสร้างแรงดันที่เป็นฟังก์ชันเชิงเส้นกับอุณหภูมิสัมบูรณ์ โดยมีค่า Offset 0.5V ที่ 0°C ทำให้วัดอุณหภูมิติดลบได้โดยไม่ต้องใช้ไฟเลี้ยงลบ ที่อุณหภูมิห้อง 25°C จะจ่ายแรงดัน $0.5 + 0.25 = 0.75\\text{ V}$`,en:`Uses a silicon bandgap reference to produce a linear 10 mV/°C output offset by 0.5V at 0°C, allowing sub-zero readings without a negative supply rail.`},labTip:{th:`ระวังสับสนกับทรานซิสเตอร์และห้ามต่อขา +Vs กับ GND สลับกันเด็ดขาด! หากต่อกลับขั้ว ตัวเซนเซอร์ TMP36 จะร้อนจัดภายในไม่กี่วินาที`,en:`Never confuse TMP36 with an NPN transistor or reverse +Vs and GND—reverse polarity causes the TO-92 package to overheat rapidly!`},focusPoint:[4.2,.9,0]},servo:{id:`servo`,icon:`🦾`,name:{th:`ไมโครเซอร์โวมอเตอร์ 180 องศา (SG90 Micro Servo)`,en:`SG90 9g Micro Positional Servo Motor (0°–180°)`},category:{th:`อุปกรณ์ควบคุมตำแหน่งเชิงมุม (Closed-Loop Positional Actuator)`,en:`Closed-Loop Angular Servo Actuator`},packageType:{th:`ตัวถังสีฟ้าใสเห็นชุดเฟืองทดภายใน พร้อมแขนหมุน (Servo Horn) และสายแพร 3 เส้น`,en:`Translucent Blue Case with Gear Train, Feedback Potentiometer & 3-Wire Ribbon`},ratings:{th:`แรงดัน 4.8V–6.0V | ช่วงมุมคำสั่งมาตรฐาน 0°–180° | พัลส์ควบคุม 50 Hz (ความกว้างพัลส์ ~1000–2000 µs)`,en:`4.8V–6.0V Supply | 0°–180° Command Span | 50 Hz Servo Control Pulse`},pins:[{name:`สายสีส้ม / เหลือง (SIG → D9)`,badgeColor:`#f59e0b`,desc:{th:`ขารับสัญญาณพัลส์ควบคุมตำแหน่งมุมจากไลบรารี <Servo.h>`,en:`Orange/Yellow wire: positional control pulse input from pin D9.`}},{name:`สายสีแดง (V+ → แหล่งจ่ายไฟแยก 5V)`,badgeColor:`#dc2626`,desc:{th:`ไฟเลี้ยงกำลังของมอเตอร์และวงจรควบคุมภายใน`,en:`Red wire: positive power supply (4.8–6V rated).`}},{name:`สายสีน้ำตาล / ดำ (GND → Common GND)`,badgeColor:`#475569`,desc:{th:`กราวด์ร่วมระหว่างแหล่งจ่ายไฟเซอร์โวและ Arduino`,en:`Brown/Black wire: common ground shared with Arduino.`}}],principle:{th:`ภายในประกอบด้วยมอเตอร์กระแสตรง ชุดเฟืองทดเพิ่มแรงบิด โพเทนชิโอมิเตอร์วัดมุมเพลา และแผงวงจรเปรียบเทียบตำแหน่ง เมื่อสั่ง arm.write(angle) วงจรภายในจะขับมอเตอร์จนกว่ามุมของเพลาจะตรงกับมุมที่สั่งแล้วหยุดนิ่งรักษามุมนั้นไว้`,en:`Combines a DC motor, reduction gearbox, coupled potentiometer, and internal control IC that drives the horn until measured shaft angle matches the commanded pulse width.`},labTip:{th:`ห้ามใช้มือบิดแขนเซอร์โวฝืนแรงเฟืองขณะที่จ่ายไฟอยู่ และไม่ควรสั่งมุมเกินขีดจำกัดทางกลของตัวเซอร์โวเพราะจะทำให้มอเตอร์กินกระแสค้าง (Stall)`,en:`Avoid forcing the servo horn by hand while powered, and watch for mechanical end-stop binding near 0° or 180°.`},focusPoint:[4.2,1.4,-.5]},stepper:{id:`stepper`,icon:`🧭`,name:{th:`สเต็ปเปอร์มอเตอร์ 5 สายพร้อมชุดเฟืองทด (28BYJ-48 5V)`,en:`28BYJ-48 5V Unipolar Reduction Stepper Motor`},category:{th:`มอเตอร์ควบคุมการหมุนแบบนับก้าว (Stepping Actuator)`,en:`Geared Unipolar Stepper Motor`},packageType:{th:`ตัวถังโลหะเส้นผ่านศูนย์กลาง 28 มม. เพลาเยื้องศูนย์ พร้อมหัวต่อ JST 5 สาย`,en:`28mm Steel Housing with Internal ~64:1 Gear Reduction & 5-Pin Connector`},ratings:{th:`5V DC | 4 เฟส (Coil A, B, C, D) | ประมาณ 2048 ก้าวต่อรอบในโหมด Full-Step (5.625°/64 ต่อก้าว)`,en:`5V DC | 4-Phase Unipolar | Nominal 2048 steps/rev in full-step mode`},pins:[{name:`สายสีแดง (Common Center-Tap V+)`,badgeColor:`#dc2626`,desc:{th:`จุดร่วมของขดลวดทั้ง 4 เฟส ต่อรับไฟบวกจากบอร์ดขับ ULN2003`,en:`Common center-tap of the stator windings, powered via the ULN2003 header.`}},{name:`สายสีส้ม / เหลือง / ชมพู / น้ำเงิน (Coils A–D)`,badgeColor:`#f59e0b`,desc:{th:`ปลายขดลวดแม่เหล็กไฟฟ้าทั้ง 4 เฟสที่ถูกสวิตช์ลงกราวด์ตามลำดับก้าว`,en:`Four stator phase leads energized sequentially by the ULN2003 driver.`}}],principle:{th:`แทนที่จะหมุนต่อเนื่องเหมือนมอเตอร์ทั่วไป สเต็ปเปอร์มอเตอร์จะจ่ายไฟกระตุ้นขดลวดแม่เหล็กทีละเฟสเรียงลำดับกัน ดึงให้โรเตอร์ขยับทีละก้าวคงที่ (Step Angle) ทำให้สามารถควบคุมทั้งมุมหมุนสะสม จำนวนรอบ และทิศทางได้อย่างแม่นยำด้วยการนับจำนวนก้าว`,en:`Energizing stator coils in a discrete phase sequence advances the rotor by fixed angular increments, allowing precise open-loop rotation tracking.`},labTip:{th:`เมื่อใช้ไลบรารี Stepper ของ Arduino กับ 28BYJ-48 มักต้องระบุลำดับพินใน Constructor เป็น Stepper(stepsPerRev, 8, 10, 9, 11) (สลับพินคู่กลาง 9 กับ 10) เพื่อให้ลำดับขดลวดหมุนไปในทิศทางที่ถูกต้อง`,en:`With the standard Arduino Stepper library, pin order is typically Stepper(stepsPerRev, 8, 10, 9, 11) so the coil excitation sequence advances smoothly.`},focusPoint:[5,1.3,-1.2]},uln2003:{id:`uln2003`,icon:`📟`,name:{th:`โมดูลขับสเต็ปเปอร์มอเตอร์ (ULN2003A Darlington Driver Board)`,en:`ULN2003A 7-Channel Darlington Array Stepper Driver Module`},category:{th:`แผงวงจรขับขดลวด 4 เฟสพร้อมไฟแสดงสถานะ`,en:`4-Phase Stepper Driver & LED Indicator Board`},packageType:{th:`โมดูล PCB พร้อมชิป ULN2003A DIP-16, ขั้วเสียบมอเตอร์ 5 พิน และไฟ LED 4 ดวง (A, B, C, D)`,en:`PCB Module with ULN2003A IC, 5-Pin XH Socket & 4 Phase Indicator LEDs (A–D)`},ratings:{th:`รองรับกระแสสูงสุด 500 mA ต่อช่อง | มีไดโอดป้องกันแรงดันย้อนกลับ (Clamp Diodes) ภายในชิปครบทุกช่อง`,en:`500 mA per Darlington pair | Built-in inductive suppression diodes`},pins:[{name:`IN1–IN4 (รับสัญญาณจาก D8, D9, D10, D11)`,badgeColor:`#0284c7`,desc:{th:`พินรับลอจิกควบคุมเฟสทั้ง 4 จากบอร์ด Arduino`,en:`Logic inputs driven by Arduino pins D8–D11.`}},{name:`LED A, B, C, D บนบอร์ด`,badgeColor:`#ef4444`,desc:{th:`ไฟแสดงจังหวะการทำงานของแต่ละเฟสแบบเรียลไทม์`,en:`Onboard phase LEDs showing active coil excitation sequence.`}},{name:`V+ / GND (5V Motor Supply)`,badgeColor:`#dc2626`,desc:{th:`ขั้วรับไฟเลี้ยงภายนอกสำหรับมอเตอร์และกราวด์ร่วม`,en:`External 5V motor power pins and common ground.`}}],principle:{th:`ภายในชิป ULN2003A ประกอบด้วยวงจรทรานซิสเตอร์คู่ดาร์ลิงตัน (Darlington Pair) ที่มีอัตราขยายกระแสสูงมาก ทำหน้าที่รับสัญญาณลอจิกจาก D8–D11 ไปดึงขดลวดแต่ละเฟสของสเต็ปเปอร์มอเตอร์ลงกราวด์ตามลำดับก้าว`,en:`High-gain Darlington transistor pairs amplify logic signals from D8–D11 to sink current through each of the four stepper stator windings.`},labTip:{th:`สังเกตไฟ LED 4 ดวง (A, B, C, D) บนบอร์ด ULN2003: หากไฟวิ่งเรียงลำดับสม่ำเสมอแต่มอเตอร์สั่นอยู่กับที่ ให้ตรวจดูลำดับสายพิน 8, 10, 9, 11 ในโค้ด`,en:`Watch LEDs A–D on the ULN2003 board: if they step in order confirm the 8, 10, 9, 11 pin mapping in your Stepper constructor.`},focusPoint:[3.2,.7,1.2]},"soil-sensor":{id:`soil-sensor`,icon:`🌱`,name:{th:`เซนเซอร์วัดความชื้นในวัสดุปลูก (Soil Moisture Probe & Module)`,en:`Soil Moisture Sensor Probe with Analog Conditioning Module`},category:{th:`เซนเซอร์ตรวจวัดสภาพแวดล้อมเกษตรอัจฉริยะ`,en:`Environmental / Agritech Analog Sensor`},packageType:{th:`หัววัดง่ามคู่เคลือบทอง (หรือแผ่นเก็บประจุ) ปักในกระถางดิน พร้อมโมดูลแอนะล็อก AO`,en:`Dual-Prong Gold-Plated Fork Probe in Soil Pot with Analog Amplifier Board`},ratings:{th:`เอาต์พุตแอนะล็อก AO → A0 | อ่านค่าดิบสูงเมื่อดินแห้ง (เช่น ~800) และค่าลดลงเมื่อดินเปียกชื้น (เช่น ~350)`,en:`Analog Output AO → A0 | Higher raw ADC when dry (~800), lower raw ADC when wet (~350)`},pins:[{name:`AO (Analog Output → A0)`,badgeColor:`#059669`,desc:{th:`ส่งแรงดันแอนะล็อกเข้าพิน A0 เพื่อนำมาปรับเทียบสองจุด (Dry / Wet Calibration)`,en:`Analog output voltage wired to A0 for two-point Dry/Wet calibration.`}},{name:`VCC / GND`,badgeColor:`#dc2626`,desc:{th:`ไฟเลี้ยงโมดูลตามพิกัดและกราวด์ร่วม`,en:`Module supply voltage and common ground.`}}],principle:{th:`น้ำและแร่ธาตุในดินช่วยนำไฟฟ้า (หรือเปลี่ยนค่าไดอิเล็กทริก) เมื่อดินแห้งความต้านทานระหว่างง่ามวัดจะสูงมาก ทำให้แรงดันที่ขา AO สูง (ADC ใกล้ 800–1023) เมื่อรดน้ำจนดินชื้น ค่า ADC จะลดลง (ใกล้ 300–400) โปรแกรมจึงใช้การปรับเทียบ 2 จุดแปลงเป็นสเกลสัมพัทธ์ 0–100%`,en:`Soil water content alters conductivity/permittivity between the probe tines. Two-point calibration maps measured dryRaw (0%) and wetRaw (100%) readings onto a clamped relative percentage scale.`},labTip:{th:`ดินแต่ละชนิด (ดินร่วน ทราย ขุยมะพร้าว) มีความหนาแน่นและเกลือแร่ต่างกัน จึงต้องวัดค่าตอนแห้งจริง (dryRaw) และตอนเปียกจริง (wetRaw) เพื่อปรับเทียบใหม่เสมอ`,en:`Different potting mixes have different conductivity profiles—always measure actual dryRaw and wetRaw endpoints in your specific soil medium.`},focusPoint:[5.2,1.4,1.4]},oled:{id:`oled`,icon:`🖥️`,name:{th:`จอแสดงผลกราฟิก 0.96 นิ้ว (SSD1306 I2C OLED 128×64)`,en:`0.96" SSD1306 Monochrome OLED Display (I2C 128×64)`},category:{th:`อุปกรณ์แสดงผลดิจิทัลผ่านบัสสื่อสาร I2C`,en:`I2C Serial Graphic Display Module`},packageType:{th:`โมดูลจอ OLED เปล่งแสงเอง 128×64 พิกเซล ใช้สายสัญญาณ I2C เพียง 2 เส้น`,en:`4-Pin I2C Self-Emissive OLED Panel (Address 0x3C)`},ratings:{th:`ความละเอียด 128×64 พิกเซล | โปรโตคอล I2C (Address 0x3C) | ใช้ขา A4 (SDA) และ A5 (SCL)`,en:`128×64 Pixels | I2C Bus Address 0x3C | Wired to Uno A4 (SDA) & A5 (SCL)`},pins:[{name:`GND & VCC`,badgeColor:`#475569`,desc:{th:`ขั้วกราวด์และไฟเลี้ยงโมดูลจอแสดงผล (ตรวจสอบลำดับขา GND/VCC บนแผ่น PCB จริงก่อนต่อ)`,en:`Power and Ground rails (always verify pin order printed on your OLED PCB).`}},{name:`SCL (Serial Clock → A5)`,badgeColor:`#0284c7`,desc:{th:`สัญญาณนาฬิกาซิงโครไนซ์ของบัส I2C ต่อกับขา A5 บน Arduino Uno`,en:`I2C clock line wired to pin A5 (or dedicated SCL header pin) on Uno.`}},{name:`SDA (Serial Data → A4)`,badgeColor:`#06b6d4`,desc:{th:`สายรับ-ส่งข้อมูลอนุกรม I2C ต่อกับขา A4 บน Arduino Uno`,en:`I2C bidirectional data line wired to pin A4 (or dedicated SDA pin) on Uno.`}}],principle:{th:`แต่ละพิกเซลเป็นหลอด OLED ขนาดจิ๋วที่เปล่งแสงได้เองโดยไม่ต้องใช้ไฟ Backlight ไมโครคอนโทรลเลอร์ส่งชุดข้อมูลตัวอักษรและกราฟิกผ่านบัส I2C ไปยังชิปควบคุม SSD1306 เพื่อแสดงค่าความชื้นและสถานะ DRY / OK / WET แบบเรียลไทม์`,en:`Each pixel is a self-luminous organic LED controlled by an onboard SSD1306 driver IC over the two-wire I2C bus (SDA/SCL).`},labTip:{th:`บนบอร์ด Arduino Uno ขา I2C คือ A4 (SDA) และ A5 (SCL) หากสลับสายสองเส้นนี้จอจะไม่แสดงผลแต่ไม่เสียหาย`,en:`On Arduino Uno R3, hardware I2C lives on A4 (SDA) and A5 (SCL). Swapping them prevents communication until corrected.`},focusPoint:[3.5,1.5,-1.2]},fsr:{id:`fsr`,icon:`👇`,name:{th:`เซนเซอร์ตรวจจับแรงกดแบบแผ่นฟิล์ม (Interlink FSR-402)`,en:`Force-Sensitive Resistor Thin-Film Pressure Pad (FSR-402)`},category:{th:`เซนเซอร์วัดแรงกด/สัมผัสแบบแอนะล็อก`,en:`Piezoresistive Tactile Force Sensor`},packageType:{th:`แผ่นพอลิเมอร์บางทรงกลมพร้อมลายนิ้วตัวนำประสานกัน (Interdigitated Electrodes)`,en:`Circular Polymer Film Pad with Interdigitated Conductive Fingers`},ratings:{th:`เมื่อไม่กด ความต้านทาน > 1 MΩ (เปิดวงจร) | เมื่อออกแรงกด ความต้านทานลดลงเหลือ ~100 kΩ ถึง < 1 kΩ`,en:`Unpressed Resistance > 1 MΩ | Pressed Resistance drops from ~100 kΩ down to < 1 kΩ`},pins:[{name:`Pin 1 → 5V`,badgeColor:`#dc2626`,desc:{th:`ขั้วหนึ่งของแผ่น FSR ต่อรับแรงดัน 5V`,en:`Connected to the 5V supply rail.`}},{name:`Pin 2 → จุดร่วม A0 & ตัวต้านทาน 10kΩ ลง GND`,badgeColor:`#7c3aed`,desc:{th:`ส่งแรงดันจากวงจรแบ่งแรงดันเข้าขา A0 (ยิ่งกดแรง แรงดันที่ A0 ยิ่งสูงขึ้น)`,en:`Divider node connected to A0 and a 10 kΩ pull-down resistor to GND.`}}],principle:{th:`ภายในแผ่นฟิล์มมีชั้นหมึกพอลิเมอร์กึ่งตัวนำ เมื่อออกแรงกดบนแป้นวงกลม หมึกนำไฟฟ้าจะสัมผัสกับลายซี่โลหะมากขึ้นพื้นที่ ทำให้ความต้านทานลดลงอย่างรวดเร็ว แรงดันที่ตกคร่อมตัวต้านทาน 10 kΩ ที่ขา A0 จึงพุ่งสูงขึ้นตามแรงกด`,en:`Compressing the conductive polymer film against interdigitated electrodes increases microscopic contact area, lowering resistance and raising voltage at A0.`},labTip:{th:`FSR ออกแบบมาเพื่อตรวจจับว่า "มีการกด/สัมผัสมากหรือน้อย" แบบสัมพัทธ์ ไม่ใช่ตาชั่งวัดน้ำหนักที่มีความแม่นยำเชิงเส้นเป็นหน่วยนิวตันหรือกรัมโดยตรง`,en:`FSRs provide qualitative tactile pressure detection rather than precision gravimetric weight measurement in newtons or grams.`},focusPoint:[3.5,.6,1.6]},"traffic-led":{id:`traffic-led`,icon:`🚦`,name:{th:`ชุดไฟสัญญาณบอกโซนระยะทาง 3 สี (Green / Yellow / Red LEDs)`,en:`3-Zone Traffic Status Indicator LEDs (Green D2, Yellow D3, Red D4)`},category:{th:`ระบบแสดงผลแจ้งเตือนหลายระดับ (Multi-Stage Visual Output)`,en:`Multi-Zone Visual Status Array`},packageType:{th:`หลอด LED 5 มม. สีเขียว เหลือง และแดง พร้อมตัวต้านทานจำกัดกระแส 330 Ω แยกอิสระ 3 ชุด`,en:`Three 5mm LEDs (Green, Yellow, Red) with individual 330 Ω series resistors`},ratings:{th:`เขียว (D2: ปลอดภัย > farCm) | เหลือง (D3: เตือนระวัง ≤ farCm) | แดง (D4: ใกล้มาก ≤ nearCm) | ดับทั้งหมดเมื่อ No Echo`,en:`Green (D2: Safe > farCm) | Yellow (D3: Caution ≤ farCm) | Red (D4: Stop ≤ nearCm) | All OFF on No Echo`},pins:[{name:`D2 → 330Ω → LED สีเขียว (Green)`,badgeColor:`#22c55e`,desc:{th:`ติดสว่างเมื่อระยะวัตถุมากกว่าเกณฑ์ไกล (distanceCm > farCm)`,en:`Illuminates when measured distance exceeds farCm.`}},{name:`D3 → 330Ω → LED สีเหลือง (Yellow)`,badgeColor:`#eab308`,desc:{th:`ติดสว่างเมื่อระยะอยู่ในโซนกลาง (nearCm < distanceCm ≤ farCm)`,en:`Illuminates in the intermediate caution zone (nearCm < d ≤ farCm).`}},{name:`D4 → 330Ω → LED สีแดง (Red)`,badgeColor:`#ef4444`,desc:{th:`ติดสว่างเมื่อวัตถุเข้าใกล้ถึงเกณฑ์เตือนภัย (distanceCm ≤ nearCm)`,en:`Illuminates when obstacle is within the near threshold (d ≤ nearCm).`}}],principle:{th:`ทำงานร่วมกับเงื่อนไข if / else if / else ในไมโครคอนโทรลเลอร์ โดยเปิดไฟเพียงสีเดียวที่ตรงกับช่วงระยะทางที่วัดได้ และมีตรรกะ Fail-safe ปิดไฟทุกดวงทันทีเมื่อเซนเซอร์ไม่ได้รับคลื่นสะท้อน (No Echo) เพื่อไม่ให้ผู้ใช้งานเข้าใจผิดว่าปลอดภัย`,en:`Combines sensor data validation with mutually exclusive threshold branching (near < far), turning all indicators OFF if echo data is missing.`},labTip:{th:`การออกแบบระบบวิศวกรรมที่ดีต้องแยกสถานะ "ปลอดภัย (ไฟเขียว)" ออกจากสถานะ "เซนเซอร์เสีย/ไม่มีสัญญาณสะท้อน (ไฟดับทั้งหมด)" เสมอ`,en:`Good engineering design never shows a Green "Safe" light when the sensor times out or loses echo data!`},focusPoint:[4.6,.9,2]}};function lu(e,t){let n=[...t];e!==`board`&&!n.includes(`breadboard`)&&n.splice(1,0,`breadboard`);let r=new Set,i=[];for(let e of n)!r.has(e)&&cu[e]&&(r.add(e),i.push(cu[e]));return i}function uu(e,t,n,r){let i=lu(e,t),a=i.find(e=>e.id===n)||i[0];return a?`
    <div class="space-y-3">
      <!-- Equipment Selector Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
        ${i.map(e=>`
              <button
                type="button"
                class="equipment-part-btn flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${e.id===a.id?`bg-brand-600 text-white border-brand-600 shadow-sm shadow-brand-500/25`:`bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400`}"
                data-part-id="${e.id}"
              >
                <span>${e.icon}</span>
                <span>${e.name[r].split(` (`)[0]}</span>
              </button>
            `).join(``)}
      </div>

      <!-- Active Equipment Detail Card -->
      <div class="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs">
        <div class="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
          <div>
            <div class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <span>${a.icon}</span>
              <span>${a.category[r]}</span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${a.name[r]}</h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${a.packageType[r]}</p>
          </div>
          <button
            type="button"
            id="btn-focus-3d-part"
            data-part-id="${a.id}"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-600 hover:text-white transition-colors"
            title="${r===`th`?`ซูมดูชิ้นส่วนนี้ในมุมมอง 3 มิติ`:`Focus this part in 3D view`}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            <span>${r===`th`?`ซูมดูอุปกรณ์ 3D`:`Focus in 3D`}</span>
          </button>
        </div>

        <!-- Electrical Ratings Badge -->
        <div class="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 font-mono text-[11px] text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">${r===`th`?`พิกัดทางวิศวกรรม:`:`Specs & Ratings:`}</strong> ${a.ratings[r]}
        </div>

        <!-- Pin-by-Pin Breakdown -->
        <div>
          <div class="font-bold text-slate-800 dark:text-slate-200 mb-1.5">
            ${r===`th`?`โครงสร้างขาพินและการเชื่อมต่อ (Pinout & Terminals):`:`Pinout & Terminal Structure:`}
          </div>
          <div class="grid grid-cols-1 gap-1.5">
            ${a.pins.map(e=>`
              <div class="p-2 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-2">
                <span class="mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${e.badgeColor}"></span>
                <div>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">${e.name}:</span>
                  <span class="text-slate-600 dark:text-slate-300 ml-1">${e.desc[r]}</span>
                </div>
              </div>
            `).join(``)}
          </div>
        </div>

        <!-- Working Principle & Lab Safety Tip -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div class="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50">
            <div class="font-bold text-indigo-900 dark:text-indigo-300 mb-0.5">
              ⚙️ ${r===`th`?`หลักการทำงานเชิงฟิสิกส์/ไฟฟ้า`:`Engineering Principle`}
            </div>
            <p class="text-indigo-950/80 dark:text-indigo-200/90 leading-relaxed text-[11px]">${a.principle[r]}</p>
          </div>
          <div class="p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50">
            <div class="font-bold text-amber-900 dark:text-amber-300 mb-0.5">
              ⚠️ ${r===`th`?`ข้อควรระวังในการต่อวงจรจริง`:`Practical Lab Tip`}
            </div>
            <p class="text-amber-950/80 dark:text-amber-200/90 leading-relaxed text-[11px]">${a.labTip[r]}</p>
          </div>
        </div>
      </div>
    </div>
  `:``}function du(e,t){try{let e=document.createElement(`canvas`);if(!(e.getContext(`webgl2`)||e.getContext(`webgl`)))return null}catch{return null}let n=e.clientWidth||640,r=e.clientHeight||420,i=new Hn,a=document.documentElement.classList.contains(`dark`);i.background=new Bn(a?461848:15857145);let o=new wo(38,n/r,.1,120),s=new su({antialias:!0,alpha:!1,powerPreference:`high-performance`});s.setSize(n,r),s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.outputColorSpace=We,s.toneMapping=4,s.toneMappingExposure=1.08,s.shadowMap.enabled=!0,s.shadowMap.type=2,e.innerHTML=``,e.appendChild(s.domElement);let c=new fo(16777215,a?1976635:13358561,.95);c.position.set(0,25,0),i.add(c);let l=new Do(16777215,1.35);l.position.set(12,24,16),l.castShadow=!0,l.shadow.mapSize.width=1024,l.shadow.mapSize.height=1024,l.shadow.camera.near=2,l.shadow.camera.far=50,l.shadow.camera.left=-14,l.shadow.camera.right=14,l.shadow.camera.top=14,l.shadow.camera.bottom=-14,i.add(l);let u=new Do(3718648,.45);u.position.set(-16,12,10),i.add(u);let d=new Do(8141549,.55);d.position.set(0,14,-18),i.add(d);let f=new Da(34,24);f.rotateX(-Math.PI/2);let p=new Va({color:a?725796:14870768,roughness:.85,metalness:.05}),m=new J(f,p);m.position.y=-.04,m.receiveShadow=!0,i.add(m);let h=new Jo(34,34,a?3359061:9741240,a?1976635:13358561);h.position.y=-.02,i.add(h);let g=new q;i.add(g);let _=new Oa(.85,1.05,32);_.rotateX(-Math.PI/2);let v=new mi({color:440020,side:2,transparent:!0,opacity:0}),y=new J(_,v);y.position.set(-3.8,.05,0),g.add(y);let b=0,x=new Va({color:31108,roughness:.32,metalness:.12}),S=new Va({color:1981066,roughness:.35,metalness:.15}),C=new Va({color:1120295,roughness:.55,metalness:.1}),w=new Va({color:13751771,metalness:.85,roughness:.2}),T=new Va({color:10265519,metalness:.78,roughness:.28}),E=new Va({color:16096779,metalness:.85,roughness:.22}),D=new Va({color:14251782,metalness:.75,roughness:.28}),O=new Va({color:1976635,roughness:.45}),k=new Va({color:16317180,roughness:.35});function A(e,t){e.userData.partId=t,e.traverse(e=>{e.userData.partId=t})}function j(e,t,n=`rgba(15, 23, 42, 0.88)`,r=`#38bdf8`,i=`#f8fafc`){let a=e.getContext(`2d`);if(!a)return;let o=e.width,s=e.height;a.clearRect(0,0,o,s),a.fillStyle=n,a.strokeStyle=r,a.lineWidth=3.5,a.beginPath(),a.moveTo(24,8),a.lineTo(o-10-14,8),a.quadraticCurveTo(o-10,8,o-10,22),a.lineTo(o-10,s-8-14),a.quadraticCurveTo(o-10,s-8,o-10-14,s-8),a.lineTo(24,s-8),a.quadraticCurveTo(10,s-8,10,s-8-14),a.lineTo(10,22),a.quadraticCurveTo(10,8,24,8),a.closePath(),a.fill(),a.stroke(),a.fillStyle=i,a.font=`bold 21px "Plus Jakarta Sans", "Prompt", monospace`,a.textAlign=`center`,a.textBaseline=`middle`,a.fillText(t,o/2,s/2+1,o-36)}function M(e,t=`rgba(15, 23, 42, 0.88)`,n=`#38bdf8`,r=`#f8fafc`,i=1.65){let a=document.createElement(`canvas`);a.width=384,a.height=72,j(a,e,t,n,r);let o=new Yi(a);o.colorSpace=We;let s=new si(new qr({map:o,transparent:!0,depthTest:!1}));return s.scale.set(i*1.15,i*.24,1),s.renderOrder=10,s.userData.callout={canvas:a,tex:o,bgColor:t,borderColor:n,textColor:r,lastText:e},s}function N(e,t,n){if(!e||!e.userData?.callout)return;let r=e.userData.callout,i=n||r.borderColor;(r.lastText!==t||r.borderColor!==i)&&(r.lastText=t,r.borderColor=i,j(r.canvas,t,r.bgColor,i,r.textColor),r.tex.needsUpdate=!0)}function ee(){let e=document.createElement(`canvas`);e.width=1024,e.height=768;let t=e.getContext(`2d`);if(t){t.fillStyle=`#007480`,t.fillRect(0,0,1024,768),t.strokeStyle=`rgba(0, 168, 181, 0.35)`,t.lineWidth=4;for(let e=0;e<14;e++)t.beginPath(),t.moveTo(320+e*44,75),t.lineTo(320+e*44,190),t.lineTo(440+e*26,360),t.stroke();for(let e=0;e<6;e++)t.beginPath(),t.moveTo(640+e*52,690),t.lineTo(640+e*52,570),t.lineTo(540+e*32,430),t.stroke();t.strokeStyle=`#e2e8f0`,t.lineWidth=5,t.strokeRect(18,18,988,732);for(let[e,n]of[[210,65],[960,65],[210,700],[950,680]])t.fillStyle=`#f59e0b`,t.beginPath(),t.arc(e,n,22,0,Math.PI*2),t.fill(),t.fillStyle=`#0f172a`,t.beginPath(),t.arc(e,n,12,0,Math.PI*2),t.fill();t.fillStyle=`#ffffff`,t.font=`bold 17px monospace`,t.textAlign=`center`;let e=e=>(e+3.6)/7.2*1024,n=[[-1.75,`SCL`],[-1.49,`SDA`],[-1.23,`AREF`],[-.97,`GND`],[-.71,`13`],[-.45,`12`],[-.19,`~11`],[.07,`~10`],[.33,`~9`],[.59,`8`]],r=[[1.05,`7`],[1.31,`~6`],[1.57,`~5`],[1.83,`4`],[2.09,`~3`],[2.35,`2`],[2.61,`TX`],[2.87,`RX`]];for(let[i,a]of[...n,...r])t.fillText(a,e(i),108);t.font=`bold 23px sans-serif`,t.fillText(`DIGITAL (PWM ~)`,610,148),t.fillStyle=`#ffffff`,t.font=`bold 48px sans-serif`,t.textAlign=`left`,t.fillText(`ARDUINO`,310,265),t.fillStyle=`#38bdf8`,t.font=`bold 44px sans-serif`,t.fillText(`UNO R3`,565,265),t.fillStyle=`#ffffff`,t.font=`bold 19px monospace`,t.fillText(`L (D13)`,355,205),t.fillText(`TX`,355,315),t.fillText(`RX`,355,355),t.fillText(`ON`,825,285),t.fillText(`RESET`,95,130),t.fillText(`ICSP`,925,360),t.textAlign=`center`,t.font=`bold 17px monospace`;for(let[n,r]of[[-1.19,`IOREF`],[-.93,`RST`],[-.67,`3.3V`],[-.41,`5V`],[-.15,`GND`],[.11,`GND`],[.37,`VIN`]])t.fillText(r,e(n),662);for(let[n,r]of[[1.05,`A0`],[1.31,`A1`],[1.57,`A2`],[1.83,`A3`],[2.09,`A4`],[2.35,`A5`]])t.fillText(r,e(n),662);t.font=`bold 23px sans-serif`,t.fillText(`POWER`,e(-.41),622),t.fillText(`ANALOG IN`,e(1.7),622)}let n=new Yi(e);return n.colorSpace=We,n.anisotropy=4,n}function P(){let e=document.createElement(`canvas`);e.width=512,e.height=128;let t=e.getContext(`2d`);t&&(t.fillStyle=`#18181b`,t.fillRect(0,0,512,128),t.strokeStyle=`#3f3f46`,t.lineWidth=4,t.strokeRect(4,4,504,120),t.fillStyle=`#52525b`,t.beginPath(),t.arc(4,64,22,-Math.PI/2,Math.PI/2),t.fill(),t.fillStyle=`#e4e4e7`,t.beginPath(),t.arc(42,95,7,0,Math.PI*2),t.fill(),t.fillStyle=`#d4d4d8`,t.font=`bold 22px monospace`,t.fillText(`ATMEL`,95,46),t.font=`bold 26px monospace`,t.fillStyle=`#ffffff`,t.fillText(`ATMEGA328P-PU`,95,84),t.font=`18px monospace`,t.fillStyle=`#a1a1aa`,t.fillText(`2614  5V-16MHz`,330,46));let n=new Yi(e);return n.colorSpace=We,n}let te,ne,re,ie;function ae(){let e=new q,t=ee(),n=[x,x,new Va({map:t,roughness:.35,metalness:.08}),x,x,x],r=new J(new Y(7.2,.22,5.5),n);r.receiveShadow=!0,r.castShadow=!0,e.add(r);let i=new J(new Y(3.5,.16,.95),O);i.position.set(1.05,.18,.55),e.add(i);let a=P(),o=[C,C,new Va({map:a,roughness:.45}),C,C,C],s=new J(new Y(3.35,.22,.76),o);s.position.set(1.05,.32,.55),s.castShadow=!0,e.add(s);let c=new Y(.06,.22,.12);for(let t=0;t<14;t++){let n=-.48+t*.235,r=new J(c,w);r.position.set(n,.24,.12);let i=new J(c,w);i.position.set(n,.24,.98),e.add(r,i)}let l=new q,u=new J(new Y(1.45,1.1,1.25),w);u.castShadow=!0;let d=new J(new Y(.4,.78,.92),new mi({color:988970}));d.position.set(-.55,0,0);let f=new J(new Y(.45,.28,.55),k);f.position.set(-.52,0,0),l.add(u,d,f),l.position.set(-3.15,.62,-1.25),e.add(l);let p=new q,m=new J(new Y(1.55,1.05,1),O);m.castShadow=!0;let h=new J(new X(.32,.32,.3,16),new mi({color:593174}));h.rotation.z=Math.PI/2,h.position.set(-.68,0,0);let g=new J(new X(.08,.08,.5,12),w);g.rotation.z=Math.PI/2,g.position.set(-.58,0,0),p.add(m,h,g),p.position.set(-3.05,.6,1.75),e.add(p);let _=new J(new Y(.85,.24,.38),w);_.position.set(-.85,.22,.15),e.add(_);let v=new X(.24,.24,.55,16),y=new J(v,T);y.position.set(-1.7,.36,1.45);let b=new J(v,T);b.position.set(-1.7,.36,2.05),e.add(y,b);let S=new J(new Y(.55,.18,.45),C);S.position.set(-2.35,.2,.55);let D=new J(new Y(.5,.14,.5),C);D.position.set(-1.75,.18,-1.1),e.add(S,D);let j=new J(new Y(.55,.22,.55),w);j.position.set(-3,.21,-2.25);let M=new J(new X(.16,.16,.22,16),new Va({color:14753096,roughness:.3}));M.position.set(-3,.34,-2.25),e.add(j,M);function N(e,t,n){let r=new q,i=e*.26+.1,a=new J(new Y(i,.48,.32),O);a.position.set(t+i/2-.13,.34,n),r.add(a);let o=new Y(.12,.06,.12),s=new mi({color:132631});for(let i=0;i<e;i++){let e=new J(o,s);e.position.set(t+i*.26,.56,n),r.add(e)}return r}e.add(N(10,-1.75,-2.48)),e.add(N(8,1.05,-2.48)),e.add(N(8,-1.45,2.48)),e.add(N(6,1.05,2.48));for(let t=0;t<3;t++)for(let n=0;n<2;n++){let r=new J(new X(.035,.035,.45,8),E);r.position.set(3.15+n*.2,.32,-.25+t*.2),e.add(r)}let ae=new J(new Y(.22,.12,.14),new mi({color:2278750}));ae.position.set(2.35,.16,-.65);let oe=new J(new ka(.22,12,12),new mi({color:2278750,transparent:!0,opacity:.28}));oe.position.copy(ae.position),e.add(ae,oe),te=new mi({color:4674921});let F=new J(new Y(.24,.14,.16),te);F.position.set(-.95,.17,-1.35),ne=new mi({color:16096779,transparent:!0,opacity:0});let se=new J(new ka(.35,16,16),ne);se.position.copy(F.position),e.add(F,se),re=new mi({color:3359061});let I=new J(new Y(.18,.1,.12),re);I.position.set(-.95,.16,-.65),ie=new mi({color:3359061});let ce=new J(new Y(.18,.1,.12),ie);return ce.position.set(-.95,.16,-.35),e.add(I,ce),A(e,`uno`),e}let oe=ae();oe.position.set(-3.9,.12,0),g.add(oe);function F(e){let[t,n]={SCL:[-1.75,-2.48],SDA:[-1.49,-2.48],AREF:[-1.23,-2.48],GND_TOP:[-.97,-2.48],D13:[-.71,-2.48],D12:[-.45,-2.48],D11:[-.19,-2.48],D10:[.07,-2.48],D9:[.33,-2.48],D8:[.59,-2.48],D7:[1.05,-2.48],D6:[1.31,-2.48],D5:[1.57,-2.48],D4:[1.83,-2.48],D3:[2.09,-2.48],D2:[2.35,-2.48],D1:[2.61,-2.48],D0:[2.87,-2.48],IOREF:[-1.19,2.48],RST:[-.93,2.48],"3.3V":[-.67,2.48],"5V":[-.41,2.48],GND:[-.15,2.48],GND2:[.11,2.48],VIN:[.37,2.48],A0:[1.05,2.48],A1:[1.31,2.48],A2:[1.57,2.48],A3:[1.83,2.48],A4:[2.09,2.48],A5:[2.35,2.48]}[e]||[0,0];return new G(-3.9+t,.68,n)}let se={"L+":40.5,"L-":58.5,a:121.5,b:145.5,c:169.5,d:193.5,e:217.5,f:299.5,g:323.5,h:347.5,i:371.5,j:395.5,"R+":460.5,"R-":478.5};function I(e,t){let n=Math.max(1,Math.min(30,Math.round(e))),r=se[t],i=46+(n-1)*23.2;return new G(4.2+(r/512-.5)*5.2,.36,(i/768-.5)*7.8)}let ce=null;function le(){if(ce)return ce;let e=document.createElement(`canvas`);e.width=512,e.height=768;let t=e.getContext(`2d`);if(t){t.fillStyle=`#f8fafc`,t.fillRect(0,0,512,768),t.fillStyle=`#cbd5e1`,t.fillRect(238,16,36,736),t.strokeStyle=`#94a3b8`,t.lineWidth=2,t.strokeRect(238,16,36,736),t.strokeStyle=`#ef4444`,t.lineWidth=4,t.beginPath(),t.moveTo(24,36),t.lineTo(24,732),t.moveTo(446,36),t.lineTo(446,732),t.stroke(),t.strokeStyle=`#2563eb`,t.beginPath(),t.moveTo(72,36),t.lineTo(72,732),t.moveTo(490,36),t.lineTo(490,732),t.stroke(),t.fillStyle=`#ef4444`,t.font=`bold 20px monospace`,t.fillText(`+`,18,26),t.fillText(`+`,440,26),t.fillStyle=`#2563eb`,t.fillText(`-`,66,26),t.fillText(`-`,484,26),t.fillStyle=`#475569`,t.font=`bold 16px monospace`,t.textAlign=`center`,[`a`,`b`,`c`,`d`,`e`].forEach((e,n)=>t.fillText(e,121.5+n*24,26)),[`f`,`g`,`h`,`i`,`j`].forEach((e,n)=>t.fillText(e,299.5+n*24,26));for(let e=0;e<30;e++){let n=46+e*23.2;t.strokeStyle=`rgba(148, 163, 184, 0.28)`,t.lineWidth=3,t.beginPath(),t.moveTo(121.5,n),t.lineTo(217.5,n),t.moveTo(299.5,n),t.lineTo(395.5,n),t.stroke(),((e+1)%5==0||e===0)&&(t.fillStyle=`#64748b`,t.font=`bold 13px monospace`,t.fillText(String(e+1),96,n+4),t.fillText(String(e+1),418,n+4)),t.fillStyle=`#1e293b`;for(let e=0;e<5;e++)t.fillRect(117+e*24,n-4.5,9,9);for(let e=0;e<5;e++)t.fillRect(295+e*24,n-4.5,9,9);t.fillRect(36,n-4.5,9,9),t.fillRect(54,n-4.5,9,9),t.fillRect(456,n-4.5,9,9),t.fillRect(474,n-4.5,9,9)}}return ce=new Yi(e),ce.colorSpace=We,ce.anisotropy=4,ce}function ue(){let e=le(),t=[k,k,new Va({map:e,roughness:.4}),k,k,k],n=new J(new Y(5.2,.36,7.8),t);return n.position.set(4.2,.18,0),n.receiveShadow=!0,n.castShadow=!0,A(n,`breadboard`),n}function de(e,t,n=`330`){let r=new q,i=new G().addVectors(e,t).multiplyScalar(.5),a=t.x-e.x,o=t.z-e.z,s=Math.max(.55,Math.hypot(a,o));r.position.set(i.x,e.y,i.z),r.rotation.y=Math.atan2(-o,a);let c=new J(new X(.028,.028,s,8),w);c.rotation.z=Math.PI/2,c.position.y=.28;let l=new J(new X(.028,.028,.36,8),w);l.position.set(-s/2,.11,0);let u=new J(new X(.028,.028,.36,8),w);u.position.set(s/2,.11,0),r.add(c,l,u);let d=Math.min(.68,s*.62),f=new Va({color:n===`330`?16639626:12248829,roughness:.35}),p=new J(new X(.125,.125,d,16),f);p.rotation.z=Math.PI/2,p.position.y=.28,r.add(p);let m=n===`330`?[16347926,16347926,7877903,15381256]:n===`1k`?[7877903,1120295,15680580,15381256]:[7877903,1120295,16347926,15381256],h=[-.32,-.13,.06,.32].map(e=>e*d);return m.forEach((e,t)=>{let n=new J(new X(.132,.132,.05,16),new Va({color:e,roughness:.3,metalness:t===3?.7:.1}));n.rotation.z=Math.PI/2,n.position.set(h[t],.28,0),r.add(n)}),A(r,`resistor`),r}function fe(e,t,n,r=`led`){let i=new q,a=new G().addVectors(e,t).multiplyScalar(.5),o=t.x-e.x,s=t.z-e.z,c=Math.max(.22,Math.hypot(o,s));i.position.set(a.x,e.y,a.z),i.rotation.y=Math.atan2(-s,o);let l=new J(new X(.028,.028,.62,8),w);l.position.set(-c/2,.24,0);let u=new J(new X(.028,.028,.62,8),w);u.position.set(c/2,.24,0);let d=new J(new X(.055,.055,.07,10),new mi({color:15680580}));d.position.set(-c/2,.05,0);let f=new J(new X(.055,.055,.07,10),new mi({color:1976635}));f.position.set(c/2,.05,0);let p=new J(new $i(.1,.18,8),w);p.rotation.x=Math.PI,p.position.set(.09,.68,0);let m=new J(new Y(.04,.16,.04),w);m.position.set(-.09,.66,0),i.add(l,u,d,f,p,m);let h=new Va({color:n,emissive:0,emissiveIntensity:1.4,roughness:.15,metalness:.05,transparent:!0,opacity:.86}),g=new J(new X(.26,.26,.42,20),h);g.position.y=.72;let _=new J(new X(.3,.3,.08,20),h);_.position.y=.51;let v=new J(new ka(.26,20,16,0,Math.PI*2,0,Math.PI/2),h);v.position.y=.93,i.add(g,_,v);let y=new mi({color:n,transparent:!0,opacity:0}),b=new J(new ka(.58,16,16),y);return b.position.y=.82,i.add(b),A(i,r),{group:i,domeMat:h,haloMat:y}}let pe=[];function L(e,t,n,r){let i=new q,a=new Y(.14,.36,.14),o=new J(a,O);o.position.set(e.x,e.y+.12,e.z);let s=new J(a,O);s.position.set(t.x,t.y+.12,t.z),i.add(o,s);let c=new G(e.x,e.y+.28,e.z),l=new G(t.x,t.y+.28,t.z),u=c.distanceTo(l),d=Math.min(2.6,Math.max(.9,u*.32)),f=new G().lerpVectors(c,l,.28);f.y+=d;let p=new G().lerpVectors(c,l,.72);p.y+=d;let m=new xa(c,f,p,l),h=new J(new Aa(m,28,.052,10,!1),new Va({color:n,roughness:.35,metalness:.08}));h.castShadow=!0,i.add(h);let g=new mi({color:n===3359061?3718648:16777215,transparent:!0,opacity:.95}),_=new J(new ka(.095,10,10),g);return _.visible=!1,i.add(_),pe.push({curve:m,mesh:_,speed:.65,offset:pe.length*.23%1,activePin:r?.activePin,alwaysActive:r?.alwaysActive}),i}function me(e){let t=new Set([x,S,C,w,T,E,D,O,k]);e.traverse(e=>{let n=e;if(n.geometry&&n.geometry.dispose(),n.material){let e=Array.isArray(n.material)?n.material:[n.material];for(let n of e)if(!t.has(n)){let e=n;e.map&&e.map!==ce&&e.map.dispose(),n.dispose()}}})}let he=null,R={},ge=``,_e=!1,ve={};function ye(e){let t=new q;switch(R={},pe=[],e.id!==`board`&&t.add(ue()),e.id){case`board`:{let e=M(`USB Serial & 5V`,`rgba(15,23,42,0.9)`,`#38bdf8`);e.position.set(-7,1.6,-1.25);let n=M(`DC 7–12V Jack`,`rgba(15,23,42,0.9)`,`#f59e0b`);n.position.set(-6.95,1.5,1.75);let r=M(`ATmega328P MCU`,`rgba(15,23,42,0.9)`,`#a855f7`);r.position.set(-2.8,1.4,.55);let i=M(`Digital D0–D13 (PWM~)`,`rgba(15,23,42,0.9)`,`#0284c7`,`#f8fafc`,2);i.position.set(-3.5,1.55,-2.55);let a=M(`5V / GND / Analog A0–A5`,`rgba(15,23,42,0.9)`,`#ef4444`,`#f8fafc`,2.1);a.position.set(-3.5,1.55,2.55);let o=M(`LED_BUILTIN (D13)`,`rgba(15,23,42,0.9)`,`#22c55e`);o.position.set(-4.85,1.25,-1.35),t.add(e,n,r,i,a,o);break}case`blink`:{let e=de(I(10,`c`),I(15,`c`),`330`);t.add(e);let n=fe(I(15,`e`),I(18,`e`),15680580,`led`);t.add(n.group),R.extLed=n.domeMat,R.extLedHalo=n.haloMat;let r=M(`LED (15e+ → 18e-)`,`rgba(15,23,42,0.88)`,`#ef4444`,`#ffffff`,1.5);r.position.set(4.15,1.72,I(16,`e`).z);let i=M(`R1: 330 Ω (10c→15c)`,`rgba(15,23,42,0.88)`,`#f59e0b`,`#ffffff`,1.5);i.position.set(3.25,1.18,I(12,`c`).z),t.add(r,i),t.add(L(F(`D13`),I(10,`a`),165063,{activePin:`D13`})),t.add(L(I(18,`a`),F(`GND`),3359061,{activePin:`D13`}));break}case`button`:{let e=M(`LED_BUILTIN (D13)`,`rgba(15,23,42,0.9)`,`#f59e0b`,`#ffffff`,1.65);e.position.set(-4.85,1.25,-1.35),t.add(e);let n=I(14,`e`),r=I(16,`f`),i=(n.z+r.z)*.5,a=(r.x-n.x)*.5,o=(r.z-n.z)*.5,s=new q;s.position.set(4.2,.36,i);let c=new J(new Y(.92,.28,.68),O);c.position.y=.22;let l=new J(new Y(.84,.04,.62),w);l.position.y=.37;let u=new Va({color:14753096,roughness:.25}),d=new J(new X(.22,.22,.26,20),u);d.position.y=.47;for(let e of[-a,a])for(let t of[-o,o]){let n=new J(new Y(.045,.3,.045),w);n.position.set(e,.08,t),s.add(n)}s.add(c,l,d),A(s,`button`),t.add(s),R.btnActuator=d;let f=M(`SW1 (Row 14e–16f)`,`rgba(15,23,42,0.88)`,`#38bdf8`,`#ffffff`,1.6);f.position.set(4.2,1.38,i),t.add(f),t.add(L(F(`D2`),I(14,`a`),440020,{alwaysActive:!0})),t.add(L(I(16,`a`),F(`GND`),3359061,{alwaysActive:!0}));break}case`knob`:{let e=I(6,`d`),n=I(8,`d`),r=I(10,`d`),i=new q;i.position.set(n.x,.36,n.z);let a=new J(new X(.68,.68,.42,28),T);a.position.set(.32,.34,0);let o=new J(new X(.24,.24,.28,16),E);o.position.set(.32,.62,0);let s=new q;s.position.set(.32,.76,0);let c=new J(new X(.38,.42,.52,24),new Va({color:2450411,roughness:.3})),l=new J(new Y(.08,.55,.34),k);l.position.set(0,.02,-.12),s.add(c,l);for(let t of[e.z-n.z,0,r.z-n.z]){let e=new J(new Y(.05,.38,.05),w);e.position.set(0,.14,t);let n=new J(new Y(.32,.04,.05),w);n.position.set(.16,.3,t),i.add(e,n)}i.add(a,o,s),A(i,`potentiometer`),t.add(i),R.potShaft=s;let u=de(I(17,`c`),I(22,`c`),`330`);t.add(u);let d=fe(I(22,`e`),I(25,`e`),16096779,`led`);t.add(d.group),R.pwmLed=d.domeMat,R.pwmLedHalo=d.haloMat;let f=M(`10kΩ Pot (6d/8d/10d)`,`rgba(15,23,42,0.88)`,`#7c3aed`,`#ffffff`,1.55);f.position.set(4.1,1.85,n.z);let p=M(`PWM LED (~D9)`,`rgba(15,23,42,0.88)`,`#f59e0b`,`#ffffff`,1.5);p.position.set(4.1,1.68,I(23,`e`).z),t.add(f,p),t.add(L(F(`5V`),I(6,`a`),14427686,{alwaysActive:!0})),t.add(L(I(8,`a`),F(`A0`),8141549,{alwaysActive:!0})),t.add(L(I(10,`b`),I(10,`L-`),3359061)),t.add(L(F(`D9`),I(17,`a`),16096779,{activePin:`D9`})),t.add(L(I(25,`b`),I(25,`L-`),3359061)),t.add(L(I(2,`L-`),F(`GND`),3359061));break}case`rgb`:{let e=[10,12,14,16].map(e=>I(e,`h`)),n=(e[0].z+e[3].z)*.5,r=e[0].x,i=new q;i.position.set(r,.36,n);let a=[15680580,9741240,2278750,3900150];for(let t=0;t<4;t++){let r=e[t].z-n,o=(t-1.5)*.14,s=new J(new X(.024,.024,.34,8),w);s.position.set(0,.12,r);let c=new G(0,.45,o).sub(new G(0,.28,r)),l=new J(new X(.022,.022,c.length(),8),w);l.position.set(0,.365,(r+o)*.5),l.quaternion.setFromUnitVectors(new G(0,1,0),c.clone().normalize());let u=new J(new X(.045,.045,.07,8),new mi({color:a[t]}));u.position.set(0,.14,r),i.add(s,l,u)}let o=new Va({color:16777215,emissive:8404992,emissiveIntensity:1.5,roughness:.1,transparent:!0,opacity:.88}),s=new J(new X(.36,.36,.48,24),o);s.position.y=.68;let c=new J(new ka(.36,24,16,0,Math.PI*2,0,Math.PI/2),o);c.position.y=.92;let l=new mi({color:8404992,transparent:!0,opacity:.35}),u=new J(new ka(.8,20,20),l);u.position.y=.82,i.add(s,c,u),A(i,`rgb`),t.add(i),R.rgbDome=o,R.rgbHalo=l,t.add(de(I(10,`d`),I(10,`f`),`330`)),t.add(de(I(14,`d`),I(14,`f`),`330`)),t.add(de(I(16,`d`),I(16,`f`),`330`));let d=M(`RGB LED (Rows 10/12/14/16h)`,`rgba(15,23,42,0.9)`,`#ec4899`,`#ffffff`,1.75);d.position.set(r,1.85,n),t.add(d),t.add(L(F(`D9`),I(10,`a`),15680580,{activePin:`D9`})),t.add(L(F(`D10`),I(14,`a`),2278750,{activePin:`D10`})),t.add(L(F(`D11`),I(16,`a`),3900150,{activePin:`D11`})),t.add(L(I(12,`j`),F(`GND`),3359061));break}case`light`:{let e=I(11,`d`),n=I(15,`d`),r=(e.z+n.z)*.5,i=(n.z-e.z)*.5,a=new q;a.position.set(e.x,.36,r);let o=new J(new X(.025,.025,.58,8),w);o.position.set(0,.25,-i);let s=new J(new X(.025,.025,.58,8),w);s.position.set(0,.25,i);let c=document.createElement(`canvas`);c.width=128,c.height=128;let l=c.getContext(`2d`);if(l){l.fillStyle=`#fde68a`,l.beginPath(),l.arc(64,64,60,0,Math.PI*2),l.fill(),l.strokeStyle=`#c2410c`,l.lineWidth=8;for(let e=28;e<=100;e+=18)l.beginPath(),l.moveTo(26,e),l.lineTo(102,e),l.stroke()}let u=new Yi(c);u.colorSpace=We;let d=new J(new X(.46,.46,.14,24),[new Va({color:14251782}),new Va({map:u,roughness:.25}),new Va({color:16639626})]);d.position.y=.56,a.add(o,s,d),A(a,`ldr`),t.add(a);let f=new mi({color:16436245}),p=new mi({color:16707722,transparent:!0,opacity:.35}),m=new q,h=new J(new ka(.32,16,16),f),g=new J(new ka(.58,16,16),p);m.add(h,g),m.position.set(e.x,2.25,r),A(m,`ldr`),t.add(m),R.sunMat=f,R.sunHaloMat=p,R.sunGroup=m,t.add(de(I(15,`b`),I(20,`b`),`10k`));let _=M(`LED_BUILTIN (D13)`,`rgba(15,23,42,0.9)`,`#f59e0b`,`#ffffff`,1.65);_.position.set(-4.85,1.25,-1.35),t.add(_);let v=M(`LDR (11d→15d) + 10kΩ (15b→20b)`,`rgba(15,23,42,0.9)`,`#eab308`,`#ffffff`,1.85);v.position.set(4.1,1.45,I(17,`d`).z),t.add(v),t.add(L(F(`5V`),I(11,`a`),14427686,{alwaysActive:!0})),t.add(L(I(15,`a`),F(`A0`),440020,{alwaysActive:!0})),t.add(L(I(20,`a`),F(`GND`),3359061));break}case`sensor`:case`project`:{let n=[6,8,10,12].map(e=>I(e,`e`)),r=(n[0].z+n[3].z)*.5,i=n[0].x,a=new q;a.position.set(i,.36,r);let o=new J(new Y(.18,1.65,3.4),S);o.position.y=1.05,a.add(o);for(let e of[-.92,.92]){let t=new J(new X(.56,.56,.72,24),w);t.rotation.z=Math.PI/2,t.position.set(.42,1.05,e);let n=new J(new X(.46,.46,.75,20),new Va({color:1976635,roughness:.7,metalness:.5}));n.rotation.z=Math.PI/2,n.position.set(.42,1.05,e),a.add(t,n)}for(let e=0;e<4;e++){let t=new J(new X(.03,.03,.42,8),E);t.position.set(0,.14,n[e].z-r),a.add(t)}A(a,`ultrasonic`),t.add(a);let s=[];for(let e=0;e<3;e++){let n=new Oa(.25+e*.15,.33+e*.15,24);n.rotateY(Math.PI/2);let a=new J(n,new mi({color:440020,side:2,transparent:!0,opacity:.65}));a.position.set(i+.9+e*.7,1.4,r),t.add(a),s.push(a)}R.sonarRings=s;let c=new q,l=new Va({color:16096779,roughness:.35,transparent:!0,opacity:.95}),u=new J(new Y(.35,2.2,3),l);u.position.y=1.1,u.castShadow=!0;let d=new J(new Y(.38,.35,2.8),new mi({color:1976635}));d.position.y=1.1,c.add(u,d);let f=M(`30.0 cm`,`rgba(15,23,42,0.92)`,`#06b6d4`,`#ffffff`,1.5);f.position.set(0,2.65,0),c.add(f),R.distSprite=f,c.position.set(6.6,.36,r),A(c,`obstacle`),t.add(c),R.obstacleGroup=c,R.obstacleWallMat=l;let p=M(`HC-SR04 (6e/8e/10e/12e)`,`rgba(15,23,42,0.9)`,`#0284c7`,`#ffffff`,1.85);if(p.position.set(i,2.5,r),t.add(p),t.add(L(F(`5V`),I(6,`a`),14427686,{alwaysActive:!0})),t.add(L(F(`D9`),I(8,`a`),165063,{alwaysActive:!0})),t.add(L(I(10,`a`),F(`D10`),440020,{alwaysActive:!0})),t.add(L(I(12,`a`),F(`GND`),3359061)),e.id===`project`){R.projectLeds=[],R.projectHalos=[],[{col:15680580,row:18,pin:`D4`},{col:15381256,row:22,pin:`D3`},{col:2278750,row:26,pin:`D2`}].forEach(e=>{t.add(L(F(e.pin),I(e.row,`a`),e.col,{activePin:e.pin})),t.add(de(I(e.row,`d`),I(e.row,`f`),`330`));let n=fe(I(e.row,`h`),I(e.row,`R-`),e.col,`traffic-led`);t.add(n.group),R.projectLeds.push(n.domeMat),R.projectHalos.push(n.haloMat)}),t.add(L(I(29,`R-`),F(`GND2`),3359061));let e=M(`Zone LEDs (Rows 18/22/26)`,`rgba(15,23,42,0.9)`,`#22c55e`,`#ffffff`,1.8);e.position.set(4.8,1.75,I(22,`h`).z),t.add(e)}break}case`sound`:{let e=I(13,`d`),n=I(17,`d`),r=(e.z+n.z)*.5,i=(n.z-e.z)*.5,a=new q;a.position.set(e.x,.36,r);for(let e of[-i,i]){let t=new J(new X(.028,.028,.35,8),w);t.position.set(0,.12,e),a.add(t)}let o=new J(new X(.76,.76,.64,28),C);o.position.y=.48;let s=new J(new X(.2,.2,.66,16),new mi({color:14251782}));s.position.y=.48,a.add(o,s);let c=[];for(let e=0;e<3;e++){let t=new Oa(.45+e*.35,.53+e*.35,28);t.rotateX(-Math.PI/2);let n=new J(t,new mi({color:11032055,side:2,transparent:!0,opacity:0}));n.position.y=.92+e*.25,a.add(n),c.push(n)}R.soundRings=c,A(a,`piezo`),t.add(a);let l=M(`Piezo Buzzer (13d+ / 17d-)`,`rgba(15,23,42,0.9)`,`#a855f7`,`#ffffff`,1.65);l.position.set(e.x,1.88,r),t.add(l),t.add(L(F(`D8`),I(13,`a`),8141549,{activePin:`D8`})),t.add(L(I(17,`a`),F(`GND`),3359061));break}case`piano`:{R.pianoKeys=[];let e=[`C`,`D`,`E`,`F`,`G`,`A`,`B`,`C2`],n=[15680580,16347926,15381256,2278750,440020,3900150,9133302,15485081];for(let e=0;e<8;e++){let r=2+e*3,i=I(r,`e`),a=I(r,`f`),o=new q;o.position.set(4.2,.36,i.z);let s=new J(new Y(.86,.22,.48),O);s.position.y=.18;let c=new Va({color:n[e],roughness:.3}),l=new J(new X(.16,.16,.22,16),c);l.position.y=.36;for(let e of[i.x-4.2,a.x-4.2]){let t=new J(new Y(.04,.24,.04),w);t.position.set(e,.06,0),o.add(t)}o.add(s,l),A(o,`button`),t.add(o),R.pianoKeys.push({mesh:l,mat:c,baseColor:n[e]});let u=`D${2+e}`;t.add(L(F(u),I(r,`a`),n[e])),t.add(L(I(r,`i`),I(r,`R-`),3359061))}let r=I(27,`d`),i=I(29,`d`),a=(r.z+i.z)*.5,o=new q;o.position.set(r.x,.36,a);let s=new J(new X(.55,.55,.48,24),C);s.position.y=.36;let c=new J(new X(.15,.15,.5,16),E);c.position.y=.36,o.add(s,c),A(o,`piezo`),t.add(o);let l=M(`8 Keys (${e.join(` `)})`,`rgba(15,23,42,0.9)`,`#06b6d4`,`#ffffff`,1.75);l.position.set(4.2,1.45,I(13,`e`).z),t.add(l),t.add(L(F(`D10`),I(27,`a`),440020,{activePin:`D10`})),t.add(L(I(29,`a`),F(`GND`),3359061)),t.add(L(I(30,`R-`),F(`GND2`),3359061));break}case`motor`:{let e=new q;e.position.set(5.3,1.35,I(6,`h`).z);let n=new J(new X(.75,.75,1.55,24),T);n.rotation.z=Math.PI/2,n.castShadow=!0;let r=new J(new X(.71,.71,.2,24),O);r.rotation.z=Math.PI/2,r.position.x=-.82;let i=new q;i.position.x=1;let a=new J(new X(.1,.1,.6,12),w);a.rotation.z=Math.PI/2;let o=new J(new X(.24,.24,.16,16),new Va({color:366185}));o.rotation.z=Math.PI/2,o.position.x=.15,i.add(a,o);for(let e=0;e<3;e++){let t=new q;t.rotation.x=e*Math.PI*2/3;let n=new J(new Y(.06,.72,.24),new Va({color:1096065,roughness:.25}));n.position.set(.15,.44,0),t.add(n),i.add(t)}e.add(n,r,i),A(e,`dc-motor`),t.add(e),R.motorRotor=i,t.add(de(I(11,`c`),I(15,`c`),`1k`));let s=I(15,`d`),c=I(17,`d`),l=I(19,`d`),u=new q;u.position.set(c.x,.36,c.z);let d=new J(new Y(.24,.62,.85),C);d.position.y=.58;let f=new J(new Y(.06,.35,.85),w);f.position.set(-.09,.95,0);for(let e of[s.z-c.z,0,l.z-c.z]){let t=new J(new Y(.05,.38,.05),w);t.position.set(0,.14,e),u.add(t)}u.add(d,f),A(u,`driver`),t.add(u);let p=I(17,`g`),m=I(12,`g`),h=(p.z+m.z)*.5,g=Math.abs(p.z-m.z),_=new q;_.position.set(p.x,.36,h);for(let e of[-g*.5,g*.5]){let t=new J(new X(.025,.025,.34,8),w);t.position.set(0,.13,e),_.add(t)}let v=new J(new X(.025,.025,g,8),w);v.rotation.x=Math.PI/2,v.position.y=.28;let y=new J(new X(.12,.12,.56,16),C);y.rotation.x=Math.PI/2,y.position.y=.28;let b=new J(new X(.126,.126,.12,16),w);b.rotation.x=Math.PI/2,b.position.set(0,.28,-.16),_.add(v,y,b),A(_,`diode`),t.add(_);let x=new q;x.position.set(6.4,.42,2.2);let S=new J(new Y(1.5,.7,2),O),E=M(`EXT 6V Supply`,`rgba(15,23,42,0.9)`,`#dc2626`,`#ffffff`,1.4);E.position.set(0,.9,0),x.add(S,E),A(x,`supply`),t.add(x);let D=M(`DC Motor + Q1 (15d/17d/19d)`,`rgba(15,23,42,0.9)`,`#10b981`,`#ffffff`,1.75);D.position.set(4.8,2.35,I(6,`h`).z),t.add(D),t.add(L(F(`D5`),I(11,`a`),165063,{activePin:`D5`})),t.add(L(I(17,`e`),I(17,`f`),16096779,{activePin:`D5`})),t.add(L(new G(5.85,.7,1.6),I(12,`j`),14427686,{alwaysActive:!0})),t.add(L(I(12,`i`),new G(4.5,1.35,I(6,`h`).z-.2),14427686,{alwaysActive:!0})),t.add(L(I(17,`i`),new G(4.5,1.35,I(6,`h`).z+.2),165063,{activePin:`D5`})),t.add(L(new G(5.85,.7,2.4),I(19,`b`),3359061)),t.add(L(I(19,`a`),F(`GND`),3359061));break}case`heat`:{let e=I(13,`d`),n=I(15,`d`),r=I(17,`d`),i=new q;i.position.set(n.x,.36,n.z);let a=new J(new X(.32,.32,.56,20,1,!1,0,Math.PI),C);a.position.y=.58;let o=new J(new Da(.64,.56),C);o.position.y=.58,o.rotation.y=-Math.PI/2;for(let t of[e.z-n.z,0,r.z-n.z]){let e=new J(new X(.024,.024,.48,8),w);e.position.set(0,.2,t),i.add(e)}let s=new mi({color:16347926,transparent:!0,opacity:.32}),c=new J(new ka(.62,16,16),s);c.position.y=.58,i.add(a,o,c),A(i,`tmp36`),t.add(i),R.heatAura=s;let l=M(`TMP36 (13d:5V, 15d:A0, 17d:GND)`,`rgba(15,23,42,0.9)`,`#f97316`,`#ffffff`,1.85);l.position.set(n.x,1.68,n.z),t.add(l),R.heatLabel=l,t.add(L(F(`5V`),I(13,`a`),14427686,{alwaysActive:!0})),t.add(L(I(15,`a`),F(`A0`),16096779,{alwaysActive:!0})),t.add(L(I(17,`a`),F(`GND`),3359061));break}case`servo`:{let e=I(13,`e`),n=I(15,`e`),r=I(17,`e`),i=new q;i.position.set(4.85,.36,n.z);let a=new Va({color:165063,roughness:.22,transparent:!0,opacity:.9}),o=new J(new Y(1.22,1.62,2.25),a);o.position.y=.85;let s=new J(new Y(1.22,.14,3.05),a);s.position.y=1.15;let c=new J(new X(.5,.5,.35,24),a);c.position.set(0,1.75,-.55);let l=new J(new X(.16,.16,.25,16),E);l.position.set(0,1.95,-.55);let u=new Oa(1.35,1.6,32,1,0,Math.PI);u.rotateX(-Math.PI/2);let d=new J(u,new mi({color:3718648,side:2,transparent:!0,opacity:.38}));d.position.set(0,1.98,-.55);let f=new q;f.position.set(0,2.04,-.55);let p=new J(new X(.26,.26,.14,16),k),m=new J(new Y(.28,.1,1.45),k);m.position.z=-.62;let h=new J(new X(.1,.1,.16,12),w);f.add(p,m,h),i.add(o,s,c,l,d,f),A(i,`servo`),t.add(i),R.servoHorn=f;for(let i of[e,n,r]){let e=new J(new X(.03,.03,.38,8),E);e.position.set(i.x,.5,i.z),t.add(e)}let g=new J(new Y(1.4,.6,1.6),O);g.position.set(6.35,.35,2.2),A(g,`supply`),t.add(g);let _=M(`SG90 Servo (13e:D9, 15e:+5V, 17e:GND)`,`rgba(15,23,42,0.9)`,`#0284c7`,`#ffffff`,1.85);_.position.set(4.6,2.85,n.z),t.add(_),t.add(L(F(`D9`),I(13,`a`),16096779,{activePin:`D9`})),t.add(L(new G(5.8,.55,2),I(15,`b`),14427686,{alwaysActive:!0})),t.add(L(new G(5.8,.55,2.4),I(17,`c`),3359061)),t.add(L(I(17,`a`),F(`GND`),3359061));break}case`stepper`:{let e=new q;e.position.set(5.1,.36,-1.4);let n=new J(new X(1.25,1.25,1.15,32),T);n.position.y=.6;let r=new J(new Y(3.2,.08,.55),w);r.position.y=1.12;let i=new J(new Y(.85,.55,.45),new Va({color:2450411,roughness:.4}));i.position.set(0,.52,1.12);let a=new q;a.position.set(0,1.28,.35);let o=new J(new X(.22,.22,.35,16),E),s=new J(new X(.85,.85,.08,24),k);s.position.y=.14;let c=new J(new Y(.14,.12,.78),new Va({color:15680580}));c.position.set(0,.18,-.32),a.add(o,s,c),e.add(n,r,i,a),A(e,`stepper`),t.add(e),R.stepperGear=a;let l=new q;l.position.set(3.6,.36,1.45);let u=new J(new Y(2.1,.16,1.85),S);u.position.y=.15;let d=new J(new Y(1.1,.2,.45),C);d.position.set(0,.28,0);let f=new J(new Y(.95,.35,.35),k);f.position.set(.4,.32,-.65),l.add(u,d,f),R.ulnLeds=[];for(let e=0;e<4;e++){let t=new mi({color:3359061}),n=new J(new ka(.11,12,12),t);n.position.set(-.65+e*.35,.28,.62),l.add(n),R.ulnLeds.push(t)}A(l,`uln2003`),t.add(l);let p=new q;p.position.set(6.35,.38,1.95);let m=new J(new Y(1.55,.65,1.85),O),h=M(`EXT 5V Supply`,`rgba(15,23,42,0.9)`,`#dc2626`,`#ffffff`,1.38);h.position.set(0,.85,0),p.add(m,h),A(p,`supply`),t.add(p);let g=M(`28BYJ-48 + ULN2003 (A–D)`,`rgba(15,23,42,0.9)`,`#f59e0b`,`#ffffff`,1.8);g.position.set(4.5,2.35,0),t.add(g),t.add(L(F(`D8`),new G(2.8,.5,1.15),165063,{activePin:`D8`})),t.add(L(F(`D9`),new G(2.8,.5,1.35),2278750,{activePin:`D9`})),t.add(L(F(`D10`),new G(2.8,.5,1.55),16096779,{activePin:`D10`})),t.add(L(F(`D11`),new G(2.8,.5,1.75),15485081,{activePin:`D11`}));let _=[3900150,16020150,16436245,16347926,15680580],v=[`D8`,`D9`,`D10`,`D11`,void 0];_.forEach((e,n)=>{let r=(n-2)*.14;t.add(L(new G(4+r,.55,.8),new G(5.1+r*.85,.72,-.32),e,v[n]?{activePin:v[n]}:{alwaysActive:!0}))}),t.add(L(new G(5.75,.65,1.75),new G(4.45,.5,2.05),14427686,{alwaysActive:!0})),t.add(L(new G(4.2,.5,2.05),F(`GND`),3359061));break}case`plant`:{let e=[5,7,9,11].map(e=>I(e,`d`)),n=(e[0].z+e[3].z)*.5,r=e[0].x,i=new q;i.position.set(r,.36,n);let a=new J(new Y(.14,1.75,2.35),S);a.position.y=1.05;let o=document.createElement(`canvas`);o.width=256,o.height=128;let s=new Yi(o);s.colorSpace=We;let c=new mi({map:s}),l=new J(new Da(2.1,1.15),c);l.rotation.y=Math.PI/2,l.position.set(.08,1,0);for(let t=0;t<4;t++){let r=new J(new X(.03,.03,.42,8),E);r.position.set(0,.14,e[t].z-n),i.add(r)}i.add(a,l),A(i,`oled`),t.add(i),R.oledCanvas=o,R.oledTex=s;let u=new q;u.position.set(5.45,.36,I(22,`h`).z);let d=new J(new X(1.1,.82,1.35,24),new Va({color:12730636,roughness:.65}));d.position.y=.68;let f=new Va({color:7162945,roughness:.9}),p=new J(new X(1.02,1.02,.15,24),f);p.position.y=1.3,R.soilMat=f;let m=new J(new Y(.75,.45,.1),x);m.position.y=1.85;let h=new J(new Y(.18,.9,.08),E);h.position.set(-.24,1.45,0);let g=new J(new Y(.18,.9,.08),E);g.position.set(.24,1.45,0),u.add(d,p,m,h,g),A(u,`soil-sensor`),t.add(u),t.add(L(I(5,`a`),F(`GND`),3359061)),t.add(L(F(`5V`),I(7,`a`),14427686,{alwaysActive:!0})),t.add(L(F(`A5`),I(9,`a`),165063,{alwaysActive:!0})),t.add(L(F(`A4`),I(11,`a`),440020,{alwaysActive:!0})),t.add(L(new G(5.45,2,I(22,`h`).z),I(22,`f`),1096065,{alwaysActive:!0})),t.add(L(I(22,`i`),F(`A0`),1096065,{alwaysActive:!0}));break}case`force`:{let e=I(18,`d`),n=I(22,`d`),r=(e.z+n.z)*.5,i=new q;i.position.set(e.x,.36,r);for(let t of[e.z-r,n.z-r]){let e=new J(new X(.025,.025,.42,8),w);e.position.set(0,.16,t),i.add(e)}let a=new J(new X(.76,.76,.06,28),new Va({color:292951,roughness:.35}));a.position.y=.38;let o=new J(new X(.58,.58,.07,24),E);o.position.y=.385;let s=new Va({color:6514417,roughness:.3,transparent:!0,opacity:.85}),c=new J(new X(.36,.3,.52,20),s);c.position.y=.92,i.add(a,o,c),A(i,`fsr`),t.add(i),R.fsrPlunger=c,t.add(de(I(22,`b`),I(27,`b`),`10k`));let l=I(6,`h`),u=new q;u.position.set(l.x,.36,l.z);let d=new J(new X(.95,.95,.12,28),k);d.position.y=.22;let f=new q;f.position.y=.32;let p=new J(new Y(.1,.06,.82),new Va({color:15680580}));p.position.z=-.34;let m=new J(new X(.14,.14,.1,16),C);f.add(p,m),u.add(d,f),A(u,`servo`),t.add(u),R.forceNeedle=f;let h=I(13,`h`),g=I(16,`h`),_=new q;_.position.set(h.x,.36,(h.z+g.z)*.5);let v=new J(new X(.52,.52,.48,20),C);v.position.y=.34;let y=new mi({color:16096779,transparent:!0,opacity:0}),b=new J(new ka(.72,16,16),y);b.position.y=.4,_.add(v,b),A(_,`piezo`),t.add(_),R.forceBellHalo=y;let x=M(`FSR-402 (18d→22d) + 10kΩ (22b→27b)`,`rgba(15,23,42,0.9)`,`#10b981`,`#ffffff`,1.75);x.position.set(e.x,1.55,r);let S=M(`Dial Servo (Row 6f)`,`rgba(15,23,42,0.9)`,`#0284c7`,`#ffffff`,1.45);S.position.set(l.x,1.35,l.z),t.add(x,S),t.add(L(F(`5V`),I(18,`a`),14427686,{alwaysActive:!0})),t.add(L(I(22,`a`),F(`A0`),8141549,{alwaysActive:!0})),t.add(L(I(27,`a`),F(`GND`),3359061)),t.add(L(F(`D9`),I(6,`f`),165063,{activePin:`D9`})),t.add(L(F(`D8`),I(13,`f`),16096779,{activePin:`D8`})),t.add(L(I(16,`j`),I(16,`R-`),3359061)),t.add(L(I(27,`R-`),F(`GND2`),3359061));break}}return t}function be(e,t){let n=R.oledCanvas,r=R.oledTex;if(!n||!r)return;let i=n.getContext(`2d`);if(!i)return;i.fillStyle=`#040814`,i.fillRect(0,0,256,128),i.strokeStyle=`#1e293b`,i.lineWidth=3,i.strokeRect(2,2,252,124),i.fillStyle=`#facc15`,i.font=`bold 17px monospace`,i.fillText(`SSD1306 I2C 0x3C`,14,22),i.fillStyle=t?`#22c55e`:`#64748b`,i.fillText(t?`● LIVE`:`○ IDLE`,180,22),i.strokeStyle=`#334155`,i.lineWidth=1,i.beginPath(),i.moveTo(8,30),i.lineTo(248,30),i.stroke();let a=e.relativePercent??50,o=String(e.condition??`ok`).toUpperCase(),s=e.adc??600;i.fillStyle=`#38bdf8`,i.font=`bold 34px monospace`,i.fillText(`${a}%`,16,70),i.font=`bold 20px monospace`,i.fillStyle=o===`DRY`?`#fbbf24`:o===`WET`?`#60a5fa`:`#34d399`,i.fillText(`[${o}]`,125,68),i.strokeStyle=`#38bdf8`,i.lineWidth=2,i.strokeRect(16,84,224,16),i.fillStyle=`#0ea5e9`,i.fillRect(18,86,Math.max(2,Math.round(a/100*220)),12),i.fillStyle=`#94a3b8`,i.font=`14px monospace`,i.fillText(`RAW A0: ${s}`,16,118),r.needsUpdate=!0}let xe=!1,Se={x:0,y:0},Ce={x:0,y:0},we={radius:20.5,phi:.82,theta:.22},Te={radius:20.5,phi:.82,theta:.22},Ee=new G(.2,.4,0),De=new G(.2,.4,0);function Oe(){Ee.copy(De),we={...Te},o.position.x=Ee.x+we.radius*Math.sin(we.phi)*Math.sin(we.theta),o.position.y=Ee.y+we.radius*Math.cos(we.phi),o.position.z=Ee.z+we.radius*Math.sin(we.phi)*Math.cos(we.theta),o.lookAt(Ee)}Oe();let ke=new Go,Ae=new W,z=e=>{xe=!0;let t=`touches`in e?e.touches[0].clientX:e.clientX,n=`touches`in e?e.touches[0].clientY:e.clientY;Se={x:t,y:n},Ce={x:t,y:n}},je=e=>{if(!xe)return;let t=`touches`in e?e.touches[0].clientX:e.clientX,n=`touches`in e?e.touches[0].clientY:e.clientY,r=t-Ce.x,i=n-Ce.y;Ce={x:t,y:n},Te.theta-=r*.008,Te.phi=Math.max(.08,Math.min(Math.PI/2-.06,Te.phi-i*.008))},Me=e=>{if(!xe)return;xe=!1;let n=`changedTouches`in e&&e.changedTouches.length>0?e.changedTouches[0].clientX:e.clientX,r=`changedTouches`in e&&e.changedTouches.length>0?e.changedTouches[0].clientY:e.clientY;if(Math.hypot(n-Se.x,r-Se.y)<6&&t){let e=s.domElement.getBoundingClientRect();if(e.width>0&&e.height>0){Ae.x=(n-e.left)/e.width*2-1,Ae.y=-((r-e.top)/e.height)*2+1,ke.setFromCamera(Ae,o);let i=ke.intersectObjects(g.children,!0);for(let e of i){let n=e.object.userData?.partId;if(n&&cu[n]){t(n);break}}}}};s.domElement.addEventListener(`mousedown`,z),s.domElement.addEventListener(`touchstart`,z,{passive:!0}),window.addEventListener(`mousemove`,je),window.addEventListener(`touchmove`,je,{passive:!0}),window.addEventListener(`mouseup`,Me),window.addEventListener(`touchend`,Me),s.domElement.addEventListener(`wheel`,e=>{e.preventDefault(),Te.radius=Math.max(8.5,Math.min(38,Te.radius+e.deltaY*.018))},{passive:!1});let Ne=new ResizeObserver(e=>{for(let t of e){let e=t.contentRect;e.width>0&&e.height>0&&(o.aspect=e.width/e.height,o.updateProjectionMatrix(),s.setSize(e.width,e.height))}});Ne.observe(e);let B=0,Pe=performance.now();function V(e=performance.now()){B=requestAnimationFrame(V);let t=Math.min(.1,(e-Pe)/1e3);if(Pe=e,we.radius+=(Te.radius-we.radius)*.14,we.phi+=(Te.phi-we.phi)*.14,we.theta+=(Te.theta-we.theta)*.14,Ee.lerp(De,.14),o.position.x=Ee.x+we.radius*Math.sin(we.phi)*Math.sin(we.theta),o.position.y=Ee.y+we.radius*Math.cos(we.phi),o.position.z=Ee.z+we.radius*Math.sin(we.phi)*Math.cos(we.theta),o.lookAt(Ee),b>0){b=Math.max(0,b-t),v.opacity=Math.sin(e*.01)*.3+.45;let n=1+Math.sin(e*.008)*.08;y.scale.set(n,1,n)}else v.opacity=0;if(R.motorRotor&&_e){let e=ve.duty??.5;R.motorRotor.rotation.x+=e*16*t}if(R.sonarRings){let t=R.sonarRings,n=ve.valid!==!1,r=R.obstacleGroup?R.obstacleGroup.position.x-.25:6.2,i=Math.max(.45,r-3.35);t.forEach((t,r)=>{if(_e&&n){t.visible=!0;let n=(e*.0018+r*.33)%1;t.position.x=3.35+n*i;let a=t.material;a.opacity=(1-n)*.7;let o=.7+n*.9;t.scale.set(o,o,o)}else t.visible=!1})}if(R.soundRings){let t=R.soundRings,n=ve.hz??0,r=_e&&n>0;t.forEach((t,n)=>{let i=t.material;if(r){let r=(e*.0025+n*.33)%1;t.position.y=.75+r*1.1;let a=.8+r*.9;t.scale.set(a,a,1),i.opacity=(1-r)*.75}else i.opacity=0})}let n=ve.pins||{};for(let t of pe){let r=t.activePin?(n[t.activePin]??0)>0:t.alwaysActive;if(_e&&r){t.mesh.visible=!0;let n=(e*.001*t.speed+t.offset)%1;t.curve.getPoint(n,t.mesh.position)}else t.mesh.visible=!1}s.render(i,o)}return V(),{update(e,t,n){_e=n,ve=t,e.id!==ge&&(he&&(g.remove(he),me(he)),he=ye(e),g.add(he),ge=e.id);let r=n&&(t.led===!0||t.pins&&t.pins.D13>0);te.color.setHex(r?16096779:4674921),ne.opacity=r?.42:0;let i=n&&(e.id===`sensor`||e.id===`heat`||e.id===`plant`||e.id===`knob`);if(re.color.setHex(i?16436245:3359061),R.extLed){let e=n&&t.led===!0;R.extLed.emissive.setHex(e?15680580:0),R.extLedHalo&&(R.extLedHalo.opacity=e?.38:0)}if(R.potShaft&&t.adc!==void 0&&(R.potShaft.rotation.y=(t.adc/1023-.5)*Math.PI*1.5),R.pwmLed){let e=n?t.duty??.5:0;R.pwmLed.emissive.setHex(e>.01?16096779:0),R.pwmLed.emissiveIntensity=e*2,R.pwmLedHalo&&(R.pwmLedHalo.opacity=e*.45)}if(R.rgbDome&&(n&&t.hex?(R.rgbDome.color.set(t.hex),R.rgbDome.emissive.set(t.hex),R.rgbHalo&&(R.rgbHalo.color.set(t.hex),R.rgbHalo.opacity=.42)):(R.rgbDome.color.setHex(9741240),R.rgbDome.emissive.setHex(0),R.rgbHalo&&(R.rgbHalo.opacity=0))),R.sunMat&&t.adc!==void 0){let e=Math.max(.08,t.adc/1023);R.sunMat.color.setHSL(.13,.95,.25+e*.45),R.sunHaloMat&&(R.sunHaloMat.opacity=e*.5),R.sunGroup&&R.sunGroup.scale.setScalar(.65+e*.55)}if(R.obstacleGroup){let e=t.distanceCm;if(t.valid!==!1&&e!=null){let t=3.8+Math.min(200,Math.max(2,e))*.025;R.obstacleGroup.position.x=t,R.obstacleWallMat.opacity=.95,N(R.distSprite,`${Number(e).toFixed(1)} cm`,`#06b6d4`)}else R.obstacleGroup.position.x=8.9,R.obstacleWallMat.opacity=.22,N(R.distSprite,`NO ECHO`,`#ef4444`)}if(R.btnActuator&&t.pressed!==void 0&&(R.btnActuator.position.y=t.pressed?.34:.45),R.pianoKeys){let e=t.key;R.pianoKeys.forEach((t,n)=>{let r=e===n;t.mesh.position.y=r?.26:.36,t.mat.emissive.setHex(r?t.baseColor:0)})}if(R.heatAura&&t.tempC!==void 0){let e=t.tempC,n=Math.max(0,Math.min(1,(e+40)/165));R.heatAura.color.setHSL((1-n)*.58,.9,.5),R.heatAura.opacity=.25+n*.3,N(R.heatLabel,`TMP36: ${Number(e).toFixed(1)} °C (${Number(t.voltage??.75).toFixed(2)}V)`,`#f97316`)}if(R.servoHorn&&t.angle!==void 0){let e=Ft.degToRad(t.angle-90);R.servoHorn.rotation.y=-e}if(R.stepperGear&&t.angle!==void 0&&(R.stepperGear.rotation.y=-Ft.degToRad(t.angle)),R.ulnLeds){let e=t.pins||{},r=[e.D8??0,e.D9??0,e.D10??0,e.D11??0];R.ulnLeds.forEach((e,t)=>{e.color.setHex(r[t]>0?n?15680580:10033947:3359061)})}if(R.soilMat&&t.relativePercent!==void 0){let e=t.relativePercent/100,n=new Bn(11831908),r=new Bn(3875604);R.soilMat.color.copy(n).lerp(r,e)}if(R.oledCanvas&&be(t,n),R.fsrPlunger&&t.adc!==void 0){let e=t.adc/1023;R.fsrPlunger.position.y=.92-e*.28}if(R.forceNeedle&&t.angle!==void 0){let e=Ft.degToRad(t.angle-90);R.forceNeedle.rotation.y=-e}if(R.forceBellHalo){let e=n&&t.bell===!0;R.forceBellHalo.opacity=e?.45:0}if(R.projectLeds){let e=t.light,r=[e===`red`,e===`yellow`,e===`green`],i=[15680580,15381256,2278750];R.projectLeds.forEach((e,t)=>{let a=n&&r[t];e.emissive.setHex(a?i[t]:0),R.projectHalos&&R.projectHalos[t]&&(R.projectHalos[t].opacity=a?.42:0)})}},resetCamera(){De.set(.2,.4,0),Te={radius:20.5,phi:.82,theta:.22}},setCameraPreset(e){switch(e){case`iso`:De.set(.2,.4,0),Te={radius:20.5,phi:.82,theta:.22};break;case`top`:De.set(.2,.2,0),Te={radius:21.5,phi:.1,theta:0};break;case`closeup`:De.set(4.1,.7,0),Te={radius:11.8,phi:.76,theta:.32};break;case`board`:De.set(-3.9,.5,0),Te={radius:11.5,phi:.68,theta:-.18}}},focusPart(e){let t=cu[e];if(!t)return;let[n,r,i]=t.focusPoint;De.set(n,r,i),Te={radius:e===`uno`||e===`breadboard`?12.5:9.2,phi:.72,theta:n<0?-.2:.28},y.position.set(n,.06,i),b=3.2},setTheme(e){a=e,i.background=new Bn(e?461848:15857145),p.color.setHex(e?725796:14870768),i.remove(h),h.geometry.dispose(),h.material.dispose(),h=new Jo(34,34,e?3359061:9741240,e?1976635:13358561),h.position.y=-.02,i.add(h)},dispose(){cancelAnimationFrame(B),Ne.disconnect(),window.removeEventListener(`mousemove`,je),window.removeEventListener(`touchmove`,je),window.removeEventListener(`mouseup`,Me),window.removeEventListener(`touchend`,Me),he&&me(he),me(oe),ce&&ce.dispose(),s.dispose(),e.contains(s.domElement)&&e.removeChild(s.domElement)},getCanvas(){return s.domElement}}}function fu(e,t,n,r=`th`){let i=document.documentElement.classList.contains(`dark`),a=i?`#070b14`:`#f8fafc`,o=i?`#0f172a`:`#ffffff`,s=i?`#111c33`:`#f1f5f9`,c=i?`#334155`:`#cbd5e1`,l=i?`#475569`:`#94a3b8`,u=i?`#f8fafc`:`#0f172a`,d=i?`#94a3b8`:`#64748b`,f=`#06b6d4`,p=`#ef4444`,m=i?`#94a3b8`:`#475569`,h=`#ef4444`,g=t.pins||{};function _(e,t,n,r=``){return`
      <g transform="translate(${e}, ${t})">
        <polyline points="-28,0 -20,0 -16,-7 -8,7 0,-7 8,7 16,-7 20,0 28,0" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linejoin="round"/>
        <text x="0" y="-12" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="#f59e0b">${n}</text>
        ${r?`<text x="0" y="18" text-anchor="middle" font-size="9" fill="${d}">${r}</text>`:``}
      </g>
    `}function v(e,t){return`
      <g transform="translate(${e}, ${t})">
        <line x1="0" y1="0" x2="0" y2="10" stroke="${m}" stroke-width="2"/>
        <line x1="-12" y1="10" x2="12" y2="10" stroke="${m}" stroke-width="2.2"/>
        <line x1="-8" y1="15" x2="8" y2="15" stroke="${m}" stroke-width="2"/>
        <line x1="-4" y1="20" x2="4" y2="20" stroke="${m}" stroke-width="1.8"/>
        <text x="0" y="32" text-anchor="middle" font-size="9" font-family="monospace" font-weight="bold" fill="${m}">GND (0V)</text>
      </g>
    `}function y(e,t,n=`+5V`){return`
      <g transform="translate(${e}, ${t})">
        <line x1="0" y1="0" x2="0" y2="-10" stroke="${h}" stroke-width="2"/>
        <polygon points="-8,-10 8,-10 0,-20" fill="${h}"/>
        <text x="0" y="-24" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="${h}">${n}</text>
      </g>
    `}function b(e,t,n,r,i){let a=r?n:`none`,o=r?n:d;return`
      <g transform="translate(${e}, ${t})">
        ${r?`<circle cx="0" cy="0" r="18" fill="${n}" opacity="0.22"/>`:``}
        <polygon points="-9,-9 -9,9 9,0" fill="${a}" stroke="${o}" stroke-width="2"/>
        <line x1="9" y1="-9" x2="9" y2="9" stroke="${o}" stroke-width="2.2"/>
        <!-- Emitted photon arrows -->
        <line x1="2" y1="-11" x2="10" y2="-19" stroke="${o}" stroke-width="1.5"/>
        <polygon points="10,-19 6,-18 9,-15" fill="${o}"/>
        <line x1="8" y1="-8" x2="16" y2="-16" stroke="${o}" stroke-width="1.5"/>
        <polygon points="16,-16 12,-15 15,-12" fill="${o}"/>
        <text x="0" y="23" text-anchor="middle" font-size="10" font-weight="bold" fill="${r?n:u}">${i}</text>
      </g>
    `}let x=e.connections.map((e,t)=>{let i=(g[e.from]??0)>0||(g[e.to]??0)>0,a=e.from.includes(`5V`)||e.to.includes(`5V`)?h:i&&n?f:l,o=92+t*38,d=e.note?e.note[r]||e.note.th:``;return`
      <g class="connection-row" transform="translate(22, ${o})">
        <rect x="0" y="-8" width="215" height="30" rx="6" fill="${s}" stroke="${c}" stroke-width="1"/>
        <circle cx="12" cy="7" r="4.5" fill="${e.from.includes(`GND`)?m:e.from.includes(`5V`)?h:a}"/>
        <text x="22" y="11" font-size="10.5" font-family="monospace" font-weight="bold" fill="${u}">${e.from}</text>
        <line x1="88" y1="7" x2="116" y2="7" stroke="${a}" stroke-width="2" ${i&&n?`stroke-dasharray="4 2"`:``}/>
        <polygon points="116,7 111,4 111,10" fill="${a}"/>
        <text x="122" y="11" font-size="10.5" font-family="monospace" font-weight="bold" fill="${f}">${e.to}</text>
        ${d?`<title>${d}</title>`:``}
      </g>
    `}).join(``),S=``;switch(e.id){case`board`:{let e=n&&(t.led===!0||(g.D13??0)>0);S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${d}">
            ${r===`th`?`ผังวงจรภายในบอร์ด Uno R3`:`Internal Uno R3 D13 Schematic`}
          </text>
          <rect x="20" y="65" width="70" height="75" rx="6" fill="#007480" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="55" y="96" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">ATmega</text>
          <text x="55" y="110" text-anchor="middle" font-size="10" font-family="monospace" fill="#e0f2fe">Pin D13</text>
          <line x1="90" y1="102" x2="115" y2="102" stroke="${e?f:l}" stroke-width="2.2"/>
          ${_(143,102,`1 kΩ`,`RN1`)}
          <line x1="171" y1="102" x2="195" y2="102" stroke="${e?f:l}" stroke-width="2.2"/>
          ${b(204,102,`#f59e0b`,e,`LED_BUILTIN`)}
          <line x1="215" y1="102" x2="232" y2="102" stroke="${m}" stroke-width="2"/>
          <line x1="232" y1="102" x2="232" y2="148" stroke="${m}" stroke-width="2"/>
          ${v(232,148)}
        </g>
      `;break}case`blink`:{let e=n&&t.led===!0,i=e?f:l;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรไฟกะพริบอนุกรมตัวต้านทาน`:`Series Current-Limited LED Circuit`}
          </text>
          <rect x="16" y="84" width="48" height="36" rx="6" fill="${s}" stroke="${i}" stroke-width="1.8"/>
          <text x="40" y="106" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="${u}">D13</text>
          <line x1="64" y1="102" x2="90" y2="102" stroke="${i}" stroke-width="2.5" ${e?`stroke-dasharray="5 3"`:``}/>
          ${_(118,102,`330 Ω`,`R1`)}
          <line x1="146" y1="102" x2="178" y2="102" stroke="${i}" stroke-width="2.5" ${e?`stroke-dasharray="5 3"`:``}/>
          ${b(187,102,p,e,`LED1 (Red)`)}
          <line x1="198" y1="102" x2="226" y2="102" stroke="${m}" stroke-width="2"/>
          <line x1="226" y1="102" x2="226" y2="148" stroke="${m}" stroke-width="2"/>
          ${v(226,148)}
        </g>
      `;break}case`button`:{let e=t.pressed===!0,i=n&&t.led===!0;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรสวิตช์ Active-Low (INPUT_PULLUP)`:`Active-Low Switch with Internal Pull-Up`}
          </text>
          ${y(95,58,`+5V (Internal)`)}
          <g transform="translate(95, 78) rotate(90)">
            ${_(0,0,`20kΩ`,``)}
          </g>
          <circle cx="95" cy="116" r="4" fill="${f}"/>
          <line x1="95" y1="106" x2="95" y2="116" stroke="${f}" stroke-width="2"/>
          <line x1="95" y1="116" x2="155" y2="116" stroke="${f}" stroke-width="2.2"/>
          <rect x="155" y="102" width="82" height="28" rx="6" fill="${s}" stroke="${f}" stroke-width="1.5"/>
          <text x="196" y="120" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="${u}">
            D2 = ${e?`LOW(0)`:`HIGH(1)`}
          </text>
          <!-- SPST Switch to GND -->
          <line x1="95" y1="116" x2="95" y2="132" stroke="${l}" stroke-width="2"/>
          <circle cx="95" cy="132" r="3" fill="${u}"/>
          <line x1="95" y1="132" x2="${e?`95`:`81`}" y2="${e?`156`:`152`}" stroke="#f59e0b" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="95" cy="156" r="3" fill="${u}"/>
          <text x="54" y="148" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">SW1</text>
          ${v(95,156)}
          ${b(205,66,p,i,`D13 LED`)}
        </g>
      `;break}case`knob`:{let e=t.adc??512,i=(e*5/1023).toFixed(2);S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรแบ่งแรงดัน Potentiometer & PWM`:`Potentiometer Voltage Divider & PWM`}
          </text>
          ${y(65,58,`+5V`)}
          <g transform="translate(65, 102) rotate(90)">
            ${_(0,0,`10 kΩ`,``)}
          </g>
          <line x1="65" y1="58" x2="65" y2="74" stroke="${h}" stroke-width="2"/>
          <line x1="65" y1="130" x2="65" y2="152" stroke="${m}" stroke-width="2"/>
          ${v(65,152)}
          <!-- Wiper arrow to A0 -->
          <line x1="115" y1="102" x2="77" y2="102" stroke="#7c3aed" stroke-width="2.2"/>
          <polygon points="75,102 82,98 82,106" fill="#7c3aed"/>
          <rect x="115" y="88" width="122" height="28" rx="6" fill="${s}" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="176" y="106" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="#7c3aed">
            A0: ${i}V (${e})
          </text>
          <!-- PWM D9 output to LED -->
          <text x="145" y="146" font-size="10" font-family="monospace" font-weight="bold" fill="#f59e0b">~D9 PWM</text>
          ${b(212,146,`#f59e0b`,n&&(t.pwm??0)>0,`PWM=${t.pwm??127}`)}
        </g>
      `;break}case`rgb`:{let e=t.hex||`#804000`;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจร RGB LED ขั้วลบร่วม (3 × 330 Ω)`:`3-Channel Common-Cathode RGB Network`}
          </text>
          <!-- D9 Red -->
          <text x="26" y="64" font-size="10" font-family="monospace" font-weight="bold" fill="#ef4444">~D9</text>
          <line x1="50" y1="60" x2="75" y2="60" stroke="#ef4444" stroke-width="2"/>
          ${_(103,60,`330Ω`)}
          <line x1="131" y1="60" x2="175" y2="60" stroke="#ef4444" stroke-width="2"/>
          <!-- D10 Green -->
          <text x="22" y="106" font-size="10" font-family="monospace" font-weight="bold" fill="#22c55e">~D10</text>
          <line x1="50" y1="102" x2="75" y2="102" stroke="#22c55e" stroke-width="2"/>
          ${_(103,102,`330Ω`)}
          <line x1="131" y1="102" x2="175" y2="102" stroke="#22c55e" stroke-width="2"/>
          <!-- D11 Blue -->
          <text x="22" y="148" font-size="10" font-family="monospace" font-weight="bold" fill="#3b82f6">~D11</text>
          <line x1="50" y1="144" x2="75" y2="144" stroke="#3b82f6" stroke-width="2"/>
          ${_(103,144,`330Ω`)}
          <line x1="131" y1="144" x2="175" y2="144" stroke="#3b82f6" stroke-width="2"/>
          <!-- Common Cathode RGB Package -->
          <rect x="175" y="45" width="56" height="115" rx="10" fill="${s}" stroke="${n?e:c}" stroke-width="2"/>
          <circle cx="203" cy="102" r="18" fill="${n?e:`#334155`}"/>
          <text x="203" y="106" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">RGB</text>
          <line x1="203" y1="160" x2="203" y2="168" stroke="${m}" stroke-width="2"/>
          ${v(203,168)}
        </g>
      `;break}case`light`:case`force`:{let n=e.id===`force`,i=t.adc??(n?0:600),a=(i*5/1023).toFixed(2),l=n?`FSR-402`:`LDR (CdS)`;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรแบ่งแรงดัน ${l} กับ 10 kΩ`:`${l} + 10 kΩ Voltage Divider`}
          </text>
          ${y(80,52,`+5V`)}
          <!-- Upper variable sensor resistor -->
          <circle cx="80" cy="78" r="18" fill="none" stroke="#06b6d4" stroke-width="1.8" stroke-dasharray="3 2"/>
          <g transform="translate(80, 78) rotate(90)">
            ${_(0,0,``,``)}
          </g>
          <text x="34" y="82" text-anchor="middle" font-size="10" font-weight="bold" fill="#06b6d4">${l}</text>
          <!-- Midpoint node A0 -->
          <circle cx="80" cy="112" r="4.5" fill="${f}"/>
          <line x1="80" y1="106" x2="80" y2="122" stroke="${f}" stroke-width="2"/>
          <line x1="80" y1="112" x2="140" y2="112" stroke="${f}" stroke-width="2.2"/>
          <rect x="140" y="96" width="104" height="32" rx="6" fill="${s}" stroke="${f}" stroke-width="1.5"/>
          <text x="192" y="116" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="${f}">
            A0 = ${a}V (${i})
          </text>
          <!-- Lower fixed 10k pull-down resistor -->
          <g transform="translate(80, 142) rotate(90)">
            ${_(0,0,`10 kΩ`,``)}
          </g>
          ${v(80,166)}
        </g>
      `;break}case`motor`:{let e=t.pwm??128,i=n&&e>0;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรทรานซิสเตอร์ขับมอเตอร์ + ไดโอดฟลายแบ็ก`:`Low-Side Transistor Driver & Flyback Diode`}
          </text>
          ${y(145,52,`EXT +6V`)}
          <!-- Motor M and parallel Flyback Diode D1 -->
          <circle cx="120" cy="82" r="18" fill="${s}" stroke="#10b981" stroke-width="2.2"/>
          <text x="120" y="87" text-anchor="middle" font-size="13" font-weight="bold" fill="#10b981">M</text>
          <!-- Flyback Diode D1 (Cathode pointing UP to +6V!) -->
          <polygon points="175,90 191,90 183,74" fill="#f59e0b"/>
          <line x1="175" y1="74" x2="191" y2="74" stroke="#ffffff" stroke-width="2.5"/>
          <text x="216" y="85" font-size="9.5" font-family="monospace" font-weight="bold" fill="#f59e0b">1N4007</text>
          <line x1="120" y1="52" x2="183" y2="52" stroke="${h}" stroke-width="2"/>
          <line x1="120" y1="52" x2="120" y2="64" stroke="${h}" stroke-width="2"/>
          <line x1="183" y1="52" x2="183" y2="74" stroke="${h}" stroke-width="2"/>
          <line x1="120" y1="100" x2="120" y2="114" stroke="${i?f:l}" stroke-width="2"/>
          <line x1="183" y1="90" x2="183" y2="114" stroke="${i?f:l}" stroke-width="2"/>
          <line x1="120" y1="114" x2="183" y2="114" stroke="${i?f:l}" stroke-width="2"/>
          <!-- NPN Transistor Q1 -->
          <text x="24" y="142" font-size="10" font-family="monospace" font-weight="bold" fill="${f}">~D5</text>
          ${_(72,138,`1kΩ`)}
          <line x1="100" y1="138" x2="125" y2="138" stroke="${f}" stroke-width="2"/>
          <line x1="125" y1="124" x2="125" y2="152" stroke="${u}" stroke-width="3"/>
          <line x1="125" y1="132" x2="145" y2="114" stroke="${u}" stroke-width="2"/>
          <line x1="125" y1="144" x2="145" y2="160" stroke="${u}" stroke-width="2"/>
          <text x="162" y="144" font-size="10" font-weight="bold" fill="${u}">Q1 (Driver)</text>
          ${v(145,160)}
        </g>
      `;break}case`stepper`:{let e=[g.D8??0,g.D9??0,g.D10??0,g.D11??0];S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรขับสเต็ปเปอร์ ULN2003A & ขดลวด 4 เฟส`:`ULN2003A Darlington Driver & 4-Phase Coils`}
          </text>
          ${y(212,48,`EXT +5V`)}
          <!-- ULN2003A Driver Block -->
          <rect x="68" y="48" width="76" height="118" rx="7" fill="${s}" stroke="#f59e0b" stroke-width="1.8"/>
          <text x="106" y="62" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#f59e0b">ULN2003A</text>
          ${[{pin:`D8`,inLbl:`IN1`,outLbl:`A (Blue)`,y:66,col:`#0284c7`},{pin:`D9`,inLbl:`IN2`,outLbl:`B (Pink)`,y:94,col:`#22c55e`},{pin:`D10`,inLbl:`IN3`,outLbl:`C (Yel)`,y:122,col:`#f59e0b`},{pin:`D11`,inLbl:`IN4`,outLbl:`D (Org)`,y:150,col:`#ec4899`}].map((t,r)=>{let i=e[r]>0,a=i?t.col:l;return`
                <text x="14" y="${t.y+3}" font-size="9.5" font-family="monospace" font-weight="bold" fill="${t.col}">${t.pin}</text>
                <line x1="38" y1="${t.y}" x2="68" y2="${t.y}" stroke="${a}" stroke-width="2.2" ${i&&n?`stroke-dasharray="4 2"`:``}/>
                <text x="84" y="${t.y+3}" font-size="8.5" font-family="monospace" fill="${u}">${t.inLbl}</text>
                <circle cx="132" cy="${t.y}" r="4.5" fill="${i?`#ef4444`:`#334155`}"/>
                <line x1="144" y1="${t.y}" x2="184" y2="${t.y}" stroke="${a}" stroke-width="2.2"/>
                <rect x="184" y="${t.y-9}" width="54" height="18" rx="4" fill="${i?t.col:s}" stroke="${t.col}" stroke-width="1.2"/>
                <text x="211" y="${t.y+3}" text-anchor="middle" font-size="8.5" font-family="monospace" font-weight="bold" fill="${i?`#ffffff`:u}">${t.outLbl}</text>
              `}).join(``)}
          <line x1="106" y1="166" x2="106" y2="174" stroke="${m}" stroke-width="2"/>
          ${v(106,174)}
        </g>
      `;break}case`sensor`:case`project`:{let i=t.valid!==!1&&t.distanceCm!==null,a=t.distanceCm??30,s=e.id===`project`;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${d}">
            ${s?r===`th`?`วงจรอัลตราโซนิก HC-SR04 + ไฟช่วยจอด 3 โซน`:`HC-SR04 Sonar + 3-Zone Traffic LEDs`:r===`th`?`วงจรวัดระยะคลื่นเสียงสะท้อน HC-SR04`:`HC-SR04 Ultrasonic Time-of-Flight Circuit`}
          </text>
          <!-- HC-SR04 Module -->
          <rect x="64" y="42" width="96" height="82" rx="8" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="112" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">HC-SR04</text>
          <text x="18" y="76" font-size="9.5" font-family="monospace" font-weight="bold" fill="#0284c7">D9 Trig</text>
          <line x1="54" y1="72" x2="64" y2="72" stroke="#0284c7" stroke-width="2.2"/>
          <text x="14" y="102" font-size="9.5" font-family="monospace" font-weight="bold" fill="#06b6d4">D10 Echo</text>
          <line x1="56" y1="98" x2="64" y2="98" stroke="#06b6d4" stroke-width="2.2"/>
          <!-- Acoustic waves to Target -->
          <path d="M 168 68 Q 180 82 168 96" fill="none" stroke="${i?f:l}" stroke-width="2"/>
          <path d="M 182 62 Q 198 82 182 102" fill="none" stroke="${i?f:l}" stroke-width="2"/>
          <rect x="208" y="48" width="34" height="70" rx="5" fill="${i?`#f59e0b`:`#475569`}"/>
          <text x="225" y="86" text-anchor="middle" font-size="8.5" font-family="monospace" font-weight="bold" fill="#ffffff">
            ${i?`${Number(a).toFixed(0)}cm`:`OUT`}
          </text>
          ${s?`
            <!-- 3 Traffic LEDs on D4, D3, D2 -->
            <g transform="translate(24, 148)">
              <text x="0" y="4" font-size="9.5" font-family="monospace" font-weight="bold" fill="#ef4444">D4(R)</text>
              <circle cx="44" cy="0" r="8" fill="${t.light===`red`&&n?`#ef4444`:`#334155`}"/>
              <text x="72" y="4" font-size="9.5" font-family="monospace" font-weight="bold" fill="#eab308">D3(Y)</text>
              <circle cx="116" cy="0" r="8" fill="${t.light===`yellow`&&n?`#eab308`:`#334155`}"/>
              <text x="144" y="4" font-size="9.5" font-family="monospace" font-weight="bold" fill="#22c55e">D2(G)</text>
              <circle cx="188" cy="0" r="8" fill="${t.light===`green`&&n?`#22c55e`:`#334155`}"/>
              <text x="105" y="26" text-anchor="middle" font-size="9" fill="${d}">Series 330 Ω × 3 → GND</text>
            </g>
          `:`
            <line x1="112" y1="124" x2="112" y2="156" stroke="${m}" stroke-width="2"/>
            ${v(112,156)}
          `}
        </g>
      `;break}case`sound`:case`piano`:{let i=e.id===`piano`,a=t.hz??0,p=n&&a>0,h=i?`D10`:`D8`;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${d}">
            ${i?r===`th`?`วงจรคีย์บอร์ด 8 ปุ่ม (D2–D9) + ลำโพงเปียโซ D10`:`8-Key INPUT_PULLUP Matrix (D2–D9) & D10 Piezo`:r===`th`?`วงจรขับลำโพงเปียโซด้วยคลื่นสี่เหลี่ยม tone(D8)`:`Square-Wave Piezo Transducer Drive (D8)`}
          </text>
          ${i?`
            <rect x="18" y="42" width="95" height="122" rx="7" fill="${s}" stroke="${f}" stroke-width="1.5"/>
            <text x="65" y="60" text-anchor="middle" font-size="9.5" font-weight="bold" fill="${u}">8 Keys (SW1–8)</text>
            <text x="65" y="78" text-anchor="middle" font-size="9" font-family="monospace" fill="${f}">Pins D2..D9</text>
            <text x="65" y="96" text-anchor="middle" font-size="8.5" fill="${d}">INPUT_PULLUP</text>
            <text x="65" y="116" text-anchor="middle" font-size="9.5" font-family="monospace" font-weight="bold" fill="#f59e0b">
              ${t.key!==null&&t.key!==void 0?`Active: D${2+t.key}`:`All HIGH (1)`}
            </text>
            ${v(65,164)}
          `:``}
          <!-- Piezo Buzzer Symbol -->
          <text x="${i?`132`:`38`}" y="98" font-size="10.5" font-family="monospace" font-weight="bold" fill="#a855f7">${h}</text>
          <line x1="${i?`158`:`60`}" y1="94" x2="182" y2="94" stroke="${p?`#a855f7`:l}" stroke-width="2.5"/>
          <rect x="182" y="68" width="46" height="52" rx="8" fill="${s}" stroke="${p?`#a855f7`:c}" stroke-width="2"/>
          <circle cx="205" cy="94" r="14" fill="${p?`#a855f7`:`#334155`}"/>
          <text x="205" y="98" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">BZ1</text>
          <line x1="205" y1="120" x2="205" y2="154" stroke="${m}" stroke-width="2"/>
          ${v(205,154)}
        </g>
      `;break}case`heat`:{let e=(t.tempC??25).toFixed(1),n=(t.voltage??.75).toFixed(3);S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรเซนเซอร์อุณหภูมิแอนะล็อก TMP36 (TO-92)`:`TMP36 Linear Analog Temperature Sensor`}
          </text>
          ${y(82,54,`+5V (Pin 1)`)}
          <rect x="48" y="68" width="68" height="68" rx="10" fill="${s}" stroke="#f97316" stroke-width="2"/>
          <text x="82" y="98" text-anchor="middle" font-size="11" font-weight="bold" fill="#f97316">TMP36</text>
          <text x="82" y="114" text-anchor="middle" font-size="9.5" font-family="monospace" fill="${u}">${e} °C</text>
          <line x1="82" y1="54" x2="82" y2="68" stroke="${h}" stroke-width="2"/>
          <line x1="116" y1="102" x2="148" y2="102" stroke="#f59e0b" stroke-width="2.5"/>
          <rect x="148" y="84" width="96" height="36" rx="6" fill="${s}" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="196" y="100" text-anchor="middle" font-size="9.5" font-family="monospace" font-weight="bold" fill="#f59e0b">Pin 2 → A0</text>
          <text x="196" y="114" text-anchor="middle" font-size="9.5" font-family="monospace" fill="${u}">${n} V</text>
          <line x1="82" y1="136" x2="82" y2="158" stroke="${m}" stroke-width="2"/>
          ${v(82,158)}
        </g>
      `;break}case`servo`:{let e=t.angle??90;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรควบคุมเซอร์โวมอเตอร์ SG90 (50Hz PWM)`:`SG90 Servo 3-Wire Control & External +5V`}
          </text>
          ${y(176,52,`EXT +5V`)}
          <text x="20" y="106" font-size="10.5" font-family="monospace" font-weight="bold" fill="#f59e0b">~D9 PWM</text>
          <line x1="74" y1="102" x2="126" y2="102" stroke="#f59e0b" stroke-width="2.5" ${n?`stroke-dasharray="5 3"`:``}/>
          <rect x="126" y="66" width="102" height="72" rx="10" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
          <text x="177" y="96" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">SG90 SERVO</text>
          <text x="177" y="114" text-anchor="middle" font-size="10" font-family="monospace" fill="#e0f2fe">Angle: ${e}°</text>
          <line x1="176" y1="52" x2="176" y2="66" stroke="${h}" stroke-width="2.2"/>
          <line x1="176" y1="138" x2="176" y2="160" stroke="${m}" stroke-width="2.2"/>
          ${v(176,160)}
        </g>
      `;break}case`plant`:{let e=t.relativePercent??50,n=t.adc??600;S=`
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${d}">
            ${r===`th`?`วงจรวัดความชื้นดิน (A0) + จอ I2C OLED (A4/A5)`:`Soil Probe (A0) + I2C SSD1306 OLED (A4/A5)`}
          </text>
          <!-- Soil Probe Block -->
          <rect x="16" y="46" width="96" height="58" rx="7" fill="${s}" stroke="#10b981" stroke-width="1.6"/>
          <text x="64" y="68" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#10b981">SOIL PROBE</text>
          <text x="64" y="86" text-anchor="middle" font-size="9" font-family="monospace" fill="${u}">AO → A0 (${n})</text>
          <!-- I2C OLED Block -->
          <rect x="138" y="46" width="106" height="106" rx="8" fill="#040814" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="191" y="66" text-anchor="middle" font-size="9.5" font-family="monospace" font-weight="bold" fill="#facc15">SSD1306 I2C</text>
          <text x="191" y="92" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="#38bdf8">${e}%</text>
          <text x="191" y="116" text-anchor="middle" font-size="9" font-family="monospace" fill="#94a3b8">SDA → Pin A4</text>
          <text x="191" y="132" text-anchor="middle" font-size="9" font-family="monospace" fill="#94a3b8">SCL → Pin A5</text>
          ${v(64,156)}
        </g>
      `;break}default:S=``}let C=``;switch(e.id){case`board`:case`blink`:case`button`:case`light`:{let i=t.led===!0&&n,a=e.id!==`blink`;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">
            ${a?`LED_BUILTIN (D13)`:r===`th`?`สถานะเอาต์พุต LED (D13)`:`LED Output State (D13)`}
          </text>
          <circle cx="102" cy="95" r="36" fill="${i?a?`#f59e0b`:p:`#1f2937`}" filter="${i?`drop-shadow(0 0 18px ${a?`#f59e0b`:`#ef4444`})`:`none`}"/>
          <text x="102" y="158" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="${i?a?`#f59e0b`:`#ef4444`:d}">
            ${i?`● HIGH (5.0V / ON)`:`○ LOW (0.0V / OFF)`}
          </text>
          <text x="102" y="182" text-anchor="middle" font-size="10" fill="${d}">
            ${e.id===`light`?`ADC A0 = ${t.adc??600}`:a?`Onboard SMD LED (Pin 13)`:`If ≈ 9.1 mA (via 330 Ω)`}
          </text>
        </g>
      `;break}case`rgb`:{let e=t.hex||`#804000`;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">RGB Additive Color</text>
          <circle cx="102" cy="92" r="38" fill="${n?e:`#1f2937`}" filter="${n?`drop-shadow(0 0 18px ${e})`:`none`}"/>
          <text x="102" y="154" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="${u}">
            ${n?e.toUpperCase():`OFF`}
          </text>
          <text x="102" y="178" text-anchor="middle" font-size="10.5" font-family="monospace" fill="${d}">
            R:${t.r??0}  G:${t.g??0}  B:${t.b??0}
          </text>
        </g>
      `;break}case`knob`:{let e=t.adc??512,n=((t.duty??.5)*100).toFixed(1),r=(e/1023*270-135)*Math.PI/180,a=102+Math.sin(r)*28,s=90-Math.cos(r)*28;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">Potentiometer (A0)</text>
          <circle cx="102" cy="90" r="36" fill="${i?`#1e293b`:`#e2e8f0`}" stroke="${c}" stroke-width="2"/>
          <line x1="102" y1="90" x2="${a}" y2="${s}" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
          <circle cx="102" cy="90" r="6" fill="#7c3aed"/>
          <text x="102" y="154" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#7c3aed">
            ADC: ${e} / 1023
          </text>
          <text x="102" y="178" text-anchor="middle" font-size="11" font-family="monospace" fill="${d}">
            PWM: ${t.pwm??127} (${n}%)
          </text>
        </g>
      `;break}case`servo`:{let e=t.angle??90,n=(e-90)*Math.PI/180,i=102+Math.sin(n)*38,a=106-Math.cos(n)*38;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">
            ${r===`th`?`มุมแขนเซอร์โว (SG90 D9)`:`SG90 Servo Horn (D9)`}
          </text>
          <!-- Protractor semicircle 0° (Left) -> 90° (Top) -> 180° (Right) -->
          <path d="M 60 106 A 42 42 0 0 1 144 106" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="48" y="110" text-anchor="end" font-size="9" font-family="monospace" fill="${d}">0°</text>
          <text x="102" y="56" text-anchor="middle" font-size="9" font-family="monospace" fill="${d}">90°</text>
          <text x="156" y="110" text-anchor="start" font-size="9" font-family="monospace" fill="${d}">180°</text>
          <line x1="102" y1="106" x2="${i}" y2="${a}" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
          <circle cx="102" cy="106" r="6" fill="#0f172a"/>
          <text x="102" y="156" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#0284c7">
            ${e}°
          </text>
          <text x="102" y="180" text-anchor="middle" font-size="10" fill="${d}">
            ${r===`th`?`ช่วงมุมคำสั่ง 0° ถึง 180°`:`Command Span: 0° – 180°`}
          </text>
        </g>
      `;break}case`sensor`:case`project`:{let n=t.valid,i=t.distanceCm,a=t.echoUs??0,s=t.light;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">HC-SR04 Sonar</text>
          <circle cx="64" cy="70" r="22" fill="#0284c7" stroke="${c}" stroke-width="2"/>
          <circle cx="140" cy="70" r="22" fill="#0284c7" stroke="${c}" stroke-width="2"/>
          <text x="64" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">T</text>
          <text x="140" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">R</text>
          <text x="102" y="118" text-anchor="middle" font-size="15" font-family="monospace" font-weight="bold" fill="${n?`#0284c7`:`#ef4444`}">
            ${n&&i!==null?i.toFixed(1)+` cm`:r===`th`?`ไม่มีคลื่นสะท้อน`:`NO ECHO`}
          </text>
          <text x="102" y="138" text-anchor="middle" font-size="10" font-family="monospace" fill="${d}">Pulse: ${a} µs</text>
          ${e.id===`project`?`
            <g transform="translate(42, 152)">
              <circle cx="20" cy="20" r="12" fill="${s===`green`?`#22c55e`:`#1f2937`}" filter="${s===`green`?`drop-shadow(0 0 8px #22c55e)`:`none`}"/>
              <circle cx="60" cy="20" r="12" fill="${s===`yellow`?`#eab308`:`#1f2937`}" filter="${s===`yellow`?`drop-shadow(0 0 8px #eab308)`:`none`}"/>
              <circle cx="100" cy="20" r="12" fill="${s===`red`?`#ef4444`:`#1f2937`}" filter="${s===`red`?`drop-shadow(0 0 8px #ef4444)`:`none`}"/>
            </g>
          `:``}
        </g>
      `;break}case`motor`:{let e=((t.duty??.5)*100).toFixed(1);C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">DC Motor & Driver</text>
          <circle cx="102" cy="92" r="34" fill="${i?`#1e293b`:`#f1f5f9`}" stroke="#10b981" stroke-width="2.5"/>
          <text x="102" y="99" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">M</text>
          <text x="102" y="154" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#059669">
            PWM: ${t.pwm??128} / 255
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="11" font-family="monospace" fill="${d}">Duty: ${e}%</text>
        </g>
      `;break}case`stepper`:{let e=t.angle??0,r=e.toFixed(0),a=t.steps??0,s=e*Math.PI/180,l=102+Math.sin(s)*24,f=82-Math.cos(s)*24,p=[g.D8??0,g.D9??0,g.D10??0,g.D11??0];C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">28BYJ-48 + ULN2003</text>
          <circle cx="102" cy="82" r="30" fill="${i?`#1e293b`:`#f1f5f9`}" stroke="#f59e0b" stroke-width="2"/>
          <!-- Rotating CW/CCW Shaft Needle -->
          <line x1="102" y1="82" x2="${l}" y2="${f}" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="102" cy="82" r="4.5" fill="#d97706"/>
          <text x="102" y="128" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#d97706">
            ${r}° | Steps: ${a}
          </text>
          <!-- 4 ULN2003 Phase LEDs A(D8), B(D9), C(D10), D(D11) -->
          <g transform="translate(32, 146)">
            ${[{lbl:`A:D8`,on:p[0]>0},{lbl:`B:D9`,on:p[1]>0},{lbl:`C:D10`,on:p[2]>0},{lbl:`D:D11`,on:p[3]>0}].map((e,t)=>`
              <circle cx="${16+t*36}" cy="14" r="8" fill="${e.on?n?`#ef4444`:`#991b1b`:`#334155`}"/>
              <text x="${16+t*36}" y="34" text-anchor="middle" font-size="8.5" font-family="monospace" font-weight="bold" fill="${e.on?`#ef4444`:d}">${e.lbl}</text>
            `).join(``)}
          </g>
        </g>
      `;break}case`sound`:{let e=t.hz??0,a=n&&e>0;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">Piezo Buzzer (D8)</text>
          <circle cx="102" cy="92" r="34" fill="${a?`#7c3aed`:`#1f2937`}" filter="${a?`drop-shadow(0 0 16px #7c3aed)`:`none`}"/>
          <circle cx="102" cy="92" r="10" fill="${i?`#090d16`:`#ffffff`}"/>
          <text x="102" y="154" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="${a?`#7c3aed`:d}">
            ${a?`${e} Hz`:r===`th`?`เงียบ`:`Silent`}
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" fill="${d}">
            ${a?`Square-Wave Tone Active`:`noTone()`}
          </text>
        </g>
      `;break}case`piano`:{let e=t.hz??0,i=n&&e>0,a=t.key;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">8-Key Synthesizer</text>
          <circle cx="102" cy="92" r="34" fill="${i?`#06b6d4`:`#1f2937`}" filter="${i?`drop-shadow(0 0 16px #06b6d4)`:`none`}"/>
          <text x="102" y="97" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">
            ${a==null?`IDLE`:`KEY ${a+1}`}
          </text>
          <text x="102" y="154" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="${i?`#06b6d4`:d}">
            ${i?`${e} Hz`:r===`th`?`ไม่มีการกดคีย์`:`No Key Pressed`}
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" fill="${d}">Keys: D2–D9 | Piezo: D10</text>
        </g>
      `;break}case`heat`:{let e=(t.tempC??25).toFixed(1),n=(t.voltage??.75).toFixed(3);C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">TMP36 Sensor (A0)</text>
          <circle cx="102" cy="92" r="34" fill="${i?`#1e293b`:`#fee2e2`}" stroke="#ef4444" stroke-width="2"/>
          <text x="102" y="97" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#ef4444">
            ${e} °C
          </text>
          <text x="102" y="154" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="${u}">
            Vout = ${n} V
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" font-family="monospace" fill="${d}">ADC: ${t.adc??153} / 1023</text>
        </g>
      `;break}case`plant`:C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">SSD1306 OLED (0x3C)</text>
          <rect x="28" y="48" width="148" height="78" rx="8" fill="#040814" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="102" y="80" text-anchor="middle" font-size="18" font-family="monospace" font-weight="bold" fill="#38bdf8">${t.relativePercent??50}%</text>
          <text x="102" y="106" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#facc15">[${(t.condition??`ok`).toUpperCase()}]</text>
          <text x="102" y="156" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="${u}">
            Raw ADC: ${t.adc??600}
          </text>
          <text x="102" y="178" text-anchor="middle" font-size="10" fill="${d}">SDA: A4 | SCL: A5 | AO: A0</text>
        </g>
      `;break;case`force`:{let e=t.adc??0,n=t.bell===!0,r=t.angle??0;C=`
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${o}" stroke="${c}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${u}">FSR Gauge & Bell</text>
          <circle cx="102" cy="92" r="34" fill="${n?`#f59e0b`:i?`#1e293b`:`#f1f5f9`}" filter="${n?`drop-shadow(0 0 16px #f59e0b)`:`none`}"/>
          <text x="102" y="97" text-anchor="middle" font-size="15" font-family="monospace" font-weight="bold" fill="${n?`#ffffff`:u}">
            ${n?`🔔 ALARM`:`QUIET`}
          </text>
          <text x="102" y="154" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="${u}">
            FSR: ${e} | Dial: ${r}°
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" fill="${d}">Servo: D9 | Buzzer: D8</text>
        </g>
      `;break}}return`
    <svg viewBox="0 0 760 ${Math.max(320,105+e.connections.length*40)}" width="100%" height="100%" class="schematic-svg" style="background: ${a}; border-radius: 12px; font-family: 'Plus Jakarta Sans', 'Prompt', sans-serif;">
      <!-- Header Bar -->
      <rect x="18" y="14" width="724" height="46" rx="10" fill="${o}" stroke="${c}" stroke-width="1.2"/>
      <text x="34" y="42" font-size="13.5" font-weight="bold" fill="${u}">${r===`th`?`ผังวงจรอิเล็กทรอนิกส์และสถานะพิน`:`Engineering Schematic & Pin Telemetry`} · ${e.title[r]||e.title.th}</text>
      <rect x="628" y="25" width="98" height="24" rx="12" fill="${n?`#059669`:`#64748b`}"/>
      <text x="677" y="41" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">${n?`● RUNNING`:`○ STOPPED`}</text>

      <!-- Left: Pin Connections Netlist -->
      ${x}

      <!-- Center: Electronic Schematic Diagram -->
      ${S}

      <!-- Right: Live Telemetry Readout -->
      ${C}
    </svg>
  `}function pu(e,t,n,r=`th`){switch(e.id){case`board`:return`
        <div class="space-y-3 text-xs">
          <p class="text-slate-600 dark:text-slate-300">
            ${r===`th`?`สำรวจบอร์ด Arduino Uno R3: พินดิจิทัล (D0-D13), แอนะล็อก (A0-A5), จ่ายไฟ (5V, 3.3V, GND) และพอร์ต USB Type-B`:`Explore Arduino Uno R3: Digital I/O (D0-D13), Analog inputs (A0-A5), Power rails (5V, 3.3V, GND), and USB.`}
          </p>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-slate-800 dark:text-white block mb-1">
              ${r===`th`?`ไฟ LED บนบอร์ด (D13 - Built-in)`:`On-Board LED (D13)`}
            </span>
            <span class="text-slate-500">
              ${r===`th`?`เชื่อมต่อกับขา D13 บนบอร์ดโดยตรง เมื่อรันแบบจำลอง ไฟจะติดสว่างเป็นสีแดง`:`Directly wired to pin D13. When running, the built-in LED illuminates.`}
            </span>
          </div>
        </div>
      `;case`blink`:return`
        <div class="space-y-3">
          <div>
            <label for="slider-onMs" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`เวลาเปิด (On Time - ton)`:`On Time (ton)`}</span>
              <span id="label-onMs" class="font-mono text-brand-600 font-bold">${t.onMs??500} ms</span>
            </label>
            <input id="slider-onMs" type="range" class="param-slider w-full accent-brand-600" min="50" max="2000" step="50" value="${t.onMs??500}" data-param="onMs" aria-label="On Time in ms">
          </div>
          <div>
            <label for="slider-offMs" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`เวลาปิด (Off Time - toff)`:`Off Time (toff)`}</span>
              <span id="label-offMs" class="font-mono text-brand-600 font-bold">${t.offMs??500} ms</span>
            </label>
            <input id="slider-offMs" type="range" class="param-slider w-full accent-brand-600" min="50" max="2000" step="50" value="${t.offMs??500}" data-param="offMs" aria-label="Off Time in ms">
          </div>
        </div>
      `;case`button`:{let e=n.pressed===!0;return`
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <div class="text-sm font-bold text-slate-800 dark:text-white">
                ${r===`th`?`ปุ่มกดจำลอง (D2 Active-Low)`:`Tactile Push Button (D2)`}
              </div>
              <div class="text-xs text-slate-500 mt-0.5">
                D2: <strong id="readout-d2" class="font-mono ${e?`text-amber-500`:`text-slate-400`}">${e?`0 (LOW/Pressed)`:`1 (HIGH/Pull-Up)`}</strong>
              </div>
            </div>
            <button id="btn-press-input" class="px-5 py-3 rounded-xl font-bold text-sm text-white select-none transition-transform active:scale-95 shadow-md ${e?`bg-amber-600 shadow-amber-500/30`:`bg-brand-600 hover:bg-brand-500 shadow-brand-500/25`}" aria-label="Push Button Input">
              ${e?r===`th`?`ปล่อยปุ่ม`:`Release`:r===`th`?`กดปุ่ม (Press)`:`Press Button`}
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label for="select-btn-mode" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ${r===`th`?`โหมดสวิตช์ (Switch Mode)`:`Switch Mode`}
              </label>
              <select id="select-btn-mode" class="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium">
                <option value="hold" ${t.mode===`hold`?`selected`:``}>${r===`th`?`กดติด-ปล่อยดับ (Hold)`:`Momentary Hold`}</option>
                <option value="toggle" ${t.mode===`toggle`?`selected`:``}>${r===`th`?`กดติด-กดดับ (Push Toggle)`:`Push Toggle`}</option>
              </select>
            </div>
            <div>
              <label for="slider-debounce" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>${r===`th`?`หน่วงเวลา Debounce`:`Debounce Filter`}</span>
                <span id="label-debounce" class="font-mono text-brand-600 font-bold">${t.debounceMs??30} ms</span>
              </label>
              <input id="slider-debounce" type="range" class="param-slider w-full accent-brand-600" min="10" max="100" step="5" value="${t.debounceMs??30}" data-param="debounceMs" aria-label="Debounce duration in ms">
            </div>
          </div>
        </div>
      `}case`knob`:{let e=n.adc??512;return`
        <div class="space-y-3">
          <div>
            <label for="slider-adc" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`หมุนลูกบิด Potentiometer (แอนะล็อก A0)`:`Potentiometer Wiper (A0)`}</span>
              <span id="label-adc" class="font-mono text-brand-600 font-bold">${e} / 1023</span>
            </label>
            <input id="slider-adc" type="range" class="input-slider w-full accent-brand-600" min="0" max="1023" step="1" value="${e}" data-input="adc" aria-label="Potentiometer ADC value">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
            ${r===`th`?`แปลงแรงดัน 0-5V เป็นค่าดิจิทัล 10 บิต (0-1023) และส่งออกผ่าน PWM ขา D9 (0-255)`:`Maps 0-5V input to 10-bit digital value (0-1023) and outputs PWM on D9 (0-255).`}
          </div>
        </div>
      `}case`rgb`:return`
        <div class="space-y-3">
          <div>
            <label for="slider-rgb-r" class="flex justify-between text-xs font-semibold text-rose-500 mb-1">
              <span>Red (D9 PWM: 0–255)</span>
              <span id="label-rgb-r" class="font-mono font-bold">${t.r??128}</span>
            </label>
            <input id="slider-rgb-r" type="range" class="param-slider w-full accent-rose-500" min="0" max="255" value="${t.r??128}" data-param="r" aria-label="Red Channel PWM">
          </div>
          <div>
            <label for="slider-rgb-g" class="flex justify-between text-xs font-semibold text-emerald-500 mb-1">
              <span>Green (D10 PWM: 0–255)</span>
              <span id="label-rgb-g" class="font-mono font-bold">${t.g??64}</span>
            </label>
            <input id="slider-rgb-g" type="range" class="param-slider w-full accent-emerald-500" min="0" max="255" value="${t.g??64}" data-param="g" aria-label="Green Channel PWM">
          </div>
          <div>
            <label for="slider-rgb-b" class="flex justify-between text-xs font-semibold text-blue-500 mb-1">
              <span>Blue (D11 PWM: 0–255)</span>
              <span id="label-rgb-b" class="font-mono font-bold">${t.b??0}</span>
            </label>
            <input id="slider-rgb-b" type="range" class="param-slider w-full accent-blue-500" min="0" max="255" value="${t.b??0}" data-param="b" aria-label="Blue Channel PWM">
          </div>
        </div>
      `;case`light`:{let e=n.lightAdc??600;return`
        <div class="space-y-3">
          <div>
            <label for="slider-lightAdc" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ระดับแสงตกกระทบ LDR (A0)`:`Ambient Light ADC (A0)`}</span>
              <span id="label-lightAdc" class="font-mono text-cyan-600 font-bold">${e}</span>
            </label>
            <input id="slider-lightAdc" type="range" class="input-slider w-full accent-cyan-600" min="0" max="1023" value="${e}" data-input="lightAdc" aria-label="Light sensor ADC input">
          </div>
          <div>
            <label for="slider-threshold" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`เกณฑ์ตัดสินใจเปิดไฟ (Threshold)`:`Light Threshold`}</span>
              <span id="label-threshold" class="font-mono text-brand-600 font-bold">${t.threshold??400}</span>
            </label>
            <input id="slider-threshold" type="range" class="param-slider w-full accent-brand-600" min="0" max="1023" value="${t.threshold??400}" data-param="threshold" aria-label="Light threshold setting">
          </div>
        </div>
      `}case`sensor`:{let e=n.distanceCm??30,i=n.distanceCm===null;return`
        <div class="space-y-3">
          <div>
            <label for="slider-distance" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ระยะวัตถุจำลอง (Distance)`:`Target Distance`}</span>
              <span id="label-distance" class="font-mono text-cyan-600 font-bold">${i?`No Echo`:e+` cm`}</span>
            </label>
            <input id="slider-distance" type="range" class="input-slider w-full accent-cyan-600" min="2" max="200" step="1" value="${e??30}" data-input="distanceCm" ${i?`disabled`:``} aria-label="Target distance in cm">
          </div>
          <div>
            <label for="slider-timeout" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`หมดเวลาสัญญาณสะท้อน (Timeout)`:`PulseIn Timeout`}</span>
              <span id="label-timeout" class="font-mono text-brand-600 font-bold">${t.timeoutUs??25e3} µs</span>
            </label>
            <input id="slider-timeout" type="range" class="param-slider w-full accent-brand-600" min="1000" max="30000" step="1000" value="${t.timeoutUs??25e3}" data-param="timeoutUs" aria-label="Ultrasonic timeout in microseconds">
          </div>
          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="chk-no-echo" class="rounded accent-brand-600 cursor-pointer" ${i?`checked`:``}>
            <label for="chk-no-echo" class="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              ${r===`th`?`จำลองคลื่นไม่สะท้อนกลับ (No Echo / Out of range)`:`Simulate No Echo / Out of range`}
            </label>
          </div>
        </div>
      `}case`sound`:return`
        <div class="space-y-3">
          <div>
            <label for="slider-hz" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ความถี่เสียง (Frequency)`:`Tone Frequency`}</span>
              <span id="label-hz" class="font-mono text-brand-600 font-bold">${t.hz??440} Hz</span>
            </label>
            <input id="slider-hz" type="range" class="param-slider w-full accent-brand-600" min="100" max="2000" step="10" value="${t.hz??440}" data-param="hz" aria-label="Buzzer frequency in Hz">
          </div>
          <div>
            <label for="slider-duration" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ระยะเวลาดัง (Duration)`:`Sound Duration`}</span>
              <span id="label-duration" class="font-mono text-brand-600 font-bold">${t.durationMs??1e3} ms</span>
            </label>
            <input id="slider-duration" type="range" class="param-slider w-full accent-brand-600" min="100" max="3000" step="100" value="${t.durationMs??1e3}" data-param="durationMs" aria-label="Buzzer duration in ms">
          </div>
        </div>
      `;case`piano`:{let e=t.octave===5?5:4;return`
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              ${r===`th`?`ระดับเสียง (Octave):`:`Octave Selection:`}
            </span>
            <div class="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button class="btn-octave px-2.5 py-1 rounded font-semibold ${e===4?`bg-brand-600 text-white`:`text-slate-600 dark:text-slate-300`}" data-octave="4">Octave 4</button>
              <button class="btn-octave px-2.5 py-1 rounded font-semibold ${e===5?`bg-brand-600 text-white`:`text-slate-600 dark:text-slate-300`}" data-octave="5">Octave 5</button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              ${r===`th`?`แป้นคีย์เปียโน 8 เสียง (คลิกค้างเพื่อเล่นเสียง):`:`Piano Keys (Hold to play):`}
            </label>
            <div class="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              ${[{name:`C`,freq:262*(e===5?2:1),solfege:`โด`},{name:`D`,freq:294*(e===5?2:1),solfege:`เร`},{name:`E`,freq:330*(e===5?2:1),solfege:`มี`},{name:`F`,freq:349*(e===5?2:1),solfege:`ฟา`},{name:`G`,freq:392*(e===5?2:1),solfege:`ซอล`},{name:`A`,freq:440*(e===5?2:1),solfege:`ลา`},{name:`B`,freq:494*(e===5?2:1),solfege:`ที`},{name:`C2`,freq:523*(e===5?2:1),solfege:`โดสูง`}].map((e,t)=>`
                <button class="piano-key px-1.5 py-3.5 rounded-lg font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-brand-600 hover:text-white active:scale-95 transition-all text-center select-none" data-key="${t}" aria-label="Piano note ${e.name}">
                  <span class="block">${e.name}</span>
                  <span class="block text-[10px] text-slate-400 font-normal">${r===`th`?e.solfege:e.freq+`Hz`}</span>
                </button>
              `).join(``)}
            </div>
          </div>
        </div>
      `}case`motor`:{let e=t.pwm??128,n=(e/255*100).toFixed(1);return`
        <div class="space-y-3">
          <div>
            <label for="slider-motor-pwm" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ความเร็วสัญญาณขับ PWM (D5)`:`Motor PWM Command (D5)`}</span>
              <span id="label-motor-pwm" class="font-mono text-brand-600 font-bold">${e} / 255 (${n}%)</span>
            </label>
            <input id="slider-motor-pwm" type="range" class="param-slider w-full accent-brand-600" min="0" max="255" value="${e}" data-param="pwm" aria-label="Motor PWM value">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            ${r===`th`?`มอเตอร์ต้องการกระแสสูง ต้องควบคุมผ่านทรานซิสเตอร์หรือมอเตอร์ไดรเวอร์ พร้อมไดโอดฟลายแบ็กป้องกันแรงดันย้อนกลับ (ไม่ระบุรอบต่อนาที RPM เนื่องจากขึ้นกับภาระโหลดจริง)`:`High-current DC motor is controlled via a driver transistor and flyback diode. Displays relative duty/speed (no calibrated RPM claim).`}
          </div>
        </div>
      `}case`heat`:{let e=n.tempC??25;return`
        <div class="space-y-3">
          <div>
            <label for="slider-tempC" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`อุณหภูมิสภาพแวดล้อม (Temperature)`:`Ambient Temperature`}</span>
              <span id="label-tempC" class="font-mono text-rose-500 font-bold">${e} °C</span>
            </label>
            <input id="slider-tempC" type="range" class="input-slider w-full accent-rose-500" min="-40" max="125" step="1" value="${e}" data-input="tempC" aria-label="Environment temperature in celsius">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            ${r===`th`?`เซนเซอร์ TMP36 จ่ายแรงดันเชิงเส้น 10mV/°C โดยมี Offset 500mV ที่ 0°C (ความคลาดเคลื่อนจากการปัดเศษ ADC ประมาณ ±0.25°C)`:`TMP36 provides linear 10mV/°C output with 500mV offset at 0°C (ADC quantization error is ~±0.25°C).`}
          </div>
        </div>
      `}case`servo`:{let e=t.angle??90;return`
        <div class="space-y-3">
          <div>
            <label for="slider-angle" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`มุมคำสั่งของเซอร์โว (Servo Angle)`:`Servo Command Angle`}</span>
              <span id="label-angle" class="font-mono text-brand-600 font-bold">${e}°</span>
            </label>
            <input id="slider-angle" type="range" class="param-slider w-full accent-brand-600" min="0" max="180" value="${e}" data-param="angle" aria-label="Servo angle command">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            ${r===`th`?`ควบคุมเซอร์โวมอเตอร์ SG90 ผ่านคำสั่ง Servo.write() โดยจำลองตำแหน่งมุมเชิงนามธรรม (0–180°)`:`Commands SG90 micro-servo arm position via Servo.write() between 0° and 180°.`}
          </div>
        </div>
      `}case`stepper`:{let e=t.stepsPerRev??2048,n=t.speedRpm??10,i=t.direction??1;return`
        <div class="space-y-3">
          <div>
            <label for="slider-stepsPerRev" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`จำนวนก้าวต่อรอบ (Steps/Rev)`:`Steps Per Revolution`}</span>
              <span id="label-stepsPerRev" class="font-mono text-brand-600 font-bold">${e}</span>
            </label>
            <input id="slider-stepsPerRev" type="range" class="param-slider w-full accent-brand-600" min="200" max="4096" step="64" value="${e}" data-param="stepsPerRev" aria-label="Steps per rev">
          </div>
          <div>
            <label for="slider-speedRpm" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ความเร็วรอบ (Speed RPM)`:`Motor Speed (RPM)`}</span>
              <span id="label-speedRpm" class="font-mono text-brand-600 font-bold">${n} RPM</span>
            </label>
            <input id="slider-speedRpm" type="range" class="param-slider w-full accent-brand-600" min="1" max="15" value="${n}" data-param="speedRpm" aria-label="Speed in RPM">
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              ${r===`th`?`ทิศทางการหมุน:`:`Direction:`}
            </span>
            <button id="btn-toggle-direction" class="px-3 py-1.5 rounded-lg text-xs font-bold ${i===1?`bg-emerald-600 text-white`:`bg-amber-600 text-white`}">
              ${i===1?r===`th`?`↻ ตามเข็ม (CW)`:`↻ Clockwise`:r===`th`?`↺ ทวนเข็ม (CCW)`:`↺ Counter-Clockwise`}
            </button>
          </div>
        </div>
      `}case`plant`:{let e=n.moistureRaw??600,i=t.dryRaw??800,a=t.wetRaw??350;return`
        <div class="space-y-3">
          <div>
            <label for="slider-moistureRaw" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ค่าแอนะล็อกจากเซนเซอร์ (Raw ADC A0)`:`Moisture Sensor Raw ADC (A0)`}</span>
              <span id="label-moistureRaw" class="font-mono text-brand-600 font-bold">${e} / 1023</span>
            </label>
            <input id="slider-moistureRaw" type="range" class="input-slider w-full accent-brand-600" min="0" max="1023" value="${e}" data-input="moistureRaw" aria-label="Moisture sensor raw ADC">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label for="slider-dryRaw" class="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                <span>${r===`th`?`เกณฑ์แห้ง (Dry)`:`Dry Calib`}</span>
                <span id="label-dryRaw" class="font-mono text-amber-500 font-bold">${i}</span>
              </label>
              <input id="slider-dryRaw" type="range" class="param-slider w-full accent-amber-500" min="400" max="1023" value="${i}" data-param="dryRaw" aria-label="Dry calibration">
            </div>
            <div>
              <label for="slider-wetRaw" class="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                <span>${r===`th`?`เกณฑ์ชื้น (Wet)`:`Wet Calib`}</span>
                <span id="label-wetRaw" class="font-mono text-cyan-500 font-bold">${a}</span>
              </label>
              <input id="slider-wetRaw" type="range" class="param-slider w-full accent-cyan-500" min="0" max="600" value="${a}" data-param="wetRaw" aria-label="Wet calibration">
            </div>
          </div>
        </div>
      `}case`force`:{let e=n.fsrAdc??0,i=t.threshold??700;return`
        <div class="space-y-3">
          <div>
            <label for="slider-fsrAdc" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`แรงกดบนแผ่น FSR (แอนะล็อก A0)`:`FSR Pressure Input (A0)`}</span>
              <span id="label-fsrAdc" class="font-mono text-brand-600 font-bold">${e} / 1023</span>
            </label>
            <input id="slider-fsrAdc" type="range" class="input-slider w-full accent-brand-600" min="0" max="1023" value="${e}" data-input="fsrAdc" aria-label="Force sensor ADC">
          </div>
          <div>
            <label for="slider-force-thresh" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`เกณฑ์ส่งสัญญาณเตือน (Threshold)`:`Alarm Threshold`}</span>
              <span id="label-force-thresh" class="font-mono text-amber-500 font-bold">${i}</span>
            </label>
            <input id="slider-force-thresh" type="range" class="param-slider w-full accent-amber-500" min="1" max="1023" value="${i}" data-param="threshold" aria-label="Force threshold">
          </div>
        </div>
      `}case`project`:{let e=n.distanceCm??30,i=n.distanceCm===null,a=t.nearCm??15,o=t.farCm??40;return`
        <div class="space-y-3">
          <div>
            <label for="slider-proj-dist" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${r===`th`?`ระยะวัตถุจำลอง (Distance)`:`Obstacle Distance`}</span>
              <span id="label-proj-dist" class="font-mono text-cyan-600 font-bold">${i?`No Echo`:e+` cm`}</span>
            </label>
            <input id="slider-proj-dist" type="range" class="input-slider w-full accent-cyan-600" min="2" max="200" value="${e??30}" data-input="distanceCm" ${i?`disabled`:``} aria-label="Obstacle distance">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label for="slider-nearCm" class="flex justify-between text-[11px] font-semibold text-rose-500 mb-1">
                <span>${r===`th`?`เกณฑ์ใกล้ (แดง ≤)`:`Near (Red ≤)`}</span>
                <span id="label-nearCm" class="font-mono font-bold">${a} cm</span>
              </label>
              <input id="slider-nearCm" type="range" class="param-slider w-full accent-rose-500" min="2" max="100" value="${a}" data-param="nearCm" aria-label="Near threshold">
            </div>
            <div>
              <label for="slider-farCm" class="flex justify-between text-[11px] font-semibold text-amber-500 mb-1">
                <span>${r===`th`?`เกณฑ์กลาง (เหลือง ≤)`:`Far (Yellow ≤)`}</span>
                <span id="label-farCm" class="font-mono font-bold">${o} cm</span>
              </label>
              <input id="slider-farCm" type="range" class="param-slider w-full accent-amber-500" min="${a+1}" max="200" value="${o}" data-param="farCm" aria-label="Far threshold">
            </div>
          </div>
          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="chk-no-echo" class="rounded accent-brand-600 cursor-pointer" ${i?`checked`:``}>
            <label for="chk-no-echo" class="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              ${r===`th`?`จำลองกรณีไม่พบวัตถุ (No Echo)`:`Simulate No Echo`}
            </label>
          </div>
        </div>
      `}default:return``}}var mu=null,hu=null,gu=null,_u=0,vu=null,yu=!1;function bu(){if(typeof window>`u`)return null;if(!mu){let e=window.AudioContext||window.webkitAudioContext;e&&(mu=new e)}return mu&&mu.state===`suspended`&&mu.resume().catch(()=>{}),mu}function xu(e){yu=e,yu&&wu()}function Su(){return yu}function Cu(e,t){if(yu||e<=0||!Number.isFinite(e)){wu();return}let n=bu();if(n&&!(hu&&gu&&Math.abs(_u-e)<.5)){if(hu&&gu&&_u>0)try{hu.frequency.setValueAtTime(e,n.currentTime),_u=e;return}catch{}wu();try{let r=n.currentTime,i=n.createOscillator(),a=n.createGain();if(i.type=`triangle`,i.frequency.setValueAtTime(e,r),a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(.2,r+.02),i.connect(a),a.connect(n.destination),i.start(r),hu=i,gu=a,_u=e,t&&t>0){let e=r+t/1e3;a.gain.setValueAtTime(.2,e),a.gain.exponentialRampToValueAtTime(1e-4,e+.03),vu=setTimeout(()=>{hu===i&&wu()},t+40)}}catch(e){console.warn(`Audio playback error:`,e),hu=null,gu=null,_u=0}}}function wu(){if(vu&&=(clearTimeout(vu),null),gu&&mu){let e=gu,t=hu;gu=null,hu=null,_u=0;try{let n=mu.currentTime;e.gain.setValueAtTime(e.gain.value,n),e.gain.exponentialRampToValueAtTime(1e-4,n+.02),setTimeout(()=>{try{t&&(t.stop(),t.disconnect()),e.disconnect()}catch{}},30)}catch{try{t&&t.disconnect(),e.disconnect()}catch{}}}else hu=null,gu=null,_u=0}typeof window<`u`&&(window.addEventListener(`blur`,()=>wu()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&wu()}));var Tu=l.lessons,Q={lessonId:`board`,lang:`th`,isRunning:!1,viewMode:`3d`,params:{},inputs:{},completedLessons:[],theme:document.documentElement.classList.contains(`dark`)?`dark`:`light`,simulationTimeMs:0,serialLogs:[]},Eu=o(),$={},Du=null,Ou=0,ku=0,Au=`overview`,ju=`uno`,Mu=30,Nu={};function Pu(e){try{return localStorage.getItem(e)}catch{return Nu[e]||null}}function Fu(e,t){try{localStorage.setItem(e,t)}catch{Nu[e]=t}}function Iu(){let t=new URL(window.location.href).searchParams.get(`lang`)===`en`?`en`:`th`,n=window.location.hash.replace(`#`,``).trim();return e.includes(n)||(n=`board`),{lang:t,lessonId:n}}function Lu(e=!0){let t=new URL(window.location.href);t.searchParams.set(`lang`,Q.lang),t.hash=Q.lessonId,e?window.history.pushState({},``,t.toString()):window.history.replaceState({},``,t.toString())}function Ru(){return Tu.find(e=>e.id===Q.lessonId)||Tu[0]}function zu(e){switch(e.type){case`SET_LESSON`:if(Q.lessonId!==e.id){wu(),Q.lessonId=e.id;let t=Ru();Q.params={...t.defaultParams},Q.inputs={...t.defaultInputs},Eu=o(),Q.simulationTimeMs=0,Mu=30;let n=lu(t.id,t.components);ju=n.length>1&&t.id!==`board`?n[n.length-1].id:`uno`,Lu(e.pushUrl!==!1),Wu(),Gu(),Ku(),qu(),Yu(),Du?.resetCamera()}break;case`SET_PARAM`:Q.params[e.key]=e.value,Q.lessonId===`sound`?(Eu=o(),Q.simulationTimeMs=0):Q.lessonId===`plant`?e.key===`dryRaw`&&e.value<(Q.params.wetRaw??350)+50?Q.params.dryRaw=(Q.params.wetRaw??350)+50:e.key===`wetRaw`&&e.value>(Q.params.dryRaw??800)-50&&(Q.params.wetRaw=(Q.params.dryRaw??800)-50):Q.lessonId===`project`&&(e.key===`nearCm`&&(Q.params.farCm??40)<=e.value?Q.params.farCm=e.value+1:e.key===`farCm`&&e.value<=(Q.params.nearCm??15)&&(Q.params.farCm=(Q.params.nearCm??15)+1));break;case`SET_INPUT`:Q.inputs[e.key]=e.value,e.key===`distanceCm`&&e.value!==null&&(Mu=e.value);break;case`TOGGLE_RUN`:Q.isRunning=!Q.isRunning,Q.isRunning||wu(),Qu();break;case`RESET`:{wu();let e=Ru();Q.params={...e.defaultParams},Q.inputs={...e.defaultInputs},Eu=o(),Q.simulationTimeMs=0,Mu=30,Ku(),Du?.resetCamera();break}case`SET_VIEW`:Q.viewMode=e.mode,$u();break;case`SET_LANG`:Q.lang=e.lang,document.documentElement.lang=e.lang,Lu(!1),ed(),Wu(),Gu(),Ku(),qu(),Yu(),Qu(),nd();break;case`SET_THEME`:Q.theme=e.theme,Fu(`theme`,e.theme),e.theme===`dark`?document.documentElement.classList.add(`dark`):document.documentElement.classList.remove(`dark`),Du?.setTheme(e.theme===`dark`),td();break;case`SET_TAB`:Au=e.tab,Yu();break;case`SELECT_PART`:ju=e.partId,qu(),e.focus3D&&Du&&(Q.viewMode!==`3d`&&(Q.viewMode=`3d`,$u()),Du.focusPart(e.partId));break;case`TOGGLE_COMPLETE`:Q.completedLessons.includes(e.id)?Q.completedLessons=Q.completedLessons.filter(t=>t!==e.id):Q.completedLessons.push(e.id),Fu(`apisit:arduino-lab:progress`,JSON.stringify({completed:Q.completedLessons,lastLesson:Q.lessonId})),Wu(),nd();break;case`CLEAR_SERIAL`:{Q.serialLogs=[];let e=document.getElementById(`serial-body`);e&&(e.innerHTML=``);break}}Bu(0),Ju(),Au===`code`&&Xu()}function Bu(e){let t=Ru(),n=s(Q.lessonId,Eu,Q.inputs,Q.params,e);if(Eu=n.state,$=n.output,Q.simulationTimeMs=Eu.timeMs,Q.isRunning&&$.hz&&$.hz>0?Cu($.hz,t.id===`sound`?Q.params.durationMs:void 0):wu(),Du&&Du.update(t,$,Q.isRunning),Q.viewMode===`svg`){let e=document.getElementById(`schematic-viewport`);e&&(e.innerHTML=fu(t,$,Q.isRunning,Q.lang))}Uu()}function Vu(e){Ou===0&&(Ou=e);let t=Math.min(100,e-Ou);Ou=e,Q.isRunning&&(Bu(t),e-ku>=200&&(ku=e,Hu())),requestAnimationFrame(Vu)}function Hu(){let e=Ru(),t=``;if($.distanceCm===void 0?$.tempC===void 0?$.relativePercent===void 0?$.pwm!==void 0&&$.adc!==void 0?t=`ADC: ${$.adc} -> PWM: ${$.pwm}`:e.id===`light`?t=`LDR: ${$.adc} (Threshold: ${Q.params.threshold})`:e.id===`force`&&(t=`FSR: ${$.adc} -> Needle: ${$.angle} deg (Bell: ${$.bell?`ON`:`OFF`})`):t=`Moisture: ${$.relativePercent}% [${($.condition||``).toUpperCase()}]`:t=`Temp: ${$.tempC.toFixed(1)} C (ADC: ${$.adc})`:t=$.valid?`${$.distanceCm.toFixed(1)} cm`:`NO_ECHO`,t){let e=new Date,n=`${e.getHours().toString().padStart(2,`0`)}:${e.getMinutes().toString().padStart(2,`0`)}:${e.getSeconds().toString().padStart(2,`0`)}`;Q.serialLogs.push({time:n,text:t}),Q.serialLogs.length>200&&Q.serialLogs.shift();let r=document.getElementById(`serial-body`);if(r){let e=document.createElement(`div`);e.className=`font-mono text-xs py-0.5 text-emerald-400 border-b border-slate-800/40`,e.textContent=`[${n}] ${t}`,r.appendChild(e),r.scrollTop=r.scrollHeight}}}function Uu(){let e=document.getElementById(`live-readout-panel`);if(!e)return;let t=Ru(),n=Q.lang,r=``;switch(t.id){case`blink`:{let e=(Q.params.onMs??500)+(Q.params.offMs??500),t=(1e3/e).toFixed(2),i=((Q.params.onMs??500)/e*100).toFixed(1);r=`
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`คาบเวลา (Period)`:`Period`}</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${e} ms</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`ความถี่ (Frequency)`:`Frequency`}</span>
            <span class="font-bold text-cyan-600 dark:text-cyan-400 text-sm font-mono">${t} Hz</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`สัดส่วนเวลาติด (Duty)`:`Duty Cycle`}</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">${i}%</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $T = t_{\\text{on}} + t_{\\text{off}}$, $f = \\frac{1}{T}$
        </div>
      `;break}case`knob`:{let e=$.adc??512,t=$.pwm??127;r=`
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">ADC (A0)</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${e} / 1023</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Voltage</span>
            <span class="font-bold text-cyan-600 dark:text-cyan-400 text-sm font-mono">${(e*5/1023).toFixed(2)} V</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">PWM (D9)</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm font-mono">${t} / 255</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Duty Cycle</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">${(($.duty??.5)*100).toFixed(1)}%</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $\\text{PWM} = \\text{trunc}\\left(\\frac{\\text{ADC} \\times 255}{1023}\\right)$, $V_{\\text{in}} = \\frac{\\text{ADC} \\times 5.0}{1023}$
        </div>
      `;break}case`sensor`:case`project`:{let e=$.valid,i=$.distanceCm,a=$.echoUs??0,o=$.light;r=`
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Echo Pulse</span>
            <span class="font-bold text-cyan-600 dark:text-cyan-400 text-sm font-mono">${e?a+` µs`:`TIMEOUT`}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Calculated Distance</span>
            <span class="font-bold ${e?`text-emerald-600 dark:text-emerald-400`:`text-rose-500`} text-sm font-mono">
              ${e&&i!==null?i.toFixed(1)+` cm`:n===`th`?`ไม่มีสัญญาณสะท้อน`:`NO ECHO`}
            </span>
          </div>
        </div>
        ${t.id===`project`?`
          <div class="mt-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs flex items-center justify-between">
            <span class="text-slate-500">สถานะไฟช่วยจอด:</span>
            <strong class="font-mono uppercase ${o===`red`?`text-rose-500`:o===`yellow`?`text-amber-500`:o===`green`?`text-emerald-500`:`text-slate-400`}">${o}</strong>
          </div>
        `:``}
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $d = \\frac{t_{\\text{echo}} \\times 0.0343}{2}\\text{ cm}$
        </div>
      `;break}case`heat`:{let e=$.tempC??25;r=`
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Sensor Output ($V_{\\text{out}}$)</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">${($.voltage??.75).toFixed(3)} V</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Reconstructed Temp</span>
            <span class="font-bold text-rose-600 dark:text-rose-400 text-sm font-mono">${e.toFixed(1)} °C</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $V_{\\text{out}} = 0.5 + 0.01 \\times T$, $T = (V_{\\text{out}} - 0.5) \\times 100$
        </div>
      `;break}case`motor`:{let e=(($.duty??.5)*100).toFixed(1);r=`
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">PWM Command (D5)</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${$.pwm??128} / 255</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Duty Cycle / Relative Speed</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm font-mono">${e}%</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $\\text{Duty} = \\frac{\\text{PWM}}{255} \\times 100\\%, \\quad V_{\\text{avg}} = V_{\\text{supply}} \\times \\text{Duty}$
        </div>
      `;break}case`servo`:{let e=$.angle??90,t=Math.round(544+e/180*1856);r=`
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`มุมเพลาเซอร์โว (D9)`:`Servo Angle (D9)`}</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${e}°</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`ความกว้างพัลส์ (50 Hz)`:`PWM Pulse Width (50 Hz)`}</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">≈ ${t} µs</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $t_{\\text{pulse}}(\\theta) \\approx 544 + \\frac{\\theta}{180^{\\circ}} \\times 1856\\text{ }\\mu\\text{s} \\quad (f = 50\\text{ Hz})$
        </div>
      `;break}case`stepper`:{let e=$.pins||{},t=($.phase??0)%4,i=(Q.params.direction??1)===1?n===`th`?`↻ ตามเข็ม (CW)`:`↻ Clockwise (CW)`:n===`th`?`↺ ทวนเข็ม (CCW)`:`↺ Counter-CW (CCW)`,a=[{lbl:`A (IN1/D8)`,on:(e.D8??0)>0},{lbl:`B (IN2/D9)`,on:(e.D9??0)>0},{lbl:`C (IN3/D10)`,on:(e.D10??0)>0},{lbl:`D (IN4/D11)`,on:(e.D11??0)>0}];r=`
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`จำนวนก้าวสะสม (Steps)`:`Accumulated Steps`}</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${$.steps??0}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`มุมเพลาเอาต์พุต (Angle)`:`Shaft Angle`}</span>
            <span class="font-bold text-amber-500 text-sm font-mono">${($.angle??0).toFixed(1)}°</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
            <span class="text-slate-500 dark:text-slate-400 block">${n===`th`?`เฟสกระตุ้น / ทิศทาง`:`Active Phase / Dir`}</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400 text-xs font-mono">Phase ${t} · ${i}</span>
          </div>
        </div>
        <div class="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span class="text-slate-500 dark:text-slate-400 mr-1">${n===`th`?`ขดลวด (2-Coil Full-Step):`:`Coils (2-Phase Full-Step):`}</span>
          ${a.map(e=>`
            <span class="px-2 py-0.5 rounded border ${e.on?`bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold`:`bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400`}">${e.lbl}: ${e.on?`1`:`0`}</span>
          `).join(``)}
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $\\Delta\\text{steps} = \\frac{\\text{RPM} \\times N_{\\text{rev}}}{60}\\Delta t, \\quad \\theta = \\frac{\\text{steps} \\bmod N_{\\text{rev}}}{N_{\\text{rev}}} \\times 360^{\\circ}$
        </div>
      `;break}case`plant`:{let e=$.relativePercent??50,t=($.condition??`ok`).toUpperCase();r=`
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Relative Moisture</span>
            <span class="font-bold text-cyan-600 text-sm font-mono">${e}%</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Condition Status</span>
            <span class="font-bold ${t===`WET`?`text-blue-500`:t===`DRY`?`text-amber-500`:`text-emerald-500`} text-sm font-mono">${t}</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $\\text{Moisture}(\\%) = \\text{clamp}_{0..100}\\left(\\text{round}\\left(\\frac{\\text{dryRaw} - \\text{ADC}}{\\text{dryRaw} - \\text{wetRaw}} \\times 100\\right)\\right)$
        </div>
      `;break}case`force`:{let e=$.bell===!0;r=`
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Needle Angle (D9)</span>
            <span class="font-bold text-brand-600 text-sm font-mono">${$.angle??0}°</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Buzzer Alarm (D8)</span>
            <span class="font-bold ${e?`text-amber-500`:`text-slate-400`} text-sm font-mono">${e?`ACTIVE (1568 Hz)`:`OFF`}</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $\\theta = \\text{trunc}\\left(\\frac{\\text{FSR} \\times 180}{1023}\\right), \\quad \\text{Bell} = (\\text{FSR} \\ge \\text{threshold})$
        </div>
      `;break}default:r=`
        <div class="flex flex-wrap gap-2 text-xs">
          ${Object.entries($.pins||{}).map(([e,t])=>`
            <span class="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">
              <strong>${e}:</strong> ${t}
            </span>
          `).join(``)||`<span class="text-slate-400">บอร์ดพร้อมทำงาน</span>`}
        </div>
      `}e.innerHTML=r,window.renderMathInElement&&window.renderMathInElement(e,{delimiters:[{left:`$$`,right:`$$`,display:!0},{left:`$`,right:`$`,display:!1}],throwOnError:!1})}function Wu(){document.querySelectorAll(`.lesson-pill`).forEach(e=>{let t=e.getAttribute(`data-lesson-id`),n=t===Q.lessonId,r=Q.completedLessons.includes(t||``);e.className=`lesson-pill inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${n?`bg-brand-600 text-white shadow-sm shadow-brand-500/30 ring-2 ring-brand-500/30`:`bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700`}`;let i=e.querySelector(`.badge-num`);i&&(i.className=`badge-num w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${n?`bg-white/20 text-white`:r?`bg-emerald-500 text-white`:`bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300`}`,i.textContent=r?`✓`:e.getAttribute(`data-order`)||``);let a=e.querySelector(`.badge-title`);if(a){let e=Tu.find(e=>e.id===t);e&&(a.textContent=e.title[Q.lang]||e.title.th)}})}function Gu(){let e=Ru(),t=Q.lang,n=document.getElementById(`lesson-header-title`);n&&(n.textContent=e.title[t]);let r=document.getElementById(`lesson-header-obj`);r&&(r.textContent=e.objective[t]);let i=document.getElementById(`lesson-header-id`);i&&(i.textContent=`id: ${e.id}`);let a=document.getElementById(`lesson-header-order`);a&&(a.textContent=`${t===`th`?`บทเรียนที่`:`Lesson`} ${e.order} / 16`)}function Ku(){let e=document.getElementById(`controls-container`);e&&(e.innerHTML=pu(Ru(),Q.params,Q.inputs,Q.lang),rd())}function qu(){let e=document.getElementById(`equipment-inspector-title`);e&&(e.textContent=Q.lang===`th`?`🔬 สำรวจชิ้นส่วนอุปกรณ์และโครงสร้างขาพิน (คลิกชิ้นส่วนหรือปุ่มด้านล่าง)`:`🔬 Interactive Equipment & Pinout Inspector (Click a part to inspect)`);let t=document.getElementById(`equipment-inspector-body`);if(!t)return;let n=Ru();t.innerHTML=uu(n.id,n.components,ju,Q.lang),t.querySelectorAll(`.equipment-part-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-part-id`);t&&zu({type:`SELECT_PART`,partId:t,focus3D:!1})})});let r=document.getElementById(`btn-focus-3d-part`);r&&r.addEventListener(`click`,()=>{zu({type:`SELECT_PART`,partId:r.getAttribute(`data-part-id`)||ju,focus3D:!0})}),window.renderMathInElement&&window.renderMathInElement(t,{delimiters:[{left:`$$`,right:`$$`,display:!0},{left:`$`,right:`$`,display:!1}],throwOnError:!1})}function Ju(){let e=document.getElementById(`label-onMs`);e&&(e.textContent=`${Q.params.onMs??500} ms`);let t=document.getElementById(`label-offMs`);t&&(t.textContent=`${Q.params.offMs??500} ms`);let n=document.getElementById(`label-debounce`);n&&(n.textContent=`${Q.params.debounceMs??30} ms`);let r=document.getElementById(`label-adc`);r&&(r.textContent=`${Q.inputs.adc??512} / 1023`);let i=document.getElementById(`label-rgb-r`);i&&(i.textContent=`${Q.params.r??128}`);let a=document.getElementById(`label-rgb-g`);a&&(a.textContent=`${Q.params.g??64}`);let o=document.getElementById(`label-rgb-b`);o&&(o.textContent=`${Q.params.b??0}`);let s=document.getElementById(`label-lightAdc`);s&&(s.textContent=`${Q.inputs.lightAdc??600}`);let c=document.getElementById(`label-threshold`);c&&(c.textContent=`${Q.params.threshold??400}`);let l=document.getElementById(`label-distance`);l&&(l.textContent=Q.inputs.distanceCm===null?`No Echo`:`${Q.inputs.distanceCm} cm`);let u=document.getElementById(`label-timeout`);u&&(u.textContent=`${Q.params.timeoutUs??25e3} µs`);let d=document.getElementById(`label-hz`);d&&(d.textContent=`${Q.params.hz??440} Hz`);let f=document.getElementById(`label-duration`);f&&(f.textContent=`${Q.params.durationMs??1e3} ms`);let p=document.getElementById(`label-motor-pwm`);if(p){let e=Q.params.pwm??128;p.textContent=`${e} / 255 (${(e/255*100).toFixed(1)}%)`}let m=document.getElementById(`label-tempC`);m&&(m.textContent=`${Q.inputs.tempC??25} °C`);let h=document.getElementById(`label-angle`);h&&(h.textContent=`${Q.params.angle??90}°`);let g=document.getElementById(`label-stepsPerRev`);g&&(g.textContent=`${Q.params.stepsPerRev??2048}`);let _=document.getElementById(`label-speedRpm`);_&&(_.textContent=`${Q.params.speedRpm??10} RPM`);let v=document.getElementById(`label-moistureRaw`);v&&(v.textContent=`${Q.inputs.moistureRaw??600} / 1023`);let y=document.getElementById(`label-dryRaw`);y&&(y.textContent=`${Q.params.dryRaw??800}`);let b=document.getElementById(`label-wetRaw`);b&&(b.textContent=`${Q.params.wetRaw??350}`);let x=document.getElementById(`label-fsrAdc`);x&&(x.textContent=`${Q.inputs.fsrAdc??0} / 1023`);let S=document.getElementById(`label-force-thresh`);S&&(S.textContent=`${Q.params.threshold??700}`);let C=document.getElementById(`label-proj-dist`);C&&(C.textContent=Q.inputs.distanceCm===null?`No Echo`:`${Q.inputs.distanceCm} cm`);let w=document.getElementById(`label-nearCm`);w&&(w.textContent=`${Q.params.nearCm??15} cm`);let T=document.getElementById(`label-farCm`);T&&(T.textContent=`${Q.params.farCm??40} cm`);let E=document.getElementById(`readout-d2`);if(E){let e=Q.inputs.pressed===!0;E.textContent=e?`0 (LOW/Pressed)`:`1 (HIGH/Pull-Up)`,E.className=`font-mono ${e?`text-amber-500`:`text-slate-400`}`}}function Yu(){document.querySelectorAll(`.tab-btn`).forEach(e=>{e.className=`tab-btn px-3 py-1.5 rounded-lg transition-colors ${e.getAttribute(`data-tab`)===Au?`bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold`:`text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium`}`});let e=document.getElementById(`tab-content`);e&&(e.innerHTML=Zu(Ru(),Q.lang,Au),id())}function Xu(){let e=document.querySelector(`#tab-content pre code`);e&&(e.textContent=c(Q.lessonId,Q.params))}function Zu(e,t,n){switch(n){case`overview`:return`
        <div class="space-y-4 text-xs sm:text-sm">
          <div>
            <h4 class="font-bold text-slate-800 dark:text-white mb-1">${t===`th`?`ภาพรวม`:`Overview`}</h4>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${e.overview[t]}</p>
          </div>
          <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <h4 class="font-bold text-amber-800 dark:text-amber-300 mb-1">🎯 ${t===`th`?`โจทย์ท้าทาย (Challenge)`:`Challenge`}</h4>
            <p class="text-amber-900 dark:text-amber-200 text-xs">${e.challenge[t]}</p>
          </div>
          <div class="p-3.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60">
            <h4 class="font-bold text-brand-800 dark:text-brand-300 mb-1">💡 ${t===`th`?`ชวนคิด (Reflection)`:`Reflection`}</h4>
            <p class="text-brand-900 dark:text-brand-200 text-xs">${e.reflection[t]}</p>
          </div>
        </div>
      `;case`pinout`:return`
        <div class="overflow-x-auto text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th class="py-2 px-2.5">จากขา (From)</th>
                <th class="py-2 px-2.5">ไปยัง (To)</th>
                <th class="py-2 px-2.5">คำอธิบาย (Notes)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
              ${e.connections.map(e=>`
                <tr>
                  <td class="py-2 px-2.5 font-bold font-mono text-brand-600 dark:text-brand-400">${e.from}</td>
                  <td class="py-2 px-2.5 font-semibold text-slate-800 dark:text-white">${e.to}</td>
                  <td class="py-2 px-2.5 text-slate-500">${e.note?e.note[t]||e.note.th:`-`}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      `;case`code`:{let n=c(e.id,Q.params);return`
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 font-mono">Arduino Uno C++ (.ino)</span>
            <div class="flex items-center gap-2">
              <button id="btn-copy-code" class="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors">
                ${t===`th`?`คัดลอกโค้ด`:`Copy Code`}
              </button>
              <button id="btn-download-ino" class="px-2.5 py-1 rounded bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition-colors">
                ${t===`th`?`ดาวน์โหลด .ino`:`Download .ino`}
              </button>
            </div>
          </div>
          <pre class="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed border border-slate-800"><code>${n.replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}</code></pre>
        </div>
      `}case`serial`:return`
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 font-mono">Baud Rate: 9600</span>
            <button id="btn-clear-serial" class="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs text-slate-600 dark:text-slate-300">
              ${t===`th`?`ล้างข้อความ`:`Clear`}
            </button>
          </div>
          <div id="serial-body" class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs h-56 overflow-y-auto space-y-1">
            ${Q.serialLogs.map(e=>`
              <div class="font-mono text-xs py-0.5 text-emerald-400 border-b border-slate-800/40">
                [${e.time}] ${e.text}
              </div>
            `).join(``)||`<div class="text-slate-600 text-xs italic">${t===`th`?`ยังไม่มีข้อมูล Serial ออกมา... กดปุ่มเริ่มจำลอง`:`No serial output yet... Click Run`}</div>`}
          </div>
        </div>
      `;default:return``}}function Qu(){let e=document.getElementById(`btn-toggle-run`),t=document.getElementById(`floating-badge-run`),n=Q.lang;e&&(e.className=`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-md ${Q.isRunning?`bg-amber-600 hover:bg-amber-500 shadow-amber-500/20`:`bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-brand-500/25`}`,e.innerHTML=Q.isRunning?`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> <span>${n===`th`?`พักแบบจำลอง`:`Pause`}</span>`:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> <span>${n===`th`?`เริ่มจำลอง`:`Run`}</span>`),t&&(t.className=`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${Q.isRunning?`bg-emerald-500 text-white shadow-emerald-500/20`:`bg-slate-500/80 text-white`}`,t.textContent=Q.isRunning?n===`th`?`● กำลังจำลอง`:`● RUNNING`:n===`th`?`○ พักการทดลอง`:`○ STOPPED`)}function $u(){let e=document.getElementById(`btn-view-3d`),t=document.getElementById(`btn-view-svg`),n=document.getElementById(`three-viewport`),r=document.getElementById(`schematic-viewport`),i=document.getElementById(`floating-badge-view`),a=document.getElementById(`cam-preset-bar`);e&&t&&(e.className=`px-2.5 py-1 rounded-md font-semibold transition-all ${Q.viewMode===`3d`?`bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm`:`text-slate-600 dark:text-slate-400 hover:text-slate-900`}`,t.className=`px-2.5 py-1 rounded-md font-semibold transition-all ${Q.viewMode===`svg`?`bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm`:`text-slate-600 dark:text-slate-400 hover:text-slate-900`}`),n&&r&&(Q.viewMode===`3d`?(n.classList.remove(`hidden`),r.classList.add(`hidden`),a?.classList.remove(`hidden`)):(n.classList.add(`hidden`),r.classList.remove(`hidden`),a?.classList.add(`hidden`))),i&&(i.textContent=Q.viewMode===`3d`?`3D Lab Bench`:`2D Schematic`)}function ed(){let e=document.getElementById(`btn-lang-toggle`);e&&(e.textContent=Q.lang===`th`?`EN`:`TH`);let t=document.getElementById(`brand-title`);t&&(t.textContent=Q.lang===`th`?`ห้องทดลองอาร์ดูอิโน`:`Arduino Lab`);let n={iso:{th:`3D มุมปกติ`,en:`3D Iso`},top:{th:`มุมบน (Top)`,en:`Top View`},board:{th:`ซูมบอร์ด Uno`,en:`Uno Board`},closeup:{th:`ซูมวงจรทดลอง`,en:`Circuit Zoom`}};document.querySelectorAll(`.btn-cam-preset`).forEach(e=>{let t=e.getAttribute(`data-preset`)||``;n[t]&&(e.textContent=n[t][Q.lang])});let r=document.querySelector(`#btn-reset-cam span`);r&&(r.textContent=Q.lang===`th`?`รีเซ็ตมุมมอง`:`Reset View`)}function td(){let e=document.getElementById(`btn-theme-toggle`),t=Q.theme===`dark`;e&&(e.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${t?`<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`:`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`}
      </svg>
    `)}function nd(){let e=document.getElementById(`btn-mark-complete`);if(e){let t=Q.completedLessons.includes(Q.lessonId),n=Q.lang;e.className=`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${t?`bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800`:`bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white`}`,e.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${t?n===`th`?`ทำเสร็จแล้ว`:`Completed`:n===`th`?`บันทึกว่าทำเสร็จแล้ว`:`Mark as Done`}</span>
    `}}function rd(){document.querySelectorAll(`.param-slider`).forEach(e=>{e.addEventListener(`input`,e=>{let t=e.target.getAttribute(`data-param`);t&&zu({type:`SET_PARAM`,key:t,value:parseFloat(e.target.value)})})}),document.querySelectorAll(`.input-slider`).forEach(e=>{e.addEventListener(`input`,e=>{let t=e.target.getAttribute(`data-input`);t&&zu({type:`SET_INPUT`,key:t,value:parseFloat(e.target.value)})})});let e=document.getElementById(`select-btn-mode`);e&&e.addEventListener(`change`,e=>{zu({type:`SET_PARAM`,key:`mode`,value:e.target.value})});let t=document.getElementById(`btn-press-input`);if(t){let e=e=>{try{t.setPointerCapture(e.pointerId)}catch{}zu({type:`SET_INPUT`,key:`pressed`,value:!0})},n=e=>{try{t.releasePointerCapture(e.pointerId)}catch{}zu({type:`SET_INPUT`,key:`pressed`,value:!1})};t.addEventListener(`pointerdown`,e),t.addEventListener(`pointerup`,n),t.addEventListener(`pointercancel`,n),t.addEventListener(`lostpointercapture`,n),t.addEventListener(`keydown`,e=>{e.code!==`Space`&&e.code!==`Enter`||e.repeat||(e.preventDefault(),zu({type:`SET_INPUT`,key:`pressed`,value:!0}))}),t.addEventListener(`keyup`,e=>{(e.code===`Space`||e.code===`Enter`)&&(e.preventDefault(),zu({type:`SET_INPUT`,key:`pressed`,value:!1}))})}let n=document.getElementById(`chk-no-echo`);n&&n.addEventListener(`change`,e=>{let t=e.target.checked;zu({type:`SET_INPUT`,key:`distanceCm`,value:t?null:Mu});let n=document.querySelector(`input[data-input="distanceCm"]`);n&&(n.disabled=t)}),document.querySelectorAll(`.piano-key`).forEach(e=>{let t=parseInt(e.getAttribute(`data-key`)||`0`,10),n=n=>{try{e.setPointerCapture(n.pointerId)}catch{}zu({type:`SET_INPUT`,key:`key`,value:t})},r=t=>{try{e.releasePointerCapture(t.pointerId)}catch{}zu({type:`SET_INPUT`,key:`key`,value:null})};e.addEventListener(`pointerdown`,n),e.addEventListener(`pointerup`,r),e.addEventListener(`pointercancel`,r),e.addEventListener(`lostpointercapture`,r)}),document.querySelectorAll(`.btn-octave`).forEach(e=>{e.addEventListener(`click`,()=>{zu({type:`SET_PARAM`,key:`octave`,value:parseInt(e.getAttribute(`data-octave`)||`4`,10)}),Ku()})});let r=document.getElementById(`btn-toggle-direction`);r&&r.addEventListener(`click`,()=>{zu({type:`SET_PARAM`,key:`direction`,value:(Q.params.direction??1)===1?-1:1}),Ku()})}function id(){let e=document.getElementById(`btn-copy-code`);e&&e.addEventListener(`click`,()=>{let n=c(Q.lessonId,Q.params);navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(n).then(()=>{e.textContent=Q.lang===`th`?`คัดลอกสำเร็จ!`:`Copied!`,setTimeout(()=>e.textContent=Q.lang===`th`?`คัดลอกโค้ด`:`Copy Code`,2e3)}).catch(()=>t(n)):t(n)});function t(t){let n=document.createElement(`textarea`);n.value=t,document.body.appendChild(n),n.select();try{document.execCommand(`copy`),e&&(e.textContent=Q.lang===`th`?`คัดลอกสำเร็จ!`:`Copied!`,setTimeout(()=>e.textContent=Q.lang===`th`?`คัดลอกโค้ด`:`Copy Code`,2e3))}catch{}document.body.removeChild(n)}let n=document.getElementById(`btn-download-ino`);n&&n.addEventListener(`click`,()=>{let e=c(Q.lessonId,Q.params),t=new Blob([e],{type:`text/plain;charset=utf-8`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`${Q.lessonId}_sketch.ino`,document.body.appendChild(r),r.click(),document.body.removeChild(r),setTimeout(()=>URL.revokeObjectURL(n),100)});let r=document.getElementById(`btn-clear-serial`);r&&r.addEventListener(`click`,()=>{zu({type:`CLEAR_SERIAL`})})}function ad(){let e=document.getElementById(`app`);if(!e)return;let t=Ru(),n=Q.lang,r=Q.theme===`dark`;e.innerHTML=`
    <!-- Topbar Navigation -->
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <!-- Brand & Title -->
        <div class="flex items-center gap-3 min-w-0">
          <a href="../../index.html" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="กลับหน้าหลัก">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span class="hidden sm:inline">กลับหน้าหลัก</span>
          </a>
          <div class="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
          <div class="min-w-0">
            <h1 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate flex items-center gap-2">
              <span id="brand-title">${n===`th`?`ห้องทดลองอาร์ดูอิโน`:`Arduino Lab`}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full font-medium bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/60 inline-flex items-center">
                Arduino
              </span>
            </h1>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-2">
          <!-- View Mode Toggle -->
          <div class="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <button id="btn-view-3d" class="px-2.5 py-1 rounded-md font-semibold transition-all ${Q.viewMode===`3d`?`bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm`:`text-slate-600 dark:text-slate-400 hover:text-slate-900`}">
              3D View
            </button>
            <button id="btn-view-svg" class="px-2.5 py-1 rounded-md font-semibold transition-all ${Q.viewMode===`svg`?`bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm`:`text-slate-600 dark:text-slate-400 hover:text-slate-900`}">
              2D Circuit
            </button>
          </div>

          <!-- Mute / Audio Toggle -->
          <button id="btn-mute-toggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="${Su()?`เปิดเสียง`:`ปิดเสียง`}">
            <svg id="icon-audio" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${Su()?`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`:`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`}
            </svg>
          </button>

          <!-- Theme Toggle -->
          <button id="btn-theme-toggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="สลับธีม สว่าง/มืด">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${r?`<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`:`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`}
            </svg>
          </button>

          <!-- Language Toggle -->
          <button id="btn-lang-toggle" class="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Switch Language">
            ${n===`th`?`EN`:`TH`}
          </button>

          <!-- Fullscreen Toggle Button -->
          <button id="btn-fullscreen-toggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="เต็มหน้าจอ">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Lesson Navigation Bar (Fixed Multi-Row View - No Horizontal Scrolling) -->
    <nav class="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-3 sm:px-6">
      <div id="lesson-nav-bar" class="max-w-7xl mx-auto flex flex-wrap items-center gap-1.5 sm:gap-2">
        ${Tu.map(e=>{let t=e.id===Q.lessonId,r=Q.completedLessons.includes(e.id);return`
            <button class="lesson-pill inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${t?`bg-brand-600 text-white shadow-sm shadow-brand-500/30 ring-2 ring-brand-500/30`:`bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700`}" data-lesson-id="${e.id}" data-order="${e.order}">
              <span class="badge-num w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${t?`bg-white/20 text-white`:r?`bg-emerald-500 text-white`:`bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300`}">
                ${r?`✓`:e.order}
              </span>
              <span class="badge-title">${e.title[n]}</span>
            </button>
          `}).join(``)}
      </div>
    </nav>

    <!-- Main Workspace Grid (Single Window Scroll - No Nested Scrollbars) -->
    <main class="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Right Column on Desktop, Top on Mobile: 3D/SVG Viewport & Live Readout (order-1 lg:order-2) -->
      <section class="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
        
        <!-- Viewport Container (Three.js canvas is mounted once here) -->
        <div class="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm">
          
          <div id="three-viewport" class="w-full h-full ${Q.viewMode===`3d`?`block`:`hidden`}"></div>
          <div id="schematic-viewport" class="w-full h-full p-2 overflow-auto ${Q.viewMode===`svg`?`block`:`hidden`}"></div>

          <!-- Floating Badges -->
          <div class="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
            <span id="floating-badge-run" class="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${Q.isRunning?`bg-emerald-500 text-white shadow-emerald-500/20`:`bg-slate-500/80 text-white`}">
              ${Q.isRunning?n===`th`?`● กำลังจำลอง`:`● RUNNING`:n===`th`?`○ พักการทดลอง`:`○ STOPPED`}
            </span>
            <span id="floating-badge-view" class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/60 text-white backdrop-blur-sm">
              ${Q.viewMode===`3d`?`3D Lab Bench`:`2D Schematic`}
            </span>
          </div>

          <!-- Camera View Presets & Reset Bar -->
          <div id="cam-preset-bar" class="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 z-10 pointer-events-auto">
            <div class="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/75 backdrop-blur-md border border-slate-700/80 text-[11px] text-slate-200">
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="iso">
                3D มุมปกติ
              </button>
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="top">
                มุมบน (Top)
              </button>
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="board">
                ซูมบอร์ด Uno
              </button>
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="closeup">
                ซูมวงจรทดลอง
              </button>
            </div>

            <button id="btn-reset-cam" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-1.5" title="รีเซ็ตมุมกล้อง">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
              <span>รีเซ็ตมุมมอง</span>
            </button>
          </div>
        </div>

        <!-- Simulation Run / Stop / Reset Bar -->
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-2">
            <button id="btn-toggle-run" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-md ${Q.isRunning?`bg-amber-600 hover:bg-amber-500 shadow-amber-500/20`:`bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-brand-500/25`}">
              ${Q.isRunning?`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> <span>${n===`th`?`พักแบบจำลอง`:`Pause`}</span>`:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> <span>${n===`th`?`เริ่มจำลอง`:`Run`}</span>`}
            </button>

            <button id="btn-reset-exp" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="เริ่มการทดลองใหม่">
              ${n===`th`?`เริ่มใหม่`:`Reset`}
            </button>
          </div>

          <button id="btn-mark-complete" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${Q.completedLessons.includes(Q.lessonId)?`bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800`:`bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white`}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>${Q.completedLessons.includes(Q.lessonId)?n===`th`?`ทำเสร็จแล้ว`:`Completed`:n===`th`?`บันทึกว่าทำเสร็จแล้ว`:`Mark as Done`}</span>
          </button>
        </div>

        <!-- Live Math & Status Readout Panel -->
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <h3 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            ${n===`th`?`การคำนวณและค่าทางไฟฟ้า (Live Formulas)`:`Live Calculations & Physics`}
          </h3>
          <div id="live-readout-panel"></div>
        </div>

        <!-- Interactive Equipment & Parts Inspector -->
        <div id="equipment-inspector-panel" class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <h3 id="equipment-inspector-title" class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">
            ${n===`th`?`🔬 สำรวจชิ้นส่วนอุปกรณ์และโครงสร้างขาพิน (คลิกชิ้นส่วนหรือปุ่มด้านล่าง)`:`🔬 Interactive Equipment & Pinout Inspector (Click a part to inspect)`}
          </h3>
          <div id="equipment-inspector-body"></div>
        </div>

      </section>

      <!-- Left Column on Desktop, Bottom on Mobile: Controls, Tabs & Learning Guide (order-2 lg:order-1) -->
      <section class="lg:col-span-5 flex flex-col gap-4 order-2 lg:order-1">
        
        <!-- Lesson Header Card -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div class="flex items-center gap-2 mb-1.5">
            <span id="lesson-header-order" class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
              ${n===`th`?`บทเรียนที่`:`Lesson`} ${t.order} / 16
            </span>
            <span id="lesson-header-id" class="text-xs text-slate-400 font-mono">id: ${t.id}</span>
          </div>
          <h2 id="lesson-header-title" class="text-lg font-bold text-slate-900 dark:text-white mb-2">${t.title[n]}</h2>
          <p id="lesson-header-obj" class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${t.objective[n]}</p>
        </div>

        <!-- Interactive Control Panel (Sliders & Buttons) -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <h3 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            ${n===`th`?`ปรับแต่งตัวแปรและการทดลอง`:`Experiment Controls`}
          </h3>
          
          <div id="controls-container" class="space-y-4">
            ${pu(t,Q.params,Q.inputs,n)}
          </div>
        </div>

        <!-- Information & Code Walkthrough Tabs -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <!-- Tab Navigation -->
          <div id="tab-nav" class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 text-xs font-semibold overflow-x-auto">
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold" data-tab="overview">
              ${n===`th`?`สาระสำคัญ & ท้าทาย`:`Overview & Task`}
            </button>
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium" data-tab="pinout">
              ${n===`th`?`จุดต่อขาพิน`:`Connections`}
            </button>
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium" data-tab="code">
              ${n===`th`?`โค้ด Arduino (.ino)`:`Code (.ino)`}
            </button>
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium" data-tab="serial">
              Serial Monitor
            </button>
          </div>

          <!-- Tab Contents -->
          <div id="tab-content">
            ${Zu(t,n,Au)}
          </div>
        </div>

      </section>

    </main>

    <!-- Official Author Profile Card & Footer -->
    <footer class="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-10 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            AT
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>ดร.อภิสิทธิ์ ธงไชย</span>
              <span class="text-brand-600 dark:text-brand-400 text-xs px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800">
                นักวิจัยและนักการศึกษา
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ph.D. วิทยาศาสตร์และเทคโนโลยีศึกษา · Independent Educator & Researcher
            </p>
          </div>
        </div>

        <div class="text-xs text-slate-500 dark:text-slate-400 text-center md:text-right">
          <p>© 2026 ดร.อภิสิทธิ์ ธงไชย (Dr. Apisit Tongchai) · All rights reserved.</p>
          <p class="mt-1">แบบจำลองเพื่อการเรียนรู้ทางฟิสิกส์และอิเล็กทรอนิกส์เชิงโต้ตอบ (Guided Educational Simulation)</p>
        </div>

      </div>
    </footer>
  `,od();let i=document.getElementById(`three-viewport`);i&&!Du&&(Du=du(i,e=>{zu({type:`SELECT_PART`,partId:e,focus3D:!0})}),Du||(Q.viewMode=`svg`,$u())),qu(),rd(),id(),Bu(0)}function od(){document.getElementById(`lesson-nav-bar`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.lesson-pill`);if(t){let e=t.getAttribute(`data-lesson-id`);e&&zu({type:`SET_LESSON`,id:e})}}),document.getElementById(`btn-toggle-run`)?.addEventListener(`click`,()=>{zu({type:`TOGGLE_RUN`})}),document.getElementById(`btn-reset-exp`)?.addEventListener(`click`,()=>{zu({type:`RESET`})}),document.getElementById(`btn-mark-complete`)?.addEventListener(`click`,()=>{zu({type:`TOGGLE_COMPLETE`,id:Q.lessonId})}),document.getElementById(`btn-view-3d`)?.addEventListener(`click`,()=>{zu({type:`SET_VIEW`,mode:`3d`})}),document.getElementById(`btn-view-svg`)?.addEventListener(`click`,()=>{zu({type:`SET_VIEW`,mode:`svg`})}),document.querySelectorAll(`.btn-cam-preset`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-preset`);t&&Du&&Du.setCameraPreset(t)})}),document.getElementById(`btn-mute-toggle`)?.addEventListener(`click`,()=>{xu(!Su());let e=document.getElementById(`icon-audio`);e&&(e.innerHTML=Su()?`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`:`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`)}),document.getElementById(`btn-theme-toggle`)?.addEventListener(`click`,()=>{zu({type:`SET_THEME`,theme:Q.theme===`dark`?`light`:`dark`})}),document.getElementById(`btn-lang-toggle`)?.addEventListener(`click`,()=>{zu({type:`SET_LANG`,lang:Q.lang===`th`?`en`:`th`})}),document.getElementById(`btn-fullscreen-toggle`)?.addEventListener(`click`,()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.getElementById(`btn-reset-cam`)?.addEventListener(`click`,()=>{Du?.resetCamera()}),document.getElementById(`tab-nav`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.tab-btn`);if(t){let e=t.getAttribute(`data-tab`);e&&zu({type:`SET_TAB`,tab:e})}})}window.addEventListener(`popstate`,()=>{let{lang:e,lessonId:t}=Iu();Q.lang!==e&&zu({type:`SET_LANG`,lang:e}),Q.lessonId!==t&&zu({type:`SET_LESSON`,id:t,pushUrl:!1})});function sd(){try{let e=Pu(`apisit:arduino-lab:progress`);if(e){let t=JSON.parse(e);Array.isArray(t.completed)&&(Q.completedLessons=t.completed)}}catch{}let{lang:e,lessonId:t}=Iu();Q.lang=e,Q.lessonId=t;let n=Ru();Q.params={...n.defaultParams},Q.inputs={...n.defaultInputs};let r=lu(n.id,n.components);ju=r.length>1&&n.id!==`board`?r[r.length-1].id:`uno`,Lu(!1),ad(),requestAnimationFrame(Vu)}sd();