import { motion } from "framer-motion";

export default function ATSScoreCard({
  matchPercentage,
  report,
}) {
  const score = Math.round(matchPercentage || 0);

  const getColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>
          <p className="text-sm uppercase tracking-wider text-[#B0E4CC]">
            ATS Match Score
          </p>

          <h2 className="mt-3 text-6xl font-bold text-white">
            {score}%
          </h2>

          <p className="mt-3 text-lg font-medium text-[#B0E4CC]">
            {report?.scoreCategory || "Not Available"}
          </p>

          <p className="mt-4 max-w-xl leading-7 text-[#C9D6D1]">
            {report?.overallAssessment ||
              "No ATS assessment available."}
          </p>
        </div>

        <div className="w-full max-w-xs">

          <div className="mb-2 flex justify-between text-sm text-[#C9D6D1]">
            <span>ATS Compatibility</span>

            <span>{score}%</span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/10">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{
                duration: 1,
              }}
              className={`h-full rounded-full ${getColor()}`}
            />

          </div>

        </div>

      </div>
    </motion.div>
  );
}