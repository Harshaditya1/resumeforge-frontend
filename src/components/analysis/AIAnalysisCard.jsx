import { motion } from "framer-motion";
import {
  FiCpu,
  FiAward,
  FiBriefcase,
  FiFileText,
  FiTool,
} from "react-icons/fi";

function SuggestionSection({
  icon: Icon,
  title,
  items,
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5">
      <div className="mb-4 flex items-center gap-3">
        <Icon className="text-xl text-[#B0E4CC]" />

        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-[#D8E3DF]"
          >
            <span className="mt-2 h-2 w-2 rounded-full bg-[#B0E4CC]" />

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AIAnalysisCard({
  aiAnalysis,
}) {
  if (!aiAnalysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#B0E4CC]/20 bg-gradient-to-br from-[#285A48]/20 to-white/5 p-6 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <FiCpu className="text-3xl text-[#B0E4CC]" />

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Resume Analysis
          </h2>

          <p className="text-[#A7B8B5]">
            AI-powered resume feedback
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <div className="rounded-xl bg-[#285A48]/30 px-6 py-4">
          <p className="text-sm uppercase tracking-wide text-[#B0E4CC]">
            AI Score
          </p>

          <h3 className="mt-2 text-5xl font-bold text-white">
            {aiAnalysis.overallScore ?? 0}
          </h3>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            Overall Assessment
          </h3>

          <p className="mt-2 leading-7 text-[#D8E3DF]">
            {aiAnalysis.overallAssessment}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <SuggestionSection
          icon={FiAward}
          title="Missing Skills"
          items={aiAnalysis.missingSkills}
        />

        <SuggestionSection
          icon={FiBriefcase}
          title="Project Suggestions"
          items={aiAnalysis.projectSuggestions}
        />

        <SuggestionSection
          icon={FiFileText}
          title="Summary Suggestions"
          items={aiAnalysis.summarySuggestions}
        />

        <SuggestionSection
          icon={FiTool}
          title="ATS Suggestions"
          items={aiAnalysis.atsSuggestions}
        />

      </div>
    </motion.div>
  );
}