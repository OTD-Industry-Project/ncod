/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Fri Dec 24 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from "react";
import { LayersControl, FeatureGroup, Popup, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import "./MapWrapper.css";

/**@module BusIcon */

/**
 * Each entry in the schedule is mapped to a BusIcon
 * @function BusIcon
 * @param {props} props Various Objects and variables used to setup each Bus Icon
 * @returns {Component} Renderable Component
 *
 * <img src="bus-icon.png" >
 */

//Mapping each marker to matching waypoints, allowing to re-render when pickup lat/long is changed simulating movement
const BusIcons = (props) => {
    // eslint-disable-next-line no-lone-blocks
    {
        props.tracking &&
            props.tracking.map((bus, index) => {
                let k = Object.keys(bus);
                props.schedule.forEach((trip) => {
                    bus[k].forEach((updated) => {
                        if (updated.time_stamp.substring(0, 5) === props.time) {
                            if (trip.vehicle_id.toString() === k.toString()) {
                                trip.pickup_latitude = updated.latitude;
                                trip.pickup_longitude = updated.longitude;
                            }
                        }
                    });
                });
            });
    }

    // Create custom Marker Icons
    var icon = divIcon();

    /**
     * @name Schedule
     * @description Building the icons with a name and color.
     * 
     * @example
     * 
     * var schedule = null;
    var name = "";
    var busColor;
    switch (props.type) {
        // ADD IN A COLOUR
        case "predeparted":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Pre Departed"
            );
            busColor = props.colors.predeparted;
            name = "predeparted";
            break;
        case "ontime":
            schedule = props.schedule.filter(
                (buses) => buses.status === "On Time"
            );
            busColor = props.colors.ontime;
            name = "ontime";
            break;
        case "delayed":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Delayed"
            );
            busColor = props.colors.delayed;
            name = "delayed";
            break;
        case "completed":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Completed"
            );
            busColor = props.colors.completed;
            name = "completed";
            break;
        default:
            schedule = props.schedule.filter(
                (buses) => buses.status === "Pre Departed"
            );
            busColor = props.colors.predeparted;
            name = "predeparted";
    }
     * 
     */
    var schedule = null;
    var name = "";
    var busColor;
    switch (props.type) {
        // ADD IN A COLOUR
        case "predeparted":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Pre Departed"
            );
            busColor = props.colors.predeparted;
            name = "predeparted";
            break;
        case "ontime":
            schedule = props.schedule.filter(
                (buses) => buses.status === "On Time"
            );
            busColor = props.colors.ontime;
            name = "ontime";
            break;
        case "delayed":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Delayed"
            );
            busColor = props.colors.delayed;
            name = "delayed";
            break;
        case "completed":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Completed"
            );
            busColor = props.colors.completed;
            name = "completed";
            break;
        default:
            schedule = props.schedule.filter(
                (buses) => buses.status === "Pre Departed"
            );
            busColor = props.colors.predeparted;
            name = "predeparted";
    }

    return (
        <>
            {/* looping over the pickup points, and plotting with a coloured circle */}
            <LayersControl.Overlay checked name={name}>
                <FeatureGroup>
                    {schedule.map(
                        (buses) => (
                            (icon = divIcon({
                                className: "marker " + name,
                                html: `<div style="background-color: ${busColor};"><span>${buses.vehicle_id}</span>`,
                                // eslint-disable-next-line no-sequences
                            })),
                            (
                                <Marker
                                    icon={icon}
                                    key={buses.job_id}
                                    eventKey={schedule.job_id}
                                    position={[
                                        buses.pickup_latitude,
                                        buses.pickup_longitude,
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
                                    <Popup offset={[-4, -6]}>
                                        <h5>{buses.status}</h5> <br />
                                        Location: {buses.pickup_point} <br />
                                        destination: {buses.destination} <br />
                                        VehicleID : {buses.vehicle_id} <br />
                                        DriverID : {buses.driver_id} <br />
                                    </Popup>
                                </Marker>
                            )
                        )
                    )}
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
};

export default BusIcons;
