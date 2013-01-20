import shelve

database = shelve.open("database")
users = {}
sessions = {}

def getUserDict(name):
    dictnames = users.keys()
    for aname in dictnames:
        if (name == aname):
            return users[name]

def addUser(name, session):
    users[name] = session

database['Users'] = users
database['Sessions'] = sessions
database.close()
