import React from 'react';
import './Header.css';
import Logo from './Logo';
import Datetime from './Datetime';
import HistoryToggle from './HistoryToggle';

class Header extends React.Component {
       
    render() { 
        return (
            <div className="Header">
                
                {/* Bootstrap Responsive resizing. Alerts and settings are hidden on mobile and tablet sizes, and replaced with Hamburger */}
                <div className="row d-flex h-100">
                    {/* Logo */}
                    <div className="col-8 col-sm-1 col-md-1 col-lg-1 col-xl-1 border">
                        <Logo />
                    </div>

                    {/* History Toggle */}
                    <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-2 border">
                        <HistoryToggle />
                    </div>
                    
                    {/* Media controls */}
                    <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-1 border">Media Controls</div>
                    
                    {/* Scrub bar */}
                    <div className="d-none d-sm-block col-sm-3 col-md-3 col-lg-3 col-xl-4 border">Scrubbing bar</div>
                    
                    {/* Date and time */}
                    <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-2 border">
                        <Datetime />
                    </div>
                    
                    {/* Alerts */}
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1 border">Alerts</div>
                    
                    {/* Settings */}
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1 border">Settings</div>

                    {/* Only appears on mobile or tablet sizes */}
                    <div className="col-4 col-sm-2 col-md-2 d-lg-none border">Hamburger</div>
                </div>
            </div>
        );
    }
}
 
export default Header;