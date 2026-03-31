const crypto = require('crypto');
const https  = require('https');

// ── JWT (pure Node crypto, no packages) ─────────────────────
const JWT_SECRET = process.env.JWT_SECRET || 'scholar-secret-change-me';

function createJWT(payload) {
  const header  = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body    = b64(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 3600 * 1000 }));
  const sig     = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function verifyJWT(token) {
  if (!token) throw new Error('No token');
  const [header, body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  if (sig !== expected) throw new Error('Invalid token');
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
  if (Date.now() > payload.exp) throw new Error('Token expired');
  return payload;
}

function b64(str) { return Buffer.from(str).toString('base64url'); }

// ── Password hashing ─────────────────────────────────────────
function hashPassword(password, salt) {
  salt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return { hash, salt };
}

// ── Supabase REST API ────────────────────────────────────────
function supabase(method, table, bodyOrQuery, token) {
  return new Promise((resolve, reject) => {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    if (!SUPABASE_URL || !SUPABASE_KEY)
      return reject(new Error('SUPABASE_URL or SUPABASE_KEY not set in Vercel environment variables'));

    const isGet = method === 'GET';
    const path  = `/rest/v1/${table}${isGet && bodyOrQuery ? '?' + bodyOrQuery : ''}`;
    const body  = !isGet ? JSON.stringify(bodyOrQuery) : null;
    const url   = new URL(SUPABASE_URL);

    const options = {
      hostname: url.hostname,
      path,
      method,
      headers: {
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type':  'application/json',
        'Prefer':        method === 'POST' ? 'return=representation' : 'return=minimal'
      }
    };
    if (body) options.headers['Content-Length'] = Buffer.byteLength(body);

    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(data ? JSON.parse(data) : []); }
        catch (e) { reject(new Error('Supabase parse error: ' + data.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// ── Anthropic API ────────────────────────────────────────────
function callClaude(messages, system, maxTokens = 2000) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model:      'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system:     system || 'You are a helpful academic research assistant.',
      messages
    });
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length':    Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Claude parse error')); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── CORS headers ─────────────────────────────────────────────
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// ── Usage limits (free plan) ─────────────────────────────────
const FREE_LIMITS = { search: 5, analyze: 3, write: 5 };

async function checkAndIncrementUsage(userId, action, plan) {
  if (plan === 'pro') return { allowed: true };

  const today = new Date().toISOString().split('T')[0];
  const rows   = await supabase('GET', 'usage', `user_id=eq.${userId}&action=eq.${action}&date=eq.${today}`);
  const count  = rows && rows[0] ? rows[0].count : 0;
  const limit  = FREE_LIMITS[action] || 5;

  if (count >= limit) return { allowed: false, count, limit };

  if (rows && rows[0]) {
    await supabase('PATCH', `usage?user_id=eq.${userId}&action=eq.${action}&date=eq.${today}`,
      { count: count + 1 });
  } else {
    await supabase('POST', 'usage', { user_id: userId, action, date: today, count: 1 });
  }
  return { allowed: true, count: count + 1, limit };
}

module.exports = { createJWT, verifyJWT, hashPassword, supabase, callClaude, cors, checkAndIncrementUsage, FREE_LIMITS };
