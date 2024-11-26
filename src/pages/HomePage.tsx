// import AuthPanel from "@/components/auth/AuthPanel";
import AuthPanel from "@/components/auth/AuthPanel";
import { signout } from "@/lib/api/api";
import { DefaultError } from "@/lib/api/errors";
import { useAuth } from "@/provider/auth/useAuth";
// import Header from "@/components/header";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signout();
      setIsAuthenticated(false);
    } catch (error) {
      if (error instanceof DefaultError) {
        console.log("could not signout user");
      }
    }
  };

  return (
    <div className="flex w-full justify-center">
      {!isAuthenticated && <AuthPanel />}
      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <button className="bg-zinc-900 p-2 text-white">Signout</button>
        </form>
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
