// Original educational models. No source execution, full circuit solving or firmware emulation.
export const lessonIds = ['board','blink','button','knob','rgb','light','sensor','sound','piano','motor','heat','servo','stepper','plant','force','project'];
export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const finite = (v, fallback) => typeof v === 'number' && Number.isFinite(v) ? v : fallback;
const integer = (v, fallback, lo, hi) => Math.round(clamp(finite(v, fallback), lo, hi));
const number = (v, fallback, lo, hi) => clamp(finite(v, fallback), lo, hi);
export const defaults = Object.freeze({
  board:{}, blink:{onMs:500,offMs:500}, button:{mode:'hold',debounceMs:30}, knob:{},
  rgb:{r:128,g:64,b:0}, light:{threshold:400}, sensor:{timeoutUs:25000},
  sound:{hz:440,durationMs:1000}, piano:{octave:4}, motor:{pwm:128}, heat:{},
  servo:{angle:90}, stepper:{stepsPerRev:2048,speedRpm:10,direction:1},
  plant:{dryRaw:800,wetRaw:350}, force:{threshold:700}, project:{nearCm:15,farCm:40}
});
export function normalize(id, params = {}) {
  if (!lessonIds.includes(id)) throw new Error('Unknown lesson');
  const p = params && typeof params === 'object' ? params : {};
  switch(id){
    case 'blink':return {onMs:integer(p.onMs,500,50,3000),offMs:integer(p.offMs,500,50,3000)};
    case 'button':return {mode:p.mode==='toggle'?'toggle':'hold',debounceMs:integer(p.debounceMs,30,10,100)};
    case 'rgb':return {r:integer(p.r,128,0,255),g:integer(p.g,64,0,255),b:integer(p.b,0,0,255)};
    case 'light':return {threshold:integer(p.threshold,400,0,1023)};
    case 'sensor':return {timeoutUs:integer(p.timeoutUs,25000,1000,30000)};
    case 'sound':return {hz:integer(p.hz,440,100,2000),durationMs:integer(p.durationMs,1000,100,3000)};
    case 'piano':return {octave:p.octave===5?5:4};
    case 'motor':return {pwm:integer(p.pwm,128,0,255)};
    case 'servo':return {angle:integer(p.angle,90,0,180)};
    case 'stepper':return {stepsPerRev:integer(p.stepsPerRev,2048,200,4096),speedRpm:integer(p.speedRpm,10,1,15),direction:p.direction===-1?-1:1};
    case 'plant':{
      // This chosen analogue module has a higher raw reading when dry. Require useful span.
      const wetRaw=integer(p.wetRaw,350,0,973);
      return {wetRaw,dryRaw:integer(p.dryRaw,800,wetRaw+50,1023)};
    }
    case 'force':return {threshold:integer(p.threshold,700,1,1023)};
    case 'project':{
      const nearCm=integer(p.nearCm,15,2,100);
      return {nearCm,farCm:integer(p.farCm,40,nearCm+1,200)};
    }
    default:return {};
  }
}
export function initialState(){return {timeMs:0,stablePressed:false,candidatePressed:false,candidateSinceMs:0,toggled:false,steps:0};}
export function step(id, previous = initialState(), inputs = {}, params = {}, dtMs = 0){
  const p=normalize(id,params);
  const dt=number(dtMs,0,0,1000);
  const s={...previous,timeMs:previous.timeMs+dt};
  let output={};
  switch(id){
    case 'board':output={led:true,pins:{D13:1}};break;
    case 'blink':{
      const led=s.timeMs%(p.onMs+p.offMs)<p.onMs;
      output={led,pins:{D13:+led},periodMs:p.onMs+p.offMs};break;
    }
    case 'button':{
      const pressed=inputs.pressed===true;
      if(pressed!==s.candidatePressed){s.candidatePressed=pressed;s.candidateSinceMs=s.timeMs;}
      if(s.timeMs-s.candidateSinceMs>=p.debounceMs && s.stablePressed!==s.candidatePressed){
        s.stablePressed=s.candidatePressed;
        if(s.stablePressed)s.toggled=!s.toggled;
      }
      const led=p.mode==='toggle'?s.toggled:s.stablePressed;
      output={pressed,stablePressed:s.stablePressed,led,pins:{D2:pressed?0:1,D13:+led}};break;
    }
    case 'knob':{
      const adc=integer(inputs.adc,512,0,1023),pwm=Math.trunc(adc*255/1023);
      output={adc,pwm,duty:pwm/255,pins:{A0:adc,D9:pwm}};break;
    }
    case 'rgb':output={...p,hex:'#'+[p.r,p.g,p.b].map(v=>v.toString(16).padStart(2,'0')).join(''),pins:{D9:p.r,D10:p.g,D11:p.b}};break;
    case 'light':{
      const adc=integer(inputs.lightAdc,600,0,1023),led=adc<p.threshold;
      output={adc,led,pins:{A0:adc,D13:+led}};break;
    }
    case 'sensor':case 'project':{
      const value=inputs.distanceCm;
      const distanceCm=value===null?null:number(value,30,2,400);
      const echoUs=distanceCm===null?0:Math.round(distanceCm*2/0.0343);
      const timeoutUs=id==='sensor'?p.timeoutUs:25000;
      const valid=distanceCm!==null&&echoUs<timeoutUs;
      const measuredCm=valid?echoUs*0.0343/2:null;
      output={distanceCm:measuredCm,echoUs:valid?echoUs:0,valid,pins:{D9:1,D10:valid?1:0}};
      if(id==='project'){
        const light=!valid?'unknown':measuredCm<=p.nearCm?'red':measuredCm<=p.farCm?'yellow':'green';
        output={...output,light,pins:{...output.pins,D4:+(light==='red'),D3:+(light==='yellow'),D2:+(light==='green')}};
      }
      break;
    }
    case 'sound':output={hz:s.timeMs<p.durationMs?p.hz:0,active:s.timeMs<p.durationMs,pins:{D8:s.timeMs<p.durationMs?1:0}};break;
    case 'piano':{
      const key=Number.isInteger(inputs.key)&&inputs.key>=0&&inputs.key<8?inputs.key:null;
      const notes=[262,294,330,349,392,440,494,523];
      const hz=key===null?0:notes[key]*(p.octave===5?2:1);
      output={key,hz,active:hz>0,pins:{D10:hz?1:0,...Object.fromEntries(notes.map((_,i)=>['D'+(i+2),i===key?0:1]))}};break;
    }
    case 'motor':output={pwm:p.pwm,duty:p.pwm/255,relativeSpeed:p.pwm/255,pins:{D5:p.pwm}};break;
    case 'heat':{
      const environmentC=number(inputs.tempC,25,-40,125);
      const adc=integer((0.5+environmentC/100)/5*1023,153,0,1023);
      output={environmentC,adc,voltage:adc*5/1023,tempC:(adc*5/1023-0.5)*100,pins:{A0:adc}};break;
    }
    case 'servo':output={angle:p.angle,pins:{D9:p.angle},nominal:true};break;
    case 'stepper':{
      s.steps+=dt*p.speedRpm*p.stepsPerRev/60000*p.direction;
      const completedSteps=Math.trunc(s.steps),wrapped=((completedSteps%p.stepsPerRev)+p.stepsPerRev)%p.stepsPerRev;
      output={steps:completedSteps,angle:wrapped/p.stepsPerRev*360,phase:((completedSteps%4)+4)%4,pins:{D8:0,D9:0,D10:0,D11:0}};
      // Two-coil full-step sequence; connector order follows the Stepper constructor example.
      const coils=[[1,0,1,0],[0,1,1,0],[0,1,0,1],[1,0,0,1]][output.phase];
      [8,10,9,11].forEach((pin,i)=>output.pins['D'+pin]=coils[i]);break;
    }
    case 'plant':{
      const adc=integer(inputs.moistureRaw,600,0,1023);
      const relativePercent=clamp(Math.trunc((adc-p.dryRaw)*100/(p.wetRaw-p.dryRaw)),0,100);
      output={adc,relativePercent,condition:relativePercent<30?'dry':relativePercent>80?'wet':'ok',pins:{A0:adc}};break;
    }
    case 'force':{
      const adc=integer(inputs.fsrAdc,0,0,1023),bell=adc>=p.threshold;
      output={adc,angle:Math.trunc(adc*180/1023),bell,hz:bell?1568:0,pins:{A0:adc,D9:Math.trunc(adc*180/1023),D8:+bell}};break;
    }
  }
  return {state:s,params:p,output};
}
