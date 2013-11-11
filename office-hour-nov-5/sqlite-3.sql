select case when dept = 'MATH' then "Mathematics"
            when dept = 'BUSI' then "Business"
            when dept = 'CSCI' then "Computer"
            when dept = 'INFR' then "Information"
            when dept = 'SCIE' then "Science"
            else dept
        end as keyword,
        DepartmentCount
from(
    select substr(code, 1, 4) as dept, 
           count(distinct code) as DepartmentCount
    from timetable
    where (code like 'math%' 
        or code like 'busi%' 
        or code like 'csci%' 
        or code like 'infr%' 
        or code like 'sci%')
    group by dept
);
