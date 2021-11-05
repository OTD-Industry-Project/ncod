import React from 'react';
import Clock from 'react-live-clock';
import './Header.css';


const Datetime = ({ date }) => {
    
    return (
        <div className="Clock d-flex flex-column alignjustify-content-center border">
            <Clock className="time" format={"HH:mm:ss"} ticking={true} timezone={"Australia/Sydney"} />
            <Clock className={date === null ? "day-date" : "day-date history-date"} date={date} format={"dddd, MMMM Do YYYY"} timezone={"Australia/Sydney"}/>
        </div>
    );
}

export default Datetime;