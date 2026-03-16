export default async function handler(req, res) {
  // Universal CORS - works from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

//  const { endpoint = '/1/user/-/hrv/date/today.json', token } = req.query;
   const { endpoint = '/1.2/user/-/sleep/date/today.json', token } = req.query;
 
  if (!token) {
    res.status(400).json({ error: 'No token' });
    return;
  }

  try {
    const apiRes = await fetch(`https://api.fitbit.com${endpoint}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
