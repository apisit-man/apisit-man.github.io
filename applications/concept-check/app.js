/**
 * Concept Check AI - Frontend Logic (v2.0)
 * Upgraded with Student Navigation, KaTeX rendering, Test History Dashboard,
 * Report Caching, Anti-Spam checks, and Auto-Save.
 */

const DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycbwJxCh_v6PUpMpeeyJ3GrpOAgAYNv5yEXjg6ejSW9igeLsC2Pz513V7KUx_EsNc7p4rMw/exec";
const BRIDGE_READY_TIMEOUT_MS = 120000;
const DEFAULT_REQUEST_TIMEOUT_MS = 120000;
const REQUEST_TIMEOUTS_MS = {
    generateTest: 240000,
    generateReport: 330000,
    getResponses: 150000,
    getTeacherTests: 60000
};
let bridgeFrame = null;
let bridgeReadyPromise = null;
let resolveBridgeReady = null;
let bridgeMessageSource = null;
let bridgeMessageOrigin = null;
let bridgeChannel = null;
let bridgeListenerAttached = false;
const pendingBridgeRequests = new Map();

function getLocalOverride(parameterName) {
    const isLocalDevelopment = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const localOverride = new URLSearchParams(window.location.search).get(parameterName);
    return isLocalDevelopment ? localOverride : null;
}

function getBridgeUrl() {
    return getLocalOverride('bridgeUrl') || DEFAULT_GAS_URL;
}

function createRequestId() {
    return window.crypto && typeof window.crypto.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isTrustedBridgeOrigin(origin) {
    try {
        const url = new URL(origin);
        const isGoogleBridge = url.protocol === 'https:' &&
            (url.hostname === 'script.google.com' || url.hostname.endsWith('.googleusercontent.com'));
        const isLocalBridge = ['localhost', '127.0.0.1'].includes(window.location.hostname) &&
            ['localhost', '127.0.0.1'].includes(url.hostname);
        return isGoogleBridge || isLocalBridge;
    } catch (error) {
        return false;
    }
}

// ----------------------------------------------------
// DOM Elements
// ----------------------------------------------------
const sections = {
    teacherCreate: document.getElementById('teacherCreateSection'),
    teacherReport: document.getElementById('teacherReportSection'),
    studentTake: document.getElementById('studentTakeSection')
};
const modeIndicator = document.getElementById('modeIndicator');

// Teacher Create Elements
const topicInput = document.getElementById('topicInput');
const gradeLevelInput = document.getElementById('gradeLevelInput');
const questionCountInput = document.getElementById('questionCountInput');
const countPills = document.querySelectorAll('.count-pill');
const generateTestBtn = document.getElementById('generateTestBtn');
const createLoading = document.getElementById('createLoading');
const draftReadyCard = document.getElementById('draftReadyCard');
const draftTestId = document.getElementById('draftTestId');
const draftContextDisplay = document.getElementById('draftContextDisplay');
const draftMessageDisplay = document.getElementById('draftMessageDisplay');
const editDraftBtn = document.getElementById('editDraftBtn');
const draftEditorCard = document.getElementById('draftEditorCard');
const draftTableBody = document.getElementById('draftTableBody');
const autoSaveIndicator = document.getElementById('autoSaveIndicator');
const backToDraftBtn = document.getElementById('backToDraftBtn');
const publishTestBtn = document.getElementById('publishTestBtn');
const publishLoading = document.getElementById('publishLoading');
const testCreatedCard = document.getElementById('testCreatedCard');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const displayTestId = document.getElementById('displayTestId');
const viewReportsBtn = document.getElementById('viewReportsBtn');
const previewTestBtn = document.getElementById('previewTestBtn');

// Teacher Test History Elements
const teacherHistoryCard = document.getElementById('teacherHistoryCard');
const refreshHistoryBtn = document.getElementById('refreshHistoryBtn');
const historyLoading = document.getElementById('historyLoading');
const historyEmpty = document.getElementById('historyEmpty');
const historyEmptyText = document.getElementById('historyEmptyText');
const historyList = document.getElementById('historyList');
const historyTabRecent = document.getElementById('historyTabRecent');
const historyTabAll = document.getElementById('historyTabAll');
const historyTotalCount = document.getElementById('historyTotalCount');
const historySearchBox = document.getElementById('historySearchBox');
const historySearchInput = document.getElementById('historySearchInput');
const historySearchClear = document.getElementById('historySearchClear');
const historyPagination = document.getElementById('historyPagination');
const historyPrevPageBtn = document.getElementById('historyPrevPageBtn');
const historyNextPageBtn = document.getElementById('historyNextPageBtn');
const historyPageIndicator = document.getElementById('historyPageIndicator');

// Teacher Report Elements
const backToCreateBtn = document.getElementById('backToCreateBtn');
const reportInputGroup = document.getElementById('reportInputGroup');
const reportTestIdInput = document.getElementById('reportTestIdInput');
const fetchReportBtn = document.getElementById('fetchReportBtn');
const fetchResponsesBtn = document.getElementById('fetchResponsesBtn');
const reportLoading = document.getElementById('reportLoading');
const reportLoadingText = document.getElementById('reportLoadingText');
const reportHeaderBar = document.getElementById('reportHeaderBar');
const reportMetaDisplay = document.getElementById('reportMetaDisplay');
const copyReportBtn = document.getElementById('copyReportBtn');
const printReportBtn = document.getElementById('printReportBtn');
const regenerateReportBtn = document.getElementById('regenerateReportBtn');
const reportContent = document.getElementById('reportContent');
const responsesPanel = document.getElementById('responsesPanel');
const responsesTitle = document.getElementById('responsesTitle');
const responsesSummary = document.getElementById('responsesSummary');
const responsesEmpty = document.getElementById('responsesEmpty');
const responsesTableWrap = document.getElementById('responsesTableWrap');
const responsesTableHead = document.getElementById('responsesTableHead');
const responsesTableBody = document.getElementById('responsesTableBody');
const downloadCsvBtn = document.getElementById('downloadCsvBtn');
const tableScrollHint = document.getElementById('tableScrollHint');

// Student Take Elements
const studentLoginCard = document.getElementById('studentLoginCard');
const activeTestCard = document.getElementById('activeTestCard');
const studentResultCard = document.getElementById('studentResultCard');
const studentTopicDisplay = document.getElementById('studentTopicDisplay');
const studentNameInput = document.getElementById('studentNameInput');
const studentReviewName = document.getElementById('studentReviewName');
const studentReviewTableBody = document.getElementById('studentReviewTableBody');
const startTestBtn = document.getElementById('startTestBtn');
const studentAlreadySubmittedAlert = document.getElementById('studentAlreadySubmittedAlert');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const prevQuestionBtn = document.getElementById('prevQuestionBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const questionCounter = document.getElementById('questionCounter');
const testProgress = document.getElementById('testProgress');

// App State
let currentTestId = null;
let currentQuizData = null;
let currentStudentName = "";
let currentQuestionIndex = 0;
let studentAnswers = []; // Array of selected option indexes
let currentResponsesData = null;
let autoSaveTimer = null;

const SUBMITTED_STORAGE_KEY_PREFIX = 'concept_check_sub_';
const DRAFT_STORAGE_KEY_PREFIX = 'concept_check_draft_';

// ----------------------------------------------------
// KaTeX Math Rendering Helper
// ----------------------------------------------------
function renderMath(element) {
    if (!element) return;
    if (window.renderMathInElement) {
        try {
            window.renderMathInElement(element, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        } catch (error) {
            console.warn('KaTeX rendering notice:', error);
        }
    } else {
        // Retry shortly if KaTeX is still loading asynchronously
        window.setTimeout(() => {
            if (window.renderMathInElement) {
                try {
                    window.renderMathInElement(element, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '$', right: '$', display: false }
                        ],
                        throwOnError: false
                    });
                } catch (e) {}
            }
        }, 300);
    }
}

