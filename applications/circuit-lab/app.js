import {analyzeCircuit,COMPONENTS} from './solver.js';
import {examples,makeExample,challenges} from './lessons.js';

const $=id=>document.getElementById(id);
const svg=$('circuitCanvas'),NS='http://www.w3.org/2000/svg';
const blank=()=>({components:[],wires:[]});

let state=blank(),selected=null,pending=null,mode='select',drag=null,view={x:0,y:0,zoom:1},history=[],redo=[],result=null,toastTimer=null,animate=true,flowConvention='conventional';
let nextId=1;
let currentLang=localStorage.getItem('site_lang')||'th';

const I18N={
 th:{
  'nav.home':'หน้าแรก',
  'nav.title':'Circuit Lab · ปฏิบัติการวงจรไฟฟ้ากระแสตรง',
  'nav.subtitle':'ดร.อภิสิทธิ์ ธงไชย · คลังแบบจำลองฟิสิกส์เชิงโต้ตอบ',
  'nav.examples':'วงจรตัวอย่าง',
  'nav.challenges':'ภารกิจท้าทาย (5)',
  'nav.file':'ไฟล์ / ส่งออก',
  'breadcrumb.home':'หน้าแรก',
  'breadcrumb.science':'แบบจำลองวิทย์',
  'breadcrumb.current':'ปฏิบัติการวงจรไฟฟ้ากระแสตรง (DC Circuit Lab)',
  'hero.heading':'ห้องปฏิบัติการจำลองวงจรไฟฟ้ากระแสตรง (Interactive DC Circuit Simulator)',
  'tools.heading':'คลังอุปกรณ์ไฟฟ้า (คลิกหรือลากวาง)',
  'tools.mobileHeading':'แตะเพื่อวางอุปกรณ์ลงในกระดาน',
  'tools.mobileSub':'6 อุปกรณ์มาตรฐาน',
  'comp.battery':'แบตเตอรี่',
  'comp.batterySub':'แหล่งจ่ายไฟ DC',
  'comp.bulb':'หลอดไฟ',
  'comp.bulbSub':'สังเกตความสว่าง',
  'comp.resistor':'ตัวต้านทาน',
  'comp.resistorSub':'จำกัดกระแสไฟฟ้า',
  'comp.switch':'สวิตช์',
  'comp.switchSub':'เปิด / ปิดวงจร',
  'comp.ammeter':'แอมมิเตอร์',
  'comp.ammeterSub':'วัดกระแส (ต่ออนุกรม)',
  'comp.voltmeter':'โวลต์มิเตอร์',
  'comp.voltmeterSub':'วัดศักย์ (ต่อขนาน)',
  'toolbar.undo':'เลิกทำ',
  'toolbar.redo':'ทำซ้ำ',
  'toolbar.clear':'ล้างกระดาน',
  'toolbar.select':'เลือก/ย้าย',
  'toolbar.wire':'สายไฟ',
  'toolbar.pan':'เลื่อนจอ',
  'canvas.emptyTitle':'เริ่มต้นสร้างวงจรไฟฟ้าของคุณ',
  'canvas.emptyDesc':'คลิกหรือลากอุปกรณ์จากคลังด้านซ้ายมาวางบนกระดาน แล้วคลิกจุดขั้วสีเหลือง 2 จุดเพื่อเดินสายไฟให้ครบวงจร',
  'canvas.loadFirst':'โหลดวงจรตัวอย่างแรก →',
  'canvas.footerHint':'ลากเพื่อย้าย · คลิกขั้วสีเหลือง 2 จุดเพื่อต่อสายไฟ · ดับเบิลคลิกที่สวิตช์เพื่อเปิด/ปิด',
  'legend.terminal':'ขั้วต่อสายไฟ (Terminal)',
  'legend.wire':'สายไฟ (Wire)',
  'legend.current':'ทิศทางกระแสไฟฟ้าจริง',
  'legend.animToggle':'แสดงการไหลของกระแส',
  'legend.conventional':'กระแสสมมติ (+ → −)',
  'legend.electron':'การไหลอิเล็กตรอน (− → +)',
  'legend.exportImg':'▣ บันทึกรูปภาพ (.PNG)',
  'theory.tag':'PHYSICS & MATHEMATICAL MODEL',
  'theory.title':'สมการฟิสิกส์ประจำวงจรไฟฟ้ากระแสตรง (DC Nodal Analysis)',
  'theory.routine':'กระบวนการสืบเสาะ: ทำนาย → สร้าง → ทดสอบ → วัดค่า → อธิบาย',
  'theory.ohmTitle':'1. กฎของโอห์ม (Ohm\'s Law)',
  'theory.ohmDesc':'กระแสไฟฟ้า $I$ (A) แปรผันตรงกับความต่างศักย์ $\\Delta V$ (V) และแปรผกผันกับความต้านทาน $R$ ($\\Omega$)',
  'theory.powerTitle':'2. กำลังไฟฟ้า (Electrical Power)',
  'theory.powerDesc':'ความสว่างของหลอดไฟขึ้นอยู่กับกำลังไฟฟ้า $P$ (วัตต์, W) ที่สูญเสียในไส้หลอดเทียบกับสเกลอ้างอิง $1.5\\,\\text{W}$',
  'theory.battTitle':'3. ความต้านทานภายในแบตเตอรี่',
  'theory.battDesc':'แบตเตอรี่มีค่า $r_{\\text{int}} = 0.2\\,\\Omega$, แอมมิเตอร์ $0.02\\,\\Omega$ และโวลต์มิเตอร์ $100\\,\\text{M}\\Omega$ ตามหลักเครื่องมือวัดจริง',
  'analysis.heading':'ผลวิเคราะห์วงจรไฟฟ้าแบบสด',
  'analysis.batteryCurrent':'กระแสจากแหล่งจ่าย',
  'analysis.loadPower':'กำลังไฟฟ้ารวมที่โหลด',
  'inspector.heading':'ปรับแต่งค่าและตรวจสอบอุปกรณ์',
  'inspector.empty':'คลิกเลือกอุปกรณ์หรือสายไฟบนกระดาน เพื่อปรับค่าแรงดัน ความต้านทาน หมุนทิศทาง หรือลบออก',
  'readings.heading':'ตารางค่าการวัดประจำชิ้นส่วน',
  'readings.empty':'เพิ่มหลอดไฟ ตัวต้านทาน หรือมิเตอร์เพื่อดูค่าการวัด',
  'dialog.examplesTitle':'เลือกวงจรตัวอย่างเพื่อศึกษา',
  'dialog.examplesIntro':'เลือกวงจรต้นแบบเพื่อโหลดลงบนกระดาน คุณสามารถปรับเปลี่ยนค่า วัดกระแส และทดลองต่อยอดได้ทุกวงจร',
  'dialog.examplesFoot':'หมายเหตุ: การโหลดวงจรตัวอย่างจะแทนที่วงจรปัจจุบันบนกระดาน (สามารถกด Undo เพื่อย้อนกลับได้)',
  'dialog.challengesTitle':'5 ภารกิจท้าทายการต่อวงจรไฟฟ้า',
  'dialog.challengesIntro':'ทำนาย → สร้าง → ทดสอบ → วัดค่า → อธิบาย: ลองสร้างวงจรบนกระดานตามโจทย์ แล้วกดปุ่มตรวจคำตอบ ระบบจะวิเคราะห์จากผลคำนวณทางฟิสิกส์จริงของวงจรคุณ',
  'dialog.fileTitle':'บันทึกและส่งออกผลงาน',
  'dialog.fileFoot':'ระบบบันทึกอัตโนมัติ (Auto-save) ทำงานอยู่เสมอ สามารถส่งต่อไฟล์ .JSON ให้เพื่อนหรือครูเปิดตรวจข้ามอุปกรณ์ได้',
  'file.saveLocal':'▣ บันทึกไว้ในเบราว์เซอร์นี้ (Browser Save)',
  'file.loadLocal':'↶ โหลดวงจรที่บันทึกไว้ในเบราว์เซอร์',
  'file.downloadJson':'↓ ดาวน์โหลดไฟล์วงจร (.JSON)',
  'file.importJson':'↑ นำเข้าไฟล์วงจร (.JSON)',
  'file.downloadSvg':'↓ ดาวน์โหลดแผนภาพเวกเตอร์ (.SVG)',
  'file.exportPng':'↓ ดาวน์โหลดรูปภาพวงจร (.PNG)'
 },
 en:{
  'nav.home':'Home',
  'nav.title':'Circuit Lab · Interactive DC Simulator',
  'nav.subtitle':'Dr. Apisit Tongchai · Interactive Physics Simulations',
  'nav.examples':'Examples',
  'nav.challenges':'Challenges (5)',
  'nav.file':'File / Export',
  'breadcrumb.home':'Home',
  'breadcrumb.science':'Science Sims',
  'breadcrumb.current':'Interactive DC Circuit Lab',
  'hero.heading':'Interactive DC Electrical Circuit Simulator (Circuit Lab)',
  'tools.heading':'Component Toolbox (Tap or Drag)',
  'tools.mobileHeading':'Tap to place component on canvas',
  'tools.mobileSub':'6 Standard Elements',
  'comp.battery':'Battery',
  'comp.batterySub':'DC Power supply',
  'comp.bulb':'Light bulb',
  'comp.bulbSub':'Observe brightness',
  'comp.resistor':'Resistor',
  'comp.resistorSub':'Control resistance',
  'comp.switch':'Switch',
  'comp.switchSub':'Open / close loop',
  'comp.ammeter':'Ammeter',
  'comp.ammeterSub':'Measure current (series)',
  'comp.voltmeter':'Voltmeter',
  'comp.voltmeterSub':'Measure voltage (parallel)',
  'toolbar.undo':'Undo',
  'toolbar.redo':'Redo',
  'toolbar.clear':'Clear',
  'toolbar.select':'Select',
  'toolbar.wire':'Wire',
  'toolbar.pan':'Pan',
  'canvas.emptyTitle':'Start building a circuit',
  'canvas.emptyDesc':'Choose an electrical component from the toolbox, or open a ready-made example circuit.',
  'canvas.loadFirst':'Load first example →',
  'canvas.footerHint':'Drag to move · Click two yellow terminals to connect · Double-click switch to toggle',
  'legend.terminal':'Terminal',
  'legend.wire':'Wire',
  'legend.current':'Solved current flow',
  'legend.animToggle':'Show current animation',
  'legend.conventional':'Conventional (+ → −)',
  'legend.electron':'Electron flow (− → +)',
  'legend.exportImg':'▣ Export PNG',
  'theory.tag':'PHYSICS & MATHEMATICAL MODEL',
  'theory.title':'Steady-State DC Nodal Analysis Equations',
  'theory.routine':'Inquiry Routine: Predict → Build → Test → Measure → Explain',
  'theory.ohmTitle':'1. Ohm\'s Law',
  'theory.ohmDesc':'Current $I$ (A) is proportional to potential difference $\\Delta V$ (V) and inversely proportional to resistance $R$ ($\\Omega$).',
  'theory.powerTitle':'2. Electrical Power',
  'theory.powerDesc':'Bulb brightness scales with dissipated electrical power $P$ (W) relative to a $1.5\\,\\text{W}$ reference scale.',
  'theory.battTitle':'3. Internal Battery Resistance',
  'theory.battDesc':'Batteries include $r_{\\text{int}} = 0.2\\,\\Omega$, ammeters $0.02\\,\\Omega$, and voltmeters $100\\,\\text{M}\\Omega$.',
  'analysis.heading':'Live DC Circuit Analysis',
  'analysis.batteryCurrent':'Battery current',
  'analysis.loadPower':'Total load power',
  'inspector.heading':'Component Inspector & Properties',
  'inspector.empty':'Select a component or wire on the canvas to inspect readings, adjust values, rotate, or delete.',
  'readings.heading':'Live Element Readings',
  'readings.empty':'Add a bulb, resistor, or meter to view live readings.',
  'dialog.examplesTitle':'Explore a Ready-Made Circuit',
  'dialog.examplesIntro':'Choose a starting circuit. You can edit, measure, and experiment with every example.',
  'dialog.examplesFoot':'Note: Loading an example replaces the current canvas (you can Undo anytime).',
  'dialog.challengesTitle':'5 Inquiry Learning Challenges',
  'dialog.challengesIntro':'Predict → Build → Test → Measure → Explain. Build the solution yourself; checks use your circuit\'s actual physics results.',
  'dialog.fileTitle':'Save and Share Your Work',
  'dialog.fileFoot':'Auto-save is active in this browser. JSON circuit files can be shared across devices.',
  'file.saveLocal':'▣ Save in this browser',
  'file.loadLocal':'↶ Load browser save',
  'file.downloadJson':'↓ Download circuit (.JSON)',
  'file.importJson':'↑ Import circuit (.JSON)',
  'file.downloadSvg':'↓ Download vector diagram (.SVG)',
  'file.exportPng':'↓ Download image (.PNG)'
 }
};

