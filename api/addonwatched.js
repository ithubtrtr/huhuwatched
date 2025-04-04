export default async function handler(req, res) {
  const response = await fetch("http://oha.to/addon.watched", {
    method: "GET",
    headers: {
      "Host": "oha.to",
      "Connection": "Keep-Alive",
      "If-Modified-Since": "Fri, 04 Apr 2025 21:39:01 GMT",
      "Accept-Encoding": "gzip, deflate"
    }
  });

  const data = await response.text();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(response.status).send(data);
}
