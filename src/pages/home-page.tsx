import AuthPanel from "@/components/auth/auth-panel";
import TimeLinePanel from "@/components/timeline/time-line-panel";
import { useAuth } from "@/hooks/use-auth";

function HomePage() {
  const { isAuthenticated } = useAuth();

  return <>{!isAuthenticated ? <AuthPanel /> : <TimeLinePanel />}</>;
}

export default HomePage;
