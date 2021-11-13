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
import { divIcon} from "leaflet";

const Layers = ({ schedule, activeBus }) => {
    // Log active bus. null when nothing selected.
    console.log(activeBus);

    // Create custom Marker Icons
    var icon = divIcon();
    // Initialise empty varibable to contain active bus status
    var activeBusStatus;

    // Filtering the schedule to apply different layer controls

    var preDeparted = schedule.filter(
        (buses) => buses.status === "Pre Departed"
    );

    var onTime = schedule.filter((buses) => buses.status === "On Time");

    var delayed = schedule.filter((buses) => buses.status === "Delayed");

    var empty = schedule.filter((buses) => buses.status === "Completed");

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
                {/* layer control panel */}
                <LayersControl.BaseLayer checked name="OSM Default">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Dark Mode">
                    <TileLayer
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; 
                        <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    />
                </LayersControl.BaseLayer>
                <LocationMarker /> {/* flyTo function call*/}
                {/* Adding each layer for visibility to be toggled on and off as required
                by looping through the array*/}
                <LayersControl.Overlay checked name={"Pre Departed"}>
                    {/* looping over the pickup points, and plotting with a coloured circle */}

                    <FeatureGroup>
                        {preDeparted.map(
                            (buses) => (
                                (icon = divIcon({
                                    className: "marker PreDeparted",
                                    html: `<span>${buses.VehicleID}</span>`,
                                })),
                                (
                                    <Marker
                                        icon={icon}
                                        key={buses.uid}
                                        eventKey={preDeparted.uid}
                                        position={[
                                            buses.PickupPointLatitude,
                                            buses.PickupPointLongitude,
                                        ]}
                                        /* Using event handlers to access mouseover/out features for hover info
                                to be defined inside the Popup tags  */

                                        eventHandlers={{
                                            mouseover: (event) =>
                                                event.target.openPopup(),
                                            mouseout: (event) =>
                                                event.target.closePopup(),
                                        }}
                                    >
                                        <Popup offset={[10, 0]}>
                                            <h5>{buses.status}</h5> <br />
                                            Location: {buses.PickupPoint} <br />
                                            VehicleID : {buses.VehicleID} <br />
                                            DriverID : {buses.DriverID} <br />
                                        </Popup>
                                    </Marker>
                                )
                            )
                        )}
                    </FeatureGroup>
                </LayersControl.Overlay>
                {/* repeating the above code from different filters, to add the different layers */}
                <LayersControl.Overlay checked name={"On Time"}>
                    <FeatureGroup>
                        {onTime.map(
                            (buses) => (
                                (icon = divIcon({
                                    className: "marker OnTime",
                                    html: `<span>${buses.VehicleID}</span>`,
                                })),
                                (
                                    <Marker
                                        icon={icon}
                                        key={buses.uid}
                                        eventKey={onTime.uid}
                                        position={[
                                            buses.PickupPointLatitude,
                                            buses.PickupPointLongitude,
                                        ]}
                                        eventHandlers={{
                                            mouseover: (event) =>
                                                event.target.openPopup(),
                                            mouseout: (event) =>
                                                event.target.closePopup(),
                                        }}
                                    >
                                        <Popup offset={[10, 0]}>
                                            <h5>{buses.status}</h5> <br />
                                            Location: {buses.PickupPoint} <br />
                                            VehicleID : {buses.VehicleID} <br />
                                            DriverID : {buses.DriverID} <br />
                                        </Popup>
                                    </Marker>
                                )
                            )
                        )}
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name={"Delayed"}>
                    <FeatureGroup>
                        {delayed.map(
                            (buses) => (
                                (icon = divIcon({
                                    className: "marker Delayed",
                                    html: `<span>${buses.VehicleID}</span>`,
                                })),
                                (
                                    <Marker
                                        icon={icon}
                                        key={buses.uid}
                                        eventKey={delayed.uid}
                                        position={[
                                            buses.PickupPointLatitude,
                                            buses.PickupPointLongitude,
                                        ]}
                                        eventHandlers={{
                                            mouseover: (event) =>
                                                event.target.openPopup(),
                                            mouseout: (event) =>
                                                event.target.closePopup(),
                                        }}
                                    >
                                        <Popup offset={[10, 0]}>
                                            <h5>{buses.status}</h5> <br />
                                            Location: {buses.PickupPoint} <br />
                                            VehicleID : {buses.VehicleID} <br />
                                            DriverID : {buses.DriverID} <br />
                                        </Popup>
                                    </Marker>
                                )
                            )
                        )}
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name={"Empty"}>
                    <FeatureGroup>
                        {empty.map(
                            (buses) => (
                                (icon = divIcon({
                                    className: "marker Completed",
                                    html: `<span>${buses.VehicleID}</span>`,
                                })),
                                (
                                    <Marker
                                        icon={icon}
                                        key={buses.uid}
                                        eventKey={empty.uid}
                                        position={[
                                            buses.PickupPointLatitude,
                                            buses.PickupPointLongitude,
                                        ]}
                                        eventHandlers={{
                                            mouseover: (event) =>
                                                event.target.openPopup(),
                                            mouseout: (event) =>
                                                event.target.closePopup(),
                                        }}
                                    >
                                        <Popup offset={[10, 0]}>
                                            <h5>{buses.status}</h5> <br />
                                            Location: {buses.PickupPoint} <br />
                                            VehicleID : {buses.VehicleID} <br />
                                            DriverID : {buses.DriverID} <br />
                                        </Popup>
                                    </Marker>
                                )
                            )
                        )}
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </>
    );
};

export default Layers;
