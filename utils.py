import shelve

canvas_img = ""

def getCanvasImg():
    print("gotten" + canvas_img)
    return canvas_img

def setCanvasImg(str):
    canvas_img = str
    print("set")
    return True

def addsheet(title, tags, data):
    sheets = shelve.open("sheets")
    data = {"ti":title, "ta":tags, "da":data}
    sheets[str(title)] = data
    sheets.close()
    return True

def returnsheets():
    sheets = shelve.open("sheets")
    keys = sheets.keys()
    print "Here are your keys " + str(keys)
    a = []
    for key in keys:
        a.append(sheets[key])
    sheets.close()
    return a


