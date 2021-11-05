import React from 'react';
import './Header.css';
import Logo from './Logo';
import Datetime from './Datetime';
import HistoryToggle from './HistoryToggle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            date: null
        }
    }
    
    handleHistoryCallback = (childData) => {
        this.setState({date: childData});
    }
       
    render() { 

        const { data, date } = this.state;
        
        
        return (
            <AppBar>
                <Toolbar>
                    <Typography sx={{flexGrow: 1}}>
                         <Logo />
                    </Typography>
                    <Typography className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <HistoryToggle parentCallback={this.handleHistoryCallback}/>
                    </Typography>
                    <Typography sx={{flexGrow: 2}}align="center">
                        Media Controls
                    </Typography>
                    <Typography sx={{flexGrow: 5}}>
                        Scrubbing bar
                    </Typography>
                    <Typography sx={{flexGrow: 1}}>
                        Alerts
                    </Typography>
                    <Typography sx={{flexGrow: 1}}>
                        Settings
                    </Typography>
                    <Typography sx={{flexGrow: 2}}>
                        <Datetime date={date}/>
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