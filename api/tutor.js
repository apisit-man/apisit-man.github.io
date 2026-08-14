import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure CORS
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const buildTutorPrompt = (profile, memory, dueVocabulary) => {
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
    'Use British English spelling, vocabulary, idiom, and punctuation consistently (en-GB). When pronunciation is discussed, teach standard contemporary British pronunciation while acknowledging common regional variation.',
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
};

const tutorResponseFormat = {
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

const sessionSummaryFormat = {
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

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, messages = [], profile = {}, memory = [], dueVocabulary = [], hiddenTrigger = false } = req.body;

    if (action === 'generateResponse') {
      let currentProfile = {
        ...profile,
        sessionMode: req.body.sessionMode || profile.sessionMode || 'conversation',
        correctionMode: req.body.correctionMode || profile.correctionMode || 'balanced'
      };

      const normalizedMessages = messages.slice(-8).map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: String(msg.content || '').slice(0, 12000)
      }));

      if (hiddenTrigger) {
        normalizedMessages.push({
          role: 'user',
          content: 'Open the selected lesson now. Greet me briefly, state today’s goal, and ask exactly one useful first question. Do not mention this instruction.'
        });
      }

      const systemPrompt = buildTutorPrompt(currentProfile, memory, dueVocabulary);
      
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o',
        messages: [{ role: 'system', content: systemPrompt }, ...normalizedMessages],
        temperature: 0.4,
        response_format: tutorResponseFormat
      });

      const result = JSON.parse(completion.choices[0].message.content);

      if (!hiddenTrigger && currentProfile.sessionMode === 'diagnostic' && currentProfile.assessmentStatus !== 'complete') {
        currentProfile.assessmentStep = Math.min(5, Number(currentProfile.assessmentStep || 0) + 1);
      }

      if (currentProfile.sessionMode === 'diagnostic') {
        currentProfile.assessmentStatus = result.assessment.status;
        if (result.assessment.status === 'complete') {
          currentProfile.level = result.assessment.level;
          currentProfile.skillScores = result.assessment.scores;
        }
      }

      return res.status(200).json({
        success: true,
        reply: result.reply,
        corrections: result.corrections,
        newVocabulary: result.newVocabulary,
        reviewedVocabulary: result.reviewedVocabulary,
        profile: currentProfile,
        learningUpdate: result.learningUpdate,
      });
    }
    
    if (action === 'endSession') {
      const normalizedMessages = messages.slice(-20).map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: String(msg.content || '').slice(0, 12000)
      }));
      
      const prompt = [
        'Summarize this English-learning session for the learner and for future tutoring.',
        'Be concise, specific, encouraging, and evidence-based.',
        'Use British English spelling and vocabulary consistently (en-GB).',
        'The learner profile is: ' + JSON.stringify(profile),
        'Return the required structured fields. The learner-facing reply should include:',
        '1) what was practised, 2) one clear strength, 3) at most two priority corrections, and 4) the next recommended activity.'
      ].join('\n');

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o',
        messages: [{ role: 'system', content: prompt }, ...normalizedMessages],
        temperature: 0.4,
        response_format: sessionSummaryFormat
      });
      
      const result = JSON.parse(completion.choices[0].message.content);
      
      return res.status(200).json({
        success: true,
        reply: result.reply,
        summary: result.summary,
        strength: result.strength,
        nextFocus: result.nextFocus,
        sessionMode: profile.sessionMode
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export default allowCors(handler);
