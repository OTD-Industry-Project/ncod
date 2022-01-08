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
    GetGPSVehicles,
    GetScheduledActivity
}