import React from 'react';
import './Footer.css';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';
//function for displaying mnedia controls
//practically deprecated at the moment as media buttons are actually called in "HistoryToggle.js"
function MediaControls () {
    const theme = useTheme();

    return (
        <div>
            <IconButton aria-label="rewind">
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="forward">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
        </div>
    )
}
export default MediaControls;