const compLabel=type=>currentLang==='th'?(COMPONENTS[type]?.labelTh||COMPONENTS[type]?.label):COMPONENTS[type]?.label;
const clone=x=>JSON.parse(JSON.stringify(x));
const fmt=(v,d=2)=>Math.abs(v)<Math.pow(10,-d)/2?'0.'+'0'.repeat(d):Number(v).toFixed(d);

function refreshKaTeX(target=document.body){
 if(window.renderMathInElement){
  window.renderMathInElement(target,{
   delimiters:[
    {left:'$$',right:'$$',display:true},
    {left:'$',right:'$',display:false}
   ],
   throwOnError:false
  });
 }
}

function note(msg){
 const t=$('toast');
 t.textContent=msg;
 t.classList.add('show');
 clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>t.classList.remove('show'),2600);
}

function snapshot(){
 history.push(clone(state));
 if(history.length>70)history.shift();
 redo=[];
}

function persist(){
 try{localStorage.setItem('circuitLabAutosave',JSON.stringify(state));}catch(e){}
}

function applyMutation(){
 sanitize();
 result=analyzeCircuit(state.components,state.wires);
 render();
 persist();
}

function sanitize(){
 const ids=new Set(state.components.flatMap(c=>[`${c.id}:a`,`${c.id}:b`]));
 state.wires=state.wires.filter(w=>ids.has(w.from)&&ids.has(w.to)&&w.from!==w.to);
}

function newId(prefix){return `${prefix}${nextId++}`;}

function refreshIds(){
 const all=[...state.components.map(c=>c.id),...state.wires.map(w=>w.id)];
 nextId=Math.max(nextId,...all.map(s=>Number(String(s).replace(/\D/g,''))||0),0)+1;
}

