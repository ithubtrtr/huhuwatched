import requests
from flask import Flask, Response
from flask import request

app = Flask(__name__)

# Oha.to API URL
OHA_URL = 'https://oha.to/addon.watched'


@app.route('/addon.watched', methods=['GET'])
def proxy():
    # Gelen isteğin başlıklarını alıyoruz
    headers = {key: value for key, value in request.headers.items()}

    # User-Agent bilgisini kaldırıyoruz
    if 'User-Agent' in headers:
        del headers['User-Agent']

    # Oha.to'ya proxy isteği gönderiyoruz
    response = requests.get(OHA_URL, headers=headers, params=request.args)

    # Yanıtı Flask'a uygun hale getiriyoruz
    return Response(response.content, status=response.status_code, content_type=response.headers['Content-Type'])


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
