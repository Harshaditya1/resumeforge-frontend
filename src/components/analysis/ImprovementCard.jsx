import { motion } from "framer-motion";
import {
  FiAward,
  FiBriefcase,
  FiFileText,
  FiTool,
} from "react-icons/fi";

function Section({ icon: Icon, title, items }) {
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

export default function ImprovementCard({
  improvement,
}) {
  if (!improvement) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold text-white">
        Resume Improvement Suggestions
      </h2>

      <p className="mt-2 text-[#A7B8B5]">
        Improve your resume using rule-based ATS recommendations.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <Section
          icon={FiAward}
          title="Missing Skills"
          items={improvement.missingSkills}
        />

        <Section
          icon={FiBriefcase}
          title="Project Suggestions"
          items={improvement.projectSuggestions}
        />

        <Section
          icon={FiFileText}
          title="Summary Suggestions"
          items={improvement.summarySuggestions}
        />

        <Section
          icon={FiTool}
          title="ATS Suggestions"
          items={improvement.atsSuggestions}
        />

      </div>
    </motion.div>
  );
}