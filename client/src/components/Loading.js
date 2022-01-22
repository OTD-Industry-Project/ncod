/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Thu Jan 13 2022
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/** @module Loading */

/**
 * A loading icon that adds suspense
 * @function Loading
 * @param {boolean} [center = false] Optional field to alter styling and center icon 
 * @returns {Icon} Loading icon that spins
 */
export default function Loading({center = false}) {
  return (
    <Box sx={ !center ? { display: 'flex',  margin: '2em'} : { display: 'flex', justifyContent: 'center', marginTop: '20%', height: '100%', width: '100%'}}  >
      <CircularProgress disableShrink size={center ? '10rem' : '3rem'} />
    </Box>
  );
}