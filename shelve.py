import shelve
shelve = shelve.open("users")

users = {}
sessions = {}

def getUserDict(name):
    dictnames = users.keys()
    for aname in dictnames:
        if (name == aname):
            return users[name]
