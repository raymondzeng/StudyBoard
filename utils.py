import shelve

sheets = shelve.open("sheets")

def addsheet(title, tags, data):
    sheets[title]=[title, tags, data]
    return true

def returnsheets():
    keys = sheets.keys()
    print "Here are your keys " + str(keys)
    a = []
    for key in keys:
        a.append(sheets(key))
    return a
