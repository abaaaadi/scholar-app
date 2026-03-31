const { verifyJWT, callClaude, cors, checkAndIncrementUsage } = require('./_utils');

module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  let payload;
  try { payload = verifyJWT(token); }
  catch (e) { return res.status(401).json({ error: 'Please log in to analyze text' }); }

  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text is required' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const usage = await checkAndIncrementUsage(payload.userId, 'analyze', payload.plan);
  if (!usage.allowed)
    return res.status(429).json({
      error: `Daily analysis limit reached (${usage.limit}/day on free plan). Upgrade to Pro for unlimited.`
    });

  try {
    const data = await callClaude([{
      role: 'user',
      content: `Analyze this academic text. Return ONLY this JSON (no markdown):
{"field":"discipline","research_question":"one sentence","keywords":["k1","k2","k3","k4","k5","k6"],"search_queries":["query1","query2","query3"],"themes":["t1","t2","t3"],"methodology":"brief","gap":"one sentence"}

Text: ${text.substring(0, 3000)}`
    }], 'You are an academic research analyst. Return ONLY valid JSON, no other text.', 1000);

    if (data.error) return res.status(500).json({ error: data.error.message });
    const raw   = (data.content || []).map(b => b.text || '').join('').trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return res.status(500).json({ error: 'Parse error. Try again.' });

    return res.status(200).json({
      ...JSON.parse(match[0]),
      usage: { today: usage.count, limit: usage.limit, plan: payload.plan }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
