//API Calls
const db = require("../db");

const GetGPSVehicles = async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM vehicle");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                address: results.rows,
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
        console.log(scheduledActivity[0].driverid);

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
            //await db.query(`INSERT INTO test (test) VALUES ('${addr_id}');`); //inserting values into test table
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

            dailySchedule[i] = (scheduledActivity[i].vehicleid + ", " + scheduledActivity[i].driverid + ", " + 
            (scheduledActivity[i].starttime.toLocaleDateString() + " " + scheduledActivity[i].starttime.toLocaleTimeString([], {hour12: false})) + ", " + pickup_id[i] + ", " + 
            (scheduledActivity[i].endtime.toLocaleDateString() + " " + scheduledActivity[i].endtime.toLocaleDateString([], {hour12: false})) + ", " + dest_id[i]);

                // await db.query(`INSERT INTO job (vehicle_id,driver_id,pickup_time,pickup_id,destination_time,destination_id) 
                // VALUES ('${dailySchedule[i]}');`); //inserting values into jobs table

        }

        console.log(dailySchedule);

    }
    catch (err) {
        console.log(err);
    }


};

module.exports = {
    GetGPSVehicles,
    GetScheduledActivity
}