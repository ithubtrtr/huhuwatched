import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/addon.watched', methods=['GET'])
def proxy():
    url = "http://oha.to/addon.watched"
    
    # User-Agent başlığını kaldırıyoruz
    headers = {key: value for key, value in request.headers.items() if key != "User-Agent"}
    
    # Gelen isteği oha.to'ya yönlendiriyoruz
    response = requests.get(url, headers=headers)
    
    # Eğer içerik JSON ise JSON olarak döndür
    if response.headers['Content-Type'] == 'application/json':
        return jsonify(response.json())
    
    # Eğer içerik HTML ise olduğu gibi döndür
    return response.text

if __name__ == '__main__':
    app.run(debug=True)
