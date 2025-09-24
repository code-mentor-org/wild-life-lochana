import { useState } from "react";
import SideBar from "../../components/admin/SideBar";
import TopBar from "../../components/admin/TopBar";

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
          <div className="w-full mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">John Doe</td>
              </tr>
            </thead>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