function addComponent(type,x=520,y=310){
 if(!COMPONENTS[type])return;
 snapshot();
 const offset=state.components.length%6;
 const c={id:newId('c'),type,x:x+offset*14,y:y+offset*14,rotation:0,value:COMPONENTS[type].defaultValue,closed:false};
 state.components.push(c);
 selected={kind:'component',id:c.id};
 pending=null;
 applyMutation();
 note(currentLang==='th'?`เพิ่ม${compLabel(type)}แล้ว คลิกขั้วสีเหลืองเพื่อต่อสายไฟ`:`${compLabel(type)} added. Click its terminals to connect.`);
}

function terminalPos(c,t){
 const sign=t==='a'?-1:1;
 const theta=(c.rotation||0)*Math.PI/180;
 return{x:c.x+sign*58*Math.cos(theta),y:c.y+sign*58*Math.sin(theta)};
}

function terminal(id){
 const [cid,t]=id.split(':');
 const c=state.components.find(c=>c.id===cid);
 return c?terminalPos(c,t):null;
}

function el(tag,attrs={},parent){
 const e=document.createElementNS(NS,tag);
 for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));
 if(parent)parent.appendChild(e);
 return e;
}

function textAt(parent,x,y,value,cls='comp-label'){
 const t=el('text',{x,y,class:cls},parent);
 t.textContent=value;
 return t;
}

function line(parent,x1,y1,x2,y2,cls='comp-graphic',attrs={}){
 return el('line',{x1,y1,x2,y2,class:cls,...attrs},parent);
}

function pathOf(a,b){
 const gap=Math.abs(a.x-b.x);
 if(Math.abs(a.y-b.y)<12 && a.x>b.x+70){
  const y=a.y+115;
  return `M ${a.x} ${a.y} L ${a.x+42} ${a.y} L ${a.x+42} ${y} L ${b.x-42} ${y} L ${b.x-42} ${b.y} L ${b.x} ${b.y}`;
 }
 if(gap<20){
  const mid=a.x+45;
  return `M ${a.x} ${a.y} L ${mid} ${a.y} L ${mid} ${b.y} L ${b.x} ${b.y}`;
 }
 const mid=(a.x+b.x)/2;
 return `M ${a.x} ${a.y} L ${mid} ${a.y} L ${mid} ${b.y} L ${b.x} ${b.y}`;
}

function drawWires(){
 const root=$('wireLayer');
 root.replaceChildren();
 for(const w of state.wires){
  const a=terminal(w.from),b=terminal(w.to);
  if(!a||!b)continue;
  const g=el('g',{},root);
  const d=pathOf(a,b);
  el('path',{d,class:`wire ${selected?.kind==='wire'&&selected.id===w.id?'selected':''}`,'data-wire-id':w.id},g);
  const rawCurrent=result.wireCurrents?.[w.id]||0;
  const signedFlow=flowConvention==='electron'?-rawCurrent:rawCurrent;
  const absI=Math.abs(signedFlow);
  if(animate&&absI>0.002&&result.warnings.length===0){
   const animPath=signedFlow>=0?d:pathOf(b,a);
   const durSec=Math.max(0.65,Math.min(3.6,0.95/Math.sqrt(absI+0.03)));
   const durStr=`${durSec.toFixed(2)}s`;
   const particleColor=flowConvention==='electron'?'#38bdf8':'#6ee7b7';
   for(const phase of [0, -durSec/2]){
    const motion=el('circle',{r:3.5,class:'energy-particle',style:`fill:${particleColor}`},g);
    el('animateMotion',{dur:durStr,begin:`${phase.toFixed(2)}s`,repeatCount:'indefinite',path:animPath},motion);
   }
  }
  g.addEventListener('pointerdown',e=>{
   e.stopPropagation();
   if(mode==='pan')return;
   selected={kind:'wire',id:w.id};
   pending=null;
   render();
  });
 }
}

function drawComponent(c){
 const layer=$('componentLayer'),g=el('g',{transform:`translate(${c.x} ${c.y}) rotate(${c.rotation||0})`,class:selected?.kind==='component'&&selected.id===c.id?'comp-selected':''},layer);
 const r=result.readings[c.id]||{current:0,voltage:0,power:0,brightness:0};
 el('rect',{x:-48,y:-32,width:96,height:64,rx:14,class:'comp-body'},g);
 if(c.type==='bulb'){
  if(r.brightness>.02){
   el('circle',{cx:0,cy:-1,r:Math.min(38,16+r.brightness*22),class:'bulb-glow',opacity:.22+r.brightness*.58},g);
  }
  el('circle',{cx:0,cy:0,r:23,class:'comp-graphic',fill:r.brightness>.05?'#facc15':'#1a324e'},g);
  line(g,-11,-11,11,11);
  line(g,-11,11,11,-11);
 }else if(c.type==='battery'){
  line(g,-13,-21,-13,21,'comp-graphic',{strokeWidth:4});
  line(g,5,-31,5,31,'comp-graphic',{strokeWidth:4});
  textAt(g,-31,-11,'−','comp-battery-mark');
  textAt(g,28,-11,'+','comp-battery-mark');
 }else if(c.type==='resistor'){
  el('polyline',{points:'-37,0 -27,0 -20,-14 -10,14 0,-14 10,14 20,-14 27,0 37,0',class:'comp-graphic'},g);
 }else if(c.type==='switch'){
  line(g,-36,8,-19,8);
  line(g,20,8,36,8);
  el('circle',{cx:-19,cy:8,r:3.8,fill:'#e2eeff'},g);
  el('circle',{cx:20,cy:8,r:3.8,fill:'#e2eeff'},g);
  line(g,-19,8,c.closed?20:17,c.closed?8:-17,'comp-graphic',{stroke:c.closed?'#34d399':'#fbbf24'});
 }else if(c.type==='ammeter'||c.type==='voltmeter'){
  el('circle',{cx:0,cy:0,r:25,class:'comp-graphic'},g);
  textAt(g,0,8,c.type==='ammeter'?'A':'V','comp-meter-letter');
 }
 line(g,-56,0,-45,0);
 line(g,45,0,56,0);
 // Subtle terminal markers A and B on component body
 textAt(g,-39,24,'A','comp-reading');
 textAt(g,39,24,'B','comp-reading');
 el('rect',{x:-51,y:-36,width:102,height:72,rx:14,class:'comp-hit'},g);
 for(const t of ['a','b']){
  const x=t==='a'?-58:58;
  const hit=el('circle',{cx:x,cy:0,r:13,fill:'transparent',style:'cursor:crosshair'},g);
  el('circle',{cx:x,cy:0,r:7.2,class:`terminal ${pending===`${c.id}:${t}`?'pending':''}`,'data-terminal':`${c.id}:${t}`},g);
  const connect=e=>{e.stopPropagation();connectTerminal(`${c.id}:${t}`);};
  hit.addEventListener('pointerdown',connect);
  g.lastChild.addEventListener('pointerdown',connect);
 }
 textAt(g,0,56,`${compLabel(c.type)} ${c.type==='battery'?fmt(c.value,1)+' V':c.type==='bulb'||c.type==='resistor'?fmt(c.value,1)+' Ω':c.type==='switch'?(c.closed?'ON':'OFF'):''}`);
 if(c.type==='bulb'||c.type==='resistor')textAt(g,0,73,`${fmt(Math.abs(r.current),3)} A · ${fmt(r.power,2)} W`,'comp-reading');
 if(c.type==='ammeter')textAt(g,0,73,`${fmt(Math.abs(r.current),3)} A`,'comp-reading');
 if(c.type==='voltmeter')textAt(g,0,73,`${fmt(Math.abs(r.voltage),2)} V`,'comp-reading');
 g.addEventListener('pointerdown',e=>{
  if(mode==='pan')return;
  e.stopPropagation();
  selected={kind:'component',id:c.id};
  pending=null;
  drag={kind:'component',id:c.id,origin:coords(e),initial:{x:c.x,y:c.y},moved:false};
  render();
 });
 g.addEventListener('dblclick',e=>{
  if(c.type==='switch'){
   e.stopPropagation();
   snapshot();
   c.closed=!c.closed;
   applyMutation();
   note(currentLang==='th'?(c.closed?'สับสวิตช์ลง (วงจรปิด)':'ยกสวิตช์ขึ้น (วงจรเปิด)'):(c.closed?'Switch closed':'Switch opened'));
  }
 });
}

