const fs = require("fs");
const FILE = "./server/data/temp-data.json";

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

module.exports = {
    writeScheduleToFile,
    readScheduleFromFile,
};
