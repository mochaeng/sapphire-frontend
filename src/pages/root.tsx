import Header from "@/components/header";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Root() {
  const { isAuthenticated } = useAuth();
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

  if (!isAuthenticated && location.pathname === "/") {
    return <Outlet />;
  } else {
    return (
      <div className="flex h-full max-w-sapphire justify-center overflow-auto lg-2:w-full">
        <Header />
        <main className="w-full max-w-[1016px]">
          <div className="h-10 w-full bg-rose-600">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }
}

export default Root;
