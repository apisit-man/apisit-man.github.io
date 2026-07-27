document.addEventListener("DOMContentLoaded", () => {
    // --- Audio Sound Effects (Web Audio API) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playSound(type) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'click') {
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.start(); osc.stop(audioCtx.currentTime + 0.1);
        } else if (type === 'success') {
            osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            osc.start(); osc.stop(audioCtx.currentTime + 0.4);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            osc.start(); osc.stop(audioCtx.currentTime + 0.3);
        }
    }

    // --- Game Data ---
    let playerRole = "";
    let score = 0;
    let currentStep = 0;
    let maxSteps = 4; // Number of questions per mission
    let teacherMode = false;
    let lives = 3;
    let timeRemaining = 30;
    let timerInterval = null;
    let currentPlayScenes = []; 
    let defaultTimer = 30;

    // --- Badge System ---
    const badges = {
        'วิศวกรภารกิจ': 'badge-engineer',
        'นักบินอวกาศ': 'badge-pilot',
        'นักวิทยาศาสตร์': 'badge-scientist'
    };

    function loadBadges() {
        const saved = JSON.parse(localStorage.getItem('physicsPilotBadges')) || [];
        saved.forEach(role => {
            const badgeId = badges[role];
            if (badgeId) {
                document.getElementById(badgeId).classList.add('unlocked');
            }
        });
    }
    loadBadges();

    function saveBadge(role) {
        let savedBadges = JSON.parse(localStorage.getItem('physicsPilotBadges')) || [];
        if (!savedBadges.includes(role)) {
            savedBadges.push(role);
            document.getElementById(badges[role]).classList.add('unlocked');
            const b = document.getElementById(badges[role]);
            b.style.transform = "scale(1.5)";
            b.style.transition = "transform 0.5s";
            setTimeout(() => { b.style.transform = "scale(1)"; }, 1000);
        }
        localStorage.setItem('physicsPilotBadges', JSON.stringify(savedBadges));
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    window.toggleTeacherMode = function() {
        teacherMode = !teacherMode;
        const btn = document.querySelector('.teacher-toggle');
        const note = document.getElementById('teacher-note-box');
        
        if (teacherMode) {
            btn.innerHTML = "👩‍🏫 โหมดครู: เปิด (แสดงคำอธิบาย)";
            btn.style.background = "var(--warning)";
            btn.style.color = "var(--bg-dark)";
            if (currentStep >= 0 && currentPlayScenes[currentStep]) note.style.display = "block";
        } else {
            btn.innerHTML = "👩‍🏫 โหมดครู: ปิด";
            btn.style.background = "#2d3846";
            btn.style.color = "var(--warning)";
            note.style.display = "none";
        }
    }

    window.selectRole = function(role, icon, desc) {
        playSound('click');
        playerRole = role;
        document.querySelectorAll('.role-card').forEach(card => card.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
        
        if (role === 'นักบินอวกาศ') {
            defaultTimer = 20;
            lives = 3;
        } else if (role === 'วิศวกรภารกิจ') {
            defaultTimer = 30;
            lives = 4;
        } else if (role === 'นักวิทยาศาสตร์') {
            defaultTimer = 40;
            lives = 3;
        }

        document.getElementById('selected-role-name').innerText = `${icon} ${role}`;
        document.getElementById('selected-role-desc').innerText = `"${desc}" (พลังชีวิต: ${lives} | เวลาตอบ: ${defaultTimer} วิ)`;
        document.getElementById('role-confirm').classList.remove('hidden');
    }

    async function fetchAIScene(topic) {
        try {
            // URL of your Vercel API. You will need to change this if your vercel app domain is different!
            // Right now we use a relative URL assuming this runs on Vercel, OR you can put full absolute Vercel URL here.
            // But since this game will be hosted on GitHub Pages, you MUST replace this URL with the actual Vercel deployment URL
            // Example: https://ai-literacy-vercel.vercel.app/api/generate-physics
            
            const apiUrl = 'https://apisit-ai-literacy.vercel.app/api/generate-physics'; // Please update with your actual Vercel Domain

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic })
            });

            if (!response.ok) {
                throw new Error("API Error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return {
                title: "⚠️ ระบบ AI ขัดข้อง",
                desc: "ศูนย์ควบคุมสูญเสียการเชื่อมต่อกับ AI! กรุณาตรวจสอบ Vercel API URL และ การตั้งค่า CORS... นี่คือคำถามฉุกเฉิน: เมื่อไม่มีแรงโน้มถ่วง ยานจะรักษาสภาพการเคลื่อนที่ตามกฎของใคร?",
                concept: "กฎของนิวตัน",
                teacherNote: "เมื่อ API ล้มเหลว ระบบจะแสดงคำถามสำรอง",
                choices: [
                    { text: "ไอแซก นิวตัน (กฎความเฉื่อย)", correct: true, feedback: "ถูกต้อง! ยานจะรักษาสภาพการเคลื่อนที่เดิม" },
                    { text: "อัลเบิร์ต ไอน์สไตน์", correct: false, hint: "ลองนึกถึงผู้ค้นพบกฎ 3 ข้อของการเคลื่อนที่", feedback: "ผิดครับ ไอน์สไตน์เน้นสัมพัทธภาพ" },
                    { text: "กาลิเลโอ", correct: false, hint: "ใกล้เคียง แต่เขายังไม่ใช่คนตั้งกฎ 3 ข้อ", feedback: "ผิดครับ แม้กาลิเลโอจะริเริ่ม แต่ผู้ตั้งกฎคือนิวตัน" }
                ]
            };
        }
    }

    window.startGame = async function() {
        playSound('click');
        score = 0;
        currentStep = 0;
        currentPlayScenes = [];
        
        if (playerRole === 'วิศวกรภารกิจ') lives = 4;
        else lives = 3;
        
        document.getElementById('ui-role').innerText = playerRole;
        document.getElementById('ui-score').innerText = score;
        document.getElementById('ui-lives').innerText = lives;
        
        document.getElementById('screen-intro').classList.add('hidden');
        document.getElementById('screen-game').classList.remove('hidden');
        document.getElementById('game-status').classList.remove('hidden');
        document.getElementById('progress-container').classList.remove('hidden');
        
        await loadNextAIScene();
    }

    async function loadNextAIScene() {
        const topicInput = document.getElementById('topic-input').value;

        // Show Loading UI
        document.getElementById('loading-container').classList.remove('hidden');
        document.getElementById('game-content').classList.add('hidden');
        document.getElementById('timer-container').classList.add('hidden');
        
        const scene = await fetchAIScene(topicInput);
        currentPlayScenes.push(scene);

        // Hide Loading UI
        document.getElementById('loading-container').classList.add('hidden');
        document.getElementById('game-content').classList.remove('hidden');
        document.getElementById('timer-container').classList.remove('hidden');

        renderScene(scene);
    }

    function renderScene(scene) {
        const progressPct = ((currentStep) / maxSteps) * 100;
        document.getElementById('ui-progress').style.width = `${progressPct}%`;
        document.getElementById('ui-lives').innerText = lives;

        timeRemaining = defaultTimer;
        updateTimerUI();
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimerUI();
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);

        document.getElementById('scene-title').innerText = scene.title;
        document.getElementById('scene-desc').innerText = scene.desc;
        
        document.getElementById('teacher-note-text').innerText = scene.teacherNote;
        document.getElementById('teacher-note-box').style.display = teacherMode ? "block" : "none";

        document.getElementById('feedback-box').style.display = 'none';
        document.getElementById('feedback-box').className = 'feedback-box';

        const container = document.getElementById('choices-container');
        container.innerHTML = "";
        
        const shuffledChoices = shuffleArray([...scene.choices]);
        
        shuffledChoices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.innerHTML = `<span style="opacity:0.7; font-weight:bold; font-size:1.1em; width:20px;">${index + 1}.</span> <span>${choice.text}</span>`;
            btn.onclick = () => checkAnswer(choice, btn);
            container.appendChild(btn);
        });
    }

    function updateTimerUI() {
        const pct = (timeRemaining / defaultTimer) * 100;
        document.getElementById('ui-timer-bar').style.width = `${pct}%`;
        document.getElementById('ui-timer-text').innerText = `${timeRemaining}s`;
        
        if (timeRemaining <= 5) {
            document.getElementById('ui-timer-bar').style.background = "var(--danger)";
        } else {
            document.getElementById('ui-timer-bar').style.background = "linear-gradient(90deg, #feca57, #ff6b6b)";
        }
    }

    function handleTimeout() {
        const allBtns = document.querySelectorAll('#choices-container .btn');
        allBtns.forEach(b => b.disabled = true);
        
        playSound('error');
        lives--;
        document.getElementById('ui-lives').innerText = lives;
        
        const fbBox = document.getElementById('feedback-box');
        const fbTitle = document.getElementById('feedback-title');
        const fbText = document.getElementById('feedback-text');
        
        fbBox.style.display = 'block';
        fbBox.className = 'feedback-box error';
        fbTitle.innerText = "⏳ หมดเวลา!";
        fbText.innerHTML = `คุณตอบไม่ทันเวลา! ยานได้รับความเสียหาย <br><br>พลังชีวิตคงเหลือ: ${lives}`;
        
        if (lives <= 0) {
            document.getElementById('next-btn').innerText = "💀 ยานถูกทำลาย... ➔";
        } else if (currentStep >= maxSteps - 1) {
            document.getElementById('next-btn').innerText = "📋 ดูสรุปผลภารกิจ ➔";
        } else {
            document.getElementById('next-btn').innerText = "ให้ AI สร้างสถานการณ์ถัดไป ➔";
        }
    }

    window.checkAnswer = function(choice, btnElement) {
        clearInterval(timerInterval);

        const allBtns = document.querySelectorAll('#choices-container .btn');
        allBtns.forEach(b => b.disabled = true);

        const fbBox = document.getElementById('feedback-box');
        const fbTitle = document.getElementById('feedback-title');
        const fbText = document.getElementById('feedback-text');
        
        fbBox.style.display = 'block';

        if (choice.correct) {
            playSound('success');
            const timeBonus = Math.floor(timeRemaining / 2);
            score += 25 + timeBonus;
            document.getElementById('ui-score').innerText = score;
            
            btnElement.style.background = "var(--success)";
            btnElement.style.color = "var(--bg-dark)";
            btnElement.style.borderColor = "var(--success)";
            
            fbBox.className = 'feedback-box success';
            fbTitle.innerText = "🎉 ยอดเยี่ยม! การตัดสินใจถูกต้อง";
            fbText.innerHTML = `${choice.feedback} <br><br><small>(โบนัสเวลา: +${timeBonus} คะแนน)</small>`;
        } else {
            playSound('error');
            lives--;
            document.getElementById('ui-lives').innerText = lives;
            
            btnElement.style.background = "var(--danger)";
            btnElement.style.color = "#fff";
            btnElement.style.borderColor = "var(--danger)";
            
            fbBox.className = 'feedback-box error';
            fbTitle.innerText = "⚠️ แจ้งเตือนจากระบบควบคุม: มีข้อผิดพลาด!";
            fbText.innerHTML = `<strong>${choice.hint || ''}</strong><br><br><u>คำอธิบาย:</u> ${choice.feedback} <br><br>พลังชีวิตคงเหลือ: ${lives}`;
        }
        
        if (lives <= 0) {
            document.getElementById('next-btn').innerText = "💀 ยานถูกทำลาย... ➔";
        } else if (currentStep >= maxSteps - 1) {
            document.getElementById('next-btn').innerText = "📋 ดูสรุปผลภารกิจ ➔";
        } else {
            document.getElementById('next-btn').innerText = "ให้ AI สร้างสถานการณ์ถัดไป ➔";
        }
    }

    window.nextScene = async function() {
        playSound('click');
        if (lives <= 0) {
            showSummary();
            return;
        }
        currentStep++;
        if (currentStep < maxSteps) {
            await loadNextAIScene();
        } else {
            showSummary();
        }
    }

    function showSummary() {
        clearInterval(timerInterval);
        document.getElementById('screen-game').classList.add('hidden');
        document.getElementById('progress-container').classList.add('hidden');
        document.getElementById('timer-container').classList.add('hidden');
        document.getElementById('screen-summary').classList.remove('hidden');
        
        const endIcon = document.getElementById('end-icon');
        const endTitle = document.getElementById('end-title');
        const endDesc = document.getElementById('end-desc');
        const summaryList = document.getElementById('summary-list');

        summaryList.innerHTML = "";
        currentPlayScenes.forEach(scene => {
            let cleanTitle = scene.title.replace('ฉากวิกฤติ: ','').replace(/ฉากที่ \d+: /,'');
            summaryList.innerHTML += `<li><strong>${cleanTitle}:</strong> ${scene.concept}</li>`;
        });

        if (lives > 0) {
            playSound('success');
            endIcon.innerText = "🏆🚀🌕";
            endTitle.innerText = "ภารกิจสำเร็จลุล่วง!";
            endTitle.style.color = "var(--success)";
            endDesc.innerText = `ในฐานะ "${playerRole}" คุณเอาตัวรอดมาได้! ยานลงจอดอย่างปลอดภัย (คะแนน ${score} | พลังชีวิต ${lives})`;
            saveBadge(playerRole);
        } else {
            playSound('error');
            endIcon.innerText = "💥🚀🌌";
            endTitle.innerText = "ภารกิจล้มเหลว ยานพังพินาศ!";
            endTitle.style.color = "var(--danger)";
            endDesc.innerText = `การฝ่าฝืนกฎฟิสิกส์ในอวกาศเป็นเรื่องอันตราย! ในฐานะ "${playerRole}" คุณสามารถเรียนรู้จากข้อผิดพลาดและเริ่มใหม่ได้เสมอ (คะแนน ${score})`;
        }
    }
});
