import React from "react";
import "./MapWrapper.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapWrapper() {
    return (
        <MapContainer
            className="MapWrapper"
            center={[-37.813629, 144.963058]}
            zoom={10}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-37.813629, 144.963058]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapWrapper;
