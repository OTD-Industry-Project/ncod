const db = require("../db");
const dataHelper = require("../data/DataHelper");

const getAddressID = async (req, res) => {
    try {
        const results = await db.query(
            "SELECT * FROM address WHERE addr_id = $1",
            [req.params.id]
        );
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                address: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
};

const getSchedule = async (req, res) => {
    try {
        const results =
            await db.query(`SELECT c.job_id, c.vehicle_id, c.driver_id, c.description_of_job,
        c.pickup_time, pickup.addr_name pickup_point, pickup.addr_lat pickup_latitude, pickup.addr_long pickup_longitude,
        c.destination_time, dest.addr_name destination, dest.addr_lat destination_latitude, dest.addr_long destination_longitude,
        c.empty_run, c.req_facilities, c.routing_info
        FROM job C
        INNER JOIN address pickup ON (c.pickup_id = pickup.addr_id)
        INNER JOIN address dest ON (c.destination_id = dest.addr_id)
        ;`);
        // console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                schedule: results.rows,
            },
        });

        dataHelper.writeScheduleToFile(results.rows);
    } catch (err) {
        console.log(err);
    }
};


//API Calls

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
        console.log(results.rows);
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

        
        
        const addressId = await db.query(`INSERT INTO address (addr_name, addr_lat, addr_long)
        SELECT '${scheduledActivity[1].startlocation}',    ${scheduledActivity[1].startlatitude},    ${scheduledActivity[1].startlongitude}
        FROM address
        WHERE NOT EXISTS (SELECT addr_id FROM address WHERE addr_name ='${scheduledActivity[1].startlocation}')
        LIMIT 1 RETURNING addr_id;
        SELECT addr_id from address where addr_name ='${scheduledActivity[1].startlocation}';`);
        
        
        console.log("\n\n\n\n\n\n\n\n\n\n\n");
        console.log(addressId[1]);
        
    }
    catch (err) {
        console.log(err);
    }

    
};



module.exports = {
    getAddressID,
    getSchedule,
    GetGPSVehicles,
    GetScheduledActivity
};
