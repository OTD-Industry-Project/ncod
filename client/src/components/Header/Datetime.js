import React from "react";
import Clock from "react-live-clock";
import "./Header.css";
//simple function for displaying current time and date
//formatted to be more legable
const Datetime = ({ date }) => {
    console.log(Date.now());
    console.log(new Date());
    console.log(date);

    function isSameDay(d1, d2) {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth()
        );
    }

    return (
        <div className="Clock d-flex flex-column alignjustify-content-center">
            <Clock className="time" format={"HH:mm:ss"} ticking={true} />
            <Clock
                className={
                    isSameDay(new Date(), date)
                        ? "day-date"
                        : "day-date history-date"
                }
                date={date}
                format={"Do MMMM  YYYY"}
            />
        </div>
    );
};
export default Datetime;
