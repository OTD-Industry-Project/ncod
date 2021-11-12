import React from 'react';
import './Header.css';
import Logo from './Logo';
import Datetime from './Datetime';
import HistoryToggle from './HistoryToggle';
import MenuBtn from './MenuBtn';
import AlertBtn from './AlertBtn';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//Main Header script for header component, design to give a top AppBar
//return an appbar with toolbar, with divs with responsive resizing
//each div calls another script to be placed inside the initial div
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null
        }
    }
    
    handleHistoryCallback = (childData) => {
        this.setState({date: childData});
    }  

    render() { 
        //const for date and time
        const { date } = this.state;
        
        return (
            <AppBar>
                <Toolbar>
                    <div className="col-8 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                         <Logo />
                    </div>
                    <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-2" align="center">
                        <Datetime date={date}/>
                    </div>
                    <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-7">
                        <HistoryToggle parentCallback={this.handleHistoryCallback}/>
                    </div>
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                        <AlertBtn />
                    </div>
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                        <MenuBtn />
                    </div>
                    {/* Bootstrap Responsive resizing. Alerts and settings are hidden on mobile and tablet sizes, and replaced with Hamburger */}
                    <div className="row d-flex h-100">
                        <div className="col-4 col-sm-2 col-md-2 d-lg-none">Hamburger</div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
 
export default Header;