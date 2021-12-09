import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: "#FFF",
    text: '#091e65',
    background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33%, rgba(241,241,241,1) 100%)',
    appBar: '#0074d9',
    scrubBar: '#1976d2',
};

export const darkTheme = {
    body: '#2C2F33',
    text: '#FFF',
    background: '#2C2F33',
    appBar: '#23272A',
    icon: 'rgb(133, 184, 88)',
    scrubBar: 'rgb(133, 184, 88)',
    mapTiles: 'brightness(0.6) invert(1) contrast(4) hue-rotate(220deg) saturate(0.4) brightness(0.4)',
};

export const GlobalStyle = createGlobalStyle`
    
    * {
        color: ${props => props.theme.text};
    }
    body, 
    .leaflet-popup-content-wrapper, 
    .leaflet-popup-tip, 
    .leaflet-control {
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.text};
        body: ${props => props.theme.body};
        background: ${props => props.theme.background}; 
    }
    th, 
    td {
        color: ${props => props.theme.text};
        background-color: ${props => props.theme.body} !important;
    }
    .MuiSvgIcon-root {
        fill: ${props => props.theme.icon} !important;
        color: ${props => props.theme.icon} !important;
    }
    .MuiSlider-rail,
    .MuiSlider-track,
    .MuiSlider-valueLabelCircle,
    .css-eg0mwd-MuiSlider-thumb {
        fill: ${props => props.theme.scrubBar} !important;
        color: ${props => props.theme.scrubBar} !important;
    }
    .MuiSlider-valueLabel {
        background-color: ${props => props.theme.body} !important;
    }
    .MuiAppBar-root,
    .sidebar-header {
        background-color: ${props => props.theme.appBar} !important;
    }
    .sidebar-content,
    .sidebar-tabs,
    .MuiPaper-root {
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.text};
    }

    .sidebar-tabs > li.active, .sidebar-tabs > ul > li.active {
        background-color: ${props => props.theme.scrubBar};
    }

    .leaflet-tile {
        filter: ${props => props.theme.mapTiles} !important;
    } 
    .leaflet-bar a {
        background: ${props => props.theme.background};
    }
`;