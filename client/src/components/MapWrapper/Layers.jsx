import React from 'react'
import { useMap, TileLayer, LayersControl, Marker, Popup, ZoomControl } from 'react-leaflet'

const Layers = () => {
    // const map = useMap()

  return (
    <>
    <ZoomControl position="topright"/>
        <LayersControl position="topright">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                

            <LayersControl.Overlay checked name="On Schedule">
                <Marker position={[-37.813629, 144.963058]}
                eventHandlers={{
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                    }}
                >
                    <Popup>
                        On Schedule.
                    </Popup>
                </Marker>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Delayed">
                <Marker position={[-37.829929, 144.898785]}
                eventHandlers={{
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                    }}
                >
                    <Popup>
                        Delayed.
                    </Popup>
                </Marker>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Empty">
                <Marker position={[-37.927189, 144.901017]}
                eventHandlers={{
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                    }}
                >
                    <Popup>
                        Empty.
                    </Popup>
                </Marker>
            </LayersControl.Overlay>
        </LayersControl>
    </>
  )
}

export default Layers;