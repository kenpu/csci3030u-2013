drop table if exists friends;
drop table if exists lives;

create table friends (
    name varchar(100),
    friend varchar(100)
);

create table lives (
    name varchar(100),
    city varchar(100)
);

insert into friends values
    ('Mary', 'Joe'),
    ('Joe', 'Jill');

insert into lives values
    ('Mary', 'Oshawa'),
    ('Joe', 'Toronto'),
    ('Jack', 'Vancouver'),
    ('Jill', 'Montreal');

-- The city that can Mary travel to 
-- where there is always a friend of a friend ...

WITH RECURSIVE T (name, friend) AS (
    -- immediate friends of Mary
    select * from friends where name = 'Mary'
    union
    select T.name, friends.friend
    from T join friends on T.friend = friends.name
)
select lives.city
from T join lives on T.friend = lives.name
;

-- People she can try to befriend in order to 
-- travel to more cities

WITH RECURSIVE T (name, friend) AS (
    -- immediate friends of Mary
    select * from friends where name = 'Mary'
    union
    select T.name, friends.friend
    from T join friends on T.friend = friends.name
), missing_cities as (
    select distinct city from lives
    except
    select city from lives where name = 'Mary'
    except
    select lives.city
    from T join lives on T.friend = lives.name
) select name from lives natural join missing_cities
;