function render(){
 if(!result)result=analyzeCircuit(state.components,state.wires);
 drawWires();
 const layer=$('componentLayer');
 layer.replaceChildren();
 for(const c of state.components)drawComponent(c);
 drawPreview();
 renderInspector();
 renderMetrics();
 $('canvasHelp').classList.toggle('hidden',state.components.length>0);
 $('countLabel').textContent=currentLang==='th'
  ?`${state.components.length} อุปกรณ์ · ${state.wires.length} สายไฟ`
  :`${state.components.length} components · ${state.wires.length} wires`;
 const warn=result.warnings.length;
 $('statusLabel').textContent=warn
  ?(currentLang==='th'?'ตรวจสอบการต่อสายไฟ':'Check your connections')
  :result.batteryCurrent>.005
   ?(currentLang==='th'?'มีกระแสไฟฟ้าไหลในวงจร':'Circuit energized')
   :(currentLang==='th'?'พร้อมต่อวงจร':'Ready to build');
 $('undoBtn').disabled=history.length===0;
 $('redoBtn').disabled=redo.length===0;
}

function drawPreview(point){
 const layer=$('previewLayer');
 layer.replaceChildren();
 if(!pending)return;
 const a=terminal(pending);
 if(!a)return;
 el('circle',{cx:a.x,cy:a.y,r:15,stroke:'#fbbf24',strokeWidth:2.2,fill:'none'},layer);
 if(point)el('path',{d:pathOf(a,point),class:'preview'},layer);
}

function connectTerminal(id){
 if(!pending){
  pending=id;
  selected=null;
  drawPreview();
  note(currentLang==='th'?'คลิกขั้วปลายทางเพื่อเชื่อมสายไฟ (กด Esc เพื่อยกเลิก)':'Now click the destination terminal. Press Esc to cancel.');
  return;
 }
 if(pending===id){
  pending=null;
  drawPreview();
  return;
 }
 const key=[pending,id].sort().join('|');
 if(state.wires.some(w=>[w.from,w.to].sort().join('|')===key)){
  note(currentLang==='th'?'ขั้วทั้งสองเชื่อมต่อกันอยู่แล้ว':'These terminals are already connected.');
  pending=null;
  drawPreview();
  return;
 }
 snapshot();
 state.wires.push({id:newId('w'),from:pending,to:id});
 pending=null;
 mode='select';
 renderModes();
 applyMutation();
}

