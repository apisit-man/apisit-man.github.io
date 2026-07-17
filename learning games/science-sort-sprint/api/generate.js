export default async function handler(req, res) {
  // CORS Headers for GitHub Pages integration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change to your GitHub Pages URL for more security later
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    let subject, categories;

    // Support both GET (query) and POST (body)
    if (req.method === 'POST') {
      subject = req.body.subject;
      categories = req.body.categories;
    } else {
      subject = req.query.subject;
      categories = req.query.categories;
    }

    if (!subject || !categories) {
      return res.status(400).json({ error: 'Missing subject or categories' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured on Vercel.' });
    }

    const prompt = `You are an educational game content generator. 
The user is playing a sorting game.
SUBJECT: ${subject}
CATEGORIES: ${categories}

Generate 15 short, factual statements related to the SUBJECT. 
Each statement MUST strictly belong to exactly ONE of the provided CATEGORIES.
Ensure facts are 100% scientifically/mathematically accurate and suitable for high school students.
Statements should be 1-2 sentences max. Use Thai language.

Return ONLY a valid JSON object with the exact format below, nothing else:
{
  "questions": [
    { "text": "fact statement", "cat": "Exact Category Name from the list" }
  ]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Fast and cheap model, perfect for this
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API Error:', data);
      return res.status(500).json({ error: 'Failed to fetch from OpenAI' });
    }

    let questions = [];
    try {
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      questions = parsed.questions || [];
    } catch (e) {
      console.error('JSON Parse Error:', e);
      return res.status(500).json({ error: 'Invalid JSON from AI' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
