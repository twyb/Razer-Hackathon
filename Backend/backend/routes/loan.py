from flask import request, jsonify, Blueprint, session
import pandas as pd
import os
import sys

service = Blueprint('service', __name__)

@service.route('/service', methods=['POST'])
def student_profile():
	return 'TRUE'
