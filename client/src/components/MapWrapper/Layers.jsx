import React, { useState } from "react";
import {
    TileLayer, LayersControl, FeatureGroup,
    CircleMarker, Popup, ZoomControl,
    useMapEvents, Marker
} from "react-leaflet";



const Layers = ({ schedule, activeBus }) => {


    // Filtering the schedule to apply different layer controls

    var preDeparted = (schedule.filter((buses) => buses.status === "Pre Departed"));

    var onTime = (schedule.filter((buses) => buses.status === "On Time"));

    var delayed = (schedule.filter((buses) => buses.status === "Delayed"));

    var empty = (schedule.filter((buses) => buses.status === "Completed"));

//Testing flyTo active bus marker... need to select a bus from side bar, then click anywhere on the map

    if (activeBus !== null) {
        LocationMarker()
    }

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setPosition(e.latlng);
                map.flyTo([activeBus.PickupPointLatitude, activeBus.PickupPointLongitude], 14, { duration: 2 });
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    return (
        <>
            <ZoomControl position="topright" /> {/* fully customisable zoom controls*/}
            <LayersControl position="topright"> {/* layer control panel */}
                <LayersControl.BaseLayer checked name="OSM Default">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Dark Mode">
                    <TileLayer
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; 
                        <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    /></LayersControl.BaseLayer>
                <LocationMarker />
                {/* Adding each layer for visibility to be toggled on and off as required
                by looping through the array*/}

                <LayersControl.Overlay
                    checked name={"Pre Departed"}>

                    {/* looping over the pickup points, and plotting with a coloured circle */}

                    <FeatureGroup>
                        {preDeparted.map((buses) => (

                            <CircleMarker
                                key={buses.uid}
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
                                    <h5>{buses.status}</h5> <br />
                                    Location: {buses.PickupPoint} <br />
                                    VehicleID : {buses.VehicleID} <br />
                                    DriverID : {buses.DriverID} <br />
                                </Popup>

                            </CircleMarker>

                        ))}
                    </FeatureGroup>

                </LayersControl.Overlay>

                {/* repeating the above code from different filters, to add the different layers */}

                <LayersControl.Overlay
                    checked name={"On Time"}>

                    <FeatureGroup>
                        {onTime.map((buses) => (

                            <CircleMarker
                                key={buses.uid}
                                eventKey={onTime.uid}
                                center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                                color={'ForestGreen'}

                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                    mouseout: (event) => event.target.closePopup(),
                                }}
                            >
                                <Popup>
                                    <h5>{buses.status}</h5> <br />
                                    Location: {buses.PickupPoint} <br />
                                    VehicleID : {buses.VehicleID} <br />
                                    DriverID : {buses.DriverID} <br />
                                </Popup>

                            </CircleMarker>

                        ))}
                    </FeatureGroup>

                </LayersControl.Overlay>

                <LayersControl.Overlay
                    checked name={"Delayed"}>

                    <FeatureGroup>
                        {delayed.map((buses) => (

                            <CircleMarker
                                key={buses.uid}
                                eventKey={delayed.uid}
                                center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                                color={'OrangeRed'}

                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                    mouseout: (event) => event.target.closePopup(),
                                }}
                            >
                                <Popup>
                                    <h5>{buses.status}</h5> <br />
                                    Location: {buses.PickupPoint} <br />
                                    VehicleID : {buses.VehicleID} <br />
                                    DriverID : {buses.DriverID} <br />
                                </Popup>

                            </CircleMarker>

                        ))}
                    </FeatureGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay
                    checked name={"Empty"}>

                    <FeatureGroup>
                        {empty.map((buses) => (

                            <CircleMarker
                                key={buses.uid}
                                eventKey={empty.uid}
                                center={[buses.PickupPointLatitude, buses.PickupPointLongitude]}
                                color={'DarkGrey'}

                                eventHandlers={{
                                    mouseover: (event) => event.target.openPopup(),
                                    mouseout: (event) => event.target.closePopup(),
                                }}
                            >
                                <Popup>
                                    <h5>{buses.status}</h5> <br />
                                    Location: {buses.PickupPoint} <br />
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