cd data

# find list of dates that have votes
psql -h pellefant.db.elephantsql.com -p5432 $ELPH_TABLE $ELPH_TABLE -c "\copy (select distinct timestamp::date from vote) to dates.csv csv header"

# back up full database, one per day
tail -n +2 dates.csv | while read line ; do echo "backup for: $line"; psql -h pellefant.db.elephantsql.com -p5432 $ELPH_TABLE $ELPH_TABLE -c "\copy (select * from vote where timestamp::date = date '$line') to data-$line.csv csv header"; done


# extract comments only
python -m ../extractcomments.py data-*csv

cd ..
