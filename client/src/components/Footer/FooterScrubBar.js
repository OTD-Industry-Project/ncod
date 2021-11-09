import React from 'react';
import './Footer.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
//mark points list for the scrub bar
//value is how far along the bar
//label is the time displayed uder value point
const marks = [
  {
    value: 200,
    label: '2:00',
  },
  {
    value: 500,
    label: '5:00',
  },
  {
    value: 800,
    label: '8:00',
  },
  {
    value: 1100,
    label: '11:00',
  },
  {
    value: 1400,
    label: '14:00',
  },
  {
    value: 1700,
    label: '17:00',
  },
  {
    value: 2000,
    label: '20:00',
  },
  {
    value: 2300,
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
          defaultValue={700}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={100}
          marks={marks}
          min={0}
          max={2400}
          color="secondary"
        />
      </Box>
    )
}