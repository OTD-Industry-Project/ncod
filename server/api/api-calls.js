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


        for (i = 0; i < scheduledActivity.length; i++) {
            console.log("\n"+scheduledActivity[i].startlocation);
            const pickupId = await db.query(`INSERT INTO address (addr_name, addr_lat, addr_long)
        SELECT '${scheduledActivity[i].startlocation}',    ${scheduledActivity[i].startlatitude},    ${scheduledActivity[i].startlongitude}
        FROM address
        WHERE NOT EXISTS (SELECT addr_id FROM address WHERE addr_name ='${scheduledActivity[i].startlocation}')
        LIMIT 1 RETURNING addr_id;
        SELECT addr_id from address where addr_name ='${scheduledActivity[i].startlocation}';`);

            console.log(pickupId[1].rows);
        }

        for (i = 0; i < scheduledActivity.length; i++) {
            console.log("\n"+scheduledActivity[i].endlocation);
            const destId = await db.query(`INSERT INTO address (addr_name, addr_lat, addr_long)
        SELECT '${scheduledActivity[i].endlocation}',    ${scheduledActivity[i].endlatitude},    ${scheduledActivity[i].endlongitude}
        FROM address
        WHERE NOT EXISTS (SELECT addr_id FROM address WHERE addr_name ='${scheduledActivity[i].endlocation}')
        LIMIT 1 RETURNING addr_id;
        SELECT addr_id from address where addr_name ='${scheduledActivity[i].endlocation}';`);

            console.log(destId[1].rows);
        }

    }
    catch (err) {
        console.log(err);
    }


};

module.exports = {
    GetGPSVehicles,
    GetScheduledActivity
}