import React from 'react';
import Clock from 'react-live-clock';
import './Header.css';
//simple function for displaying current time and date
//formatted to be more legable
const Datetime = ({ date }) => {
    
    return (
        <div className="Clock d-flex flex-column alignjustify-content-center">
            <Clock className="time" format={"HH:mm:ss"} ticking={true} timezone={"Australia/Sydney"} />
            <Clock className={date === null ? "day-date" : "day-date history-date"} date={date} format={"Do MMMM  YYYY"} timezone={"Australia/Sydney"}/>
        </div>
    );
}
export default Datetime;