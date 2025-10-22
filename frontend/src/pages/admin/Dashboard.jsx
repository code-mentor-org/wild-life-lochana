import { useState } from "react";
import SideBar from "../../components/admin/SideBar";
import TopBar from "../../components/admin/TopBar";
import AllPropperties from "../../components/admin/AllProperties";
import AllUsers from "../../components/admin/AllUsers";
import AllBookings from "../../components/admin/AllBookings";

const Dashboard = () => {
  const [section, setsSction] = useState("P");

  return (
    <div className="w-full h-full flex  mt-3">
      <div className="w-[20%] h-full">
        <SideBar setSection={setsSction} />
      </div>
      <div className="flex-1 h-full flex flex-col mr-3 gap-10">
        <div className="flex h-[50px]">
          <TopBar />
        </div>
        <div className="bg-[#f2f2f2] p-3 flex flex-col rounded-lg">
          <div className="w-full h-[40px] text-[20px] font-bold">
            {section === "P" ? "All Properties" : "All Users"}
          </div>
          <div className="flex-1 overflow-auto">
            {(() => {
              switch (section) {
                case "P":
                  return <AllPropperties />;
                case "U":
                  return <AllUsers/>;
                case "B":
                  return <AllBookings/>;
                default:
                  return <AllPropperties />;
              }
            })()}
          </div>

        </div>
      </div>
    </div>
  );
};
export default Dashboard;
