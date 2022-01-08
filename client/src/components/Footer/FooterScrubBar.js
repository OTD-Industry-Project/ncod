import React, { useEffect } from 'react';
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


/* scrub bar function to display actual scrub bar
min and max set time for day
step is how often to set points
marks are the labeling of regular intervals */
export default function FooterScrubBar({ play, historyMode, action, setDirection }) {

  
  function getTimeAsMinutes(date) {
      return (date.getHours() * 60) + date.getMinutes();
  }
  
  //Setting state to use event changes and set new value when slider is moved
  const [value, setValue] = React.useState(getTimeAsMinutes(new Date())); //420 = 7am in minutes
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {

    if (historyMode && (action === -1 || action === 1)) {

      if (action === -1) {
        setValue((oldValue) => oldValue - 60);
      } else {
        setValue((oldValue) => oldValue + 60);
      }
      setDirection(0);

    }
    if (play && historyMode) {

      const interval = setInterval(() => {
        setValue((oldValue) => oldValue + 5);
      }, 500);
      return () => clearInterval(interval);
    }

    // temporary for now, need to move in real time, minute by minute
    if (play && !historyMode) {
      const interval = setInterval(() => {
        setValue(getTimeAsMinutes(new Date()));
      }, 1000);
      return () => clearInterval(interval);
    }

  }, [historyMode, action, play, setDirection]);

  return (
    <Box>
      <Slider
        key={`${value}`}
        min={0}
        step={5} //5 minutes
        max={1440} //total minutes per 24 hours
        defaultValue={value}
        valueLabelFormat={valuetext}
        marks={marks}
        valueLabelDisplay="auto"
        onChangeCommitted={handleChange}
      />

    </Box>
  )
}