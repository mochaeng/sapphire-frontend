import AuthPanel from "@/components/auth/AuthPanel";
import TimeLinePanel from "@/components/timeline/TimeLinePanel";
import { useAuth } from "@/hooks/useAuth";

function HomePage() {
  const { isAuthenticated } = useAuth();

  return <>{!isAuthenticated ? <AuthPanel /> : <TimeLinePanel />}</>;
}

export default HomePage;
