import React from "react";
import {
    TileLayer,
    LayersControl,
    CircleMarker,
    Popup,
    ZoomControl,
} from "react-leaflet";
import test_data from "../../data/TEST_DATA.json"

const Layers = ({ schedule }) => {
    
    console.log(schedule);
    
    const data = test_data;

    //testing arrays and looping through data to extract something useful for layers control//

    // const bus = Array.from(addressData.locations.map(buses => buses.statusUpdate));

    
    /*     var busStatus = data.reduce(function (r, a) {
            r[a.SingleJourney] = r[a.SingleJourney] || [];
            r[a.SingleJourney].push(a);
            return r;
        }, Object.create(null));
    
        console.log(busStatus); */


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
                    checked name={"DriverID: " + data.DriverID + " Driving Bus# " + data.VehicleID} //planning to sort this somehow
                    key={data.element}>

                    {/* looping over the pickup points, and pltting with a blue circle */}

                    {data.map((buses) => (

                        <CircleMarker
                            eventKey={buses.VehicleID + buses.DriverID}
                            center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}

                            /* Using event handlers to access mouseover/out features for hover info
                            to be defined inside the Popup tags  */

                            eventHandlers={{
                                mouseover: (event) => event.target.openPopup(),
                                mouseout: (event) => event.target.closePopup(),
                            }}
                        >
                            <Popup>
                                <h6>{buses.PickupPoint}</h6> <br />
                                VehicleID : {buses.VehicleID} <br />
                                DriverID : {buses.DriverID}
                            </Popup>

                        </CircleMarker>

                    ))}

                    {/* looping over the destination points, and pltting with a red circle */}

                    {data.map((buses) => (

                        <CircleMarker
                            eventKey={buses.VehicleID + buses.DriverID}
                            center={[buses.DestinationLatitude, buses.DestinationLongitude]}
                            color={'dark'} //default is blue

                            /* Using event handlers to access mouseover/out features for hover info
                            to be defined inside the Popup tags  */

                            eventHandlers={{
                                mouseover: (event) => event.target.openPopup(),
                                mouseout: (event) => event.target.closePopup(),
                            }}
                        >
                            <Popup>
                                <h6>{buses.Destination}</h6> <br />
                                VehicleID : {buses.VehicleID} <br />
                                DriverID : {buses.DriverID}
                            </Popup>

                        </CircleMarker>

                    ))}
                </LayersControl.Overlay>

            </LayersControl>
        </>
    )
}

export default Layers;