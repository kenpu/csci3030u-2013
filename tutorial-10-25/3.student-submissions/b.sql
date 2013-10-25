SELECT year, count(actual) FROM timetable WHERE code LIKE '%CSCI%' GROUP BY year ORDER BY year;
