/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Thu Jan 13 2022
 * -----
 * Last Modified: Sat Jan 22 2022
 */

/** @module DataHelper */

const fs = require("fs");

/**
 * @const {string} FILE filepath of temp file
 */
const FILE = "./server/data/temp-data.json";
const db = require("../db");


/**
 * @function writeScheduleToFile
 * @description Caches the day's schedule to disk. Writes the raw schedule to a .JSON file
 * @param {array} schedule Array of objects (JSON data) 
 */
const writeScheduleToFile = (schedule) => {
    
    let data = JSON.stringify(schedule, null, 2);
    fs.writeFile(FILE, data, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync(FILE, "utf8"));
        }
    });
};

/**
 * @function readScheduleFromFile
 * @async
 * @description Reads the cached schedule from file
 * @returns {Object} JSON object of day's schedule
 */
const readScheduleFromFile = async () => {
    fs.readFile(FILE, "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return null;
        }
        try {
            const schedule = JSON.parse(jsonString);
            console.log(schedule);
            return schedule;
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
};

/**
 * @function getScheduledActivity
 * @async
 * @description Reads the cached schedule from file
 * @returns {Object} JSON object of day's schedule
 */
const getScheduledActivity = async () => {
    try {
        const results = await db.query("SELECT * FROM api WHERE DATE(endtime)=DATE(NOW());");

        let scheduledActivity = [];
        results.rows.forEach(row => {
            scheduledActivity.push(row);
        })
        let dailySchedule = {};
        let pickup_id = []; //to store matched id in the Address table
        let dest_id = []; //to store matched id in the Address table


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
        //maps the order of the jobs insert statement, to results of the GetSheduledActivity return
        for (i = 0; i < scheduledActivity.length; i++) {

            dailySchedule[i] = (scheduledActivity[i].vehicleid + ", '" + scheduledActivity[i].driverid + "', '" +
                (scheduledActivity[i].starttime.toISOString().substring(0, 10) + " " + scheduledActivity[i].starttime.toLocaleTimeString(['en-AU'], { hour12: false })) + "', " + pickup_id[i] + ", '" +
                (scheduledActivity[i].endtime.toISOString().substring(0, 10) + " " + scheduledActivity[i].endtime.toLocaleTimeString(['en-AU'], { hour12: false })) + "', " + dest_id[i]);

                //converting time stamp to date format used in the database
                var dateCheck = (scheduledActivity[i].starttime.toISOString().substring(0, 10) + " " + scheduledActivity[i].starttime.toLocaleTimeString(['en-AU'], { hour12: false }));

            //inserting values into jobs table
            const jobInsert = await db.query(`INSERT INTO job (vehicle_id,driver_id,pickup_time,pickup_id,destination_time,destination_id) SELECT ${dailySchedule[i]}
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
    writeScheduleToFile,
    readScheduleFromFile,
    getScheduledActivity,
};
