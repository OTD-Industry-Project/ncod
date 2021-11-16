import React from 'react';
import './Footer.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
/* mark points list for the scrub bar
value is how far along the bar
label is the time displayed uder value point */


/*Adjusted this to display correct 00:00 time, and value is
set as per the correct number of minutes for each displayed hour*/
const marks = [
  {
    value: 120,
    label: '02:00',
  },
  {
    value: 300,
    label: '05:00',
  },
  {
    value: 480,
    label: '08:00',
  },
  {
    value: 660,
    label: '11:00',
  },
  {
    value: 840,
    label: '14:00',
  },
  {
    value: 1020,
    label: '17:00',
  },
  {
    value: 1200,
    label: '20:00',
  },
  {
    value: 1380,
    label: '23:00',
  },
];

//adding two zeros to the end of time value
function padZero(string) {
  return ("00" + string).slice(-2)
}
//get value at each step and converting to time
function valuetext(value) {
  if (value < 0)
    value = 0;
  var hrs = ~~((value / 60) % 24),
    mins = ~~(value % 60),
    timeType = (hrs > 11 ? "PM" : "AM");
  if (hrs > 12)
    hrs = hrs - 12;
  if (hrs === 0)
    hrs = 12;
  return (
    hrs + ":" + padZero(mins) + timeType);
}

//scrub bar function to display actual scrub bar
//min and max set time for day
//step is how often to set points
//marks are the labeling of regular intervals
export default function FooterScrubBar() {
  //Setting state to use event changes and set new value when slider is moved
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <Box>
        <Slider
          min={0}
          step={30} //30 minutes
          max={1440} //total minutes per 24 hours
          defaultValue={420} //7am in minutes
          valueLabelFormat={valuetext}
          marks={marks}
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </Box>
    )
}