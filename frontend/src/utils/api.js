import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000/api";

export const api = axios.create({
    baseURL: BASE_URL,
});

export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd", {
            timeout: 10 * 1000,
        });
        if (response.status === 400 || response.status === 500) {
            throw response.data;
        }
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
};

export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000,
        });
        if (response.status === 400 || response.status === 500) {
            throw response.data;
        }
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
};

export const createUser = async (email) => {
    try {
        await api.post(`/user/register`, { email });
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

export const bookVisit = async (date, propertyId, email, token) => {
    try {
        await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: dayjs(date).format("DD/MM/YYYY"),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong, Try again please");
        throw error;
    }
};

export const removeBooking = async (id, email, token) => {
    try {
        await api.post(
            `/user/removeBooking/${id}`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong, Try again please");
        throw error;
    }
};

export const toFav = async (id, email, token) => {
    try {
        await api.post(
            `/user/toFav/${id}`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
};

// Get all favorites
export const getAllFav = async (email, token) => {
    try {
        const response = await api.post(
            `/user/allFav`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch favorites", { position: "bottom-right" });
        throw error;
    }
};

export const getUserWithFavorites = async (email, token) => {
    try {
        const response = await api.post(
            `/user/allFav`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch user favorites", { position: "bottom-right" });
        throw error;
    }
};

// FIXED: getAllBookings function
// In utils/api.js - FIXED version
export const getAllBookings = async (email, token) => {
    console.log("API: Getting bookings for email:", email);
    
    if (!email || !token) {
        console.log("API: Skipping bookings fetch - no email or token");
        return [];
    }
    
    try {
        const response = await api.post(
            `/user/allBookings`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("API: Bookings response:", response.data);
        
        // Handle different response formats
        if (Array.isArray(response.data)) {
            return response.data;
        } else if (response.data && Array.isArray(response.data.bookedVisits)) {
            return response.data.bookedVisits;
        } else {
            return [];
        }
    } catch (error) {
        console.error("API: Error fetching bookings:", error);
        
        // Don't show toast for unauthorized/not authenticated
        if (error.response?.status === 401 || error.response?.status === 404) {
            console.log("User not authenticated or not found");
            return [];
        }
        
        toast.error("Failed to fetch bookings", { position: "bottom-right" });
        throw error;
    }
};

export const createResidency = async (data, token, userEmail) => {
    const requestData = { ...data, userEmail };
    try {
        const res = await api.post(
            `/residency/create`,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        toast.error("Failed to create residency");
        throw error;
    }
};

// In your context or wherever you set user details
// When fetching user data, make sure to include bookings:

const fetchUserDetails = async (email, token) => {
    try {
        const bookings = await getAllBookings(email, token);
        const favorites = await getAllFav(email, token);
        
        setUserDetails(prev => ({
            ...prev,
            bookings: bookings || [],
            favourites: favorites || [],
            token: token
        }));
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};