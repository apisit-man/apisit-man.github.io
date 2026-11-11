(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=.01,t=.02;function n(n){let{voltage:r,forwardVoltage:i,resistance:a,power:o,polarity:s,closedCircuit:c=!0}=n,l=Number.isFinite(r)&&r>=0,u=Number.isFinite(i)&&i>=0,d=Number.isFinite(a)&&a>0;if(!l||!u||!d)return{isValid:!1,errorMessage:d?`Supply and forward voltages must be non-negative finite numbers`:`Resistance must be greater than zero and finite`,actualCurrent:NaN,predictedCurrent:NaN,resistorVoltage:NaN,resistorPower:NaN,ledVoltage:NaN,glowIntensity:0,isReverseBiased:s===`reverse`,isBelowThreshold:!1,isOvercurrent:!1,isTargetMet:!1,kvlSatisfied:!1};let f=r>i?(r-i)/a:0;if(!o||!c)return{isValid:!0,actualCurrent:0,predictedCurrent:f,resistorVoltage:0,resistorPower:0,ledVoltage:0,glowIntensity:0,isReverseBiased:s===`reverse`,isBelowThreshold:r<=i,isOvercurrent:!1,isTargetMet:!1,kvlSatisfied:!1};if(s===`reverse`)return{isValid:!0,actualCurrent:0,predictedCurrent:f,resistorVoltage:0,resistorPower:0,ledVoltage:r,glowIntensity:0,isReverseBiased:!0,isBelowThreshold:!1,isOvercurrent:!1,isTargetMet:!1,kvlSatisfied:!1};if(r<=i)return{isValid:!0,actualCurrent:0,predictedCurrent:0,resistorVoltage:0,resistorPower:0,ledVoltage:r,glowIntensity:0,isReverseBiased:!1,isBelowThreshold:!0,isOvercurrent:!1,isTargetMet:!1,kvlSatisfied:!1};let p=(r-i)/a,m=p*a,h=p*p*a,g=i;return{isValid:!0,actualCurrent:p,predictedCurrent:f,resistorVoltage:m,resistorPower:h,ledVoltage:g,glowIntensity:Math.min(1,Math.max(.2,p/t)),isReverseBiased:!1,isBelowThreshold:!1,isOvercurrent:p>t,isTargetMet:p>=e,kvlSatisfied:Math.abs(r-(m+g))<1e-9}}function r(e,t=`th`){if(!Number.isFinite(e))return`---`;let n=e*1e3;return Math.abs(n)<1e-4?`0.00 mA`:`${n.toFixed(2)} mA`}function i(e){return Number.isFinite(e)?`${e.toFixed(2)} V`:`---`}function a(e){return Number.isFinite(e)?e>=1e3?`${(e/1e3).toFixed(1)} kΩ`:`${e.toFixed(0)} Ω`:`---`}var o={0:{nameTh:`ดำ`,nameEn:`Black`,hex:`#1e293b`},1:{nameTh:`น้ำตาล`,nameEn:`Brown`,hex:`#78350f`},2:{nameTh:`แดง`,nameEn:`Red`,hex:`#dc2626`},3:{nameTh:`ส้ม`,nameEn:`Orange`,hex:`#ea580c`},4:{nameTh:`เหลือง`,nameEn:`Yellow`,hex:`#eab308`},5:{nameTh:`เขียว`,nameEn:`Green`,hex:`#16a34a`},6:{nameTh:`น้ำเงิน`,nameEn:`Blue`,hex:`#2563eb`},7:{nameTh:`ม่วง`,nameEn:`Violet`,hex:`#9333ea`},8:{nameTh:`เทา`,nameEn:`Grey`,hex:`#64748b`},9:{nameTh:`ขาว`,nameEn:`White`,hex:`#f8fafc`}},s={0:{nameTh:`ดำ (×1)`,nameEn:`Black (×1)`,hex:`#1e293b`},1:{nameTh:`น้ำตาล (×10)`,nameEn:`Brown (×10)`,hex:`#78350f`},2:{nameTh:`แดง (×100)`,nameEn:`Red (×100)`,hex:`#dc2626`},3:{nameTh:`ส้ม (×1k)`,nameEn:`Orange (×1k)`,hex:`#ea580c`}},c={nameTh:`ทอง (±5%)`,nameEn:`Gold (±5%)`,hex:`#d97706`};function l(e){if(!Number.isFinite(e)||e<=0)return[o[0],o[0],s[0],c];let t=Math.round(e),n=String(t);if(t<10)return[o[0],o[t]||o[0],s[0],c];let r=parseInt(n[0],10)||0,i=parseInt(n[1],10)||0,a=Math.max(0,Math.min(3,n.length-2));return[o[r]||o[0],o[i]||o[0],s[a]||s[0],c]}function u(e){let{voltage:t,loadResistance:n,switchClosed:r,wireConnected:i}=e;if(!Number.isFinite(t)||t<0||!Number.isFinite(n)||n<=0)return{isValid:!1,isLoopClosed:!1,actualCurrent:NaN,loadVoltage:NaN,gapVoltage:NaN,loadPower:NaN,glowIntensity:0};if(!(r&&i))return{isValid:!0,isLoopClosed:!1,actualCurrent:0,loadVoltage:0,gapVoltage:t,loadPower:0,glowIntensity:0};let a=t/n;return{isValid:!0,isLoopClosed:!0,actualCurrent:a,loadVoltage:t,gapVoltage:0,loadPower:t*a,glowIntensity:Math.min(1,Math.max(.25,a/.025))}}var d={copper:{id:`copper`,category:`conductor`,resistanceOhms:.05,names:{th:`แผ่นทองแดง (Copper)`,en:`Copper Strip`},colorHex:`#d97706`},graphite:{id:`graphite`,category:`partial-conductor`,resistanceOhms:180,names:{th:`ไส้ดินสอกราไฟต์ (Graphite)`,en:`Pencil Graphite`},colorHex:`#475569`},plastic:{id:`plastic`,category:`insulator`,resistanceOhms:1/0,names:{th:`ไม้บรรทัดพลาสติก (Plastic)`,en:`Plastic Ruler`},colorHex:`#38bdf8`},wood:{id:`wood`,category:`insulator`,resistanceOhms:1/0,names:{th:`แท่งไม้แห้ง (Dry Wood)`,en:`Dry Wood Stick`},colorHex:`#a16207`},rubber:{id:`rubber`,category:`insulator`,resistanceOhms:1/0,names:{th:`ยางลบ (Rubber)`,en:`Rubber Eraser`},colorHex:`#f43f5e`}};function f(e){let{voltage:t,fixedResistance:n,forwardVoltage:r,materialId:i,power:a}=e,o=d[i];if(!o||!Number.isFinite(t)||t<0||!Number.isFinite(n)||n<=0)return{isValid:!1,material:o||d.copper,isConducting:!1,totalResistance:NaN,actualCurrent:NaN,sampleVoltageDrop:NaN,resistorVoltageDrop:NaN,ledVoltageDrop:NaN,glowIntensity:0};let s=n+o.resistanceOhms;if(!a||!Number.isFinite(s)||t<=r)return{isValid:!0,material:o,isConducting:!1,totalResistance:s,actualCurrent:0,sampleVoltageDrop:a&&!Number.isFinite(s)?t:0,resistorVoltageDrop:0,ledVoltageDrop:0,glowIntensity:0};let c=(t-r)/s,l=c*o.resistanceOhms,u=c*n,f=Math.min(1,Math.max(.2,c/.006));return{isValid:!0,material:o,isConducting:c>0,totalResistance:s,actualCurrent:c,sampleVoltageDrop:l,resistorVoltageDrop:u,ledVoltageDrop:r,glowIntensity:f}}function p(e){let{voltage:t,resistance:n,power:r}=e;if(!Number.isFinite(t)||t<0||!Number.isFinite(n)||n<=0)return{isValid:!1,actualCurrent:NaN,predictedCurrent:NaN,powerWatts:NaN,curvePoints:[]};let i=t/n,a=r?i:0,o=a*a*n,s=[];for(let e=0;e<=6;e+=1.5)s.push({v:e,iMilliAmps:e/n*1e3});return{isValid:!0,actualCurrent:a,predictedCurrent:i,powerWatts:o,curvePoints:s}}var m={red:{id:`red`,forwardVoltage:2,hex:`#ef4444`,names:{th:`LED สีแดง (Vf = 2.0 V)`,en:`Red LED (Vf = 2.0 V)`}},green:{id:`green`,forwardVoltage:2.2,hex:`#22c55e`,names:{th:`LED สีเขียว (Vf = 2.2 V)`,en:`Green LED (Vf = 2.2 V)`}},blue:{id:`blue`,forwardVoltage:3,hex:`#3b82f6`,names:{th:`LED สีน้ำเงิน (Vf = 3.0 V)`,en:`Blue LED (Vf = 3.0 V)`}}};function h(e,t,r,i,a){if(!Number.isFinite(t)||t<0||!Number.isFinite(r)||r<=0)return{isValid:!1,presetId:e,faultType:`none`,resistorCurrent:NaN,ledCurrent:NaN,ledLit:!1,glowIntensity:0,activeStrips:[]};if(e===`valid-series`){let o=n({voltage:t,forwardVoltage:i,resistance:r,power:a,polarity:`forward`});return{isValid:!0,presetId:e,faultType:`none`,resistorCurrent:o.actualCurrent,ledCurrent:o.actualCurrent,ledLit:o.actualCurrent>0,glowIntensity:o.glowIntensity,activeStrips:[`rail-plus`,`strip-top-5`,`strip-top-12`,`strip-top-16`,`rail-minus`]}}return e===`shorted-same-strip`?{isValid:!0,presetId:e,faultType:`led-shorted-by-strip`,resistorCurrent:a?t/r:0,ledCurrent:0,ledLit:!1,glowIntensity:0,activeStrips:[`rail-plus`,`strip-top-5`,`strip-top-12-shorted`,`rail-minus`]}:e===`open-center-gap`?{isValid:!0,presetId:e,faultType:`open-across-trench`,resistorCurrent:0,ledCurrent:0,ledLit:!1,glowIntensity:0,activeStrips:[`rail-plus`,`strip-top-5`,`strip-top-12`,`trench-gap-12`,`strip-bot-12`]}:{isValid:!0,presetId:e,faultType:`open-unconnected-strip`,resistorCurrent:0,ledCurrent:0,ledLit:!1,glowIntensity:0,activeStrips:[`rail-plus`,`strip-top-5`,`strip-top-12`,`strip-top-13-isolated`]}}var g=[{id:`capacitor-charging`,stage:`P3`,category:{th:`หมวดตัวเก็บประจุ (Capacitors)`,en:`Capacitors`},titles:{th:`การเก็บและคายประจุของตัวเก็บประจุ (RC Transient Model)`,en:`Capacitor Charging & Discharging (RC Transient Model)`}},{id:`transistor-switch`,stage:`P3`,category:{th:`หมวดทรานซิสเตอร์ (Transistors)`,en:`Transistors`},titles:{th:`ทรานซิสเตอร์ในฐานะสวิตช์และตัวขยาย (Cutoff / Active / Saturation)`,en:`NPN Transistor Switch & Regions`}},{id:`ldr-light-sensor`,stage:`P3`,category:{th:`หมวดเซนเซอร์ (Sensors)`,en:`Sensors`},titles:{th:`ตัวต้านทานไวแสงและวงจรแบ่งแรงดัน (LDR Sensor Threshold)`,en:`Light-Dependent Resistor (LDR) & Voltage Divider`}}],_=[{id:`open-closed-circuit`,order:1,category:`basics`,titles:{th:`1. วงจรเปิดและวงจรปิด (Open & Closed Circuits)`,en:`1. Open & Closed Circuits`},subtitles:{th:`สำรวจเส้นทางครบรอบของกระแสไฟฟ้าและความต่างศักย์เมื่อวงจรขาด`,en:`Explore complete current loops and terminal voltage across an open break`},objectives:{th:[`เปรียบเทียบเงื่อนไขของวงจรปิด (Closed Circuit) และวงจรเปิด (Open Circuit) ได้`,`อธิบายได้ว่าเหตุใดเมื่อสวิตช์เปิดหรือสายไฟหลุด กระแสจึงเป็นศูนย์แต่แรงดันแบตเตอรี่ยังคงอยู่`,`วัดและคำนวณกระแสไฟฟ้าในวงจรพื้นฐานเมื่อต่อครบรอบได้`],en:[`Distinguish between a complete closed circuit and an interrupted open circuit`,`Explain why zero current in an open circuit does not mean battery voltage is zero`,`Calculate steady-state loop current when all continuity paths are closed`]},initialCircuit:{voltage:3,forwardVoltage:0,resistance:150,power:!1,polarity:`forward`,wireConnected:!0},overviewContent:{th:`กระแสไฟฟ้าจะไหลอย่างต่อเนื่องได้ก็ต่อเมื่อมี **เส้นทางตัวนำที่เชื่อมต่อครบรอบ (Closed Loop)** จากขั้วบวกของแหล่งจ่าย ผ่านอุปกรณ์โหลด และวนกลับเข้าสู่ขั้วลบของแหล่งจ่ายโดยไม่มีจุดขาด

### วงจรปิด vs วงจรเปิด
* **วงจรปิด (Closed Circuit)**: สวิตช์ปิดเชื่อมถึงกันและสายไฟครบทุกเส้น กระแสไฟฟ้าไหลผ่านหลอดไฟและตัวต้านทานตามกฎ $I = V_s / R$
* **วงจรเปิด (Open Circuit)**: สวิตช์ถูกยกขึ้น หรือสายไฟเส้นใดเส้นหนึ่งหลุดออก ทำให้เส้นทางขาด กระแสไฟฟ้าในวงจรเป็นศูนย์ ($I = 0\\text{ mA}$) แต่ที่ขั้วแบตเตอรี่และจุดที่วงจรขาดยังคงมีความต่างศักย์ไฟฟ้าเท่ากับ $V_s$ ตกคร่อมอยู่`,en:`Electric current requires a **continuous closed conducting loop** from the positive supply terminal, through the load component, and back to the negative terminal.

### Closed vs. Open Circuit
* **Closed Circuit**: Both the switch and return wire form an unbroken loop. Current flows according to $I = V_s / R$.
* **Open Circuit**: Either the switch is open or a wire is disconnected. Current drops to zero ($I = 0\\text{ mA}$), while the full supply voltage $V_s$ appears across the open break.`},teacherNotes:{th:`1. ความเข้าใจคลาดเคลื่อนที่พบบ่อย: นักเรียนมักคิดว่าถ้าสายไฟขากลับ (ด้านขั้วลบ) หลุด กระแสจะยังไหลไปถึงหลอดไฟและทำให้หลอดสว่างได้ครึ่งหนึ่ง ให้ใช้การทดลองปลดสายไฟขากลับเพื่อพิสูจน์ว่ากระแสเป็น 0 mA ทันทีทั่วทั้งวงจรเดี่ยว
2. เน้นย้ำว่าเมื่อวงจรเปิด ($I = 0$) แบตเตอรี่ไม่ได้หมดไฟ แรงดัน $V_s$ ยังคงปรากฏตกคร่อมที่ช่องว่างของสวิตช์ที่เปิดอยู่`,en:`1. Common Misconception: Students often think current leaves the battery and lights the bulb before hitting a disconnected return wire. Use the Return Wire toggle to show that breaking the loop anywhere stops current everywhere in a series loop.
2. Highlight that zero current does not imply zero voltage across the open switch terminals.`},inquiry:{predictQuestion:{th:`หากเราสับสวิตช์ลง (ON) แต่สายไฟขากลับเข้าขั้วลบหลุดออก หลอดไฟและกระแสในวงจรจะเป็นอย่างไร?`,en:`If the switch is closed (ON) but the return wire to the negative terminal is disconnected, what happens to the lamp and current?`},predictOptions:{A:{th:`กระแสไหลไปถึงหลอดไฟได้ครึ่งทาง ทำให้หลอดสว่างหรี่ๆ`,en:`Current reaches the lamp halfway, making it glow dimly.`},B:{th:`ไม่มีกระแสไหลในวงจรเลย (0 mA) และหลอดไม่สว่าง เพราะวงจรไม่ครบรอบ`,en:`Zero current flows (0 mA) and the lamp stays off because the loop is incomplete.`},C:{th:`กระแสไหลเพิ่มขึ้นเพราะไม่มีสายไฟขากลับคอยต้าน`,en:`Current increases because the return wire is removed.`}},correctPrediction:`B`,experimentSteps:[{th:`กดปุ่มเปิดสวิตช์ไฟเมื่อสายไฟต่อครบ แล้วสังเกตค่ากระแสไฟฟ้า`,en:`Close the switch with the wire connected and observe the current`},{th:`ทดลองปลดสายไฟขากลับ (วงจรขาด) หรือเปิดสวิตช์ แล้วสังเกตค่ากระแสและแรงดันที่จุดขาด`,en:`Disconnect the return wire or open the switch and observe current and gap voltage`}],obsRowLabels:{row1:{th:`วงจรปิดครบรอบ (สวิตช์ปิด + สายไฟครบ)`,en:`Closed Loop (Switch ON + Wire Connected)`},row2:{th:`วงจรเปิด (สวิตช์เปิด หรือ สายไฟหลุด)`,en:`Open Loop (Switch OFF or Wire Disconnected)`}},transferQuestion:{th:`คำถามเชื่อมโยง: เมื่อสวิตช์เปิดอยู่ (วงจรเปิด กระแส 0 mA) ความต่างศักย์ตกคร่อมระหว่างขั้วของสวิตช์ที่เปิดอยู่มีค่าเท่าใด?`,en:`Transfer Question: When the switch is open (0 mA current), what is the voltage across the open switch contacts?`},transferOptions:{A:{th:`เท่ากับแรงดันแหล่งจ่าย (เช่น 3.00 V) เพราะศักย์ไฟฟ้าจากขั้วบวกและลบมารออยู่ที่ปลายทั้งสองด้านของจุดขาด`,en:`Equal to the supply voltage (e.g., 3.00 V) because the open gap holds the full potential difference.`},B:{th:`เป็น 0 V เสมอ เพราะเมื่อไม่มีกระแส แรงดันทุกจุดต้องหายไปทั้งหมด`,en:`Always 0 V because voltage vanishes whenever current is zero.`},C:{th:`มากกว่าแรงดันแบตเตอรี่ 10 เท่า`,en:`Ten times higher than the battery voltage.`}},correctTransfer:`A`,transferFeedbackCorrect:{th:`ถูกต้อง! แม้กระแสจะเป็นศูนย์ แต่ความต่างศักย์ของแหล่งจ่ายยังคงปรากฏตกคร่อมจุดที่วงจรเปิดอยู่`,en:`Correct! Even with zero current, the full supply potential difference appears across the open break.`},transferFeedbackRetry:{th:`ลองตรวจสอบดูใหม่: เมื่อไม่มีกระแสไหล แรงดันตกคร่อมตัวต้านทานเป็น 0 V ดังนั้นแรงดันแหล่งจ่ายจึงตกคร่อมที่ช่องว่างสวิตช์`,en:`Re-check: With zero current, the resistor drops 0 V, so the full source voltage appears across the open switch.`},explainPrompt:{th:`อธิบายด้วยคำพูดของคุณเอง: เหตุใดวงจรไฟฟ้าจึงต้องมีเส้นทางครบรอบตั้งแต่ขั้วบวกกลับมายังขั้วลบ?`,en:`Explain in your own words: Why must an electrical circuit form a complete loop from positive back to negative?`},teacherAnswerSummary:{th:`ขั้นที่ 1: ข้อ B (วงจรไม่ครบรอบ กระแสเป็น 0 mA) · ขั้นที่ 4: ข้อ A (แรงดันตกคร่อมจุดขาดเท่ากับ Vs = 3.00 V)`,en:`Step 1: Option B (incomplete loop yields 0 mA) · Step 4: Option A (open break holds full supply voltage Vs = 3.00 V)`}}},{id:`conductors-insulators`,order:2,category:`basics`,titles:{th:`2. ตัวนำไฟฟ้าและฉนวนไฟฟ้า (Conductors & Insulators)`,en:`2. Conductors & Insulators`},subtitles:{th:`ทดสอบวัสดุหลากหลายชนิดในวงจรเพื่อจำแนกตัวนำ ตัวนำกึ่งความต้านทาน และฉนวน`,en:`Test real-world materials in a series loop to classify conductors and insulators`},objectives:{th:[`จำแนกวัสดุตัวนำไฟฟ้า (ทองแดง, กราไฟต์) และฉนวนไฟฟ้า (พลาสติก, ไม้แห้ง, ยาง) จากผลการทดลองได้`,`เปรียบเทียบความแตกต่างของกระแสไฟฟ้าระหว่างตัวนำที่ดีมาก (ทองแดง) กับตัวนำที่มีความต้านทานสูงกว่า (ไส้ดินสอกราไฟต์) ได้`,`เชื่อมโยงการเลือกใช้วัสดุตัวนำและฉนวนกับความปลอดภัยในอุปกรณ์ไฟฟ้าจริงได้`],en:[`Classify conductors (copper, graphite) and insulators (plastic, dry wood, rubber) from circuit evidence`,`Compare current magnitude between a low-resistance metal (copper) and a higher-resistance conductor (pencil graphite)`,`Relate conductor cores and insulating jackets to electrical safety in real wires`]},initialCircuit:{voltage:3,forwardVoltage:2,resistance:220,power:!1,polarity:`forward`,materialId:`copper`},overviewContent:{th:`วัสดุแต่ละชนิดยอมให้ประจุไฟฟ้าเคลื่อนที่ผ่านได้ง่ายยากต่างกัน

### ประเภทของวัสดุในบทเรียนนี้
1. **ตัวนำไฟฟ้าที่ดี (Good Conductors)**: เช่น **ทองแดง ($R \\approx 0.05\\,\\Omega$)** มีอิเล็กตรอนอิสระจำนวนมาก ยอมให้กระแสไหลผ่านได้ดีเยี่ยม
2. **ตัวนำที่มีความต้านทาน (Resistive Conductors)**: เช่น **ไส้ดินสอกราไฟต์ ($R \\approx 180\\,\\Omega$)** นำไฟฟ้าได้แต่มีความต้านทานร่วมด้วย ทำให้กระแสรวมลดลงและหลอด LED สว่างน้อยกว่าทองแดง
3. **ฉนวนไฟฟ้า (Insulators)**: เช่น **พลาสติก ไม้แห้ง และยางลบ ($R \\to \\infty$)** กั้นไม่ให้กระแสไฟฟ้าไหลผ่านในระดับแรงดันต่ำนี้ ($I = 0\\text{ mA}$)`,en:`Different materials allow electric charge to move with vastly different ease.

### Material Categories in This Lab
1. **Good Conductors**: Such as **Copper ($R \\approx 0.05\\,\\Omega$)**, possessing abundant free electrons for minimal voltage loss.
2. **Resistive Conductors**: Such as **Pencil Graphite ($R \\approx 180\\,\\Omega$)**, which conducts current but adds noticeable series resistance, reducing circuit current.
3. **Insulators**: Such as **Plastic, Dry Wood, and Rubber ($R \\to \\infty$)**, which block current flow in this low-voltage circuit ($I = 0\\text{ mA}$).`},teacherNotes:{th:`1. ไส้ดินสอทำจากกราไฟต์ (คาร์บอน) ผสมดินเหนียว จึงนำไฟฟ้าได้แต่มีความต้านทานสูงกว่าโลหะอย่างชัดเจน เหมาะสำหรับให้นักเรียนเห็นว่า "ตัวนำไม่ได้นำไฟฟ้าเท่ากันทุกชนิด"
2. เชื่อมโยงกับสายไฟจริง: แกนในทำจากทองแดงเพื่อนำกระแส ส่วนเปลือกหุ้มทำจากพลาสติกพีวีซีเพื่อเป็นฉนวนป้องกันไฟดูดและป้องกันการลัดวงจร`,en:`1. Pencil "lead" is actually graphite (carbon) mixed with clay, making it a great classroom example showing that conductivity is a continuous spectrum rather than purely binary.
2. Connect to physical jumper wires: copper inner core for conduction, PVC outer jacket for insulation.`},inquiry:{predictQuestion:{th:`หากเรานำ "ไส้ดินสอกราไฟต์" และ "ไม้บรรทัดพลาสติก" มาหนีบในช่องทดสอบตามลำดับ ผลลัพธ์จะเป็นอย่างไรเมื่อเปิดไฟ?`,en:`If we clip "Pencil Graphite" and then a "Plastic Ruler" into the test gap with power ON, what will happen?`},predictOptions:{A:{th:`ทั้งไส้ดินสอและพลาสติกไม่นำไฟฟ้าทั้งคู่ เพราะไม่ใช่โลหะ`,en:`Neither conducts because neither is a metal.`},B:{th:`ไส้ดินสอกราไฟต์นำไฟฟ้าได้ (มีกระแสไหลและหลอดติด) ส่วนพลาสติกเป็นฉนวน (กระแส 0 mA)`,en:`Pencil graphite conducts (current flows and LED lights), whereas plastic is an insulator (0 mA).`},C:{th:`พลาสติกนำไฟฟ้าได้ดีกว่าทองแดง`,en:`Plastic conducts better than copper.`}},correctPrediction:`B`,experimentSteps:[{th:`เปิดสวิตช์ไฟแล้วเลือกวัสดุ "แผ่นทองแดง" และ "ไส้ดินสอกราไฟต์" เปรียบเทียบค่ากระแส`,en:`Turn Power ON and test "Copper Strip" and "Pencil Graphite" to compare current`},{th:`เปลี่ยนวัสดุเป็น "พลาสติก", "ไม้แห้ง" หรือ "ยางลบ" แล้วสังเกตค่ากระแส`,en:`Switch to "Plastic", "Dry Wood", or "Rubber" and observe the current`}],obsRowLabels:{row1:{th:`วัสดุตัวนำ (ทองแดง / กราไฟต์)`,en:`Conductive Sample (Copper / Graphite)`},row2:{th:`วัสดุฉนวน (พลาสติก / ไม้ / ยาง)`,en:`Insulating Sample (Plastic / Wood / Rubber)`}},transferQuestion:{th:`คำถามเชื่อมโยง: เหตุใดสายไฟที่ใช้ต่อวงจรจึงต้องมีแกนในเป็นทองแดงและหุ้มด้านนอกด้วยพลาสติก?`,en:`Transfer Question: Why are hookup wires built with a copper core wrapped in a plastic jacket?`},transferOptions:{A:{th:`ทองแดงทำหน้าที่เป็นตัวนำให้กระแสไหลผ่านได้ดี ส่วนพลาสติกเป็นฉนวนป้องกันการรั่วไหลหรือลัดวงจร`,en:`Copper provides a low-resistance path for current, while plastic insulates and prevents short circuits.`},B:{th:`พลาสติกช่วยนำกระแสไฟฟ้าแทนทองแดงเมื่อเปิดไฟแรงสูง`,en:`The plastic jacket carries the electric current instead of the copper.`},C:{th:`เพื่อเพิ่มความต้านทานของสายไฟให้สูงขึ้นเป็นอนันต์`,en:`To make the wire resistance infinite.`}},correctTransfer:`A`,transferFeedbackCorrect:{th:`ถูกต้อง! ทองแดงนำกระแสไฟฟ้าด้วยความต้านทานต่ำมาก ส่วนเปลือกพลาสติกเป็นฉนวนป้องกันไฟรั่วและการลัดวงจร`,en:`Correct! Copper conducts current with negligible resistance, while the plastic jacket insulates the wire.`},transferFeedbackRetry:{th:`ลองทบทวนสมบัติของทองแดง (ตัวนำ) และพลาสติก (ฉนวน) จากตารางผลการทดลองอีกครั้ง`,en:`Review your test results comparing copper (conductor) and plastic (insulator).`},explainPrompt:{th:`อธิบายเปรียบเทียบผลที่สังเกตได้ระหว่าง แผ่นทองแดง ไส้ดินสอกราไฟต์ และพลาสติก:`,en:`Compare and explain your observations for Copper, Pencil Graphite, and Plastic:`},teacherAnswerSummary:{th:`ขั้นที่ 1: ข้อ B (กราไฟต์นำไฟฟ้าได้ ~2.50 mA, พลาสติก 0 mA) · ขั้นที่ 4: ข้อ A (แกนทองแดงนำไฟฟ้า เปลือกพลาสติกเป็นฉนวน)`,en:`Step 1: Option B (graphite conducts ~2.50 mA, plastic 0 mA) · Step 4: Option A (copper core conducts, plastic insulates)`}}},{id:`ohms-law-resistor`,order:3,category:`resistors`,titles:{th:`3. กฎของโอห์มกับตัวต้านทาน (Ohm's Law with a Resistor)`,en:`3. Ohm's Law with a Resistor`},subtitles:{th:`ศึกษาความสัมพันธ์เชิงเส้นระหว่างแรงดัน (V) กระแส (I) และความต้านทาน (R) พร้อมแถบสีตัวต้านทาน`,en:`Investigate the linear relationship I = V / R and read EIA 4-band resistor color codes`},objectives:{th:[`คำนวณหากระแสไฟฟ้าจากสมการกฎของโอห์ม $I = V / R$ ได้อย่างแม่นยำ`,`อธิบายแนวโน้มการเปลี่ยนแปลงของกระแสเมื่อเพิ่มแรงดัน หรือเมื่อเพิ่มความต้านทานได้`,`อ่านค่าแถบสี 4 แถบของตัวต้านทานมาตรฐานที่ใช้ในห้องเรียนได้`],en:[`Calculate circuit current accurately using Ohm's Law ($I = V / R$)`,`Describe how current changes when voltage increases or when resistance increases`,`Read standard 4-band resistor color codes corresponding to classroom resistor values`]},initialCircuit:{voltage:3,forwardVoltage:0,resistance:300,power:!1,polarity:`forward`},overviewContent:{th:`**กฎของโอห์ม (Ohm's Law)** ระบุว่า กระแสไฟฟ้า ($I$) ที่ไหลผ่านตัวต้านทานแปรผันตรงกับความต่างศักย์ไฟฟ้า ($V$) และแปรผกผันกับความต้านทาน ($R$):

$$I = \\frac{V}{R}$$

### สมบัติสำคัญของตัวต้านทาน
* **ไม่มีขั้ว (Non-polarized)**: ตัวต้านทานนำกระแสได้เท่ากันทั้งสองทิศทาง ไม่ว่าจะหันด้านใด
* **การอ่านแถบสี 4 แถบ**: แถบที่ 1 และ 2 คือตัวเลขหลักที่หนึ่งและสอง แถบที่ 3 คือตัวคูณ ($10^n$) และแถบที่ 4 (สีทอง) คือค่าความคลาดเคลื่อน $\\pm 5\\%$`,en:`**Ohm's Law** states that the current ($I$) through an ohmic resistor is directly proportional to the applied voltage ($V$) and inversely proportional to resistance ($R$):

$$I = \\frac{V}{R}$$

### Key Resistor Properties
* **Bidirectional (Non-polarized)**: A resistor conducts identically regardless of which way its leads are oriented.
* **4-Band Color Code**: Band 1 and Band 2 represent the first two digits, Band 3 is the decimal multiplier, and Band 4 (Gold) indicates $\\pm 5\\%$ tolerance.`},teacherNotes:{th:`1. ให้นักเรียนสังเกตกราฟ $I\\text{–}V$ และแถบสีบนตัวต้านทานที่จะเปลี่ยนสีตามค่าโอห์มจริงทันทีที่เลื่อนสไลเดอร์
2. ชี้ให้เห็นว่าเมื่อ $V$ คงที่ การเพิ่ม $R$ เป็น 2 เท่า จะทำให้กระแส $I$ ลดลงเหลือครึ่งหนึ่ง`,en:`1. Have students observe both the live $I\\text{–}V$ plot and the realistic 4-band color rings updating dynamically as resistance changes.
2. Emphasize inverse proportionality: doubling $R$ at constant $V$ halves the current $I$.`},inquiry:{predictQuestion:{th:`ที่แรงดันคงที่ 3.00 V หากเราเปลี่ยนตัวต้านทานจาก 300 Ω เป็น 600 Ω (เพิ่มขึ้น 2 เท่า) กระแสไฟฟ้าในวงจรจะเปลี่ยนไปอย่างไร?`,en:`At a constant 3.00 V supply, if resistance is doubled from 300 Ω to 600 Ω, how will the current change?`},predictOptions:{A:{th:`กระแสไฟฟ้าเพิ่มขึ้นเป็น 2 เท่า (จาก 10 mA เป็น 20 mA)`,en:`Current doubles (from 10 mA to 20 mA).`},B:{th:`กระแสไฟฟ้าลดลงเหลือครึ่งหนึ่ง (จาก 10.00 mA เหลือ 5.00 mA)`,en:`Current is halved (from 10.00 mA to 5.00 mA).`},C:{th:`กระแสไฟฟ้าเท่าเดิมที่ 10.00 mA`,en:`Current stays unchanged at 10.00 mA.`}},correctPrediction:`B`,experimentSteps:[{th:`เปิดสวิตช์ไฟที่ 3.00 V, 300 Ω แล้วสังเกตค่ากระแสเริ่มต้น (10.00 mA)`,en:`Turn Power ON at 3.00 V, 300 Ω and observe initial current (10.00 mA)`},{th:`เลื่อนปรับค่าตัวต้านทานหรือแรงดัน แล้วสังเกตการเปลี่ยนค่ากระแสและแถบสีตัวต้านทาน`,en:`Adjust resistance or voltage and observe current and resistor color bands`}],obsRowLabels:{row1:{th:`ค่าเริ่มต้น (เช่น 3.0 V, 300 Ω)`,en:`Baseline Setting (e.g., 3.0 V, 300 Ω)`},row2:{th:`หลังปรับเปลี่ยนค่า (V หรือ R ใหม่)`,en:`Adjusted Setting (New V or R)`}},transferQuestion:{th:`คำถามเชื่อมโยง: หากต้องการให้มีกระแสไหล 15.00 mA เมื่อใช้แหล่งจ่าย 4.50 V จะต้องใช้ตัวต้านทานกี่โอห์ม?`,en:`Transfer Question: To obtain a current of 15.00 mA from a 4.50 V supply, what resistance value is required?`},transferOptions:{A:{th:`300 Ω (เพราะ R = V / I = 4.50 V / 0.015 A = 300 Ω)`,en:`300 Ω (because R = V / I = 4.50 V / 0.015 A = 300 Ω)`},B:{th:`100 Ω`,en:`100 Ω`},C:{th:`900 Ω`,en:`900 Ω`}},correctTransfer:`A`,transferFeedbackCorrect:{th:`ถูกต้อง! จาก R = V / I = 4.50 / 0.015 = 300 Ω (แถบสี ส้ม-ดำ-น้ำตาล-ทอง)`,en:`Correct! From R = V / I = 4.50 / 0.015 = 300 Ω (Orange-Black-Brown-Gold).`},transferFeedbackRetry:{th:`ลองใช้สมการ R = V / I โดยแทน V = 4.50 V และ I = 0.015 A`,en:`Use R = V / I with V = 4.50 V and I = 0.015 A.`},explainPrompt:{th:`สรุปความสัมพันธ์ระหว่างแรงดัน (V) ความต้านทาน (R) และกระแสไฟฟ้า (I) จากการทดลอง:`,en:`Summarize how voltage (V) and resistance (R) affect current (I) based on your measurements:`},teacherAnswerSummary:{th:`ขั้นที่ 1: ข้อ B (เพิ่ม R เป็น 2 เท่า กระแสลดลงครึ่งหนึ่งเหลือ 5.00 mA) · ขั้นที่ 4: ข้อ A (R = 4.5 V / 0.015 A = 300 Ω)`,en:`Step 1: Option B (doubling R halves current to 5.00 mA) · Step 4: Option A (R = 4.5 V / 0.015 A = 300 Ω)`}}},{id:`led-polarity`,order:4,category:`leds`,titles:{th:`4. ขั้วของหลอด LED (LED Polarity)`,en:`4. LED Polarity`},subtitles:{th:`เรียนรู้ทิศทางการนำกระแสของไดโอดเปล่งแสงและขั้วแอโนด–แคโทด`,en:`Learn how light-emitting diodes conduct current in one direction only`},objectives:{th:[`ระบุขั้วแอโนด (+) และแคโทด (−) จากสัญลักษณ์วงจร รอยบากแบนที่ขอบหลอด โครงโลหะภายใน และความยาวขาได้`,`อธิบายผลของการต่อแบบไบแอสตรง (Forward Bias) และไบแอสกลับ (Reverse Bias) ต่อกระแสไฟฟ้าได้`,`คำนวณหากระแสไฟฟ้าและแรงดันตกคร่อมด้วยกฎแรงดันของเคอร์ชอฟฟ์ (KVL) และกฎของโอห์มได้`],en:[`Identify the Anode (+) and Cathode (−) by schematic symbol, flat housing edge, internal anvil/post, and lead length`,`Explain the effect of forward bias and reverse bias on circuit current flow`,`Calculate circuit current and voltage drops using Kirchhoff's Voltage Law (KVL) and Ohm's Law`]},initialCircuit:{voltage:3,forwardVoltage:2,resistance:220,power:!1,polarity:`forward`},overviewContent:{th:`หลอด LED (Light Emitting Diode) เป็นอุปกรณ์สารกึ่งตัวนำประเภทไดโอด ยอมให้กระแสไฟฟ้าไหลผ่านได้ในทิศทางเดียวจากขั้วแอโนดไปยังแคโทด เปรียบเสมือนวาล์วทางเดียวทางไฟฟ้า

### การสังเกตขั้วของ LED จากโครงสร้างจริง
* **แอโนด (Anode / +)**: ขั้วบวก โครงโลหะภายในชิ้นเล็ก (Post) และในหลอดใหม่ที่ยังไม่ตัดขาจะมี **ขายาวกว่า**
* **แคโทด (Cathode / −)**: ขั้วลบ มี **รอยบากแบน (Flat Edge)** ที่ขอบพลาสติกฐานหลอด โครงโลหะภายในเป็นถ้วยสะท้อนแสงชิ้นใหญ่ (Anvil) และมีขาสั้นกว่า

### การทำงานในวงจร
1. **ต่อถูกขั้ว / ไบแอสตรง (Forward Bias)**: ต่อขั้วบวกเข้าแอโนด (+) และขั้วลบเข้าแคโทด (−) ผ่านตัวต้านทานจำกัดกระแส เมื่อ $V_s > V_f$ กระแสจะไหลครบวงจรและหลอดเปล่งแสง
2. **ต่อกลับขั้ว / ไบแอสกลับ (Reverse Bias)**: หันแคโทดเข้าด้านขั้วบวก ไดโอดจะกั้นกระแสไว้ ทำให้กระแสในแบบจำลองแรงดันต่ำนี้เป็นศูนย์และหลอดไม่สว่าง`,en:`An LED (Light Emitting Diode) is a semiconductor diode that allows conventional current to flow in one direction only—from Anode to Cathode—acting like an electrical one-way check valve.

### Physical LED Terminal Identification
* **Anode (+)**: Positive terminal with the smaller internal post and (on untrimmed leads) the **longer leg**.
* **Cathode (−)**: Negative terminal marked by the **flat edge notch** on the plastic flange, the larger internal anvil reflector cup, and the shorter leg.

### Circuit Behavior
1. **Forward Bias**: Anode (+) toward positive supply, Cathode (−) toward negative through a resistor. When $V_s > V_f$, current conducts and light is emitted.
2. **Reverse Bias**: Connected backward. The diode blocks conduction in this low-voltage model ($I \\approx 0\\text{ mA}$), keeping the LED dark.`},teacherNotes:{th:`1. ความเข้าใจคลาดเคลื่อนที่พบบ่อย: นักเรียนมักคิดว่า LED เหมือนหลอดไฟไส้ที่สลับขั้วแล้วยังสว่าง หรือคิดว่าเมื่อปิดสวิตช์แล้วแรงดันทุกจุดเป็นศูนย์ทั้งหมด
2. การระบุขั้วอุปกรณ์จริง: ย้ำให้นักเรียนสังเกต "รอยบากแบนที่ขอบหลอด" และ "ถ้วยสะท้อนแสง Anvil ด้านแคโทด" ควบคู่กับความยาวขา`,en:`1. Common Misconceptions: Students often assume LEDs behave like symmetric incandescent lamps, or believe that opening a switch removes voltage from the battery terminals.
2. Physical Identification: Emphasize checking the flat rim notch and internal anvil cup rather than relying solely on lead length.`},inquiry:{predictQuestion:{th:`ก่อนเปิดไฟทดลอง คุณคิดว่าถ้าเรากลับขั้วหลอด LED (หันขายาวไปทางขั้วลบ) แล้วเปิดสวิตช์ จะเกิดอะไรขึ้น?`,en:`Before turning power on: what do you predict will happen if the LED is reversed (long leg toward minus) when the switch is closed?`},predictOptions:{A:{th:`หลอด LED สว่างตามปกติ เพราะวงจรยังคงเชื่อมต่อครบรอบ`,en:`The LED lights up normally because the loop is still connected.`},B:{th:`หลอด LED ไม่สว่าง เพราะไดโอดยอมให้กระแสไหลผ่านได้ทิศทางเดียว`,en:`The LED stays off because a diode conducts current in one direction only.`},C:{th:`หลอด LED สว่างขึ้นเป็นสองเท่า`,en:`The LED shines twice as brightly.`}},correctPrediction:`B`,experimentSteps:[{th:`เปิดสวิตช์ไฟเพื่อให้วงจรทำงานและสังเกตผลเมื่อต่อถูกขั้ว (ขายาวเข้าบวก)`,en:`Turn Power ON and observe Forward Bias (Anode + toward positive)`},{th:`กดสลับขั้ว LED เป็นต่อกลับขั้ว (ขายาวเข้าลบ) แล้วสังเกตกระแสและหลอด LED`,en:`Flip LED to Reverse Bias (Anode + toward negative) and observe current and LED`}],obsRowLabels:{row1:{th:`ต่อถูกขั้ว (ไบแอสตรง)`,en:`Forward Bias`},row2:{th:`ต่อกลับขั้ว (ไบแอสกลับ)`,en:`Reverse Bias`}},transferQuestion:{th:`คำถามเชื่อมโยง: เพราะเหตุใดตัวต้านทานหรือหลอดไฟไส้จึงต่อสลับขั้วแล้วยังนำกระแสได้ แต่หลอด LED จึงนำกระแสได้เพียงทิศทางเดียว?`,en:`Transfer Question: Why does a standard resistor or filament lamp conduct in either orientation, whereas an LED conducts in only one direction?`},transferOptions:{A:{th:`เพราะตัวต้านทานและหลอดไส้เป็นตัวนำที่ยอมให้กระแสไหลได้สองทิศทาง ส่วน LED เป็นไดโอดสารกึ่งตัวนำที่กั้นกระแสย้อนกลับ`,en:`A resistor conducts bidirectionally, whereas an LED is a semiconductor diode that blocks reverse current.`},B:{th:`เพราะตัวต้านทานสามารถผลิตแรงดันไฟฟ้าเองได้เมื่อกลับขั้ว`,en:`A resistor generates its own voltage when flipped.`},C:{th:`เพราะหลอด LED ไม่มีขาโลหะเชื่อมต่อกับวงจร`,en:`An LED has no electrical terminals.`}},correctTransfer:`A`,transferFeedbackCorrect:{th:`ถูกต้อง! ไดโอดเปล่งแสง (LED) มีรอยต่อสารกึ่งตัวนำที่นำกระแสเมื่อไบแอสตรงและกั้นกระแสเมื่อไบแอสกลับ ต่างจากตัวต้านทานที่นำกระแสได้ทั้งสองทิศทาง`,en:`Correct! An LED is a P-N junction diode that conducts under forward bias and blocks conduction under reverse bias, unlike a bidirectional resistor.`},transferFeedbackRetry:{th:`ยังไม่ตรงหลักการ ลองเปรียบเทียบสมบัติการนำกระแสทิศทางเดียวของไดโอดกับตัวต้านทานอีกครั้ง`,en:`Not quite. Compare the one-way conduction property of a diode with a symmetric resistor.`},explainPrompt:{th:`สรุปคำอธิบายของคุณเอง (สำหรับครูตรวจทาน): เชื่อมโยงทิศทางการต่อขั้วของ LED กับค่ากระแสไฟฟ้าและแสงที่สังเกตได้`,en:`Write your explanation (for teacher review): Connect LED terminal orientation to the observed current and light.`},teacherAnswerSummary:{th:`ขั้นที่ 1: ข้อ B (ไบแอสกลับกั้นกระแส I ≈ 0 mA) · ขั้นที่ 4: ข้อ A (LED เป็นไดโอดนำกระแสทางเดียว ต่างจากตัวต้านทาน)`,en:`Step 1: Option B (reverse bias blocks conduction I ≈ 0 mA) · Step 4: Option A (LED is a one-way diode unlike a symmetric resistor)`}}},{id:`current-limiting-resistor`,order:5,category:`leds`,titles:{th:`5. ตัวต้านทานจำกัดกระแส (Current-Limiting Resistor)`,en:`5. Current-Limiting Resistor`},subtitles:{th:`เลือกค่าตัวต้านทานที่เหมาะสมเพื่อควบคุมกระแส LED ให้อยู่ในเกณฑ์ปลอดภัย`,en:`Select the right series resistor to keep LED current within safe classroom limits`},objectives:{th:[`อธิบายหน้าที่ของตัวต้านทานอนุกรมในการจำกัดกระแสไม่ให้เกินพิกัดของหลอด LED ได้`,`คำนวณหาค่าความต้านทานที่เหมาะสมจาก $R = (V_s - V_f) / I$ เมื่อกำหนดแรงดันแหล่งจ่ายและสีของ LED ได้`,`ระบุสภาวะกระแสเกินเกณฑ์เตือนของแบบจำลอง (> 20 mA) เมื่อใช้ความต้านทานต่ำเกินไปได้`],en:[`Explain why a series resistor is essential to prevent LED overcurrent`,`Calculate an appropriate resistor value using $R = (V_s - V_f) / I$ for a given supply and LED forward voltage`,`Identify model overcurrent conditions (> 20 mA) when series resistance is too small`]},initialCircuit:{voltage:4.5,forwardVoltage:2,resistance:470,power:!1,polarity:`forward`,ledColor:`red`},overviewContent:{th:`เมื่อแรงดันแหล่งจ่าย ($V_s$) สูงกว่าแรงดันตกคร่อมของหลอด LED ($V_f$) แรงดันส่วนที่เกิน ($V_R = V_s - V_f$) จะต้องตกคร่อมที่ **ตัวต้านทานจำกัดกระแส**

$$I = \\frac{V_s - V_f}{R}$$

### เกณฑ์กระแสสำหรับการเรียนรู้ในห้องเรียน
* **ค่าเริ่มต้นสำหรับแหล่งจ่าย 4.5 V**: ใช้ตัวต้านทาน **$470\\,\\Omega$** (เหลือง-ม่วง-น้ำตาล-ทอง) ให้กระแสปลอดภัยประมาณ $5.32\\text{ mA}$
* **เป้าหมายความสว่างในชั้นเรียน**: ประมาณ **$10\\text{ mA}$** (เช่น $4.5\\text{ V}, 220\\,\\Omega \\to 11.36\\text{ mA}$)
* **เกณฑ์เตือนกระแสเกินในแบบจำลอง**: เกิน **$20\\text{ mA}$** (เช่น $4.5\\text{ V}, 100\\,\\Omega \\to 25.00\\text{ mA}$) ซึ่งเสี่ยงทำให้หลอด LED จริงร้อนจัดและเสียหายได้`,en:`Whenever the supply voltage ($V_s$) exceeds the LED forward voltage ($V_f$), the remaining voltage ($V_R = V_s - V_f$) drops across the **series current-limiting resistor**:

$$I = \\frac{V_s - V_f}{R}$$

### Classroom Current Benchmarks
* **4.5 V Default Profile**: A **$470\\,\\Omega$** resistor (Yellow-Violet-Brown-Gold) limits current to a safe $5.32\\text{ mA}$.
* **Classroom Target**: Around **$10\\text{ mA}$** (e.g., $4.5\\text{ V}, 220\\,\\Omega \\to 11.36\\text{ mA}$).
* **Model Overcurrent Warning**: Above **$20\\text{ mA}$** (e.g., $4.5\\text{ V}, 100\\,\\Omega \\to 25.00\\text{ mA}$), which risks damaging a physical LED.`},teacherNotes:{th:`1. ย้ำว่าเกณฑ์เป้าหมาย 10 mA และเกณฑ์เตือน 20 mA เป็นค่ามาตรฐานเพื่อการฝึกในชั้นเรียน หากใช้งานอุปกรณ์จริงต้องเปิดดู Datasheet ของรุ่นนั้นเสมอ
2. ให้นักเรียนทดลองลดตัวต้านทานลงเหลือ 100 Ω ที่แหล่งจ่าย 4.5 V เพื่อสังเกตการแจ้งเตือนกระแสเกิน (25.00 mA)`,en:`1. Note that 10 mA target and 20 mA warning are conservative classroom model thresholds; real hardware designs must consult the component datasheet.
2. Have students test 4.5 V with 100 Ω (25.00 mA) vs 470 Ω (5.32 mA) to see how the resistor protects the LED.`},inquiry:{predictQuestion:{th:`เมื่อใช้แหล่งจ่าย 4.50 V กับ LED สีแดง (Vf = 2.00 V) หากเปลี่ยนตัวต้านทานจาก 470 Ω ลดลงเหลือ 100 Ω จะเกิดอะไรขึ้น?`,en:`With a 4.50 V supply and a Red LED (Vf = 2.00 V), what happens if the resistor is reduced from 470 Ω to 100 Ω?`},predictOptions:{A:{th:`กระแสจะลดลงและหลอด LED มืดลง`,en:`Current decreases and the LED dims.`},B:{th:`กระแสจะพุ่งสูงขึ้นเป็น 25.00 mA ซึ่งเกินเกณฑ์เตือน 20 mA ของแบบจำลอง`,en:`Current rises to 25.00 mA, exceeding the 20 mA model overcurrent warning threshold.`},C:{th:`แรงดันตกคร่อมตัวต้านทานกลายเป็น 0 V`,en:`Resistor voltage drop becomes 0 V.`}},correctPrediction:`B`,experimentSteps:[{th:`เปิดสวิตช์ที่ค่าเริ่มต้น 4.50 V, 470 Ω สังเกตกระแสที่ปลอดภัย (5.32 mA)`,en:`Turn Power ON at default 4.50 V, 470 Ω and observe safe current (5.32 mA)`},{th:`ลดความต้านทานลงมาที่ 100 Ω แล้วสังเกตค่ากระแส (25.00 mA) และคำเตือนกระแสเกิน`,en:`Reduce resistance to 100 Ω and observe current (25.00 mA) and overcurrent warning`}],obsRowLabels:{row1:{th:`ตัวต้านทานค่าปลอดภัย (เช่น 470 Ω หรือ 220 Ω)`,en:`Safe Resistor (e.g., 470 Ω or 220 Ω)`},row2:{th:`ตัวต้านทานต่ำเกินไป (100 Ω ที่ 4.5 V)`,en:`Low Resistor / Overcurrent (100 Ω at 4.5 V)`}},transferQuestion:{th:`คำถามเชื่อมโยง: หากใช้แบตเตอรี่ 4.50 V กับ LED สีแดง (Vf = 2.00 V) และต้องการจำกัดกระแสไม่ให้เกิน 12 mA ควรเลือกตัวต้านทานมาตรฐานค่าใดระหว่าง 100 Ω กับ 220 Ω?`,en:`Transfer Question: With a 4.50 V battery and Red LED (Vf = 2.00 V), which resistor keeps current below 12 mA: 100 Ω or 220 Ω?`},transferOptions:{A:{th:`เลือก 220 Ω เพราะให้กระแส (4.5 − 2.0) / 220 ≈ 11.36 mA ซึ่งอยู่ในช่วงปลอดภัย`,en:`Choose 220 Ω because (4.5 − 2.0) / 220 ≈ 11.36 mA, which stays safely below 12 mA.`},B:{th:`เลือก 100 Ω เพราะให้กระแส 25.00 mA`,en:`Choose 100 Ω because it gives 25.00 mA.`},C:{th:`ไม่ต้องใส่ตัวต้านทานเลย`,en:`Use no resistor at all.`}},correctTransfer:`A`,transferFeedbackCorrect:{th:`ถูกต้อง! ตัวต้านทาน 220 Ω จำกัดกระแสไว้ที่ 11.36 mA ในขณะที่ 100 Ω ทำให้กระแสสูงถึง 25.00 mA`,en:`Correct! A 220 Ω resistor limits current to 11.36 mA, whereas 100 Ω allows 25.00 mA.`},transferFeedbackRetry:{th:`ลองคำนวณ I = (4.5 − 2.0) / R สำหรับแต่ละค่าเพื่อหาค่าที่กระแสไม่เกิน 12 mA`,en:`Calculate I = (4.5 − 2.0) / R for each option to see which keeps current under 12 mA.`},explainPrompt:{th:`อธิบายเหตุผลว่าทำไมเราจึงไม่ควรต่อหลอด LED เข้ากับแบตเตอรี่ 4.5 V โดยตรงโดยไม่มีตัวต้านทาน:`,en:`Explain why we should not connect a 2.0 V LED directly across a 4.5 V battery without a resistor:`},teacherAnswerSummary:{th:`ขั้นที่ 1: ข้อ B (100 Ω ที่ 4.5 V ให้กระแส 25.00 mA เกินเกณฑ์ 20 mA) · ขั้นที่ 4: ข้อ A (220 Ω ให้กระแส 11.36 mA)`,en:`Step 1: Option B (100 Ω at 4.5 V yields 25.00 mA overcurrent) · Step 4: Option A (220 Ω yields 11.36 mA)`}}},{id:`breadboard-connectivity`,order:6,category:`basics`,titles:{th:`6. การต่อวงจรบนเบรดบอร์ด (Breadboard Connectivity)`,en:`6. Breadboard Connectivity`},subtitles:{th:`ทำความเข้าใจแถบโลหะนำไฟฟ้าภายในเบรดบอร์ด ร่องกลางแยกฝั่ง และการต่อวงจรไม่ให้ลัดวงจร`,en:`Master internal breadboard spring strips, the center IC trench gap, and valid series placement`},objectives:{th:[`อธิบายทิศทางการเชื่อมต่อของแถบโลหะใต้รูเบรดบอร์ด (แถบแนวตั้ง 5 รู A–E, F–J และรางไฟแนวนอน +/−) ได้`,`วิเคราะห์สาเหตุที่วงจรไม่ทำงานเมื่อเสียบขาอุปกรณ์ลงในแถบเดียวกัน (ลัดวงจรขา) หรือข้ามร่องกลางโดยไม่เชื่อมสายได้`,`เชื่อมโยงจุดต่อบนเบรดบอร์ดเข้ากับแผนภาพวงจรไฟฟ้า (Electrical Nets) ที่สมมูลกันได้`],en:[`Describe internal breadboard conductor layout (5-hole vertical terminal strips A–E, F–J and horizontal power rails)`,`Diagnose why plugging both LED leads into the same 5-hole strip shorts the LED or why crossing the center trench opens the loop`,`Map physical breadboard hole coordinates to their equivalent schematic electrical nets`]},initialCircuit:{voltage:3,forwardVoltage:2,resistance:220,power:!1,polarity:`forward`,breadboardPreset:`valid-series`},overviewContent:{th:`**เบรดบอร์ด (Solderless Breadboard)** ช่วยให้เราประกอบวงจรอิเล็กทรอนิกส์ได้โดยไม่ต้องบัดกรี โดยมีคลิปโลหะสปริงซ่อนอยู่ใต้รูพลาสติก

### โครงสร้างการเชื่อมต่อภายในเบรดบอร์ด
1. **รางจ่ายไฟด้านบนและล่าง (Power Rails + / −)**: เชื่อมต่อกันใน **แนวนอน** ตลอดแถวสีแดง (+) และสีน้ำเงิน (−)
2. **แถบต่ออุปกรณ์ (Terminal Strips A–E และ F–J)**: รูทั้ง 5 รูในคอลัมน์แนวตั้งเดียวกัน (เช่น **A12, B12, C12, D12, E12**) เชื่อมถึงกันด้วยแถบโลหะชิ้นเดียว
3. **ร่องกลาง (Center Trench Gap)**: แยกฝั่งบน (**A–E**) ออกจากฝั่งล่าง (**F–J**) อย่างเด็ดขาด ไม่เชื่อมถึงกัน

### ข้อผิดพลาดที่พบบ่อยในการเสียบอุปกรณ์
* **เสียบขา LED ทั้ง 2 ขาในคอลัมน์เดียวกัน (เช่น C12 กับ D12)**: แถบโลหะคอลัมน์ 12 จะลัดวงจรขาแอโนดและแคโทดเข้าด้วยกัน ทำให้กระแสไหลอ้อมผ่านแถบโลหะใต้บอร์ดแทนที่จะไหลผ่านหลอด LED!
* **เสียบข้ามร่องกลางโดยไม่มีสายเชื่อม (เช่น E12 กับ F12)**: วงจรขาดเพราะร่องกลางแยกแถบโลหะออกจากกัน`,en:`A **Solderless Breadboard** allows rapid circuit prototyping using hidden nickel-silver spring clips beneath the grid of holes.

### Internal Conductor Architecture
1. **Horizontal Power Rails (+ / −)**: Run horizontally along the top and bottom edges (marked by red $+$ and blue $-$ lines).
2. **5-Hole Vertical Terminal Strips (A–E and F–J)**: All 5 holes in a single vertical column on one side of the trench (e.g., **A12, B12, C12, D12, E12**) share a single metal clip (one electrical node/net).
3. **Center Trench Gap**: Electrically isolates the top rows (**A–E**) from the bottom rows (**F–J**).

### Classic Breadboard Wiring Mistakes
* **Same-Strip Short (e.g., LED in C12 and D12)**: Because C12 and D12 are on the same metal strip, the strip shorts the LED terminals together. Current bypasses the LED completely!
* **Unbridged Center Gap (e.g., E12 to F12)**: Leaves an open break across the center trench.`},teacherNotes:{th:`1. บทเรียนนี้แก้ปัญหาที่พบบ่อยที่สุดในชั้นเรียนปฏิบัติการจริง คือ นักเรียนเสียบขาตัวต้านทานหรือขา LED ทั้งสองขาลงในแถบ 5 รูเดียวกัน หรือเสียบขาคลาดกัน 1 คอลัมน์ (เช่น B12 กับ C13)
2. ให้สลับดูทั้ง 4 รูปแบบการเสียบบนเบรดบอร์ด (Presets) แล้วสังเกตการไฮไลต์แถบโลหะใต้รูเบรดบอร์ดทั้งในมุมมอง 2D และ 3D`,en:`1. This lesson directly addresses the #1 hands-on classroom debugging issue: students plugging both leads of a component into the same 5-hole vertical strip or missing the shared column by one hole (B12 vs C13).
2. Have students cycle through all 4 wiring presets and inspect the highlighted internal copper strips in both 2D and 3D.`},inquiry:{predictQuestion:{th:`หากนักเรียนเสียบขาแอโนดของ LED ลงในรู C12 และเสียบขาแคโทดลงในรู D12 (คอลัมน์ 12 ฝั่งเดียวกัน) เมื่อเปิดไฟจะเกิดอะไรขึ้น?`,en:`If a student plugs the LED Anode into hole C12 and Cathode into hole D12 (same vertical column 12 strip), what happens when power is turned on?`},predictOptions:{A:{th:`หลอด LED สว่างปกติ เพราะทั้งสองขาเสียบอยู่ในแถบโลหะเดียวกัน`,en:`The LED lights up normally because both leads share the same metal strip.`},B:{th:`หลอด LED ไม่สว่าง เพราะแถบโลหะคอลัมน์ 12 ลัดวงจรขาทั้งสองของ LED เข้าด้วยกัน กระแสจึงไหลผ่านแถบโลหะใต้บอร์ดแทน`,en:`The LED stays dark because column 12's metal strip shorts both LED leads together, bypassing the LED.`},C:{th:`เบรดบอร์ดจะเพิ่มแรงดันเป็นสองเท่า`,en:`The breadboard doubles the battery voltage.`}},correctPrediction:`B`,experimentSteps:[{th:`เปิดสวิตช์ในรูปแบบที่ 1 "ต่ออนุกรมถูกต้อง (B12 เชื่อม C12 คนละขาไป C16)" สังเกตแถบโลหะและหลอด LED`,en:`Turn Power ON with Preset 1 "Valid Series (B12 to C12, LED to C16)" and observe strips and LED`},{th:`สลับเป็นรูปแบบที่ 2 "ลัดวงจรในแถวเดียว (C12-D12)" และรูปแบบที่ 3 "ข้ามร่องกลาง (E12-F12)" เพื่อเปรียบเทียบ`,en:`Switch to Preset 2 "Same-Strip Short (C12-D12)" and Preset 3 "Across Center Gap (E12-F12)"`}],obsRowLabels:{row1:{th:`ต่อถูกแถบ (ขาเข้า C12, ขาออก C16)`,en:`Valid Series Strips (C12 to C16)`},row2:{th:`ต่อผิดแถบ (ลัดวงจร C12-D12 หรือ ข้ามร่องกลาง)`,en:`Faulty Strip Placement (Same-Strip or Gap)`}},transferQuestion:{th:`คำถามเชื่อมโยง: ถ้าขาขวาของตัวต้านทานเสียบอยู่ที่รู B12 เราควรเสียบขาแอโนดของ LED ที่รูใดเพื่อให้เชื่อมถึงตัวต้านทานโดยไม่ลัดวงจรกับขาแคโทด (ซึ่งอยู่ที่ C16)?`,en:`Transfer Question: If the resistor's right lead is in hole B12, where should the LED Anode be plugged so it connects to the resistor while its Cathode is in C16?`},transferOptions:{A:{th:`เสียบที่รู A12, C12, D12 หรือ E12 (คอลัมน์ 12 ฝั่งบนเดียวกันกับ B12)`,en:`Any free hole in column 12 top strip: A12, C12, D12, or E12.`},B:{th:`เสียบที่รู F12 (ข้ามร่องกลางไปฝั่งล่าง)`,en:`Hole F12 on the opposite side of the center trench.`},C:{th:`เสียบที่รู B16 (คอลัมน์เดียวกับขาแคโทด C16)`,en:`Hole B16 in the same strip as the Cathode C16.`}},correctTransfer:`A`,transferFeedbackCorrect:{th:`ถูกต้อง! รู A12–E12 อยู่บนแถบโลหะเดียวกัน จึงเชื่อมขวาของตัวต้านทาน (B12) เข้ากับแอโนดของ LED (C12) ได้พอดี`,en:`Correct! Holes A12–E12 share one conductive strip, connecting the resistor in B12 to the LED Anode in C12.`},transferFeedbackRetry:{th:`จำไว้ว่าในเบรดบอร์ด รู 5 รูแนวตั้งฝั่งเดียวกัน (A12 ถึง E12) เชื่อมถึงกัน ส่วน F12 อยู่คนละฝั่งของร่องกลาง`,en:`Remember that holes A12–E12 share one vertical strip, whereas F12 is isolated across the center gap.`},explainPrompt:{th:`สรุปหลักการเสียบอุปกรณ์บนเบรดบอร์ดไม่ให้ลัดวงจรและไม่ให้วงจรขาด:`,en:`Summarize the rules for placing component leads on a breadboard without shorting or opening the loop:`},teacherAnswerSummary:{th:`ขั้นที่ 1: ข้อ B (เสียบ C12-D12 แถบโลหะเดียวกันทำให้ลัดวงจรขา LED) · ขั้นที่ 4: ข้อ A (เสียบในคอลัมน์ 12 ฝั่งบน A12–E12 เพื่อเชื่อมกับ B12)`,en:`Step 1: Option B (C12-D12 shorts the LED leads on one strip) · Step 4: Option A (use A12–E12 to share the node with B12)`}}}],v=`electronics_lab_state_v1`,y=new class{state;listeners=new Set;constructor(){this.state=this.loadInitialState()}getDefaultLesson(){return _.find(e=>e.id===`led-polarity`)||_[0]}loadInitialState(){let e=`th`;typeof window<`u`&&window.location&&(e=new URLSearchParams(window.location.search).get(`lang`)===`en`?`en`:`th`);let t=`dark`;if(typeof localStorage<`u`)try{let e=localStorage.getItem(`theme`);(e===`light`||e===`dark`)&&(t=e)}catch{}let n=this.getDefaultLesson(),r={currentLessonId:n.id,routeNotFound:!1,locale:e,theme:t,viewMode:`schematic`,teacherMode:!1,teacherRevealAnswers:!1,voltage:n.initialCircuit.voltage,forwardVoltage:n.initialCircuit.forwardVoltage,resistance:n.initialCircuit.resistance,power:n.initialCircuit.power,polarity:n.initialCircuit.polarity,closedCircuit:!0,wireConnected:n.initialCircuit.wireConnected??!0,materialId:n.initialCircuit.materialId??`copper`,ledColor:n.initialCircuit.ledColor??`red`,breadboardPreset:n.initialCircuit.breadboardPreset??`valid-series`,progressMap:{[n.id]:{level:`visited`}}};if(typeof localStorage<`u`)try{let e=localStorage.getItem(v);if(e){let t=JSON.parse(e);t&&typeof t==`object`&&(t.progressMap&&typeof t.progressMap==`object`&&(r.progressMap=t.progressMap),(t.viewMode===`schematic`||t.viewMode===`bench`)&&(r.viewMode=t.viewMode))}}catch{}return r}persist(){if(typeof localStorage<`u`)try{localStorage.setItem(v,JSON.stringify({progressMap:this.state.progressMap,viewMode:this.state.viewMode}))}catch{}}getState(){return this.state}getCurrentLesson(){return _.find(e=>e.id===this.state.currentLessonId)||this.getDefaultLesson()}getSimulationResult(){let e=this.state.currentLessonId;if(e===`open-closed-circuit`){let e=u({voltage:this.state.voltage,loadResistance:this.state.resistance,switchClosed:this.state.power,wireConnected:this.state.wireConnected});return{isValid:e.isValid,actualCurrent:e.actualCurrent,predictedCurrent:this.state.voltage/this.state.resistance,resistorVoltage:e.loadVoltage,resistorPower:e.loadPower,ledVoltage:e.gapVoltage,glowIntensity:e.glowIntensity,isReverseBiased:!1,isBelowThreshold:!1,isOvercurrent:e.actualCurrent>.025,isTargetMet:e.actualCurrent>=.01,kvlSatisfied:e.isLoopClosed}}if(e===`conductors-insulators`){let e=f({voltage:this.state.voltage,fixedResistance:this.state.resistance,forwardVoltage:this.state.forwardVoltage,materialId:this.state.materialId,power:this.state.power});return{isValid:e.isValid,actualCurrent:e.actualCurrent,predictedCurrent:(this.state.voltage-this.state.forwardVoltage)/this.state.resistance,resistorVoltage:e.resistorVoltageDrop,resistorPower:e.actualCurrent*e.actualCurrent*this.state.resistance,ledVoltage:e.ledVoltageDrop,glowIntensity:e.glowIntensity,isReverseBiased:!1,isBelowThreshold:!1,isOvercurrent:e.actualCurrent>.02,isTargetMet:e.isConducting,kvlSatisfied:e.isConducting}}if(e===`ohms-law-resistor`){let e=p({voltage:this.state.voltage,resistance:this.state.resistance,power:this.state.power});return{isValid:e.isValid,actualCurrent:e.actualCurrent,predictedCurrent:e.predictedCurrent,resistorVoltage:this.state.power?this.state.voltage:0,resistorPower:e.powerWatts,ledVoltage:0,glowIntensity:this.state.power?Math.min(1,e.actualCurrent/.02):0,isReverseBiased:!1,isBelowThreshold:!1,isOvercurrent:e.actualCurrent>.03,isTargetMet:e.actualCurrent>0,kvlSatisfied:this.state.power}}if(e===`breadboard-connectivity`){let e=h(this.state.breadboardPreset,this.state.voltage,this.state.resistance,this.state.forwardVoltage,this.state.power);return{isValid:e.isValid,actualCurrent:e.resistorCurrent,predictedCurrent:(this.state.voltage-this.state.forwardVoltage)/this.state.resistance,resistorVoltage:e.resistorCurrent*this.state.resistance,resistorPower:e.resistorCurrent*e.resistorCurrent*this.state.resistance,ledVoltage:e.ledLit?this.state.forwardVoltage:0,glowIntensity:e.glowIntensity,isReverseBiased:!1,isBelowThreshold:!1,isOvercurrent:e.resistorCurrent>.02,isTargetMet:e.ledLit,kvlSatisfied:e.ledLit}}return n({voltage:this.state.voltage,forwardVoltage:this.state.forwardVoltage,resistance:this.state.resistance,power:this.state.power,polarity:this.state.polarity,closedCircuit:this.state.closedCircuit})}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.persist();for(let e of this.listeners)e(this.state)}setRoute(e){let t=e.trim();if(!t){this.selectLesson(`led-polarity`);return}let n=_.find(e=>e.id===t);n?(this.state.currentLessonId!==n.id||this.state.routeNotFound)&&this.selectLesson(n.id):(this.state.routeNotFound=!0,this.notify())}selectLesson(e){let t=_.find(t=>t.id===e);if(!t)this.state.routeNotFound=!0,this.notify();else{if(this.state.currentLessonId=t.id,this.state.routeNotFound=!1,this.state.voltage=t.initialCircuit.voltage,this.state.forwardVoltage=t.initialCircuit.forwardVoltage,this.state.resistance=t.initialCircuit.resistance,this.state.power=t.initialCircuit.power,this.state.polarity=t.initialCircuit.polarity,this.state.wireConnected=t.initialCircuit.wireConnected??!0,this.state.materialId=t.initialCircuit.materialId??`copper`,this.state.ledColor=t.initialCircuit.ledColor??`red`,this.state.breadboardPreset=t.initialCircuit.breadboardPreset??`valid-series`,this.state.progressMap[t.id]||(this.state.progressMap[t.id]={level:`visited`}),typeof window<`u`&&window.location){let e=`#/${t.id}`;window.location.hash!==e&&(window.location.hash=e)}this.notify()}}setPower(e){this.state.power=e,this.markExperimented(),this.autoLogObservation(),this.notify()}togglePower(){this.setPower(!this.state.power)}setWireConnected(e){this.state.wireConnected=e,this.markExperimented(),this.autoLogObservation(),this.notify()}toggleWireConnected(){this.setWireConnected(!this.state.wireConnected)}setPolarity(e){this.state.polarity=e,this.markExperimented(),this.autoLogObservation(),this.notify()}togglePolarity(){this.setPolarity(this.state.polarity===`forward`?`reverse`:`forward`)}setMaterialId(e){this.state.materialId=e,this.markExperimented(),this.autoLogObservation(),this.notify()}setLedColor(e){this.state.ledColor=e,this.state.forwardVoltage=m[e].forwardVoltage,this.markExperimented(),this.autoLogObservation(),this.notify()}setBreadboardPreset(e){this.state.breadboardPreset=e,this.markExperimented(),this.autoLogObservation(),this.notify()}setVoltage(e){this.state.voltage=e,this.markExperimented(),this.autoLogObservation(),this.notify()}setResistance(e){this.state.resistance=e,this.markExperimented(),this.autoLogObservation(),this.notify()}setViewMode(e){this.state.viewMode=e,this.notify()}setLocale(e){if(this.state.locale=e,typeof window<`u`&&window.location)try{let t=new URL(window.location.href);t.searchParams.set(`lang`,e),window.history.replaceState({},``,t.toString())}catch{}this.notify()}toggleTeacherMode(){this.state.teacherMode=!this.state.teacherMode,this.notify()}toggleTeacherRevealAnswers(){this.state.teacherRevealAnswers=!this.state.teacherRevealAnswers,this.notify()}toggleTheme(){if(this.state.theme=this.state.theme===`dark`?`light`:`dark`,typeof document<`u`&&document.documentElement.classList.toggle(`dark`,this.state.theme===`dark`),typeof localStorage<`u`)try{localStorage.setItem(`theme`,this.state.theme)}catch{}this.notify()}markExperimented(){let e=this.state.currentLessonId,t=this.state.progressMap[e]||{level:`visited`};t.level===`visited`&&(this.state.progressMap[e]={...t,level:`experimented`})}autoLogObservation(e=!1){let t=this.state.currentLessonId,n=this.state.progressMap[t]||{level:`visited`},r=this.getSimulationResult();if(r.isValid){if(t===`open-closed-circuit`)this.state.power&&this.state.wireConnected?(n.observedForward={current:r.actualCurrent,lit:!0},n.step1Done=!0):n.step1Done&&(n.observedReverse={current:0,lit:!1},n.step2Done=!0);else if(t===`conductors-insulators`){if(!this.state.power)return;r.actualCurrent>0?(n.observedForward={current:r.actualCurrent,lit:!0},n.step1Done=!0):(n.observedReverse={current:0,lit:!1},n.step2Done=!0)}else if(t===`ohms-law-resistor`){if(!this.state.power)return;this.state.voltage===3&&this.state.resistance===300?(n.observedForward={current:r.actualCurrent,lit:!0},n.step1Done=!0):(n.observedReverse={current:r.actualCurrent,lit:r.actualCurrent>0},n.step2Done=!0)}else if(t===`current-limiting-resistor`){if(!this.state.power)return;r.isOvercurrent?(n.observedReverse={current:r.actualCurrent,lit:!0},n.step2Done=!0):(n.observedForward={current:r.actualCurrent,lit:r.actualCurrent>0},n.step1Done=!0)}else if(t===`breadboard-connectivity`){if(!this.state.power)return;this.state.breadboardPreset===`valid-series`?(n.observedForward={current:r.actualCurrent,lit:!0},n.step1Done=!0):(n.observedReverse={current:r.actualCurrent,lit:!1},n.step2Done=!0)}else{if(!this.state.power)return;let t={current:r.actualCurrent,lit:r.actualCurrent>0};this.state.polarity===`forward`?(e||!n.observedForward)&&(n.observedForward=t,n.step1Done=!0):(e||!n.observedReverse)&&(n.observedReverse=t,n.step2Done=!0)}n.observedForward&&n.observedReverse&&(n.observed=!0),this.state.progressMap[t]={...n}}}submitPrediction(e){let t=this.state.currentLessonId,n=this.state.progressMap[t]||{level:`visited`};this.state.progressMap[t]={...n,prediction:e},this.notify()}recordObservation(){this.autoLogObservation(!0);let e=this.state.currentLessonId,t=this.state.progressMap[e]||{level:`visited`};this.state.progressMap[e]={...t,observed:!0},this.notify()}saveExplanation(e,t){let n=this.state.currentLessonId,r=this.getCurrentLesson(),i=this.state.progressMap[n]||{level:`visited`},a=t??i.transferAnswer,o=i.prediction===r.inquiry.correctPrediction&&a===r.inquiry.correctTransfer;this.state.progressMap[n]={...i,transferAnswer:a,isCorrect:o,explanation:e,level:`completed`},this.notify()}resetExperiment(){let e=this.getCurrentLesson();this.state.voltage=e.initialCircuit.voltage,this.state.forwardVoltage=e.initialCircuit.forwardVoltage,this.state.resistance=e.initialCircuit.resistance,this.state.power=e.initialCircuit.power,this.state.polarity=e.initialCircuit.polarity,this.state.wireConnected=e.initialCircuit.wireConnected??!0,this.state.materialId=e.initialCircuit.materialId??`copper`,this.state.ledColor=e.initialCircuit.ledColor??`red`,this.state.breadboardPreset=e.initialCircuit.breadboardPreset??`valid-series`,this.notify()}resetAllProgress(){this.state.progressMap={};for(let e of _)this.state.progressMap[e.id]={level:`visited`};this.resetExperiment(),this.notify()}},b={th:{siteTitle:`Electronics Learning Lab`,subtitle:`ห้องทดลองอิเล็กทรอนิกส์เสมือนจริงสำหรับการเรียนรู้แบบสืบเสาะ`,navLessons:`บทเรียน P1 (6 บท)`,pilotBadge:`P1 Classroom Pilot · 6 บทเรียน`,teacherMode:`โหมดครู`,exitTeacherMode:`ปิดโหมดครู`,fullscreen:`เต็มจอ`,exitFullscreen:`ออกจากเต็มจอ`,printWorksheet:`พิมพ์ใบกิจกรรม`,resetExperiment:`รีเซ็ตค่าการทดลอง`,resetAllProgress:`ล้างความก้าวหน้าทั้งหมด`,confirmResetAll:`ยืนยันการล้างความก้าวหน้าทั้งหมดของทุกบทเรียนในเครื่องนี้หรือไม่?`,view2D:`แผนภาพวงจรและอุปกรณ์สมจริง 2D (SVG)`,view3D:`โต๊ะทดลองเสมือนจริง 3D (Three.js)`,webglFallbackNotice:`เบราว์เซอร์หรืออุปกรณ์นี้ไม่รองรับ WebGL ระบบได้สลับมาใช้แผนภาพวงจร 2D ที่ทำงานได้ครบทุกฟังก์ชัน`,switchTo2D:`สลับไปที่แผนภาพวงจร 2D`,benchHint:`ลากเพื่อหมุนมุมกล้อง 360° · เลื่อนลูกกลิ้งเพื่อซูม · อุปกรณ์จำลองตามสัดส่วนจริง`,resetCamera:`รีเซ็ตมุมกล้อง`,powerOn:`สวิตช์ไฟ: เปิด (ON)`,powerOff:`สวิตช์ไฟ: ปิด (OFF)`,switchOnShort:`เปิด`,switchOffShort:`ปิด`,switchClickHint:`สวิตช์ (คลิก)`,wireConnected:`สายไฟขากลับ: เชื่อมต่อครบ`,wireDisconnected:`สายไฟขากลับ: หลุด/วงจรขาด`,wireClickHint:`จุดต่อสาย (คลิก)`,polarityForward:`ขั้ว LED: ต่อถูกขั้ว (ขายาวเข้า +)`,polarityReverse:`ขั้ว LED: ต่อกลับขั้ว (ขายาวเข้า −)`,polarityFwdShort:`ถูกขั้ว (คลิกสลับ)`,polarityRevShort:`กลับขั้ว (คลิกสลับ)`,longLegToPlus:`ขายาว (แอโนด +) ต่อด้านขั้วบวก`,longLegToMinus:`ขายาว (แอโนด +) ต่อด้านขั้วลบ (กลับขั้ว)`,anode:`แอโนด (+)`,cathode:`แคโทด (−)`,resistor:`ตัวต้านทาน`,colorBandsLabel:`แถบสี 4 แถบ:`,supplyVoltage:`แรงดันแหล่งจ่าย`,battery:`แบตเตอรี่`,current:`กระแสไฟฟ้าในวงจร`,actualCurrent:`กระแสไฟฟ้าที่ไหลจริง`,predictedCurrent:`กระแสคาดการณ์ (เมื่อวงจรนำกระแส)`,resistorVoltage:`แรงดันตกคร่อมตัวต้านทาน (Vr)`,resistorPower:`กำลังไฟฟ้าตัวต้านทาน (Pr)`,ledVoltage:`แรงดันตกคร่อม LED (Vf)`,gapVoltage:`แรงดันตกคร่อมจุดที่วงจรเปิด (Vgap)`,materialLabel:`วัสดุที่นำมาทดสอบในช่องว่าง:`,ledColorLabel:`ชนิดของหลอด LED:`,breadboardPresetLabel:`รูปแบบการเสียบขาบนเบรดบอร์ด:`,presetValidSeries:`1. ต่ออนุกรมถูกต้อง (B12 เชื่อม C12 ไป C16)`,presetShortedStrip:`2. ลัดวงจรในแถบเดียวกัน (ขา LED อยู่ C12 และ D12)`,presetOpenGap:`3. ข้ามร่องกลางโดยไม่เชื่อมสาย (E12 ไป F12)`,presetMisaligned:`4. เสียบขาคนละคอลัมน์ไม่ชนกัน (B12 กับ C13)`,status:`สถานะวงจร`,statusConducting:`วงจรปิดสมบูรณ์: กระแสไฟฟ้าไหลผ่านตามแบบจำลอง`,statusReverseBiased:`ไดโอดต่อกลับขั้ว (ไบแอสกลับ): กั้นกระแสไฟฟ้า หลอด LED ไม่สว่าง`,statusPowerOff:`สวิตช์เปิดอยู่ (ปิดไฟ): ไม่มีกระแสไหล แต่ขั้วแบตเตอรี่ยังมีศักย์ไฟฟ้า`,statusWireBroken:`สายไฟขากลับหลุดออก (วงจรเปิด): ไม่มีกระแสไหล และมีแรงดันตกคร่อมที่จุดขาด`,statusInsulatorBlocked:`วัสดุที่เลือกเป็นฉนวนไฟฟ้า: กั้นกระแสไฟฟ้าไม่ให้ไหลครบวงจร (I = 0 mA)`,statusBelowThreshold:`แรงดันแหล่งจ่ายต่ำกว่าแรงดันทำงานของ LED (Vs ≤ Vf) จึงยังไม่นำกระแส`,statusOvercurrent:`คำเตือนกระแสเกินเกณฑ์แบบจำลอง (> 20 mA): เสี่ยงทำให้หลอด LED จริงเสียหาย`,statusShortedStrip:`ข้อผิดพลาดบนเบรดบอร์ด: ขา LED ทั้งสองเสียบอยู่ในแถบโลหะคอลัมน์ 12 เดียวกัน ทำให้ลัดวงจรข้ามหลอด LED!`,statusOpenTrench:`ข้อผิดพลาดบนเบรดบอร์ด: ร่องกลางแยกแถบ A–E ออกจาก F–J ทำให้วงจรขาด (I = 0 mA)`,statusMisalignedRow:`ข้อผิดพลาดบนเบรดบอร์ด: ขาตัวต้านทาน (คอลัมน์ 12) กับขา LED (คอลัมน์ 13) อยู่คนละแถบโลหะ จึงไม่เชื่อมถึงกัน`,statusInvalid:`ข้อมูลวงจรไม่ถูกต้อง: ความต้านทานต้องมากกว่าศูนย์และเป็นค่าจำกัด`,tabOverview:`แนวคิดและกายวิภาคอุปกรณ์`,tabExperiment:`กิจกรรมสืบเสาะ 4 ขั้น`,tabMaths:`สมการและกราฟคำนวณ`,tabTeacher:`คู่มือครูและเฉลย`,learningObjectives:`จุดประสงค์การเรียนรู้:`,realisticAnatomyTitle:`โครงสร้างกายวิภาคของอุปกรณ์จริง (Component Anatomy)`,realisticLedNote:`หลอด LED 5 มม.: สังเกตขั้วแคโทด (−) ได้จากรอยบากแบนที่ฐานพลาสติก ถ้วยสะท้อนแสงขนาดใหญ่ (Anvil) ด้านใน และขาสั้น ส่วนแอโนด (+) มีแกนโลหะเล็ก (Post) และขายาว`,realisticResistorNote:`ตัวต้านทานฟิล์มคาร์บอน: ไม่มีขั้ว อ่านค่าโอห์มจากแถบสี 4 แถบ (หลักที่ 1, หลักที่ 2, ตัวคูณ และแถบความคลาดเคลื่อนสีทอง ±5%)`,realisticBreadboardNote:`เบรดบอร์ด 400 จุด: รู 5 รูแนวตั้ง (A–E และ F–J) เชื่อมกันด้วยคลิปสปริงโลหะใต้บอร์ด คั่นกลางด้วยร่องแยก IC ส่วนรางไฟ +/− เชื่อมตามแนวนอน`,mathsKvlTitle:`1. ความสัมพันธ์ของแรงดันในวงจร (KVL)`,mathsKvlDesc:`ผลรวมแรงดันตกคร่อมในวงจรและสถานะศักย์ไฟฟ้าปัจจุบัน:`,mathsOhmTitle:`2. สมการคำนวณกระแสไฟฟ้า`,mathsSubstitute:`แทนค่าในสมการ:`,mathsResultCurrent:`กระแสไฟฟ้าที่ไหลจริง:`,mathsNonConducting:`วงจรไม่ได้นำกระแสผ่านโหลดในขณะนี้ (I = 0.00 mA)`,mathsPredictedWhenOn:`กระแสคาดการณ์เมื่อต่อครบวงจร:`,mathsPowerTitle:`3. กำลังไฟฟ้าที่ตัวต้านทาน`,mathsPowerResult:`กำลังไฟฟ้าที่สูญเสียในตัวต้านทาน:`,mathsZeroCurrentNote:`หมายเหตุ: การที่กระแสเป็นศูนย์ไม่ได้แปลว่าทุกจุดในวงจรมีแรงดันเป็นศูนย์ แหล่งจ่ายและขั้วที่เปิดวงจรยังมีศักย์ไฟฟ้าตกคร่อมอยู่`,step1PredictTitle:`ขั้นที่ 1: ทำนายผลลัพธ์ (Predict)`,submitPrediction:`บันทึกคำทำนาย`,predictionSubmitted:`บันทึกคำทำนายแล้ว — ไปทดลองในขั้นที่ 2 เพื่อพิสูจน์กัน!`,selectPredictionAlert:`กรุณาเลือกคำทำนายก่อนกดบันทึก`,step2ExperimentTitle:`ขั้นที่ 2: ทดลองเปลี่ยนตัวแปร (Experiment)`,step2ExperimentHint:`ปรับตัวควบคุมด้านซ้ายหรือคลิกบนอุปกรณ์ในแผนภาพเพื่อสำรวจครบทุกเงื่อนไข:`,step3ObserveTitle:`ขั้นที่ 3: บันทึกผลการสังเกต (Observe)`,step3ObservePrompt:`ตารางเปรียบเทียบค่าที่วัดได้จริงจากการทดลอง:`,obsTableCondition:`เงื่อนไขการทดลอง`,obsTableCurrent:`กระแสที่วัดได้`,obsTableLedState:`สถานะวงจร / หลอดไฟ`,obsLit:`สว่าง (นำกระแส)`,obsDark:`ไม่สว่าง (0 mA)`,obsActiveFlow:`มีกระแสไหล`,obsNoFlow:`ไม่มีกระแสไหล`,obsNotRecorded:`รอการทดลอง...`,recordObservationBtn:`ยืนยันตารางผลการสังเกต`,observationRecorded:`บันทึกตารางผลการสังเกตครบถ้วนแล้ว`,step4ExplainTitle:`ขั้นที่ 4: อธิบายและเชื่อมโยงความรู้ (Explain & Transfer)`,saveExplanationBtn:`ส่งคำตอบและจบกิจกรรมบทนี้`,explanationSaved:`ส่งคำตอบครบทุกขั้นตอนแล้ว`,enterExplanationAlert:`กรุณาเลือกคำตอบเชื่อมโยงและพิมพ์คำอธิบายสรุปก่อนบันทึก`,explainPlaceholder:`เขียนสรุปสิ่งที่ค้นพบและเชื่อมโยงกับหลักการทางไฟฟ้า...`,teacherAnswerKey:`แนวคำตอบสำหรับครูผู้สอน:`,teacherRubric:`เกณฑ์ตรวจคำอธิบายอิสระ: นักเรียนควรอ้างอิงหลักฐานค่ากระแสไฟฟ้า (mA) จากตารางสังเกตการณ์ควบคู่กับเหตุผลทางกายภาพของวงจร`,teacherPedagogicalNotes:`ข้อเสนอแนะในการจัดการชั้นเรียน:`,teacherRevealAnswers:`แสดงแนวคำตอบ`,teacherHideAnswers:`ซ่อนแนวคำตอบ`,modelLimitationsNote:`ขอบเขตของแบบจำลอง: ใช้แบบจำลองค่าคงที่ระดับชั้นเรียน (Vf คงที่ตามสี LED, ตัวนำและฉนวนในอุดมคติ, ไม่จำลองความร้อนสะสมหรือการพังทลายย้อนกลับของไดโอด) หากต่อวงจรจริงต้องตรวจสอบ Datasheet ของอุปกรณ์เสมอ`,progressStatus:`ความก้าวหน้า`,progressVisited:`เข้าชมแล้ว`,progressExperimented:`ทดลองแล้ว`,progressCompleted:`ทำกิจกรรมครบแล้ว`,progressCorrect:`ตอบคำถามถูกต้อง`,unknownRouteTitle:`ไม่พบบทเรียนตามลิงก์ที่ระบุ`,unknownRouteDesc:`คุณสามารถเลือกบทเรียนทั้ง 6 บทในชุดนำร่อง P1 ได้จากรายการด้านล่าง:`,availableLessonsTitle:`บทเรียนที่เปิดใช้งานแล้ว (P1 Classroom Pilot — 6 บทเรียน)`,deferredLessonsTitle:`บทเรียนในแผนขยายหลักสูตรระยะถัดไป (P3 — ยังไม่เปิดใช้งาน)`,deferredBadge:`เตรียมพัฒนาในระยะ P3`,openLessonBtn:`เปิดบทเรียน`,homeLink:`กลับหน้าหลัก`,themeToggle:`สลับโหมดมืด/สว่าง`,footerDevelopedBy:`พัฒนาและเผยแพร่โดย`,footerAuthorName:`ดร.อภิสิทธิ์ ธงไชย (Dr. Apisit Tongchai)`,footerRole:`นักวิจัยและนักการศึกษา`,footerCopyright:`© 2026 อภิสิทธิ์ ธงไชย. สงวนลิขสิทธิ์ทั้งหมด (All Rights Reserved) · เว็บไซต์พอร์ตโฟลิโอส่วนตัว`},en:{siteTitle:`Electronics Learning Lab`,subtitle:`Interactive virtual electronics laboratory for guided inquiry learning`,navLessons:`P1 Lessons (6)`,pilotBadge:`P1 Classroom Pilot · 6 Lessons`,teacherMode:`Teacher Mode`,exitTeacherMode:`Exit Teacher Mode`,fullscreen:`Fullscreen`,exitFullscreen:`Exit Fullscreen`,printWorksheet:`Print Worksheet`,resetExperiment:`Reset Experiment`,resetAllProgress:`Reset All Progress`,confirmResetAll:`Are you sure you want to reset all saved progress across all lessons on this device?`,view2D:`2D Schematic & Realistic Anatomy (SVG)`,view3D:`3D Virtual Workbench (Three.js)`,webglFallbackNotice:`WebGL is unavailable in this browser or device. Showing the complete 2D interactive schematic instead.`,switchTo2D:`Switch to 2D Schematic`,benchHint:`Drag to orbit 360° · Scroll to zoom · Realistic physical component geometry`,resetCamera:`Reset Camera`,powerOn:`Power Switch: ON`,powerOff:`Power Switch: OFF`,switchOnShort:`ON`,switchOffShort:`OFF`,switchClickHint:`Switch (Click)`,wireConnected:`Return Wire: Connected`,wireDisconnected:`Return Wire: Disconnected (Open Gap)`,wireClickHint:`Wire (Click)`,polarityForward:`LED Polarity: Forward (Long leg to +)`,polarityReverse:`LED Polarity: Reverse (Long leg to −)`,polarityFwdShort:`Forward (Click to flip)`,polarityRevShort:`Reverse (Click to flip)`,longLegToPlus:`Long leg (Anode +) connected toward positive`,longLegToMinus:`Long leg (Anode +) connected toward negative (Reversed)`,anode:`Anode (+)`,cathode:`Cathode (−)`,resistor:`Resistor`,colorBandsLabel:`4-Band Code:`,supplyVoltage:`Supply Voltage`,battery:`Battery`,current:`Circuit Current`,actualCurrent:`Actual Simulated Current`,predictedCurrent:`Predicted Closed-Loop Current`,resistorVoltage:`Resistor Voltage Drop (Vr)`,resistorPower:`Resistor Power (Pr)`,ledVoltage:`LED Voltage Drop (Vf)`,gapVoltage:`Open-Break Voltage (Vgap)`,materialLabel:`Test Sample in Clips:`,ledColorLabel:`LED Type / Forward Voltage:`,breadboardPresetLabel:`Breadboard Wiring Placement:`,presetValidSeries:`1. Valid Series (B12 to C12, LED to C16)`,presetShortedStrip:`2. Same-Strip Short (Both LED leads in C12 & D12)`,presetOpenGap:`3. Unbridged Center Gap (E12 across trench to F12)`,presetMisaligned:`4. Misaligned Columns (Resistor in B12, LED in C13)`,status:`Circuit Status`,statusConducting:`Complete conducting circuit: current flows according to the model.`,statusReverseBiased:`Reverse-biased diode: blocks current flow in this low-voltage model; LED remains off.`,statusPowerOff:`Switch is open (Power OFF): zero current flows, though supply terminals retain voltage.`,statusWireBroken:`Return wire is disconnected (Open Circuit): zero current flows and full supply voltage appears across the break.`,statusInsulatorBlocked:`Selected sample is an electrical insulator: blocks current flow (I = 0 mA).`,statusBelowThreshold:`Supply voltage is at or below the LED forward threshold (Vs ≤ Vf); zero current in this approximation.`,statusOvercurrent:`Model overcurrent warning (> 20 mA): exceeds conservative classroom rating.`,statusShortedStrip:`Breadboard Fault: Both LED leads are plugged into column 12's strip, shorting out the LED!`,statusOpenTrench:`Breadboard Fault: The center trench isolates A–E from F–J, leaving the circuit open (I = 0 mA).`,statusMisalignedRow:`Breadboard Fault: Resistor (Column 12) and LED Anode (Column 13) are in separate unconnected strips.`,statusInvalid:`Invalid model input: resistance must be finite and greater than zero.`,tabOverview:`Concepts & Anatomy`,tabExperiment:`4-Step Inquiry`,tabMaths:`Equations & Charts`,tabTeacher:`Teacher Guide`,learningObjectives:`Learning Objectives:`,realisticAnatomyTitle:`Realistic Component Anatomy`,realisticLedNote:`5mm Epoxy LED: Identify the Cathode (−) by the flat rim notch, the larger internal anvil reflector cup, and shorter lead; Anode (+) has the smaller post and longer lead.`,realisticResistorNote:`Carbon-Film Resistor: Non-polarized; value is marked by 4 EIA color bands (1st digit, 2nd digit, multiplier, and Gold ±5% tolerance).`,realisticBreadboardNote:`400-Point Solderless Breadboard: 5 vertical holes per column strip (A–E and F–J) share a hidden spring clip split by the center IC trench; power rails (+/−) run horizontally.`,mathsKvlTitle:`1. Voltage Relationships (KVL)`,mathsKvlDesc:`Voltage drops and terminal potentials in the current circuit state:`,mathsOhmTitle:`2. Current Calculation Equation`,mathsSubstitute:`Substitute values:`,mathsResultCurrent:`Actual simulated current:`,mathsNonConducting:`Load is not conducting right now (I = 0.00 mA)`,mathsPredictedWhenOn:`Predicted current when loop conducts:`,mathsPowerTitle:`3. Resistor Power Dissipation`,mathsPowerResult:`Power dissipated by resistor:`,mathsZeroCurrentNote:`Note: Zero current does not imply every node has zero voltage. The battery and open/blocked terminals still hold potential difference.`,step1PredictTitle:`Step 1: Predict`,submitPrediction:`Save Prediction`,predictionSubmitted:`Prediction saved — test your idea in Step 2!`,selectPredictionAlert:`Please choose a prediction option before saving.`,step2ExperimentTitle:`Step 2: Experiment`,step2ExperimentHint:`Use the controls on the left or click components on the diagram to test both conditions:`,step3ObserveTitle:`Step 3: Record Observations`,step3ObservePrompt:`Comparison table of measurements recorded from your experiment:`,obsTableCondition:`Experimental Condition`,obsTableCurrent:`Measured Current`,obsTableLedState:`Circuit / Lamp State`,obsLit:`Lit (Conducting)`,obsDark:`Off (0 mA)`,obsActiveFlow:`Current Flows`,obsNoFlow:`Zero Current`,obsNotRecorded:`Awaiting test...`,recordObservationBtn:`Confirm Observation Table`,observationRecorded:`Observation table confirmed.`,step4ExplainTitle:`Step 4: Explain & Transfer`,saveExplanationBtn:`Submit Explanation & Complete Lesson`,explanationSaved:`Activity completed and submitted.`,enterExplanationAlert:`Please select an answer for the transfer question and write your explanation before submitting.`,explainPlaceholder:`Summarize your findings and connect them to electrical principles...`,teacherAnswerKey:`Teacher Answer Key & Rubric:`,teacherRubric:`Free-Response Rubric: Look for students citing measured current (mA) from their observation table alongside the physical circuit mechanism.`,teacherPedagogicalNotes:`Classroom Facilitation Notes:`,teacherRevealAnswers:`Reveal Answer Key`,teacherHideAnswers:`Hide Answer Key`,modelLimitationsNote:`Model Limitations: Uses constant classroom approximations (fixed Vf per LED color, ideal insulator cutoff, no thermal runaway or reverse breakdown). Always check component datasheets for real hardware.`,progressStatus:`Progress`,progressVisited:`Visited`,progressExperimented:`Experimented`,progressCompleted:`Activity Completed`,progressCorrect:`Answered Correctly`,unknownRouteTitle:`Requested Lesson Route Not Found`,unknownRouteDesc:`Select any of the 6 lessons in the P1 Classroom Pilot below:`,availableLessonsTitle:`Available Lessons (P1 Classroom Pilot — 6 Lessons)`,deferredLessonsTitle:`Planned Curriculum Expansion (P3 — Deferred)`,deferredBadge:`Planned for P3`,openLessonBtn:`Open Lesson`,homeLink:`Home`,themeToggle:`Toggle Dark/Light Theme`,footerDevelopedBy:`Developed & Published by`,footerAuthorName:`Dr. Apisit Tongchai`,footerRole:`Independent Educator & Researcher`,footerCopyright:`© 2026 Apisit Tongchai. All Rights Reserved · Personal Portfolio Website`}},x=class{container;constructor(e){this.container=e}render(e){let t=b[e.locale],n=y.getSimulationResult(),o=n.actualCurrent>0&&n.kvlSatisfied,s=e.polarity===`reverse`,c=e.power,u=l(e.resistance),d=(e.currentLessonId===`current-limiting-resistor`?m[e.ledColor]:m.red).hex,f=o?Math.max(.55,2-n.actualCurrent/.025*1.4).toFixed(2):`0`,p=o?22+n.glowIntensity*30:0,h=o?.4+n.glowIntensity*.55:0;if(e.currentLessonId===`breadboard-connectivity`){this.renderBreadboard2D(e,t,n,u);return}let g=s?t.cathode:t.anode,_=s?t.anode:t.cathode,v=e.currentLessonId===`open-closed-circuit`&&!e.wireConnected,x=u.map(t=>e.locale===`th`?t.nameTh:t.nameEn).join(` · `);this.container.innerHTML=`
      <div class="schematic-wrapper" style="position: relative; width: 100%;">
        <svg viewBox="0 0 640 350" class="schematic-svg" role="img" aria-label="${t.view2D}">
          <defs>
            <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="${d}" stop-opacity="${h}" />
              <stop offset="55%" stop-color="${d}" stop-opacity="${h*.45}" />
              <stop offset="100%" stop-color="${d}" stop-opacity="0" />
            </radialGradient>

            <linearGradient id="resistorBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fde68a" />
              <stop offset="50%" stop-color="#d97706" />
              <stop offset="100%" stop-color="#92400e" />
            </linearGradient>

            <linearGradient id="batteryCaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="50%" stop-color="#334155" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>

            <style>
              .wire { stroke: #64748b; stroke-width: 4.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
              .wire-red { stroke: #ef4444; stroke-width: 4.5; fill: none; stroke-linecap: round; }
              .wire-blue { stroke: #38bdf8; stroke-width: 4.5; fill: none; stroke-linecap: round; }
              .active-wire { stroke: #10b981; stroke-width: 4.5; fill: none; stroke-linecap: round; stroke-dasharray: 8 8; }
              @keyframes dash {
                to { stroke-dashoffset: -32; }
              }
              .anim-flow {
                animation: dash ${f}s linear infinite;
              }
              .clickable-part { cursor: pointer; transition: filter 0.15s ease; }
              .clickable-part:hover { filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.65)); }
              .clickable-part:focus-visible { outline: 3px solid #f59e0b; }
              @media (prefers-reduced-motion: reduce) {
                .anim-flow { animation: none; }
              }
            </style>
          </defs>

          <!-- Background Canvas Grid -->
          <rect width="640" height="350" rx="14" fill="#0b1329" />
          <g opacity="0.12">
            <line x1="80" y1="0" x2="80" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="200" y1="0" x2="200" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="340" y1="0" x2="340" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="480" y1="0" x2="480" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="0" y1="90" x2="640" y2="90" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="0" y1="245" x2="640" y2="245" stroke="#94a3b8" stroke-dasharray="2 4"/>
          </g>

          <!-- CIRCUIT WIRES -->
          <path d="M 85 115 L 85 90 L 145 90" class="wire-red" />
          <path d="M 215 90 L 265 90" class="wire" />
          <path d="M 385 90 L 440 90" class="wire" />
          ${v?`
            <path d="M 520 90 L 565 90 L 565 245 L 365 245" class="wire-blue" />
            <path d="M 275 245 L 85 245 L 85 220" class="wire-blue" />
          `:`
            <path d="M 520 90 L 565 90 L 565 245 L 85 245 L 85 220" class="wire-blue" />
          `}

          <!-- Dynamic Current Flow Animation Overlay (Conventional Current + to -) -->
          ${o?`
            <path d="M 85 115 L 85 90 L 145 90" class="active-wire anim-flow" />
            <path d="M 145 90 L 215 90" class="active-wire anim-flow" />
            <path d="M 215 90 L 265 90" class="active-wire anim-flow" />
            <path d="M 385 90 L 440 90" class="active-wire anim-flow" />
            <path d="M 520 90 L 565 90 L 565 245 L 85 245 L 85 220" class="active-wire anim-flow" />
            <polygon points="242,84 254,90 242,96" fill="#10b981" />
            <polygon points="410,84 422,90 410,96" fill="#10b981" />
            <polygon points="559,165 565,177 571,165" fill="#10b981" />
            <polygon points="330,239 318,245 330,251" fill="#10b981" />
          `:``}

          <!-- 1. REALISTIC AA BATTERY HOLDER + CELLS -->
          <g transform="translate(85, 168)" class="battery-group">
            <!-- Battery Holder Box -->
            <rect x="-34" y="-52" width="68" height="104" rx="8" fill="url(#batteryCaseGrad)" stroke="#475569" stroke-width="2" />
            <!-- Two AA Cells inside -->
            <rect x="-26" y="-42" width="22" height="84" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
            <rect x="-26" y="-42" width="22" height="22" rx="3" fill="#d97706" />
            <rect x="-19" y="-47" width="8" height="5" rx="1" fill="#fbbf24" />
            <rect x="4" y="-42" width="22" height="84" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
            <rect x="4" y="-42" width="22" height="22" rx="3" fill="#d97706" />
            <rect x="11" y="-47" width="8" height="5" rx="1" fill="#fbbf24" />
            <!-- Terminal Labels -->
            <circle cx="0" cy="-52" r="4" fill="#ef4444" />
            <circle cx="0" cy="52" r="4" fill="#38bdf8" />
            <text x="-42" y="-42" fill="#ef4444" font-size="15" font-weight="bold" text-anchor="end">+</text>
            <text x="-42" y="48" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="end">−</text>
            <rect x="-28" y="-12" width="56" height="22" rx="4" fill="rgba(15,23,42,0.88)" />
            <text x="0" y="4" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">${i(e.voltage)}</text>
          </g>

          <!-- 2. REALISTIC KNIFE / TACTILE SWITCH (INTERACTIVE) -->
          <g id="schematic-switch" class="clickable-part" transform="translate(145, 90)" tabindex="0" role="button" aria-label="${c?t.powerOn:t.powerOff}">
            <rect x="-12" y="-42" width="94" height="78" fill="transparent" />
            <!-- Switch Base Block -->
            <rect x="-6" y="4" width="82" height="12" rx="3" fill="#334155" stroke="#475569" />
            <!-- Brass Terminal Posts -->
            <rect x="-3" y="-6" width="8" height="12" rx="2" fill="#f59e0b" />
            <rect x="65" y="-6" width="8" height="12" rx="2" fill="#f59e0b" />
            ${c?`
              <!-- Closed Copper Knife Blade -->
              <line x1="2" y1="-2" x2="68" y2="-2" stroke="#10b981" stroke-width="5" stroke-linecap="round" />
              <rect x="52" y="-10" width="14" height="10" rx="2" fill="#dc2626" />
              <rect x="14" y="-32" width="42" height="18" rx="4" fill="#065f46" />
              <text x="35" y="-19" fill="#34d399" font-size="10.5" font-weight="bold" text-anchor="middle">${t.switchOnShort}</text>
            `:`
              <!-- Open Copper Knife Blade -->
              <line x1="2" y1="-2" x2="58" y2="-28" stroke="#f43f5e" stroke-width="5" stroke-linecap="round" />
              <rect x="50" y="-36" width="14" height="10" rx="2" fill="#dc2626" transform="rotate(-24 55 -30)" />
              <rect x="10" y="-38" width="42" height="18" rx="4" fill="#7f1d1d" />
              <text x="31" y="-25" fill="#fca5a5" font-size="10.5" font-weight="bold" text-anchor="middle">${t.switchOffShort}</text>
            `}
            <text x="35" y="30" fill="#cbd5e1" font-size="10.5" text-anchor="middle">${t.switchClickHint}</text>
          </g>

          <!-- 3. REALISTIC CARBON-FILM RESISTOR WITH DYNAMIC 4-BAND COLOR CODE -->
          <g transform="translate(265, 90)">
            <!-- Metallic Axial Leads -->
            <line x1="0" y1="0" x2="22" y2="0" stroke="#cbd5e1" stroke-width="4" />
            <line x1="98" y1="0" x2="120" y2="0" stroke="#cbd5e1" stroke-width="4" />
            <!-- Ceramic Body -->
            <rect x="20" y="-14" width="80" height="28" rx="10" fill="url(#resistorBodyGrad)" stroke="#b45309" stroke-width="1.5" />
            <!-- 4 EIA Color Bands -->
            <rect x="32" y="-14" width="7" height="28" fill="${u[0].hex}" />
            <rect x="46" y="-14" width="7" height="28" fill="${u[1].hex}" />
            <rect x="60" y="-14" width="7" height="28" fill="${u[2].hex}" />
            <rect x="78" y="-14" width="6" height="28" fill="${u[3].hex}" />
            <!-- Value & Color Band Readout -->
            <text x="60" y="-22" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">${a(e.resistance)}</text>
            <text x="60" y="29" fill="#cbd5e1" font-size="10" text-anchor="middle">${x}</text>
          </g>

          <!-- 4. LOAD ELEMENT: REALISTIC 5MM LED OR TEST MATERIAL / LAMP -->
          ${this.renderLoadElement(e,t,o,s,d,p,g,_)}

          <!-- 5. OPTIONAL RETURN WIRE BREAK (Lesson 1: Open & Closed Circuit) -->
          ${e.currentLessonId===`open-closed-circuit`?`
            <g id="schematic-wire" class="clickable-part" transform="translate(275, 245)" tabindex="0" role="button" aria-label="${e.wireConnected?t.wireConnected:t.wireDisconnected}">
              <rect x="-10" y="-25" width="110" height="55" fill="transparent" />
              <circle cx="0" cy="0" r="6" fill="#38bdf8" />
              <circle cx="90" cy="0" r="6" fill="#38bdf8" />
              ${e.wireConnected?`
                <line x1="0" y1="0" x2="90" y2="0" stroke="#38bdf8" stroke-width="5" />
                <text x="45" y="-12" fill="#38bdf8" font-size="10.5" font-weight="bold" text-anchor="middle">${t.wireConnected}</text>
              `:`
                <line x1="0" y1="0" x2="32" y2="-18" stroke="#f43f5e" stroke-width="4.5" stroke-linecap="round" />
                <line x1="58" y1="-18" x2="90" y2="0" stroke="#f43f5e" stroke-width="4.5" stroke-linecap="round" />
                <rect x="18" y="-36" width="54" height="18" rx="4" fill="#7f1d1d" />
                <text x="45" y="-23" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Vgap = ${i(e.voltage)}</text>
              `}
              <text x="45" y="18" fill="#cbd5e1" font-size="10" text-anchor="middle">${t.wireClickHint}</text>
            </g>
          `:``}

          <!-- 6. REALISTIC DIGITAL MULTIMETER READOUT PANEL -->
          <g transform="translate(155, 282)">
            <rect x="0" y="0" width="330" height="54" rx="10" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
            <rect x="8" y="7" width="165" height="40" rx="6" fill="#091914" stroke="#065f46" stroke-width="1" />
            <circle cx="22" cy="27" r="6" fill="${o?`#10b981`:`#64748b`}" />
            <text x="34" y="21" fill="#6ee7b7" font-size="9.5" font-weight="600">${t.actualCurrent}</text>
            <text x="34" y="39" fill="${o?`#34d399`:`#f1f5f9`}" font-size="16" font-weight="bold" font-family="monospace">${r(n.actualCurrent,e.locale)}</text>

            <text x="185" y="22" fill="#94a3b8" font-size="10" font-weight="600">Vr: <tspan fill="#f8fafc" font-family="monospace">${i(n.resistorVoltage)}</tspan></text>
            <text x="185" y="39" fill="#fbbf24" font-size="10" font-weight="600">
              ${!c&&n.isValid?`${t.predictedCurrent}: ${r(e.polarity===`forward`?n.predictedCurrent:0,e.locale)}`:`Pr: ${(n.resistorPower*1e3).toFixed(2)} mW`}
            </text>
          </g>
        </svg>
      </div>
    `,this.bindSchematicEvents()}renderLoadElement(e,t,n,r,i,a,o,s){if(e.currentLessonId===`conductors-insulators`){let t=d[e.materialId];return`
        <g transform="translate(440, 90)">
          <!-- Alligator Clip Left & Right -->
          <polygon points="-8,-8 8,-3 8,3 -8,8" fill="#dc2626" />
          <polygon points="62,-3 78,-8 78,8 62,3" fill="#1e293b" stroke="#94a3b8" />
          <!-- Material Specimen Bar -->
          <rect x="5" y="-11" width="60" height="22" rx="4" fill="${t.colorHex}" stroke="#f8fafc" stroke-width="1.5" />
          <text x="35" y="-19" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">${t.names[e.locale]}</text>
          <!-- Indicator LED on Right Branch -->
          <g transform="translate(125, 65)">
            ${n?`<circle cx="0" cy="0" r="${a*.85}" fill="url(#ledGlow)" />`:``}
            <circle cx="0" cy="0" r="14" fill="${n?`#ef4444`:`#334155`}" stroke="#f43f5e" stroke-width="2" />
            <text x="-22" y="4" fill="#f8fafc" font-size="10" text-anchor="end">LED</text>
          </g>
        </g>
      `}if(e.currentLessonId===`ohms-law-resistor`)return`
        <g transform="translate(440, 90)">
          <line x1="0" y1="0" x2="80" y2="0" class="wire" />
          <circle cx="40" cy="0" r="20" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5" />
          <text x="40" y="5" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">A</text>
          <text x="40" y="34" fill="#cbd5e1" font-size="10.5" text-anchor="middle">Ammeter</text>
        </g>
      `;let c=r?24:46,l=r?46:24,u=r?10:62;return`
      <g id="schematic-led" class="clickable-part" transform="translate(440, 90)" tabindex="0" role="button" aria-label="${e.polarity===`forward`?t.polarityForward:t.polarityReverse}">
        <rect x="-15" y="-55" width="110" height="115" fill="transparent" />
        ${n?`
          <circle cx="38" cy="-14" r="${a}" fill="url(#ledGlow)" />
        `:``}

        <!-- Metallic Leads Entering Base -->
        <line x1="0" y1="0" x2="24" y2="0" stroke="#cbd5e1" stroke-width="3.5" />
        <line x1="52" y1="0" x2="80" y2="0" stroke="#cbd5e1" stroke-width="3.5" />
        <line x1="24" y1="0" x2="24" y2="-16" stroke="#cbd5e1" stroke-width="3" />
        <line x1="52" y1="0" x2="52" y2="-16" stroke="#cbd5e1" stroke-width="3" />

        <!-- Realistic 5mm Epoxy Dome Outline -->
        <path d="M 14 -6 L 14 -24 A 24 24 0 0 1 62 -24 L 62 -6 Z"
              fill="${n?i:`#334155`}"
              fill-opacity="${n?`0.88`:`0.55`}"
              stroke="${i}" stroke-width="2.5" />

        <!-- Flange Rim at Base with Flat Cathode Edge -->
        <rect x="10" y="-6" width="56" height="6" rx="2" fill="${i}" opacity="0.85" />
        <rect x="${u}" y="-8" width="4" height="10" fill="#f8fafc" />

        <!-- Internal Leadframe: Post (Anode +) and Anvil Reflector Cup (Cathode -) -->
        <line x1="${l}" y1="-6" x2="${l}" y2="-20" stroke="#e2e8f0" stroke-width="2.5" />
        <polygon points="${c-6},-6 ${c+6},-6 ${c+8},-22 ${c-4},-22" fill="#cbd5e1" />
        ${n?`<circle cx="${c}" cy="-22" r="4.5" fill="#fef08a" />`:``}

        <!-- Schematic Diode Symbol Overlay Below Leads -->
        ${r?`
          <line x1="24" y1="6" x2="24" y2="20" stroke="${i}" stroke-width="2.5" />
          <polygon points="50,6 24,13 50,20" fill="${n?i:`#64748b`}" />
        `:`
          <polygon points="24,6 50,13 24,20" fill="${n?i:`#64748b`}" />
          <line x1="50" y1="6" x2="50" y2="20" stroke="${i}" stroke-width="2.5" />
        `}

        <!-- Anode / Cathode Terminal labels (Cleanly outside dome) -->
        <text x="4" y="-28" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="end">${o}</text>
        <text x="72" y="-28" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="start">${s}</text>

        <rect x="-8" y="25" width="92" height="22" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="38" y="40" fill="#e2e8f0" font-size="10.5" font-weight="bold" text-anchor="middle">${e.polarity===`forward`?t.polarityFwdShort:t.polarityRevShort}</text>
      </g>
    `}renderBreadboard2D(e,t,n,a){let o=h(e.breadboardPreset,e.voltage,e.resistance,e.forwardVoltage,e.power),s=Array.from({length:16},(e,t)=>t+3),c=[`A`,`B`,`C`,`D`,`E`],l=[`F`,`G`,`H`,`I`,`J`],u=e=>115+(e-3)*28,d=e=>{let t=c.indexOf(e);return t===-1?190+l.indexOf(e)*18:68+t*18},f={c:12,r:`B`},p={c:12,r:`C`},m={c:16,r:`C`},g={c:16,r:`E`};e.breadboardPreset===`shorted-same-strip`?(p={c:12,r:`C`},m={c:12,r:`D`},g={c:12,r:`E`}):e.breadboardPreset===`open-center-gap`?(f={c:12,r:`E`},p={c:12,r:`F`},m={c:16,r:`F`},g={c:16,r:`J`}):e.breadboardPreset===`misaligned-row`&&(f={c:12,r:`B`},p={c:13,r:`C`},m={c:16,r:`C`},g={c:16,r:`E`});let _=u(5),v=d(`B`),y=u(f.c),b=d(f.r),x=u(p.c),S=d(p.r),C=u(m.c),w=d(m.r),T=u(g.c),E=d(g.r),D=o.ledLit?Math.max(.55,2-o.ledCurrent/.025*1.4).toFixed(2):`0`;this.container.innerHTML=`
      <div class="schematic-wrapper" style="position: relative; width: 100%;">
        <svg viewBox="0 0 640 350" class="schematic-svg" role="img" aria-label="${t.view2D}">
          <defs>
            <style>
              .active-wire { stroke: #10b981; stroke-width: 4.5; fill: none; stroke-linecap: round; stroke-dasharray: 8 8; }
              @keyframes dash {
                to { stroke-dashoffset: -32; }
              }
              .anim-flow {
                animation: dash ${D}s linear infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .anim-flow { animation: none; }
              }
            </style>
          </defs>
          <rect width="640" height="350" rx="14" fill="#0b1329" />

          <!-- Breadboard ABS Plastic Body -->
          <rect x="75" y="16" width="525" height="276" rx="12" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />

          <!-- Top Power Rail (+ Red) and Bottom Ground Rail (- Blue) -->
          <line x1="95" y1="34" x2="580" y2="34" stroke="#ef4444" stroke-width="3" />
          <text x="86" y="38" fill="#ef4444" font-size="13" font-weight="bold">+</text>
          <line x1="95" y1="276" x2="580" y2="276" stroke="#2563eb" stroke-width="3" />
          <text x="86" y="280" fill="#2563eb" font-size="13" font-weight="bold">−</text>

          <!-- Center IC Trench Ravine -->
          <rect x="77" y="150" width="521" height="24" fill="#cbd5e1" />
          <text x="338" y="166" fill="#475569" font-size="10" font-weight="bold" text-anchor="middle">${e.locale===`th`?`ร่องกลางแยกฝั่ง (แยกแถบ A–E ออกจาก F–J)`:`CENTER TRENCH GAP (Isolates A–E from F–J)`}</text>

          <!-- X-Ray Internal Conductive 5-Hole Strips -->
          ${s.map(t=>{let n=u(t),r=t===5||t===12||t===16&&e.breadboardPreset===`valid-series`,i=t===12&&e.breadboardPreset===`shorted-same-strip`,a=t===13&&e.breadboardPreset===`misaligned-row`,o=i?`#ef4444`:a?`#f59e0b`:r?`#10b981`:`#94a3b8`,s=r||i||a?.45:.22,f=(t===12||t===16)&&e.breadboardPreset===`open-center-gap`,p=f?`#f59e0b`:`#94a3b8`,m=f?.45:.22;return`
              <text x="${n}" y="55" fill="#475569" font-size="9.5" font-weight="bold" text-anchor="middle">${t}</text>
              <rect x="${n-6}" y="62" width="12" height="82" rx="4" fill="${o}" opacity="${s}" />
              <rect x="${n-6}" y="184" width="12" height="82" rx="4" fill="${p}" opacity="${m}" />
              ${c.map(e=>`<rect x="${n-3}" y="${d(e)-3}" width="6" height="6" rx="1" fill="#334155" />`).join(``)}
              ${l.map(e=>`<rect x="${n-3}" y="${d(e)-3}" width="6" height="6" rx="1" fill="#334155" />`).join(``)}
            `}).join(``)}

          <!-- Row Letters A-E and F-J -->
          ${c.map(e=>`<text x="95" y="${d(e)+4}" fill="#475569" font-size="10" font-weight="bold">${e}</text>`).join(``)}
          ${l.map(e=>`<text x="95" y="${d(e)+4}" fill="#475569" font-size="10" font-weight="bold">${e}</text>`).join(``)}

          <!-- Battery Left Side + Power Jumper Wires -->
          <rect x="12" y="95" width="48" height="90" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <text x="36" y="144" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">${i(e.voltage)}</text>
          <!-- Red wire to Col 5 Row A -->
          <path d="M 36 95 L 36 34 L ${u(5)} 34 L ${u(5)} ${d(`A`)}" stroke="#ef4444" stroke-width="4" fill="none" stroke-linecap="round" />
          <!-- Blue return wire from returnStartHole to Minus rail -->
          <path d="M ${T} ${E} L ${T} 276 L 36 276 L 36 185" stroke="#2563eb" stroke-width="4" fill="none" stroke-linecap="round" />

          <!-- Realistic Resistor on Breadboard (B5 to resEndHole) -->
          <line x1="${_}" y1="${v}" x2="${y}" y2="${b}" stroke="#cbd5e1" stroke-width="3.5" />
          <g transform="translate(${(_+y)/2}, ${(v+b)/2})">
            <rect x="-32" y="-9" width="64" height="18" rx="6" fill="#fde68a" stroke="#b45309" stroke-width="1.5" />
            <rect x="-20" y="-9" width="5" height="18" fill="${a[0].hex}" />
            <rect x="-10" y="-9" width="5" height="18" fill="${a[1].hex}" />
            <rect x="0" y="-9" width="5" height="18" fill="${a[2].hex}" />
            <rect x="14" y="-9" width="5" height="18" fill="${a[3].hex}" />
          </g>

          <!-- Realistic LED on Breadboard (ledAnodeHole to ledCathodeHole) -->
          <line x1="${x}" y1="${S}" x2="${(x+C)/2-6}" y2="${(S+w)/2-18}" stroke="#cbd5e1" stroke-width="3" />
          <line x1="${C}" y1="${w}" x2="${(x+C)/2+6}" y2="${(S+w)/2-18}" stroke="#cbd5e1" stroke-width="3" />
          <g transform="translate(${(x+C)/2}, ${(S+w)/2-24})">
            ${o.ledLit?`<circle cx="0" cy="0" r="28" fill="#ef4444" opacity="0.45" />`:``}
            <circle cx="0" cy="0" r="14" fill="${o.ledLit?`#ef4444`:`#64748b`}" stroke="#991b1b" stroke-width="2" />
            <text x="0" y="4" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">LED</text>
          </g>

          <!-- Dynamic Current Flow Animation Overlay (Conventional Current + to -) -->
          ${o.ledLit?`
            <path d="M 36 95 L 36 34 L ${u(5)} 34 L ${u(5)} ${d(`B`)} L ${y} ${b} L ${x} ${S} L ${(x+C)/2} ${(S+w)/2-20} L ${C} ${w} L ${T} ${E} L ${T} 276 L 36 276 L 36 185" class="active-wire anim-flow" />
          `:``}

          <!-- Bottom DMM Summary Bar -->
          <g transform="translate(155, 300)">
            <rect x="0" y="0" width="350" height="42" rx="8" fill="#1e293b" stroke="#475569" />
            <text x="16" y="26" fill="#6ee7b7" font-size="12" font-weight="bold">
              I(LED): ${r(o.ledCurrent,e.locale)} · I(R): ${r(o.resistorCurrent,e.locale)}
            </text>
          </g>
        </svg>
      </div>
    `}bindSchematicEvents(){let e=this.container.querySelector(`#schematic-switch`);e&&(e.addEventListener(`click`,()=>y.togglePower()),e.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),y.togglePower())}));let t=this.container.querySelector(`#schematic-led`);t&&(t.addEventListener(`click`,()=>y.togglePolarity()),t.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),y.togglePolarity())}));let n=this.container.querySelector(`#schematic-wire`);n&&(n.addEventListener(`click`,()=>y.toggleWireConnected()),n.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),y.toggleWireConnected())}))}},S=`modulepreload`,C=function(e,t){return new URL(e,t).href},w={},T=function(e){return e.pathname.endsWith(`.css`)},E=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},D=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=C(t,n);let r=s(t),i=T(r);return E(w,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:S,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},O=class{root;schematicView=null;benchView=null;activeTab=`inquiry`;constructor(e){this.root=e,y.subscribe(e=>this.render(e))}init(){this.render(y.getState())}getStatusInfo(e,t,n){return n.isValid?e.currentLessonId===`open-closed-circuit`&&!e.wireConnected?{statusClass:`status-warn`,statusText:t.statusWireBroken}:e.power?e.currentLessonId===`conductors-insulators`?d[e.materialId].category===`insulator`?{statusClass:`status-warn`,statusText:t.statusInsulatorBlocked}:{statusClass:`status-success`,statusText:t.statusConducting}:e.currentLessonId===`breadboard-connectivity`?e.breadboardPreset===`shorted-same-strip`?{statusClass:`status-danger`,statusText:t.statusShortedStrip}:e.breadboardPreset===`open-center-gap`?{statusClass:`status-warn`,statusText:t.statusOpenTrench}:e.breadboardPreset===`misaligned-row`?{statusClass:`status-warn`,statusText:t.statusMisalignedRow}:{statusClass:`status-success`,statusText:t.statusConducting}:n.isOvercurrent?{statusClass:`status-danger`,statusText:t.statusOvercurrent}:n.isReverseBiased?{statusClass:`status-warn`,statusText:t.statusReverseBiased}:n.isBelowThreshold?{statusClass:`status-warn`,statusText:t.statusBelowThreshold}:n.actualCurrent>0?{statusClass:`status-success`,statusText:t.statusConducting}:{statusClass:`status-off`,statusText:t.statusPowerOff}:{statusClass:`status-off`,statusText:t.statusPowerOff}:{statusClass:`status-danger`,statusText:t.statusInvalid}}render(e){let t=b[e.locale],n=y.getCurrentLesson(),r=y.getSimulationResult(),i=e.progressMap[n.id]||{level:`visited`};!e.teacherMode&&this.activeTab===`teacher`&&(this.activeTab=`inquiry`);let{statusClass:a,statusText:o}=this.getStatusInfo(e,t,r),s=typeof document<`u`&&!!document.fullscreenElement,c=_.filter(t=>e.progressMap[t.id]?.level===`completed`).length;this.root.innerHTML=`
      <div class="app-layout ${e.teacherMode?`teacher-mode-active`:``}">
        <!-- TOP NAVIGATION BAR -->
        <header class="app-header">
          <div class="header-left">
            <a href="../../index.html" class="btn-nav home-link" title="${t.homeLink}" aria-label="${t.homeLink}">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span class="home-link-label">${t.homeLink}</span>
            </a>

            <div class="brand">
              <span class="brand-icon" aria-hidden="true">⚡</span>
              <div>
                <h1 class="brand-title">${t.siteTitle} <span class="badge badge-neutral" style="font-size: 0.75rem; margin-left: 6px;">${c}/${_.length}</span></h1>
                <div class="brand-meta">
                  <span class="brand-subtitle">${n.titles[e.locale]}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="header-actions">
            <!-- Language toggle -->
            <div class="lang-switch" role="group" aria-label="Language">
              <button class="btn-toggle ${e.locale===`th`?`active`:``}" id="btn-lang-th" type="button">ไทย</button>
              <button class="btn-toggle ${e.locale===`en`?`active`:``}" id="btn-lang-en" type="button">EN</button>
            </div>

            <!-- View mode toggle (2D / 3D) -->
            <div class="view-switch" role="group" aria-label="${t.view2D} / ${t.view3D}">
              <button class="btn-toggle ${e.viewMode===`schematic`?`active`:``}" id="btn-view-2d" type="button">2D</button>
              <button class="btn-toggle ${e.viewMode===`bench`?`active`:``}" id="btn-view-3d" type="button">3D</button>
            </div>

            <!-- Teacher mode toggle -->
            <button class="btn-nav ${e.teacherMode?`btn-teacher-active`:``}" id="btn-teacher-toggle" type="button">
              ${e.teacherMode?t.exitTeacherMode:t.teacherMode}
            </button>

            <!-- Theme toggle (Dark / Light) -->
            <button class="btn-nav btn-icon-nav" id="btn-theme-toggle" type="button" title="${t.themeToggle}" aria-label="${t.themeToggle}">
              ${e.theme===`dark`?`
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
                </svg>
              `:`
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              `}
            </button>

            <!-- Fullscreen toggle -->
            <button class="btn-nav btn-fullscreen" id="btn-fullscreen-toggle" type="button" title="${s?t.exitFullscreen:t.fullscreen}" aria-label="${s?t.exitFullscreen:t.fullscreen}">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                ${s?`
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9L4 4m0 0v4m0-4h4m7 5l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4m7-5l5 5m0 0v-4m0 4h-4"></path>
                `:`
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4h4m8 0h4v4m0 8v4h-4M8 20H4v-4"></path>
                `}
              </svg>
              <span class="fullscreen-label">${s?t.exitFullscreen:t.fullscreen}</span>
            </button>
          </div>
        </header>

        <!-- P1 6-LESSON PILOT NAVIGATION BAR -->
        <nav class="lesson-strip" aria-label="${t.navLessons}">
          ${_.map(t=>{let n=e.progressMap[t.id]?.level===`completed`;return`
              <button type="button" class="lesson-pill ${!e.routeNotFound&&t.id===e.currentLessonId?`active`:``} ${n?`done`:``}" data-lesson-id="${t.id}">
                <span>${n?`✓ `:``}${t.titles[e.locale]}</span>
              </button>
            `}).join(``)}
        </nav>

        ${e.routeNotFound?this.renderUnknownRoute(e,t):`
          <!-- MAIN LAB CONTENT -->
          <main class="lab-main">
            <!-- LEFT COLUMN: CIRCUIT CANVAS & HARDWARE CONTROLS -->
            <section class="experiment-column">
              <div class="experiment-card">
                <div class="viewport-header">
                  <span class="viewport-title">${e.viewMode===`schematic`?t.view2D:t.view3D}</span>
                  <div class="progress-badges">
                    <span class="badge ${i.level===`completed`?`badge-success`:`badge-neutral`}">
                      ${i.level===`completed`?`✓ `+t.progressCompleted:i.level===`experimented`?`⚙ `+t.progressExperimented:`👁 `+t.progressVisited}
                    </span>
                    ${i.isCorrect?`<span class="badge badge-success">★ ${t.progressCorrect}</span>`:``}
                  </div>
                </div>

                <!-- Viewport Container (Schematic or 3D) -->
                <div id="viewport-canvas-mount" class="viewport-mount"></div>

                <!-- Status Banner -->
                <div class="status-banner ${a}" role="status" aria-live="polite">
                  <span class="status-icon" aria-hidden="true">${a===`status-success`?`●`:`▲`}</span>
                  <span>${o}</span>
                </div>

                <!-- Quick Hardware Controls -->
                ${this.renderHardwareControls(e,t)}
              </div>
            </section>

            <!-- RIGHT COLUMN: GUIDED INQUIRY TABS -->
            <section class="inquiry-column">
              <div class="inquiry-card">
                <nav class="inquiry-tabs" role="tablist">
                  <button class="tab-btn ${this.activeTab===`inquiry`?`active`:``}" id="tab-btn-inquiry" role="tab" type="button" aria-selected="${this.activeTab===`inquiry`}">
                    🧪 ${t.tabExperiment}
                  </button>
                  <button class="tab-btn ${this.activeTab===`overview`?`active`:``}" id="tab-btn-overview" role="tab" type="button" aria-selected="${this.activeTab===`overview`}">
                    📖 ${t.tabOverview}
                  </button>
                  <button class="tab-btn ${this.activeTab===`maths`?`active`:``}" id="tab-btn-maths" role="tab" type="button" aria-selected="${this.activeTab===`maths`}">
                    🔢 ${t.tabMaths}
                  </button>
                  ${e.teacherMode?`
                    <button class="tab-btn tab-teacher ${this.activeTab===`teacher`?`active`:``}" id="tab-btn-teacher" role="tab" type="button" aria-selected="${this.activeTab===`teacher`}">
                      🎓 ${t.tabTeacher}
                    </button>
                  `:``}
                </nav>

                <div class="tab-body">
                  ${this.renderTabContent(e,t,n,r,i)}
                </div>
              </div>
            </section>
          </main>
        `}

        <!-- OFFICIAL PERSONAL WEBSITE FOOTER -->
        <footer class="app-footer">
          <div class="footer-container">
            <div class="footer-social">
              <a href="https://www.linkedin.com/in/apisit-tongchai-3043092a3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.facebook.com/tongchai.apisit/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@DrApisitTongchai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://github.com/apisit-man" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
              </a>
            </div>
            <p class="footer-credit">
              ${t.footerDevelopedBy} <a href="../../about.html" class="footer-author-link">${t.footerAuthorName}</a> · ${t.footerRole}
            </p>
            <p class="footer-copyright">
              ${t.footerCopyright} <a href="https://apisit-man.github.io" class="footer-site-link">apisit-man.github.io</a>
            </p>
          </div>
        </footer>
      </div>
    `,e.routeNotFound||this.mountViewport(e),this.bindEvents(e,t)}renderHardwareControls(e,t){let n=l(e.resistance).map(t=>`
      <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 4px; background: #0f172a; border: 1px solid #334155; font-size: 0.78rem;">
        <span style="width: 10px; height: 10px; border-radius: 50%; background: ${t.hex}; display: inline-block; border: 1px solid rgba(255,255,255,0.3);"></span>
        ${e.locale===`th`?t.nameTh:t.nameEn}
      </span>
    `).join(``),r=`
      <button id="ctrl-polarity-btn" type="button" class="ctrl-btn ctrl-polarity">
        🔄 ${e.polarity===`forward`?t.polarityForward:t.polarityReverse}
      </button>
    `;return e.currentLessonId===`open-closed-circuit`?r=`
        <button id="ctrl-wire-btn" type="button" class="ctrl-btn ${e.wireConnected?`ctrl-polarity`:`ctrl-power-off`}">
          🔌 ${e.wireConnected?t.wireConnected:t.wireDisconnected}
        </button>
      `:(e.currentLessonId===`ohms-law-resistor`||e.currentLessonId===`conductors-insulators`||e.currentLessonId===`breadboard-connectivity`)&&(r=``),`
      <div class="hardware-controls">
        <div class="control-row" style="${r?``:`grid-template-columns: 1fr;`}">
          <button id="ctrl-power-btn" type="button" class="ctrl-btn ${e.power?`ctrl-power-on`:`ctrl-power-off`}" aria-pressed="${e.power}">
            ${e.power?`🟢 `+t.powerOn:`⚪ `+t.powerOff}
          </button>
          ${r}
        </div>

        <!-- Lesson 2: Material Selector -->
        ${e.currentLessonId===`conductors-insulators`?`
          <div class="material-selector">
            <label style="font-size: 0.88rem; color: var(--text-muted); display: block; margin-bottom: 6px;">${t.materialLabel}</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${Object.keys(d).map(t=>{let n=d[t];return`
                  <button type="button" class="btn-toggle ${e.materialId===t?`active`:``}" data-material-id="${t}" style="border: 1px solid var(--border-color);">
                    ${n.names[e.locale]}
                  </button>
                `}).join(``)}
            </div>
          </div>
        `:``}

        <!-- Lesson 5: LED Color Selector -->
        ${e.currentLessonId===`current-limiting-resistor`?`
          <div class="led-color-selector">
            <label style="font-size: 0.88rem; color: var(--text-muted); display: block; margin-bottom: 6px;">${t.ledColorLabel}</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${Object.keys(m).map(t=>{let n=m[t];return`
                  <button type="button" class="btn-toggle ${e.ledColor===t?`active`:``}" data-led-color="${t}" style="border: 1px solid var(--border-color);">
                    ${n.names[e.locale]}
                  </button>
                `}).join(``)}
            </div>
          </div>
        `:``}

        <!-- Lesson 6: Breadboard Wiring Preset Selector -->
        ${e.currentLessonId===`breadboard-connectivity`?`
          <div class="breadboard-preset-selector">
            <label style="font-size: 0.88rem; color: var(--text-muted); display: block; margin-bottom: 6px;">${t.breadboardPresetLabel}</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
              <button type="button" class="btn-toggle ${e.breadboardPreset===`valid-series`?`active`:``}" data-bb-preset="valid-series" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetValidSeries}
              </button>
              <button type="button" class="btn-toggle ${e.breadboardPreset===`shorted-same-strip`?`active`:``}" data-bb-preset="shorted-same-strip" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetShortedStrip}
              </button>
              <button type="button" class="btn-toggle ${e.breadboardPreset===`open-center-gap`?`active`:``}" data-bb-preset="open-center-gap" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetOpenGap}
              </button>
              <button type="button" class="btn-toggle ${e.breadboardPreset===`misaligned-row`?`active`:``}" data-bb-preset="misaligned-row" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetMisaligned}
              </button>
            </div>
          </div>
        `:``}

        <!-- Parameter Sliders -->
        <div class="slider-group">
          <div class="slider-item">
            <label for="voltage-range">
              <span>${t.supplyVoltage}:</span>
              <strong id="voltage-readout">${i(e.voltage)}</strong>
            </label>
            <input type="range" id="voltage-range" min="1.5" max="6.0" step="1.5" value="${e.voltage}">
          </div>

          <div class="slider-item">
            <label for="resistor-range">
              <span>${t.resistor}:</span>
              <strong id="resistor-readout">${a(e.resistance)}</strong>
            </label>
            <input type="range" id="resistor-range" min="100" max="1000" step="100" value="${e.resistance}">
          </div>
        </div>

        <!-- Live EIA 4-Band Color Code Strip -->
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span style="font-size: 0.8rem; color: var(--text-muted);">${t.colorBandsLabel}</span>
          ${n}
        </div>

        <!-- Action Footer -->
        <div class="control-actions">
          <button id="btn-reset-exp" type="button" class="btn-subtle">↺ ${t.resetExperiment}</button>
          <button id="btn-reset-all" type="button" class="btn-subtle btn-danger">🗑 ${t.resetAllProgress}</button>
        </div>
      </div>
    `}renderUnknownRoute(e,t){return`
      <main class="lab-main" style="grid-template-columns: 1fr;">
        <section class="experiment-card">
          <h2>⚠️ ${t.unknownRouteTitle}</h2>
          <p class="muted">${t.unknownRouteDesc}</p>

          <h3 style="margin-top: 12px;">${t.availableLessonsTitle}</h3>
          <div class="control-row">
            ${_.map(n=>`
              <div class="step-card" style="justify-content: space-between; align-items: center;">
                <div>
                  <h4>${n.titles[e.locale]}</h4>
                  <p class="muted">${n.subtitles[e.locale]}</p>
                </div>
                <a href="?lang=${e.locale}#/${n.id}" class="btn-step btn-primary" style="text-decoration: none; display: inline-flex; align-items: center;">
                  ${t.openLessonBtn}
                </a>
              </div>
            `).join(``)}
          </div>

          <h3 style="margin-top: 16px;">${t.deferredLessonsTitle}</h3>
          <div style="display: grid; gap: 10px;">
            ${g.map(n=>`
              <div class="step-card" style="justify-content: space-between; align-items: center; opacity: 0.75;">
                <span>${n.titles[e.locale]}</span>
                <span class="badge badge-neutral">${n.stage} · ${t.deferredBadge}</span>
              </div>
            `).join(``)}
          </div>
        </section>
      </main>
    `}renderTabContent(e,t,n,o,s){if(this.activeTab===`overview`)return`
        <div class="tab-overview-content prose">
          <h3>${n.titles[e.locale]}</h3>
          <p class="lead">${n.subtitles[e.locale]}</p>
          <div class="objectives-box" style="margin: 12px 0; padding: 14px; background: var(--bg-card); border-radius: 10px;">
            <strong>🎯 ${t.learningObjectives}</strong>
            <ul style="margin-top: 8px; padding-left: 20px;">
              ${n.objectives[e.locale].map(e=>`<li>${e}</li>`).join(``)}
            </ul>
          </div>
          <div class="content-text">${n.overviewContent[e.locale].replace(/\n\n/g,`<br><br>`)}</div>

          <div class="formula-card" style="margin-top: 16px;">
            <h4>🔍 ${t.realisticAnatomyTitle}</h4>
            <ul style="padding-left: 18px; display: grid; gap: 8px; font-size: 0.9rem;">
              <li>${t.realisticLedNote}</li>
              <li>${t.realisticResistorNote}</li>
              <li>${t.realisticBreadboardNote}</li>
            </ul>
          </div>
        </div>
      `;if(this.activeTab===`maths`){let n=e.voltage,s=e.forwardVoltage,c=e.resistance,l=o.kvlSatisfied&&o.actualCurrent>0,u=p({voltage:n,resistance:c,power:e.power});return`
        <div class="tab-maths-content">
          <h3>${t.tabMaths}</h3>
          <p class="muted" style="font-size: 0.9rem; margin-bottom: 12px;">${t.modelLimitationsNote}</p>

          <div class="formula-card">
            <h4>${t.mathsKvlTitle}</h4>
            <div class="formula-equation">
              <code>${e.currentLessonId===`ohms-law-resistor`||e.currentLessonId===`open-closed-circuit`?`Vs = Vr + Vgap`:`Vs = Vr + Vf`}</code>
            </div>
            <p>${t.mathsKvlDesc}</p>
            <div class="calc-steps">
              <div>${t.supplyVoltage} (Vs): <strong>${i(n)}</strong></div>
              <div>${t.resistorVoltage}: <strong>${i(o.resistorVoltage)}</strong></div>
              <div>${e.currentLessonId===`open-closed-circuit`?t.gapVoltage:t.ledVoltage}: <strong>${i(o.ledVoltage)}</strong></div>
            </div>
          </div>

          <div class="formula-card">
            <h4>${t.mathsOhmTitle}</h4>
            <div class="formula-equation">
              <code>${s>0?`I = (Vs − Vf) / R`:`I = Vs / R`}</code>
            </div>
            ${l?`
              <div class="calc-steps">
                <div>${t.mathsSubstitute} I = (${n.toFixed(1)} V − ${s.toFixed(1)} V) / ${c} Ω = ${(n-s).toFixed(1)} V / ${c} Ω</div>
                <div class="highlight-result">${t.mathsResultCurrent} <strong>${r(o.actualCurrent,e.locale)}</strong> (${o.actualCurrent.toFixed(7)} A)</div>
              </div>
            `:`
              <div class="calc-steps muted">
                <div><em>${t.mathsNonConducting}</em></div>
                <div>${t.mathsPredictedWhenOn} <strong>${r(o.predictedCurrent,e.locale)}</strong></div>
                <div style="font-size: 0.85rem; margin-top: 6px;">${t.mathsZeroCurrentNote}</div>
              </div>
            `}
          </div>

          <!-- SVG I-V Linear Plot -->
          <div class="formula-card">
            <h4>📈 I–V Relationship (R = ${a(c)})</h4>
            <svg viewBox="0 0 320 120" style="width: 100%; height: auto; background: #0b1329; border-radius: 8px; margin-top: 6px;">
              <line x1="40" y1="15" x2="40" y2="95" stroke="#475569" stroke-width="1.5" />
              <line x1="40" y1="95" x2="295" y2="95" stroke="#475569" stroke-width="1.5" />
              <polyline fill="none" stroke="#14b8a6" stroke-width="2.5"
                points="${u.curvePoints.map(e=>`${40+e.v/6*240},${95-Math.min(75,e.iMilliAmps/60*75)}`).join(` `)}" />
              <circle cx="${40+n/6*240}" cy="${95-Math.min(75,o.actualCurrent*1e3/60*75)}" r="5" fill="#fbbf24" />
              <text x="165" y="112" fill="#94a3b8" font-size="9.5" text-anchor="middle">V (0 – 6.0 V)</text>
              <text x="12" y="58" fill="#94a3b8" font-size="9.5">I(mA)</text>
            </svg>
          </div>

          <div class="formula-card">
            <h4>${t.mathsPowerTitle}</h4>
            <div class="formula-equation">
              <code>Pr = I² × R = Vr × I</code>
            </div>
            <div class="calc-steps">
              <div>${t.mathsPowerResult} <strong>${(o.resistorPower*1e3).toFixed(2)} mW</strong></div>
            </div>
          </div>
        </div>
      `}if(this.activeTab===`teacher`)return`
        <div class="tab-teacher-content">
          <div class="teacher-banner">
            <h3>🎓 ${t.tabTeacher}</h3>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button id="btn-reveal-answers" type="button" class="btn-action">
                ${e.teacherRevealAnswers?t.teacherHideAnswers:t.teacherRevealAnswers}
              </button>
              <button id="btn-print-sheet" type="button" class="btn-action">🖨 ${t.printWorksheet}</button>
            </div>
          </div>

          ${e.teacherRevealAnswers?`
            <div class="teacher-section">
              <h4>${t.teacherAnswerKey}</h4>
              <div class="answer-box">
                <p><strong>${n.titles[e.locale]}:</strong> ${n.inquiry.teacherAnswerSummary[e.locale]}</p>
                <p style="margin-top: 6px;">${t.teacherRubric}</p>
              </div>
            </div>
          `:``}

          <div class="teacher-section">
            <h4>${t.teacherPedagogicalNotes}</h4>
            <div class="notes-box">${n.teacherNotes[e.locale].replace(/\n/g,`<br>`)}</div>
          </div>
        </div>
      `;let c=n.inquiry,l=s.observedForward,u=s.observedReverse;return`
      <div class="inquiry-flow">
        <!-- Step 1: Predict -->
        <div class="step-card ${s.prediction?`step-completed`:`step-active`}">
          <div class="step-badge">1</div>
          <div class="step-content">
            <h4>${t.step1PredictTitle}</h4>
            <p>${c.predictQuestion[e.locale]}</p>

            <div class="predict-options">
              <label class="option-label">
                <input type="radio" name="predict-opt" value="A" ${s.prediction===`A`?`checked`:``}>
                <span>A. ${c.predictOptions.A[e.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="predict-opt" value="B" ${s.prediction===`B`?`checked`:``}>
                <span>B. ${c.predictOptions.B[e.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="predict-opt" value="C" ${s.prediction===`C`?`checked`:``}>
                <span>C. ${c.predictOptions.C[e.locale]}</span>
              </label>
            </div>

            <button id="btn-submit-predict" type="button" class="btn-step">
              ${s.prediction?`✓ `+t.predictionSubmitted:t.submitPrediction}
            </button>
          </div>
        </div>

        <!-- Step 2: Experiment -->
        <div class="step-card ${s.level===`experimented`||s.level===`completed`?`step-completed`:``}">
          <div class="step-badge">2</div>
          <div class="step-content">
            <h4>${t.step2ExperimentTitle}</h4>
            <p>${t.step2ExperimentHint}</p>
            <div class="experiment-checklist">
              ${c.experimentSteps.map((t,n)=>{let r=n===0?!!s.step1Done:!!s.step2Done;return`
                  <div class="check-item ${r?`checked`:``}">
                    ${r?`✓`:`○`} ${t[e.locale]}
                  </div>
                `}).join(``)}
            </div>
          </div>
        </div>

        <!-- Step 3: Observe -->
        <div class="step-card ${s.observed?`step-completed`:``}">
          <div class="step-badge">3</div>
          <div class="step-content">
            <h4>${t.step3ObserveTitle}</h4>
            <p>${t.step3ObservePrompt}</p>
            <table class="obs-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; margin: 6px 0;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                  <th style="padding: 6px;">${t.obsTableCondition}</th>
                  <th style="padding: 6px;">${t.obsTableCurrent}</th>
                  <th style="padding: 6px;">${t.obsTableLedState}</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 6px;">${c.obsRowLabels.row1[e.locale]}</td>
                  <td style="padding: 6px; font-family: monospace;">${l?r(l.current,e.locale):t.obsNotRecorded}</td>
                  <td style="padding: 6px;">${l?l.lit?t.obsLit:t.obsDark:t.obsNotRecorded}</td>
                </tr>
                <tr>
                  <td style="padding: 6px;">${c.obsRowLabels.row2[e.locale]}</td>
                  <td style="padding: 6px; font-family: monospace;">${u?r(u.current,e.locale):t.obsNotRecorded}</td>
                  <td style="padding: 6px;">${u?u.lit?t.obsLit:t.obsDark:t.obsNotRecorded}</td>
                </tr>
              </tbody>
            </table>
            <button id="btn-record-obs" type="button" class="btn-step">
              ${s.observed?`✓ `+t.observationRecorded:t.recordObservationBtn}
            </button>
          </div>
        </div>

        <!-- Step 4: Explain & Transfer -->
        <div class="step-card ${s.level===`completed`?`step-completed`:``}">
          <div class="step-badge">4</div>
          <div class="step-content">
            <h4>${t.step4ExplainTitle}</h4>
            <p>${c.transferQuestion[e.locale]}</p>
            <div class="predict-options">
              <label class="option-label">
                <input type="radio" name="transfer-opt" value="A" ${s.transferAnswer===`A`?`checked`:``}>
                <span>A. ${c.transferOptions.A[e.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="transfer-opt" value="B" ${s.transferAnswer===`B`?`checked`:``}>
                <span>B. ${c.transferOptions.B[e.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="transfer-opt" value="C" ${s.transferAnswer===`C`?`checked`:``}>
                <span>C. ${c.transferOptions.C[e.locale]}</span>
              </label>
            </div>
            ${s.transferAnswer?`
              <div class="status-banner ${s.transferAnswer===c.correctTransfer?`status-success`:`status-warn`}" style="font-size: 0.85rem;">
                ${s.transferAnswer===c.correctTransfer?c.transferFeedbackCorrect[e.locale]:c.transferFeedbackRetry[e.locale]}
              </div>
            `:``}

            <label for="explain-input" style="margin-top: 6px; font-weight: 600; font-size: 0.9rem;">${c.explainPrompt[e.locale]}</label>
            <textarea id="explain-input" class="explain-textarea" placeholder="${t.explainPlaceholder}" rows="3">${s.explanation||``}</textarea>
            <button id="btn-save-explain" type="button" class="btn-step btn-primary">
              ${s.level===`completed`?`✓ `+t.explanationSaved:t.saveExplanationBtn}
            </button>
          </div>
        </div>
      </div>
    `}mountViewport(e){let t=this.root.querySelector(`#viewport-canvas-mount`);if(!t)return;let n=b[e.locale];e.viewMode===`schematic`?(this.benchView&&=(this.benchView.dispose(),null),this.schematicView=new x(t),this.schematicView.render(e)):(this.schematicView&&=null,this.benchView&&=(this.benchView.dispose(),null),D(async()=>{let{BenchView:e}=await import(`./BenchView-CAlmKpWQ.js`);return{BenchView:e}},[],import.meta.url).then(({BenchView:e})=>{y.getState().viewMode===`bench`&&(this.benchView=new e(t),this.benchView.init(y.getState())&&this.benchView.update(y.getState()))}).catch(()=>{t.innerHTML=`
            <div class="webgl-fallback-box" style="background: #1e293b; color: #f8fafc; padding: 24px; border-radius: 12px; text-align: center;">
              <p style="margin-bottom: 14px; font-size: 15px;">⚠️ ${n.webglFallbackNotice}</p>
              <button id="switch-to-2d-fallback-btn" type="button" style="background: #0d9488; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; min-height: 44px;">
                ${n.switchTo2D}
              </button>
            </div>
          `,t.querySelector(`#switch-to-2d-fallback-btn`)?.addEventListener(`click`,()=>{y.setViewMode(`schematic`)})}))}bindEvents(e,t){this.root.querySelectorAll(`[data-lesson-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.lessonId;t&&y.selectLesson(t)})}),this.root.querySelector(`#btn-lang-th`)?.addEventListener(`click`,()=>y.setLocale(`th`)),this.root.querySelector(`#btn-lang-en`)?.addEventListener(`click`,()=>y.setLocale(`en`)),this.root.querySelector(`#btn-view-2d`)?.addEventListener(`click`,()=>y.setViewMode(`schematic`)),this.root.querySelector(`#btn-view-3d`)?.addEventListener(`click`,()=>y.setViewMode(`bench`)),this.root.querySelector(`#btn-teacher-toggle`)?.addEventListener(`click`,()=>y.toggleTeacherMode()),this.root.querySelector(`#btn-reveal-answers`)?.addEventListener(`click`,()=>y.toggleTeacherRevealAnswers()),this.root.querySelector(`#btn-theme-toggle`)?.addEventListener(`click`,()=>y.toggleTheme()),this.root.querySelector(`#btn-fullscreen-toggle`)?.addEventListener(`click`,()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),this.root.querySelector(`#ctrl-power-btn`)?.addEventListener(`click`,()=>y.togglePower()),this.root.querySelector(`#ctrl-polarity-btn`)?.addEventListener(`click`,()=>y.togglePolarity()),this.root.querySelector(`#ctrl-wire-btn`)?.addEventListener(`click`,()=>y.toggleWireConnected()),this.root.querySelectorAll(`[data-material-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.materialId;t&&y.setMaterialId(t)})}),this.root.querySelectorAll(`[data-led-color]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.ledColor;t&&y.setLedColor(t)})}),this.root.querySelectorAll(`[data-bb-preset]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.bbPreset;t&&y.setBreadboardPreset(t)})}),this.root.querySelector(`#voltage-range`)?.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);y.setVoltage(t)}),this.root.querySelector(`#resistor-range`)?.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);y.setResistance(t)}),this.root.querySelector(`#btn-reset-exp`)?.addEventListener(`click`,()=>y.resetExperiment()),this.root.querySelector(`#btn-reset-all`)?.addEventListener(`click`,()=>{confirm(t.confirmResetAll)&&y.resetAllProgress()}),this.root.querySelector(`#tab-btn-inquiry`)?.addEventListener(`click`,()=>{this.activeTab=`inquiry`,this.render(y.getState())}),this.root.querySelector(`#tab-btn-overview`)?.addEventListener(`click`,()=>{this.activeTab=`overview`,this.render(y.getState())}),this.root.querySelector(`#tab-btn-maths`)?.addEventListener(`click`,()=>{this.activeTab=`maths`,this.render(y.getState())}),this.root.querySelector(`#tab-btn-teacher`)?.addEventListener(`click`,()=>{this.activeTab=`teacher`,this.render(y.getState())}),this.root.querySelector(`#btn-submit-predict`)?.addEventListener(`click`,()=>{let e=this.root.querySelector(`input[name="predict-opt"]:checked`);e?y.submitPrediction(e.value):alert(t.selectPredictionAlert)}),this.root.querySelector(`#btn-record-obs`)?.addEventListener(`click`,()=>{y.recordObservation()}),this.root.querySelector(`#btn-save-explain`)?.addEventListener(`click`,()=>{let e=this.root.querySelector(`#explain-input`),n=this.root.querySelector(`input[name="transfer-opt"]:checked`);e&&e.value.trim().length>0&&n?y.saveExplanation(e.value.trim(),n.value):alert(t.enterExplanationAlert)}),this.root.querySelector(`#btn-print-sheet`)?.addEventListener(`click`,()=>{window.print()})}};function k(){let e=new URLSearchParams(window.location.search).get(`lang`);if(e&&(e===`th`||e===`en`)&&y.getState().locale!==e&&y.setLocale(e),!window.location.hash)window.location.hash=`#/led-polarity`,y.setRoute(`led-polarity`);else{let e=window.location.hash.replace(/^#\/?/,``);y.setRoute(e)}}window.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`app`);e&&(k(),window.addEventListener(`hashchange`,k),new O(e).init())});export{l as a,d as i,y as n,m as r,b as t};
//# sourceMappingURL=index-DBVGDdIY.js.map