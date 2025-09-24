import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../utils/common";
import { Button, Group, Select, TextInput, Alert } from "@mantine/core";
import useCountries from "../hooks/useCountries";
import Map from "./Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
	const { getAll } = useCountries();
	const [locationError, setLocationError] = useState("");
	const [isLoadingLocation, setIsLoadingLocation] = useState(false);

	const form = useForm({
		initialValues: {
			country: propertyDetails?.country || "",
			city: propertyDetails?.city || "",
			address: propertyDetails?.address || "",
		},
		validate: {
			country: (value) => validateString(value),
			city: (value) => validateString(value),
			address: (value) => validateString(value),
		},
	});

	const { country, city, address } = form.values;

	// Function to reverse geocode coordinates to address
	const reverseGeocode = async (lat, lng) => {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
			);
			const data = await response.json();
			
			if (data && data.address) {
				const countryName = data.address.country || "";
				const addressName = data.display_name || "";

				// Update form values - only country and address, NOT city (Name of park)
				form.setValues({
					country: countryName,
					city: form.values.city, // Keep existing city value
					address: addressName,
				});

				setLocationError("");
			}
		} catch (error) {
			console.error("Reverse geocoding failed:", error);
			setLocationError("Failed to get address details from location");
		} finally {
			setIsLoadingLocation(false);
		}
	};

	// Get current location on component mount
	useEffect(() => {
		if (navigator.geolocation) {
			setIsLoadingLocation(true);
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude, accuracy } = position.coords;
					console.log(`Location accuracy: ${accuracy} meters`);
					reverseGeocode(latitude, longitude);
				},
				(error) => {
					setIsLoadingLocation(false);
					switch (error.code) {
						case error.PERMISSION_DENIED:
							setLocationError(
								"Location access denied. Please enable location permissions in your browser settings and refresh the page to auto-fill your current location."
							);
							break;
						case error.POSITION_UNAVAILABLE:
							setLocationError("Location information is unavailable.");
							break;
						case error.TIMEOUT:
							setLocationError("Location request timed out. Please try again.");
							break;
						default:
							setLocationError("An unknown error occurred while retrieving location.");
							break;
					}
				},
				{
					enableHighAccuracy: true,
					timeout: 15000,
					maximumAge: 30000,
				}
			);
		} else {
			setLocationError("Geolocation is not supported by this browser.");
		}
	}, []);

	const handleSubmit = () => {
		const { hasErrors } = form.validate();
		if (!hasErrors) {
			setPropertyDetails((prev) => ({ ...prev, country, city, address }));
			nextStep();
		}
	};

	const handleGetCurrentLocation = () => {
		if (navigator.geolocation) {
			setIsLoadingLocation(true);
			setLocationError("");
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude, accuracy } = position.coords;
					console.log(`Manual location accuracy: ${accuracy} meters`);
					reverseGeocode(latitude, longitude);
				},
				(error) => {
					setIsLoadingLocation(false);
					setLocationError(
						"Unable to get your precise location. Please ensure GPS is enabled and try clicking on the map to manually select your location."
					);
				},
				{
					enableHighAccuracy: true,
					timeout: 15000,
					maximumAge: 5000, // Use fresher location data
				}
			);
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{locationError && (
				<Alert color="orange" mb="md">
					{locationError}
					{locationError.includes("denied") && (
						<Button
							size="xs"
							variant="light"
							mt="xs"
							onClick={handleGetCurrentLocation}
							loading={isLoadingLocation}
						>
							Try Again
						</Button>
					)}
				</Alert>
			)}

			<div className="flexCenter">
				{/* {left} */}
				<div className="flexCenter flex-1">
					{/* {inputs} */}
					<div>
						<Select
							w={"100%"}
							withAsterisk
							label="Country"
							clearable
							searchable
							data={getAll()}
							disabled={isLoadingLocation}
							{...form.getInputProps("country", { type: "input" })}
						/>
						<TextInput
							w={"100%"}
							withAsterisk
							label="Name of Park"
							disabled={isLoadingLocation}
							{...form.getInputProps("city", { type: "input" })}
						/>
						<TextInput
							w={"100%"}
							withAsterisk
							label="Set Location"
							disabled={isLoadingLocation}
							{...form.getInputProps("address", { type: "input" })}
						/>
						<Button
							variant="outline"
							size="sm"
							mt="md"
							onClick={handleGetCurrentLocation}
							loading={isLoadingLocation}
							fullWidth
						>
							{isLoadingLocation ? "Getting Location..." : "Use Current Location"}
						</Button>
						
						<div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
							<strong>GPS not accurate?</strong>
							<br />
							Click anywhere on the map to set your exact location
						</div>
					</div>
				</div>
				{/* {right} */}
				<div className="flex-1">
					<Map 
						address={address} 
						city={city} 
						country={country}
						onLocationSelect={reverseGeocode}
					/>
				</div>
			</div>
			<Group justify="center" mt="xl">
				<Button type="submit" disabled={isLoadingLocation}>
					Next step
				</Button>
			</Group>
		</form>
	);
};

export default AddLocation;