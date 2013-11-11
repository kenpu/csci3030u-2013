import sqlite3
import pylab
import math

#
# query the database
#

db = sqlite3.connect("../uoit.sqlite")
cursor = db.cursor()

cursor.execute("""
    select year, 
           case when year=2014 then 2*count(distinct code)
                else count(distinct code) 
           end 
    from timetable where code like 'csci%' 
    group by year
    """)
result = cursor.fetchall()
X = [row[0] for row in result]
Y = [row[1] for row in result]

pylab.figure()
pylab.bar(X, Y)
pylab.savefig("a.png")
pylab.show()
