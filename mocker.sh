#!/bin/sh
cd scripts/mock
mongo = ${mongodump}
if [[ $mongo == 0 ]]
then
echo "mongodump command doesn't exist. start downloading"
brew tap mongodb/brew
brew install mongodb-database-tools
fi
./mgodatagen -f config.json
mongodump --host 127.0.0.1 --port=27017  --db mock --out ~/Desktop/dump