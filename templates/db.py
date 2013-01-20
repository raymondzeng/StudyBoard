import shelve
database = shelve.open("database")

users = {}
sessions = {}

def getUserInfo(name):
    dictnames = users.key()
    for aname in dictnames:
        if(aname == name):
            return users[name]

database['Users'] = users
database['Sessions'] = sessions
database.close()
