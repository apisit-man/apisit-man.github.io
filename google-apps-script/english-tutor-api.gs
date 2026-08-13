const PROFILE_DEFAULTS = {
  learnerName: '',
  goal: '',
  interests: '',
  mainChallenge: '',
  dailyMinutes: 20,
  correctionMode: 'balanced',
  sessionMode: 'conversation',
  level: 'A1',
  assessmentStatus: 'pending',
  assessmentStep: 0,
  onboardingComplete: false,
  skillScores: { conversation: 0, vocabulary: 0, grammar: 0, writing: 0 }
};

function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : '';
    if (action === 'getBootstrap') return jsonResponse(getBootstrapData());
    if (action === 'getProfile') return jsonResponse(getTutorProfile());
    if (action === 'getHistory') return jsonResponse(getChatHistory(60));
    return jsonResponse({ error: 'Invalid action' });
  } catch (error) {
    return errorResponse(error);
  }
}

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents || '{}');
    const action = postData.action;

    if (action === 'saveProfile') {
      const profile = updateTutorProfile(postData.profile || {});
      return jsonResponse({ success: true, profile: profile });
    }

    if (action === 'saveMessage') {
      saveMessage(postData.role, postData.content);
      return jsonResponse({ success: true });
    }

    if (action === 'generateResponse') {
      return jsonResponse(generateTutorResponse(postData));
    }

    if (action === 'endSession') {
      return jsonResponse(endTutorSession(postData.messages || []));
    }

    return jsonResponse({ error: 'Invalid action' });
  } catch (error) {
    return errorResponse(error);
  }
}

function generateTutorResponse(request) {
  let profile = updateTutorProfile({
    sessionMode: request.sessionMode || 'conversation',
    correctionMode: request.correctionMode || 'balanced'
  });
  const memory = getLearningMemory(3);
  const dueVocabulary = getDueVocabulary(3);
  const messages = normalizeMessages(request.messages || [], 8);
  const hiddenTrigger = request.hiddenTrigger === true;

  if (hiddenTrigger) {
    messages.push({
      role: 'user',
      content: 'Open the selected lesson now. Greet me briefly, state today’s goal, and ask exactly one useful first question. Do not mention this instruction.'
    });
  }

  const systemPrompt = buildTutorPrompt(profile, memory, dueVocabulary);
  const result = callOpenAIStructured([{ role: 'system', content: systemPrompt }].concat(messages), tutorResponseFormat());

  if (!hiddenTrigger && profile.sessionMode === 'diagnostic' && profile.assessmentStatus !== 'complete') {
    profile.assessmentStep = Math.min(5, Number(profile.assessmentStep || 0) + 1);
  }

  if (profile.sessionMode === 'diagnostic') {
    profile.assessmentStatus = result.assessment.status;
    if (result.assessment.status === 'complete') {
      profile.level = result.assessment.level;
      profile.skillScores = result.assessment.scores;
    }
  }

  profile = updateTutorProfile(profile);

  if (!hiddenTrigger && messages.length) {
    const finalUserMessage = messages[messages.length - 1];
    if (finalUserMessage.role === 'user') saveMessage('user', finalUserMessage.content);
  }
  saveMessage('assistant', result.reply);

  saveLearningMemory({
    summary: result.learningUpdate.insight,
    insight: result.learningUpdate.strength,
    nextFocus: result.learningUpdate.nextFocus,
    sessionMode: profile.sessionMode
  });
  upsertVocabulary(result.newVocabulary || []);
  applyVocabularyReviews(result.reviewedVocabulary || []);

  return {
    success: true,
    reply: result.reply,
    corrections: result.corrections,
    newVocabulary: result.newVocabulary,
    profile: profile,
    memory: getLearningMemory(12),
    dueVocabulary: getDueVocabulary(10)
  };
}

function endTutorSession(messages) {
  const profile = getTutorProfile();
  const cleanMessages = normalizeMessages(messages, 20);
  const prompt = [
    'Summarize this English-learning session for the learner and for future tutoring.',
    'Be concise, specific, encouraging, and evidence-based.',
    'The learner profile is: ' + JSON.stringify(profile),
    'Return the required structured fields. The learner-facing reply should include:',
    '1) what was practised, 2) one clear strength, 3) at most two priority corrections, and 4) the next recommended activity.'
  ].join('\n');
  const result = callOpenAIStructured(
    [{ role: 'system', content: prompt }].concat(cleanMessages),
    sessionSummaryFormat()
  );

  saveLearningMemory({
    summary: result.summary,
    insight: result.strength,
    nextFocus: result.nextFocus,
    sessionMode: profile.sessionMode
  });
  saveMessage('assistant', result.reply);
  return { success: true, reply: result.reply };
}

