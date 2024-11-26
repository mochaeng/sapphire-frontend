import Header from "@/components/header";
import { useAuth } from "@/hooks/useAuth";
import { Outlet, useLocation } from "react-router-dom";

function Root() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && location.pathname === "/") {
    return <Outlet />;
  } else {
    return (
      <div className="flex w-full max-w-screen-xl justify-center">
        <Header />
        <div className="flex w-full max-w-[1016px]">
          <div className="h-2 w-full bg-rose-600">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
