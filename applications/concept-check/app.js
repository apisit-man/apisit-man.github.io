/**
 * Concept Check AI - Frontend Logic
 */

const DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycbwJxCh_v6PUpMpeeyJ3GrpOAgAYNv5yEXjg6ejSW9igeLsC2Pz513V7KUx_EsNc7p4rMw/exec";
const API_TIMEOUT_MS = 60000;
let bridgeFrame = null;
let bridgeReadyPromise = null;
let resolveBridgeReady = null;
let bridgeMessageSource = null;
let bridgeMessageOrigin = null;
let bridgeChannel = null;
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

// DOM Elements
const sections = {
    teacherCreate: document.getElementById('teacherCreateSection'),
    teacherReport: document.getElementById('teacherReportSection'),
    studentTake: document.getElementById('studentTakeSection')
};
const modeIndicator = document.getElementById('modeIndicator');

// Teacher Create Elements
const topicInput = document.getElementById('topicInput');
const generateTestBtn = document.getElementById('generateTestBtn');
const createLoading = document.getElementById('createLoading');
const testCreatedCard = document.getElementById('testCreatedCard');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const displayTestId = document.getElementById('displayTestId');
const viewReportsBtn = document.getElementById('viewReportsBtn');
const previewTestBtn = document.getElementById('previewTestBtn');

// Teacher Report Elements
const backToCreateBtn = document.getElementById('backToCreateBtn');
const reportInputGroup = document.getElementById('reportInputGroup');
const reportTestIdInput = document.getElementById('reportTestIdInput');
const fetchReportBtn = document.getElementById('fetchReportBtn');
const fetchResponsesBtn = document.getElementById('fetchResponsesBtn');
const reportLoading = document.getElementById('reportLoading');
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
const startTestBtn = document.getElementById('startTestBtn');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
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

async function callApiWithFetch(apiUrl, payload) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`Backend returned HTTP ${response.status}.`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('The request timed out. Please try again.');
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
            reject(new Error('The backend bridge did not load. Please try again.'));
        }, API_TIMEOUT_MS);

        resolveBridgeReady = () => {
            clearTimeout(readyTimeoutId);
            resolveBridgeReady = null;
            resolve();
        };
    });

    window.addEventListener('message', handleBridgeMessage);
    bridgeChannel = createRequestId();
    const bridgeUrl = new URL(getBridgeUrl());
    bridgeUrl.searchParams.set('channel', bridgeChannel);
    bridgeFrame = document.createElement('iframe');
    bridgeFrame.src = bridgeUrl.toString();
    bridgeFrame.title = 'Concept Check backend bridge';
    bridgeFrame.setAttribute('aria-hidden', 'true');
    bridgeFrame.tabIndex = -1;
    bridgeFrame.style.display = 'none';
    document.body.appendChild(bridgeFrame);

    return bridgeReadyPromise;
}

async function callApiWithBridge(payload) {
    await ensureBridgeReady();

    const requestId = createRequestId();

    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            pendingBridgeRequests.delete(requestId);
            reject(new Error('The request timed out. Please try again.'));
        }, API_TIMEOUT_MS);

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
    // The fetch override is intentionally local-only and is used by automated tests.
    const localApiUrl = getLocalOverride('apiUrl');
    const result = localApiUrl
        ? await callApiWithFetch(localApiUrl, payload)
        : await callApiWithBridge(payload);

    if (!result || result.status !== 'success') {
        throw new Error(result && result.message ? result.message : 'The backend returned an unknown error.');
    }

    return result.data;
}

function renderSafeReportHtml(html) {
    const allowedTags = new Set(['H1', 'H2', 'H3', 'H4', 'P', 'UL', 'OL', 'LI', 'STRONG', 'B', 'EM', 'I', 'BR']);
    const blockedTags = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'TEMPLATE']);
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
}

// Initialization
async function init() {
    // Check URL parameters for a test ID
    const urlParams = new URLSearchParams(window.location.search);
    const testIdFromUrl = urlParams.get('testId');

    if (testIdFromUrl) {
        // Student Mode
        currentTestId = testIdFromUrl;
        switchView('studentTake');
        modeIndicator.textContent = 'Student Mode';
        modeIndicator.style.background = 'var(--primary)';
        modeIndicator.style.color = 'white';
        fetchQuizDataForStudent(testIdFromUrl);
    } else {
        const hasAdminSession = window.AdminAPI && await window.AdminAPI.verify();
        if (!hasAdminSession) {
            const returnTo = encodeURIComponent('applications/concept-check/index.html');
            window.location.replace(`../../admin.html?returnTo=${returnTo}`);
            return;
        }

        switchView('teacherCreate');
        modeIndicator.textContent = 'Teacher Mode';
    }
}

