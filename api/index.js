const fetch = require("node-fetch");

module.exports = async (req, res) => {
    try {
        // Hedef URL
        const targetUrl = "https://oha.to/addon.watched";

        // User-Agent kaldırılmış şekilde isteği yap
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "Host": "oha.to",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip, deflate"
            }
        });

        // Gelen yanıtın başlıklarını koru
        res.setHeader("Content-Type", response.headers.get("Content-Type") || "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Yanıtı döndür
        const data = await response.text();
        res.status(response.status).send(data);
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).send({ error: "Sunucu hatası", details: error.message });
    }
};
