const { verifyJWT, callClaude, supabase, cors, checkAndIncrementUsage } = require('./_utils');

module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  // Auth check
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  let payload;
  try { payload = verifyJWT(token); }
  catch (e) { return res.status(401).json({ error: 'Please log in to search papers' }); }

  const { query, yearFilter } = req.body || {};
  if (!query) return res.status(400).json({ error: 'query is required' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  // Check usage limit
  const usage = await checkAndIncrementUsage(payload.userId, 'search', payload.plan);
  if (!usage.allowed)
    return res.status(429).json({
      error: `Daily search limit reached (${usage.limit}/day on free plan). Upgrade to Pro for unlimited searches.`
    });

  const yearNote = yearFilter ? ` Prefer papers published in ${yearFilter} or later.` : '';

  try {
    const data = await callClaude([{
      role: 'user',
      content: `List 10 real published academic papers about: "${query}".${yearNote}

Return ONLY a valid JSON array, no markdown, no extra text:
[{
  "paperId":"p1",
  "title":"Exact paper title",
  "authors":[{"name":"Smith, J."},{"name":"Jones, A."}],
  "year":2022,
  "journal":{"name":"Journal Name"},
  "abstract":"2-3 sentences: purpose, method, key finding.",
  "citationCount":87,
  "url":"https://scholar.google.com/scholar?q=ENCODED_TITLE"
}]

Rules: real papers only; set url to https://scholar.google.com/scholar?q= + URL-encoded title; exactly 10 entries; valid JSON only.`
    }], 'You are an academic research database. Respond ONLY with a valid JSON array of real published papers. No markdown, no code fences.');

    if (data.error) return res.status(500).json({ error: data.error.message });
    const text  = (data.content || []).map(b => b.text || '').join('').trim();
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return res.status(500).json({ error: 'Could not parse response. Try again.' });

    return res.status(200).json({
      papers: JSON.parse(match[0]),
      usage:  { today: usage.count, limit: usage.limit, plan: payload.plan }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
