# SteamVoat
Voting app for the classroom, browser based with Spring and AngularJS



# Assumptions

- time between votes is large enough to distinguish questions
- an optional reset button is front end only (screen goes to grey)
- there is a timeout that does the reset for you.
- we always take the most recent comment within a question window
- question window is based on all responses to a question in a class, the
  window in which (almost) all responses came in.
# Running and debugging

## connect to postgres:


```
psql -h pellefant.db.elephantsql.com -p5432 $ELPH_TABLE $ELPH_TABLE
# set .pgpass file to password
\copy vote to 'dump.csv' csv header
\copy (select * from vote where timestamp::date = date '2016-03-24') to 'data-2016-03-24.csv' csv header
```

In an intermediate pipeline, we will extract the comments for each day as such:

```
psql -h pellefant.db.elephantsql.com -p5432 $ELPH_TABLE $ELPH_TABLE -c "\copy (select distinct timestamp::date from vote) to dates.csv csv header"
tail -n +2 dates.csv | while read line ; do echo "working on: $line"; done
tail -n +2 dates.csv | while read line ; do echo "working on: $line"; psql -h pellefant.db.elephantsql.com -p5432 $ELPH_TABLE $ELPH_TABLE -c "\copy (select * from vote where timestamp::date = date '$line') to data-$line.csv csv header"; done
```


# Front end hacking

Fire up 'node.js', but make sure to include the bower components first:
```
env NODE_PATH=bower_components  node
moment = require('moment/moment')
moment(1).format()
```


# Local test database vs. copy of real database

Normally, the app spins up with H2 locally and with elephantSql (postgres) on PWS.

You can also test the app against a copy of the local database by following these steps:
1. remove H2 from pom.xml (commenting works)
1. Add postgresql to pom.xml
1. Change application.properties to listen to local db (normally commented out, should really have a second property file)
1. Create local postgress from a backup provided by elephantSQL:
```
   mkdir localdb
   initdb localdb/ -E UTF8
   pg_ctl -D localdb/ -l localdb/logfile start
   createdb pivotal
   psql # test whether it works
   lzop -cd <BACKUPNAME> | psql
```
