-- Usage: 
--    psql -U <username> -f <C:\some\file\path\ncod\server\db\otd-db.sql>
-- or navigate into C:\some\file\path\ncod\server\db\ and run as:
--    psql -U <username> -f ./otd-db.sql

CREATE DATABASE test;

\c test

-- Install Extensions

CREATE EXTENSION PostGIS; 
CREATE EXTENSION pgRouting;

--Create Tables

CREATE TABLE IF NOT EXISTS ADDRESS (
  addr_ID SERIAL NOT NULL,
  addr_Name VARCHAR(100),
  addr_Lat DECIMAL(11,6),
  addr_Long DECIMAL(11,6),
  addr_Location GEOGRAPHY(POINT,4326) GENERATED ALWAYS AS(ST_SetSRID(ST_MakePoint(addr_Long, addr_Lat), 4326)) STORED,
  CONSTRAINT PK_ADDRESS PRIMARY KEY (addr_ID)
);

CREATE TABLE IF NOT EXISTS VEHICLE (
  vehicle_id INT NOT NULL, 
  display_name VARCHAR(10) NOT NULL, 
  rego_plate VARCHAR(8), 
  capacity INT, 
  facilities VARCHAR(255),
  CONSTRAINT PK_VEHICLE PRIMARY KEY (vehicle_id)
);

CREATE TABLE IF NOT EXISTS HISTORY (
  vehicle_id INT NOT NULL, 
  time_stamp timestamp without time ZONE NOT NULL, 
  latitude DECIMAL(11,6), 
  longitude DECIMAL(11,6), 
  ignition BOOLEAN, 
  speed DECIMAL(11,6), 
  bearing VARCHAR(20),
  CONSTRAINT PK_HISTORY PRIMARY KEY ( vehicle_id, time_stamp ),
  CONSTRAINT FK_VEHICLE FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id)
);

CREATE TABLE IF NOT EXISTS JOB (
  job_id SERIAL NOT NULL,
  vehicle_id INT, 
  driver_id VARCHAR(50), 
  description_of_job VARCHAR(255),
  pickup_time time without time zone,
  pickup_id INT,
  destination_time time without time zone,
  destination_id INT,
  vehicle_to_stay BOOLEAN NOT NULL, 
  single_journey BOOLEAN NOT NULL, 
  empty_run BOOLEAN NOT NULL,
  req_facilities VARCHAR(255),  
  routing_info TEXT,
  CONSTRAINT PK_JOB PRIMARY KEY ( job_id ),
  CONSTRAINT FK_VEHICLE FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id),
  CONSTRAINT FK_PICKUP FOREIGN KEY (pickup_id) REFERENCES ADDRESS(addr_ID),
  CONSTRAINT FK_DESTINATION FOREIGN KEY (destination_id) REFERENCES ADDRESS(addr_ID)
);