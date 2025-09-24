import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

// Default marker icon
let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

// Current location marker icon (different color/style)
let CurrentLocationIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [30, 48],
	iconAnchor: [15, 48],
	popupAnchor: [1, -42],
	className: 'current-location-marker'
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address, userLocation, hasUserLocation, onLocationSelect }) => {
	const map = useMap();
	const [position, setPosition] = useState([60, 19]);
	const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
	const [isAddressSearch, setIsAddressSearch] = useState(false);

	// Handle map clicks to allow manual location selection
	useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);
			setIsAddressSearch(false);
			
			// Immediately update the address fields when user clicks
			if (onLocationSelect) {
				onLocationSelect(lat, lng);
			}
			
			// Show a temporary popup at clicked location
			const popup = L.popup()
				.setLatLng([lat, lng])
				.setContent(`
					<div style="text-align: center;">
						<strong>Location Updated!</strong><br/>
						<small>New coordinates set</small>
					</div>
				`)
				.openOn(map);
			
			// Auto-close popup after 2 seconds
			setTimeout(() => {
				map.closePopup(popup);
			}, 2000);
		}
	});

	// Effect to handle user's current location
	useEffect(() => {
		if (hasUserLocation && userLocation) {
			setCurrentLocationMarker(userLocation);
			// Automatically set current location as selected position for better accuracy
			setPosition(userLocation);
			setIsAddressSearch(false);
			map.flyTo(userLocation, 18);
		}
	}, [hasUserLocation, userLocation, map]);

	// Effect to handle address geocoding
	useEffect(() => {
		if (address && address.trim()) {
			setIsAddressSearch(true);
			ELG.geocode()
				.text(address)
				.run((err, results, response) => {
					if (results?.results?.length > 0) {
						const { lat, lng } = results?.results[0].latlng;
						setPosition([lat, lng]);
						map.flyTo([lat, lng], 17);
					}
				});
		}
	}, [address, map]);

	return (
		<>
			{/* Current location marker (blue) */}
			{currentLocationMarker && (
				<Marker 
					position={currentLocationMarker} 
					icon={CurrentLocationIcon}
				>
					<Popup>
						<div style={{ textAlign: 'center' }}>
							<strong>🌍 Your GPS Location</strong>
							<br />
							<small style={{ color: '#666' }}>This is where GPS thinks you are</small>
							<br />
							<button 
								onClick={() => {
									setPosition(currentLocationMarker);
									setIsAddressSearch(false);
									if (onLocationSelect) {
										onLocationSelect(currentLocationMarker[0], currentLocationMarker[1]);
									}
								}}
								style={{
									marginTop: '8px',
									padding: '4px 8px',
									backgroundColor: '#228be6',
									color: 'white',
									border: 'none',
									borderRadius: '4px',
									cursor: 'pointer',
									marginRight: '4px'
								}}
							>
								Use GPS Location
							</button>
							<br />
							<small style={{ color: '#999', fontSize: '10px' }}>
								If this isn't accurate, click your actual location on the map
							</small>
						</div>
					</Popup>
				</Marker>
			)}

			{/* Selected location marker (red) */}
			<Marker position={position} icon={DefaultIcon}>
				<Popup>
					<div style={{ textAlign: 'center' }}>
						<strong>Selected Location</strong>
						<br />
						<small>
							{isAddressSearch ? 'From address search' : 'Click anywhere on map to move'}
						</small>
						<br />
						<small>
							Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
						</small>
						<br />
						<button 
							onClick={() => {
								if (onLocationSelect) {
									onLocationSelect(position[0], position[1]);
								}
							}}
							style={{
								marginTop: '8px',
								padding: '4px 8px',
								backgroundColor: '#fa5252',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
								cursor: 'pointer'
							}}
						>
							Confirm This Location
						</button>
					</div>
				</Popup>
			</Marker>

			{/* Add custom CSS for current location marker */}
			<style jsx>{`
				:global(.current-location-marker) {
					filter: hue-rotate(240deg) saturate(1.5);
				}
			`}</style>
		</>
	);
};

export default GeoCoderMarker;