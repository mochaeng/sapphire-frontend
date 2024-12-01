import AuthPanel from "@/components/auth/auth-panel";
import TimeLinePanel from "@/components/timeline/time-line-panel";
// import { useAuth } from "@/hooks/use-auth";
import { useAuthUser } from "@/hooks/use-auth-user";

function HomePage() {
  // const { isAuthenticated } = useAuth();
  const { user } = useAuthUser();

  return <>{!user.isAuthenticated ? <AuthPanel /> : <TimeLinePanel />}</>;
}

export default HomePage;
