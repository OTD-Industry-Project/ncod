import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Header.css";
import Switch from "react-switch";

/** @module HistoryToggle */
/**
 * When toggled, datepicker is displayed. If date is changed, sets Global date of App.
 * 
 * @function HistoryToggle
 * @param {callback} changeDate Callback that sets the the global state of App.
 * @param {array} availableHistoryDates Array of dates used to populate the calendar.
 * @returns {Component} Renderable component
 */
function HistoryToggle({ changeDate, availableHistoryDates }) {

    /**
     * Inner state variables
     * @function state_hooks
     * @param {date} startDate Date that the datepicker defaults to
     * @param {boolean} checked Track state of toggle 
     */
    const [startDate, setStartDate] = useState(new Date());
    const [checked, setChecked] = useState(false);
    
    /**
     * The logic behind the toggle. 
     * @function handleChange
     * @param {boolean} nextChecked Boolean value that is used to set state.
     */
    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
        if (checked) {
            onTrigger(startDate, true);
        }
    };

    /**
     * Event handling. When toggleState changes, this fires.
     * @function onTrigger
     * @param {date} d New Date to set 
     * @param {boolean} reset Flag. If true, date should be reset back to current day.
     */
    const onTrigger = (d, reset) => {

        if (reset) {
            changeDate(new Date());
            setStartDate(new Date());
        } else {
            changeDate(d);
            setStartDate(d);
        }
    };

    return (
        <div className="container-fluid d-flex">
            <label className="switch d-flex align-items-center">
                <span>Live</span>
                <Switch
                    onChange={handleChange}
                    checked={checked}
                    className="react-switch"
                    onColor="#86d3ff"
                    offColor="#85b858"
                    offHandleColor="#567a36"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                />
                <span>History</span>
            </label>
            <DatePicker
                todayButton="Reset"
                minDate={new Date(2021, 9, 1)} //YYYY, M, D format
                includeDates={availableHistoryDates}
                maxDate={new Date()}
                className={checked ? "date-picker" : "date-picker d-none" }
                selected={startDate}
                onChange={(date) => {
                    onTrigger(date, !checked);
                }}
                dateFormat="dd/MM/yyyy"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                height={2000}
            />
        </div>
    );
}

export default HistoryToggle;