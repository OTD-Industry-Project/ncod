import React from "react";
import "./MapWrapper.css";
import { MapContainer } from "react-leaflet";
import Layers from "./Layers";

const defaultPosition = { lat: -37.813629, lng: 144.963058 }; //Centre of Melbourne CBD

function MapWrapper({ schedule, activeBus, colors }) {
    return (
        <MapContainer
            className="MapWrapper"
            center={defaultPosition}
            zoom={10}
            zoomControl={false} //default is {true} and a fixed display on the top left, removing this to import one that can be positioned via Layers.jsx
            attributionControl={false} //default is {true} and a fixed display on the bottom right, removing this to import one that can be positioned via Layers.jsx
            scrollWheelZoom={true}
            maxBoundsViscosity={0.5}
            maxBounds={[
                [-7.616662, 92.639302],
                [-48.102563, 164.401997],
            ]}
        >
            <Layers schedule={schedule} activeBus={activeBus} colors={colors} />
        </MapContainer>
    );
}

export default MapWrapper;
