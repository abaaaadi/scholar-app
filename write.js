const { hashPassword, supabase, createJWT, cors } = require('./_utils');

module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 6)  return res.status(400).json({ error: 'Password must be at least 6 characters' });

  try {
    // Check if email already exists
    const existing = await supabase('GET', 'users', `email=eq.${encodeURIComponent(email)}&select=id`);
    if (existing && existing.length > 0)
      return res.status(400).json({ error: 'Email already registered' });

    // Hash password and create user
    const { hash, salt } = hashPassword(password);
    const users = await supabase('POST', 'users', {
      email: email.toLowerCase().trim(),
      password_hash: hash,
      salt,
      name: name || email.split('@')[0],
      plan: 'free'
    });

    if (!users || !users[0]) throw new Error('Failed to create user');

    const user  = users[0];
    const token = createJWT({ userId: user.id, email: user.email, plan: user.plan });

    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name, plan: user.plan }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
