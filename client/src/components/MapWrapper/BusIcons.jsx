import React from "react";
import {
    LayersControl,
    FeatureGroup,
    Popup,
    Marker,
} from "react-leaflet";
import { divIcon } from "leaflet";
import "./MapWrapper.css";

const BusIcons = (props) => {
    // Create custom Marker Icons
    var icon = divIcon();
    // Filtering the schedule to apply different layer controls
    var schedule = null
    var name = ''
    var busColor
    switch (props.type) {
        // ADD IN A COLOUR 
        case 'predeparted':
            schedule = props.schedule.filter((buses) => buses.status === "Pre Departed");
            busColor=props.colors.predeparted
            name='predeparted'
            break;
        case 'ontime':
            schedule = props.schedule.filter((buses) => buses.status === "On Time");
            busColor=props.colors.ontime
            name='ontime'
            break;
        case 'delayed':
            schedule = props.schedule.filter((buses) => buses.status === "Delayed");
            busColor=props.colors.delayed
            name='delayed'
            break;
        case 'completed':
            schedule = props.schedule.filter((buses) => buses.status === "Completed");
            busColor=props.colors.completed
            name='completed'
            break;
    }

    return (
        <>
            {/* looping over the pickup points, and plotting with a coloured circle */}
            <LayersControl.Overlay checked name={name}>
                <FeatureGroup>
                    {schedule.map(
                        (buses) => (
                            (icon = divIcon({
                                className: "marker "+name,
                                html: `<div style="background-color: ${busColor};"><span>${buses.VehicleID}</span>`,
                            })),
                            (
                                <Marker
                                    icon={icon}
                                    key={buses.uid}
                                    eventKey={schedule.uid}
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
        </>
    );

};

export default BusIcons;