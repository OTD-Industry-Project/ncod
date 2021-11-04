import React from "react";
import "./MapWrapper.css";
import { MapContainer} from "react-leaflet";
import Layers from "./Layers";


const position = {lat: -37.813629, lng: 144.963058};



function MapWrapper() {    
    return (

        <MapContainer
            className="MapWrapper"
            center={position}
            zoom={10}
            zoomControl={false}
            scrollWheelZoom={true}
        >
            <Layers />
        </MapContainer>
        
    );
}

export default MapWrapper;
