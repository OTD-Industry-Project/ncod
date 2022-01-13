import React from 'react';
import logo from '../../assets/images/logo.png';
import logoWhite from '../../assets/images/logo-white.png';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

/** @module Logo */

/**
 * Render the Logo
 * @function Logo
 * @param {boolean} theme Conditionally render the logo based on theme. 
 * @returns {Component} Renderable Logo component
 */
const Logo = ({ theme }) => {
    return (
        <div className="Logo d-flex justify-content-center">
            <Tooltip disableFocusListener disableTouchListener title="Round & Round" followCursor={true}>
                <img  src={theme ? logoWhite : logo} alt="otd logo" height="45"/>
            </Tooltip>
            
        </div>
    )
}

export default Logo;