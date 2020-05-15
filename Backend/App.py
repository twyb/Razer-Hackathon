import logging
import socket
from flask_cors import CORS, cross_origin
from backend import app
from cheroot import wsgi
from backend.routes.services import services
from flask import session

# from Backend.routes.login import twofa

CORS(app)
app.register_blueprint(services)

@app.route('/')
def default_route():
    return "Python Template"

logger = logging.getLogger()
handler = logging.StreamHandler()
formatter = logging.Formatter(
        '%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

if __name__ == "__main__":
    logging.info("Starting application ...")
    # sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # sock.bind(('localhost', 5000))
    # port = sock.getsockname()[1]
    # sock.close()
    app.run(port=8000, debug=True)