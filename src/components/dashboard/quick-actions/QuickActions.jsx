import {
  FaFileUpload,
  FaClipboardList,
  FaChartLine,
  FaMagic,
} from "react-icons/fa";

import QuickActionCard from "./QuickActionCard";

const actions = [
  {
    title: "Upload Resume",
    description: "Upload your resume in PDF format.",
    icon: FaFileUpload,
    color: "#408A71",
    path: "/dashboard/resume-upload",
  },
  {
    title: "Job Description",
    description: "Paste or upload a job description.",
    icon: FaClipboardList,
    color: "#2F80ED",
    path: "/dashboard/job-description",
  },
  {
    title: "Resume Analysis",
    description: "Analyze ATS score and keyword match.",
    icon: FaChartLine,
    color: "#F59E0B",
    path: "/dashboard/analysis",
  },
  {
    title: "Generate Resume",
    description: "Generate an ATS optimized resume.",
    icon: FaMagic,
    color: "#8B5CF6",
    path: "/dashboard/tailored-resume",
  },
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action) => (
          <QuickActionCard
            key={action.title}
            {...action}
          />
        ))}
      </div>
    </section>
  );
}