function switchView(viewName) {
    Object.values(sections).forEach(sec => sec.classList.add('hidden'));
    sections[viewName].classList.remove('hidden');
}

// ----------------------------------------------------
// TEACHER CREATE FLOW
// ----------------------------------------------------
generateTestBtn.addEventListener('click', async () => {
    const topic = topicInput.value.trim();
    if (!topic) {
        alert("Please enter a topic.");
        return;
    }

    generateTestBtn.disabled = true;
    createLoading.classList.remove('hidden');
    testCreatedCard.classList.add('hidden');

    try {
        const data = await callApi({
            action: 'generateTest',
            topic: topic,
            adminToken: window.AdminAPI.token()
        });

        currentTestId = data.testId;
        const studentUrl = new URL(window.location.href);
        if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) {
            studentUrl.search = '';
        }
        studentUrl.searchParams.set('testId', currentTestId);
        const link = studentUrl.toString();

        shareLink.value = link;
        displayTestId.textContent = currentTestId;

        createLoading.classList.add('hidden');
        testCreatedCard.classList.remove('hidden');

    } catch (error) {
        alert("Error generating test: " + error.message);
        createLoading.classList.add('hidden');
    } finally {
        generateTestBtn.disabled = false;
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
});

// ----------------------------------------------------
// TEACHER REPORT FLOW
// ----------------------------------------------------
fetchReportBtn.addEventListener('click', async () => {
    const tId = reportTestIdInput.value.trim();
    if (!tId) return;

    fetchReportBtn.disabled = true;
    reportLoading.classList.remove('hidden');
    reportContent.classList.add('hidden');

    try {
        const data = await callApi({
            action: 'generateReport',
            testId: tId,
            adminToken: window.AdminAPI.token()
        });

        renderSafeReportHtml(data.reportHtml);
        reportContent.classList.remove('hidden');

    } catch (error) {
        alert("Error generating report: " + error.message);
    } finally {
        fetchReportBtn.disabled = false;
        reportLoading.classList.add('hidden');
    }
});

