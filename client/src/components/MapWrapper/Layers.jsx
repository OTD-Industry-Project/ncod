import React, { useState, useRef, useEffect } from "react";
import {
    TileLayer,
    LayersControl,
    FeatureGroup,
    Popup,
    ZoomControl,
    Marker,
    useMap,
} from "react-leaflet";
import { divIcon } from "leaflet";
import Delayed from "./Delayed";
import EmptyBus from "./EmptyBus.jsx";
import PreDeparted from "./PreDeparted";
import OnTime from "./OnTime";

const Layers = ({ schedule, activeBus, colors }) => {
    // Create custom Marker Icons
    var icon = divIcon();
    // Initialise empty varibable to contain active bus status
    var activeBusStatus;

    // Clicking an item on the sidebar, will change focused position and provide info
    function LocationMarker() {
        const [position, setPosition] = useState(null);

        // When clicked on sidebar, will update position of active selection, flyTo location
        const maps = useMap();
        if (position === null && activeBus !== null) {
            setPosition(
                activeBus.PickupPointLongitude +
                    ", " +
                    activeBus.PickupPointLatitude
            );
            maps.flyTo(
                [activeBus.PickupPointLatitude, activeBus.PickupPointLongitude],
                14,
                { duration: 2 }
            );

            // Setting variable to be passed allowing access to CSS classes where 'activeBus.status' contains a space
            if (activeBus.status === "On Time") {
                activeBusStatus = "OnTime";
            } else if (activeBus.status === "Pre Departed") {
                activeBusStatus = "PreDeparted";
            } else {
                activeBusStatus = activeBus.status;
            }
            // Assigning CSS class based on bus status
            icon = divIcon({
                className: "marker " + activeBusStatus,
                html: `<span>${activeBus.VehicleID}</span>`,
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
                    activeBus.PickupPointLatitude,
                    activeBus.PickupPointLongitude,
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
                    Location: {activeBus.PickupPoint} <br />
                    VehicleID : {activeBus.VehicleID} <br />
                    DriverID : {activeBus.DriverID} <br />
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
                {/* flyTo function call to focus on active bus*/}
                <LocationMarker />
                {/* Adding each layer for visibility to be toggled on and off as required
                by looping through the array*/}
                <PreDeparted schedule={schedule} colors={colors} />
                <OnTime schedule={schedule} colors={colors} />
                <Delayed schedule={schedule} colors={colors} />
                <EmptyBus schedule={schedule} colors={colors} />
            </LayersControl>
        </>
    );
};

export default Layers;
