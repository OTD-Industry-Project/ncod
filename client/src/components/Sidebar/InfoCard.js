/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Fri Dec 24 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from "react";
import "./Sidebar.css";
import { getTime } from "./Table";


/** @module InfoCard */

/**
 * Takes two dates and returns the difference in minutes
 * @function getRuntime
 * @param {date} pickup Pickup datetime
 * @param {date} dest Destination datetime 
 * @returns {number} Minutes between two dates
 */
const getRuntime = (pickup, dest) => {
    
    const t1 = new Date(pickup);
    const t2 = new Date(dest);

    const pickupMinutes = (t1.getHours() * 60) + t1.getMinutes();
    const destMinutes = (t2.getHours() * 60) + t2.getMinutes();

    return destMinutes - pickupMinutes;
}

/**
 * Takes a json data as info and outputs to a component with styling and tabularized data.
 * @function InfoCard
 * @param {Object} info Schedule information
 * @param {string} colors Hex codes to style with
 * @returns {Component} Information with table and styled display
 */
const InfoCard = ({ info, colors }) => {
    
    // Destructure out all relevant fields from info object
    const {
        pickup_time,
        pickup_point,
        description_of_job,
        pickup_latitude,
        pickup_longitude,
        destination,
        destination_latitude,
        destination_longitude,
        destination_time,
        driver_id,
        status,
    } = info;

    // Conditionally set color
    let color;
    switch (status) {
        case 'On Time':
            color = colors.ontime;
            break;
        case 'Pre Departed':
            color = colors.predeparted;
            break;
        case 'Delayed':
            color = colors.delayed;
            break;
        case 'Completed':
            color = colors.completed;
            break;
        default:
            color = '#f00';
    }

    return (
        <div className="container-fljob_id info-card" style={{backgroundColor: color}} >
            <div className="d-flex justify-content-between">
                <h6>
                    Driver: <strong>{driver_id}</strong>
                </h6>
                <h6>
                    ETA: <strong className="eta" style={{backgroundColor: color, padding: '0.2rem', borderRadius: '10px'}}>{getTime(new Date(destination_time))}</strong>
                </h6>
            </div>
            <div className="d-flex justify-content-between">
                
                <h6>
                    Duration: <strong>{getRuntime(pickup_time, destination_time)}mins</strong>
                </h6>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Pickup</th>
                        <th scope="col">Destination</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{pickup_point}</td>
                        <td>{destination}</td>
                    </tr>
                    <tr>
                        <th scope="row">Times</th>
                        <td>{getTime(new Date(pickup_time))}</td>
                        <td>{getTime(new Date(destination_time))}</td>
                    </tr>
                    { description_of_job && (
                    <tr>
                        <th scope="row">Info</th>
                        <td>{description_of_job}</td>
                        <td>{description_of_job}</td>
                    </tr>
                    )}
                    <tr>
                        <th scope="row">Position</th>
                        <td>{pickup_latitude}</td>
                        <td>{pickup_longitude}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InfoCard;
