/* Circuit Lab DC analysis: resistive nodal network with finite battery internal resistance. */
export const COMPONENTS = {
 battery:{label:'Battery',labelTh:'แบตเตอรี่',unit:'V',defaultValue:6,min:0.5,max:24,step:0.5},
 bulb:{label:'Light bulb',labelTh:'หลอดไฟ',unit:'Ω',defaultValue:24,min:1,max:1000,step:1},
 resistor:{label:'Resistor',labelTh:'ตัวต้านทาน',unit:'Ω',defaultValue:20,min:0.1,max:10000,step:1},
 switch:{label:'Switch',labelTh:'สวิตช์',unit:'',defaultValue:0},
 ammeter:{label:'Ammeter',labelTh:'แอมมิเตอร์',unit:'',defaultValue:0},
 voltmeter:{label:'Voltmeter',labelTh:'โวลต์มิเตอร์',unit:'',defaultValue:0}
};
const ROUND = x => Number.isFinite(x) ? x : 0;
class DSU {
 constructor(ids){this.p=new Map(ids.map(x=>[x,x]));}
 find(x){const p=this.p.get(x);if(p===undefined)return null;if(p===x)return x;const root=this.find(p);this.p.set(x,root);return root;}
 union(a,b){const x=this.find(a),y=this.find(b);if(x!==null&&y!==null&&x!==y)this.p.set(x,y);}
}
function solveLinear(A,b){
 const n=b.length;if(!n)return[];
 const m=A.map((r,i)=>[...r,b[i]]);
 for(let k=0;k<n;k++){
  let pivot=k;for(let i=k+1;i<n;i++)if(Math.abs(m[i][k])>Math.abs(m[pivot][k]))pivot=i;
  if(Math.abs(m[pivot][k])<1e-14)return null;
  [m[k],m[pivot]]=[m[pivot],m[k]];
  const v=m[k][k];for(let j=k;j<=n;j++)m[k][j]/=v;
  for(let i=0;i<n;i++)if(i!==k){const f=m[i][k];if(!f)continue;for(let j=k;j<=n;j++)m[i][j]-=f*m[k][j];}
 }
 return m.map(r=>r[n]);
}
export function analyzeCircuit(components=[], wires=[]){
 const ids=components.flatMap(c=>[`${c.id}:a`,`${c.id}:b`]);const present=new Set(ids);const dsu=new DSU(ids);
 for(const w of wires){if(present.has(w.from)&&present.has(w.to))dsu.union(w.from,w.to);}
 const roots=[...new Set(ids.map(id=>dsu.find(id)))]; const index=new Map(roots.map((r,i)=>[r,i]));const n=roots.length;
 const G=Array.from({length:n},()=>Array(n).fill(0));const injections=Array(n).fill(0);const branches=[];const warnings=[];
 const islandDsu=new DSU(Array.from({length:n},(_,i)=>i));
 for(const c of components){
  const a=index.get(dsu.find(`${c.id}:a`)), b=index.get(dsu.find(`${c.id}:b`));
  if(a===undefined||b===undefined)continue;
  let resistance=0,source=0,open=false;
  switch(c.type){
   case 'battery': resistance=0.2;source=Math.max(0.5,Math.min(24,Number(c.value)||6));break;
   case 'resistor':case 'bulb':resistance=Math.max(0.1,Number(c.value)||COMPONENTS[c.type].defaultValue);break;
   case 'switch':resistance=c.closed?0.005:Infinity;open=!c.closed;break;
   case 'ammeter':resistance=0.02;break;
   case 'voltmeter':resistance=1e8;break;
   default:continue;
  }
  branches.push({id:c.id,type:c.type,a,b,resistance,source,open});
  if(open)continue;
  islandDsu.union(a,b);
  const g=1/resistance;
  G[a][a]+=g;G[b][b]+=g;G[a][b]-=g;G[b][a]-=g;
  if(source){injections[a]-=source*g;injections[b]+=source*g;if(a===b)warnings.push('Short circuit: a battery has both terminals connected by wire. Disconnect the short immediately.');}
 }
 // Anchor exactly one reference node per conductive island to 0 V (eliminates floating-node ground leakage).
 const islands=new Map();
 for(let i=0;i<n;i++){
  const r=islandDsu.find(i);
  if(!islands.has(r))islands.set(r,[]);
  islands.get(r).push(i);
 }
 for(const nodes of islands.values()){
  const batt=branches.find(br=>br.type==='battery'&&!br.open&&nodes.includes(br.a));
  const refNode=batt?batt.a:nodes[0];
  G[refNode][refNode]+=1;
 }
 const potentials=solveLinear(G,injections)||Array(n).fill(0);
 const readings={};let powered=false,totalPower=0;
 const termInj=new Map(ids.map(id=>[id,0]));
 for(const br of branches){
  const va=ROUND(potentials[br.a]),vb=ROUND(potentials[br.b]);
  const current=br.open?0:(va-vb+br.source)/br.resistance;
  const voltage=va-vb;
  const power=(br.type==='battery'||br.open)?0:current*current*br.resistance;
  if(br.type==='bulb'&&power>0.03)powered=true;
  if(br.type==='resistor'||br.type==='bulb')totalPower+=power;
  readings[br.id]={current:ROUND(current),voltage:ROUND(voltage),power:ROUND(power),brightness:br.type==='bulb'?Math.min(1,Math.max(0,power/1.5)):0,open:br.open};
  termInj.set(`${br.id}:a`,(termInj.get(`${br.id}:a`)||0)-ROUND(current));
  termInj.set(`${br.id}:b`,(termInj.get(`${br.id}:b`)||0)+ROUND(current));
 }
 // Solve exact signed current in each individual wire via KCL on each wire cluster.
 const wireCurrents={};
 const clusters=new Map();
 for(const id of ids){
  const r=dsu.find(id);
  if(!clusters.has(r))clusters.set(r,[]);
  clusters.get(r).push(id);
 }
 for(const [r,cIds] of clusters.entries()){
  const cWires=wires.filter(w=>present.has(w.from)&&present.has(w.to)&&dsu.find(w.from)===r);
  if(!cWires.length)continue;
  const m=cIds.length;
  if(m===1){for(const w of cWires)wireCurrents[w.id]=0;continue;}
  const lIdx=new Map(cIds.map((id,i)=>[id,i]));
  const Lw=Array.from({length:m},()=>Array(m).fill(0));
  const bw=cIds.map(id=>termInj.get(id)||0);
  for(const w of cWires){
   const u=lIdx.get(w.from),v=lIdx.get(w.to);
   if(u!==undefined&&v!==undefined&&u!==v){Lw[u][u]+=1;Lw[v][v]+=1;Lw[u][v]-=1;Lw[v][u]-=1;}
  }
  Lw[0][0]+=1;
  const phi=solveLinear(Lw,bw)||Array(m).fill(0);
  for(const w of cWires){
   const u=lIdx.get(w.from),v=lIdx.get(w.to);
   wireCurrents[w.id]=ROUND((phi[u]||0)-(phi[v]||0));
  }
 }
 const batteries=components.filter(c=>c.type==='battery');
 const batteryCurrent=batteries.reduce((s,c)=>s+Math.max(0,readings[c.id]?.current||0),0);
 if(batteryCurrent>8)warnings.push('Very high current: reduce the load or disconnect the circuit.');
 const diagnostics=[];
 for(const c of components){
  if(c.type==='ammeter'&&Math.abs(readings[c.id]?.current||0)>5){
   diagnostics.push('ammeter_parallel');
  }
  if(c.type==='voltmeter'&&Math.abs(readings[c.id]?.voltage||0)>0.4&&batteryCurrent<0.0001&&components.some(x=>x.type==='bulb'&&Math.abs(readings[x.id]?.current||0)<0.0001)){
   diagnostics.push('voltmeter_series');
  }
 }
 const result={readings,wireCurrents,diagnostics,powered,totalPower,batteryCurrent,warnings,potentials,terminalVoltages:Object.fromEntries(ids.map(id=>[id,potentials[index.get(dsu.find(id))]||0]))};
 return result;
}
