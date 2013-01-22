import shelve
wb = shelve.open("whiteboard")
wb['canvas_img'] = ''
wb.close()

def getCanvasImg():
    wb = shelve.open("whiteboard")
    return wb['canvas_img'] 

def setCanvasImg(str):
    wb = shelve.open("whiteboard")
    wb['canvas_img'] = str
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


#print(getCanvasImg())
#setCanvasImg('hello')
#print(getCanvasImg())
