const db = require("../db");

const getAllAddress = async(req, res) => {
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

const getAddressID = async(req, res) => {
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

const getAllDrivers = async(req, res) => {
    try {
        const results = await db.query("SELECT * FROM drivers");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                drivers: results.rows,
            },
        });
    } 
    catch (err) {
        console.log(err);
    }
};

const getDriverID = async(req, res) => {
    try {
        const results = await db.query("SELECT * FROM drivers WHERE driver_id = $1", [req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                driver: results.rows[0],
            },
        });
    } 
    catch (err) {
        console.log(err);
    }
};

const insertDriver = async(req, res) => {
    try {
        const results = await db.query("INSERT INTO drivers (driver_name) SELECT 'boob' FROM drivers WHERE NOT EXISTS (SELECT driver_id FROM drivers WHERE driver_name ='boob') LIMIT 1 RETURNING driver_id;");
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                driver: results.rows[0],
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
    getAllDrivers,
    getDriverID,
    insertDriver
};