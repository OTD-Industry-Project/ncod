import * as React from 'react';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Sidebar.css';

export default function SimpleSlide(props) {
console.log(props.achecked);
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ width: "300" }}>
        {/* <FormControlLabel
         className="test"
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        /> */}
        <Slide direction="down" in={props.scheduleOpen} mountOnEnter unmountOnExit>
          <div>{props.children}</div>
        </Slide>
      </Box>
    </Box>
  );
}