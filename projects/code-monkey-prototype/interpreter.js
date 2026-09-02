/**
 * CodeQuest Safe Interpreter & Runtime Engine 3.0 (Phase 2 / Sprint B)
 * Features:
 * - turtle.step(n) [Object Methods]
 * - pullLever() / lever.pull() [Trigger & Events]
 * - if (obstacleAhead()) { ... } else { ... } [Conditionals]
 * - Water & Turtle bridge collision detection
 * - Fuzzy diagnostics & Quick-Fix generators
 * - Step-by-step animation sync
 */

class CodeDiagnosticError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'CodeDiagnosticError';
    this.line = options.line || 1;
    this.quickFix = options.quickFix || null;
  }
}

class CodeInterpreter {
  constructor(stage) {
    this.stage = stage;
    this.isRunning = false;
    this.shouldStop = false;
    this.currentActionIndex = 0;
    this.actionsQueue = [];
  }

  /**
   * Evaluates if there is an obstacle directly in front of the monkey
   */
  isObstacleAhead() {
    const stage = this.stage;
    const dir = stage.monkey.dir;
    const dx = [1, 0, -1, 0][dir];
    const dy = [0, 1, 0, -1][dir];

    const targetX = stage.monkey.x + dx;
    const targetY = stage.monkey.y + dy;

    // Out of bounds
    if (targetX < 0 || targetX >= stage.cols || targetY < 0 || targetY >= stage.rows) {
      return true;
    }

    // Rock obstacle
    const hasRock = stage.obstacles.some(o => o.x === targetX && o.y === targetY);
    if (hasRock) return true;

    // Closed Gate
    const hasClosedGate = stage.gates.some(g => g.x === targetX && g.y === targetY && !g.open);
    if (hasClosedGate) return true;

    // Water without a turtle
    const hasWater = stage.water.some(w => w.x === targetX && w.y === targetY);
    const hasTurtle = stage.turtles.some(t => t.x === targetX && t.y === targetY);
    if (hasWater && !hasTurtle) return true;

    return false;
  }

