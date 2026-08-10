import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-[#091413] text-white">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <Topbar />

        <Outlet />
      </div>
    </div>
  );
}