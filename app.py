import shelve
import utils
from utils import getCanvasImg, setCanvasImg
from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
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
    return render_template("sheets.html", sheets=utils.returnsheets())

@app.route("/addsheet", methods = ["GET", "POST"])
def addsheet():
    title = request.form["title"]
    tags = request.form["tags"]
    data = request.form["sheetData"]
    name = str(request.form["fbname"])
    if name == "undefined":
        name = "Anonymous User (No Facebook Login)"
    utils.addsheet(title, tags, data, name)
    return render_template("sheets.html", sheets=utils.returnsheets())

@app.route("/credits.html", methods = ["GET", "POST"])
def credits():
    return render_template("credits.html")

@app.route("/<name>", methods = ["GET", "POST"])
def home(name):
    return render_template("home.html")

@app.route("/setImg", methods = ["GET", "POST"])
def set_String():
    s = request.args.get('s','')
    return jsonify(result=setCanvasImg(s))

@app.route("/getImg", methods = ["GET", "POST"])
def get_String():
    return jsonify(result=getCanvasImg())
                   
if __name__ == '__main__':
    app.run(debug = True,host='0.0.0.0',port=7175)
