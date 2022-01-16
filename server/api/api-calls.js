/** @module api-calls  */


//API Calls
const db = require("../db");

/**
 * @function GetGPSVehicles
 * @async
 * @description queries database for Vehicle data and returns to client 
 * @param {Object} req Http request
 * @param {Object} res Http response
 * @returns {Object} Http response with data and a status code attached
 */
const GetGPSVehicles = async (req, res) => {
    try {
        const GPSVehicle = await db.query("SELECT vehicle_id, display_name, rego_plate FROM vehicle;");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            data: {
                GPSVehicles: GPSVehicle.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
};

/**
 * @function GetScheduledActivity
 * @async
 * @description queries database for scheduled activity data and returns to client 
 * @param {Object} req Http request
 * @param {Object} res Http response
 * @returns {Object} Http response with data and a status code attached
 */
const GetGPSLocationHistory = async (req, res) => {
    
    const date = new Date(req.body.date);

    try {
        const locationHistory = await db.query(`SELECT latitude, longitude, ignition, speed, time_stamp FROM history
        WHERE (DATE(time_stamp) BETWEEN ($1) AND ($2)) AND vehicle_id=($3);`, [`"${date.toLocaleDateString('fr-CA')}", "${date.toLocaleDateString('fr-CA')}", vehicle`]);

        res.status(200).json({
            status: "success",
            data: {
                locationHistory: locationHistory.rows
            },
        });
    } catch (err) {
        console.log(err);
    }
};

const GetCurrentGPSSnapshot = async (req, res) => {
    
    const date = new Date(req.body.date);

    try {
        const currentGPSShot = await db.query(`SELECT vehicle_id, latitude, longitude, ignition, speed, time_stamp::time 
        FROM history where DATE(time_stamp) = DATE(now());`);

        res.status(200).json({
            status: "success",
            data: {
                currentGPSShot: currentGPSShot.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

const GetScheduledVehicles = async (req, res) => {
    try {
        const scheduledVehicles = await db.query("SELECT vehicle_id, display_name, facilities FROM vehicle;");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            data: {
                scheduledVehicles: scheduledVehicles.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
};

const GetScheduledActivity = async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM api WHERE DATE(endtime)=DATE(NOW());");
        res.status(200).json({
            status: "success",
            data: {
                schedule: results.rows,
            },
        });

        let scheduledActivity = [];
        results.rows.forEach(row => {
            scheduledActivity.push(row);
        })
        let dailySchedule = {};
        let pickup_id = [];
        let dest_id = [];


        //looping over schedule, inserting new pickup address in database if not exist, returning matching ID
        for (i = 0; i < scheduledActivity.length; i++) {
            const pickupId = await db.query(`INSERT INTO address (addr_name, addr_lat, addr_long)
        SELECT '${scheduledActivity[i].startlocation}',    ${scheduledActivity[i].startlatitude},    ${scheduledActivity[i].startlongitude}
        FROM address
        WHERE NOT EXISTS (SELECT addr_id FROM address WHERE addr_name ='${scheduledActivity[i].startlocation}')
        LIMIT 1 RETURNING addr_id;
        SELECT addr_id from address where addr_name ='${scheduledActivity[i].startlocation}';`);

            var { rows: [{ addr_id }] } = pickupId[1];
            pickup_id[i] = addr_id;
        }


        //looping over schedule, inserting new destination address in database if not exist, returning matching ID
        for (i = 0; i < scheduledActivity.length; i++) {
            const destId = await db.query(`INSERT INTO address (addr_name, addr_lat, addr_long)
        SELECT '${scheduledActivity[i].endlocation}',    ${scheduledActivity[i].endlatitude},    ${scheduledActivity[i].endlongitude}
        FROM address
        WHERE NOT EXISTS (SELECT addr_id FROM address WHERE addr_name ='${scheduledActivity[i].endlocation}')
        LIMIT 1 RETURNING addr_id;
        SELECT addr_id from address where addr_name ='${scheduledActivity[i].endlocation}';`);

            var { rows: [{ addr_id }] } = destId[1];
            dest_id[i] = addr_id;
        }

        for (i = 0; i < scheduledActivity.length; i++) {

            dailySchedule[i] = (scheduledActivity[i].vehicleid + ", '" + scheduledActivity[i].driverid + "', '" +
                (scheduledActivity[i].starttime.toISOString().substring(0, 10) + " " + scheduledActivity[i].starttime.toLocaleTimeString(['en-AU'], { hour12: false })) + "', " + pickup_id[i] + ", '" +
                (scheduledActivity[i].endtime.toISOString().substring(0, 10) + " " + scheduledActivity[i].endtime.toLocaleTimeString(['en-AU'], { hour12: false })) + "', " + dest_id[i]
                + ", " + scheduledActivity[i].routing_info);

            var dateCheck = (scheduledActivity[i].starttime.toISOString().substring(0, 10) + " " + scheduledActivity[i].starttime.toLocaleTimeString(['en-AU'], { hour12: false }));

            //inserting values into jobs table
            const jobInsert = await db.query(`INSERT INTO job (vehicle_id,driver_id,pickup_time,pickup_id,destination_time,destination_id,routing_info) SELECT ${dailySchedule[i]}
            FROM job
            WHERE NOT EXISTS (SELECT vehicle_id FROM job WHERE pickup_time = '"${dateCheck}"')
            LIMIT 1;
            select * from job where DATE(destination_time)=DATE(NOW());`);
        }

    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {
    GetGPSVehicles,
    GetGPSLocationHistory,
    GetCurrentGPSSnapshot,
    GetScheduledVehicles,
    GetScheduledActivity
}