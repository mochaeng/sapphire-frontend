import AuthPanel from "@/components/auth/auth-panel";
import TimelinePanel from "@/components/timeline/timeline-panel";
// import { useAuth } from "@/hooks/use-auth";
import { useAuthUser } from "@/hooks/use-auth-user";

function HomePage() {
  // const { isAuthenticated } = useAuth();
  const { user } = useAuthUser();

  return <>{!user.isAuthenticated ? <AuthPanel /> : <TimelinePanel />}</>;
}

export default HomePage;