function renderInspector(){
 const target=$('inspectorBody');
 if(!selected){
  target.innerHTML=`<div class="text-center py-6 px-3 text-slate-400 dark:text-slate-500"><div class="text-2xl mb-1.5">◎</div><p class="text-xs leading-relaxed">${I18N[currentLang]['inspector.empty']}</p></div>`;
  return;
 }
 if(selected.kind==='wire'){
  const w=state.wires.find(x=>x.id===selected.id);
  const wCurr=Math.abs(result.wireCurrents?.[selected.id]||0);
  const nodeV=w?result.terminalVoltages?.[w.from]||0:0;
  const wireTitle=currentLang==='th'?'สายไฟตัวนำ (Ideal Wire)':'Conductor Wire';
  const wireDesc=currentLang==='th'?'สายไฟในแบบจำลองนี้เป็นตัวนำอุดมคติ ($R_{\\text{wire}} = 0\\,\\Omega$) โหนดที่เชื่อมถึงกันจะมีศักย์ไฟฟ้าเท่ากัน':'Wire connections have negligible resistance ($R_{\\text{wire}} = 0\\,\\Omega$) and share the same node potential.';
  const iWireLbl=currentLang==='th'?'กระแสในสายไฟเส้นนี้ ($|I|$)':'Current in wire ($|I|$)';
  const vNodeLbl=currentLang==='th'?'ศักย์ไฟฟ้าโหนดเทียบกราวด์ ($V$)':'Node potential ($V$)';
  const delText=currentLang==='th'?'✕ ลบสายไฟเส้นนี้':'✕ Delete wire';
  target.innerHTML=`
   <div class="space-y-3">
    <div class="flex items-center justify-between">
     <strong class="text-sm font-bold text-slate-900 dark:text-white">${wireTitle}</strong>
     <span class="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">${selected.id}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
     <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
      <span class="block text-[10px] text-slate-500 dark:text-slate-400">${iWireLbl}</span>
      <strong class="font-mono text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">${fmt(wCurr,3)} A</strong>
     </div>
     <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
      <span class="block text-[10px] text-slate-500 dark:text-slate-400">${vNodeLbl}</span>
      <strong class="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">${fmt(nodeV,3)} V</strong>
     </div>
    </div>
    <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${wireDesc}</p>
    <button class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 border border-rose-500/30 transition-colors" id="deleteSelected">${delText}</button>
   </div>`;
  refreshKaTeX(target);
  return;
 }
 const c=state.components.find(c=>c.id===selected.id);
 if(!c){selected=null;renderInspector();return;}
 const s=COMPONENTS[c.type],r=result.readings[c.id]||{current:0,voltage:0,power:0};
 let control='';
 if(s.unit){
  const propLabel=c.type==='battery'
   ?(currentLang==='th'?`แรงดันเคลื่อนไฟฟ้า ($\\mathcal{E}$)`:`Supply EMF ($\\mathcal{E}$)`)
   :(currentLang==='th'?`ความต้านทานไฟฟ้า ($R$)`:`Resistance ($R$)`);
  const sliderMax=c.type==='resistor'?Math.max(200,c.value):c.type==='bulb'?Math.max(200,c.value):s.max;
  control=`
   <div class="space-y-2 my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
    <div class="flex items-center justify-between text-xs">
     <label for="propertyValue" class="font-semibold text-slate-700 dark:text-slate-300">${propLabel}</label>
     <span class="font-mono font-bold text-brand-600 dark:text-brand-400">${fmt(c.value,1)} ${s.unit}</span>
    </div>
    <input id="propertySlider" type="range" min="${s.min}" max="${sliderMax}" step="${s.step}" value="${c.value}">
    <div class="flex items-center gap-2 pt-1">
     <input id="propertyValue" type="number" min="${s.min}" max="${s.max}" step="${s.step}" value="${c.value}" class="w-full font-mono text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
     <span class="text-xs font-mono text-slate-400">${s.unit}</span>
    </div>
   </div>`;
 }
 if(c.type==='switch'){
  const swLabel=currentLang==='th'?'สถานะสวิตช์':'Switch state';
  const swBtn=c.closed
   ?(currentLang==='th'?'● วงจรปิด (CLOSED) — คลิกเพื่อเปิด':'● CLOSED — click to open')
   :(currentLang==='th'?'○ วงจรเปิด (OPEN) — คลิกเพื่อปิด':'○ OPEN — click to close');
  control=`
   <div class="my-3">
    <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">${swLabel}</label>
    <button class="w-full py-2 px-3 rounded-xl text-xs font-bold ${c.closed?'bg-emerald-600 hover:bg-emerald-500 text-white':'bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 border border-amber-500/40'} transition-colors" id="toggleSwitch">${swBtn}</button>
   </div>`;
 }

 const isBatt=c.type==='battery';
 const dispVoltage=isBatt?Math.abs(r.voltage):r.voltage;
 const dispPower=isBatt?Math.abs(r.voltage*r.current):r.power;
 const vLabel=isBatt
  ?(currentLang==='th'?'แรงดันขั้วแบตเตอรี่ ($V_{\\text{term}}$)':'Terminal Voltage ($V_{\\text{term}}$)')
  :(currentLang==='th'?'ความต่างศักย์ ($V_{AB}$)':'Voltage ($V_{AB}$)');
 const iLabel=isBatt
  ?(currentLang==='th'?'กระแสจ่ายออก ($I$)':'Output Current ($I$)')
  :(currentLang==='th'?'กระแสไฟฟ้า ($I_{AB}$)':'Current ($I_{AB}$)');
 const pLabel=isBatt
  ?(currentLang==='th'?'กำลังที่จ่ายให้วงจร ($P_{\\text{out}}$)':'Supplied Power ($P_{\\text{out}}$)')
  :(currentLang==='th'?'กำลังไฟฟ้าสูญเสีย ($P$)':'Dissipated Power ($P$)');
 const oLabel=currentLang==='th'?'มุมหมุนวางตัว':'Orientation';
 const rotBtn=currentLang==='th'?'↻ หมุน 90°':'↻ Rotate 90°';
 const delBtn=currentLang==='th'?'✕ ลบชิ้นส่วน':'✕ Delete';

 let formulaBox='';
 if(c.type==='bulb'||c.type==='resistor'){
  formulaBox=`<div class="p-2.5 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/50 text-[11px] text-slate-700 dark:text-slate-300 overflow-x-auto">
   $$I = \\frac{|\\Delta V|}{R} = \\frac{${fmt(Math.abs(r.voltage),2)}}{${fmt(c.value,1)}} = ${fmt(Math.abs(r.current),3)}\\,\\text{A}$$
  </div>`;
 }else if(c.type==='battery'){
  formulaBox=`<div class="p-2.5 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/50 text-[11px] text-slate-700 dark:text-slate-300 overflow-x-auto">
   $$V_{\\text{term}} = \\mathcal{E} - I r_{\\text{int}} = ${fmt(c.value,1)} - (${fmt(Math.abs(r.current),3)})(0.2) = ${fmt(dispVoltage,3)}\\,\\text{V}$$
  </div>`;
 }

 target.innerHTML=`
  <div class="space-y-3">
   <div class="flex items-center justify-between">
    <strong class="text-sm font-bold text-slate-900 dark:text-white">${compLabel(c.type)}</strong>
    <span class="font-mono text-xs px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">${c.id}</span>
   </div>
   ${control}
   <div class="grid grid-cols-2 gap-2">
    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
     <span class="block text-[10px] text-slate-500 dark:text-slate-400">${vLabel}</span>
     <strong id="inspectVoltageVal" class="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">${fmt(dispVoltage,3)} V</strong>
    </div>
    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
     <span class="block text-[10px] text-slate-500 dark:text-slate-400">${iLabel}</span>
     <strong id="inspectCurrentVal" class="font-mono text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">${fmt(r.current,3)} A</strong>
    </div>
    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
     <span class="block text-[10px] text-slate-500 dark:text-slate-400">${pLabel}</span>
     <strong id="inspectPowerVal" class="font-mono text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5 block">${fmt(dispPower,3)} W</strong>
    </div>
    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
     <span class="block text-[10px] text-slate-500 dark:text-slate-400">${oLabel}</span>
     <strong class="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">${c.rotation}°</strong>
    </div>
   </div>
   ${formulaBox}
   <div class="flex gap-2 pt-1">
    <button id="rotateSelected" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors">${rotBtn}</button>
    <button id="deleteSelected" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 border border-rose-500/30 transition-colors">${delBtn}</button>
   </div>
  </div>`;
 refreshKaTeX(target);
}

function translateWarning(w){
 if(currentLang!=='th')return w;
 if(w.includes('Short circuit'))return '⚠️ เกิดการลัดวงจร (Short circuit): ขั้วบวกและขั้วลบของแบตเตอรี่เชื่อมต่อกันโดยตรงโดยไม่มีโหลด โปรดปลดสายไฟที่ลัดวงจรออกทันที';
 if(w.includes('Very high current'))return '⚠️ กระแสไฟฟ้าสูงเกินพิกัด (> 8 A): โปรดเพิ่มความต้านทานโหลดหรือตรวจสอบการลัดวงจร';
 return w;
}

function translateDiagnostic(d){
 if(d==='voltmeter_series'){
  return currentLang==='th'
   ?'💡 ข้อสังเกตทางฟิสิกส์: โวลต์มิเตอร์มีความต้านทานภายในสูงมาก (100 MΩ) เมื่อนำมาต่ออนุกรมจึงกั้นกระแสไม่ให้ไหลผ่านหลอดไฟ ควรต่อโวลต์มิเตอร์แบบ "ขนาน" คร่อมอุปกรณ์ที่ต้องการวัด'
   :'💡 Physics Insight: A voltmeter has very high resistance (100 MΩ) and blocks current when connected in series. Connect voltmeters in parallel across the component.';
 }
 if(d==='ammeter_parallel'){
  return currentLang==='th'
   ?'⚠️ ข้อสังเกตทางฟิสิกส์: แอมมิเตอร์มีความต้านทานต่ำมาก (0.02 Ω) การต่อแอมมิเตอร์คร่อมแหล่งจ่ายโดยตรงทำให้กระแสพุ่งสูงคล้ายการลัดวงจร ควรต่อแอมมิเตอร์แบบ "อนุกรม" กับโหลดเสมอ'
   :'⚠️ Physics Insight: An ammeter has very low resistance (0.02 Ω). Connecting it in parallel across a source causes excessive current. Connect ammeters in series.';
 }
 return '';
}

