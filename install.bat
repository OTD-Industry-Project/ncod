@echo off
set PATH=%PATH%;C:\Program Files\PostgreSQL\14\bin\
echo "press CTRL+C  at any time to cancel install"
cd server\db
psql -U postgres -f ./00-OTB_DB_setup.sql
cd..
cd..
call npm run i
call npm run dev