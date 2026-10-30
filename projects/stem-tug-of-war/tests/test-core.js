const assert = require('node:assert/strict');
const core = require('../js/game-core.js');
require('../js/questions.js');
const bank = global.STEM_BUILTIN_QUESTIONS;
assert.equal(bank.length,100,'100 curated questions');
for (const c of ['systems','design','materials','mechanics','data']) {
  assert.equal(bank.filter(q=>q.category===c).length,20,`${c} has 20 questions`);
}
for(const q of bank) assert.equal(core.validateQuestion(q),null,`valid question ${q.id}`);
assert.equal(new Set(bank.map(q=>q.id)).size,100,'no duplicate IDs');
assert.equal(core.moveForAnswer(0,'blue',true),-2);
assert.equal(core.moveForAnswer(0,'red',true),2);
assert.equal(core.moveForAnswer(0,'blue',false),1);
assert.equal(core.moveForAnswer(0,'red',false),-1);
assert.equal(core.moveForAnswer(-11,'blue',true),-12);
assert.equal(core.moveForAnswer(11,'red',true),12);
assert.equal(core.moveForAnswer(-12,'blue',true),-12);
assert.equal(core.moveForAnswer(12,'red',true),12);
assert.equal(core.classifyRound(0),'tie');
assert.equal(core.classifyRound(-1),'blue');
assert.equal(core.classifyRound(1),'red');
assert.equal(core.hasReachedGoal(-11),false);
assert.equal(core.hasReachedGoal(-12),true);
assert.equal(core.hasReachedGoal(12),true);
assert.equal(core.isMatchOver({blue:1,red:1}),false);
assert.equal(core.isMatchOver({blue:2,red:0}),true);
let p=0;p=core.moveForAnswer(p,'blue',true);p=core.moveForAnswer(p,'red',true);assert.equal(p,0,'simultaneous correct answers cancel');
const categories=['systems','design','materials','mechanics','data'];
for(const mode of ['mixed','easy','medium','hard']) {
 const pair=core.createRoundQueues(bank,categories,mode,Math.random);
 assert.equal(pair.blue.length,pair.red.length);
 assert.ok(pair.blue.length>0);
 for(let i=0;i<pair.blue.length;i++){
  assert.notEqual(pair.blue[i].id,pair.red[i].id);
  assert.equal(pair.blue[i].difficulty,pair.red[i].difficulty,'paired difficulty');
  assert.equal(pair.blue[i].category,pair.red[i].category,'paired category');
 }
}
console.log('PASS: 100 questions, 5 categories, scoring, boundaries, match, fair paired queues');