function renderMetrics(){
 const bc=result.batteryCurrent,p=result.totalPower;
 $('totalCurrent').innerHTML=`${fmt(bc,3)} <em class="text-xs font-normal text-slate-500">A</em>`;
 $('totalPower').innerHTML=`${fmt(p,2)} <em class="text-xs font-normal text-slate-500">W</em>`;
 const w=result.warnings.length>0,diag=(result.diagnostics?.length||0)>0,on=bc>.005;
 const dot=$('circuitStatusDot');
 dot.className='status-dot'+(w?' warning':on?' on':'');
 if(currentLang==='th'){
  $('circuitStatus').textContent=w?'แจ้งเตือนความปลอดภัยทางไฟฟ้า':on?'กระแสไฟฟ้ากำลังไหลครบวงจร':'ยังไม่มีกระแสไหลในวงจร';
  $('circuitDescription').textContent=w?'ตรวจพบการลัดวงจรหรือกระแสเกิน':on?'คำนวณค่าศักย์และกระแสแบบ Real-time':'ต่อแบตเตอรี่และอุปกรณ์ให้ครบวงรอบปิด';
 }else{
  $('circuitStatus').textContent=w?'Electrical warning':on?'Current is flowing':'No active circuit';
  $('circuitDescription').textContent=w?'Check for short circuits':on?'Measurements update in real time':'Complete a loop with a battery';
 }
 const messages=[
  ...result.warnings.map(translateWarning),
  ...(result.diagnostics||[]).map(translateDiagnostic).filter(Boolean)
 ];
 $('warningBox').classList.toggle('hidden',messages.length===0);
 $('warningBox').textContent=messages.join(' ');

 const readings=$('readings');
 readings.replaceChildren();
 for(const c of state.components){
  if(!['bulb','ammeter','voltmeter','resistor'].includes(c.type))continue;
  const r=result.readings[c.id]||{current:0,voltage:0,power:0};
  const item=document.createElement('div');
  item.className='flex items-center justify-between py-2 text-xs';
  const title=document.createElement('div');
  title.className='flex items-center gap-2';
  const name=document.createElement('strong');
  name.className='font-semibold text-slate-800 dark:text-slate-200';
  name.textContent=compLabel(c.type);
  const id=document.createElement('small');
  id.className='font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500';
  id.textContent=c.id;
  title.append(name,id);
  const val=document.createElement('strong');
  val.className='font-mono font-bold text-slate-900 dark:text-white';
  val.textContent=c.type==='voltmeter'?`${fmt(Math.abs(r.voltage),3)} V`:`${fmt(Math.abs(r.current),3)} A`;
  item.append(title,val);
  readings.append(item);
 }
 if(!readings.children.length){
  readings.innerHTML=`<p class="text-xs text-slate-400 dark:text-slate-500 py-2">${I18N[currentLang]['readings.empty']}</p>`;
 }
}

function coords(e){
 const point=svg.createSVGPoint();
 point.x=e.clientX;
 point.y=e.clientY;
 return point.matrixTransform(svg.getScreenCTM().inverse());
}

function renderModes(){
 for(const m of ['select','wire','pan']){
  const b=$(`${m}Mode`);
  b.classList.toggle('active',m===mode);
  b.setAttribute('aria-pressed',String(m===mode));
 }
 $('canvasHost').classList.toggle('pan-mode',mode==='pan');
}

function setMode(m){mode=m;pending=null;renderModes();drawPreview();}

function setView(){
 svg.setAttribute('viewBox',`${view.x} ${view.y} ${1100/view.zoom} ${640/view.zoom}`);
 $('zoomLabel').textContent=Math.round(view.zoom*100)+'%';
}

function zoom(factor){
 const oldW=1100/view.zoom,oldH=640/view.zoom;
 view.zoom=Math.min(2.8,Math.max(.45,view.zoom*factor));
 view.x+=(oldW-1100/view.zoom)/2;
 view.y+=(oldH-640/view.zoom)/2;
 setView();
}

function clearCircuit(){
 if(!state.components.length)return;
 const msg=currentLang==='th'?'ต้องการล้างอุปกรณ์ทั้งหมดบนกระดานหรือไม่? (สามารถกด Undo ย้อนกลับได้)':'Clear the entire circuit? You can undo this action.';
 if(!confirm(msg))return;
 snapshot();
 state=blank();
 selected=null;
 pending=null;
 applyMutation();
}

function undo(){if(!history.length)return;redo.push(clone(state));state=history.pop();selected=null;pending=null;applyMutation();}
function redoAction(){if(!redo.length)return;history.push(clone(state));state=redo.pop();selected=null;pending=null;applyMutation();}

function deleteSelected(){
 if(!selected)return;
 snapshot();
 if(selected.kind==='component'){
  state.components=state.components.filter(c=>c.id!==selected.id);
 }else{
  state.wires=state.wires.filter(w=>w.id!==selected.id);
 }
 selected=null;
 applyMutation();
}

function rotateSelected(){
 const c=state.components.find(c=>c.id===selected?.id);
 if(!c)return;
 snapshot();
 c.rotation=(c.rotation+90)%360;
 applyMutation();
}

function loadExample(id){
 snapshot();
 state=makeExample(id);
 selected=null;
 pending=null;
 refreshIds();
 applyMutation();
 $('examplesDialog').close();
 note(currentLang==='th'?'โหลดวงจรตัวอย่างเรียบร้อย ลองปรับค่าหรือวัดกระแสได้เลย!':'Example loaded. Modify and explore the circuit!');
}

function normalizeImported(data){
 if(!data||!Array.isArray(data.components)||!Array.isArray(data.wires)||data.components.length>200||data.wires.length>600)
  throw Error('Not a valid Circuit Lab file (maximum 200 components, 600 wires).');
 const comp=data.components.map((c,i)=>{
  if(!COMPONENTS[c.type])throw Error('Unknown component type.');
  return{
   id:`c${i+1}`,
   type:c.type,
   x:Math.max(-3000,Math.min(3000,Number(c.x)||0)),
   y:Math.max(-3000,Math.min(3000,Number(c.y)||0)),
   rotation:([0,90,180,270].includes(Number(c.rotation))?Number(c.rotation):0),
   value:Math.max(COMPONENTS[c.type].min||0,Math.min(COMPONENTS[c.type].max||10000,Number(c.value)||COMPONENTS[c.type].defaultValue||0)),
   closed:Boolean(c.closed),
   originalId:String(c.id)
  };
 });
 const byOld=new Map(comp.map(c=>[c.originalId,c.id]));
 const wires=[];
 for(const w of data.wires){
  const [af,at]=String(w.from).split(':'),[bf,bt]=String(w.to).split(':');
  if(!byOld.has(af)||!byOld.has(bf)||!['a','b'].includes(at)||!['a','b'].includes(bt))continue;
  wires.push({id:`w${wires.length+1}`,from:`${byOld.get(af)}:${at}`,to:`${byOld.get(bf)}:${bt}`});
 }
 return{components:comp.map(({originalId,...c})=>c),wires};
}

function download(name,blob){
 const u=URL.createObjectURL(blob);
 const a=document.createElement('a');
 a.href=u;
 a.download=name;
 document.body.append(a);
 a.click();
 a.remove();
 setTimeout(()=>URL.revokeObjectURL(u),1500);
}

function exportJSON(){
 download('circuit-lab-project.json',new Blob([JSON.stringify({...state,version:1,app:'Circuit Lab'},null,2)],{type:'application/json'}));
}

const SVG_CSS=`.wire{fill:none;stroke:#6db4f5;stroke-width:5;stroke-linejoin:round;stroke-linecap:round}.wire.selected{stroke:#f59e0b;stroke-width:7}.comp-body{stroke:#8daacf;stroke-width:3;fill:#162c46}.comp-graphic{fill:none;stroke:#e2eeff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.comp-label{fill:#cbd5e1;font-family:Prompt,Arial,sans-serif;font-size:13.5px;font-weight:600;text-anchor:middle}.comp-reading{fill:#6ee7b7;font-family:monospace;font-size:12px;font-weight:600;text-anchor:middle}.terminal{fill:#fbbf24;stroke:#0f172a;stroke-width:3}.comp-selected .comp-body{stroke:#a78bfa;stroke-width:4}.energy-particle{fill:#6ee7b7}.bulb-glow{fill:#fde047;opacity:.75;filter:url(#glow)}.comp-battery-mark{fill:#fbbf24;font-size:17px;font-weight:bold;text-anchor:middle}.comp-meter-letter{fill:#e2eeff;font-size:22px;font-weight:bold;text-anchor:middle;font-family:monospace}`;

