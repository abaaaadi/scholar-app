const crypto = require('crypto');
const https  = require('https');

const JWT_SECRET  = process.env.JWT_SECRET || 'scholar-default-secret';
const FREE_LIMITS = { search: 5, analyze: 3, write: 5 };

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
    const SURL = process.env.SUPABASE_URL;
    const SKEY = process.env.SUPABASE_KEY;
    if (!SURL || !SKEY) return reject(new Error('SUPABASE_URL or SUPABASE_KEY not set'));
    const isGet = method === 'GET';
    const path  = `/rest/v1/${table}${isGet && data ? '?' + data : ''}`;
    const body  = !isGet ? JSON.stringify(data) : null;
    const url   = new URL(SURL);
    const opts  = {
      hostname: url.hostname, path, method,
      headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' }
    };
    if (body) opts.headers['Content-Length'] = Buffer.byteLength(body);
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(d ? JSON.parse(d) : []); } catch(e) { reject(new Error('DB: ' + d.substring(0,100))); } });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  let payload;
  try { payload = verifyJWT(token); }
  catch(e) { return res.status(401).json({ error: 'Not authenticated' }); }

  try {
    const users = await supabase('GET', 'users', `id=eq.${payload.userId}&select=id,email,name,plan,created_at`);
    if (!users || !users[0]) return res.status(404).json({ error: 'User not found' });
    const user = users[0];

    const today    = new Date().toISOString().split('T')[0];
    const todayRows = await supabase('GET', 'usage', `user_id=eq.${payload.userId}&date=eq.${today}`);
    const allRows   = await supabase('GET', 'usage', `user_id=eq.${payload.userId}&select=action,count`);

    const todayMap = { search: 0, analyze: 0, write: 0 };
    const totalMap = { search: 0, analyze: 0, write: 0 };
    (todayRows || []).forEach(r => { todayMap[r.action] = (todayMap[r.action] || 0) + r.count; });
    (allRows   || []).forEach(r => { totalMap[r.action] = (totalMap[r.action] || 0) + r.count; });

    return res.status(200).json({
      user,
      today:  todayMap,
      total:  totalMap,
      limits: user.plan === 'pro' ? { search: '∞', analyze: '∞', write: '∞' } : FREE_LIMITS
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
