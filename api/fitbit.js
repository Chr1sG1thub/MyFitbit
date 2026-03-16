export default async function handler(req, res) {
  const origin = req.headers.origin || '';

  // Allow your GitHub Pages origin
  const allowedOrigins = ['https://chr1sg1thub.github.io'];
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { endpoint = '/1/user/-/activities/date/today.json', token } = req.query;
  alert(endpoint);
  if (!token) return res.status(400).json({ error: 'No token' });

  try {
    const apiRes = await fetch(`https://api.fitbit.com${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await apiRes.json();
    alert(data);
    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
