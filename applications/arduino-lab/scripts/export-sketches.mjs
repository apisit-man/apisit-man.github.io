import fs from 'node:fs';
import path from 'node:path';
import {lessonIds} from '../seed/model.mjs';
import {sketch} from '../seed/sketches.mjs';
if(process.argv.includes('--help')){console.log('node scripts/export-sketches.mjs [output-directory]\nWrites default .ino examples in Arduino-compatible per-sketch folders. Does not compile or upload.');process.exit(0);}
const dest=path.resolve(process.argv[2]||'generated-sketches');
for(const id of lessonIds){const name='lab_'+id;const dir=path.join(dest,name);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,name+'.ino'),sketch(id));}
console.log(`Wrote ${lessonIds.length} default examples to ${dest}; not compiler-verified.`);
