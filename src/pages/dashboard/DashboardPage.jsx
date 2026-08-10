import StatsGrid from "../../components/dashboard/cards/StatsGrid";
import QuickActions from "../../components/dashboard/quick-actions/QuickActions";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-[#A7B8B5] mt-2">
          Welcome to your AI Resume Management Dashboard.
        </p>
      </div>

      <StatsGrid />

      <QuickActions />
    </div>
  );
}