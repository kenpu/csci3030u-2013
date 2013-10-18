--
-- Growth by courses per year
--

.header on
.mode column

.width 5 10

select year, count(distinct code) as count
from timetable
group by year
order by year;

--
-- Growth by head count
--
create temporary table T1 as
    select year, code, count(*) as freq
    from timetable
    where schtype = 'Lecture'
    group by year, code
    ;

create temporary table T2 as
    select year, code, sum(actual) as total
    from timetable
    where schtype = 'Lecture'
    group by year, code
    ;


select year, sum(total *1.0 / freq) / 8.5
from T1 natural join T2
group by year
order by year;
