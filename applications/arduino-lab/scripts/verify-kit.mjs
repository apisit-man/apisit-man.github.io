import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {lessonIds,normalize,step,defaults} from '../seed/model.mjs';
import {sketch} from '../seed/sketches.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'content/lessons.json'),'utf8'));
assert.deepEqual(catalog.locales,['th','en']);
assert.deepEqual(catalog.lessons.map(l=>l.id),lessonIds);
const localeFields=['title','objective','overview','challenge','reflection'];
for(const [i,l] of catalog.lessons.entries()){
 assert.equal(l.order,i+1);
 for(const field of localeFields){assert.deepEqual(Object.keys(l[field]).sort(),['en','th']);for(const v of Object.values(l[field]))assert.ok(typeof v==='string'&&v.trim());}
 for(const c of l.connections){assert.ok(c.from&&c.to);assert.ok(c.note.th&&c.note.en);}
 assert.deepEqual(normalize(l.id,l.defaultParams),normalize(l.id,defaults[l.id]));
 const result=step(l.id,undefined,l.defaultInputs,l.defaultParams,0);
 assert.ok(result.output.pins);
 const code=sketch(l.id,l.defaultParams);
 assert.ok(code.includes('void setup()')&&code.includes('void loop()'));
 assert.ok(!/undefined|NaN|\{\{/.test(code));
}
const strings=JSON.parse(fs.readFileSync(path.join(root,'seed/ui-strings.json'),'utf8'));
for(const [key,value] of Object.entries(strings)){
 assert.deepEqual(Object.keys(value).sort(),['en','th'],key);
 assert.ok(value.th.trim()&&value.en.trim(),key);
}
for(const f of ['START_HERE.md','AGENTS.md','RESEARCH_REPORT.html','docs/PRODUCT_SPEC.md','docs/WORKFLOW.md','docs/CONTENT_GUIDE.md','docs/ACCEPTANCE.md','docs/DEPLOYMENT.md'])assert.ok(fs.existsSync(path.join(root,f)),f);
const prompts=fs.readdirSync(path.join(root,'prompts')).filter(f=>f.endsWith('.md'));
assert.equal(prompts.length,11);
for(let i=0;i<11;i++)assert.ok(prompts.some(p=>p.startsWith(String(i).padStart(2,'0')+'_')));
console.log(`PASS: ${catalog.lessons.length} bilingual lessons; ${Object.keys(strings).length} UI phrases; ${prompts.length} prompts; seed/source coverage and required files.`);
