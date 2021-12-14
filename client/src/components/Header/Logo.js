import React from 'react';
import logo from '../../assets/images/logo.png';
import logoWhite from '../../assets/images/logo-white.png';
import Tooltip from '@mui/material/Tooltip';
// Simple div for displaying the logo and a hover tooltip
const Logo = ({ theme }) => {
    return (
        <div className="Logo d-flex justify-content-center">
            <Tooltip disableFocusListener disableTouchListener title="Round & Round" followCursor={true}>
                <img  src={theme ? logo : logoWhite} alt="otd logo" height="45"/>
            </Tooltip>
            
        </div>
    )
}

export default Logo;