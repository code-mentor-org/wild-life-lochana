import axios from "axios";
import { useEffect, useState } from "react";

const AllBookings = () => {
    const [bookingsData, setBookingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            // Get all users
            const usersRes = await axios.get(`http://localhost:8000/api/user/allUsers`);
            const users = usersRes?.data || [];
            
            // Fetch and organize bookings by user
            const userBookingsData = [];
            
            for (const user of users) {
                try {
                    const bookingsRes = await axios.post(`http://localhost:8000/api/user/allBookings`, {
                        email: user.email
                    });
                    
                    const userBookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : 
                                      bookingsRes.data?.bookedVisits || [];
                    
                    userBookingsData.push({
                        userId: user._id,
                        userEmail: user.email,
                        totalBookings: userBookings.length,
                        bookings: userBookings.map(booking => ({
                            propertyId: booking.id,
                            bookingDate: booking.date,
                            bookingId: booking._id
                        }))
                    });
                } catch (userError) {
                    console.log(`Error fetching bookings for user ${user.email}:`, userError);
                    userBookingsData.push({
                        userId: user._id,
                        userEmail: user.email,
                        totalBookings: 0,
                        bookings: []
                    });
                }
            }
            
            setBookingsData(userBookingsData);
            
        } catch (error) {
            console.log("Error fetching bookings:", error);
            setError("Failed to fetch bookings data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="w-full mt-4 flex justify-center items-center h-32">
                <div className="text-lg">Loading bookings data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full mt-4 flex justify-center items-center h-32">
                <div className="text-lg text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="w-full mt-4">
            <h2 className="text-2xl font-bold mb-4">All Bookings by User</h2>
            
            {bookingsData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No bookings found
                </div>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">User Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Total Bookings</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Booking Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsData?.map((user) => (
                            <tr key={user?.userId} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">
                                    {user?.userEmail}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${
                                        user?.totalBookings > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user?.totalBookings} bookings
                                    </span>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user?.bookings.length > 0 ? (
                                        <div className="space-y-1">
                                            {user.bookings.map((booking, index) => (
                                                <div key={index} className="text-sm bg-blue-50 p-2 rounded">
                                                    <div><strong>Property:</strong> {booking.propertyId}</div>
                                                    <div><strong>Date:</strong> {booking.bookingDate}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-gray-500 text-sm">No bookings</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AllBookings;