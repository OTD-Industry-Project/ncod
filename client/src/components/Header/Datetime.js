import React from "react";
import Clock from "react-live-clock";
import "./Header.css";
//simple function for displaying current time and date
//formatted to be more legable

export const isSameDay = (d1, d2) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth()
    );
}

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
