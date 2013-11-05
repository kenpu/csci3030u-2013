select year||"/"||month as semester, 
       title, 
       schtype as type, 
       weekday, 
       starthour || ":" || startmin as start,
       endhour * 60 + endmin - (starthour*60+startmin) as duration,
       room
from courses natural join timetable
where code = 'CSCI 3030U' and year = 2013 and month = 9;
