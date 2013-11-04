import sqlite3

data = [
    ('Mary', 'Computer Science', 87),
    ('John', 'Computer Science', 85.5)
]
db = sqlite3.connect("sample.sqlite")
cursor = db.cursor()
cursor.execute('''
    create table if not exists enrolment (
        name text,
        course text,
        grade float
    )''')
for d in data:
    cursor.execute("insert into enrolment values('%s', '%s', %f)" % d)
db.commit()

cursor.execute("select course, avg(grade) from enrolment group by course")
results = cursor.fetchall()

for row in results:
    print "Course '%s' average is '%.2f'" % (row[0], row[1])

cursor.close()
db.close()
