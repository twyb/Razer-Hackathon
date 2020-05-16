import logging
import socket
from flask_cors import CORS, cross_origin
from backend import app
from cheroot import wsgi
from flask import Blueprint
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, jsonify
import sqlalchemy as sa
import pandas as pd
import pprint

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
dbname = credentials["dbName"]
dbtype = credentials["dbType"]

engine = sa.create_engine(f"{dbtype}://{usrname}:{pwd}@{string}:{port}/{dbname}")
conn = engine.connect()

@app.route('/', methods = ['GET', 'POST'])
def home():
    # return jsonify({"about": "Hello World!"})
    return "Home Page"

@app.route('/loans', methods = ['GET', 'POST'])
# @app.route('/loans/LoanID', methods = ['GET', 'POST'])
def loans():
    form_info = request.json()
    # print(form_info)
    loans_table_query = "SELECT * FROM razer_hackathon.loan_details WHERE LoanAmount >= '5000'"
    
    sql_df_loans_result = pd.read_sql_query(loans_table_query, engine)

    json_loans_result = sql_df_loans_result.to_json(orient='records')

    # return jsonify({"about": "Hello World!"})
    return json_loans_result

@app.route('/problems', methods = ['GET', 'POST'])
def problems():
    form_info = request.json()
    problem_table_query = "SELECT * FROM razer_hackathon.problem_table WHERE ProblemIndustry = '?'"

    sql_df_problem_result = pd.read_sql_query(problem_table_query, engine)

    json_problem_result = sql_df_problem_result.to_json(orient='records')
    return json_problem_result

@app.route('/grants', methods = ['GET', 'POST'])
def grants():
    sql_df_grants_result = pd.read_sql_query(grants_table_query, engine)

    grants_table_query = "SELECT * FROM razer_hackathon.grant_details WHERE GrantIndustry = '?' AND EmployeeCount <= '?'"         

    json_grants_result = sql_df_grants_result.to_json(orient='records')

    return json_grants_result

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