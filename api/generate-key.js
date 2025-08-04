import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'keys.json');

function generateNewKey() {
  return [...Array(4)]
    .map(() => Math.random().toString(36).substring(2, 6).toUpperCase())
    .join('-');
}

export default async function handler(req, res) {
  let data = {};
  try {
    const jsonData = await fs.readFile(filePath, 'utf8');
    data = JSON.parse(jsonData);
  } catch {
    data = {};
  }

  const now = Date.now();

  if (!data.key || !data.expiry || now > data.expiry) {
    data.key = generateNewKey();
    data.expiry = now + 3600_000; // 1 saat
    await fs.writeFile(filePath, JSON.stringify(data));
  }

  res.status(200).json({ key: data.key, expiresAt: data.expiry });
}
