import React, { useState, useEffect } from "react";
import { LayersControl, FeatureGroup, Popup, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import "./MapWrapper.css";

const BusIcons = (props) => {
    //console.log(props.time);
    const [currentLocations, setCurrentLocations] = useState(props.time);
    const currentLocation = {};
    {props.tracking &&
        props.tracking.map((bus, index) => {
            //console.log(bus,index);
            let k = Object.keys(bus);
            props.schedule.forEach(trip => {
                currentLocation[k] = {"latitude" : trip.pickup_latitude, "longitude" : trip.pickup_longitude};
               // console.log(trip.vehicle_id);
                bus[k].forEach(updated => {
                    //console.log(updated.time_stamp);
                    if (updated.time_stamp.substring(0, 5) === props.time) {
                        //console.log("match found : " + updated.latitude + ", " + updated.longitude);
                        Object.assign(currentLocation[k], { latitude : updated.latitude, longitude : updated.longitude});
                    }
                    else {
                        Object.assign(currentLocation[k], { latitude : trip.pickup_latitude, longitude : trip.pickup_longitude});
                    }
                });
            });
        console.log(currentLocation);
        //console.log(props.schedule);
    });}

    const getNearestMinute = () => {
        // props.tracking && props.tracking.forEach(bus => );
    };
    

    useEffect(() => {
        getNearestMinute();
    }, []);
    // Create custom Marker Icons
    var icon = divIcon();
    // Filtering the schedule to apply different layer controls
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
                                    <Popup offset={[10, 0]}>
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
