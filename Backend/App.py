import logging
import socket
from flask_cors import CORS, cross_origin
from backend import app
from cheroot import wsgi
from flask import Blueprint
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, jsonify
import sqlalchemy as sa


# from backend.routes.services import services
# from Backend.routes.login import twofa

app = Flask(__name__)
CORS(app)
# app.register_blueprint(services)

credentials = {
    "username": "admin",
    "password": "Abcd1234!",
    "dbString": "razer-hackathon.ch8fxgsovzb7.ap-southeast-1.rds.amazonaws.com",
    "port": 3306,
    "dbName": "razer_hackathon",
    "dbType": "mysql"}

usrname = credentials["username"]
pwd = credentials["password"]
string = credentials["dbString"]
port = credentials["port"]
db = credentials["dbName"]
dbtype = credentials["dbType"]

engine = sa.create_engine(f"{dbtype}://{usrname}:{pwd}@{string}:{port}/{db}")
conn = engine.connect()


sql_query = """SELECT * 
                FROM razer_hackathon.problem_table"""

sql_result = db.read_sql_query(sql_query, engine)

# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{master username}:{db password}@{endpoint}/{db instance name}'
# db = SQLAlchemy(application)

@app.route('/loans', methods = ['GET', 'POST '])
def loans():
    # return "Hello World! Hey!"
    return jsonify({"about": "Hello World!"})

@app.route('/problems', methods = ['GET', 'POST '])
def problems():
    # return "Hello World! Hey!"
    return sql_result

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