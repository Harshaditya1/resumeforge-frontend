import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { token, loading } = useAuth();
  const location = useLocation();

  // Wait until auth state is restored
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#091413]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#408A71]/30 border-t-[#408A71]" />
      </div>
    );
  }

  // Not logged in
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Logged in
  return <Outlet />;
}