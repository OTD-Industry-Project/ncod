import React, { useState } from 'react';
import './Footer.css';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import { useTheme } from '@mui/material/styles';
//function for displaying mnedia controls
//practically deprecated at the moment as media buttons are actually called in "HistoryToggle.js"
function MediaControls() {
    const theme = useTheme();
    const [paused, setPaused] = React.useState(false);

    return (
        <div>
            <IconButton aria-label="rewind">
                {theme.direction === 'rtl' ? <FastForwardRounded /> : <FastRewindRounded fontSize="large" />}
            </IconButton>
            <IconButton
                aria-label={paused ? 'play' : 'pause'}
                onClick={() => setPaused(!paused)}
            >
                {paused ? (
                    <PlayArrowRounded
                        sx={{ fontSize: '3rem' }}
                    />
                ) : (
                    <PauseRounded sx={{ fontSize: '3rem' }} />
                )}
            </IconButton>
            <IconButton aria-label="forward">
                {theme.direction === 'rtl' ? <FastRewindRounded /> : <FastForwardRounded fontSize="large" />}
            </IconButton>
        </div>
    )
}
export default MediaControls;