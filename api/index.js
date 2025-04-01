import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const url = 'https://oha.to/addon.watched';
    const { method, headers } = req;

    // User-Agent'ı kaldırıyoruz
    const headersWithoutUserAgent = { ...headers };
    delete headersWithoutUserAgent['user-agent'];

    const response = await fetch(url, {
      method: method,
      headers: headersWithoutUserAgent,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); // JSON yanıtı alıyoruz
    res.status(response.status).json(data); // Yanıtı JSON olarak döndürüyoruz
  } catch (error) {
    console.error('Error in function:', error);
    res.status(500).send({ error: 'Internal Server Error', details: error.message });
  }
}
