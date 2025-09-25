import { useEffect, useState } from "react";
import axios from "axios";

const AllPropperties = () => {
    const [properties, setProperties] = useState([]);
    
    useEffect(() => {
        handleLoadData();
    }, [])
    
    const handleLoadData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/residency/allresd");
            setProperties(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this property?")) {
                return;
            }

            await axios.delete(`http://localhost:8000/api/residency/deleteresd/${id}`);
            handleLoadData();
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div className="w-full mt-4">
            <table className="w-full bg-white !rounded-xl">
                <thead className="">
                    <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">ID</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Title</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Delete Time</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Country</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">City</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Image</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property?._id} className="">
                            <td className="border border-gray-300 px-4 py-2 text-sm">{property?._id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">{property?.title}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">{property?.description}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">{property?.price}{" "}Min</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">{property?.country}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">{property?.city}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">
                                {property?.image && (
                                    <img 
                                        src={property.image} 
                                        alt={property.title} 
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">
                                <button 
                                    onClick={() => handleDelete(property?._id)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllPropperties;