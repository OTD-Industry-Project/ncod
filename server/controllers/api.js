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










module.exports = {
    getAllAddress
};