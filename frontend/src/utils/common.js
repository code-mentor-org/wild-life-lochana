export const updateFavourites = (id, favourites) => {
	const safeFavourites = favourites || [];
	
	if (safeFavourites.includes(id)) {
		return safeFavourites.filter((resId) => resId !== id);
	} else {
		return [...safeFavourites, id];
	}
};

export const checkFavourites = (id, favourites) => {
	const safeFavourites = favourites || [];
	return safeFavourites.includes(id) ? "#8ac243" : "white";
};

export const validateString = (value) => {
	return value?.length < 2 || value === null
		? "Must have atleast 2 characters"
		: null;
};
