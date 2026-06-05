export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { vin, ver, mdl } = req.query;

  const payload = { seed: vin, version: ver };
  if (ver !== '3.0') payload.model = mdl;

  try {
    const response = await fetch('https://turansoft.ru/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://turansoft.ru/',
        '
