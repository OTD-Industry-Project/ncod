import React from 'react'
import { TileLayer, LayersControl, Marker, Popup, ZoomControl } from 'react-leaflet'
import addressData from "../../data/address.json"

const Layers = () => {
    const bus = [new Set(addressData.locations.map(buses => buses.statusUpdate))]
    console.log(bus);

    return (
        <>
            <ZoomControl position="topright" /> {/* fully customisable zoom controls*/}
            <LayersControl position="topright"> {/* layer control panel */}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />



                {/* Adding each layer for visibility to be toggled on and off as required.*/}

                <LayersControl.Overlay checked name="On Schedule">

                    {/* Looping through JSON array imported from ./data/address.json to display markers */}

                    {addressData.locations.map(buses => (
                        <Marker
                            key={buses.addr_name}
                            position={[buses.addr_lat, buses.addr_long]}

                            /* Using event handlers to access mouseover/out features for hover info
                            to be defined inside the Popup tags  */

                            eventHandlers={{
                                mouseover: (event) => event.target.openPopup(),
                                mouseout: (event) => event.target.closePopup(),
                            }}
                        >
                            <Popup>
                                <h6>{buses.addr_name}</h6> <br />
                                {buses.addr_street} <br />
                                {buses.addr_suburb}
                            </Popup>
                        </Marker>
                    ))}

                </LayersControl.Overlay>
{/* 
                <LayersControl.Overlay checked name="Delayed">
                    {addressData.locations.map(buses => (
                        <Marker
                            key={buses.addr_name}
                            position={[buses.addr_lat, buses.addr_long]}

                             //Using event handlers to access mouseover/out features for hover info
                            to be defined inside the Popup tags  //

                            eventHandlers={{
                                mouseover: (event) => event.target.openPopup(),
                                mouseout: (event) => event.target.closePopup(),
                            }}
                        >
                            <Popup>
                                <h6>{buses.addr_name}</h6> <br />
                                {buses.addr_street} <br />
                                {buses.addr_suburb}
                            </Popup>
                        </Marker>
                    ))}
                </LayersControl.Overlay>
                 */}
            </LayersControl>
        </>
    )
}

export default Layers;