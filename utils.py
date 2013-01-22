import shelve

sheets = shelve.open("sheets")

def addsheet(title, tags, data):
    data = {"ti":title, "ta":tags, "da":data}
    sheets[str(title)] = data
    return True

def returnsheets():
    keys = sheets.keys()
    print "Here are your keys " + str(keys)
    a = []
    for key in keys:
        a.append(sheets[key])
    return a
