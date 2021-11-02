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
  addr_Num VARCHAR(5),
  addr_Street VARCHAR(50),
  addr_Suburb VARCHAR(50),
  addr_State VARCHAR(3),
  addr_Lat DECIMAL(11,6),
  addr_Long DECIMAL(11,6),
  addr_Location GEOGRAPHY(POINT,4326) GENERATED ALWAYS AS(ST_SetSRID(ST_MakePoint(addr_Long, addr_Lat), 4326)) STORED,
  CONSTRAINT PK_ADDRESS PRIMARY KEY (addr_ID)
);

CREATE TABLE IF NOT EXISTS PICKUP (
  pickup_id INT NOT NULL, 
  address_id INT, 
  pickup_notes VARCHAR(255),
  CONSTRAINT PK_PICKUP PRIMARY KEY (pickup_id),
  CONSTRAINT FK_PICKUP FOREIGN KEY (address_id) REFERENCES ADDRESS(addr_ID)
);

CREATE TABLE IF NOT EXISTS DESTINATION (
  destination_id INT NOT NULL, 
  address_id INT, 
  destination_notes VARCHAR(255),
  CONSTRAINT PK_DESTINATION PRIMARY KEY (destination_id),
  CONSTRAINT FK_DESTINATION FOREIGN KEY (address_id) REFERENCES ADDRESS(addr_ID)
);

CREATE TABLE IF NOT EXISTS BOOKING (
  booking_id SERIAL NOT NULL, 
  pickup_id INT, 
  pickup_time time without time zone, 
  destination_id INT, 
  destination_time time without time zone, 
  vehicle_to_stay BOOLEAN NOT NULL, 
  single_journey BOOLEAN NOT NULL, 
  empty_vehicle BOOLEAN NOT NULL,
  CONSTRAINT PK_BOOKING PRIMARY KEY (booking_id),
  CONSTRAINT FK_PICKUP FOREIGN KEY (pickup_id) REFERENCES PICKUP(pickup_id),
  CONSTRAINT FK_DESTINATION FOREIGN KEY (destination_id) REFERENCES DESTINATION(destination_id)
);

CREATE TABLE VEHICLE (
  vehicle_id INT NOT NULL, 
  display_name VARCHAR(10) NOT NULL, 
  rego_plate VARCHAR(8) NOT NULL, 
  capacity INT NOT NULL, 
  facilities VARCHAR(100)[],
  CONSTRAINT PK_VEHICLE PRIMARY KEY (vehicle_id)
);

CREATE TABLE IF NOT EXISTS JOB (
  vehicle_id INT, 
  booking_id INT, 
  driver_id INT, 
  description_of_job VARCHAR(255), 
  routing_info GEOGRAPHY[],
  CONSTRAINT PK_JOB PRIMARY KEY ( vehicle_id, booking_id ),
  CONSTRAINT FK_VEHICLE FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id),
  CONSTRAINT FK_BOOKING FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id)
);

CREATE TABLE HISTORY (
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