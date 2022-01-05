const db = require("../db");

const getAllAddress = async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM address");
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

const getAddressID = async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM address WHERE addr_id = $1", [req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                address: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
};

const getSchedule = async (req, res) => {
    try {
        const results = await db.query(
            `SELECT c.job_id, c.vehicle_id, c.driver_id, c.description_of_job,
            c.pickup_time, pickup.addr_name pickup_point, pickup.addr_lat pickup_latitude, pickup.addr_long pickup_longitude,
            c.destination_time, dest.addr_name destination, dest.addr_lat destination_latitude, dest.addr_long destination_longitude,
            c.empty_run, c.req_facilities, c.routing_info
            FROM job c
            
            INNER JOIN address pickup ON (c.pickup_id = pickup.addr_id)
            INNER JOIN address dest ON (c.destination_id = dest.addr_id)
            ;`);
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            data: {
                schedule: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
};








module.exports = {
    getAllAddress,
    getAddressID,
    getSchedule
};