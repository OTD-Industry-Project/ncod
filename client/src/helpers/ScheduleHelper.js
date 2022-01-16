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
    } else if ((currentMinutes > pickupMinutes && destMinutes > currentMinutes) || currentMinutes === pickupMinutes) {
        return "On Time";
    } else {
        return "Completed";
    }
}

export const calculatedSchedule = (rawData, time, tracking = null) => {
    let newData = rawData;

    newData.forEach((bus) => {
        bus.status = getStatus(bus, time, tracking);
    });

    return newData;
};
