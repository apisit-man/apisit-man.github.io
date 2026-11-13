const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onValueCreated } = require("firebase-functions/v2/database");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.database();

/**
 * Cloud Function 1: hostStartQuestion (Callable Function)
 * วิทยากรเรียกผ่าน Google Cloud Functions เพื่อเริ่มปล่อยข้อสอบ
 * ซ่อนเฉลย (correct answer) ไว้ที่หลังบ้านอย่างปลอดภัย ไม่ส่งลง Client
 */
exports.hostStartQuestion = onCall(async (request) => {
  const { questionIndex, text, options, correctAnswer, timeLimit } = request.data;

  if (!questionIndex || !text || !options || !correctAnswer) {
    throw new HttpsError("invalid-argument", "Missing required question fields.");
  }

  const duration = parseInt(timeLimit || 20, 10);
  const startTime = Date.now();

  // 1. บันทึกคำตอบที่ถูกต้องไว้ใน secure_quiz_answers (เฉพาะ Cloud Functions เข้าถึงได้)
  await db.ref(`secure_quiz_answers/q${questionIndex}`).set({
    correctAnswer: correctAnswer.toUpperCase(),
    timeLimit: duration,
    startTime: startTime
  });

  // 2. ปล่อยคำถามไปยัง Client (ไม่ส่ง correctAnswer ไปที่ผู้เล่น)
  await db.ref("live_quiz/current_question").set({
    index: questionIndex,
    text: text,
    options: options,
    correct: null // ซ่อนเฉลยไว้
  });

  // 3. ปรับสถานะห้องเป็น 'question'
  await db.ref("live_quiz/state").set({
    status: "question",
    current_question_index: questionIndex,
    question_start_time: startTime,
    time_limit: duration
  });

  return { success: true, questionIndex, startTime };
});

/**
 * Cloud Function 2: submitAnswerSecure (Callable Function)
 * ผู้เล่นส่งคำตอบผ่าน Cloud Function เพื่อตรวจสอบความเร็วและคิดคะแนนแบบ Server-Side
 * ป้องกันการโกงเวลาหรือแก้คะแนนจากหน้า Client
 */
exports.submitAnswerSecure = onCall(async (request) => {
  const { playerId, playerName, questionIndex, choice } = request.data;

  if (!playerId || !questionIndex || !choice) {
    throw new HttpsError("invalid-argument", "Missing answer parameters.");
  }

  const qSnap = await db.ref(`secure_quiz_answers/q${questionIndex}`).once("value");
  const secureData = qSnap.val();

  if (!secureData) {
    throw new HttpsError("failed-precondition", "Question has not started or already closed.");
  }

  const now = Date.now();
  const elapsed = (now - secureData.startTime) / 1000;
  const timeLimit = secureData.timeLimit || 20;

  // ตรวจสอบว่าหมดเวลาหรือไม่
  if (elapsed > timeLimit + 1.5) { // เผื่อ latency เครือข่าย 1.5 วินาที
    return { status: "timeout", message: "Time is up!" };
  }

  const remaining = Math.max(0, timeLimit - elapsed);
  const isCorrect = choice.toUpperCase() === secureData.correctAnswer;

  // คำนวณคะแนนตามความเร็ว (Speed bonus formula)
  let points = 0;
  if (isCorrect) {
    const speedRatio = Math.max(0, remaining / timeLimit);
    points = Math.round(500 + 500 * speedRatio);
  }

  // บันทึกคำตอบลง Realtime Database
  await db.ref(`live_quiz/answers/q${questionIndex}/${playerId}`).set({
    playerId,
    playerName: playerName || "ผู้เล่น",
    choice: choice.toUpperCase(),
    timeTaken: Number(elapsed.toFixed(2)),
    isCorrect,
    points,
    timestamp: now
  });

  return { success: true, submitted: true };
});

/**
 * Cloud Function 3: hostReviewQuestion (Callable Function)
 * วิทยากรเรียกเพื่อปิดรับคำตอบ สรุปคะแนน รวมยอด Top 3 ส่งขึ้นหน้าจอ
 */
exports.hostReviewQuestion = onCall(async (request) => {
  const { questionIndex } = request.data;

  const qSnap = await db.ref(`secure_quiz_answers/q${questionIndex}`).once("value");
  const secureData = qSnap.val();
  const correctAnswer = secureData ? secureData.correctAnswer : "A";

  // ดึงคำตอบทั้งหมดของข้อนี้
  const ansSnap = await db.ref(`live_quiz/answers/q${questionIndex}`).once("value");
  const answers = ansSnap.val() || {};

  // ดึงผู้เล่นทั้งหมด
  const playersSnap = await db.ref("live_quiz/players").once("value");
  const players = playersSnap.val() || {};

  const updates = {};
  const currentScores = {};

  // ตั้งต้นคะแนนเดิมของผู้เล่น
  Object.keys(players).forEach((pid) => {
    currentScores[pid] = players[pid].score || 0;
  });

  // อัปเดตคะแนนใหม่เฉพาะผู้ที่ตอบถูก
  Object.keys(answers).forEach((pid) => {
    const item = answers[pid];
    if (item.isCorrect) {
      currentScores[pid] = (currentScores[pid] || 0) + (item.points || 500);
      updates[`live_quiz/players/${pid}/score`] = currentScores[pid];
    }
  });

  // จัดอันดับ Top 3
  const leaderboard = Object.keys(currentScores)
    .map((pid) => ({
      id: pid,
      name: (players[pid] && players[pid].name) ? players[pid].name : (answers[pid]?.playerName || "ผู้เล่น"),
      score: currentScores[pid]
    }))
    .sort((a, b) => b.score - a.score);

  const top3 = leaderboard.slice(0, 3);
  updates["live_quiz/leaderboard_top3"] = top3;
  updates["live_quiz/current_question/correct"] = correctAnswer;
  updates["live_quiz/state"] = {
    status: "review",
    current_question_index: questionIndex,
    time_limit: 0
  };

  await db.ref().update(updates);

  return { success: true, top3, correctAnswer };
});

/**
 * Cloud Function 4: hostFinishGame (Callable Function)
 * จบการแข่งขัน ประกาศ Top 3 สมบูรณ์
 */
exports.hostFinishGame = onCall(async () => {
  await db.ref("live_quiz/state").set({
    status: "finished"
  });
  return { success: true };
});
