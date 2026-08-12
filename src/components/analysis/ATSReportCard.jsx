import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiTarget,
} from "react-icons/fi";

export default function ATSReportCard({ report }) {
  if (!report) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold text-white">
        ATS Report
      </h2>

      <p className="mt-2 text-[#A7B8B5]">
        {report.overallAssessment}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Strengths */}

        <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5">

          <div className="flex items-center gap-2 mb-4">

            <FiCheckCircle className="text-green-400 text-xl" />

            <h3 className="font-semibold text-green-300">
              Strengths
            </h3>

          </div>

          <ul className="space-y-3">

            {report.strengths?.map((item, index) => (
              <li
                key={index}
                className="text-[#D8E3DF]"
              >
                • {item}
              </li>
            ))}

          </ul>

        </div>

        {/* Improvements */}

        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-5">

          <div className="flex items-center gap-2 mb-4">

            <FiAlertCircle className="text-red-400 text-xl" />

            <h3 className="font-semibold text-red-300">
              Improvements
            </h3>

          </div>

          <ul className="space-y-3">

            {report.improvements?.map((item, index) => (
              <li
                key={index}
                className="text-[#D8E3DF]"
              >
                • {item}
              </li>
            ))}

          </ul>

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-[#285A48]/20 border border-[#285A48] p-5">

        <div className="flex items-center gap-2 mb-3">

          <FiTarget className="text-[#B0E4CC] text-xl" />

          <h3 className="font-semibold text-[#B0E4CC]">
            Recommendation
          </h3>

        </div>

        <p className="leading-7 text-[#D8E3DF]">
          {report.recommendation}
        </p>

      </div>

    </motion.div>
  );
}