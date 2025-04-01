import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const url = 'http://oha.to/addon.watched'; // HTTP bağlantısı kullanmak
    const { method, headers } = req;

    // User-Agent'ı kaldırıyoruz
    const headersWithoutUserAgent = { ...headers };
    delete headersWithoutUserAgent['user-agent'];

    const response = await fetch(url, {
      method: method,
      headers: headersWithoutUserAgent,
    });

    if (!response.ok) {
      // Hata mesajını yazdırmak
      const errorDetails = await response.text();
      console.error('Error with OHA.TO response:', errorDetails);
      throw new Error(`Failed to fetch data: ${errorDetails}`);
    }

    const data = await response.text(); // Yanıtı alıyoruz
    res.status(response.status).send(data); // Yanıtı döndürüyoruz
  } catch (error) {
    console.error('Error in function:', error);
    res.status(500).send({ error: 'Internal Server Error', details: error.message });
  }
}
