import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";

export default function ResumeDropzone({
  dragActive,
  inputRef,
  onBrowse,
  onDragOver,
  onDragLeave,
  onDrop,
}) {
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={onBrowse}
      />

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          dragActive
            ? "border-[#B0E4CC] bg-[#B0E4CC]/10"
            : "border-white/15 hover:border-[#B0E4CC]"
        }`}
      >
        <FiUploadCloud className="mx-auto text-6xl text-[#B0E4CC]" />

        <h2 className="mt-6 text-2xl font-semibold text-white">
          Drag & Drop Resume
        </h2>

        <p className="mt-3 text-[#C9D6D1]">
          or click anywhere to browse your PDF resume
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Supported format: PDF
        </p>

        <p className="text-sm text-gray-400">
          Maximum size: 10 MB
        </p>
      </motion.div>
    </>
  );
}