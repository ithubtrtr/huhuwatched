import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fetch from "node-fetch";

export default async function handler(req, res) {
    // Kullanıcının WATCHED olup olmadığını kontrol et
    let userAgent = req.headers["user-agent"] || "";

    // Hedef URL
    const targetUrl = "https://oha.to/addon.watched";

    // Eğer WATCHED kullanıcısıysa User-Agent kaldır ve isteği ilet
    const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
            "Host": "oha.to",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip, deflate"
        },
    });

    // Gelen yanıtı uygun şekilde döndür
    res.status(response.status);
    response.headers.forEach((value, key) => {
        res.setHeader(key, value);
    });

    const data = await response.buffer();
    res.send(data);
}
