// DOM Elements
const setupSection = document.getElementById('setup-section');
const gameSection = document.getElementById('game-section');
const apiKeyInput = document.getElementById('api-key-input');
const startBtn = document.getElementById('start-btn');
const exitBtn = document.getElementById('exit-btn');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const levelControls = document.getElementById('level-controls');
const nextLevelBtn = document.getElementById('next-level-btn');
const retryBtn = document.getElementById('retry-btn');
const winSection = document.getElementById('win-section');
const playAgainBtn = document.getElementById('play-again-btn');

// Badges
const topicBadge = document.getElementById('current-topic-badge');
const levelBadge = document.getElementById('current-level-badge');
const scoreBadge = document.getElementById('current-score-badge');

// Audio
const applauseAudio = document.getElementById('applause-audio');

// State
let apiKey = '';
let chatHistory = [];
let currentTopic = 'bias';
let currentTopicName = 'อคติ (Bias)';
let currentLevel = 1;
let currentScore = 0;

// Topic Selection
const topicCards = document.querySelectorAll('.topic-card');
topicCards.forEach(card => {
    card.addEventListener('click', () => {
        topicCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        currentTopic = card.dataset.topic;
        currentTopicName = card.querySelector('h3').textContent;
    });
});

// System Prompt Templates based on Topic and Level
const getSystemPrompt = (topic, level) => {
    let topicDesc = "";
    
    switch(topic) {
        case 'bias':
            topicDesc = "อคติหรือความเอนเอียงทางข้อมูล (เช่น เหยียดเพศ, เหมารวมเชื้อชาติ, หรือเข้าข้างฝ่ายใดฝ่ายหนึ่ง)";
            break;
        case 'hallucination':
            topicDesc = "การแต่งข้อมูลขึ้นมาเอง มั่วตัวเลข มั่วชื่อคน หรือสร้างเหตุการณ์ที่ไม่มีอยู่จริง";
            break;
        case 'deepfake':
            topicDesc = "การอ้างถึงภาพ วิดีโอ หรือเสียงประดิษฐ์ที่ถูกสร้างขึ้นเพื่อหลอกลวงให้คนเชื่อว่าเป็นของจริง";
            break;
        case 'privacy':
            topicDesc = "การละเมิดความเป็นส่วนตัว การเปิดเผยข้อมูลส่วนบุคคล หรือข้อมูลความลับโดยไม่เหมาะสม";
            break;
    }

    let difficultyInstruction = "";
    if (level === 1) {
        difficultyInstruction = "ทำให้จุดที่ผิดพลาดนั้นชัดเจนมาก (ง่ายสำหรับมือใหม่)";
    } else if (level === 2) {
        difficultyInstruction = "ทำให้จุดที่ผิดพลาดนั้นแนบเนียนขึ้น ต้องอ่านอย่างตั้งใจถึงจะเจอ (ปานกลาง)";
    } else {
        difficultyInstruction = "ทำให้จุดที่ผิดพลาดนั้นซ่อนอยู่อย่างแนบเนียนที่สุด ดูน่าเชื่อถือมาก ต้องใช้ความคิดวิเคราะห์ขั้นสูง (ยากมาก)";
    }

    return {
        role: "system",
        content: `คุณคือเกมมาสเตอร์ในเกม 'นักสืบข้อมูล (AI Literacy Game)' 
หน้าที่ของคุณในด่านที่ ${level}:
1. สร้างสถานการณ์จำลอง ข้อความ หรือข่าวสั้นๆ (ภาษาไทย) ความยาวไม่เกิน 2-3 ประโยค ที่กระชับ ตรงเข้าประเด็นทันที ห้ามเกริ่นนำหรืออารัมภบทเยิ่นเย้อ โดยซ่อนจุดที่ผิดพลาดเกี่ยวกับ '${currentTopicName}' (${topicDesc}) ไว้ 1 จุด
   - ข้อบังคับระดับความยาก: ${difficultyInstruction}
2. จากนั้นขึ้นบรรทัดใหม่ และถามผู้เล่นด้วยคำถามสั้นๆ ว่า: "คุณคิดว่าข้อความด้านบนมีข้อมูลส่วนใดที่ผิดพลาดหรือเป็น ${currentTopicName}?"
3. เมื่อผู้เล่นตอบกลับมา ให้คุณประเมินว่าผู้เล่นจับผิดได้ถูกต้องหรือไม่`
    };
};

// Initialize / Start Game
startBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (!key.startsWith('AIza')) {
        alert('กรุณากรอก Gemini API Key ให้ถูกต้อง (มักจะขึ้นต้นด้วย AIza)');
        return;
    }
    
    apiKey = key;
    currentLevel = 1;
    currentScore = 0;
    updateBadges();
    
    setupSection.classList.add('hidden');
    setupSection.classList.remove('active');
    gameSection.classList.remove('hidden');
    gameSection.classList.add('active');
    
    startLevel();
});

// Start a specific level
async function startLevel() {
    updateBadges();
    levelControls.classList.add('hidden');
    nextLevelBtn.classList.add('hidden');
    retryBtn.classList.add('hidden');
    
    const systemPrompt = getSystemPrompt(currentTopic, currentLevel);
    chatHistory = [systemPrompt];
    chatBox.innerHTML = ''; 
    
    await fetchAIResponse(true); // true = initial scenario generation
}

