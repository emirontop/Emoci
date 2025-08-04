export default function handler(req, res) {
  const key = [...Array(4)].map(() =>
    Math.random().toString(36).substring(2, 6).toUpperCase()
  ).join('-');

  const expiry = Date.now() + 3600_000; // 1 saat geçerli

  res.status(200).json({ key, expiresAt: expiry });
}
