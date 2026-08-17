const DOM = {
    chatContainer: document.getElementById('chat-container'),
    chatForm: document.getElementById('chat-form'),
    userInput: document.getElementById('user-input'),
    sendBtn: document.getElementById('send-btn'),
    typingIndicator: document.getElementById('typing-indicator'),
    settingsBtn: document.getElementById('settings-btn'),
    settingsModal: document.getElementById('settings-modal'),
    settingsModalContent: document.getElementById('settings-modal-content'),
    saveSettingsBtn: document.getElementById('save-settings-btn'),
    cancelSettingsBtn: document.getElementById('cancel-settings-btn'),
    gasUrlInput: document.getElementById('gas-url-input'),
    levelBadge: document.getElementById('level-badge'),
    connectionStatus: document.getElementById('connection-status'),
    userTemplate: document.getElementById('user-msg-template'),
    aiTemplate: document.getElementById('ai-msg-template'),
    sessionMode: document.getElementById('session-mode'),
    correctionMode: document.getElementById('correction-mode'),
    startSessionBtn: document.getElementById('start-session-btn'),
    endSessionBtn: document.getElementById('end-session-btn'),
    sessionSubtitle: document.getElementById('session-subtitle'),
    onboardingModal: document.getElementById('onboarding-modal'),
    onboardingForm: document.getElementById('onboarding-form'),
    focusTitle: document.getElementById('focus-title'),
    focusDescription: document.getElementById('focus-description'),
    assessmentStatus: document.getElementById('assessment-status'),
    profileGoal: document.getElementById('profile-goal'),
    profileCorrection: document.getElementById('profile-correction'),
    wordsDue: document.getElementById('words-due'),
    lastInsight: document.getElementById('last-insight'),
    progressBtn: document.getElementById('progress-btn'),
    mobileProgress: document.getElementById('mobile-progress'),
    mobileProgressContent: document.getElementById('mobile-progress-content'),
    closeProgressBtn: document.getElementById('close-progress-btn'),
    mobileProgressBackdrop: document.getElementById('mobile-progress-backdrop'),
    micBtn: document.getElementById('mic-btn'),
    ttsToggle: document.getElementById('tts-toggle'),
    ttsIcon: document.getElementById('tts-icon'),
    ttsLabel: document.getElementById('tts-label'),
    voiceStatus: document.getElementById('voice-status')
};

const LABELS = {
    goals: {
        work: 'Work and meetings', academic: 'Academic English', conversation: 'Everyday conversation',
        presentation: 'Presentations', exam: 'Exam preparation'
    },
    corrections: { balanced: 'Balanced', fluency: 'Fluency first', accuracy: 'Immediate' },
    sessions: {
        conversation: 'Conversation practice', vocabulary: 'Vocabulary review', grammar: 'Grammar clinic',
        academic: 'Academic writing', roleplay: 'Role-play', quick: 'Quick lesson', diagnostic: 'Level assessment'
    }
};

const API_URL = 'https://apisit-man-github-io-n1me.vercel.app/api/tutor';
const STORAGE_KEY = 'english_tutor_data';

const state = {
    chatHistory: [],
    profile: null,
    memory: [],
    dueVocabulary: [],
    vocabulary: [],
    isGenerating: false,
    sessionActive: false,
    autoSpeak: true,
    isListening: false
};

const HF_API_URL = 'https://apisit5-personal-english-tutor.hf.space';
const SPEECH_LOCALE = 'en-GB'; // Used for formatting/hints if needed

let mediaRecorder = null;
let audioChunks = [];
let currentAudio = null;

const loadLocalData = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
};

const saveLocalData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        profile: state.profile,
        memory: state.memory,
        dueVocabulary: state.dueVocabulary,
        vocabulary: state.vocabulary,
        chatHistory: state.chatHistory,
        autoSpeak: state.autoSpeak
    }));
};

const scrollToBottom = () => {
    DOM.chatContainer.scrollTo({ top: DOM.chatContainer.scrollHeight, behavior: 'smooth' });
};

const renderMarkdown = content => {
    const html = marked.parse(content || '');
    return window.DOMPurify ? DOMPurify.sanitize(html) : html;
};

