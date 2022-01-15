/**@module ScheduleHelper */

/**
 * Takes a bus and time and returns an approximate status
 * @function getStatus
 * @param {Object} bus Bus object 
 * @param {date} currentTime Datetime object of current time 
 * @param {Object} tracking Provided tracking history waypoints to fetch accurate status's. Handles null values.
 * @returns {string} The calculated status of the bus
 */
function getStatus(bus, currentTime, tracking) {
    
    // Convert string timestamps to date object to access more methods.
    const pickup = new Date(bus.pickup_time);
    const dest = new Date(bus.destination_time);

    // Convert time of day to minutes value for pickup, destination and current time.
    const pickupMinutes = pickup.getHours() * 60 + pickup.getMinutes();
    const destMinutes = dest.getHours() * 60 + dest.getMinutes();
    const currentMinutes =
        currentTime.getHours() * 60 + currentTime.getMinutes();

    // If history tracking is provided
    let lastMinutes = 0;

    // If tracking is provided, loop through each entry.
    tracking &&
        tracking.forEach((b) => {
            
            // Match the scheduled bus data to its corresponding history tracking data
            if (b[bus.vehicle_id]) {

                // Find the index of the last timestamp in this bus' history. ie. The last timestamp is when the bus actually arrived at destination.
                const indexOfLastEntry = b[bus.vehicle_id].length - 1;
                
                // Convert last time stamp to an array in order to create date object form.
                const tmp = b[bus.vehicle_id][indexOfLastEntry].time_stamp.split(":");

                // Create a date object
                const tempDate = dest;
                tempDate.setHours(tmp[0], tmp[1]);
                
                // Convert to minutes format
                lastMinutes = tempDate.getHours() * 60 + tempDate.getMinutes();
            }
        });

    // If bus is late but still hasn't arrived yet. Delayed
    if (destMinutes < currentMinutes && currentMinutes < lastMinutes) {
        return "Delayed";
    
    // Bus hasn't departed
    } else if (pickupMinutes > currentMinutes) {
        return "Pre Departed";

    // Bus has departed, and is still on within the scheduled destination time
    } else if (currentMinutes > pickupMinutes && destMinutes > currentMinutes) {
        return "On Time";
    
    // If we made it this far. It must be completed 
    } else {
        return "Completed";
    }
}

/**
 * Takes a raw schedule and calculates a status for each bus and returns new schedule
 * @param {Object} rawData Raw schedule data
 * @param {date} time Datetime object
 * @param {Object} [tracking = null] Optional tracking history information to build an accurate status from.
 * @returns {Object} With an appended status to each bus
 */ 
export const calculatedSchedule = (rawData, time, tracking = null) => {
    
    // Container for new schedule
    let newData = rawData;

    newData.forEach((bus) => {
        bus.status = getStatus(bus, time, tracking);
    });

    return newData;
};
