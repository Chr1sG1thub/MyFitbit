export default async function handler(req, res) {
  try {
    const { code, state, error } = req.query;  // GET query from redirect
    if (error || !code) {
      return res.status(400).json({ error: error || 'No code' });
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: '23TZ3L',
      client_secret: process.env.FITBIT_CLIENT_SECRET,
      redirect_uri: 'https://my-fitbit.vercel.app/api/callback',
      code
    });

    const tokenRes = await fetch('https://api.fitbit.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      throw new Error(`Token fetch failed: ${tokenRes.status} ${err}`);
    }

    const tokens = await tokenRes.json();
    // TODO: Store tokens securely (Vercel KV, httpOnly cookie, or redirect with short-lived)
    res.redirect(302, `/dashboard?token=${tokens.access_token}`);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).json({ error: err.message });
  }
}
