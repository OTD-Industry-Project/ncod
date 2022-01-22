/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Thu Jan 13 2022
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import TEST_DATA from '../TEST_DATA.json';
/**
 * 
 * @deprecated
 */
export const processedData = () => {
    // Make a copy of the TEST_DATA file
    const newData = TEST_DATA;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Iterate through each object in newData
    // Add a randomised status property to each object
    // Add an ETA property to each object
    // Remove date from times
    newData.forEach((el, index) => {
        
        // Only reformat string once
        if (el.ArrivalDateTime.search("/") !== -1) {

            el.uid = index;
            
            // Remove dates from PickupDateTime and ArrivalDataTime
            el.PickupDateTime = el.PickupDateTime.substr(
                el.PickupDateTime.indexOf(" ") + 1
            );
            
            el.ArrivalDateTime = el.ArrivalDateTime.substr(
                el.ArrivalDateTime.indexOf(" ") + 1
            );

            // Set the eta as arrival date time
            el.eta = el.ArrivalDateTime;
    
            // Randomly pick a status
            switch (getRandomInt(4)) {
                case 0:
                    el.status = "On Time";
                    break;
                case 1:
                    el.status = "Pre Departed";
                    break;
                case 2:
                    el.status = "Delayed";
                    break;
                case 3:
                    el.status = "Completed";
                    break;
                default:
                    el.status = "Error";
            }
        }
       

    });
    return newData;
}

