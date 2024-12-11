import UserProfile from "@/components/profile/user-profile";
import RightSidebar from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";
import { fetchUserProfile } from "@/lib/api/auth";
import { useParams } from "react-router-dom";
import ErrorPage from "./error-page";
import { useQuery } from "@tanstack/react-query";

function ProfilePage() {
  const { username } = useParams();

  const {
    data: profileData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => fetchUserProfile(username),
    retry: 1,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="flex pb-headerWithOffset md:pb-0">
      <div className="flex w-full max-w-centerWrapper">
        <UserProfile profile={profileData} />
      </div>

      <RightSidebar>
        <span className="text-primaryOnly">Subscription</span>
        <Button>Subscribe</Button>
      </RightSidebar>
    </div>
  );
}

export default ProfilePage;
