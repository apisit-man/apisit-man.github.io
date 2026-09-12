const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const npxCacheDir = 'C:\\Users\\atong\\AppData\\Local\\npm-cache\\_npx';
let esbuildExe = '';
if (fs.existsSync(npxCacheDir)) {
  const dirs = fs.readdirSync(npxCacheDir);
  for (const d of dirs) {
    const candidate = path.join(npxCacheDir, d, 'node_modules', '@esbuild', 'win32-x64', 'esbuild.exe');
    if (fs.existsSync(candidate)) {
      esbuildExe = candidate;
      break;
    }
  }
}

if (!esbuildExe) {
  console.error('esbuild.exe not found in npm cache');
  process.exit(1);
}

console.log('Building Circuit Racing Mobile bundle with esbuild:', esbuildExe);

execFileSync(esbuildExe, [
  'app.js',
  '--bundle',
  '--minify',
  '--outfile=bundle.js',
  '--format=iife',
  '--define:import.meta.url="https://www.gstatic.com/draco/versioned/decoders/1.5.7/"'
], { stdio: 'inherit', cwd: __dirname });

console.log('Circuit Racing Mobile bundle built successfully!');
