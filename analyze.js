const { verifyJWT, callClaude, cors, checkAndIncrementUsage } = require('./_utils');

module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  let payload;
  try { payload = verifyJWT(token); }
  catch (e) { return res.status(401).json({ error: 'Please log in to use writing assistant' }); }

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const usage = await checkAndIncrementUsage(payload.userId, 'write', payload.plan);
  if (!usage.allowed)
    return res.status(429).json({
      error: `Daily writing limit reached (${usage.limit}/day on free plan). Upgrade to Pro for unlimited.`
    });

  try {
    const data = await callClaude([{ role: 'user', content: prompt }], null, 1500);
    if (data.error) return res.status(500).json({ error: data.error.message });
    return res.status(200).json({
      text:  (data.content || []).map(b => b.text || '').join(''),
      usage: { today: usage.count, limit: usage.limit, plan: payload.plan }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
