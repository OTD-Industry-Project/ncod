import React from 'react';
import logo from '../../assets/images/logo.png';
import Tooltip from '@mui/material/Tooltip';
// Simple div for displaying the logo and a hover tooltip
const Logo = () => {
    return (
        <div className="Logo d-flex justify-content-center">
            <Tooltip disableFocusListener disableTouchListener title="Round & Round" followCursor={true}>
                <img src={logo} alt="otd logo" height="45"/>
            </Tooltip>
            
        </div>
    )
}

export default Logo;