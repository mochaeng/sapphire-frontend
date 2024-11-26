// import AuthPanel from "@/components/auth/AuthPanel";
import AuthPanel from "@/components/auth/AuthPanel";
import { useAuth } from "@/provider/auth/useAuth";
// import Header from "@/components/header";

function HomePage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex w-full justify-center">
      {!isAuthenticated && <AuthPanel />}
      {isAuthenticated && (
        <div>
          <button></button>
        </div>
      )}
      {/* <div className="flex w-full max-w-screen-2xl justify-center">
        <Header />
        <div className="flex w-full max-w-[1016px]">
          <div className="h-2 w-full bg-rose-600"></div>
        </div>
      </div> */}
    </div>
  );
}

export default HomePage;
