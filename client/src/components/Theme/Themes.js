import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    text: '#091e65',
    background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33%, rgba(241,241,241,1) 100%)',
    appBar: '#0074d9',
    scrubBar: '#1976d2',
    warning: 'rgb(255, 244, 229)',
    info: 'rgb(229, 246, 253)',
    error: 'rgb(253, 237, 237)',
    success: 'rgb(237, 247, 237)',
};

export const darkTheme = {
    body: '#2C2F33',
    text: '#FFF',
    background: '#2C2F33',
    appBar: '#23272A',
    icon: 'rgb(133, 184, 88)',
    scrubBar: 'rgb(133, 184, 88)',
    warning: 'rgb(240, 192, 153)',
    info: 'rgb(153, 186, 240)',
    error: 'rgb(247, 186, 186)',
    success: 'rgb(153, 240, 169)',
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

    .MuiAlert-standardWarning {
        background-color: ${props => props.theme.warning} !important;
    }
    .MuiAlert-standardInfo {
        background-color: ${props => props.theme.info} !important;
    }
    .MuiAlert-standardError {
        background-color: ${props => props.theme.error} !important;
    }
    .MuiAlert-standardSuccess {
        background-color: ${props => props.theme.success} !important;
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