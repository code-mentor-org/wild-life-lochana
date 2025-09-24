import React,{useState} from "react";
import adminImg from "../../assets/wild-admin.webp";

const AdminLogin = () => {
  const [formData, setFormData] = useState([{ username: "admin@gmail.com", password: "123456" }]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    if (username === formData[0].username && password === formData[0].password) {
      alert("Login Successful");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[70%] h-[400px] rounded-lg bg-[#ececec] flex">
        <div className="w-[50%] h-full">
          <img
            src={adminImg}
            alt="Admin Side Logo"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="w-[50%] h-full flex flex-col justify-center items-center">
          <h2 className="text-[20px] font-bold">Admin Login</h2>
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-4 mt-6 w-[80%]"
          >
            <input
              type="text"
              placeholder="Username"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-[#8AC343] text-white p-2 font-bold rounded-md hover:bg-[#74af2d] transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
