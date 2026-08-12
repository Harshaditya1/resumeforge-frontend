import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUploadCloud,
  FiFileText,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";
import {
  uploadResume as uploadResumeApi,
  getResume,
  deleteResume,
} from "../../services/resumeService";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ResumeUploadPage() {
  const inputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // UI state (backend integration in next step)
  const [uploading, setUploading] = useState(false);
const [progress, setProgress] = useState(0);
const [loadingResume, setLoadingResume] = useState(true);

  const validateFile = (file) => {
    if (!file) return false;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF resumes are allowed.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Resume must be smaller than 10 MB.");
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    setResume(file);
    toast.success("Resume selected successfully.");
  };

  const handleBrowse = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeResume = async () => {
  try {
    await deleteResume();

    setResume(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    toast.success("Resume deleted successfully.");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Unable to delete resume."
    );
  }
};

  const loadResume = async () => {
  try {
    setLoadingResume(true);

    const data = await getResume();

    if (data) {
      setResume(data);
    } else {
      setResume(null);
    }
  } catch {
    setResume(null);
  } finally {
    setLoadingResume(false);
  }
};

useEffect(() => {
  loadResume();
}, []);

  const uploadResume = async () => {
  if (!resume) {
    toast.error("Please select a resume first.");
    return;
  }

  try {
    setUploading(true);
    setProgress(0);

    const response = await uploadResumeApi(
      resume,
      (value) => {
        setProgress(value);
      }
    );

    toast.success(
      response?.message || "Resume uploaded successfully."
    );
    await loadResume();

    setProgress(100);
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Failed to upload resume.";

    toast.error(message);
  } finally {
    setUploading(false);
  }
};
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Resume Upload
          </h1>

          <p className="mt-2 text-[#A7B8B5]">
            Upload your latest resume for AI-powered ATS analysis.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
         {loadingResume && (
    <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 text-center text-[#C9D6D1]">
      Loading your uploaded resume...
    </div>
  )}

          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleBrowse}
          />

          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all p-12 text-center ${
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
              Supported format: PDF • Maximum size: 10 MB
            </p>
          </motion.div>

          {resume && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 rounded-xl border border-white/10 bg-black/20 p-5"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <FiFileText className="text-3xl text-[#B0E4CC]" />

                  <div>
                    <h3 className="text-white font-semibold break-all">
                      {resume.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={removeResume}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                >
                  <FiTrash2 />
                  Remove
                </button>
              </div>
            </motion.div>
          )}

          {uploading && (
            <div className="mt-8">
              <div className="h-3 rounded-full bg-gray-700 overflow-hidden">
                <div
                  className="h-full bg-[#B0E4CC] transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-sm text-[#C9D6D1]">
                Uploading... {progress}%
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={uploadResume}
              disabled={!resume || uploading}
              className="rounded-xl bg-[#285A48] px-8 py-3 font-semibold text-white transition hover:bg-[#356f59] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
);
}