const speechText = content => {
    const container = document.createElement('div');
    container.innerHTML = renderMarkdown(content);
    return (container.textContent || '').replace(/\s+/g, ' ').trim();
};

const stopSpeaking = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
};

const speakTutorReply = async content => {
    if (!state.autoSpeak) return;
    const text = speechText(content);
    if (!text) return;
    stopSpeaking();
    
    DOM.voiceStatus.textContent = 'Tutor speaking (OpenAI Voice)...';
    try {
        const response = await fetch(`${HF_API_URL}/tts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, voice: 'nova' })
        });
        if (!response.ok) throw new Error('TTS failed');
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        currentAudio = new Audio(url);
        currentAudio.onended = () => {
            DOM.voiceStatus.textContent = 'Voice mode ready';
        };
        await currentAudio.play();
    } catch (error) {
        console.error('Error playing TTS:', error);
        DOM.voiceStatus.textContent = 'Could not play OpenAI speech. The written reply is still available.';
    }
};

const renderVoiceControls = () => {
    DOM.ttsToggle.setAttribute('aria-pressed', String(state.autoSpeak));
    DOM.ttsToggle.classList.toggle('is-active', state.autoSpeak);
    DOM.ttsIcon.textContent = state.autoSpeak ? '🔊' : '🔇';
    DOM.ttsLabel.textContent = `Auto-speak: ${state.autoSpeak ? 'ON' : 'OFF'}`;
    DOM.ttsToggle.title = state.autoSpeak ? 'Turn auto-speak off' : 'Turn auto-speak on';
};

const clearWelcome = () => {
    const welcome = DOM.chatContainer.querySelector('.text-center');
    if (welcome) welcome.remove();
};

const appendMessage = (role, content, meta = null) => {
    clearWelcome();
    const template = role === 'user' ? DOM.userTemplate : DOM.aiTemplate;
    const clone = template.content.cloneNode(true);
    if (role === 'user') {
        clone.querySelector('p').textContent = content;
    } else {
        const message = clone.querySelector('.markdown-content');
        message.innerHTML = renderMarkdown(content);
        const learned = meta && Array.isArray(meta.newVocabulary) ? meta.newVocabulary : [];
        if (learned.length) {
            const note = document.createElement('div');
            note.className = 'insight-note';
            note.textContent = `Saved for review: ${learned.map(item => item.term).filter(Boolean).join(', ')}`;
            message.parentElement.appendChild(note);
        }
    }
    DOM.chatContainer.appendChild(clone);
    scrollToBottom();
};

const setInputState = disabled => {
    DOM.userInput.disabled = disabled;
    DOM.sendBtn.disabled = disabled;
    DOM.micBtn.disabled = disabled; // We will handle mic permissions dynamically
    if (!disabled) DOM.userInput.focus();
};

const setGenerating = generating => {
    state.isGenerating = generating;
    setInputState(generating);
    DOM.typingIndicator.classList.toggle('hidden', !generating);
    if (generating) scrollToBottom();
};

const api = async (action, payload = null) => {
    const options = { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload }) 
    };
    const response = await fetch(API_URL, options);
    if (!response.ok) throw new Error(`Tutor service returned ${response.status}.`);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
};

const apiWithRetry = async (action, payload = null, { retries = 2, delayMs = 750 } = {}) => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await api(action, payload);
        } catch (error) {
            lastError = error;
            if (attempt === retries) break;
            await new Promise(resolve => setTimeout(resolve, delayMs * (2 ** attempt)));
        }
    }
    throw lastError;
};

const showSettings = () => {
    DOM.settingsModal.classList.remove('hidden');
    setTimeout(() => DOM.settingsModalContent.classList.remove('scale-95', 'opacity-0'), 10);
};

const hideSettings = () => {
    DOM.settingsModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => DOM.settingsModal.classList.add('hidden'), 200);
};

const renderDashboard = () => {
    const profile = state.profile || {};
    const latestMemory = state.memory[0] || {};
    const status = profile.assessmentStatus || 'pending';
    DOM.levelBadge.textContent = profile.level || '—';
    DOM.profileGoal.textContent = LABELS.goals[profile.goal] || profile.goal || 'Not set';
    DOM.profileCorrection.textContent = LABELS.corrections[profile.correctionMode] || 'Balanced';
    DOM.wordsDue.textContent = state.dueVocabulary.length;
    DOM.assessmentStatus.textContent = status === 'complete' ? 'Assessed' : status === 'in_progress' ? 'In progress' : 'Not assessed';
    DOM.assessmentStatus.classList.toggle('complete', status === 'complete');
    DOM.lastInsight.textContent = latestMemory.insight || latestMemory.nextFocus || 'Your tutor will record recurring strengths and difficulties here.';
    DOM.focusTitle.textContent = latestMemory.nextFocus || (status === 'complete' ? 'Continue your learning plan' : 'Complete your level assessment');
    DOM.focusDescription.textContent = latestMemory.summary || (status === 'complete'
        ? 'Choose a lesson type and your tutor will adapt it to your history.'
        : 'Your tutor will assess conversation, vocabulary, grammar, and writing one step at a time.');
    DOM.sessionMode.value = profile.sessionMode || (status === 'complete' ? 'conversation' : 'diagnostic');
    DOM.correctionMode.value = profile.correctionMode || 'balanced';
    DOM.sessionSubtitle.textContent = `${LABELS.sessions[DOM.sessionMode.value]} · ${profile.level || 'assessment pending'}`;
    renderMobileProgress();
};

const renderMobileProgress = () => {
    const profile = state.profile || {};
    const latest = state.memory[0] || {};
    DOM.mobileProgressContent.innerHTML = '';
    const rows = [
        ['Current level', profile.level || 'Not assessed'],
        ['Main goal', LABELS.goals[profile.goal] || profile.goal || 'Not set'],
        ['Correction style', LABELS.corrections[profile.correctionMode] || 'Balanced'],
        ['Words due', String(state.dueVocabulary.length)],
        ['Next focus', latest.nextFocus || 'Complete your first lesson']
    ];
    rows.forEach(([label, value]) => {
        const card = document.createElement('div');
        card.className = 'panel-card';
        const heading = document.createElement('p');
        heading.className = 'eyebrow';
        heading.textContent = label;
        const detail = document.createElement('p');
        detail.className = 'mt-2 text-sm font-semibold';
        detail.textContent = value;
        card.append(heading, detail);
        DOM.mobileProgressContent.appendChild(card);
    });
};

const refreshLearningData = async () => {
    const localData = loadLocalData();
    state.profile = localData.profile || null;
    state.memory = localData.memory || [];
    state.dueVocabulary = localData.dueVocabulary || [];
    state.vocabulary = localData.vocabulary || [];
    renderDashboard();
};

const loadApplication = async () => {
    const localData = loadLocalData();
    state.profile = localData.profile || null;
    state.memory = localData.memory || [];
    state.dueVocabulary = localData.dueVocabulary || [];
    state.vocabulary = localData.vocabulary || [];
    state.chatHistory = localData.chatHistory || [];
    state.autoSpeak = localData.autoSpeak !== false;
    if (state.profile) state.profile.englishVariant = SPEECH_LOCALE;
    renderVoiceControls();
    
    if (state.chatHistory.length) {
        DOM.chatContainer.innerHTML = '';
        state.chatHistory.forEach(message => {
            appendMessage(message.role, message.content);
        });
    }
    renderDashboard();
    DOM.connectionStatus.className = 'w-2 h-2 rounded-full bg-emerald-500';
    if (!state.profile || !state.profile.onboardingComplete) {
        DOM.onboardingModal.classList.remove('hidden');
        DOM.onboardingModal.classList.add('flex');
    } else if (!state.chatHistory.length) {
        await startLesson(true);
    }
};

const generateResponse = async (userMessage, { hiddenTrigger = false } = {}) => {
    if (state.isGenerating) return;
    setGenerating(true);
    try {
        const messages = state.chatHistory.slice(-12);
        if (userMessage) messages.push({ role: 'user', content: userMessage });
        const data = await api('generateResponse', {
            messages,
            hiddenTrigger,
            sessionMode: DOM.sessionMode.value,
            correctionMode: DOM.correctionMode.value,
            profile: state.profile
        });
        const reply = data.reply || 'Let’s continue.';
        appendMessage('assistant', reply, data);
        speakTutorReply(reply);
        if (!hiddenTrigger && userMessage) state.chatHistory.push({ role: 'user', content: userMessage });
        state.chatHistory.push({ role: 'assistant', content: reply });
        if (data.profile) state.profile = data.profile;
        if (data.memory) state.memory = data.memory;
        if (data.dueVocabulary) state.dueVocabulary = data.dueVocabulary;
        saveLocalData();
        renderDashboard();
    } catch (error) {
        appendMessage('assistant', `⚠️ **Unable to reach your tutor:** ${error.message}`);
        DOM.connectionStatus.className = 'w-2 h-2 rounded-full bg-red-500';
    } finally {
        setGenerating(false);
    }
};

const startLesson = async (automatic = false) => {
    if (state.isGenerating) return;
    state.sessionActive = true;
    DOM.startSessionBtn.textContent = 'Restart lesson';
    DOM.endSessionBtn.disabled = false;
    DOM.sessionSubtitle.textContent = `${LABELS.sessions[DOM.sessionMode.value]} · in progress`;
    try {
        state.profile = state.profile || {};
        state.profile.sessionMode = DOM.sessionMode.value;
        state.profile.correctionMode = DOM.correctionMode.value;
        saveLocalData();
        renderDashboard();
        await generateResponse(automatic ? '' : 'Please start this lesson.', { hiddenTrigger: true });
    } catch (error) {
        appendMessage('assistant', `⚠️ **Unable to start the lesson:** ${error.message}`);
    }
};

const endLesson = async () => {
    if (!state.sessionActive || state.isGenerating) return;
    setGenerating(true);
    try {
        const data = await api('endSession', { 
            messages: state.chatHistory.slice(-20),
            profile: state.profile 
        });
        const reply = data.reply || 'Session complete. Your learning plan has been updated.';
        appendMessage('assistant', reply);
        speakTutorReply(reply);
        state.sessionActive = false;
        DOM.endSessionBtn.disabled = true;
        DOM.startSessionBtn.textContent = 'Start lesson';
        DOM.sessionSubtitle.textContent = 'Lesson saved · choose what to practise next';
        
        if (data.summary) {
            state.memory.unshift({
                timestamp: new Date().toISOString(),
                summary: data.summary,
                insight: data.strength,
                nextFocus: data.nextFocus,
                sessionMode: state.profile.sessionMode
            });
            if (state.memory.length > 12) state.memory.pop();
        }
        state.chatHistory.push({ role: 'assistant', content: reply });
        saveLocalData();
        renderDashboard();
        DOM.connectionStatus.className = 'w-2 h-2 rounded-full bg-emerald-500';
    } catch (error) {
        appendMessage('assistant', `⚠️ **Could not save the session summary:** ${error.message}`);
    } finally {
        setGenerating(false);
    }
};

DOM.userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
});

DOM.chatForm.addEventListener('submit', async event => {
    event.preventDefault();
    stopSpeaking();
    const message = DOM.userInput.value.trim();
    if (!message || state.isGenerating) return;
    if (!state.sessionActive) {
        state.sessionActive = true;
        DOM.endSessionBtn.disabled = false;
    }
    DOM.userInput.value = '';
    DOM.userInput.style.height = 'auto';
    appendMessage('user', message);
    await generateResponse(message);
});

DOM.userInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        DOM.chatForm.requestSubmit();
    }
});

const setListeningState = listening => {
    state.isListening = listening;
    DOM.micBtn.classList.toggle('is-listening', listening);
    DOM.micBtn.setAttribute('aria-pressed', String(listening));
    DOM.micBtn.setAttribute('aria-label', listening ? 'Stop voice input' : 'Start voice input');
    DOM.micBtn.title = listening ? 'Stop recording' : 'Tap to record voice';
};

const processAudioToText = async (blob) => {
    DOM.voiceStatus.textContent = 'Transcribing voice...';
    try {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');
        const response = await fetch(`${HF_API_URL}/stt`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('STT failed');
        const data = await response.json();
        
        if (data.text && data.text.trim()) {
            DOM.userInput.value = DOM.userInput.value + (DOM.userInput.value ? ' ' : '') + data.text.trim();
            DOM.userInput.dispatchEvent(new Event('input'));
            DOM.voiceStatus.textContent = 'Sending your spoken message...';
            DOM.chatForm.requestSubmit();
        } else {
            DOM.voiceStatus.textContent = 'Could not hear anything.';
        }
    } catch (err) {
        console.error('STT error:', err);
        DOM.voiceStatus.textContent = 'Voice transcription failed.';
    }
};

DOM.micBtn.addEventListener('click', async () => {
    if (state.isGenerating) return;
    if (state.isListening && mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        return;
    }
    
    stopSpeaking();
    
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Microphone not supported by browser.');
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) audioChunks.push(e.data);
        };
        
        mediaRecorder.onstop = () => {
            setListeningState(false);
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            stream.getTracks().forEach(track => track.stop()); // release mic
            processAudioToText(audioBlob);
        };
        
        mediaRecorder.start();
        setListeningState(true);
        DOM.voiceStatus.textContent = 'Recording... tap again to stop';
    } catch (err) {
        console.error('Mic access error:', err);
        DOM.voiceStatus.textContent = 'Microphone access is blocked or unavailable.';
    }
});

DOM.ttsToggle.addEventListener('click', () => {
    state.autoSpeak = !state.autoSpeak;
    if (!state.autoSpeak) stopSpeaking();
    saveLocalData();
    renderVoiceControls();
    DOM.voiceStatus.textContent = state.autoSpeak
        ? 'Auto-speak enabled · UK English'
        : 'Auto-speak off · tap the speaker to enable it';
});

DOM.onboardingForm.addEventListener('submit', async event => {
    event.preventDefault();
    const correction = new FormData(DOM.onboardingForm).get('onboarding-correction') || 'balanced';
    const profile = {
        learnerName: document.getElementById('learner-name').value.trim(),
        goal: document.getElementById('learning-goal').value,
        interests: document.getElementById('learner-interests').value.trim(),
        mainChallenge: document.getElementById('main-challenge').value,
        dailyMinutes: Number(document.getElementById('daily-minutes').value),
        correctionMode: correction,
        sessionMode: 'diagnostic',
        assessmentStatus: 'in_progress',
        englishVariant: SPEECH_LOCALE,
        onboardingComplete: true
    };
    setInputState(true);
    try {
        state.profile = profile;
        saveLocalData();
        DOM.onboardingModal.classList.add('hidden');
        DOM.onboardingModal.classList.remove('flex');
        renderDashboard();
        await startLesson(true);
    } catch (error) {
        alert(`Could not save your profile: ${error.message}`);
    } finally {
        setInputState(false);
    }
});

DOM.settingsBtn.addEventListener('click', showSettings);
DOM.cancelSettingsBtn.addEventListener('click', hideSettings);
DOM.saveSettingsBtn.addEventListener('click', () => {
    hideSettings();
    window.location.reload();
});
DOM.startSessionBtn.addEventListener('click', () => startLesson(false));
DOM.endSessionBtn.addEventListener('click', endLesson);
DOM.correctionMode.addEventListener('change', () => {
    if (state.profile) state.profile.correctionMode = DOM.correctionMode.value;
    renderDashboard();
});
DOM.sessionMode.addEventListener('change', () => {
    DOM.sessionSubtitle.textContent = `${LABELS.sessions[DOM.sessionMode.value]} · ready to start`;
});

const toggleMobileProgress = open => DOM.mobileProgress.classList.toggle('hidden', !open);
DOM.progressBtn.addEventListener('click', () => toggleMobileProgress(true));
DOM.closeProgressBtn.addEventListener('click', () => toggleMobileProgress(false));
DOM.mobileProgressBackdrop.addEventListener('click', () => toggleMobileProgress(false));

const init = async () => {
    try {
        await loadApplication();
    } catch (error) {
        DOM.connectionStatus.className = 'w-2 h-2 rounded-full bg-red-500';
        appendMessage('assistant', `⚠️ **Setup error:** ${error.message}`);
    }
};

init();
