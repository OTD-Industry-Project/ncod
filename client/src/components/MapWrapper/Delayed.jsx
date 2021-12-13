import React from "react";
import {
    LayersControl,
    FeatureGroup,
    Popup,
    Marker,
} from "react-leaflet";
import { divIcon } from "leaflet";
import "./MapWrapper.css";

const Delayed = ({ schedule }) => {
    // Create custom Marker Icons
    var icon = divIcon();
    // Filtering the schedule to apply different layer controls
    var delayed = schedule.filter((buses) => buses.status === "Delayed");

    return (
        <>
            {/* looping over the pickup points, and plotting with a coloured circle */}
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

export default Delayed;