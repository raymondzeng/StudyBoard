from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/", methods = ["GET", "POST"])
def index():
    return render_template("home.html")

@app.route("/home.html", methods = ["GET", "POST"])
def generic():
    return render_template("home.html")

@app.route("/whiteboard.html", methods = ["GET", "POST"])
def whiteboard():
    return render_template("whiteboard.html")

@app.route("/sheets.html", methods = ["GET", "POST"])
def sheets():
    return render_template("sheets.html")

@app.route("/credits.html", methods = ["GET", "POST"])
def credits():
    return render_template("credits.html")

@app.route("/<name>", methods = ["GET", "POST"])
def home():
    return render_template("home.html")

if __name__ == '__main__':
    app.run(debug = True)
