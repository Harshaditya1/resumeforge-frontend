import { NavLink } from "react-router-dom";

export default function SidebarItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${
          isActive
            ? "bg-[#408A71] text-white shadow-lg"
            : "text-[#C9D6D1] hover:bg-[#285A48] hover:text-white"
        }`
      }
    >
      <Icon className="text-lg" />

      <span className="font-medium">
        {item.title}
      </span>
    </NavLink>
  );
}