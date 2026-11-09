import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {execFileSync,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {step,initialState,normalize,lessonIds} from '../seed/model.mjs';
import {sketch} from '../seed/sketches.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=(id,input={},params={},dt=0)=>step(id,undefined,input,params,dt).output;
test('all16 known lessons have finite outputs and generated sketches',()=>{
 assert.equal(lessonIds.length,16);
 for(const id of lessonIds){const o=output(id);assert.ok(o.pins);assert.doesNotMatch(JSON.stringify(o),/NaN|Infinity/);assert.match(sketch(id),/void setup\(\)/);}
});
test('unknown lesson IDs rejected',()=>assert.throws(()=>normalize('not-a-lesson')));
test('board example turns on onboard LED',()=>assert.equal(output('board').pins.D13,1));
test('blink independent timing fixture',()=>{
 let state=initialState();
 assert.equal(step('blink',state,{}, {onMs:250,offMs:250},0).output.led,true);
 let r=step('blink',state,{}, {onMs:250,offMs:250},249);assert.equal(r.output.led,true);
 r=step('blink',r.state,{}, {onMs:250,offMs:250},1);assert.equal(r.output.led,false);
 r=step('blink',r.state,{}, {onMs:250,offMs:250},250);assert.equal(r.output.led,true);
 assert.equal(r.output.periodMs,500);
});
test('button uses active-low and debounce',()=>{
 let r=step('button',initialState(),{pressed:true},{},0);assert.equal(r.output.pins.D2,0);assert.equal(r.output.led,false);
 r=step('button',r.state,{pressed:true},{},29);assert.equal(r.output.led,false);
 r=step('button',r.state,{pressed:true},{},1);assert.equal(r.output.led,true);
 r=step('button',r.state,{pressed:false},{},0);assert.equal(r.output.pins.D2,1);
 r=step('button',r.state,{pressed:false},{},30);assert.equal(r.output.led,false);
});
test('toggle changes once per debounced press',()=>{
 const p={mode:'toggle',debounceMs:30};let s=initialState();
 const advance=(pressed,dt)=>{const r=step('button',s,{pressed},p,dt);s=r.state;return r.output.led;};
 advance(true,0);assert.equal(advance(true,30),true);assert.equal(advance(true,1000),true);
 advance(false,0);advance(false,30);advance(true,0);assert.equal(advance(true,30),false);
});
test('short button bounce ignored',()=>{
 let r=step('button',initialState(),{pressed:true},{},0);
 r=step('button',r.state,{pressed:false},{},5);
 r=step('button',r.state,{pressed:false},{},40);assert.equal(r.output.led,false);
});
test('knob endpoint and integer mapping fixtures',()=>{
 for(const [adc,pwm] of [[0,0],[512,127],[1023,255]])assert.equal(output('knob',{adc}).pwm,pwm);
 assert.equal(output('knob',{adc:1023}).duty,1);
});
test('RGB independent channels form magenta',()=>assert.equal(output('rgb',{}, {r:255,g:0,b:255}).hex,'#ff00ff'));
test('light strict threshold',()=>{for(const [lightAdc,led] of [[399,true],[400,false],[401,false]])assert.equal(output('light',{lightAdc}).led,led);});
test('ultrasonic round trip and timeout',()=>{
 const o=output('sensor',{distanceCm:30});assert.ok(Math.abs(o.echoUs-1749)<2);assert.ok(Math.abs(o.distanceCm-30)<0.02);
 assert.equal(output('sensor',{distanceCm:null}).distanceCm,null);
 assert.equal(output('sensor',{distanceCm:400},{timeoutUs:1000}).valid,false);
});
test('one-shot sound ends at duration',()=>{assert.equal(output('sound',{}, {hz:880,durationMs:100},0).hz,880);assert.equal(output('sound',{}, {hz:880,durationMs:100},100).hz,0);});
test('piano endpoints and octave',()=>{assert.equal(output('piano',{key:0}).hz,262);assert.equal(output('piano',{key:7},{octave:5}).hz,1046);assert.equal(output('piano',{key:null}).hz,0);});
test('motor duty endpoints are not an RPM claim',()=>{assert.equal(output('motor',{}, {pwm:0}).relativeSpeed,0);assert.equal(output('motor',{}, {pwm:255}).relativeSpeed,1);assert.ok(!('rpm' in output('motor')));});
test('TMP36 voltage and quantized reconstruction',()=>{
 const o=output('heat',{tempC:25});assert.equal(o.adc,153);assert.ok(Math.abs(o.voltage-0.75)<0.003);assert.ok(Math.abs(o.tempC-25)<0.25);
 assert.ok(Math.abs(output('heat',{tempC:-40}).tempC+40)<0.25);
});
test('servo command clamps to nominal bounds',()=>{assert.equal(output('servo',{}, {angle:300}).angle,180);assert.equal(output('servo',{}, {angle:-1}).angle,0);});
test('stepper count and reversal',()=>{
 let s=initialState();for(let i=0;i<3;i++)s=step('stepper',s,{}, {stepsPerRev:200,speedRpm:10},1000).state;
 let r=step('stepper',s,{}, {stepsPerRev:200,speedRpm:10},0);assert.equal(r.output.steps,100);assert.equal(r.output.angle,180);
 r=step('stepper',s,{}, {stepsPerRev:200,speedRpm:10,direction:-1},1000);assert.ok(r.output.steps<100);
});
test('plant calibration endpoints midpoint and clamp',()=>{
 for(const [moistureRaw,expected] of [[800,0],[575,50],[350,100],[0,100],[1023,0]])assert.equal(output('plant',{moistureRaw}).relativePercent,expected);
 const p=normalize('plant',{wetRaw:900,dryRaw:900});assert.ok(p.dryRaw-p.wetRaw>=50);
});
test('FSR boundary is inclusive and uncalibrated',()=>{assert.equal(output('force',{fsrAdc:699}).bell,false);assert.equal(output('force',{fsrAdc:700}).bell,true);assert.equal(output('force',{fsrAdc:1023}).angle,180);assert.ok(!('newtons' in output('force')));});
test('parking indicator disjoint bands and no echo',()=>{
 for(const [distanceCm,light] of [[10,'red'],[20,'yellow'],[50,'green'],[null,'unknown']]){
  const o=output('project',{distanceCm});assert.equal(o.light,light);assert.equal(o.pins.D2+o.pins.D3+o.pins.D4,light==='unknown'?0:1);
 }
 const p=normalize('project',{nearCm:90,farCm:2});assert.equal(p.farCm,91);
});
test('nonfinite and injected parameters normalize to safe values',()=>{
 assert.deepEqual(normalize('blink',{onMs:NaN,offMs:'1);malicious()'}),{onMs:500,offMs:500});
 assert.equal(normalize('rgb',{r:Infinity,g:-10,b:999}).b,255);
 assert.doesNotMatch(sketch('servo',{angle:'<script>'}),/<script>|NaN|undefined/);
});
test('code settings align with independent expected fragments',()=>{
 assert.match(sketch('blink',{onMs:250,offMs:750}),/delay\(250\)/);
 assert.match(sketch('blink',{onMs:250,offMs:750}),/delay\(750\)/);
 assert.match(sketch('button',{mode:'toggle'}),/INPUT_PULLUP/);
 assert.match(sketch('button',{mode:'toggle'}),/if \(stable\) led = !led/);
 assert.match(sketch('sensor'),/pulseIn\(10, HIGH, 25000UL\)/);
 assert.match(sketch('project',{nearCm:20,farCm:80}),/cm > 20 && cm <= 80/);
 assert.match(sketch('plant'),/map\(raw, 800, 350, 0, 100\)/);
});
test('catalog locale fields and ordering are complete',()=>{
 const c=JSON.parse(fs.readFileSync(path.join(root,'content/lessons.json'),'utf8'));
 assert.deepEqual(c.lessons.map(l=>l.id),lessonIds);
 for(const l of c.lessons)for(const f of ['title','objective','overview','challenge','reflection'])assert.ok(l[f].th&&l[f].en);
});
test('export script creates Arduino-compatible sketch folders',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'arduino-export-'));
 try{execFileSync(process.execPath,[path.join(root,'scripts/export-sketches.mjs'),temp]);assert.equal(fs.readdirSync(temp).length,16);assert.match(fs.readFileSync(path.join(temp,'lab_blink/lab_blink.ino'),'utf8'),/delay\(500\)/);}
 finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('deployment staging dry-run and guards preserve an unrelated site',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'arduino-stage-'));
 try{
  const repo=path.join(temp,'site'),dist=path.join(temp,'dist');fs.mkdirSync(repo);fs.mkdirSync(dist);
  execFileSync('git',['init','--quiet',repo]);fs.writeFileSync(path.join(repo,'index.html'),'Existing website');
  execFileSync('git',['-C',repo,'add','.']);execFileSync('git',['-C',repo,'-c','user.name=Test','-c','user.email=test@example.invalid','commit','-qm','initial']);
  fs.writeFileSync(path.join(dist,'index.html'),'App build');
  const argv=[path.join(root,'scripts/stage-pages.mjs'),'--repo',repo,'--dist',dist,'--publish-root','.'];
  execFileSync(process.execPath,argv);assert.equal(fs.existsSync(path.join(repo,'projects')),false);
  execFileSync(process.execPath,[...argv,'--apply']);assert.equal(fs.readFileSync(path.join(repo,'index.html'),'utf8'),'Existing website');
  assert.equal(fs.readFileSync(path.join(repo,'projects/arduino-lab/index.html'),'utf8'),'App build');
  const blocked=spawnSync(process.execPath,[...argv,'--apply'],{encoding:'utf8'});assert.notEqual(blocked.status,0);assert.match(blocked.stderr,/uncommitted changes/);
  execFileSync('git',['-C',repo,'add','.']);execFileSync('git',['-C',repo,'-c','user.name=Test','-c','user.email=test@example.invalid','commit','-qm','app']);
  fs.writeFileSync(path.join(repo,'projects/arduino-lab/index.html'),'User edit');
  const edited=spawnSync(process.execPath,[...argv,'--apply'],{encoding:'utf8'});assert.notEqual(edited.status,0);assert.match(edited.stderr,/was edited/);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
