import { Toolbar, Box } from "@mui/material";
import React, { Component } from "react";
import FooterScrubBar from "./FooterScrubBar";
import MediaControls from "./MediaControls";
import "./Footer.css";

/** @module Footer */

/**
 * Container for Media Controls and Scrub bar
 * @function Footer
 * @param {props} props Passes various variables and props further down to child Components
 * @return {Component} Returns renderable component
 * 
 * <img src="footer.png">
 */
class Footer extends Component {
    constructor(props) {
        super(props);
        
        /**
         * @name action
         * @type {number}
         * @description Keep track of the direction of the scrub bar. Where -1 = rewind, 1 = fast-forward and 0 = nothing 
         */
        this.state = {
            action: 0, // -1 = rewind, 1 = fast-forward and 0 = nothing.
        };
    }

    /**
     * Update the state with the provided number
     * @function handleDirectionChange
     * @param {number} dir Number. either -1, 0 or 1. 
     */
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
                    <FooterScrubBar play={this.props.play} historyMode={this.props.historyMode} action={this.state.action} setDirection={this.handleDirectionChange}/>
                </Box>
            </Toolbar>
        );
    }
}
export default Footer;
