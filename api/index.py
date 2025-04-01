import requests
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        target_url = "http://oha.to/addon.watched"  # Hedef URL
        headers = {
            "Host": "oha.to",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip, deflate",
        }
        
        # Hedef siteye User-Agent'siz istek gönder
        response = requests.get(target_url, headers=headers)
        
        # Gelen yanıtı döndür
        self.send_response(response.status_code)
        self.send_header("Content-type", response.headers.get("Content-Type", "application/json"))
        self.end_headers()
        self.wfile.write(response.content)

