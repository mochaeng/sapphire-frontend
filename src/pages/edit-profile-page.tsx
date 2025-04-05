import ProfileSettingsPanel from "@/components/settings/edit-profile-panel";
import { useAuthUser } from "@/hooks/use-auth-user";
import { fetchUserProfile } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./error-page";
import { Navigate } from "react-router-dom";
import RightSidebar from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";

function EditProfilePage() {
  const { user } = useAuthUser();
  const username = user.username || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: ({ signal }) => {
      return fetchUserProfile({ username, signal });
    },
    retry: 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (data === undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <ProfileSettingsPanel className="flex-1" profile={data} />
      <RightSidebar className="flex w-1 p-0 lg-2:w-1"></RightSidebar>
    </div>
  );
}

export default EditProfilePage;
