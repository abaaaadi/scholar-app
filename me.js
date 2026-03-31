const crypto = require('crypto');
const https  = require('https');

const JWT_SECRET = process.env.JWT_SECRET || 'scholar-default-secret';

function b64(str) { return Buffer.from(str).toString('base64url'); }
function createJWT(payload) {
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body   = b64(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 3600 * 1000 }));
  const sig    = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}
function hashPassword(password, salt) {
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return { hash };
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const users = await supabase('GET', 'users',
      `email=eq.${encodeURIComponent(email.toLowerCase().trim())}&select=id,email,name,plan,password_hash,salt,created_at`);
    if (!users || users.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = users[0];
    const { hash } = hashPassword(password, user.salt);
    if (hash !== user.password_hash) return res.status(401).json({ error: 'Invalid email or password' });

    const token = createJWT({ userId: user.id, email: user.email, plan: user.plan });
    return res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name, plan: user.plan, created_at: user.created_at } });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
