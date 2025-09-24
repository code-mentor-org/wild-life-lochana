import Avatar from "../../assets/avatar.jpg";

const TopBar = () => {
    return <div className="w-full h-[50px] flex items-center justify-end">
        <div className="w-[50px] h-[50px] rounded-full bg-gray-10 border-4 border-[#8AC343] p-1">
            <img src={Avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
        </div>
    </div>
}

export default TopBar;