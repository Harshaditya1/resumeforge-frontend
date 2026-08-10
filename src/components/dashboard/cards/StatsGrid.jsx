import {
  FaFileAlt,
  FaChartLine,
  FaFilePdf,
  FaUserTie,
} from "react-icons/fa";

import StatCard from "./StatCard";

const stats = [
  {
    title: "Total Resumes",
    value: 12,
    icon: FaFileAlt,
    color: "#408A71",
  },
  {
    title: "ATS Analyses",
    value: 28,
    icon: FaChartLine,
    color: "#2F80ED",
  },
  {
    title: "Generated Resumes",
    value: 15,
    icon: FaFilePdf,
    color: "#F59E0B",
  },
  {
    title: "Interview Sets",
    value: 9,
    icon: FaUserTie,
    color: "#8B5CF6",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}