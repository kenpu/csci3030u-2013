import sqlite3
import pylab
import sys

db = sqlite3.connect(sys.argv[1])
sql = open(sys.argv[2]).read()

cursor = db.cursor()
cursor.execute(sql)
result = cursor.fetchall()

years     = [x[0] for x in result]
headcount = [x[1] for x in result]

pylab.figure()
pylab.plot(years, headcount)
pylab.show()
