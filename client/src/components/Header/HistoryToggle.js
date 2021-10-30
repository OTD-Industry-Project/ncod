import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Header.css";

function HistoryToggle() {
    const [startDate, setStartDate] = useState(new Date());
    const [button, setButton] = useState({
        classes: "btn btn-secondary",
        active: false,
        today: new Date(),
    });

    const sameDate = (d1, d2) => {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDay() === d2.getDay()
        );
    };

    useEffect(() => {
        console.log(startDate);
        if (sameDate(startDate, button.today)) {
            setButton({ classes: "btn btn-primary" });
        }
    }, []);

    return (
        <div className="container-fluid d-flex justify-content-between">
            <button
                className={button.classes}
                onClick={button.active ? setStartDate(button.today) : undefined}
            >
                Today
            </button>
            <DatePicker
                className="date-picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
        </div>
    );
}

export default HistoryToggle;
