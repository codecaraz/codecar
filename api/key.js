export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { vin } = req.query;
  if (!vin || vin.length < 6) {
    return res.status(400).json({ error: 'VIN ən az 6 simvol olmalıdır' });
  }

  try {
    const response = await fetch(
      `https://bbavfnv8rcens94ng9jn.containers.yandexcloud.net/api/key?vin=${encodeURIComponent(vin)}`
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Server xətası: ' + e.message });
  }
}
