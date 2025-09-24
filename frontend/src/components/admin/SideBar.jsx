import React, { useState } from "react";

const SideBar = ({setSection}) => {
    const [actuve, setActuve] = useState("P")
    const handleChangeType = (type) => {
        setActuve(type)
        setSection(type)
    }
    
    return <div className="w-full h-full flex flex-col">
        <div className="flex justify-center items-center text-[25px]">
            <strong>WILD</strong>LIFE
        </div>
        <div className="w-full mt-12 px-3">
            <div onClick={()=>handleChangeType("P")} style={{backgroundColor: actuve === "P" ? "#4f860c" : ""}}
            className="w-full h-[40px] bg-[#8AC343] flex justify-start text-white font-medium
            items-center rounded-r-2xl cursor-pointer ps-2">All Properties</div>
            <div onClick={()=>handleChangeType("U")} style={{backgroundColor: actuve === "U" ? "#4f860c" : ""}}
            className="w-full h-[40px] bg-[#8AC343] flex justify-start text-white font-medium
            items-center rounded-r-2xl cursor-pointer ps-2 mt-3">All Users</div>
        </div>
    </div>;
}
export default SideBar;