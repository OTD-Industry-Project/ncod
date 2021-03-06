CREATE TABLE IF NOT EXISTS API (
	ID SERIAL NOT NULL,
  VehicleID INT,
  Description VARCHAR(255),
  StartTime TIMESTAMP WITHOUT TIME ZONE,
  StartLocation VARCHAR(255),
  StartLatitude REAL,
  StartLongitude REAL,
  EndTime TIMESTAMP WITHOUT TIME ZONE,
  EndLocation VARCHAR(255),
  EndLatitude REAL,
  EndLongitude REAL,
  EmptyRun BOOLEAN,
  DriverID VARCHAR(50),
  Required_Facilities VARCHAR(255),
  Time_Stamp TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),

  CONSTRAINT PK_API PRIMARY KEY ( ID )
);