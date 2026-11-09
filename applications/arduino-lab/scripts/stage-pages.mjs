import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const args=process.argv.slice(2);
if(args.includes('--help')){
 console.log('node scripts/stage-pages.mjs --dist app/dist --repo ../site --publish-root .|docs [--apply]\nDry-run by default. For verified branch-published static trees only. Copies to projects/arduino-lab without deleting, committing or pushing.');process.exit(0);
}
const allowed=new Set(['--dist','--repo','--publish-root','--apply']);
const opts={};
for(let i=0;i<args.length;i++){
 const a=args[i];if(!allowed.has(a))throw new Error('Unknown option '+a);
 if(a==='--apply'){opts.apply=true;continue;}
 if(!args[i+1]||args[i+1].startsWith('--'))throw new Error('Missing value '+a);
 opts[a.slice(2)]=args[++i];
}
if(!opts.repo)throw new Error('Explicit --repo is required');
if(!['.','docs'].includes(opts['publish-root']))throw new Error('Explicit --publish-root must be . or docs; inspect actual Pages settings first');
const repo=fs.realpathSync(path.resolve(opts.repo));
const gitRoot=fs.realpathSync(execFileSync('git',['-C',repo,'rev-parse','--show-toplevel'],{encoding:'utf8'}).trim());
if(repo.toLowerCase()!==gitRoot.toLowerCase())throw new Error('--repo must name the checkout root');
const dist=fs.realpathSync(path.resolve(opts.dist||'app/dist'));
const relTarget=path.join(opts['publish-root'],'projects','arduino-lab');
const target=path.resolve(repo,relTarget);
if(!target.startsWith(repo+path.sep)||target===repo)throw new Error('Unsafe target');
if(dist===target||target.startsWith(dist+path.sep)||dist.startsWith(target+path.sep))throw new Error('Source and target must not overlap');
for(let cursor=target;cursor!==repo;cursor=path.dirname(cursor))if(fs.existsSync(cursor)&&fs.lstatSync(cursor).isSymbolicLink())throw new Error('Target ancestor is a symlink');
if(!fs.existsSync(path.join(dist,'index.html')))throw new Error('Missing dist/index.html');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){
 const abs=path.join(dir,item.name);
 if(item.isSymbolicLink())throw new Error('Source symlinks are forbidden');
 if(item.isDirectory()){if(['node_modules','.git'].includes(item.name))throw new Error('Unexpected source directory');walk(abs);}
 else if(item.isFile()){
  const rel=path.relative(dist,abs).split(path.sep).join('/');
  if(rel==='arduino-lab-build-manifest.json'||/\.env(?:\.|$)/.test(item.name))throw new Error('Unexpected source file '+rel);
  files.push({path:rel,sha256:hash(abs)});
 }
}}
walk(dist);
const manifestPath=path.join(target,'arduino-lab-build-manifest.json');
let prior=null;
if(fs.existsSync(manifestPath)){
 if(fs.lstatSync(manifestPath).isSymbolicLink())throw new Error('Manifest is symlink');
 prior=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
 if(prior.owner!=='arduino-lab-th-en'||!Array.isArray(prior.files))throw new Error('Invalid ownership manifest');
 for(const f of prior.files){
  if(typeof f.path!=='string'||f.path.includes('\\')||f.path.split('/').some(p=>p==='..'||p==='')||path.isAbsolute(f.path))throw new Error('Invalid prior manifest path');
  const old=path.join(target,f.path);
  // Inspect every ancestor, not just the leaf, before reading.
  for(let cursor=old;cursor!==target;cursor=path.dirname(cursor))if(fs.existsSync(cursor)&&fs.lstatSync(cursor).isSymbolicLink())throw new Error('Prior file path contains symlink');
  if(fs.existsSync(old)&&hash(old)!==f.sha256)throw new Error('Previously deployed file was edited: '+f.path);
 }
}else if(fs.existsSync(target)&&fs.readdirSync(target).length)throw new Error('Existing nonempty target has no app ownership manifest; inspect and integrate manually');
const owned=new Set((prior?.files||[]).map(f=>f.path));
for(const f of files){
 const dest=path.join(target,f.path);
 for(let cursor=dest;cursor!==target;cursor=path.dirname(cursor))if(fs.existsSync(cursor)&&fs.lstatSync(cursor).isSymbolicLink())throw new Error('Destination path contains symlink');
 if(fs.existsSync(dest)&&!owned.has(f.path))throw new Error('Refusing to overwrite an unowned file: '+f.path);
}
const dirty=execFileSync('git',['-C',repo,'status','--porcelain','--',relTarget],{encoding:'utf8'}).trim();
console.log(JSON.stringify({mode:opts.apply?'apply':'dry-run',repo,publishRoot:opts['publish-root'],target,files:files.length,staleAssetsRetained:(prior?.files||[]).filter(f=>!files.some(n=>n.path===f.path)).length,targetHasUncommittedChanges:!!dirty},null,2));
if(!opts.apply){console.log('No files changed. Verify Pages source and target before adding --apply.');process.exit(0);}
if(dirty)throw new Error('Target contains uncommitted changes; preserve/review them before staging a new build');
fs.mkdirSync(target,{recursive:true});
for(const f of files){const dest=path.join(target,f.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(dist,f.path),dest);}
// Retain ownership of old unchanged assets. Cleanup is a separate deliberate operation.
const currentPaths=new Set(files.map(f=>f.path));
const retained=(prior?.files||[]).filter(f=>!currentPaths.has(f.path)&&fs.existsSync(path.join(target,f.path)));
fs.writeFileSync(manifestPath,JSON.stringify({schemaVersion:1,owner:'arduino-lab-th-en',files:[...files,...retained]},null,2)+'\n');
console.log('Copied build only. Review git diff; nothing committed, pushed, deleted or deployed.');
