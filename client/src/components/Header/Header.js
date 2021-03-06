/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Sat Nov 27 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from 'react';
import './Header.css';
import Logo from './Logo';
import Datetime from './Datetime';
import HistoryToggle from './HistoryToggle';
import AlertBtn from './AlertBtn';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import DarkModeToggle from './DarkModeToggle';


/**@module Header */
/**
 * Main Header script for header component, design to give a top AppBar return an appbar with toolbar, with divs with responsive resizing each div calls another script to be placed inside the initial div
 * @function Header
 * @param {props} props Various variables and callbacks that are further passed down to the children Components
 * @example
 * 
    <AppBar className="Header">
        <Toolbar>
            <div className="col-8 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                    <Logo theme={this.props.theme} />
            </div>
            <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-2" align="center">
                <Datetime date={this.props.date}/>
            </div>
            <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-7">
                <HistoryToggle changeDate={this.props.changeDate} availableHistoryDates={this.props.availableHistoryDates}/>
            </div>
            <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                <AlertBtn />
            </div>
            <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                <DarkModeToggle theme={this.props.theme} switchTheme={this.props.switchTheme} />
            </div>
            
        </Toolbar>
    </AppBar>
  
 */
class Header extends React.Component {
    render() {    
        return (
            <AppBar className="Header">
                <Toolbar>
                    <div className="col-8 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                         <Logo theme={this.props.theme} />
                    </div>
                    <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-2" align="center">
                        <Datetime date={this.props.date}/>
                    </div>
                    <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-7">
                        <HistoryToggle changeDate={this.props.changeDate} availableHistoryDates={this.props.availableHistoryDates}/>
                    </div>
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                        <AlertBtn />
                    </div>
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                        <DarkModeToggle theme={this.props.theme} switchTheme={this.props.switchTheme} />
                    </div>
                    
                </Toolbar>
            </AppBar>
        );
    }
}
 
export default Header;