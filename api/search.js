const https = require('https');

function callClaude(messages, system) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: system || 'You are a helpful academic research assistant.',
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
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Parse error: ' + data.substring(0, 200))); }
      });
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

  const { query, yearFilter } = req.body || {};
  if (!query) return res.status(400).json({ error: 'query is required' });
  if (!process.env.ANTHROPIC_API_KEY)
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY environment variable not set in Vercel dashboard.' });

  const yearNote = yearFilter ? ` Prefer papers published in ${yearFilter} or later.` : '';

  try {
    const data = await callClaude([{
      role: 'user',
      content: `List 10 real, published academic papers about: "${query}".${yearNote}

Return ONLY a valid JSON array — no markdown, no code fences, no extra text:
[
  {
    "paperId": "p1",
    "title": "Exact real paper title",
    "authors": [{"name": "Smith, J."}, {"name": "Jones, A."}],
    "year": 2022,
    "journal": {"name": "Journal or Conference Name"},
    "abstract": "2-3 sentences describing the paper purpose, method, and key finding.",
    "citationCount": 87,
    "url": "https://scholar.google.com/scholar?q=${encodeURIComponent(query)}"
  }
]

Rules: only genuinely published papers; set each url to https://scholar.google.com/scholar?q= plus the URL-encoded paper title; realistic citation counts; exactly 10 entries; valid JSON only.`
    }],
    'You are an academic research database. Respond ONLY with a valid JSON array of real published papers. No markdown, no code fences, no text outside the array.'
    );

    if (data.error) return res.status(500).json({ error: data.error.message });

    const text = (data.content || []).map(b => b.text || '').join('').trim();
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return res.status(500).json({ error: 'Unexpected AI response. Try again.' });

    const papers = JSON.parse(match[0]);
    return res.status(200).json({ papers, total: papers.length });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
