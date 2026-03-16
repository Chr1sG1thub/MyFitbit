// api/callback.js
export default function handler(req, res) {
  try {
    const { hash } = new URL(`http://${req.headers.host}${req.url}`);
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get('access_token');
    if (!access_token) throw new Error('No token');

    // Store/use token (cookie, redirect)
    res.redirect(302, `/dashboard?access_token=${access_token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
