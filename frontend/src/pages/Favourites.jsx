import React, { useContext, useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import Item from "../components/Item";
import useProperties from "../hooks/useProperties.jsx";
import { PuffLoader } from "react-spinners";
import UserDetailContext from "../context/userDetailContext.js";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserWithFavorites } from "../utils/api";

const Favourites = () => {
	const { data: properties, isError, isLoading } = useProperties();
	const [filter, setFilter] = useState("");
	const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
	const { userDetails: { token } } = useContext(UserDetailContext);
	
	// State for favorites
	const [favourites, setFavourites] = useState([]);
	const [favouritesLoading, setFavouritesLoading] = useState(false);
	const [favouritesError, setFavouritesError] = useState(null);

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

	// Fetch favorites when component mounts and when user/token changes
	useEffect(() => {
		const fetchFavourites = async () => {
			// Only fetch if user is authenticated and has email/token
			if (!user?.email || !token || !isAuthenticated) {
				setFavourites([]);
				return;
			}

			try {
				setFavouritesLoading(true);
				setFavouritesError(null);
				console.log("Fetching favorites for:", user.email);
				
				const favoritesData = await getUserWithFavorites(user.email, token);
				console.log("Favorites data received:", favoritesData);
				
				setFavourites(Array.isArray(favoritesData) ? favoritesData : []);
			} catch (error) {
				console.error("Error fetching favorites:", error);
				setFavouritesError(error.message);
				setFavourites([]);
			} finally {
				setFavouritesLoading(false);
			}
		};

		fetchFavourites();
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
						<p className="text-lg">Please log in to view your favorites.</p>
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

	if (isLoading || favouritesLoading) {
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

	if (favouritesError) {
		return (
			<div className="h-64 flexCenter">
				<span>Error loading favorites: {favouritesError}</span>
			</div>
		);
	}

	// Handle case when favourites is empty
	if (!favourites || favourites.length === 0) {
		return (
			<main className="max-padd-container my-[99px]">
				<div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
					<div>
						<Searchbar filter={filter} setFilter={setFilter} />
						<div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
							<div className="col-span-full text-center py-10">
								<p className="text-lg">No favourites yet. Start adding properties to your favourites!</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

	// ✅ FIXED: Since favourites already contains the full property objects,
	// we can use them directly instead of filtering the properties array
	const favoriteProperties = Array.isArray(favourites) ? favourites : [];

	// Apply search filter to the favorite properties
	const filteredProperties = favoriteProperties.filter((property) =>
		property.title.toLowerCase().includes(filter.toLowerCase()) ||
		property.city.toLowerCase().includes(filter.toLowerCase()) ||
		property.country.toLowerCase().includes(filter.toLowerCase())
	);

	console.log("Favorite properties:", favoriteProperties);
	console.log("Filtered properties:", filteredProperties);

	return (
		<main className="max-padd-container my-[99px]">
			<div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
				<div>
					<Searchbar filter={filter} setFilter={setFilter} />

					{filteredProperties.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-lg">No properties match your search criteria.</p>
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

export default Favourites;