import React, { useEffect } from 'react';
import './Footer.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

/** @module FooterScrubBar */


/*Adjusted this to display correct 00:00 time, and value is
set as per the correct number of minutes for each displayed hour*/

/**
 * @name marks
 * @description Provides markers for the scrub bar, where total minutes (value) is mapped to a time in hours:minutes format (label)
 * @example 
 * const marks = [
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
  ...
 */
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

/**
 * Prepends a time string with a leading zero
 * @param {string} string The time string that needs to be prepended with a 00
 * @returns {string}
 */
function padZero(string) {
  return ("00" + string).slice(-2)
}
//get value at each step and converting to time

/**
 * Converts a value (time in minutes 0 - 1440) to a time.
 * @param {number} value number between 0 - 1440 ie. Time in minutes
 * @returns {string}
 */
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

/**
 * @function scrubTimer
 * @description scrub bar function to display actual scrub bar
min and max set time for day
step is how often to set points
marks are the labeling of regular intervals
 * @param {number} value A time in minutes converted to hh:mm
 * @returns {string} formatted time string in 24hour time
 * @example
 * 
 * scrubTimer(420) // returns 07:00
 * scrubTimer(930) // returns 15:30
 */
function scrubTimer(value) {
  if (value < 0)
    value = 0;
  var hrs = ~~((value / 60) % 24),
    mins = ~~(value % 60);
  if (hrs === 24)
    hrs = "00";
  if (hrs < 10)
    hrs = "0" + hrs;
  return (
    hrs + ":" + padZero(mins));
}


/*  */

/**
 * Tracks state of the Scrub bar and interval and renders it
 * @function FooterScrubBar
 * @param {boolean} play Boolean to set inner state
 * @param {boolean} historyMode If true then history mode is active
 * @param {number} action current Direction of scrub bar
 * @param {callback} setDirection Callback to set the direction in parent compoenent (Header)
 * @returns {Component} renderable Component
 * 
 * 
 */
export default function FooterScrubBar({ play, historyMode, action, setDirection, timeCallback }) {

  /**
   * Convers a time of the day to minutes
   * @function getTimeAsMinutes
   * @param {date} date Date object
   * @example
   * return (date.getHours() * 60) + date.getMinutes();
   * Thus, 2:30 am:
   * = (2 * 60) + 30
   * = 120 + 30
   * = 150 minutes
   */
  function getTimeAsMinutes(date) {
    return (date.getHours() * 60) + date.getMinutes();
  }
  
  /**
   * @name value
   * @description Track the state of the value
   */
  const [value, setValue] = React.useState(getTimeAsMinutes(new Date())); 
  
  /**
   * Updates the value state
   * @param {e} event  
   * @param {number} newValue Value to be set  
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
    timeCallback(scrubTimer(newValue));
  };

  /**
   * React Life cycle method. Runs on Component creation
   * @function useffect
   * @description Checks props passed to component and calculates whether the scrub bar should be moving and tells it how to move.
   * 
   */
  useEffect(() => {

    // History mode and paused
    if (historyMode && (action === -1 || action === 1)) {

      if (action === -1) {
        setValue((oldValue) => oldValue - 60);
      } else {
        setValue((oldValue) => oldValue + 60);
      }
      setDirection(0);

    }

    // Playing and History mode
    if (play && historyMode) {

      const interval = setInterval(() => {

        setValue((oldValue) => {

          timeCallback(scrubTimer(oldValue + 5));
          if (oldValue >= 1440) {
            return oldValue = 0 + (oldValue-1440+5);
          }
          return oldValue + 5;

        });


      }, 500);
      timeCallback(scrubTimer(value + 5));
      return () => clearInterval(interval);
    }

    // Play and NOT history mode (ie. live mode playing)
    if (play && !historyMode) {
      const checkTimer = getTimeAsMinutes(new Date());
      setValue(getTimeAsMinutes(new Date()));
      const interval = setInterval(() => {
        if (checkTimer < getTimeAsMinutes(new Date())) {
          setValue(getTimeAsMinutes(new Date()));
          timeCallback(scrubTimer(getTimeAsMinutes(new Date())));
        }
        else {
          setValue(getTimeAsMinutes(new Date()));
        }

      }, 1000);
      return () => clearInterval(interval);
    }

  }, [historyMode, action, play, setDirection, timeCallback, value]);


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