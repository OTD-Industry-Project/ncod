import { createGlobalStyle } from "styled-components";

/** @module Theme */

/**
 * @constant lightTheme
 * @description All the properties and colors that make up the styling for the light theme
 * 
 * <img src="light-theme.png">
 * 
 * @example
 * export const lightTheme = {
    appBar: '#0074d9',
    scrubBar: '#1976d2',
    warning: 'rgb(255, 244, 229)',
    info: 'rgb(229, 246, 253)',
    error: 'rgb(253, 237, 237)',
    success: 'rgb(237, 247, 237)',
    selectedRow: '#1976d2'
};
 * 
 */
export const lightTheme = {
    appBar: '#0074d9',
    scrubBar: '#1976d2',
    warning: 'rgb(255, 244, 229)',
    info: 'rgb(229, 246, 253)',
    error: 'rgb(253, 237, 237)',
    success: 'rgb(237, 247, 237)',
    selectedRow: '#1976d2'
};


/**
 * @constant darkTheme
 * @description All the properties and colors that make up the styling for the dark theme
 * <img src="dark-theme.png">
 * @example
 * 
 * export const darkTheme = {
    body: '#2C2F33',
    text: '#FFF',
    background: '#2C2F33',
    appBar: '#23272A',
    icon: 'rgb(133, 184, 88)',
    scrubBar: 'rgb(133, 184, 88)',
    warning: 'rgb(255, 215, 157)',
    info: 'rgb(153, 186, 240)',
    error: 'rgb(247, 186, 186)',
    success: 'rgb(153, 240, 169)',
    mapTiles: 'brightness(0.6) invert(1) contrast(4) hue-rotate(220deg) saturate(0.4) brightness(0.4)',
    selectedRow: 'rgb(133, 184, 88)'
};
 * 
 */
export const darkTheme = {
    body: '#2C2F33',
    text: '#FFF',
    background: '#2C2F33',
    appBar: '#23272A',
    icon: 'rgb(133, 184, 88)',
    scrubBar: 'rgb(133, 184, 88)',
    warning: 'rgb(255, 215, 157)',
    info: 'rgb(153, 186, 240)',
    error: 'rgb(247, 186, 186)',
    success: 'rgb(153, 240, 169)',
    mapTiles: 'brightness(0.6) invert(1) contrast(4) hue-rotate(220deg) saturate(0.4) brightness(0.4)',
    selectedRow: 'rgb(133, 184, 88)'
};

/**
 * Create a Global style component using the style-components react library
 * @function GlobalStyle
 * @description Mixes Javascript and CSS to create dynamic styling that is cascaded down the heirarchy of components whereby, each child component has access to the context.
 */
export const GlobalStyle = createGlobalStyle`
    
    ${'' /* * {
        color: ${props => props.theme.text};
    } */}

    body, 
    .leaflet-popup-content-wrapper, 
    .leaflet-popup-tip, 
    .leaflet-control {
        color: ${props => props.theme.text};
        body: ${props => props.theme.body};
        background: ${props => props.theme.background}; 
    }
    th, 
    td {
        color: ${props => props.theme.text};
        background-color: ${props => props.theme.background} !important;
    }

    .refresh {
        color: ${props => props.theme.scrubBar};
    }
    
    
${'' /* Alert colors */}
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

    .MuiIconButton-root,
    .MuiTablePagination-toolbar,
    .MuiTablePagination-selectIcon,
    .MuiTouchRipple-root {
        color: ${props => props.theme.text} !important;
    }


${'' /* scrub bar colours */}
    .MuiSlider-rail,
    .MuiSlider-track,
    .MuiSlider-valueLabelCircle,
    .MuiSlider-markLabel,
    .css-eg0mwd-MuiSlider-thumb {
        fill: ${props => props.theme.scrubBar} !important;
        color: ${props => props.theme.scrubBar} !important;
    }
    .MuiSlider-valueLabel {
        background-color: ${props => props.theme.background} !important;
    }
${'' /* media controls */}
    .Footer > div > div > div > button > svg {
        fill: ${props => props.theme.scrubBar} !important;
    }

    .MuiAppBar-root,
    .sidebar-header {
        background-color: ${props => props.theme.appBar} !important;
    }
    .sidebar-content,
    .sidebar-tabs,
    .MuiPaper-root,
    .MuiPaper-root > div,
    .date-picker,
    select {
        background-color: ${props => props.theme.background};
        color: ${props => props.theme.text};
    }
    .sidebar-tabs > ul > li > button {
        color: ${props => props.theme.text};
    }

${'' /* row select in sidebar schedule */}
    .sidebar-tabs > li.active, .sidebar-tabs > ul > li.active {
        background-color: ${props => props.theme.scrubBar};
    }

${'' /* dark mode map tiles */}
    .leaflet-tile {
        filter: ${props => props.theme.mapTiles} !important;
    } 
${'' /* leaflet zoomControls */}
    .leaflet-bar a {
        background: ${props => props.theme.background};
    }

${'' /* selected row in side bar */}
    
    .selected > td {
        color: white;
        background: ${props => props.theme.selectedRow} !important;
    }

${'' /* text color in Mui table */}
    .css-1m13d3u-MuiTableCell-root {
        color: ${props => props.theme.text} !important;
    }
    .MuiTypography-root,
    .MuiInput-root,
    .MuidInput-root > input,
    .MuiInputLabel-root,
    .MuiTableRow-root > td,
    thead > tr > th {
        color: ${props => props.theme.text} !important;
    }
    .MuiFormGroup-root > label > span > svg {
        color: ${props => props.theme.scrubBar} !important;
    }

    .info-card{
        background: ${props => props.theme.selectedRow} !important;
    }


${'' /* routes */}
    .leaflet-interactive {
        stroke: ${props => props.theme.scrubBar} !important;
    }
`;