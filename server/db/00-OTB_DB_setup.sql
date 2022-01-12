-- Usage: 
--    psql -U <username> -f <C:\some\file\path\ncod\server\db\00-OTB_DB_setup.sql>
-- or navigate into C:\some\file\path\ncod\server\db\ and run as:
--    psql -U <username> -f ./00-OTB_DB_setup.sql

CREATE DATABASE test;

\c test

--Create Tables

CREATE TABLE IF NOT EXISTS ADDRESS (
  addr_id SERIAL NOT NULL,
  addr_name VARCHAR(100),
  addr_lat DECIMAL(11,6),
  addr_long DECIMAL(11,6),
  CONSTRAINT PK_ADDRESS PRIMARY KEY (addr_ID)
);

CREATE TABLE IF NOT EXISTS VEHICLE (
  vehicle_id INT NOT NULL, 
  display_name VARCHAR(10), 
  rego_plate VARCHAR(8),  
  facilities VARCHAR(255),
  CONSTRAINT PK_VEHICLE PRIMARY KEY (vehicle_id)
);

CREATE TABLE IF NOT EXISTS JOB (
  job_id SERIAL NOT NULL,
  vehicle_id INT, 
  driver_id VARCHAR(50), 
  description_of_job VARCHAR(255),
  pickup_time TIMESTAMP WITHOUT TIME ZONE,
  pickup_id INT,
  destination_time TIMESTAMP WITHOUT TIME ZONE,
  destination_id INT,
  empty_run BOOLEAN,
  req_facilities VARCHAR(255),  
  routing_info TEXT,
  CONSTRAINT PK_JOB PRIMARY KEY ( job_id ),
  CONSTRAINT FK_VEHICLE FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id),
  CONSTRAINT FK_PICKUP FOREIGN KEY (pickup_id) REFERENCES ADDRESS(addr_ID),
  CONSTRAINT FK_DESTINATION FOREIGN KEY (destination_id) REFERENCES ADDRESS(addr_ID)
);

CREATE TABLE IF NOT EXISTS HISTORY (
  vehicle_id INT NOT NULL, 
  time_stamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  job_id INT NOT NULL, 
  latitude DECIMAL(11,6), 
  longitude DECIMAL(11,6), 
  ignition BOOLEAN, 
  speed DECIMAL(11,6), 
  CONSTRAINT PK_HISTORY PRIMARY KEY ( vehicle_id, time_stamp ),
  CONSTRAINT FK_VEHICLE FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id),
  CONSTRAINT FK_JOB FOREIGN KEY (job_id) REFERENCES JOB(job_id)
);

\i 01-address_insert.sql
\i 02-vehicles_insert.sql
\i 03-jobs_insert.sql
\i 04-history_insert.sql
\i 05-api_table.sql
\i 06-api_dummy_schedule.sql