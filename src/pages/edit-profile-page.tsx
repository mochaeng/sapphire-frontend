import ProfileSettingsPanel from "@/components/settings/edit-profile-panel";
import { useAuthUser } from "@/hooks/use-auth-user";
import { fetchUserProfile } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./error-page";
import { Navigate } from "react-router-dom";

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

  return <ProfileSettingsPanel profile={data} />;
}

export default EditProfilePage;
