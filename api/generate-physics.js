export default async function handler(req, res) {
  // CORS Configuration
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { topic } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY environment variable in Vercel.' });
  }

  const prompt = `
You are a creative physics teacher. Create 1 scenario for a space-themed physics game.
The topic is: ${topic || 'General Junior High School Physics'}.

Return the response STRICTLY in valid JSON format with NO markdown wrapping.
The JSON must have this exact structure:
{
    "title": "Scene Name (Thai, e.g., ฉากวิกฤติ: ...)",
    "desc": "Detailed description of the problem/crisis in space (Thai)",
    "concept": "The core physics concept being tested (Thai)",
    "teacherNote": "A short note for the teacher (Thai)",
    "choices": [
        { "text": "Choice 1 (Thai)", "correct": true, "feedback": "Feedback if chosen (Thai)" },
        { "text": "Choice 2 (Thai)", "correct": false, "hint": "Hint (Thai)", "feedback": "Feedback if chosen (Thai)" },
        { "text": "Choice 3 (Thai)", "correct": false, "hint": "Hint (Thai)", "feedback": "Feedback if chosen (Thai)" }
    ]
}
Make sure exactly 1 choice is correct (correct: true), and the other 2 are false (correct: false).
Make the scenario engaging and dramatic (e.g. asteroid collision, oxygen leak, gravity anomalies).
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    if (!response.ok) {
        return res.status(response.status).json({ error: data });
    }

    const aiMessage = data.choices[0].message.content;
    const parsedData = JSON.parse(aiMessage);
    
    return res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
