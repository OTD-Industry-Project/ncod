/**@module ScheduleHelper */

/**
 * Takes a bus and time and returns an approximate status
 * @function getStatus
 * @param {Object} bus Bus object 
 * @param {date} currentTime Datetime object of current time 
 * @returns {string} The calculated status of the bus
 */
function getStatus(bus, currentTime) {
    const pickup = new Date(bus.pickup_time);
    const dest = new Date(bus.destination_time);

    const pickupMinutes = (pickup.getHours() * 60) + pickup.getMinutes();
    const destMinutes = (dest.getHours() * 60) + dest.getMinutes();
    const currentMinutes = (currentTime.getHours() * 60) + currentTime.getMinutes();


    if (pickupMinutes > currentMinutes) {
        return 'Pre Departed';
    } 

    if (currentMinutes > pickupMinutes && destMinutes > currentMinutes) {
        return 'On Time';
    }

    if (destMinutes < currentMinutes) {
        if (Math.abs(destMinutes, currentMinutes) < 30) {
            return 'Delayed';
        } else {
            return 'Completed'
        }
    } else {
        return 'On Time';
    }  
}

/**
 * Takes a raw schedule and calculates a status for each bus and returns new schedule
 * @param {Object} rawData Raw schedule data
 * @param {date} time Datetime object
 * @returns {Object} With an appended status to each bus
 */
export const calculatedSchedule = (rawData, time) => {
    
    let newData = rawData;

    newData.forEach(bus => {
        bus.status = getStatus(bus, time);
    });
    
    
    return newData;
}