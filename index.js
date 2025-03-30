from flask import Flask, request, Response
import requests

app = Flask(__name__)

TARGET_BASE_URL = "https://huhu.to"

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    target_url = f"{TARGET_BASE_URL}/{path}"  # Gelen isteği hedef siteye yönlendir
    response = requests.get(target_url)  # Hedef siteden içeriği al
    return Response(response.content, status=response.status_code, headers=dict(response.headers))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