function makeExportSvg(){
 const copy=svg.cloneNode(true);
 copy.setAttribute('width','1400');
 copy.setAttribute('height','815');
 copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
 copy.querySelector('#previewLayer')?.remove();
 copy.querySelectorAll('.comp-hit,[data-terminal] ~ circle[fill="transparent"]').forEach(x=>x.remove());
 const style=document.createElementNS(NS,'style');
 style.textContent=SVG_CSS;
 copy.insertBefore(style,copy.firstChild);
 const background=document.createElementNS(NS,'rect');
 background.setAttribute('x',view.x);
 background.setAttribute('y',view.y);
 background.setAttribute('width',1100/view.zoom);
 background.setAttribute('height',640/view.zoom);
 background.setAttribute('fill','#0b1324');
 copy.insertBefore(background,copy.firstChild);
 return new XMLSerializer().serializeToString(copy);
}

function exportSVG(){
 download('circuit-lab-diagram.svg',new Blob([makeExportSvg()],{type:'image/svg+xml;charset=utf-8'}));
}

async function exportPNG(){
 const s=makeExportSvg();
 const blob=new Blob([s],{type:'image/svg+xml;charset=utf-8'});
 const url=URL.createObjectURL(blob);
 const im=new Image();
 try{
  await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=reject;im.src=url;});
  const canvas=document.createElement('canvas');
  canvas.width=1400;
  canvas.height=815;
  canvas.getContext('2d').drawImage(im,0,0,canvas.width,canvas.height);
  canvas.toBlob(b=>b?download('circuit-lab-diagram.png',b):note('PNG could not be exported.'),'image/png');
 }catch(e){
  note('PNG export failed. Try SVG export instead.');
 }finally{
  URL.revokeObjectURL(url);
 }
}

function renderExamplesDialog(){
 $('exampleGrid').innerHTML=examples.map(x=>{
  const title=currentLang==='th'?(x.nameTh||x.name):x.name;
  const desc=currentLang==='th'?(x.descriptionTh||x.description):x.description;
  const lvl=currentLang==='th'?(x.levelTh||x.level):x.level;
  return `<button class="example-card text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-700 hover:border-brand-400 transition-all" data-example="${x.id}">
   <span class="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">${lvl}</span>
   <strong class="block text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">${title}</strong>
   <small class="block text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${desc}</small>
  </button>`;
 }).join('');
}

function displayChallenges(){
 const box=$('challengeList');
 box.replaceChildren();
 challenges.forEach((ch,i)=>{
  const div=document.createElement('div');
  div.className='p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-2';
  const title=currentLang==='th'?(ch.nameTh||`${i+1}. ${ch.name}`):`${i+1}. ${ch.name}`;
  const desc=currentLang==='th'?(ch.descriptionTh||ch.description):ch.description;
  const checkLbl=currentLang==='th'?'✓ ตรวจวงจรของฉัน':'✓ Check my circuit';
  const hintLbl=currentLang==='th'?'? ดูคำใบ้':'? Show hint';
  div.innerHTML=`
   <div class="flex items-center justify-between gap-2">
    <strong class="text-sm font-bold text-slate-900 dark:text-white">${title}</strong>
    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">TASK ${i+1}</span>
   </div>
   <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${desc}</p>
   <div class="flex flex-wrap gap-2 pt-1">
    <button data-check="${i}" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-sm transition-all">${checkLbl}</button>
    <button data-hint="${i}" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">${hintLbl}</button>
   </div>
   <div class="text-xs font-semibold pt-1 text-emerald-600 dark:text-emerald-400" id="challengeResult${i}"></div>`;
  box.append(div);
 });
}

function applyLanguage(lang){
 currentLang=lang==='en'?'en':'th';
 localStorage.setItem('site_lang',currentLang);
 document.documentElement.lang=currentLang;
 const langBtn=$('langToggleBtn');
 if(langBtn)langBtn.textContent=currentLang==='th'?'EN':'TH';
 document.querySelectorAll('[data-i18n]').forEach(el=>{
  const k=el.getAttribute('data-i18n');
  const txt=I18N[currentLang]?.[k];
  if(txt)el.innerHTML=txt;
 });
 renderExamplesDialog();
 displayChallenges();
 render();
 refreshKaTeX(document.body);
}

// Event Listeners
$('langToggleBtn')?.addEventListener('click',()=>{
 applyLanguage(currentLang==='th'?'en':'th');
});

$('flowDirectionSelect')?.addEventListener('change',e=>{
 flowConvention=e.target.value==='electron'?'electron':'conventional';
 render();
});

$('toolList').addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(b)addComponent(b.dataset.type);});
$('mobileToolList')?.addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(b)addComponent(b.dataset.type);});
$('toolList').addEventListener('dragstart',e=>{const b=e.target.closest('[data-type]');if(b)e.dataTransfer.setData('text/plain',b.dataset.type);});
$('canvasHost').addEventListener('dragover',e=>e.preventDefault());
$('canvasHost').addEventListener('drop',e=>{
 e.preventDefault();
 const type=e.dataTransfer.getData('text/plain');
 if(COMPONENTS[type]){const p=coords(e);addComponent(type,p.x,p.y);}
});

svg.addEventListener('pointerdown',e=>{
 if(e.target.closest('#componentLayer')||e.target.closest('#wireLayer'))return;
 if(mode==='pan'||e.button===1||e.shiftKey){
  drag={kind:'pan',origin:{x:e.clientX,y:e.clientY},initial:{x:view.x,y:view.y}};
  svg.setPointerCapture(e.pointerId);
  $('canvasHost').classList.add('is-dragging');
 }else{
  selected=null;
  pending=null;
  render();
 }
});

window.addEventListener('pointermove',e=>{
 if(!drag){if(pending)drawPreview(coords(e));return;}
 if(drag.kind==='pan'){
  const bounds=svg.getBoundingClientRect();
  view.x=drag.initial.x-(e.clientX-drag.origin.x)*(1100/view.zoom)/bounds.width;
  view.y=drag.initial.y-(e.clientY-drag.origin.y)*(640/view.zoom)/bounds.height;
  setView();
  return;
 }
 const c=state.components.find(c=>c.id===drag.id);
 if(!c)return;
 const p=coords(e),dx=p.x-drag.origin.x,dy=p.y-drag.origin.y;
 if(Math.abs(dx)+Math.abs(dy)<2)return;
 if(!drag.moved){snapshot();drag.moved=true;}
 c.x=Math.round((drag.initial.x+dx)/8)*8;
 c.y=Math.round((drag.initial.y+dy)/8)*8;
 result=analyzeCircuit(state.components,state.wires);
 render();
});

window.addEventListener('pointerup',()=>{
 if(drag?.moved){applyMutation();}
 drag=null;
 $('canvasHost').classList.remove('is-dragging');
});

svg.addEventListener('wheel',e=>{
 if(e.ctrlKey||e.metaKey){e.preventDefault();zoom(e.deltaY<0?1.1:.9);}
},{passive:false});

