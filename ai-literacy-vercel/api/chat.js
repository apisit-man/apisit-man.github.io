const axios = require('axios');

// Simple in-memory rate limiting (will reset on Vercel cold starts)
// For a production app with multiple Vercel edge nodes, you should use @vercel/kv or similar.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const MAX_REQUESTS = 10;

function checkRateLimit(ip) {
    const now = Date.now();
    
    // Cleanup old entries to prevent memory leak
    if (rateLimitMap.size > 10000) {
        rateLimitMap.clear();
    }
    
    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW
        });
        return true;
    }

    const limitInfo = rateLimitMap.get(ip);
    
    if (now > limitInfo.resetTime) {
        // Window expired, reset
        limitInfo.count = 1;
        limitInfo.resetTime = now + RATE_LIMIT_WINDOW;
        return true;
    }

    if (limitInfo.count < MAX_REQUESTS) {
        limitInfo.count++;
        return true;
    }

    return false; // Rate limit exceeded
}

module.exports = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Get IP address from Vercel headers
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

        // Check Rate Limit
        if (!checkRateLimit(ip)) {
            return res.status(429).json({ error: 'Too Many Requests' });
        }

        const { messages, isInitialScenario } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        
        if (!apiKey) {
            console.error("Missing OPENAI_API_KEY environment variable");
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Forward to OpenAI
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 0.7,
            response_format: isInitialScenario ? { type: "text" } : { type: "json_object" }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Send back the response content
        const content = response.data.choices[0].message.content;
        return res.status(200).json({ content });

    } catch (error) {
        console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
        return res.status(500).json({ 
            error: 'Failed to process request', 
            details: error.response ? error.response.data : error.message 
        });
    }
};
