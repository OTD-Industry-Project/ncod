import React from 'react';
import './Header.css';
import IconButton from '@mui/material/IconButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useTheme } from '@mui/material/styles';

function MediaControls () {
    const theme = useTheme();

    return (
        <div>
            <IconButton aria-label="rewind">
                {theme.direction === 'rtl' ? <FastForwardIcon /> : <FastRewindIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="forward">
                {theme.direction === 'rtl' ? <FastRewindIcon /> : <FastForwardIcon />}
            </IconButton>
        </div>
    )
}
export default MediaControls;