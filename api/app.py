from flask import Flask, request, jsonify
from sklearn.externals import joblib
import traceback
import pandas as pd
import numpy as np

app = Flask(__name__)

#defining app routes
#main page of the api(call it home page)
@app.route("/")
def home():
    return "Hello World!"   

#api route for fake articles or news prediction
@app.route('/fpredict', methods=['POST'])
def FakePredict():
    try:
        json_ = request.json
        return jsonify({'prediction': json_})
    except:
        return jsonify({'trace': traceback.format_exc()})

#api routes for toxic comments prediction
@app.route('/cpredict', methods=['POST'])
def CommentPredict():
    try:
        json_ = request.json
        return jsonify({'prediction': json_})
    except:
        return jsonify({'trace': traceback.format_exc()})

if __name__ == '__main__':
    app.run(debug=False)


