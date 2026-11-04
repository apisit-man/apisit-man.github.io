import assert from 'node:assert/strict';
import fs from 'node:fs';
import {analyzeCircuit} from './solver.js';
import {makeExample,challenges} from './lessons.js';

function simulate(id){const state=makeExample(id);return{state,result:analyzeCircuit(state.components,state.wires)};}
const basic=simulate('basic'),series=simulate('series'),parallel=simulate('parallel'),swt=simulate('switch'),meters=simulate('meters'),short=simulate('short');
const eq=(a,b,tol=0.002)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);

// 1. Core Ohm's Law & Nodal Analysis
eq(basic.result.batteryCurrent,6/24.2);
eq(series.result.batteryCurrent,6/48.2);
eq(parallel.result.batteryCurrent,6/(12+.2));
assert.ok(basic.result.batteryCurrent>series.result.batteryCurrent);
assert.ok(parallel.result.batteryCurrent>basic.result.batteryCurrent);
assert.ok(swt.result.batteryCurrent>0.2);

// 2. Open Switch = Zero Current
const opened=structuredClone(swt.state);
opened.components.find(c=>c.type==='switch').closed=false;
const openedRes=analyzeCircuit(opened.components,opened.wires);
eq(openedRes.batteryCurrent,0,.0001);
for(const w of opened.wires)eq(openedRes.wireCurrents[w.id],0,1e-9);

// 3. Meters & Short-Circuit Detection
assert.ok(Math.abs(meters.result.readings.v1.voltage)>5);
assert.ok(Math.abs(meters.result.readings.a1.current)>.2);
assert.ok(short.result.warnings.some(x=>x.includes('Short circuit')));

// 4. Exact Wire Currents (KCL on Wires & Zero Current on Voltmeter Leads)
eq(basic.result.wireCurrents.w1, 6/24.2, 1e-5);
eq(basic.result.wireCurrents.w2, 6/24.2, 1e-5);
eq(parallel.result.wireCurrents.w1, parallel.result.batteryCurrent/2, 1e-5);
eq(parallel.result.wireCurrents.w2, parallel.result.batteryCurrent/2, 1e-5);
eq(parallel.result.wireCurrents.w3, -parallel.result.batteryCurrent/2, 1e-5);
eq(parallel.result.wireCurrents.w4, -parallel.result.batteryCurrent/2, 1e-5);
// Voltmeter wires w4 and w5 in 'meters' example must carry virtually zero current (< 1 uA)
assert.ok(Math.abs(meters.result.wireCurrents.w4)<1e-6);
assert.ok(Math.abs(meters.result.wireCurrents.w5)<1e-6);

// 5. Zero Ground Leakage on Dangling / Floating Voltmeter Probe & Reference Potential
const floatingV=analyzeCircuit(
 [{id:'b1',type:'battery',value:6},{id:'v1',type:'voltmeter',value:0}],
 [{id:'w1',from:'b1:b',to:'v1:a'}]
);
eq(floatingV.terminalVoltages['b1:a'], 0, 1e-12);
eq(floatingV.terminalVoltages['b1:b'], 6, 1e-12);
eq(floatingV.readings.v1.voltage, 0, 1e-12);

// 6. All 5 Educational Challenges + Reversed-Polarity Parallel & Meter-in-Series Robustness
assert.ok(challenges[0].check(basic.state,basic.result));
assert.ok(challenges[1].check(series.state,series.result));
assert.ok(!challenges[1].check(parallel.state,parallel.result));
assert.ok(challenges[2].check(parallel.state,parallel.result));
assert.ok(challenges[3].check(swt.state,swt.result));
assert.ok(challenges[4].check(meters.state,meters.result));

// Series bulbs with an ammeter inserted between them should still pass Challenge 2
const seriesWithAmmeter={
 components:[
  {id:'b1',type:'battery',value:6},
  {id:'l1',type:'bulb',value:24},
  {id:'a1',type:'ammeter',value:0},
  {id:'l2',type:'bulb',value:24}
 ],
 wires:[
  {id:'w1',from:'b1:b',to:'l1:a'},
  {id:'w2',from:'l1:b',to:'a1:a'},
  {id:'w3',from:'a1:b',to:'l2:a'},
  {id:'w4',from:'l2:b',to:'b1:a'}
 ]
};
assert.ok(challenges[1].check(seriesWithAmmeter,analyzeCircuit(seriesWithAmmeter.components,seriesWithAmmeter.wires)));

// Parallel bulbs with one bulb flipped 180 deg should still pass Challenge 3
const parallelFlipped={
 components:[
  {id:'b1',type:'battery',value:6},
  {id:'l1',type:'bulb',value:24},
  {id:'l2',type:'bulb',value:24,rotation:180}
 ],
 wires:[
  {id:'w1',from:'b1:b',to:'l1:a'},
  {id:'w2',from:'b1:b',to:'l2:b'},
  {id:'w3',from:'b1:a',to:'l1:b'},
  {id:'w4',from:'b1:a',to:'l2:a'}
 ]
};
assert.ok(challenges[2].check(parallelFlipped,analyzeCircuit(parallelFlipped.components,parallelFlipped.wires)));

// 7. Pedagogical Diagnostics (Voltmeter in Series & Ammeter in Parallel)
const vmSeries=analyzeCircuit(
 [{id:'b1',type:'battery',value:6},{id:'v1',type:'voltmeter',value:0},{id:'l1',type:'bulb',value:24}],
 [{id:'w1',from:'b1:b',to:'v1:a'},{id:'w2',from:'v1:b',to:'l1:a'},{id:'w3',from:'l1:b',to:'b1:a'}]
);
assert.ok(vmSeries.diagnostics.includes('voltmeter_series'));

const amParallel=analyzeCircuit(
 [{id:'b1',type:'battery',value:6},{id:'a1',type:'ammeter',value:0}],
 [{id:'w1',from:'b1:b',to:'a1:a'},{id:'w2',from:'a1:b',to:'b1:a'}]
);
assert.ok(amParallel.diagnostics.includes('ammeter_parallel'));

// 8. DOM ID & i18n Key Integrity between index.html and app.js
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
const idsInHtml=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
const dynamicIds=new Set(['deleteSelected','rotateSelected','toggleSwitch','propertyValue','propertySlider','inspectVoltageVal','inspectCurrentVal','inspectPowerVal']);
for(const m of js.matchAll(/\$\('([a-zA-Z0-9_]+)'\)/g)){
 const id=m[1];
 assert.ok(idsInHtml.has(id)||dynamicIds.has(id),`Missing DOM ID in index.html: ${id}`);
}
for(const m of html.matchAll(/data-i18n="([^"]+)"/g)){
 const key=m[1];
 assert.ok(js.includes(`'${key}':`),`Missing i18n key in app.js: ${key}`);
}

console.log('PASS: DC solver, KCL wire currents, zero floating leak, series/parallel, switch, meter diagnostics, short-circuit, 5 educational challenges, and DOM/i18n integrity.');
