import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import ResumeDropzone from "../../components/resume/ResumeDropzone";
import ResumeCard from "../../components/resume/ResumeCard";
import UploadProgress from "../../components/resume/UploadProgress";

import {
  uploadResume,
  getLatestResume,
  deleteResume,
  downloadResume,
} from "../../services/resumeService";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ResumeUploadPage() {
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);

  const [dragActive, setDragActive] = useState(false);

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

    setSelectedFile(file);

    toast.success("Resume selected successfully.");
  };

  const handleBrowse = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const loadResume = async () => {
    try {
      setLoadingResume(true);

      const data = await getLatestResume();

      setUploadedResume(data);
    } catch {
      setUploadedResume(null);
    } finally {
      setLoadingResume(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleUploadResume = async () => {
    if (!selectedFile) {
      toast.error("Please select a resume first.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      await uploadResume(
        selectedFile,
        (value) => setProgress(value)
      );

      toast.success("Resume uploaded successfully.");

      setSelectedFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      await loadResume();
            setProgress(100);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!uploadedResume) return;

    try {
      await deleteResume(uploadedResume.id);

      setUploadedResume(null);

      toast.success("Resume deleted successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to delete resume."
      );
    }
  };

  const handleDownloadResume = async () => {
    if (!uploadedResume) return;

    try {
      const blob = await downloadResume(uploadedResume.id);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = uploadedResume.originalFileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Unable to download resume.");
    }
  };

  const handleReplaceResume = () => {
    inputRef.current?.click();
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

          <ResumeDropzone
            dragActive={dragActive}
            inputRef={inputRef}
            onBrowse={handleBrowse}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          />

          <UploadProgress
            uploading={uploading}
            progress={progress}
          />

          {uploadedResume && (
            <ResumeCard
              resume={uploadedResume}
              onDownload={handleDownloadResume}
              onDelete={handleDeleteResume}
              onReplace={handleReplaceResume}
            />
          )}

          {!uploadedResume && selectedFile && (
            <ResumeCard
              resume={{
                name: selectedFile.name,
                size: selectedFile.size,
              }}
              onDownload={() => {}}
              onDelete={() => {
                setSelectedFile(null);

                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
              onReplace={handleReplaceResume}
            />
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleUploadResume}
              disabled={!selectedFile || uploading}
              className="rounded-xl bg-[#285A48] px-8 py-3 font-semibold text-white transition hover:bg-[#356f59] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Upload Resume"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}