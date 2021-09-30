import React from 'react'
import { MapContainer as LeaFletMap, TileLayer } from 'react-leaflet';
import './map.css'

export const Map = ({ mapCenter, zoom }) => {

    console.log(mapCenter);
    return (
        <div className="map">
            <LeaFletMap
                center={mapCenter}
                zoom={4}
                scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </LeaFletMap>
        </div>
    )
}