// ----------------------------------------------------
// API Communication (Fetch & Iframe Bridge)
// ----------------------------------------------------
function getRequestTimeoutMs(action) {
    return REQUEST_TIMEOUTS_MS[action] || DEFAULT_REQUEST_TIMEOUT_MS;
}

async function callApiWithFetch(apiUrl, payload, timeoutMs) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`ระบบส่วนกลางตอบกลับด้วยสถานะ HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('หมดเวลารอการตอบกลับ กรุณาลองอีกครั้ง');
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

function handleBridgeMessage(event) {
    if (!bridgeFrame || !event.data || event.data.channel !== bridgeChannel) return;

    if (event.data.type === 'concept-check-bridge-ready') {
        if (!isTrustedBridgeOrigin(event.origin)) return;
        bridgeMessageSource = event.source;
        bridgeMessageOrigin = event.origin;
        if (resolveBridgeReady) resolveBridgeReady();
        return;
    }

    if (event.data.type !== 'concept-check-response' ||
        event.source !== bridgeMessageSource || event.origin !== bridgeMessageOrigin) return;
    const pendingRequest = pendingBridgeRequests.get(event.data.requestId);
    if (!pendingRequest) return;

    clearTimeout(pendingRequest.timeoutId);
    pendingBridgeRequests.delete(event.data.requestId);
    pendingRequest.resolve(event.data.result);
}

function ensureBridgeReady() {
    if (bridgeReadyPromise) return bridgeReadyPromise;

    bridgeReadyPromise = new Promise((resolve, reject) => {
        const readyTimeoutId = setTimeout(() => {
            bridgeReadyPromise = null;
            resolveBridgeReady = null;
            bridgeMessageSource = null;
            bridgeMessageOrigin = null;
            bridgeChannel = null;
            if (bridgeFrame) bridgeFrame.remove();
            bridgeFrame = null;
            reject(new Error('ไม่สามารถเชื่อมต่อระบบส่วนกลางได้ กรุณาลองอีกครั้ง'));
        }, BRIDGE_READY_TIMEOUT_MS);

        resolveBridgeReady = () => {
            clearTimeout(readyTimeoutId);
            resolveBridgeReady = null;
            resolve();
        };
    });

    if (!bridgeListenerAttached) {
        window.addEventListener('message', handleBridgeMessage);
        bridgeListenerAttached = true;
    }
    bridgeChannel = createRequestId();
    const bridgeUrl = new URL(getBridgeUrl());
    bridgeUrl.searchParams.set('channel', bridgeChannel);
    bridgeFrame = document.createElement('iframe');
    bridgeFrame.src = bridgeUrl.toString();
    bridgeFrame.title = 'ช่องทางเชื่อมต่อระบบ Concept Check';
    bridgeFrame.setAttribute('aria-hidden', 'true');
    bridgeFrame.tabIndex = -1;
    bridgeFrame.style.display = 'none';
    document.body.appendChild(bridgeFrame);

    return bridgeReadyPromise;
}

async function callApiWithBridge(payload, timeoutMs) {
    await ensureBridgeReady();

    const requestId = createRequestId();

    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            pendingBridgeRequests.delete(requestId);
            reject(new Error('หมดเวลารอการตอบกลับ กรุณาลองอีกครั้ง'));
        }, timeoutMs);

        pendingBridgeRequests.set(requestId, { resolve, reject, timeoutId });
        bridgeMessageSource.postMessage({
            type: 'concept-check-request',
            channel: bridgeChannel,
            requestId,
            payload
        }, bridgeMessageOrigin);
    });
}

async function callApi(payload) {
    const localApiUrl = getLocalOverride('apiUrl');
    const timeoutMs = getRequestTimeoutMs(payload.action);
    const result = localApiUrl
        ? await callApiWithFetch(localApiUrl, payload, timeoutMs)
        : await callApiWithBridge(payload, timeoutMs);

    if (!result || result.status !== 'success') {
        throw new Error(result && result.message ? result.message : 'ระบบส่วนกลางเกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    }

    return result.data;
}

function renderSafeReportHtml(html) {
    const allowedTags = new Set(['H1', 'H2', 'H3', 'H4', 'P', 'UL', 'OL', 'LI', 'STRONG', 'B', 'EM', 'I', 'BR', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'SPAN']);
    const blockedTags = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'SVG', 'TEMPLATE']);
    const parsedDocument = new DOMParser().parseFromString(String(html || ''), 'text/html');

    function copySafeNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return document.createTextNode(node.textContent);
        }

        const fragment = document.createDocumentFragment();
        if (node.nodeType !== Node.ELEMENT_NODE) return fragment;
        if (blockedTags.has(node.tagName)) return fragment;

        const target = allowedTags.has(node.tagName)
            ? document.createElement(node.tagName.toLowerCase())
            : fragment;

        Array.from(node.childNodes).forEach(child => target.appendChild(copySafeNode(child)));
        return target;
    }

    const safeContent = document.createDocumentFragment();
    Array.from(parsedDocument.body.childNodes).forEach(node => safeContent.appendChild(copySafeNode(node)));
    reportContent.replaceChildren(safeContent);
    renderMath(reportContent);
}

// ----------------------------------------------------
// Initialization
// ----------------------------------------------------
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const testIdFromUrl = urlParams.get('testId');

    if (testIdFromUrl) {
        // Student Mode
        currentTestId = testIdFromUrl;
        switchView('studentTake');
        modeIndicator.textContent = 'โหมดนักเรียน · Student Mode';
        modeIndicator.style.background = 'var(--primary)';
        modeIndicator.style.color = 'white';
        checkStudentPreviousSubmission(testIdFromUrl);
        fetchQuizDataForStudent(testIdFromUrl);
    } else {
        // Teacher Mode: Require Admin Session
        const hasAdminSession = window.AdminAPI && await window.AdminAPI.verify();
        if (!hasAdminSession) {
            const returnTo = encodeURIComponent('applications/concept-check/index.html');
            window.location.replace(`../../admin.html?returnTo=${returnTo}`);
            return;
        }

        switchView('teacherCreate');
        modeIndicator.textContent = 'โหมดครู · Teacher Mode';
        loadTeacherHistory();
    }
}

function switchView(viewName) {
    Object.values(sections).forEach(sec => sec.classList.add('hidden'));
    sections[viewName].classList.remove('hidden');
}

// ----------------------------------------------------
// TEACHER CREATE FLOW
// ----------------------------------------------------
countPills.forEach(pill => {
    pill.addEventListener('click', () => {
        countPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        questionCountInput.value = pill.dataset.count;
    });
});

generateTestBtn.addEventListener('click', async () => {
    const topic = topicInput.value.trim();
    const gradeLevel = gradeLevelInput.value.trim();
    const questionCount = Number(questionCountInput.value) || 5;

    if (!topic) {
        alert('กรุณาระบุหัวข้อที่ต้องการสร้างแบบทดสอบ');
        topicInput.focus();
        return;
    }
    if (!gradeLevel) {
        alert('กรุณาระบุระดับชั้นของผู้เรียน');
        gradeLevelInput.focus();
        return;
    }

    generateTestBtn.disabled = true;
    createLoading.classList.remove('hidden');
    draftReadyCard.classList.add('hidden');
    draftEditorCard.classList.add('hidden');
    draftTableBody.replaceChildren();
    testCreatedCard.classList.add('hidden');

    try {
        const data = await callApi({
            action: 'generateTest',
            topic: topic,
            gradeLevel: gradeLevel,
            questionCount: questionCount,
            adminToken: window.AdminAPI.token()
        });

        currentTestId = data.testId;
        currentQuizData = data.quizData;
        draftTestId.textContent = currentTestId;
        draftContextDisplay.textContent = `เรื่อง: ${currentQuizData.topic} · สำหรับชั้น: ${currentQuizData.gradeLevel} (${currentQuizData.questions.length} ข้อ)`;
        draftMessageDisplay.textContent = `ตรวจสอบคำถามทั้ง ${currentQuizData.questions.length} ข้อ แก้ไขข้อความหรือตัวเลือก และยืนยันเฉลยก่อนเผยแพร่ให้นักเรียน`;

        createLoading.classList.add('hidden');
        draftReadyCard.classList.remove('hidden');
        draftReadyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Save initial draft to storage
        saveDraftToSessionStorage();
        loadTeacherHistory();

    } catch (error) {
        alert('ไม่สามารถสร้างแบบทดสอบได้: ' + error.message);
        createLoading.classList.add('hidden');
    } finally {
        generateTestBtn.disabled = false;
    }
});

function createDraftField(tagName, className, value, label) {
    const field = document.createElement(tagName);
    field.className = className;
    field.value = value;
    field.setAttribute('aria-label', label);
    if (tagName === 'textarea') field.rows = 4;
    return field;
}

function renderDraftEditor() {
    draftTableBody.replaceChildren();

    currentQuizData.questions.forEach((question, questionIndex) => {
        const row = document.createElement('tr');
        appendCell(row, questionIndex + 1, 'draft-number-cell');

        const questionCell = document.createElement('td');
        const questionField = createDraftField(
            'textarea',
            'draft-question-input',
            question.questionText,
            `ข้อความคำถามข้อที่ ${questionIndex + 1}`
        );
        questionField.dataset.questionIndex = questionIndex;
        questionCell.appendChild(questionField);
        row.appendChild(questionCell);

        const choicesCell = document.createElement('td');
        choicesCell.className = 'draft-choices-cell';
        question.options.forEach((option, optionIndex) => {
            const choiceRow = document.createElement('label');
            choiceRow.className = 'draft-choice-row';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `correct-answer-${questionIndex}`;
            radio.value = optionIndex;
            radio.checked = optionIndex === question.correctAnswerIndex;
            radio.setAttribute('aria-label', `กำหนดตัวเลือกที่ ${optionIndex + 1} เป็นคำตอบที่ถูกต้องของข้อที่ ${questionIndex + 1}`);

            const choiceLabel = document.createElement('span');
            choiceLabel.className = 'draft-choice-label';
            choiceLabel.textContent = String.fromCharCode(65 + optionIndex);

            const optionField = createDraftField(
                'input',
                'draft-option-input',
                option,
                `ข้อที่ ${questionIndex + 1} ตัวเลือกที่ ${optionIndex + 1}`
            );
            optionField.type = 'text';
            optionField.dataset.questionIndex = questionIndex;
            optionField.dataset.optionIndex = optionIndex;

            choiceRow.append(radio, choiceLabel, optionField);
            choicesCell.appendChild(choiceRow);
        });
        const correctHint = document.createElement('p');
        correctHint.className = 'correct-answer-hint';
        correctHint.innerHTML = '<i class="fa-solid fa-circle-check"></i> เลือกคำตอบที่ถูกต้อง';
        choicesCell.appendChild(correctHint);
        row.appendChild(choicesCell);
        draftTableBody.appendChild(row);
    });

    // Auto-save listeners on input changes
    draftTableBody.addEventListener('input', triggerAutoSaveDebounced);
    draftTableBody.addEventListener('change', triggerAutoSaveDebounced);
}

function triggerAutoSaveDebounced() {
    if (autoSaveIndicator) {
        autoSaveIndicator.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> กำลังบันทึก...';
        autoSaveIndicator.classList.add('saving');
    }
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        saveDraftToSessionStorage();
        if (autoSaveIndicator) {
            autoSaveIndicator.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> บันทึกแล้ว';
            autoSaveIndicator.classList.remove('saving');
        }
    }, 600);
}

function saveDraftToSessionStorage() {
    if (!currentTestId || !currentQuizData) return;
    try {
        const edited = collectEditedQuizSilently();
        if (edited) {
            sessionStorage.setItem(`${DRAFT_STORAGE_KEY_PREFIX}${currentTestId}`, JSON.stringify(edited));
        }
    } catch (e) {}
}

function collectEditedQuizSilently() {
    if (!draftTableBody.children.length) return currentQuizData;
    try {
        return collectEditedQuiz();
    } catch (e) {
        return null;
    }
}

function collectEditedQuiz() {
    const questions = currentQuizData.questions.map((question, questionIndex) => {
        const questionField = draftTableBody.querySelector(`.draft-question-input[data-question-index="${questionIndex}"]`);
        const selectedCorrect = draftTableBody.querySelector(`input[name="correct-answer-${questionIndex}"]:checked`);
        const options = question.options.map((option, optionIndex) => {
            const optionField = draftTableBody.querySelector(`.draft-option-input[data-question-index="${questionIndex}"][data-option-index="${optionIndex}"]`);
            return optionField ? optionField.value.trim() : option;
        });

        const qText = questionField ? questionField.value.trim() : question.questionText;
        if (!qText) throw new Error(`กรุณากรอกข้อความคำถามข้อที่ ${questionIndex + 1}`);
        if (options.some(opt => !opt)) throw new Error(`กรุณากรอกตัวเลือกให้ครบทุกตัวเลือกในข้อที่ ${questionIndex + 1}`);
        if (!selectedCorrect) throw new Error(`กรุณาเลือกคำตอบที่ถูกต้องของข้อที่ ${questionIndex + 1}`);

        return {
            questionText: qText,
            options,
            correctAnswerIndex: Number(selectedCorrect.value),
            misconceptions: question.misconceptions || {}
        };
    });

    return {
        topic: currentQuizData.topic,
        gradeLevel: currentQuizData.gradeLevel || '',
        questions
    };
}

editDraftBtn.addEventListener('click', () => {
    if (!draftTableBody.children.length) renderDraftEditor();
    draftReadyCard.classList.add('hidden');
    draftEditorCard.classList.remove('hidden');
    draftEditorCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

backToDraftBtn.addEventListener('click', () => {
    draftEditorCard.classList.add('hidden');
    draftReadyCard.classList.remove('hidden');
});

publishTestBtn.addEventListener('click', async () => {
    let editedQuiz;
    try {
        editedQuiz = collectEditedQuiz();
    } catch (error) {
        alert(error.message);
        return;
    }

    publishTestBtn.disabled = true;
    backToDraftBtn.disabled = true;
    publishLoading.classList.remove('hidden');

    try {
        const data = await callApi({
            action: 'publishTest',
            testId: currentTestId,
            quizData: editedQuiz,
            adminToken: window.AdminAPI.token()
        });
        currentQuizData = data.quizData;

        // Clear stored session draft
        sessionStorage.removeItem(`${DRAFT_STORAGE_KEY_PREFIX}${currentTestId}`);

        const studentUrl = new URL(window.location.href);
        if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) studentUrl.search = '';
        studentUrl.searchParams.set('testId', currentTestId);
        shareLink.value = studentUrl.toString();
        displayTestId.textContent = currentTestId;

        draftEditorCard.classList.add('hidden');
        testCreatedCard.classList.remove('hidden');
        testCreatedCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        loadTeacherHistory();
    } catch (error) {
        alert(`ไม่สามารถเผยแพร่แบบทดสอบได้: ${error.message}`);
    } finally {
        publishTestBtn.disabled = false;
        backToDraftBtn.disabled = false;
        publishLoading.classList.add('hidden');
    }
});

copyLinkBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(shareLink.value);
    } catch (error) {
        shareLink.select();
        document.execCommand('copy');
    }
    copyLinkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => { copyLinkBtn.innerHTML = '<i class="fa-solid fa-copy"></i>'; }, 2000);
});

previewTestBtn.addEventListener('click', () => {
    window.open(shareLink.value, '_blank');
});

viewReportsBtn.addEventListener('click', () => {
    switchView('teacherReport');
    reportTestIdInput.value = currentTestId;
});

backToCreateBtn.addEventListener('click', () => {
    switchView('teacherCreate');
    loadTeacherHistory();
});

// ----------------------------------------------------
// TEACHER TEST HISTORY DASHBOARD
// ----------------------------------------------------
let allTeacherTests = [];
let historyMode = 'recent'; // 'recent' or 'all'
let historyCurrentPage = 1;
const HISTORY_PAGE_SIZE = 10;
const HISTORY_RECENT_LIMIT = 3;

function createTestCardElement(test) {
    const item = document.createElement('div');
    item.className = 'history-item';

    const info = document.createElement('div');
    info.className = 'history-item-info';

    const title = document.createElement('h3');
    title.textContent = test.topic || 'ไม่มีชื่อหัวข้อ';

    const meta = document.createElement('div');
    meta.className = 'history-item-meta';

    const testIdBadge = document.createElement('span');
    testIdBadge.className = 'history-badge badge-id';
    testIdBadge.textContent = test.testId;

    const gradeBadge = document.createElement('span');
    gradeBadge.className = 'history-badge';
    gradeBadge.textContent = test.gradeLevel ? `ชั้น ${test.gradeLevel}` : 'ไม่ระบุชั้น';

    const countBadge = document.createElement('span');
    countBadge.className = 'history-badge';
    countBadge.textContent = `${test.questionCount || 5} ข้อ`;

    const respBadge = document.createElement('span');
    respBadge.className = `history-badge ${test.responseCount > 0 ? 'badge-responses' : ''}`;
    respBadge.innerHTML = `<i class="fa-solid fa-user-check"></i> ตอบแล้ว ${test.responseCount} คน`;

    meta.append(testIdBadge, gradeBadge, countBadge, respBadge);
    info.append(title, meta);

    const actions = document.createElement('div');
    actions.className = 'history-item-actions';

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'action-pill-btn';
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> ลิงก์';
    copyBtn.title = 'คัดลอกลิงก์สำหรับนักเรียน';
    copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const studentUrl = new URL(window.location.href);
        if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) studentUrl.search = '';
        studentUrl.searchParams.set('testId', test.testId);
        try {
            await navigator.clipboard.writeText(studentUrl.toString());
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> คัดลอกแล้ว';
            setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> ลิงก์'; }, 2000);
        } catch (err) {
            prompt('คัดลอกลิงก์ด้านล่างนี้:', studentUrl.toString());
        }
    });

    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.className = 'action-pill-btn primary';
    viewBtn.innerHTML = '<i class="fa-solid fa-chart-pie"></i> ดูผล / รายงาน';
    viewBtn.addEventListener('click', () => {
        switchView('teacherReport');
        reportTestIdInput.value = test.testId;
        fetchReportBtn.click();
    });

    actions.append(copyBtn, viewBtn);
    item.append(info, actions);
    return item;
}

function renderTeacherHistory() {
    if (!historyList) return;
    historyList.replaceChildren();

    // Update tab visual states & controls visibility
    if (historyTabRecent && historyTabAll) {
        if (historyMode === 'recent') {
            historyTabRecent.classList.add('active');
            historyTabRecent.setAttribute('aria-selected', 'true');
            historyTabAll.classList.remove('active');
            historyTabAll.setAttribute('aria-selected', 'false');
            if (historySearchBox) historySearchBox.classList.add('hidden');
            if (historyPagination) historyPagination.classList.add('hidden');
        } else {
            historyTabAll.classList.add('active');
            historyTabAll.setAttribute('aria-selected', 'true');
            historyTabRecent.classList.remove('active');
            historyTabRecent.setAttribute('aria-selected', 'false');
            if (historySearchBox) historySearchBox.classList.remove('hidden');
        }
    }

    if (!Array.isArray(allTeacherTests) || allTeacherTests.length === 0) {
        if (historyEmpty) historyEmpty.classList.remove('hidden');
        if (historyEmptyText) historyEmptyText.textContent = 'ยังไม่มีประวัติแบบทดสอบที่สร้างไว้';
        if (historyPagination) historyPagination.classList.add('hidden');
        if (historyTotalCount) historyTotalCount.textContent = '0';
        return;
    }

    if (historyMode === 'recent') {
        const displayTests = allTeacherTests.slice(0, HISTORY_RECENT_LIMIT);
        if (displayTests.length === 0) {
            if (historyEmpty) historyEmpty.classList.remove('hidden');
            if (historyEmptyText) historyEmptyText.textContent = 'ยังไม่มีประวัติแบบทดสอบที่สร้างไว้';
            return;
        }
        if (historyEmpty) historyEmpty.classList.add('hidden');
        displayTests.forEach(test => {
            historyList.appendChild(createTestCardElement(test));
        });
        if (historyPagination) historyPagination.classList.add('hidden');
    } else {
        // 'all' mode: live search + pagination (10 per page)
        const searchQuery = (historySearchInput ? historySearchInput.value : '').trim().toLowerCase();
        let filtered = allTeacherTests;

        if (searchQuery) {
            filtered = allTeacherTests.filter(t => {
                const topic = (t.topic || '').toLowerCase();
                const grade = (t.gradeLevel || '').toLowerCase();
                const tid = (t.testId || '').toLowerCase();
                return topic.includes(searchQuery) || grade.includes(searchQuery) || tid.includes(searchQuery);
            });
        }

        if (historyTotalCount) {
            historyTotalCount.textContent = filtered.length;
        }

        if (filtered.length === 0) {
            if (historyEmpty) historyEmpty.classList.remove('hidden');
            if (historyEmptyText) {
                historyEmptyText.textContent = searchQuery
                    ? `ไม่พบแบบทดสอบที่ตรงกับคำค้นหา "${historySearchInput.value.trim()}"`
                    : 'ยังไม่มีประวัติแบบทดสอบที่สร้างไว้';
            }
            if (historyPagination) historyPagination.classList.add('hidden');
            return;
        }

        if (historyEmpty) historyEmpty.classList.add('hidden');

        const totalPages = Math.ceil(filtered.length / HISTORY_PAGE_SIZE);
        if (historyCurrentPage > totalPages) {
            historyCurrentPage = totalPages;
        }
        if (historyCurrentPage < 1) {
            historyCurrentPage = 1;
        }

        const startIndex = (historyCurrentPage - 1) * HISTORY_PAGE_SIZE;
        const pageItems = filtered.slice(startIndex, startIndex + HISTORY_PAGE_SIZE);

        pageItems.forEach(test => {
            historyList.appendChild(createTestCardElement(test));
        });

        // Pagination controls: show when totalPages > 1 (i.e. more than 10 items)
        if (historyPagination) {
            if (totalPages > 1) {
                historyPagination.classList.remove('hidden');
                if (historyPrevPageBtn) historyPrevPageBtn.disabled = (historyCurrentPage <= 1);
                if (historyNextPageBtn) historyNextPageBtn.disabled = (historyCurrentPage >= totalPages);
                if (historyPageIndicator) {
                    historyPageIndicator.textContent = `หน้า ${historyCurrentPage} จาก ${totalPages} (ทั้งหมด ${filtered.length} ฉบับ)`;
                }
            } else {
                historyPagination.classList.add('hidden');
            }
        }
    }
}

async function loadTeacherHistory() {
    if (!teacherHistoryCard) return;
    if (historyLoading) historyLoading.classList.remove('hidden');
    if (historyEmpty) historyEmpty.classList.add('hidden');
    if (historyPagination) historyPagination.classList.add('hidden');
    if (historyList) historyList.replaceChildren();

    try {
        const data = await callApi({
            action: 'getTeacherTests',
            limit: 50,
            adminToken: window.AdminAPI.token()
        });

        allTeacherTests = Array.isArray(data.tests) ? data.tests : [];
        if (historyLoading) historyLoading.classList.add('hidden');

        if (historyTotalCount) {
            historyTotalCount.textContent = allTeacherTests.length;
        }

        renderTeacherHistory();
    } catch (error) {
        if (historyLoading) historyLoading.classList.add('hidden');
        console.warn('Cannot load history:', error);
    }
}

// History Controls Event Listeners
if (historyTabRecent) {
    historyTabRecent.addEventListener('click', () => {
        if (historyMode === 'recent') return;
        historyMode = 'recent';
        renderTeacherHistory();
    });
}

if (historyTabAll) {
    historyTabAll.addEventListener('click', () => {
        if (historyMode === 'all') return;
        historyMode = 'all';
        historyCurrentPage = 1;
        renderTeacherHistory();
        if (historySearchInput) {
            setTimeout(() => historySearchInput.focus(), 50);
        }
    });
}

if (historySearchInput) {
    historySearchInput.addEventListener('input', () => {
        const query = historySearchInput.value.trim();
        if (historySearchClear) {
            historySearchClear.classList.toggle('hidden', query.length === 0);
        }
        historyCurrentPage = 1;
        renderTeacherHistory();
    });
}

if (historySearchClear) {
    historySearchClear.addEventListener('click', () => {
        if (historySearchInput) {
            historySearchInput.value = '';
            historySearchInput.focus();
        }
        historySearchClear.classList.add('hidden');
        historyCurrentPage = 1;
        renderTeacherHistory();
    });
}

if (historyPrevPageBtn) {
    historyPrevPageBtn.addEventListener('click', () => {
        if (historyCurrentPage > 1) {
            historyCurrentPage--;
            renderTeacherHistory();
            if (teacherHistoryCard) {
                teacherHistoryCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
}

if (historyNextPageBtn) {
    historyNextPageBtn.addEventListener('click', () => {
        historyCurrentPage++;
        renderTeacherHistory();
        if (teacherHistoryCard) {
            teacherHistoryCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

if (refreshHistoryBtn) {
    refreshHistoryBtn.addEventListener('click', () => {
        loadTeacherHistory();
    });
}

// ----------------------------------------------------
// TEACHER REPORT FLOW
// ----------------------------------------------------
async function fetchReportInternal(forceRegenerate = false) {
    const tId = reportTestIdInput.value.trim();
    if (!tId) {
        reportTestIdInput.focus();
        return;
    }

    fetchReportBtn.disabled = true;
    if (regenerateReportBtn) regenerateReportBtn.disabled = true;
    reportLoading.classList.remove('hidden');
    reportLoadingText.textContent = forceRegenerate
        ? 'AI กำลังประมวลผลวิเคราะห์ผลการตอบล่าสุดใหม่ทั้งหมด...'
        : 'กำลังค้นหาและจัดทำบทวิเคราะห์แผนการสอน...';
    reportContent.classList.add('hidden');
    if (reportHeaderBar) reportHeaderBar.classList.add('hidden');

    const longReportWaitTimer = window.setTimeout(() => {
        reportLoadingText.textContent = 'AI กำลังวิเคราะห์เชิงลึก ขั้นตอนนี้อาจใช้เวลา 1–2 นาที กรุณารอสักครู่...';
    }, 15000);

    try {
        const data = await callApi({
            action: 'generateReport',
            testId: tId,
            forceRegenerate: forceRegenerate,
            adminToken: window.AdminAPI.token()
        });

        renderSafeReportHtml(data.reportHtml);
        reportContent.classList.remove('hidden');

        if (reportHeaderBar && reportMetaDisplay) {
            reportHeaderBar.classList.remove('hidden');
            const timeStr = data.generatedAt ? formatSubmittedAt(data.generatedAt) : '';
            reportMetaDisplay.innerHTML = data.cached
                ? `<i class="fa-solid fa-bolt text-amber"></i> บทวิเคราะห์ที่บันทึกไว้ (${timeStr})`
                : `<i class="fa-solid fa-wand-magic-sparkles"></i> สร้างบทวิเคราะห์ใหม่สำเร็จ (${timeStr})`;
        }

    } catch (error) {
        alert('ไม่สามารถสร้างบทวิเคราะห์ได้: ' + error.message);
    } finally {
        window.clearTimeout(longReportWaitTimer);
        fetchReportBtn.disabled = false;
        if (regenerateReportBtn) regenerateReportBtn.disabled = false;
        reportLoading.classList.add('hidden');
    }
}

fetchReportBtn.addEventListener('click', () => fetchReportInternal(false));

if (regenerateReportBtn) {
    regenerateReportBtn.addEventListener('click', () => {
        if (confirm('คุณต้องการให้ AI วิเคราะห์คำตอบของนักเรียนใหม่ทั้งหมดใช่หรือไม่?')) {
            fetchReportInternal(true);
        }
    });
}

if (printReportBtn) {
    printReportBtn.addEventListener('click', () => {
        window.print();
    });
}

if (copyReportBtn) {
    copyReportBtn.addEventListener('click', async () => {
        if (!reportContent) return;
        try {
            const textToCopy = reportContent.innerText;
            await navigator.clipboard.writeText(textToCopy);
            copyReportBtn.innerHTML = '<i class="fa-solid fa-check"></i> คัดลอกแล้ว';
            setTimeout(() => {
                copyReportBtn.innerHTML = '<i class="fa-solid fa-copy"></i> คัดลอกบทวิเคราะห์';
            }, 2000);
        } catch (e) {
            alert('ไม่สามารถคัดลอกข้อความได้โดยอัตโนมัติ');
        }
    });
}

function formatSubmittedAt(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(date);
}

function appendCell(row, text, className) {
    const cell = document.createElement('td');
    if (className) cell.className = className;
    cell.textContent = text;
    row.appendChild(cell);
    return cell;
}

function renderResponsesTable(data) {
    currentResponsesData = data;
    const responses = Array.isArray(data.responses) ? data.responses : [];
    const questions = Array.isArray(data.questions) ? data.questions : [];

    responsesTitle.textContent = data.topic ? `คำตอบของนักเรียน — ${data.topic}` : 'คำตอบของนักเรียน';
    responsesSummary.textContent = `ส่งคำตอบแล้ว ${responses.length} คน · คำถาม ${questions.length} ข้อ`;
    responsesPanel.classList.remove('hidden');
    responsesEmpty.classList.toggle('hidden', responses.length > 0);
    responsesTableWrap.classList.toggle('hidden', responses.length === 0);
    tableScrollHint.classList.toggle('hidden', responses.length === 0 || questions.length < 3);
    downloadCsvBtn.disabled = responses.length === 0;
    responsesTableHead.replaceChildren();
    responsesTableBody.replaceChildren();

    if (!responses.length) return;

    const headerRow = document.createElement('tr');
    ['ชื่อนักเรียน', 'วัน–เวลาที่ส่ง', 'คะแนน'].forEach(label => {
        const heading = document.createElement('th');
        heading.scope = 'col';
        heading.textContent = label;
        headerRow.appendChild(heading);
    });
    questions.forEach(question => {
        const heading = document.createElement('th');
        heading.scope = 'col';
        heading.title = question.questionText;
        heading.setAttribute('aria-label', `คำถามข้อที่ ${question.number}: ${question.questionText}`);
        const questionNumber = document.createElement('strong');
        questionNumber.textContent = `ข้อ ${question.number}`;
        const qTextSpan = document.createElement('span');
        qTextSpan.className = 'question-heading-text';
        qTextSpan.textContent = question.questionText;
        heading.append(questionNumber, qTextSpan);
        headerRow.appendChild(heading);
    });
    responsesTableHead.appendChild(headerRow);

    responses.forEach(response => {
        const row = document.createElement('tr');
        appendCell(row, response.studentName || 'ไม่ระบุชื่อ');
        appendCell(row, formatSubmittedAt(response.submittedAt), 'submitted-cell');
        appendCell(row, `${response.score}/${data.totalQuestions}`, 'score-cell');

        questions.forEach((question, index) => {
            const answer = response.answers && response.answers[index]
                ? response.answers[index]
                : { answerText: 'ไม่ได้ตอบ', isCorrect: false };
            const cell = document.createElement('td');
            cell.className = 'answer-cell';
            const status = document.createElement('span');
            status.className = `answer-status ${answer.isCorrect ? 'correct' : 'incorrect'}`;
            status.textContent = answer.isCorrect ? '✓ ถูกต้อง' : '✕ ไม่ถูกต้อง';
            const answerText = document.createElement('div');
            answerText.textContent = answer.answerText;
            cell.append(status, answerText);
            row.appendChild(cell);
        });
        responsesTableBody.appendChild(row);
    });

    renderMath(responsesPanel);
}

fetchResponsesBtn.addEventListener('click', async () => {
    const testId = reportTestIdInput.value.trim();
    if (!testId) {
        reportTestIdInput.focus();
        return;
    }

    fetchResponsesBtn.disabled = true;
    const originalLabel = fetchResponsesBtn.innerHTML;
    fetchResponsesBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> กำลังโหลดคำตอบ';
    const longResponsesWaitTimer = window.setTimeout(() => {
        fetchResponsesBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> กำลังเชื่อมต่อฐานข้อมูล กรุณารอสักครู่';
    }, 12000);

    try {
        const data = await callApi({
            action: 'getResponses',
            testId: testId,
            adminToken: window.AdminAPI.token()
        });
        renderResponsesTable(data);
    } catch (error) {
        alert('ไม่สามารถโหลดคำตอบของนักเรียนได้: ' + error.message);
    } finally {
        window.clearTimeout(longResponsesWaitTimer);
        fetchResponsesBtn.disabled = false;
        fetchResponsesBtn.innerHTML = originalLabel;
    }
});

reportTestIdInput.addEventListener('input', () => {
    if (!currentResponsesData || reportTestIdInput.value.trim() === currentResponsesData.testId) return;
    currentResponsesData = null;
    responsesPanel.classList.add('hidden');
    downloadCsvBtn.disabled = true;
});

function csvCell(value) {
    const text = String(value == null ? '' : value).replace(/\r?\n/g, ' ');
    return `"${text.replace(/"/g, '""')}"`;
}

