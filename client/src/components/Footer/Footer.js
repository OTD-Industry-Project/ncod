import { Toolbar, Box } from "@mui/material";
import React, { Component } from "react";
import FooterScrubBar from "./FooterScrubBar";
import MediaControls from "./MediaControls";
import "./Footer.css";

//main script for the footer component returns a toolbar with divs
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 0, // -1 = rewind, 1 = fast-forward and 0 = nothing.
        };
    }

    handleDirectionChange = (dir) => {
        this.setState({action: dir});
    }
    
    render() {
        return (
            //toolbar returns divs which has responsive resizing and calls other scripts to be placed inside divs
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} className="align-self-start">
                    <MediaControls handleCallback={this.props.handleCallback} setDirection={this.handleDirectionChange}/>
                </Box>
                <Box sx={{ flexGrow: 99 }} className="align-self-end">
                    <FooterScrubBar timeCallback={this.props.timeCallback} play={this.props.play} historyMode={this.props.historyMode} action={this.state.action} setDirection={this.handleDirectionChange}/>
                </Box>
            </Toolbar>
        );
    }
}
export default Footer;
