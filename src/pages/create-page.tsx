import CreatePanel from "@/components/create/create-post-panel";
import RightSidebar from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Navigate } from "react-router-dom";

function CreatePage() {
  const { user } = useAuthUser();

  if (!user.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex pb-headerWithOffset md:pb-0">
      <div className="flex w-full max-w-centerWrapper">
        <CreatePanel />
      </div>

      <RightSidebar>
        <span className="text-primaryOnly">Subscription</span>
        <Button>Subscribe</Button>
      </RightSidebar>
    </div>
  );
}

export default CreatePage;
