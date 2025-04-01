from flask import Flask, request, Response
import requests

app = Flask(__name__)

TARGET_URL = "https://oha.to/addon.watched"

@app.route('/addon.watched', methods=['GET'])
def proxy_request():
    headers = {key: value for key, value in request.headers if key.lower() != "user-agent"}
    response = requests.get(TARGET_URL, headers=headers)
    return Response(response.content, status=response.status_code, content_type=response.headers.get('Content-Type'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
