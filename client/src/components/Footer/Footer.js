import { Toolbar } from '@mui/material';
import React, { Component } from 'react';
import './Footer.css';
import FooterScrubBar from './FooterScrubBar';
import MediaControls from './MediaControls';

class Footer extends Component {
    render() {
        return (
            <Toolbar>
                <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-3">
                </div>
                <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                    <MediaControls />
                </div>
                <div className="d-none d-sm-block col-sm-3 col-md-3 col-lg-3 col-xl-8"> 
                    <FooterScrubBar />
                </div>    
            </Toolbar>
        )
    }
}
export default Footer;