$('inspectorBody').addEventListener('click',e=>{
 const id=e.target.id;
 if(id==='deleteSelected')deleteSelected();
 if(id==='rotateSelected')rotateSelected();
 if(id==='toggleSwitch'){
  const c=state.components.find(c=>c.id===selected?.id);
  if(c){snapshot();c.closed=!c.closed;applyMutation();}
 }
});

$('inspectorBody').addEventListener('input',e=>{
 if(e.target.id!=='propertySlider')return;
 const c=state.components.find(c=>c.id===selected?.id);
 if(!c)return;
 const raw=Number(e.target.value);
 if(!Number.isFinite(raw))return;
 c.value=raw;
 const numInput=$('propertyValue');
 if(numInput)numInput.value=String(raw);
 result=analyzeCircuit(state.components,state.wires);
 drawWires();
 const layer=$('componentLayer');
 layer.replaceChildren();
 for(const comp of state.components)drawComponent(comp);
 const r=result.readings[c.id]||{current:0,voltage:0,power:0};
 const isBatt=c.type==='battery';
 if($('inspectVoltageVal'))$('inspectVoltageVal').textContent=`${fmt(isBatt?Math.abs(r.voltage):r.voltage,3)} V`;
 if($('inspectCurrentVal'))$('inspectCurrentVal').textContent=`${fmt(r.current,3)} A`;
 if($('inspectPowerVal'))$('inspectPowerVal').textContent=`${fmt(isBatt?Math.abs(r.voltage*r.current):r.power,3)} W`;
 renderMetrics();
 persist();
});

$('inspectorBody').addEventListener('change',e=>{
 if(e.target.id!=='propertyValue'&&e.target.id!=='propertySlider')return;
 const c=state.components.find(c=>c.id===selected?.id);
 if(!c)return;
 const spec=COMPONENTS[c.type];
 const raw=Number(e.target.value);
 if(!Number.isFinite(raw)||raw<spec.min||raw>spec.max){
  note(currentLang==='th'?`ค่าต้องอยู่ระหว่าง ${spec.min} ถึง ${spec.max}`:`Value must be between ${spec.min} and ${spec.max}.`);
  renderInspector();
  return;
 }
 snapshot();
 c.value=raw;
 applyMutation();
});

for(const m of ['select','wire','pan'])$(`${m}Mode`).addEventListener('click',()=>setMode(m));
$('zoomIn').addEventListener('click',()=>zoom(1.2));
$('zoomOut').addEventListener('click',()=>zoom(1/1.2));
$('fitBtn').addEventListener('click',()=>{view={x:0,y:0,zoom:1};setView();});
$('undoBtn').addEventListener('click',undo);
$('redoBtn').addEventListener('click',redoAction);
$('resetBtn').addEventListener('click',clearCircuit);
$('animationToggle').addEventListener('change',e=>{animate=e.target.checked;render();});
$('snapshotBtn').addEventListener('click',exportPNG);

function openDialog(id){$(id).showModal();}
$('examplesBtn').addEventListener('click',()=>openDialog('examplesDialog'));
$('startExample').addEventListener('click',()=>loadExample('basic'));
$('challengesBtn').addEventListener('click',()=>openDialog('challengesDialog'));
$('menuBtn').addEventListener('click',()=>openDialog('fileDialog'));

document.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
for(const dialog of document.querySelectorAll('dialog')){
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
}

$('exampleGrid').addEventListener('click',e=>{
 const b=e.target.closest('[data-example]');
 if(b)loadExample(b.dataset.example);
});

$('challengeList').addEventListener('click',e=>{
 const check=e.target.closest('[data-check]'),hint=e.target.closest('[data-hint]');
 if(check){
  const i=Number(check.dataset.check),passed=challenges[i].check(state,result);
  const resEl=$(`challengeResult${i}`);
  resEl.className=`text-xs font-bold pt-1 ${passed?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`;
  resEl.textContent=passed
   ?(currentLang==='th'?'✓ ยอดเยี่ยม! วงจรของคุณผ่านเงื่อนไขภารกิจนี้แล้ว':'✓ Well done! Your circuit meets this challenge.')
   :(currentLang==='th'?'ยังไม่ผ่านเงื่อนไข ลองตรวจสอบการต่อสายไฟแล้วลองใหม่อีกครั้ง':'Not yet. Check your circuit and try again.');
 }else if(hint){
  const i=Number(hint.dataset.hint);
  const resEl=$(`challengeResult${i}`);
  resEl.className='text-xs font-medium pt-1 text-brand-600 dark:text-brand-400';
  resEl.textContent=currentLang==='th'?(challenges[i].hintTh||challenges[i].hint):challenges[i].hint;
 }
});

$('saveLocalBtn').addEventListener('click',()=>{
 localStorage.setItem('circuitLabManualSave',JSON.stringify(state));
 note(currentLang==='th'?'บันทึกวงจรไว้ในเบราว์เซอร์นี้แล้ว':'Circuit saved in this browser.');
});
$('loadLocalBtn').addEventListener('click',()=>{
 try{
  const saved=localStorage.getItem('circuitLabManualSave');
  if(!saved){note(currentLang==='th'?'ไม่พบข้อมูลที่บันทึกไว้':'No manual save found.');return;}
  snapshot();
  state=normalizeImported(JSON.parse(saved));
  refreshIds();
  selected=null;
  applyMutation();
  $('fileDialog').close();
  note(currentLang==='th'?'โหลดวงจรที่บันทึกไว้เรียบร้อย':'Circuit loaded.');
 }catch(e){
  note(currentLang==='th'?'ไม่สามารถโหลดวงจรที่บันทึกไว้ได้':'Could not load this saved circuit.');
 }
});

$('downloadJsonBtn').addEventListener('click',exportJSON);
$('importJsonBtn').addEventListener('click',()=>$('fileInput').click());
$('fileInput').addEventListener('change',async e=>{
 const file=e.target.files?.[0];
 if(!file)return;
 try{
  const data=JSON.parse(await file.text());
  const imported=normalizeImported(data);
  snapshot();
  state=imported;
  refreshIds();
  selected=null;
  pending=null;
  applyMutation();
  $('fileDialog').close();
  note(currentLang==='th'?'นำเข้าไฟล์วงจรสำเร็จ':'Circuit imported successfully.');
 }catch(err){
  note(`Could not import: ${err.message}`);
 }
 e.target.value='';
});
$('downloadSvgBtn').addEventListener('click',exportSVG);
$('exportPngBtn').addEventListener('click',exportPNG);

window.addEventListener('keydown',e=>{
 const typing=e.target.matches('input,textarea,[contenteditable="true"]');
 if(e.key==='Escape'){pending=null;drawPreview();return;}
 if(typing)return;
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){
  e.preventDefault();
  e.shiftKey?redoAction():undo();
 }else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='y'){
  e.preventDefault();
  redoAction();
 }else if(e.key==='Delete'||e.key==='Backspace'){
  e.preventDefault();
  deleteSelected();
 }else if(e.key.toLowerCase()==='r'){
  rotateSelected();
 }
});

try{
 const saved=localStorage.getItem('circuitLabAutosave');
 if(saved){state=normalizeImported(JSON.parse(saved));refreshIds();}
}catch(e){
 state=blank();
}

result=analyzeCircuit(state.components,state.wires);
applyLanguage(currentLang);
setView();
