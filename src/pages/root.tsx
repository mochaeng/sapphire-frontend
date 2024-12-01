import Header from "@/components/header";
// import { useAuth } from "@/hooks/use-auth";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Root() {
  const { user } = useAuthUser();
  const location = useLocation();

  useEffect(() => {
    const updateViewPortHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateViewPortHeight();
    window.addEventListener("resize", updateViewPortHeight);

    return () => window.removeEventListener("resize", updateViewPortHeight);
  }, []);

  if (!user.isAuthenticated && location.pathname === "/") {
    return <Outlet />;
  } else {
    return (
      <div className="mx-auto flex h-full max-w-sapphire lg-2:w-full">
        <Header />
        <main className="w-full max-w-[1016px] overflow-auto">
          <div className="h-10 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }
}

export default Root;
