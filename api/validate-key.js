import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'keys.json');

export default async function handler(req, res) {
  let data = {};
  try {
    const jsonData = await fs.readFile(filePath, 'utf8');
    data = JSON.parse(jsonData);
  } catch {
    return res.status(500).json({ valid: false, error: "Key data not found" });
  }

  const { key } = req.query;
  if (!key) {
    return res.status(400).json({ valid: false, error: "Missing key parameter" });
  }

  const now = Date.now();
  const isValid = key === data.key && now < data.expiry;

  res.status(200).json({ valid: isValid });
}
