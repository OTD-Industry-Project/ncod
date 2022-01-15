/**@module ScheduleHelper */

/**
 * Takes a bus and time and returns an approximate status
 * @function getStatus
 * @param {Object} bus Bus object 
 * @param {date} currentTime Datetime object of current time 
 * @returns {string} The calculated status of the bus
 */
function getStatus(bus, currentTime, tracking) {
    const pickup = new Date(bus.pickup_time);
    const dest = new Date(bus.destination_time);

    const pickupMinutes = pickup.getHours() * 60 + pickup.getMinutes();
    const destMinutes = dest.getHours() * 60 + dest.getMinutes();
    const currentMinutes =
        currentTime.getHours() * 60 + currentTime.getMinutes();

    let lastMinutes = 0;

    tracking &&
        tracking.forEach((b) => {
            // console.log(b[bus.vehicle_id]);
            if (b[bus.vehicle_id]) {
                const indexOfLastEntry = b[bus.vehicle_id].length - 1;
                const tmp =
                    b[bus.vehicle_id][indexOfLastEntry].time_stamp.split(":");

                const tempDate = dest;
                tempDate.setHours(tmp[0], tmp[1]);
                lastMinutes = tempDate.getHours() * 60 + tempDate.getMinutes();

                // const trackingMinutes = (new Date(b[bus.vehicle_id][indexOfLastEntry].time_stamp).getHours() * 60) + new Date(b[bus.vehicle_id][indexOfLastEntry].time_stamp).getMinutes();
            }
        });

    if (destMinutes < currentMinutes && currentMinutes < lastMinutes) {
        return "Delayed";
    } else if (pickupMinutes > currentMinutes) {
        return "Pre Departed";
    } else if (currentMinutes > pickupMinutes && destMinutes > currentMinutes) {
        return "On Time";
    } else {
        return "Completed";
    }
}

/**
 * Takes a raw schedule and calculates a status for each bus and returns new schedule
 * @param {Object} rawData Raw schedule data
 * @param {date} time Datetime object
 * @returns {Object} With an appended status to each bus
 */ 
export const calculatedSchedule = (rawData, time, tracking = null) => {
    let newData = rawData;

    newData.forEach((bus) => {
        bus.status = getStatus(bus, time, tracking);
    });

    return newData;
};
