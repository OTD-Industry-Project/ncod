/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Sat Nov 27 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from "react";
import "./MapWrapper.css";
import { MapContainer, useMap } from "react-leaflet";
import Layers from "./Layers";
import Loading from "../Loading";

/**@module MapWrapper */

/**
 * Default Position map is centered about
 * @name defaultPosition
 * @type {Object}
 * @example
 * const defaultPosition = { lat: -37.813629, lng: 144.963058 };
 *
 */
const defaultPosition = { lat: -37.813629, lng: 144.963058 }; //Centre of Melbourne CBD

/**
 * Component that wraps the Map, Layers and Event handling
 *
 * @function MapWrapper
 * @param props Destructure into schedule, activeBus, waypoints, Routes and callbacks
 * @returns Component
 */
function MapWrapper({
    schedule,
    activeBus,
    colors,
    activeCallBack,
    waypoints,
    routesArray,
    oldRoutesArray,
    time,
    tracking,
}) {
    // function Event() {
    //     var map = useMap();
    //     if (routesArray != null) {
    //         for (let route of routesArray) {
    //             // route[0].route.addTo(map);
    //         }
    //     }

    //     return null;
    // }

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
            {/* <Event /> */}
            {schedule !== null ? (
                <Layers
                    schedule={schedule}
                    activeBus={activeBus}
                    colors={colors}
                    waypoints={waypoints}
                    routesArray={routesArray}
                    oldRoutesArray={oldRoutesArray}
                    time={time}
                    tracking={tracking}
                />
            ) : (
                <Loading center />
            )}
        </MapContainer>
    );
}

export default MapWrapper;
