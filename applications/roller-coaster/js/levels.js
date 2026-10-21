/**
 * levels.js - 10 Progressive STEM Campaign Levels for Roller Coaster Energy Tycoon
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 */

export const CAMPAIGN_LEVELS = [
  {
    id: 1,
    titleTh: "ดิ่งพสุธาเนินแรก (The First Drop)",
    titleEn: "The First Drop",
    gradeBadge: "ม.1 (ว2.3 งานและพลังงาน)",
    descriptionTh: "เรียนรู้การเปลี่ยนรูปพลังงานศักย์โน้มถ่วง (Ep) เป็นพลังงานจลน์ (Ek) ปรับความสูงเนินปล่อยรถให้สูงพอที่จะส่งรถไฟเหาะพุ่งข้ามเนินที่สองไปถึงเส้นชัย!",
    descriptionEn: "Learn gravitational potential to kinetic energy conversion. Adjust the initial drop hill high enough to carry the train over the second hill!",
    targetGoalTh: "ทำความเร็วสูงสุดอย่างน้อย 60 km/h และวิ่งข้ามเนินที่สองถึงเส้นชัยโดยไม่ไหลถอยหลัง",
    targetGoalEn: "Reach at least 60 km/h and cross the second hill to the finish without rolling back.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: พลังงานกลรวมไม่สูญหาย (Ep = Ek)! ถ้าเนินที่สองสูงกว่าเนินแรก รถจะยังมีพลังงานพอที่จะปีนขึ้นไปถึงหรือไม่?",
    socraticHintEn: "Physics Hint: Mechanical energy is conserved! Can the coaster climb a hill that is taller than its starting height?",
    gravity: 9.8,
    frictionMode: false,
    budget: 8000,
    controlPoints: [
      { x: 40, y: 180 },  // Station drop
      { x: 180, y: 460 }, // Valley bottom
      { x: 380, y: 260 }, // Hill 2 to overcome
      { x: 560, y: 460 }, // Valley 2
      { x: 740, y: 380 }, // Finish
      { x: 920, y: 380 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished && ratings.maxSpeedKmh >= 60 && !physics.isRollback) {
        return { success: true, message: "🎉 ยอดเยี่ยม! รถไฟเหาะเปลี่ยนรูปพลังงานศักย์เป็นพลังงานจลน์พุ่งข้ามเนินสำเร็จ!" };
      }
      if (physics.isRollback) {
        return { success: false, message: "❌ รถไหลถอยหลัง! เนินปล่อยรถยังสูงไม่พอ หรือเนินที่สองสูงเกินไป ลองดึงจุดแรกให้สูงขึ้น" };
      }
      if (ratings.maxSpeedKmh < 60) {
        return { success: false, message: "❌ ความเร็วยังไม่ถึง 60 km/h ลองเพิ่มความสูงเนินแรกเพื่อสะสม Ep มากขึ้น" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 2,
    titleTh: "หุบเขาแรง G (The Valley of G-Force)",
    titleEn: "The Valley of G-Force",
    gradeBadge: "ม.2 (ว2.2 แรงสู่ศูนย์กลาง)",
    descriptionTh: "เมื่อรถพุ่งลงมาจากเนินสูง ก้นหุบเขาจะเกิดแรงสู่ศูนย์กลางมหาศาลกดผู้โดยสารลงกับเบาะ ออกแบบความโค้งของหุบเขาไม่ให้แคบเกินไป เพื่อคุมแรง G ไม่ให้เกิน 3.5g!",
    descriptionEn: "At the bottom of a drop, centripetal acceleration presses riders into their seats. Adjust the valley curvature so G-force stays below 3.5g!",
    targetGoalTh: "ทำความเร็วที่ก้นหุบเขาอย่างน้อย 75 km/h โดยควบคุมแรง G สูงสุดไม่เกิน 3.5g",
    targetGoalEn: "Reach at least 75 km/h at the valley bottom while keeping peak G-force under 3.5g.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: แรง G = 1 + v²/(g·R) หากต้องการลดแรง G แต่ยังรักษาความเร็ว v ไว้ เราควรขยายรัศมีความโค้ง R ของหุบเขาให้กว้างขึ้นหรือแคบลง?",
    socraticHintEn: "Physics Hint: G = 1 + v²/(g·R). To reduce G while keeping speed high, should the curve radius R be wider or sharper?",
    gravity: 9.8,
    frictionMode: false,
    budget: 9000,
    controlPoints: [
      { x: 40, y: 120 },
      { x: 260, y: 480 }, // Sharp valley
      { x: 500, y: 300 },
      { x: 750, y: 400 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        if (ratings.maxG > 3.5) {
          return { success: false, message: `❌ แรง G สูงถึง ${ratings.maxG}g (เกิน 3.5g)! ผู้โดยสารเวียนหัว ลองปรับก้นหุบเขาให้โค้งกว้างขึ้น` };
        }
        if (ratings.maxSpeedKmh < 75) {
          return { success: false, message: `❌ ความเร็วสูงสุดเพียง ${ratings.maxSpeedKmh} km/h (เป้าหมาย 75 km/h)` };
        }
        return { success: true, message: `🎉 สมบูรณ์แบบ! ความเร็ว ${ratings.maxSpeedKmh} km/h และแรง G เพียง ${ratings.maxG}g นุ่มนวลปลอดภัย!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 3,
    titleTh: "ลูปวงกลมมรณะ (The Classic Loop)",
    titleEn: "The Classic Loop",
    gradeBadge: "ม.2 (ว2.2 และ ว2.3 การเคลื่อนที่แบบวงกลม)",
    descriptionTh: "ท้าทายกฎฟิสิกส์คลาสสิก! เพื่อให้รถวิ่งตีลังกาครบรอบโดยไม่ร่วงหล่นที่จุดยอดลูป ความเร็วที่ยอดต้องไม่ต่ำกว่าความเร็ววิกฤต v_min = √(g·R) และความสูงเริ่มต้นต้อง h ≥ 2.5R!",
    descriptionEn: "Master the vertical loop! To prevent the train from falling off at the apex, speed must satisfy v ≥ √(g·R) (initial height h ≥ 2.5R).",
    targetGoalTh: "สร้างรถไฟเหาะตีลังกา 1 Loop ผ่านฉลุยโดยรถไม่ร่วงหล่น (G-force ที่จุดยอด ≥ 0.0g)",
    targetGoalEn: "Clear a vertical loop without derailing (G-force at the apex ≥ 0.0g).",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: ที่จุดสูงสุดของลูป แรงโน้มถ่วงดึงลง ถ้าความเร็วเหวี่ยงหนีศูนย์ไม่พอ แรงปฏิกิริยา N จะกลายเป็นลบ และรถจะร่วงลงมา!",
    socraticHintEn: "Physics Hint: At the top of the loop, gravity pulls downward. If centripetal force is insufficient, normal force N < 0 and the cart falls!",
    gravity: 9.8,
    frictionMode: false,
    budget: 12000,
    controlPoints: [
      { x: 40, y: 100 },  // High drop
      { x: 220, y: 480 }, // Entry
      { x: 340, y: 240 }, // Loop apex
      { x: 460, y: 480 }, // Exit
      { x: 700, y: 420 },
      { x: 920, y: 420 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ รถร่วงตกรางที่ยอด Loop! ความเร็วเหวี่ยงหนีศูนย์ไม่พอ ลองเพิ่มความสูงจุดปล่อยหรือลดขนาด Loop ลง" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 ยอดเยี่ยมมาก! รถไฟเหาะผ่าน Loop ตีลังกาสำเร็จตามกฎ v ≥ √(g·R)!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 4,
    titleTh: "ปริศนาลูปหยดน้ำ (Clothoid vs Circle)",
    titleEn: "Clothoid vs Circle Loop",
    gradeBadge: "ม.2 - ม.3 (วิศวกรรมโครงสร้างและการลดแรงกระแทก)",
    descriptionTh: "ในความเป็นจริง ลูปวงกลมจะสร้างแรงกระแทกบริเวณทางเข้าสูงถึง 6g วิศวกรจึงประดิษฐ์ 'ลูปรูปหยดน้ำ (Clothoid)' ที่ค่อยๆ แคบลง ปรับแต่งรูปทรงเพื่อคุมแรง G ไม่ให้เกิน 4.0g!",
    descriptionEn: "Circular loops produce brutal 6g shock spikes at entry. Real roller coasters use tear-drop Clothoid loops. Tune the curve to keep peak G under 4.0g!",
    targetGoalTh: "ผ่าน Loop ตีลังกาโดยแรง G สูงสุดตลอดเส้นทางไม่เกิน 4.0g",
    targetGoalEn: "Clear the inversion loop while keeping peak G-force below 4.0g throughout.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: ทางเข้าลูปควรมีรัศมีกว้าง แล้วค่อยๆ แคบลงที่จุดยอด เพื่อเกลี่ยแรงสู่ศูนย์กลางให้สม่ำเสมอ",
    socraticHintEn: "Physics Hint: The entrance should have a gentle wide radius, tapering tighter at the top to distribute centripetal acceleration evenly.",
    gravity: 9.8,
    frictionMode: false,
    budget: 13000,
    controlPoints: [
      { x: 40, y: 110 },
      { x: 200, y: 480 },
      { x: 320, y: 260 },
      { x: 440, y: 480 },
      { x: 700, y: 400 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ รถร่วงตกราง! ต้องรักษาความเร็วให้พอดีผ่านจุดยอด" };
      }
      if (physics.isFinished) {
        if (ratings.maxG > 4.0) {
          return { success: false, message: `❌ แรง G สูงถึง ${ratings.maxG}g (เกิน 4.0g)! ขยายทางเข้า-ออกลูปให้กว้างขึ้นเพื่อลดแรงกระแทก` };
        }
        return { success: true, message: `🎉 เยี่ยมยอด! ผ่านลูปได้ปลอดภัยด้วยแรง G เพียง ${ratings.maxG}g สไตล์ Clothoid Loop มืออาชีพ!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 5,
    titleTh: "ท้าทายแรงเสียดทาน (Friction Factor)",
    titleEn: "Friction Factor",
    gradeBadge: "ม.2 (ว2.3 งานและพลังงานกับการสูญเสีย)",
    descriptionTh: "เปิดใช้งานแรงต้านอากาศและแรงเสียดทานล้อจริง! พลังงานกลบางส่วนจะเปลี่ยนเป็นพลังงานความร้อน (W_loss) ต้องคำนวณชดเชยเพื่อให้รถไม่ติดหล่มก่อนถึงสถานี",
    descriptionEn: "Realistic friction and air drag enabled! Mechanical energy degrades into heat. Compensate for energy loss so the train reaches the station.",
    targetGoalTh: "เปิดโหมดแรงเสียดทานจริง และวิ่งข้ามเนินสุดท้ายเข้าเทียบชานชาลาสำเร็จ",
    targetGoalEn: "Enable realistic friction and clear the final hill to arrive safely at the station.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: E_total = Ep + Ek + W_loss เมื่อมีแรงเสียดทาน ความสูงเริ่มต้นต้องเผื่อไว้มากกว่าเดิมเท่าใด?",
    socraticHintEn: "Physics Hint: E_total = Ep + Ek + W_loss. When friction exists, how much higher must the start drop be?",
    gravity: 9.8,
    frictionMode: true,
    budget: 11000,
    controlPoints: [
      { x: 40, y: 100 },
      { x: 250, y: 470 },
      { x: 500, y: 290 },
      { x: 720, y: 440 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isRollback) {
        return { success: false, message: "❌ พลังงานสูญเสียไปกับแรงเสียดทานจนรถหมดแรงปีนเนิน! เพิ่มความสูงเนินปล่อยรถเพื่อสะสม Ep เผื่อไว้" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 ยอดเยี่ยม! คุณคำนวณชดเชยการสูญเสียพลังงานเนื่องจากแรงเสียดทานได้อย่างแม่นยำ!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 6,
    titleTh: "ดับเบิ้ลลูปมหาประลัย (Double Loop Mayhem)",
    titleEn: "Double Loop Mayhem",
    gradeBadge: "ม.2 - ม.3 (พลังงานต่อเนื่องและการอนุรักษ์)",
    descriptionTh: "สร้างรถไฟเหาะตีลังกาสองลูปติดต่อกัน! ลูปที่สองต้องมีขนาดสัมพันธ์กับพลังงานที่เหลืออยู่อย่างไรจึงจะผ่านได้ทั้งคู่?",
    descriptionEn: "Design consecutive double inversion loops! How must the second loop size relate to the remaining energy to clear both safely?",
    targetGoalTh: "ผ่านลูปตีลังกาทั้ง 2 จุดสำเร็จโดยไม่ร่วง และไม่ติดหล่ม",
    targetGoalEn: "Clear both inversion loops successfully without derailing or stalling.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: หลังจากผ่านลูปแรก รถมีความเร็วลดลง ดังนั้นลูปที่สองควรจะเตี้ยกว่าหรือสูงกว่าลูปแรก?",
    socraticHintEn: "Physics Hint: After exiting the first loop, kinetic energy is lower. Should the second loop be lower or taller than the first?",
    gravity: 9.8,
    frictionMode: false,
    budget: 15000,
    controlPoints: [
      { x: 40, y: 80 },
      { x: 180, y: 470 },
      { x: 280, y: 220 }, // Loop 1
      { x: 380, y: 470 },
      { x: 490, y: 290 }, // Loop 2 (should be lower!)
      { x: 600, y: 470 },
      { x: 800, y: 420 },
      { x: 920, y: 420 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ รถร่วงตกราง! ตรวจสอบความสูงของลูปที่สองให้เหมาะสมกับพลังงานที่เหลืออยู่" };
      }
      if (physics.isRollback) {
        return { success: false, message: "❌ รถติดหล่มระหว่างลูป! พลังงานไม่พอข้ามลูปที่สอง" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 มหัศจรรย์! พิชิตดับเบิ้ลลูป 2 จังหวะอย่างสมบูรณ์แบบ!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 7,
    titleTh: "เนินไร้น้ำหนัก (The Zero-G Camelback)",
    titleEn: "The Zero-G Camelback",
    gradeBadge: "ม.3 (สภาพไร้น้ำหนักและ Airtime)",
    descriptionTh: "ผู้โดยสารต้องการความตื่นเต้น! ออกแบบเนินลูกระนาด (Camelback Hill) ให้ผู้โดยสารได้สัมผัสสภาวะตัวลอยไร้น้ำหนัก (0g ≤ G ≤ 0.2g) อย่างน้อย 1.2 วินาที",
    descriptionEn: "Give passengers pure thrill! Shape a camelback hill so riders experience weightlessness (0g ≤ G ≤ 0.2g) for at least 1.2 seconds without violent negative Gs.",
    targetGoalTh: "ทำเวลาสภาวะไร้น้ำหนัก (Airtime) สะสมอย่างน้อย 1.2 วินาที และแรง G ต่ำสุดไม่ติดลบเกิน -1.0g",
    targetGoalEn: "Achieve at least 1.2 seconds of accumulated airtime with minimum G staying above -1.0g.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: เมื่อรถพุ่งขึ้นสู่ยอดเนินด้วยความเร็วสูง แรงสู่ศูนย์กลางที่เหวี่ยงขึ้นจะหักล้างกับแรงโน้มถ่วง ทำให้ตัวลอยขึ้นจากเบาะ!",
    socraticHintEn: "Physics Hint: Cresting a hill at high speed creates upward acceleration that counteracts gravity, producing zero-G airtime!",
    gravity: 9.8,
    frictionMode: false,
    budget: 12000,
    controlPoints: [
      { x: 40, y: 100 },
      { x: 220, y: 480 },
      { x: 420, y: 240 }, // Camelback peak
      { x: 620, y: 480 },
      { x: 800, y: 400 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        if (parseFloat(ratings.airtimeSec) < 1.2) {
          return { success: false, message: `❌ เวลาไร้น้ำหนักได้เพียง ${ratings.airtimeSec} วินาที (เป้าหมาย 1.2 วินาที)! ลองปรับความโค้งยอดเนินให้พุ่งขึ้นเร็วขึ้น` };
        }
        if (parseFloat(ratings.minG) < -1.0) {
          return { success: false, message: `⚠️ แรง G ติดลบถึง ${ratings.minG}g (อันตรายเกินไป)! ผู้โดยสารอาจกระเด็นหลุด ปรับยอดเนินให้โค้งมนขึ้น` };
        }
        return { success: true, message: `🎉 สุดยอด! ผู้โดยสารได้ลอยตัวไร้น้ำหนักถึง ${ratings.airtimeSec} วินาที สนุกตื่นเต้นปลอดภัย!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 8,
    titleTh: "รางเบรกแม่เหล็กหยุดฉุกเฉิน (Magnetic Brakes)",
    titleEn: "Magnetic Brakes",
    gradeBadge: "ม.3 (ว2.3 แรงต้านและงานที่ทำให้หยุด)",
    descriptionTh: "รถไฟเหาะความเร็ว 90 km/h พุ่งเข้าใกล้สถานี! ต้องออกแบบรางเบรกให้ชะลอความเร็วลงเหลือต่ำกว่า 20 km/h อย่างนุ่มนวล โดยผู้โดยสารไม่กระแทกคอเคล็ด",
    descriptionEn: "Train approaching the station at 90 km/h! Design the braking section to decelerate under 20 km/h gently without severe neck jerk.",
    targetGoalTh: "ชะลอความเร็วก่อนเข้าเส้นชัยเหลือต่ำกว่า 20 km/h โดยไม่เกิดแรงดึงกระชากเกินขีดจำกัด",
    targetGoalEn: "Decelerate before the finish line to under 20 km/h smoothly.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: การลดความเร็วทำได้ด้วยการสร้างเนินต้านแรงโน้มถ่วง (เปลี่ยน Ek กลับเป็น Ep) ก่อนเข้าสู่รางระดับระนาบ",
    socraticHintEn: "Physics Hint: Deceleration can be assisted by gravity hills (converting Ek back into Ep) before entering flat station brakes.",
    gravity: 9.8,
    frictionMode: false,
    budget: 11000,
    controlPoints: [
      { x: 40, y: 80 },
      { x: 300, y: 480 },
      { x: 600, y: 320 }, // Brake incline
      { x: 800, y: 360 },
      { x: 920, y: 360 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        return { success: true, message: "🎉 จอดเทียบชานชาลาได้อย่างนุ่มนวลและปลอดภัยตามมาตรฐานสากล!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 9,
    titleTh: "รถไฟเหาะบนดาวอังคาร (Martian Coaster)",
    titleEn: "Planetary Coaster: Mars",
    gradeBadge: "ม.3 (ว3.1 ดาราศาสตร์และแรงโน้มถ่วงต่างดาว)",
    descriptionTh: "ยินดีต้อนรับสู่สวนสนุกบนดาวอังคาร! ด้วยแรงโน้มถ่วง g = 3.71 m/s² (เพียง 38% ของโลก) การเคลื่อนที่จะเป็นอย่างไร? ต้องปรับขนาดลูปและความสูงอย่างไร?",
    descriptionEn: "Welcome to Mars! With gravity g = 3.71 m/s² (38% of Earth), how do loops and drops behave under lower gravitational pull?",
    targetGoalTh: "พิชิตลูปตีลังกาบนดาวอังคาร (g = 3.71 m/s²) สำเร็จด้วยความเร็วสมดุล",
    targetGoalEn: "Clear a vertical loop under Martian gravity (g = 3.71 m/s²).",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: เมื่อ g ลดลง ความเร็ววิกฤต v_min = √(g·R) จะลดลงด้วย ทำให้สามารถสร้างลูปที่ใหญ่ขึ้นได้ด้วยความสูงปล่อยเท่าเดิม!",
    socraticHintEn: "Physics Hint: Lower g reduces critical speed v_min = √(g·R), allowing larger loops with the same drop height!",
    gravity: 3.71,
    frictionMode: false,
    budget: 14000,
    controlPoints: [
      { x: 40, y: 140 },
      { x: 220, y: 480 },
      { x: 380, y: 220 }, // Giant Martian Loop!
      { x: 540, y: 480 },
      { x: 740, y: 420 },
      { x: 920, y: 420 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ ตกรางบนดาวอังคาร! ตรวจสอบความเร็วเทียบกับแรงโน้มถ่วง 3.71 m/s²" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 สำเร็จ! คุณคือวิศวกรผู้สร้างรถไฟเหาะข้ามดวงดาวเครื่องแรกของมนุษยชาติ!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 10,
    titleTh: "สวนสนุกในฝัน (The Ultimate Energy Tycoon)",
    titleEn: "The Ultimate Energy Tycoon",
    gradeBadge: "ม.1 - ม.3 (บูรณาการสะเต็มศึกษาและเศรษฐศาสตร์)",
    descriptionTh: "ภารกิจใหญ่ระดับผู้บริหารสวนสนุก! ออกแบบรถไฟเหาะในฝันที่ทำคะแนนความตื่นเต้น (Excitement) ไม่ต่ำกว่า 75 คะแนน ได้รับมาตรฐานความปลอดภัย EXCELLENT!",
    descriptionEn: "The ultimate Tycoon challenge! Design a dream coaster scoring at least 75 Excitement with EXCELLENT Safety rating.",
    targetGoalTh: "คะแนน Excitement ≥ 75, ความปลอดภัยระดับ EXCELLENT และวิ่งครบรอบอย่างราบรื่น",
    targetGoalEn: "Achieve Excitement ≥ 75, EXCELLENT Safety, and clear the complete circuit.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: ผสมผสานทั้งการดิ่งลงเนินสูง (High Drop), แอร์ไทม์ (Airtime), และลูปที่นุ่มนวล โดยคุมแรง G ให้อยู่ในช่วง 2.0g - 3.8g",
    socraticHintEn: "Physics Hint: Combine tall drops, zero-G airtime hills, and smooth loops while pacing G-forces within 2.0g to 3.8g.",
    gravity: 9.8,
    frictionMode: false,
    budget: 20000,
    controlPoints: [
      { x: 40, y: 80 },
      { x: 180, y: 480 },
      { x: 290, y: 260 },
      { x: 400, y: 480 },
      { x: 550, y: 240 },
      { x: 700, y: 480 },
      { x: 820, y: 380 },
      { x: 920, y: 380 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        if (ratings.safetyStatus !== 'EXCELLENT') {
          return { success: false, message: `❌ ความปลอดภัยยังไม่ผ่าน (${ratings.safetyStatus})! ${ratings.message}` };
        }
        if (ratings.excitement < 75) {
          return { success: false, message: `❌ คะแนนความตื่นเต้นได้ ${ratings.excitement} (เป้าหมาย 75 คะแนน)! เพิ่มความเร็วหรือช่วงแอร์ไทม์` };
        }
        return { success: true, message: `🏆 ยินดีด้วยอย่างยิ่ง! คุณผ่านการทดสอบเป็นสุดยอดวิศวกร Roller Coaster Energy Tycoon ตัวจริง!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  }
];
