import fetch from "node-fetch";

export default async function handler(req, res) {
    // WATCHED uygulamasından gelen User-Agent'i kaldır
    const headers = {
        "Host": "oha.to",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip, deflate"
    };

    // Hedef URL (oha.to)
    const targetUrl = "https://oha.to/addon.watched";

    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: headers
        });

        // Yanıt başlıklarını ayarla
        res.setHeader("Content-Type", response.headers.get("Content-Type"));
        res.setHeader("Access-Control-Allow-Origin", "*"); // CORS için
        
        // Durum kodunu ayarla ve yanıtı gönder
        res.status(response.status);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).send("Bağlantı hatası: " + error.message);
    }
}
