import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaChartLine,
  FaFilePdf,
  FaMagic,
} from "react-icons/fa";

import StatCard from "./StatCard";
import dashboardService from "../../../services/dashboardService";

export default function StatsGrid() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const data = await dashboardService.getDashboardSummary();

        setStats([
          {
            title: "Total Resumes",
            value: data.totalResumes,
            icon: FaFileAlt,
            color: "#408A71",
          },
          {
            title: "Job Descriptions",
            value: data.totalJobDescriptions,
            icon: FaChartLine,
            color: "#2F80ED",
          },
          {
            title: "Generated Resumes",
            value: data.totalGeneratedResumes,
            icon: FaFilePdf,
            color: "#F59E0B",
          },
          {
            title: "Tailored Resumes",
            value: data.totalTailoredResumes,
            icon: FaMagic,
            color: "#8B5CF6",
          },
        ]);
      } catch (error) {
        console.error("Failed to load dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats?.map((stat) => (
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