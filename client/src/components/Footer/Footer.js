import { Toolbar, Box } from "@mui/material";
import React, { Component } from "react";
import "./Footer.css";
import FooterScrubBar from "./FooterScrubBar";
import MediaControls from "./MediaControls";
//main script for the footer component returns a toolbar with divs
class Footer extends Component {
    render() {
        return (
            //toolbar returns divs which has responsive resizing and calls other scripts to be placed inside divs
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} className="align-self-start">
                    <MediaControls />
                </Box>
                <Box sx={{ flexGrow: 99 }} className="align-self-end">
                    <FooterScrubBar />
                </Box>
            </Toolbar>
        );
    }
}
export default Footer;
