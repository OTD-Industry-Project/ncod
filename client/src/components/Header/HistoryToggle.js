import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Header.css";
import Switch from "react-switch";
import IconButton from '@mui/material/IconButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useTheme } from '@mui/material/styles';


function HistoryToggle({ parentCallback }) {
    const theme = useTheme();

    const [startDate, setStartDate] = useState(new Date());

    const [checked, setChecked] = useState(false);
    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
        if (checked) {
            onTrigger(startDate, true);
        }
    };

    const onTrigger = (date, reset) => {
        setStartDate(date);

        if (reset) {
            parentCallback(null);
        } else {
            parentCallback(date);
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
                className={checked ? "date-picker" : "date-picker d-none" }
                selected={startDate}
                onChange={(date) => {
                    onTrigger(date, false);
                }}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                height={2000}
            />
            <IconButton aria-label="rewind"className={checked ? "MediaControls" : "MediaControls d-none" }>
                {theme.direction === 'rtl' ? <FastForwardIcon /> : <FastRewindIcon />}
            </IconButton>
            <IconButton aria-label="play/pause"className={checked ? "MediaControls" : "MediaControls d-none" }>
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="forward"className={checked ? "MediaControls" : "MediaControls d-none" }>
                {theme.direction === 'rtl' ? <FastRewindIcon /> : <FastForwardIcon />}
            </IconButton>
        </div>
    );
}

export default HistoryToggle;
