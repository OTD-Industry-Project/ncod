@echo off
set PATH=%PATH%;C:\Program Files\PostgreSQL\14\bin\
echo
psql -U postgres -f ./00-OTB_DB_setup.sql