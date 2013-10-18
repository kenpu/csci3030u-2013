--
-- What are the lecture hours for Database courses in 2013 Fall?
--

.header on
.mode column

.width 8 35 6 6 3 20

select year || "/" || month as semester,
       title, 
       starthour || ":" || startmin as start, 
       endhour   || ":" || endmin   as end, 
       weekday, room
from courses natural join timetable
where title like '%database%' and year = 2013 and month = 9;

--
-- What are the lecture hours for databases courses ever?
--

select year || "/" || month as semester,
       title || " (" || schtype || ")" as title, 
       starthour || ":" || startmin as start, 
       endhour   || ":" || endmin   as end, 
       weekday, room
from courses natural join timetable
where title like '%database%'
order by year, month;



