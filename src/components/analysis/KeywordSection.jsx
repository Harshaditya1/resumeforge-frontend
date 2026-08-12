import { motion } from "framer-motion";

export default function KeywordSection({
  title,
  keywords = [],
  color = "green",
}) {
  const colorClasses = {
    green:
      "bg-green-500/15 text-green-300 border-green-500/20",

    blue:
      "bg-blue-500/15 text-blue-300 border-blue-500/20",

    yellow:
      "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",

    red:
      "bg-red-500/15 text-red-300 border-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      {keywords.length === 0 ? (
        <p className="mt-5 text-[#A7B8B5]">
          No keywords available.
        </p>
      ) : (
        <div className="mt-6 flex flex-wrap gap-3">
          {keywords.map((keyword, index) => (
            <motion.span
              key={`${keyword}-${index}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.04,
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                colorClasses[color]
              }`}
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}