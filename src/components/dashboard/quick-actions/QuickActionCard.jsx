import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  color,
  path,
}) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className="w-full text-left bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md transition-all"
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
        style={{ backgroundColor: color }}
      >
        <Icon className="text-white text-2xl" />
      </div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-[#A7B8B5] mt-2 leading-6">
        {description}
      </p>
    </motion.button>
  );
}