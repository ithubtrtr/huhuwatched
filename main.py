from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# OHA.TO API URL'si
OHA_TO_URL = "https://oha.to"

@app.route("/addon.watched", methods=["GET"])
def watched_proxy():
    # User-Agent başlığını kaldırıyoruz
    headers = {key: value for key, value in request.headers.items() if key.lower() != "user-agent"}
    
    # oha.to'dan gelen JSON verisini çekiyoruz
    try:
        response = requests.get(OHA_TO_URL + "/addon.watched", headers=headers)
        response.raise_for_status()
        json_data = response.json()
        
        # Yanıtı doğrudan ileterek JSON formatını koruyoruz
        return jsonify(json_data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 404

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
