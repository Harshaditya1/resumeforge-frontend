import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";

export default function ResumeUploadPage() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Resume Upload
          </h1>

          <p className="mt-2 text-gray-400">
            Upload your latest resume to begin AI-powered ATS analysis.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-12 shadow-xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-5 rounded-full bg-blue-600/10 p-5">
              <FiUploadCloud className="text-5xl text-blue-500" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Resume Upload Module
            </h2>

            <p className="mt-3 max-w-xl text-gray-400">
              This page is now registered and ready for the production upload
              workflow. The next step will replace this with the complete
              drag-and-drop uploader integrated with your Spring Boot backend.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}