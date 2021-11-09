import React from "react";
import {
    TileLayer,
    LayersControl,
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
                    checked name={"On Time"}
                    key={schedule.uid}>

                    {/* looping over the pickup points, and pltting with a green circle */}

                    {onTime.map((buses) => (

                        <CircleMarker
                            eventKey={buses.VehicleID + buses.DriverID}
                            center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                            color={'green'}

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

                </LayersControl.Overlay>

                {/* repeating the above code from different filters, to add the different layers */}

                <LayersControl.Overlay
                    checked name={"Delayed"}
                    key={schedule.uid}>

                    {delayed.map((buses) => (

                        <CircleMarker
                            eventKey={buses.VehicleID + buses.DriverID}
                            center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                            color={'orange'}

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
                </LayersControl.Overlay>

                <LayersControl.Overlay
                    checked name={"Empty"}
                    key={schedule.uid}>

                    {empty.map((buses) => (

                        <CircleMarker
                            eventKey={buses.VehicleID + buses.DriverID}
                            center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                            color={'dark'}

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

                </LayersControl.Overlay>

            </LayersControl>
        </>
    )
}

export default Layers;