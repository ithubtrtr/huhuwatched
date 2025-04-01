import fetch from "node-fetch"; // ESM uyumlu import

export default async function handler(req, res) {
    try {
        const targetUrl = "https://oha.to/addon.watched";

        // User-Agent olmadan isteği yap
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "Host": "oha.to",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip, deflate"
            }
        });

        res.setHeader("Content-Type", response.headers.get("Content-Type") || "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        const data = await response.text();
        res.status(response.status).send(data);
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ error: "Sunucu hatası", details: error.message });
    }
}
