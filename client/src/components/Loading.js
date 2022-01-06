import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({center = false}) {
  return (
    <Box sx={ !center ? { display: 'flex',  margin: '2em'} : { display: 'flex', justifyContent: 'center', marginTop: '20%', height: '100%', width: '100%'}}  >
      <CircularProgress disableShrink size={center ? '10rem' : '3rem'} />
    </Box>
  );
}