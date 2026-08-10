import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#A7B8B5]">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-white">
            {value}
          </h2>
        </div>

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Icon className="text-white text-2xl" />
        </div>
      </div>
    </motion.div>
  );
}