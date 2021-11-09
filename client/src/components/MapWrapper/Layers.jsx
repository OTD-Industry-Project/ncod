import React from "react";
import {
    TileLayer,
    LayersControl,
    FeatureGroup,
    CircleMarker,
    Popup,
    ZoomControl,
} from "react-leaflet";

const Layers = ({ schedule }) => {

    // still in progress, attempting to access the active item clicked in sidebar

    /*     var i = 0;
        if (schedule.active = false) { 
            i = schedule.uid;
        console.log(schedule.active);
        } */



    // Filtering the schedule to apply different layer controls

    console.log(schedule);

    var preDeparted = (schedule.filter((buses) => buses.status === "Pre Departed"));

    var onTime = (schedule.filter((buses) => buses.status === "On Time"));

    var delayed = (schedule.filter((buses) => buses.status === "Delayed"));

    var empty = (schedule.filter((buses) => buses.status === "Completed"));

    return (
        <>
            <ZoomControl position="topright" /> {/* fully customisable zoom controls*/}
            <LayersControl position="topright"> {/* layer control panel */}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Adding each layer for visibility to be toggled on and off as required
                by looping through the array*/}

                <LayersControl.Overlay
                    checked name={"Pre Departed"}
                    key={schedule.uid}>

                    {/* looping over the pickup points, and plotting with a coloured circle */}

                    <FeatureGroup>
                        {preDeparted.map((buses) => (

                            <CircleMarker
                                eventKey={preDeparted.uid}
                                center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                                color={'DodgerBlue'}

                                /* Using event handlers to access mouseover/out features for hover info
                                to be defined inside the Popup tags  */

                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                    mouseout: (event) => event.target.closePopup(),
                                }}
                            >
                                <Popup>
                                    <h4>{buses.status}</h4> <br />
                                    <h6>{buses.PickupPoint}</h6> <br />
                                    VehicleID : {buses.VehicleID} <br />
                                    DriverID : {buses.DriverID} <br />
                                </Popup>

                            </CircleMarker>

                        ))}
                    </FeatureGroup>

                </LayersControl.Overlay>

                {/* repeating the above code from different filters, to add the different layers */}

                <LayersControl.Overlay
                    checked name={"On Time"}
                    key={schedule.uid}>

                    <FeatureGroup>
                        {onTime.map((buses) => (

                            <CircleMarker
                                eventKey={onTime.uid}
                                center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                                color={'ForestGreen'}

                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                    mouseout: (event) => event.target.closePopup(),
                                }}
                            >
                                <Popup>
                                    <h4>{buses.status}</h4> <br />
                                    <h6>{buses.PickupPoint}</h6> <br />
                                    VehicleID : {buses.VehicleID} <br />
                                    DriverID : {buses.DriverID} <br />
                                </Popup>

                            </CircleMarker>

                        ))}
                    </FeatureGroup>

                </LayersControl.Overlay>

                <LayersControl.Overlay
                    checked name={"Delayed"}
                    key={schedule.uid}>

                    <FeatureGroup>
                        {delayed.map((buses) => (

                            <CircleMarker
                                eventKey={delayed.uid}
                                center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                                color={'OrangeRed'}

                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                    mouseout: (event) => event.target.closePopup(),
                                }}
                            >
                                <Popup>
                                    <h4>{buses.status}</h4> <br />
                                    <h6>{buses.PickupPoint}</h6> <br />
                                    VehicleID : {buses.VehicleID} <br />
                                    DriverID : {buses.DriverID} <br />
                                </Popup>

                            </CircleMarker>

                        ))}
                    </FeatureGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay
                    checked name={"Empty"}
                    key={schedule.uid}>

                    <FeatureGroup>
                        {empty.map((buses) => (

                            <CircleMarker
                                eventKey={empty.uid}
                                center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                                color={'DarkGrey'}

                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                    mouseout: (event) => event.target.closePopup(),
                                }}
                            >
                                <Popup>
                                    <h4>{buses.status}</h4> <br />
                                    <h6>{buses.PickupPoint}</h6> <br />
                                    VehicleID : {buses.VehicleID} <br />
                                    DriverID : {buses.DriverID} <br />
                                </Popup>

                            </CircleMarker>

                        ))}
                    </FeatureGroup>

                </LayersControl.Overlay>

            </LayersControl>
        </>
    )
}

export default Layers;