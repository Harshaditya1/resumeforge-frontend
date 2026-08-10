import { motion } from "framer-motion";
import { sidebarMenu } from "../../constants/sidebarMenu";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-72 min-h-screen bg-[#285A48] border-r border-[#B0E4CC]/10 flex flex-col"
    >
      {/* Logo */}
      <div className="px-6 py-8 border-b border-[#B0E4CC]/10">
        <h1 className="text-2xl font-bold text-[#B0E4CC]">
          ResumeForge AI
        </h1>

        <p className="mt-2 text-sm text-[#C9D6D1]">
          AI Resume Tailoring Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarMenu.map((item) => (
          <SidebarItem
            key={item.title}
            item={item}
          />
        ))}
      </nav>
    </motion.aside>
  );
}