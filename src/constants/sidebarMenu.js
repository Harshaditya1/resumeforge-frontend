import {
  FaHome,
  FaFileUpload,
  FaClipboardList,
  FaChartLine,
  FaMagic,
  FaFilePdf,
  FaHistory,
  FaUserTie,
  FaSignOutAlt,
} from "react-icons/fa";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: FaHome,
    path: "/dashboard",
  },
  {
    title: "Upload Resume",
    icon: FaFileUpload,
    path: "/dashboard/resume",
  },
  {
    title: "Job Description",
    icon: FaClipboardList,
    path: "/dashboard/job-description",
  },
  {
    title: "Resume Analysis",
    icon: FaChartLine,
    path: "/dashboard/analysis",
  },
  {
    title: "Tailored Resume",
    icon: FaMagic,
    path: "/dashboard/tailored-resume",
  },
  {
    title: "Generated Resume",
    icon: FaFilePdf,
    path: "/dashboard/generated-resume",
  },
  {
    title: "Resume History",
    icon: FaHistory,
    path: "/dashboard/history",
  },
  {
    title: "Interview Questions",
    icon: FaUserTie,
    path: "/dashboard/interview",
  },
  {
    title: "Logout",
    icon: FaSignOutAlt,
    path: "/logout",
  },
];