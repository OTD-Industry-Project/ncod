import React from 'react';
import Clock from 'react-live-clock';
import './Header.css';


class Datetime extends React.Component {
    render() {
        return (
            <div className="Clock d-flex flex-column alignjustify-content-center border">
                <Clock className="time" format={"HH:mm:ss"} ticking={true} timezone={"Australia/Sydney"} />
                <Clock className="day-date" format={"dddd, MMMM Do YYYY"} timezone={"Australia/Sydney"}/>
            </div>
        );
    };
}

export default Datetime;