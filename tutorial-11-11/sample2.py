import sqlite3

db = sqlite3.connect("../uoit.sqlite")

c = db.cursor()
c.execute("""
    select code, prereq 
    from requirements 
""")
results = c.fetchall()

print """graph G {
    edge [len=2.5];
"""
for (code, prereq) in results:
    print '"%s" -- "%s";' % (code, prereq)
print "}"

db.close()
