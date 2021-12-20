import React from "react";
import { LayersControl, FeatureGroup, Popup, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import "./MapWrapper.css";

const PreDeparted = ({ schedule, colors }) => {
    // Create custom Marker Icons
    var icon = divIcon();

    // Filtering the schedule to apply different layer controls
    var preDeparted = schedule.filter(
        (buses) => buses.status === "Pre Departed"
    );

    return (
        <>
            {/* looping over the pickup points, and plotting with a coloured circle */}
            <LayersControl.Overlay checked name={"Pre Departed"}>
                <FeatureGroup>
                    {preDeparted.map(
                        (buses) => (
                            (icon = divIcon({
                                className: "marker",
                                html: `<div style="background-color: ${colors.predeparted};"><span>${buses.VehicleID}</span></div>`,
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
        </>
    );
};

export default PreDeparted;
