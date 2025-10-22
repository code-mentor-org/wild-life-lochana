import React, { useContext, useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import Item from "../components/Item";
import useProperties from "../hooks/useProperties.jsx";
import { PuffLoader } from "react-spinners";
import UserDetailContext from "../context/userDetailContext.js";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";

const Bookings = () => {
	const { data: properties, isError, isLoading } = useProperties();
	const [filter, setFilter] = useState("");
	const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
	const { userDetails: { token } } = useContext(UserDetailContext);
	
	// State for bookings
	const [bookings, setBookings] = useState([]);
	const [bookingsLoading, setBookingsLoading] = useState(false);
	const [bookingsError, setBookingsError] = useState(null);

	// Debug Auth0 state
	useEffect(() => {
		console.log("=== AUTH0 DEBUG ===");
		console.log("isAuthenticated:", isAuthenticated);
		console.log("authLoading:", authLoading);
		console.log("User object:", user);
		console.log("User email:", user?.email);
		console.log("Token:", token);
		console.log("=== END DEBUG ===");
	}, [user, isAuthenticated, authLoading, token]);

	// Fetch bookings when component mounts and when user/token changes
	useEffect(() => {
		const fetchBookings = async () => {
			// Only fetch if user is authenticated and has email/token
			if (!user?.email || !token || !isAuthenticated) {
				setBookings([]);
				return;
			}

			try {
				setBookingsLoading(true);
				setBookingsError(null);
				console.log("Fetching bookings for:", user.email);
				
				const bookingsData = await getAllBookings(user.email, token);
				console.log("Bookings data received:", bookingsData);
				
				setBookings(Array.isArray(bookingsData) ? bookingsData : []);
			} catch (error) {
				console.error("Error fetching bookings:", error);
				setBookingsError(error.message);
				setBookings([]);
			} finally {
				setBookingsLoading(false);
			}
		};

		fetchBookings();
	}, [user?.email, token, isAuthenticated]);

	// Wait for auth to load
	if (authLoading) {
		return (
			<div className="h-64 flexCenter">
				<PuffLoader
					height="80"
					width="80"
					radius={1}
					color="#555"
					aria-label="puff-loading"
				/>
			</div>
		);
	}

	// If not authenticated, show message
	if (!isAuthenticated) {
		return (
			<main className="max-padd-container my-[99px]">
				<div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
					<div className="text-center py-20">
						<p className="text-lg">Please log in to view your bookings.</p>
					</div>
				</div>
			</main>
		);
	}

	if (isError) {
		return (
			<div className="h-64 flexCenter">
				<span>Error while fetching properties data</span>
			</div>
		);
	}

	if (isLoading || bookingsLoading) {
		return (
			<div className="h-64 flexCenter">
				<PuffLoader
					height="80"
					width="80"
					radius={1}
					color="#555"
					aria-label="puff-loading"
				/>
			</div>
		);
	}

	if (bookingsError) {
		return (
			<div className="h-64 flexCenter">
				<span>Error loading bookings: {bookingsError}</span>
			</div>
		);
	}

	// Handle case when bookings is empty
	if (!bookings || bookings.length === 0) {
		return (
			<main className="max-padd-container my-[99px]">
				<div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
					<div>
						<Searchbar filter={filter} setFilter={setFilter} />
						<div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
							<div className="col-span-full text-center py-10">
								<p className="text-lg">No bookings yet. Start booking properties!</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

	// Get booked property IDs from bookings array
	const bookedPropertyIds = bookings.map(booking => booking.id);

	// Filter properties that are booked
	const bookedProperties = properties?.filter((property) =>
		bookedPropertyIds.includes(property._id)
	) || [];

	console.log("Booked property IDs:", bookedPropertyIds);
	console.log("Booked properties:", bookedProperties);

	// Apply search filter
	const filteredProperties = bookedProperties.filter((property) =>
		property.title.toLowerCase().includes(filter.toLowerCase()) ||
		property.city.toLowerCase().includes(filter.toLowerCase()) ||
		property.country.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<main className="max-padd-container my-[99px]">
			<div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
				<div>
					<Searchbar filter={filter} setFilter={setFilter} />

					{filteredProperties.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-lg">No booked properties match your search criteria.</p>
						</div>
					) : (
						<div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
							{filteredProperties.map((property) => (
								<Item key={property._id} property={property} />
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Bookings;