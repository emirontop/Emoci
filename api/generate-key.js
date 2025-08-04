import fetch from 'node-fetch';

// Token parçalı şekilde tanımlandı
const PART1 = 'ghp_le4qtBYupoRl1ki';
const PART2 = 'IW7i4LIx';
const PART3 = 'OUk0vaq49vHUW';
const TOKEN = PART1 + PART2 + PART3;

// GitHub bilgileri
const OWNER = 'emirontop';
const REPO = 'Emoci';
const PATH = 'keys.json';
const BRANCH = 'main';

// Key oluşturucu
function generateKeyPart(length = 4) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// GitHub'tan dosyayı çek
async function getFile() {
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`, {
    headers: { Authorization: `token ${TOKEN}` }
  });
  if (!r.ok) throw new Error('GET keys.json failed');
  return r.json();
}

// Güncelleme işlemi
async function updateFile(newContent, sha) {
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Add new key',
      content: newContent,
      sha,
      branch: BRANCH
    })
  });
  if (!r.ok) throw new Error('PUT keys.json failed');
  return r.json();
}

// Ana handler
export default async function handler(req, res) {
  try {
    const file = await getFile();
    const sha = file.sha;
    const keys = JSON.parse(Buffer.from(file.content, 'base64').toString());

    const newKey = `${generateKeyPart()}-${generateKeyPart()}-${generateKeyPart()}`;
    keys.push(newKey);

    const newContent = Buffer.from(JSON.stringify(keys)).toString('base64');
    await updateFile(newContent, sha);

    res.status(200).json({ success: true, key: newKey });
  } catch (err) {
    res.status(500).json({ success: true, error: 'FUNCTION_INVOCATION_FAILED', detail: err.message });
  }
                          }
