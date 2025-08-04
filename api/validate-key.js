import { json } from 'micro';

let currentKey = null;
let expiry = 0;

function generateNewKey() {
  currentKey = [...Array(4)]
    .map(() => Math.random().toString(36).substring(2, 6).toUpperCase())
    .join('-');
  expiry = Date.now() + 3600_000;
}

export default async function handler(req, res) {
  if (!currentKey || Date.now() > expiry) generateNewKey();

  const { key } = req.query;

  if (!key) {
    res.status(400).json({ valid: false, error: "Missing key parameter" });
    return;
  }

  const isValid = key === currentKey && Date.now() < expiry;

  res.status(200).json({ valid: isValid });
}
