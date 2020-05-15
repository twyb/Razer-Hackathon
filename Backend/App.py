import logging
import socket
from flask_cors import CORS, cross_origin
from backend import app
from cheroot import wsgi
from flask import Blueprint
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, jsonify

# from backend.routes.services import services
# from Backend.routes.login import twofa

app = Flask(__name__)
cors = CORS(app)
# app.register_blueprint(services)

@app.route('/loans', methods = ['GET', 'POST '])
def loans():
    # return "Hello World! Hey!"
    return jsonify({"about": "Hello World!"})

logger = logging.getLogger()
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

if __name__ == "__main__":
    logging.info("Starting application ...")
    # sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # sock.bind(('localhost', 5000))
    # port = sock.getsockname()[1]
    # sock.close()
    app.run(debug = True)