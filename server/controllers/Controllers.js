const db = require("../db");
const dataHelper = require("../data/DataHelper");

const getHistory = async (req, res) => {
    
    const date = new Date(req.body.date);

    try {
        const results = await db.query(`SELECT c.job_id, c.vehicle_id, c.driver_id, c.description_of_job,
        c.pickup_time, pickup.addr_name pickup_point, pickup.addr_lat pickup_latitude, pickup.addr_long pickup_longitude,
        c.destination_time, dest.addr_name destination, dest.addr_lat destination_latitude, dest.addr_long destination_longitude,
        c.empty_run, c.req_facilities
        FROM job C
        INNER JOIN address pickup ON (c.pickup_id = pickup.addr_id)
        INNER JOIN address dest ON (c.destination_id = dest.addr_id)
        where DATE(destination_time) = DATE($1)`,
            [`"${date.toLocaleDateString('fr-CA')}"`]
        );

        const waypoints = await db.query(`SELECT vehicle_id, time_stamp::time, latitude, longitude FROM history where DATE(time_stamp) = DATE($1)`, [`"${date.toLocaleDateString('fr-CA')}"`]);

        res.status(200).json({
            status: "success",
            data: {
                schedule: results.rows,
                waypoints: waypoints.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

const getSchedule = async (req, res) => {
    
    await dataHelper.getScheduledActivity();
    try {
        const results =
            await db.query(`SELECT c.job_id, c.vehicle_id, c.driver_id, c.description_of_job,
        c.pickup_time, pickup.addr_name pickup_point, pickup.addr_lat pickup_latitude, pickup.addr_long pickup_longitude,
        c.destination_time, dest.addr_name destination, dest.addr_lat destination_latitude, dest.addr_long destination_longitude,
        c.empty_run, c.req_facilities
        FROM job C
        INNER JOIN address pickup ON (c.pickup_id = pickup.addr_id)
        INNER JOIN address dest ON (c.destination_id = dest.addr_id)
        where DATE(destination_time)=DATE(NOW());
        ;`);

        const availableHistory = await db.query(`SELECT DISTINCT DATE(pickup_time), DATE(destination_time) FROM job;`)

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                schedule: results.rows,
                availableHistory: availableHistory.rows,
            },
        });

        dataHelper.writeScheduleToFile(results.rows);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getSchedule,
    getHistory,
};
