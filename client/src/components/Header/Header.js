import React from 'react';
import './Header.css';
import Logo from './Logo';
import Datetime from './Datetime';
import HistoryToggle from './HistoryToggle';
import MenuBtn from './MenuBtn';
import AlertBtn from './AlertBtn';
import ScrubBar from './ScrubBar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
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

        const { date } = this.state;
        
        
        return (
            <AppBar>
                <Toolbar>
                    <Typography sx={{flexGrow: 1}}>
                         <Logo />
                    </Typography>
                    <Typography className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-4">
                        <HistoryToggle parentCallback={this.handleHistoryCallback}/>
                    </Typography>
                    <Typography sx={{flexGrow: 5}}marginTop="0">
                        <ScrubBar />
                    </Typography>
                    <Typography sx={{flexGrow: 1}}align="center">
                        <AlertBtn />
                    </Typography>
                    <Typography sx={{flexGrow: 2}}align="center">
                        <Datetime date={date}/>
                    </Typography>
                    <Typography sx={{flexGrow: 1}}align="center">
                        <MenuBtn />
                    </Typography>
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