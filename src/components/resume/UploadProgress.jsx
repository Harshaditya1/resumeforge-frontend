import { motion } from "framer-motion";

export default function UploadProgress({
  uploading,
  progress,
}) {
  if (!uploading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[#C9D6D1]">
          Uploading Resume...
        </span>

        <span className="text-sm font-semibold text-[#B0E4CC]">
          {progress}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-[#B0E4CC]"
        />
      </div>
    </motion.div>
  );
}