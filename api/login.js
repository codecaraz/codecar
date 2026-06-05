export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/users?username=eq.${encodeURIComponent(username)}&password=eq.${encodeURIComponent(password)}&is_active=eq.true&select=username`,
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    if (!data || data.length === 0) return res.status(401).json({ error: 'Invalid username or password' });
    return res.status(200).json({ success: true, username: data[0].username });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
