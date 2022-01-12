import React from "react";
import "./MapWrapper.css";
import { MapContainer, useMap } from "react-leaflet";
import Layers from "./Layers";
import Loading from "../Loading";

const defaultPosition = { lat: -37.813629, lng: 144.963058 }; //Centre of Melbourne CBD

function MapWrapper({ schedule, activeBus, colors, activeCallBack, routesArray, oldRoutesArray }) {
    function Event() {
        var map = useMap();
        if (routesArray != null) {
            for (let route of routesArray) {
                // console.log(route);
                // route[0].route.addTo(map);
            }
        }

        return null;
    }

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
            <Event />
            {schedule !== null ? (
                <Layers
                    schedule={schedule}
                    activeBus={activeBus}
                    colors={colors}
                    routesArray={routesArray}
                    oldRoutesArray={oldRoutesArray}
                />
            ) : (
                <Loading center />
            )}
        </MapContainer>
    );
}

export default MapWrapper;
