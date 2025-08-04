let currentKey = null;
let expiry = 0;

export default function handler(req, res) {
  const now = Date.now();

  if (!currentKey || now > expiry) {
    // Yeni key üret, 1 saat geçerli
    currentKey = [...Array(4)]
      .map(() => Math.random().toString(36).substring(2, 6).toUpperCase())
      .join('-');
    expiry = now + 3600_000;
  }

  res.status(200).json({ key: currentKey, expiresAt: expiry });
}
