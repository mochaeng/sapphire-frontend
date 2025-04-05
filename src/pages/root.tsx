import Header from "@/components/header";
// import { useAuth } from "@/hooks/use-auth";
import { useAuthUser } from "@/hooks/use-auth-user";
import React, { useEffect } from "react";
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
      <div className="mx-auto flex h-full w-full max-w-sapphire justify-center lg-2:max-w-full">
        <Header />
        <main className="h-full w-full max-w-[1016px]">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }
}

export default React.memo(Root);
