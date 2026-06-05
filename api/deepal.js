export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { vin, ver, mdl } = req.query;

  try {
    const response = await fetch(
      `https://turansoft.ru/api/code?vin=${encodeURIComponent(vin)}&ver=${encodeURIComponent(ver)}&mdl=${encodeURIComponent(mdl)}`,
      { headers: { 'Referer': 'https://turansoft.ru/' } }
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Server xətası: ' + e.message });
  }
}
