import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const url = 'http://oha.to/addon.watched'; // HTTPS yerine HTTP'yi kullan
    const { method, headers } = req;

    // Proxy'den gelen istekte User-Agent'ı kaldırıyoruz
    const headersWithoutUserAgent = { ...headers };
    delete headersWithoutUserAgent['user-agent'];

    // OHA.TO'ya gelen isteği yönlendiriyoruz
    const response = await fetch(url, {
      method: method,
      headers: headersWithoutUserAgent,
    });

    if (!response.ok) {
      throw new Error('Error with OHA.TO response');
    }

    const data = await response.text(); // OHA.TO'dan gelen yanıtı alıyoruz

    // OHA.TO'dan alınan yanıtı kullanıcıya gönderiyoruz
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Error in function:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}