// Exit / Change Topic
exitBtn.addEventListener('click', () => {
    gameSection.classList.remove('active');
    gameSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
    setupSection.classList.add('active');
    chatBox.innerHTML = '';
});

// Next Level
nextLevelBtn.addEventListener('click', () => {
    currentLevel++;
    startLevel();
});

// Retry
retryBtn.addEventListener('click', () => {
    // Retry same level without losing points
    startLevel();
});

// Play Again
playAgainBtn.addEventListener('click', () => {
    winSection.classList.remove('active');
    winSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
    setupSection.classList.add('active');
    chatBox.innerHTML = '';
});

// Send Message
sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (!text) return;
    
    appendMessage(text, 'user');
    userInput.value = '';
    
    chatHistory.push({ role: "user", content: text });
    await fetchAIResponse(false); // false = user response evaluation
});

// Handle Enter Key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Fetch API
async function fetchAIResponse(isInitialScenario) {
    userInput.disabled = true;
    sendBtn.disabled = true;
    appendMessage("AI กำลังพิมพ์...", 'system');
    
    let messagesToSend = [...chatHistory];
    
    if (!isInitialScenario) {
        messagesToSend.push({
            role: "system",
            content: `สำคัญมาก: ประเมินคำตอบล่าสุดของผู้เล่นว่าจับผิดได้ถูกต้องหรือไม่ คุณต้องตอบกลับในรูปแบบ JSON เท่านั้น โครงสร้าง: {"feedback": "คำอธิบายเหตุผลและเฉลย พร้อมคำชื่นชม", "passed": true หรือ false}`
        });
    }
    
    let geminiMessages = [];
    let systemContent = "";
    
    messagesToSend.forEach(msg => {
        if (msg.role === "system") {
            systemContent += msg.content + "\n\n";
        } else {
            let role = msg.role === "assistant" ? "model" : "user";
            geminiMessages.push({
                role: role,
                parts: [{ text: msg.content }]
            });
        }
    });

    if (geminiMessages.length === 0) {
        geminiMessages.push({
            role: "user",
            parts: [{ text: "เริ่มเกมสร้างสถานการณ์ด่านนี้ได้เลย" }]
        });
    }
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemContent }] },
                contents: geminiMessages,
                generationConfig: {
                    temperature: 0.7,
                    responseMimeType: isInitialScenario ? "text/plain" : "application/json"
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        const aiResponseText = data.candidates[0].content.parts[0].text;
        
        chatBox.removeChild(chatBox.lastChild); // Remove typing indicator
        
        if (isInitialScenario) {
            // First message is just text (scenario)
            appendMessage(aiResponseText, 'ai');
            // Store it back so we have history
            chatHistory.push({ role: "assistant", content: aiResponseText });
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
        } else {
            // Evaluation message should be JSON
            try {
                const result = JSON.parse(aiResponseText);
                appendMessage(result.feedback, 'ai');
                
                // Keep history in text format so AI doesn't get confused in next prompts
                chatHistory.push({ role: "assistant", content: result.feedback });
                
                levelControls.classList.remove('hidden');
                
                if (result.passed) {
                    currentScore += 100;
                    updateBadges();
                    triggerCelebration();
                    
                    if (currentScore >= 500) {
                        setTimeout(() => {
                            gameSection.classList.remove('active');
                            gameSection.classList.add('hidden');
                            winSection.classList.remove('hidden');
                            winSection.classList.add('active');
                            // Extra celebration for winning!
                            triggerCelebration();
                            setTimeout(triggerCelebration, 1000);
                            setTimeout(triggerCelebration, 2000);
                        }, 1500);
                    } else {
                        nextLevelBtn.classList.remove('hidden');
                    }
                } else {
                    retryBtn.classList.remove('hidden');
                }
                
            } catch (parseError) {
                // Fallback if AI didn't return proper JSON
                appendMessage(aiResponseText, 'ai');
                levelControls.classList.remove('hidden');
                nextLevelBtn.classList.remove('hidden');
                retryBtn.classList.remove('hidden');
            }
        }
        
    } catch (error) {
        if(chatBox.lastChild && chatBox.lastChild.textContent === "AI กำลังพิมพ์...") {
            chatBox.removeChild(chatBox.lastChild);
        }
        appendMessage(`เกิดข้อผิดพลาด: ${error.message}`, 'system');
        userInput.disabled = false;
        sendBtn.disabled = false;
    }
}

// Confetti & Audio
function triggerCelebration() {
    // Play sound
    applauseAudio.currentTime = 0;
    applauseAudio.play().catch(e => console.log("Audio play blocked by browser:", e));
    
    // Fire confetti
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
}

// UI Helpers
function updateBadges() {
    topicBadge.innerHTML = `<i class="fa-solid fa-tag"></i> Topic: ${currentTopicName}`;
    levelBadge.innerHTML = `<i class="fa-solid fa-layer-group"></i> ด่าน: ${currentLevel}`;
    scoreBadge.innerHTML = `<i class="fa-solid fa-star"></i> คะแนน: ${currentScore}`;
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `msg-${sender}`);
    
    let formattedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    formattedText = formattedText.replace(/\n/g, '<br>');
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    msgDiv.innerHTML = formattedText;
    chatBox.appendChild(msgDiv);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}
