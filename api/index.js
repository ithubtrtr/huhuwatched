import axios from 'axios';

export default async function handler(req, res) {
  try {
    const url = 'https://oha.to/addon.watched'; // HTTPS bağlantısı

    const { method, headers } = req;

    // User-Agent'ı kaldırıyoruz
    const headersWithoutUserAgent = { ...headers };
    delete headersWithoutUserAgent['user-agent'];

    // Axios ile OHA.TO'ya yönlendirme
    const response = await axios({
      method: method,
      url: url,
      headers: headersWithoutUserAgent,
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false, // Sertifika hatalarını göz ardı etmek
      }),
    });

    res.status(response.status).send(response.data); // Yanıtı gönder
  } catch (error) {
    console.error('Error in function:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}
