export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { vin, ver, mdl } = req.query;
  const modelMap = { 'S07 2026': 'S07_RESTYLE', 'S07': 'S07', 'SL03': 'SL03' };
  const model = modelMap[mdl] || 'S07';
  const payload = { seed: vin, version: ver };
  if (ver !== '3.0') payload.model = model;

  try {
    const response = await fetch('https://turansoft.ru/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'https://turansoft.ru/',
        'Origin': 'https://turansoft.ru',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } 
    catch(e) { return res.status(200).json({ error: 'Turansoft cavabı: ' + text.slice(0, 200) }); }
    return res.status(200).json({
      yesterday: data.codeYesterday,
      today: data.codeToday || data.code,
      tomorrow: data.codeTomorrow
    });
  } catch (e) {
    return res.status(200).json({ error: e.message });
  }
}
