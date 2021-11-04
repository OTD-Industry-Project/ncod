import React from "react";
import "./MapWrapper.css";
import { MapContainer} from "react-leaflet";
import Layers from "./Layers";


const position = {lat: -37.813629, lng: 144.963058}; //Centre of Melbourne CBD



function MapWrapper() {    
    return (

        <MapContainer
            className="MapWrapper"
            center={position}
            zoom={10}
            zoomControl={false} //default is {true} and a fixed display on the top left, removing this to import one that can be positioned via Layers.jsx
            scrollWheelZoom={true}
        >
            <Layers />
        </MapContainer>
        
    );
}

export default MapWrapper;
