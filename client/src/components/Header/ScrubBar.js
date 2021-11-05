import React from 'react';
import './Header.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

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

function valuetext(value) {
  return value;
}

export default function ScrubBar() {
    return (
      <Box>
        <Slider
          aria-label="time"
          defaultValue={700}
          getAriaValueText={valuetext}
          step={100}
          marks={marks}
          min={0}
          max={2400}
          color="secondary"
        />
      </Box>
      
    )
}