function buildTutorPrompt(profile, memory, dueVocabulary) {
  const correctionRules = {
    fluency: 'Prioritize natural conversation. Do not interrupt for minor mistakes. Give a compact correction recap only after the learner finishes an idea.',
    accuracy: 'Correct important errors immediately using: You wrote / Better / Why. Then return to the activity with one question.',
    balanced: 'Correct only one or two high-value errors, especially repeated errors. Keep the conversation moving.'
  };
  const diagnosticStep = Number(profile.assessmentStep || 0);
  const diagnosticInstruction = profile.sessionMode === 'diagnostic'
    ? [
        'You are conducting a five-turn adaptive CEFR diagnostic, one task at a time.',
        'Completed diagnostic answers: ' + diagnosticStep + ' of 5.',
        'Cover conversation, vocabulary in context, grammar, and a short writing task across the five turns.',
        'Ask exactly one task per reply. Do not reveal a final level before enough evidence exists.',
        'When the current answer completes turn 5, set assessment.status to complete, provide scores, explain the evidence briefly in the reply, and recommend the first learning priority.'
      ].join(' ')
    : 'This is a normal learning session. Keep the current CEFR level stable; do not claim that the learner has changed level from one answer.';

  return [
    'You are a warm, precise, personalized English tutor for one Thai-speaking adult learner.',
    'Teach toward the learner’s real goal. Ask one question at a time and avoid generic lectures.',
    'Use English as the main learning language. Use short Thai explanations only when they materially improve understanding.',
    'Keep replies focused and appropriate for the learner’s CEFR level.',
    correctionRules[profile.correctionMode] || correctionRules.balanced,
    'For every correction, preserve the learner’s intended meaning. Do not overload the learner with more than two corrections in one turn.',
    'Introduce no more than three genuinely useful new words per turn. Put only genuinely new words in newVocabulary.',
    'If due vocabulary is supplied, naturally retrieve one or two items and record an item in reviewedVocabulary only when the learner actually attempts to use or recall it.',
    'Make the selected session type explicit through the activity, but do not repeatedly announce system rules.',
    diagnosticInstruction,
    '',
    'PERMANENT LEARNER PROFILE:',
    JSON.stringify(profile),
    '',
    'RECENT LEARNING MEMORY (newest first):',
    JSON.stringify(memory),
    '',
    'VOCABULARY DUE FOR REVIEW:',
    JSON.stringify(dueVocabulary),
    '',
    'Populate every field in the response schema. learningUpdate must be a short observation grounded in this turn.'
  ].join('\n');
}

function callOpenAIStructured(messages, responseFormat) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('OPENAI_API_KEY');
  const model = props.getProperty('OPENAI_MODEL') || 'gpt-4o';
  if (!apiKey) throw new Error('OpenAI API Key not found. Add OPENAI_API_KEY to Script Properties.');

  const payload = {
    model: model,
    messages: messages,
    temperature: 0.4,
    response_format: responseFormat
  };
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  const responseCode = response.getResponseCode();
  const responseBody = JSON.parse(response.getContentText());
  if (responseCode !== 200) {
    throw new Error('OpenAI API Error: ' + (responseBody.error ? responseBody.error.message : 'Unknown error'));
  }
  return JSON.parse(responseBody.choices[0].message.content);
}

