import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-[#285A48]/60 backdrop-blur-md border border-[#B0E4CC]/10 rounded-2xl px-6 py-4 mb-8">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-[#C9D6D1] mt-1">
          Manage your resumes with AI.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative text-[#B0E4CC] hover:text-white transition">
          <FaBell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle
            size={40}
            className="text-[#B0E4CC]"
          />

          <div>
            <p className="font-semibold">
              Harsh Aditya
            </p>

            <p className="text-xs text-[#C9D6D1]">
              Software Developer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}