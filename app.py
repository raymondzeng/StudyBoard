from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/", methods = ["GET", "POST"])
def home():
    return render_template("CanvasTest.html")

if __name__ == '__main__':
    app.run(debug = True,host='0.0.0.0',port=7777)