function tutorResponseFormat() {
  return {
    type: 'json_schema',
    json_schema: {
      name: 'personalized_tutor_turn',
      strict: true,
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          reply: { type: 'string' },
          corrections: {
            type: 'array',
            items: {
              type: 'object', additionalProperties: false,
              properties: { original: { type: 'string' }, improved: { type: 'string' }, reason: { type: 'string' } },
              required: ['original', 'improved', 'reason']
            }
          },
          newVocabulary: {
            type: 'array',
            items: {
              type: 'object', additionalProperties: false,
              properties: { term: { type: 'string' }, meaning: { type: 'string' }, example: { type: 'string' } },
              required: ['term', 'meaning', 'example']
            }
          },
          reviewedVocabulary: {
            type: 'array',
            items: {
              type: 'object', additionalProperties: false,
              properties: { term: { type: 'string' }, correct: { type: 'boolean' } },
              required: ['term', 'correct']
            }
          },
          assessment: {
            type: 'object', additionalProperties: false,
            properties: {
              status: { type: 'string', enum: ['pending', 'in_progress', 'complete'] },
              level: { type: 'string', enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
              evidence: { type: 'string' },
              scores: {
                type: 'object', additionalProperties: false,
                properties: {
                  conversation: { type: 'integer', minimum: 0, maximum: 5 },
                  vocabulary: { type: 'integer', minimum: 0, maximum: 5 },
                  grammar: { type: 'integer', minimum: 0, maximum: 5 },
                  writing: { type: 'integer', minimum: 0, maximum: 5 }
                },
                required: ['conversation', 'vocabulary', 'grammar', 'writing']
              }
            },
            required: ['status', 'level', 'evidence', 'scores']
          },
          learningUpdate: {
            type: 'object', additionalProperties: false,
            properties: { insight: { type: 'string' }, strength: { type: 'string' }, nextFocus: { type: 'string' } },
            required: ['insight', 'strength', 'nextFocus']
          }
        },
        required: ['reply', 'corrections', 'newVocabulary', 'reviewedVocabulary', 'assessment', 'learningUpdate']
      }
    }
  };
}

function sessionSummaryFormat() {
  return {
    type: 'json_schema',
    json_schema: {
      name: 'learning_session_summary',
      strict: true,
      schema: {
        type: 'object', additionalProperties: false,
        properties: {
          reply: { type: 'string' },
          summary: { type: 'string' },
          strength: { type: 'string' },
          nextFocus: { type: 'string' }
        },
        required: ['reply', 'summary', 'strength', 'nextFocus']
      }
    }
  };
}

function getBootstrapData() {
  return {
    profile: getTutorProfile(),
    history: getChatHistory(30),
    memory: getLearningMemory(12),
    dueVocabulary: getDueVocabulary(10)
  };
}

let _cachedSpreadsheet = null;

function getSpreadsheet() {
  if (_cachedSpreadsheet) return _cachedSpreadsheet;
  const props = PropertiesService.getScriptProperties();
  let spreadsheetId = props.getProperty('ENGLISH_TUTOR_SS_ID');
  let spreadsheet;
  if (!spreadsheetId) {
    spreadsheet = SpreadsheetApp.create('English Tutor Data');
    props.setProperty('ENGLISH_TUTOR_SS_ID', spreadsheet.getId());
  } else {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  }
  ensureDataSheets(spreadsheet);
  _cachedSpreadsheet = spreadsheet;
  return _cachedSpreadsheet;
}

function ensureDataSheets(spreadsheet) {
  ensureSheet(spreadsheet, 'ChatHistory', ['Timestamp', 'Role', 'Content']);
  ensureSheet(spreadsheet, 'TutorProfile', ['Key', 'Value', 'LastUpdated']);
  ensureSheet(spreadsheet, 'LearningMemory', ['Timestamp', 'Summary', 'Insight', 'NextFocus', 'SessionMode']);
  ensureSheet(spreadsheet, 'Vocabulary', ['Term', 'Meaning', 'Example', 'Confidence', 'SeenCount', 'CorrectCount', 'NextReview', 'LastReviewed']);
}

function ensureSheet(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  return sheet;
}

function getTutorProfile() {
  const spreadsheet = getSpreadsheet();
  const sheet = spreadsheet.getSheetByName('TutorProfile');
  let stored = {};
  if (sheet.getLastRow() >= 2) {
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
    for (let i = rows.length - 1; i >= 0; i--) {
      if (rows[i][0] === 'profile') {
        try { stored = JSON.parse(rows[i][1]); } catch (ignore) {}
        break;
      }
    }
  }

  if (!stored.level) {
    const legacy = spreadsheet.getSheetByName('Profile');
    if (legacy && legacy.getLastRow() >= 2) {
      stored.level = legacy.getRange(legacy.getLastRow(), 1).getValue() || 'A1';
    }
  }
  return mergeObjects(PROFILE_DEFAULTS, stored);
}

