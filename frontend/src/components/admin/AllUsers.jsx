import axios from "axios";
import { useEffect,useState } from "react";

const AllUsers = () => {
    const [userData, setUserData] = useState([])

    const handleFetchUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/user/allUsers`)
            setUserData(res?.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFetchUsers();
    }, [])

    return <div className="w-full mt-4">
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                </tr>
            </thead>
            <thead>
                {userData?.map((user) => (
                    <tr key={user?._id}>
                        <td className="border border-gray-300 px-4 py-2">{user?._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{user?.email}</td>
                    </tr>
                ))}
            </thead>
        </table>
    </div>
}
export default AllUsers;
