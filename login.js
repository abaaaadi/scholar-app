const crypto = require('crypto');
const https  = require('https');

const JWT_SECRET = process.env.JWT_SECRET || 'scholar-default-secret';
const FREE_LIMIT = 5;

function verifyJWT(token) {
  if (!token) throw new Error('No token');
  const [header, body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  if (sig !== expected) throw new Error('Invalid token');
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
  if (Date.now() > payload.exp) throw new Error('Token expired');
  return payload;
}
function supabase(method, table, data) {
  return new Promise((resolve, reject) => {
    const SURL = process.env.SUPABASE_URL; const SKEY = process.env.SUPABASE_KEY;
    if (!SURL || !SKEY) return reject(new Error('SUPABASE_URL or SUPABASE_KEY not set'));
    const isGet = method === 'GET';
    const path  = `/rest/v1/${table}${isGet && data ? '?' + data : ''}`;
    const body  = !isGet ? JSON.stringify(data) : null;
    const url   = new URL(SURL);
    const opts  = { hostname: url.hostname, path, method, headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/json', 'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal' } };
    if (body) opts.headers['Content-Length'] = Buffer.byteLength(body);
    const req = https.request(opts, res => { let d=''; res.on('data',c=>d+=c); res.on('end',()=>{ try{resolve(d?JSON.parse(d):[]);}catch(e){reject(new Error('DB: '+d.substring(0,100)));} }); });
    req.on('error', reject); if (body) req.write(body); req.end();
  });
}
function callClaude(messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1500, messages });
    const opts = { hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'Content-Length': Buffer.byteLength(body) } };
    const req = https.request(opts, res => { let d=''; res.on('data',c=>d+=c); res.on('end',()=>{ try{resolve(JSON.parse(d));}catch(e){reject(new Error('Claude error'));} }); });
    req.on('error', reject); req.write(body); req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  let payload;
  try { payload = verifyJWT(token); } catch(e) { return res.status(401).json({ error: 'Please log in to use writing assistant' }); }

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  if (payload.plan !== 'pro') {
    const today = new Date().toISOString().split('T')[0];
    const rows  = await supabase('GET', 'usage', `user_id=eq.${payload.userId}&action=eq.write&date=eq.${today}`);
    const count = rows && rows[0] ? rows[0].count : 0;
    if (count >= FREE_LIMIT) return res.status(429).json({ error: `Daily writing limit reached (${FREE_LIMIT}/day). Upgrade to Pro for unlimited.` });
    if (rows && rows[0]) { await supabase('PATCH', `usage?user_id=eq.${payload.userId}&action=eq.write&date=eq.${today}`, { count: count + 1 }); }
    else { await supabase('POST', 'usage', { user_id: payload.userId, action: 'write', date: today, count: 1 }); }
  }

  try {
    const data = await callClaude([{ role: 'user', content: prompt }]);
    if (data.error) return res.status(500).json({ error: data.error.message });
    return res.status(200).json({ text: (data.content || []).map(b => b.text || '').join('') });
  } catch(e) { return res.status(500).json({ error: e.message }); }
};
