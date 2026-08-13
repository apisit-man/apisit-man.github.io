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
    mobileProgressBackdrop: document.getElementById('mobile-progress-backdrop')
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

const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbxlMDV3l2Q_5lXoNJJm3obIPS9WdXw5p4dsKT0hAkRwo8Mkjj6KuzT4RUBt9Sr2lfrJvQ/exec';
const RETIRED_GAS_URLS = [
    'https://script.google.com/macros/s/AKfycbyQ2YO9FOG8GEWlzSCOsfGu61ZSMA8gDG_v4EAA7DO4lR2OirBa7vWBPr0IZ1l3vdEDhw/exec',
    'https://script.google.com/macros/s/AKfycbzXbGoHT_0L2cWzpbtQNLzzkk4bKA7Xm5ewq6xXJpF6VFQETqb3n1osZLkIDSGpbUZz9w/exec'
];

const state = {
    chatHistory: [],
    profile: null,
    memory: [],
    dueVocabulary: [],
    isGenerating: false,
    sessionActive: false
};

const getConfig = () => {
    const storedUrl = localStorage.getItem('english_tutor_gas_url');
    if (!storedUrl || RETIRED_GAS_URLS.includes(storedUrl)) {
        if (storedUrl) localStorage.setItem('english_tutor_gas_url', DEFAULT_GAS_URL);
        return { gasUrl: DEFAULT_GAS_URL };
    }
    return { gasUrl: storedUrl };
};
const setConfig = gasUrl => localStorage.setItem('english_tutor_gas_url', gasUrl);

const scrollToBottom = () => {
    DOM.chatContainer.scrollTo({ top: DOM.chatContainer.scrollHeight, behavior: 'smooth' });
};

const renderMarkdown = content => {
    const html = marked.parse(content || '');
    return window.DOMPurify ? DOMPurify.sanitize(html) : html;
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
    if (!disabled) DOM.userInput.focus();
};

const setGenerating = generating => {
    state.isGenerating = generating;
    setInputState(generating);
    DOM.typingIndicator.classList.toggle('hidden', !generating);
    if (generating) scrollToBottom();
};

const api = async (action, payload = null) => {
    const { gasUrl } = getConfig();
    if (!gasUrl) throw new Error('Please add your Google Apps Script URL in Settings.');
    const options = payload === null
        ? {}
        : { method: 'POST', body: JSON.stringify({ action, ...payload }) };
    const url = payload === null ? `${gasUrl}?action=${encodeURIComponent(action)}` : gasUrl;
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Tutor service returned ${response.status}.`);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        throw new Error('Google Apps Script requires sign-in. Redeploy the Web App with “Who has access” set to “Anyone”.');
    }
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
};

const showSettings = () => {
    DOM.gasUrlInput.value = getConfig().gasUrl;
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
    const data = await api('getBootstrap');
    state.profile = data.profile || {};
    state.memory = data.memory || [];
    state.dueVocabulary = data.dueVocabulary || [];
    renderDashboard();
};

const loadApplication = async () => {
    const data = await api('getBootstrap');
    state.profile = data.profile || {};
    state.memory = data.memory || [];
    state.dueVocabulary = data.dueVocabulary || [];
    state.chatHistory = [];
    if (Array.isArray(data.history) && data.history.length) {
        DOM.chatContainer.innerHTML = '';
        data.history.forEach(message => {
            state.chatHistory.push({ role: message.role, content: message.content });
            appendMessage(message.role, message.content);
        });
    }
    renderDashboard();
    DOM.connectionStatus.className = 'w-2 h-2 rounded-full bg-emerald-500';
    if (!state.profile.onboardingComplete) {
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
            correctionMode: DOM.correctionMode.value
        });
        const reply = data.reply || 'Let’s continue.';
        appendMessage('assistant', reply, data);
        if (!hiddenTrigger && userMessage) state.chatHistory.push({ role: 'user', content: userMessage });
        state.chatHistory.push({ role: 'assistant', content: reply });
        if (data.profile) state.profile = data.profile;
        if (data.memory) state.memory = data.memory;
        if (data.dueVocabulary) state.dueVocabulary = data.dueVocabulary;
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
        const data = await api('saveProfile', {
            profile: { sessionMode: DOM.sessionMode.value, correctionMode: DOM.correctionMode.value }
        });
        state.profile = data.profile || state.profile;
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
        const data = await api('endSession', { messages: state.chatHistory.slice(-20) });
        appendMessage('assistant', data.reply || 'Session complete. Your learning plan has been updated.');
        state.sessionActive = false;
        DOM.endSessionBtn.disabled = true;
        DOM.startSessionBtn.textContent = 'Start lesson';
        await refreshLearningData();
        DOM.sessionSubtitle.textContent = 'Lesson saved · choose what to practise next';
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
        onboardingComplete: true
    };
    setInputState(true);
    try {
        const data = await api('saveProfile', { profile });
        state.profile = data.profile;
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
    setConfig(DOM.gasUrlInput.value.trim());
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
    if (!getConfig().gasUrl) {
        DOM.connectionStatus.className = 'w-2 h-2 rounded-full bg-yellow-500';
        showSettings();
        return;
    }
    try {
        await loadApplication();
    } catch (error) {
        DOM.connectionStatus.className = 'w-2 h-2 rounded-full bg-red-500';
        appendMessage('assistant', `⚠️ **Setup error:** ${error.message}`);
    }
};

init();