downloadCsvBtn.addEventListener('click', () => {
    if (!currentResponsesData || !currentResponsesData.responses.length) return;

    const data = currentResponsesData;
    const headers = ['ชื่อนักเรียน', 'วัน–เวลาที่ส่ง', 'คะแนน']
        .concat(data.questions.map(question => `ข้อ ${question.number}: ${question.questionText}`));
    const rows = data.responses.map(response => [
        response.studentName,
        response.submittedAt,
        `${response.score}/${data.totalQuestions}`,
        ...data.questions.map((question, index) => {
            const answer = response.answers && response.answers[index];
            if (!answer) return 'ไม่ได้ตอบ';
            return `${answer.answerText} (${answer.isCorrect ? 'ถูกต้อง' : 'ไม่ถูกต้อง'})`;
        })
    ]);
    const csv = [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTestId = String(data.testId || 'concept-check').replace(/[^A-Za-z0-9_-]/g, '_');
    link.href = url;
    link.download = `${safeTestId}-student-responses.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
});

// ----------------------------------------------------
// STUDENT FLOW
// ----------------------------------------------------
function checkStudentPreviousSubmission(testId) {
    const submittedAt = localStorage.getItem(`${SUBMITTED_STORAGE_KEY_PREFIX}${testId}`);
    if (submittedAt && studentAlreadySubmittedAlert) {
        studentAlreadySubmittedAlert.classList.remove('hidden');
    }
}

async function fetchQuizDataForStudent(testId) {
    startTestBtn.disabled = true;
    try {
        const data = await callApi({ action: 'getTest', testId: testId });
        currentQuizData = data.quizData;

        if (!currentQuizData || !Array.isArray(currentQuizData.questions) || currentQuizData.questions.length === 0) {
            throw new Error('ข้อมูลแบบทดสอบไม่ครบถ้วน');
        }

        studentTopicDisplay.textContent = currentQuizData.gradeLevel
            ? `${currentQuizData.topic} · ระดับชั้น ${currentQuizData.gradeLevel} (${currentQuizData.questions.length} ข้อ)`
            : `${currentQuizData.topic} (${currentQuizData.questions.length} ข้อ)`;
        renderMath(studentTopicDisplay);
        startTestBtn.disabled = false;

    } catch (error) {
        studentTopicDisplay.textContent = `ไม่สามารถโหลดแบบทดสอบได้: ${error.message}`;
        startTestBtn.disabled = true;
    }
}

startTestBtn.addEventListener('click', () => {
    const name = studentNameInput.value.trim();
    if (!name) {
        alert('กรุณากรอกชื่อก่อนเริ่มทำแบบทดสอบ');
        return;
    }
    currentStudentName = name;

    studentLoginCard.classList.add('hidden');
    activeTestCard.classList.remove('hidden');

    currentQuestionIndex = 0;
    studentAnswers = new Array(currentQuizData.questions.length).fill(undefined);
    renderQuestion();
});

function renderQuestion() {
    const qData = currentQuizData.questions[currentQuestionIndex];
    questionText.textContent = qData.questionText;
    renderMath(questionText);

    optionsContainer.replaceChildren();

    const previousSelected = studentAnswers[currentQuestionIndex];

    qData.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-btn';
        if (previousSelected === index) {
            btn.classList.add('selected');
        }

        const optLabel = document.createElement('span');
        optLabel.className = 'opt-letter-label';
        optLabel.textContent = `${String.fromCharCode(65 + index)}. `;

        const optSpan = document.createElement('span');
        optSpan.className = 'opt-text-span';
        optSpan.textContent = optText;

        btn.append(optLabel, optSpan);

        btn.addEventListener('click', () => {
            optionsContainer.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            studentAnswers[currentQuestionIndex] = index;
            nextQuestionBtn.disabled = false;
        });

        optionsContainer.appendChild(btn);
    });

    renderMath(optionsContainer);

    questionCounter.textContent = `ข้อที่ ${currentQuestionIndex + 1} จาก ${currentQuizData.questions.length}`;
    testProgress.style.width = `${((currentQuestionIndex + 1) / currentQuizData.questions.length) * 100}%`;

    // Navigation buttons state
    prevQuestionBtn.disabled = currentQuestionIndex === 0;
    nextQuestionBtn.disabled = studentAnswers[currentQuestionIndex] === undefined;
    
    if (currentQuestionIndex === currentQuizData.questions.length - 1) {
        nextQuestionBtn.innerHTML = 'ส่งคำตอบ <i class="fa-solid fa-paper-plane"></i>';
    } else {
        nextQuestionBtn.innerHTML = 'ข้อต่อไป <i class="fa-solid fa-arrow-right"></i>';
    }
}

prevQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
});

nextQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex < currentQuizData.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        submitTest();
    }
});

function renderStudentAnswerReview() {
    studentReviewName.textContent = currentStudentName;
    studentReviewTableBody.replaceChildren();

    currentQuizData.questions.forEach((question, index) => {
        const row = document.createElement('tr');
        const selectedAnswerIndex = studentAnswers[index];
        const selectedAnswer = Number.isInteger(selectedAnswerIndex) && question.options[selectedAnswerIndex]
            ? `${String.fromCharCode(65 + selectedAnswerIndex)}. ${question.options[selectedAnswerIndex]}`
            : 'ไม่ได้ตอบ';

        appendCell(row, index + 1, 'student-review-number');
        appendCell(row, question.questionText, 'student-review-question');
        appendCell(row, selectedAnswer, 'student-review-answer');
        studentReviewTableBody.appendChild(row);
    });

    renderMath(studentReviewTableBody);
}

async function submitTest() {
    nextQuestionBtn.disabled = true;
    prevQuestionBtn.disabled = true;
    nextQuestionBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> กำลังส่งคำตอบ...';

    try {
        await callApi({
            action: 'submitAnswers',
            testId: currentTestId,
            studentName: currentStudentName,
            answers: studentAnswers
        });

        // Record submission in LocalStorage
        try {
            localStorage.setItem(`${SUBMITTED_STORAGE_KEY_PREFIX}${currentTestId}`, new Date().toISOString());
        } catch (e) {}

        renderStudentAnswerReview();
        activeTestCard.classList.add('hidden');
        studentResultCard.classList.remove('hidden');
    } catch (error) {
        alert(`ไม่สามารถส่งคำตอบได้: ${error.message}`);
        nextQuestionBtn.disabled = false;
        prevQuestionBtn.disabled = currentQuestionIndex === 0;
        nextQuestionBtn.innerHTML = 'ส่งคำตอบ <i class="fa-solid fa-paper-plane"></i>';
    }
}

// Start Application
init();
