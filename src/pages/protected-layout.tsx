import { useAuthUser } from "@/hooks/use-auth-user";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedLayout() {
  const { user, isReady } = useAuthUser();
  if (!isReady) {
    return <div>Loading...</div>;
  }
  if (!user.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedLayout;