  diagnoseLine(trimmed, lineNum, fullLine) {
    // 1. Missing parentheses in step e.g. "step 3"
    const missingParenStep = trimmed.match(/^step\s+(\d+);?$/i);
    if (missingParenStep) {
      const dist = missingParenStep[1];
      return new CodeDiagnosticError(
        `บรรทัดที่ ${lineNum}: คำสั่ง step ต้องใส่ตัวเลขในวงเล็บ เช่น \`step(${dist});\``,
        {
          line: lineNum,
          quickFix: {
            label: `แก้เป็น step(${dist});`,
            fromText: fullLine,
            toText: fullLine.replace(trimmed, `step(${dist});`)
          }
        }
      );
    }

    // 2. Misspelled "step"
    const typoStep = trimmed.match(/^(stepp|steps|stp|setp|spet)\s*(?:\(\s*(\d*)\s*\))?;?$/i);
    if (typoStep) {
      const count = typoStep[2] || '1';
      return new CodeDiagnosticError(
        `บรรทัดที่ ${lineNum}: ไม่พบคำสั่ง "${typoStep[1]}" คุณตั้งใจจะพิมพ์ว่า \`step\` ใช่ไหม?`,
        {
          line: lineNum,
          quickFix: {
            label: `แก้เป็น step(${count});`,
            fromText: fullLine,
            toText: fullLine.replace(new RegExp(typoStep[1], 'i'), 'step')
          }
        }
      );
    }

    // 3. Typo in turtle.step (turtlestep, turtle.stp)
    const typoTurtle = trimmed.match(/^(turtlestep|turtle_step|turtel\.step)\s*(?:\(\s*(\d*)\s*\))?;?$/i);
    if (typoTurtle) {
      const count = typoTurtle[2] || '1';
      return new CodeDiagnosticError(
        `บรรทัดที่ ${lineNum}: การสั่งออบเจกต์เต่าต้องใช้จุดคั่น เช่น \`turtle.step(${count});\``,
        {
          line: lineNum,
          quickFix: {
            label: `แก้เป็น turtle.step(${count});`,
            fromText: fullLine,
            toText: fullLine.replace(trimmed, `turtle.step(${count});`)
          }
        }
      );
    }

    // 4. Typo in pullLever (pulllever, pull_lever)
    const typoLever = trimmed.match(/^(pulllever|pull_lever|lever\.pull|leverpull)\s*(?:\(\s*\))?;?$/i);
    if (typoLever) {
      return new CodeDiagnosticError(
        `บรรทัดที่ ${lineNum}: คำสั่งโยกสวิตช์เขียนว่า \`pullLever();\``,
        {
          line: lineNum,
          quickFix: {
            label: `แก้เป็น pullLever();`,
            fromText: fullLine,
            toText: fullLine.replace(trimmed, `pullLever();`)
          }
        }
      );
    }

    // 5. Casing in turnLeft / turnRight
    const typoTurnLeft = trimmed.match(/^(turnleft|turn_left|turnLeftt)\s*(?:\(\s*\))?;?$/i);
    if (typoTurnLeft && typoTurnLeft[1] !== 'turnLeft') {
      return new CodeDiagnosticError(
        `บรรทัดที่ ${lineNum}: คำสั่งเลี้ยวซ้ายต้องใช้ตัว L พิมพ์ใหญ่ เป็น \`turnLeft();\``,
        {
          line: lineNum,
          quickFix: {
            label: `แก้เป็น turnLeft();`,
            fromText: fullLine,
            toText: fullLine.replace(new RegExp(typoTurnLeft[1], 'i'), 'turnLeft()')
          }
        }
      );
    }

    const typoTurnRight = trimmed.match(/^(turnright|turn_right|turnRightt)\s*(?:\(\s*\))?;?$/i);
    if (typoTurnRight && typoTurnRight[1] !== 'turnRight') {
      return new CodeDiagnosticError(
        `บรรทัดที่ ${lineNum}: คำสั่งเลี้ยวขวาต้องใช้ตัว R พิมพ์ใหญ่ เป็น \`turnRight();\``,
        {
          line: lineNum,
          quickFix: {
            label: `แก้เป็น turnRight();`,
            fromText: fullLine,
            toText: fullLine.replace(new RegExp(typoTurnRight[1], 'i'), 'turnRight()')
          }
        }
      );
    }

    // 6. Typo in repeat
    const typoRepeat = trimmed.match(/^(repaet|repet|reapeat|repreat)\s*\(?(\d*)\)?\s*\{?$/i);
    if (typoRepeat) {
      const count = typoRepeat[2] || '3';
      return new CodeDiagnosticError(
        `บรรทัดที่ ${lineNum}: ไม่พบคำสั่ง "${typoRepeat[1]}" คุณตั้งใจพิมพ์ว่า \`repeat(${count}) {\` ใช่ไหม?`,
        {
          line: lineNum,
          quickFix: {
            label: `แก้เป็น repeat(${count}) {`,
            fromText: fullLine,
            toText: fullLine.replace(new RegExp(typoRepeat[1], 'i'), 'repeat')
          }
        }
      );
    }

    // Default unknown command error
    return new CodeDiagnosticError(
      `บรรทัดที่ ${lineNum}: น้องลิงไม่รู้จักคำสั่ง "${trimmed}"\nคำสั่งที่ใช้ได้: step(n), turnLeft(), turnRight(), repeat(n), turtle.step(n), pullLever(), if (obstacleAhead())`,
      { line: lineNum }
    );
  }

  /**
   * Parses user code into an AST-like action stream with conditional branch nodes
   */
  parse(code) {
    const lines = code.split('\n');
    const queue = [];
    const maxActions = 100;

    const parseLines = (linesArr) => {
      let lineIdx = 0;
      while (lineIdx < linesArr.length) {
        if (queue.length >= maxActions) {
          throw new CodeDiagnosticError(
            `คำสั่งยาวเกินขีดจำกัดความปลอดภัย (${maxActions} สเต็ป) กรุณาตรวจสอบลูป`,
            { line: linesArr[lineIdx] ? (linesArr[lineIdx].origLine || 1) : 1 }
          );
        }

        const rawLine = linesArr[lineIdx];
        const lineNum = rawLine.origLine !== undefined ? rawLine.origLine : lineIdx + 1;
        const fullText = rawLine.text !== undefined ? rawLine.text : rawLine;
        const trimmed = fullText.trim();

        if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) {
          lineIdx++;
          continue;
        }

        // 1. if (obstacleAhead()) { ... } else { ... }
        const ifMatch = trimmed.match(/^if\s*\(\s*obstacleAhead\s*\(\s*\)\s*\)\s*\{?$/);
        if (ifMatch) {
          lineIdx++;
          const thenLines = [];
          const elseLines = [];
          let inElse = false;
          let braceCount = trimmed.includes('{') ? 1 : 0;

          while (lineIdx < linesArr.length) {
            const curRaw = linesArr[lineIdx];
            const curLineNum = curRaw.origLine !== undefined ? curRaw.origLine : lineIdx + 1;
            const curText = curRaw.text !== undefined ? curRaw.text : curRaw;
            const curTrim = curText.trim();

            if (!braceCount && curTrim === '{') {
              braceCount++;
              lineIdx++;
              continue;
            }

            if (curTrim.startsWith('} else {') || curTrim === '} else' || curTrim === 'else {') {
              inElse = true;
              lineIdx++;
              continue;
            }

            if (curTrim.includes('{')) braceCount++;
            if (curTrim.includes('}')) {
              braceCount--;
              if (braceCount <= 0 && !inElse) {
                // Check if next line is 'else'
                if (lineIdx + 1 < linesArr.length && linesArr[lineIdx + 1].text.trim().startsWith('else')) {
                  inElse = true;
                  braceCount = 1;
                  lineIdx += 2;
                  continue;
                }
                lineIdx++;
                break;
              } else if (braceCount <= 0 && inElse) {
                lineIdx++;
                break;
              }
            }

            if (inElse) {
              elseLines.push({ text: curText, origLine: curLineNum });
            } else {
              thenLines.push({ text: curText, origLine: curLineNum });
            }
            lineIdx++;
          }

          queue.push({
            type: 'conditional',
            condition: 'obstacleAhead',
            thenBranch: thenLines,
            elseBranch: elseLines,
            line: lineNum
          });
          continue;
        }

        // 2. repeat(N) { ... }
        const repeatMatch = trimmed.match(/^repeat\s*\(\s*(\d+)\s*\)\s*\{?$/);
        if (repeatMatch) {
          const count = parseInt(repeatMatch[1], 10);
          if (isNaN(count) || count <= 0) {
            throw new CodeDiagnosticError(
              `บรรทัดที่ ${lineNum}: จำนวนรอบของ repeat ต้องเป็นตัวเลขมากกว่า 0 เช่น \`repeat(3)\``,
              { line: lineNum }
            );
          }

          const blockLines = [];
          let openBraces = trimmed.includes('{') ? 1 : 0;
          lineIdx++;

          while (lineIdx < linesArr.length) {
            const curRaw = linesArr[lineIdx];
            const curLineNum = curRaw.origLine !== undefined ? curRaw.origLine : lineIdx + 1;
            const curText = curRaw.text !== undefined ? curRaw.text : curRaw;
            const curTrimmed = curText.trim();

            if (!openBraces && curTrimmed === '{') {
              openBraces++;
              lineIdx++;
              continue;
            }

            if (curTrimmed.includes('{')) openBraces++;
            if (curTrimmed.includes('}')) {
              openBraces--;
              if (openBraces <= 0) {
                lineIdx++;
                break;
              }
            }

            blockLines.push({ text: curText, origLine: curLineNum });
            lineIdx++;
          }

          if (openBraces > 0) {
            throw new CodeDiagnosticError(
              `บรรทัดที่ ${lineNum}: ไม่พบเครื่องหมายปีกกาปิด '}' สำหรับคำสั่ง repeat`,
              {
                line: lineNum,
                quickFix: { label: `เพิ่มปีกกาปิด '}'`, fromText: '', toText: '\n}', isAppend: true }
              }
            );
          }

          // Unroll repeat loop
          for (let r = 0; r < count; r++) {
            parseLines(blockLines);
          }
          continue;
        }

        // 3. turtle.step(n)
        const turtleStepMatch = trimmed.match(/^turtle\.step\s*(?:\(\s*(\d*)\s*\))?;?$/);
        if (turtleStepMatch) {
          const count = turtleStepMatch[1] === '' || turtleStepMatch[1] === undefined ? 1 : parseInt(turtleStepMatch[1], 10);
          for (let s = 0; s < count; s++) {
            queue.push({ type: 'turtleStep', line: lineNum });
          }
          lineIdx++;
          continue;
        }

        // 4. pullLever() or lever.pull()
        const leverMatch = trimmed.match(/^(?:pullLever|lever\.pull)\s*(?:\(\s*\))?;?$/);
        if (leverMatch) {
          queue.push({ type: 'pullLever', line: lineNum });
          lineIdx++;
          continue;
        }

        // 5. step(n)
        const stepMatch = trimmed.match(/^step\s*(?:\(\s*(\d*)\s*\))?;?$/);
        if (stepMatch) {
          const count = stepMatch[1] === '' || stepMatch[1] === undefined ? 1 : parseInt(stepMatch[1], 10);
          for (let s = 0; s < count; s++) {
            queue.push({ type: 'step', line: lineNum });
          }
          lineIdx++;
          continue;
        }

        // 6. turnLeft()
        const turnLeftMatch = trimmed.match(/^turnLeft\s*(?:\(\s*\))?;?$/);
        if (turnLeftMatch) {
          queue.push({ type: 'turnLeft', line: lineNum });
          lineIdx++;
          continue;
        }

        // 7. turnRight()
        const turnRightMatch = trimmed.match(/^turnRight\s*(?:\(\s*\))?;?$/);
        if (turnRightMatch) {
          queue.push({ type: 'turnRight', line: lineNum });
          lineIdx++;
          continue;
        }

        if (trimmed === '}' || trimmed === '{') {
          lineIdx++;
          continue;
        }

        throw this.diagnoseLine(trimmed, lineNum, fullText);
      }
    };

    const initialLines = lines.map((text, idx) => ({ text, origLine: idx + 1 }));
    parseLines(initialLines);

    return queue;
  }

  async run(code, callbacks = {}) {
    if (this.isRunning) return;

    this.isRunning = true;
    this.shouldStop = false;
    this.stage.resetLevelState();

    try {
      this.actionsQueue = this.parse(code);
      if (this.actionsQueue.length === 0) {
        throw new CodeDiagnosticError(
          'ยังไม่มีคำสั่งที่ทำงานได้ ลองพิมพ์ `step(1);` หรือคลิกปุ่มคำสั่งด่วนด้านล่างดูนะ',
          { line: 1 }
        );
      }

      if (callbacks.onStart) callbacks.onStart(this.actionsQueue.length);

      let actionPointer = 0;
      while (actionPointer < this.actionsQueue.length) {
        if (this.shouldStop) break;

        const action = this.actionsQueue[actionPointer];

        // If it's a dynamic runtime conditional branch
        if (action.type === 'conditional') {
          if (callbacks.onActionStart) callbacks.onActionStart(action);

          const conditionMet = action.condition === 'obstacleAhead' ? this.isObstacleAhead() : false;
          const branchLines = conditionMet ? action.thenBranch : action.elseBranch;

          if (branchLines && branchLines.length > 0) {
            // Parse branch lines into sub-actions
            const subParser = new CodeInterpreter(this.stage);
            const subCode = branchLines.map(l => l.text).join('\n');
            const subActions = subParser.parse(subCode);
            // Splice sub-actions into the queue right after current action
            this.actionsQueue.splice(actionPointer + 1, 0, ...subActions);
          }
          actionPointer++;
          continue;
        }

        if (callbacks.onActionStart) {
          callbacks.onActionStart(action, actionPointer, this.actionsQueue.length);
        }

        const stepResult = await this.executeAction(action);

        if (!stepResult.success) {
          if (callbacks.onFailed) callbacks.onFailed(stepResult.reason, action);
          this.isRunning = false;
          return;
        }

        this.checkBananas(callbacks.onBananaCollect);
        actionPointer++;
      }

      if (this.shouldStop) {
        this.isRunning = false;
        return;
      }

      const allBananasCollected = this.stage.bananas.every(b => b.collected);
      if (allBananasCollected) {
        this.stage.sound.playWin();
        if (callbacks.onSuccess) {
          callbacks.onSuccess({
            totalActions: actionPointer,
            codeLines: code.split('\n').filter(l => l.trim() && !l.trim().startsWith('//')).length
          });
        }
      } else {
        const remaining = this.stage.bananas.filter(b => !b.collected).length;
        if (callbacks.onIncomplete) {
          callbacks.onIncomplete(`คำสั่งทำงานครบแล้ว แต่ยังเหลือกล้วยอีก ${remaining} ลูก ลองตรวจดูทิศทางและจำนวนก้าวอีกครั้งนะ!`);
        }
      }
    } catch (err) {
      if (callbacks.onError) callbacks.onError(err);
    } finally {
      this.isRunning = false;
      if (callbacks.onEnd) callbacks.onEnd();
    }
  }

  stop() {
    this.shouldStop = true;
    this.isRunning = false;
    this.stage.resetLevelState();
  }

  checkBananas(collectCallback) {
    const mx = this.stage.monkey.x;
    const my = this.stage.monkey.y;

    this.stage.bananas.forEach((banana, idx) => {
      if (!banana.collected && banana.x === mx && banana.y === my) {
        banana.collected = true;
        this.stage.sound.playEat();
        if (this.stage.particles) {
          const px = (banana.x + 0.5) * this.stage.tileSize;
          const py = (banana.y + 0.5) * this.stage.tileSize;
          this.stage.particles.burst(px, py, 18, ['#f59e0b', '#fbbf24', '#fef08a', '#38bdf8']);
        }
        if (collectCallback) collectCallback(banana, idx);
      }
    });
  }

  executeAction(action) {
    return new Promise((resolve) => {
      const stage = this.stage;
      const baseDuration = 220 / stage.animationSpeed;
      const startTime = performance.now();

      // Action: Monkey step forward
      if (action.type === 'step') {
        const dir = stage.monkey.dir;
        const dx = [1, 0, -1, 0][dir];
        const dy = [0, 1, 0, -1][dir];

        const targetX = stage.monkey.x + dx;
        const targetY = stage.monkey.y + dy;

        // Boundary check
        if (targetX < 0 || targetX >= stage.cols || targetY < 0 || targetY >= stage.rows) {
          stage.sound.playHit();
          stage.triggerScreenShake();
          resolve({ success: false, reason: '⚠️ น้องลิงเดินตกขอบแผนที่! ตรวจสอบทิศทางหรือจำนวนก้าวดูใหม่อีกครั้ง' });
          return;
        }

        // Rock check
        const hitObstacle = stage.obstacles.some(o => o.x === targetX && o.y === targetY);
        if (hitObstacle) {
          stage.sound.playHit();
          stage.triggerScreenShake();
          resolve({ success: false, reason: '💥 โครม! น้องลิงเดินชนก้อนหิน ลองใช้ไม้บรรทัดวัดช่องแล้วหาทางเลี้ยวอ้อมนะ' });
          return;
        }

        // Closed Gate check
        const hitGate = stage.gates.some(g => g.x === targetX && g.y === targetY && !g.open);
        if (hitGate) {
          stage.sound.playHit();
          stage.triggerScreenShake();
          resolve({ success: false, reason: '🚪 ตึง! ประตูกลยังปิดล็อกอยู่ ต้องเดินไปโยกสวิตช์คันโยกเพื่อเปิดก่อนนะ' });
          return;
        }

        // Water check (without turtle)
        const inWater = stage.water.some(w => w.x === targetX && w.y === targetY);
        const hasTurtle = stage.turtles.some(t => t.x === targetX && t.y === targetY);
        if (inWater && !hasTurtle) {
          stage.sound.playHit();
          stage.triggerScreenShake(12);
          resolve({ success: false, reason: '🌊 ตู้ม! น้องลิงตกลงไปในน้ำ (ว่ายน้ำไม่เป็น) ต้องสั่งให้เพื่อนเต่าว่ายมาเป็นสะพานก่อน!' });
          return;
        }

        const startX = stage.monkey.x;
        const startY = stage.monkey.y;
        stage.monkey.x = targetX;
        stage.monkey.y = targetY;
        stage.trail.push({ x: targetX, y: targetY });
        stage.sound.playStep();

        const animateStep = (now) => {
          if (this.shouldStop) {
            resolve({ success: false, reason: 'หยุดการทำงาน' });
            return;
          }
          const progress = Math.min(1, (now - startTime) / baseDuration);
          const ease = 1 - (1 - progress) * (1 - progress);

          stage.monkey.animX = startX + dx * ease;
          stage.monkey.animY = startY + dy * ease;

          if (progress < 1) {
            requestAnimationFrame(animateStep);
          } else {
            stage.monkey.animX = targetX;
            stage.monkey.animY = targetY;
            resolve({ success: true });
          }
        };
        requestAnimationFrame(animateStep);

      // Action: Monkey turnLeft / turnRight
      } else if (action.type === 'turnLeft' || action.type === 'turnRight') {
        const isLeft = action.type === 'turnLeft';
        const startAngle = stage.monkey.angle;
        const angleDelta = isLeft ? -Math.PI / 2 : Math.PI / 2;
        const targetAngle = startAngle + angleDelta;

        stage.monkey.dir = isLeft ? (stage.monkey.dir + 3) % 4 : (stage.monkey.dir + 1) % 4;
        stage.sound.playTurn();

        const animateTurn = (now) => {
          if (this.shouldStop) {
            resolve({ success: false, reason: 'หยุดการทำงาน' });
            return;
          }
          const progress = Math.min(1, (now - startTime) / (baseDuration * 0.8));
          const ease = 1 - (1 - progress) * (1 - progress);

          stage.monkey.angle = startAngle + angleDelta * ease;

          if (progress < 1) {
            requestAnimationFrame(animateTurn);
          } else {
            stage.monkey.angle = targetAngle;
            resolve({ success: true });
          }
        };
        requestAnimationFrame(animateTurn);

      // Action: turtle.step()
      } else if (action.type === 'turtleStep') {
        if (stage.turtles.length === 0) {
          resolve({ success: false, reason: 'ไม่มีเพื่อนเต่าในฉากนี้!' });
          return;
        }

        const turtle = stage.turtles[0];
        const dir = turtle.dir !== undefined ? turtle.dir : 1; // Default swim direction
        const dx = [1, 0, -1, 0][dir];
        const dy = [0, 1, 0, -1][dir];

        const targetX = turtle.x + dx;
        const targetY = turtle.y + dy;

        if (targetX < 0 || targetX >= stage.cols || targetY < 0 || targetY >= stage.rows) {
          resolve({ success: false, reason: 'น้องเต่าว่ายติดขอบฉากแล้ว!' });
          return;
        }

        const startX = turtle.x;
        const startY = turtle.y;
        turtle.x = targetX;
        turtle.y = targetY;
        stage.sound.playStep();

        const animateTurtle = (now) => {
          if (this.shouldStop) {
            resolve({ success: false, reason: 'หยุดการทำงาน' });
            return;
          }
          const progress = Math.min(1, (now - startTime) / baseDuration);
          const ease = 1 - (1 - progress) * (1 - progress);

          turtle.animX = startX + dx * ease;
          turtle.animY = startY + dy * ease;

          if (progress < 1) {
            requestAnimationFrame(animateTurtle);
          } else {
            turtle.animX = targetX;
            turtle.animY = targetY;
            resolve({ success: true });
          }
        };
        requestAnimationFrame(animateTurtle);

      // Action: pullLever()
      } else if (action.type === 'pullLever') {
        const mx = stage.monkey.x;
        const my = stage.monkey.y;

        // Check if monkey is on or adjacent to a lever
        const nearLever = stage.levers.find(l => Math.abs(l.x - mx) <= 1 && Math.abs(l.y - my) <= 1);
        if (!nearLever) {
          resolve({ success: false, reason: 'น้องลิงอยู่ไกลเกินไป! ต้องเดินไปใกล้คันโยกสวิตช์ก่อนถึงจะโยกได้' });
          return;
        }

        nearLever.pulled = true;
        stage.sound.playLever();
        // Open all gates
        stage.gates.forEach(g => { g.open = true; });

        if (stage.particles) {
          const px = (nearLever.x + 0.5) * stage.tileSize;
          const py = (nearLever.y + 0.5) * stage.tileSize;
          stage.particles.burst(px, py, 15, ['#10b981', '#34d399', '#6ee7b7']);
        }

        setTimeout(() => {
          resolve({ success: true });
        }, 180 / stage.animationSpeed);
      }
    });
  }
}