function formatSubmittedAt(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat(undefined, {
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

    responsesTitle.textContent = data.topic ? `Student Responses — ${data.topic}` : 'Student Responses';
    responsesSummary.textContent = `${responses.length} response${responses.length === 1 ? '' : 's'} · ${questions.length} question${questions.length === 1 ? '' : 's'}`;
    responsesPanel.classList.remove('hidden');
    responsesEmpty.classList.toggle('hidden', responses.length > 0);
    responsesTableWrap.classList.toggle('hidden', responses.length === 0);
    tableScrollHint.classList.toggle('hidden', responses.length === 0 || questions.length < 3);
    downloadCsvBtn.disabled = responses.length === 0;
    responsesTableHead.replaceChildren();
    responsesTableBody.replaceChildren();

    if (!responses.length) return;

    const headerRow = document.createElement('tr');
    ['Student Name', 'Submitted At', 'Score'].forEach(label => {
        const heading = document.createElement('th');
        heading.scope = 'col';
        heading.textContent = label;
        headerRow.appendChild(heading);
    });
    questions.forEach(question => {
        const heading = document.createElement('th');
        heading.scope = 'col';
        heading.title = question.questionText;
        heading.setAttribute('aria-label', `Question ${question.number}: ${question.questionText}`);
        const questionNumber = document.createElement('strong');
        questionNumber.textContent = `Q${question.number}`;
        const questionText = document.createElement('span');
        questionText.className = 'question-heading-text';
        questionText.textContent = question.questionText;
        heading.append(questionNumber, questionText);
        headerRow.appendChild(heading);
    });
    responsesTableHead.appendChild(headerRow);

    responses.forEach(response => {
        const row = document.createElement('tr');
        appendCell(row, response.studentName || 'Unnamed student');
        appendCell(row, formatSubmittedAt(response.submittedAt), 'submitted-cell');
        appendCell(row, `${response.score}/${data.totalQuestions}`, 'score-cell');

        questions.forEach((question, index) => {
            const answer = response.answers && response.answers[index]
                ? response.answers[index]
                : { answerText: 'No answer', isCorrect: false };
            const cell = document.createElement('td');
            cell.className = 'answer-cell';
            const status = document.createElement('span');
            status.className = `answer-status ${answer.isCorrect ? 'correct' : 'incorrect'}`;
            status.textContent = answer.isCorrect ? '✓ Correct' : '✕ Incorrect';
            const answerText = document.createElement('div');
            answerText.textContent = answer.answerText;
            cell.append(status, answerText);
            row.appendChild(cell);
        });
        responsesTableBody.appendChild(row);
    });
}

fetchResponsesBtn.addEventListener('click', async () => {
    const testId = reportTestIdInput.value.trim();
    if (!testId) {
        reportTestIdInput.focus();
        return;
    }

    fetchResponsesBtn.disabled = true;
    const originalLabel = fetchResponsesBtn.innerHTML;
    fetchResponsesBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Loading Responses';

    try {
        const data = await callApi({
            action: 'getResponses',
            testId: testId,
            adminToken: window.AdminAPI.token()
        });
        renderResponsesTable(data);
    } catch (error) {
        alert('Error loading student responses: ' + error.message);
    } finally {
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
    const headers = ['Student Name', 'Submitted At', 'Score']
        .concat(data.questions.map(question => `Q${question.number}: ${question.questionText}`));
    const rows = data.responses.map(response => [
        response.studentName,
        response.submittedAt,
        `${response.score}/${data.totalQuestions}`,
        ...data.questions.map((question, index) => {
            const answer = response.answers && response.answers[index];
            if (!answer) return 'No answer';
            return `${answer.answerText} (${answer.isCorrect ? 'Correct' : 'Incorrect'})`;
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
async function fetchQuizDataForStudent(testId) {
    startTestBtn.disabled = true;
    try {
        const data = await callApi({ action: 'getTest', testId: testId });
        currentQuizData = data.quizData;

        if (!currentQuizData || !Array.isArray(currentQuizData.questions) || currentQuizData.questions.length === 0) {
            throw new Error('The test data is incomplete.');
        }

        studentTopicDisplay.textContent = currentQuizData.topic;
        startTestBtn.disabled = false;

    } catch (error) {
        studentTopicDisplay.textContent = `Error loading test: ${error.message}`;
        startTestBtn.disabled = true;
    }
}

startTestBtn.addEventListener('click', () => {
    const name = studentNameInput.value.trim();
    if (!name) {
        alert("Please enter your name.");
        return;
    }
    currentStudentName = name;

    studentLoginCard.classList.add('hidden');
    activeTestCard.classList.remove('hidden');

    currentQuestionIndex = 0;
    studentAnswers = [];
    renderQuestion();
});

function renderQuestion() {
    const qData = currentQuizData.questions[currentQuestionIndex];
    questionText.textContent = qData.questionText;

    optionsContainer.innerHTML = '';

    qData.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = optText;

        btn.addEventListener('click', () => {
            // Deselect others
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Save answer temporarily
            studentAnswers[currentQuestionIndex] = index;
            nextQuestionBtn.disabled = false;
        });

        optionsContainer.appendChild(btn);
    });

    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuizData.questions.length}`;
    testProgress.style.width = `${((currentQuestionIndex + 1) / currentQuizData.questions.length) * 100}%`;
    nextQuestionBtn.disabled = true;
    
    if (currentQuestionIndex === currentQuizData.questions.length - 1) {
        nextQuestionBtn.textContent = 'Submit Test';
    } else {
        nextQuestionBtn.textContent = 'Next';
    }
}

nextQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex < currentQuizData.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // Submit Test
        submitTest();
    }
});

async function submitTest() {
    nextQuestionBtn.disabled = true;
    nextQuestionBtn.textContent = 'Submitting...';

    try {
        await callApi({
            action: 'submitAnswers',
            testId: currentTestId,
            studentName: currentStudentName,
            answers: studentAnswers
        });

        activeTestCard.classList.add('hidden');
        studentResultCard.classList.remove('hidden');
    } catch (error) {
        alert(`Unable to submit your answers: ${error.message}`);
        nextQuestionBtn.disabled = false;
        nextQuestionBtn.textContent = 'Submit Test';
    }
}

// Start
init();
