import React from 'react'
import { TileLayer, LayersControl, Marker, Popup, ZoomControl } from 'react-leaflet'
import addressData from "../../data/address.json"

const Layers = () => {

    //Create array with JSON data imported from ./data/address.json//

    const bus = Array.from(addressData.locations.map(buses => buses.statusUpdate));

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
                
                {addressData.locations.map((buses) => (
                    

                    <LayersControl.Overlay 
                    checked name={buses.statusUpdate}
                    key={buses.statusUpdate}>

                        <Marker
                            eventKey={buses.addr_name}
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

                    </LayersControl.Overlay>
                ))}

            </LayersControl>
        </>
    )
}

export default Layers;