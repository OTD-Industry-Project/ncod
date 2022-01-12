@echo off
set PATH=%PATH%;C:\Program Files\PostgreSQL\14\bin\
echo
cd server\db
psql -U postgres -f ./00-OTB_DB_setup.sql
cd..
cd..
npm run i
npm run dev