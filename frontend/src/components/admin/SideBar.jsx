import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ setSection }) => {
    const [actuve, setActuve] = useState("P")
    const handleChangeType = (type) => {
        setActuve(type)
        setSection(type)
    }
    const navigate = useNavigate();
    return <div className="w-full h-screen flex flex-col">
        <div className="flex justify-center items-center text-[25px] cursor-pointer" onClick={() => navigate("/")}>
            <strong>WILD</strong>LIFE
        </div>
        <div className="w-full mt-12 px-3 h-[90%] flex flex-col justify-between">
            <div className="w-full">
                <div onClick={() => handleChangeType("P")} style={{ backgroundColor: actuve === "P" ? "#4f860c" : "" }}
                    className="w-full h-[40px] bg-[#8AC343] flex justify-start text-white font-medium
            items-center rounded-r-2xl cursor-pointer ps-2">All Properties</div>
                <div onClick={() => handleChangeType("U")} style={{ backgroundColor: actuve === "U" ? "#4f860c" : "" }}
                    className="w-full h-[40px] bg-[#8AC343] flex justify-start text-white font-medium
            items-center rounded-r-2xl cursor-pointer ps-2 mt-3">All Users</div>
            <div onClick={() => handleChangeType("B")} style={{ backgroundColor: actuve === "U" ? "#4f860c" : "" }}
                    className="w-full h-[40px] bg-[#8AC343] flex justify-start text-white font-medium
            items-center rounded-r-2xl cursor-pointer ps-2 mt-3">All Bookings</div>
            </div>
            <div
            onClick={() => navigate("/admin")}
                className="w-full h-[40px] bg-[#dc2626] flex justify-start text-white font-medium
            items-center rounded-r-2xl cursor-pointer ps-2 mb-12">Logout</div>
        </div>
    </div>;
}
export default SideBar;