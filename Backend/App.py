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
import json
import requests
import pprint
import base64
import urllib.request
import os
import uuid
import pyotp
import telegram

app = Flask(__name__)
CORS(app)

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

bot = telegram.Bot(token='1263177008:AAHeKwgn6QYd44qUwMylQLvvWF7nAdmuQeE')
totp = pyotp.TOTP("JBSWY3PCBHPK3PXP")

@app.route("/login", methods = ['POST'])
def login():
        username = request.json['data'][0]
        password = request.json['data'][1]
        if(username == 'kevinou' and password == 'kevinou'):
                success = 'True'
                token = str(uuid.uuid4())
                output = [success, token]
                msg = totp.now()
                chat_id = bot.get_updates()[-1].message.chat_id
                bot.send_message(chat_id=chat_id, text=msg)
        else:
                output = 'False'
        return jsonify(output)

@app.route("/2FA", methods = ['POST'])
def authenticate():
        code = request.json['data']
        return(str(totp.verify(code, valid_window = 60)))

@app.route('/', methods = ['GET', 'POST'])
def home():
    # return jsonify({"about": "Hello World!"})
    return "Home Page"

@app.route('/loans', methods = ['GET', 'POST'])
# @app.route('/loans/LoanID', methods = ['GET', 'POST'])
def loans():
    form_info = request.form

    loan_amount = form_info['remaining']

    loans_table_query = "SELECT * FROM razer_hackathon.loan_details WHERE LoanAmount >= '"+ loan_amount + "'"
    
    sql_df_loans_result = pd.read_sql_query(loans_table_query, engine)

    json_loans_result = sql_df_loans_result.to_json(orient='records')

    # return jsonify({"about": "Hello World!"})
    return json_loans_result

@app.route('/problems', methods = ['GET', 'POST'])
def problems():
    form_info = request.form

    problem_table_query = "SELECT * FROM razer_hackathon.problem_table WHERE ProblemIndustry = '?'"

    sql_df_problem_result = pd.read_sql_query(problem_table_query, engine)

    json_problem_result = sql_df_problem_result.to_json(orient='records')
    return json_problem_result

@app.route('/grants', methods = ['GET', 'POST'])
def grants():
    form_info = request.form

    industry = form_info['industry']

    employee_count = form_info['employee_count']

    grants_table_query = "SELECT * FROM razer_hackathon.grant_details WHERE Industry = '"+ industry +"' AND EmployeeCount >= " + employee_count +"" 

    sql_df_grants_result = pd.read_sql_query(grants_table_query, engine)        

    json_grants_result = sql_df_grants_result.to_json(orient='records')

    return json_grants_result

@app.route('/kyc', methods = ['GET', 'POST'])
def kyc():
    # Set path to save files
    path = os.getcwd().strip('Backend') + "images\\"

    # Save files in tmp folder
    userfile = request.files['compulsory_att']
    userfile_path = os.path.join(path, userfile.filename)
    userfile.save(userfile_path)

    with open(userfile_path, "rb") as img_file_1:
        my_string = base64.b64encode(img_file_1.read())

    image_string = my_string.decode('utf-8')
    
    # defining the api-endpoint  
    API_ENDPOINT = "https://niw1itg937.execute-api.ap-southeast-1.amazonaws.com/Prod/verify"
    
    # your API key here 
    API_KEY = "YM1BqxFUcjnY9G6ADuRt"

    headers = {'content-type': 'application/json'}
    
    # data to be sent to api 
    payload = {'base64image':image_string} 
    
    # sending post request and saving response as response object 
    r = requests.post(url = API_ENDPOINT, data = json.dumps(payload), headers = headers) 
    
    # extracting response text  
    result = r.text 

    return jsonify(result)

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