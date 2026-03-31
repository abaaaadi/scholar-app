const https = require('https');

function callClaude(messages, system) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: system || 'Respond ONLY with valid JSON.',
      messages
    });
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text is required' });
  if (!process.env.ANTHROPIC_API_KEY)
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in Vercel.' });

  try {
    const data = await callClaude([{
      role: 'user',
      content: `Analyze this academic text. Respond ONLY with this exact JSON (no markdown):
{
  "field": "academic discipline",
  "research_question": "one sentence",
  "keywords": ["kw1","kw2","kw3","kw4","kw5","kw6"],
  "search_queries": ["3-5 word query 1","query 2","query 3"],
  "themes": ["theme1","theme2","theme3"],
  "methodology": "brief description",
  "gap": "research gap in one sentence"
}

Text: ${text.substring(0, 3000)}`
    }], 'You are an academic research analyst. Return ONLY valid JSON, no other text.');

    if (data.error) return res.status(500).json({ error: data.error.message });
    const raw = (data.content || []).map(b => b.text || '').join('').trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return res.status(500).json({ error: 'Parse error' });
    return res.status(200).json(JSON.parse(match[0]));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
