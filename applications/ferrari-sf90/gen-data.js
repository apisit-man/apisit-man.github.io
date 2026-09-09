const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, 'models', 'ferrari_official.glb');
const aoPath = path.join(__dirname, 'models', 'ferrari_ao.png');
const outPath = path.join(__dirname, 'models', 'ferrari_model_data.js');

const glbB64 = fs.readFileSync(glbPath).toString('base64');
const aoB64 = fs.readFileSync(aoPath).toString('base64');

const content = `export const FERRARI_GLB_BASE64 = "${glbB64}";
export const FERRARI_AO_BASE64 = "data:image/png;base64,${aoB64}";
`;

fs.writeFileSync(outPath, content);
console.log('ferrari_model_data.js written with GLB & AO, size:', (fs.statSync(outPath).size / 1024 / 1024).toFixed(2), 'MB');
