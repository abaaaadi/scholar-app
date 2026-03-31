const { verifyJWT, supabase, cors, FREE_LIMITS } = require('./_utils');

module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  let payload;
  try { payload = verifyJWT(token); }
  catch (e) { return res.status(401).json({ error: 'Not authenticated' }); }

  try {
    // Get user info
    const users = await supabase('GET', 'users',
      `id=eq.${payload.userId}&select=id,email,name,plan,created_at`);
    if (!users || !users[0]) return res.status(404).json({ error: 'User not found' });
    const user = users[0];

    // Get usage for today
    const today = new Date().toISOString().split('T')[0];
    const usage = await supabase('GET', 'usage',
      `user_id=eq.${payload.userId}&date=eq.${today}`);

    // Get total all-time usage
    const allUsage = await supabase('GET', 'usage',
      `user_id=eq.${payload.userId}&select=action,count`);

    const todayMap  = {};
    const totalMap  = {};
    const actions   = ['search', 'analyze', 'write'];

    actions.forEach(a => { todayMap[a] = 0; totalMap[a] = 0; });

    (usage    || []).forEach(r => { todayMap[r.action]  = (todayMap[r.action]  || 0) + r.count; });
    (allUsage || []).forEach(r => { totalMap[r.action] = (totalMap[r.action] || 0) + r.count; });

    return res.status(200).json({
      user,
      today:  todayMap,
      total:  totalMap,
      limits: user.plan === 'pro' ? { search: '∞', analyze: '∞', write: '∞' } : FREE_LIMITS
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
