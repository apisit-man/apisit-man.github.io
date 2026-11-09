import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
if(process.argv.includes('--help')){console.log('node scripts/audit-build.mjs app/dist\nStatic heuristic checks only; also run nested-path browser tests.');process.exit(0);}
const root=path.resolve(process.argv[2]||'app/dist');
assert.ok(fs.existsSync(path.join(root,'index.html')),'Missing built index.html');
let count=0,total=0;
function visit(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name),rel=path.relative(root,file);
 assert.ok(!entry.isSymbolicLink(),'No symlinks in dist: '+rel);
 if(entry.isDirectory()){assert.ok(!['node_modules','.git','.env','research','prompts'].includes(entry.name),'Unexpected directory '+rel);visit(file);continue;}
 assert.ok(!/\.env(?:\.|$)|\.map$/.test(entry.name),'Unexpected build file '+rel);
 count++;total+=fs.statSync(file).size;
 if(/\.(?:html|css|js)$/.test(entry.name)){
  const text=fs.readFileSync(file,'utf8');
  assert.ok(!/learn-arduino-red\.vercel\.app|\/api\/compile/.test(text),'Reference/compiler dependency in '+rel);
  if(entry.name.endsWith('.html'))assert.ok(!/(?:src|href)\s*=\s*["']\/(?!\/)/.test(text),'Root-relative HTML asset in '+rel);
 }
}}
visit(root);
console.log(`PASS static audit: ${count} files, ${total} bytes. Still requires actual nested-path browser/network checks.`);
