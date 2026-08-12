import { motion } from "framer-motion";

export default function JobDescriptionForm({
  value,
  onChange,
  onSubmit,
  loading,
}) {
  const characterCount = value.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          Paste Job Description
        </h2>

        <span className="text-sm text-gray-400">
          {characterCount} characters
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the complete job description here..."
        rows={14}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-white placeholder:text-gray-500 outline-none transition focus:border-[#B0E4CC]"
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="rounded-xl bg-[#285A48] px-8 py-3 font-semibold text-white transition hover:bg-[#356f59] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Job Description"}
        </button>
      </div>
    </motion.div>
  );
}