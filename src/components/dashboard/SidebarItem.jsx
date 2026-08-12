import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function SidebarItem({ item }) {
  const Icon = item.icon;

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  if (item.title === "Logout") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#C9D6D1] transition-all duration-300 hover:bg-[#285A48] hover:text-white"
      >
        <Icon className="text-lg" />
        <span className="font-medium">{item.title}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-[#408A71] text-white shadow-lg"
            : "text-[#C9D6D1] hover:bg-[#285A48] hover:text-white"
        }`
      }
    >
      <Icon className="text-lg" />
      <span className="font-medium">{item.title}</span>
    </NavLink>
  );
}