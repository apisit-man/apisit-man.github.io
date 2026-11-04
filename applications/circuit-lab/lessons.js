export const examples = [
 {id:'basic',name:'One glowing bulb',nameTh:'วงจรหลอดไฟเดี่ยวครบวงจร',description:'A complete closed loop with a 6 V battery and one bulb.',descriptionTh:'วงจรปิดพื้นฐานประกอบด้วยแบตเตอรี่ 6 V และหลอดไฟ 1 ดวง',level:'Starter',levelTh:'เริ่มต้น'},
 {id:'series',name:'Two bulbs in series',nameTh:'หลอดไฟ 2 ดวงต่ออนุกรม (Series)',description:'Compare the current through both bulbs and their brightness.',descriptionTh:'เปรียบเทียบกระแสไฟฟ้าที่ไหลผ่านหลอดไฟทั้งสองดวงและความสว่าง',level:'Starter',levelTh:'เริ่มต้น'},
 {id:'parallel',name:'Two bulbs in parallel',nameTh:'หลอดไฟ 2 ดวงต่อขนาน (Parallel)',description:'Compare branch currents and potential difference.',descriptionTh:'เปรียบเทียบกระแสไฟฟ้าในแต่ละกิ่งและความต่างศักย์ตกคร่อม',level:'Explore',levelTh:'สำรวจ'},
 {id:'switch',name:'Switch control',nameTh:'การควบคุมวงจรด้วยสวิตช์',description:'Open and close the switch to control the bulb.',descriptionTh:'เปิดและปิดสวิตช์เพื่อควบคุมการไหลของกระแสไฟฟ้าในวงจร',level:'Starter',levelTh:'เริ่มต้น'},
 {id:'meters',name:'Measure current and voltage',nameTh:'การวัดกระแสและความต่างศักย์',description:'Ammeter in series; voltmeter across the bulb.',descriptionTh:'ต่อแอมมิเตอร์แบบอนุกรมและต่อโวลต์มิเตอร์คร่อมหลอดไฟแบบขนาน',level:'Explore',levelTh:'สำรวจ'},
 {id:'short',name:'Diagnose a short circuit',nameTh:'วิเคราะห์การลัดวงจร (Short Circuit)',description:'Find and repair an unsafe connection.',descriptionTh:'ค้นหาจุดที่มีสายไฟลัดวงจรและแก้ไขให้กระแสไหลผ่านหลอดไฟอย่างปลอดภัย',level:'Challenge',levelTh:'ท้าทาย'}
];
const c=(id,type,x,y,overrides={})=>({id,type,x,y,rotation:0,value:({battery:6,bulb:24,resistor:20}[type]||0),closed:false,...overrides});
const w=(id,from,to)=>({id,from,to});
export function makeExample(id){
 let components=[],wires=[];const add=(...cs)=>components.push(...cs);const link=(a,b)=>wires.push(w(`w${wires.length+1}`,a,b));
 if(id==='basic'){
  add(c('b1','battery',265,330),c('l1','bulb',710,330));link('b1:b','l1:a');link('l1:b','b1:a');
 }else if(id==='series'){
  add(c('b1','battery',220,330),c('l1','bulb',530,220),c('l2','bulb',800,330));link('b1:b','l1:a');link('l1:b','l2:a');link('l2:b','b1:a');
 }else if(id==='parallel'){
  add(c('b1','battery',180,325),c('l1','bulb',635,205),c('l2','bulb',635,430));
  link('b1:b','l1:a');link('b1:b','l2:a');link('b1:a','l1:b');link('b1:a','l2:b');
 }else if(id==='switch'){
  add(c('b1','battery',190,325),c('s1','switch',500,210,{closed:true}),c('l1','bulb',810,325));link('b1:b','s1:a');link('s1:b','l1:a');link('l1:b','b1:a');
 }else if(id==='meters'){
  add(c('b1','battery',155,330),c('a1','ammeter',380,210),c('l1','bulb',680,330),c('v1','voltmeter',680,505));link('b1:b','a1:a');link('a1:b','l1:a');link('l1:b','b1:a');link('v1:a','l1:a');link('v1:b','l1:b');
 }else if(id==='short'){
  add(c('b1','battery',370,330),c('l1','bulb',715,330));link('b1:b','l1:a');link('l1:b','b1:a');link('b1:a','b1:b');
 }
 return {components,wires};
}
export const challenges=[
 {name:'Light it up',nameTh:'ภารกิจที่ 1: จุดประกายแสงสว่าง',description:'Build a circuit that makes a bulb glow.',descriptionTh:'ต่อวงจรไฟฟ้าให้ครบวงจรเพื่อให้หลอดไฟสว่างขึ้น',check:(s,r)=>s.components.some(c=>c.type==='bulb'&&(r.readings[c.id]?.brightness||0)>0.05),hint:'Connect one battery and one bulb with two wires to form a loop.',hintTh:'คำใบ้: นำแบตเตอรี่ 1 ก้อนและหลอดไฟ 1 ดวงมาต่อสายไฟทั้งสองขั้วให้เป็นวงรอบปิด'},
 {name:'Series detectives',nameTh:'ภารกิจที่ 2: นักสืบวงจรอนุกรม',description:'Make two bulbs glow in series, with equal current through both.',descriptionTh:'ต่อหลอดไฟ 2 ดวงแบบอนุกรมให้สว่างทั้งคู่ โดยมีกระแสไฟฟ้าไหลผ่านเท่ากัน',check:(s,r)=>{const bs=s.components.filter(c=>c.type==='bulb'&&(r.readings[c.id]?.brightness||0)>0.03);if(bs.length!==2)return false;const roots=makeWireRoots(s);const a=[roots[`${bs[0].id}:a`],roots[`${bs[0].id}:b`]],b=[roots[`${bs[1].id}:a`],roots[`${bs[1].id}:b`]];return a.filter(x=>b.includes(x)).length===1&&Math.abs(Math.abs(r.readings[bs[0].id].current)-Math.abs(r.readings[bs[1].id].current))<0.001;},hint:'Place both bulbs on the same unbranched loop.',hintTh:'คำใบ้: ต่อหลอดไฟทั้งสองดวงเรียงกันในวงรอบเดียวโดยไม่แยกกิ่ง'},
 {name:'Parallel detectives',nameTh:'ภารกิจที่ 3: นักสืบวงจรขนาน',description:'Make two bulbs glow in parallel with the same voltage across each.',descriptionTh:'ต่อหลอดไฟ 2 ดวงแบบขนานให้สว่างทั้งคู่ โดยมีความต่างศักย์ตกคร่อมแต่ละหลอดเท่ากัน',check:(s,r)=>{const bs=s.components.filter(c=>c.type==='bulb'&&(r.readings[c.id]?.brightness||0)>0.03);if(bs.length!==2)return false;const a=bs[0],b=bs[1];const roots=makeWireRoots(s);const ra1=roots[`${a.id}:a`],ra2=roots[`${a.id}:b`],rb1=roots[`${b.id}:a`],rb2=roots[`${b.id}:b`];return ra1!==ra2&&((ra1===rb1&&ra2===rb2)||(ra1===rb2&&ra2===rb1))&&Math.abs(Math.abs(r.readings[a.id].voltage)-Math.abs(r.readings[b.id].voltage))<0.05;},hint:'Connect both left terminals together and both right terminals together.',hintTh:'คำใบ้: เชื่อมขั้วด้านหนึ่งของหลอดไฟทั้งสองเข้าด้วยกัน และเชื่อมขั้วอีกด้านเข้าด้วยกัน แล้วต่อเข้ากับแบตเตอรี่'},
 {name:'Control the flow',nameTh:'ภารกิจที่ 4: ควบคุมการไหลของกระแส',description:'Make a bulb glow with a closed switch included in the live path.',descriptionTh:'ต่อสวิตช์ในวงจรและสับสวิตช์ลง (CLOSED) เพื่อให้กระแสไหลผ่านสวิตช์และหลอดไฟสว่าง',check:(s,r)=>s.components.some(c=>c.type==='switch'&&c.closed&&Math.abs(r.readings[c.id]?.current||0)>0.01)&&s.components.some(c=>c.type==='bulb'&&(r.readings[c.id]?.brightness||0)>0.05),hint:'Put the switch in series, then click it to close.',hintTh:'คำใบ้: ต่อสวิตช์อนุกรมกับหลอดไฟ แล้วดับเบิลคลิกที่สวิตช์ (หรือกดปุ่มในแผงควบคุม) เพื่อปิดสวิตช์'},
 {name:'Measure it',nameTh:'ภารกิจที่ 5: วัดค่ากระแสไฟฟ้าจริง',description:'Make a bulb glow and get a nonzero reading on an ammeter.',descriptionTh:'ต่อวงจรให้หลอดไฟสว่าง พร้อมทั้งต่อแอมมิเตอร์เพื่อวัดค่ากระแสไฟฟ้าในวงจร',check:(s,r)=>s.components.some(c=>c.type==='ammeter'&&Math.abs(r.readings[c.id]?.current||0)>0.005)&&s.components.some(c=>c.type==='bulb'&&(r.readings[c.id]?.brightness||0)>0.05),hint:'Insert the ammeter in series with the bulb.',hintTh:'คำใบ้: แทรกแอมมิเตอร์ต่อแบบอนุกรมในเส้นทางเดียวกับหลอดไฟ'}
];
function makeWireRoots(s){const ids=s.components.flatMap(c=>[`${c.id}:a`,`${c.id}:b`]);const p=Object.fromEntries(ids.map(id=>[id,id]));const find=x=>p[x]===x?x:(p[x]=find(p[x]));for(const w of s.wires)if(p[w.from]&&p[w.to])p[find(w.from)]=find(w.to);for(const c of s.components)if(c.type==='ammeter'||(c.type==='switch'&&c.closed))p[find(`${c.id}:a`)]=find(`${c.id}:b`);return Object.fromEntries(ids.map(id=>[id,find(id)]));}
