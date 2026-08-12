import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import JobDescriptionForm from "../../components/job-description/JobDescriptionForm";

import {
  saveJobDescription,
  getLatestJobDescription,
  deleteJobDescription,
} from "../../services/jobDescriptionService";

export default function JobDescriptionPage() {
  const [content, setContent] = useState("");

  const [jobDescription, setJobDescription] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const [loadingLatest, setLoadingLatest] =
    useState(true);

  const loadLatestJobDescription = async () => {
    try {
      setLoadingLatest(true);

      const data =
        await getLatestJobDescription();

      setJobDescription(data);
    } catch {
      setJobDescription(null);
    } finally {
      setLoadingLatest(false);
    }
  };

  useEffect(() => {
    loadLatestJobDescription();
  }, []);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error(
        "Please paste a Job Description."
      );
      return;
    }

    try {
      setLoading(true);

      await saveJobDescription(content);

      toast.success(
        "Job Description saved successfully."
      );

      setContent("");

      await loadLatestJobDescription();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to save Job Description."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!jobDescription) return;

    try {
      await deleteJobDescription(
        jobDescription.id
      );

      toast.success(
        "Job Description deleted."
      );

      setJobDescription(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to delete Job Description."
      );
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
            Job Description
          </h1>

          <p className="mt-2 text-[#A7B8B5]">
            Paste the job description to compare it with your resume and generate ATS insights.
          </p>
        </div>

        <JobDescriptionForm
          value={content}
          onChange={setContent}
          onSubmit={handleSave}
          loading={loading}
        />

        {loadingLatest && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-[#C9D6D1]">
            Loading latest Job Description...
          </div>
        )}

        {!loadingLatest && jobDescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">
                  Latest Job Description
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Saved on{" "}
                  {new Date(
                    jobDescription.createdAt
                  ).toLocaleString()}
                </p>

                <div className="mt-6 rounded-xl bg-black/20 p-5 border border-white/5 max-h-80 overflow-y-auto">
                  <p className="whitespace-pre-wrap text-[#D8E3DF] leading-7">
                    {jobDescription.content}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#B0E4CC]">
                    Extracted Keywords
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {jobDescription.extractedKeywords
                      ?.split(",")
                      .map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-[#285A48]/30 px-3 py-1 text-sm text-[#B0E4CC]"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}

        {!loadingLatest && !jobDescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center"
          >
            <h3 className="text-xl font-semibold text-white">
              No Job Description Found
            </h3>

            <p className="mt-3 text-[#A7B8B5]">
              Paste and save a Job Description to begin ATS analysis.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}