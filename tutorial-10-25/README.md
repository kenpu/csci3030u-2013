# Test our database installation.

    manually start database managers,
    create some database,
    insert some data,
    and show them.

## SQLite

    For sqlite, it's easy.

## Postgres

    1. sudo su postgres
    2. createuser -s <username>
    3. exit shell as postgres
    4. createdb <username>
    5. createdb uoit
    6. psql -d uoit

# Try out automation

    author some SQL statements,
    and run time from shell.

## SQLite
    
    sqlite3 mydb.sqlite < mysql.sql

## Postgres

    psql -d mydb < mysql.sql

# Try out the assignment database

    - download the files
    - load into sqlite3
        gunzip uoit.sqlite.gz
    - load into postgres
        gunzip uoit.dump.sql.gz
        psql -d <database> < uoit.dump.sql.gz > output

# Do your part...
