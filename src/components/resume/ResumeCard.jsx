import { motion } from "framer-motion";
import {
  FiDownload,
  FiFileText,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";

export default function ResumeCard({
  resume,
  onDownload,
  onDelete,
  onReplace,
}) {
  if (!resume) return null;

  const isUploaded = Boolean(resume.id);

  const fileName =
    resume.originalFileName ||
    resume.name ||
    "Resume.pdf";

  const fileSize =
    resume.fileSize ??
    resume.size ??
    0;

  const uploadedAt = resume.uploadedAt
    ? new Date(resume.uploadedAt).toLocaleString()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Resume Info */}

        <div className="flex items-start gap-4">

          <div className="rounded-xl bg-[#285A48]/20 p-4">
            <FiFileText className="text-3xl text-[#B0E4CC]" />
          </div>

          <div>

            <h3 className="break-all text-lg font-semibold text-white">
              {fileName}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {(fileSize / 1024 / 1024).toFixed(2)} MB
            </p>

            {uploadedAt && (
              <p className="mt-1 text-xs text-gray-500">
                Uploaded:
                {" "}
                {uploadedAt}
              </p>
            )}

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-3">

          {isUploaded && (
            <button
              onClick={onDownload}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              <FiDownload />
              Download
            </button>
          )}

          <button
            onClick={onReplace}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
          >
            <FiRefreshCw />
            Replace
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            <FiTrash2 />
            Delete
          </button>

        </div>

      </div>
    </motion.div>
  );
}