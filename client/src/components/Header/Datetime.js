/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Sat Nov 27 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from "react";
import Clock from "react-live-clock";
import "./Header.css";

/** @module Datetime */

/**
 * Takes two Date objects returns true if they are same day (time of day is irrevelant).
 * 
 * @function isSameDay
 * @param {date} d1 First Date
 * @param {date} d2 Second Date
 * @returns {boolean} If dates are same: True. Otherwise false.
 */
export const isSameDay = (d1, d2) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth()
    );
}

/**
 * Component that keeps track of live time.
 * @function Datetime
 * @param {date} date Inner state is set with this 
 * @returns {Component} Renderable component
 */
const Datetime = ({ date }) => {

    return (
        <div className="Clock d-flex flex-column alignjustify-content-center">
            <Clock className="time" format={"HH:mm:ss"} ticking={true} />
            <Clock
                className={
                    isSameDay(new Date(), date)
                        ? "day-date"
                        : "day-date history-date"
                }
                date={date.getTime()}
                format={"Do MMMM  YYYY"}
            />
        </div>
    );
};
export default Datetime;
