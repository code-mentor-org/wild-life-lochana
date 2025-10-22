import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000/api"; // Add this constant

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
        await api.post(
            `/user/register`,
            { email }
        );
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
        console.log(id);
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
        toast.error();
        throw error;
    }
};

// Use axios instead of fetch for consistency
export const getAllFav = async (email, token) => {
	console.log(email);
	
    try {
        const response = await api.post(`/user/allFav`,{ email });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch favorites",{position:"bottom-right"});
        throw error;
    }
};

export const getUserWithFavorites = async (email, token) => {
    console.log("API: Getting favorites for email:", email); // Debug log
    
    try {
        const response = await api.post(
            `/user/allFav`,
            { email }, // This should be { email: "user@example.com" }
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("API: Favorites response:", response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error("API: Error fetching user favorites:", error);
        toast.error("Failed to fetch user favorites",{position:"bottom-right"});
        throw error;
    }
};

export const getAllBookings = async (email, token) => {
    if (!token) return;
    try {
        const res = await api.post(
            `/user/allBookings`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data["bookedVisits"];
    } catch (e) {
        toast.error("Something went wrong while fetching bookings");
        throw e;
    }
};

export const createResidency = async (data, token, userEmail) => {
    const requestData = { ...data, userEmail };
    console.log(requestData);
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
    } catch (error) {
        toast.error();
        throw error;
    }
};