import React from 'react';
import './Footer.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
//mark points list for the scrub bar
//value is how far along the bar
//label is the time displayed uder value point
const marks = [
  {
    value: 2.00,
    label: '02:00',
  },
  {
    value: 5.00,
    label: '05:00',
  },
  {
    value: 8.00,
    label: '08:00',
  },
  {
    value: 11.00,
    label: '11:00',
  },
  {
    value: 14.00,
    label: '14:00',
  },
  {
    value: 17.00,
    label: '17:00',
  },
  {
    value: 20.00,
    label: '20:00',
  },
  {
    value: 23.00,
    label: '23:00',
  },
];
//get value at each step
function valuetext(value) {
  return value;
}
//scrub bar function to display actual scrub bar
//min and max set time for day
//step is how often to set points
//marks are the labeling of regular intervals
export default function FooterScrubBar() {
    return (
      <Box>
        <Slider
          aria-label="time"
          defaultValue={7.00}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1.00}
          marks={marks}
          min={0}
          max={24.00}
        />
      </Box>
    )
}