import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import ATSScoreCard from "../../components/analysis/ATSScoreCard";
import KeywordSection from "../../components/analysis/KeywordSection";
import ATSReportCard from "../../components/analysis/ATSReportCard";
import ImprovementCard from "../../components/analysis/ImprovementCard";
import AIAnalysisCard from "../../components/analysis/AIAnalysisCard";

import {
  analyzeResume,
  getLatestAnalysis,
} from "../../services/analysisService";

export default function ResumeAnalysisPage() {
  const [analysis, setAnalysis] = useState(null);

  const [loadingAnalysis, setLoadingAnalysis] =
    useState(true);

  const [analyzing, setAnalyzing] =
    useState(false);

  const loadLatestAnalysis = async () => {
    try {
      setLoadingAnalysis(true);

      const data = await getLatestAnalysis();

      setAnalysis(data);
    } catch {
      setAnalysis(null);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    loadLatestAnalysis();
  }, []);

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);

      const result = await analyzeResume();

      setAnalysis(result);

      toast.success(
        "Resume analyzed successfully."
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to analyze resume."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  if (loadingAnalysis) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-[#C9D6D1]">
          Loading Resume Analysis...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Resume Analysis
            </h1>

            <p className="mt-2 text-[#A7B8B5]">
              Compare your latest resume with your latest Job Description using ATS and AI.
            </p>

          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="rounded-xl bg-[#285A48] px-8 py-3 font-semibold text-white transition hover:bg-[#356f59] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {analyzing
              ? "Analyzing..."
              : "Analyze Resume"}
          </button>

        </div>

        {!analysis && (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center">

            <h2 className="text-2xl font-semibold text-white">
              No Analysis Available
            </h2>

            <p className="mt-3 text-[#A7B8B5]">
              Upload a resume and save a Job Description, then click
              <strong> Analyze Resume</strong>.
            </p>

          </div>
        )}

        {analysis && (
          <>
                      <div className="mt-10 space-y-8">

              <ATSScoreCard
                matchPercentage={analysis.matchPercentage}
                report={analysis.report}
              />

              <div className="grid gap-6 xl:grid-cols-2">

                <KeywordSection
                  title="Resume Keywords"
                  keywords={analysis.resumeKeywords}
                  color="blue"
                />

                <KeywordSection
                  title="Job Description Keywords"
                  keywords={analysis.jobDescriptionKeywords}
                  color="yellow"
                />

                <KeywordSection
                  title="Matched Keywords"
                  keywords={analysis.matchedKeywords}
                  color="green"
                />

                <KeywordSection
                  title="Missing Keywords"
                  keywords={analysis.missingKeywords}
                  color="red"
                />

              </div>

              <ATSReportCard
                report={analysis.report}
              />

              <ImprovementCard
                improvement={analysis.improvement}
              />

              <AIAnalysisCard
                aiAnalysis={analysis.aiAnalysis}
              />

            </div>

          </>
        )}

      </motion.div>
    </div>
  );
}