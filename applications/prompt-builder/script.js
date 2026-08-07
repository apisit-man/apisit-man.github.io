document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'promptBuilderDraftV2';

    const form = document.getElementById('promptForm');
    const frameworkSelect = document.getElementById('framework');
    const resultPrompt = document.getElementById('resultPrompt');
    const copyBtn = document.getElementById('copyBtn');
    const magicRefineBtn = document.getElementById('magicRefineBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const taskInput = document.getElementById('task');
    const taskError = document.getElementById('taskError');
    const scoreValue = document.getElementById('scoreValue');
    const scoreBar = document.getElementById('scoreBar');
    const scoreHint = document.getElementById('scoreHint');
    const characterCount = document.getElementById('characterCount');
    const tokenEstimate = document.getElementById('tokenEstimate');
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    const undoBtn = document.getElementById('undoBtn');
    const btnText = copyBtn.querySelector('.btn-text');
    const btnIcon = copyBtn.querySelector('i');

    const fieldIds = [
        'role', 'task', 'context', 'format'
    ];
    const fields = Object.fromEntries(
        fieldIds.map(id => [id, document.getElementById(id)])
    );
    let clearedState = null;
    let toastTimer = null;

    function getValues() {
        return Object.fromEntries(
            fieldIds.map(id => [id, fields[id].value.trim()])
        );
    }

    function escapeXml(value) {
        return value
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    function sentence(value) {
        if (!value) return '';
        return /[.!?。！？]$/.test(value) ? value : `${value}.`;
    }

    function buildMarkdown(v) {
        const sections = [
            ['เป็นใคร/บทบาท (Role)', v.role ? `คุณคือ ${v.role}` : ''],
            ['ภารกิจ/งานที่ต้องการให้ทำ (Task)', v.task],
            ['บริบท (Context)', v.context],
            ['รูปแบบ (Format)', v.format]
        ];

        return sections
            .filter(([, value]) => value)
            .map(([heading, value]) => `# ${heading}\n${value}`)
            .join('\n\n');
    }

    function buildRtf(v) {
        return [
            v.role && `ทำหน้าที่เป็น ${sentence(v.role)}`,
            v.task && `งานของคุณคือ: ${sentence(v.task)}`,
            v.context && `ข้อมูลเพิ่มเติม: ${sentence(v.context)}`,
            v.format && `จัดรูปแบบผลลัพธ์เป็น ${sentence(v.format)}`
        ].filter(Boolean).join(' ');
    }

    function xmlTag(name, value) {
        return value ? `<${name}>\n${escapeXml(value)}\n</${name}>` : '';
    }

    function buildXml(v) {
        const mainSections = [
            xmlTag('role', v.role),
            xmlTag('task', v.task),
            xmlTag('context', v.context)
        ].filter(Boolean);

        const guidelines = [
            v.format && `- รูปแบบ: ${escapeXml(v.format)}`
        ].filter(Boolean);

        if (guidelines.length) {
            mainSections.push(`<guidelines>\n${guidelines.join('\n')}\n</guidelines>`);
        }

        return mainSections.join('\n\n');
    }

    function updateScore(v) {
        const weights = {
            task: 50,
            context: 25,
            role: 15,
            format: 10
        };
        const score = Object.entries(weights)
            .reduce((total, [key, weight]) => total + (v[key] ? weight : 0), 0);

        const suggestions = [];
        if (!v.task) suggestions.push('ระบุคำสั่งหลัก');
        if (!v.context) suggestions.push('เพิ่มบริบท');
        if (!v.format) suggestions.push('กำหนดรูปแบบผลลัพธ์');

        scoreValue.textContent = `${score}/100`;
        scoreBar.style.width = `${score}%`;
        scoreBar.className = score >= 80 ? 'score-good' : score >= 50 ? 'score-medium' : 'score-low';
        scoreHint.textContent = score === 100
            ? 'Prompt มีองค์ประกอบครบถ้วน พร้อมนำไปใช้งาน'
            : suggestions.length
                ? `แนะนำ: ${suggestions.slice(0, 3).join(' • ')}`
                : 'Prompt พร้อมใช้งานในระดับดี';
    }

    function saveDraft() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                ...getValues(),
                framework: frameworkSelect.value
            }));
        } catch (error) {
            console.warn('Unable to save prompt draft.', error);
        }
    }

    function generatePrompt({ save = true } = {}) {
        const values = getValues();
        const hasAnyInput = Object.values(values).some(Boolean);
        let promptText = '';

        if (hasAnyInput) {
            if (frameworkSelect.value === 'rtf') promptText = buildRtf(values);
            else if (frameworkSelect.value === 'xml') promptText = buildXml(values);
            else promptText = buildMarkdown(values);
        }

        resultPrompt.value = promptText.trim();
        const characterTotal = resultPrompt.value.length;
        characterCount.textContent = `${characterTotal.toLocaleString('th-TH')} ตัวอักษร`;
        tokenEstimate.textContent = `ประมาณ ${Math.ceil(characterTotal / 3).toLocaleString('th-TH')} tokens`;

        const taskMissing = hasAnyInput && !values.task;
        taskInput.setAttribute('aria-invalid', String(taskMissing));
        taskError.textContent = taskMissing ? 'กรุณาระบุคำสั่งหลักก่อนคัดลอกหรือดาวน์โหลด' : '';
        copyBtn.disabled = !promptText || taskMissing;
        if(magicRefineBtn) magicRefineBtn.disabled = !promptText || taskMissing;
        downloadBtn.disabled = !promptText || taskMissing;

        updateScore(values);
        resetCopyButton();
        if (save) saveDraft();
    }

    function restoreDraft() {
        try {
            const draft = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!draft) return false;
            fieldIds.forEach(id => {
                if (typeof draft[id] === 'string') fields[id].value = draft[id];
            });
            if (['markdown', 'rtf', 'xml'].includes(draft.framework)) {
                frameworkSelect.value = draft.framework;
            }
            return true;
        } catch (error) {
            console.warn('Unable to restore prompt draft.', error);
            return false;
        }
    }

    function resetCopyButton() {
        copyBtn.classList.remove('success');
        btnText.textContent = 'คัดลอก Prompt';
        btnIcon.className = 'fa-regular fa-copy';
    }

    function showToast(message, { type = 'success', allowUndo = false } = {}) {
        clearTimeout(toastTimer);
        toastMessage.textContent = message;
        toast.classList.toggle('error', type === 'error');
        toastIcon.className = type === 'error'
            ? 'fa-solid fa-circle-xmark'
            : 'fa-solid fa-circle-check';
        undoBtn.hidden = !allowUndo;
        toast.classList.add('show');
        toastTimer = setTimeout(() => toast.classList.remove('show'), allowUndo ? 5000 : 3000);
    }

    async function copyPrompt() {
        if (copyBtn.disabled) return;
        const textToCopy = resultPrompt.value;

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                resultPrompt.focus();
                resultPrompt.select();
                if (!document.execCommand('copy')) throw new Error('Copy command failed');
            }

            copyBtn.classList.add('success');
            btnText.textContent = 'คัดลอกแล้ว!';
            btnIcon.className = 'fa-solid fa-check';
            showToast('คัดลอกไปยังคลิปบอร์ดแล้ว!');
            setTimeout(resetCopyButton, 3000);
        } catch (error) {
            console.error('Failed to copy text.', error);
            showToast('ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาเลือกข้อความแล้วกด Ctrl+C', { type: 'error' });
            resultPrompt.focus();
            resultPrompt.select();
        }
    }

    function downloadPrompt() {
        if (downloadBtn.disabled) return;
        const extension = 'txt';
        const blob = new Blob([resultPrompt.value], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ai-prompt.${extension}`;
        link.click();
        URL.revokeObjectURL(url);
        showToast('ดาวน์โหลด Prompt แล้ว!');
    }

    fieldIds.forEach(id => fields[id].addEventListener('input', () => generatePrompt()));
    frameworkSelect.addEventListener('change', () => generatePrompt());
    copyBtn.addEventListener('click', copyPrompt);
    downloadBtn.addEventListener('click', downloadPrompt);

    // Magic Refine feature
    if (magicRefineBtn) {
        magicRefineBtn.addEventListener('click', async () => {
            const currentPrompt = resultPrompt.value.trim();
            if (!currentPrompt) return;

            // Update UI to loading state
            const originalIconHTML = magicRefineBtn.innerHTML;
            magicRefineBtn.disabled = true;
            magicRefineBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span class="btn-text">กำลังเกลา...</span>';
            resultPrompt.classList.add('pulse');

            try {
                const apiUrl = window.ADMIN_CONFIG?.apiUrl;
                if (!apiUrl) throw new Error('API URL not configured');

                const systemInstruction = `กรุณาช่วยเกลาและปรับปรุง Prompt ต่อไปนี้ให้มีความเป็นมืออาชีพ มีโครงสร้างที่ชัดเจน เป็นระบบ และให้ผลลัพธ์ที่ดีที่สุดเมื่อนำไปใช้กับ AI คุณต้องจัดเรียงตามโครงสร้าง (Role, Task, Context, Format, Tone) ให้สวยงาม โดยไม่ต้องมีคำเกริ่นนำ คำอธิบาย หรือคำลงท้ายใดๆ ส่งกลับมาเฉพาะเนื้อหา Prompt ที่เกลาแล้วในรูปแบบข้อความธรรมดา (Plain Text) เท่านั้น`;
                
                const payload = {
                    action: 'chatWithExpert',
                    message: systemInstruction + "\n\nPrompt ต้นฉบับ:\n" + currentPrompt,
                    history: []
                };

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (data.ok && data.reply) {
                    // Remove markdown code blocks if the AI accidentally wrapped it
                    let refinedText = data.reply.replace(/^```[a-z]*\n/gm, '').replace(/```$/gm, '').trim();
                    resultPrompt.value = refinedText;
                    updateMeta(refinedText);
                    
                    // Show success on button briefly
                    magicRefineBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="btn-text">เสร็จสิ้น</span>';
                    setTimeout(() => {
                        magicRefineBtn.innerHTML = originalIconHTML;
                        magicRefineBtn.disabled = false;
                    }, 2000);
                } else {
                    throw new Error(data.message || 'AI error');
                }
            } catch (error) {
                console.error('Magic Refine Error:', error);
                alert('ขออภัย ไม่สามารถเชื่อมต่อกับ AI ได้ กรุณาลองใหม่อีกครั้ง');
                magicRefineBtn.innerHTML = originalIconHTML;
                magicRefineBtn.disabled = false;
            } finally {
                resultPrompt.classList.remove('pulse');
            }
        });
    }

    clearBtn.addEventListener('click', () => {
        clearedState = {
            ...getValues(),
            framework: frameworkSelect.value
        };
        form.reset();
        frameworkSelect.value = 'markdown';
        try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* Storage is optional. */ }
        generatePrompt({ save: false });
        showToast('ล้างข้อมูลทั้งหมดแล้ว', { allowUndo: true });
        taskInput.focus();
    });

    undoBtn.addEventListener('click', () => {
        if (!clearedState) return;
        fieldIds.forEach(id => fields[id].value = clearedState[id] || '');
        frameworkSelect.value = clearedState.framework || 'markdown';
        generatePrompt();
        clearedState = null;
        toast.classList.remove('show');
        showToast('กู้คืนข้อมูลแล้ว!');
    });

    document.addEventListener('keydown', event => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && !copyBtn.disabled) {
            event.preventDefault();
            copyPrompt();
        }
    });

    const restored = restoreDraft();
    generatePrompt({ save: restored });
    taskInput.focus();

    // ==========================================
    // Chat UI Logic
    // ==========================================
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    let chatHistory = [];

    // Toggle window
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    chatCloseBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Enable/disable send button
        if (this.value.trim() !== '') {
            chatSendBtn.disabled = false;
        } else {
            chatSendBtn.disabled = true;
        }
    });

    // Handle send
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message to UI
        addMessageToUI(text, 'user');
        
        // Reset input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        chatSendBtn.disabled = true;

        // Show typing indicator
        const typingId = showTypingIndicator();
        
        try {
            // Get API URL from config
            const apiUrl = window.ADMIN_CONFIG?.apiUrl;
            if (!apiUrl) throw new Error('API URL not configured');

            const payload = {
                action: 'chatWithExpert',
                message: text,
                history: chatHistory
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            // Remove typing indicator
            document.getElementById(typingId)?.remove();

            if (data.ok) {
                // Add AI message to UI
                addMessageToUI(data.reply, 'ai');
                
                // Update history
                chatHistory.push({ role: 'user', text: text });
                chatHistory.push({ role: 'model', text: data.reply });
                
                // Keep history reasonable
                if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);
            } else {
                addMessageToUI('ขออภัย เกิดข้อผิดพลาด: ' + (data.message || 'ไม่สามารถติดต่อ AI ได้'), 'ai');
            }
        } catch (error) {
            console.error('Chat error:', error);
            document.getElementById(typingId)?.remove();
            addMessageToUI('ขออภัย ระบบขัดข้อง ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ ลองเช็คคอนฟิกอีกครั้งนะครับ', 'ai');
        }
    }

    chatSendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function addMessageToUI(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (sender === 'ai' && typeof marked !== 'undefined') {
            // Use marked.js if available to parse markdown
            contentDiv.innerHTML = marked.parse(text);
        } else {
            // Fallback text
            contentDiv.textContent = text;
        }
        
        msgDiv.appendChild(contentDiv);
        chatMessages.appendChild(msgDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ai-message';
        msgDiv.id = id;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content typing-indicator';
        contentDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        msgDiv.appendChild(contentDiv);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return id;
    }
});
