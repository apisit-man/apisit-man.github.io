const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const questJs = fs.readFileSync(path.join(__dirname, 'quest.js'), 'utf8');
const lesionJs = fs.readFileSync(path.join(__dirname, 'lesion-simulator.js'), 'utf8');
const caseJs = fs.readFileSync(path.join(__dirname, 'case-studies.js'), 'utf8');
const eegJs = fs.readFileSync(path.join(__dirname, 'eeg-lab.js'), 'utf8');
const i18nJs = fs.readFileSync(path.join(__dirname, 'i18n.js'), 'utf8');
const probeJs = fs.readFileSync(path.join(__dirname, 'stereotaxic-probe.js'), 'utf8');
const socraticJs = fs.readFileSync(path.join(__dirname, 'socratic-tutor.js'), 'utf8');
const tractsJs = fs.readFileSync(path.join(__dirname, 'white-matter-tracts.js'), 'utf8');

// Find all getElementById calls
const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
const ids = new Set();
let m;
while ((m = regex.exec(appJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(questJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(lesionJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(caseJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(eegJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(i18nJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(probeJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(socraticJs)) !== null) ids.add(m[1]);
while ((m = regex.exec(tractsJs)) !== null) ids.add(m[1]);



console.log(`Checking ${ids.size} unique DOM IDs referenced in JS...`);
let missing = 0;
for (const id of ids) {
  if (!html.includes(`id="${id}"`)) {
    console.error(`MISSING in index.html: id="${id}"`);
    missing++;
  } else {
    // console.log(`Found: id="${id}"`);
  }
}

if (missing === 0) {
  console.log(`ALL ${ids.size} DOM IDs verified successfully in index.html!`);
} else {
  console.error(`FAILED: ${missing} missing DOM IDs found.`);
  process.exit(1);
}