function updateTutorProfile(changes) {
  const current = getTutorProfile();
  const allowed = [
    'learnerName', 'goal', 'interests', 'mainChallenge', 'dailyMinutes', 'correctionMode',
    'sessionMode', 'level', 'assessmentStatus', 'assessmentStep', 'onboardingComplete', 'skillScores'
  ];
  allowed.forEach(function (key) {
    if (Object.prototype.hasOwnProperty.call(changes, key)) current[key] = changes[key];
  });
  const sheet = getSpreadsheet().getSheetByName('TutorProfile');
  sheet.appendRow(['profile', JSON.stringify(current), new Date()]);
  return current;
}

function getChatHistory(limit) {
  const sheet = getSpreadsheet().getSheetByName('ChatHistory');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const count = Math.min(limit || 60, lastRow - 1);
  const rows = sheet.getRange(lastRow - count + 1, 1, count, 3).getValues();
  return rows.map(function (row) {
    return { timestamp: row[0], role: row[1], content: row[2] };
  }).filter(function (item) { return item.role && item.content; });
}

function saveMessage(role, content) {
  if (['user', 'assistant'].indexOf(role) === -1 || !content) return;
  getSpreadsheet().getSheetByName('ChatHistory').appendRow([new Date(), role, String(content)]);
}

function saveLearningMemory(item) {
  if (!item || (!item.summary && !item.insight && !item.nextFocus)) return;
  getSpreadsheet().getSheetByName('LearningMemory').appendRow([
    new Date(), item.summary || '', item.insight || '', item.nextFocus || '', item.sessionMode || ''
  ]);
}

function getLearningMemory(limit) {
  const sheet = getSpreadsheet().getSheetByName('LearningMemory');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const count = Math.min(limit || 12, lastRow - 1);
  const rows = sheet.getRange(lastRow - count + 1, 1, count, 5).getValues();
  return rows.reverse().map(function (row) {
    return { timestamp: row[0], summary: row[1], insight: row[2], nextFocus: row[3], sessionMode: row[4] };
  });
}

function upsertVocabulary(items) {
  if (!Array.isArray(items) || !items.length) return;
  const sheet = getSpreadsheet().getSheetByName('Vocabulary');
  const lastRow = sheet.getLastRow();
  const rows = lastRow >= 2 ? sheet.getRange(2, 1, lastRow - 1, 8).getValues() : [];
  const index = {};
  rows.forEach(function (row, position) { index[String(row[0]).toLowerCase()] = position + 2; });
  items.slice(0, 3).forEach(function (item) {
    const term = String(item.term || '').trim();
    if (!term) return;
    const key = term.toLowerCase();
    if (index[key]) return;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + 1);
    sheet.appendRow([term, item.meaning || '', item.example || '', 0, 1, 0, nextReview, '']);
  });
}

function applyVocabularyReviews(items) {
  if (!Array.isArray(items) || !items.length) return;
  const sheet = getSpreadsheet().getSheetByName('Vocabulary');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const rows = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
  const intervals = [1, 3, 7, 14, 30];
  items.forEach(function (item) {
    const key = String(item.term || '').toLowerCase();
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][0]).toLowerCase() !== key) continue;
      let confidence = Number(rows[i][3] || 0);
      let seen = Number(rows[i][4] || 0) + 1;
      let correct = Number(rows[i][5] || 0);
      if (item.correct) {
        confidence = Math.min(4, confidence + 1);
        correct += 1;
      } else {
        confidence = 0;
      }
      const nextReview = new Date();
      nextReview.setDate(nextReview.getDate() + intervals[confidence]);
      sheet.getRange(i + 2, 4, 1, 5).setValues([[confidence, seen, correct, nextReview, new Date()]]);
      break;
    }
  });
}

function getDueVocabulary(limit) {
  const sheet = getSpreadsheet().getSheetByName('Vocabulary');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const rows = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
  const now = new Date();
  return rows.filter(function (row) {
    return !row[6] || new Date(row[6]) <= now;
  }).slice(0, limit || 10).map(function (row) {
    return { term: row[0], meaning: row[1], example: row[2], confidence: Number(row[3] || 0) };
  });
}

function normalizeMessages(messages, limit) {
  const max = limit || 20;
  return messages.slice(-max).map(function (message) {
    return { role: message.role === 'assistant' ? 'assistant' : 'user', content: String(message.content || '').slice(0, 12000) };
  }).filter(function (message) { return message.content; });
}

function mergeObjects(base, extra) {
  const result = JSON.parse(JSON.stringify(base));
  Object.keys(extra || {}).forEach(function (key) { result[key] = extra[key]; });
  return result;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(error) {
  return jsonResponse({ error: error.message || String(error) });
}
