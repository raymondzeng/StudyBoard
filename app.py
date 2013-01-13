from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/", methods = ["GET", "POST"])
def home():
    return render_template("Canvas.html")

@app.route("/index.html", methods = ["GET", "POST"])
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug = True)
