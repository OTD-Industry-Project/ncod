import React, { useState, useRef, useEffect } from "react";
import {
    AttributionControl,
    TileLayer,
    LayersControl,
    Popup,
    ZoomControl,
    Marker,
    useMap,
    Polyline,
    FeatureGroup,
} from "react-leaflet";
import { divIcon } from "leaflet";
import BusIcons from "./BusIcons";

const Layers = ({
    schedule,
    activeBus,
    colors,
    waypoints,
    routesArray,
    oldRoutesArray,
    time,
    tracking,
}) => {
    // Create custom Marker Icons
    var icon = divIcon();
    // Variable for icon colors
    var busColor;

    // waypoints.length !== 0 && console.log(waypoints[0]);

    // Clicking an item on the sidebar, will change focused position and provide info
    function LocationMarker() {
        const [position, setPosition] = useState(null);

        // When clicked on sidebar, will update position of active selection, flyTo location
        const maps = useMap();
        if (oldRoutesArray != null) {
            for (let route of oldRoutesArray) {
                maps.removeControl(route[0].route);
            }
        }
        if (activeBus === null && routesArray != null) {
            for (let route of routesArray) {
                maps.removeControl(route[0].route);
            }
        }
        if (position === null && activeBus !== null) {
            //display a route
            // console.log(activeBus.vehicle_id)
            for (let route of routesArray) {
                maps.removeControl(route[0].route);
                if (route[1] === activeBus.vehicle_id) {
                    route[0].route.addTo(maps);
                }
                // console.log
            }
            setPosition(
                activeBus.pickup_longitude + ", " + activeBus.pickup_latitude
            );
            maps.flyTo(
                [activeBus.pickup_latitude, activeBus.pickup_longitude],
                14,
                { duration: 2 }
            );

            // Setting busColor variable depending no current bus status
            if (activeBus.status === "On Time") {
                busColor = colors.ontime;
            } else if (activeBus.status === "Pre Departed") {
                busColor = colors.predeparted;
            } else if (activeBus.status === "Delayed") {
                busColor = colors.delayed;
            } else {
                busColor = colors.completed;
            }

            // Assigning CSS class based on bus status
            icon = divIcon({
                className: "marker",
                html: `<div style="background-color: ${busColor}"><span>${activeBus.vehicle_id}</span>`,
            });
        }

        // Access active bus Marker to force open Popup on selection
        const MyMarker = (props) => {
            const leafletRef = useRef();
            useEffect(() => {
                leafletRef.current.openPopup();
            }, []);
            return <Marker ref={leafletRef} {...props} />;
        };

        // Places a marker at the location, with an open Popup conating info, closeable
        return position === null ? null : (
            <MyMarker
                icon={icon}
                position={[
                    activeBus.pickup_latitude,
                    activeBus.pickup_longitude,
                ]}
                /* Using event handlers to access mouseover/out features for hover info
                to be defined inside the Popup tags  */
                eventHandlers={{
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                }}
            >
                <Popup direction="top" offset={[8, -5]}>
                    <h5>{activeBus.status}</h5> <br />
                    Location: {activeBus.pickup_point} <br />
                    destination: {activeBus.destination} <br />
                    VehicleID : {activeBus.vehicle_id} <br />
                    DriverID : {activeBus.driver_id} <br />
                </Popup>
            </MyMarker>
        );
    }

    // Map layer rendering and marker plots
    return (
        <>
            <ZoomControl position="topright" />{" "}
            {/* fully customisable zoom controls*/}
            <LayersControl position="topright">
                {" "}
                {/* default map layer */}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* fully customisable attribution controls*/}
                <AttributionControl position="bottomleft" />
                {/* flyTo function call to focus on active bus*/}
                <LocationMarker />
                <LayersControl.Overlay name="All Routes">
                    <FeatureGroup>
                        {waypoints &&
                            waypoints.map((bus, index) => {
                                let k = Object.keys(bus);
                                return (
                                    <Polyline
                                        key={`${index}`}
                                        weight={8}
                                        positions={bus[k[0]]}
                                    />
                                );
                            })}
                    </FeatureGroup>
                </LayersControl.Overlay>
                {/* Adding each layer for visibility to be toggled on and off as required
                by looping through the array*/}
                <BusIcons
                    schedule={schedule}
                    type={"predeparted"}
                    colors={colors}
                    time={time}
                    tracking={tracking}
                />
                <BusIcons
                    schedule={schedule}
                    type={"ontime"}
                    colors={colors}
                    tracking={tracking}
                    time={time}
                />
                <BusIcons
                    schedule={schedule}
                    type={"delayed"}
                    colors={colors}
                    tracking={tracking}
                    time={time}
                />
                <BusIcons
                    schedule={schedule}
                    type={"completed"}
                    colors={colors}
                    tracking={tracking}
                    time={time}
                />
            </LayersControl>
        </>
    );
};

export default Layers;
