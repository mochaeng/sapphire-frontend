import UserProfile from "@/components/profile/user-profile";
import RightSidebar from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import ErrorPage from "./error-page";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/api/user";
import React from "react";

function ProfilePage() {
  const { username } = useParams();

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

  return (
    <div className="flex md:pb-0">
      <div className="flex w-full max-w-centerWrapper pb-headerWithOffset lg-1:w-[632px] lg-1:border-r-1 lg-2:border-none">
        {data ? <UserProfile profile={data} /> : null}
      </div>

      <RightSidebar>
        <span className="text-primaryOnly">Subscription</span>
        <Button>Subscribe</Button>
      </RightSidebar>
    </div>
  );
}

export default React.memo(ProfilePage);
