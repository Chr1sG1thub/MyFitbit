export default async function handler(req, res) {
  const { endpoint = '/1/user/-/activities/date/today.json', token } = req.query;
  
  if (!token) return res.status(400).json({ error: 'No token' });

  try {
    const apiRes = await fetch(`https://api.fitbit.com${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
