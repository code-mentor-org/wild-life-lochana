import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "./GeoCoderMarker";

const Map = ({ address, city, country, onLocationSelect }) => {
	const [userLocation, setUserLocation] = useState([51.35, 18.8]);
	const [hasUserLocation, setHasUserLocation] = useState(false);

	useEffect(() => {
		// Get user's current location for map centering
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation([latitude, longitude]);
					setHasUserLocation(true);
				},
				(error) => {
					console.log("Could not get user location for map:", error);
					// Keep default location if geolocation fails
				}
			);
		}
	}, []);

	return (
		<MapContainer
			center={userLocation}
			zoom={hasUserLocation ? 18 : 2}
			scrollWheelZoom={true}
			className="h-[24rem] w-full mt-5 z-0"
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<GeoCoderMarker 
				address={`${address} ${city} ${country}`}
				userLocation={userLocation}
				hasUserLocation={hasUserLocation}
				onLocationSelect={onLocationSelect}
			/>
		</MapContainer>
	);
};

export default Map;