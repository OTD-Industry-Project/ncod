import React from 'react';
import logo from '../../assets/images/logo.png';

const Logo = () => {
    return (
        <div className="Logo d-flex justify-content-center">
            <img src={logo} alt="otd logo" height="60"/>
        </div>
    )
}

export default Logo;