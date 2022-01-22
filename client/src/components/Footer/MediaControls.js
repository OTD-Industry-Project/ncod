/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Sat Nov 27 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React, { useState } from 'react';
import './Footer.css';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import { useTheme } from '@mui/material/styles';

/** @module MediaControls */

/**
 * function for displaying mnedia controls practically deprecated at the moment as media buttons are actually called in "HistoryToggle.js"
 * 
 * @function MediaControls
 * @param {callback} handleCallback Callback function to track state of play 
 * @returns {Component} Renderable component
 *         
 * <img src="media-controls.png">
 * 
 */
function MediaControls({ handleCallback, setDirection }) {
    
    /**
     * Handle state of play and paused
     * @function setPaused
     * @param {boolean} paused
     */
    const [paused, setPaused] = useState(true);
    
    const theme = useTheme();

    /**
     * Extends the onCLick for the play pause buttons
     * @function handleChange
     * 
     */
    const handleChange = () => {
        setPaused(!paused);
        handleCallback(paused);
    };

    return (
        <div>
            <IconButton aria-label="rewind" onClick={() => theme.direction === 'rtl' ? setDirection(1) : setDirection(-1)} >
                {theme.direction === 'rtl' ? <FastForwardRounded /> : <FastRewindRounded fontSize="large" />}
            </IconButton>
            <IconButton
                aria-label={paused ? 'play' : 'pause'}
                onClick={handleChange}
            >
                {paused ? (
                    <PlayArrowRounded
                        sx={{ fontSize: '3rem' }}
                    />
                ) : (
                    <PauseRounded sx={{ fontSize: '3rem' }} />
                )}
            </IconButton>
            <IconButton aria-label="forward" onClick={() => theme.direction === 'rtl' ? setDirection(-1) : setDirection(1)} >
                {theme.direction === 'rtl' ? <FastRewindRounded /> : <FastForwardRounded fontSize="large" />}
            </IconButton>
        </div>
    )
}
export default MediaControls;