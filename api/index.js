import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'https://oha.to/addon.watched'; // OHA.TO API endpoint
  const { method, headers } = req;

  // Proxy'den gelen istekte User-Agent'ı kaldırıyoruz
  const headersWithoutUserAgent = { ...headers };
  delete headersWithoutUserAgent['user-agent'];

  // OHA.TO'ya gelen isteği yönlendiriyoruz
  const response = await fetch(url, {
    method: method,
    headers: headersWithoutUserAgent,
  });

  // OHA.TO'dan gelen yanıtı proxy'ye iletilmesi için tekrar dönüyoruz
  const data = await response.text(); // OHA.TO'dan gelen yanıtı alıyoruz

  // OHA.TO'dan alınan yanıtı kullanıcıya gönderiyoruz
  res.status(response.status).send(data);
}
