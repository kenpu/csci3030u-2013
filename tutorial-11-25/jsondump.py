import sqlite3
import json

data = {}
db = sqlite3.connect("../uoit.sqlite")
c = db.cursor()
for table in ["courses", "offers"]:
    c.execute("select * from %s" % table)
    data[table] = c.fetchall()

print json.dumps(data)

db.close()
