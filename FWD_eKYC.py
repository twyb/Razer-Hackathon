import json
import requests
import pprint
import base64
import urllib.request


with open("images/NRIC_Front.png", "rb") as img_file_1:
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
print(result) 