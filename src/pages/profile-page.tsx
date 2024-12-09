import UserProfile from "@/components/profile/user-profile";
import RightSidebar from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/lib/api/auth";
import { DefaultError, ProfileNotFoundError } from "@/lib/api/errors";
import { UserProfileResponseSchema } from "@/lib/api/responses";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./error-page";
import { UserProfileInfo } from "@/lib/types";

function ProfilePage() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState({} as UserProfileInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setError(null);

      try {
        if (!username) {
          throw new DefaultError("username is undefined");
        }
        console.log("fetching user profile...");
        const response = await userProfile(username);
        console.log(response);
        const parsed = UserProfileResponseSchema.safeParse(response.data);
        if (!parsed.success) {
          console.log(parsed.error);
          throw new DefaultError("fail parsing response");
        }
        const profile: UserProfileInfo = {
          username: parsed.data.username,
          firstName: parsed.data.first_name,
          lastName: parsed.data.last_name,
          createdAt: parsed.data.created_at,
          updatedAt: parsed.data.updated_at,
          avatarURL: parsed.data.avatar_url,
          bannerURL: parsed.data.banner_url,
          description: parsed.data.description,
          location: parsed.data.location,
          userLink: parsed.data.user_link,
        };
        setProfileData(profile);
      } catch (error) {
        if (error instanceof ProfileNotFoundError) {
          setError(error.message);
        } else {
          setError("unexpected error");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  if (error) {
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
